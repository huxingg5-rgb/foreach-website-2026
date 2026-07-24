/* =========================================================
   AmapBlock.tsx
   恒永达官网｜高德地图组件

   文件路径：
   components/contact/AmapBlock.tsx

   作用：
   1. 加载高德地图 JS API 2.0
   2. 根据传入的经纬度显示公司位置
   3. 显示公司定位点和地址信息窗
   4. 使用同源 /_AMapService 代理隐藏高德安全密钥

   正式环境变量：
   1. NEXT_PUBLIC_AMAP_KEY：高德 Web 端 JS API Key，可以公开
   2. AMAP_SECURITY_JS_CODE：高德安全密钥，只配置在 Cloudflare 服务端

   注意：
   1. 浏览器代码不再读取 旧版前端安全密钥变量
   2. 本地 next dev 不提供 Cloudflare Pages Functions
   3. 后续通过 Cloudflare Pages 预览地址测试真实地图
========================================================= */

"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   扩展 window 类型
========================================================= */

declare global {
  interface Window {
    AMap?: any;

    _AMapSecurityConfig?: {
      serviceHost: string;
    };
  }
}

/* =========================================================
   地图组件参数
========================================================= */

type AmapBlockProps = {
  title: string;
  address: string;
  lng: number;
  lat: number;
  mapUrl: string;
  loadingText: string;
  errorText: string;
  openMapText: string;
};

/* 避免同一个页面重复加载高德地图脚本 */
let amapScriptLoadingPromise: Promise<void> | null = null;

/* =========================================================
   HTML 转义
========================================================= */

function escapeHtml(value: string) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   加载高德地图 JS API
========================================================= */

function loadAmapScript(key: string) {
  if (window.AMap) {
    return Promise.resolve();
  }

  if (amapScriptLoadingPromise) {
    return amapScriptLoadingPromise;
  }

  /*
   * 高德安全密钥不再写入浏览器代码。
   *
   * 高德 JS API 发起的服务请求会访问：
   * 当前域名/_AMapService/*
   *
   * Cloudflare Pages Function 再在服务端追加安全密钥。
   */
  window._AMapSecurityConfig = {
    serviceHost: `${window.location.origin}/_AMapService`,
  };

  amapScriptLoadingPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");

    script.id = "foreach-amap-js-api";

    script.src =
      `https://webapi.amap.com/maps?v=2.0&key=${encodeURIComponent(key)}`;

    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      resolve();
    };

    script.onerror = () => {
      /*
       * 加载失败后清空 Promise。
       * 后续重新进入页面时仍然可以重新尝试加载。
       */
      amapScriptLoadingPromise = null;

      reject(new Error("AMap script load failed"));
    };

    document.head.appendChild(script);
  });

  return amapScriptLoadingPromise;
}

/* =========================================================
   高德地图组件
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const mapInstanceRef = useRef<any>(null);

  const [mapStatus, setMapStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    /*
     * JS API Key 是浏览器端公开 Key。
     * 正式 Cloudflare 构建时配置 NEXT_PUBLIC_AMAP_KEY。
     */
    const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY;

    if (!amapKey) {
      setMapStatus("error");
      return;
    }

    if (!mapContainerRef.current) {
      setMapStatus("error");
      return;
    }

    let isUnmounted = false;

    setMapStatus("loading");

    loadAmapScript(amapKey)
      .then(() => {
        if (
          isUnmounted ||
          !mapContainerRef.current ||
          !window.AMap
        ) {
          return;
        }

        const centerPoint = [lng, lat];

        const map = new window.AMap.Map(
          mapContainerRef.current,
          {
            viewMode: "2D",
            zoom: 17,
            center: centerPoint,
            resizeEnable: true,
            mapStyle: "amap://styles/normal",
          },
        );

        mapInstanceRef.current = map;

        const marker = new window.AMap.Marker({
          position: centerPoint,
          title,
          anchor: "bottom-center",
        });

        map.add(marker);

        const safeTitle = escapeHtml(title);
        const safeAddress = escapeHtml(address);
        const safeMapUrl = escapeHtml(mapUrl);
        const safeOpenMapText = escapeHtml(openMapText);

        const infoWindow = new window.AMap.InfoWindow({
          offset: new window.AMap.Pixel(0, -32),

          content: `
            <div style="min-width:260px;padding:4px 2px 6px;">
              <strong
                style="
                  display:block;
                  color:#173368;
                  font-size:15px;
                  margin-bottom:8px;
                  font-weight:800;
                "
              >
                ${safeTitle}
              </strong>

              <span
                style="
                  display:block;
                  color:#4b5f78;
                  font-size:12px;
                  line-height:1.7;
                  margin-bottom:12px;
                "
              >
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
          `,
        });

        marker.on("click", () => {
          infoWindow.open(map, centerPoint);
        });

        infoWindow.open(map, centerPoint);

        map.setFitView(
          [marker],
          false,
          [60, 60, 60, 60],
        );

        setMapStatus("ready");
      })
      .catch(() => {
        if (!isUnmounted) {
          setMapStatus("error");
        }
      });

    return () => {
      isUnmounted = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [
    address,
    lat,
    lng,
    mapUrl,
    openMapText,
    title,
  ]);

  return (
    <section className="contact-map-panel">
      <div className="contact-amap-shell">
        <div
          ref={mapContainerRef}
          className="contact-amap-container"
          aria-label={title}
        />

        {mapStatus === "loading" ? (
          <div className="contact-amap-status">
            {loadingText}
          </div>
        ) : null}

        {mapStatus === "error" ? (
          <div className="contact-amap-status contact-amap-status-error">
            {errorText}
          </div>
        ) : null}
      </div>
    </section>
  );
}