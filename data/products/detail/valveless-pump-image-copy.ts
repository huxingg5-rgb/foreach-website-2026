// Shared localized ALT copy for selection cards and detail galleries.
// Match the image path so each photograph retains its description when reordered.
const imageRoot = "/images/products/pumps/valveless-pumps/";

const imageAltsEn: Record<string, string> = {
  "foreach-rpl-p4-valveless-pump.webp":
    "FOREACH RPL-P4 miniature valveless piston pump for analytical reagent dispensing",
  "foreach-rpl-p635-valveless-pump.webp":
    "FOREACH RPL-P6.35 OEM valveless rotary piston pump for lab automation",
  "foreach-rpl-p15-valveless-pump.webp":
    "FOREACH RPL-P15 ceramic piston metering pump for reagent filling",
  "foreach-drpl-0109-dual-head-valveless-pump.webp":
    "FOREACH DRPL-0109 dual-head valveless metering pump for IVD reagent dilution",
  "foreach-drpl-0119-dual-head-valveless-pump.webp":
    "FOREACH DRPL-0119 dual-head piston metering pump for laboratory proportional dosing",
  "foreach-rpl-p635-valveless-pump-photo-01.webp":
    "FOREACH RPL-P6.35 rotary piston pump with wiring assembly for IVD",
  "foreach-rpl-p635-valveless-pump-photo-02.webp":
    "FOREACH RPL-P6.35 miniature piston metering pump with adjustable displacement",
  "foreach-rpl-p15-valveless-pump-photo-01.webp":
    "FOREACH RPL-P15 ceramic piston metering pump showing the model nameplate",
  "foreach-rpl-p15-valveless-pump-photo-02.webp":
    "FOREACH RPL-P15 rotary piston metering pump showing the drive mechanism",
  "foreach-rpl-p15-valveless-pump-photo-03.webp":
    "FOREACH RPL-P15 piston metering pump with displacement adjustment knob",
};

