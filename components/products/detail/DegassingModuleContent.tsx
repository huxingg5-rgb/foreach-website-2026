import dynamic from "next/dynamic";
import { GuideBlock } from "./InstrumentGuideBlock";
import selectionBase from "./EaPumpDetailContent.module.css";
import selectionStyles from "./CompactInstrumentGuide.module.css";
import figureStyles from "./InstrumentProductSections.module.css";
import deliveryStyles from "./FittingDeliveryZh.module.css";
import { getDegassingModuleCopy, type DegassingModuleLocale } from "@/data/products/detail/degassing-module-locales";
import { degassingModuleZh } from "@/data/products/detail/degassing-module.zh";
import { siteFooterData } from "@/data/site-footer";
import { FITTING_DELIVERY_POLICY_SOURCE } from "@/data/products/detail/fitting-delivery.intl";

const FittingAfterSalesForm = dynamic(() => import("./FittingAfterSalesForm"), { loading: () => null });


export function DegassingModuleSelection({ locale }: { locale: DegassingModuleLocale }) {
  const copy = getDegassingModuleCopy(locale).selection;
  const columns: [string, string] = [copy.columns[0], copy.columns[1]];
  return (
    <section lang={locale} className={`${selectionBase.content} ${selectionStyles.guide} ${selectionStyles.engineeringGuide}`} aria-label={copy.ariaLabel}>
      <section className={selectionStyles.phase}>
        <h2>1 {copy.phaseTitles[0]}</h2>
        <p>{copy.intro}</p>
        <GuideBlock number="1.1" locale={locale} columns={columns} section={{ id: "degassing-selection-inputs", ...copy.inputs, rows: copy.inputs.rows.map(([a, b, c]) => [a, b, c] as const) }} />
        <GuideBlock number="1.2" locale={locale} section={{ id: "degassing-materials", title: copy.materials.title, intro: copy.materials.intro }}>
          <p>{copy.materials.paragraph}</p>
        </GuideBlock>
        <GuideBlock number="1.3" locale={locale} section={{ id: "degassing-reference-curves", title: copy.curves.title, intro: copy.curves.intro, note: copy.curves.note }}>
          <div className={`${figureStyles.figures} ${figureStyles.figuresPaired}`}>
            {(["oxygen", "pressure"] as const).map((kind, index) => (
              <figure className={figureStyles.figure} key={kind}>
                <DegassingModuleCurve locale={locale} kind={kind} />
                <figcaption>{copy.curves.captions[index]}</figcaption>
              </figure>
            ))}
          </div>
          <p><strong>{copy.curves.exampleTitle}</strong>　{copy.curves.example}</p>
        </GuideBlock>
      </section>
      <section className={selectionStyles.phase}>
        <h2>2 {copy.phaseTitles[1]}</h2>
        <GuideBlock number="2.1" locale={locale} section={{ id: "degassing-ports", ...copy.ports }} />
        <GuideBlock number="2.2" locale={locale} columns={columns} section={{ id: "degassing-connections", ...copy.connections, rows: copy.connections.rows.map(([a, b, c]) => [a, b, c] as const) }} />
      </section>
      <GuideBlock number="3" locale={locale} heading="h2" section={{ id: "degassing-commissioning", ...copy.commissioning, steps: copy.commissioning.steps.map(([a, b]) => [a, b] as const) }} />
      <GuideBlock number="4" locale={locale} heading="h2" section={{ id: "degassing-storage", title: copy.storage.title, intro: copy.storage.intro }}>
        <p>{copy.storage.paragraph}</p>
      </GuideBlock>
    </section>
  );
}

