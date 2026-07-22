# 倒刺接头详情页接入错误报告

生成时间：2026-07-12 06:07:05

## 执行结果

- Node退出码：1
- 详情数据文件：不存在
- 详情页面文件：不存在
- 卡片详情链接代码：未写入

## Node真实错误

    F:\WebsiteProjects\foreach-website-2026\scripts\products\setup-barbed-fitting-detail-like-hard-tube.cjs:831
          `${detail.model} ${detail.name || detail.title || "倒刺接头"} | FOREACH`,
           ^
    
    SyntaxError: Unexpected identifier '$'
        at wrapSafe (node:internal/modules/cjs/loader:1763:18)
        at Module._compile (node:internal/modules/cjs/loader:1804:20)
        at Object..js (node:internal/modules/cjs/loader:1961:10)
        at Module.load (node:internal/modules/cjs/loader:1553:32)
        at Module._load (node:internal/modules/cjs/loader:1355:12)
        at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
        at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
        at node:internal/main/run_main_module:33:47
    
    Node.js v24.15.0
    

## 检查路径

- data\products\generated\fittings\barbed-fittings\detail\index.json
- app\products\fittings\barbed-fittings\[slug]\page.tsx
- components\products\selection\ProductSelectionClient.tsx