const localizedImageAlts: Record<string, Record<string, string>> = {
  "zh": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 微型无阀柱塞泵，用于分析仪器试剂分配",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 OEM 无阀旋转柱塞泵，用于实验室自动化",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 陶瓷柱塞计量泵，用于试剂灌装",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 双头无阀计量泵，用于体外诊断试剂稀释",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 双头柱塞计量泵，用于实验室比例加液",
    "foreach-rpl-p635-valveless-pump-photo-01.webp": "FOREACH RPL-P6.35 旋转柱塞泵，带接线组件，用于体外诊断",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 微型柱塞计量泵，排量可调",
    "foreach-rpl-p15-valveless-pump-photo-01.webp": "FOREACH RPL-P15 陶瓷柱塞计量泵，展示型号铭牌",
    "foreach-rpl-p15-valveless-pump-photo-02.webp": "FOREACH RPL-P15 旋转柱塞计量泵，展示驱动机构",
    "foreach-rpl-p15-valveless-pump-photo-03.webp": "FOREACH RPL-P15 柱塞计量泵，带排量调节旋钮"
  },
  "es": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4, bomba miniatura de émbolo sin válvulas para dosificar reactivos en analizadores",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35, bomba OEM de émbolo rotativo sin válvulas para automatización de laboratorio",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15, bomba dosificadora de émbolo cerámico para llenado de reactivos",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109, bomba dosificadora sin válvulas de doble cabezal para diluir reactivos en diagnóstico in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119, bomba de émbolo y doble cabezal para dosificación proporcional en laboratorio",
    "foreach-rpl-p635-valveless-pump-photo-01.webp": "FOREACH RPL-P6.35, bomba de émbolo rotativo con conjunto de cableado para diagnóstico in vitro",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35, bomba dosificadora miniatura de émbolo con volumen por vuelta ajustable",
    "foreach-rpl-p15-valveless-pump-photo-01.webp": "FOREACH RPL-P15, bomba dosificadora de émbolo cerámico con placa de identificación visible",
    "foreach-rpl-p15-valveless-pump-photo-02.webp": "FOREACH RPL-P15, bomba dosificadora de émbolo rotativo con mecanismo de accionamiento visible",
    "foreach-rpl-p15-valveless-pump-photo-03.webp": "FOREACH RPL-P15, bomba dosificadora de émbolo con mando de ajuste del volumen por vuelta"
  },
  "fr": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4, pompe miniature à piston sans clapets pour le dosage de réactifs en analyse",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35, pompe OEM à piston rotatif sans clapets pour laboratoire automatisé",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15, pompe doseuse à piston céramique pour le remplissage de réactifs",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109, pompe doseuse sans clapets à double tête pour la dilution de réactifs en diagnostic in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119, pompe à piston à double tête pour le dosage proportionnel en laboratoire",
    "foreach-rpl-p635-valveless-pump-photo-01.webp": "FOREACH RPL-P6.35, pompe à piston rotatif avec faisceau de câbles pour le diagnostic in vitro",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35, pompe doseuse miniature à piston à volume par tour réglable",
    "foreach-rpl-p15-valveless-pump-photo-01.webp": "FOREACH RPL-P15, pompe doseuse à piston céramique avec plaque signalétique visible",
    "foreach-rpl-p15-valveless-pump-photo-02.webp": "FOREACH RPL-P15, pompe doseuse à piston rotatif avec mécanisme d’entraînement visible",
    "foreach-rpl-p15-valveless-pump-photo-03.webp": "FOREACH RPL-P15, pompe doseuse à piston avec molette de réglage du volume par tour"
  },
  "ko": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 분석기 시약 분주용 소형 무밸브 플런저 펌프",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 실험실 자동화용 OEM 무밸브 회전 플런저 펌프",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 시약 충전용 세라믹 플런저 정량 펌프",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 체외진단 시약 희석용 듀얼 헤드 무밸브 정량 펌프",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 실험실 비례 주입용 듀얼 헤드 플런저 정량 펌프",
    "foreach-rpl-p635-valveless-pump-photo-01.webp": "FOREACH RPL-P6.35 배선 어셈블리가 장착된 체외진단용 회전 플런저 펌프",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 회전당 토출량 조절이 가능한 소형 플런저 정량 펌프",
    "foreach-rpl-p15-valveless-pump-photo-01.webp": "FOREACH RPL-P15 모델 명판이 보이는 세라믹 플런저 정량 펌프",
    "foreach-rpl-p15-valveless-pump-photo-02.webp": "FOREACH RPL-P15 구동 기구가 보이는 회전 플런저 정량 펌프",
    "foreach-rpl-p15-valveless-pump-photo-03.webp": "FOREACH RPL-P15 토출량 조절 노브가 장착된 플런저 정량 펌프"
  },
  "ru": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 — миниатюрный бесклапанный плунжерный насос для дозирования реагентов в анализаторах",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 — бесклапанный ротационно-плунжерный OEM-насос для автоматизации лабораторий",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 — насос-дозатор с керамическим плунжером для розлива реагентов",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 — двухголовочный бесклапанный насос-дозатор для разведения реагентов в диагностике in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 — двухголовочный плунжерный насос для пропорционального дозирования в лаборатории",
    "foreach-rpl-p635-valveless-pump-photo-01.webp": "FOREACH RPL-P6.35 — ротационно-плунжерный насос с кабельной сборкой для диагностики in vitro",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 — миниатюрный плунжерный насос-дозатор с регулируемым объемом за оборот",
    "foreach-rpl-p15-valveless-pump-photo-01.webp": "FOREACH RPL-P15 — насос-дозатор с керамическим плунжером, видна заводская табличка",
    "foreach-rpl-p15-valveless-pump-photo-02.webp": "FOREACH RPL-P15 — ротационно-плунжерный насос-дозатор, виден приводной механизм",
    "foreach-rpl-p15-valveless-pump-photo-03.webp": "FOREACH RPL-P15 — плунжерный насос-дозатор с ручкой регулировки объема за оборот"
  }
};

export function getValvelessPumpImageAlt(imagePath: string, locale: string): string | undefined {
  if (!imagePath.startsWith(imageRoot)) return undefined;
  const copy = locale === "en" ? imageAltsEn : localizedImageAlts[locale];
  return copy?.[imagePath.slice(imageRoot.length)];
}
