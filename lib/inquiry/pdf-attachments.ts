/** Persist actual PDF bytes separately from the JSON cart. No temporary URLs are stored. */
export type GeneratedPdfAttachment = {
  key: string;
  name: string;
  size: number;
  sha256: string;
  pageCount: number;
};
type StoredPdf = GeneratedPdfAttachment & { blob: Blob };
const DATABASE = "foreach-generated-inquiry-attachments-v1";
const STORE = "pdfs";
export const INQUIRY_ATTACHMENT_MAX_COUNT = 5;
export const INQUIRY_ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024;

export async function attachmentDigest(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), b => b.toString(16).padStart(2, "0")).join("");
}

async function database() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: "key" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("图纸附件存储无法打开，请检查浏览器存储权限。"));
    request.onblocked = () => reject(new Error("图纸附件存储被其他窗口占用，请关闭其他窗口后重试。"));
  });
}

async function storedPdf(key: string): Promise<StoredPdf | undefined> {
  const db = await database();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE, "readonly");
      const request = transaction.objectStore(STORE).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error("图纸附件读取失败，请重试。"));
    });
  } finally { db.close(); }
}

export async function storePdfAttachment(key: string, file: File, pageCount: number): Promise<GeneratedPdfAttachment> {
  const bytes = await file.arrayBuffer();
  if (new TextDecoder().decode(bytes.slice(0, 5)) !== "%PDF-" || !file.size) throw new Error("配置 PDF 生成失败，请重试。");
  const attachment: GeneratedPdfAttachment = { key, name: file.name, size: file.size, pageCount, sha256: await attachmentDigest(bytes) };
  const db = await database();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).put({ ...attachment, blob: file });
      transaction.oncomplete = () => resolve();
      transaction.onerror = transaction.onabort = () => reject(new Error("图纸附件保存失败，请检查浏览器存储权限或可用空间。"));
    });
  } finally { db.close(); }
  return attachment;
}

export async function findPdfAttachment(key: string): Promise<GeneratedPdfAttachment | undefined> {
  const stored = await storedPdf(key);
  if (!stored) return undefined;
  return { key: stored.key, name: stored.name, size: stored.size, pageCount: stored.pageCount, sha256: stored.sha256 };
}

export async function readPdfAttachment(attachment: GeneratedPdfAttachment): Promise<File> {
  const stored = await storedPdf(attachment.key);
  if (!stored || !(stored.blob instanceof Blob) || stored.blob.size !== attachment.size || stored.sha256 !== attachment.sha256 ||
      await attachmentDigest(await stored.blob.arrayBuffer()) !== attachment.sha256) {
    throw new Error("配置图纸附件无法完整读取，请返回对应配置重新加入清单。");
  }
  return new File([stored.blob], attachment.name, { type: "application/pdf", lastModified: 0 });
}

export function validateInquiryAttachments(files: readonly File[]) {
  if (files.length > INQUIRY_ATTACHMENT_MAX_COUNT) throw new Error("too_many_attachments");
  if (files.some(file => !file.size)) throw new Error("attachment_empty");
  if (files.some(file => file.size > INQUIRY_ATTACHMENT_MAX_BYTES)) throw new Error("attachment_too_large");
  if (files.reduce((sum, file) => sum + file.size, 0) > INQUIRY_ATTACHMENT_MAX_BYTES) throw new Error("attachments_total_too_large");
}

export function appendInquiryAttachments(form: FormData, generated: readonly File[], additional: readonly File[] = []) {
  const files = [...generated, ...additional];
  validateInquiryAttachments(files);
  files.forEach(file => form.append("attachments", file, file.name));
}

/** Copy PDF pages, retaining vectors and all continuation sheets. */
export async function packageConfigurationPdfs(files: File[], copy?: { title: string; filename: string }): Promise<File[]> {
  if (files.length <= 1) return files;
  const url = "/vendor/flanged-drawing/pdf-lib-1.17.1.mjs";
  const { PDFDocument } = await import(/* webpackIgnore: true */ url);
  const pdf = await PDFDocument.create();
  pdf.setTitle(copy?.title || "FOREACH 管组件配置图纸包");
  pdf.setSubject(files.map(file => file.name).join("; "));
  for (const file of files) {
    const source = await PDFDocument.load(await file.arrayBuffer());
    const pages = await pdf.copyPages(source, source.getPageIndices());
    pages.forEach((page: unknown) => pdf.addPage(page));
  }
  const file = new File([new Uint8Array(await pdf.save())], copy?.filename || `管组件配置图纸包-${files.length}项.pdf`, { type: "application/pdf", lastModified: 0 });
  validateInquiryAttachments([file]);
  return [file];
}
