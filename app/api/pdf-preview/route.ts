import {
  readFile,
  stat,
} from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_PDF_BYTES =
  64 * 1024 * 1024;

function createErrorResponse(
  message: string,
  status: number
) {
  return Response.json(
    {
      error: message,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function resolvePublicPdfPath(
  requestedPath: string
) {
  const publicRoot =
    path.resolve(
      process.cwd(),
      "public"
    );

  const normalizedRequestPath =
    requestedPath
      .replace(/\\/g, "/")
      .replace(/^\/+/, "");

  const resolvedFilePath =
    path.resolve(
      publicRoot,
      normalizedRequestPath
    );

  const isInsidePublic =
    resolvedFilePath.startsWith(
      `${publicRoot}${path.sep}`
    );

  if (
    !isInsidePublic ||
    path.extname(
      resolvedFilePath
    ).toLowerCase() !== ".pdf"
  ) {
    return null;
  }

  return resolvedFilePath;
}

function getLogicalPdfBuffer(
  fileBuffer: Buffer
): Buffer {
  const pdfHeader =
    fileBuffer
      .subarray(0, 5)
      .toString("ascii");

  if (pdfHeader !== "%PDF-") {
    throw new Error(
      "The requested file is not a valid PDF."
    );
  }

  const eofMarker =
    Buffer.from(
      "%%EOF",
      "ascii"
    );

  const eofIndex =
    fileBuffer.lastIndexOf(
      eofMarker
    );

  if (eofIndex === -1) {
    throw new Error(
      "The requested PDF does not contain an EOF marker."
    );
  }

  let logicalEnd =
    eofIndex +
    eofMarker.byteLength;

  while (
    logicalEnd <
    fileBuffer.byteLength
  ) {
    const byte =
      fileBuffer[logicalEnd];

    if (
      byte !== 0x0a &&
      byte !== 0x0d &&
      byte !== 0x20 &&
      byte !== 0x09
    ) {
      break;
    }

    logicalEnd += 1;
  }

  /*
   * This local Windows copy reports a physical file size that is
   * 4096 bytes larger than the readable bytes. The readable portion
   * already contains a complete PDF ending in %%EOF, so the preview
   * must use the logical PDF length instead of stat.size.
   */
  return fileBuffer.subarray(
    0,
    logicalEnd
  );
}

export async function GET(
  request: Request
) {
  const requestUrl =
    new URL(request.url);

  const requestedPath =
    requestUrl.searchParams.get(
      "path"
    );

  if (!requestedPath) {
    return createErrorResponse(
      "Missing PDF path.",
      400
    );
  }

  const filePath =
    resolvePublicPdfPath(
      requestedPath
    );

  if (!filePath) {
    return createErrorResponse(
      "Invalid PDF path.",
      400
    );
  }

  try {
    const fileStats =
      await stat(filePath);

    if (
      !fileStats.isFile() ||
      fileStats.size <= 0 ||
      fileStats.size >
        MAX_PDF_BYTES
    ) {
      return createErrorResponse(
        "PDF cannot be previewed.",
        413
      );
    }

    const fileBuffer =
      await readFile(filePath);

    const logicalPdfBuffer =
      getLogicalPdfBuffer(
        fileBuffer
      );

    return Response.json(
      {
        byteLength:
          logicalPdfBuffer.byteLength,
        data:
          logicalPdfBuffer.toString(
            "base64"
          ),
      },
      {
        headers: {
          "Cache-Control":
            "no-store",
          "X-Content-Type-Options":
            "nosniff",
        },
      }
    );
  }
  catch (error) {
    console.error(
      "Local PDF preview read failed:",
      error
    );

    return createErrorResponse(
      "PDF not found.",
      404
    );
  }
}
