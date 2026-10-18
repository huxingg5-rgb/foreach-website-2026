"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { getInquiryAttachmentCopy } from "./InquiryAttachmentField.copy";
import styles from "./InquiryAttachmentField.module.css";

const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.rar,.dxf,.dwg";
const ALLOWED_EXTENSIONS = new Set(ACCEPT.split(","));
const MAX_FILES = 5;
const MAX_BYTES = 20 * 1024 * 1024;

interface InquiryAttachmentFieldProps {
  locale: string;
  files: File[];
  disabled: boolean;
  onChange: (files: File[]) => void;
}

export default function InquiryAttachmentField({
  locale,
  files,
  disabled,
  onChange,
}: InquiryAttachmentFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const copy = getInquiryAttachmentCopy(locale);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const additions = Array.from(event.target.files || []);
    event.target.value = "";
    if (!additions.length) return;
    const nextFiles = [...files, ...additions];

    let nextError = "";
    if (nextFiles.length > MAX_FILES) {
      nextError = copy.tooMany;
    } else if (additions.some((file) => file.size === 0)) {
      nextError = copy.empty;
    } else if (additions.some((file) => !ALLOWED_EXTENSIONS.has(file.name.slice(file.name.lastIndexOf(".")).toLowerCase()))) {
      nextError = copy.unsupported;
    } else if (additions.some((file) => file.size > MAX_BYTES)) {
      nextError = copy.fileTooLarge;
    } else if (nextFiles.reduce((total, file) => total + file.size, 0) > MAX_BYTES) {
      nextError = copy.totalTooLarge;
    }

    setError(nextError);
    if (!nextError) onChange(nextFiles);
  }

  return (
    <div className={styles.field}>
      <div className={styles.toolbar}>
        <strong>{copy.label}</strong>
        <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()}>
          {copy.add}
        </button>
        <input
          ref={inputRef}
          type="file"
          aria-label={copy.add}
          multiple
          accept={ACCEPT}
          disabled={disabled}
          onChange={handleFileChange}
          hidden
        />
      </div>
      <p className={styles.hint}>
        {copy.hint}
      </p>
      {files.length ? (
        <ul className={styles.list} aria-label={copy.selected}>
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              <span className={styles.name}>{file.name}</span>
              <span className={styles.size}>{file.size < 1024 * 1024 ? `${(file.size / 1024).toFixed(1)} KB` : `${(file.size / 1024 / 1024).toFixed(2)} MB`}</span>
              <button
                type="button"
                disabled={disabled}
                aria-label={`${copy.remove} ${file.name}`}
                onClick={() => {
                  onChange(files.filter((_, fileIndex) => fileIndex !== index));
                  setError("");
                }}
              >
                {copy.remove}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className={styles.error} role="alert">{error}</p> : null}
    </div>
  );
}
