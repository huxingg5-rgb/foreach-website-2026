import sharedCopy from 'shared-cad-copy';
import {fittingText} from '../../../data/products/detail/fitting-ui.intl.ts';

const locales=['zh','en','es','fr','ko','ru'];
const rows=[
 ['外形尺寸','Dimensions','Dimensiones','Dimensions','외형 치수','Габариты'],
 ['公端组合','Male assembly','Conjunto macho','Ensemble mâle','수형 조합','Комплект штекера'],
 ['对接组合','Mated assembly','Conjunto acoplado','Ensemble accouplé','연결 조합','Состыкованный комплект'],
 ['公端总成','Male assembly','Conjunto macho','Ensemble mâle','수형 조합','Комплект штекера'],
 ['旋转锁圈公端','Rotating-collar male','Macho con anillo giratorio','Mâle à bague rotative','회전 링 수형','Штекер с вращающейся муфтой'],
 ['一体式公端','One-piece male','Macho de una pieza','Mâle monobloc','일체형 수형','Цельный штекер'],
 ['长 L','Length L','Longitud L','Longueur L','길이 L','Длина L'],
 ['宽 W','Width W','Ancho W','Largeur W','너비 W','Ширина W'],
 ['高 H','Height H','Altura H','Hauteur H','높이 H','Высота H'],
 ['软管内径','Tubing ID','DI del tubo','DI du tube','튜브 내경','Внутренний диаметр трубки'],
 ['查看方式','View mode','Modo de vista','Mode de vue','보기 방식','Режим просмотра'],
 ['二维图纸型号','Drawing model','Modelo del plano','Modèle du plan','도면 모델','Модель чертежа'],
 ['当前鲁尔零件的 2D 图纸','2D drawing of the current Luer part','Plano 2D de la pieza Luer actual','Plan 2D de la pièce Luer actuelle','현재 루어 부품의 2D 도면','2D-чертёж текущей детали Люэра'],
 ['面板厚度（mm）','Panel thickness (mm)','Espesor del panel (mm)','Épaisseur du panneau (mm)','패널 두께(mm)','Толщина панели (mm)'],
 ['面板厚度，单位毫米','Panel thickness in millimeters','Espesor del panel en milímetros','Épaisseur du panneau en millimètres','패널 두께, 밀리미터','Толщина панели в миллиметрах'],
 ['0–3.5 mm；面板未显示。','0–3.5 mm; panel not shown.','0–3.5 mm; panel no mostrado.','0–3.5 mm ; panneau non représenté.','0–3.5 mm, 패널은 표시하지 않습니다.','0–3.5 mm; панель не показана.'],
 ['尺寸为 3D 模型外包络参考值，工程安装以二维图纸为准。','3D dimensions are overall-envelope references; use the 2D drawing for engineering installation.','Las cotas 3D son referencias de la envolvente; use el plano 2D para el montaje.','Les cotes 3D indiquent l’encombrement de référence ; utilisez le plan 2D pour le montage.','3D 치수는 외곽 참고값입니다. 실제 설치는 2D 도면을 따르세요.','Габариты 3D-модели справочные; для монтажа используйте 2D-чертёж.'],
 ['尺寸为模型外形参考值，安装以二维图纸为准。','Model dimensions are for reference; use the 2D drawing for installation.','Cotas del modelo como referencia; montaje según plano 2D.','Dimensions du modèle à titre indicatif ; montage selon plan 2D.','모델 치수는 참고용이며 설치는 2D 도면을 따릅니다.','Размеры модели справочные; монтаж по 2D-чертежу.'],
 ['鲁尔模型加载失败，请重试。','Unable to load the Luer model. Retry.','No se pudo cargar el modelo Luer. Reintente.','Chargement du modèle Luer impossible. Réessayez.','루어 모델을 불러오지 못했습니다. 다시 시도하세요.','Не удалось загрузить модель Люэра. Повторите.'],
 ['正在加载鲁尔组合模型…','Loading Luer assembly…','Cargando conjunto Luer…','Chargement de l’ensemble Luer…','루어 조합 불러오는 중…','Загрузка комплекта Люэра…'],
 ['正在加载鲁尔模型…','Loading Luer model…','Cargando modelo Luer…','Chargement du modèle Luer…','루어 모델 불러오는 중…','Загрузка модели Люэра…'],
 ['可旋转的鲁尔接头 3D 模型','Interactive Luer 3D model','Modelo 3D Luer interactivo','Modèle 3D Luer interactif','회전 가능한 루어 3D 모델','Интерактивная 3D-модель Люэра'],
 ['剖切','Section','Sección','Coupe','단면','Сечение'],
 ['剖切视图','Section view','Vista en sección','Vue en coupe','단면 보기','Вид в сечении'],
 ['剖切方向','Section axis','Eje de sección','Axe de coupe','단면 축','Ось сечения'],
 ['剖切位置','Section position','Posición de sección','Position de coupe','단면 위치','Положение сечения'],
 ['方向','Axis','Eje','Axe','축','Ось'],
 ['移动滑块查看内部 · 切口不封面','Move the slider to inspect the interior; cut faces are not capped.','Mueva el deslizador para ver el interior; los cortes quedan abiertos.','Déplacez le curseur pour voir l’intérieur ; les coupes restent ouvertes.','슬라이더로 내부를 확인하세요. 절단면은 채워지지 않습니다.','Перемещайте ползунок для просмотра внутри; срезы остаются открытыми.'],
 ['操作说明','Instructions','Instrucciones','Instructions','조작 안내','Инструкции'],
 ['关闭帮助','Close help','Cerrar ayuda','Fermer l’aide','도움말 닫기','Закрыть справку'],
 ['旋转模型','Rotate model','Girar modelo','Tourner le modèle','모델 회전','Вращение модели'],
 ['左键拖动 / 单指拖动','Left drag / one-finger drag','Arrastre izquierdo / un dedo','Glissement gauche / un doigt','왼쪽 버튼 / 한 손가락 드래그','Левой кнопкой / одним пальцем'],
 ['缩放','Zoom','Zoom','Zoom','확대/축소','Масштаб'],
 ['滚轮 / 双指缩放','Wheel / pinch','Rueda / pellizco','Molette / pincement','휠 / 두 손가락 확대','Колесо / щипок'],
 ['平移','Pan','Desplazar','Déplacer','이동','Смещение'],
 ['右键拖动 / 双指拖动','Right drag / two-finger drag','Arrastre derecho / dos dedos','Glissement droit / deux doigts','오른쪽 버튼 / 두 손가락 드래그','Правой кнопкой / двумя пальцами'],
 ['透明','Transparent','Transparente','Transparent','투명','Прозрачный'],
 ['鲁尔接头 · 2D / 3D','Luer fittings · 2D / 3D','Racores Luer · 2D / 3D','Raccords Luer · 2D / 3D','루어 피팅 · 2D / 3D','Фитинги Люэра · 2D / 3D'],
];
// Reuse the same reviewed toolbar translations as the other CAD families.
sharedCopy.zh.forEach((text,i)=>{
 const parts=text.split('|');
 parts.forEach((part,j)=>rows.push(locales.map(locale=>sharedCopy[locale][i].split('|')[j])));
});
const table=new Map(rows.map(row=>[row[0],row]));
export function getLuerCadText(locale) {
 const index=Math.max(0,locales.indexOf(locale));
 return function t(text) {
  if(index===0||!/[\u3400-\u9fff]/.test(text))return text;
  const lead=text.match(/^\s*/)[0],tail=text.match(/\s*$/)[0],key=text.trim();
  if(table.has(key))return lead+table.get(key)[index]+tail;
  if(key.endsWith('单件'))return t(key.slice(0,-2))+' · '+fittingText('单件选购',locale);
  if(key.includes(' · '))return key.split(' · ').map(t).join(' · ');
  if(key.startsWith('软管内径 '))return t('软管内径')+' '+key.slice(5);
  if(key==='复位 · Home')return t('复位')+' · Home';
  return fittingText(text,locale);
 };
}
