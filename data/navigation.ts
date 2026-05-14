// data/navigation.ts

// 顶部导航菜单数据
// 说明：Top 栏是全站通用组件，导航内容统一放这里
// 后续如果要改导航名称、顺序、路径，只改这个文件即可
export const navigationItems = [
  {
    label: "首页", // 导航显示名称
    href: "/", // 首页路径
  },
  {
    label: "产品中心", // 产品中心页面
    href: "/products", // 产品中心路径
  },
  {
    label: "应用领域", // 应用领域页面
    href: "/applications", // 应用领域路径
  },
  {
    label: "资源中心", // 资源中心页面，后期放资料下载、技术文章、选型指南
    href: "/resources", // 资源中心路径
  },
  {
    label: "关于我们", // 公司介绍页面
    href: "/about", // 关于我们路径
  },
];