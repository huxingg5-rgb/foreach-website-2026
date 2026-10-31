// Shared localized ALT copy for selection cards and detail galleries.
// Match the image path so each photograph retains its description when reordered.
const imageRoot = "/images/products/pumps/valveless-pumps/";

const imageAltsEn: Record<string, string> = {
  "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 miniature valveless piston pump for analytical reagent dispensing",
  "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 OEM valveless rotary piston pump for lab automation",
  "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 ceramic piston metering pump for reagent filling",
  "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 dual-head valveless metering pump for IVD reagent dilution",
  "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 dual-head piston metering pump for laboratory proportional dosing",
  "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 miniature piston metering pump with adjustable displacement",
  "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35 rotary piston pump with motor wiring",
  "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15 ceramic piston pump with model nameplate",
  "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15 rotary piston pump showing the drive mechanism",
  "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15 metering pump with displacement adjustment knob"
};

const localizedImageAlts: Record<string, Record<string, string>> = {
  "zh": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 微型无阀柱塞泵，用于分析仪器试剂分配",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 OEM 无阀旋转柱塞泵，用于实验室自动化",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 陶瓷柱塞计量泵，用于试剂灌装",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 双头无阀计量泵，用于体外诊断试剂稀释",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 双头柱塞计量泵，用于实验室比例加液",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 微型柱塞计量泵，排量可调",
    "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35 旋转柱塞泵，带电机接线",
    "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15 陶瓷柱塞泵，带型号铭牌",
    "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15 旋转柱塞泵，展示驱动机构",
    "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15 计量泵，带排量调节旋钮"
  },
  "es": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4, bomba miniatura de émbolo sin válvulas para dosificar reactivos en analizadores",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35, bomba OEM de émbolo rotativo sin válvulas para automatización de laboratorio",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15, bomba dosificadora de émbolo cerámico para llenado de reactivos",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109, bomba dosificadora sin válvulas de doble cabezal para diluir reactivos en diagnóstico in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119, bomba de émbolo y doble cabezal para dosificación proporcional en laboratorio",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35, bomba dosificadora miniatura de émbolo con volumen por vuelta ajustable",
    "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35, bomba de pistón rotativo con cableado del motor",
    "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15, bomba de pistón cerámico con placa de identificación del modelo",
    "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15, bomba de pistón rotativo, vista del mecanismo de accionamiento",
    "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15, bomba dosificadora con mando de ajuste del volumen por vuelta"
  },
  "fr": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4, pompe miniature à piston sans clapets pour le dosage de réactifs en analyse",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35, pompe OEM à piston rotatif sans clapets pour laboratoire automatisé",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15, pompe doseuse à piston céramique pour le remplissage de réactifs",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109, pompe doseuse sans clapets à double tête pour la dilution de réactifs en diagnostic in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119, pompe à piston à double tête pour le dosage proportionnel en laboratoire",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35, pompe doseuse miniature à piston à volume par tour réglable",
    "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35, pompe à piston rotatif avec câblage du moteur",
    "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15, pompe à piston céramique avec plaque signalétique du modèle",
    "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15, pompe à piston rotatif, vue du mécanisme d’entraînement",
    "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15, pompe doseuse avec molette de réglage du volume par tour"
  },
  "ko": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 분석기 시약 분주용 소형 무밸브 플런저 펌프",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 실험실 자동화용 OEM 무밸브 회전 플런저 펌프",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 시약 충전용 세라믹 플런저 정량 펌프",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 체외진단 시약 희석용 듀얼 헤드 무밸브 정량 펌프",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 실험실 비례 주입용 듀얼 헤드 플런저 정량 펌프",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 회전당 토출량 조절이 가능한 소형 플런저 정량 펌프",
    "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35 모터 배선이 있는 회전 피스톤 펌프",
    "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15 모델 명판이 있는 세라믹 피스톤 펌프",
    "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15 회전 피스톤 펌프의 구동 기구",
    "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15 회전당 토출량 조절 노브가 있는 정량 펌프"
  },
  "ru": {
    "foreach-rpl-p4-valveless-pump.webp": "FOREACH RPL-P4 — миниатюрный бесклапанный плунжерный насос для дозирования реагентов в анализаторах",
    "foreach-rpl-p635-valveless-pump.webp": "FOREACH RPL-P6.35 — бесклапанный ротационно-плунжерный OEM-насос для автоматизации лабораторий",
    "foreach-rpl-p15-valveless-pump.webp": "FOREACH RPL-P15 — насос-дозатор с керамическим плунжером для розлива реагентов",
    "foreach-drpl-0109-dual-head-valveless-pump.webp": "FOREACH DRPL-0109 — двухголовочный бесклапанный насос-дозатор для разведения реагентов в диагностике in vitro",
    "foreach-drpl-0119-dual-head-valveless-pump.webp": "FOREACH DRPL-0119 — двухголовочный плунжерный насос для пропорционального дозирования в лаборатории",
    "foreach-rpl-p635-valveless-pump-photo-02.webp": "FOREACH RPL-P6.35 — миниатюрный плунжерный насос-дозатор с регулируемым объемом за оборот",
    "foreach-rpl-p635-rotary-piston-pump-wiring.webp": "FOREACH RPL-P6.35 — ротационно-плунжерный насос с проводкой двигателя",
    "foreach-rpl-p15-ceramic-piston-pump-nameplate.webp": "FOREACH RPL-P15 — насос с керамическим плунжером и табличкой модели",
    "foreach-rpl-p15-rotary-piston-pump-drive.webp": "FOREACH RPL-P15 — ротационно-плунжерный насос, вид приводного механизма",
    "foreach-rpl-p15-metering-pump-adjustment.webp": "FOREACH RPL-P15 — насос-дозатор с ручкой регулировки объема за оборот"
  }
};

