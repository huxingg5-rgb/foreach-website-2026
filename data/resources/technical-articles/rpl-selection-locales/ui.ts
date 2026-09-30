import type { TechnicalArticleLocale } from "../technical-articles.types";

type RplArticleUi = {
  contents: string;
  sections: readonly [string, string, string, string, string];
  productAlt: string;
  share: string;
  shareLabels: { facebook: string; linkedin: string; x: string; copy: string };
  previewNotice: string;
  copied: string;
  copyFailed: string;
};

export const rplArticleUi: Record<TechnicalArticleLocale, RplArticleUi> = {
  "zh-CN": {
    contents: "本文目录",
    sections: ["选型要看哪些参数", "三个 RPL 型号对比", "不同应用怎么选", "怎样验证实际加液", "常见选型问题"],
    productAlt: "单头无阀计量泵外观",
    share: "分享文章",
    shareLabels: { facebook: "分享到 Facebook", linkedin: "分享到 LinkedIn", x: "分享到 X", copy: "复制文章链接" },
    previewNotice: "当前为本地预览，文章尚未上线，暂不提供公开分享链接。",
    copied: "文章链接已复制。",
    copyFailed: "未能自动复制，请从浏览器地址栏复制文章链接。",
  },
  en: {
    contents: "On this page",
    sections: ["Selection parameters", "Compare three RPL models", "Application requirements", "Verify actual delivery", "Common questions"],
    productAlt: "single-head valveless metering pump",
    share: "Share this article",
    shareLabels: { facebook: "Share on Facebook", linkedin: "Share on LinkedIn", x: "Share on X", copy: "Copy article link" },
    previewNotice: "This is a local preview. The article is not published, so a public sharing link is not available yet.",
    copied: "Article link copied.",
    copyFailed: "Could not copy automatically. Please copy the article link from your browser’s address bar.",
  },
  es: {
    contents: "En esta página",
    sections: ["Parámetros de selección", "Comparar tres modelos RPL", "Requisitos por aplicación", "Verificar la entrega real", "Preguntas frecuentes"],
    productAlt: "bomba dosificadora sin válvulas de un cabezal",
    share: "Compartir este artículo",
    shareLabels: { facebook: "Compartir en Facebook", linkedin: "Compartir en LinkedIn", x: "Compartir en X", copy: "Copiar enlace del artículo" },
    previewNotice: "Esta es una vista previa local. El artículo aún no está publicado y no dispone de un enlace público para compartir.",
    copied: "Enlace del artículo copiado.",
    copyFailed: "No se pudo copiar automáticamente. Copie el enlace desde la barra de direcciones del navegador.",
  },
  fr: {
    contents: "Sommaire",
    sections: ["Paramètres de sélection", "Comparer trois modèles RPL", "Exigences par application", "Vérifier le dosage réel", "Questions fréquentes"],
    productAlt: "pompe doseuse sans clapet à une tête",
    share: "Partager cet article",
    shareLabels: { facebook: "Partager sur Facebook", linkedin: "Partager sur LinkedIn", x: "Partager sur X", copy: "Copier le lien de l’article" },
    previewNotice: "Il s’agit d’un aperçu local. L’article n’est pas encore publié et ne dispose pas de lien public à partager.",
    copied: "Lien de l’article copié.",
    copyFailed: "La copie automatique a échoué. Copiez le lien depuis la barre d’adresse de votre navigateur.",
  },
  ko: {
    contents: "목차",
    sections: ["선정 시 확인할 사양", "RPL 세 모델 비교", "용도별 선정 기준", "실제 주입 성능 검증", "자주 묻는 질문"],
    productAlt: "단일 헤드 무밸브 정량펌프",
    share: "글 공유",
    shareLabels: { facebook: "Facebook에 공유", linkedin: "LinkedIn에 공유", x: "X에 공유", copy: "글 링크 복사" },
    previewNotice: "현재 로컬 미리보기입니다. 아직 게시되지 않은 글이므로 공개 공유 링크를 제공하지 않습니다.",
    copied: "글 링크가 복사되었습니다.",
    copyFailed: "자동으로 복사하지 못했습니다. 브라우저 주소창에서 링크를 복사해 주세요.",
  },
  ru: {
    contents: "Содержание",
    sections: ["Параметры выбора", "Сравнение трёх моделей RPL", "Требования применения", "Проверка фактической подачи", "Частые вопросы"],
    productAlt: "одноголовочный бесклапанный дозирующий насос",
    share: "Поделиться статьёй",
    shareLabels: { facebook: "Поделиться в Facebook", linkedin: "Поделиться в LinkedIn", x: "Поделиться в X", copy: "Скопировать ссылку на статью" },
    previewNotice: "Это локальный предпросмотр. Статья ещё не опубликована, поэтому публичная ссылка для отправки недоступна.",
    copied: "Ссылка на статью скопирована.",
    copyFailed: "Не удалось скопировать автоматически. Скопируйте ссылку из адресной строки браузера.",
  },
};
