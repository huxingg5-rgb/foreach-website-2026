/* =========================================================
   AmapBlock.tsx
   恒永达官网｜高德地图组件

   文件路径：
   components/contact/AmapBlock.tsx

   作用：
   1. 加载高德地图真实底图
   2. 根据传入的经纬度显示公司位置
   3. 显示公司定位点 Marker
   4. 页面打开后默认显示公司地址信息窗
   5. 点击定位点后可再次打开公司地址信息窗
   6. 地图中的按钮文案、加载文案、错误文案都由外部传入，方便多语言复用

   注意：
   1. 这个组件只负责地图
   2. 不负责联系方式整体布局
   3. 高德 Key 和安全密钥来自 .env.local
   4. 因为使用 window、document，所以必须是客户端组件
========================================================= */

"use client"; // 当前组件需要在浏览器端运行，所以必须声明为客户端组件

import { useEffect, useRef, useState } from "react"; // 引入 React 的副作用、DOM 引用和状态管理


/* =========================================================
   扩展 window 类型
   说明：
   1. 高德地图脚本加载成功后，会在 window 上挂载 AMap
   2. 高德安全密钥需要提前挂载到 window._AMapSecurityConfig
   3. TypeScript 默认不知道这两个字段，所以这里手动声明
========================================================= */

declare global {
  interface Window {
    AMap?: any; // 高德地图 JS API 对象，脚本加载后会自动挂载
    _AMapSecurityConfig?: {
      securityJsCode: string; // 高德地图安全密钥
    };
  }
}


/* =========================================================
   地图组件参数类型
   说明：
   1. title / address / lng / lat / mapUrl 来自 contact.zh.ts 或 contact.intl.ts
   2. loadingText / errorText / openMapText 用于多语言显示
========================================================= */

type AmapBlockProps = {
  title: string; // 地图标题，例如中文“公司位置”，英文“Company Location”
  address: string; // 公司详细地址
  lng: number; // 高德地图经度
  lat: number; // 高德地图纬度
  mapUrl: string; // 点击后打开高德地图的外链
  loadingText: string; // 地图加载中的提示文案
  errorText: string; // 地图加载失败的提示文案
  openMapText: string; // 信息窗里“打开地图”按钮文案
};


/* =========================================================
   高德地图脚本加载缓存
   说明：
   1. 避免组件多次渲染时重复插入 script
   2. 如果已经在加载中，就复用同一个 Promise
========================================================= */

let amapScriptLoadingPromise: Promise<void> | null = null; // 保存高德地图脚本加载状态


/* =========================================================
   HTML 转义函数
   说明：
   1. 信息窗 content 是 HTML 字符串
   2. 标题、地址、链接文案放进去前要做转义
   3. 避免特殊字符破坏 HTML 结构
========================================================= */

function escapeHtml(value: string) {
  return String(value) // 确保传入内容是字符串
    .replaceAll("&", "&amp;") // 转义 &
    .replaceAll("<", "&lt;") // 转义 <
    .replaceAll(">", "&gt;") // 转义 >
    .replaceAll('"', "&quot;") // 转义双引号
    .replaceAll("'", "&#039;"); // 转义单引号
}


/* =========================================================
   加载高德地图 JS API
   说明：
   1. 如果 window.AMap 已存在，说明地图脚本已经加载
   2. 如果正在加载，就复用已有 Promise
   3. 如果没有加载，则创建 script 标签加载高德 JS API
========================================================= */

