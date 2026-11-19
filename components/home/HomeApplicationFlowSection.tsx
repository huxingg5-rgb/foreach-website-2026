// components/home/HomeApplicationFlowSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./HomeApplicationFlowSection.module.css";

import type { LocaleCode } from "@/lib/i18n";
import { localizeValvelessPumpCategoryPath } from "@/data/products/selection/valveless-pump-routes";

import {
  getHomeApplicationFlowApiPath, // 引入首页第二屏后端接口路径生成函数
  getHomeFlowText, // 根据当前语言读取对应文字
  homeApplicationFlowData, // 首页第二屏本地数据
  homeSelectionToolCards,
} from "@/data/home-application-flow"; // 首页第二屏数据文件路径

/* ================================
   组件参数类型
================================ */
type HomeApplicationFlowSectionProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
};

/* ================================
   首页应用领域数据类型

   说明：
   1. 这里直接复用本地数据 homeApplicationFlowData 的类型
   2. 以后后端返回的数据结构也建议尽量保持这个格式
   3. 这样前端组件不用大改，只需要换数据来源
================================ */
type HomeApplicationFlowData = typeof homeApplicationFlowData;

/* ================================
   后端接口返回格式预留

   说明：
   以后后端可以返回下面两种格式之一：

   方式一：
   {
     "data": { ...完整的 homeApplicationFlowData 结构... }
   }

   方式二：
   { ...完整的 homeApplicationFlowData 结构... }
================================ */
type BackendHomeApplicationFlowResponse =
  | {
      data?: HomeApplicationFlowData;
    }
  | HomeApplicationFlowData;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/* ================================
   后端数据简单校验

   说明：
   1. 这里不是严格校验，只做最基础的结构判断
   2. 如果接口返回不完整，就继续使用本地数据
   3. 这样第一阶段前端上线更稳定
================================ */
function normalizeBackendFlowData(
  payload: BackendHomeApplicationFlowResponse | unknown,
): HomeApplicationFlowData | null {
  const possibleData =
    isPlainObject(payload) && isPlainObject(payload.data)
      ? payload.data
      : payload;

  if (!isPlainObject(possibleData)) {
    return null;
  }

  const maybeData = possibleData as Partial<HomeApplicationFlowData>;

  const hasApplicationCards = Array.isArray(maybeData.applicationCards);
  const hasMobileApplicationCards = Array.isArray(
    maybeData.mobileApplicationCards,
  );
  const hasProcessCards = Array.isArray(maybeData.processCards);
  const hasTvData = isPlainObject(maybeData.tv);
  const hasSectionId = typeof maybeData.sectionId === "string";

  if (
    !hasApplicationCards ||
    !hasMobileApplicationCards ||
    !hasProcessCards ||
    !hasTvData ||
    !hasSectionId
  ) {
    return null;
  }

  return maybeData as HomeApplicationFlowData;
}

const HOME_FLOW_PRODUCT_PATHS: Record<string, string> = {
  /* 产品能力标签 */
  "precision-pump": "/products/pumps",
  "fluid-control-valve": "/products/valves",
  sensor: "/products?category=control",
  "tubing-component": "/products/tubing",
  "tubing-components": "/products/tubing",
  "fluidic-connection": "/products/fittings",

  /* 泵系列 */
  "syringe-pump": "/products/pumps/syringe-pumps",
  "pipetting-pump": "/products/pumps/pipetting-pumps",
  "pipette-pump": "/products/pumps/pipetting-pumps",
  "diaphragm-pump": "/products/pumps/miniature-diaphragm-pumps",
  "piston-pump": "/products/pumps/piston-pump",
  "plunger-pump": "/products/pumps/piston-pump",
  "valveless-pump": "/products/pumps/valveless-pumps",

  "multi-channel-pump": "/products/pumps/syringe-pumps",

  /* 阀系列 */
  "rotary-valve": "/products/valves/rotary-valves",
  "high-pressure-valve": "/products/valves/high-pressure-valves",
  "solenoid-valve": "/products/valves/solenoid-valves",

  /* 针系列 */
  "sampling-probe": "/products/probes/sampling-probes",
  "sample-probe": "/products/probes/sampling-probes",
  "wash-probe": "/products/probes/wash-probes",
  "piercing-probe": "/products/probes/piercing-probes",

  /* 管路系列 */
  "peek-tubing": "/products/tubing/peek-tubing",
  "fep-tubing": "/products/tubing/fep-tubing",
  "pfa-tubing": "/products/tubing/pfa-tubing",
  "ptfe-tubing": "/products/tubing/ptfe-tubing",
  "pvc-tubing": "/products/tubing/pvc-tubing",
  "tpu-tubing": "/products/tubing/tpu-tubing",

  /*
   * 压力传感器与气泡检测器目前属于智控系列，
   * 但正式独立分类路由还没有建立。
   * 当前先进入产品中心，避免生成不存在的 URL。
   */
  "pressure-sensor": "/products?category=control",
  "bubble-detector": "/products?category=control",
  "bubble-sensor": "/products?category=control",
  "control-module": "/products?category=control",
};

