// 这是关于 components/home/HomeApplicationFlowUtils.ts 的文件：用于存放首页第二屏动画中会用到的通用计算函数
// 这个文件的作用：把 HomeApplicationFlowSection.tsx 里的纯计算函数拆出来，让主组件文件更清晰

export function clamp(value: number, min: number, max: number) { // 定义 clamp 函数，用于把一个数值限制在最小值和最大值之间
  return Math.min(Math.max(value, min), max); // 先保证 value 不小于 min，再保证结果不大于 max
} // clamp 函数结束

export function mapRange( // 定义 mapRange 函数，用于把一个区间内的数值映射到另一个区间
  value: number, // 当前输入值，例如滚动进度
  inMin: number, // 输入区间的最小值
  inMax: number, // 输入区间的最大值
  outMin: number, // 输出区间的最小值
  outMax: number, // 输出区间的最大值
) { // mapRange 函数参数结束
  const progress = clamp((value - inMin) / (inMax - inMin), 0, 1); // 计算当前值在输入区间中的比例，并限制在 0 到 1 之间

  return outMin + (outMax - outMin) * progress; // 根据比例计算输出区间中的对应值
} // mapRange 函数结束