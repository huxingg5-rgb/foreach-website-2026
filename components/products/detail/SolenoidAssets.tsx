"use client";
import ProductCadViewer from "./ProductCadViewer";
import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import {fittingText} from "@/data/products/detail/fitting-ui.intl";
import {getSolenoidConfiguration, getSolenoidDrawingPdfUrl, getSolenoidModelAsset, solenoidConfigurationName} from "@/data/products/detail/solenoid-configurations";
const labels = {
  zh: ["常闭 NC", "常开 NO", "该配置的 3D 模型暂未提供", "暂时没有图纸", "阀形式"],
  en: ["Normally closed (NC)", "Normally open (NO)", "3D model not yet available for this configuration", "Drawing not yet available for this configuration", "Valve function"],
  es: ["Normalmente cerrada (NC)", "Normalmente abierta (NO)", "Modelo 3D aún no disponible para esta configuración", "Plano aún no disponible para esta configuración", "Función"],
  fr: ["Normalement fermée (NC)", "Normalement ouverte (NO)", "Modèle 3D non disponible pour cette configuration", "Plan non disponible pour cette configuration", "Fonction"],
  ko: ["상시 닫힘 (NC)", "상시 열림 (NO)", "이 구성의 3D 모델은 아직 제공되지 않습니다", "이 구성의 도면은 아직 제공되지 않습니다", "밸브 기능"],
  ru: ["Нормально закрытый (NC)", "Нормально открытый (NO)", "3D-модель этой конфигурации пока недоступна", "Чертёж этой конфигурации пока недоступен", "Функция клапана"],
};
export function SolenoidVariantSelector({slug, locale, variant, onVariant}: {
  slug: string; locale: string; variant: number; onVariant: (value: number) => void;
}) {
  const config = getSolenoidConfiguration(slug), text = labels[locale as keyof typeof labels] || labels.en;
  if (config?.key !== "two" || config.state) return null;
  return <div style={{display: "flex", justifyContent: "flex-end", padding: "8px 0 16px"}}>
    <select aria-label={text[4]} value={variant} onChange={e => onVariant(Number(e.target.value))} style={{padding: "9px 14px", border: "1px solid #dce3ed", borderRadius: 0, color: "#173368", background: "white", maxWidth: "100%"}}>
      <option value={0}>{text[0]}</option><option value={1}>{text[1]}</option>
    </select>
  </div>;
}
export default function SolenoidAssets({slug, locale, mode, active, variant, onVariant, externalResourceTabs = false}: {
  slug: string; locale: string; mode: "3d" | "drawing"; active: boolean; variant: number; onVariant: (value: number) => void;
  externalResourceTabs?: boolean;
}) {
  const config = getSolenoidConfiguration(slug);
  const text = labels[locale as keyof typeof labels] || labels.en;
  const id = mode === "drawing" ? getSolenoidDrawingPdfUrl(slug, locale, variant) : getSolenoidModelAsset(slug, variant);
  if (!config) return null;
  return <div data-solenoid-assets={mode}>
    {!externalResourceTabs && <SolenoidVariantSelector slug={slug} locale={locale} variant={variant} onVariant={onVariant} />}
    {!id ? <div role="status" style={{minHeight: 300, display: "grid", placeItems: "center", textAlign: "center", color: "#637087"}}>{text[mode === "3d" ? 2 : 3]}</div>
      : mode === "drawing" ? <PdfDrawingPreview pdfPreviewUrl={`${id}#toolbar=0&navpanes=0&scrollbar=1`} autoOpen deferDesktopUntilOpen showPreviewDescription={false}
          documentTitle={`${solenoidConfigurationName(slug, locale)} ${config.key === "two" ? text[config.state === "no" ? 1 : config.state === "nc" ? 0 : variant] : ""}`}
          text={{title: fittingText("2D 图纸", locale), loadingLabel: fittingText("2D 图纸加载中", locale), previewButton: fittingText("点击预览图纸", locale), description: "", errorLabel: fittingText("图纸加载失败，请刷新页面后重试", locale), retryLabel: fittingText("重新加载", locale)}} />
      : <ProductCadViewer modelId={id} title={solenoidConfigurationName(slug, locale)} locale={locale} active={active} externalResourceTabs={externalResourceTabs} />}
  </div>;
}
