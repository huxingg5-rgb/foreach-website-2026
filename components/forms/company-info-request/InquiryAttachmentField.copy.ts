import type { LocaleCode } from "@/lib/i18n";

type AttachmentCopy = {
  label: string;
  add: string;
  hint: string;
  selected: string;
  remove: string;
  tooMany: string;
  empty: string;
  unsupported: string;
  fileTooLarge: string;
  totalTooLarge: string;
};

const copies: Record<LocaleCode, AttachmentCopy> = {
  "zh-CN": {
    label: "附件（选填）", add: "添加附件", selected: "已选附件", remove: "移除",
    hint: "可添加图纸、规格要求或参考图片，最多 5 个文件，合计不超过 20 MB。支持 PDF、Office 文档、JPG/PNG/WebP、ZIP/RAR、DXF/DWG。",
    tooMany: "最多添加 5 个附件。", empty: "不能添加空文件。",
    unsupported: "请选择支持的文档、图片、压缩包或 CAD 文件。",
    fileTooLarge: "单个附件不能超过 20 MB。", totalTooLarge: "附件总大小不能超过 20 MB。",
  },
  en: {
    label: "Attachments (Optional)", add: "Add Attachments", selected: "Selected Attachments", remove: "Remove",
    hint: "Add drawings, specifications, or reference images. Up to 5 files, 20 MB total. Supports PDF, Office documents, JPG/PNG/WebP, ZIP/RAR, and DXF/DWG.",
    tooMany: "Attach up to 5 files.", empty: "Empty files cannot be attached.",
    unsupported: "Choose a supported document, image, archive, or CAD file.",
    fileTooLarge: "Each file must be 20 MB or smaller.", totalTooLarge: "Attachments must total 20 MB or less.",
  },
  es: {
    label: "Archivos adjuntos (opcional)", add: "Añadir archivos", selected: "Archivos seleccionados", remove: "Eliminar",
    hint: "Añada planos, especificaciones o imágenes de referencia. Máximo 5 archivos y 20 MB en total. Se admiten PDF, documentos de Office, JPG/PNG/WebP, ZIP/RAR y DXF/DWG.",
    tooMany: "Puede adjuntar un máximo de 5 archivos.", empty: "No se pueden adjuntar archivos vacíos.",
    unsupported: "Seleccione un documento, imagen, archivo comprimido o archivo CAD compatible.",
    fileTooLarge: "Cada archivo debe ocupar 20 MB como máximo.", totalTooLarge: "El tamaño total de los archivos no puede superar los 20 MB.",
  },
  fr: {
    label: "Pièces jointes (facultatif)", add: "Ajouter des fichiers", selected: "Fichiers sélectionnés", remove: "Supprimer",
    hint: "Ajoutez des plans, des spécifications ou des images de référence. Maximum 5 fichiers et 20 Mo au total. Formats acceptés : PDF, documents Office, JPG/PNG/WebP, ZIP/RAR et DXF/DWG.",
    tooMany: "Vous pouvez joindre jusqu’à 5 fichiers.", empty: "Les fichiers vides ne peuvent pas être joints.",
    unsupported: "Choisissez un document, une image, une archive ou un fichier CAO compatible.",
    fileTooLarge: "Chaque fichier doit faire 20 Mo maximum.", totalTooLarge: "La taille totale des pièces jointes ne peut pas dépasser 20 Mo.",
  },
  ko: {
    label: "첨부 파일(선택)", add: "파일 첨부", selected: "선택한 첨부 파일", remove: "삭제",
    hint: "도면, 사양서 또는 참고 이미지를 첨부할 수 있습니다. 최대 5개 파일, 총 20 MB까지 가능합니다. PDF, Office 문서, JPG/PNG/WebP, ZIP/RAR, DXF/DWG를 지원합니다.",
    tooMany: "파일은 최대 5개까지 첨부할 수 있습니다.", empty: "빈 파일은 첨부할 수 없습니다.",
    unsupported: "지원되는 문서, 이미지, 압축 파일 또는 CAD 파일을 선택해 주세요.",
    fileTooLarge: "각 파일의 크기는 20 MB 이하여야 합니다.", totalTooLarge: "첨부 파일의 총 크기는 20 MB 이하여야 합니다.",
  },
  ru: {
    label: "Вложения (необязательно)", add: "Добавить файлы", selected: "Выбранные файлы", remove: "Удалить",
    hint: "Добавьте чертежи, спецификации или изображения для справки. Не более 5 файлов общим размером до 20 МБ. Поддерживаются PDF, документы Office, JPG/PNG/WebP, ZIP/RAR и DXF/DWG.",
    tooMany: "Можно прикрепить не более 5 файлов.", empty: "Нельзя прикреплять пустые файлы.",
    unsupported: "Выберите документ, изображение, архив или файл CAD поддерживаемого формата.",
    fileTooLarge: "Размер каждого файла не должен превышать 20 МБ.", totalTooLarge: "Общий размер вложений не должен превышать 20 МБ.",
  },
};

export function getInquiryAttachmentCopy(locale: string): AttachmentCopy {
  return copies[locale as LocaleCode] ?? copies.en;
}

export function getInquiryAttachmentError(locale: string, code: string): string | undefined {
  const copy = getInquiryAttachmentCopy(locale);
  const errors: Record<string, string> = {
    too_many_attachments: copy.tooMany,
    attachment_empty: copy.empty,
    attachment_type_not_allowed: copy.unsupported,
    attachment_too_large: copy.fileTooLarge,
    attachments_total_too_large: copy.totalTooLarge,
  };
  return errors[code];
}
