/* =========================================================
   MaterialCompatibilityClient.tsx
   恒永达官网｜材料兼容页面交互组件

   文件路径：
   components/resources/material-compatibility/MaterialCompatibilityClient.tsx

   作用：
   1. 控制“材料兼容 / 材料特性 / 材质证明”三个表格切换
   2. 使用项目已有 SiteBreadcrumb 面包屑组件
   3. 使用项目已有 ResourceSearchBar 搜索栏组件
   4. 根据关键词筛选当前表格
   5. 根据当前数据自动判断中文 / 外语页面
   6. 不负责获取数据，数据由 page.tsx 通过 service 层传入
========================================================= */

"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";

import type {
  CertificationRow,
  CompatibilityRow,
  MaterialCompatibilityPageData,
  MaterialCompatibilityTab,
  MaterialFeatureRow,
  MaterialKey,
} from "@/data/resources/material-compatibility/material-compatibility.types";

/* =========================================================
   组件参数类型
========================================================= */
interface MaterialCompatibilityClientProps {
  data: MaterialCompatibilityPageData;
}

/* =========================================================
   官网支持的外语前缀

   说明：
   用于判断当前路径是否需要 /en /es /fr /ko /ru 前缀。
========================================================= */
const SUPPORTED_LOCALES = ["en", "es", "fr", "ko", "ru"];

/* =========================================================
   统一处理搜索关键词
========================================================= */
function normalizeSearchText(value: string) {
  return value.toLowerCase().trim();
}

/* =========================================================
   判断兼容性符号的样式类型
========================================================= */
function getCompatibilityMarkClass(value: string) {
  if (value === "+") return "is-good";
  if (value === "(+)") return "is-caution";
  if (value === "-") return "is-bad";

  return "";
}

/* =========================================================
   获取当前语言路径前缀

   示例：
   /resources/material-compatibility
   => ""

   /en/resources/material-compatibility
   => "/en"
========================================================= */
function getLocalePrefix(pathname: string | null) {
  if (!pathname) return "";

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return `/${firstSegment}`;
  }

  return "";
}

