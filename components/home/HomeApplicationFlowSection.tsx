// 这是关于 components/home/HomeApplicationFlowSection.tsx 的文件：用于管理首页第二屏“应用领域 × 核心部件”模块
// 这个文件的作用：负责首页第二屏的 PC 端滚动动画、电视屏展示、应用卡片、手机端应用切换和后端接口预留

"use client"; // 这个组件需要监听滚动、点击、hover 和未来接口请求，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内跳转
import { useEffect, useRef, useState, type CSSProperties } from "react"; // 引入 React Hook 和 CSS 样式类型

import { clamp, mapRange } from "@/components/home/HomeApplicationFlowUtils"; // 引入首页第二屏动画用到的数值计算工具函数

import { getLocaleAnchorPath, type LocaleCode } from "@/lib/i18n"; // 引入多语言锚点链接方法和语言类型

import { // 引入首页第二屏本地数据和多语言取值方法
  getHomeFlowText, // 根据当前语言读取对应文字
  homeApplicationFlowData, // 首页第二屏本地数据
} from "@/data/home-application-flow"; // 首页第二屏数据文件路径

/* ================================
   组件参数类型
================================ */

type HomeApplicationFlowSectionProps = { // 定义首页第二屏组件接收的参数类型
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
}; // 组件参数类型定义结束

/* ================================
   首页应用领域数据类型
================================ */

type HomeApplicationFlowData = typeof homeApplicationFlowData; // 直接复用本地数据的类型，方便后端数据以后保持一致

/* ================================
   后端接口返回格式预留
================================ */

type BackendHomeApplicationFlowResponse = // 定义后端接口可能返回的数据格式
  | { // 第一种格式：后端返回 { data: ... }
      data?: HomeApplicationFlowData; // data 字段可选，内容为首页第二屏完整数据
    } // 第一种格式结束
  | HomeApplicationFlowData; // 第二种格式：后端直接返回完整数据

/* ================================
   本地应用图片路径
================================ */

const LOCAL_APPLICATION_IMAGE_PATHS = { // 定义 public 目录下的 5 张应用领域图片路径
  ivd: "/images/applications/application-ivd.jpg", // IVD 体外诊断图片路径
  lifeScience: "/images/applications/application-life-science.jpg", // 生命科学图片路径
  syntheticBiology: "/images/applications/application-synthetic-biology.jpg", // 合成生物图片路径
  analyticalInstruments: "/images/applications/application-analytical-instruments.jpg", // 高端分析仪器图片路径
  labAutomation: "/images/applications/application-lab-automation.jpg", // 实验室自动化图片路径
}; // 本地应用图片路径定义结束

/* ================================
   判断是否为普通对象
================================ */

function isPlainObject(value: unknown): value is Record<string, unknown> { // 定义普通对象判断函数，用于校验后端返回数据
  return typeof value === "object" && value !== null && !Array.isArray(value); // 必须是对象、不能是 null、不能是数组
} // isPlainObject 函数结束

/* ================================
   后端数据简单校验
================================ */

