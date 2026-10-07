import 'server-only';
import Image from 'next/image';
import Link from 'next/link';
import SiteBreadcrumb from '@/components/common/SiteBreadcrumb';
import { applicationAreas, applicationChoices, applicationIndexPath } from '@/data/applications/application-index';
import reviewStyles from './EnglishReviewPage.module.css';
import styles from './ApplicationIndexPage.module.css';

export default function ApplicationIndexPage() {
  return <div className={reviewStyles.page} lang="zh-CN" data-review-locale="en">
    <section className={reviewStyles.hero} style={{ backgroundImage: 'linear-gradient(90deg, rgba(25, 51, 88, .87), rgba(35, 80, 118, .40)), url(/images/applications/ivd/ivd-hero-bg-1920x800-v001.webp)' }}>
      <div className={reviewStyles.heroInner}>
        <p className={reviewStyles.eyebrow}>FOREACH · 应用领域</p>
        <div className={reviewStyles.heroTitle}>液路元件与任务指南<br /><span>应用领域总览</span></div>
        <p>从设备与工作流程出发，了解泵、阀及液路元件在具体任务中的作用。</p>
      </div>
    </section>
    <SiteBreadcrumb variant="bar" ariaLabel="应用领域位置" items={[{ label: '首页', href: '/en/' }, { label: '应用领域' }]} />
    <main className={styles.main}>
      <section aria-labelledby="application-areas-heading">
        <div className={styles.intro}>
          <h1 id="application-areas-heading">按设备与工作流程选择应用领域</h1>
          <p>恒永达（FOREACH）面向仪器设备制造商及研发团队，提供用于体外诊断、生命科学、实验室自动化、分析仪器、环保监测和合成生物领域的液路元件与应用支持。产品涵盖泵、阀、采样针、管材、接头及液路监测元件，服务于样本与试剂计量、液体输送、流路切换、清洗和废液处理等任务。结合实际介质、工作液量、压力和安装要求，恒永达可协助客户开展产品选型、样品验证与定制开发。</p>
        </div>
        <div className={styles.grid}>
          {applicationAreas.map(area => <article className={styles.card} key={area.kind} aria-labelledby={`area-${area.kind}`}>
            <div className={styles.scene}>
              <Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 600px) calc(100vw - 40px), (max-width: 960px) 46vw, 31vw" />
            </div>
            <div className={styles.cardContent}>
              <h2 id={`area-${area.kind}`}><Link href={`${applicationIndexPath}${area.kind}/`} prefetch={false}>{area.title}</Link></h2>
              <p className={styles.description}>{area.description}</p>
              <nav aria-label={`${area.title}典型设备与任务`}>
                <ul className={`${styles.topics} home-flow-capability-row`}>{area.topics.map(item => <li key={item.href}><Link className="home-flow-inline-link" href={item.href} prefetch={false}><span className="brand-navy-button-motion">{item.label}</span></Link></li>)}</ul>
              </nav>
              <Link className={`${styles.domainLink} site-footer__contact-link`} href={`${applicationIndexPath}${area.kind}/`} prefetch={false} aria-label={`查看${area.title}详情`}>查看详情</Link>
            </div>
          </article>)}
        </div>
      </section>
      <section className={styles.guidance} aria-labelledby="application-choice-heading">
        <h2 id="application-choice-heading">同一项目涉及多个领域时，从哪里开始？</h2>
        <p className={styles.guidanceIntro}>按当前需要解决的设备或任务选择入口，相关领域的专题可以配合阅读。</p>
        <div className={styles.choices}>
          {applicationChoices.map(choice => <div className={styles.choice} key={choice.title}>
            <h3>{choice.title}</h3>
            <ul>{choice.routes.map(route => <li key={route.kind}>
              <span>{route.label}</span>
              <Link className="site-footer__contact-link" href={`${applicationIndexPath}${route.kind}/`} prefetch={false}>{route.domain}</Link>
            </li>)}</ul>
          </div>)}
        </div>
      </section>
    </main>
    <section className={reviewStyles.contact} aria-labelledby="application-contact-heading" style={{ backgroundImage: 'linear-gradient(105deg, rgba(12, 34, 70, .94), rgba(23, 51, 104, .83)), url(/images/applications/lab-automation/lab-automation-cta-bg-1920x520-v001.webp)' }}>
      <div className={reviewStyles.contactInner}>
        <div><h2 id="application-contact-heading">讨论您的仪器与液路需求</h2><p>提供设备类型、实际介质、工作液量或流量、各状态压力及所需功能，结合液路图和验证目标讨论适用配置。</p></div>
        <Link href="/en/contact/">讨论我的应用</Link>
      </div>
    </section>
  </div>;
}
