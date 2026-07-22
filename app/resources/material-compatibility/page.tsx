/* =========================================================
   page.tsx
   恒永达官网｜材料兼容页面入口

   文件路径：
   app/resources/material-compatibility/page.tsx

   说明：
   1. 这是中文材料兼容页面入口
   2. 页面数据统一从 service 层获取
   3. 页面主体交互交给 MaterialCompatibilityClient
   4. 搜索栏在 Client 组件中使用已有 ResourceSearchBar
   5. 底部联系我们使用已有 ResourceSupportCta
   6. Banner 高度在 CSS 中固定为 520px
========================================================= */

import type { Metadata } from "next";

import MaterialCompatibilityClient from "@/components/resources/material-compatibility/MaterialCompatibilityClient";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import { getMaterialCompatibilityPageData } from "@/services/resources/material-compatibility/getMaterialCompatibilityPageData";

/*
  引入已有接头替代查询页面中的 ResourceSearchBar 样式。
  ResourceSearchBar 默认使用 frp-* class：
  frp-search-panel / frp-search-row / frp-search-input / frp-history-row 等。
*/
import "@/app/resources/selection-support/fitting-replacement/fitting-replacement.css";

/*
  材料兼容页面自己的专用样式。 
*/
import "./material-compatibility.css";

/* =========================================================
   SEO 元信息
========================================================= */
export const metadata: Metadata = {
    title: "材料兼容性查询｜恒永达",
    description:
        "恒永达材料兼容性查询，提供常见化学介质与工程塑料材料的兼容性、材料特性及材质证明参考。",
};

/* =========================================================
   中文材料兼容页面
========================================================= */
export default async function MaterialCompatibilityPage() {
    const pageData = await getMaterialCompatibilityPageData();

    return (
        <main className="material-compatibility-page">
            {/* =====================================================
          Banner 区域
          说明：
          1. Banner 高度由 material-compatibility.css 控制为 520px
          2. 当前不在这里写面包屑，后面接你已有的面包屑组件
      ===================================================== */}
            <section className="material-compatibility-banner resource-center-banner">
                <div className="material-compatibility-banner__inner resource-center-banner__inner">
                    <div className="material-compatibility-banner__content resource-center-banner__content">
                        <p className="material-compatibility-banner__eyebrow resource-center-banner__eyebrow">
                            {pageData.banner.eyebrow}
                        </p>

                        <h1 className="resource-center-banner__title">
                            {pageData.banner.title}
                            <span>{pageData.banner.highlight}</span>
                        </h1>

                        <p className="material-compatibility-banner__desc resource-center-banner__description">
                            {pageData.banner.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* =====================================================
          主体内容
          说明：
          1. 三个按钮：材料兼容 / 材料特性 / 材质证明
          2. 搜索栏：使用已有 ResourceSearchBar
          3. 表格：由 Client 组件根据当前 Tab 渲染
      ===================================================== */}
            <MaterialCompatibilityClient data={pageData} />

            {/* =====================================================
          底部支持区域
          说明：
          使用你项目已有的 ResourceSupportCta 组件，不单独写 CTA 样式
      ===================================================== */}

            <ResourceSupportCta
                title="不确定材料是否适合？"
                description="提交介质名称、浓度、温度、压力和接触时间，恒永达技术团队可协助进行材料选型确认。"
                buttonText="联系技术支持"
                href="/contact"
            />
        </main>
    );
} 