function normalizeBackendFlowData( // 定义后端数据标准化函数
  payload: BackendHomeApplicationFlowResponse | unknown, // 接收后端返回内容，类型先按 unknown 处理更安全
): HomeApplicationFlowData | null { // 如果数据可用就返回完整数据，否则返回 null
  const possibleData = // 取出真正的数据内容
    isPlainObject(payload) && isPlainObject(payload.data) // 如果 payload 是对象，并且 payload.data 也是对象
      ? payload.data // 使用 payload.data 作为真实数据
      : payload; // 否则直接使用 payload 本身作为真实数据

  if (!isPlainObject(possibleData)) { // 如果真实数据不是普通对象
    return null; // 返回 null，表示后端数据不可用
  } // 对象判断结束

  const maybeData = possibleData as Partial<HomeApplicationFlowData>; // 把数据临时当作首页第二屏数据的一部分来检查

  const hasApplicationCards = Array.isArray(maybeData.applicationCards); // 检查 PC 端应用卡片是否为数组
  const hasMobileApplicationCards = Array.isArray(maybeData.mobileApplicationCards); // 检查手机端应用卡片是否为数组
  const hasProcessCards = Array.isArray(maybeData.processCards); // 检查底部流程卡片是否为数组
  const hasTvData = isPlainObject(maybeData.tv); // 检查电视屏数据是否为对象
  const hasSectionId = typeof maybeData.sectionId === "string"; // 检查 sectionId 是否为字符串

  if ( // 如果任何关键字段不符合要求
    !hasApplicationCards || // PC 端应用卡片缺失或格式错误
    !hasMobileApplicationCards || // 手机端应用卡片缺失或格式错误
    !hasProcessCards || // 流程卡片缺失或格式错误
    !hasTvData || // 电视屏数据缺失或格式错误
    !hasSectionId // sectionId 缺失或格式错误
  ) { // 数据结构检查条件结束
    return null; // 返回 null，表示继续使用本地数据
  } // 数据结构检查结束

  return maybeData as HomeApplicationFlowData; // 返回经过基础校验的数据
} // normalizeBackendFlowData 函数结束

/* ================================
   根据应用 key / className 匹配本地图片
================================ */

function getLocalApplicationImagePath(cardKey: string, className?: string) { // 定义本地应用图片匹配函数
  const normalizedName = `${cardKey} ${className ?? ""}` // 把 key 和 className 拼在一起，兼容不同命名
    .toLowerCase() // 统一转成小写，避免大小写影响判断
    .replaceAll("_", "-"); // 把下划线改成短横线，兼容不同写法

  if ( // 判断是否为 IVD 体外诊断
    normalizedName.includes("ivd") || // 包含 ivd
    normalizedName.includes("diagnostic") || // 包含 diagnostic
    normalizedName.includes("diagnostics") // 包含 diagnostics
  ) { // IVD 判断结束
    return LOCAL_APPLICATION_IMAGE_PATHS.ivd; // 返回 IVD 图片
  } // IVD 图片匹配结束

  if ( // 判断是否为生命科学
    normalizedName.includes("life-science") || // 包含 life-science
    normalizedName.includes("lifescience") // 包含 lifescience
  ) { // 生命科学判断结束
    return LOCAL_APPLICATION_IMAGE_PATHS.lifeScience; // 返回生命科学图片
  } // 生命科学图片匹配结束

  if ( // 判断是否为合成生物
    normalizedName.includes("synthetic-biology") || // 包含 synthetic-biology
    normalizedName.includes("syntheticbiology") // 包含 syntheticbiology
  ) { // 合成生物判断结束
    return LOCAL_APPLICATION_IMAGE_PATHS.syntheticBiology; // 返回合成生物图片
  } // 合成生物图片匹配结束

  if ( // 判断是否为高端分析仪器
    normalizedName.includes("analytical") || // 包含 analytical
    normalizedName.includes("analysis") || // 包含 analysis
    normalizedName.includes("instrument") // 包含 instrument
  ) { // 高端分析仪器判断结束
    return LOCAL_APPLICATION_IMAGE_PATHS.analyticalInstruments; // 返回高端分析仪器图片
  } // 高端分析仪器图片匹配结束

  if ( // 判断是否为实验室自动化
    normalizedName.includes("lab-automation") || // 包含 lab-automation
    normalizedName.includes("laboratory-automation") || // 包含 laboratory-automation
    normalizedName.includes("labautomation") || // 包含 labautomation
    normalizedName.includes("automation") // 包含 automation
  ) { // 实验室自动化判断结束
    return LOCAL_APPLICATION_IMAGE_PATHS.labAutomation; // 返回实验室自动化图片
  } // 实验室自动化图片匹配结束

  return null; // 没有匹配到本地图片时返回 null
} // getLocalApplicationImagePath 函数结束

/* ================================
   最终决定应用卡片使用哪张图
================================ */

