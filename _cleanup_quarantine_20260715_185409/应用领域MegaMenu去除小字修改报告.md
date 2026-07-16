# 应用领域 Mega Menu 去除小字修改报告

- 修改时间：2026-07-15 17:34:20
- 修改文件：`components/layout/SiteHeader.tsx`
- 备份文件：`.\components\layout\SiteHeader.tsx.bak_remove_application_desc_20260715_173419`
- 未修改 `data/navigation.ts`
- 未修改任何应用详情页

## 一、删除的原代码

```tsx
                                  <span className="site-nav-product-desc">
                                    {productMeta.description}
                                  </span>
```

## 二、修改结果

警告：文件中仍存在 `productMeta.description`：

```text
F:\WebsiteProjects\foreach-website-2026\components\layout\SiteHeader.tsx:1299:                                  : fallbackProductMeta.description,
```

## 三、Git Diff

```diff
diff --git a/components/layout/SiteHeader.tsx b/components/layout/SiteHeader.tsx
index 5e34b74..636b960 100644
--- a/components/layout/SiteHeader.tsx
+++ b/components/layout/SiteHeader.tsx
@@ -42,6 +42,15 @@ type OpenPanel = "none" | "language" | "mobileNav";
 // 璇存槑锛氳繖閲屽繀椤诲拰 proxy.ts 閲岀殑 LOCALE_COOKIE_NAME 淇濇寔涓€鑷? const LOCALE_COOKIE_NAME = "foreach_locale";
 
+const ENGLISH_LANGUAGE_LABELS: Record<LocaleCode, string> = {
+  "zh-CN": "Chinese",
+  en: "English",
+  es: "Spanish",
+  fr: "French",
+  ko: "Korean",
+  ru: "Russian",
+};
+
 /* ================================
    璇█璺緞鍓嶇紑閰嶇疆
    璇存槑锛?@@ -998,7 +1007,9 @@ const isFittingReplacementDetailPage =
                       handleLanguageItemClick(event, language.code, language.href)
                     }
                   >
-                    {language.label}
+                    {currentLocale === "en"
+                      ? ENGLISH_LANGUAGE_LABELS[language.code]
+                      : language.label}
                   </a>
                 ))}
               </div>
@@ -1316,9 +1327,6 @@ const isFittingReplacementDetailPage =
                                     {productMeta.title}
                                   </strong>
 
-                                  <span className="site-nav-product-desc">
-                                    {productMeta.description}
-                                  </span>
                                 </Link>
                               );
 
@@ -1425,3 +1433,4 @@ const isFittingReplacementDetailPage =
 
 
 
+
```

## 四、修改范围

- 保留应用图片
- 保留应用标题
- 保留应用跳转链接
- 保留左侧应用分类
- 删除标题下方的灰色说明小字
