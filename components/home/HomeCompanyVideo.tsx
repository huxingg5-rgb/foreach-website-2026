// 这是关于 components/home/HomeCompanyVideo.tsx 的文件：用于管理首页公司介绍视频区域
// 这个文件的作用：把公司介绍视频、视频封面、播放按钮从 HomeCompanyStrengthSection.tsx 中拆出来
// 后端预留说明：这个组件不写死视频地址和封面地址，而是通过 props 接收 videoSrc 和 posterSrc，后期后台接口返回数据后可以直接传进来

"use client"; // 这个组件需要点击播放视频、隐藏封面、控制 video 标签，所以必须是客户端组件

import { useRef, useState } from "react"; // 引入 React 的 useRef 和 useState，用于控制 video 元素和封面显示状态

type HomeCompanyVideoProps = { // 定义 HomeCompanyVideo 组件接收的参数类型
  videoSrc: string; // 视频文件地址，当前可以传本地路径，后期可以传后端返回的视频 URL
  posterSrc: string; // 视频封面图片地址，当前可以传本地路径，后期可以传后端返回的封面 URL
  videoAriaLabel: string; // 视频区域的无障碍说明文字，方便浏览器和搜索引擎理解
  videoPlayAriaLabel: string; // 播放按钮的无障碍说明文字
  posterAlt: string; // 视频封面图片的 alt 文字，方便 SEO 和无障碍识别
  fallbackText?: string; // 浏览器无法播放视频时显示的多语言提示
}; // HomeCompanyVideoProps 参数类型定义结束

export default function HomeCompanyVideo({ // 定义并导出 HomeCompanyVideo 公司视频组件
  videoSrc, // 接收视频文件地址
  posterSrc, // 接收视频封面图片地址
  videoAriaLabel, // 接收视频区域无障碍说明
  videoPlayAriaLabel, // 接收播放按钮无障碍说明
  posterAlt, // 接收视频封面图片 alt 文案
  fallbackText = "当前浏览器不支持视频播放。",
}: HomeCompanyVideoProps) { // HomeCompanyVideo 组件参数定义结束
  const companyVideoRef = useRef<HTMLVideoElement | null>(null); // 创建 video 标签引用，用于点击封面后控制视频播放

  const [isCompanyVideoPosterVisible, setIsCompanyVideoPosterVisible] = useState(true); // 控制视频封面是否显示，默认显示封面

  function handleCompanyVideoPosterClick() { // 定义点击视频封面后的处理函数
    const video = companyVideoRef.current; // 获取当前 video DOM 元素

    setIsCompanyVideoPosterVisible(false); // 点击封面后先隐藏封面层

    if (video) { // 如果 video 元素存在
      video.controls = true; // 显示浏览器自带的视频控制条
      video.muted = true; // 设置视频开始播放时静音，用户后续可以在控制条里手动打开声音
      void video.play(); // 播放视频，并用 void 忽略 Promise 返回值，避免控制台提示
    } // video 存在判断结束
  } // handleCompanyVideoPosterClick 函数结束

  return ( // 返回公司视频区域结构
    <div className="home-company-video-wrap" aria-label={videoAriaLabel}>
      {/* 公司介绍视频本体 */}
      <video
        ref={companyVideoRef}
        className="home-company-video-media"
        src={videoSrc}
        poster={posterSrc}
        controls={!isCompanyVideoPosterVisible}
        preload="metadata"
        playsInline
        muted
        onPlay={() => setIsCompanyVideoPosterVisible(false)}
        onPlaying={() => setIsCompanyVideoPosterVisible(false)}
        onEnded={() => setIsCompanyVideoPosterVisible(true)}
        onPause={(event) => {
          // 只有视频回到开头附近时，才重新显示封面
          if (event.currentTarget.currentTime <= 0.1) {
            setIsCompanyVideoPosterVisible(true);
          }
        }}
      >
        {fallbackText}
      </video>

      {/* 公司介绍视频封面层 */}
      {isCompanyVideoPosterVisible && (
        <button
          className="home-company-video-poster-button"
          type="button"
          aria-label={videoPlayAriaLabel}
          onClick={handleCompanyVideoPosterClick}
        >
          {/* 视频封面图片 */}
          <img
            className="home-company-video-poster-image"
            src={posterSrc}
            alt={posterAlt}
          />

          {/* 视频播放按钮图标 */}
          <span className="home-company-video-play" aria-hidden="true" />
        </button>
      )}
    </div>
  ); // 返回公司视频区域结构结束
} // HomeCompanyVideo 组件结束
