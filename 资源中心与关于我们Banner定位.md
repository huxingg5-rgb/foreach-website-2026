# 资源中心与关于我们 Banner 定位

- 只排查，不修改代码
- 生成时间：2026-07-25 07:28:36

## 一、组件中实际使用的 Banner / Hero 类

```text
app/about/foreach/AboutForeachClient.tsx:300:    return <div className={`about-foreach-image-placeholder ${className}`} />;
app/about/foreach/AboutForeachClient.tsx:305:      className={className}
app/about/foreach/AboutForeachClient.tsx:391:    <span ref={numberRef} className={className}>
app/about/foreach/AboutForeachClient.tsx:393:      <span className={plusClassName}>{suffix}</span>
app/about/foreach/AboutForeachClient.tsx:421:    <main className="about-foreach-page">
app/about/foreach/AboutForeachClient.tsx:425:      <section className="about-foreach-hero about-center-banner">
app/about/foreach/AboutForeachClient.tsx:444:          className="about-foreach-hero-bg"
app/about/foreach/AboutForeachClient.tsx:447:        <div className="about-foreach-hero-content about-center-banner__inner">
app/about/foreach/AboutForeachClient.tsx:448:          <h1 className="about-center-banner__title">
app/about/foreach/AboutForeachClient.tsx:452:          <p className="about-center-banner__description">
app/about/foreach/AboutForeachClient.tsx:465:      <section className="about-foreach-intro-section" id="company-intro">
app/about/foreach/AboutForeachClient.tsx:469:        <div className="about-foreach-container about-foreach-intro-layout">
app/about/foreach/AboutForeachClient.tsx:470:          <div className="about-foreach-intro-copy">
app/about/foreach/AboutForeachClient.tsx:492:            className="about-foreach-video-card"
app/about/foreach/AboutForeachClient.tsx:506:              className="about-foreach-video about-foreach-video-edge-crop"
app/about/foreach/AboutForeachClient.tsx:521:      <section className="about-foreach-advantage-section" id="company-advantage">
app/about/foreach/AboutForeachClient.tsx:522:        <div className="about-foreach-advantage-panel">
app/about/foreach/AboutForeachClient.tsx:524:            className="about-foreach-advantage-stats"
app/about/foreach/AboutForeachClient.tsx:539:                className="about-foreach-advantage-stat"
app/about/foreach/AboutForeachClient.tsx:545:                  className="about-foreach-advantage-number"
app/about/foreach/AboutForeachClient.tsx:549:                <div className="about-foreach-advantage-text">
app/about/foreach/AboutForeachClient.tsx:561:      <section className="about-foreach-honor-section" id="company-honor">
app/about/foreach/AboutForeachClient.tsx:562:        <div className="about-foreach-container">
app/about/foreach/AboutForeachClient.tsx:563:          <div className="about-foreach-honor-title">
app/about/foreach/AboutForeachClient.tsx:567:          <div className="about-foreach-honor-layout">
app/about/foreach/AboutForeachClient.tsx:568:            <div className="about-foreach-honor-summary">
app/about/foreach/AboutForeachClient.tsx:579:                className="about-foreach-honor-summary-stats"
app/about/foreach/AboutForeachClient.tsx:594:                    className="about-foreach-honor-summary-stat"
app/about/foreach/AboutForeachClient.tsx:600:                      className="about-foreach-honor-summary-number"
app/about/foreach/AboutForeachClient.tsx:604:                    <div className="about-foreach-honor-summary-label">
app/about/foreach/AboutForeachClient.tsx:612:            <div className="about-foreach-honor-board">
app/about/foreach/AboutForeachClient.tsx:613:              <div className="about-foreach-honor-top-row">
app/about/foreach/AboutForeachClient.tsx:614:                <div className="about-foreach-honor-main-cert">
app/about/foreach/AboutForeachClient.tsx:618:                    className="about-foreach-honor-main-cert-image"
app/about/foreach/AboutForeachClient.tsx:627:                    className="about-foreach-honor-iso-cert"
app/about/foreach/AboutForeachClient.tsx:633:                className="about-foreach-honor-middle-row"
app/about/foreach/AboutForeachClient.tsx:641:                    className="about-foreach-honor-middle-image"
app/about/foreach/AboutForeachClient.tsx:649:            className="about-foreach-honor-a4-row"
app/about/foreach/AboutForeachClient.tsx:654:                className="about-foreach-honor-a4-card"
app/about/foreach/AboutForeachClient.tsx:657:                <div className="about-foreach-honor-a4-image-wrap">
app/about/foreach/AboutForeachClient.tsx:661:                    className="about-foreach-honor-a4-image"
app/resources/calculators/fluid-resistance/page.tsx:17:    <main className="technicalArticlesPage">
app/resources/calculators/fluid-resistance/page.tsx:19:        className="technicalArticlesHero resource-center-banner"
app/resources/calculators/fluid-resistance/page.tsx:25:        <div className="technicalArticlesHero__inner resource-center-banner__inner">
app/resources/calculators/fluid-resistance/page.tsx:26:          <h1 className={`technicalArticlesHero__title ${calculatorStyles.heroTitle} resource-center-banner__title`}>管内流动阻尼计算工具 V2.1</h1>
app/resources/calculators/fluid-resistance/page.tsx:27:          <p className={`technicalArticlesHero__description ${calculatorStyles.heroDescription} resource-center-banner__description`}>
app/resources/installation-guide/page.tsx:34:      <section className="installation-guide-hero resource-center-banner">
app/resources/installation-guide/page.tsx:35:        <div className="installation-guide-hero-inner resource-center-banner__inner">
app/resources/installation-guide/page.tsx:36:          <div className="installation-guide-hero-content resource-center-banner__content">
app/resources/installation-guide/page.tsx:38:            <h1 className="resource-center-banner__title">{pageData.hero.title}</h1>
app/resources/installation-guide/page.tsx:39:            <p className="resource-center-banner__description">{pageData.hero.description}</p>
app/resources/material-compatibility/page.tsx:51:        <main className="material-compatibility-page">
app/resources/material-compatibility/page.tsx:58:            <section className="material-compatibility-banner resource-center-banner">
app/resources/material-compatibility/page.tsx:59:                <div className="material-compatibility-banner__inner resource-center-banner__inner">
app/resources/material-compatibility/page.tsx:60:                    <div className="material-compatibility-banner__content resource-center-banner__content">
app/resources/material-compatibility/page.tsx:61:                        <p className="material-compatibility-banner__eyebrow resource-center-banner__eyebrow">
app/resources/material-compatibility/page.tsx:65:                        <h1 className="resource-center-banner__title">
app/resources/material-compatibility/page.tsx:70:                        <p className="material-compatibility-banner__desc resource-center-banner__description">
app/resources/news/[slug]/page.tsx:272:    <div className="newsArticleDetailPage">
app/resources/news/[slug]/page.tsx:274:      <div className="newsArticleBreadcrumbShell">
components/about/CulturePageContent.tsx:102:    <main className="about-culture-page">
components/about/CulturePageContent.tsx:109:        className="about-culture-banner about-center-banner"
components/about/CulturePageContent.tsx:114:        className="about-culture-banner-photo"
components/about/CulturePageContent.tsx:118:        <div className="about-culture-container about-culture-banner-inner about-center-banner__inner">
components/about/CulturePageContent.tsx:119:          <h1 className="about-center-banner__title">
components/about/CulturePageContent.tsx:122:          <p className="about-center-banner__description">
components/about/CulturePageContent.tsx:142:      <section className="about-culture-section-title">
components/about/CulturePageContent.tsx:155:      <section className="about-culture-core-section">
components/about/CulturePageContent.tsx:156:        <div className="about-culture-container">
components/about/CulturePageContent.tsx:157:          <ul className="about-culture-core-list">
components/about/CulturePageContent.tsx:160:                className="about-culture-core-item"
components/about/CulturePageContent.tsx:163:                <div className="about-culture-core-icon" aria-hidden="true">
components/about/CulturePageContent.tsx:181:        className="about-culture-organization-hero"
components/about/CulturePageContent.tsx:187:        <div className="about-culture-organization-content">
components/about/CulturePageContent.tsx:202:      <section className="about-culture-brand-section">
components/about/CulturePageContent.tsx:203:        <div className="about-culture-container about-culture-brand-layout">
components/about/CulturePageContent.tsx:206:              className={
components/about/CulturePageContent.tsx:213:              <div className="about-culture-brand-text">
components/about/CulturePageContent.tsx:218:              <div className="about-culture-brand-image">
components/about/CulturePageContent.tsx:241:      <section className="about-culture-project-section">
components/about/CulturePageContent.tsx:242:        <div className="about-culture-container">
components/about/CulturePageContent.tsx:243:          <div className="about-culture-project-title">
components/about/CulturePageContent.tsx:253:          <div className="about-culture-project-list">
components/about/CulturePageContent.tsx:256:                className="about-culture-project-card"
components/about/CulturePageContent.tsx:259:                <div className="about-culture-project-image">
components/about/CulturePageContent.tsx:269:                <div className="about-culture-project-content">
components/about/HistoryPageContent.tsx:86:    <main className="about-history-page">
components/about/HistoryPageContent.tsx:91:        className="about-history-inner-banner about-center-banner"
components/about/HistoryPageContent.tsx:99:        <div className="about-history-inner-banner-content about-center-banner__inner">
components/about/HistoryPageContent.tsx:100:          <p className="about-center-banner__title">{pageText.bannerDescription}</p>
components/about/HistoryPageContent.tsx:119:      <header className="about-history-page-title">
components/about/HistoryPageContent.tsx:125:        <div className="about-history-title-line" aria-hidden="true" />
components/about/HistoryPageContent.tsx:141:        className="about-history-bottom-banner"
components/about/HistoryPageContent.tsx:150:          className="about-history-bottom-slogan"
components/about/HistoryPageContent.tsx:154:          <span className="about-history-bottom-slogan-flow">
components/about/HistoryTimeline.tsx:84:      className="about-history-section"
components/about/HistoryTimeline.tsx:87:      <div className="about-history-container">
components/about/HistoryTimeline.tsx:89:        <div className="about-history-center-line" aria-hidden="true" />
components/about/HistoryTimeline.tsx:102:              className={
components/about/HistoryTimeline.tsx:112:              <div className="about-history-col about-history-col--left">
components/about/HistoryTimeline.tsx:117:              <div className="about-history-node" aria-hidden="true" />
components/about/HistoryTimeline.tsx:123:              <div className="about-history-col about-history-col--right">
components/about/HistoryTimeline.tsx:153:    <div className="about-history-image">
components/about/HistoryTimeline.tsx:160:        className="about-history-image-file"
components/about/HistoryTimeline.tsx:171:    <div className="about-history-text">
components/about/HistoryTimeline.tsx:172:      <h2 className="about-history-year">
components/about/HistoryTimeline.tsx:177:      <ul className="about-history-list">
components/about/QualityPageContent.tsx:39:    <main className="quality-page">
components/about/QualityPageContent.tsx:46:        className="quality-policy-hero about-center-banner"
components/about/QualityPageContent.tsx:50:          className="quality-policy-hero-image"
components/about/QualityPageContent.tsx:58:        <div className="quality-policy-hero-overlay" aria-hidden="true" />
components/about/QualityPageContent.tsx:60:        <div className="quality-policy-hero-inner about-center-banner__inner">
components/about/QualityPageContent.tsx:61:          <div className="quality-policy-text">
components/about/QualityPageContent.tsx:62:            <p className="about-center-banner__title">{content.heroTitle}</p>
components/about/QualityPageContent.tsx:63:            <p className="about-center-banner__description">
components/about/QualityPageContent.tsx:81:      <section className="quality-life-section" aria-labelledby="qualityLifeTitle">
components/about/QualityPageContent.tsx:82:        <div className="quality-life-inner">
components/about/QualityPageContent.tsx:83:          <div className="quality-life-image-wrap">
components/about/QualityPageContent.tsx:85:              className="quality-life-image"
components/about/QualityPageContent.tsx:93:          <div className="quality-life-content">
components/about/QualityPageContent.tsx:94:            <h2 className="quality-life-title" id="qualityLifeTitle">
components/about/QualityPageContent.tsx:98:            <p className="quality-life-text">
components/about/QualityPageContent.tsx:104:            <div className="quality-life-line" aria-hidden="true" />
components/about/QualityPageContent.tsx:106:            <p className="quality-life-subtext">{content.lifeSubtext}</p>
components/about/QualityPageContent.tsx:116:      <section className="quality-path-section" aria-labelledby="qualityPathTitle">
components/about/QualityPageContent.tsx:122:        <div className="quality-path-bg" aria-hidden="true">
components/about/QualityPageContent.tsx:124:            className="quality-path-bg-image"
components/about/QualityPageContent.tsx:132:        <div className="quality-path-inner">
components/about/QualityPageContent.tsx:133:          <div className="quality-path-heading">
components/about/QualityPageContent.tsx:134:            <h2 className="quality-path-title" id="qualityPathTitle">
components/about/QualityPageContent.tsx:138:            <p className="quality-path-summary">{content.pathSummary}</p>
components/about/QualityPageContent.tsx:141:          <div className="quality-path-timeline" aria-label={content.pathTitle}>
components/about/QualityPageContent.tsx:143:              className="quality-path-line"
components/about/QualityPageContent.tsx:149:                className="quality-path-line-base"
components/about/QualityPageContent.tsx:153:                className="quality-path-line-flow"
components/about/QualityPageContent.tsx:159:              <article className="quality-path-step" key={step.index}>
components/about/QualityPageContent.tsx:160:                <span className="quality-path-index">{step.index}</span>
components/about/QualityPageContent.tsx:161:                <h3 className="quality-path-step-title">{step.title}</h3>
components/about/QualityPageContent.tsx:162:                <p className="quality-path-step-desc">{step.description}</p>
components/about/QualityPageContent.tsx:167:          <div className="quality-path-loop" aria-label={content.loopTitle}>
components/about/QualityPageContent.tsx:168:            <h3 className="quality-path-loop-title">{content.loopTitle}</h3>
components/about/QualityPageContent.tsx:169:            <p className="quality-path-loop-text">{content.loopText}</p>
components/about/QualityPageContent.tsx:180:        className="quality-equipment-section"
components/about/QualityPageContent.tsx:183:        <div className="quality-equipment-inner">
components/about/QualityPageContent.tsx:184:          <div className="quality-equipment-heading">
components/about/QualityPageContent.tsx:185:            <h2 className="quality-equipment-title" id="qualityEquipmentTitle">
components/about/QualityPageContent.tsx:189:            <div className="quality-equipment-intro">
components/about/QualityPageContent.tsx:197:            className="quality-equipment-grid"
components/about/QualityPageContent.tsx:201:              <article className="quality-equipment-item" key={item.name}>
components/about/QualityPageContent.tsx:202:                <div className="quality-equipment-image-wrap">
components/about/QualityPageContent.tsx:204:                    className="quality-equipment-image"
components/about/QualityPageContent.tsx:212:                <h3 className="quality-equipment-name">{item.name}</h3>
components/about/QualityPageContent.tsx:214:                <p className="quality-equipment-desc">{item.description}</p>
components/about/QualityPageContent.tsx:216:                <div className="quality-equipment-data">
components/about/QualityPageContent.tsx:217:                  <div className="quality-equipment-data-title">
components/about/QualityPageContent.tsx:221:                  <ul className="quality-equipment-data-list">
components/about/QualityPageContent.tsx:231:          <p className="quality-equipment-note">{content.equipmentNote}</p>
components/about/QualityPageContent.tsx:243:      <section className="quality-cert-section" aria-labelledby="qualityCertTitle">
components/about/QualityPageContent.tsx:248:        <div className="quality-cert-bg" aria-hidden="true">
components/about/QualityPageContent.tsx:250:            className="quality-cert-bg-image"
components/about/QualityPageContent.tsx:258:        <div className="quality-cert-inner">
components/about/QualityPageContent.tsx:259:          <div className="quality-cert-heading">
components/about/QualityPageContent.tsx:260:            <h2 className="quality-cert-title" id="qualityCertTitle">
components/about/QualityPageContent.tsx:264:            <p className="quality-cert-summary">{content.certSummary}</p>
components/about/QualityPageContent.tsx:267:          <div className="quality-cert-layout">
components/about/QualityPageContent.tsx:268:            <div className="quality-cert-grid" aria-label={content.certTitle}>
components/about/QualityPageContent.tsx:270:                <article className="quality-cert-card" key={item.name}>
components/about/QualityPageContent.tsx:271:                  <div className="quality-cert-image-wrap">
components/about/QualityPageContent.tsx:273:                      className="quality-cert-image"
components/about/QualityPageContent.tsx:281:                  <h3 className="quality-cert-name">{item.name}</h3>
components/about/QualityPageContent.tsx:283:                  <p className="quality-cert-desc">{item.description}</p>
components/about/ResearchManufacturingPageContent.tsx:54:                className="rm-why-svg"
components/about/ResearchManufacturingPageContent.tsx:69:                className="rm-why-svg"
components/about/ResearchManufacturingPageContent.tsx:83:            className="rm-why-svg"
components/about/ResearchManufacturingPageContent.tsx:92:                className="rm-why-svg-accent"
components/about/ResearchManufacturingPageContent.tsx:228:        <main className="rm-page">
components/about/ResearchManufacturingPageContent.tsx:232:            <section className="rm-hero about-center-banner">
components/about/ResearchManufacturingPageContent.tsx:234:                    className="rm-hero-image"
components/about/ResearchManufacturingPageContent.tsx:242:                <div className="rm-hero-overlay" />
components/about/ResearchManufacturingPageContent.tsx:244:                <div className="rm-container rm-hero-inner about-center-banner__inner">
components/about/ResearchManufacturingPageContent.tsx:245:                    <h1 className="rm-hero-title about-center-banner__title">{text.hero.title}</h1>
components/about/ResearchManufacturingPageContent.tsx:246:                    <p className="rm-hero-desc about-center-banner__description">{text.hero.desc}</p>
components/about/ResearchManufacturingPageContent.tsx:247:                    <div className="rm-hero-line" />
components/about/ResearchManufacturingPageContent.tsx:260:            <section className="rm-intro">
components/about/ResearchManufacturingPageContent.tsx:261:                <div className="rm-container rm-intro-layout">
components/about/ResearchManufacturingPageContent.tsx:262:                    <div className="rm-intro-image">
components/about/ResearchManufacturingPageContent.tsx:277:                            <div className="rm-image-mark">{text.intro.imageMark}</div>
components/about/ResearchManufacturingPageContent.tsx:281:                    <div className="rm-intro-copy">
components/about/ResearchManufacturingPageContent.tsx:282:                        <h2 className="rm-section-title">{text.intro.title}</h2>
components/about/ResearchManufacturingPageContent.tsx:283:                        <p className="rm-section-desc">{text.intro.desc}</p>
components/about/ResearchManufacturingPageContent.tsx:291:            <section className="rm-ability">
components/about/ResearchManufacturingPageContent.tsx:292:                <div className="rm-container-wide">
components/about/ResearchManufacturingPageContent.tsx:293:                    <div className="rm-section-head">
components/about/ResearchManufacturingPageContent.tsx:294:                        <h2 className="rm-section-title">{text.abilityTitle}</h2>
components/about/ResearchManufacturingPageContent.tsx:297:                    <div className="rm-card-grid">
components/about/ResearchManufacturingPageContent.tsx:300:                                className={`rm-card ${activeAbility === index ? "is-expanded" : ""
components/about/ResearchManufacturingPageContent.tsx:306:                                <div className="rm-card-image">
components/about/ResearchManufacturingPageContent.tsx:315:                                <div className="rm-card-body">
components/about/ResearchManufacturingPageContent.tsx:316:                                    <h3 className="rm-card-title">{card.title}</h3>
components/about/ResearchManufacturingPageContent.tsx:318:                                    <div className="rm-card-list-area">
components/about/ResearchManufacturingPageContent.tsx:319:                                        <ul className="rm-card-list">
components/about/ResearchManufacturingPageContent.tsx:336:                className={`rm-process ${processIndex !== null ? "is-hovering" : ""}`}
components/about/ResearchManufacturingPageContent.tsx:340:                    className="rm-process-image"
components/about/ResearchManufacturingPageContent.tsx:347:                <div className="rm-process-overlay" />
components/about/ResearchManufacturingPageContent.tsx:349:                <div className="rm-process-content">
components/about/ResearchManufacturingPageContent.tsx:350:                    <div className="rm-process-title">
components/about/ResearchManufacturingPageContent.tsx:353:                                <span className="rm-process-title-main">
components/about/ResearchManufacturingPageContent.tsx:357:                                <ul className="rm-process-title-list">
components/about/ResearchManufacturingPageContent.tsx:368:                    <div className="rm-process-steps">
components/about/ResearchManufacturingPageContent.tsx:371:                                className={`rm-process-step ${processIndex === index ? "is-active" : ""
components/about/ResearchManufacturingPageContent.tsx:388:            <section className="rm-supply">
components/about/ResearchManufacturingPageContent.tsx:389:                <div className="rm-container-wide">
components/about/ResearchManufacturingPageContent.tsx:390:                    <div className="rm-supply-head">
components/about/ResearchManufacturingPageContent.tsx:391:                        <h2 className="rm-section-title">{text.applications.title}</h2>
components/about/ResearchManufacturingPageContent.tsx:392:                        <p className="rm-section-desc">{text.applications.desc}</p>
components/about/ResearchManufacturingPageContent.tsx:395:                    <div className="rm-supply-carousel">
components/about/ResearchManufacturingPageContent.tsx:396:                        <div className="rm-supply-window">
components/about/ResearchManufacturingPageContent.tsx:397:                            <div className="rm-supply-track" ref={applicationTrackRef}>
components/about/ResearchManufacturingPageContent.tsx:406:                                            className={`rm-supply-card ${isActive ? "is-active" : ""
components/about/ResearchManufacturingPageContent.tsx:413:                                                className="rm-supply-image"
components/about/ResearchManufacturingPageContent.tsx:420:                                            <div className="rm-supply-mask" />
components/about/ResearchManufacturingPageContent.tsx:422:                                            <div className="rm-supply-copy">
components/about/ResearchManufacturingPageContent.tsx:423:                                                <h3 className="rm-supply-title">{card.title}</h3>
components/about/ResearchManufacturingPageContent.tsx:424:                                                <p className="rm-supply-desc">{card.desc}</p>
components/about/ResearchManufacturingPageContent.tsx:432:                        <div className="rm-supply-navigator">
components/about/ResearchManufacturingPageContent.tsx:434:                                className="rm-supply-timeline"
components/about/ResearchManufacturingPageContent.tsx:439:                                        className={`rm-supply-nav-item ${applicationIndex === index ? "is-active" : ""
components/about/ResearchManufacturingPageContent.tsx:446:                                        <span className="rm-supply-nav-dot" />
components/about/ResearchManufacturingPageContent.tsx:458:<section className="rm-why">
components/about/ResearchManufacturingPageContent.tsx:460:    className="rm-why-bg"
components/about/ResearchManufacturingPageContent.tsx:467:  <div className="rm-why-bg-mask" />
components/about/ResearchManufacturingPageContent.tsx:469:  <div className="rm-container-wide">
components/about/ResearchManufacturingPageContent.tsx:470:    <div className="rm-why-head">
components/about/ResearchManufacturingPageContent.tsx:471:      <h2 className="rm-why-title">{text.why.title}</h2>
components/about/ResearchManufacturingPageContent.tsx:472:      <p className="rm-why-subtitle">{text.why.subtitle}</p>
components/about/ResearchManufacturingPageContent.tsx:481:    <div className="rm-why-grid">
components/about/ResearchManufacturingPageContent.tsx:483:        <article className="rm-why-card" key={card.title}>
components/about/ResearchManufacturingPageContent.tsx:484:          <div className="rm-why-icon">
components/about/ResearchManufacturingPageContent.tsx:499:            <section className="rm-cta">
components/about/ResearchManufacturingPageContent.tsx:501:                    className="rm-cta-bg"
components/about/ResearchManufacturingPageContent.tsx:508:                <div className="rm-cta-mask" />
components/about/ResearchManufacturingPageContent.tsx:510:                <div className="rm-container">
components/about/ResearchManufacturingPageContent.tsx:511:                    <div className="rm-cta-panel">
components/about/ResearchManufacturingPageContent.tsx:513:                            <h2 className="rm-cta-title">{text.cta.title}</h2>
components/about/ResearchManufacturingPageContent.tsx:514:                            <p className="rm-cta-desc">{text.cta.desc}</p>
components/about/ResearchManufacturingPageContent.tsx:518:                            className="rm-cta-button"
components/resources/DatasheetsClient.tsx:146:    <main className="datasheets-page">
components/resources/DatasheetsClient.tsx:150:      <section className="datasheets-hero resource-center-banner">
components/resources/DatasheetsClient.tsx:152:          className="datasheets-hero-image"
components/resources/DatasheetsClient.tsx:157:        <div className="datasheets-hero-overlay" />
components/resources/DatasheetsClient.tsx:159:        <div className="datasheets-hero-inner resource-center-banner__inner">
components/resources/DatasheetsClient.tsx:160:          <h1 className="datasheets-hero-title resource-center-banner__title">{pageText.hero.title}</h1>
components/resources/DatasheetsClient.tsx:162:          <p className="datasheets-hero-desc resource-center-banner__description">{pageText.hero.description}</p>
components/resources/DatasheetsClient.tsx:170:        className="breadcrumb-bar"
components/resources/DatasheetsClient.tsx:173:        <div className="breadcrumb-bar-inner">
components/resources/DatasheetsClient.tsx:210:      <section id="datasheets" className="content-wrap">
components/resources/DatasheetsClient.tsx:212:        <div className="datasheets-category-bar">
components/resources/DatasheetsClient.tsx:214:            className="filter-row section-filter-row"
components/resources/DatasheetsClient.tsx:221:                className={`filter-btn ${
components/resources/DatasheetsClient.tsx:235:        <div className="section-head">
components/resources/DatasheetsClient.tsx:236:          <div className="section-head-main">
components/resources/DatasheetsClient.tsx:237:            <h2 className="section-title">{pageText.section.title}</h2>
components/resources/DatasheetsClient.tsx:239:            <p className="section-desc">{pageText.section.description}</p>
components/resources/DatasheetsClient.tsx:242:          <div className="result-count">
components/resources/DatasheetsClient.tsx:251:          <div className="datasheet-list">
components/resources/DatasheetsClient.tsx:253:              <article className="datasheet-row" key={item.id}>
components/resources/DatasheetsClient.tsx:255:                <div className="product-thumb">
components/resources/DatasheetsClient.tsx:265:                <div className="row-main">
components/resources/DatasheetsClient.tsx:266:                  <div className="row-title-line">
components/resources/DatasheetsClient.tsx:267:                    <h3 className="row-title">{item.title}</h3>
components/resources/DatasheetsClient.tsx:269:                    <span className="row-label">{item.label}</span>
components/resources/DatasheetsClient.tsx:272:                  <div className="row-meta">
components/resources/DatasheetsClient.tsx:292:                  <p className="row-desc">{item.description}</p>
components/resources/DatasheetsClient.tsx:296:                <div className="row-actions">
components/resources/DatasheetsClient.tsx:298:                    <Link className="row-link" href={item.productHref}>
components/resources/DatasheetsClient.tsx:304:                    <Link className="row-custom" href={item.downloadHref}>
components/resources/DatasheetsClient.tsx:309:                      className="row-download"
components/resources/DatasheetsClient.tsx:324:          <div className="empty-state">
components/resources/DatasheetsClient.tsx:325:            <div className="empty-title">{pageText.section.emptyTitle}</div>
components/resources/DatasheetsClient.tsx:327:            <p className="empty-desc">{pageText.section.emptyDescription}</p>
components/resources/DatasheetsClient.tsx:335:      <section className="support-section">
components/resources/DatasheetsClient.tsx:336:        <div className="support-inner">
components/resources/DatasheetsClient.tsx:338:            <div className="support-kicker">{pageText.support.kicker}</div>
components/resources/DatasheetsClient.tsx:340:            <h2 className="support-title">{pageText.support.title}</h2>
components/resources/DatasheetsClient.tsx:342:            <p className="support-desc">{pageText.support.description}</p>
components/resources/DatasheetsClient.tsx:345:          <div className="support-actions">
components/resources/DatasheetsClient.tsx:346:            <Link className="support-btn" href={pageText.support.buttonHref}>
components/resources/ResourceSearchBar.tsx:78:    <section className={rootClassName} data-touch-feedback="neutral">
components/resources/ResourceSearchBar.tsx:79:      <form className={formClassName} onSubmit={handleSubmit}>
components/resources/ResourceSearchBar.tsx:81:          className={inputClassName}
components/resources/ResourceSearchBar.tsx:87:        <button className={buttonClassName} type="submit">
components/resources/ResourceSearchBar.tsx:93:        <div className={recentClassName}>
components/resources/ResourceSearchBar.tsx:94:          <span className={recentLabelClassName}>{recentLabel}</span>
components/resources/ResourceSearchBar.tsx:103:                className={`${recentButtonClassName} ${
components/resources/ResourceSupportCta.tsx:43:    <section className={styles.resourceSupportCta}>
components/resources/ResourceSupportCta.tsx:44:      <div className={styles.inner}>
components/resources/ResourceSupportCta.tsx:45:        <div className={styles.content}>
components/resources/ResourceSupportCta.tsx:46:          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
components/resources/ResourceSupportCta.tsx:52:        <Link className={styles.button} href={href}>
components/resources/fitting-replacement/FittingReplacementDetail.tsx:252:    <div className="fitting-replacement-detail-page">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:253:      <main className="frd-main">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:254:        <div className="frd-container">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:263:          <section className="frd-detail-section">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:264:            <div className="frd-detail-layout">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:265:              <div className="frd-product-visual">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:275:              <div className="frd-info-area">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:276:                <div className="frd-title-block">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:280:                <table className="frd-compact-table">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:282:                    <tr className="frd-head-row">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:283:                      <td className="frd-label">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:286:                      <td className="frd-value" colSpan={3}>
components/resources/fitting-replacement/FittingReplacementDetail.tsx:292:                      <td className="frd-label">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:295:                      <td className="frd-value" colSpan={3}>
components/resources/fitting-replacement/FittingReplacementDetail.tsx:308:                          <td className="frd-label">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:312:                          <td className="frd-value">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:318:                              <td className="frd-label">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:322:                              <td className="frd-value">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:327:                            <td className="frd-empty" colSpan={2} />
components/resources/fitting-replacement/FittingReplacementDetail.tsx:335:                <div className="frd-detail-action-row">
components/resources/fitting-replacement/FittingReplacementDetail.tsx:337:                    className={
components/resources/fitting-replacement/FittingReplacementDetail.tsx:351:                    className={
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:62:    <section className="frd-drawing-section">
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:63:<div className="frd-drawing-viewer">
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:78:          className="frd-drawing-object is-visible"
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:88:            className="frd-drawing-preview-card"
components/resources/fitting-replacement/FittingReplacementDrawingPreview.tsx:94:            <span className="frd-drawing-play-icon" aria-hidden="true" />
components/resources/fitting-replacement/FittingReplacementFaq.tsx:46:    <section className="frd-faq-section" aria-labelledby="frd-faq-title">
components/resources/fitting-replacement/FittingReplacementFaq.tsx:47:      <div className="frd-faq-layout">
components/resources/fitting-replacement/FittingReplacementFaq.tsx:48:        <div className="frd-faq-heading">
components/resources/fitting-replacement/FittingReplacementFaq.tsx:54:        <div className="frd-faq-list">
components/resources/fitting-replacement/FittingReplacementFaq.tsx:60:                className={isActive ? "frd-faq-item is-active" : "frd-faq-item"}
components/resources/fitting-replacement/FittingReplacementFaq.tsx:64:                  className="frd-faq-question"
components/resources/fitting-replacement/FittingReplacementFaq.tsx:75:                  <div className="frd-faq-answer">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:428:    <section className="frg-guide-section">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:429:      <div className="frg-guide-head">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:439:          className="frg-clear-button"
components/resources/fitting-replacement/FittingReplacementGuide.tsx:448:      <div className="frg-step-list">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:455:            <section className="frg-step-item" key={step.fieldKey}>
components/resources/fitting-replacement/FittingReplacementGuide.tsx:456:              <div className="frg-step-title">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:465:              <div className="frg-option-row">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:472:                      className={`frg-option-button ${isActive ? "is-active" : ""
components/resources/fitting-replacement/FittingReplacementGuide.tsx:491:      <section className="frg-result-section">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:492:        <div className="frg-result-head">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:515:          <div className="frg-empty-box">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:520:          <div className="frg-empty-box">
components/resources/fitting-replacement/FittingReplacementGuide.tsx:525:          <div className="frp-card-grid">
components/resources/fitting-replacement/FittingReplacementHome.tsx:220:    <div className="fitting-replacement-page">
components/resources/fitting-replacement/FittingReplacementHome.tsx:221:      <section className="frp-hero resource-center-banner">
components/resources/fitting-replacement/FittingReplacementHome.tsx:222:        <div className="frp-container frp-hero-inner resource-center-banner__inner">
components/resources/fitting-replacement/FittingReplacementHome.tsx:223:          <div className="resource-center-banner__content">
components/resources/fitting-replacement/FittingReplacementHome.tsx:224:            <h1 className="frp-hero-title resource-center-banner__title">{data.banner.title}</h1>
components/resources/fitting-replacement/FittingReplacementHome.tsx:225:            <p className="frp-hero-desc resource-center-banner__description">{data.banner.description}</p>
components/resources/fitting-replacement/FittingReplacementHome.tsx:230:      <main className="frp-main">
components/resources/fitting-replacement/FittingReplacementHome.tsx:231:        <div className="frp-container">
components/resources/fitting-replacement/FittingReplacementHome.tsx:240:        <section className="frp-search-panel">
components/resources/fitting-replacement/FittingReplacementHome.tsx:241:          <div className="frp-container frp-search-panel-inner">
components/resources/fitting-replacement/FittingReplacementHome.tsx:242:            <div className="frp-search-row">
components/resources/fitting-replacement/FittingReplacementHome.tsx:244:                className="frp-search-input"
components/resources/fitting-replacement/FittingReplacementHome.tsx:264:                className="frp-search-button"
components/resources/fitting-replacement/FittingReplacementHome.tsx:272:            <div className="frp-history-row">
components/resources/fitting-replacement/FittingReplacementHome.tsx:273:              <span className="frp-history-label">
components/resources/fitting-replacement/FittingReplacementHome.tsx:286:                    className={`frp-history-button ${
components/resources/fitting-replacement/FittingReplacementHome.tsx:306:        <section className="frp-card-section">
components/resources/fitting-replacement/FittingReplacementHome.tsx:307:          <div className="frp-container">
components/resources/fitting-replacement/FittingReplacementHome.tsx:309:              <div className="frp-empty-result">
components/resources/fitting-replacement/FittingReplacementHome.tsx:321:                <div className="frp-section-head">
components/resources/fitting-replacement/FittingReplacementHome.tsx:353:                <div className="frp-card-grid">
components/resources/fitting-replacement/FittingReplacementHome.tsx:388:                        className="frp-compatible-card"
components/resources/fitting-replacement/FittingReplacementHome.tsx:427:                  <div className="frp-pagination">
components/resources/fitting-replacement/FittingSelectionCart.tsx:100:      <div className={`frp-floating-actions ${isOpen ? "is-hidden" : ""}`}>
components/resources/fitting-replacement/FittingSelectionCart.tsx:124:          <div className="frp-cart-mask" onClick={onClose} />
components/resources/fitting-replacement/FittingSelectionCart.tsx:126:          <aside className="frp-cart-drawer" aria-label="选型清单">
components/resources/fitting-replacement/FittingSelectionCart.tsx:127:            <div className="frp-cart-head">
components/resources/fitting-replacement/FittingSelectionCart.tsx:138:            <div className="frp-cart-body">
components/resources/fitting-replacement/FittingSelectionCart.tsx:140:                <div className="frp-cart-empty">
components/resources/fitting-replacement/FittingSelectionCart.tsx:150:                  <div className="frp-cart-summary">
components/resources/fitting-replacement/FittingSelectionCart.tsx:167:                  <div className="frp-cart-list">
components/resources/fitting-replacement/FittingSelectionCart.tsx:172:                        <article className="frp-cart-item" key={item.productCode}>
components/resources/fitting-replacement/FittingSelectionCart.tsx:174:                            className="frp-cart-item-remove"
components/resources/fitting-replacement/FittingSelectionCart.tsx:184:                          <div className="frp-cart-item-head">
components/resources/fitting-replacement/FittingSelectionCart.tsx:188:                              className={
components/resources/fitting-replacement/FittingSelectionCart.tsx:210:                          <div className="frp-cart-code-line">
components/resources/fitting-replacement/FittingSelectionCart.tsx:217:                          <div className="frp-cart-code-line">
components/resources/fitting-replacement/FittingSelectionCart.tsx:222:                          <div className="frp-cart-qty-row">
components/resources/fitting-replacement/FittingSelectionCart.tsx:247:              <div className="frp-cart-note">
components/resources/fitting-replacement/FittingSelectionCart.tsx:256:            <div className="frp-cart-footer">
components/resources/fitting-replacement/FittingSelectionCart.tsx:257:              <div className="frp-cart-footer-actions">
components/resources/fitting-replacement/FittingSelectionCart.tsx:260:                    className="frp-cart-action-primary"
components/resources/fitting-replacement/FittingSelectionCart.tsx:269:                  className="frp-cart-action-secondary"
components/resources/fitting-replacement/FittingSelectionCart.tsx:277:                  className="frp-cart-action-ghost"
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:824:    <svg className={styles.chartSvg} viewBox={`0 0 ${CHART_WIDTH} ${height}`} role="img" aria-label={t("PQ characteristic curve generated from the current calculation parameters", "根据当前计算参数生成的 PQ 特性曲线")}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:826:      <text className={styles.chartTitle} x={CHART_WIDTH / 2} y={21}>{t("PQ Characteristic Curve", "PQ 特性曲线")} ({t("Operating flow", "工作流量")} {formatValue(currentFlow, 2)} ml/min)</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:831:            <line className={styles.chartGrid} x1={x} y1={CHART_MARGIN.top} x2={x} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:832:            <text className={styles.chartTick} x={x} y={CHART_MARGIN.top + scale.plotHeight + 22} textAnchor="middle">{formatScientificAxisTick(value, xAxis.exponent)}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:840:            <line className={styles.chartGrid} x1={CHART_MARGIN.left} y1={y} x2={CHART_MARGIN.left + scale.plotWidth} y2={y} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:841:            <text className={styles.chartTick} x={CHART_MARGIN.left - 10} y={y + 4} textAnchor="end">{formatScientificAxisTick(value, yAxis.exponent)}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:845:      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top} x2={CHART_MARGIN.left} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:846:      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top + scale.plotHeight} x2={CHART_MARGIN.left + scale.plotWidth} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:848:        <text className={styles.chartTick} x={CHART_MARGIN.left - 56} y={CHART_MARGIN.top - 9}>{`1e${yAxis.exponent}`}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:850:      <polyline className={styles.rawCurve} points={rawPoints} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:851:      <polyline className={styles.fitCurve} points={fitPoints} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:854:          className={styles.nonMonotonicCurve}
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:867:            className={styles.samplePoint}
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:879:      <circle className={styles.workPoint} cx={scale.x(currentFlow)} cy={scale.y(currentPressure)} r="6">
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:882:      <text className={styles.chartLabel} x={CHART_MARGIN.left + scale.plotWidth / 2} y={height - 10} textAnchor="middle">{t("Flow", "流量")} (ml/min){xAxis.exponent ? `  1e${xAxis.exponent}` : ""}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:883:      <text className={styles.chartLabel} transform={`translate(18 ${CHART_MARGIN.top + scale.plotHeight / 2}) rotate(-90)`} textAnchor="middle">{t("Total Pressure Drop", "总压降")} (Pa)</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:884:      <line className={styles.rawCurve} x1={CHART_MARGIN.left} y1={height - 31} x2={CHART_MARGIN.left + 28} y2={height - 31} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:885:      <text className={styles.legendText} x={CHART_MARGIN.left + 35} y={height - 27}>{t("PQ Curve", "PQ 曲线")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:886:      <line className={styles.fitCurve} x1={CHART_MARGIN.left + 120} y1={height - 31} x2={CHART_MARGIN.left + 148} y2={height - 31} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:887:      <text className={styles.legendText} x={CHART_MARGIN.left + 155} y={height - 27}>{t("Polynomial Fit", "多项式拟合")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:888:      <rect className={styles.samplePoint} x={CHART_MARGIN.left + 258} y={height - 35} width="7" height="7" transform={`rotate(45 ${CHART_MARGIN.left + 261.5} ${height - 31.5})`} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:889:      <text className={styles.legendText} x={CHART_MARGIN.left + 273} y={height - 27}>{t("Samples", "采样点")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:890:      <circle className={styles.workPoint} cx={CHART_MARGIN.left + 353} cy={height - 31} r="4" />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:891:      <text className={styles.legendText} x={CHART_MARGIN.left + 364} y={height - 27}>{t("Operating Point", "工作点")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:894:          <line className={styles.nonMonotonicCurve} x1={CHART_MARGIN.left + 435} y1={height - 31} x2={CHART_MARGIN.left + 463} y2={height - 31} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:895:          <text className={styles.legendText} x={CHART_MARGIN.left + 470} y={height - 27}>{t("Non-Monotonic Segment", "非单调段")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:914:    <svg className={styles.residualSvg} viewBox={`0 0 ${CHART_WIDTH} ${height}`} role="img" aria-label={t("Residual chart generated from the current polynomial fit", "根据当前多项式拟合结果生成的残差图")}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:916:      <text className={styles.chartTitle} x={CHART_WIDTH / 2} y={21}>{t("Residual Plot", "残差图")}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:921:            <line className={styles.chartGrid} x1={x} y1={CHART_MARGIN.top} x2={x} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:922:            <text className={styles.chartTick} x={x} y={CHART_MARGIN.top + scale.plotHeight + 22} textAnchor="middle">{formatScientificAxisTick(value, xAxis.exponent)}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:930:            <line className={styles.chartGrid} x1={CHART_MARGIN.left} y1={y} x2={CHART_MARGIN.left + scale.plotWidth} y2={y} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:931:            <text className={styles.chartTick} x={CHART_MARGIN.left - 10} y={y + 4} textAnchor="end">{formatScientificAxisTick(value, yAxis.exponent)}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:936:        <text className={styles.chartTick} x={CHART_MARGIN.left - 56} y={CHART_MARGIN.top - 9}>{`1e${yAxis.exponent}`}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:938:      <line className={styles.zeroLine} x1={CHART_MARGIN.left} y1={scale.y(0)} x2={CHART_MARGIN.left + scale.plotWidth} y2={scale.y(0)} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:939:      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top} x2={CHART_MARGIN.left} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:940:      <line className={styles.chartAxis} x1={CHART_MARGIN.left} y1={CHART_MARGIN.top + scale.plotHeight} x2={CHART_MARGIN.left + scale.plotWidth} y2={CHART_MARGIN.top + scale.plotHeight} />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:942:        <circle className={styles.residualPoint} key={`${sample.q}-${index}`} cx={scale.x(sample.predicted)} cy={scale.y(sample.residual)} r="4">
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:946:      <text className={styles.chartLabel} x={CHART_MARGIN.left + scale.plotWidth / 2} y={height - 10} textAnchor="middle">{t("Predicted Pressure Drop", "预测压降")} (Pa){xAxis.exponent ? `  1e${xAxis.exponent}` : ""}</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:947:      <text className={styles.chartLabel} transform={`translate(18 ${CHART_MARGIN.top + scale.plotHeight / 2}) rotate(-90)`} textAnchor="middle">{t("Residual", "残差")} (Pa)</text>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1217:    <section className={styles.page} data-locale={locale}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1218:      <div className={styles.workbench}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1219:        <aside className={styles.sidebar}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1220:          <section className={styles.section}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1221:            <h2 className={styles.sectionTitle}>{t("Fluid and Engineering Parameters", "流体与工程参数")}</h2>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1222:            <div className={styles.sectionBody}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1223:              <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1229:              <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1235:                <div className={styles.customFluid}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1236:                  <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1240:                  <div className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1242:                    <div className={styles.segment}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1244:                        <button key={mode} type="button" className={viscosityMode === mode ? styles.selected : ""} onClick={() => setViscosityMode(mode)}>{mode === "动力黏度" ? t("Dynamic", "动力黏度") : t("Kinematic", "运动黏度")}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1248:                  <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1255:              <div className={styles.propertyList}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1264:          <section className={styles.section}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1265:            <h2 className={styles.sectionTitle}>{t("Calculation Parameters", "计算参数")}</h2>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1266:            <div className={styles.sectionBody}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1267:              <div className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1269:                <div className={styles.segment}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1271:                    <button key={mode} type="button" className={cvModel === mode ? styles.selected : ""} onClick={() => setCvModel(mode)}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1282:              <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1289:              <div className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1291:                <div className={styles.segment}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1293:                    <button key={mode} type="button" className={calculationMode === mode ? styles.selected : ""} onClick={() => setCalculationMode(mode)}>{mode === "已知流量（求压降）" ? t("Known Flow (Pressure Drop)", mode) : t("Known Pressure Drop (Flow)", mode)}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1298:              <div className={styles.subgroup}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1300:                <div className={styles.inputPair}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1301:                  <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1305:                  <label className={styles.field}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1316:            <div className={styles.buttonStack}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1317:              <button className={styles.primaryButton} type="button" onClick={runCalculation}>{t("Calculate", "开始计算")}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1318:              <button className={styles.secondaryButton} type="button" onClick={exportExcel}>{t("Export Excel", "导出 Excel")}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1323:        <div className={styles.workspace}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1324:          <section className={styles.panel}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1325:            <div className={styles.panelHeader}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1327:              <div className={styles.actions}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1329:                <button className={styles.deleteButton} type="button" onClick={deleteSelectedRow}>- {t("Delete Selected Row", "删除选中行")}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1332:            <div className={styles.inputTableWrap}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1333:              <table className={styles.inputTable}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1341:                    <tr key={row.id} className={selectedRowId === row.id ? styles.selectedRow : ""} onClick={() => setSelectedRowId(row.id)}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1357:          <section className={`${styles.panel} ${styles.resultPanel}`}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1359:              className={styles.tabs}
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1366:              <span className={styles.tabIndicator} aria-hidden="true" />
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1373:                <button key={key} type="button" role="tab" aria-selected={activeTab === key} className={activeTab === key ? styles.activeTab : ""} onClick={() => setActiveTab(key)}>{label}</button>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1378:              <div className={styles.emptyState}>{t("Set the parameters and run the calculation.", "请设置参数并开始计算")}</div>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1382:              <div className={styles.resultTableWrap}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1383:                <table className={styles.resultTable}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1400:              <div className={styles.statisticsPanel}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1401:                <p className={styles.conditionLine}>{t("Current condition", "当前工况")}: {localizedName(fluidType, locale)} | {temperature}C | {t("Total flow", "总流量")} {formatValue(calculation.currentFlow, 3)} ml/min</p>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1402:                <div className={styles.metricGrid}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1409:                <div className={styles.metricGrid}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1415:                <div className={styles.analysisList}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1424:              <div className={styles.chartPanel}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1432:                <p className={calculation.pqData.some((point) => point.is_non_monotonic) ? styles.chartWarning : styles.chartNotice}>{calculation.pqData.some((point) => point.is_non_monotonic) ? t("A non-monotonic segment was detected within the sampling range.", "在采样范围内检测到非单调区段。") : t("No non-monotonic segment was detected within the sampling range; the flow characteristic is monotonic.", "在采样范围内未检测到非单调段，流动特性单调。")}</p>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1437:              <div className={styles.polynomialPanel}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1438:                <div className={styles.formula}>{calculation.polynomial.formula}</div>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1439:                <table className={styles.metricsTable}>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1451:                <div className={styles.residualChart}><ResidualChart polynomial={calculation.polynomial} locale={locale} /></div>
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:1455:            <div className={styles.statusBar}>{calculation?.summary ?? t("Ready", "等待计算")}</div>
components/resources/installation-guide/InstallationGuideClient.tsx:596:    <main className="installation-guide-page">
components/resources/installation-guide/InstallationGuideClient.tsx:617:      <section className="installation-guide-main">
components/resources/installation-guide/InstallationGuideClient.tsx:618:        <aside className="installation-guide-sidebar">
components/resources/installation-guide/InstallationGuideClient.tsx:619:          <div className="installation-guide-sidebar-head">
components/resources/installation-guide/InstallationGuideClient.tsx:625:          <div className="installation-guide-tree">
components/resources/installation-guide/InstallationGuideClient.tsx:641:                    className={`installation-guide-tree-group ${
components/resources/installation-guide/InstallationGuideClient.tsx:647:                      className={`installation-guide-tree-parent ${
components/resources/installation-guide/InstallationGuideClient.tsx:666:                      <div className="installation-guide-tree-children">
components/resources/installation-guide/InstallationGuideClient.tsx:681:                                className={`installation-guide-tree-child ${
components/resources/installation-guide/InstallationGuideClient.tsx:707:        <section className="installation-guide-content">
components/resources/installation-guide/InstallationGuideClient.tsx:709:            <div className="installation-guide-card-grid">
components/resources/installation-guide/InstallationGuideClient.tsx:727:                      className={`installation-guide-card ${
components/resources/installation-guide/InstallationGuideClient.tsx:736:                        className="installation-guide-card-image"
components/resources/installation-guide/InstallationGuideClient.tsx:741:                          className="installation-guide-card-play"
components/resources/installation-guide/InstallationGuideClient.tsx:746:                      <div className="installation-guide-card-body">
components/resources/installation-guide/InstallationGuideClient.tsx:752:                          <div className="installation-guide-card-tags">
components/resources/installation-guide/InstallationGuideClient.tsx:771:            <div className="installation-guide-empty">
components/resources/installation-guide/InstallationGuideClient.tsx:795:          className="installation-guide-modal-backdrop"
components/resources/installation-guide/InstallationGuideClient.tsx:799:            className="installation-guide-modal"
components/resources/installation-guide/InstallationGuideClient.tsx:810:              className="installation-guide-modal-close"
components/resources/installation-guide/InstallationGuideClient.tsx:823:              className={`installation-guide-modal-stage ${
components/resources/installation-guide/InstallationGuideClient.tsx:835:                  className="installation-guide-modal-video"
components/resources/installation-guide/InstallationGuideClient.tsx:847:                  className="installation-guide-modal-iframe"
components/resources/installation-guide/InstallationGuideClient.tsx:856:                <div className="installation-guide-modal-empty">
components/resources/installation-guide/InstallationGuideClient.tsx:869:            <div className="installation-guide-modal-title">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:334:      <section className="material-compatibility-main">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:335:        <div className="material-compatibility-main__inner">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:339:          <div className="material-compatibility-tabs" role="tablist">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:344:                className={
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:359:          <div className="material-compatibility-search">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:375:          <div className="material-compatibility-head">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:385:          <div className="material-compatibility-panel">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:386:            <div className="material-compatibility-note">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:437:    <div className="material-compatibility-table-wrap">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:438:      <table className="material-compatibility-table">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:460:                        className={`material-compatibility-mark ${getCompatibilityMarkClass(
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:472:            <tr className="is-empty">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:501:    <div className="material-compatibility-table-wrap">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:502:      <table className="material-compatibility-table material-compatibility-table--text">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:525:            <tr className="is-empty">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:548:    <div className="material-compatibility-table-wrap">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:549:      <table className="material-compatibility-table">
components/resources/material-compatibility/MaterialCompatibilityClient.tsx:572:            <tr className="is-empty">
components/resources/news/NewsArticleClient.tsx:269:      <div className={`${styles.pagerCard} ${styles.emptyPagerCard}`}>
components/resources/news/NewsArticleClient.tsx:278:      className={`${styles.pagerCard} ${
components/resources/news/NewsArticleClient.tsx:398:    <main className={styles.page}>
components/resources/news/NewsArticleClient.tsx:402:      <article className={styles.article}>
components/resources/news/NewsArticleClient.tsx:403:        <header className={styles.header}>
components/resources/news/NewsArticleClient.tsx:404:          <div className={styles.container}>
components/resources/news/NewsArticleClient.tsx:405:            <Link className={styles.backLink} href={listHref}>
components/resources/news/NewsArticleClient.tsx:409:            <h1 className={styles.title}>{article.title}</h1>
components/resources/news/NewsArticleClient.tsx:411:            <time className={styles.date}>{article.date}</time>
components/resources/news/NewsArticleClient.tsx:414:              <p className={styles.summary}>{article.summary}</p>
components/resources/news/NewsArticleClient.tsx:423:          <section className={styles.coverSection}>
components/resources/news/NewsArticleClient.tsx:424:            <div className={styles.container}>
components/resources/news/NewsArticleClient.tsx:426:                  className={
components/resources/news/NewsArticleClient.tsx:447:        <section className={styles.contentSection}>
components/resources/news/NewsArticleClient.tsx:448:          <div className={styles.container}>
components/resources/news/NewsArticleClient.tsx:449:            <div className={styles.content}>
components/resources/news/NewsArticleClient.tsx:466:                                                      className={styles.contentBlock}
components/resources/news/NewsArticleClient.tsx:496:      <section className={styles.pagerSection}>
components/resources/news/NewsArticleClient.tsx:497:        <div className={styles.container}>
components/resources/news/NewsArticleClient.tsx:498:          <div className={styles.pagerGrid}>
components/resources/news/NewsArticleClient.tsx:519:      <section className={styles.supportSection}>
components/resources/news/NewsListClient.tsx:133:    <main className="newsPage">
components/resources/news/NewsListClient.tsx:135:        className="newsHero resource-center-banner"
components/resources/news/NewsListClient.tsx:140:        <div className="newsHero__inner resource-center-banner__inner">
components/resources/news/NewsListClient.tsx:141:          <h1 className="newsHero__title resource-center-banner__title">{pageData.hero.title}</h1>
components/resources/news/NewsListClient.tsx:142:          <p className="newsHero__description resource-center-banner__description">{pageData.hero.description}</p>
components/resources/news/NewsListClient.tsx:152:      <section className="newsSearchSection">
components/resources/news/NewsListClient.tsx:163:      <section className="newsListSection">
components/resources/news/NewsListClient.tsx:164:        <div className="newsListSection__head">
components/resources/news/NewsListClient.tsx:165:          <h2 className="newsListSection__title">{pageData.sectionTitle}</h2>
components/resources/news/NewsListClient.tsx:168:            className="newsCategoryTabs"
components/resources/news/NewsListClient.tsx:179:                className={
components/resources/news/NewsListClient.tsx:194:            <div className="newsGrid">
components/resources/news/NewsListClient.tsx:206:                className="newsPagination"
components/resources/news/NewsListClient.tsx:215:                  className="newsPagination__button"
components/resources/news/NewsListClient.tsx:222:                <span className="newsPagination__status">
components/resources/news/NewsListClient.tsx:228:                  className="newsPagination__button"
components/resources/news/NewsListClient.tsx:238:          <div className="newsEmpty">
components/resources/news/NewsListClient.tsx:261:    <Link className="newsCard" href={href}>
components/resources/news/NewsListClient.tsx:262:      <div className="newsCard__image">
components/resources/news/NewsListClient.tsx:271:      <div className="newsCard__body">
components/resources/news/NewsListClient.tsx:272:        <h3 className="newsCard__title">{article.title}</h3>
components/resources/news/NewsListClient.tsx:273:        <time className="newsCard__date">{article.date}</time>
components/resources/news/NewsListClient.tsx:274:        <p className="newsCard__summary">{article.summary}</p>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:738:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:748:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:752:          className={styles.pagerGrid}
components/resources/news/articles/Adlm2026DepartureArticle.tsx:757:              className={styles.pagerCard}
components/resources/news/articles/Adlm2026DepartureArticle.tsx:767:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:777:          className={styles.pagerGrid}
components/resources/news/articles/Adlm2026DepartureArticle.tsx:782:              className={styles.pagerCard}
components/resources/news/articles/Adlm2026DepartureArticle.tsx:793:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:803:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:813:      <article className={styles.contentBlock}>
components/resources/news/articles/Adlm2026DepartureArticle.tsx:818:          className={styles.pagerGrid}
components/resources/news/articles/Adlm2026DepartureArticle.tsx:823:              className={styles.pagerCard}
components/resources/technical-articles/TechnicalArticleDetail.tsx:218:    <div className="newsArticleDetailPage" data-locale={locale}>
components/resources/technical-articles/TechnicalArticleDetail.tsx:220:      <div className="newsArticleBreadcrumbShell">
components/resources/technical-articles/TechnicalArticlesClient.tsx:217:    <main className="technicalArticlesPage">
components/resources/technical-articles/TechnicalArticlesClient.tsx:219:        className="technicalArticlesHero resource-center-banner"
components/resources/technical-articles/TechnicalArticlesClient.tsx:224:        <div className="technicalArticlesHero__inner resource-center-banner__inner">
components/resources/technical-articles/TechnicalArticlesClient.tsx:225:          <h1 className="technicalArticlesHero__title resource-center-banner__title">
components/resources/technical-articles/TechnicalArticlesClient.tsx:228:          <p className="technicalArticlesHero__description resource-center-banner__description">
components/resources/technical-articles/TechnicalArticlesClient.tsx:240:      <section className="technicalArticlesSearchSection">
components/resources/technical-articles/TechnicalArticlesClient.tsx:257:      <section className="technicalArticlesContentSection">
components/resources/technical-articles/TechnicalArticlesClient.tsx:258:        <aside className="technicalArticlesSidebar">
components/resources/technical-articles/TechnicalArticlesClient.tsx:259:          <h2 className="technicalArticlesSidebar__title">
components/resources/technical-articles/TechnicalArticlesClient.tsx:263:          <div className="technicalArticlesSidebar__list">
components/resources/technical-articles/TechnicalArticlesClient.tsx:268:                className={
components/resources/technical-articles/TechnicalArticlesClient.tsx:277:                  <span className="technicalArticlesSidebar__plus">+</span>
components/resources/technical-articles/TechnicalArticlesClient.tsx:284:        <div className="technicalArticlesMain">
components/resources/technical-articles/TechnicalArticlesClient.tsx:287:              <div className="technicalArticlesGrid">
components/resources/technical-articles/TechnicalArticlesClient.tsx:304:                  className="technicalArticlesPagination"
components/resources/technical-articles/TechnicalArticlesClient.tsx:314:                    className="technicalArticlesPagination__button"
components/resources/technical-articles/TechnicalArticlesClient.tsx:326:                  <span className="technicalArticlesPagination__status">
components/resources/technical-articles/TechnicalArticlesClient.tsx:332:                    className="technicalArticlesPagination__button"
components/resources/technical-articles/TechnicalArticlesClient.tsx:345:            <div className="technicalArticlesEmpty">
components/resources/technical-articles/TechnicalArticlesClient.tsx:389:    <Link className="technicalArticleCard" href={href}>
components/resources/technical-articles/TechnicalArticlesClient.tsx:390:      <div className="technicalArticleCard__image">
components/resources/technical-articles/TechnicalArticlesClient.tsx:399:      <div className="technicalArticleCard__body">
components/resources/technical-articles/TechnicalArticlesClient.tsx:400:        <h3 className="technicalArticleCard__title">{article.title}</h3>
components/resources/technical-articles/TechnicalArticlesClient.tsx:402:        <div className="technicalArticleCard__meta">
components/resources/technical-articles/TechnicalArticlesClient.tsx:407:        <div className="technicalArticleCard__tags">
components/resources/technical-articles/TechnicalArticlesClient.tsx:409:          <div className="technicalArticleCard__tagList">
components/resources/technical-articles/TechnicalArticlesClient.tsx:411:              <span key={tag} className="technicalArticleCard__tag">
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1519:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1530:        <aside className={styles.technicalNotice}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1535:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1546:        <div className={styles.pagerGrid}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1550:                className={styles.pagerCard}
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1562:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1573:        <div className={styles.pagerGrid}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1577:                className={styles.pagerCard}
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1589:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1600:        <div className={styles.pagerGrid}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1601:          <div className={styles.pagerCard}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1616:        <div className={styles.technicalTableWrap}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1617:          <table className={styles.technicalTable}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1643:        <aside className={styles.technicalNotice}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1648:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1659:        <div className={styles.pagerGrid}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1663:                className={styles.pagerCard}
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1675:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1678:        <ol className={styles.technicalRuleList}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1695:      <article className={styles.contentBlock}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1700:        <pre className={styles.technicalCode}>
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1707:      <article className={styles.contentBlock}>
```

## 二、CSS 中实际定义的 Banner / Hero 选择器

```text
app/about/about-banner.css:54:.about-center-banner .quality-policy-hero-overlay,
app/about/about-banner.css:55:.about-center-banner .rm-hero-overlay,
app/about/about-banner.css:56:.about-center-banner .rm-hero-line {
app/about/about-banner.css:61:.about-center-banner .about-culture-banner-photo.about-culture-banner-photo {
app/about/about-banner.css:80:.about-center-banner > img,
app/about/about-banner.css:81:.about-center-banner .about-foreach-hero-bg,
app/about/about-banner.css:82:.about-center-banner .quality-policy-hero-image,
app/about/about-banner.css:83:.about-center-banner .rm-hero-image {
app/about/about-banner.css:94:.about-center-banner .about-center-banner__inner.about-center-banner__inner {
app/about/about-banner.css:110:.about-center-banner .about-center-banner__title.about-center-banner__title {
app/about/about-banner.css:123:.about-center-banner .about-center-banner__title.about-center-banner__title span {
app/about/about-banner.css:128:.about-center-banner .about-center-banner__description.about-center-banner__description {
app/about/about-banner.css:143:  .about-center-banner .about-center-banner__inner.about-center-banner__inner {
app/about/about-banner.css:148:  .about-center-banner .about-center-banner__inner.about-center-banner__inner {
app/about/about-banner.css:153:  .about-center-banner .about-center-banner__title.about-center-banner__title {
app/about/about-banner.css:159:  .about-center-banner .about-center-banner__description.about-center-banner__description {
app/globals.css:981:.home-hero {
app/globals.css:998:.home-hero-video {
app/globals.css:1014:.home-hero-overlay {
app/globals.css:1030:.home-hero-content {
app/globals.css:1064:html[lang="zh-CN"] .home-hero-title {
app/globals.css:1070:html[lang="en"] .home-hero-title {
app/globals.css:1076:html[lang="es"] .home-hero-title {
app/globals.css:1082:html[lang="fr"] .home-hero-title {
app/globals.css:1088:html[lang="ko"] .home-hero-title {
app/globals.css:1094:html[lang="ru"] .home-hero-title {
app/globals.css:1100:html[lang="zh-CN"] .home-hero-subtitle {
app/globals.css:1106:html[lang="en"] .home-hero-subtitle {
app/globals.css:1112:html[lang="es"] .home-hero-subtitle,
app/globals.css:1113:html[lang="fr"] .home-hero-subtitle {
app/globals.css:1119:html[lang="ko"] .home-hero-subtitle {
app/globals.css:1125:html[lang="ru"] .home-hero-subtitle {
app/globals.css:1154:html[lang="zh-CN"] .home-hero-btn {
app/globals.css:1158:html[lang="en"] .home-hero-btn,
app/globals.css:1159:html[lang="es"] .home-hero-btn,
app/globals.css:1160:html[lang="fr"] .home-hero-btn,
app/globals.css:1161:html[lang="ko"] .home-hero-btn,
app/globals.css:1162:html[lang="ru"] .home-hero-btn {
app/globals.css:1166:html[lang="ru"] .home-hero-btn {
app/globals.css:1170:html[lang="en"] .home-hero-btn:hover,
app/globals.css:1171:html[lang="es"] .home-hero-btn:hover,
app/globals.css:1172:html[lang="fr"] .home-hero-btn:hover,
app/globals.css:1173:html[lang="ru"] .home-hero-btn:hover {
app/globals.css:1243:  .home-hero-inner,
app/globals.css:1514:  .home-hero-inner {
app/globals.css:1590:  .home-hero-title {
app/globals.css:1677:  .home-hero-inner {
app/globals.css:1682:  .home-hero-title {
app/globals.css:1687:  .home-hero-subtitle {
app/globals.css:1692:  .home-hero-actions {
app/globals.css:6898:  .home-hero-inner,
app/globals.css:6967:  .home-hero {
app/globals.css:6971:  .home-hero-inner {
app/globals.css:6975:  .home-hero-title {
app/globals.css:6982:  .home-hero-subtitle {
app/globals.css:6989:  .home-hero-actions {
app/globals.css:6994:  .home-hero-btn {
app/globals.css:8010:  .home-hero-inner,
app/globals.css:8080:  .home-hero {
app/globals.css:8084:  .home-hero-inner {
app/globals.css:8088:  .home-hero-title {
app/globals.css:8095:  .home-hero-subtitle {
app/globals.css:8102:  .home-hero-actions {
app/globals.css:8107:  .home-hero-btn {
app/globals.css:9077:.about-culture-banner {
app/globals.css:9087:.about-culture-banner::before {
app/globals.css:9113:.about-culture-banner::after {
app/globals.css:9125:.about-culture-banner-inner {
app/globals.css:9135:.about-culture-banner-inner h1 {
app/globals.css:9143:.about-culture-banner-inner p {
app/globals.css:9320:.about-culture-organization-hero {
app/globals.css:9341:.about-culture-organization-hero::after {
app/globals.css:9674:  .about-culture-banner {
app/globals.css:9678:  .about-culture-banner-inner h1 {
app/globals.css:9682:  .about-culture-banner-inner p {
app/globals.css:9709:  .about-culture-organization-hero {
app/globals.css:10245:.about-foreach-hero {
app/globals.css:10256:.about-foreach-hero-bg {
app/globals.css:10266:.about-foreach-hero::before {
app/globals.css:10286:.about-foreach-hero-content {
app/globals.css:10293:.about-foreach-hero h1 {
app/globals.css:10301:.about-foreach-hero h1 span {
app/globals.css:10306:.about-foreach-hero p {
app/globals.css:10670:  .about-foreach-hero {
app/globals.css:10675:  .about-foreach-hero h1 {
app/globals.css:10679:  .about-foreach-hero p,
app/globals.css:10704:  .about-foreach-hero-content,
app/globals.css:11120:  .about-foreach-hero-content,
app/globals.css:11155:  .about-foreach-hero-content,
app/globals.css:12152:.about-history-inner-banner {
app/globals.css:12168:.about-history-inner-banner::before {
app/globals.css:12180:.about-history-inner-banner-content {
app/globals.css:12192:.about-history-inner-banner-eyebrow {
app/globals.css:12201:.about-history-inner-banner h1 {
app/globals.css:12210:.about-history-inner-banner p {
app/globals.css:12222:  .about-history-inner-banner {
app/globals.css:12227:  .about-history-inner-banner-content {
app/globals.css:12232:  .about-history-inner-banner p {
app/globals.css:12248:.about-history-bottom-banner {
app/globals.css:12258:  .about-history-bottom-banner {
app/globals.css:12312:.about-foreach-page .about-foreach-hero-content {
app/globals.css:12361:  .about-foreach-page .about-foreach-hero-content,
app/globals.css:12437:.quality-policy-hero {
app/globals.css:12448:.quality-policy-hero-image {
app/globals.css:12454:.quality-policy-hero-overlay {
app/globals.css:12470:.quality-policy-hero-inner {
app/globals.css:13255:  .quality-policy-hero {
app/globals.css:13260:  .quality-policy-hero-inner,
app/globals.css:13466:.rm-hero {
app/globals.css:13476:.rm-hero-image {
app/globals.css:13480:.rm-hero-overlay {
app/globals.css:13498:.rm-hero-inner {
app/globals.css:13503:.rm-hero-title {
app/globals.css:13512:.rm-hero-desc {
app/globals.css:13520:.rm-hero-line {
app/globals.css:14396:  .rm-hero-title {
app/globals.css:14454:  .rm-hero {
app/globals.css:14459:  .rm-hero-title {
app/globals.css:14464:  .rm-hero-desc {
app/globals.css:15571:.home-hero {
app/globals.css:15578:.home-hero-video {
app/globals.css:15593:.home-hero-overlay {
app/globals.css:15608:.home-hero-inner {
app/globals.css:15614:  .home-hero-video {
app/globals.css:15622:.home-hero {
app/globals.css:15635:.home-hero-video {
app/globals.css:15650:.home-hero-overlay {
app/globals.css:15665:.home-hero-inner {
app/globals.css:15674:.home-hero-title {
app/globals.css:15689:.home-hero-subtitle {
app/globals.css:15704:.home-hero-actions {
app/globals.css:15714:.home-hero-btn {
app/globals.css:15736:.home-hero-btn:hover,
app/globals.css:15737:.home-hero-btn:focus-visible {
app/globals.css:15746:  .home-hero {
app/globals.css:15751:  .home-hero-inner {
app/globals.css:15756:  .home-hero-title {
app/globals.css:15761:  .home-hero-subtitle {
app/globals.css:15767:  .home-hero {
app/globals.css:15771:  .home-hero-inner {
app/globals.css:15776:  .home-hero-video {
app/globals.css:15780:  .home-hero-title {
app/globals.css:15787:  .home-hero-subtitle {
app/globals.css:15795:  .home-hero-actions {
app/globals.css:15801:  .home-hero-btn {
app/globals.css:17240:  .home-hero {
app/globals.css:17248:  .home-hero-inner {
app/globals.css:17274:  .home-hero-actions {
app/globals.css:18637:.home-hero-static-image {
app/globals.css:18642:  .home-hero-scroll-shell {
app/globals.css:18652:  .home-hero-scroll-shell
app/globals.css:18653:    .home-hero {
app/globals.css:18667:  .home-hero-scroll-shell
app/globals.css:18668:    .home-hero-video {
app/globals.css:18692:  .home-hero-scroll-shell
app/globals.css:18693:    .home-hero-static-image {
app/globals.css:18723:  .home-hero-scroll-shell
app/globals.css:18724:    .home-hero-overlay {
app/globals.css:18737:  .home-hero-scroll-shell
app/globals.css:18738:    .home-hero-inner {
app/globals.css:18748:  .home-hero-scroll-shell
app/globals.css:18749:    .home-hero-title,
app/globals.css:18750:  .home-hero-scroll-shell
app/globals.css:18751:    .home-hero-subtitle,
app/globals.css:18752:  .home-hero-scroll-shell
app/globals.css:18753:    .home-hero-actions {
app/globals.css:18772:  .home-hero-scroll-shell
app/globals.css:18773:    .home-hero-title {
app/globals.css:18789:  .home-hero-scroll-shell
app/globals.css:18790:    .home-hero-subtitle {
app/globals.css:18806:  .home-hero-scroll-shell
app/globals.css:18807:    .home-hero-actions {
app/globals.css:18833:  .home-hero-scroll-shell
app/globals.css:18834:    .home-hero-video {
app/globals.css:18838:  .home-hero-scroll-shell
app/globals.css:18839:    .home-hero-static-image,
app/globals.css:18840:  .home-hero-scroll-shell
app/globals.css:18841:    .home-hero-title,
app/globals.css:18842:  .home-hero-scroll-shell
app/globals.css:18843:    .home-hero-subtitle,
app/globals.css:18844:  .home-hero-scroll-shell
app/globals.css:18845:    .home-hero-actions {
app/globals.css:19100:.about-culture-banner {
app/globals.css:19111:.about-culture-banner::before,
app/globals.css:19112:.about-culture-banner::after {
app/globals.css:19120:.about-culture-banner-photo {
app/globals.css:19145:.about-culture-banner-inner {
app/globals.css:19151:.about-culture-banner > [class*="grid"],
app/globals.css:19152:.about-culture-banner > [class*="circle"],
app/globals.css:19153:.about-culture-banner > [class*="pattern"],
app/globals.css:19154:.about-culture-banner > [class*="graphic"],
app/globals.css:19155:.about-culture-banner > [class*="geometry"],
app/globals.css:19156:.about-culture-banner > [class*="decoration"],
app/globals.css:19157:.about-culture-banner > [class*="decor"] {
app/globals.css:19163:  .about-culture-banner-photo {
app/globals.css:19402:.about-history-bottom-banner {
app/globals.css:19459:  .about-history-bottom-banner {
app/globals.css:20935:  .resource-center-banner {
app/globals.css:20942:  .resource-center-banner__inner {
app/globals.css:20951:  .about-foreach-hero {
app/globals.css:20958:  .about-foreach-hero-content {
app/globals.css:20966:  .about-culture-banner {
app/globals.css:20973:  .about-culture-banner-inner {
app/globals.css:20982:  .about-history-inner-banner {
app/globals.css:20989:  .about-history-inner-banner-content {
app/globals.css:20998:  .quality-policy-hero {
app/globals.css:21005:  .quality-policy-hero-inner {
app/globals.css:21014:  .rm-hero {
app/globals.css:21021:  .rm-hero-inner {
app/resources/datasheets/datasheets.css:65:.datasheets-page .datasheets-hero {
app/resources/datasheets/datasheets.css:75:.datasheets-page .datasheets-hero-image {
app/resources/datasheets/datasheets.css:86:.datasheets-page .datasheets-hero-overlay {
app/resources/datasheets/datasheets.css:98:.datasheets-page .datasheets-hero::before {
app/resources/datasheets/datasheets.css:111:.datasheets-page .datasheets-hero::after {
app/resources/datasheets/datasheets.css:124:.datasheets-page .datasheets-hero-inner {
app/resources/datasheets/datasheets.css:132:.datasheets-page .datasheets-hero-title {
app/resources/datasheets/datasheets.css:141:.datasheets-page .datasheets-hero-desc {
app/resources/datasheets/datasheets.css:752:  .datasheets-page .datasheets-hero-inner,
app/resources/datasheets/datasheets.css:760:  .datasheets-page .datasheets-hero {
app/resources/datasheets/datasheets.css:764:  .datasheets-page .datasheets-hero-inner {
app/resources/datasheets/datasheets.css:768:  .datasheets-page .datasheets-hero-title {
app/resources/datasheets/datasheets.css:772:  .datasheets-page .datasheets-hero-desc {
app/resources/installation-guide/installation-guide.css:59:.installation-guide-hero {
app/resources/installation-guide/installation-guide.css:77:.installation-guide-hero-inner {
app/resources/installation-guide/installation-guide.css:87:.installation-guide-hero-content {
app/resources/installation-guide/installation-guide.css:92:.installation-guide-hero h1 {
app/resources/installation-guide/installation-guide.css:101:.installation-guide-hero p {
app/resources/installation-guide/installation-guide.css:663:  .installation-guide-hero,
app/resources/installation-guide/installation-guide.css:664:  .installation-guide-hero-inner {
app/resources/installation-guide/installation-guide.css:668:  .installation-guide-hero {
app/resources/installation-guide/installation-guide.css:672:  .installation-guide-hero-inner,
app/resources/installation-guide/installation-guide.css:677:  .installation-guide-hero-content {
app/resources/installation-guide/installation-guide.css:681:  .installation-guide-hero h1 {
app/resources/installation-guide/installation-guide.css:685:  .installation-guide-hero p {
app/resources/material-compatibility/material-compatibility.css:40:.material-compatibility-banner {
app/resources/material-compatibility/material-compatibility.css:59:.material-compatibility-banner::before {
app/resources/material-compatibility/material-compatibility.css:72:.material-compatibility-banner__inner {
app/resources/material-compatibility/material-compatibility.css:89:.material-compatibility-banner__content {
app/resources/material-compatibility/material-compatibility.css:97:.material-compatibility-banner__content h1 {
app/resources/material-compatibility/material-compatibility.css:108:.material-compatibility-banner__content h1 span {
app/resources/material-compatibility/material-compatibility.css:112:.material-compatibility-banner__desc {
app/resources/material-compatibility/material-compatibility.css:120:.material-compatibility-banner__desc {
app/resources/material-compatibility/material-compatibility.css:340:  .material-compatibility-banner {
app/resources/material-compatibility/material-compatibility.css:346:  .material-compatibility-banner__inner,
app/resources/material-compatibility/material-compatibility.css:366:  .material-compatibility-banner {
app/resources/material-compatibility/material-compatibility.css:371:  .material-compatibility-banner h1 {
app/resources/material-compatibility/material-compatibility.css:375:  .material-compatibility-banner__desc {
app/resources/material-compatibility/material-compatibility.css:394:  .material-compatibility-banner__content {
app/resources/material-compatibility/material-compatibility.css:399:  .material-compatibility-banner__content h1 {
app/resources/material-compatibility/material-compatibility.css:404:  .material-compatibility-banner__desc {
app/resources/material-compatibility/material-compatibility.css:410:  .material-compatibility-banner__content {
app/resources/material-compatibility/material-compatibility.css:414:  .material-compatibility-banner__content h1 {
app/resources/material-compatibility/material-compatibility.css:420:  .material-compatibility-banner__desc {
app/resources/resource-banner.css:38:.datasheets-page .resource-center-banner .datasheets-hero-overlay {
app/resources/resource-banner.css:55:.resource-center-banner .resource-center-banner__inner.resource-center-banner__inner {
app/resources/resource-banner.css:70:.resource-center-banner .resource-center-banner__content.resource-center-banner__content {
app/resources/resource-banner.css:78:.resource-center-banner .resource-center-banner__eyebrow.resource-center-banner__eyebrow {
app/resources/resource-banner.css:82:.resource-center-banner .resource-center-banner__title.resource-center-banner__title {
app/resources/resource-banner.css:94:.resource-center-banner .resource-center-banner__description.resource-center-banner__description {
app/resources/resource-banner.css:107:  .resource-center-banner .resource-center-banner__inner.resource-center-banner__inner {
app/resources/resource-banner.css:112:  .resource-center-banner .resource-center-banner__inner.resource-center-banner__inner {
app/resources/resource-banner.css:117:  .resource-center-banner .resource-center-banner__content.resource-center-banner__content {
app/resources/resource-banner.css:121:  .resource-center-banner .resource-center-banner__title.resource-center-banner__title {
app/resources/resource-banner.css:127:  .resource-center-banner .resource-center-banner__description.resource-center-banner__description {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:39:.frp-hero {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:55:.frp-hero {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:71:.frp-hero::after {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:100:.frp-hero-inner {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:108:.frp-hero-title {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:116:.frp-hero-desc {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:418:  .frp-hero,
app/resources/selection-support/fitting-replacement/fitting-replacement.css:419:  .frp-hero-inner {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:423:  .frp-hero-title {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:427:  .frp-hero-desc {
app/resources/selection-support/fitting-replacement/fitting-replacement.css:826:.frp-hero::before,
app/resources/selection-support/fitting-replacement/fitting-replacement.css:827:.frp-hero::after {
```

## 三、手机端高度、最小高度和内边距

```text
app/about/about-banner.css:7:  height: 520px !important;
app/about/about-banner.css:8:  min-height: 520px !important;
app/about/about-banner.css:24:  height: auto !important;
app/about/about-banner.css:26:  padding: 0 !important;
app/about/about-banner.css:47:  height: auto !important;
app/about/about-banner.css:66:  height: 100% !important;
app/about/about-banner.css:88:  height: 100% !important;
app/about/about-banner.css:99:  height: 520px !important;
app/about/about-banner.css:100:  min-height: 520px !important;
app/about/about-banner.css:102:  padding: 168px 0 0;
app/about/about-banner.css:111:  max-width: 1080px;
app/about/about-banner.css:115:  line-height: 1.08;
app/about/about-banner.css:129:  max-width: 860px;
app/about/about-banner.css:133:  line-height: 1.8;
app/about/about-banner.css:141:@media (max-width: 760px) {
app/about/about-banner.css:144:    height: 520px !important;
app/about/about-banner.css:145:    min-height: 520px !important;
app/about/about-banner.css:154:    max-width: 100%;
app/about/about-banner.css:156:    line-height: 1.12;
app/about/about-banner.css:160:    max-width: 100%;
app/about/about-banner.css:163:    line-height: 1.7;
app/globals.css:144:  height: 82px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柛娆忣槹閸欏繑淇婇悙棰濆殭濞存粓绠栧铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
app/globals.css:158:  height: 43px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC Logo 濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滈箖鏌￠崶銉ョ仼缁炬儳婀遍幉鎼佹偋閸繄鐟查梺鍝勬媼娴滎亜顫?*/
app/globals.css:168:  height: 100%; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柛顭戝亝閸欏繘鏌熼鍡忓亾闁哄绉归弻銊モ攽閸♀晜笑缂備焦鍔栭〃濠囧蓟閳ュ磭鏆ゆい鏃傛嚀娴滈箖姊?Logo 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃酣銆冮妷褏鐭欓柛鏌倐鍋撻崸妤佲拺妞ゆ巻鍋撶紒澶婎嚟缁鎮╃紒妯煎幍闂佺粯鍔﹂崜姘舵倶闁秵鐓涢悗锝庝簽鏁堥梺鍝勭灱閸犳牠骞冨鍏剧喓绱掑Ο鍝勫濠电姷鏁搁崑娑㈡偋婵犲洢鈧啴宕卞Ο灏栨敵婵犵數濮村ù鍌炲极瀹ュ棙鍙忔慨妤€妫楅獮妤呮煕鎼淬垺灏い?*/
app/globals.css:181:  height: 100%; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柛顭戝亝閸欏繘鏌熼鍡忓亾闁哄绉归弻銊モ攽閸♀晜笑缂備焦鍔栭〃濠囧蓟閳ュ磭鏆ゆい鏃傛嚀娴滈箖姊?Logo 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃酣銆冮妷褏鐭欓柛鏌倐鍋撻崸妤佲拺妞ゆ巻鍋撶紒澶婎嚟缁鎮╃紒妯煎幍闂佺粯鍔﹂崜姘舵倶闁秵鐓涢悗锝庝簽鏁堥梺鍝勭灱閸犳牠骞冨鍏剧喓绱掑Ο鍝勫濠电姷鏁搁崑娑㈡偋婵犲洢鈧啴宕卞Ο灏栨敵婵犵數濮村ù鍌炲极瀹ュ棙鍙忔慨妤€妫楅獮妤呮煕鎼淬垺灏い?*/
app/globals.css:215:  height: max-content; /* 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃繘鎳為柆宥嗗殐闁宠桨鑳剁粵蹇曠磽閸屾瑧鍔嶆い顓炴喘閹敻宕奸弴鐔哄幈濡炪倖鍔楁慨鎾礉濮樿埖鐓涢柛鏇楁櫅閸旓箓鏌＄仦鍓р槈闁宠棄顦靛畷锟犳倷鐎电钂嬪┑鐘垫暩閸嬫盯鎮ф繝鍥モ偓鍐幢濡皷鏀虫繝鐢靛Т濞村倿寮鍡樺弿婵妫楅獮妤呮煕鎼淬垺灏い顏勫暣婵″爼宕卞Ο鐓庡汲闂備焦瀵уú锔界椤忓牏宓侀柛鎰靛幑娴滃綊鏌熼悜妯诲鞍闁稿寒浜娲嚒閵堝懏鐏佹繝鈷€鍕垫疁闁诡喗锕㈠畷鐓庘攽閸愨晜鏉搁梻浣虹帛閸旀浜稿▎鎰珷闁硅揪闄勯悡鏇㈡煏婵炲灝濡芥い銉ヮ樀閺岋綁鏁愰崨顓熜╁銈庡亝缁捇宕洪埀顒併亜閹哄棗浜鹃梺浼欑悼閸忔ɑ淇婇幖浣哥厸濠电姴鍟▍宥夋煟閻斿摜鐭婄紒澶屾嚀椤?*/
app/globals.css:231:  height: 34px; /* 闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曚綅閸ヮ剦鏁冮柨鏇楀亾闁汇倗鍋撶换婵嬫濞戝崬鍓扮紒鐐劤椤兘寮婚敐澶婄疀妞ゆ帒鍊风划鐢告⒑閸濆嫭顥炵紒顔芥崌楠炲啫螖閸涱喖浠洪梺姹囧灮閸嬶綁鍩€椤掆偓閿曨亪寮诲☉姘ｅ亾閿濆骸浜濋悘蹇庡嵆閺岀喎鐣￠悧鍫濇畻閻庤娲橀敃銏ゅ灳閿曞倸绠ｉ柣鎴濇椤ュ秹姊婚崒姘偓鐑芥嚄閸撲焦鍏滈柛顐ｆ礀閻ょ偓绻涢幋娆忕仼缂佺姷濮垫穱濠囶敍濞嗘帩鍔呴梺鎼炲€栧ú姗€濡甸崟顖氱闁瑰瓨绻嶆禒濂告⒑缂佹ê濮囬柨鏇畵楠炲顫㈠畝鈧悿鈧┑鐐村灦椤洭顢欓幋锔解拺缂備焦蓱閻撱儵鏌涘顒夊剶闁诡噯绻濆鎾偄閾忓湱妲囧┑鐘垫暩婵挳宕愰幖浣告辈婵炲棙鍔戞禍婊堟煏婵犲繐顩柟鍐叉噽缁辨帗娼忛妸銉х懆闁剧粯鐗犻弻宥堫檨闁告挾鍠栭悰顔界節閸屻倖寤洪梺閫炲苯澧撮柟顔诲嵆椤㈡瑧鎹勯妸褎婢戦梻浣告惈閸婅棄鈻旈弴鐘电幓闁绘劗鍎ら埛鎴犳喐閻楀牆绗掑ù婊€鍗抽弻娑樜熼崷顓犵厯婵犵鍓濋幐鍐茬暦濮椻偓椤㈡瑧鎲撮敐鍡楊伖?*/
app/globals.css:251:  max-width: 1160px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晜閽樺缃曢梻浣告啞閸旓箓宕伴弽顐㈩棜濠电姵纰嶉悡娆撴煟閹伴潧澧褜鍨堕弻锝夊棘閹稿寒妫﹂梺鍝勬湰閻╊垶銆侀弴銏狀潊闁宠棄妫欓ˉ锝夋⒒娴ｅ憡鎲稿┑顕€娼ч悾婵堢矙鐠恒劍娈惧銈嗙墬閸戝綊宕ョ€ｎ亶鐔嗛悹铏瑰皑閸旂喐銇勯弮鈧崝娆撳蓟閳╁啫绶炲┑鐘插椤ｇ儤绻濋埛鈧崨顔界彧濠碘€冲级閸旀瑩鐛澶樻晩闁告挆宥囧簥?Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柡灞诲劜閻撴瑩鏌ｅΔ鈧悧濠勬閺屻儲鐓犵紒瀣硶缁夋椽鏌熼绛嬫疁闁诡喕绮欓幃浠嬫倷閸忓浜惧┑鐘叉处閻撴洟鎮楅敐搴′簼鐎规洖鐬奸埀顒冾潐濞叉粓宕楀鈧妴浣割潨閳ь剟骞冮姀銈嗙叆閻庯綆鍓氬▓顕€姊婚崒娆愮グ妞ゆ泦鍛床闁归偊鍎悷閭︽僵閻犲搫鎼悗顓㈡⒑鐟欏嫬鍔舵俊顐㈠閹偤宕归鐘辩盎闂佸湱鍎ら崹鐢割敂椤忓懐绠鹃柟鍐插槻閹虫劗澹曢悾灞稿亾楠炲灝鍔氶柟閿嬪灴瀹曟繈鎮㈤搹鍦紲?*/
app/globals.css:276:  height: auto;
app/globals.css:277:  min-height: 0;
app/globals.css:278:  max-height: calc(100vh - 112px); /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌熼梻瀵割槮闁汇値鍠楅妵鍕箛閳轰胶鍔撮梺鎼炲€栧ú鐔煎蓟濞戙埄鏁冮柨婵嗘椤︹晠姊烘潪鎵槮婵☆偅鐟ч幑銏犫槈閵忕姷顓哄┑鐐叉缁绘帗绂掗懖鈺冪＝濞达絾褰冩禍楣冩⒑閸涘﹤濮﹂柛鐘愁殜閹繝寮撮悢铏诡啎闂佺懓鐡ㄧ换鍌炴嚋閸︻厸鍋撳▓鍨珝缂佺姵鐗犲璇测槈閵忊€充簻闂備礁鐏濋鍡涘箖濞嗗浚娓婚柕鍫濋楠炴鎮楃粭娑樻处閺咁剟鏌熼柇锕€鍘撮柡鈧禒瀣厱婵炴垵宕悘锝嗙箾婢跺顕滃ǎ鍥э躬閹瑩顢旈崟銊ヤ壕鐟滃繒鍒掓繝姘婵犲灚鍔楅崝鐑芥⒑閻愯棄鍔滈柛鎾村哺瀹曠敻寮撮悢缈犵盎闂佸搫娲﹂〃鍛閹灛鏃堟偐闂堟稐绮跺┑鈽嗗亝缁诲牓鎮伴纰卞悑濠㈣埖蓱閺呪晠鎮峰鍐惧剶鐎规洝顫夌粋鎺斺偓锝庝海閹芥洖鈹戦悙鏉戠仧闁搞劌婀辩划濠氭晲閸℃瑧鐦堥梻鍌氱墛缁嬫帗寰勯崟顖涚厱閹兼番鍨哄畷灞炬叏婵犲倹鎯堥悡銈夋偣閸ヮ亜绱︾紒銊嚙閳规垿鍩ラ崱妞剧凹缂備浇顕ч悧鎾荤嵁?*/
app/globals.css:294:  padding: 14px 0; /* 闂傚倸鍊峰ù鍥敋瑜庨〃銉╁传閵壯咁槸婵犵數濮撮崑鍡涙倿娴犲鐓犲┑顔藉姇閳ь剚顨堟竟鏇㈡嚍閵夛箑寮垮┑鈽嗗灡鐎笛呮兜妤ｅ啯鐓熼柕鍫濐槺閻ｆ椽鏌＄仦鍓ф创妞ゃ垺娲熼弫鎰板幢濞嗘ɑ袣缂傚倸鍊风拋鏌ュ磻閹剧粯鐓曢柍鈺佸暟閳洟鏌ｉ幘瀛樼闁哄苯绉归崺鈩冩媴閸涘﹥顔嶉梻浣烘嚀閸熷灝螞濞嗘挸桅闁告洦鍨奸弫鍐┿亜閹烘垵鈧寮抽妶澶嬧拺闁告繂瀚ˇ顒勬煃瑜滈崜姘跺礈濮樿泛瑙﹂悗锝庡枟閻撴洘绻涢幋婵嗚埞闁诲骏绲鹃妵鍕箻鐟欏嫷浠╃紓浣介哺閹稿骞忛崨顖涘珰闁斥晛鍟伴弳銉╂⒒娴ｄ警鐒鹃柨鏇樺€曢敃銏℃綇閳轰礁鐏婂┑鐐叉閸旀洜娆㈤悙鐑樺€堕柣鎰問閻掓儳霉濠婂牏鐣洪柡灞诲妼閳规垿宕卞☉鎵佸亾濡も偓椤儻顧侀柛銊ㄤ含閹广垹鈽夐姀鐘诲敹濠电娀娼ч悧蹇涘礉椤栫偞鈷?*/
app/globals.css:304:  min-height: 68px; /* 婵犵數濮烽弫鍛婃叏閻㈠壊鏁婇柡宥庡幖闂傤垱銇勯弽銊х煀缂佽翰鍊濋弻锝夋晲閸涱喗鎷遍悗瑙勬礃閻擄繝骞冨Δ鍛櫜閹肩补鍓濋悘宥夋⒑缂佹ɑ灏柛濠傛贡閹广垹鈹戦崶鈺冪槇闂佺鏈划宀勩€傞搹鍦＝濞达絾褰冩禍楣冩⒑缁洖澧茬紒瀣浮閹繝寮撮姀锛勫帗闂佸疇妗ㄧ粈渚€寮抽悢鍏肩厵闁告劕寮堕ˉ鐐烘煏閸パ冾伃妞ゃ垺娲熼、妤呭磼濠婂嫭顔忓┑锛勫亼閸娿倖绂嶅鍫濈柈閻庢稒眉缁诲棝鏌涢锝嗙鐎瑰憡绻冮妵鍕冀閵娧勬櫦闂侀潧艌閺呮粓鍩涢幋鐘电＝濞达綀顕栭悞鐣岀磼閻橆喖鍔﹂柡灞剧洴閹晠骞囨担鍦澒婵°倗濮烽崑娑樜涘┑鍡╁殨妞ゆ洍鍋撶€规洖銈搁幃銏ゅ川婵犲嫬绲鹃梻鍌氬€风粈渚€宕ョ€ｎ剛鐭堥柟缁㈠枛閻ょ偓绻濋棃娑氭噥闁搞儺鍓﹂弫瀣煃瑜滈崜鐔奉嚕婵犳碍鏅插璺侯儏娴滃綊姊洪崨濠傚鐟滄澘鍟撮敐鐐存償閳藉棙瀵岄梺闈涚墕閸燁偊宕濆鍫熺厱闁哄啠鍋撴い銊ワ躬閻涱噣骞嬮敃鈧～鍛存煃閳轰礁鏆欓柛鏂挎嚇濮婃椽妫冨☉杈╁姼闂佺瀛╂繛濠囧箖閿熺姴绠ｉ柨鏃囆掗幏铏圭磽娴ｅ壊鍎愰悗绗涘喛鑰块柟娈垮枤绾惧吋绻涘顔荤敖闁伙綀娅ｉ埀顒冾潐濞叉﹢宕归崸妤冨祦婵☆垰鍚嬬€氭岸鏌ょ喊鍗炲⒒婵¤弓鍗冲缁樼瑹閳ь剙顭囪閳ワ箓顢橀悢鍓佺畾闂佹悶鍎洪崗娆撳焵椤掆偓閹虫﹢銆佸鈧慨鈧柍閿亾闁瑰嘲鎼埞鎴︻敊閻愵剙娈屽┑鐐茬湴閸婃牗绌辨繝鍐檮闁告稑锕ら埀顒€鐏氶幈銊ノ熼悡搴′粯婵犫拃鍕稇闁宠鍨块弫宥夊礋椤掍焦鐦撻柣搴ゎ潐濞叉牠鎮ユ總绋挎槬闁跨喓濮寸壕鍏兼叏濮楀棗浜為梺鐣屾暬濮婅櫣鎷犻弻銉偓妤呮煕濡崵鐭掔€规洘鍨块獮妯肩磼濡厧骞堥梻浣筋潐濠㈡﹢宕ラ埀顒傜磼閵娧勬珪闁?*/
app/globals.css:305:  padding: 15px 32px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掍焦顔囬梻浣告贡閸庛倝宕甸敃鈧埥澶娢熼柨瀣垫綌婵犳鍠楅敃鈺呭储閸忚偐顩烽煫鍥ㄦ惄濞撳鏌曢崼婵囶棞濠殿啫鍛＜闁肩⒈鍓涚敮娑氱磼閸屾氨孝妞ゎ厹鍔戝畷濂告偄閸濆嫬绠洪梻鍌欒兌缁垶寮婚妸鈺佺疅闁挎稑瀚浠嬫煛鐏炶鍔滈柣鎾寸☉闇夐柨婵嗘噺閹叉悂鏌涢埡瀣偧闁逞屽墯椤旀牠宕伴弽顓熷亯闁绘挸娴烽弳锕€鈹戦崒婊庣劸妞ゎ偄鎳橀弻宥夊传閸曨偀鍋撹ぐ鎺戞辈闁绘劗鏁哥壕?*/
app/globals.css:314:  line-height: 1.15; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掍焦顔囬梻浣告贡閸庛倝宕甸敃鈧埥澶娢熼柨瀣垫綌婵犳鍠楅敃鈺呭储閸忚偐顩烽煫鍥ㄦ惄濞撳鏌曢崼婵囶棞濠殿啫鍛＜闁绘ê鍟块悘瀵糕偓瑙勬礃閿曘垽宕洪埀顒併亜閹烘垵顏柍閿嬪灴閺岀喖鎳栭埡浣风捕闂佸憡姊归幐鎶藉蓟濞戙垹绠奸柛鏇ㄥ幘閺嗐倝鎮楀▓鍨灍濠电偛锕妴浣糕槈閵忊€斥偓鐑芥煛婢跺鐏ｉ柛婵囶殕缁绘繈鎮介棃娑楁勃闂佹悶鍔岄悥濂稿灳閿曞倸鐐婃い鎺嶇閳ь剙娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:322:  line-height: 1.4; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫宥夊礋椤掍焦顔囬梻浣告贡閸庛倝宕甸敃鈧埥澶娢熼柨瀣垫綌婵犳鍠楅敃鈺呭储閸忚偐顩烽煫鍥ㄦ惄濞撳鏌曢崼婵囶棞濠殿喖鍊块弻娑欑節閸愵亜鈷堥梺閫炲苯澧痪鏉跨Т閻ｆ繈骞栨担鍝ョ暫濠德板€愰崑鎾绘煃閽樺妲搁柍璇茬Ч閹煎綊顢曢姀顫礉闂備焦瀵х换鍕磻閵堝拋鍤曞ù鐘差儛閺佸洭鏌ｉ弮鍥ㄨ吂闁告繃顨嗙换婵嬫偨闂堟稐娌梺鎼炲妼閻栧ジ鍨鹃敃鍌氱倞妞ゆ帊绀侀埀顒€娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:332:  height: 0; /* 闂?border 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾惧綊鏌ｉ幋锝呅撻柛濠傛健閺屻劑寮撮悙娴嬪亾瑜版帒鐤炬い蹇撶墛閳锋帒霉閿濆牊顏犻柕鍡楋躬閺岋繝宕ㄩ鍓х厜闂侀潧妫楅崯顖滄崲濠靛纾兼繝濠傚椤旀洟姊绘担鐟邦嚋缂佽鍊胯棟濞村吋娼欑粻姘舵煟閹邦厾鏆樺ù婊勭矒閺岀喖骞嶉搹顐ｇ彅闂佽娴氶崰妤佺┍婵犲浂鏁嶆慨姗嗗墻娴犲墽绱撴担铏瑰笡闁烩晩鍨堕悰顔锯偓锝庡枟閸婄兘鏌℃径瀣仼妞わ絽寮舵穱濠囨倷椤忓嫧鍋撹濮婁粙宕熼鍌滎啎婵犵數濮村ú锕傚疾閺屻儲鐓熼柟閭﹀墮濡﹢鏌￠崘銊у缂佲偓鐎ｎ喗鐓冮悶娑掆偓鍏呭婵?*/
app/globals.css:371:  padding: 28px 56px 28px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濞戙垹纾奸柕濞炬櫆閻撴稓鈧箍鍎辨鎼佺嵁閺嶎厽鐓熼柕鍫濐槺閻ｆ椽鏌＄仦鍓ф创妞ゃ垺娲熼弫鎰板幢濞嗘ɑ袣缂傚倸鍊风拋鏌ュ磻閹剧粯鐓曢柟浼存涧閺嬬喖鏌ｉ幘瀛樼缂佺粯鐩獮瀣攽閸℃艾鐓橀柣搴㈩問閸ｏ絿绮婚弽顓炶摕婵炴垯鍨洪崑鍕⒑閸噮鍎忛柡瀣█濮婃椽宕崟顓犲姽缂傚倸绉崇欢姘嚕椤愶箑绠涢柡澶婄仢閼板灝鈹戦悙鍙夘棡闁告梹娲栭埢宥呂熼懡銈囩槇闂佹眹鍨藉褎绂掑鍫熺厵闁肩⒈鍓欐禒杈┾偓瑙勬礀閻栧吋淇婇幖浣规櫆闁伙絽鑻娲⒒娴ｇ瓔鍤欏Δ鐘虫倐瀹曘垹顭ㄩ崼婵堬紱闂佺懓澧界划顖炴偂閺囥垺鐓欓柟浣冩珪濞呭懎鈹戦垾鐐藉仮闁哄矉缍€缁犳盯濡疯閻﹀牓姊洪崫鍕槵闁告挻绻傞銉╁礋椤栨艾鑰垮┑鈽嗗灥瀹曚絻銇愰崱娑欌拻濞达綀顫夐崑鐘绘煕閺冣偓閸ㄧ敻鈥﹂崶顏嶆▌濡炪們鍨哄畝鎼佸极閹邦厼绶炴俊顖滅帛濞呭矂姊绘担鍛婂暈婵炶绠撳畷婊冣枎韫囧﹥鐏侀悗鍏夊亾闁告洦鍏橀幏娲⒑閸涘﹦鈽夐柨鏇樺€栭幈銊╁磼閻愬鍘遍梺鍝勫€藉▔鏇″€寸紓?*/
app/globals.css:388:  line-height: 1.2; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梻浣告惈椤︿即宕靛顑炴椽顢斿鍡樻珝婵＄偑鍊ら崑鎺楀礂濮椻偓瀹曟垿骞樼拠鑼紲闂佺粯鍔栧娆愮婵傚憡鐓熼煫鍥ㄦ礀娴狅箓鏌涙惔銈嗙彧缂佸倹甯￠獮鎺懳旀担绯曞亾閻㈠憡鐓曢煫鍥ㄦ惄濡茬霉濠婂牏鐣烘慨濠冩そ瀹曘劍绻濋崘顭戞П闂備礁鎲￠敋闁靛牊鎮傞獮?*/
app/globals.css:393:  max-width: 700px; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ磸閳ь兛鐒︾换婵嬪炊閵娿儱澹掗梻浣规偠閸庢椽宕滃▎鎴犵焼闁告劦鍠楅悡蹇撯攽閻愭垵鍟弳娆戠磼閻樺啿鐏存慨濠勭帛閹峰懘鎸婃径濠冨劒濠电姵顔栭崰妤€顭囧▎鎴濆疾闂備線娼ч悧鍡浰囨导鏉戠；闁靛牆顦伴悡蹇撯攽閻愯尙浠㈤柛鎾愁煼閺屻劌鈹戦崱鈺傂︾紓浣哄缂嶄線寮婚妸鈺佸嵆婵°倐鍋撳ù婊勫劤閳规垿鍩ラ崱妞剧凹闂佹寧娲忛崹钘夘嚕鐠囨祴妲堥柕蹇曞閵娾晜鐓欓悗娑欘焽缁犳牠鏌涢敐鍡樸仢闁哄瞼鍠栭獮鎾诲箳濠靛牆鎮戦梻浣告惈閻绱炴笟鈧獮鍐ㄢ枎閹存柨浜鹃柣銏㈡暩閵嗗﹥淇婇幓鎺斿ⅵ婵﹥妞藉畷妤呭礂缁楄桨鎴烽梻浣规偠閸斿矂鎮ユ總绋课?*/
app/globals.css:398:  line-height: 1.5; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柛顭戝亝閸欏繘鏌℃径瀣婵炲樊浜滃洿婵犮垼娉涢鍛闁秵鈷戦梻鍫熶緱閻掗箖鏌涙惔銏㈡噰闁轰焦鍔栧鍕節閸曢潧鎮堥梻鍌欑劍鐎笛兠哄澶婄；闁瑰墽绻濈换鍡樸亜閹板墎绉堕柤鏉挎健閺岋紕浠﹂崜褎鍒涙繝纰夌磿閸忔﹢鐛€ｎ亖鏀介柛銉戝嫷浠梻鍌欐祰椤銇愰崘顔光偓锕傛倻閽樺鎽曢梺鎸庣箓椤︿即宕愰悜鑺ュ€甸柣銏㈡暩閵嗗﹥淇婇幓鎺斿ⅵ婵﹤鎼叅閻犲洦褰冪粻褰掓⒑缁嬪尅宸ユ繛纭风節閻?*/
app/globals.css:412:  min-height: 218px; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鎳庨弳妤呮⒑缁嬭法鐏遍柛瀣〒缁牓宕橀鐣屽帗闂佸憡绻傜€氼剟鍩€椤掍焦鍊愮€规洘绮撻、妤呭焵椤掑嫬鐓橀柟杈鹃檮閺咁剟鏌涢弴銊ヤ簵闁哄鍙冨铏圭矙閸栤剝鏁惧┑鐐插级缁骸危閹扮増鍊烽悗闈涙憸閻﹀牓姊洪幖鐐插姌闁告柨鏈粋鎺曨槻妞ゎ亜鍟存俊鍫曞幢濮楀棙鈷栧┑鐘愁問閸犳捇宕愬┑鍡欐殾闁哄洢鍨洪崑鍕煕韫囨艾浜归柛娆忔濮婃椽宕崟顐ｆ濠电偛鐪伴崐鏍矉瀹ュ鎹舵い鎾跺Х閿涙粓姊洪柅鐐茶嫰婢ь垳鈧灚婢樼€氫即鐛崶顒夋晣闁绘劖婢樼€垫煡姊婚崒娆戭槮缂傚秴锕畷鎴炵節閸パ囨７濡炪倖鏌ㄥΣ鍫濃槈濞嗘劕鍔呴梺鎸庣箓濞层劑鏁嶅鍫熺厽闁绘ê寮舵径鍕煟閹垮嫮绡€鐎规洩缍佸畷鐔碱敇濞戞ü澹曢柣鐔哥懃鐎氼厾绮氱捄銊х＝鐎广儱瀚ˇ锕傛煟閿濆洤鍘存鐐村浮楠炲寮埀顒勫棘閳ь剟姊绘担鍛婂暈闁告梹鍨垮畷婵堚偓锝庡亞閻濆爼鏌￠崶銉ョ仾闁抽攱鍨块弻娑樷槈濮楀牆浼愭繝娈垮枛閸婂潡寮诲☉銏犳閻犳亽鍓遍妶鍥╃＜?*/
app/globals.css:428:  height: 150px; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鎳庨弳妤呮⒑缁嬭法鐏遍柛瀣〒缁牓宕橀鐣屽帗闂佸憡绻傜€氼剟鍩€椤掍焦鍊愮€规洘绮撻、妤呭礋椤戣姤瀚藉┑鐐舵彧缂嶁偓妞ゎ偄顦靛畷鎴︽偐缂佹鍘遍柟鍏肩暘閸ㄥ綊鍩㈤弴鐘亾鐟欏嫭绀冮柛銊ユ健閻涱喖螣閼测晝锛滃┑鈽嗗灥濡椼劑宕欐禒瀣拻濞达絿鎳撻婊呯磼鐠囨彃鈧瓕鐏嬪銈嗘尵閸嬫劙寮搁弮鈧穱濠囧Χ閸曨剦妯傜紓浣筋嚙濡瑩濡甸崟顖氬唨闁靛ě灞炬闂備浇顕栭崹浼存偋婵犲洤桅?*/
app/globals.css:440:  height: 30px; /* 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃繘骞戦姀銈呯疀妞ゆ棁妫勬惔濠囨⒑瑜版帒浜伴柛鐘愁殔閻ｇ兘寮婚妷锔惧幍闂佽顔栭崰鏍€傛總鍛婄厓闂佸灝顑嗛ˉ鍫ユ煛鐏炲墽娲寸€殿喗鎸虫俊鎼佸Ψ閵夈垺瀚藉┑鐘垫暩閸嬫盯鎮ф繝鍥モ偓鍐幢濡皷鏀虫繝鐢靛Т濞村倿寮鍡樺弿婵妫楅獮妤呮煕鎼淬垺灏い?*/
app/globals.css:452:  height: 48px; /* 婵犵數濮烽弫鍛婃叏閻戝鈧倿鎸婃竟鈺嬬秮瀹曘劑寮堕幋婵堚偓顓㈡⒑缁嬭法绠洪柛瀣姍閵嗗懘宕ｆ径宀€鐦堟繝鐢靛Т閸婄粯鏅堕弴鐘电＜闁绘ê纾晶顒傜磼缂佹绠栫紒缁樼箞瀹曟帒顫濋鐐版睏闂傚倷鑳剁划顖氼潖婵犳艾鍌ㄧ憸鏃堝箖濮椻偓楠炲酣鎳為妷褍寮伴梻濠庡亜濞村嫮寰婇懞銉ь洸婵犲﹤鍘捐ぐ鎺撳亹闁肩⒈鍓氶幉鍏肩箾閿濆懏鎼愰柨鏇ㄤ簼娣囧﹪宕奸弴鐐茬獩濡炪倖鎸荤粙鎴炵閸撗勫枑闁绘鐗嗙粭姘舵煛閸滀椒閭慨?*/
app/globals.css:462:  line-height: 1.2; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鎳庨弳妤呮⒑缁嬭法鐏遍柛瀣〒缁牓宕橀鐣屽帗闂佸憡绻傜€氼剟鍩€椤掍焦鍊愮€规洘绮撻、妤呭礋椤戣姤瀚藉┑鐐舵彧缁蹭粙骞夐敓鐘茬畾闁割偁鍨荤壕鐓庮熆鐠轰警鍎愮紓宥嗗灴閹繝濡堕崱鎰盎闂佺懓鐏濋崯顖涚箾閸ヮ剚鐓冪憸婊堝礈濞嗘挸纾归柛褎顨呯粻鏍煕閹炬鍊归崟鍐⒑鐠団€崇€婚柛灞剧矒閹稿ジ姊绘担绛嬪殭濡ょ姵鎮傚畷銏狀煥閸繄锛涢梺鐟板⒔缁垶鎮￠弴銏＄厸闁搞儯鍎辨俊鍏碱殽閻愬澧甸柡?*/
app/globals.css:466:  max-width: 280px; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鎳庨弳妤呮⒑缁嬭法鐏遍柛瀣〒缁牓宕橀鐣屽帗闂佸憡绻傜€氼剟鍩€椤掍焦鍊愮€规洘绮撻、妤呭礋椤戣姤瀚奸梻浣哄帶椤洟宕愰弴鐐垫懃濠电姷鏁搁崑娑㈡儑娴兼潙纾规繝闈涱儏缁犳牗绻涘顔荤盎閹喖姊洪棃娑辨Ц闁告垹鏅槐鐐寸瑹閳ь剟鎮伴閿亾閿濆骸鏋熼柡鍛箞閺屽秷顧侀柛鎾寸洴閸┾偓妞ゆ帊娴囨竟妯汇亜閿旂偓鏆€殿喛顕ч濂稿醇椤愶綆鈧洭姊绘担鍛婂暈闁圭顭烽幊婵囥偅閸愮偓鏅梺闈涱槴閺呮稓绮堢€ｎ偁浜滈柡鍥╁仦閸ｇ儤绂嶅☉妯锋斀闁挎稑瀚禍濂告煕婵犲啰澧い顐㈢箻閹兘鏌囬敂鐣岀▉闁荤喐绮庢晶妤冩暜閹烘梻涓?*/
app/globals.css:469:  line-height: 1.5; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鎳庨弳妤呮⒑缁嬭法鐏遍柛瀣〒缁牓宕橀鐣屽帗闂佸憡绻傜€氼剟鍩€椤掍焦鍊愮€规洘绮撻、妤呭礋椤戣姤瀚奸梻浣哄帶椤洟宕愰弴鐐垫懃濠电姷鏁搁崑娑㈡儑娴兼潙纾规繝闈涱儏缁犳牗绻涘顔荤盎閹喖姊洪棃娑辨Ц闁告垹鏅槐鐐寸瑹閳ь剟鎮伴閿亾閿濆骸鏋熼柛瀣姍閺屾盯骞囬姘卞缂備緡鍟崶銊у幗闁硅偐琛ラ埀顒€鍟挎潏鍛存⒑缁嬫鍎愰柟鐟版喘瀵鈽夐姀鐘插祮闂侀潧顭堥崕杈╃不瑜版帗鈷?*/
app/globals.css:482:  padding: 28px 0 0; /* 闂傚倸鍊搁崐椋庣矆娴ｉ潻鑰块梺顒€绉撮崒銊ф喐閺冨牆绠栨繛宸簻鎯熼梺闈涱槸閸燁垰顪冩禒瀣畺闁靛繈鍊栭崑鍌炲箹鏉堝墽绉剁紒杈╂暬濮婄粯鎷呴崨濠呯闂佹儳绻愰柊锝呯暦娴兼潙鍐€妞ゆ劑鍊楅悞濂告⒑缁洖澧茬紒瀣浮閹繝寮撮姀锛勫帗闂佸疇妗ㄧ粈渚€寮搁妶鍡欑闁割偆鍠愰埛鎰版煏閸パ冾伃濠碉紕鍏樻俊鐤槾妞ゆ柨锕︾槐鎾存媴娴犲鎽甸柣銏╁灲缁绘繈鎮伴鈧畷鍗烆潩閸忓す褍鈹戦悙宸殶濠殿喚鏁搁弫顕€鎮欓崹顐綗闂佸湱鍎ら崵锕傚籍閸繄鍔﹀銈嗗笒鐎氼剛澹曡ぐ鎺撶厱妞ゎ厽鍨靛▍姗€鏌涢妶鍡樼闁靛洤瀚伴獮鎺楀箣濠垫劒鎮ｉ梻浣告贡椤㈠﹪宕洪弽顓炍﹂柛鏇ㄥ灠缁犲鎮归搹鐟板妺闁诲酣绠栧鐑樺濞嗘垹校闂佸憡鎸鹃崰搴綖?*/
app/globals.css:492:  min-height: 36px; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼崜褏甯涢柛濠呭煐缁绘繈妫冨☉姘叡闂佹椿鍘介幐楣冨焵椤掑喚娼愭繛鍙夌墪鐓ら柕濞у懐鐒兼繝鐢靛Т濞诧箓鎮″☉銏＄厱闁规壋鏅涙俊鍨熆瑜庡ú婊呮閹烘鐒垫い鎺戝绾惧ジ鏌ｉ幇顒夊殶闁告﹩浜濈换婵嬪閿濆棛銆愰梺缁橆殔濡繂鐣峰┑鍡╂僵閺夊牃鏅濋敍婵嬫倵楠炲灝鍔氭俊顐ｇ懅娴滄悂顢橀姀鈩冨殙闂佸搫绋侀崢浠嬫偂閺囥垺鍊堕柣鎰綑缁€鍐煃瑜滈崗娑氬垝濞嗘挶鈧線寮崼婵嗚€块棅顐㈡处閹搁攱绔?*/
app/globals.css:493:  padding: 0 14px; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼崜褏甯涢柛濠呭煐缁绘繈妫冨☉姘叡闂佹椿鍘介幐楣冨焵椤掑喚娼愭繛鍙夌墪鐓ら柕濞у懐鐒兼繝鐢靛Т濞诧箓鎮″☉銏＄厱闁规壋鏅涙俊鍨熆瑜庡ú婊呮閹烘鐒垫い鎺戝绾惧ジ鏌ｉ幇顒夊殶闁告﹩浜濈换婵嬪閿濆棛銆愰梺缁橆殔濡繂鐣峰┑鍡╂僵閺夊牃鏅濋敍婵嬫倵楠炲灝鍔氭俊顐ｇ懅娴滄悂鎮介崨濠勫帗閻熸粍绮撳畷婊冣枎閹寸姷顦繝鐢靛Т閸嬪棝鎮炴禒瀣厾濠殿喗鍔曢埀顒侇殕缁嬪顓兼径瀣幍闁哄鐗嗘晶鐣岀矈瀹勬噴鐟邦煥閸愵亞楔闂佸搫鐬奸崰鏍ь潖閼姐倐鍋撻悽娈跨劸濠碘€茬矙濮婅櫣绮欏▎鎯у壃闂佸搫鎳忕划搴ㄥ箲閵忕姭妲堥柕蹇曞Т閼板灝鈹戦埥鍡楃仴婵炲拑绲剧粋鎺旂矙濞嗙偓瀵?*/
app/globals.css:512:  height: 2px; /* 濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滈箖鏌￠崶銉ョ仼缁炬儳缍婇弻娑㈡晜鐠囨彃绠虹紓浣哄У鐢€愁潖閾忚瀚氶柡灞诲労閳ь剚顨婇弻锝堢疀閺冣偓閻ㄦ垿鏌℃笟鍥ф珝闁诡喗鐟╅幃婊兾熼崫鍕拻濠碉紕鍋戦崐鏇犳崲閹扮増鍋嬮柛鈩冪⊕閻撱儵鏌曢崼婵囶棛缂佽妫濋弻鏇㈠醇濠靛洤娅ｉ梺鍝勬閻熲晠寮婚敃鍌氱＜婵鍘ч崜鍫曟⒑?*/
app/globals.css:565:  height: 46px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈡晝閳ь剛绮婚鐐村€甸柨婵嗛閺嬫盯姊婚崒銈呯仸闁哄被鍔岄埞鎴﹀幢閳哄倐锕傛⒑?PC 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼幑鎰靛殭閻熸瑱绠撻幃妤呮晲鎼粹€愁潻闂佹悶鍔嶇换鍫ョ嵁閺嶎灔搴敆閳ь剚淇婇懖鈺冩／闁诡垎浣镐划闂佸搫鏈ú妯兼崲濞戙垺鍊锋い鎺嶈兌瑜板懘姊绘担鍛婂暈闁告柨绻樺畷鎴﹀箻缂佹ǚ鎷绘繝鐢靛Т妤犲憡绂嶅鍕閻犲泧鍐炬喘缂備緡鍠楅悷鈺呯嵁濮椻偓閻涱喗寰勯崨濠勬綎濠碉紕鍋戦崐鏍偋濠婂牆纾绘繛鎴炴皑娑?*/
app/globals.css:566:  padding: 4px; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼幑鎰靛殭閻熸瑱绠撻幃妤呮晲鎼粹€愁潻闂佹悶鍔嶇换鍫ョ嵁閺嶎灔搴敆閳ь剚淇婇懖鈺冩／闁诡垎浣镐划闂佸搫鏈ú妯兼崲濞戙垺鍊锋い鎺嶈兌瑜板懘姊绘担鍛婂暈闁告柨绻樺畷鎴﹀箻缂佹ǚ鎷绘繝鐢靛Т妤犲憡绂嶅鍕閻犲泧鍛殼濡ょ姷鍋為崝娆撶嵁閺嶃劍濯撮柛娑橈功閳ь剦鍓熷娲礈閹绘帊绨煎┑鐐插级閿曘垽宕哄☉銏犵闁绘劦浜欑花濠氭⒑閸濆嫬鈧湱鈧瑳鍥х畾闁割偅绺鹃弨浠嬫煃閵夈劍鐝柛瀣ㄥ劦閺屸€崇暆鐎ｎ剛鐦堥悗瑙勬礉缁墽绮诲☉銏犵闁圭粯甯╁Λ婊堟⒒?*/
app/globals.css:576:  height: 100%; /* 闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曚綅閸ヮ剦鏁嶉柣鎰綑娴滆鲸绻濋悽闈浶㈡繛灞傚€楃划缁樺鐎涙鍘甸梻鍌氬€搁顓⑺囬敃鍌涚厽妞ゆ挾鍣ュ▓婊堟煛鐏炲墽娲撮柛鈺佸瀹曟﹢鎮欓澶婃倕濠电姷鏁搁崑娑㈡偤閵娾晜鍋嬮柣妯款嚙閽冪喐绻涢幋娆忕仼闁绘帗妞介弻娑㈠箛閸忓摜鏆楅梺閫炲苯澧悽顖滃仱楠炲骞栨担鍦姺闂佹寧娲嶉崑鎾绘煟韫囥儵妾い銊ｅ劦閹瑧鈧數顭堥～褍鈹戦悙闈涘付缂佺粯锚閻ｅ嘲顭ㄩ崱鈺傂梻浣告惈濡酣宕归懡銈嗩潟闁规儳鐡ㄦ刊鎾煟閻斿憡绶茬悰鑲╃磽閸屾瑨鍏岀紒顕呭灣閹广垽宕掗悜鍥╃◤闂婎偄娲︾粙鎴犵不閺屻儲鐓欓梺顓ㄧ畱閺嬨倝鏌℃径瀣€愭慨濠冩そ瀹曨偊宕熼锝嗙杹闂備胶顭堥鍡涘箲閸ヮ剙钃熸繛鎴炲焹閸嬫捇鏁愭惔鈥茬敖缂備胶濮甸…鍥╂閹烘挻缍囬柕濞垮劤閻熻尙绱撴担璇℃畼闁哥姵鐗曢悾鐤亹閹烘繃鏅╅梺鍛婄懀閸庡啿螞椤栫偞鈷?*/
app/globals.css:577:  padding: 0 12px; /* 闂傚倸鍊搁崐椋庣矆娓氣偓楠炴牠顢曚綅閸ヮ剦鏁嶉柣鎰綑娴滆鲸绻濋悽闈浶㈡繛灞傚€楃划缁樺鐎涙鍘甸梻鍌氬€搁顓⑺囬敃鍌涚厽妞ゆ挾鍣ュ▓婊堟煛鐏炲墽娲撮柛鈺佸瀹曟﹢顢旀担璇℃綌濠电姷顣藉Σ鍛村磻閸涘瓨鏅濋柕蹇嬪€曢拑鐔哥箾閹存瑥鐏╅崬顖炴⒑閻熸壆鎽犵紒璇插暣瀹曞啿煤椤忓懐鍘甸梺鍦帛鐢晠鎮℃總鍛婄厵妞ゆ梻鐡斿▓娆撴煏閸ャ劌濮嶆鐐村浮楠炴﹢宕ｆ径濠冩暘缂傚倸鍊搁崐鐑芥嚄閼稿灚鍙忛柣銏㈩焾閸ㄥ倸鈹戦崒婊庣劸濡楀懘姊洪崷顓烆暭婵犮垺顭囩划濠氭偡閹冲﹤缍婇弫鎰板川椤撶偠绶熼梻浣告贡閺屽鐣烽悽鍨潟闁圭儤顨嗛崐閿嬨亜閹哄棗浜鹃梺鍛婃煟閸婃牠濡甸崟顖氱婵犻潧娲ら弸鐘绘⒑?*/
app/globals.css:594:  height: 36px; /* 闂傚倸鍊搁崐鎼佸磹閻戣姤鍤勯柛顐ｆ礀缁犵娀鏌熼幑鎰靛殭閻熸瑱绠撻幃妤呮晲鎼粹€愁潻闂佹悶鍔嶇换鍫ョ嵁閺嶎灔搴敆閳ь剚淇婇懖鈺冩／闁诡垎浣镐划闂佸搫鏈ú妯兼崲濞戙垺鍊锋い鎺嶈兌瑜板懐绱撻崒娆掑厡濠殿噣娼ч…鍨潨閳ь剟鍨鹃敃鍌氶敜婵°倓绀佸▓婵嬫⒒閸屾氨澧涚紒瀣灴閿濈偛顓兼径瀣幗闂婎偄娲﹂幑鍥偘濠婂懐纾奸柣妯哄暱閻忛亶鏌ｈ箛鎾虫殻婵﹨娅ｇ划娆撳箰鎼淬垺瀚抽梻浣搞偢椤ｏ妇鍒掑▎鎾扁偓渚€寮崼婵嗚€块棅顐㈡处閹搁攱绔?*/
app/globals.css:605:  height: 15px; /* 闂傚倸鍊搁崐鎼佸磹瀹勬噴褰掑炊椤掆偓杩濋梺閫炲苯澧撮柡灞剧〒閳ь剨缍嗛崑鍛暦瀹€鍕厸鐎光偓閳ь剟宕伴弽顓溾偓浣糕槈閵忕姴鑰块梺鍝勬川閸ｃ儱螣閸屾埃鏀介柣鎰▕閸ょ喖鏌涜箛鏂嗩亪锝炶箛鏃傜瘈婵﹩鍓涢敍婊冣攽鎺抽崐鎰板磻閹捐秮鐟邦煥閸曨偄濮㈤梺瀹狀潐閸ㄥ潡骞冮埡鍐╁珰鐟滃秵瀵奸幇鐗堚拺闁告縿鍎卞▍蹇涙煕閵娿劑鍝虹紒宀冮哺缁绘繈宕惰閸婄偛顪冮妶鍡楃瑐闁煎啿鐖煎畷銏ゆ焼瀹ュ棌鎷洪梺鍦焾鐎涒晝澹曢悽鍛婄厱閻庯綆鍋呭畷宀勬煛瀹€瀣埌閾绘牕霉閿濆洦鍤€缁剧偓濞婂铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
app/globals.css:616:  height: 2px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閻愭潙鐏﹂柣鐔村劦閸┾偓妞ゆ巻鍋撴繛纭风節瀵槒顦剁紒鐘崇洴瀵挳鎮㈤柨瀣殮闂傚倷鐒﹂幃鍫曞礉瀹ュ洦宕查柛鎰ㄦ櫇閳瑰秴鈹戦悩鍙夋悙閸ユ挳姊洪崨濠佺繁闁告妫勯埢鎾诲醇閺囩啿鎷?*/
app/globals.css:678:  height: 18px; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼柇锕€鍔掓繛宸簻閸愨偓濡炪値鍓﹂崜姘辩矙閹达箑鐓″璺好￠悢鑽ょ杸闁哄洨鍋涙俊铏圭磽娴ｈ櫣甯涚紒璇茬墕閻ｅ嘲顫滈埀顒勩€侀弮鈧幏鍛村捶椤撴繄鑳哄┑鐘殿暜缁辨洟宕戦幋锕€纾归柡宥庡幖缁犱即鏌涢锝嗙闁搞劌鍊圭换娑橆啅椤旇崵鍑归梺鍝勬媼閸撶喖寮婚敐澶婄睄闁搞儺鐓堟禒鈺冪磼閻愵剙鍔ら柕鍫熸倐楠炲啫顫滈埀顒勫箖濞嗘挻顥堟繛鎴烆殔椤ユ岸姊绘笟鈧褍煤閿旂偓宕查柛鎰典簼瀹曞弶绻涢幋娆忕仼闂佸崬娲﹂妵鍕箛閳轰胶浠肩紓渚囧亜缁夌懓顫忛悜妯诲闁规鍣Σ顔剧磽娴ｅ壊妲归柟鍛婂▕楠炲啴骞嗚閺€浠嬫倵閿濆簼绨芥い锔芥緲椤啴濡堕崱妤冨姼闂佺顑傞崑鎾绘⒑閸濆嫭鍣虹紒顔芥崌閻?PC 濠电姷鏁告慨鐢割敊閺嶎厼绐楁俊銈傚亾闁伙絿鍏樺畷绋课旈埀顒€顔忓┑鍥ヤ簻闁圭偓鍓氬褏绱撳鍕獢鐎殿喖顭烽弫鎰緞婵犲倸鏁ら梻浣圭湽閸ㄥ寮灞炬噷缂傚倸鍊搁崐椋庣矆娓氣偓椤㈡牠宕ㄥ銈呮喘閺屽棗顓奸崨顖氬Е婵＄偑鍊栫敮鎺楁晝閿斿墽鐭撻柣銏犳啞閻撴洟骞栨潏鍓у埌闁告ɑ鎸抽弻娑㈠煛鐎ｎ剛鐦堥悗瑙勬磸閸旀垿銆佸鈧幃鈺呭垂椤愩倗袦闂傚倸鍊搁崐宄懊归崶顒夋晪闁哄稁鍘奸崹鍌炴煕濡ゅ啫鍓遍柣鏂挎娣囧﹪顢涘┑鍡曟睏缂備讲鍋撳┑鐘叉处閻撴洘绻涢幋鐑嗙劷闁圭晫濞€閺岋綁骞樼€涙顦ㄦ繛锝呮搐閿曨亝淇婇崼鏇炵妞ゆ挾鍋涢‖澶岀磽閸屾瑨顔夐柛瀣崌閺屾盯骞囬崗鍝ユ晼缂佹儳澧介崢褔鈥﹂崸妤佸殝闂傚牊绋戦～宥夋⒑鏉炵増绁板ù婊庡墴閸┾偓?*/
app/globals.css:688:  height: 42px; /* PC 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弴妤€浜鹃柧鑽ゅ仱閻擃偊宕堕妸褉妲堥梺鎼炲妼閸婂灝顕ｉ崼鏇為唶婵﹩鍘藉鎺楁⒑缁嬫鍎愰柟鐟版搐閻ｇ柉銇愰幒婵囨櫇闂侀潧鐗嗗ú銊╁储濠婂牊鈷掑ù锝呮啞閹牓鏌ｉ鐑嗘Ш缂侇喖顭烽獮妯盒ч崶锝呬壕濞达絽澹婂鈺呮偣妤︽寧顏犻柛鏃撶畱椤啴濡堕崱妤冪懆闁诲孩鍑归崣鍐ㄧ暦閹达附鍋勯柟鑲╁仒缁ㄥ姊洪崫鍕殭婵炲眰鍊涢。鍧楁⒒?*/
app/globals.css:689:  padding: 0 14px; /* 闂傚倸鍊峰ù鍥敋瑜庨〃銉╁传閵壯咁槸婵犵數濮撮崑鍡涙倿娴犲鐓犲┑顔藉姇閳ь剚顨嗙粙澶婎吋婢跺鍘甸柡澶婄墕婢х晫绮婂畡鎳婄懓顭ㄩ崘顏喰ㄩ梺鍝勭灱閸犳牕顫忛懡銈傚亾闂堟稑顥忔俊宸枤缁辨挻鎷呴幓鎺嶅闂備礁鎲￠崝锕傚窗濡ゅ懏鍋傞柡鍥╁枔缁犻箖鏌熺€电浠ч柟鍐插暞閵囧嫰濡烽妷顔煎壎闂佸搫鐭夌徊浠嬪煘閹达箑骞㈡繛鍡楃箳閸樹粙姊?*/
app/globals.css:696:  line-height: 1; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣椤愪粙鏌ㄩ悢鍝勑㈢紒鈧崼鐔虹闁糕剝蓱鐏忎即鏌涙繝鍛厫缂佺粯绻堝Λ鍐ㄢ槈閸楃偛澹堥梻浣侯焾鐞氼偊宕濋幋锕€钃熼柡鍥ュ灩闁卞洦绻濋棃娑欑ォ婵☆偁鍊濆鍝勭暦閸モ晛绗￠梺鍝勮閸旀垿宕洪悙鍝勭闁挎棁妫勬禍褰掓煛婢跺﹦澧遍柛瀣瀹曘垽鏁撻悩鏂ユ嫼闂佺厧顫曢崐鏇㈠几閹达附鐓欓柣鐔哄閸犳鈧鍠涢褔鍩ユ径濠庢僵闁挎繂鎳嶆竟鏇㈡⒑閹稿海绠撶紒銊ㄥ亹閼洪亶鎮惧畝鈧壕濂告煟濡厧鍔嬮柣婵愪簽缁?*/
app/globals.css:705:  max-width: 108px; /* PC 缂傚倸鍊搁崐鎼佸磹閹间礁纾归柣鎴ｅГ閸婂潡鏌ㄩ弴妤€浜鹃柧鑽ゅ仱閻擃偊宕堕妸褉妲堥梺鎼炲妼閸婂灝顫忓ú顏嶆晢闁逞屽墰缁棃骞橀鑲╊槱闂佺粯顭囩划顖炴偂閺囥垺鐓欓柡澶婄仢閹胶绱掗妸锔藉唉闁哄本绋撻埀顒婄秵閸嬪懐浜搁銏＄厓闁芥ê顦藉Σ鎼佹煃鐠囨煡顎楅摶锝夋煠婵劕鈧牕鈻撻幆褉鏀介柣妯虹仛閺嗏晠鏌涚€ｎ剙浠辨鐐村灦缁楃喖鍩€椤掆偓閻ｅ嘲煤椤忓嫬鍞ㄩ悷婊勭矒瀹曢潧螖閸涱喚鍘遍梺鍝勬储閸斿苯鈻嶅Ο璁崇箚闁煎ジ顤傞崵娆愩亜椤忓嫬鏆ｅ┑鈥崇埣瀹曞崬螣闁垮顏稿┑鐘愁問閸犳牠鏁冮妶鍥╃濠电姴娲ㄥ畵渚€鏌涢埄鍐槈缂侇偄绉归弻娑㈩敃閵堝懏鐎惧┑鐐叉噹濡繂顫忓ú顏勭闁兼祴鏂傞崑鐐烘⒑閸濆嫭鍣虹紒璇茬墣濡喎顪冮妶鍡樼５闁稿鎹囬弻鈥崇暆鐎ｎ剛蓱闂佽鍨卞Λ鍐极閹版澘骞㈡俊銈勮兌閺嗘岸姊婚崒娆戭槮闁圭⒈鍋婇幃褍顭ㄩ崼婵堫槶闂佺粯鏌ㄩ〃搴ㄥ吹閺囥垺鐓欓柟顖涙緲琚氶梺鍝勬噺瑜板啴鈥︾捄銊﹀磯闁绘碍娼欐导鎰版倵濞堝灝鏋ら柛蹇斆～蹇撁洪鍕獩婵犵數濮撮崯顐︽儊闁垮绠鹃弶鍫濆⒔缁夘喗銇勯妷锔藉鞍闁靛洦鐟╅獮搴ㄦ嚍閵夈垺瀚藉┑鐐舵彧缁插潡鈥﹂崼銉ョ畺闁瑰鍋樼换鍡涙煕濞嗗浚妲哥紒妤佸哺閺屾洟宕堕妸锔绘濡ょ姷鍋為悧妤呭箯閸涱垳鐭欓柛顭戝枟椤撳姊婚崒娆戭槮闁硅绻濆畷婵嬫晝閸屾氨鐛ラ梺鍝勮癁鐏炴儳鐦滃┑鐐差嚟婵挳顢栭崱娑樼９闁割偅娲橀悡鐔兼煙闁箑澧板ù鐘崇⊕缁绘盯宕ㄩ鐣岊槹闂佸搫鏈惄顖炲春閿熺姴纾奸柕鍫濇閺夊綊姊绘担绛嬪殐闁哥姵鐗犲畷鏌ュ蓟閵夈儳鍘洪柟鍏肩暘閸ㄦ椽宕曢悢鍏肩厪闊浄绲炬繛鍥煕鐎ｎ倖鎴炵┍婵犲洦鍊锋い蹇撳閸嬫捇寮介‖锟犵細缁犳稑鈽夊Ο铏光偓顓熺節閻㈤潧校闁肩懓澧界划濠氭偐瀹曞洨顔曢梺鐟扮摠閻熴儵鎮橀埡鍛厽闁圭儤鍨规禒娑㈡煏閸パ冾伃妤犵偞甯￠獮瀣攽閹邦亝鍋呴梻?*/
app/globals.css:713:  line-height: 1; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣椤愪粙鏌ㄩ悢鍝勑㈢紒鈧崼鐔虹闁糕剝蓱鐏忎即鏌涙繝鍛厫缂佺粯绻堝Λ鍐ㄢ槈閸楃偛澹堥梻浣侯焾鐞氼偊宕濋幋锕€钃熼柡鍥ュ灩闁卞洦绻濋崹顐㈠缁楁垹绱撴担鍝勪壕闁稿孩濞婇垾锕傛倻閼恒儱浜楀銈嗗姧缁犳垿鎮欐繝鍥ㄧ厪濠电姴绻掗悾鐢告煛?*/
app/globals.css:739:  padding: 8px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閸忔﹢宕戦幘鍓佺當婵炴垶蓱閸ｅ綊鏌涢妸锔剧疄闁诡喗锕㈤幃娆撳垂椤愶絿褰ч梻浣告惈濡绮婚幘璇茶摕闁挎繂顦猾宥夋煕鐏炴崘澹樺ù鐘愁焽缁辨挻鎷呴幓鎺嶅闂備礁鎲￠崝锕傚窗濡ゅ懏鍋傞柡鍥╁枔缁犻箖鏌熺€电浠ч柟鍐插暞閵囧嫰濡烽妷顔煎壎闂佸搫鐭夌徊浠嬪煘閹达箑骞㈡繛鍡楃箳閸樹粙姊?*/
app/globals.css:753:  padding: 11px 12px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閼碱剦妲烽梻浣告惈濞层垽宕归崷顓犱笉闁绘绮悡娆撴煙椤栧棗鍠氶弳銏ゆ⒑閸涘娈曠€光偓閹间礁钃熼柨婵嗩槸缁秹鏌涚仦鎹愬濠碘剝妞介幃?*/
app/globals.css:758:  line-height: 1.2; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾绾惧鏌ｉ幇顔芥毄闁活厽鐟╅弻鐔告綇妤ｅ啯顎嶉梺绋垮椤ㄥ﹪寮诲☉妯兼殕闁逞屽墴瀹曟垿鎮欓崫鍕紱?*/
app/globals.css:792:  height: 18px; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼柇锕€鍔掓繛宸簻閸愨偓濡炪値鍓﹂崜姘辩矙閹达箑鐓″璺好￠悢鑽ょ杸闁哄洨鍋涙俊铏圭磽娴ｈ櫣甯涚紒璇茬墕閻ｅ嘲顫滈埀顒勩€侀弮鈧幏鍛村捶椤撴繄鑳哄┑鐘殿暜缁辨洟宕戦幋锕€纾归柡宥庡幖缁犱即鏌涢锝嗙闁搞劌鍊圭换娑橆啅椤旇崵鍑归梺鍝勬媼閸撶喖寮婚敐澶婄睄闁搞儺鐓堟禒鈺冪磼閻愵剙鍔ら柕鍫熸倐楠炲啫顫滈埀顒勫箖濞嗘挻顥堟繛鎴烆殔椤ユ岸姊绘笟鈧褍煤閿旂偓宕查柛鎰典簼瀹?*/
app/globals.css:800:  height: 42px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟缁㈠枟閻撴盯鎮橀悙棰濆殭闁逞屽墯缁诲牓鎮伴鈧獮鍥敇閻斿嘲濡抽梻浣瑰缁诲倸煤閵娾晛鍌ㄩ柟鎵閻撶喖骞栧ǎ顒€鈧倕顭囬幇顓犵闁告瑥顦遍惌鎺斺偓瑙勬磻閸楀啿顕ｆ禒瀣垫晣闁绘灏欓妶锕傛⒒娴ｅ摜绉洪柛瀣躬瀹曘垽鎳栭埡鍌ゅ仺闂佺粯鍔楅崕銈夋偂濞嗘挻鈷戞い鎾卞妿閻ｈ鲸顨ラ悙瀵稿⒌闁哄本鐩幃娆忣啅椤斿彨褎绻涢敐鍛悙闁挎洦浜濇穱濠囧醇閺囩偛绐涘銈嗘尰缁嬫垶绂嶉崜褎鍠愰柣妤€鐗嗙粭姘舵煛閸滀椒閭慨?*/
app/globals.css:801:  padding: 0; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｉ幇顒佹儓缂佺姳鍗抽弻鐔兼⒒鐎靛壊妲紓浣哄Х婵灚绌辨繝鍥舵晬婵犻潧瀚ч崑鎾诲焵椤掑嫭鐓涢悗锝庝簽鏁堝Δ鐘靛仦閻楁洝褰佸銈嗗坊閸嬫挸鈹戦檱閸嬫劗妲愰幒妤佸亹闁惧浚鍋嗛崙鈥愁渻閵堝骸骞栨繛纭风節楠炲﹤顭ㄩ崼鐕佹濠电偞鍨堕敃鈺侇焽閺冨牊鈷戦悹鍥皺缁犳澘螖閻樿尙绠崇紒顔碱煼楠炲鏁傞懖鈺冣棨婵犲痉鏉库偓鎰板磻閹剧粯鐓冮柦妯侯樈濡叉悂鏌嶇拠鏌ヮ€楅摶锝夋煟閹炬娊顎楀鍥ㄧ節绾板纾块柛瀣灴瀹曟劙寮介鐐殿唶闂佸綊妫跨拋鏌ュ焵椤掑﹦鐣遍柣锝忕節楠炲秹顢欓懞銉晭濠电姵顔栭崰妤呭Φ濞戙垹纾婚柟鎯х亪閸嬫挾鎲撮崟顒傦紭闂佸憡姊归崹鍧楁偘椤旂⒈鍚嬪鑸瞪戦弲鈺呮⒑鐠団€崇€婚柛銉㈡櫅绾惧潡姊?*/
app/globals.css:812:  height: 20px; /* SVG 闂傚倸鍊搁崐鎼佸磹閻戣姤鍊块柨鏇炲€哥粻鏍煕椤愶絾绀€缁炬儳娼￠弻鐔煎箚閻楀牜妫勭紒鐐劤椤兘寮婚悢鐓庣鐟滃繒鏁☉銏＄厱閻庯綆浜跺Ο鈧梺鍝勮閸斿矂鍩為幋锕€骞㈡慨妤€鐗忕粈濠冪節閻㈤潧浠滈柣妤€锕妴鍐幢濡皷鏀虫繝鐢靛Т濞村倿寮鍡樺弿婵妫楅獮妤呮煕鎼淬垺灏い?*/
app/globals.css:858:  padding: 8px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閸忔﹢宕戦幘鍓佺當婵炴垶蓱閸ｅ綊鏌涢妸锔剧疄闁诡喗锕㈤幃娆撳垂椤愶絿褰ч梻浣告惈濡绮婚幘璇茶摕闁挎繂顦猾宥夋煕鐏炴崘澹樺ù鐘愁焽缁辨挻鎷呴幓鎺嶅闂備礁鎲￠崝锕傚窗濡ゅ懏鍋傞柡鍥╁枔缁犻箖鏌熺€电浠ч柟鍐插缁辨挸顓奸崱妤冧紝闂佸搫鏈惄顖氼嚕椤掑倹瀚氶柟缁樺笒琚濋梻鍌欑閹碱偊鎯屾径宀€绀婂〒姘ｅ亾鐎殿噮鍋婇獮鍥级閸喛鈧灝鈹戦悙鍙夘棡闁告梹娲栭埢宥呂熼懡銈囩槇?*/
app/globals.css:880:  padding: 12px 12px; /* 闂傚倸鍊搁崐宄懊归崶顒夋晪鐟滃繘鎳為柆宥嗗殐闁宠桨鑳剁粵蹇曠磽閸屾瑧鍔嶆い顓炴喘閹敻宕奸弴鐔哄幈濡炪倖鍔楁慨鎾礉濮樿埖鐓涢柛鏇楁櫅閸旓箓鏌＄仦鍓р槈闁宠棄顦靛畷锟犳倷鐎甸晲绨存繝鐢靛仜閻°劎鍒掑鍥у灊闁规崘顕ч拑鐔兼煥濠靛棭妲归柛瀣閺屾稑鈽夊鍫濆闂佸憡鍩婄换婵嗩潖閻戞ɑ濮滈柟娈垮櫘濡差噣姊虹紒妯煎⒈闁告鍥舵晪闁挎繂顦柋鍥煛閸モ晛浠遍柛鐐茬埣濮婃椽妫冨☉姘辩暰闂佸搫鎳忕划鎾愁嚕椤愶富鏁嶆繝濠傛噽閿?*/
app/globals.css:884:  line-height: 1.2; /* 缂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣捣閻棗銆掑锝呬壕闁芥ɑ绻堥弻鐔煎礈娴ｇ儤鎲橀梺杞扮椤戝洭骞夐崨濠冨劅闁靛鍎抽悿鍕⒑闂堟单鍫ュ疾濞戙垺鍋傛繛鎴欏灪閻撴洟鏌熼弶鍨倎缂併劏宕甸埀顒冾潐濞插繘宕曢柆宥佲偓鏃堝礃椤斿槈褔鏌涢埄鍐噧妞ゎ値鍥ㄢ拺闁告稑锕ら悘銉х磽瀹ュ拑宸ラ柣锝囧厴閹晫绮欑拠鐙欏喚鐔嗛悹杞拌閸庢垿鏌涘鈧粻鏍ь潖濞差亜宸濆┑鐘插暙绾锯晠鎮楀▓鍨灍闁瑰憡鎮傚﹢渚€姊绘担鍝ヤ虎妞ゆ垵鍟粋宥咁煥閸喓鍘棅顐㈡搐鑹岄柛瀣尭閻ｇ兘宕堕敂绛嬫晣婵?*/
app/globals.css:898:  padding: 12px 12px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬮柛鈺傜〒缁辨捇宕掑顑藉亾閻戣姤鍊块柨鏇炲€搁拑鐔兼煏婵炵偓娅撻柡浣割儐閵囧嫰骞橀崡鐐典痪闂佺楠搁ˇ浼村Φ閸曨喚鐤€闁规儳顕妶鈺佲攽闄囩亸顏堫敋瑜旈垾鏃堝礃椤斿槈褔鏌涢埄鍐剧劷妞わ妇澧楃换娑氣偓娑欘焽閻﹪鏌ｉ弽褋鍋㈤柣娑卞枟缁绘繈宕掗妶鍥у汲闂備礁澹婇崑鎺楀磻閸涙潙鐤炬繝濠傜墛閳锋垿鏌涘☉姗堟敾濠㈣泛瀚伴弻娑氣偓锝庝簼閸ゅ洨鈧鍠楁繛濠冧繆閻戣棄鐓涢柛灞剧矊楠炴劕鈹戦悩顔肩伇婵炲鐩弫鍐晜閼恒儲鐝烽梺闈涚返妫颁胶鐩庨梻渚€娼х换鎺撳垔閹绢喖绀夐柣鏃囨绾?*/
app/globals.css:902:  line-height: 1.2; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬮柛鈺傜〒缁辨捇宕掑顑藉亾閻戣姤鍊块柨鏇炲€搁拑鐔兼煏婵炵偓娅撻柡浣割儐閵囧嫰骞橀崡鐐典痪闂佺楠搁ˇ浼村Φ閸曨喚鐤€闁规儳顕妶鈺佲攽闄囩亸顏堫敋瑜旈垾鏃堝礃椤斿槈褔鏌涢埄鍐剧劷妞わ妇澧楃换娑氣偓娑欘焽閻﹪鏌ｉ弽褋鍋㈤柣娑卞枟缁绘繈宕掗妶鍥у汲闂備礁澹婇崑鎺楀磻閸涙潙鐤炬繝濠傜墛閳锋垿鏌熼懖鈺佷粶闁告柣鍎甸弻娑㈠煛閸屾粌鈷岄悗娈垮櫘閸撶喖宕洪埀顒併亜閹哄棗浜鹃梺?*/
app/globals.css:926:  padding: 4px 6px 10px 18px; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鍟悘濠囨倵閸忓浜鹃梺鍛婃处閸撴瑩宕滈崼鏇熲拺缂佸娉曠粻鎶芥煃瀹勬壆澧曢柍缁樻尰缁傛帞鈧綆鍋嗛崢閬嶆⒑闂堟侗妯堥柛鐘崇墬閺呭爼顢欓崜褏锛滈梺閫炲苯澧柣锝嗙箞瀹曠喖顢楅崒姘疄濠电姷鏁告繛鈧繛浣冲吘娑樜旈崪浣规櫆濡炪倖鍔ч梽鍕偂閺囩喍绻嗘い鏍ㄨ壘閹垿鏌￠崱蹇旀珖缂佽鲸甯楀蹇涘Ω閿曗偓绾炬娊鎮楃憴鍕閻㈩垱甯熼悘鍐╃箾鏉堝墽鍒版繝鈧潏顐犱汗闁割偁鍨荤壕浠嬫煕鐏炲墽鎳嗛柛蹇撶灱缁辨帡顢氶崨顓犱桓闂佽桨绀侀崯瀛樻叏閳ь剟鏌曢崼婵囧櫤闁诲寒鍓熼幃妤呯嵁閸喖濮庡┑鐐额嚋缁蹭粙鍩㈡禒瀣垫晜闁割偆鍠撻崢杈ㄧ節閻㈤潧孝閻庢凹鍓熷鍛婃償閵婏妇鍘介梺瑙勫劤閸熷潡鍩€椤掆偓閻忔繈锝炶箛鎾佹椽顢旈崨顓濈敾闂備浇顫夐鏍窗濡ゅ懎绠熷┑鍌氭啞閳锋垿鏌涘☉姗堟敾闁抽攱鍔栫换娑㈡嚑椤掆偓閺嬫稒顨ラ悙鍙夘棦鐎规洖鐖奸、妤呭焵椤掑倻涓嶉柕澶涜礋娴滄粓鏌￠崘銊モ偓鍛婄妤ｅ啯鐓?*/
app/globals.css:932:  padding: 9px 10px; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鍟悘濠囨倵閸忓浜鹃梺鍛婃处閸撴瑩宕滈崼鏇熲拺缂佸娉曠粻鎶芥煃瀹勬壆澧曢柍缁樻尰缁傛帞鈧綆鍋嗛崢閬嶆⒑闂堟侗妾х紒鑼跺Г娣囧﹦绮欏Λ鐢垫嚀椤劑宕熼鐘靛帨闂備礁鎼惌澶岀礊娓氣偓楠炲啴濮€閵堝懎绐涙繝鐢靛Т鐎氼剟宕甸幒妤佲拻濞达綀濮ら妴鍐磼閳ь剚绗熼埀顒勫箖閵夆晜鍋傞幖鎼枛濞堛劑姊洪崜鎻掍簼婵炲弶鐗犻弻瀣炊椤掍胶鍘棅顐㈡搐閿曘儱鈻嶉崱娑欑厸濞撴艾娲ら悘锝囩磼?*/
app/globals.css:936:  line-height: 1.2; /* 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏灪閸嬨倝鏌曟繛褍鍟悘濠囨倵閸忓浜鹃梺鍛婃处閸撴瑩宕滈崼鏇熲拺缂佸娉曠粻鎶芥煃瀹勬壆澧曢柍缁樻尰缁傛帞鈧綆鍋嗛崢閬嶆⒑闂堟侗妯堥柛鐘冲哺瀹曘垹顭ㄩ崨顖滐紲闂佽褰冮鍥╃矓椤曗偓閺岋紕浠﹂崜褎鍒涢悗娈垮枟閹歌櫕淇婇幖浣肝ㄩ柕澹苯鏅ユ繝鐢靛Х閺佹悂宕戝☉銏″亱闁糕剝绋掗崵鎰亜閺嶎偄浜归柍褜鍓氬Λ鍐ㄧ暦濮椻偓椤㈡瑩宕叉竟顖氭处閻撴洟鏌曟径鍫濆闁绘挻鍔欓弻鈩冪瑹閸パ呬哗濡炪値浜滈崯瀛樹繆閸洖绀冮柕濞у倻妫梻鍌欑劍閹爼宕濆畝鍕亯濠靛倻顭堣繚?*/
app/globals.css:969:  padding: 0; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐椤愮喎浜鹃柨鏇炲€搁悙濠囨煃鏉炴壆顦﹂柣蹇擄工椤啴濡堕崱娆忣潷缂備緡鍠栫粔鐟邦嚕閸愬樊鐓ラ柛顐ゅ枔閸樻捇鎮峰鍕煉鐎规洘绮撻幃銏ゆ偂鎼淬倖鎲伴梻浣虹帛濡礁鈻嶉敐澶嬪剹婵炲棙鍔楃粻楣冩煕閳╁啰鎳冨ù婊堢畺閺屽秶鎷犻懠顒€鈪靛┑顔硷龚濞咃綁骞夐幘顔肩妞ゆ挾鍠愰崯鎾寸節閻㈤潧浠滈柟鍐茬箰鐓ら柣鏃傚帶閻忔娊鏌￠崘銊у闁绘帒鐏氶妵鍕箳瀹ュ棭妯傜紓浣筋嚙濡瑩濡甸崟顖氬唨闁靛鍊楃换渚€姊虹粙璺ㄦ槀闁稿海鏁诲璇测槈濮楀棙鍍靛銈嗗笂缁€渚€寮搁悩缁樷拺闁告繂瀚﹢浼存煟閳哄﹤鐏﹂柣娑卞櫍瀹曞爼顢楁径瀣珜濠电偠鎻徊浠嬪箟閿熺姵鍋╂い鎺戝€荤壕浠嬫煕鐏炲墽鎳呴柛鏂跨У閹便劍绻濋崒銈囧悑閻庤娲戦崡鎶界嵁濡吋瀚氶柤纰卞墻閸?*/
app/globals.css:983:  min-height: 100vh;
app/globals.css:1005:  height: 100%;
app/globals.css:1039:  min-height: 80vh; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｉ幇顒佲枙闁绘帟濮ょ换娑㈠幢濡粯鍎庨梺杞扮鐎氫即寮诲☉銏╂晝闁绘ɑ褰冩慨鏇㈡⒑缁嬪潡顎楅柨鏇樺劦婵＄敻宕熼姘敤濡炪倖鍔﹀鈧紒顔煎缁辨挻鎷呴幓鎺嶅闁诲骸鍘滈崑鎾绘煕閺囥劌澧伴柛妯哄船閳规垿鎮╃紒妯婚敪濠碘槅鍋呴〃濠囥€侀弮鍫晝闁挎梻鏅崢鍗炩攽閳藉棗鐏犻柛姘儔瀵娊顢楅崟顒傚幐閻庡厜鍋撻悗锝庡墰閻﹀牓鎮楃憴鍕闁告鍥风稏婵犻潧顑愰弫鍕煕椤垵娅樻俊顐ｇ矒濮婂宕掑▎鎰偘濡炪倖娉﹂崨顔煎簥闂佸綊鍋婇崰妤€鐣烽弻銉︾厵闂侇叏绠戦弸鐔衡偓瑙勬礀瀵爼骞堥妸銉富閻犲洩寮撴竟鏇㈡⒒娴ｇ瓔鍤冮柛鐘冲哺瀵偅绻濆銉㈠亾娴ｇ硶鏋庨柟鐐綑濞堢喖姊洪棃娑辨Ф闁稿氦椴告穱?*/
app/globals.css:1040:  padding: 120px 0; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｉ幇顒佲枙闁绘帟濮ょ换娑㈠幢濡粯鍎庨梺杞扮鐎氫即寮诲☉銏╂晝闁绘ɑ褰冩慨鏇㈡⒑缁嬪潡顎楅柨鏇樺劦婵＄敻宕熼姘敤濡炪倖鍔﹀鈧紒顔煎缁辨挻鎷呴幓鎺嶅闁诲骸鍘滈崑鎾绘煕閺囥劌澧伴柛妯哄船閳规垿鎮╃紒妯婚敪濠碘槅鍋呴〃濠囥€侀弮鍫晝闁挎梻鏅崢鍗炩攽椤斿浠滈柛瀣尰缁绘稒鎷呴崘鍙夋悙闁绘挴鈧剚鐔嗛柤鎼佹涧婵洨绱掗悩鍝勫惞缂佽鲸甯掗埥澶婎煥鎼淬垻绉锋俊鐐€х紞鈧柛瀣姉濡叉劙骞樼€涙ê顎撻柣鐘叉礌閸撴繈鎮鹃崼鏇熲拺缁绢厼鎳忛悵顏堟煥濮樿埖鐓熼柨婵嗘噹濡茬粯銇勯锝囩煉闁糕斁鍋撳銈嗗坊閸嬫捇鏌ｉ敐鍥у幋濠碘剝鎮傞崺鈩冩媴娓氼垰鎮戝┑锛勫亼閸婃牕顫忚ぐ鎺戠？闁惧浚鍋掑▓浠嬫煕閺囥劌鐏￠柍?*/
app/globals.css:1065:  max-width: 980px; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姴缍婇弻宥夊传閸曨剙娅ｉ梺绋胯閸斿矂婀侀梺缁樏Ο濠囧磿韫囨稒鐓曢柟瀵稿Т閳诲牓鏌＄仦鍓ф创妤犵偛娲Λ鍐ㄢ槈濞嗘垳閭梻鍌欑閹诧繝宕濊箛娑樼；闁瑰墽绮埛鎺懨归敐鍫綈闁稿濞€閺屾稒鎯旈姀掳浠㈤悗瑙勬礃缁捇寮崘顔肩＜婵﹩鍙€缁躲垺淇婇悙顏勨偓鏍偋濠婂牆纾婚柣鎰惈绾惧綊鏌ｉ姀銏℃毄婵☆偒鍨遍妵鍕箻鐠鸿桨娌梺闈╃悼閸庛倝濡甸崟顖毼ㄩ柕澶樺枟閳诲牓姊?*/
app/globals.css:1067:  line-height: 1.08; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姴缍婇弻宥夊传閸曨剙娅ｉ梺绋胯閸斿矂婀侀梺缁樏Ο濠囧磿韫囨稒鐓曢柟瀵稿Т閳诲牓鏌＄仦鍓ф创妤犵偛娲Λ鍐ㄢ槈濞嗘垳閭梻鍌欑閹诧繝宕濊箛娑樼；闁瑰墽绮埛鎺懨归敐鍫綈闁稿濞€閺屾稒鎯旈姀掳浠㈤悗瑙勬礃缁捇寮崘顔肩＜婵﹩鍙€缁躲垺淇婇悙顏勨偓鏍偋濠婂牆纾婚柣鎰惈绾惧鏌ｅΟ铏癸紞缂佺娀绠栭弻鐔衡偓鐢殿焾閸撻亶鏌ｉ幒宥囩煓闁哄矉缍侀獮鎺楀箻閺夋垟鍋撻幇鐗堢厸?*/
app/globals.css:1071:  max-width: 1220px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閳ь剦鍙忕紞渚€鐛幒妤€绠婚柛娆愵焽閻帡姊绘担鍝ョШ婵☆偉娉曠划鍫熺瑹閳ь剙鐣峰▎鎾村亹缂備焦顭囬崢閬嶆⒑闁稑宓嗘繛浣冲洤鍑犳繛鎴欏灪閻撴洟鏌熼懜顒€濡煎ù婊堢畺濮婂宕掑▎鎴濆闂佽鍠栭悥鐓庣暦閺囩伝娲敂閸曨収妲堕梻浣瑰濞叉牠宕愮粙鍟冄囧矗婢跺牅绨婚梺鍝勭▉閸嬪嫭绂掗敃鍌涚厱濠电姴瀚弳鈺呮煟閵夘喕閭い銏★耿閹瑩寮堕幋鐑嗕画濠碉紕鍋戦崐鎴﹀磿闁单鍥偨缁嬭法鐣?*/
app/globals.css:1073:  line-height: 1.06; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閳ь剦鍙忕紞渚€鐛幒妤€绠婚柛娆愵焽閻帡姊绘担鍝ョШ婵☆偉娉曠划鍫熺瑹閳ь剙鐣峰▎鎾村亹缂備焦顭囬崢閬嶆⒑闁稑宓嗘繛浣冲洤鍑犳繛鎴欏灪閻撴洟鏌熼懜顒€濡煎ù婊堢畺濮婂宕掑▎鎴濆闂佽鍠栭悥鐓庣暦閺囩伝娲敂閸曨収妲堕梻浣瑰濞叉牠宕愮粙鍟冄囧矗婢跺牅绨婚梺鍝勭▉閸嬪嫭绂掗敃鍌涚厱閻庯綆鍓欐牎缂備胶绮惄顖炵嵁鐎ｎ喗鍊婚柛鈩冪懃婵椽姊绘担铏瑰笡閻㈩垱顨婇獮鍐磼閻愯尪鎽?*/
app/globals.css:1077:  max-width: 1120px; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼幏灞界劷闁逞屽墮閸燁垰顕ラ崟顖氱疀妞ゆ帒鍋婄槐闈涒攽閻樺灚鏆╁┑顔炬暬瀹曟瑨銇愰幒鎴炵€柣搴秵閸犳鎮¤箛娑氬彄闁搞儜灞藉壈闂侀€炲苯澧繛鑼枎閻ｅ嘲顫滈埀顒勫春閳ь剚銇勯幒鎴濐仾闁抽攱鍨块弻鐔兼嚃閳轰椒绮堕梺鍛婃⒐閹告娊寮诲☉銏犵闁告洦鍘鹃弳銈夋倵濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏嶉柛瀣崌閹粙鎮介崹顐础婵＄偑鍊栭幐楣冨磻閻愬搫闂柣鎴炃滄禍婊堟煏婢跺牆鍔存俊顖楀亾闂?*/
app/globals.css:1079:  line-height: 1.08; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼幏灞界劷闁逞屽墮閸燁垰顕ラ崟顖氱疀妞ゆ帒鍋婄槐闈涒攽閻樺灚鏆╁┑顔炬暬瀹曟瑨銇愰幒鎴炵€柣搴秵閸犳鎮¤箛娑氬彄闁搞儜灞藉壈闂侀€炲苯澧繛鑼枎閻ｅ嘲顫滈埀顒勫春閳ь剚銇勯幒鎴濐仾闁抽攱鍨块弻鐔兼嚃閳轰椒绮堕梺鍛婃⒐閹告娊寮诲☉銏犵闁告洦鍘鹃弳銈夋倵濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏ｉ柛婵囶殕缁绘繈鎮介棃娑楁勃闂佹悶鍔岄悥濂稿灳閿曞倸鐐婃い鎺嶇閳ь剙娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:1083:  max-width: 1160px; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾剧粯绻涢幋鏃€鍤嶉柛銉墮缁狙勪繆椤愶附娑ч柟纰卞亰閸╃偤骞嬮悩顐壕闁挎繂鎳愭禒娑㈡煛閸滀椒閭慨濠冩そ濡啫鈽夊杈╂澖闂備胶顭堥敃銉ッ洪悢椋庢殾婵せ鍋撻柛鈹惧亾濡炪倖甯掔€氼參鍩涢幋锔界厵闁兼祴鏅涙禒婊堟煕閺冣偓閹告娊寮诲☉銏犵闁告洦鍘鹃弳銈夋倵濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏嶉柛瀣崌閹粙鎮介崹顐础婵＄偑鍊栭幐楣冨磻閻愬搫闂柣鎴炃滄禍婊堟煏婢跺牆鍔存俊顖楀亾闂?*/
app/globals.css:1085:  line-height: 1.08; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾剧粯绻涢幋鏃€鍤嶉柛銉墮缁狙勪繆椤愶附娑ч柟纰卞亰閸╃偤骞嬮悩顐壕闁挎繂鎳愭禒娑㈡煛閸滀椒閭慨濠冩そ濡啫鈽夊杈╂澖闂備胶顭堥敃銉ッ洪悢椋庢殾婵せ鍋撻柛鈹惧亾濡炪倖甯掔€氼參鍩涢幋锔界厵闁兼祴鏅涙禒婊堟煕閺冣偓閹告娊寮诲☉銏犵闁告洦鍘鹃弳銈夋倵濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏ｉ柛婵囶殕缁绘繈鎮介棃娑楁勃闂佹悶鍔岄悥濂稿灳閿曞倸鐐婃い鎺嶇閳ь剙娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:1089:  max-width: 1120px; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾捐鎱ㄥ┑鍡氬妞ゃ倕鍊垮缁樻媴閸涘﹥鍎撻梺纭呮珪閸旀瑥鐣烽幋锕€围濠㈣泛鐗冮崑鎾存媴閸撳弶鍍甸柣鐘烘〃鐠€锕€顭囨繝鍥ㄢ拺闂傚牊绋撴晶鏇㈡煙閸愭煡鍙勭€规洦鍓熸俊鎼佸煛閸屾瀚奸梻浣侯攰閸嬫劙宕戝☉銏犵闁圭虎鍠楅悡鏇㈡煙閸喖顏柣锝囨暩閳ь剚顔栭崰妤佺箾婵犲洢鈧礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏嶉柛瀣崌閹粙鎮介崹顐础婵＄偑鍊栭幐楣冨磻閻愬搫闂柣鎴炃滄禍婊堟煏婢跺牆鍔存俊顖楀亾闂?*/
app/globals.css:1091:  line-height: 1.12; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾捐鎱ㄥ┑鍡氬妞ゃ倕鍊垮缁樻媴閸涘﹥鍎撻梺纭呮珪閸旀瑥鐣烽幋锕€围濠㈣泛鐗冮崑鎾存媴閸撳弶鍍甸柣鐘烘〃鐠€锕€顭囨繝鍥ㄢ拺闂傚牊绋撴晶鏇㈡煙閸愭煡鍙勭€规洦鍓熸俊鎼佸煛閸屾瀚奸梻浣侯攰閸嬫劙宕戝☉銏犵闁圭虎鍠楅悡鏇㈡煙閸喖顏柣锝囨暩閳ь剚顔栭崰妤佺箾婵犲洢鈧礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏ｉ柛婵囶殕缁绘繈鎮介棃娑楁勃闂佹悶鍔岄悥濂稿灳閿曞倸鐐婃い鎺嶇閳ь剙娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:1095:  max-width: 1120px; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜滃洿闂佹悶鍎荤徊鑺ョ閻愵剚鍙忔俊顖滃帶鐢爼鏌ｈ箛銉╂闁靛洤瀚版慨鈧柍銉ュ暱閹藉灚绻濆▓鍨灀闁稿鎹囧娲濞戞艾顣洪梺鐟板暱闁帮絽鐣烽鍕╅柍鍝勫€甸幏娲⒑绾懎浜归柛瀣洴瀹曟繈骞橀鐣屽幈闂佺懓鐏濈€氼噣鎮鹃悽纰樺亾濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏嶉柛瀣崌閹粙鎮介崹顐础婵＄偑鍊栭幐楣冨磻閻愬搫闂柣鎴炃滄禍婊堟煏婢跺牆鍔存俊顖楀亾闂?*/
app/globals.css:1097:  line-height: 1.04; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜滃洿闂佹悶鍎荤徊鑺ョ閻愵剚鍙忔俊顖滃帶鐢爼鏌ｈ箛銉╂闁靛洤瀚版慨鈧柍銉ュ暱閹藉灚绻濆▓鍨灀闁稿鎹囧娲濞戞艾顣洪梺鐟板暱闁帮絽鐣烽鍕╅柍鍝勫€甸幏娲⒑绾懎浜归柛瀣洴瀹曟繈骞橀鐣屽幈闂佺懓鐏濈€氼噣鎮鹃悽纰樺亾濞堝灝鏋熷┑鐐诧躬閵嗕礁鈽夐姀鈥斥偓鐑芥煛婢跺鐏ｉ柛婵囶殕缁绘繈鎮介棃娑楁勃闂佹悶鍔岄悥濂稿灳閿曞倸鐐婃い鎺嶇閳ь剙娼￠弻鐔兼⒒鐎电濡介梺?*/
app/globals.css:1101:  max-width: 980px; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姴缍婇弻宥夊传閸曨剙娅ｉ梺绋胯閸斿矂婀侀梺缁樏Ο濠囧磿韫囨稒鐓曢柟瀵稿Т閳诲牓鏌＄仦鍓ф创妤犵偛娲Λ鍐ㄢ槈濞嗘垳閭紓鍌氬€风拋鏌ュ磻閹剧粯鐓曟い鎰╁€曢弸鍌毭瑰鍕煉闁哄备鈧剚鍚嬮柛鎰╁妼椤姊洪棃娑欘棡閻㈩垽绻濆璇测槈閵忕姈鈺冩喐瀹ュ洦鏆滈柛顐ｆ礃閹虫岸鏌ｉ幇顔煎妺闁绘挾鍠愭穱濠囧Χ閸屾矮澹曢梻浣虹帛閹尖晠宕戞繝鍥モ偓渚€寮崼婵嬪敹濡炪倖鍔х徊鎯р枍閹剧粯鈷掑ù锝呮啞閹牓鏌涢悢鍝勨枅鐎规洘鍨块獮妯肩磼濡厧骞?*/
app/globals.css:1103:  line-height: 1.2; /* 濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姴缍婇弻宥夊传閸曨剙娅ｉ梺绋胯閸斿矂婀侀梺缁樏Ο濠囧磿韫囨稒鐓曢柟瀵稿Т閳诲牓鏌＄仦鍓ф创妤犵偛娲Λ鍐ㄢ槈濞嗘垳閭紓鍌氬€风拋鏌ュ磻閹剧粯鐓曟い鎰╁€曢弸鍌毭瑰鍕煉闁哄备鈧剚鍚嬮柛鎰╁妼椤姊洪棃娑欘棡閻㈩垽绻濆璇测槈閵忕姈鈺冩喐瀹ュ洦鏆滈柛顐ｆ礃閹虫岸鏌ｉ幇顔煎妺闁绘挾鍠愭穱濠囧Χ閸屾矮澹曢梻浣虹帛椤ㄥ棛鍒掗幘璇茬畺闁绘劗鍎ら崐閿嬨亜閹存繂缍栫紒銊ヮ煼濮婃椽妫冨☉姘辩暰闂侀€炲苯澧痪缁㈠幗缁傛帞绮欏▎鐐瘜?*/
app/globals.css:1107:  max-width: 1080px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閳ь剦鍙忕紞渚€鐛幒妤€绠婚柛娆愵焽閻帡姊绘担鍝ョШ婵☆偉娉曠划鍫熺瑹閳ь剙鐣峰▎鎾村亹缂備焦顭囬崢閬嶆⒑闁稑宓嗘繛浣冲洤鍑犳繛鎴炴皑绾惧ジ鏌嶈閸撶喎鐣锋總鍛婂亜缂傚牏濮烽惄搴ㄦ⒒娴ｅ憡鎯堢紒澶嬬叀瀹曟繃鎯旈妸銉庛儵鏌熼悜姗嗘畷闁绘挻娲熼弻鏇熺箾瑜嶉崯顐ｇ濮椻偓閺屟囨嚒閵堝懍妲愰梺鍝勭焿缁插€熺亙闂侀€炲苯澧撮柟顕嗙節椤㈡洟鏁傜紒妯绘珕闂備礁澹婇崑鎺楀磻閸涙潙鐤鹃柍鍝勬噺閳锋垿鏌涘┑鍡楊仼闁哄棗锕弻娑氣偓锝庡亝瀹曞矂鏌?*/
app/globals.css:1109:  line-height: 1.5; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閳ь剦鍙忕紞渚€鐛幒妤€绠婚柛娆愵焽閻帡姊绘担鍝ョШ婵☆偉娉曠划鍫熺瑹閳ь剙鐣峰▎鎾村亹缂備焦顭囬崢閬嶆⒑闁稑宓嗘繛浣冲洤鍑犳繛鎴炴皑绾惧ジ鏌嶈閸撶喎鐣锋總鍛婂亜缂傚牏濮烽惄搴ㄦ⒒娴ｅ憡鎯堢紒澶嬬叀瀹曟繃鎯旈妸銉庛儵鏌熼悜姗嗘畷闁绘挻娲熼弻鏇熺箾瑜嶉崯顐ｇ濮椻偓閺屟囨嚒閵堝懍妲愰梺鍝勭焿缁插€熺亙闂侀€炲苯澧撮柟顔ㄥ喚鐓ラ柛顐ゅ枎閳ь剙娼￠弻锝夊箛闂堟稑骞嶆繛瀛樼矋缁捇寮婚弴锛勭杸濠电偞鍎虫禍鍓р偓瑙勬礀濞诧絽顩奸幘缈犵箚?*/
app/globals.css:1114:  max-width: 1160px; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼幏灞界劷闁逞屽墮閸燁垰顕ラ崟顖氱疀妞ゆ帒鍋婄槐闈涒攽閻樺灚鏆╁┑顔炬暬瀹曟瑨銇愰幒鎴炵€柣搴秵閸犳鎮¤箛娑氬彄闁搞儜灞藉壈闂侀€炲苯澧繛鍙夌墵閳ユ棃宕橀埡鍐炬祫闁诲函缍嗛崑鍕焵椤掆偓閻栧ジ寮婚敐澶婄疀妞ゆ挾鍋熺粊鐑芥⒑閹惰姤鏁辨俊顐㈠暣瀵寮撮姀鐘茶€垮┑掳鍊曢鍫ュ触椤愶附鈷戦悹鍥ｂ偓铏亪缂傚倸绉撮敃銈夋偩閻戣棄绀堝ù锝囨嚀绾绢垶姊洪崨濠勭畵閻庢凹鍣ｉ、娆撳箛椤戣姤鏂€闂佺粯锕╅崰鏍倶椤曗偓閺岀喖鎼归锝呯闁绘挶鍊栭妵鍕箻鐠哄搫澹夐梺鎼炲€栧ú鏍箒闂佺粯锚濡﹪宕曡箛娑欑厽闁归偊鍓ㄩ弨濠氭煏閸パ冾伃妤犵偞甯￠獮瀣敇閻旀籂鍐ｆ斀妞ゆ洖妫涢崚浼存煟椤撶偛鈧灝顕ｆ繝姘櫜闁糕剝锚閸斿懘姊洪幐搴ｇ畵閻庢稈鏅犲顐︻敍濮橈絾鏂€闂佸疇妫勫Λ妤佺濠婂牊鍊垫慨妯煎帶濞呭秹鏌涢埞鎯т壕?*/
app/globals.css:1116:  line-height: 1.5; /* 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾缁愭鏌熼幏灞界劷闁逞屽墮閸燁垰顕ラ崟顖氱疀妞ゆ帒鍋婄槐闈涒攽閻樺灚鏆╁┑顔炬暬瀹曟瑨銇愰幒鎴炵€柣搴秵閸犳鎮¤箛娑氬彄闁搞儜灞藉壈闂侀€炲苯澧繛鍙夌墵閳ユ棃宕橀埡鍐炬祫闁诲函缍嗛崑鍕焵椤掆偓閻栧ジ寮婚敐澶婄疀妞ゆ挾鍋熺粊鐑芥⒑閹惰姤鏁辨俊顐㈠暣瀵寮撮姀鐘茶€垮┑掳鍊曢鍫ュ触椤愶附鈷戦悹鍥ｂ偓铏亪缂傚倸绉撮敃銈夋偩閻戣棄绀堝ù锝囨嚀绾绢垶姊洪崨濠勭畵閻庢凹鍣ｉ、娆撳箛椤戣姤鏂€闂佺粯锕╅崰鏍倶椤曗偓閺岀喖鎼归锝呯闁绘挶鍊栭妵鍕箻鐠哄搫澹夐梺鎼炲€栧ú鏍箒闂佺粯锚濡﹪宕曡箛娑欑厽闁归偊鍓ㄩ弨濠氭煏閸パ冾伃妤犵偞甯￠獮瀣敇閻旀籂鍐ｆ斀妞ゆ洖妫涢崚浼存煟椤撶偛鈧灝顕ｆ繝姘櫜濠㈣泛顑呴埀顒傚厴閹鎮介悽鐐光偓濠冧繆閹绘帞澧︽慨濠傛惈鐓ら悹鍥ㄥ絻缁犲綊姊虹粙鍖″伐婵炵》绻濋悰?*/
app/globals.css:1120:  max-width: 1040px; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾捐鎱ㄥ┑鍡氬妞ゃ倕鍊垮缁樻媴閸涘﹥鍎撻梺纭呮珪閸旀瑥鐣烽幋锕€围濠㈣泛鐗冮崑鎾存媴閸撳弶鍍甸柣鐘烘〃鐠€锕€顭囨繝鍥ㄢ拺闂傚牊绋撴晶鏇㈡煙閾忣偄濮嶉挊婵囥亜閹捐泛鍓辨繛鎾愁煼閺屾洟宕煎┑鍥舵￥婵犫拃灞藉缂佽鲸甯為埀顒婄秵閸嬪懎鐣峰畝鈧埀顒冾潐濞叉牜绱炴繝鍥х畺闁跨喓濮峰畵浣广亜閹哄秷鍏屾繛鍙夋尦閺岀喖顢欓妸銉︽悙闁哄嫨鍎查妵鍕箛闂堟稐绨甸梻渚囧弾閸ㄩ亶濡甸崟顖氼潊闁挎稑瀚崳浼存倵濞堝灝娅橀柛锝忕秮瀹曟椽鍩€椤掍降浜滈柟鐑樺灥椤忊晝绱?*/
app/globals.css:1122:  line-height: 1.55; /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾归柟闂寸绾捐鎱ㄥ┑鍡氬妞ゃ倕鍊垮缁樻媴閸涘﹥鍎撻梺纭呮珪閸旀瑥鐣烽幋锕€围濠㈣泛鐗冮崑鎾存媴閸撳弶鍍甸柣鐘烘〃鐠€锕€顭囨繝鍥ㄢ拺闂傚牊绋撴晶鏇㈡煙閾忣偄濮嶉挊婵囥亜閹捐泛鍓辨繛鎾愁煼閺屾洟宕煎┑鍥舵￥婵犫拃灞藉缂佽鲸甯為埀顒婄秵閸嬪懎鐣峰畝鈧埀顒冾潐濞叉牜绱炴繝鍥х畺闁跨喓濮峰畵浣广亜閹哄秷鍏屾繛鍙夋尦閺岀喖顢欓妸銉︽悙闂佸崬娲﹂妵鍕箛閳轰讲鍋撻弴鐔稿弿闁稿繘妫跨换鍡涙煟閹板吀绨婚柍褜鍓氶崹鍨暦閻熸噴娲敂閸曨偆鈧參姊洪崜鎻掍簼婵炴彃绻橀崺鈧?*/
app/globals.css:1126:  max-width: 1120px; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜滃洿闂佹悶鍎荤徊鑺ョ閻愵剚鍙忔俊顖滃帶鐢爼鏌ｈ箛銉╂闁靛洤瀚版慨鈧柍銉ュ暱閹藉灚绻濆▓鍨灀闁稿鎹囧娲濞戞艾顣洪梺纭呮珪閸旀瑨妫熷銈嗘尵閸庢劕銆掓繝姘厪闁割偅绻冮ˉ鐘差熆瑜滈崜娑氭閹烘柡鍋撻敐搴′簼鐎规洖鐬奸埀顒冾潐濞叉牜绱炴繝鍥х畺闁跨喓濮峰畵浣广亜閹哄秷鍏屾繛鍙夋尦閺岀喖顢欓妸銉︽悙闁哄嫨鍎查妵鍕箛闂堟稐绨甸梻渚囧弾閸ㄩ亶濡甸崟顖氼潊闁挎稑瀚崳浼存倵濞堝灝娅橀柛锝忕秮瀹曟椽鍩€椤掍降浜滈柟鐑樺灥椤忊晝绱?*/
app/globals.css:1128:  line-height: 1.45; /* 濠电姷鏁告慨鐑藉极閹间礁纾块柟瀵稿Т缁躲倝鏌﹀Ο渚＆婵炲樊浜滃洿闂佹悶鍎荤徊鑺ョ閻愵剚鍙忔俊顖滃帶鐢爼鏌ｈ箛銉╂闁靛洤瀚版慨鈧柍銉ュ暱閹藉灚绻濆▓鍨灀闁稿鎹囧娲濞戞艾顣洪梺纭呮珪閸旀瑨妫熷銈嗘尵閸庢劕銆掓繝姘厪闁割偅绻冮ˉ鐘差熆瑜滈崜娑氭閹烘柡鍋撻敐搴′簼鐎规洖鐬奸埀顒冾潐濞叉牜绱炴繝鍥х畺闁跨喓濮峰畵浣广亜閹哄秷鍏屾繛鍙夋尦閺岀喖顢欓妸銉︽悙闂佸崬娲﹂妵鍕箛閳轰讲鍋撻弴鐔稿弿闁稿繘妫跨换鍡涙煟閹板吀绨婚柍褜鍓氶崹鍨暦閻熸噴娲敂閸曨偆鈧參姊洪崜鎻掍簼婵炴彃绻橀崺鈧?*/
app/globals.css:1184:    height: 90px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓?Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柛娆忣槹閸欏繑淇婇悙棰濆殭濞存粓绠栧铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
app/globals.css:1189:    height: 54px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓?Logo 濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滈箖鏌￠崶銉ョ仼缁炬儳婀遍幉鎼佹偋閸繄鐟查梺鍝勬媼娴滎亜顫?*/
app/globals.css:1203:    height: 48px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴烆焽閺嗗棝鏌嶈閸撶喎鐣烽幋婵冩婵ê褰夌粭澶愭煟閻斿摜鎳冮悗姘煎枤瀵囧焵椤掍胶绡€闁汇垽娼у瓭闂佺锕ょ紞濠傜暦鐎圭姰浜归柟鐑樻尵閸橀亶鏌ｆ惔顖滅У濞存粎鍋為弲銉╂⒒娴ｅ憡鎯堝璺烘喘閸┾偓妞ゆ帊绀佹晶顖炴煕濮橆剦鍎旈柡灞剧☉閳藉宕￠悙鍏稿寲婵＄偑鍊栧鍦暜閳ユ剚娼栭柧蹇撴贡绾惧吋淇婇婵嗕汗妞ゆ挸銈稿娲传閵夈儛锝嗐亜閵娿儻韬柣?*/
app/globals.css:1209:    height: 48px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炵煯濞岊亪鏌涢幘妤€鎳愰崢鎴︽⒑鐠囨彃顒㈢痪鏉跨Ф閸犲﹤顓兼径濞箓鏌涢弴銊ョ仩缂佺姷绮妵鍕冀閵娿倗绻侀梺閫炲苯澧俊顐ｇ箞瀵鏁嶉崟銊ヤ壕闁挎繂绨肩花濂告煕閵堝懏鍠橀柡灞糕偓宕囨殕闁逞屽墴瀹曚即骞樼捄鍝勭亰濠电偛妫楃换鍡涘几鎼淬劍鐓熼柟浼存涧閸樻挳鏌＄€ｎ亝鍤囨慨濠勭帛閹峰懐绮电€ｎ偆绉烽梻浣哄劦閸撴繂煤閺嶎厼鐓濈€广儱顦崡铏亜椤愵偄鍘撮柛瀣崌瀹曟﹢顢欓懖鈺佲偓鐐差渻閵堝骸澧婚柛鎾寸洴瀹曚即寮借閺嗭附銇勯幇鍓佺暠缂佲偓鐎ｎ喗鈷掗柛顐ゅ枔閳洟鏌?*/
app/globals.css:1210:    padding: 0 18px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炵煯濞岊亪鏌涢幘妤€鎳愰崢鎴︽⒑鐠囨彃顒㈢痪鏉跨Ф閸犲﹤顓兼径濞箓鏌涢弴銊ョ仩缂佺姷绮妵鍕冀閵娿倗绻侀梺閫炲苯澧俊顐ｇ箞瀵鏁嶉崟銊ヤ壕闁挎繂绨肩花濂告煕閵堝懏鍠橀柡灞糕偓宕囨殕闁逞屽墴瀹曚即骞樼捄鍝勭亰濠电偛妫楃换鍡涘几鎼淬劍鐓熼柟浼存涧閸樻挳鏌＄€ｎ亝鍤囨慨濠勭帛閹峰懘鎮滃Ο鐑樼暚闂備浇顫夌粊鎾礈濠靛牊宕叉繛鎴炵懅缁♀偓闂佺鏈划宥呪枔閹€鏀芥い鏂款潟娴犳粓鏌涚€ｎ偅灏甸柍褜鍓濋～澶娒鸿箛娑樼闁硅揪濡囧畵浣衡偓骞垮劚椤︿粙寮繝鍥ㄧ厵妞ゆ牕妫楀ú銊ョ暦閺囥垺鈷?*/
app/globals.css:1216:    max-width: 116px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炵煯濞岊亪鏌涢幘妤€鎳愮粣妤€鈹戦悙鑼憼缂侇喖鐬肩槐鐐寸節閸パ嗘憰闂佺粯姊婚崢褏绮诲杈ㄥ枑鐎广儱顦Ч鏌ュ级閸稑濡稿ù婊勭矒閺屾洟宕煎┑鍥ф闂佹悶鍊曞ú顓㈠蓟閻旂⒈鏁婇柤娴嬫櫇妤旈柣搴ゎ潐濞叉牗鏅舵惔銊ョ闁告洦鍨版导鐘绘煕閺囥劌骞栭柟钘夘儔濮婂宕掑▎鎴М闂佹眹鍊曞ú顓€佸鎰佹▌闂佽鍟崶褏顔掗梺褰掝暒缁€浣糕枔閵娿儺娓婚柕鍫濇缁楁帡鎮楀鐓庡⒋闁诡喗鐟︾换婵嬪礋椤掆偓閺嬫垿妫呴銏″缂佸鍨圭划璇裁洪鍛幗闂佸搫鍊搁悘婵嬪箖閹达附鐓曞┑鐘插閺嗏晠鏌ｉ妷顔婚偗妞ゃ垺锕㈤幃娆撳级閹寸儐浠┑锛勫亼閸婃垿宕曢柆宓ュ洭鎮界粙璺ㄧ暫?*/
app/globals.css:1225:    max-width: 1360px; /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴烆焽閺嗗棝鏌嶈閸撶喎鐣烽幋婵冩婵﹫绲芥禍鐐叏濮楀棗澧绘俊顖楀亾闂備礁鎼懟顖滅矓閻戦摪銊︾瑹閳ь剟寮诲☉銏犵缁炬儳顑呴ˉ婵嗩渻閵堝棙纾搁柛搴ㄦ涧閻ｇ兘鎮㈢喊杈ㄦ櫔闂佸憡渚楅崯鈺呭煛閸屾瑧绠氶梺缁樺姦娴滄粓鍩€椤掍胶澧い顐㈢箻閹兘鏌囬敂鐣岀▉闁荤喐绮庢晶妤冩暜閹烘梻涓嶆慨妯垮煐閻撴盯鏌涢幇鈺佸濠⒀勭洴閺岋繝宕ㄩ鍓х厜闂佽鍠栫紞濠囩嵁娓氣偓楠炴帡骞嬪┑鎰偓鐑芥⒒?Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柡灞诲劜閻撴瑩鏌ｅΔ鈧悧濠勬閺屻儲鐓犵紒瀣硶缁夋椽鏌熼绛嬫疁闁诡喕绮欓幃浠嬫倷閸忓浜惧┑鐘叉处閻撴洟鎮楅敐搴′簼鐎规洖鐬奸埀顒冾潐濞叉粓宕楀鈧妴浣割潨閳ь剟骞冮姀銈嗙叆閻庯綆鍓氬▓顕€姊婚崒娆愮グ妞ゆ泦鍛床闁归偊鍎悷閭︽僵閻犲搫鎼悗顓㈡煛婢跺﹦澧愰柡鍛箞閹苯鈻庤箛锝囧數闂佸吋鎮傚褎鎱ㄩ崶顒佺厽闁圭儤鍨规禒娑㈡煏閸パ冾伃妤犵偞甯￠獮瀣攽閹邦亞妫梻?*/
app/globals.css:1230:    min-height: min(800px, calc(100vh - 112px)); /* 2K 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炵煯濞岊亪鏌涢幘妞捐閸嬫捇骞掑Δ浣哄帗缂傚倷鐒﹁摫妞ゃ儱鐗撻弻鐔碱敊缁涘鐤侀梺杞扮劍閸旀牠骞嗛弮鍫濈伋闁肩⒈鍓涘▔鍨攽閿涘嫬浜奸柛濠冩礈閳ь剚绋堥弲鐘诲箖閻戣棄鐓涘〒姘处缂嶅孩绻濋悽闈浶ｉ柤褰掔畺閺屽宕堕妸褏顔曢梺鐟邦嚟閸庢劙鎮為挊澹濆綊鎮╅崘鎻掑Б闂佸疇顫夐崹鍧楀箖閳哄拋鏁婇柤娴嬫櫃閻ヮ亪姊绘担鐟邦嚋婵炴彃绻樺畷纭呫亹閹烘繃鏅梺鎸庣箓椤︻垳绮荤紒妯镐簻闁哄啫娲ゆ禍瑙勩亜閺冣偓鐢帡鈥旈崘顔嘉ч柛鈩兦氶幏褰掓⒑缁嬪灝顒㈠┑鐐诧躬楠炲繗绠涢弴妤€浜鹃柨婵嗛娴滅偟绱掗悩鑽ょ暫鐎殿喖鐖煎畷鐓庘攽閸″繑瀵栭梻浣告啞鐢偞鏅跺Δ浣衡攳濠电姴娴傞弫鍐煥濠靛棙顥戦柟鐤吹缁辨挻绗熼崶褎鐝梺鍛婎焾濡嫰顢氶妷鈺佺妞ゆ帒鍊婚鏇㈡⒑缂佹ê濮﹂柛鎾村哺瀵櫕绻濋崶銊㈡嫽婵炴挻鍩冮崑鎾寸箾娴ｅ啿鎳忓畷鏌ユ煙閻戞ɑ灏伴柛娆忕箻閺屸剝寰勭€ｎ亝鐦?*/
app/globals.css:1253:@media (min-width: 1281px) and (max-width: 1920px) {
app/globals.css:1256:    max-width: 1160px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠圭紒顔煎帨閸嬫捇鎳犻鈧崵顒佺節閻㈤潧浠滄い鏇ㄥ幗閹便劑鎮介崨濠冩珨濠碉紕鍋戦崐銈夊储閻撳寒鐒介柍銉ョ－閺嗭箑鈹戦崒婊庣劸妤犵偑鍨烘穱濠囧Χ閸屾矮澹曢梻浣告惈椤戝啴宕愬┑瀣摕婵炴垯鍨洪崑鍕渻鐎ｎ亜鐝愮憸搴ㄣ€冮妷鈺傚€烽悗鐢殿焾椤冣攽閻愰潧甯剁紒缁樏悾宄邦煥閸♀晜鞋缂傚倷鐒﹂崝鏍€冮崼銏☆潟闁规儳鐡ㄦ刊鎾偣閸ワ絽澧查柣锝呯埣濮婃椽宕崟顓炩拡闂佸憡鎸鹃崰鎰┍婵犲洦鍋ㄧ紒瀣硶椤︽澘顪冮妶鍡欏鐎光偓閹间礁鑸归柛顐ｆ礃閳锋垿鏌涘┑鍡楊仾鐎瑰憡绻堥弻娑氣偓锝庡亞閳洟鏌熸笟鍨濠德ゅ煐瀵板嫮鈧急鍕伖闂傚倷绀侀幉锛勭矙閹达附鏅濋柕鍫濇閸欏繘鏌涢妷顔煎闁绘挻鐟╅弻娑㈠箛椤撶姴寮ㄩ梺鍛婄懃鐎氼參濡甸崟顖氼潊闁挎稑瀚崳鏉课旈悩闈涗粶婵炲樊鍘奸锝夊礈娴ｇ懓纾銈庡幗閸ㄨ埖顨欓梻鍌氬€风粈渚€骞栭位鍥焼瀹ュ懐锛涢梺缁樺姇椤曨參鎮甸崼鏇熺厱闁斥晛鍟╃欢閬嶆煛娴ｇ鈧灝顫忓ú顏嶆晢闁逞屽墰缁棃鎮介崨濠備簵?*/
app/globals.css:1261:    min-height: 420px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠圭紒顔煎帨閸嬫捇鎳犻鍌涙櫒濠电姷鏁搁崑娑㈩敋椤撶喐鍙忛柣銏犳啞閺呮繈鏌曡箛瀣偓鏇㈡嫅閻斿摜绠鹃柟瀛樼懃閻忊晝绱掗悩鍐测枙闁哄瞼鍠撻埀顒傛暩椤牆鐡梻浣虹帛閹搁箖宕版惔銊ョ厴闁硅揪闄勯崐鐑芥煟閹寸儑鍏紒杈╂暬濮婃椽宕ㄦ繝搴㈢暥闂佸摜鍠庡锟犮€佸鑸垫櫜濠㈣泛锕崬鍫曟⒑閸濆嫭宸濋柛瀣ㄥ€濆顐㈩煥閸愶絾鏂€闁圭儤濞婂畷鎰板即閵忕姷鏌堝銈嗗姧闂勫嫮鈧艾鍟撮幃妤呮晲鎼粹剝鐏嶉梺缁樻尰閻熲晠寮婚妶澶婃嵍妞ゆ挾鍎愰弳顓㈡偡濠婂嫬惟闁搞儯鍔屾禒顖涚箾閹剧澹橀柨鏇畵楠炲啴宕楅梻瀵哥畾闂佸憡鐟ラˇ顖涙叏閸ヮ剚鐓冮悷娆忓閻忓鈧娲栭妶鎼佸箖閵忋倖鐓ラ悗锝庡厴閸嬫捇顢橀姀鈾€鎷绘繛杈剧秬濞咃綁濡存繝鍥ㄧ厱闁规儳顕粻鐐碘偓瑙勬礃閻熲晠骞冮悜鑺ョ劷闁挎梹鍎虫慨娲⒒娴ｅ憡鎯堟繛灞傚灲瀹曠懓煤椤忓懎浜楀┑鐐村灟閸ㄦ椽鎮￠弴銏＄厪濠㈣埖绋撻崚鏉库攽閿涘嫭娅曠紒杈ㄦ尭椤撳ジ宕卞Δ鍐х礉闂備礁鎼張顒傜矙閹达絿浜介梻浣虹帛閹稿摜鑺遍崼鏇炲嚑闁告稑鐡ㄩ崐?*/
app/globals.css:1266:    padding: 12px 0; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠归悗娑欘焽缁犳﹢鏌ｉ埡渚€顎楅柍瑙勫灴閹瑩宕ｆ径濠冾仦闂備胶顭堥敃銉ф崲閸儳宓侀柛鎰╁壆閻旂儤宕夐柕濞у嫭绶梻鍌欑閹碱偊宕愰挊澶嗘灃闁哄洨鍠撻々鐑芥煙缂併垹鏋熼柍閿嬪灴閺岀喖鎳栭埡浣风捕婵犵鈧啿鎮戠紒缁樼〒閳ь剛鏁搁…鍫ュ储閹绢喗鐓欐い鏇炴噹濞呭秶鈧娲樼划蹇浰囩€靛摜妫柟顖嗗啯鍊繛锝呮搐閿曨亪銆佸☉姗嗙叆闁告劑鍔嬬划顖炴⒒娴ｈ櫣甯涢悽顖涱殘閳ь剛鐟抽崨顔煎簥濠电偞鍨崹鍦不閿濆鐓熼柟閭﹀幗缂嶆垹鐥弶璺ㄐф慨濠冩そ楠炴劖鎯旈姀鈶╂晬缂傚倷娴囩亸顏勨枖閺囥垹绀嗛柟鐑橆殢閺佸洭鏌曡箛鏇炐㈢紒鎰洴閺岋絾鎯旈姀鈶╁闂佹寧鑹鹃湁闁绘﹢娼х敮鍫曟煃鐟欏嫬鐏撮柟顔界懇瀹曪絾寰勫Ο浼欑磼闂傚倷鐒﹂幃鍫曞礉瀹€鍕亯濠靛倹鎮堕埀?*/
app/globals.css:1271:    min-height: 74px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠归悗娑欘焽缁犳﹢鏌ｉ埡渚€鍙勬慨濠呮閹风娀宕ｆ径濠冩暘闁诲氦顫夊ú婊堝极缁嬭锝夊箛閺夎法顔婂┑掳鍊曢敃銉╁疾濠靛鈷戦梻鍫熺〒缁犳岸鏌￠崨顔剧疄鐎规洏鍎抽埀顒婄秵閸犳鍩涢幋锔解拻闁割偆鍠撻埊鏇熴亜閵夛妇鐭岀紒杈ㄥ笚瀵板嫮浠﹂悙顒佺槗闂備線娼уΛ妤呭疮閺夋垹鏆﹂柛顐ｆ磵閳ь剚鐗犻、妤呭磼濮橆厾浜柣搴ゎ潐濞诧箓宕戞繝鍌滄殾闁绘柨鍚嬮ˉ鍫熺箾閹寸偟鎳勬慨锝呯焸濮婂宕掑顑藉亾妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠煕濮橆厽銇濆┑陇鍩栧鍕熺紒妯荤彣濠碉紕鍋戦崐鏍箰閸洖鍨傞柛锔诲幘娑撳秹鏌ｉ姀鐘冲暈闁绘挶鍎茬换婵嬫濞戞瑱绱炲┑鈩冨絻閹芥粎妲愰幒妤€鐒?*/
app/globals.css:1272:    padding: 14px 28px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠归悗娑欘焽缁犳﹢鏌ｉ埡渚€鍙勬慨濠呮閹风娀宕ｆ径濠冩暘闁诲氦顫夊ú婊堝极缁嬭锝夊箛閺夎法顔婂┑掳鍊曢敃銉╁疾濠靛鈷戦梻鍫熺〒缁犳岸鏌￠崨顔剧疄鐎规洏鍎抽埀顒婄秵閸犳鍩涢幋锔解拻闁割偆鍠撻埊鏇熴亜閵夛妇鐭岀紒杈ㄥ笚瀵板嫮浠﹂幆褎鐣梻浣风串缁蹭粙宕查弻銉稏婵犲﹤鐗嗛悞鍨亜閹哄棗浜鹃梺浼欑悼閸忔ɑ淇婇幖浣哥厸濞达絼璀﹂崥瀣繆閻愵亜鈧牕顫忚ぐ鎺戠？闁惧浚鍋掑▓浠嬫煕閺囥劌鐏￠柍閿嬪灴閺屻倖鎱ㄩ幇顑藉亾閺囩偞姣勯梻鍌欒兌椤牏鑺卞ú顏勭９婵°倕鎳庣粻鏌ユ煏韫囧鈧洜绮堥崘鈹夸簻闁哄倸鐏濋幃鎴︽煟鎼搭喖澧存慨濠冩そ濡啴鍩℃担鐑樞掗梻浣告啞鐪夌紒顔界懇閺?*/
app/globals.css:1291:    padding: 26px 48px 26px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠归悗娑欘焽缁犳﹢鏌ｉ埡浣规崳缂佽鲸鎸婚幏鍛村箵閹哄秴顥氭繝鐢靛仩閹活亞寰婃ィ鍐ㄧ畺闁割偅娲栭悞鍨亜閹哄秶顦︾紒妤佸笚閵囧嫰顢曢敐鍥╃杽闂佺硶鏂侀崑鎾愁渻閵堝棗绗掗悗姘煎墰缁牓宕橀鐣屽帾婵犵數濮寸换妯侯瀶椤旂晫绠鹃柛顐ｇ矌閻瑦鎱ㄦ繝鍛仩闁归濞€瀹曪絾寰勭€ｎ亪妫烽梻鍌欒兌椤㈠﹤鈻嶉弴銏犵闁归棿鐒﹂弲婵嬫煏韫囧鈧牠鎮為懖鈹惧亾楠炲灝鍔氶柟鍐茬箲濞煎繘宕奸妷锔规嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟缁㈠枟閻撴稓鈧厜鍋撻悗锝庡墰琚ｆ俊鐐€х粻鎺戔枖濞戙垹鐓橀柟杈惧瘜閺佸﹪鏌涘┑鍡楊仱闁稿鎹囧鎾偐閹绘帞鏌ч梻鍌氬€烽懗鍫曪綖鐎ｎ喖绀嬮柛顭戝亞閺嗐儳绱撻崒娆掝唹闁稿鎹囬弻娑樼暆閳ь剟宕戦悙鍝勭９闁汇垹鎲￠悡銉︾節闂堟稒顥犻柛鎴濇贡缁辨帡濡搁妷顔惧悑闂?*/
app/globals.css:1304:    max-width: 620px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠圭紒顔煎帨閸嬫捇鎳犻鍌涙櫒濠电姷鏁搁崑娑㈩敋椤撶喐鍙忛柣銏犳啞閺呮繈鏌曡箛瀣偓鏇㈡嫅閻斿摜绠鹃柟瀛樼懃閻忊晝绱掗悩鍐测枙闁哄瞼鍠栭獮鍡氼槻闁哄棗宕埞鎴︻敊缂併垻鍔稿銈庝簻閸熷瓨淇婇崼鏇炲耿婵☆垳銆嬬槐鈺呮⒒娴ｅ憡鎯堥柟铏姈閹便劑骞橀鍛櫔闂佹寧绻傞ˇ浼村磻鐎ｎ喗鐓曟い鎰╁€曢弸搴ㄦ煕閺傛寧鍤囨慨濠冩そ濡啫鈽夐姀銏犳そ缂傚倷娴囨ご绋棵洪悢鐓庢槬闁逞屽墯閵囧嫰骞掗幋顓熜﹀┑鐐叉噹缁夊綊寮婚悢纰辨晩缂佹稑顑嗛悾鍫曟⒑鐎圭姵顥夋い锔诲灦閸┿垺鎯旈埈銉у枛閹筹繝濡堕崱妯兼В濠电姷顣槐鏇㈠磻閹达箑纾归柟杈剧畱閸ㄥ倹绻涘顔荤盎闁搞劌鍊婚幉鎼佹偋閸繄鐟ㄩ梺?*/
app/globals.css:1314:    min-height: 180px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儲鐓曢悘鐐插⒔閳洟鏌ｅ┑鍥у摵婵﹨娅ｇ槐鎺懳熺亸鏍ь潓闂備礁婀遍幊鎾趁洪鐑嗗殨閻犲洦绁村Σ鍫熶繆椤栫偞鏁遍柡鍌楀亾闂傚倷绀侀幉鈩冪瑹濡ゅ懎鍨傞柟鎯板Г閸嬫﹢鏌曡箛瀣偓鏍煕閹达附鈷掗柛顐ゅ枔閳洘銇勯妷锔剧煂缂佽鲸甯楀鍕沪閻愵剚鐦撻梻渚€娼уΛ妤呭疮閺夋垹鏆﹂柛顐ｆ磵閳ь剚鐗犻、妤呭磼濮橆厾浜柣搴ゎ潐濞诧箓宕戞繝鍌滄殾闁绘柨鍚嬮ˉ鍫熺箾閹寸偟鎳勬慨锝呯焸濮婂宕掑顑藉亾瀹勬噴褰掑炊椤掆偓杩濋梺閫炲苯澧撮柡灞剧〒閳ь剨缍嗛崑鍛暦瀹€鍕厸閻忕偛澧藉ú瀛橆殽閻愯揪鑰块柟宕囧█椤㈡鍩€椤掍椒绻嗗ù鐘差儐閸?*/
app/globals.css:1319:    height: 124px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儲鐓曢悘鐐插⒔閳洟鏌ｅ┑鍥у摵婵﹨娅ｇ槐鎺懳熺亸鏍ь潓闂備礁婀遍幊鎾趁洪鐑嗗殨閻犲洦绁村Σ鍫熶繆椤栫偞鏁遍柡鍌楀亾闂傚倷绀侀幉鈩冪瑹濡ゅ懎鍨傞柣鎾冲閿濆鏁婇悘蹇旂墬閺傗偓闂備胶绮崝妯间焊濞嗘挸绠洪柣妯肩帛閻撱儵鏌￠崶顭嬵亪鎮橀埡鍌樹簻闁哄浂浜炵粙鑽ょ磼閸屾稑绗ч柍褜鍓ㄧ紞鍡樼閻愬搫纾归柣鎰▕濞撳鏌曢崼婵囶棞缂佹甯￠弻娑欑節閸愨晛鈧劙鏌熷畡鎵闁逞屽墾缂嶅棝宕板Δ鍛亗婵炲棙鎸婚悡鐘绘煕閿旇骞栨い锝堝亹閹叉悂骞庢繝鍌涘闁抽攱甯￠弻娑㈠即閵娿儰绨诲銈呮禋閸橀箖鍩€椤掍緡鍟忛柛锝庡櫍瀹曟垶绻濋崒婊勬闂佺粯鍨归悺鏃堝极閸ャ劎绡€闂傚牊绋撴晶鏇烆熆?*/
app/globals.css:1326:    height: 25px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠圭紒顔炬嚀婢ф煡鏌ｈ箛搴ｇ獢婵﹥妞介弻鍛存倷閼艰泛顏繝鈷€灞芥珝闁哄被鍔戝鎾Ω閵堝浠愰柣搴㈩問閸犳牠鈥﹀畡鎵殾濠靛倻顭堝敮闂侀潧顦花鍫曞疾閻樿钃熼柡鍥╁枔閻濊埖銇勯弽銊ㄥ妞ゅ浚鍋呮穱濠囧矗婢舵ɑ鐤佸┑顔硷工閹碱偅鏅ラ梺鎼炲劀閸涱厼肖闂傚倷绀佹竟濠囨偂閸儱鍨傞柟鎯版缁€鍡涙煙閻戞ê鐏嶉柡瀣叄閺岀喖鎮欓浣虹▏婵炲濮嶉崘鐐瘜闂侀潧鐗嗗Λ娆撍夐崱妞绘斀妞ゆ柨鎼埀顒佺箓閻ｇ兘寮撮姀鈥充簻闂佺绻楅崑鎰板矗閸℃稒鈷戦柛婵嗗閺嗘瑦绻涚仦鍌氣偓娑€傞崸妤佲拻濞达絽鎲￠幆鍫熶繆椤愵偄骞楃紒鍌氱Ч椤㈡棃宕煎┑鍫㈡毇?*/
app/globals.css:1333:    height: 40px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儱绠圭紒顔款潐椤庡棝鏌涚€ｎ偅灏甸柍褜鍓ㄧ紞鍡涘闯椤曗偓瀵偊宕堕浣哄帾闂婎偄娲﹀ú鏍€烽柣鐐寸缁诲牆顫忕紒妯诲闁绘垶锚濞堝苯顪冮妶鍡樺闁告鏅埀顒勬涧閵堟悂寮幇鏉垮耿婵炲棙鍨堕崵宀勬⒒娓氣偓閳ь剛鍋涢懟顖涙櫠椤曗偓閺岋綁鏁愭径妯活棖缂備緡鍠楅悷褔骞忛悩缁樺€锋い鎺嶇贰濡啴鎮楃憴鍕８闁告梹鍨块妴浣糕槈濮楀棙鍍甸梺鎯ф禋閸嬪嫰顢旈埡鍛拻闁稿本鐟ㄩ崗灞俱亜閵忕媴鏀荤紒鏃傚枛瀹曞ジ濡烽妷褜鍞芥俊鐐€曠换鎰版偋婵犲洤鐓曢柡鍐ㄧ墛閻撴洟鏌￠崶銉ュ闁诲繒濞€閺岋紕鈧絺鏅濈粣鏃堟煛鐏炲墽娲撮柡浣稿€婚幏鐘诲箵閹烘棏鍞洪梻?*/
app/globals.css:1342:    max-width: 250px; /* 1920 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偛顦甸弫鎾绘偐閸愯弓鐢婚梻渚€娼чˇ顐﹀疾濠婂牆鐤炬繝闈涱儐閻撱儲绻濋棃娑欘棡妞ゃ儳濮甸妵鍕煛閸屾粌寮ㄩ梺鍝勭灱閸犳牠骞冨鍏剧喓鎷犻崣澶嬵唫闂傚倷绀佺壕顓犲垝椤栨娑㈠礃椤旇偐鐣哄┑掳鍊曢幊蹇涘疾閺屻儲鐓曢悘鐐插⒔閳洟鏌ｅ┑鍥у摵婵﹨娅ｇ槐鎺懳熺亸鏍ь潓闂備礁婀遍幊鎾趁洪鐑嗗殨閻犲洦绁村Σ鍫熶繆椤栫偞鏁遍柡鍌楀亾闂傚倷绀侀幉鈩冪瑹濡ゅ懎绐楁慨妯挎硾鍥撮梺鍝勵槹椤戞瑥銆掓繝姘厪闁割偅绻冮ˉ鐐电棯閸撗勬毈闁哄矉绻濆畷銊╊敍濮ｈ￥鍨洪妵鍕即椤忓棛袦闂佽鍟崶褔鍞堕梺缁樻煥閸㈠弶淇婇幎鑺モ拻濞撴埃鍋撴繛浣冲洦鍋嬮柛鈩冪憿閸嬫挸鈽夐幒鎾寸彋閻庢鍣崜鐔煎春閳ь剚銇勯幒鎴濐仾闁抽攱鍨块幃褰掑炊瑜嶇痪褔鏌熼惂鍝ョɑ闁靛洤瀚版慨鈧柣娆忔噺閺侀箖姊洪柅娑氣敀闁告梹鍨舵穱濠囨嚋闂堟稓绐炴繝鐢靛Т閸熶即鍩€椤掑澧存慨濠冩そ濡啴鍩℃担鐑樞掗梻浣告啞鐪夌紒顔界懇閺?*/
app/globals.css:1370:@media (min-width: 1281px) and (max-width: 1440px) {
app/globals.css:1373:    max-width: 1120px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁告挆灞拘︽繝鐢靛仩閹活亞寰婇懞銉х彾濠电姴娲﹂崐鐢告煠閸濄儲鏆╃紒鐘插⒔閳ь剛鎳撴竟濠囧窗閺囩姾濮抽柤濮愬€楃壕濂告煃瑜滈崜鐔风暦閸楃偐妲堟繛鍡樺灥楠炴绱撻崒娆戭槮妞ゆ垵鐗嗛埢鏃堝即閻斾警娴勫┑鐐村灦閳笺倛銇愰幒鎾充汗闁烩剝甯婄欢鈩冪椤忓牆鐏抽柨鏇炲€搁柨銈嗕繆閵堝倸浜鹃梻浣稿船濞差參寮诲☉銏犵労闁告劗鍋撻悾鍫曟⒑閸濆嫷鍎嶉柛濠冪箞瀵鈽夐姀鈥充簻婵＄偛顑呭鈺勵槼妞?*/
app/globals.css:1378:    min-height: 420px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁告挆灞拘︽繝鐢靛仩閹活亞寰婇懞銉х彾濠电姴娲﹂崐鐢告煕椤愶絾绀冮柍閿嬪灴閺屾盯鈥﹂幋婵囩彯闂佺瀛╅崝鏇㈠煘閹达富鏁嶆繛鎴炵懃閸炲螖閻橀潧浠﹂柣妤佹礉瑜颁礁顪冮妶鍡楀潑闁稿鎸搁埞鎴︽濠殿喓鍊栫粚杈ㄧ節閸屻倖瀵岄梺缁樻尭妤犳悂锝為崶顒佲拺闁告繂瀚ˇ顒勬煕閹惧绠撴い鏇樺劦瀹曠喖顢楅崒婊呮闂備礁鎲￠崝鎴﹀礉鐎ｎ€﹀酣顢氶埀顒€顫忕紒妯诲闁惧繒鎳撶粭锛勭磽娴ｇ瓔鍤欑紒澶屾嚀閻ｇ兘寮剁拠鐐瀹曘劑顢橀悩鍨瘞?*/
app/globals.css:1382:    padding: 12px 0; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺妯衡攽閻愬樊鍤熷┑顔芥尦椤㈡牠宕ㄧ€涙ǚ鎷诲銈嗙墱閸嬬偤鎮￠敐澶屽彄闁搞儯鍔庨埢鎾绘煕鐎ｎ偅灏柍钘夘槸椤繈顢楅埀顒勫煕閺囥垺鈷掗柛灞剧懆閸忓矂鏌熼搹顐ｅ磳闁诡喗妞芥俊姝岊槼鐎规洘鐓￠弻娑樼暆閳ь剟宕戦悙鍝勭９闁汇垹鎲￠悡鐘测攽椤旇棄濮囬柍褜鍓氶〃鍫熺珶閺囥垹绀傜紒妤勬〃缁ㄥ姊虹憴鍕棎闁哄懏鐩崺鈧い鎺嶇贰濞堟﹢鏌℃笟鍥ф灈闁宠棄顦垫慨鈧柨娑樺楠炴姊绘担鍛婃儓缂佸娼ч…鍥р枎閹惧啿鍤戦梺缁樻濞咃絿澹曟總鍛婂€甸柨婵嗙凹閹茬偓淇婇幓鎺撹础缂佽鲸甯炵槐鎺懳熼懖鈺冩毇闂備胶鎳撻崲鏌ュ箠濮椻偓楠炴牠宕烽鐔锋瀭闂佸憡娲﹂崑鍛枔婵犳碍鈷掗柛灞捐壘閳ь剙鍢查—鍐箳閺冣偓椤洘銇勯弮鈧崕宕囨閵堝憘鏃堟晲閸涱厽娈查梺绋款儜缁辨洟骞夌粙娆惧悑濠㈣泛锕﹂崢?*/
app/globals.css:1387:    min-height: 68px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺妯衡攽閻愬樊鍤熷┑顔芥尦椤㈡牠宕ㄩ弶鎴濈€梺绋跨灱閸嬫稓绮昏ぐ鎺戠骇闁割偅绻傞埛鏃堟煙椤旂鍋㈤柟顔筋焾缁犳稑鈽夊▎鎰版暘闂備礁鐤囬～澶愬垂閸ф绠栭柍鍝勬噹缁€鍐煕濞嗗浚妲归柛骞洦鈷掑〒姘ｅ亾闁逞屽墰閸嬫盯鎳熼娑欐珷妞ゆ柨澧界壕鐓庮熆鐠虹儤婀伴柡鍡╁墴閺屾洟宕卞Δ鈧弳锝団偓瑙勬礀閻栧ジ鍨鹃弽顓ф晢闁稿本纰嶉悘鍫ユ倵鐟欏嫭澶勯柛瀣工閻ｇ兘鎮㈤崗纰辨濠电偞鍨堕悷锕€袙瀹€鍕拻闁稿本鑹鹃埀顒勵棑缁牊绗熼埀顒勭嵁閺嶎収鏁冮柍閿嬬濡炰粙寮崘顔肩＜婵﹢纭搁崬鍫曟⒒娴ｇ瓔娼愰柛搴ｅ帶铻為柛鏇ㄥ灡閸婂潡鏌涢…鎴濅簴濞存粍绮撻弻鐔煎传閸曨剦妫炴繛瀛樼矒缁犳牕顫忛搹鍦煓闁告牑鍓濋弫楣冩⒑鐠団€虫灈闁稿﹤娼￠幃浼搭敋閳ь剙鐣峰鈧崺锟犲磼濮橆剙韦闂傚倷绶氬褏鎹㈤崱娑樼疇闁搞儺鍓欓崙鐘绘煛瀹擃喖鏈€靛矂姊洪棃娑氬婵☆偅鐟ф禍鎼佹偨閸涘﹦鍘遍柣搴秵閸撴瑩寮告惔顫簻?*/
app/globals.css:1388:    padding: 12px 22px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺妯衡攽閻愬樊鍤熷┑顔芥尦椤㈡牠宕ㄩ弶鎴濈€梺绋跨灱閸嬫稓绮昏ぐ鎺戠骇闁割偅绻傞埛鏃堟煙椤旂鍋㈤柟顔筋焾缁犳稑鈽夊▎鎰版暘闂備礁鐤囬～澶愬垂閸ф绠栭柍鍝勬噹缁€鍐煕濞嗗浚妲归柛骞洦鈷掑〒姘ｅ亾闁逞屽墰閸嬫盯鎳熼娑欐珷妞ゆ柨澧界壕鐓庮熆鐠虹儤婀伴柛銈傚亾闂備椒绱徊浠嬪床閺屻儻缍栨繝濠傜墕閻掑灚銇勯幒鍡椾壕闂佷紮绲块崗妯讳繆閹间礁鐓涘ù锝勮閸氬淇婇悙顏勨偓鏍ь潖瑜版帒纾块柧蹇ｅ亽濞堜粙鏌涢弴銊ョ仭闁抽攱鍨块弻銈嗘叏閹邦兘鍋撻弴鐐存瘎闂傚倷鑳堕…鍫㈣姳濞差亜纾规俊銈呮噹缁犳煡鏌曡箛瀣偓鏇犲婵傚憡鐓熼柟閭﹀灠閻ㄦ椽鏌＄仦鐣屽ⅵ婵﹥妞介弻鍛存倷閼艰泛顏繝鈷€鍕唉闁哄备鈧磭鏆嗛悗锝庡墰閻﹀牓姊虹化鏇熸澒闁稿鎸搁—鍐Χ閸℃鐟ㄩ柣搴㈠嚬閸撴稓鍒掗崼銉ラ唶婵犮垺绻傜紞濠囧极閹版澘鐐婇柕濞垮劜閻ｎ剛绱?*/
app/globals.css:1401:    padding: 24px 38px 24px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺姗€姊绘担渚劸闁挎洩绠撳畷浼村幢濡⒈娲搁悷婊呭鐢鎮￠弴鐔虹闁瑰鍎戦崗顒勬煕閺冨倸鏋涢柡宀嬬秮閹垽鏌ㄧ€ｎ厾顢呴梻浣侯攰鐏忔瑩鈥﹂崼銉晣闁稿繒鍘х欢鐐测攽閻樺弶鍣归柣鎾达耿濮婅櫣鎷犻崣澶嬪闯闂佽桨绀侀幗婊冣槈閻㈢閱囬柡鍥╁仧閿涙盯姊洪悷鏉库挃缂侇噮鍨跺畷鎴︽晸閻樺磭鍘藉┑掳鍊愰崑鎾绘煟濡や礁濮夋繛鎴犳暬閸┾偓妞ゆ帒瀚埛鎺懨归敐鍛暈闁诡垰鐗婃穱濠囶敃閵忋垻鍔悗瑙勬礃閸ㄥ潡鐛Ο鑲╃＜婵☆垶鏀辩€氬ジ姊洪懡銈呅㈡い鎴濇噺椤ㄣ儳绮欑拠鐐☉铻栭柛鏇炵仛濮ｆ劖绻濋悽闈浶ラ柡浣规倐瀹曟垿鎮欓煬韫睏闂佸憡鍔﹂悡鍫ユ倿娴犲鐓ラ柣鏂挎惈瀛濋梺钘夊暟閸犳牠寮诲☉妯锋婵炲棙鍔楃粙鍥╃磼閻愵剙鍔ら柛姘儔楠炲牓濡搁妷顔藉缓闂佺硶鍓濋〃鍛不瑜版帗鈷戦梺顐ゅ仜閼活垶宕㈤悽鍛婄厱濠电姴鍟粈瀣煕閳瑰灝鍔滅€垫澘瀚伴獮鍥敆閸屻倕鏅梻鍌欑閹诧繝宕濋幋锕€绀夌€光偓閳ь剛鍒掗弰蹇嬩汗闁圭儤鎸撮幏?*/
app/globals.css:1415:    max-width: 520px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁告挆灞拘﹂梻鍌欑窔閳ь剛鍋涢懟顖涙櫠椤栫偞鐓忛柛銉戝喚浼冮悗娈垮枟濞兼瑨鐏冩繛杈剧到濠€杈亹鐎ｎ喗鐓熼幖娣焺閸熷繘鏌涢悩宕囶暡闁哄懓娉涜灃闁告侗鍘鹃悾楣冩⒑閸濆嫬鏆欓柣妤€妫濋敐鐐哄川鐎涙鍙嗗┑鐐村灦閿氭い蹇嬪€濋弻娑氣偓锝庡亝瀹曞本銇勯姀鈥冲摵闁糕斁鍋撳銈嗗笒鐎氼剛绮婚弽銊ょ箚闁靛牆鍊告禍楣冩⒑鐎圭姵顥夋い锔诲灦閸┿垺鎯旈埈銉у枛閹筹繝濡堕崱妯兼В濠电姷顣槐鏇㈠磻閹达箑纾归柟杈剧畱閸ㄥ倹绻涘顔荤盎闁搞劌鍊婚幉鎼佹偋閸繄鐟ㄩ梺?*/
app/globals.css:1424:    min-height: 148px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺姗€姊绘担渚劸缂佺粯甯￠崺娑㈠醇濠靛啯鐏佹繛瀵稿Т椤戝棝鎮￠弴銏＄厪濠㈣埖锚閺嬫稑顭胯閸犳牠婀侀梺鍏肩ゴ閺呮稑鐡梻渚€娼уΛ娆戞暜閹烘缍栨繝闈涱儐閺呮煡鏌涘☉鍗炲妞ゃ儲宀稿濠氬磼濞嗘垹鐛㈠┑鐐板尃閸忕偓绋戣灃闁告劦浜為悡瀣⒑濮瑰洤鐏柟顔肩埣閸┾偓妞ゆ巻鍋撻柛鐔告綑閻ｇ兘宕奸弴妞诲亾閺嶎収鏁嗛柛灞剧閻忓牓鎮楃憴鍕闁稿锕ら悾鐑芥偄閸忕⒈妫冨┑鐐村灦閻燂箑袙?*/
app/globals.css:1429:    height: 98px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺姗€姊绘担渚劸缂佺粯甯￠崺娑㈠醇濠靛啯鐏佹繛瀵稿Т椤戝棝鎮￠弴銏＄厪濠㈣埖锚閺嬫稑顭胯閸犳牠婀侀梺鍏肩ゴ閺呮稑鐡梻鍌氭搐椤︾敻寮婚妸銉㈡斀闁糕剝锚濞呫倝姊洪崫銉ユ灁闁稿鍠撳Σ鎰板箳濡も偓绾惧吋鎱ㄥΟ鍝勮埞闁愁亞鏁诲娲传閸曨偒妲甸梺閫炲苯澧柛鎾村哺瀹曘儳鈧綆鍠楅悡鏇熺箾閹存繂鑸归柡瀣洴閺岋紕鈧綆鍓欓埢鍫熸叏婵犲懏顏犵紒杈ㄥ笒铻ｉ柤娴嬫櫓閸氬姊绘担鍛婃喐濠殿喚鏁婚妴鍐╃節閸モ晛绁?*/
app/globals.css:1436:    height: 20px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁告挆灞拘︽繝鐢靛仦閹稿宕洪崘顔肩；闁圭偓鏋奸弨浠嬫煃閵夈儳锛嶉柟鐣屽Х缁辨帞绱掑Ο鑲╃杽閻庤娲栭悥鍏间繆濮濆矈妲绘繝娈垮枛閵堢顫忕紒妯肩懝闁逞屽墮椤洩顦归柍銉畵瀹曞ジ濡烽妷褝绱甸梻浣告啞閸旀牠鎮鹃锕€绠虫俊銈傚亾闂佸崬娲弻鏇熷緞濞戞氨鏆犳繛瀵稿Т閹碱偊鈥旈崘顔嘉ч柛鈩冪懃椤囨⒑閼姐倕鏆€闁搞儯鍔岄崜鐟扳攽閻愬弶顥為柟绋款煼閹繝鎮㈤崫銉х槇闂佸壊鐓堥崑鍕叏閸ヮ剚鐓涢悗锝庡墮閺嬫盯鏌?*/
app/globals.css:1443:    height: 32px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺妯衡攽鎺抽崐褏寰婃禒瀣柈妞ゆ牜鍋涚粻姘跺箹濞ｎ剙濡介柍閿嬪笒闇夐柨婵嗘噺閸熺偤鏌涢悢鍝勪户闁汇儺浜鍓佹崉閵婃剬鍛亾鐟欏嫭绀€缂傚秴锕悰顕€宕卞☉妯奸獓闂佸湱顭堢€涒晠顢欐径鎰拻闁稿本鑹鹃埀顒傚厴閹虫宕奸弴顏嗙◤闁诲函缍嗛崰鏍矆鐎ｎ喗鐓曟い顓熷灥娴滅偤鏌℃径濠勭Ш婵﹦绮幏鍛存惞閻熸壆顐肩紓鍌欐祰椤曆呯矓閻熸壆鏆﹂柡澶庮嚦閺冨牆宸濇い鎾跺Х閺?*/
app/globals.css:1453:    max-width: 210px; /* 1440 婵犵數濮烽弫鍛婃叏閻戝鈧倹绂掔€ｎ亞顦┑鐘绘涧椤戝啴鍩€椤掆偓閸熸挳鐛崶顒夋晩闁兼祴鏅濋悺姗€姊绘担渚劸缂佺粯甯￠崺娑㈠醇濠靛啯鐏佹繛瀵稿Т椤戝棝鎮￠弴銏＄厪濠㈣埖锚閺嬫稑顭胯閸犳牠婀侀梺鍏肩ゴ閺呮稑鐡梻鍌氭搐椤︾敻寮婚妸銉㈡斀闁糕剝锚缁愭盯姊虹涵鍛棄闁稿﹤娼″璇测槈閵忕姈褔鏌涢埄鍐噭闁告帗鐩娲传閸曨厾鍔圭紓浣虹帛缁诲倿鎮鹃悜鑺ュ亜缁炬媽椴搁弲婵嬫⒑閹稿海绠撻柟鍐茬箻瀵偊顢旈崨顒傜畾闂佺粯鍔︽禍婊堝焵椤掍礁鐏寸€规洜鎳撶叅妞ゅ繐瀚悗顓㈡偡濠婂懎顣奸悽顖涘浮閹?*/
app/globals.css:1471:@media (max-width: 1280px) {
app/globals.css:1487:    max-width: 1080px; /* 1280 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炃氬Σ鍫熶繆椤栨艾鎮戦柟鎻掋偢濮婃椽骞庨懞銉︽殸濠碘槅鍋勯崯鏉戭嚕婵犳碍鍋勯柛蹇氬亹閸旂兘姊洪幐搴㈢５闁稿鎸搁…鑳檨闁革綇缍佸濠氭晲婢跺﹦顔掗梺鍝勵槹閸ㄨ瀵煎畝鍕拺闁告繂瀚悞璺ㄧ磼缂佹绠撻柣锝囧厴閹剝鎯旈钘夊厞婵＄偑鍊栭崹鐢告倶濠靛瑤澶婎潩椤撶姷鐦堥梺姹囧灲濞佳嗏叿闂備焦鎮堕崝宀€绱炴繝鍥х畺闁靛鏅涢～鍛存煏閸繃鍣芥い锔哄姂濮婅櫣鎷犻垾宕団偓濠氭煕閺囥劌澧扮憸鑸姂濮?*/
app/globals.css:1492:    min-height: 420px; /* 1280 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炃氬Σ鍫ユ煕濡ゅ啫浠﹂柣蹇旀崌濮婂搫鐣烽崶鈺佺濠碘槅鍋勯崯鎾嵁閸愩剮鏃堝川椤旇姤鐝抽梺纭呭亹鐞涖儵鍩€椤掑啫鐨洪柣鈺佸娣囧﹪鎮欓鍕ㄥ亾閺囩姭鍋撳☉鎺撴珚闁诡喚鍏樻俊鐑藉Ω瑜岀花鐑芥⒒閸屾瑨鍏屾い顓炵墦瀵敻顢楅崟顒€娈屾繛瀵稿Т椤戞劙寮崒鐐寸厱闁炽儱纾粻鏉棵瑰鍫㈢暫闁诡喖鍢查埢搴ょ疀閹垮啩鎮ｉ梻浣哥－缁垰煤閻旂厧钃熼柨娑樺濞岊亪鏌ら幁鎺戝姎婵炲牊顨婇幃妤冩喆閸曨剛顦ㄩ柣銏╁灡鐢繝鏁愰悙娴嬫斀閻庯絽鐏氶弲銏＄節閵忥絾纭鹃柨鏇樺劦瀵娊顢涢悙绮规嫽闂佺鏈悷锔剧矈娴煎瓨鐓忛柛鈥崇箰娴滈箖姊绘担渚劸妞ゆ垵妫濋獮鎴﹀炊椤掆偓閽冪喐绻涢幋娆忕仼缂佺姴顭烽弻銈囧枈閸楃偛顫╂繝纰樷偓鑼煓闁?*/
app/globals.css:1496:    padding: 26px 40px 26px; /* 1280 濠电姷鏁告慨鐑藉极閹间礁纾绘繛鎴欏焺閺佸銇勯幘璺烘瀾闁告瑥绻愰湁闁稿繐鍚嬬紞鎴犵棯閹勫仴闁哄瞼鍠庨埢鎾诲垂椤旂晫浜剧紓鍌欒兌婵潧螞閸愵喖钃熸繛鎴炃氬Σ鍫熺箾閸℃ê濮夌紒瀣喘濮婂搫煤鐠囨彃绠哄銈冨妼閿曨亜顕ｇ拠娴嬫婵犲﹤鎳愰弶鎼佹⒑閸︻厼浜炬繛鍏肩懃閳诲秹濡堕崨顏呮杸闂佺粯鍔曞鍫曞闯閽樺鏀介柣鎰ㄦ櫅娴滈箖姊绘担鍛婃儓闁哄牜鍓熼幆鍕敍閻愰潧绁﹂梺鎼炲労閸擄箓寮崱妞曞綊鏁愰崨顔兼殘濡炪倕绻掓慨鍨┍婵犲洦鍊锋い蹇撳閸嬫捇寮借濞兼牜鎲搁悧鍫濈瑨缂佲偓婢跺绠鹃柛鈩兩戠亸顓犵磼閻樺磭澧甸柡宀€鍠栭、娑㈠幢韫囨挷澹曢梻浣告惈椤戝懘鏌婇敐澶婅摕闁绘棁銆€閸嬫捇鎮藉▓璺ㄥ姼闂佸憡鎸稿畷顒勬箒闂佺粯顭堥濠囧箟閻愵剚鍙忓┑鐘叉噺椤忕娀鏌熼璇插祮闁搞劑绠栧畷妤呭川椤撗勵棥闂傚倸鍊搁崐椋庣矆娓氣偓楠炲鏁撻悩鑼唶闂佺粯鍨兼慨銈夊磹閸ф鐓ラ柡鍥ㄥ哺濡惧嘲霉?*/
app/globals.css:1523:@media (max-width: 1000px) {
app/globals.css:1552:    max-height: calc(100vh - 94px); /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾鐎规洏鍎抽埀顒婄秵閸忔﹢宕戦幘鍓佺當婵炴垶蓱閸ｅ綊鏌涢妸锔剧疄闁诡喗锕㈤幃娆撳垂椤愶絿褰ч梻浣告惈濡绮婚幘璇茶摕闁挎繂顦猾宥夋煕鐏炴崘澹樺ù鐘筹耿閺岋絾鎯旈姀锝咁棟濡炪倧濡囬弫璇差嚕鐠囧樊鍚嬮柛顐亝椤庡洭姊绘担鍛婂暈闁圭顭烽幊婵囥偅閸愮偓鏅梺闈涱槴閺呮稓绮堢€ｎ偁浜滈柡鍥╁仦閸ｆ椽鏌嶇拠鑼劯婵﹦绮幏鍛存惞閻熸壆顐肩紓鍌欐祰椤曆呯矓閻熸壆鏆﹂柡澶庮嚦閺冨牆宸濇い鎾跺Х閺嗕即姊绘担鍛婃儓闁哥噥鍋婇幃褎绻濋崶褏鏌у┑鐘诧工閻楀﹪鎮￠悩宕囩闁哄鍩堥崕鎰箾閸涱厽澶勯柕鍥у閺佸倻鎷犻崣澶屽綆婵犳鍠栭敃锔惧垝椤栨粎绠旈柣鏃傚帶閻愬﹦鎲稿澶涚稏闁冲搫鎳忛埛鎴︽偣閸ヮ亜鐨虹紒鐘哄皺缁辨帞鎷犻懠顒€顣洪梺浼欑悼閸忔ɑ鎱ㄩ埀顒勬煏閸繃鍟掔憸鏃堝蓟濞戙垹唯妞ゆ牗鍑瑰ú顓㈡⒑閸涘﹥灏柛鏃€鍨佃灋闁告稒鎯岄弫鍐煏韫囧ň鍋撻幇浣剐熼梻鍌欒兌閹虫捇骞夐敓鐘茬？闁规儼袙閳ь剨绠撳畷鍫曞煛閳ь剙鈻介鍫熺厱闁圭偓顨呴幊鎰ｉ崶顒佺厽闁绘柨鎽滈惌濠冦亜閹存繍妲搁柣锝夘棑濞戠敻宕ㄩ鈩冪潖闂備礁婀遍崕銈夊垂閻㈢绠?*/
app/globals.css:1553:    padding: 10px; /* 闂傚倸鍊搁崐鎼佸磹瀹勬噴褰掑炊瑜滃ù鏍煏婵炵偓娅嗛柛濠傛健閺屻劑寮村Δ鈧禍鎯ь渻閵堝骸骞栨繛灞傚€濋崺銏℃償閵娿儳顔撻梺鍛婂姀閺呮粌鈻嶉幘缁樷拻濞达絽鎲￠幆鍫ユ煕閻曚礁浜伴柟顔ㄥ嫮绡€闁搞儜鍐╁劒闂備礁鎼ú銊╁窗閹捐泛濮柍褜鍓氱换婵嬫偨闂堟刀銏ゆ煕婵犲啯鍊愮€殿喖鍟块埢搴ㄥ箣閻樼绱查梻渚€鈧偛鑻晶浼存煃瑜滈崜銊х礊閸℃稑绐楁俊銈呮噺閸嬪倿鏌￠崶銉ョ仾闁绘挻鐟╁娲敇閵娧呮殸婵犫拃灞界仸闁哄本鐩俊鍫曞磼濮橆偄顥氱紓鍌氬€搁崐鎼佸磹閻戣姤鍊块柨鏇楀亾妞ゎ偄绻戠换婵嗩潩椤掑倻宕堕梻浣筋潐瀹曟﹢顢氳缁?*/
app/globals.css:1566:    min-height: 52px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬮柛鈺傜〒缁辨捇宕掑顑藉亾閻戣姤鍊块柨鏇炲€搁拑鐔兼煏婵炵偓娅撻柡浣割儐閵囧嫰骞橀崡鐐典痪闂佺楠搁ˇ浼村Φ閸曨喚鐤€闁规儳顕妶鈺佲攽閳藉棗鐏熺紒鑸靛哺楠炲啫鐣￠柇锔惧弳闂佸憡娲﹂崜娑㈠礄閿涘嫮纾藉ù锝呭濡叉椽鏌熼搹顐ｅ磳闁诡噣绠栭幃婊堟嚍閵夛附顏熼梻浣虹帛钃辩憸鏉垮暙閻ｇ敻宕卞☉娆屾嫼闁诲骸婀辨慨鐢杆夋径瀣╃箚妞ゆ劧绲块幊鍥┾偓娈垮櫘閸撶喖宕洪埀顒併亜閹哄棗浜鹃梺瀹狀潐閸ㄥ爼鐛繝鍥ㄧ厱濠电姴鍟粈瀣偓瑙勬礃閸旀﹢濡甸幇鏉跨闁规儳鐡ㄩ悵鏍ㄤ繆閻愵亜鈧牠宕濋幋锕€纾归柡宥庡弿缂嶆牠鏌￠崶鈺佹灁缂佲檧鍋撻梻鍌氬€搁悧濠勭矙閹惧瓨娅犳繛鎴欏灪閸婂灚鎱ㄥΟ鍝勬毐闁告艾缍婇弻锝夊Ψ椤斿鍋楀Δ鐘靛仜濡粓篓娓氣偓閺屾稒鎯旈姀鐘典患缂備浇椴哥敮锟犲箖椤忓牆鐒垫い鎺戝闂傤垶鏌ㄥ┑鍡╂Ц闁藉啰鍠栭弻锝夊籍閸屾艾浠樼紓浣哄Ь椤濡甸崟顖氱閻庨潧鎽滈悾濂告⒑閻戔晜娅呭Δ鐘虫倐閸?*/
app/globals.css:1567:    padding: 16px 16px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬮柛鈺傜〒缁辨捇宕掑顑藉亾閻戣姤鍊块柨鏇炲€搁拑鐔兼煏婵炵偓娅撻柡浣割儐閵囧嫰骞橀崡鐐典痪闂佺楠搁ˇ浼村Φ閸曨喚鐤€闁规儳顕妶鈺佲攽閳藉棗鐏熺紒鑸靛哺楠炲啫鐣￠柇锔惧弳闂佸憡娲﹂崜娑㈠礄閿涘嫮纾藉ù锝呭濡叉椽鏌熼搹顐ｅ磳闁诡噣绠栭幃婊堟嚍閵夛附顏熼梻浣虹帛钃辩憸鏉垮暙閻ｇ敻宕卞☉娆屾嫼缂傚倷鐒﹂敋濠殿喖鐗嗛…鍧楁偡閻楀牜妫﹀銈冨灪閻熲晛鐣烽崡鐐╂婵炲棗鏈€氬ジ姊绘担鍛婂暈缂佸鍨块弫鍐晝閸屾氨鐤囬梺鍛婂姦娴滅偛螞椤栨粎纾藉ù锝夋涧閻忊晝鈧鍣崰姘跺焵椤掍緡鍟忛柛鐘愁殕缁绘稒绻濋崶褎妲梺閫炲苯澧柕鍥у楠炴帡骞嬪┑鎰棯闂?*/
app/globals.css:1580:    height: calc(100vh - 82px); /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣椤愪粙鏌ㄩ悢鍝勑㈢紒鈧崼銉︾叆闁哄洨鍋涢埀顒€鎽滅划锝呂旀担鐟板伎濠碘槅鍨辩€笛呮兜閸撗呮／闁告瑣鍎抽惌娆撴煛鐏炲墽娲撮柍銉畵楠炲鈹戦崨鏉跨劵濠电姷鏁搁崑娑㈡偋婵犲洢鈧啴宕卞Ο灏栨敵婵犵數濮村ù鍌炲极瀹ュ棙鍙忔慨妤€妫楅獮妤呮煕鎼淬垺灏い顏勫暣婵″爼宕卞Ο鐓庡汲闂備焦瀵уú锔界椤忓嫷鍤曢悹鍥ㄧゴ濡插牓鏌曡箛鏇炐ユい鎾虫惈閳规垿鎮╃紒妯婚敪闂佺粯顨呯换姗€銆佸▎鎾崇倞妞?Top 闂?*/
app/globals.css:1581:    padding: 0; /* 婵犵數濮烽弫鍛婃叏閻戣棄鏋侀柟闂寸绾惧鏌ｉ幇顒佹儓缂佺姳鍗抽弻鐔兼⒒鐎靛壊妲紓浣哄Х婵灚绌辨繝鍥舵晬婵犻潧瀚ч崑鎾诲焵椤掑嫭鐓涢悗锝庝簽鏁堝Δ鐘靛仦閻楁洝褰佸銈嗗坊閸嬫挸鈹戦檱閸嬫劗妲愰幒妤佸亹闁惧浚鍋嗛崙鈥愁渻閵堝骸骞栨繛纭风節楠炲﹤顭ㄩ崼鐕佹濠电偞鍨堕敃鈺侇焽閺冨牊鈷戦悹鍥皺缁犳澘螖閻樿尙绠崇紒顔碱煼楠炲鏁傞懖鈺冣棨婵犲痉鏉库偓鎰板磻閹剧粯鐓冮柦妯侯樈濡叉悂鏌嶇拠鏌ヮ€楅摶锝夋煟閹炬娊顎楀鍥ㄧ節绾板纾块柛瀣灴瀹曟劙寮介鐐殿唶闂佸綊妫跨拋鏌ュ焵椤掑﹦鐣遍柣锝忕節楠炲秹顢欓懞銉晭濠电姵顔栭崰妤呭Φ濞戙垹纾婚柟鎯х亪閸嬫挾鎲撮崟顒傦紭闂佸憡姊归崹鍧楁偘椤旂⒈鍚嬪鑸瞪戦弲鈺呮⒑鐠団€崇€婚柛銉㈡櫅绾惧潡姊?*/
app/globals.css:1599:@media (max-width: 640px) {
app/globals.css:1602:    height: 70px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾?Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柛娆忣槹閸欏繑淇婇悙棰濆殭濞存粓绠栧铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
app/globals.css:1607:    height: 34px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾?Logo 濠电姷鏁告慨鎾儉婢舵劕绾ч幖瀛樻尭娴滈箖鏌￠崶銉ョ仼缁炬儳婀遍幉鎼佹偋閸繄鐟查梺鍝勬媼娴滎亜顫?*/
app/globals.css:1612:    max-width: 136px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘哄亹缁辨挻鎷呴崫鍕戯絾绻濋姀鈽呰€块柍銉畵瀹曠螖娴ｅ憡鐤傞梻鍌氬€搁悧濠勭矙閹达讣缍栫€广儱顦伴悡鐔肩叓閸ャ劍宕岄柣娑欑矌缁辨帡鎮╅搹顐㈢３閻庢鍠栭…鐑藉极閹剧粯鍋愰柡灞诲劚閺佽绻濆▓鍨灍闁挎洍鏅犲畷妤€鈽夊▎鎴犲骄闂佸搫娲ㄩ崑鎰板绩娴犲鐓熸慨妤€妫楅弸娑㈡煟韫囧﹥娅婇柡宀嬬秮瀵粙濡烽妷褌绱欓柣搴ゎ潐濞叉﹢鏁冮姀銈囧祦闁糕剝鍑瑰Σ鐓庘攽閻愬弶鍣洪柣妤冨Т椤?*/
app/globals.css:1613:    height: 38px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘哄亹缁辨挻鎷呴崫鍕戯絾绻濋姀鈽呰€块柍銉畵瀹曠螖娴ｅ憡鐤傞梻鍌氬€搁悧濠勭矙閹达讣缍栫€广儱顦伴悡鐔肩叓閸ャ劍宕岄柣娑欑矌缁辨帡鎮╅崘鑼紘闂佽绻愰崯鏉戭潖閾忓湱鐭欓柟绋垮閹烽亶姊烘總鍓叉殥缂侇喗鐟╅妴渚€寮崼婵嗚€块棅顐㈡处閹搁攱绔?*/
app/globals.css:1614:    padding: 0 9px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘哄亹缁辨挻鎷呴崫鍕戯絾绻濋姀鈽呰€块柍銉畵瀹曠螖娴ｅ憡鐤傞梻鍌氬€搁悧濠勭矙閹达讣缍栫€广儱顦伴悡鐔肩叓閸ャ劍宕岄柣娑欑矌缁辨帡鎮╅搹顐㈢３閻庢鍠涢褔鍩ユ径鎰潊闁绘鏁搁弶鍛婁繆閻愵亜鈧牜鏁繝鍕焼濞达絿纭堕弸鏃傗偓鍏夊亾闁逞屽墰濡叉劙骞樼€涙ê顎撻柣鐔哥懃鐎氀囧箯婵犳碍鈷戦柛婵勫劚鏍￠梺鍦嚀濞差參鎮?*/
app/globals.css:1620:    max-width: 96px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭婇柟钘夘儑缁辨捇宕掑顑藉亾閹间礁纾归柛婵勫劤閻捇鏌熺紒銏犳珮闁轰礁瀚…璺ㄦ崉閻氭潙濮涢梺鍝勬４闂勫嫮鎹㈠┑鍥╃瘈闁稿本纰嶉悘鎾绘⒑閸涘﹨澹樻い鎴濐樀瀵鈽夐姀鈺傛櫇濡炪倖鍔﹀鈧紒銊嚙閳规垿鎮欓懠顒€鐏ｉ梺鎼炲劘閸斿酣宕㈡禒瀣拺缂備焦蓱椤ュ牊銇勯妷锔藉碍闁崇粯鎹囬弻鍡楊吋閸℃瑥骞堥梺璇插嚱缂嶅棝宕戦崨顓犳殾鐎光偓閸曨剛鍘搁悗鍏夊亾閻庯綆鍓涢惁鍫ユ倵鐟欏嫭绀冮悽顖涘浮閿濈偛鈹戠€ｅ灚鏅ｉ梺缁樻⒒椤牓鍩€椤掑倸鍘存慨濠勭帛閹峰懘宕崟顐⑿曞┑鐘愁問閸犳牜绮旈悷鎵殾闁靛ň鏅╅弫鍌炴煕閺囥劋绨绘い銉︽皑缁辨挻鎷呮ウ鎸庮€楅梺鍛娒妶鎼佺嵁婵犲懐鐤€婵炲瓨婢橀ˇ鏉款嚗閸曨垰绠涙い鎾跺亹閸?*/
app/globals.css:1629:    height: 18px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘层偢濮婃椽宕ㄦ繝鍌氼潊闂佺顑嗛幑鍥ь潖缂佹绡€閹肩补鈧尙鐩庢繝鐢靛仩椤曟粍淇婇崶鈺佸灊婵炲棙鎸哥粻铏繆閵堝拑鏀婚柡鍜冪秮濮婃椽骞嗚缁犵儤銇勯銏╂█鐎规洑鍗抽獮鍥偋閸垹骞橀梻浣告啞閹告槒銇愰崘鈺傛珷妞ゆ洍鍋撻柡宀嬬秬缁犳稑顫濋銏″創缂傚倷娴囨ご鍝ユ暜閻愬灚顫曢柟鐑樺殾閻旂厧绀傞柣鎾抽閻忊€斥攽鎺抽崐妤佹叏閻戣棄纾婚柣鎰仛閺嗘粓鏌嶉埡浣告殨缂佽妫濋弻锝夊箣閿濆棭妫勯柛鐑嗗灦濮婃椽妫冨☉杈ㄐ㈤梺鍝勬噺缁捇銆佸▎鎾崇闁靛鍨洪弬鈧梺鍦劋婵炲﹤鐣烽幇鏉垮嵆闁靛繒濮烽敍娆撴偡濠婂懎顣奸悽顖涱殜瀵煡顢旈崼鐔叉嫼?*/
app/globals.css:1635:    padding: 7px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘荤畺濮婃椽骞栭悙娴嬪亾閺嶎灐鍝勎熼崗鐓庡簥濠电娀娼уú銊у姬閳ь剟姊虹粙鎸庢拱缁炬澘绉撮埢鎾活敇閻樼數锛濇繛杈剧稻瑜板啯绂嶆ィ鍐╃厽閹兼惌鍨崇粔鐢告煕閻樻剚娈滈柟顕嗙節瀵挳濮€閿涘嫬骞嶉梻鍌欑贰閸欏繒绮婚幋鐐存珷妞ゆ牜鍋為悡鏇㈡煏閸繂鈧憡绂嶉崜褏纾介柛灞捐壘閳ь剛鍏橀幃鐐烘晝閳ь剟锝炶箛鏃傜瘈婵﹩鍓涢悰銉╂⒑鐟欏嫬绀冩い鏇嗗懐涓?*/
app/globals.css:1639:    padding: 10px 10px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾工閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂婎偄娲︾粙鎴﹀垂閸屾埃鏀介柣妯虹枃婢规绱掗悩闈浶ｇ紒缁樼洴楠炲鈻庤箛鏇氭偅闂備胶绮敮鎺楁倶濮樿泛桅闁告洦鍨扮粻鎶芥煙鐎涙绠ュù鐘荤畺濮婃椽骞栭悙娴嬪亾閺嶎灐鍝勎熼崗鐓庡簥濠电娀娼уú銊у姬閳ь剟姊虹粙鎸庢拱缁炬澘绉撮埢鎾活敇閻樼數锛濇繛杈剧稻瑜板啯绂嶆ィ鍐╃厽閹兼惌鍨崇粔闈浢瑰鍡樼【闁靛棙甯楃换婵嗩潩椤撶姴甯鹃梻浣稿閸嬪懐鎹㈤崘鈺佺窞闁告洦鍨遍悡鏇㈡煏閸繂鈧憡绂嶆ィ鍐┾拻闁稿本鐟чˇ锕傛煙閼恒儳鐭掔€规洘鍨甸埥澶愬閳ュ厖妲愰梻渚€娼ч…鍫ュ磿濞差亝鍊垮ù鐘差儑閸欐捇鏌涢妷锝呭缂佲偓閸愵喗鐓曢煫鍥ㄦ⒒閻帡鏌＄仦鍓р槈闁宠棄顦靛畷锟犳倷閸忕瀵查梺?*/
app/globals.css:1645:    height: 38px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬮柛鈺傜〒缁辨捇宕掑顑藉亾閻戣姤鍊块柨鏇炲€告闂佺粯鍔楅弫鎼佹儗閸℃褰掓晲閸ャ劍鐝繛瀛樼矎婵倖绌辨繝鍥ㄥ€锋い蹇撳閸嬫捇寮撮悩鍐插簥闂佸綊鍋婇崕顏劽洪鍕幯囨煕閵夈垺娅囨い锔诲灦濮婃椽宕ㄦ繝鍕ㄦ闂佸鏉垮闁诡噯绻濆鎾偄閸撲胶鐣鹃梻渚€娼ч悧鍡欌偓姘煎櫍瀹曟繂顓奸崶鈺冿紲闂侀€炲苯澧寸€规洘锕㈤、娆撴寠婢跺棗浜鹃柣銏犳啞閻撴洘銇勯鐔风仴濞存粎鍋ら弻锝夘敇閻旈攱璇為梺鍝勫閳ь剙纾弳鍡涙倵閿濆骸澧伴柡鍡愬€曢—鍐Χ閸愩劎浠鹃悗鍏夊亾闁归棿绀侀弰銉╂煃瑜滈崜姘跺Φ閸曨垰绠抽柟瀛樼箥娴犻箖姊虹粙娆惧剳闁哥姵鍔欐俊鐢稿礋椤栨氨鐫勯梺鎼炲労閻忔繈骞樼紒妯煎幈?*/
app/globals.css:1653:    max-height: calc(100vh - 82px); /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫俊顖氾躬濮婃椽鎳￠妶鍛€剧紓渚囧枛缁夋挳鈥﹂崹顔ョ喖鎳栭埡鍐帬闂備浇宕甸崰鎰珶閸℃稑姹查柨鏇炲€归悡銉╂煟閺傛寧鎯堢€涙繈姊洪崨濠庢畷濠电偛锕濠氭晲婢跺﹦鐫勯梺鍓插亞閸犳劙鎮靛畷鍥╃＝濞撴艾娲ゅ▍姗€鏌涢妸銊ゅ惈闁瑰箍鍨归埞鎴犫偓锝庝憾濞煎﹪姊虹紒姗堣€挎繛浣冲洦鍊舵い鏇楀亾婵﹥妞介獮鏍倷閹绘帒顫庨梻浣告惈閹冲繘鎯勯鐐茬闊洦娲嶉崑鎾绘晲鎼粹剝鐏嶉梺?*/
app/globals.css:1654:    padding: 10px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭婇柟钘夘儏閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂佺粯鏌ㄩ幗婊堛€呴弻銉︾厱妞ゆ劧绲剧粈鈧紓浣哄Х婵數鎹㈠┑鍥╃瘈闁稿本绮岄埛鍫ユ⒑鏉炴壆顦﹂柛濠傛健瀵鈽夐姀鐘栥劑鏌熺€涙绠栭柛锝囨櫕閳ь剚绋掔换鍫濐潖婵犳艾纾兼繛鍡樺焾濡差噣姊虹涵鍜佸殝缂佺粯绻堟俊鎾礃椤旂厧鑰垮┑锛勫仦濞叉ê顪冮挊澶樺殨濞寸姴顑愰弫鍥煟閹邦垱纭鹃柣鎾达耿濮婅櫣鎷犻幓鎺濆妷缂備礁顑嗙敮鐔煎箺椤愩倗纾介柛灞炬皑瀛濆┑鐐茬湴閸旀垿骞嗛埀顒併亜韫囨挾澧遍柡浣告喘閺岋綁骞囬鐔虹▏濠电偛鎲為崶銊㈡嫼?*/
app/globals.css:1659:    height: 18px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭婇柟钘夘儏閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂佺粯鏌ㄩ幗婊堛€呴弻銉︾厱妞ゆ劧绲剧粈鈧紓浣哄Х婵數鎹㈠┑鍥╃瘈闁稿本绮岄埛鍫ユ⒑鏉炴壆顦﹂柛濠傛健瀵鈽夐姀鈺傛櫇闂侀潧鐗嗛幊蹇涙偟閿熺姵鈷戦柛娑橈龚婢规﹢鏌熼搹顐€挎鐐插暙閻ｏ繝鏌囬敂鎯у汲闂備胶纭堕崜婵嬨€冮崼銉ョ闁绘垼濮ら埛鎴︽煙閼测晛浠滃┑顔瑰亾闂備胶顭堥鍡涘礉濞嗘挾宓侀柟杈剧畱椤懘鏌ｅ鍡椾簼妞ゎ偄绉瑰娲濞戞氨顔婃繝娈垮枤閸忔﹢銆佸▎鎰瘈闁搞儯鍔夐幏娲⒒閸屾氨澧涘〒姘殔鍗遍柛顐ｆ礃閻撴洟骞栧ǎ顒€濡洪柟鑼亾閹便劍绻濋崘銊ュБ闁句紮绲介湁闁挎繂妫欑粈鍐╀繆椤愩垹鏆欓柣锝囧厴楠炴帡骞婇妸銉хШ濠殿喒鍋撻梺瀹犮€€閸嬫挾绱掗妸銈囩煓闁?*/
app/globals.css:1663:    padding: 14px 16px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭婇柟钘夘儏閳规垿鏁嶉崟顐℃澀闂佺锕ラ悧鏇犲弲闂佺粯鏌ㄩ幗婊堛€呴弻銉︾厱妞ゆ劧绲剧粈鈧紓浣哄Х婵數鎹㈠┑鍥╃瘈闁稿本绮岄埛鍫ユ⒑鏉炴壆顦﹂柛濠傛健瀵鈽夐姀鈺傛櫇闂佹寧绻傚ú鐘诲几閺冨牊鈷戠紒瀣儥閸庢劙鏌熼崨濠冨€愭い銏★耿瀹曟鎮℃惔锝囩嵁濠电姷鏁告慨瀵糕偓姘槻鍗卞ù鐓庣摠閳锋帒霉閿濆懏鍟為柛鐔哄仧缁辨帞鈧綆鍋勭粭姘辩磼閺冨倸鏋涚€规洖宕埥澶娾枎韫囧孩鍩涢梻鍌欑婢瑰﹪宕戦崨顒煎搫顫滈埀顒€鐣?*/
app/globals.css:1668:    padding: 14px 16px; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭婇柟钘夘儔濮婃椽鎳￠妶鍛€剧紓渚囧枛缁夌敻宕氭繝鍥ㄥ仼閻忕偠鍋愰崜銊モ攽閻愬弶顥為柛鏃€顨婇妴鍛存倻閼恒儳鍙嗛梺鍝勬川閸嬫盯鍩€椤掍焦鍊愮€规洩绻濋獮搴ㄦ嚍閵壯冨箺闂備礁缍婇崑濠囧窗濡ゅ懎姹查柍鍝勬噺閻撱儲绻涢幋鐐垫噮婵炲弶鎸抽弻鈥崇暆鐎ｎ剛蓱闂佽鍨遍弻銊╁煘閹达箑閱囨い顐墮娴狀厽绻濋悽闈浶為柛銊ヮ煼楠炲﹪骞樼紒妯轰罕闂佽鍎崇壕顓㈠汲閿旂晫绠剧€瑰壊鍠曠花鑽も偓鐟版啞缁诲啴濡甸崟顖氱睄闁搞儯鍔婇埀顒€鍟扮槐鎺楀Ω閵夘喚鍚嬪┑顔硷攻濡炰粙骞婇敓鐘参ч柛娑卞枤閳ь剚鍎抽埞鎴︽偐椤旇偐浠鹃梺鎸庢磸閸ㄥ綊顢氶敐澶樻晝闁挎洍鍋撻梺鍗炴喘閺岋繝宕堕埡浣锋埛婵°倗濮村ú顓烆潖濞差亜绀堥柟缁樺笂缁ㄦ挳姊虹化鏇熸珔閻庢碍婢橀锝夊Ω閳轰胶顓煎銈嗘煥婢т粙鏁?*/
app/globals.css:1674:    height: calc(100vh - 70px); /* 闂傚倸鍊搁崐鎼佸磹閹间礁纾瑰瀣椤愪粙鏌ㄩ悢鍝勑㈢紒鈧崼銉︾叆闁哄洨鍋涢埀顒€鎽滅划锝呂旀担鐟板伎濠碘槅鍨辩€笛呮兜閸撗呮／闁告瑣鍎抽惌娆撴煛鐏炲墽娲撮柍銉畵楠炲鈹戦崨鏉跨劵濠电姷鏁搁崑娑㈡偋婵犲洢鈧啴宕卞Ο灏栨敵婵犵數濮村ù鍌炲极瀹ュ棙鍙忔慨妤€妫楅獮妤呮煕鎼淬垺灏い顏勫暣婵″爼宕卞Ο鐓庡汲闂備焦瀵уú锔界椤忓嫷鍤曢悹鍥ㄧゴ濡插牓鏌曡箛鏇炐ユい鎾虫惈閳规垿鎮╃紒妯婚敪闂佺粯顨呯换姗€銆佸▎鎾崇倞妞ゎ剦鍓氬Λ鍐箖閳哄懏顥堟繛鎴烆殕閸曞啴姊绘担鍛婅础闁硅櫕鎸哥叅妞ゆ挶鍨洪崑妯汇亜閺冨倵鎷￠柛姘儔閺屾盯濡烽婊冨煂婵炲瓨绮撶粻鏍蓟閵娿儮鏀介柛鈩冧緱閳ь剚顨呴湁婵犲﹤瀚粻妯肩磼?Top 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗〒姘ｅ亾妤犵偞鐗犻、鏇㈠Χ閸モ晝鍘犻梺璇查叄濞佳囧箟閳ュ磭鏆﹂柛娆忣槹閸欏繑淇婇悙棰濆殭濞存粓绠栧铏规嫚閳ヨ櫕鐏撻梺杞扮椤兘濡存担绯曟瀻闁圭偓娼欏▓鐔兼⒑闂堟侗妲堕柛搴ら哺娣?*/
app/globals.css:1684:    line-height: 1.15; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫い銏∶埞鎴︽晬閸曨偂鏉梺绋匡攻閸旀瑥顕ｉ幓鎺嗘斀闁割偅绻傞悘濠傤渻閵堝棛澧遍柛瀣⊕椤㈠﹪姊绘担鍛婂暈婵炶绠撳畷瑙勫閺夋垵鐎梺绋挎湰缁嬪繑绂嶅鍫熺厵闁逛絻娅曞▍鍛存煃瑜滈崜姘洪悢鐓庣畺婵☆垳绮紞鍥煏婵炲灝鈧绮诲顒夋富闁靛牆妫楁慨鍌炴煕婵犲啯绀嬮柕鍡楀€垮畷妤冪箔鏉炴壆鐩庢俊鐐€栭幐楣冨磻閻斿憡娅犻柨鏇炲€归悡蹇涙煕閳╁啯绀堢紒鎰⒐椤ㄣ儵鎮欏顔煎壎闂佽鍠楃划鎾崇暦閸楃倣鐔煎礂閸忚偐妲?*/
app/globals.css:1689:    line-height: 1.75; /* 闂傚倸鍊搁崐鎼佸磹妞嬪海鐭嗗ù锝堟缁€濠傗攽閻樻彃浜為柣鎺旀櫕閹叉悂寮崼娑掑亾娓氣偓瀵粙顢橀悙鑼垛偓鍨攽閿涘嫬浠х紒顕呭灦瀵偊鎮╃紒妯锋嫼闂備緡鍋嗛崑娑㈡嚐椤栨稒娅犻柟娈垮枤绾惧ジ寮堕崼娑樺婵炴惌鍠氶埀顒侇問閸ｎ噣宕抽敐澶屽祦閻庯綆浜栭弨浠嬫煕椤愶絿鐭嬫い銏∶埞鎴︽晬閸曨偂鏉梺绋匡攻閸旀瑥顕ｉ幓鎺嗘斀闁割偅绻傞悘濠傤渻閵堝棛澧遍柛瀣⊕椤㈠﹪姊绘担鍛婂暈婵炶绠撳畷褰掓焼瀹撱儱顦靛畷濂告偄閾忚鍟庨梻浣烘嚀椤曨參宕曢幋鐐电懝婵炴垶鐟ょ换鍡樸亜閹扳晛鐏柛鐘成戦幈銊︾節閸愨斂浠㈤悗瑙勬处閸嬪﹤鐣烽悢纰辨晣濠㈣泛鐗嗛悘顏嗙磼缂佹鈽夋い鏂跨箻椤㈡瑩鎮℃惔锝囨綁闂傚倷绶氬褍螞濡ゅ懎纾归柛褎顨呯粻鏍煕閹炬鍊归崟鍐⒑鐠団€崇€婚柛灞剧矒閹稿ジ姊绘担绛嬪殭濡ょ姵鎮傚畷銏狀煥閸繄锛涢梺鐟板⒔缁垶鎮￠弴銏＄厸闁搞儯鍎辨俊鍏碱殽閻愬澧甸柡?*/
app/globals.css:1710:  min-height: 52px !important;
app/globals.css:1711:  padding: 0 22px !important;
app/globals.css:1727:  line-height: 1.35 !important;
app/globals.css:1730:  height: auto !important;
app/globals.css:1747:  line-height: 1 !important;
app/globals.css:1763:  height: 220vh;
app/globals.css:1775:  min-height: calc(100vh - 100px);
app/globals.css:1776:  padding: 30px 0 38px;
app/globals.css:1789:  height: 760px;
app/globals.css:1790:  min-height: 350px;
app/globals.css:1799:  max-width: 710px;
app/globals.css:1807:  line-height: 1.04;
app/globals.css:1814:  max-width: 620px;
app/globals.css:1817:  line-height: 1.85;
app/globals.css:1825:  max-width: 560px;
app/globals.css:1829:  padding: 8px 16px;
app/globals.css:1859:  height: 54px;
app/globals.css:1860:  padding: 0 34px;
app/globals.css:1894:  height: 620px;
app/globals.css:1895:  min-height: 620px;
app/globals.css:1903:  height: 540px;
app/globals.css:1906:  padding: 16px;
app/globals.css:1923:  height: 100%;
app/globals.css:1970:  line-height: 1;
app/globals.css:1992:  padding: 16px;
app/globals.css:2114:  padding: 18px;
app/globals.css:2147:  height: 98px;
app/globals.css:2161:    height: 158px;
app/globals.css:2166:    height: 132px;
app/globals.css:2171:    padding: 18px;
app/globals.css:2191:  line-height: 1.55;
app/globals.css:2196:  line-height: 1.58;
app/globals.css:2207:  padding: 5px 8px;
app/globals.css:2216:  padding: 5px 9px;
app/globals.css:2242:  padding: 0;
app/globals.css:2257:  min-height: 142px;
app/globals.css:2258:  padding: 24px 24px;
app/globals.css:2279:  height: 150px;
app/globals.css:2292:  line-height: 1.2;
app/globals.css:2300:  max-width: 92%;
app/globals.css:2303:  line-height: 1.75;
app/globals.css:2311:@media (min-width: 769px) and (max-width: 1440px) {
app/globals.css:2314:    height: 700px;
app/globals.css:2324:    max-width: 540px;
app/globals.css:2330:    height: 560px;
app/globals.css:2331:    min-height: 420px;
app/globals.css:2337:    height: 470px;
app/globals.css:2380:@media (max-width: 768px) {
app/globals.css:2382:    height: auto;
app/globals.css:2383:    min-height: auto;
app/globals.css:2395:    min-height: auto;
app/globals.css:2396:    padding: 26px 0 52px;
app/globals.css:2403:    height: auto;
app/globals.css:2404:    min-height: 0;
app/globals.css:2410:    max-width: none;
app/globals.css:2412:    padding: 14px 2px 22px;
app/globals.css:2419:    line-height: 1.05;
app/globals.css:2426:    max-width: 100%;
app/globals.css:2429:    line-height: 1.78;
app/globals.css:2445:    height: 48px;
app/globals.css:2446:    padding: 0 14px;
app/globals.css:2481:    padding: 0;
app/globals.css:2490:    min-height: 390px;
app/globals.css:2544:    min-height: 390px;
app/globals.css:2548:    padding: 26px 22px 22px;
app/globals.css:2598:    line-height: 1.1;
app/globals.css:2606:    max-width: 300px;
app/globals.css:2609:    line-height: 1.68;
app/globals.css:2622:    min-height: 30px;
app/globals.css:2623:    padding: 6px 10px;
app/globals.css:2667:  min-height: 28px !important;
app/globals.css:2668:  padding: 4px 8px !important;
app/globals.css:2677:  line-height: 1 !important;
app/globals.css:2714:    padding: 0;
app/globals.css:2729:    min-height: 38px;
app/globals.css:2730:    padding: 8px 12px;
app/globals.css:2760:    padding: 0;
app/globals.css:2775:    min-height: 138px;
app/globals.css:2776:    padding: 18px 16px;
app/globals.css:2803:    line-height: 1.2;
app/globals.css:2812:    max-width: 100%;
app/globals.css:2815:    line-height: 1.55;
app/globals.css:2824:    height: 120px;
app/globals.css:2916:    height: 220vh;
app/globals.css:2917:    min-height: 220vh;
app/globals.css:2923:    min-height: calc(100vh - 100px);
app/globals.css:2937:@media (max-width: 768px) {
app/globals.css:2951:    height: auto !important;
app/globals.css:2952:    min-height: auto !important;
app/globals.css:2958:    min-height: auto !important;
app/globals.css:2987:  min-height: auto;
app/globals.css:2988:  height: auto;
app/globals.css:2989:  padding: 88px 0 0;
app/globals.css:3009:  height: 360px;
app/globals.css:3035:  height: auto;
app/globals.css:3036:  min-height: auto;
app/globals.css:3066:  line-height: 1.16;
app/globals.css:3076:  line-height: 1.4;
app/globals.css:3107:    min-height: 100vh 闂傚倸鍊搁崐宄懊归崶褏鏆﹂柣銏㈩焾绾惧鏌ｉ幇顔芥毄闁活厽鐟╅悡顐﹀炊閵娧€妲堢紓浣插亾濠㈣埖鍔曠粻瑙勭箾閿濆骸澧┑锛勫帶椤╁ジ宕ㄩ娑欐杸濡炪倖姊婚悺鏃堟倿閹灐鐟邦煥鎼粹€愁潾缂備緡鍠栭…宄邦嚕椤曗偓閸┾偓妞ゆ帒瀚闂佸憡娲﹂崹鎵不閿濆鐓ユ繝闈涙椤ョ娀鏌曢崱妤嬭含婵﹥妞介幊锟犲Χ閸涱喚鈧崵绱撴担铏瑰笡闁挎洏鍨介悰顕€宕橀…鎴炲缓闂侀€炲苯澧存鐐插暙閳诲酣骞橀弶鎴烆吇婵＄偑鍊栫敮鎺楀磻閸℃稑鐤柛顐犲劜閳锋帒霉閿濆牜娼愰柛瀣█閺屾稒绻涜鐎氼亞鎹㈤崱娑欑厱闁靛绲芥俊鎸庛亜閳哄倻鍙€闁哄瞼鍠栧鑽も偓闈涘濡差喚绱撴担鍝勵€撶紒鎻掑⒔閹广垹鈹戠€ｎ偒妫冨┑鐐村灦閻燁垰螞閵堝鈷戠紓浣诡焽閳笺倝鏌涙惔銊ゆ喚闁糕晝鍋ら獮瀣晜閽樺姹楅梻浣哥秺濞佳呯矓閹绢喗鍋嬮柟鎹愵嚙閺勩儵鏌嶈閸撴岸濡甸崟顖氱闁瑰瓨绻冨▓顓㈡⒑濮瑰洤濡块柛搴涘€濇俊鐢稿礋椤斿墽鏉稿┑鐐村灦椤ㄥ棝宕板鑸碘拺闁告繂瀚ˇ顒勬煕閹惧绠炴鐐茬箻瀹曘劎鈧稒蓱閸庮亪姊洪棃鈺佺槣闁告ɑ鍎冲嵄闁搞儺鍓氶埛鎺楁煕鐏炲墽鎳呮い锔煎閳ь剚顔栭崰鏍ㄦ櫠鎼淬劌绀嗛柟鐑樺灩閺嗗棝鏌涢弴銊ュ闁伙絾濞婂濠氬磼濮樿偐鍙曢梺绋款儏鐎氼剛鍙呴梺鎸庢礀閸婂摜绮堥崟顖涚厽闁绘梻鍘ф禍浼存煟閹哄秶鐭欓柡宀嬬節瀹曟﹢濡歌椤も偓闂備胶绮幐璇裁洪悢鐓庤摕闁靛鍎弨浠嬫煕閳╁喚娈曟繛鍫幗缁绘繂鈻撻崹顔界亪闂佺锕ゅ鈥愁嚕婵犳碍鏅查柛娑变簼閺傗偓闂備礁缍婇崑濠囧礈濮樿埖鍊剁€广儱顦伴埛鎴︽偣閸ワ絺鍋撳畷鍥︾敾婵犵妲呴崑鍕疮閺夋埈鍤曟い鎰剁畱绾惧吋绻濇繝鍌氼仼濞寸姵甯″娲倷閽樺濮庨梺鍛娚戦悧妤冪博?
app/globals.css:3110:  min-height: 100vh;
app/globals.css:3111:  height: auto;
app/globals.css:3117:  padding: 0;
app/globals.css:3171:  height: 100%;
app/globals.css:3221:  min-height: 100vh;
app/globals.css:3287:  line-height: 1.16;
app/globals.css:3302:  line-height: 1.4;
app/globals.css:3325:    濠电姷鏁告慨鐑藉极閹间礁纾婚柣鎰惈閸ㄥ倿鏌涢锝嗙缂佺姳鍗抽弻娑樷攽閸曨偄濮㈤梺娲诲幗閹瑰洭寮婚悢铏圭＜闁靛繒濮甸悘鍫ユ⒑濮瑰洤鈧倝宕抽敐澶婅摕鐎广儱鐗滃銊╂⒑閸涘﹥灏甸柛鐘崇墪椤?min-height: 430px闂?
app/globals.css:3328:  min-height: 0;
app/globals.css:3381:  height: 100%;
app/globals.css:3405:  height: 100%;
app/globals.css:3406:  padding: 0;
app/globals.css:3429:  height: 100%;
app/globals.css:3470:  height: 68px;
app/globals.css:3496:  height: 0;
app/globals.css:3523:  line-height: 1.22;
app/globals.css:3530:  max-width: 980px;
app/globals.css:3534:  line-height: 1.9;
app/globals.css:3543:  max-height: 214px;
app/globals.css:3567:  min-height: auto;
app/globals.css:3568:  padding: 6px 0;
app/globals.css:3586:  line-height: 1;
app/globals.css:3621:  line-height: 1;
app/globals.css:3638:  line-height: 1.45;
app/globals.css:3672:  height: 48px;
app/globals.css:3673:  padding: 0 34px;
app/globals.css:3683:  line-height: 1;
app/globals.css:3733:  padding: 22px 0 24px;
app/globals.css:3746:  padding: 0 80px;
app/globals.css:3764:  padding: 0;
app/globals.css:3819:  line-height: 1.35;
app/globals.css:3861:@media (max-width: 1024px) {
app/globals.css:3863:    min-height: auto;
app/globals.css:3868:    min-height: auto;
app/globals.css:3904:@media (max-width: 768px) {
app/globals.css:3935:    line-height: 1.8;
app/globals.css:3936:    max-height: none;
app/globals.css:3964:    padding: 0 24px;
app/globals.css:3973:    height: 56px;
app/globals.css:3992:  min-height: 100vh;
app/globals.css:4013:  line-height: 1.14;
app/globals.css:4021:  max-width: 780px;
app/globals.css:4024:  line-height: 1.78;
app/globals.css:4030:  min-height: 100vh;
app/globals.css:4101:  height: 100%;
app/globals.css:4102:  min-height: 100vh;
app/globals.css:4103:  padding: 0 34px 72px;
app/globals.css:4124:  line-height: 1.16;
app/globals.css:4132:  height: 2px;
app/globals.css:4153:  max-width: 390px;
app/globals.css:4156:  line-height: 1.75;
app/globals.css:4160:  max-width: 460px;
app/globals.css:4161:  max-height: 0;
app/globals.css:4166:  line-height: 1.75;
app/globals.css:4176:  height: 52px;
app/globals.css:4219:  max-height: 180px;
app/globals.css:4312:@media (max-width: 1180px) {
app/globals.css:4314:    height: auto;
app/globals.css:4315:    min-height: auto;
app/globals.css:4320:    height: auto;
app/globals.css:4342:    min-height: 420px;
app/globals.css:4352:    min-height: 420px;
app/globals.css:4360:@media (max-width: 768px) {
app/globals.css:4362:    height: auto;
app/globals.css:4363:    min-height: auto;
app/globals.css:4364:    padding: 82px 0 42px;
app/globals.css:4398:    height: auto;
app/globals.css:4422:    line-height: 1.15;
app/globals.css:4428:    line-height: 1.35;
app/globals.css:4439:    line-height: 1.25;
app/globals.css:4449:    padding: 0;
app/globals.css:4459:    line-height: 1.45;
app/globals.css:4467:    height: 46px;
app/globals.css:4468:    padding: 0 34px;
app/globals.css:4474:    padding: 24px 0 10px;
app/globals.css:4478:    padding: 0;
app/globals.css:4498:    line-height: 1.35;
app/globals.css:4502:    min-height: auto;
app/globals.css:4503:    padding: 56px 0 50px;
app/globals.css:4529:    line-height: 1.12;
app/globals.css:4535:    line-height: 1.72;
app/globals.css:4542:    min-height: auto;
app/globals.css:4550:    min-height: 320px;
app/globals.css:4558:    min-height: 320px;
app/globals.css:4559:    padding: 26px 22px;
app/globals.css:4587:    line-height: 1.68;
app/globals.css:4591:    max-height: none;
app/globals.css:4594:    line-height: 1.65;
app/globals.css:4599:    height: 44px;
app/globals.css:4725:  line-height: 1.12;
app/globals.css:4731:@media (max-width: 768px) {
app/globals.css:4757:  min-height: 100vh;
app/globals.css:4758:  padding: 72px 24px;
app/globals.css:4830:  min-height: 100vh;
app/globals.css:4837:  padding: 72px 0;
app/globals.css:4846:  height: 560px;
app/globals.css:4885:  line-height: 1;
app/globals.css:4901:  height: 42px;
app/globals.css:4902:  padding: 0 22px;
app/globals.css:4933:  height: 780px;
app/globals.css:4951:  height: 400px;
app/globals.css:4968:  height: 380px;
app/globals.css:4969:  padding: 30px 32px 34px;
app/globals.css:5000:  line-height: 1.68;
app/globals.css:5010:  line-height: 1.86;
app/globals.css:5017:  height: 48px;
app/globals.css:5026:  height: 48px;
app/globals.css:5044:  height: 780px;
app/globals.css:5045:  padding: 46px 42px 38px;
app/globals.css:5086:  line-height: 1.76;
app/globals.css:5096:  line-height: 2;
app/globals.css:5103:  height: 48px;
app/globals.css:5114:  height: 48px;
app/globals.css:5115:  padding: 0 24px;
app/globals.css:5137:  height: 780px;
app/globals.css:5154:  height: 165px;
app/globals.css:5155:  padding: 12px 0;
app/globals.css:5190:  height: 100%;
app/globals.css:5191:  min-height: 128px;
app/globals.css:5201:  height: 100%;
app/globals.css:5214:  line-height: 1.45;
app/globals.css:5228:  line-height: 1.65;
app/globals.css:5244:  line-height: 1.45;
app/globals.css:5255:  line-height: 1.2;
app/globals.css:5279:  height: 44px;
app/globals.css:5280:  padding: 0 24px;
app/globals.css:5325:@media (max-width: 1280px) {
app/globals.css:5336:    height: auto;
app/globals.css:5352:@media (max-width: 768px) {
app/globals.css:5354:    min-height: auto;
app/globals.css:5356:    padding: 44px 0 84px;
app/globals.css:5384:    height: 40px;
app/globals.css:5385:    padding: 0 8px;
app/globals.css:5397:    height: auto;
app/globals.css:5401:    height: 300px;
app/globals.css:5406:    padding: 24px 20px;
app/globals.css:5410:    height: auto;
app/globals.css:5416:    line-height: 1.62;
app/globals.css:5430:    height: 132px;
app/globals.css:5431:    padding: 14px 0;
app/globals.css:5435:    min-height: 96px;
app/globals.css:5484:  padding: 46px 42px 36px;
app/globals.css:5489:  max-width: 680px;
app/globals.css:5492:  line-height: 1.12;
app/globals.css:5498:  max-width: 760px;
app/globals.css:5502:  line-height: 2.05;
app/globals.css:5514:  padding: 28px 0;
app/globals.css:5521:  line-height: 1.2;
app/globals.css:5529:  line-height: 1.45;
app/globals.css:5537:  line-height: 1.85;
app/globals.css:5541:  padding: 30px 34px;
app/globals.css:5549:  line-height: 1.35;
app/globals.css:5557:  line-height: 1.8;
app/globals.css:5563:  padding: 28px 34px 34px;
app/globals.css:5581:  line-height: 1.4;
app/globals.css:5601:  height: 44px;
app/globals.css:5602:  padding: 0 12px;
app/globals.css:5607:  min-height: 108px;
app/globals.css:5609:  padding: 11px 12px;
app/globals.css:5611:  line-height: 1.72;
app/globals.css:5637:  min-height: 44px;
app/globals.css:5638:  padding: 0 14px;
app/globals.css:5646:  line-height: 1.65;
app/globals.css:5651:  padding: 13px 14px;
app/globals.css:5656:  line-height: 1.8;
app/globals.css:5675:  line-height: 1.65;
app/globals.css:5681:  min-height: 44px;
app/globals.css:5682:  padding: 0 22px;
app/globals.css:5700:  padding: 56px 24px 42px;
app/globals.css:5722:  padding: 0 0 12px;
app/globals.css:5729:  line-height: 1.4;
app/globals.css:5740:  height: 2px;
app/globals.css:5747:  padding: 0;
app/globals.css:5755:  line-height: 1.6;
app/globals.css:5795:  line-height: 1.45;
app/globals.css:5803:  line-height: 1.75;
app/globals.css:5841:  height: 104px;
app/globals.css:5846:  line-height: 1.4;
app/globals.css:5851:  padding: 8px;
app/globals.css:5858:  line-height: 1.4;
app/globals.css:5870:  padding: 18px 24px 22px;
app/globals.css:5889:  line-height: 1.6;
app/globals.css:5895:@media (max-width: 1380px) {
app/globals.css:5897:    min-height: auto;
app/globals.css:5908:    min-height: auto;
app/globals.css:5914:    padding: 26px;
app/globals.css:5934:@media (max-width: 900px) {
app/globals.css:5936:    padding: 46px 16px;
app/globals.css:5957:    height: 240px;
app/globals.css:5974:    height: 180px;
app/globals.css:5995:    padding: 42px 18px 28px;
app/globals.css:6013:    padding: 16px 0;
app/globals.css:6021:    height: auto;
app/globals.css:6025:    line-height: 1;
app/globals.css:6035:    padding: 0 0 16px;
app/globals.css:6062:@media (max-width: 520px) {
app/globals.css:6070:    height: 96px;
app/globals.css:6130:  line-height: 1.35 !important;
app/globals.css:6177:  line-height: 1.45 !important;
app/globals.css:6247:  line-height: 1 !important;
app/globals.css:6280:  line-height: 1.12 !important;
app/globals.css:6308:  height: 2px !important;
app/globals.css:6337:  line-height: 1.7 !important;
app/globals.css:6341:  max-width: 92% !important;
app/globals.css:6366:  line-height: 1.75 !important;
app/globals.css:6369:  max-width: 94% !important;
app/globals.css:6405:@media (max-width: 768px) {
app/globals.css:6465:  max-width: 92% !important;
app/globals.css:6514:  max-width: 100% !important;
app/globals.css:6535:  max-width: calc(92% - 50px) !important;
app/globals.css:6567:  max-height: 0 !important;
app/globals.css:6584:  max-height: 0 !important;
app/globals.css:6601:  max-height: 120px !important;
app/globals.css:6617:  max-height: 180px !important;
app/globals.css:6654:@media (max-width: 768px) {
app/globals.css:6664:    max-width: calc(100% - 40px) !important;
app/globals.css:6694:    line-height: 1.15 !important;
app/globals.css:6698:    padding: 0 !important;
app/globals.css:6713:    height: 2px !important;
app/globals.css:6737:    max-height: none !important;
app/globals.css:6746:    line-height: 1.55 !important;
app/globals.css:6751:    max-width: 100% !important;
app/globals.css:6761:    max-height: none !important;
app/globals.css:6773:    line-height: 1.55 !important;
app/globals.css:6778:    max-width: 100% !important;
app/globals.css:6787:    max-height: none !important;
app/globals.css:6813:@media (max-width: 768px) {
app/globals.css:6824:    max-width: 116px !important;
app/globals.css:6827:    height: 38px !important;
app/globals.css:6828:    min-height: 38px !important;
```

## 四、资源中心和关于我们页面引入的 CSS

```text
app/about/layout.tsx:3:import "./about-banner.css";
app/resources/calculators/fluid-resistance/page.tsx:6:import calculatorStyles from "@/components/resources/fluid-resistance/FluidResistanceCalculator.module.css";
app/resources/calculators/fluid-resistance/page.tsx:8:import "@/app/resources/technical-articles/technical-articles.css";
app/resources/datasheets/page.tsx:24:import "@/app/resources/datasheets/datasheets.css"; // 引入规格书页面专用样式文件
app/resources/installation-guide/page.tsx:20:import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app/resources/installation-guide/page.tsx:23:import "./installation-guide.css";
app/resources/layout.tsx:3:import "./resource-banner.css";
app/resources/material-compatibility/page.tsx:28:import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";
app/resources/material-compatibility/page.tsx:33:import "./material-compatibility.css";
app/resources/news/[slug]/page.tsx:34:import "@/app/resources/news/news.css";
app/resources/news/page.tsx:19:import "./news.css";
app/resources/page.tsx:24:import "@/app/resources/datasheets/datasheets.css";
app/resources/selection-support/fitting-replacement/page.tsx:28:import "./fitting-replacement.css";
app/resources/selection-support/fitting-replacement/q20/[productCode]/page.tsx:30:import "./fitting-replacement-detail.css";
app/resources/technical-articles/[slug]/page.tsx:31:import "../technical-articles.css";
app/resources/technical-articles/[slug]/page.tsx:36:import "@/app/resources/news/news.css";
app/resources/technical-articles/page.tsx:14:import "./technical-articles.css";
components/resources/ResourceSearchBar.tsx:19:import styles from "./ResourceSearchBar.module.css";
components/resources/ResourceSupportCta.tsx:16:import styles from "./ResourceSupportCta.module.css";
components/resources/fluid-resistance/FluidResistanceCalculator.tsx:14:import styles from "./FluidResistanceCalculator.module.css";
components/resources/news/NewsArticleClient.tsx:34:import styles from "./NewsArticleClient.module.css";
components/resources/news/articles/Adlm2026DepartureArticle.tsx:1:import styles from "../NewsArticleClient.module.css";
components/resources/technical-articles/articles/CvKvMicrofluidicsArticle.tsx:1:import styles from "../../news/NewsArticleClient.module.css";
```

## 五、上一次 globals.css 覆盖代码

```text
app/globals.css:20922:/* MOBILE_RESOURCE_ABOUT_BANNER_420_START */
app/globals.css:21027:/* MOBILE_RESOURCE_ABOUT_BANNER_420_END */
```