/* =========================================================
   主组件
========================================================= */
export default function MaterialCompatibilityClient({
  data,
}: MaterialCompatibilityClientProps) {
  const pathname = usePathname();
  const localePrefix = getLocalePrefix(pathname);

  /*
    判断是否中文页面：
    中文数据的第一个 Tab 是“材料兼容”。
    外语数据第一个 Tab 是 “Compatibility”。
  */
  const isChinesePage = data.tabs[0]?.label === "材料兼容";

  /* =========================================================
     多语言通用文案

     说明：
     当前外语页面统一使用英文技术数据和英文界面。
  ========================================================= */
  const commonCopy = isChinesePage
    ? {
        breadcrumbAriaLabel: "面包屑导航",
        breadcrumbHome: "首页",
        breadcrumbResources: "资源中心",
        breadcrumbCurrent: "材料兼容",
        searchButtonText: "搜索",
        recentLabel: "常用搜索",
        compatibilityTitle: "材料兼容性表",
        compatibilityDesc: "常见化学介质与工程塑料材料的兼容性参考。",
        compatibilityNote:
          "+ 可耐；　(+) 勉强可耐；　- 不耐。结果受浓度、温度和接触时间影响。",
        featuresTitle: "材料特性表",
        featuresDesc: "常用工程塑料材料的主要特性、适用温度与典型应用。",
        featuresNote:
          "材料特性为通用参考，实际应用需结合产品结构、介质环境及工况确认。",
        certificationTitle: "材质证明与认证支持",
        certificationDesc: "常用材料可支持的合规资料范围。",
        certificationNote: "具体认证资料以产品型号、材料批次及应用要求为准。",
        chemicalMedium: "化学介质",
        featureColumns: {
          material: "材料",
          name: "中文名称",
          feature: "主要特性",
          temperature: "适用温度",
          application: "典型应用",
        },
        emptyCompatibility: "暂无匹配数据，请更换关键词或联系技术支持确认。",
        emptyFeatures: "暂无匹配材料，请更换关键词。",
        emptyCertification: "暂无匹配认证资料，请更换关键词或联系销售确认。",
      }
    : {
        breadcrumbAriaLabel: "Breadcrumb",
        breadcrumbHome: "Home",
        breadcrumbResources: "Resources",
        breadcrumbCurrent: "Material Compatibility",
        searchButtonText: "Search",
        recentLabel: "Common Searches",
        compatibilityTitle: "Material Compatibility Table",
        compatibilityDesc:
          "Reference compatibility data for common chemical media and engineering plastics.",
        compatibilityNote:
          "+ Compatible;　(+) Limited compatibility;　- Not recommended. Results are affected by concentration, temperature, and contact time.",
        featuresTitle: "Material Properties",
        featuresDesc:
          "Key properties, temperature ranges, and typical applications of common engineering plastics.",
        featuresNote:
          "Material properties are for general reference only and should be confirmed based on product structure, media, and operating conditions.",
        certificationTitle: "Material Certificates and Compliance Support",
        certificationDesc:
          "Compliance documentation available for common engineering plastic materials.",
        certificationNote:
          "Applicable certificates depend on product model, material batch, and application requirements.",
        chemicalMedium: "Chemical Medium",
        featureColumns: {
          material: "Material",
          name: "Material Name",
          feature: "Key Properties",
          temperature: "Temperature Range",
          application: "Typical Applications",
        },
        emptyCompatibility:
          "No matching data. Please try another keyword or contact technical support.",
        emptyFeatures: "No matching material. Please try another keyword.",
        emptyCertification:
          "No matching certificate data. Please try another keyword or contact sales.",
      };

  /* =========================================================
     面包屑数据
  ========================================================= */
  const breadcrumbItems = [
    {
      label: commonCopy.breadcrumbHome,
      href: `${localePrefix}/`,
    },
    {
      label: commonCopy.breadcrumbResources,
      href: `${localePrefix}/resources`,
    },
    {
      label: commonCopy.breadcrumbCurrent,
      href: `${localePrefix}/resources/material-compatibility`,
    },
  ];

  /* 当前选中的 Tab，默认显示“材料兼容 / Compatibility” */
  const [activeTab, setActiveTab] =
    useState<MaterialCompatibilityTab>("compatibility");

  /* 搜索关键词 */
  const [keyword, setKeyword] = useState("");

  /* 当前 Tab 对应的搜索栏文案 */
  const currentSearchCopy = data.searchCopy[activeTab];

  /* =========================================================
     材料兼容表筛选结果
  ========================================================= */
  const filteredCompatibilityRows = useMemo(() => {
    const normalizedKeyword = normalizeSearchText(keyword);

    if (!normalizedKeyword) return data.compatibilityRows;

    return data.compatibilityRows.filter((row) =>
      normalizeSearchText(row.name).includes(normalizedKeyword),
    );
  }, [data.compatibilityRows, keyword]);

  /* =========================================================
     材料特性表筛选结果
  ========================================================= */
  const filteredFeatureRows = useMemo(() => {
    const normalizedKeyword = normalizeSearchText(keyword);

    if (!normalizedKeyword) return data.materialFeatureRows;

    return data.materialFeatureRows.filter((row) => {
      const searchText = [
        row.code,
        row.name,
        row.feature,
        row.temperature,
        row.application,
      ].join(" ");

      return normalizeSearchText(searchText).includes(normalizedKeyword);
    });
  }, [data.materialFeatureRows, keyword]);

  /* =========================================================
     材质证明表筛选结果
  ========================================================= */
  const filteredCertificationRows = useMemo(() => {
    const normalizedKeyword = normalizeSearchText(keyword);

    if (!normalizedKeyword) return data.certificationRows;

    return data.certificationRows.filter((row) => {
      const searchText = [
        row.material,
        ...data.certificationColumns,
        ...row.certs,
      ].join(" ");

      return normalizeSearchText(searchText).includes(normalizedKeyword);
    });
  }, [data.certificationColumns, data.certificationRows, keyword]);

  /* =========================================================
     切换 Tab
  ========================================================= */
  function handleTabChange(tab: MaterialCompatibilityTab) {
    setActiveTab(tab);
    setKeyword("");
  }

  /* =========================================================
     当前表格标题文案
  ========================================================= */
  function getTableCopy() {
    if (activeTab === "compatibility") {
      return {
        title: commonCopy.compatibilityTitle,
        description: commonCopy.compatibilityDesc,
        note: commonCopy.compatibilityNote,
      };
    }

    if (activeTab === "features") {
      return {
        title: commonCopy.featuresTitle,
        description: commonCopy.featuresDesc,
        note: commonCopy.featuresNote,
      };
    }

    return {
      title: commonCopy.certificationTitle,
      description: commonCopy.certificationDesc,
      note: commonCopy.certificationNote,
    };
  }

  const tableCopy = getTableCopy();

  return (
    <>
      {/* =====================================================
          面包屑导航
      ===================================================== */}
      <SiteBreadcrumb
        ariaLabel={commonCopy.breadcrumbAriaLabel}
        variant="bar"
        items={breadcrumbItems}
      />

      <section className="material-compatibility-main">
        <div className="material-compatibility-main__inner">
          {/* =====================================================
              顶部三按钮
          ===================================================== */}
          <div className="material-compatibility-tabs" role="tablist">
            {data.tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={
                  tab.key === activeTab
                    ? "material-compatibility-tab is-active"
                    : "material-compatibility-tab"
                }
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* =====================================================
              搜索栏
          ===================================================== */}
          <div className="material-compatibility-search">
            <ResourceSearchBar
              value={keyword}
              onChange={setKeyword}
              onSearch={setKeyword}
              placeholder={currentSearchCopy.placeholder}
              searchButtonText={commonCopy.searchButtonText}
              recentLabel={commonCopy.recentLabel}
              recentKeywords={currentSearchCopy.quickKeywords}
              showRecentKeywords={true}
            />
          </div>

          {/* =====================================================
              表格标题
          ===================================================== */}
          <div className="material-compatibility-head">
            <div>
              <h2>{tableCopy.title}</h2>
              <p>{tableCopy.description}</p>
            </div>
          </div>

          {/* =====================================================
              表格主体
          ===================================================== */}
          <div className="material-compatibility-panel">
            <div className="material-compatibility-note">
              <strong>{isChinesePage ? "注：" : "Note: "}</strong>
              {tableCopy.note}
            </div>

            {activeTab === "compatibility" && (
              <CompatibilityTable
                rows={filteredCompatibilityRows}
                materialColumns={data.materialColumns}
                chemicalMediumLabel={commonCopy.chemicalMedium}
                emptyText={commonCopy.emptyCompatibility}
              />
            )}

            {activeTab === "features" && (
              <FeatureTable
                rows={filteredFeatureRows}
                columns={commonCopy.featureColumns}
                emptyText={commonCopy.emptyFeatures}
              />
            )}

            {activeTab === "certification" && (
              <CertificationTable
                rows={filteredCertificationRows}
                columns={data.certificationColumns}
                emptyText={commonCopy.emptyCertification}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   材料兼容性表
========================================================= */
function CompatibilityTable({
  rows,
  materialColumns,
  chemicalMediumLabel,
  emptyText,
}: {
  rows: CompatibilityRow[];
  materialColumns: MaterialKey[];
  chemicalMediumLabel: string;
  emptyText: string;
}) {
  return (
    <div className="material-compatibility-table-wrap">
      <table className="material-compatibility-table">
        <thead>
          <tr>
            <th>{chemicalMediumLabel}</th>
            {materialColumns.map((material) => (
              <th key={material}>{material}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>

                {materialColumns.map((material) => {
                  const value = row.values[material] || "";

                  return (
                    <td key={material}>
                      <span
                        className={`material-compatibility-mark ${getCompatibilityMarkClass(
                          value,
                        )}`}
                      >
                        {value}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr className="is-empty">
              <td colSpan={materialColumns.length + 1}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   材料特性表
========================================================= */
function FeatureTable({
  rows,
  columns,
  emptyText,
}: {
  rows: MaterialFeatureRow[];
  columns: {
    material: string;
    name: string;
    feature: string;
    temperature: string;
    application: string;
  };
  emptyText: string;
}) {
  return (
    <div className="material-compatibility-table-wrap">
      <table className="material-compatibility-table material-compatibility-table--text">
        <thead>
          <tr>
            <th>{columns.material}</th>
            <th>{columns.name}</th>
            <th>{columns.feature}</th>
            <th>{columns.temperature}</th>
            <th>{columns.application}</th>
          </tr>
        </thead>

        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.code}>
                <td>{row.code}</td>
                <td>{row.name}</td>
                <td>{row.feature}</td>
                <td>{row.temperature}</td>
                <td>{row.application}</td>
              </tr>
            ))
          ) : (
            <tr className="is-empty">
              <td colSpan={5}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   材质证明表
========================================================= */
function CertificationTable({
  rows,
  columns,
  emptyText,
}: {
  rows: CertificationRow[];
  columns: string[];
  emptyText: string;
}) {
  return (
    <div className="material-compatibility-table-wrap">
      <table className="material-compatibility-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length ? (
            rows.map((row) => (
              <tr key={row.material}>
                <td>{row.material}</td>

                {row.certs.map((cert, index) => (
                  <td key={`${row.material}-${columns[index + 1]}`}>
                    {cert || ""}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="is-empty">
              <td colSpan={columns.length}>{emptyText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 