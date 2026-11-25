import type { LocaleCode } from '@/data/languages';
import { industrialInkjetPrinting } from './industrial-inkjet-printing';
import type inkjetRoutes from './industrial-inkjet-routes.json';

export type InkjetLocale = Exclude<LocaleCode, 'zh-CN'>;
export type InkjetRouteKey = keyof typeof inkjetRoutes;
export const inkjetSceneKeys = ['supply', 'recirculation', 'cleaning'] as const;
type SceneKey = typeof inkjetSceneKeys[number];

type InkjetNavigationCopy = {
  labels: Record<InkjetRouteKey, string>;
  pumpGroup: string;
  groupOverview: string;
  sceneAlts: Record<SceneKey, string>;
  summary: string;
  imageAlt: string;
  photoCredits: string;
  choiceTitle: string;
  choicePrompts: readonly [string, string];
};

const inkjet = industrialInkjetPrinting;
const [supply, recirculation, cleaning] = inkjet.scenes;
const navigation: Record<InkjetLocale, InkjetNavigationCopy> = {
  en: {
    labels: {
      hub: inkjet.title, guide: inkjet.guide.title, supply: supply.title,
      recirculation: recirculation.title, cleaning: cleaning.title,
      connectionGuide: inkjet.connectionGuide.title,
      fixedInkLines: inkjet.connectionGuide.tasks[0].title,
      inkTankQuickDisconnects: inkjet.connectionGuide.tasks[1].title,
      flowControlGuide: inkjet.flowControlGuide.title,
      inkFiltration: inkjet.flowControlGuide.tasks[0].title,
      cleaningFluidSwitching: inkjet.flowControlGuide.tasks[1].title,
    },
    pumpGroup: 'Diaphragm pump selection',
    groupOverview: 'Overview',
    sceneAlts: {
      supply: supply.menuPhoto.alt,
      recirculation: recirculation.menuPhoto.alt,
      cleaning: cleaning.menuPhoto.alt,
    },
    summary: inkjet.summary,
    imageAlt: supply.alt,
    photoCredits: 'Photo credits',
    choiceTitle: 'Ink circuits in industrial printers',
    choicePrompts: ['Trace supply, return and waste lines', 'Investigate pressure loss across a filter'],
  },
  es: {
    labels: {
      hub: 'Impresión industrial por inyección de tinta', guide: 'Guía del circuito de tinta',
      supply: 'Bombas de reposición de tinta', recirculation: 'Bombas de recirculación de tinta',
      cleaning: 'Bombas de evacuación de tinta residual',
      connectionGuide: 'Selección de conjuntos de tubos y racores',
      fixedInkLines: 'Líneas fijas de tinta y conjuntos de tubos',
      inkTankQuickDisconnects: 'Acoplamientos rápidos para el cambio de depósitos',
      flowControlGuide: 'Filtración, válvulas antirretorno y control del flujo',
      inkFiltration: 'Filtración de tinta y válvulas antirretorno',
      cleaningFluidSwitching: 'Conmutación del líquido de limpieza y aislamiento de ramales',
    },
    pumpGroup: 'Selección de bombas de diafragma',
    groupOverview: 'Descripción general',
    sceneAlts: {
      supply: 'Bolsas de tinta reemplazables tras la tapa transparente de una impresora plana Océ Arizona 480 GT',
      recirculation: 'Impresora plana Mimaki UJF-3042HG con recirculación automática de tinta blanca',
      cleaning: 'Rasqueta y bandeja de recogida de tinta residual bajo un cabezal Xerox ColorQube',
    },
    summary: 'Alimentación, recirculación y retorno de tinta, limpieza del cabezal y recogida de tinta residual en impresoras industriales.',
    imageAlt: 'Esquema de depósitos, línea de alimentación, filtro y bomba de tinta en una impresora',
    photoCredits: 'Créditos fotográficos',
    choiceTitle: 'Circuitos de tinta en impresoras industriales',
    choicePrompts: ['Localizar la alimentación, el retorno y el desagüe', 'Investigar la pérdida de carga en el filtro'],
  },
  fr: {
    labels: {
      hub: 'Impression industrielle à jet d’encre', guide: 'Guide du circuit d’encre',
      supply: 'Pompes d’appoint en encre', recirculation: 'Pompes de recirculation d’encre',
      cleaning: 'Pompes de récupération d’encre usagée',
      connectionGuide: 'Choix des assemblages de tubes et des raccords',
      fixedInkLines: 'Conduites d’encre fixes et assemblages de tubes',
      inkTankQuickDisconnects: 'Raccords rapides pour le changement de réservoir',
      flowControlGuide: 'Filtration, clapets anti-retour et commande des circuits',
      inkFiltration: 'Filtration de l’encre et clapets anti-retour',
      cleaningFluidSwitching: 'Commutation du liquide de nettoyage et isolement des branches',
    },
    pumpGroup: 'Choix des pompes à membrane',
    groupOverview: 'Vue d’ensemble',
    sceneAlts: {
      supply: 'Poches d’encre remplaçables derrière le capot transparent d’une imprimante à plat Océ Arizona 480 GT',
      recirculation: 'Imprimante à plat Mimaki UJF-3042HG à recirculation automatique de l’encre blanche',
      cleaning: 'Raclette et bac de récupération des encres usées sous une tête Xerox ColorQube',
    },
    summary: 'Alimentation, recirculation et retour d’encre, nettoyage de la tête et collecte des encres usées sur les imprimantes industrielles.',
    imageAlt: 'Schéma des réservoirs, de la conduite d’alimentation, du filtre et de la pompe dans une imprimante',
    photoCredits: 'Crédits photographiques',
    choiceTitle: 'Circuits d’encre des imprimantes industrielles',
    choicePrompts: ['Repérer les lignes d’alimentation, de retour et de vidange', 'Examiner la perte de charge au filtre'],
  },
  ko: {
    labels: {
      hub: '산업용 잉크젯 인쇄', guide: '산업용 잉크젯 프린터 잉크 회로 가이드',
      supply: '잉크 보충 펌프', recirculation: '잉크 순환 펌프',
      cleaning: '폐잉크 회수 펌프',
      connectionGuide: '튜빙 어셈블리 및 피팅 선정',
      fixedInkLines: '고정식 잉크 라인과 튜빙 어셈블리',
      inkTankQuickDisconnects: '잉크 탱크 교체용 퀵 커플링',
      flowControlGuide: '잉크 여과, 역류 방지 및 유로 제어',
      inkFiltration: '잉크 여과와 체크 밸브',
      cleaningFluidSwitching: '세척액 전환 및 분기 유로 차단',
    },
    pumpGroup: '다이어프램 펌프 선정',
    groupOverview: '개요',
    sceneAlts: {
      supply: 'Océ Arizona 480 GT 평판 프린터의 투명 덮개 안에 있는 교체형 잉크 팩',
      recirculation: '흰색 잉크 자동 순환 기능이 있는 Mimaki UJF-3042HG 평판 프린터',
      cleaning: 'Xerox ColorQube 프린트헤드 아래의 와이퍼와 폐잉크 수거 트레이',
    },
    summary: '산업용 잉크젯 프린터에서 잉크를 공급·순환·회수하고 프린트헤드를 세척한 뒤 폐잉크를 수거하는 회로를 살펴봅니다.',
    imageAlt: '프린터 내부의 잉크 탱크, 공급 라인, 필터와 펌프를 나타낸 그림',
    photoCredits: '사진 출처',
    choiceTitle: '산업용 프린터의 잉크 회로',
    choicePrompts: ['공급·회수·폐잉크 배관 확인', '필터 전후 압력 강하 점검'],
  },
  ru: {
    labels: {
      hub: 'Промышленная струйная печать', guide: 'Руководство по чернильному тракту принтера',
      supply: 'Насосы долива чернил', recirculation: 'Насосы рециркуляции чернил',
      cleaning: 'Насосы откачки отработанных чернил',
      connectionGuide: 'Выбор трубок в сборе и фитингов',
      fixedInkLines: 'Стационарные чернильные линии и трубки в сборе',
      inkTankQuickDisconnects: 'Быстроразъёмные соединения для замены ёмкостей',
      flowControlGuide: 'Фильтрация, обратные клапаны и управление потоком',
      inkFiltration: 'Фильтрация чернил и обратные клапаны',
      cleaningFluidSwitching: 'Переключение подачи промывочной жидкости и отсечение ветвей',
    },
    pumpGroup: 'Выбор мембранного насоса',
    groupOverview: 'Обзор',
    sceneAlts: {
      supply: 'Сменные пакеты с чернилами за прозрачной крышкой планшетного принтера Océ Arizona 480 GT',
      recirculation: 'Планшетный принтер Mimaki UJF-3042HG с автоматической рециркуляцией белых чернил',
      cleaning: 'Ракель и лоток для сбора отработанных чернил под печатающей головкой Xerox ColorQube',
    },
    summary: 'Подача, рециркуляция и возврат чернил, очистка печатающей головки и сбор отработанных чернил в промышленных принтерах.',
    imageAlt: 'Схема резервуаров, линии подачи, фильтра и насоса в чернильном тракте принтера',
    photoCredits: 'Авторы фотографий',
    choiceTitle: 'Чернильные тракты промышленных принтеров',
    choicePrompts: ['Проследить линии подачи, возврата и слива', 'Проверить перепад давления на фильтре'],
  },
};

export function getInkjetNav(locale: InkjetLocale) {
  return navigation[locale];
}