function loadAmapScript(key: string, securityJsCode: string) {
  if (window.AMap) {
    return Promise.resolve(); // 如果高德地图对象已经存在，直接返回成功
  }

  if (amapScriptLoadingPromise) {
    return amapScriptLoadingPromise; // 如果脚本正在加载，则复用当前加载任务
  }

  window._AMapSecurityConfig = {
    securityJsCode, // 在加载高德 JS 前设置安全密钥
  };

  amapScriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script"); // 创建 script 标签

    script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}`; // 高德 JS API 2.0 地址

    script.async = true; // 异步加载，避免阻塞页面渲染

    script.onload = () => {
      resolve(); // 脚本加载成功
    };

    script.onerror = () => {
      reject(new Error("AMap script load failed")); // 脚本加载失败
    };

    document.head.appendChild(script); // 把 script 标签插入页面 head
  });

  return amapScriptLoadingPromise; // 返回脚本加载任务
}


/* =========================================================
   AmapBlock 组件
========================================================= */

export default function AmapBlock({
  title,
  address,
  lng,
  lat,
  mapUrl,
  loadingText,
  errorText,
  openMapText,
}: AmapBlockProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // 保存地图容器 DOM

  const mapInstanceRef = useRef<any>(null); // 保存地图实例，组件卸载时需要销毁

  const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  ); // 地图状态：loading 加载中，ready 成功，error 失败

  useEffect(() => {
    const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY; // 从 .env.local 读取高德 Key

    const securityJsCode =
      process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE; // 从 .env.local 读取高德安全密钥

    if (!amapKey || !securityJsCode) {
      setMapStatus("error"); // 如果没有配置环境变量，显示错误状态
      return;
    }

    if (!mapContainerRef.current) {
      setMapStatus("error"); // 如果地图容器不存在，显示错误状态
      return;
    }

    let isUnmounted = false; // 用于避免组件卸载后继续操作地图

    loadAmapScript(amapKey, securityJsCode)
      .then(() => {
        if (isUnmounted || !mapContainerRef.current || !window.AMap) {
          return; // 组件卸载、容器不存在或 AMap 不存在时停止
        }

        const centerPoint = [lng, lat]; // 高德地图坐标格式是 [经度, 纬度]

        const map = new window.AMap.Map(mapContainerRef.current, {
          viewMode: "2D", // 使用 2D 地图，兼容性更稳
          zoom: 17, // 地图缩放等级，适合公司位置展示
          center: centerPoint, // 设置地图中心点
          resizeEnable: true, // 容器大小变化时地图自动适配
          mapStyle: "amap://styles/normal", // 使用高德默认真实地图样式
        });

        mapInstanceRef.current = map; // 保存地图实例

        const marker = new window.AMap.Marker({
          position: centerPoint, // 定位点位置
          title, // 鼠标悬停在定位点时显示标题
          anchor: "bottom-center", // 定位点底部居中对准坐标
        });

        map.add(marker); // 把定位点添加到地图

        const safeTitle = escapeHtml(title); // 转义标题
        const safeAddress = escapeHtml(address); // 转义地址
        const safeMapUrl = escapeHtml(mapUrl); // 转义地图外链
        const safeOpenMapText = escapeHtml(openMapText); // 转义打开地图按钮文案

        const infoWindow = new window.AMap.InfoWindow({
          offset: new window.AMap.Pixel(0, -32), // 信息窗向上偏移，避免遮住定位点
          content: `
            <div style="min-width:260px;padding:4px 2px 6px;">
              <strong style="display:block;color:#173368;font-size:15px;margin-bottom:8px;font-weight:800;">
                ${safeTitle}
              </strong>
              <span style="display:block;color:#4b5f78;font-size:12px;line-height:1.7;margin-bottom:12px;">
                ${safeAddress}
              </span>
              <a
                href="${safeMapUrl}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display:inline-flex;
                  align-items:center;
                  justify-content:center;
                  min-height:34px;
                  padding:0 14px;
                  border:1px solid rgba(23,51,104,0.32);
                  border-radius:8px;
                  color:#173368;
                  font-size:12px;
                  font-weight:700;
                  text-decoration:none;
                  background:#ffffff;
                "
              >
                ${safeOpenMapText}
              </a>
            </div>
          `, // 高德地图信息窗 HTML 内容
        });

        marker.on("click", () => {
          infoWindow.open(map, centerPoint); // 点击定位点时打开信息窗
        });

        infoWindow.open(map, centerPoint); // 页面加载完成后默认显示信息窗

        map.setFitView([marker], false, [60, 60, 60, 60]); // 让地图自动适配定位点位置，并保留四周边距

        setMapStatus("ready"); // 标记地图加载成功
      })
      .catch(() => {
        if (!isUnmounted) {
          setMapStatus("error"); // 地图脚本或初始化失败时显示错误状态
        }
      });

    return () => {
      isUnmounted = true; // 组件卸载时标记为 true

      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy(); // 销毁地图实例，避免内存泄漏
        mapInstanceRef.current = null; // 清空地图实例引用
      }
    };
  }, [address, errorText, lat, lng, loadingText, mapUrl, openMapText, title]); // 这些数据变化时重新初始化地图

  return (
    <section className="contact-map-panel">
      {/* 高德地图外层容器 */}
      <div className="contact-amap-shell">
        {/* 高德地图真实渲染容器 */}
        <div
          ref={mapContainerRef}
          className="contact-amap-container"
          aria-label={title}
        />

        {/* 地图加载中提示 */}
        {mapStatus === "loading" ? (
          <div className="contact-amap-status">{loadingText}</div>
        ) : null}

        {/* 地图加载失败提示 */}
        {mapStatus === "error" ? (
          <div className="contact-amap-status contact-amap-status-error">
            {errorText}
          </div>
        ) : null}
      </div>
    </section>
  );
} 