function resolveApplicationImagePath( // 定义应用卡片图片最终路径函数
  card: { // 接收应用卡片的部分字段
    key: string; // 应用卡片 key
    className?: string; // 应用卡片 className，可选
    image: string; // 应用卡片默认图片路径
  }, // card 参数定义结束
  isUsingBackendData: boolean, // 是否正在使用后端数据
) { // 函数参数定义结束
  if (isUsingBackendData && card.image) { // 如果当前使用后端数据，并且后端返回了 image
    return card.image; // 优先使用后端图片
  } // 后端图片判断结束

  const localImagePath = getLocalApplicationImagePath(card.key, card.className); // 根据 key 和 className 匹配本地图片

  return localImagePath || card.image; // 优先返回本地匹配图片，匹配不到就回退到数据里的 image
} // resolveApplicationImagePath 函数结束

/* ================================
   卡片图片背景
================================ */

function createCardImageBackground(imagePath: string): CSSProperties { // 定义卡片背景图样式函数
  return { // 返回 React style 对象
    backgroundImage: `url("${imagePath}")`, // 设置背景图片路径
    backgroundSize: "cover", // 图片铺满卡片，必要时裁切
    backgroundPosition: "center center", // 图片从中心位置显示
    backgroundRepeat: "no-repeat", // 背景图不重复
  }; // style 对象结束
} // createCardImageBackground 函数结束

/* ================================
   PC 端电视机背景图
================================ */

function createTvBackground(imagePath: string): CSSProperties { // 定义 PC 端电视背景样式函数
  return { // 返回 React style 对象
    backgroundImage: `linear-gradient(135deg, rgba(3, 18, 42, 0.62), rgba(0, 38, 86, 0.72)), url("${imagePath}")`, // 叠加深蓝遮罩和背景图
    backgroundSize: "cover", // 背景图铺满电视区域
    backgroundPosition: "center center", // 背景图居中显示
    backgroundRepeat: "no-repeat", // 背景图不重复
  }; // style 对象结束
} // createTvBackground 函数结束

/* ================================
   手机端电视展示屏背景图
================================ */

function createMobileTvBackground(imagePath: string): CSSProperties { // 定义手机端电视背景样式函数
  const isGradient = // 判断传入的 imagePath 是否本身就是渐变背景
    imagePath.startsWith("linear-gradient") || // 判断是否为线性渐变
    imagePath.startsWith("radial-gradient"); // 判断是否为径向渐变

  if (isGradient) { // 如果传入的是渐变背景
    return { // 返回渐变背景 style
      backgroundImage: imagePath, // 直接使用渐变背景
      backgroundSize: "cover", // 背景铺满
      backgroundPosition: "center center", // 背景居中
      backgroundRepeat: "no-repeat", // 背景不重复
    }; // 渐变背景 style 结束
  } // 渐变背景判断结束

  return { // 如果传入的是图片路径，就返回图片背景 style
    backgroundImage: `linear-gradient(135deg, rgba(3, 18, 42, 0.72), rgba(0, 38, 86, 0.78)), url("${imagePath}")`, // 手机端叠加更深的蓝色遮罩
    backgroundSize: "cover", // 图片铺满手机端展示区域
    backgroundPosition: "center center", // 图片居中显示
    backgroundRepeat: "no-repeat", // 背景图不重复
  }; // 图片背景 style 结束
} // createMobileTvBackground 函数结束

/* ================================
   判断是否为手机 / 触摸设备
================================ */

function isTouchLikeDevice() { // 定义触摸设备判断函数
  if (typeof window === "undefined") { // 如果当前不是浏览器环境
    return false; // 返回 false，避免服务端渲染时报错
  } // 浏览器环境判断结束

  return window.matchMedia("(hover: none), (pointer: coarse), (max-width: 768px)").matches; // 判断是否为无 hover、粗指针或小屏设备
} // isTouchLikeDevice 函数结束

/**
 * HomeApplicationFlowSection
 * 首页第二屏：应用领域 × 核心部件
 */
