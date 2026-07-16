# 应用领域 Mega Menu 渲染位置检查

- 本次仅检查，没有修改代码
- 已排除 .bak 和生成文件

## 检查结果

```text
app/[locale]/resources/installation-guide/page.tsx:89:            <p>{pageData.hero.description}</p>
app/[locale]/resources/material-compatibility/page.tsx:141:                            {pageData.banner.description}
app/[locale]/resources/material-compatibility/page.tsx:153:                description={supportCta.description}
app/contact/distributor/page.tsx:105:                <p>{item.description}</p>
app/resources/installation-guide/page.tsx:39:            <p>{pageData.hero.description}</p>
app/resources/material-compatibility/page.tsx:71:                            {pageData.banner.description}
components/about/CulturePageContent.tsx:178:                <p>{getCultureText(item.description, locale)}</p>
components/about/CulturePageContent.tsx:225:                <p>{getCultureText(item.description, locale)}</p>
components/about/CulturePageContent.tsx:281:                  <p>{getCultureText(item.description, locale)}</p>
components/about/QualityPageContent.tsx:148:                <p className="quality-path-step-desc">{step.description}</p>
components/about/QualityPageContent.tsx:200:                <p className="quality-equipment-desc">{item.description}</p>
components/about/QualityPageContent.tsx:269:                  <p className="quality-cert-desc">{item.description}</p>
components/about/ResearchManufacturingPageContent.tsx:463:      <p className="rm-why-subtitle">{text.why.subtitle}</p>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:114:            <p>{data.hero.description}</p>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:134:            <p className="ivd-section-desc">{data.applicationSection.description}</p>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:185:            <p className="ivd-section-desc">{data.moduleSection.description}</p>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:205:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:216:                <p>{activeModule.description}</p>
components/applications/analytical-instruments/AnalyticalInstrumentsApplicationClient.tsx:300:            <p>{data.cta.description}</p>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:114:            <p>{data.hero.description}</p>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:134:            <p className="ivd-section-desc">{data.applicationSection.description}</p>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:185:            <p className="ivd-section-desc">{data.moduleSection.description}</p>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:205:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:216:                <p>{activeModule.description}</p>
components/applications/environmental-monitoring/EnvironmentalMonitoringApplicationClient.tsx:300:            <p>{data.cta.description}</p>
components/applications/ivd/IvdApplicationClient.tsx:234:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/ivd/IvdApplicationClient.tsx:245:                <p>{activeModule.description}</p>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:124:            <p>{data.hero.description}</p>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:151:            <p className="ivd-section-desc">{data.applicationSection.description}</p>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:208:            <p className="ivd-section-desc">{data.moduleSection.description}</p>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:228:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:239:                <p>{activeModule.description}</p>
components/applications/lab-automation/LabAutomationApplicationClient.tsx:326:            <p>{data.cta.description}</p>
components/applications/life-science/LifeScienceApplicationClient.tsx:127:            <p>{data.hero.description}</p>
components/applications/life-science/LifeScienceApplicationClient.tsx:153:            <p className="ivd-section-desc">{data.applicationSection.description}</p>
components/applications/life-science/LifeScienceApplicationClient.tsx:210:            <p className="ivd-section-desc">{data.moduleSection.description}</p>
components/applications/life-science/LifeScienceApplicationClient.tsx:230:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/life-science/LifeScienceApplicationClient.tsx:241:                <p>{activeModule.description}</p>
components/applications/life-science/LifeScienceApplicationClient.tsx:328:            <p>{data.cta.description}</p>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:114:            <p>{data.hero.description}</p>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:134:            <p className="ivd-section-desc">{data.applicationSection.description}</p>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:185:            <p className="ivd-section-desc">{data.moduleSection.description}</p>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:205:                        <span className="ivd-module-nav-subtitle">{module.navSubtitle}</span>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:216:                <p>{activeModule.description}</p>
components/applications/synthetic-biology/SyntheticBiologyApplicationClient.tsx:300:            <p>{data.cta.description}</p>
components/common/product-card/ProductBasicCard.tsx:273:        {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
components/common/product-card/ProductBasicCard.tsx:276:          <div className={styles.description}>{descriptionNode}</div>
components/contact/ContactFormSection.tsx:30:          <p className="contact-section-desc">{data.form.description}</p>
components/contact/ContactFormSection.tsx:37:              <p>{data.guide.description}</p>
components/contact/ContactFormSection.tsx:47:                    <p>{item.description}</p>
components/contact/ContactInquiryForm.tsx:780:            <p>{data.form.successModal.description}</p>
components/contact/ContactPageContent.tsx:125:            <p className="contact-section-desc">{data.support.description}</p>
components/contact/ContactPageContent.tsx:138:                <p>{item.description}</p>
components/contact/ContactPageContent.tsx:165:              {data.contactInfo.description}
components/contact/ContactPageContent.tsx:207:            <p>{data.bottomCta.description}</p>
components/contact/DistributorPageContent.tsx:916:              {contactPageData.contactInfo.description}
components/forms/company-info-request/CompanyInfoRequestModal.tsx:390:            <p>{description}</p>
components/home/HomeInquirySection.tsx:267:                      {getHomeInquiryText(item.description, locale)}
components/home/HomeNewsSection.tsx:154:                    desc: item.description ? getHomeNewsText(item.description, locale) : "", // 鏂伴椈鎻忚堪
components/layout/SiteHeader.tsx:1331:                                    {productMeta.description}
components/products/selection/ProductCardGrid.tsx:39:            subtitle={subtitle}
components/products/selection/ProductEmptyState.tsx:14:        <p>{description}</p>
components/products/selection/ProductFilterPanel.tsx:276:        <p>{activeCategory.description}</p>
components/resources/DatasheetsClient.tsx:127:        `${item.keywords} ${item.title} ${item.label} ${item.description} ${item.language} ${item.version} ${item.update}`,
components/resources/DatasheetsClient.tsx:156:          <p className="datasheets-hero-desc">{pageText.hero.description}</p>
components/resources/DatasheetsClient.tsx:228:            <p className="section-desc">{pageText.section.description}</p>
components/resources/DatasheetsClient.tsx:276:                  <p className="row-desc">{item.description}</p>
components/resources/DatasheetsClient.tsx:326:            <p className="support-desc">{pageText.support.description}</p>
components/resources/ResourceSupportCta.tsx:49:          <p>{description}</p>
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:97:            <em>{text.description}</em>
components/resources/fitting-replacement/FittingReplacementFaq.tsx:51:          <p>{text.description}</p>
components/resources/fitting-replacement/FittingReplacementGuide.tsx:461:                  <p>{step.description}</p>
components/resources/fitting-replacement/FittingReplacementHome.tsx:194:            <p className="frp-hero-desc">{data.banner.description}</p>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1294:                {properties.description ? <p>{isEnglish ? FLUID_DESCRIPTION_EN[fluidType] ?? properties.description : properties.description}</p> : null}
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:352:              <p>{tableCopy.description}</p>
components/resources/news/NewsArticleClient.tsx:426:          description={pageData.bottomBanner.description}
components/resources/news/NewsListClient.tsx:131:          <p className="newsHero__description">{pageData.hero.description}</p>
components/resources/news/NewsListClient.tsx:256:        description={pageData.bottomBanner.description}
components/resources/technical-articles/TechnicalArticleDetail.tsx:117:        description={pageData.bottomBanner.description}
components/resources/technical-articles/TechnicalArticlesClient.tsx:143:            {pageData.hero.description}
components/resources/technical-articles/TechnicalArticlesClient.tsx:226:        description={pageData.bottomBanner.description}
components/search/SiteSearchClient.tsx:126:  const subtitle = item.subtitle && !containsHan(item.subtitle)
components/search/SiteSearchClient.tsx:127:    ? item.subtitle
components/search/SiteSearchClient.tsx:224:        {item.subtitle ? (
components/search/SiteSearchClient.tsx:226:            {item.subtitle}
components/search/SiteSearchClient.tsx:230:        {item.description ? (
components/search/SiteSearchClient.tsx:232:            {item.description}
components/search/SiteSearchClient.tsx:390:                      <p>{text.description}</p>
data/applications/analytical-instruments/analytical-instruments-application.types.ts:31:  navSubtitle: string;
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:170:          navSubtitle: "鏍峰搧鍚稿彇 / 瀹氶噺杩涙牱 / 浣庢畫鐣?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:181:          navSubtitle: "娴佸姩鐩?/ 娓呮礂娑?/ 搴熸恫",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:192:          navSubtitle: "娓呮礂娑?/ 娈嬬暀 / 搴熸恫鎶芥帓",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:203:          navSubtitle: "浣庢浣撶Н / 瀵嗗皝 / 鏉愭枡鍏煎",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:232:          navSubtitle: "鏍峰搧娑?/ 璇曞墏娑?/ 鍙嶅簲娑?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:243:          navSubtitle: "璇曞墏 / 缂撳啿娑?/ 鏍囧畾娑?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:254:          navSubtitle: "鏍峰搧 / 璇曞墏 / 娓呮礂 / 搴熸恫",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:283:          navSubtitle: "姘存牱 / 鏍囧畾娑?/ 闀挎湡鍦ㄧ嚎",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:294:          navSubtitle: "璇曞墏 / 鏍囧畾娑?/ 鍙嶅簲娑?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:305:          navSubtitle: "杩囨护 / 闃插洖娴?/ 闃插牭濉?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:334:          navSubtitle: "鏍峰搧 / 璇曞墏 / 瀹氶噺鍔犲叆",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:345:          navSubtitle: "钀冨彇 / 娣峰悎 / 杞Щ",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:356:          navSubtitle: "杩囨护 / 闃插牭 / 鍘嬪姏鍙嶉",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:385:          navSubtitle: "澶氭牱鍝?/ 澶氳瘯鍓?/ 澶氬簾娑?,
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:396:          navSubtitle: "杩涙牱 / 鍒嗛厤 / 娓呮礂 / 鎺掑簾",
data/applications/analytical-instruments/analytical-instruments-application.zh.ts:407:          navSubtitle: "娉甸榾绠¤矾 / 蹇€熺淮鎶?/ 瀵嗗皝",
data/applications/environmental-monitoring/environmental-monitoring-application.types.ts:31:  navSubtitle: string;
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:170:          navSubtitle: "姘存牱 / 鏍囧畾娑?/ 闀挎湡鍦ㄧ嚎",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:181:          navSubtitle: "璇曞墏 / 鏍囧畾娑?/ 鍙嶅簲娑?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:192:          navSubtitle: "澶氳瘯鍓?/ 娓呮礂 / 搴熸恫",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:203:          navSubtitle: "娓呮礂娑?/ 搴熸恫 / 鎶楁薄鏌?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:214:          navSubtitle: "杩囨护 / 闃插洖娴?/ 鍫靛鍒ゆ柇",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:243:          navSubtitle: "鎮诞鐗?/ 娌夌Н / 闀挎湡鍦ㄧ嚎",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:254:          navSubtitle: "棰楃矑 / 闃插牭 / 娉甸榾淇濇姢",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:265:          navSubtitle: "閰哥⒈ / 姘у寲鍓?/ 鏄捐壊娑?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:276:          navSubtitle: "搴熸恫 / 娓呮礂 / 闃插牭",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:305:          navSubtitle: "鍐峰嚌娑?/ 閰告€ф恫 / 鑷惛",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:316:          navSubtitle: "鍚告敹娑?/ 娓呮礂娑?/ 璇曞墏",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:327:          navSubtitle: "杞 / 闈炴帴瑙?/ 闃叉薄鏌?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:338:          navSubtitle: "杩囨护 / 娑蹭綅 / 鍘嬪姏",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:367:          navSubtitle: "閲囨牱 / 杞Щ / 浠ｈ〃鎬?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:378:          navSubtitle: "绋€閲婃恫 / 璇曞墏 / 瀹氶噺",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:389:          navSubtitle: "杩囨护 / 闃插牭 / 娉甸榾淇濇姢",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:400:          navSubtitle: "娓呮礂 / 搴熸恫 / 鐘舵€佺洃娴?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:429:          navSubtitle: "澶氳瘯鍓?/ 鏍囧畾娑?/ 搴熸恫",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:440:          navSubtitle: "鍙栨牱 / 鍔犳恫 / 娓呮礂 / 鎺掑簾",
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:451:          navSubtitle: "娉甸榾绠¤矾 / 瀵嗗皝 / 蹇€熺淮鎶?,
data/applications/environmental-monitoring/environmental-monitoring-application.zh.ts:462:          navSubtitle: "娑蹭綅 / 姘旀场 / 鍘嬪姏 / 鍫靛",
data/applications/ivd/ivd-application.types.ts:55:  navSubtitle: string;
data/applications/ivd/ivd-application.zh.ts:215:          navSubtitle: "灏忎綋绉彇鏍?/ 绌哄惛璇嗗埆 / 鎸傛恫娈嬬暀",
data/applications/ivd/ivd-application.zh.ts:226:          navSubtitle: "璇曞墏瀹氶噺 / 閲嶅鍒嗛厤 / 娈嬬暀鎺у埗",
data/applications/ivd/ivd-application.zh.ts:237:          navSubtitle: "澶氶€氶亾鍒囨崲 / 璺緞闃茶閫?/ 闄嶄綆娈嬬暀",
data/applications/ivd/ivd-application.zh.ts:248:          navSubtitle: "娓呮礂娑蹭緵缁?/ 搴熸恫鎶芥帓 / 鑷惛鑳藉姏",
data/applications/ivd/ivd-application.zh.ts:259:          navSubtitle: "瀵嗗皝杩炴帴 / 绠″緞閫傞厤 / 鏉愭枡鍏煎",
data/applications/ivd/ivd-application.zh.ts:270:          navSubtitle: "绌哄惛鍒ゆ柇 / 姘旀场璇嗗埆 / 鍫靛鐩戞祴",
data/applications/ivd/ivd-application.zh.ts:299:          navSubtitle: "鏍锋湰瀹氶噺 / 浣庢畫鐣?/ 鍔犳牱绋冲畾",
data/applications/ivd/ivd-application.zh.ts:310:          navSubtitle: "璇曞墏鍔犲叆 / 搴曠墿娣诲姞 / 閲嶅涓€鑷?,
data/applications/ivd/ivd-application.zh.ts:321:          navSubtitle: "娓呮礂鏁堢巼 / 搴熸恫鎺掓斁 / 娈嬬暀鎺у埗",
data/applications/ivd/ivd-application.zh.ts:332:          navSubtitle: "澶氳矾寰?/ 闃€缁勭畝鍖?/ 浠嬭川鍏煎",
data/applications/ivd/ivd-application.zh.ts:343:          navSubtitle: "姘旀场 / 娑蹭綅 / 鍘嬪姏寮傚父",
data/applications/ivd/ivd-application.zh.ts:372:          navSubtitle: "琛€鏍峰彇鏍?/ 鎶楀牭濉?/ 娈嬬暀鎺у埗",
data/applications/ivd/ivd-application.zh.ts:383:          navSubtitle: "绋€閲婃恫 / 婧惰鍓?/ 闉樻恫",
data/applications/ivd/ivd-application.zh.ts:394:          navSubtitle: "妫€娴嬭矾寰?/ 澶氶€氶亾 / 闃€缁勬帶鍒?,
data/applications/ivd/ivd-application.zh.ts:405:          navSubtitle: "閽堣矾娓呮礂 / 绠¤矾鍐叉礂 / 搴熸恫鎺掓斁",
data/applications/ivd/ivd-application.zh.ts:416:          navSubtitle: "鍫靛 / 姘旀场 / 鍘嬪姏寮傚父",
data/applications/ivd/ivd-application.zh.ts:445:          navSubtitle: "灏忎綋绉牱鏈?/ 浣庢畫鐣?/ 绋冲畾鍙栨牱",
data/applications/ivd/ivd-application.zh.ts:456:          navSubtitle: "璇曞墏瀹氶噺 / 鍔犳牱鏃跺簭 / 閲嶅鎬?,
data/applications/ivd/ivd-application.zh.ts:467:          navSubtitle: "澶氳瘯鍓?/ 璺緞鎺у埗 / 浣庢畫鐣?,
data/applications/ivd/ivd-application.zh.ts:478:          navSubtitle: "娓呮礂娑?/ 搴熸恫鎶芥帓 / 姹℃煋鎺у埗",
data/applications/ivd/ivd-application.zh.ts:489:          navSubtitle: "娑蹭綅 / 姘旀场 / 绌哄惛 / 鍘嬪姏",
data/applications/ivd/ivd-application.zh.ts:518:          navSubtitle: "瑁傝В娑?/ 缁撳悎娑?/ 瀹氶噺鍔犲叆",
data/applications/ivd/ivd-application.zh.ts:529:          navSubtitle: "娓呮礂娑?/ 娲楄劚娑?/ 搴熸恫澶勭悊",
data/applications/ivd/ivd-application.zh.ts:540:          navSubtitle: "澶氳矾寰?/ 闃茶閫?/ 闃叉薄鏌?,
data/applications/ivd/ivd-application.zh.ts:551:          navSubtitle: "瀵嗗皝 / 鏉愭枡鍏煎 / 浣庢畫鐣?,
data/applications/ivd/ivd-application.zh.ts:562:          navSubtitle: "姘旀场 / 娑蹭綅 / 鍫靛 / 鍘嬪姏",
data/applications/lab-automation/lab-automation-application.types.ts:38:  navSubtitle: string;
data/applications/lab-automation/lab-automation-application.zh.ts:178:          navSubtitle: "鏍锋湰鍚稿彇 / 璇曞墏鍔犲叆 / 灏忎綋绉?,
data/applications/lab-automation/lab-automation-application.zh.ts:189:          navSubtitle: "娓呮礂娑?/ 娲楄劚娑?/ 搴熸恫",
data/applications/lab-automation/lab-automation-application.zh.ts:200:          navSubtitle: "璇曞墏 / 娓呮礂 / 娲楄劚 / 搴熸恫",
data/applications/lab-automation/lab-automation-application.zh.ts:211:          navSubtitle: "浣庢浣撶Н / 瀵嗗皝 / 鏉愭枡鍏煎",
data/applications/lab-automation/lab-automation-application.zh.ts:240:          navSubtitle: "鍚稿彇 / 淇濇寔 / 鎺ㄥ嚭",
data/applications/lab-automation/lab-automation-application.zh.ts:251:          navSubtitle: "澶氶€氶亾 / 閲嶅鍒嗛厤 / 鑺傛媿",
data/applications/lab-automation/lab-automation-application.zh.ts:262:          navSubtitle: "鎸傛恫 / 娈嬬暀 / 搴熸恫",
data/applications/lab-automation/lab-automation-application.zh.ts:291:          navSubtitle: "澶氬瓟浣?/ 鍒嗛厤涓€鑷存€?,
data/applications/lab-automation/lab-automation-application.zh.ts:302:          navSubtitle: "娓呮礂娑?/ 娈嬫恫 / 搴熸恫",
data/applications/lab-automation/lab-automation-application.zh.ts:313:          navSubtitle: "绠¤矾 / 鎺ュご / 杩囨护淇濇姢",
data/applications/lab-automation/lab-automation-application.zh.ts:342:          navSubtitle: "瀹氶噺 / 鎵归噺 / 闀挎湡杩愯",
data/applications/lab-automation/lab-automation-application.zh.ts:353:          navSubtitle: "鏉愭枡 / 瀵嗗皝 / 娈嬬暀",
data/applications/lab-automation/lab-automation-application.zh.ts:364:          navSubtitle: "娑蹭綅 / 鍘嬪姏 / 姘旀场",
data/applications/lab-automation/lab-automation-application.zh.ts:393:          navSubtitle: "澶氳瘯鍓?/ 澶氬伐浣?/ 澶氬簾娑?,
data/applications/lab-automation/lab-automation-application.zh.ts:404:          navSubtitle: "娉?/ 闃€ / 閽?/ 浼犳劅鍣?,
data/applications/lab-automation/lab-automation-application.zh.ts:415:          navSubtitle: "绌哄惛 / 姘旀场 / 鍫靛 / 鍘嬪姏",
data/applications/life-science/life-science-application.types.ts:38:  navSubtitle: string;
data/applications/life-science/life-science-application.zh.ts:178:          navSubtitle: "瑁傝В / 缁撳悎 / 璇曞墏鍔犲叆",
data/applications/life-science/life-science-application.zh.ts:189:          navSubtitle: "娓呮礂娑?/ 娲楄劚娑?/ 搴熸恫",
data/applications/life-science/life-science-application.zh.ts:200:          navSubtitle: "瑁傝В / 娓呮礂 / 娲楄劚",
data/applications/life-science/life-science-application.zh.ts:211:          navSubtitle: "浣庢浣撶Н / 鏉愭枡鍏煎",
data/applications/life-science/life-science-application.zh.ts:240:          navSubtitle: "鍩瑰吇鍩?/ 缂撳啿娑?/ 璇曞墏琛ュ姞",
data/applications/life-science/life-science-application.zh.ts:251:          navSubtitle: "娓╁拰杈撻€?/ 灏侀棴杞Щ",
data/applications/life-science/life-science-application.zh.ts:262:          navSubtitle: "娑蹭綅 / 鍘嬪姏 / 姘旀场",
data/applications/life-science/life-science-application.zh.ts:291:          navSubtitle: "鏍锋湰 / 璇曞墏 / 灏忎綋绉?,
data/applications/life-science/life-science-application.zh.ts:302:          navSubtitle: "閽堣矾娓呮礂 / 搴熸恫鎺掓斁",
data/applications/life-science/life-science-application.zh.ts:313:          navSubtitle: "娉?/ 闃€ / 閽?/ 浼犳劅鍣?,
data/applications/life-science/life-science-application.zh.ts:342:          navSubtitle: "铔嬬櫧 / 鎶椾綋 / 澶у垎瀛?,
data/applications/life-science/life-science-application.zh.ts:353:          navSubtitle: "缂撳啿娑?/ 娲楄劚娑?/ 娓呮礂娑?,
data/applications/life-science/life-science-application.zh.ts:364:          navSubtitle: "鍘嬪姏 / 姘旀场 / 鍫靛",
data/applications/life-science/life-science-application.zh.ts:393:          navSubtitle: "鍩瑰吇鍩?/ 璇卞鍓?/ 缂撳啿娑?,
data/applications/life-science/life-science-application.zh.ts:404:          navSubtitle: "鍙栨牱 / 闃插洖娴?/ 闃叉薄鏌?,
data/applications/life-science/life-science-application.zh.ts:415:          navSubtitle: "搴熸恫鎶芥帓 / 绠¤矾鍐叉礂",
data/applications/synthetic-biology/synthetic-biology-application.types.ts:31:  navSubtitle: string;
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:170:          navSubtitle: "鍩瑰吇鍩?/ 璇卞鍓?/ 缂撳啿娑?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:181:          navSubtitle: "鍙栨牱 / 闃插洖娴?/ 闃叉薄鏌?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:192:          navSubtitle: "琛ユ枡 / 鍙栨牱 / 娓呮礂 / 搴熸恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:203:          navSubtitle: "搴熸恫鎶芥帓 / 绠¤矾鍐叉礂 / 鑷惛",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:214:          navSubtitle: "娑蹭綅 / 鍘嬪姏 / 姘旀场 / 鍫靛",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:243:          navSubtitle: "璇曞墏 / 鏍锋湰 / 瀛旀澘",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:254:          navSubtitle: "閰舵恫 / 缂撳啿娑?/ 娣诲姞娑?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:265:          navSubtitle: "鍔犳恫 / 娲楁澘 / 搴熸恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:276:          navSubtitle: "澶氳瘯鍓?/ 澶氭竻娲?/ 搴熸恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:305:          navSubtitle: "鍩瑰吇鍩?/ 纰虫簮 / 璇卞鍓?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:316:          navSubtitle: "鍩瑰吇鍩?/ 缂撳啿娑?/ 娓呮礂娑?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:327:          navSubtitle: "姝㈠洖 / 杩囨护 / 闃叉薄鏌?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:338:          navSubtitle: "娑蹭綅 / 鍘嬪姏 / 姘旀场",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:367:          navSubtitle: "鍙栨牱 / 杞Щ / 浠ｈ〃鎬?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:378:          navSubtitle: "杩囨护 / 闃插牭 / 娉甸榾淇濇姢",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:389:          navSubtitle: "绋€閲?/ 娓呮礂 / 搴熸恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:400:          navSubtitle: "灏侀棴杞Щ / 闃叉薄鏌?,
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:429:          navSubtitle: "琛ユ枡 / 鍙栨牱 / 娓呮礂 / 搴熸恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:440:          navSubtitle: "琛ユ枡 / 鍙栨牱 / 鎺掓恫",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:451:          navSubtitle: "娉甸榾绠¤矾 / 瀵嗗皝 / 缁存姢",
data/applications/synthetic-biology/synthetic-biology-application.zh.ts:462:          navSubtitle: "娑蹭綅 / 姘旀场 / 鍘嬪姏 / 鍫靛",
data/contact-cooperation/contact.intl.ts:1593:    description: text.supportItems[index]?.description ?? item.description,
data/contact-cooperation/contact.intl.ts:1608:    description: text.guideItems[index]?.description ?? item.description,
data/navigation.ts:667:function applicationSceneImage(
data/navigation.ts:815:        applicationSceneImage("/images/applications/mega-menu/ivd-biochemistry.webp", t("鐢熷寲鍒嗘瀽浠?, "Clinical Chemistry Analyzer", "Analizador bioqu铆mico", "Analyseur de biochimie", "靸濏檾頃?攵勳劃旮?, "袘懈芯褏懈屑懈褔械褋泻懈泄 邪薪邪谢懈蟹邪褌芯褉"), t("鏍锋湰銆佽瘯鍓傘€佹竻娲椾笌搴熸恫澶勭悊娑茶矾", "Sample, reagent, washing, and waste fluidics", "Muestra, reactivo, lavado y residuos", "脡chantillon, r茅actif, lavage et d茅chets", "靸橅攲, 鞁滌暯, 靹胳矙 氚?韽愳暋 鞙犽", "袨斜褉邪蟹褑褘, 褉械邪谐械薪褌褘, 锌褉芯屑褘胁泻邪 懈 芯褌褏芯写褘"), localizedPath("/applications/ivd?instrument=clinical")),
data/navigation.ts:816:        applicationSceneImage("/images/applications/mega-menu/ivd-immunoassay.webp", t("鍖栧鍙戝厜 / 鍏嶇柅鍒嗘瀽浠?, "CLIA / Immunoassay Analyzer", "Analizador CLIA / inmunoensayo", "Analyseur CLIA / immunoessai", "頇旐暀氚滉磻 / 氅挫棴 攵勳劃旮?, "啸械屑懈谢褞屑懈薪械褋褑械薪褌薪褘泄 / 懈屑屑褍薪芯谢芯谐懈褔械褋泻懈泄 邪薪邪谢懈蟹邪褌芯褉"), t("澶氳瘯鍓傚垎閰嶃€佺鐝犳竻娲椾笌搴曠墿娣诲姞娑茶矾", "Multi-reagent dispensing, bead washing, and substrate addition", "Reactivos, lavado de perlas y sustrato", "R茅actifs, billes magn茅tiques et substrat", "雼れ 鞁滌暯, 牍勲摐 靹胳矙 氚?旮办 觳皜", "袪械邪谐械薪褌褘, 锌褉芯屑褘胁泻邪 褔邪褋褌懈褑 懈 褋褍斜褋褌褉邪褌"), localizedPath("/applications/ivd?instrument=immunoassay")),
data/navigation.ts:817:        applicationSceneImage("/images/applications/mega-menu/ivd-hematology.webp", t("琛€娑插垎鏋愪华", "Hematology Analyzer", "Analizador hematol贸gico", "Analyseur d鈥檋茅matologie", "順堨暋 攵勳劃旮?, "袚械屑邪褌芯谢芯谐懈褔械褋泻懈泄 邪薪邪谢懈蟹邪褌芯褉"), t("琛€鏍风█閲娿€佹憾琛€鍓傛坊鍔犱笌搴熸恫鎺掓斁娑茶矾", "Blood dilution, lysing reagent addition, and waste discharge", "Diluci贸n de sangre, lisante y residuos", "Dilution du sang, lyseur et d茅chets", "順堨暋 頋劃, 鞖╉槇鞝?氚?韽愳暋 氚办稖", "袪邪蟹斜邪胁谢械薪懈械 泻褉芯胁懈, 谢懈蟹懈褉褍褞褖懈泄 褉械邪谐械薪褌 懈 芯褌褏芯写褘"), localizedPath("/applications/ivd?instrument=hematology")),
data/navigation.ts:818:        applicationSceneImage("/images/applications/mega-menu/ivd-coagulation.webp", t("鍑濊鍒嗘瀽浠?, "Coagulation Analyzer", "Analizador de coagulaci贸n", "Analyseur de coagulation", "順堨暋鞚戧碃 攵勳劃旮?, "袣芯邪谐褍谢芯屑械褌褉"), t("灏忎綋绉牱鏈笌鍑濊璇曞墏绋冲畾鍒嗛厤", "Stable dispensing of small-volume samples and coagulation reagents", "Muestras peque帽as y reactivos de coagulaci贸n", "Petits 茅chantillons et r茅actifs de coagulation", "靻岆焿 靸橅攲 氚?鞚戧碃 鞁滌暯 攵勳＜", "袦邪谢褘械 芯斜褉邪蟹褑褘 懈 褉械邪谐械薪褌褘 泻芯邪谐褍谢褟褑懈懈"), localizedPath("/applications/ivd?instrument=coagulation")),
data/navigation.ts:819:        applicationSceneImage("/images/applications/mega-menu/ivd-molecular.webp", t("鍒嗗瓙璇婃柇 / PCR", "Molecular Diagnostics / PCR", "Diagn贸stico molecular / PCR", "Diagnostic mol茅culaire / PCR", "攵勳瀽歆勲嫧 / PCR", "袦芯谢械泻褍谢褟褉薪邪褟 写懈邪谐薪芯褋褌懈泻邪 / PCR"), t("鏍搁吀鎻愬彇銆佹竻娲椼€佹礂鑴变笌闃叉薄鏌撴恫璺?, "Nucleic acid extraction, washing, elution, and contamination control", "Extracci贸n, lavado, eluci贸n y control de contaminaci贸n", "Extraction, lavage, 茅lution et contr么le de contamination", "頃奠偘 於旍稖, 靹胳矙, 鞖╈稖 氚?鞓れ椉 鞝滌柎", "协泻褋褌褉邪泻褑懈褟, 锌褉芯屑褘胁泻邪, 褝谢褞懈褉芯胁邪薪懈械 懈 泻芯薪褌褉芯谢褜 蟹邪谐褉褟蟹薪械薪懈褟"), localizedPath("/applications/ivd?instrument=molecular")),
data/navigation.ts:839:        applicationSceneImage(
data/navigation.ts:859:        applicationSceneImage(
data/navigation.ts:879:        applicationSceneImage(
data/navigation.ts:899:        applicationSceneImage(
data/navigation.ts:919:        applicationSceneImage(
data/navigation.ts:958:        applicationSceneImage(
data/navigation.ts:978:        applicationSceneImage(
data/navigation.ts:998:        applicationSceneImage(
data/navigation.ts:1018:        applicationSceneImage(
data/navigation.ts:1038:        applicationSceneImage(
data/navigation.ts:1077:        applicationSceneImage(
data/navigation.ts:1097:        applicationSceneImage(
data/navigation.ts:1117:        applicationSceneImage(
data/navigation.ts:1137:        applicationSceneImage(
data/navigation.ts:1157:        applicationSceneImage(
data/navigation.ts:1196:        applicationSceneImage(
data/navigation.ts:1216:        applicationSceneImage(
data/navigation.ts:1236:        applicationSceneImage(
data/navigation.ts:1256:        applicationSceneImage(
data/navigation.ts:1276:        applicationSceneImage(
data/navigation.ts:1315:        applicationSceneImage(
data/navigation.ts:1335:        applicationSceneImage(
data/navigation.ts:1355:        applicationSceneImage(
data/navigation.ts:1375:        applicationSceneImage(
data/navigation.ts:1395:        applicationSceneImage(
```
