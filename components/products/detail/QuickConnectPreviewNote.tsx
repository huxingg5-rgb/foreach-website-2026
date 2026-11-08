import pilot from "@/data/products/detail/quick-connect-pilot-preview.json";
import styles from "./product-detail.module.css";

const notes = {
   zh:['如需查看不同尺寸的母端，请在上方“搭配选型”中选择搭配型号；如需更换公端，请返回','快插接头选型页面','重新选择。'],
   en:['To view a different female size, use “Change mating end” above. To change the male end, return to the ','quick-connect fitting selector','.'],
   es:['Para ver otro tamaño hembra, seleccione el extremo complementario arriba. Para cambiar el macho, vuelva al ','selector de racores rápidos','.'],
   fr:['Pour voir une autre taille femelle, choisissez le raccord associé en haut. Pour changer le mâle, revenez au ','sélecteur de raccords rapides','.'],
   ko:['다른 암형 크기는 위에서 연결 모델을 선택하세요. 수형을 바꾸려면 ','퀵 커넥트 피팅 선택 페이지','에서 다시 선택하세요.'],
   ru:['Для другого размера гнезда выберите ответную часть выше. Для замены штекера вернитесь в ','каталог быстроразъёмных фитингов','.'],
  } as const;

export default function QuickConnectPreviewNote({ model, locale }: { model: string; locale: string }) {
  if (model !== pilot.baseModel) return null;
  const language = locale === "zh-CN" ? "zh" : locale;
  const text = notes[language as keyof typeof notes] || notes.en;
  const href = `${language === "zh" ? "" : `/${language}`}/products/fittings/quick-connect-fittings/`;
  return (
    <p className={styles.quickConnectPairNote} data-quick-connect-preview-note="true">
      {text[0]}<a href={href}>{text[1]}</a>{text[2]}
    </p>
  );
}