function getHomeFlowProductHref(
  key: string,
  locale: LocaleCode,
) {
  const chinesePath =
    localizeValvelessPumpCategoryPath(HOME_FLOW_PRODUCT_PATHS[key] || "/products", locale);

  if (locale === "en" && chinesePath === "/products?category=control") {
    return "/en/products/control/";
  }

  if (locale === "zh-CN") {
    return chinesePath;
  }

  if (key === "pressure-sensor") return `/${locale}/products/control/pdm5-pressure-sensor/`;
  if (key === "bubble-detector" || key === "bubble-sensor") {
    return `/${locale}/products/control/air-bubble-detectors/abd/`;
  }

  return `/${locale}${chinesePath}`;
}

export default function HomeApplicationFlowSection({
  locale,
}: HomeApplicationFlowSectionProps) {
  const [flowData, setFlowData] = useState<HomeApplicationFlowData>(
    homeApplicationFlowData,
  );

  useEffect(() => {
    const shouldUseBackend =
      process.env.NEXT_PUBLIC_ENABLE_HOME_APPLICATION_FLOW_API === "true";

    if (!shouldUseBackend) {
      return;
    }

    const controller = new AbortController();

    async function loadBackendFlowData() {
      try {
        const response = await fetch(
          getHomeApplicationFlowApiPath(locale),
          {
            method: "GET",
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as unknown;
        const backendData = normalizeBackendFlowData(payload);

        if (!backendData) {
          return;
        }

        setFlowData(backendData);
      } catch (error) {
        // AbortError 是组件卸载或语言切换时主动取消请求，不需要提示
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        // 接口异常时，继续使用本地数据，避免页面崩掉
        setFlowData(homeApplicationFlowData);
      }
    }

    loadBackendFlowData();

    return () => {
      controller.abort();
    };
  }, [locale]);

  return (
    <section
      className={`home-flow-section ${styles.section}`}
      id={flowData.sectionId}
      aria-labelledby="home-flow-title"
    >
      <div className={`home-flow-sticky ${styles.content}`}>
        <div className={`home-flow-inner ${styles.layout}`}>
          <div className={styles.visual}>
            <Image
              src="/images/home/company-bottom-bg.webp"
              alt="恒永达技术人员操作流体设备"
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1600px) 50vw, 805px"
            />
          </div>

          <div className="home-flow-copy">
            <h2 className="home-flow-title" id="home-flow-title">
              {getHomeFlowText(flowData.titleLine1, locale)}
              {locale !== "zh-CN" && <br />}
              {getHomeFlowText(flowData.titleLine2, locale)}
            </h2>

            <p className="home-flow-desc">
              {getHomeFlowText(flowData.description, locale)}
            </p>

            <div className="home-flow-capability-row">
              {flowData.capabilityTags.map((tag) => (
                <Link
                  key={tag.key}
                  href={getHomeFlowProductHref(tag.key, locale)}
                  data-analytics-section="home_application_flow"
                  data-analytics-product-id={tag.key}
                  prefetch={false}
                  className="home-flow-inline-link"
                  aria-label={getHomeFlowText(tag.label, locale)}
                >
                  <span className="brand-navy-button-motion">
                    {getHomeFlowText(tag.label, locale)}
                  </span>
                </Link>
              ))}
            </div>

            <div className="home-flow-actions" data-home-actions="true">
              <a
                href={locale === "zh-CN" ? "/applications/ivd" : `/${locale}/applications/`}
                className="home-flow-btn brand-navy-button-motion"
                data-home-action="applications"
              >
                {getHomeFlowText(flowData.actions.applicationsLabel, locale)}
              </a>
              <a
                href={locale === "zh-CN" ? "/products" : `/${locale}/products`}
                className="home-flow-btn brand-navy-button-motion"
                data-home-action="products"
              >
                {getHomeFlowText(flowData.actions.productsLabel, locale)}
              </a>
            </div>
          </div>
        </div>

        <div className="home-flow-process-gallery">
          <div className="home-flow-process-grid">
            {homeSelectionToolCards.map((card) => (
              <Link
                className={`home-flow-process-card ${styles.toolCard}`}
                key={card.key}
                href={card.href}
                prefetch={false}
              >
                <strong>{getHomeFlowText(card.title, locale)}</strong>
                <span>{getHomeFlowText(card.description, locale)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