export default function HomeApplicationFlowSection({ locale }: HomeApplicationFlowSectionProps) { // 定义并导出首页第二屏组件
  const sectionRef = useRef<HTMLElement | null>(null); // 第二屏整体区域 DOM 引用
  const tvStageRef = useRef<HTMLDivElement | null>(null); // PC 端电视舞台 DOM 引用

  const [flowData, setFlowData] = useState<HomeApplicationFlowData>(homeApplicationFlowData); // 应用领域模块当前使用的数据，默认使用本地数据
  const [isUsingBackendData, setIsUsingBackendData] = useState(false); // 标记当前数据是否来自后端
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null); // 旧手机端点击放大卡片逻辑使用的激活卡片 key
  const [activeMobileIndex, setActiveMobileIndex] = useState(0); // 手机端当前选中的应用按钮下标
  const [isMobileChanging, setIsMobileChanging] = useState(false); // 手机端切换动效状态

  const applicationsHref = getLocaleAnchorPath(locale, "applications"); // 根据当前语言生成应用领域按钮链接
  const productsHref = getLocaleAnchorPath(locale, "products"); // 根据当前语言生成产品中心按钮链接

  const mobileApplicationCards = flowData.mobileApplicationCards; // 读取手机端应用卡片数据
  const activeMobileApplication = mobileApplicationCards[activeMobileIndex] || mobileApplicationCards[0]; // 获取当前手机端选中的应用卡片，避免下标异常

  useEffect(() => { // 后端接口预留 effect 开始
    const shouldUseBackend = process.env.NEXT_PUBLIC_ENABLE_HOME_APPLICATION_FLOW_API === "true"; // 判断是否启用首页第二屏后端接口

    if (!shouldUseBackend) { // 如果没有启用后端接口
      return; // 直接返回，继续使用本地数据
    } // 后端接口开关判断结束

    const controller = new AbortController(); // 创建请求控制器，用于组件卸载时取消请求

    async function loadBackendFlowData() { // 定义异步加载后端数据函数
      try { // 开始捕获接口请求异常
        const response = await fetch(`/api/home/application-flow?locale=${encodeURIComponent(locale)}`, { // 请求首页第二屏后端接口
          method: "GET", // 使用 GET 请求
          signal: controller.signal, // 绑定取消请求信号
          cache: "no-store", // 不使用缓存，避免后台数据更新后前台不刷新
        }); // fetch 请求结束

        if (!response.ok) { // 如果接口状态不是 2xx
          return; // 直接返回，继续使用本地数据
        } // 接口状态判断结束

        const payload = (await response.json()) as unknown; // 读取接口返回 JSON
        const backendData = normalizeBackendFlowData(payload); // 对后端数据做基础结构校验

        if (!backendData) { // 如果后端数据不可用
          return; // 直接返回，继续使用本地数据
        } // 后端数据判断结束

        setFlowData(backendData); // 使用后端数据覆盖本地数据
        setIsUsingBackendData(true); // 标记当前使用后端数据
      } catch (error) { // 捕获请求异常
        if (error instanceof DOMException && error.name === "AbortError") { // 如果是主动取消请求
          return; // 不做错误处理
        } // AbortError 判断结束

        setFlowData(homeApplicationFlowData); // 接口异常时回退到本地数据
        setIsUsingBackendData(false); // 标记当前没有使用后端数据
      } // try/catch 结束
    } // loadBackendFlowData 函数结束

    loadBackendFlowData(); // 执行后端数据加载函数

    return () => { // 组件卸载或 locale 变化时执行清理函数
      controller.abort(); // 取消尚未完成的接口请求
    }; // 清理函数结束
  }, [locale]); // 当语言变化时重新尝试加载接口数据

  useEffect(() => { // PC / 移动端滚动动画 effect 开始
    let animationFrameId = 0; // 保存 requestAnimationFrame 的编号，方便取消

    function updateProductShowcase() { // 定义滚动动画更新函数
      const section = sectionRef.current; // 获取第二屏区域 DOM
      const tvStage = tvStageRef.current; // 获取电视舞台 DOM

      if (!section || !tvStage) { // 如果 DOM 还没有准备好
        return; // 直接返回
      } // DOM 判断结束

      const rect = section.getBoundingClientRect(); // 获取第二屏区域相对视口的位置
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight; // 获取浏览器视口高度
      const scrollDistance = section.offsetHeight - viewportHeight; // 计算第二屏可滚动距离

      if (scrollDistance <= 0) { // 如果没有可滚动距离
        return; // 直接返回
      } // 可滚动距离判断结束

      const progress = clamp(-rect.top / scrollDistance, 0, 1); // 计算滚动进度，并限制在 0 到 1 之间
      const isMobile = window.matchMedia("(max-width: 768px)").matches; // 判断当前是否为移动端宽度

      const shrink = isMobile // 根据设备类型计算收缩进度
        ? mapRange(progress, 0.34, 0.9, 0, 1) // 移动端收缩进度
        : mapRange(progress, 0.08, 0.7, 0, 1); // PC 端收缩进度

      const fade = isMobile // 根据设备类型计算淡出进度
        ? mapRange(progress, 0.64, 0.95, 0, 1) // 移动端淡出进度
        : shrink; // PC 端淡出进度直接沿用 shrink

      const slogan = isMobile // 根据设备类型计算 slogan 出现进度
        ? mapRange(progress, 0.78, 0.98, 0, 1) // 移动端 slogan 进度
        : mapRange(progress, 0.58, 0.9, 0, 1); // PC 端 slogan 进度

      tvStage.style.setProperty("--shrink", shrink.toFixed(4)); // 把收缩进度写入 CSS 变量
      tvStage.style.setProperty("--fade", fade.toFixed(4)); // 把淡出进度写入 CSS 变量
      tvStage.style.setProperty("--slogan", slogan.toFixed(4)); // 把 slogan 进度写入 CSS 变量

      if (fade > 0.92) { // 如果淡出进度接近完成
        tvStage.classList.add("is-finished"); // 给电视舞台添加完成状态 class
      } else { // 如果淡出进度还没完成
        tvStage.classList.remove("is-finished"); // 移除完成状态 class
      } // 完成状态判断结束
    } // updateProductShowcase 函数结束

    function requestUpdate() { // 定义滚动更新请求函数
      window.cancelAnimationFrame(animationFrameId); // 先取消上一帧，避免重复计算
      animationFrameId = window.requestAnimationFrame(updateProductShowcase); // 在下一帧执行动画更新
    } // requestUpdate 函数结束

    requestUpdate(); // 页面进入时先执行一次，保证初始状态正确

    window.addEventListener("scroll", requestUpdate, { passive: true }); // 监听页面滚动
    window.addEventListener("resize", requestUpdate); // 监听窗口尺寸变化

    return () => { // 组件卸载时执行清理
      window.cancelAnimationFrame(animationFrameId); // 取消动画帧
      window.removeEventListener("scroll", requestUpdate); // 移除滚动监听
      window.removeEventListener("resize", requestUpdate); // 移除窗口尺寸监听
    }; // 清理函数结束
  }, []); // 只在组件挂载时执行一次

  function handleCardClick(cardKey: string) { // 定义旧手机端卡片点击函数
    if (!isTouchLikeDevice()) { // 如果不是触摸设备
      return; // 不执行点击放大逻辑
    } // 触摸设备判断结束

    setActiveCardKey((currentKey) => { // 根据当前激活 key 更新卡片状态
      if (currentKey === cardKey) { // 如果当前点击的是已激活卡片
        return null; // 再点一次取消激活
      } // 重复点击判断结束

      return cardKey; // 激活当前点击的卡片
    }); // setActiveCardKey 结束
  } // handleCardClick 函数结束

  function handleStageClick() { // 定义点击舞台空白区域函数
    if (!isTouchLikeDevice()) { // 如果不是触摸设备
      return; // 不执行取消激活逻辑
    } // 触摸设备判断结束

    setActiveCardKey(null); // 取消当前激活卡片
  } // handleStageClick 函数结束

  function getMobileFillClass(cardKey: string) { // 定义旧手机端补位 class 计算函数
    if (!activeCardKey || activeCardKey === cardKey) { // 如果没有激活卡片，或当前卡片就是激活卡片
      return ""; // 不需要补位 class
    } // 激活状态判断结束

    const otherCards = flowData.applicationCards.filter((card) => card.key !== activeCardKey); // 找出除激活卡片外的其他卡片
    const fillIndex = otherCards.findIndex((card) => card.key === cardKey) + 1; // 计算当前卡片在其他卡片中的排序位置

    if (fillIndex <= 0) { // 如果没有找到当前卡片
      return ""; // 不返回补位 class
    } // fillIndex 判断结束

    return `mobile-fill-${fillIndex}`; // 返回移动端补位 class
  } // getMobileFillClass 函数结束

  function handleMobileApplicationChange(nextIndex: number) { // 定义手机端应用按钮切换函数
    if (nextIndex === activeMobileIndex) { // 如果点击的是当前已选中的按钮
      return; // 不重复切换
    } // 重复点击判断结束

    setIsMobileChanging(true); // 开启手机端切换动效状态

    window.setTimeout(() => { // 延迟切换内容，让淡出动画先执行
      setActiveMobileIndex(nextIndex); // 更新当前手机端选中应用下标
      setIsMobileChanging(false); // 关闭手机端切换动效状态
    }, 170); // 动效延迟 170ms
  } // handleMobileApplicationChange 函数结束

  return ( // 返回首页第二屏页面结构
    <section ref={sectionRef} className="home-flow-section" id={flowData.sectionId}> {/* 首页第二屏最外层区域 */}
      <div className="home-flow-sticky"> {/* 滚动吸附容器 */}
        <div className="home-flow-inner"> {/* 第二屏主要内容容器 */}
          <div className="home-flow-copy"> {/* 左侧文案区 */}
            <h2 className="home-flow-title"> {/* 第二屏标题 */}
              {getHomeFlowText(flowData.titleLine1, locale)} {/* 第二屏标题第一行 */}
              <br /> {/* 标题换行 */}
              {getHomeFlowText(flowData.titleLine2, locale)} {/* 第二屏标题第二行 */}
            </h2> {/* 第二屏标题结束 */}

            <p className="home-flow-desc"> {/* 第二屏描述文字 */}
              {getHomeFlowText(flowData.description, locale)} {/* 根据当前语言显示描述 */}
            </p> {/* 第二屏描述结束 */}

            <div className="home-flow-capability-row"> {/* 能力标签行 */}
              {flowData.capabilityTags.map((tag) => ( // 遍历能力标签 */}
                <span key={tag.key}> {/* 单个能力标签 */}
                  {getHomeFlowText(tag.label, locale)} {/* 能力标签文字 */}
                </span> // 单个能力标签结束
              ))} {/* 能力标签遍历结束 */}
            </div> {/* 能力标签行结束 */}

            <div className="home-flow-actions"> {/* 第二屏按钮区域 */}
              <Link href={applicationsHref} className="home-flow-btn"> {/* 应用领域按钮 */}
                {getHomeFlowText(flowData.actions.applicationsLabel, locale)} {/* 应用领域按钮文字 */}
              </Link> {/* 应用领域按钮结束 */}

              <Link href={productsHref} className="home-flow-btn"> {/* 产品中心按钮 */}
                {getHomeFlowText(flowData.actions.productsLabel, locale)} {/* 产品中心按钮文字 */}
              </Link> {/* 产品中心按钮结束 */}
            </div> {/* 第二屏按钮区域结束 */}
          </div> {/* 左侧文案区结束 */}

          <div ref={tvStageRef} className="home-flow-tv-stage" onClick={handleStageClick}> {/* PC 端右侧电视舞台 */}
            <div className="home-flow-tv-frame"> {/* PC 端电视外框 */}
              <div className="home-flow-tv-screen"> {/* PC 端电视屏幕 */}
                <div className="home-flow-tv-image" style={createTvBackground(flowData.tv.image)} /> {/* PC 端电视背景图 */}
                <div className="home-flow-tv-grid" /> {/* PC 端电视网格层 */}
                <div className="home-flow-tv-slogan"> {/* PC 端电视 slogan */}
                  {flowData.tv.sloganPrefix} <span>{flowData.tv.sloganHighlight}</span> {flowData.tv.sloganSuffix} {/* slogan 文字 */}
                </div> {/* PC 端电视 slogan 结束 */}
              </div> {/* PC 端电视屏幕结束 */}
            </div> {/* PC 端电视外框结束 */}

            {flowData.applicationCards.map((card) => { // 遍历 PC 端应用卡片
              const isActive = activeCardKey === card.key; // 判断当前卡片是否被触摸激活
              const mobileFillClass = getMobileFillClass(card.key); // 获取旧手机端补位 class
              const resolvedCardImage = resolveApplicationImagePath({ key: card.key, className: card.className, image: card.image }, isUsingBackendData); // 获取当前卡片最终图片路径

              return ( // 返回单个应用卡片
                <article // 应用卡片开始
                  key={card.key} // React 列表 key
                  className={["home-flow-industry-card", card.className, isActive ? "is-touch-active" : "", mobileFillClass].filter(Boolean).join(" ")} // 拼接应用卡片 class
                  onClick={(event) => { // 卡片点击事件
                    event.stopPropagation(); // 阻止事件冒泡到电视舞台
                    handleCardClick(card.key); // 执行卡片点击逻辑
                  }} // 卡片点击事件结束
                > {/* 应用卡片开始标签结束 */}
                  <div // 应用卡片图片层开始
                    className={`home-flow-industry-image image-${card.className}`} // 应用卡片图片 class
                    style={createCardImageBackground(resolvedCardImage)} // 应用卡片背景图 style
                    aria-label={getHomeFlowText(card.imageAlt, locale)} // 应用卡片图片无障碍说明
                  /> {/* 应用卡片图片层结束 */}

                  <h3>{getHomeFlowText(card.title, locale)}</h3> {/* 应用卡片标题 */}

                  <p>{getHomeFlowText(card.description, locale)}</p> {/* 应用卡片描述 */}

                  <div className="home-flow-tags"> {/* 应用卡片标签区域 */}
                    {card.tags.map((tag) => ( // 遍历卡片标签
                      <span key={tag.key}> {/* 单个卡片标签 */}
                        {getHomeFlowText(tag.label, locale)} {/* 卡片标签文字 */}
                      </span> // 单个卡片标签结束
                    ))} {/* 卡片标签遍历结束 */}
                  </div> {/* 应用卡片标签区域结束 */}
                </article> // 应用卡片结束
              ); // 单个应用卡片返回结束
            })} {/* PC 端应用卡片遍历结束 */}
          </div> {/* PC 端右侧电视舞台结束 */}

          <div className="home-flow-mobile-stage" aria-label={getHomeFlowText(flowData.ariaLabels.mobileApplications, locale)}> {/* 手机端应用展示区域 */}
            <section className="home-flow-mobile-tv-card" aria-label={getHomeFlowText(flowData.ariaLabels.applicationScreen, locale)}> {/* 手机端电视展示卡片 */}
              <div className="home-flow-mobile-tv-screen"> {/* 手机端电视屏幕 */}
                <div // 手机端电视背景图层开始
                  className={isMobileChanging ? "home-flow-mobile-tv-image-layer is-changing" : "home-flow-mobile-tv-image-layer"} // 根据切换状态设置背景层 class
                  style={createMobileTvBackground(resolveApplicationImagePath({ key: activeMobileApplication.key, image: activeMobileApplication.image }, isUsingBackendData))} // 手机端电视背景图 style
                /> {/* 手机端电视背景图层结束 */}

                <div className={isMobileChanging ? "home-flow-mobile-tv-content is-changing" : "home-flow-mobile-tv-content"}> {/* 手机端电视文字内容 */}
                  <div className="home-flow-mobile-tv-topline"> {/* 手机端电视顶部信息栏 */}
                    <span className="home-flow-mobile-tv-current-index"> {/* 手机端当前序号 */}
                      {String(activeMobileIndex + 1).padStart(2, "0")} / {String(mobileApplicationCards.length).padStart(2, "0")} {/* 当前序号 / 总数 */}
                    </span> {/* 手机端当前序号结束 */}

                    <span className="home-flow-mobile-tv-mini-slogan"> {/* 手机端 mini slogan */}
                      {flowData.tv.sloganPrefix} <span>{flowData.tv.sloganHighlight}</span> {flowData.tv.sloganSuffix} {/* 手机端 slogan 文字 */}
                    </span> {/* 手机端 mini slogan 结束 */}
                  </div> {/* 手机端电视顶部信息栏结束 */}

                  <div className="home-flow-mobile-tv-main"> {/* 手机端电视主要内容 */}
                    <h3 className="home-flow-mobile-tv-title"> {/* 手机端应用标题 */}
                      {getHomeFlowText(activeMobileApplication.title, locale)} {/* 当前应用标题 */}
                    </h3> {/* 手机端应用标题结束 */}

                    <p className="home-flow-mobile-tv-desc"> {/* 手机端应用描述 */}
                      {getHomeFlowText(activeMobileApplication.description, locale)} {/* 当前应用描述 */}
                    </p> {/* 手机端应用描述结束 */}

                    <div className="home-flow-mobile-tv-tags"> {/* 手机端应用标签区域 */}
                      {activeMobileApplication.tags.map((tag) => ( // 遍历当前应用标签
                        <span key={tag.key}> {/* 单个手机端应用标签 */}
                          {getHomeFlowText(tag.label, locale)} {/* 手机端应用标签文字 */}
                        </span> // 单个手机端应用标签结束
                      ))} {/* 手机端应用标签遍历结束 */}
                    </div> {/* 手机端应用标签区域结束 */}
                  </div> {/* 手机端电视主要内容结束 */}
                </div> {/* 手机端电视文字内容结束 */}
              </div> {/* 手机端电视屏幕结束 */}
            </section> {/* 手机端电视展示卡片结束 */}

            <section className="home-flow-mobile-app-tabs-wrap" aria-label={getHomeFlowText(flowData.ariaLabels.applicationTabs, locale)}> {/* 手机端应用按钮外层 */}
              <div className="home-flow-mobile-app-tabs"> {/* 手机端应用按钮列表 */}
                {mobileApplicationCards.map((item, index) => ( // 遍历手机端应用按钮
                  <button // 手机端应用按钮开始
                    key={item.key} // React 列表 key
                    type="button" // 设置为普通按钮，避免表单提交
                    className={index === activeMobileIndex ? "home-flow-mobile-app-tab is-active" : "home-flow-mobile-app-tab"} // 当前按钮激活时增加 is-active
                    onClick={() => handleMobileApplicationChange(index)} // 点击后切换手机端应用
                  > {/* 手机端应用按钮开始标签结束 */}
                    {getHomeFlowText(item.title, locale)} {/* 手机端应用按钮文字 */}
                  </button> // 手机端应用按钮结束
                ))} {/* 手机端应用按钮遍历结束 */}
              </div> {/* 手机端应用按钮列表结束 */}
            </section> {/* 手机端应用按钮外层结束 */}
          </div> {/* 手机端应用展示区域结束 */}
        </div> {/* 第二屏主要内容容器结束 */}

        <div className="home-flow-process-gallery"> {/* 底部流程卡片外层 */}
          <div className="home-flow-process-grid"> {/* 底部流程卡片网格 */}
            {flowData.processCards.map((card) => ( // 遍历底部流程卡片
              <div className="home-flow-process-card" key={card.key}> {/* 单个流程卡片 */}
                <strong>{getHomeFlowText(card.title, locale)}</strong> {/* 流程卡片标题 */}
                <span>{getHomeFlowText(card.description, locale)}</span> {/* 流程卡片描述 */}
              </div> // 单个流程卡片结束
            ))} {/* 底部流程卡片遍历结束 */}
          </div> {/* 底部流程卡片网格结束 */}
        </div> {/* 底部流程卡片外层结束 */}
      </div> {/* 滚动吸附容器结束 */}
    </section> // 首页第二屏最外层区域结束
  ); // 返回首页第二屏页面结构结束
} // HomeApplicationFlowSection 组件结束