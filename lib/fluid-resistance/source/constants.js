// utils/constants.js - 物理常量与单位换算
const pi = Math.PI;
const g = 9.81;

// 流量单位换算常数（全部转换为 ml/min）
const GPM2MLMIN = 3785.41;
const LPM2MLMIN = 1000.0;
const M3HR2MLMIN = 16666.67;
const M3S2MLMIN = 60000000.0;
const ULMIN2MLMIN = 0.001;
const MLS2MLMIN = 60.0;
const ULS2MLMIN = 0.06;

// 压力单位换算常数（全部转换为 Pa）
const PSI2PA = 6894.76;
const KPA2PA = 1000.0;
const MPA2PA = 1000000.0;
const BAR2PA = 100000.0;
const MBAR2PA = 100.0;
const ATM2PA = 101325.0;
const MMHG2PA = 133.322;
const MMH2O2PA = 9.80665;

const CV_TO_DIAMETER_COEFF = 0.04626;

// 流态阈值
const Re_th_1 = 2000;
const Re_th_2 = 4000;
const DEFAULT_Re_c = 30;

// 预设非水非空气介质
const PRESET_FLUIDS = {
  "PBS 缓冲液":           { rho: 1005, mu: 0.0010, desc: "磷酸盐缓冲液" },
  "血液（全血）":          { rho: 1060, mu: 0.0035, desc: "人全血 Hct=45%" },
  "血浆":                  { rho: 1025, mu: 0.0015, desc: "人血浆 37°C" },
  "血清":                  { rho: 1025, mu: 0.0016, desc: "人血清 37°C" },
  "尿液（模拟）":          { rho: 1020, mu: 0.00105, desc: "人工尿液" },
  "脑脊液":                { rho: 1007, mu: 0.0010, desc: "人工脑脊液" },
  "DMEM 培养基":           { rho: 1007, mu: 0.0011, desc: "含 10% FBS" },
  "RPMI 1640 培养基":      { rho: 1005, mu: 0.0010, desc: "悬浮细胞培养" },
  "乙醇":                  { rho: 789,  mu: 0.0012, desc: "无水乙醇" },
  "异丙醇 (IPA)":          { rho: 786,  mu: 0.0020, desc: "微流控清洗常用" },
  "丙酮":                  { rho: 791,  mu: 0.00032, desc: "低粘度溶剂" },
  "L-HM 46 抗磨液压油":    { rho: 876, mu: 0.046, desc: "液压系统通用" },
  "L-HM 68 抗磨液压油":    { rho: 882, mu: 0.068, desc: "高压液压系统" },
  "L-TSA 46 汽轮机油":     { rho: 868, mu: 0.046, desc: "高速旋转机械" },
  "L-AN 100 全损耗系统用油": { rho: 890, mu: 0.100, desc: "一般机械润滑" },
  "导轨油 68":              { rho: 890, mu: 0.068, desc: "机床导轨/微动平台" },
  "甲基硅油 5cSt":         { rho: 960,  mu: 0.0048, desc: "低粘度硅油" },
  "甲基硅油 10cSt":        { rho: 960,  mu: 0.0096, desc: "低粘度硅油" },
  "甲基硅油 50cSt":        { rho: 960,  mu: 0.048, desc: "微流控连续相" },
  "甲基硅油 100cSt":       { rho: 965,  mu: 0.096, desc: "微流控连续相" },
  "甲基硅油 350cSt":       { rho: 970,  mu: 0.34, desc: "中等粘度阻尼液" },
  "甲基硅油 1000cSt":      { rho: 975,  mu: 0.97, desc: "高粘度阻尼液" },
  "氟硅油 300cSt":         { rho: 1260, mu: 0.38, desc: "耐溶剂密封/高低温润滑" },
  "苯基硅油 500cSt":       { rho: 1060, mu: 0.53, desc: "高温高真空润滑" },
  "矿物油":                { rho: 838,  mu: 0.030, desc: "数字PCR连续相" },
  "FC-40":                 { rho: 1855, mu: 0.0041, desc: "氟碳油 3M" },
  "HFE-7500":              { rho: 1614, mu: 0.00124, desc: "氟碳油 3M 数字PCR" },
  "全氟聚醚 PFPE":         { rho: 1890, mu: 0.080, desc: "耐强氧化剂/半导体用" },
  "Galden HT135":          { rho: 1700, mu: 0.0010, desc: "气相焊接/冷却液" },
  "PAO 4 合成基础油":      { rho: 820, mu: 0.017, desc: "合成润滑脂基油" },
  "PAO 40 合成基础油":     { rho: 850, mu: 0.400, desc: "高粘度合成润滑脂基油" },
  "矿物润滑脂基油":         { rho: 890, mu: 0.200, desc: "通用锂基脂基础油" },
  "Tween-20 水溶液 1%":    { rho: 1000, mu: 0.0010, desc: "微流控表面活性剂" },
  "SDS 水溶液 1%":         { rho: 1000, mu: 0.0010, desc: "电泳缓冲液" },
  "甘油水溶液 50%":        { rho: 1125, mu: 0.0060, desc: "甘油:水=1:1" },
  "甘油":                  { rho: 1261, mu: 1.490, desc: "纯甘油 20°C" },
  "Polyacrylamide 0.1%":  { rho: 1000, mu: 0.050, desc: "模拟高粘度生物流体" },
};

// 小孔入口形状预设
const ORIFICE_PRESETS = {
  "锐边薄壁孔": { Cd_inf: 0.611, Re_c: 30 },
  "45°倒角": { Cd_inf: 0.78, Re_c: 80 },
  "圆角 r/d=0.1": { Cd_inf: 0.85, Re_c: 200 },
  "圆角 r/d=0.2": { Cd_inf: 0.90, Re_c: 400 },
  "全圆角(喷嘴)": { Cd_inf: 0.96, Re_c: 600 },
};

module.exports = {
  pi, g,
  GPM2MLMIN, LPM2MLMIN, M3HR2MLMIN, M3S2MLMIN, ULMIN2MLMIN, MLS2MLMIN, ULS2MLMIN,
  PSI2PA, KPA2PA, MPA2PA, BAR2PA, MBAR2PA, ATM2PA, MMHG2PA, MMH2O2PA,
  CV_TO_DIAMETER_COEFF,
  Re_th_1, Re_th_2, DEFAULT_Re_c,
  PRESET_FLUIDS, ORIFICE_PRESETS
};
