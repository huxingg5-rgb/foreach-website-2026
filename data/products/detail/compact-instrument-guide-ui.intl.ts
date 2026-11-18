const copy = {
  zh: {
    selection: "选型与使用", configuration: "选型与配置", integration: "装机与接入",
    item: "选型项目", model: "型号", checks: "配置与确认", symptom: "现象", action: "检查与处理",
    drawing: "2D 图纸", tubeOd: "管外径", closed: "常闭", open: "常开", enlarge: "查看原图",
  },
  en: {
    selection: "Selection and use", configuration: "Selecting a configuration", integration: "Installation and integration",
    item: "Selection criterion", model: "Model", checks: "Specifications and checks", symptom: "Symptom", action: "What to check",
    drawing: "2D drawing (PDF)", tubeOd: "Tubing OD", closed: "Normally closed", open: "Normally open", enlarge: "View full-size image",
  },
  es: {
    selection: "Selección y uso", configuration: "Elección de la configuración", integration: "Montaje e integración",
    item: "Criterio de selección", model: "Modelo", checks: "Configuración y comprobaciones", symptom: "Síntoma", action: "Comprobaciones y acciones",
    drawing: "Plano 2D (PDF)", tubeOd: "Diámetro exterior", closed: "Normalmente cerrada", open: "Normalmente abierta", enlarge: "Ver imagen a tamaño completo",
  },
  fr: {
    selection: "Sélection et utilisation", configuration: "Choix de la configuration", integration: "Montage et intégration",
    item: "Critère de choix", model: "Modèle", checks: "Configuration et points à vérifier", symptom: "Symptôme", action: "Vérifications et mesures à prendre",
    drawing: "Plan 2D (PDF)", tubeOd: "Diamètre extérieur du tube", closed: "Fermée au repos", open: "Ouverte au repos", enlarge: "Voir l’image en plein format",
  },
  ko: {
    selection: "선정 및 사용", configuration: "모델 및 구성 선정", integration: "장착 및 시스템 연동",
    item: "선정 항목", model: "모델", checks: "구성 및 확인 사항", symptom: "증상", action: "점검 및 조치",
    drawing: "2D 도면(PDF)", tubeOd: "튜브 외경", closed: "상시 닫힘", open: "상시 열림", enlarge: "원본 이미지 보기",
  },
  ru: {
    selection: "Выбор и эксплуатация", configuration: "Выбор исполнения", integration: "Монтаж и подключение",
    item: "Критерий выбора", model: "Модель", checks: "Исполнение и проверки", symptom: "Симптом", action: "Что проверить и как устранить",
    drawing: "Чертёж 2D (PDF)", tubeOd: "Наружный диаметр трубки", closed: "Нормально закрытый", open: "Нормально открытый", enlarge: "Открыть изображение целиком",
  },
} as const;

export function getCompactInstrumentGuideUi(locale: string) {
  return copy[locale as keyof typeof copy] ?? copy.zh;
}