/** Use the module-specific warranty and genuine packaging photos, not the fitting default. */
export function DegassingModuleDelivery({ locale }: { locale: DegassingModuleLocale | "zh-CN" }) {
  const source = degassingModuleZh.delivery;
  const copy = locale === "zh-CN" ? {
    ...source,
    labels: { title: "交付与售后", warrantyTitle: "保修与售后", warrantyLabel: "保修期限：", email: "联系邮箱：", phone: "联系电话：" },
    replyTime: "回复时间：工作日 08:30–18:00（北京时间）。可在线留言，我们会在24个工作小时内回复并跟进。",
  } : getDegassingModuleCopy(locale).delivery;
  const market = locale === "zh-CN" ? "china" : "global";
  return (
    <section id="delivery" lang={locale} className={`${deliveryStyles.delivery} ${deliveryStyles.plainDelivery}`} aria-label={copy.labels.title}
      data-fitting-delivery-region={market === "china" ? "domestic" : "overseas"} data-fitting-delivery-source={`${FITTING_DELIVERY_POLICY_SOURCE.documentId}:${FITTING_DELIVERY_POLICY_SOURCE.revision}`}>
      <h2>{copy.labels.title}</h2>
      <p>{copy.introduction}</p>
      {copy.groups.map((group, index) => (
        <div className={deliveryStyles.row} key={group.title}>
          <div>
            <h3><span className={deliveryStyles.number}>{String(index + 1).padStart(2, "0")}</span>{group.title}</h3>
            {group.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className={deliveryStyles.photos}>
            {group.photos.map((photo, photoIndex) => (
              <figure key={source.groups[index].photos[photoIndex].file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${source.imageRoot}/${source.groups[index].photos[photoIndex].file}`} alt={photo.alt} width={1000} height={750} loading="lazy" decoding="async" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
      <div className={`${deliveryStyles.row} ${deliveryStyles.singleRow}`}>
        <div>
          <h3><span className={deliveryStyles.number}>04</span>{copy.labels.warrantyTitle}</h3>
          <p><span>{copy.labels.warrantyLabel} </span>{copy.warranty}</p>
          <p>{copy.labels.email} <a className={deliveryStyles.contactLink} href={siteFooterData.emailHref[market]}>{siteFooterData.email[market]}</a></p>
          <p>{copy.labels.phone} <a className={deliveryStyles.contactLink} href={siteFooterData.phoneHref[market]}>{siteFooterData.phone[market]}</a></p>
          <p>{copy.support}</p>
          <p>{copy.replyTime}</p>
        </div>
      </div>
      <FittingAfterSalesForm productModel={degassingModuleZh.model} locale={locale} />
    </section>
  );
}

// Approximate traces from the existing Chinese water-test reference plots.
const curveTraces = {"oxygen":[[[271,233.5],[280,237.5],[282,237.5],[290,242.5],[299,245.5],[303,245.5],[309,249],[311,248.5],[314,249.5],[318,252],[333,256.5],[416,287.5],[418,287.5],[458,302.5],[460,302.5],[475,308.5],[477,308.5],[576,343.5],[696,383.5],[770,406.5],[777,409.5],[789,412.5],[796,415.5],[850,431.5],[854,433.5],[863,435.5],[867,437.5],[873,438.5],[877,440.5],[886,442.5],[887,443.5],[896,445.5],[900,447.5],[906,448.5],[910,450.5],[916,451.5],[920,453.5],[926,454.5],[930,456.5],[973,468.5]],[[230,244],[231,243.5],[254,252.5],[257,252.5],[273,259.5],[274,258.5],[281,262.5],[290,265.5],[291,264.5],[298,268.5],[307,271.5],[308,270.5],[315,274.5],[324,277.5],[325,276.5],[332,280.5],[341,283.5],[342,282.5],[349,286.5],[358,289.5],[359,288.5],[366,292.5],[375,295.5],[376,294.5],[383,298.5],[392,301.5],[393,300.5],[400,304.5],[409,307.5],[410,306.5],[426,313.5],[427,312.5],[435,316.5],[443,319],[444,318.5],[459,324.5],[461,323.5],[470,328.5],[476,330.5],[478,329.5],[485,333.5],[494,336.5],[495,335.5],[502,339.5],[511,342],[512,341.5],[527,347.5],[529,347],[536,350.5],[580,364.5],[587,368],[589,367.5],[595,369.5],[604,373.5],[608,373.5],[614,375.5],[621,379.5],[623,378.5],[631,381.5],[632,380.5],[646,386.5],[649,386.5],[665,392.5],[666,391.5],[681,397.5],[683,397],[690,401],[692,400.5],[699,402.5],[707,406.5],[708,405.5],[715,407.5],[748,418.5],[752,418.5],[761,422.5],[768,424.5],[769,424],[793,432.5],[803,434.5],[810,438.5],[813,437.5],[817,439.5],[821,439.5],[845,448],[846,447.5],[853,449.5],[862,453.5],[863,452.5],[888,460.5],[890,459.5],[899,463.5],[905,465.5],[907,465],[931,473.5],[932,472.5],[940,475.5],[942,474.5],[954,479.5],[959,480],[966,483],[967,482.5],[973,484.5]],[[227,297.5],[229,296.5],[252,305.5],[254,304.5],[277,313],[279,312.5],[289,315.5],[312,323.5],[316,324.5],[318,324],[328,328.5],[341,332.5],[343,331.5],[376,344.5],[378,343.5],[379,344.5],[391,347.5],[401,352],[403,351.5],[407,352.5],[437,362.5],[442,363],[463,370.5],[467,370.5],[476,374.5],[488,377.5],[489,378.5],[492,377.5],[502,382.5],[514,385.5],[525,390.5],[527,389.5],[550,397.5],[557,398.5],[575,405],[580,405.5],[611,415.5],[616,416],[625,420],[626,419.5],[638,423.5],[641,423.5],[651,427.5],[665,431.5],[666,431],[688,438.5],[691,438],[715,446.5],[716,445.5],[725,449.5],[739,453.5],[741,452.5],[752,457.5],[806,472.5],[824,479.5],[826,478.5],[838,482.5],[841,481.5],[849,486.5],[850,485.5],[854,486.5],[874,493.5],[875,492.5],[899,500.5],[900,500],[913,503.5],[924,508.5],[927,507.5],[938,510.5],[949,515.5],[952,514.5],[953,515.5],[965,518.5]],[[225,219],[226,218.5],[239,222.5],[246,226],[249,224.5],[256,228.5],[269,232.5],[270,231.5],[276,235.5],[277,234.5],[286,238],[300,241.5],[307,245],[310,244],[317,247.5],[330,251.5],[331,250.5],[347,257.5],[351,257.5],[355,259.5],[361,260.5],[368,264],[371,263.5],[391,270.5],[392,269.5],[408,276.5],[409,276],[421,279.5],[429,283.5],[432,282.5],[451,289.5],[453,289],[460,292.5],[482,298.5],[490,302.5],[491,301.5],[512,308.5],[514,308],[521,311.5],[524,310.5],[532,314.5],[553,320.5],[561,324],[562,323.5],[569,325.5],[582,331],[585,329.5],[592,333.5],[598,334.5],[602,336.5],[606,336.5],[622,343],[627,343.5],[643,349.5],[646,348.5],[653,352.5],[666,356],[667,355.5],[683,362.5],[685,361.5],[704,368.5],[707,368],[718,372.5],[727,375],[728,374.5],[744,381.5],[746,380.5],[767,387.5],[768,387],[776,390.5],[785,392.5],[796,397],[798,396.5],[819,403.5],[820,402.5],[836,409.5],[840,409.5],[844,411.5],[850,412.5],[857,416],[860,415],[870,419.5],[879,421.5],[880,422.5],[881,421.5],[897,428.5],[898,427.5],[911,431.5],[918,435.5],[921,434],[928,437.5],[934,438.5],[938,440.5],[941,440.5]]],"pressure":[[[171,737],[181,736.5],[182,735.5],[188,735.5],[204,732.5],[210,732.5],[211,731.5],[217,731.5],[218,730.5],[224,730.5],[225,729.5],[230,729.5],[232,728.5],[237,728.5],[239,727.5],[244,727.5],[245,726.5],[251,726.5],[252,725.5],[264,724.5],[265,723.5],[277,722.5],[278,721.5],[283,721.5],[285,720.5],[290,720.5],[291,719.5],[296,719.5],[297,718.5],[302,718.5],[303,717.5],[308,717.5],[352,709.5],[356,709.5],[357,708.5],[362,708.5],[363,707.5],[368,707.5],[369,706.5],[390,703.5],[391,702.5],[396,702.5],[402,700.5],[407,700.5],[413,698.5],[423,697.5],[429,695.5],[449,692.5],[450,691.5],[465,689.5],[466,688.5],[470,688.5],[471,687.5],[475,687.5],[476,686.5],[480,686.5],[481,685.5],[485,685.5],[486,684.5],[490,684.5],[491,683.5],[495,683.5],[496,682.5],[500,682.5],[501,681.5],[519,678.5],[520,677.5],[524,677.5],[525,676.5],[529,676.5],[530,675.5],[543,673.5],[544,672.5],[548,672.5],[549,671.5],[557,670.5],[558,669.5],[566,668.5],[567,667.5],[571,667.5],[572,666.5],[580,665.5],[581,664.5],[589,663.5],[590,662.5],[598,661.5],[599,660.5],[611,658.5],[612,657.5],[646,650.5],[651,648.5],[663,646.5],[672,643.5],[696,638.5],[705,635.5],[708,635.5],[709,634.5],[712,634.5],[713,633.5],[716,633.5],[717,632.5],[720,632.5],[721,631.5],[724,631.5],[725,630.5],[728,630.5],[729,629.5],[732,629.5],[733,628.5],[736,628.5],[737,627.5],[740,627.5],[741,626.5],[763,621.5],[764,620.5],[767,620.5],[768,619.5],[771,619.5],[772,618.5],[801,611.5],[813,607.5],[816,607.5],[824,604.5],[827,604.5],[835,601.5],[845,599.5],[853,596.5],[863,594.5],[885,587.5],[891,586.5],[892,585.5],[898,584.5],[899,583.5],[905,582.5],[906,581.5],[929,575.5],[930,574.5],[974,561.5]]]};
const curveColors = ["#226546", "#173c70", "#b84e29", "#986400"];
const curveDashes = [undefined, "14 7", "22 9", "20 7 4 7"];
const curveConditions = [[25, "2.7"], [25, "6.7"], [25, "13.3"], [45, "6.7"]] as const;

function DegassingModuleCurve({ locale, kind }: { locale: DegassingModuleLocale; kind: "oxygen" | "pressure" }) {
  const copy = getDegassingModuleCopy(locale).selection.curves;
  const oxygen = kind === "oxygen";
  const id = `degassing-${kind}-${locale}`;
  const series = oxygen ? curveTraces.oxygen : curveTraces.pressure;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" lang={locale}
      role="img" aria-labelledby={`${id}-title ${id}-description`} style={{ width: "100%", height: "auto", display: "block" }}>
      <title id={`${id}-title`}>{copy.alts[oxygen ? 0 : 1]}</title>
      <desc id={`${id}-description`}>{copy.note}</desc>
      <rect width="1200" height="900" fill="white" />
      <g fill="#2d435c" fontFamily="Arial, Noto Sans, Noto Sans KR, sans-serif" fontSize="30" textAnchor="middle">
        {[0,250,500,750,1000,1250,1500].map(value => {
          const x = 166 + value / 1500 * 936;
          return <g key={value}><line x1={x} y1="210" x2={x} y2="738" stroke="#d9e0e8" strokeWidth="1.4" /><text x={x} y="784">{value}</text></g>;
        })}
        {[0,1,2,3,4,5].map(step => {
          const y = 738 - step / 5 * 528;
          return <g key={step}><line x1="166" y1={y} x2="1102" y2={y} stroke="#d9e0e8" strokeWidth="1.4" /><text x="146" y={y+10} textAnchor="end">{step * (oxygen ? 20 : 2)}</text></g>;
        })}
        <path d="M166 210V738H1102" fill="none" stroke="#173c70" strokeWidth="2" />
        <text x="634" y="846">{copy.flowAxis}</text>
        <text x="46" y="474" fontSize="26" transform="rotate(-90 46 474)">{oxygen ? copy.oxygenAxis : copy.pressureAxis}</text>
        {oxygen ? curveConditions.map(([temperature, pressure], index) => {
          const x = index % 2 === 0 ? 166 : 656;
          const y = index < 2 ? 80 : 150;
          const number = ["es", "fr", "ru"].includes(locale) ? pressure.replace(".", ",") : pressure;
          return <g key={index}><path d={`M${x} ${y}h62`} stroke={curveColors[index]} strokeWidth="4.5" strokeDasharray={curveDashes[index]} /><text x={x+76} y={y+10} fontSize="26" textAnchor="start">{temperature} °C {copy.water} · {number} kPa ({copy.absolute})</text></g>;
        }) : <g><path d="M166 120h62" stroke="#ae243c" strokeWidth="4.5" /><text x="242" y="130" fontSize="28" textAnchor="start">{copy.pressureLegend}</text></g>}
        {series.map((points, index) => <polyline key={index} points={points.map(([x,y]) => `${x},${y}`).join(" ")} fill="none" stroke={oxygen ? curveColors[index] : "#ae243c"} strokeWidth="4.5" strokeDasharray={oxygen ? curveDashes[index] : undefined} />)}
      </g>
    </svg>
  );
}
