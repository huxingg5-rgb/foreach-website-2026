/* =========================================================
   page.tsx
   恒永达官网｜资源中心入口重定向

   文件路径：
   app/resources/page.tsx

   页面访问地址：
   /resources

   作用：
   1. 当前阶段不单独制作资源中心首页
   2. 用户访问 /resources 时，直接跳转到 /resources/datasheets
   3. 保证导航中的“资源中心”即使链接到 /resources，也能进入规格书下载页面
========================================================= */

import { redirect } from "next/navigation";

export default function ResourcesPage() {
  redirect("/resources/datasheets");
} 