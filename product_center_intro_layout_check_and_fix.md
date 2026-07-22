# 产品中心系列介绍区布局检查与修改说明

## 目标

本次先不直接改代码，先通过终端确认当前代码结构、组件位置、样式来源，再根据结果修改。

当前问题：

- `HaloFlx` 这类浅色英文只应作为背景水印/底纹。
- 背景水印不能参与正文排版，不能占用布局空间。
- 右侧文案区域需要从标题下方开始，尽量铺到页面内容容器的最右侧。
- 左侧产品图保持固定区域，右侧文字不要因为背景字被挤压。
- 文字段落不需要被限定在很窄的宽度内。

---

## 一、终端先检查当前分支和工作区

在 PowerShell 中执行：

```powershell
cd F:\WebsiteProjects\foreach-website-2026

git status --short
git branch --show-current
git log --oneline -5
```

目的：确认当前所在分支，以及是否有未提交修改。

---

## 二、查找产品中心页面相关代码

先查页面里“柱塞泵系列”这段内容在哪里：

```powershell
rg -n "柱塞泵系列|恒永达柱塞泵|产品覆盖|详情页查看|提交选型需求" .
```

如果没有结果，再扩大搜索：

```powershell
rg -n "HaloFlx|halo|watermark|categoryIntro|seriesIntro|productIntro|产品中心" app components data
```

重点关注可能出现的文件类型：

```text
app/products/page.tsx
app/[locale]/products/page.tsx
components/products/**
components/product-center/**
components/products/selection/**
components/products/category/**
```

---

## 三、查找当前样式类

搜索和介绍区相关的 CSS 类：

```powershell
rg -n "categoryIntro|seriesIntro|productIntro|watermark|HaloFlx|halo" components app --glob "*.css" --glob "*.module.css" --glob "*.tsx"
```

如果发现样式在某个 module.css 文件里，比如：

```text
components/products/selection/product-selection.module.css
components/products/category/product-category.module.css
components/products/product-center.module.css
```

继续单独查看：

```powershell
rg -n "categoryIntro|seriesIntro|productIntro|watermark|HaloFlx|halo" components\products -S
```

---

## 四、检查是否是 HaloFlx 占位导致正文变窄

找到 JSX/TSX 结构后，重点看 `HaloFlx` 或水印文字是不是这样写的：

```tsx
<div className={styles.categoryIntroContent}>
  <h1>柱塞泵系列</h1>
  <p>...</p>
  <div className={styles.watermark}>HaloFlx</div>
</div>
```

如果水印写在正文容器里面，并且没有 `position: absolute`，它就可能参与布局，导致右侧文案区域被挤压。

需要改成这种结构：

```tsx
<section className={styles.categoryIntro}>
  <div className={styles.categoryIntroImage}>
    {/* 左侧产品图 */}
  </div>

  <div className={styles.categoryIntroContent}>
    <h1 className={styles.categoryIntroTitle}>柱塞泵系列</h1>
    <div className={styles.categoryIntroDesc}>
      {/* 正文段落 */}
    </div>
  </div>

  <div className={styles.categoryIntroWatermark}>HaloFlx</div>
</section>
```

重点：水印要和正文容器同级，不要放在正文容器内部当普通元素。

---

## 五、检查 CSS 中是否限制了文案宽度

搜索这些属性：

```powershell
rg -n "max-width|width:|grid-template-columns|display:\s*grid|display:\s*flex|position:\s*absolute|overflow" components app --glob "*.css" --glob "*.module.css"
```

重点看介绍区相关样式是否存在这些问题：

```css
.categoryIntroContent {
  max-width: 720px;
}
```

或者：

```css
.categoryIntroDesc {
  max-width: 760px;
}
```

如果存在，就会导致文字只排到中间，不会延伸到右侧。

---

## 六、建议修改方向

### 1. 外层介绍区

外层必须是相对定位，并且隐藏溢出的背景水印：