const frontAngleImageAlts: Record<string, (model: string) => string> = {
  en: (model) => `FOREACH ${model} valveless metering pump, front three-quarter view`,
  zh: (model) => `FOREACH ${model} 无阀计量泵正侧面实物图`,
  es: (model) => `FOREACH ${model}, bomba dosificadora sin válvulas, vista frontal en perspectiva`,
  fr: (model) => `FOREACH ${model}, pompe doseuse sans clapets, vue de trois quarts avant`,
  ko: (model) => `FOREACH ${model} 무밸브 정량 펌프 전면 사선 실물 사진`,
  ru: (model) => `FOREACH ${model} — бесклапанный насос-дозатор, вид спереди в три четверти`,
};

// Describe each supplied RPL view with a distinct, relevant product term.
const rplSupplementaryImageAlts: Record<string, Record<string, string>> = {
  "foreach-rpl-p15-ceramic-piston-dosing-pump-front-view.webp": {
    "en": "FOREACH RPL-P15 ceramic piston dosing pump, front view showing the displacement adjustment knob",
    "zh": "FOREACH RPL-P15 陶瓷柱塞定量加液泵正面图，展示排量调节旋钮",
    "es": "FOREACH RPL-P15, bomba dosificadora de pistón cerámico, vista frontal con mando de ajuste del volumen por vuelta",
    "fr": "FOREACH RPL-P15, pompe doseuse à piston céramique, vue de face avec molette de réglage du volume par tour",
    "ko": "FOREACH RPL-P15 세라믹 피스톤 정량 펌프 정면, 회전당 토출량 조절 노브",
    "ru": "FOREACH RPL-P15 — дозирующий насос с керамическим плунжером, вид спереди с ручкой регулировки объема за оборот"
  },
  "foreach-rpl-p15-rotary-piston-metering-pump-head-detail.webp": {
    "en": "FOREACH RPL-P15 rotary piston metering pump, close-up of the pump head, black connectors and drive mechanism",
    "zh": "FOREACH RPL-P15 旋转柱塞计量泵细节，展示泵头、黑色接头及驱动机构",
    "es": "FOREACH RPL-P15, bomba dosificadora de pistón rotativo, detalle del cabezal, los conectores negros y el mecanismo de accionamiento",
    "fr": "FOREACH RPL-P15, pompe doseuse à piston rotatif, détail de la tête, des raccords noirs et du mécanisme d’entraînement",
    "ko": "FOREACH RPL-P15 회전 피스톤 정량 펌프, 펌프 헤드와 검은색 커넥터 및 구동 기구 상세",
    "ru": "FOREACH RPL-P15 — ротационно-плунжерный насос-дозатор, крупный план головки, черных соединителей и приводного механизма"
  },
  "foreach-rpl-p15-reagent-dispensing-pump-barbed-ports-detail.webp": {
    "en": "FOREACH RPL-P15 reagent dispensing pump, close-up of the pump head with barbed hose connectors",
    "zh": "FOREACH RPL-P15 试剂分配泵泵头特写，展示倒刺软管接头",
    "es": "FOREACH RPL-P15, bomba dispensadora de reactivos, detalle del cabezal con conectores de espiga para manguera",
    "fr": "FOREACH RPL-P15, pompe de distribution de réactifs, gros plan de la tête avec raccords cannelés pour tuyaux souples",
    "ko": "FOREACH RPL-P15 시약 분주 펌프, 바브형 호스 커넥터가 장착된 펌프 헤드 확대 사진",
    "ru": "FOREACH RPL-P15 — насос для дозирования реагентов, крупный план головки со штуцерами-елочками для шлангов"
  },
  "foreach-rpl-p635-ceramic-piston-dosing-pump-front-view.webp": {
    "en": "FOREACH RPL-P6.35 ceramic piston dosing pump, front view showing the pump head and displacement adjustment knob",
    "zh": "FOREACH RPL-P6.35 陶瓷柱塞定量加液泵正面图，展示泵头及排量调节旋钮",
    "es": "FOREACH RPL-P6.35, bomba dosificadora de pistón cerámico, vista frontal del cabezal y del mando de ajuste del volumen por vuelta",
    "fr": "FOREACH RPL-P6.35, pompe doseuse à piston céramique, vue de face de la tête et de la molette de réglage du volume par tour",
    "ko": "FOREACH RPL-P6.35 세라믹 피스톤 정량 펌프 정면, 펌프 헤드와 회전당 토출량 조절 노브",
    "ru": "FOREACH RPL-P6.35 — дозирующий насос с керамическим плунжером, вид спереди на головку и ручку регулировки объема за оборот"
  },
  "foreach-rpl-p635-reagent-dispensing-pump-head-ports-detail.webp": {
    "en": "FOREACH RPL-P6.35 reagent dispensing pump, close-up of the pump head, fluid ports and rotary piston drive",
    "zh": "FOREACH RPL-P6.35 试剂分配泵细节，展示泵头、液路接口及旋转柱塞驱动机构",
    "es": "FOREACH RPL-P6.35, bomba dispensadora de reactivos, detalle del cabezal, los puertos de fluido y el accionamiento del pistón rotativo",
    "fr": "FOREACH RPL-P6.35, pompe de distribution de réactifs, détail de la tête, des raccordements fluidiques et de l’entraînement du piston rotatif",
    "ko": "FOREACH RPL-P6.35 시약 분주 펌프, 펌프 헤드와 유체 포트 및 회전 피스톤 구동 기구 상세",
    "ru": "FOREACH RPL-P6.35 — насос для дозирования реагентов, крупный план головки, жидкостных портов и привода вращающегося плунжера"
  },
  "foreach-rpl-p4-rotary-piston-metering-pump-drive-wiring-view.webp": {
    "en": "FOREACH RPL-P4 rotary piston metering pump, angled view showing the drive mechanism and motor wiring",
    "zh": "FOREACH RPL-P4 旋转柱塞计量泵侧面图，展示驱动机构及电机接线",
    "es": "FOREACH RPL-P4, bomba dosificadora de pistón rotativo, vista en perspectiva del mecanismo de accionamiento y el cableado del motor",
    "fr": "FOREACH RPL-P4, pompe doseuse à piston rotatif, vue en perspective du mécanisme d’entraînement et du câblage du moteur",
    "ko": "FOREACH RPL-P4 회전 피스톤 정량 펌프 측면, 구동 기구와 모터 배선",
    "ru": "FOREACH RPL-P4 — ротационно-плунжерный насос-дозатор, вид под углом на приводной механизм и проводку двигателя"
  },
  "foreach-rpl-p4-valveless-pump-assembly.webp": {
    "en": "FOREACH RPL-P4 miniature valveless piston pump, assembly view",
    "zh": "FOREACH RPL-P4 微型无阀柱塞泵装配图",
    "es": "FOREACH RPL-P4, bomba miniatura de pistón sin válvulas, vista del conjunto",
    "fr": "FOREACH RPL-P4, pompe miniature à piston sans clapets, vue d’ensemble",
    "ko": "FOREACH RPL-P4 소형 무밸브 피스톤 펌프 조립체",
    "ru": "FOREACH RPL-P4 — миниатюрный бесклапанный плунжерный насос, вид в сборе"
  },
  "foreach-rpl-p4-ceramic-piston-pump-front.webp": {
    "en": "FOREACH RPL-P4 ceramic piston pump for microdispensing, front view",
    "zh": "FOREACH RPL-P4 微量分配用陶瓷柱塞泵正面图",
    "es": "FOREACH RPL-P4, bomba de pistón cerámico para microdosificación, vista frontal",
    "fr": "FOREACH RPL-P4, pompe à piston céramique pour le microdosage, vue de face",
    "ko": "FOREACH RPL-P4 미량 분주용 세라믹 피스톤 펌프 정면",
    "ru": "FOREACH RPL-P4 — насос с керамическим плунжером для микродозирования, вид спереди"
  },
  "foreach-rpl-p635-valveless-pump-drive-wiring.webp": {
    "en": "FOREACH RPL-P6.35 valveless metering pump showing the drive assembly and wiring",
    "zh": "FOREACH RPL-P6.35 无阀计量泵，展示驱动组件及接线",
    "es": "FOREACH RPL-P6.35, bomba dosificadora sin válvulas, vista del conjunto de accionamiento y el cableado",
    "fr": "FOREACH RPL-P6.35, pompe doseuse sans clapets, vue de l’ensemble d’entraînement et du câblage",
    "ko": "FOREACH RPL-P6.35 무밸브 정량 펌프의 구동 어셈블리와 배선",
    "ru": "FOREACH RPL-P6.35 — бесклапанный насос-дозатор, вид приводного узла и проводки"
  }
};

export function getValvelessPumpImageAlt(imagePath: string, locale: string): string | undefined {
  if (!imagePath.startsWith(imageRoot)) return undefined;
  const filename = imagePath.slice(imageRoot.length);
  const supplementaryAlt = rplSupplementaryImageAlts[filename]?.[locale];
  if (supplementaryAlt) return supplementaryAlt;
  const photo = /^foreach-(rpl-p4|rpl-p635|rpl-p15)-valveless-metering-pump-front-angle(?:-card)?\.webp$/.exec(filename);
  if (photo) {
    const model = photo[1] === "rpl-p635" ? "RPL-P6.35" : photo[1].toUpperCase();
    return frontAngleImageAlts[locale]?.(model);
  }
  const copy = locale === "en" ? imageAltsEn : localizedImageAlts[locale];
  return copy?.[filename];
}