```css
.categoryIntro {
  position: relative;
  display: grid;
  grid-template-columns: 460px minmax(0, 1fr);
  align-items: center;
  gap: 64px;
  padding: 56px 0 64px;
  border-top: 1px solid #dbe4f0;
  overflow: hidden;
}
```

说明：

- `460px` 给左侧产品图固定空间。
- `minmax(0, 1fr)` 让右侧文案吃满剩余空间。
- `overflow: hidden` 防止背景水印撑出容器。

如果现在左图区域更窄或更宽，可以保持原来的左栏宽度，只要右侧是 `minmax(0, 1fr)` 即可。

---

### 2. 右侧文案区域

```css
.categoryIntroContent {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: none;
  min-width: 0;
  padding-right: 0;
}
```

说明：

- `max-width: none` 是关键，取消正文最大宽度限制。
- `min-width: 0` 避免 grid 子项撑破。
- `z-index: 2` 让正文压在水印上方。

---

### 3. 正文段落区域

```css
.categoryIntroDesc {
  width: 100%;
  max-width: none;
  font-size: 17px;
  line-height: 2;
  color: #101828;
}

.categoryIntroDesc p {
  margin: 0 0 18px;
}

.categoryIntroDesc strong {
  font-weight: 700;
}
```

说明：

- 不要给正文设置很小的 `max-width`。
- 段落可以自然铺满右侧空间。

---

### 4. HaloFlx 背景水印

```css
.categoryIntroWatermark {
  position: absolute;
  right: 28px;
  bottom: 42px;
  z-index: 1;
  font-size: 96px;
  line-height: 1;
  font-weight: 800;
  color: rgba(9, 233, 180, 0.16);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}
```

说明：

- `position: absolute`：让它脱离布局，不占空间。
- `z-index: 1`：在背景层。
- 正文和图片使用 `z-index: 2`。
- `pointer-events: none`：不影响鼠标点击。

---

### 5. 左侧图片区域

```css
.categoryIntroImage {
  position: relative;
  z-index: 2;
}
```

如果图片现在大小正常，不需要调整图片样式。

---

## 七、移动端注意事项

移动端不要继续左右两栏，可以改为上下结构：

```css
@media (max-width: 768px) {
  .categoryIntro {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 36px 0 44px;
  }

  .categoryIntroWatermark {
    right: 12px;
    bottom: 24px;
    font-size: 58px;
    opacity: 0.8;
  }

  .categoryIntroTitle {
    font-size: 28px;
  }

  .categoryIntroDesc {
    font-size: 15px;
    line-height: 1.9;
  }
}
```

---

## 八、修改后验证

执行：

```powershell
npm run lint
npm run build
```

如果项目没有配置 lint，则至少执行：

```powershell
npm run build
```

然后本地启动：

```powershell
npm run dev
```

打开产品中心页面检查：

```text
/products
/zh-CN/products
/en/products
```

根据实际路由查看。

---

## 九、验收标准

修改完成后需要达到：

1. `HaloFlx` 只作为背景水印显示，不占布局空间。
2. 红框中的正文文案区域可以延伸到右侧内容容器边缘。
3. 正文不会被 `HaloFlx` 挤压或换行过早。
4. 左侧产品图和右侧文字仍然保持左右结构。
5. 页面没有横向滚动条。
6. 移动端不乱版，水印不遮挡正文。
7. `npm run build` 通过。

---

## 十、需要发回给我看的内容

请把下面几段终端输出发回来：

```powershell
git status --short
git branch --show-current
rg -n "柱塞泵系列|恒永达柱塞泵|HaloFlx|categoryIntro|seriesIntro|productIntro|watermark" app components data
```

并把找到的两个文件内容发回来：

1. 包含“柱塞泵系列”正文的 `.tsx` 文件。
2. 包含介绍区样式的 `.module.css` 或 `.css` 文件。

这样就能根据你的实际代码精确修改，不会盲改。
