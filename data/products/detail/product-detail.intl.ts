type DetailRecord = Record<string, any>;

const HAN_PATTERN = /[\u3400-\u9fff]/;
const HAN_GLOBAL_PATTERN = /[\u3400-\u9fff]+/g;

const EXACT_TRANSLATIONS: Record<string, string> = {
  "名称": "Name",
  "规格": "Specifications",
  "定制确认项": "Custom Confirmation Items",
  "产品系列": "Product Series",
  "产品类别": "Product Category",
  "产品种类": "Product Type",
  "型号": "Model",
  "商品编码": "Product Code",
  "行程": "Stroke",
  "通道数": "Number of Channels",
  "全行程运行时间": "Full-Stroke Travel Time",
  "线性速度": "Linear Speed",
  "分辨率": "Resolution",
  "阀头材质": "Valve Head Material",
  "泵头材质": "Pump Head Material",
  "柱塞材质": "Plunger Material",
  "膜片材质": "Diaphragm Material",
  "阀片材质": "Valve Material",
  "主体材质": "Body Material",
  "外壳材质": "Housing Material",
  "接液材质": "Wetted Materials",
  "标准接口": "Standard Port",
  "接口方式": "Port Type",
  "通讯类型": "Communication Interface",
  "通讯接口": "Communication Interface",
  "通信接口": "Communication Interface",
  "工作温度": "Operating Temperature",
  "使用压力范围": "Operating Pressure Range",
  "压力范围": "Pressure Range",
  "流量范围": "Flow Range",
  "量程": "Volume Range",
  "精确度": "Accuracy",
  "重复性": "Repeatability",
  "使用寿命": "Service Life",
  "安装尺寸": "Installation Dimensions",
  "安装方式": "Mounting Method",
  "接口形式": "Connection Type",
  "端口形式": "Port Arrangement",
  "阀门结构": "Valve Configuration",
  "阀位结构": "Valve-Position Configuration",
  "接管内径": "Tube ID",
  "接管外径": "Tube OD",
  "流道内径": "Flow Path ID",
  "材质": "Material",
  "壳体材质": "Housing Material",
  "密封件材质": "Seal Material",
  "密封圈材质": "Seal Material",
  "产品型号": "Product Model",
  "产品类型": "Product Type",
  "产品名称": "Product Name",
  "产品结构": "Product Structure",
  "颜色": "Color",
  "介质温度": "Fluid Temperature",
  "使用条件": "Operating Conditions",
  "使用流体": "Working Fluid",
  "使用流体温度": "Working Fluid Temperature",
  "使用环境温度": "Operating Ambient Temperature",
  "环境温度": "Ambient Temperature",
  "环境湿度": "Ambient Humidity",
  "储运温度": "Storage and Transport Temperature",
  "存储环境": "Storage Environment",
  "运行环境": "Operating Environment",
  "运行噪音": "Operating Noise",
  "工作噪音": "Operating Noise",
  "响应时间-标准型": "Response Time - Standard Version",
  "响应时间-带节能回路": "Response Time - Energy-Saving Circuit",
  "切阀时间": "Valve Switching Time",
  "相邻流道切换时间": "Adjacent-Channel Switching Time",
  "堵头材质": "Plug Material",
  "螺母材质": "Nut Material",
  "密封方式": "Sealing Method",
  "密封类型": "Seal Type",
  "密封结构": "Sealing Structure",
  "表面处理": "Surface Treatment",
  "附加配置": "Additional Configuration",
  "配置方式": "Configuration Method",
  "通道数量": "Number of Channels",
  "阀室内容积": "Valve Chamber Volume",
  "阀结构": "Valve Structure",
  "转阀耐压": "Rotary Valve Pressure Rating",
  "孔口直径": "Orifice Diameter",
  "内体积": "Internal Volume",
  "整体尺寸": "Overall Dimensions",
  "总体尺寸": "Overall Dimensions",
  "尺寸/mm": "Dimensions (mm)",
  "安装尺寸及螺纹参数": "Mounting Dimensions and Thread Parameters",
  "安装结构": "Mounting Structure",
  "连接结构": "Connection Structure",
  "工作液路接口": "Working-Fluid Port",
  "清洗液路接口": "Wash-Fluid Port",
  "吸头适配": "Tip Compatibility",
  "适配吸头": "Compatible Tips",
  "吸头有无检测": "Tip Presence Detection",
  "尖端堵塞检测": "Tip Clog Detection",
  "自动脱吸头": "Automatic Tip Ejection",
  "移液方式": "Pipetting Method",
  "排气结构": "Venting Structure",
  "排废结构": "Waste-Discharge Structure",
  "反应容器": "Reaction Vessel",
  "清洗对象": "Cleaning Target",
  "液面探测": "Liquid-Level Detection",
  "混匀条件": "Mixing Conditions",
  "反应杯": "Reaction Cup",
  "表面涂层": "Surface Coating",
  "搅拌时产生气泡或飞溅": "bubbles or splashing during mixing",
  "耗材材料": "Consumable Material",
  "穿刺取液": "Piercing Aspiration",
  "针尖": "Probe Tip",
  "侧孔": "Side Port",
  "清洗站": "Cleaning Station",
  "低残留工艺": "Low-Residue Process",
  "防残留工艺": "Anti-Residue Process",
  "工艺可行性": "Process Feasibility",
  "安装与运动": "Installation and Motion",
  "驱动设计": "Drive Design",
  "额定功率": "Rated Power",
  "额定压力": "Rated Pressure",
  "额定电压": "Rated Voltage",
  "电机类型": "Motor Type",
  "额定电流": "Rated Current",
  "电源要求": "Power Requirements",
  "功耗-标准型": "Power Consumption - Standard Version",
  "线圈绝缘等级": "Coil Insulation Class",
  "电机转速": "Motor Speed",
  "转速": "Speed",
  "电机/驱动器": "Motor/Driver",
  "级联能力": "Cascading Capability",
  "吸水性（%）": "Water Absorption (%)",
  "浓缩液份数": "Concentrate Portions",
  "稀释液份数": "Diluent Portions",
  "稀释比": "Dilution Ratio",
  "排量范围": "Displacement Range",
  "标称量程": "Nominal Volume Range",
  "定量分辨率": "Dispensing Resolution",
  "满量程步数": "Full-Stroke Step Count",
  "准确度": "Accuracy",
  "准确性": "Accuracy",
  "低温脆化（℃）": "Low-Temperature Brittleness (°C)",
  "密度（g/cm³）": "Density (g/cm³)",
  "线膨胀系数（cm/cm/℃）": "Coefficient of Thermal Expansion (cm/cm/°C)",
  "融化温度（℃）": "Melting Temperature (°C)",
  "滤网材质": "Filter Material",
  "过滤精度": "Filtration Accuracy",
  "通径": "Orifice Diameter",
  "通道直径": "Channel Diameter",
  "内容积": "Internal Volume",
  "螺纹接口": "Threaded Port",
  "耐压": "Pressure Rating",
  "触液材质": "Wetted Materials",
  "初始位置": "Initial Position",
  "切换时间": "Switching Time",
  "寿命": "Service Life",
  "电机减速比": "Motor Gear Ratio",
  "波特率": "Baud Rate",
  "适用电源": "Power Supply",
  "最大功率": "Maximum Power",
  "空载流量": "Free-Flow Rate",
  "自吸高度": "Self-Priming Lift",
  "工作介质": "Working Fluid",
  "接管规格": "Tubing Specification",
  "噪音": "Noise Level",
  "工作环境温度": "Operating Ambient Temperature",
  "工作环境相对湿度": "Operating Relative Humidity",
  "工作相对湿度": "Operating Relative Humidity",
  "存储环境温度": "Storage Temperature",
  "存储环境相对湿度": "Storage Relative Humidity",
  "外形尺寸": "Overall Dimensions",
  "重量": "Weight",
  "介电常数（KV/mm）": "Dielectric Strength (kV/mm)",
  "弯曲强度（MPa）": "Flexural Strength (MPa)",
  "弯曲强度（Mpa）": "Flexural Strength (MPa)",
  "拉伸强度（MPa）": "Tensile Strength (MPa)",
  "拉伸强度（Mpa）": "Tensile Strength (MPa)",
  "接管内径1": "Tube ID 1",
  "接管内径2": "Tube ID 2",
  "接管内径3": "Tube ID 3",
  "流量 QMax，mL/Min": "Flow Qmax (mL/min)",
  "流量 QMin，mL/Min": "Flow Qmin (mL/min)",
  "流量系数CV": "Flow Coefficient (Cv)",
  "浓缩液定量（μL）": "Concentrate Volume (μL)",
  "稀释液定量（μL）": "Diluent Volume (μL)",
  "硬度（Shore A）": "Hardness (Shore A)",
  "硬度（Shore D）": "Hardness (Shore D)",
  "硬度（Shore）": "Hardness (Shore)",
  "脱 TIP 头步数": "Tip Ejection Steps",
  "退 TIP 头推力": "Tip Retraction Force",
  "试剂A 工作液路接口": "Reagent A Working-Fluid Port",
  "试剂A 清洗液路接口": "Reagent A Wash-Fluid Port",
  "试剂A 端耐压": "Reagent A Port Pressure Rating",
  "试剂B 工作液路接口": "Reagent B Working-Fluid Port",
  "试剂B 清洗液路接口": "Reagent B Wash-Fluid Port",
  "试剂B 端耐压": "Reagent B Port Pressure Rating",
  "配液量（mL）": "Liquid Preparation Volume (mL)",
  "接管内径或螺纹": "Tube ID or Thread",
  "螺纹规格": "Thread Size",
  "公母端": "Gender",
  "阀门配置": "Valve Configuration",
  "形状": "Shape",
  "完整型号": "Complete Model Numbers",
  "恒永达型号": "FOREACH Model",
  "常见问题": "Frequently Asked Questions",
  "常见应用": "Typical Applications",
  "规格参数": "Specifications",
  "是": "Yes",
  "否": "No",
  "可选": "Optional",
  "默认": "Standard",
  "定制": "Custom",
  "公头": "Male",
  "母头": "Female",
  "直通": "Straight",
  "弯头": "Elbow",
  "面板安装": "Panel Mount",
  "非面板安装": "Non-Panel Mount",
  "单向阀": "Check Valve",
  "过滤器": "Inline Filter",
  "柱塞泵": "Plunger Pump",
  "隔膜泵": "Diaphragm Pump",
  "移液泵": "Pipetting Pump",
  "注射泵": "Syringe Pump",
  "无阀泵": "Valveless Piston Pump",
  "旋转阀": "Rotary Valve",
  "高压阀": "High-Pressure Valve",
  "电磁阀": "Solenoid Valve",
  "采样针": "Sampling Probe",
  "穿刺针": "Piercing Probe",
  "清洗针": "Wash Probe",
  "搅拌桨": "Mixing Paddle",
};

const FITTING_EXACT_TRANSLATIONS: Record<string, string> = {
  "\u5355\u7aef\u5835\u5934": "Single-End Plug",
  "\u5012\u523a\u5835\u5934": "Barbed Plug",
  "\u5c01\u58351.6 mm\u5185\u5f84\u8f6f\u7ba1\u7aef\u90e8\u6216\u6682\u65f6\u5173\u95ed\u9884\u7559\u652f\u8def": "seal the end of tubing with a 1.6 mm ID or temporarily close a reserved branch",
  "\u53ef\u7528\u4e8e\u8bbe\u5907\u88c5\u914d\u3001\u8c03\u8bd5\u3001\u7ef4\u62a4\u53ca\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed": "it can be used for fluidic-path closure during equipment assembly, commissioning, maintenance, and transport",
  "\u8f6f\u7ba1\u7aef\u90e8\u5c01\u5835": "Tubing-End Sealing",
  "\u9884\u7559\u652f\u8def\u4e34\u65f6\u5173\u95ed": "Temporary Closure of a Reserved Branch",
  "\u8bbe\u5907\u7ef4\u62a4\u671f\u95f4\u7ba1\u8def\u5c01\u95ed": "Fluidic-Path Closure During Equipment Maintenance",
  "\u8fd0\u8f93\u4e0e\u88c5\u914d\u8fc7\u7a0b\u9632\u62a4": "Protection During Transport and Assembly",
  "\u540c\u89c4\u683c\u8f6f\u7ba1\u76f4\u7ebf\u8fde\u63a5": "Straight Connections for Same-Size Tubing",
  "\u76f4\u901a\u578b": "Straight Type",
  "\u4e8c\u901a": "Two-Way",
  "\u4e09\u901a": "Three-Way",
  "\u56db\u901a": "Four-Way",
  "\u03c0\u578b": "Pi-Shaped",
  "T\u578b": "T-Shaped",
  "Y\u578b": "Y-Shaped",
  "\u5361\u73af\u63a5\u5934": "Retaining-Ring Fitting",
  "\u5361\u73af\u5bc6\u5c01": "Retaining-Ring Seal",
  "\u5361\u7b8d\u5bc6\u5c01": "Clamp Seal",
  "\u5361\u7b8d\u63a5\u5934": "Clamp Fitting",
  "\u5e95\u9762\u5bc6\u5c01": "Bottom Seal",
  "\u6cd5\u5170\u57ab\u7247\u5e95\u9762\u5bc6\u5c01": "Flange-Gasket Bottom Seal",
  "\u87ba\u7eb9\u5bc6\u5c01": "Thread Seal",
  "\u975e\u7a7f\u677f": "Non-Bulkhead",
  "\u7a7f\u677f": "Bulkhead",
  "\u5e26\u9600": "Valved",
  "\u4e0d\u5e26\u9600": "Non-Valved",
  "\u6bcd\u7aef": "Female End",
  "\u516c\u7aef": "Male End",
  "\u767d\u8272": "White",
  "\u9ed1\u8272": "Black",
  "\u672c\u8272": "Natural",
  "\u53ef\u65cb\u8f6c\u76f4\u901a\u578b": "Rotatable Straight Type",
  "\u56fa\u5b9a\u516c\u9c81\u5c14\u82af\u5b50": "Fixed Male Luer Core",
  "\u65cb\u8f6c\u516c\u9c81\u5c14\u82af\u5b50": "Rotating Male Luer Core",
  "\u6bcd\u9c81\u5c14\u63a5\u5934": "Female Luer Fitting",
  "\u4e00\u4f53\u5f0f\u516c\u9c81\u5c14\u63a5\u5934": "Integrated Male Luer Fitting",
  "\u65cb\u8f6c\u9501\u5708\u516c\u9c81\u5c14\u63a5\u5934": "Rotating-Lock Male Luer Fitting",
  "\u56fa\u5b9a\u9501\u5708\u516c\u9c81\u5c14\u63a5\u5934": "Fixed-Lock Male Luer Fitting",
  "\u5167\u87ba\u7eb9\u8f6c\u5012\u523a": "Female-Thread-to-Barb",
  "\u87ba\u7eb9\u8f6c\u5012\u523a": "Thread-to-Barb",
  "\u6c34\u5faa\u73af\u8fc7\u6ee4\u5668\u7ec4\u4ef6": "Water-Circulation Filter Assembly",
  "\u6c34\u5faa\u73af\u8fc7\u6ee4\u5668": "Water-Circulation Filter",
  "\u8fc7\u6ee4\u5668": "Filter",
  "\u819c\u7247\u5f0f": "Diaphragm Type",
  "\u5355\u5411\u9600": "Check Valve",
  "\u9ad8\u538b\u63a5\u5934": "High-Pressure Fitting",
  "\u9ad8\u538b\u8fde\u63a5\u7ed3\u6784": "High-Pressure Connection Structure",
  "2\u901a\u7b49\u5f84": "2-Way Equal-Bore",
  "2\u901a\u5f02\u5f84": "2-Way Reducing",
  "3\u901a\u7b49\u5f84": "3-Way Equal-Bore",
  "3\u901a\u5f02\u5f84": "3-Way Reducing",
  "4\u901a\u7b49\u5f84": "4-Way Equal-Bore",
  "\u76f4\u901a\u7b49\u5f84\u5012\u523a\u63a5\u5934": "Straight Equal-Bore Barbed Fitting",
  "\u76f4\u901a\u5f02\u5f84\u5012\u523a\u63a5\u5934": "Straight Reducing Barbed Fitting",
  "L\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934": "L-Shaped Equal-Bore Barbed Fitting",
  "T\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934": "T-Shaped Equal-Bore Barbed Fitting",
  "T\u578b\u5f02\u5f84\u5012\u523a\u63a5\u5934": "T-Shaped Reducing Barbed Fitting",
  "Y\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934": "Y-Shaped Equal-Bore Barbed Fitting",
  "\u76f4\u901a\u5e95\u9762\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "Straight Bottom-Sealed Thread-to-Barb Fitting",
  "\u76f4\u901a\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "Straight Thread-Sealed Thread-to-Barb Fitting",
  "L\u578b\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "L-Shaped Thread-Sealed Thread-to-Barb Fitting",
  "\u76f4\u901a\u5185\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "Straight Female-Thread-to-Barb Fitting",
  "\u6807\u6eda\u5361\u7b8d\u63a5\u5934": "Standard Knurled Clamp Fitting",
  "\u7d27\u51d1\u5361\u7b8d\u63a5\u5934": "Compact Clamp Fitting",
  "\u6807\u6eda\u5e73\u5e95\u63a5\u5934": "Standard Knurled Flat-Bottom Fitting",
  "\u7d27\u51d1\u5e73\u5e95\u63a5\u5934": "Compact Flat-Bottom Fitting",
  "\u819c\u7247\u5f0f\u5355\u5411\u9600": "Diaphragm Check Valve",
  "\u4e8c\u901a\u5185\u87ba\u7eb9\u4e92\u8f6c\u63a5\u5934": "Two-Way Female-Thread Adapter",
  "\u4e09\u901a\u5185\u87ba\u7eb9\u4e92\u8f6c\u63a5\u5934": "Three-Way Female-Thread Adapter",
  "\u9ad8\u538b\u4e8c\u901a\u5185\u87ba\u7eb9\u4e92\u8f6c\u63a5\u5934": "High-Pressure Two-Way Female-Thread Adapter",
  "\u9ad8\u538bT\u578b\u4e09\u901a\u5185\u87ba\u7eb9\u4e92\u8f6c\u63a5\u5934": "High-Pressure T-Shaped Three-Way Female-Thread Adapter",
  "\u516d\u89d2\u87ba\u6bcd": "Hex Nut",
};

const PHRASE_TRANSLATIONS: Array<[string, string]> = [
  ["陶瓷转阀", "Ceramic Rotary Valve"],
  ["平面转阀", "Planar Rotary Valve"],
  ["柱面转阀", "Cylindrical Rotary Valve"],
  ["氧化锆陶瓷", "Zirconia Ceramic"],
  ["蓝宝石", "Sapphire"],
  ["通电自动复位", "Automatic Reset on Power-Up"],
  ["视通道数而定", "Depends on Channel Count"],
  ["分配阀配置为", "Distribution Valve Configuration:"],
  ["非分配阀", "Non-Distribution Valve"],
  ["分配阀", "Distribution Valve"],
  ["相邻端口", "Adjacent Ports"],
  ["未接负载状态", "Without Load"],
  ["无结冰、无冷凝", "No Freezing or Condensation"],
  ["无结冰", "No Freezing"],
  ["无冷凝", "Non-Condensing"],
  ["未冻结状态", "Unfrozen State"],
  ["纯水", "Pure Water"],
  ["详见", "See"],
  ["间距", "Spacing"],
  ["通孔", "Through Holes"],
  ["约", "Approx."],
  ["L型", "L-Shaped"],
  ["T型", "T-Shaped"],
  ["2通等径", "2-Way Equal-Bore"],
  ["2通异径", "2-Way Reducing"],
  ["3通等径", "3-Way Equal-Bore"],
  ["图纸或样品", "Drawing or Sample"],
  ["针尖与孔位", "Needle Tip and Port"],
  ["液位检测适配", "Liquid-Level Detection Compatibility"],
  ["桨叶结构", "Paddle Geometry"],
  ["本色", "Natural"],
  ["白色", "White"],
  ["黑色", "Black"],
  ["红色", "Red"],
  ["绿色", "Green"],
  ["蓝色", "Blue"],
  ["橙色", "Orange"],
  ["黄色", "Yellow"],
  ["直通型", "Straight Type"],
  ["直通", "Straight"],
  ["一体式公鲁尔接头", "Integrated Male Luer Fitting"],
  ["内螺纹互转接头", "Female Thread-to-Thread Adapter"],
  ["内螺纹转倒刺", "Female Thread-to-Barb Adapter"],
  ["倒刺接头", "Barbed Fitting"],
  ["高压接头", "High-Pressure Fitting"],
  ["流道内径", "Flow Path ID"],
  ["陶瓷套件", "Ceramic Assembly"],
  ["四线双极步进丝杆电机", "Four-Wire Bipolar Stepper Lead-Screw Motor"],
  ["直流无刷电机", "Brushless DC Motor"],
  ["直流有刷电机", "Brushed DC Motor"],
  ["通道数超过", "with more than"],
  ["不支持", "not supported"],
  ["多通道", "Multi-Channel"],
  ["标准模式", "Standard Mode"],
  ["高分辨率模式", "High-Resolution Mode"],
  ["微步", "microsteps"],
  ["步", "steps"],
  ["电磁阀注射泵", "Solenoid Valve Syringe Pump"],
  ["旋转阀注射泵", "Rotary Valve Syringe Pump"],
  ["电磁阀系列注射泵", "Solenoid Valve Syringe Pump Series"],
  ["旋转阀系列注射泵", "Rotary Valve Syringe Pump Series"],
  ["无阀活塞泵", "Valveless Piston Pump"],
  ["无阀柱塞泵", "Valveless Piston Pump"],
  ["快插接头", "Quick-Connect Fitting"],
  ["快速接头", "Quick-Connect Fitting"],
  ["倒刺接头", "Barbed Fitting"],
  ["硬管接头", "Hard Tube Fitting"],
  ["穿板倒刺接头", "Bulkhead Barbed Fitting"],
  ["螺纹转倒刺接头", "Thread-to-Barb Fitting"],
  ["鲁尔接头", "Luer Fitting"],
  ["内螺纹转接头", "Female Thread Adapter"],
  ["气泡传感器", "Air Bubble Detector"],
  ["压力传感器", "Pressure Sensor"],
  ["聚四氟乙烯", "PTFE"],
  ["全氟烷氧基", "PFA"],
  ["氟化乙烯丙烯", "FEP"],
  ["硅胶管", "Silicone Tubing"],
  ["管路", "Tubing"],
  ["产品系列", "Product Series"],
  ["产品型号", "Product Model"],
  ["产品名称", "Product Name"],
  ["端口数量", "Number of Ports"],
  ["通道数量", "Number of Channels"],
  ["通道数", "Number of Channels"],
  ["全行程运行时间", "Full-Stroke Travel Time"],
  ["液量精确度", "Dispensing Accuracy"],
  ["额定行程", "Rated Stroke"],
  ["玻璃注射器", "Glass Syringe"],
  ["标准模式", "Standard Mode"],
  ["微步模式", "Microstep Mode"],
  ["阀头材质", "Valve Head Material"],
  ["泵头材质", "Pump Head Material"],
  ["柱塞材质", "Plunger Material"],
  ["膜片材质", "Diaphragm Material"],
  ["阀片材质", "Valve Material"],
  ["接液材质", "Wetted Materials"],
  ["外壳材质", "Housing Material"],
  ["主体材质", "Body Material"],
  ["使用压力范围", "Operating Pressure Range"],
  ["工作压力", "Operating Pressure"],
  ["工作温度", "Operating Temperature"],
  ["通讯类型", "Communication Interface"],
  ["通讯接口", "Communication Interface"],
  ["安装尺寸", "Installation Dimensions"],
  ["安装空间", "Installation Space"],
  ["接口方式", "Port Type"],
  ["标准接口", "Standard Port"],
  ["流量范围", "Flow Range"],
  ["量程", "Volume Range"],
  ["分辨率", "Resolution"],
  ["精确度", "Accuracy"],
  ["重复性", "Repeatability"],
  ["使用寿命", "Service Life"],
  ["行程", "Stroke"],
  ["分配阀", "Distribution Valve"],
  ["电磁阀", "Solenoid Valve"],
  ["旋转阀", "Rotary Valve"],
  ["高压阀", "High-Pressure Valve"],
  ["柱塞泵", "Plunger Pump"],
  ["隔膜泵", "Diaphragm Pump"],
  ["移液泵", "Pipetting Pump"],
  ["注射泵", "Syringe Pump"],
  ["无阀泵", "Valveless Piston Pump"],
  ["采样针", "Sampling Probe"],
  ["穿刺针", "Piercing Probe"],
  ["清洗针", "Wash Probe"],
  ["搅拌桨", "Mixing Paddle"],
  ["单通道", "Single-Channel"],
  ["多通道", "Multi-Channel"],
  ["小体积", "Low-Volume"],
  ["精密液体处理", "Precision Fluid Handling"],
  ["实验室自动化", "Laboratory Automation"],
  ["自动化仪器", "Automated Instruments"],
  ["生命科学仪器", "Life Science Instruments"],
  ["液路集成", "Fluidic Integration"],
  ["液路控制", "Fluidic Control"],
  ["试剂加注", "Reagent Dispensing"],
  ["样本定量分配", "Quantitative Sample Dispensing"],
  ["校准液输送", "Calibration Fluid Delivery"],
  ["液面检测", "Liquid-Level Detection"],
  ["堵塞检测", "Clog Detection"],
  ["可根据项目需求", "can be configured for project requirements"],
  ["请联系我们", "Contact Us"],
  ["可选", "Optional"],
  ["定制", "Custom"],
  ["通道", "channels"],
  ["增量", "increments"],
  ["及以上", "and above"],
  ["及以下", "and below"],
];

/*
 * Narrative translations are applied to descriptions, applications,
 * advantages, FAQs, and SEO copy before the generic value fallback.
 * These phrases are taken from the Chinese product detail data and are
 * deliberately kept separate from specification-label translations.
 */
const NARRATIVE_PHRASE_TRANSLATIONS: Array<[string, string]> = [
  /*
   * Product-detail phrases that must stay tied to the Chinese source
   * record. These entries come before the shorter fragments below so a
   * complete application or FAQ phrase is translated as one unit.
   */
  ["软管实际内径及装配匹配情况", "the actual tubing ID and assembly compatibility"],
  ["同规格软管直线连接", "straight connections for same-size tubing"],
  ["仪器内部管路延长", "tubing extensions inside instruments"],
  ["泵阀与软管连接", "pump, valve, and tubing connections"],
  ["公端直通带阀快插接头", "male straight shut-off quick-connect fitting"],
  ["公端直通不带阀快插接头", "male straight non-shut-off quick-connect fitting"],
  ["母端直通带阀快插接头", "female straight shut-off quick-connect fitting"],
  ["母端直通不带阀快插接头", "female straight non-shut-off quick-connect fitting"],
  ["公端L型带阀快插接头", "male L-shaped shut-off quick-connect fitting"],
  ["公端L型不带阀快插接头", "male L-shaped non-shut-off quick-connect fitting"],
  ["母端L型带阀快插接头", "female L-shaped shut-off quick-connect fitting"],
  ["母端L型不带阀快插接头", "female L-shaped non-shut-off quick-connect fitting"],
  ["公端L形带阀快插接头", "male L-shaped shut-off quick-connect fitting"],
  ["公端L形不带阀快插接头", "male L-shaped non-shut-off quick-connect fitting"],
  ["母端L形带阀快插接头", "female L-shaped shut-off quick-connect fitting"],
  ["母端L形不带阀快插接头", "female L-shaped non-shut-off quick-connect fitting"],
  ["内螺纹转倒刺接头", "female-thread-to-barb fitting"],
  ["内螺纹转倒刺", "female-thread-to-barb"],
  ["快插接头", "quick-connect fitting"],
  ["快插", "quick-connect"],
  ["鲁尔", "Luer"],
  ["带Oring", "with O-ring"],
  ["带oring", "with O-ring"],
  ["带O圈", "with O-ring"],
  ["带o圈", "with O-ring"],
  ["O圈", "O-ring"],
  ["o圈", "O-ring"],
  ["Oring", "O-ring"],
  ["D型", "D-type"],
  ["Y型", "Y-type"],
  ["L形", "L-shaped"],
  ["有刷", "brushed"],
  ["无刷", "brushless"],
  ["软管连接", "tubing connection"],
  ["直线液路连接", "straight fluidic-line connections"],
  ["直线液路转接", "straight fluidic-line transitions"],
  ["接头尺寸", "fitting dimensions"],
  ["倒刺接头尺寸", "barbed-fitting dimensions"],
  ["卡环接头", "retaining-ring fitting"],
  ["基板型", "manifold type"],
  ["螺纹型", "threaded type"],
  ["有刷电机", "brushed motor"],
  ["无刷电机", "brushless motor"],
  ["单头", "single-head"],
  ["双头", "dual-head"],
  ["多头", "multi-head"],
  ["旋转", "rotating"],
  ["可旋转", "rotatable"],
  ["高压", "high-pressure"],
  ["常规", "standard"],
  ["固定", "fixed"],
  ["结构", "structure"],
  ["芯子", "insert"],
  ["锥螺纹", "tapered thread"],
  ["螺纹转", "thread-to-"],
  ["不同", "different"],
  ["如何选择", "how to select"],
  ["改变", "change"],
  ["走向", "direction"],
  ["是否", "whether"],
  ["设备", "equipment"],
  ["仪器", "instrument"],
  ["螺纹", "thread"],
  ["接头", " fitting"],
  ["接口", "interface"],
  ["圈", "ring"],
  ["分析仪器及实验室自动化设备液路", "fluidic paths in analytical instruments and laboratory automation equipment"],
  ["分析仪器液路模块", "fluidic modules for analytical instruments"],
  ["IVD与分析仪器流路", "fluidic paths in IVD and analytical instruments"],
  ["实验室自动化设备液路", "fluidic paths in laboratory automation equipment"],
  ["快速拆装的设备液路连接", "quick-disconnect fluidic connections in equipment"],
  ["仪器内部转角", "internal instrument corners"],
  ["设备壳体或隔板两侧的", "on both sides of equipment housings or panels"],
  ["减少连接位置对直线安装空间的要求", "reduce the straight-route space required for the connection"],
  ["改变tubing走向", "change tubing direction"],
  ["改变管路走向", "change tubing direction"],
  ["旋转锁圈公鲁尔接头", "rotating-lock male Luer fitting"],
  ["固定锁圈公鲁尔接头", "fixed-lock male Luer fitting"],
  ["一体式公鲁尔接头", "integrated male Luer fitting"],
  ["旋转锁圈公", "rotating-lock male"],
  ["固定锁圈公", "fixed-lock male"],
  ["标滚平底接头", "standard rolled flat-bottom fitting"],
  ["标滚卡箍接头", "standard rolled clamp fitting"],
  ["紧凑平底接头", "compact flat-bottom fitting"],
  ["紧凑卡箍接头", "compact clamp fitting"],
  ["高压二通内螺纹互转接头", "high-pressure two-way female-thread adapter"],
  ["十字型四通等径", "cross-shaped equal-bore four-way fitting"],
  ["π型四通等径", "Pi-shaped equal-bore four-way fitting"],
  ["水循环过滤器组件", "water-circulation filter assembly"],
  ["可编程气体置换式", "programmable gas-displacement"],
  ["气体置换式移液方式", "gas-displacement pipetting"],
  ["气体置换式", "gas-displacement"],
  ["限制流体反向流动", "prevent reverse fluid flow"],
  ["回流风险并保持液路方向稳定", "backflow risk and maintain stable fluid direction"],
  ["单向阀结构", "check-valve structure"],
  ["开启特性", "opening characteristics"],
  ["倒刺堵头", "barbed plug"],
  ["穿板二通", "bulkhead two-way fitting"],
  ["穿板母", "bulkhead female"],
  ["法兰垫片底面密封", "flange-gasket bottom-face sealing"],
  ["法兰垫片", "flange gasket"],
  ["卡箍密封", "clamp sealing"],
  ["卡环密封", "retaining-ring sealing"],
  ["系列过滤器", "series filter"],
  ["水循环过滤器", "water-circulation filter"],
  ["过滤要求", "filtration requirements"],
  ["对接端接口形式", "mating-end interface type"],
  ["锁圈结构", "lock-ring design"],
  ["面板厚度和", "panel thickness and"],
  ["仪器面板", "instrument panel"],
  ["中的液路连接", "fluidic connections in"],
  ["中的液路转接", "fluidic transitions in"],
  ["液路之间的转接", "transitions between fluidic lines"],
  ["微流体液路", "microfluidic paths"],
  ["微流体系统", "microfluidic systems"],
  ["分析仪器及", "analytical instruments and"],
  ["带阀", "shut-off"],
  ["不带阀", "non-shut-off"],
  ["螺纹标准", "thread standard"],
  ["螺纹连接", "threaded connection"],
  ["超微型", "ultra-compact"],
  ["连续输送", "continuous delivery"],
  ["膜片如何选择", "how to select the diaphragm"],
  ["如何选择公端和母端", "how to select male and female ends"],
  ["等径", "equal-bore"],
  ["异径", "reducing"],
  ["三通", "three-way fitting"],
  ["二通", "two-way fitting"],
  ["公鲁尔", "male Luer"],
  ["母鲁尔", "female Luer"],
  ["公端", "male end"],
  ["母端", "female end"],
  ["倒刺", "barbed"],
  ["连接", "connection"],
  ["配套", "compatible"],
  ["和使用工况", "and operating conditions"],
  ["尺寸和连接方式", "dimensions and connection method"],
  ["温度和", "temperature and"],
  ["与", " and "],
  ["及", " and "],
  ["和", " and "],
  ["MRV3 陶瓷多通道旋转阀", "MRV3 Ceramic Multiport Rotary Valve"],
  ["陶瓷多通道旋转阀", "Ceramic Multiport Rotary Valve"],
  ["多通道旋转阀", "Multiport Rotary Valve"],
  ["DPL30 有刷电机液体隔膜泵", "DPL30 Brushed-Motor Liquid Diaphragm Pump"],
  ["有刷电机液体隔膜泵", "Brushed-Motor Liquid Diaphragm Pump"],
  ["RPL-P4 12–80 μL/rev 小量程无阀泵", "RPL-P4 12–80 μL/rev Low-Volume Valveless Piston Pump"],
  ["小量程无阀泵", "Low-Volume Valveless Piston Pump"],
  ["压力检测模块", "Pressure Sensing Module"],
  ["软管材质", "tubing material"],
  ["软管实际内径", "actual tubing ID"],
  ["装配匹配情况", "assembly compatibility"],
  ["实际内径", "actual ID"],
  ["尺寸公差及实际装配要求", "dimensional tolerance and actual assembly requirements"],
  ["实际内径及装配匹配情况", "actual tubing ID and assembly compatibility"],
  ["液路压力监测", "fluidic pressure monitoring"],
  ["管路堵塞预警", "tubing clogging alerts"],
  ["泵后压力反馈", "downstream-of-pump pressure feedback"],
  ["自动化仪器状态监控", "automated-instrument status monitoring"],
  ["系统保护", "system protection"],
  ["自动化仪器", "automated instruments"],
  ["微流体管路和接头系统", "microfluidic tubing and fitting systems"],
  ["常见微流体接头和管路系统", "common microfluidic fittings and tubing systems"],
  ["泵后压力检测", "downstream-of-pump pressure monitoring"],
  ["管路堵塞判断", "tubing blockage detection"],
  ["流路异常识别", "fluidic anomaly detection"],
  ["设备运行状态反馈", "equipment operating-status feedback"],
  ["内螺纹接口", "female-thread interface"],
  ["流道结构", "flow-path structure"],
  ["输出数字压力信号", "outputs a digital pressure signal"],
  ["默认 7-bit I2C 地址", "default 7-bit I2C address"],
  ["低死体积液路", "low-dead-volume fluidic paths"],
  ["内部体积", "internal volume"],
  ["压力范围", "pressure range"],
  ["压力分辨率", "pressure resolution"],
  ["可调至", "adjustable to"],
  ["压力分辨率优于", "pressure resolution better than"],
  ["标准压力范围为", "the standard pressure range is "],
  ["默认采样率", "default sampling rate"],
  ["最高可调至", "up to"],
  ["默认 I2C 地址", "Default I2C Address"],
  ["螺纹接口", "Threaded Port"],
  ["外形尺寸", "Overall Dimensions"],
  ["重量", "Weight"],
  ["使用寿命", "Service Life"],
  ["工作电压", "Operating Voltage"],
  ["工作电流", "Operating Current"],
  ["压力范围", "Pressure Range"],
  ["压力检测模块", "Pressure Sensing Module"],
  ["实际装配要求", "actual assembly requirements"],
  ["尺寸公差", "dimensional tolerance"],
  ["材质", "material"],
  ["硬度", "hardness"],
  ["目标通径", "target bore diameter"],
  ["端口数量", "number of ports"],
  ["接口规格", "interface specification"],
  ["驱动器", "driver"],
  ["工作压力", "operating pressure"],
  ["液体输送", "liquid delivery"],
  ["稳定液体输送", "stable liquid delivery"],
  ["有限空间", "limited space"],
  ["吸液与排液", "liquid aspiration and discharge"],
  ["降低", "lower"],
  ["可减少", "can reduce"],
  ["提升", "improve"],
  ["便于", "facilitate"],
  ["管路冲洗", "line flushing"],
  ["液体循环", "liquid circulation"],
  ["流动相", "mobile phase"],
  ["样品介质", "sample fluid"],
  ["装配空间", "assembly space"],
  ["安装方式", "mounting method"],
  ["安装方向", "mounting orientation"],
  ["系统压力", "system pressure"],
  ["切换逻辑", "switching logic"],
  ["控制方式", "control method"],
  ["液路结构", "fluidic architecture"],
  ["介质", "fluid"],
  ["流量", "flow rate"],
  ["开启条件", "opening conditions"],
  ["工作温度", "operating temperature"],
  ["压力", "pressure"],
  ["清洁要求", "cleaning requirements"],
  ["具体排量", "specific displacement"],
  ["接口方向", "port orientation"],
  ["通道配置", "channel configuration"],
  ["标准型号配置", "standard model configurations"],
  ["通道可选", "channels available"],
  ["寿命要求", "service-life requirements"],
  ["成本需求", "cost requirements"],
  ["设备运行时间", "equipment operating time"],
  ["用户", "users"],
  ["该系列", "This series"],
  ["该型号", "This model"],
  ["该产品", "This product"],
  ["适配", "compatible with"],
  ["螺纹密封", "thread sealing"],
  ["底面密封", "bottom-face sealing"],
  ["内螺纹", "female thread"],
  ["外径", "OD"],
  ["内径", "ID"],
  ["接管", "tubing port"],
  ["试剂吸取", "reagent aspiration"],
  ["样本吸取", "sample aspiration"],
  ["定量转移", "metered transfer"],
  ["来图定制", "customized from drawings"],
  ["封膜穿刺", "seal-film piercing"],
  ["瓶塞穿刺", "vial-stopper piercing"],
  ["排气辅助", "venting assistance"],
  ["针外壁清洗", "outer-wall needle cleaning"],
  ["针内壁冲洗", "inner-wall needle flushing"],
  ["废液排出", "waste-fluid discharge"],
  ["残液处理", "residual-liquid handling"],
  ["搅拌桨系列", "mixing paddle series"],
  ["混匀", "mixing"],
  ["压力检测模块", "pressure sensing module"],
  ["压力监测", "pressure monitoring"],
  ["堵塞预警", "clogging alerts"],
  ["系统保护", "system protection"],
  ["自动化仪器中的", "in automated instruments"],
  ["分析仪器中的", "in analytical instruments"],
  ["体外诊断仪器", "in vitro diagnostic instruments"],
  ["实验室自动化设备集成", "laboratory automation equipment integration"],
  ["仪器内部液路系统", "instrument-internal fluidic systems"],
  ["两端分别适配", "The two ends accept"],
  ["两端均适配", "Both ends accept"],
  ["直通异径倒刺接头", "Straight reducing barbed fitting"],
  ["直通等径倒刺接头", "Straight equal-bore barbed fitting"],
  ["直通螺纹密封螺纹转倒刺接头", "Straight threaded-seal thread-to-barb fitting"],
  ["穿板倒刺接头", "Bulkhead barbed fitting"],
  ["方形二通内螺纹互转接头", "Square two-way female thread adapter"],
  ["Q20公端直通带阀快插接头", "Q20 male straight shut-off quick-connect fitting"],
  ["Q20公端直通不带阀快插接头", "Q20 male straight non-shut-off quick-connect fitting"],
  ["固定公鲁尔芯子", "Fixed male Luer insert"],
  ["内螺纹互转接头", "Female thread-to-thread adapter"],
  ["鸭嘴式单向阀", "Duckbill check valve"],
  ["膜片式单向阀", "Diaphragm check valve"],
  ["是一款", " is a "],
  ["采用", " uses "],
  ["适用于", " is suitable for "],
  ["适合", " is suited to "],
  ["可用于", " can be used for "],
  ["用于", " is used for "],
  ["面向", " is designed for "],
  ["实际选型时需结合", "For selection, consider "],
  ["选型时应结合", "When selecting, consider "],
  ["确认匹配性", "to confirm compatibility"],
  ["进一步确认", "confirm for the specific project"],
  ["无法确定时请提交工况由工程师协助核对", "If compatibility is uncertain, submit the operating conditions for engineering review"],
  ["由工程师确认对应版本后提供", "with the applicable version confirmed and provided by our engineers"],
  ["由工程师核对商品编码和资料版本后提供", "after our engineers verify the product code and document revision"],
  ["同一规格软管的直线连接和管路延长", "straight connections and line extensions using tubing of the same size"],
  ["不同内径软管之间的直线过渡连接", "make straight transition connections between tubing with different IDs"],
  ["用于设备螺纹接口与软管液路之间的转接", "for transitions between equipment threaded ports and tubing-based fluidic lines"],
  ["仪器内部需要保持直线走管的连接位置", "instrument locations where a straight tubing route is required"],
  ["仪器内部管径转换和液路转接", "internal tubing-size transitions and fluidic connections in instruments"],
  ["泵阀接口与软管适配", "pump, valve, and tubing interface adaptation"],
  ["液路直线转接", "straight fluidic-line connections"],
  ["软管与鲁尔接口连接", "connections between tubing and Luer interfaces"],
  ["仪器内部液路连接", "internal instrument fluidic connections"],
  ["仪器内部液路转接", "internal instrument fluidic transitions"],
  ["泵阀与流路接口连接", "pump, valve, and fluidic interface connections"],
  ["微流体液路连接", "microfluidic connections"],
  ["流路基板连接", "fluidic manifold connections"],
  ["实验室自动化设备液路", "laboratory automation fluidic systems"],
  ["实验室自动化系统中的硬管连接", "rigid-tube connections in laboratory automation systems"],
  ["采用有刷电机", "uses a brushed motor"],
  ["无刷电机", "brushless motor"],
  ["有刷电机", "brushed motor"],
  ["直流无刷电机", "brushless DC motor"],
  ["直流有刷电机", "brushed DC motor"],
  ["液体隔膜泵", "liquid diaphragm pump"],
  ["气液混合隔膜泵", "gas-liquid diaphragm pump"],
  ["小量程无阀泵", "low-volume-range valveless piston pump"],
  ["中小量程无阀泵", "small-to-medium-volume-range valveless piston pump"],
  ["中大量程无阀泵", "medium-to-large-volume-range valveless piston pump"],
  ["双头无阀泵", "dual-head valveless piston pump"],
  ["陶瓷柱塞无阀泵", "ceramic-piston valveless pump"],
  ["陶瓷柱塞", "ceramic piston"],
  ["无阀液路结构", "valveless fluidic architecture"],
  ["外置电磁阀", "external solenoid valves"],
  ["外置阀件", "external valve components"],
  ["液路复杂度", "fluidic complexity"],
  ["阀件维护", "valve maintenance"],
  ["残留风险", "residue risk"],
  ["堵塞、卡滞和维护问题", "blockage, sticking, and maintenance issues"],
  ["清洗液输送", "wash-fluid delivery"],
  ["试剂转移", "reagent transfer"],
  ["废液抽排", "waste-fluid evacuation"],
  ["管路预充", "line priming"],
  ["管路冲洗", "line flushing"],
  ["小流量液体循环", "low-flow liquid circulation"],
  ["快速排液", "rapid liquid evacuation"],
  ["加压供液", "pressurized fluid delivery"],
  ["较长管路输送", "long-line fluid delivery"],
  ["微量试剂加样", "trace-reagent dispensing"],
  ["小体积滴定", "small-volume titration"],
  ["定量输送", "quantitative delivery"],
  ["校准液加注", "calibration-fluid dispensing"],
  ["微量反应液分配", "trace reaction-fluid dispensing"],
  ["紧凑型分析仪器液路模块", "fluidic modules for compact analytical instruments"],
  ["自动化分析仪器", "automated analytical instruments"],
  ["体外诊断设备", "in vitro diagnostic equipment"],
  ["生命科学仪器", "life science instruments"],
  ["实验室自动化设备", "laboratory automation equipment"],
  ["分析检测系统", "analytical testing systems"],
  ["清洗液切换", "wash-fluid switching"],
  ["废液路径管理", "waste-fluid path management"],
  ["多通道液路集成", "multi-channel fluidic integration"],
  ["多试剂选择", "multi-reagent selection"],
  ["样本分配", "sample distribution"],
  ["样本定量分配", "quantitative sample dispensing"],
  ["流路选择", "fluidic-path selection"],
  ["自动化仪器中的低压液路通断控制", "low-pressure fluidic switching in automated instruments"],
  ["压力保持", "pressure retention"],
  ["液体转移", "liquid transfer"],
  ["微量液体处理", "trace-liquid handling"],
  ["可根据项目需求确认", "can be confirmed for the specific project"],
  ["按项目需求确认", "confirmed for the specific project"],
  ["液体兼容性", "fluid compatibility"],
  ["介质兼容性", "fluid compatibility"],
  ["过液材质", "wetted materials"],
  ["工作温度", "operating temperature"],
  ["使用压力", "operating pressure"],
  ["安装空间", "installation space"],
  ["设备结构", "equipment structure"],
  ["目标容量", "target capacity"],
  ["接口方式", "port type"],
  ["控制方式", "control method"],
  ["使用寿命要求", "service-life requirements"],
  ["运行时间", "operating time"],
  ["维护周期", "maintenance interval"],
  ["成本需求", "cost requirements"],
  ["额定流量为", "the rated flow rate is "],
  ["额定压力为", "the rated pressure is "],
  ["自吸高度为", "the self-priming lift is "],
  ["工作介质", "working fluid"],
  ["纯化水", "purified water"],
  ["其他液体介质需实际评估", "other fluids require evaluation"],
  ["可接内径", "accepts tubing with an ID of "],
  ["软管", "tubing"],
  ["接管内径", "tubing ID"],
  ["接管外径", "tubing OD"],
  ["内径范围", "ID range"],
  ["工作温度范围", "operating temperature range"],
  ["材料合规资料", "material compliance documentation"],
  ["具体文件随材质与项目要求确认", "the applicable documents depend on the material and project requirements"],
  ["额定电压", "rated voltage"],
  ["额定功率", "rated power"],
  ["自吸能力", "self-priming capability"],
  ["寿命要求", "service-life requirements"],
  ["材质组合", "material combination"],
  ["型号配置表", "model configuration table"],
  ["型号选择", "model selection"],
  ["规格书", "datasheet"],
  ["二维图纸", "2D drawing"],
  ["三维模型", "3D model"],
  ["图纸需求", "drawing request"],
  ["由工程师协助确认", "with engineering support"],
  ["请提交工况", "submit the operating conditions"],
  ["确认", "confirm"],
  ["需要", "requires"],
  ["支持", "supports"],
  ["不支持", "does not support"],
  ["可选", "optional"],
  ["本色", "natural"],
  ["白色", "white"],
  ["黑色", "black"],
  ["蓝色", "blue"],
  ["直通型", "straight type"],
  ["直通", "straight"],
  ["2通等径", "2-way equal-bore"],
  ["2通异径", "2-way reducing"],
  ["3通等径", "3-way equal-bore"],
  ["4通", "4-way"],
  ["通道", "channel"],
  ["内容积", "internal volume"],
  ["耐压", "pressure rating"],
  ["触液材质", "wetted materials"],
  ["阀室内容积", "valve chamber volume"],
  ["流量系数", "flow coefficient"],
  ["孔口直径", "orifice diameter"],
  ["电机驱动", "motor drive"],
  ["通信接口", "communication interface"],
  ["通讯接口", "communication interface"],
  ["采用", "uses"],
  ["可根据", "can be configured according to"],
  ["规格包含", "the specifications include"],
  ["主要区别是", "the main difference is"],
  ["相比", "compared with"],
  ["降低", "reduce"],
  ["提升", "improve"],
  ["便于", "to facilitate"],
  ["并支持", "and supports"],
  ["以及", "and"],
  ["其中", "including"],
  ["，", ", "],
  ["、", ", "],
  ["。", ". "],
  ["；", "; "],
  ["：", ": "],
  ["（", " ("],
  ["）", ")"],
  ["？", "?"],
  ["！", "!"],
  ["～", "–"],
];

const NARRATIVE_EXACT_TRANSLATIONS: Record<string, string> = {
  "MRV3 陶瓷多通道旋转阀": "MRV3 Ceramic Multiport Rotary Valve",
  "DPL30 有刷电机液体隔膜泵": "DPL30 Brushed-Motor Liquid Diaphragm Pump",
  "DPL30 有刷电机 液体隔膜泵": "DPL30 Brushed-Motor Liquid Diaphragm Pump",
  "DPL30 无刷电机 液体隔膜泵": "DPL30 Brushless-Motor Liquid Diaphragm Pump",
  "DPL30H 有刷电机 高压液体隔膜泵":
    "DPL30H Brushed-Motor High-Pressure Liquid Diaphragm Pump",
  "DPL30H 无刷电机 高压液体隔膜泵":
    "DPL30H Brushless-Motor High-Pressure Liquid Diaphragm Pump",
  "DPL60 有刷电机 液体隔膜泵": "DPL60 Brushed-Motor Liquid Diaphragm Pump",
  "DPL60 无刷电机 液体隔膜泵": "DPL60 Brushless-Motor Liquid Diaphragm Pump",
  "DPGL800 有刷电机 气液混合隔膜泵":
    "DPGL800 Brushed-Motor Gas-Liquid Diaphragm Pump",
  "DPGL800 无刷电机 气液混合隔膜泵":
    "DPGL800 Brushless-Motor Gas-Liquid Diaphragm Pump",
  "RPL-P4 12–80 μL/rev 小量程无阀泵":
    "RPL-P4 12–80 μL/rev Low-Volume Valveless Piston Pump",
  "PDM5 压力检测模块": "PDM5 Pressure Sensing Module",
  "ABD 气泡检测模块是否接触液体？":
    "Does the ABD Air Bubble Detection Module come into direct contact with the fluid?",
  "PDM5 压力检测模块适合做什么？":
    "What applications is the PDM5 Pressure Sensing Module intended for?",
  "PDM5 的压力范围是多少？":
    "What is the pressure range of the PDM5 Pressure Sensing Module?",
  "PDM5 使用什么通讯方式？":
    "Which communication interface does the PDM5 Pressure Sensing Module use?",
  "PDM5 的液路接口是什么？":
    "What fluidic interface does the PDM5 Pressure Sensing Module use?",
  "PDM5 是否适合低死体积液路？":
    "Is the PDM5 Pressure Sensing Module suitable for low-dead-volume fluidic paths?",
  "如果不确定选择哪个 DPGL800 型号怎么办？":
    "What should I do if I am unsure which DPGL800 model to select?",
  "DPL30 的 EP/PS 和 FF/PS 怎么选？":
    "How should the DPL30 EP/PS and FF/PS material configurations be selected?",
  "RPL-P6.35 可以定制排量吗？":
    "Can the RPL-P6.35 displacement be customized?",
  ["RPL-P6.35 50–300 μL/rev 中小量程无阀泵面向试剂加样、滴定、灌装和定量输送场景，适合自动化分析仪器中的中小体积液体处理模块。\n\n产品采用高精密陶瓷柱塞与无阀液路结构，可减少外置阀件依赖，并支持清洗口、液路接口、安装方向和具体排量配置，适合对稳定输送、化学兼容性和结构集成有要求的设备。"]:
    "The RPL-P6.35 50–300 μL/rev medium-to-small-volume valveless pump is designed for reagent dispensing, titration, filling, and quantitative delivery in small- to medium-volume fluid-handling modules for automated analytical instruments.\n\nIt combines a high-precision ceramic piston with a valveless fluidic architecture to reduce reliance on external valves. Cleaning ports, fluidic interfaces, mounting orientation, and displacement can be configured for equipment requiring stable delivery, chemical compatibility, and compact integration.",
  ["RPL-P15 300–1200 μL/rev 中大量程无阀泵适用于较大体积加液、试剂灌装、液体转移和定量输送场景，可用于自动化分析仪器和实验室自动化设备。\n\n陶瓷柱塞与无阀液路结构有助于提升输送稳定性，并减少传统阀件带来的堵塞、卡滞和维护问题；工作接口、清洗口、安装方向和排量可按项目需求确认。"]:
    "The RPL-P15 300–1200 μL/rev medium-to-large-volume valveless pump is designed for larger-volume liquid addition, reagent filling, liquid transfer, and quantitative delivery in automated analytical instruments and laboratory automation equipment.\n\nIts ceramic piston and valveless fluidic architecture help improve delivery stability while reducing blockage, sticking, and maintenance issues associated with conventional valves. The working interface, cleaning port, mounting orientation, and displacement can be confirmed for the project.",
  "试剂加样": "Reagent dispensing",
  "试剂灌装": "Reagent filling",
  "滴定分析": "Titration analysis",
  "定量灌装": "Quantitative filling",
  "缓冲液输送": "Buffer transfer",
  "清洗液分配": "Wash-fluid distribution",
  "自动化分析仪器液路集成": "Fluidic integration in automated analytical instruments",
  "较大体积加液": "Larger-volume liquid addition",
  "液体转移": "Liquid transfer",
  "稀释液补液": "Diluent replenishment",
  "中大量程定量输送": "Medium- to high-volume quantitative delivery",
  "实验室自动化设备液路模块": "Fluidic modules in laboratory automation equipment",
  "RPL-P4 无阀泵适合哪些应用场景？":
    "Which applications is the RPL-P4 valveless pump suited for?",
  "RPL-P4 适合微量试剂加样、小体积滴定、定量输送和校准液加注等场景，常用于自动化分析仪器和紧凑型液路模块。":
    "The RPL-P4 is suited to micro-reagent dispensing, small-volume titration, quantitative transfer, and calibration-fluid delivery in automated analytical instruments and compact fluidic modules.",
  "RPL-P4 是标准品还是定制品？":
    "Is the RPL-P4 a standard product or a custom configuration?",
  "RPL-P4 按项目需求进行配置确认，不作为固定标准品直接选购。具体排量、接口和安装方式需要结合客户设备结构确认。":
    "The RPL-P4 is configured to project requirements rather than offered as a fixed standard product. The displacement, interfaces, and mounting method must be confirmed against the customer\u2019s equipment design.",
  "为什么选择无阀泵结构？":
    "Why choose a valveless pump architecture?",
  "RPL-P4 是否适合小体积液体处理？":
    "Is the RPL-P4 suitable for small-volume fluid handling?",
  "适合。RPL-P4 覆盖 12–80 μL/rev 小量程输送需求，适用于微量液体处理和紧凑空间集成。":
    "Yes. The RPL-P4 covers low-volume delivery from 12–80 μL/rev and is suited to trace-liquid handling and integration where installation space is limited.",
  "RPL-P4 的接口可以定制吗？":
    "Can the RPL-P4 interfaces be customized?",
  "可以根据项目需求确认具体接口形式、安装方式和液路连接方式。":
    "Yes. The interface format, mounting method, and fluidic connection arrangement can be confirmed according to the project requirements.",
  "RPL-P6.35 无阀泵适合哪些场景？":
    "Which applications is the RPL-P6.35 valveless pump suited for?",
  "RPL-P6.35 适合试剂加样、滴定、灌装、缓冲液输送和中小体积定量输送场景。":
    "The RPL-P6.35 is suited to reagent dispensing, titration, filling, buffer transfer, and quantitative delivery for small- to medium-volume applications.",
  "RPL-P6.35 与 RPL-P4 的区别是什么？":
    "What is the difference between the RPL-P6.35 and the RPL-P4?",
  "RPL-P6.35 面向 50–300 μL/rev 中小量程输送，排量范围高于 RPL-P4，更适合中小体积试剂加样和灌装。":
    "The RPL-P6.35 covers 50–300 μL/rev, a higher displacement range than the RPL-P4, making it better suited to small- and medium-volume reagent dispensing and filling.",
  "清洗口有什么作用？":
    "What is the purpose of the cleaning port?",
  "在高腐蚀性或易结晶液体场景下，清洗口可用于对柱塞区域进行清洗，有助于降低残留和维护风险。":
    "When handling highly corrosive or crystallizing fluids, the cleaning port can be used to flush the plunger area, helping reduce residue and maintenance risk.",
  "RPL-P6.35 是否适合自动化仪器集成？":
    "Is the RPL-P6.35 suitable for integration into automated instruments?",
  "适合。该系列结构紧凑，适用于自动化分析仪器、IVD 设备和实验室自动化设备中的液路模块集成。":
    "Yes. Its compact architecture is suited to integration into fluidic modules in automated analytical instruments, IVD equipment, and laboratory automation systems.",
  "RPL-P15 无阀泵适合哪些场景？":
    "Which applications is the RPL-P15 valveless pump suited for?",
  "RPL-P15 适合较大体积加液、试剂灌装、液体转移、稀释液补液和中大量程定量输送。":
    "The RPL-P15 is suited to larger-volume liquid addition, reagent filling, liquid transfer, diluent replenishment, and medium- to high-volume quantitative delivery.",
  "RPL-P15 与 RPL-P6.35 的区别是什么？":
    "What is the difference between the RPL-P15 and the RPL-P6.35?",
  "RPL-P15 面向 300–1200 μL/rev 中大量程输送，适合更大体积的加液和灌装；RPL-P6.35 更适合中小量程试剂加样。":
    "The RPL-P15 covers 300–1200 μL/rev for medium- to high-volume delivery and is suited to larger-volume liquid addition and filling, while the RPL-P6.35 is better suited to small- and medium-volume reagent dispensing.",
  "RPL-P15 的工作接口是什么？":
    "What are the working fluidic interfaces on the RPL-P15?",
  "RPL-P15 工作液路接口为 G1/8，清洗液路接口为 1/4-28 UNF-2B，具体接口形式可根据项目进一步确认。":
    "The RPL-P15 has a G1/8 working fluidic interface and a 1/4-28 UNF-2B cleaning-fluid interface. The final interface configuration can be confirmed for the project.",
  "RPL-P15 可以用于连续输送吗？":
    "Can the RPL-P15 be used for continuous transfer?",
  "可用于液体转移和定量输送场景，但具体连续运行条件、目标流量和压力要求需要结合工况确认。":
    "It can be used for liquid transfer and quantitative delivery, but continuous operating conditions, target flow rate, and pressure requirements must be confirmed against the operating conditions.",
  "RPL-P15 是否支持定制？":
    "Does the RPL-P15 support custom configurations?",
  "支持。排量、接口、清洗口、安装方向和液路结构可根据设备项目需求确认。":
    "Yes. The displacement, interfaces, cleaning port, mounting orientation, and fluidic architecture can be confirmed according to the equipment project requirements.",
  "为什么高压阀按定制配置展示？":
    "Why is the high-pressure valve presented as a custom configuration?",
  "MRV3 适合做哪些多通道流路切换？":
    "Which multi-channel fluidic switching applications is the MRV3 suited for?",
  "基板型、螺纹型和倒刺型怎么选？":
    "How should manifold, threaded, and barbed versions be selected?",
  "搅拌桨为什么需要按反应杯定制？":
    "Why does the Mixing Paddle need to be customized to the reaction cup?",
  "如何判断搅拌桨形状？":
    "How should the Mixing Paddle shape be selected?",
  "是否可以做表面涂层？":
    "Can a surface coating be provided?",
  "搅拌桨如何避免搅拌时产生气泡或飞溅？":
    "How can the Mixing Paddle minimize bubbles or splashing during mixing?",
  "搅拌桨表面涂层主要用于什么场景？":
    "What applications is surface coating on the Mixing Paddle intended for?",
  "穿刺针和采样针有什么区别？":
    "What is the difference between a Piercing Probe and a Sampling Probe?",
  "穿刺针是否可以做排气结构？":
    "Can the Piercing Probe include a venting structure?",
  "穿刺针选型需要提供哪些资料？":
    "What information is needed to select a Piercing Probe?",
  "穿刺针针尖是否可以根据耗材材料调整？":
    "Can the Piercing Probe tip be adjusted for the consumable material?",
  "穿刺取液时为什么要考虑排气结构？":
    "Why should venting be considered during piercing aspiration?",
  "清洗针主要解决什么问题？":
    "What problems is the Wash Probe primarily designed to address?",
  "单头、双头和多头怎么选？":
    "How should single-head, dual-head, and multi-head configurations be selected?",
  "清洗针是否可以做侧孔？":
    "Can the Wash Probe include side ports?",
  "清洗针如何降低 carry-over 风险？":
    "How can a Wash Probe reduce carry-over risk?",
  "清洗针是否可以和清洗站一起定制？":
    "Can the Wash Probe be customized together with the cleaning station?",
  "HMD3 注射泵适合哪些配置需求？":
    "What configuration requirements is the HMD3 Syringe Pump designed to meet?",
  "HMD6 是否支持多通道配置？":
    "Does the HMD6 Syringe Pump support multi-channel configurations?",
  "注射泵可以定制通道数和端口形式吗？":
    "Can the Syringe Pump be configured with custom channel counts and port arrangements?",
  "注射泵支持哪些通讯方式？":
    "Which communication methods does the Syringe Pump support?",
  "是否可以提供 2D 图纸或 3D 模型？":
    "Can 2D drawings or 3D models be provided?",
  "如何确认具体型号配置？":
    "How can I confirm the configuration of a specific model?",
  "MRV3 陶瓷多通道旋转阀用于自动化分析仪器中的多端口流路选择，可将多瓶试剂、清洗液、废液或样本相关路径集中接入一个旋转切换单元。该系列覆盖 10 / 16 / 24 通道配置，通道直径为 1.2mm / 1.0mm / 0.5mm，内容积为 15.8μL / 10μL / 2.9μL，耐压 1.2 MPa，接口支持 1/4-28UNF 与 6-40UNF。实际选型时需结合端口数量、目标通径、介质兼容性、接口规格、驱动器、通信接口和安装空间确认。":
    "MRV3 Ceramic Multiport Rotary Valve is designed for multiport fluidic-path selection in automated analytical instruments. It can connect multiple reagent, wash-fluid, waste-fluid, or sample paths to a single rotary switching unit. The series covers 10-, 16-, and 24-channel configurations, with channel diameters of 1.2 mm, 1.0 mm, and 0.5 mm, an internal volume of 15.8 μL, 10 μL, and 2.9 μL, a pressure rating of 1.2 MPa, and 1/4-28 UNF and 6-40 UNF interfaces. For selection, confirm the number of ports, target bore diameter, fluid compatibility, interface specification, driver, communication interface, and installation space.",
  "DPL30 液体隔膜泵是一款面向仪器内部液路系统的紧凑型液体输送泵，适用于清洗液输送、试剂转移、废液抽排、管路预充和小流量液体循环等场景。该系列采用隔膜泵结构，可在有限空间内实现稳定液体输送，适合体外诊断设备、生命科学仪器、实验室自动化设备和分析检测系统中的液路模块集成。":
    "DPL30 Liquid Diaphragm Pump is a compact liquid-delivery pump designed for instrument-internal fluidic systems. It is suitable for wash-fluid delivery, reagent transfer, waste-fluid evacuation, line priming, and low-flow liquid circulation. The series uses a diaphragm-pump architecture to provide stable liquid delivery in limited space and is suited to fluidic-module integration in in vitro diagnostic equipment, life science instruments, laboratory automation equipment, and analytical testing systems.",
  "DPL30 系列额定流量为 300 mL/min，额定压力为 100 kPa，自吸高度为 6 mH₂O，提供有刷电机和无刷电机两种标准型号配置。用户可根据设备运行时间、寿命要求和成本需求直接选择对应型号；如需 12V 电压、FF/PS 材质组合或其他接口方向，可在型号配置中进一步确认。":
    "The DPL30 series has a rated flow rate of 300 mL/min, a rated pressure of 100 kPa, and a self-priming lift of 6 mH₂O. Brushed-motor and brushless-motor standard model configurations are available. Users can select the appropriate model based on equipment operating time, service-life requirements, and cost requirements. For 12 V operation, an FF/PS material combination, or another port orientation, confirm the model configuration for the specific project.",
  "DPL30 液体隔膜泵适合哪些应用？":
    "Which applications is the DPL30 liquid diaphragm pump suited for?",
  "DPL30 可以用于废液抽排吗？":
    "Can the DPL30 be used for waste-fluid evacuation?",
  "DPL30 有刷电机和无刷电机怎么选？":
    "How should the brushed- and brushless-motor DPL30 versions be selected?",
  "DPL30 支持 12V 和 24V 吗？":
    "Does the DPL30 support 12 V and 24 V configurations?",
  "DPL30 和 DPL60 怎么选？":
    "How should the DPL30 and DPL60 be selected?",
  "DPL30 液体隔膜泵适用于仪器内部清洗液输送、试剂转移、废液抽排、管路预充和小流量液体循环等场景。对于需要 300 mL/min 流量、100 kPa 额定压力和紧凑结构的液路系统，DPL30 可作为常规液体输送模块集成到体外诊断设备、生命科学仪器、实验室自动化设备和分析检测系统中。":
    "The DPL30 liquid diaphragm pump is suited to wash-fluid delivery, reagent transfer, waste-fluid evacuation, line priming, and low-flow liquid circulation inside instruments. For fluidic systems requiring 300 mL/min flow, a 100 kPa rated pressure, and a compact design, the DPL30 can be integrated as a liquid-delivery module in IVD equipment, life science instruments, laboratory automation equipment, and analytical systems.",
  "可以。DPL30 具备自吸能力，适合用于仪器内部废液抽排、清洗液回收和低压力液体转移等场景。规格书中 DPL30 的自吸高度为 6 mH₂O，适合需要一定吸液能力的液路模块。具体废液介质是否适用，需要结合实际液体成分和过液材质进行评估。":
    "Yes. The DPL30 provides self-priming capability for waste-fluid evacuation, wash-fluid recovery, and low-pressure liquid transfer inside instruments. Its specified self-priming lift is 6 mH₂O. Confirm waste-fluid compatibility against the actual fluid composition and wetted materials.",
  "如果设备运行时间较短、启停频率不高，且对成本更敏感，可以选择 DPL30 有刷电机型号。如果设备需要长时间连续运行、维护周期更长或整机寿命要求更高，建议选择 DPL30 无刷电机型号。DPL30 有刷电机版本寿命为 3,000 h，无刷电机版本寿命为 10,000 h。":
    "For shorter operating periods, lower start-stop frequency, and cost-sensitive designs, the brushed-motor DPL30 may be suitable. For extended continuous operation, longer maintenance intervals, or higher system life requirements, select the brushless-motor DPL30. The specified service life is 3,000 h for the brushed version and 10,000 h for the brushless version.",
  "RPL-P4 12–80 μL/rev 小量程无阀泵是一款用于微量加样、滴定和小体积定量输送的陶瓷柱塞无阀泵，适用于自动化分析仪器、IVD 设备和紧凑型液路模块。":
    "RPL-P4 12–80 μL/rev Low-Volume Valveless Piston Pump is a ceramic-piston valveless pump for trace-volume dispensing, titration, and small-volume metered delivery. It is suitable for automated analytical instruments, IVD equipment, and compact fluidic modules.",
  "产品通过陶瓷柱塞旋转位移完成吸液与排液，可减少外置电磁阀使用，降低液路复杂度、阀件维护和残留风险；具体排量、接口和安装方式可根据项目需求确认。":
    "The product performs liquid aspiration and discharge through the rotary displacement of a ceramic piston. This can reduce the need for external solenoid valves, lower fluidic complexity, and reduce valve-maintenance and residual-liquid risks. Confirm the specific displacement, interfaces, and mounting method according to the project requirements.",
  "PDM5 压力检测模块用于自动化仪器液路中的压力监测、堵塞预警和系统保护。模块采用 PEEK 流道结构，配备 1/4-28 UNF 内螺纹接口，适合与常见微流体管路和接头系统集成。":
    "PDM5 Pressure Sensing Module is used for pressure monitoring, clogging alerts, and system protection in automated-instrument fluidic paths. The module uses a PEEK flow-path structure and a 1/4-28 UNF female-thread interface, and is suitable for integration with common microfluidic fittings and tubing systems.",
  "该模块输出数字压力信号，支持 I2C 通讯，可用于 IVD、生命科学、实验室自动化和分析仪器中的泵后压力检测、管路堵塞判断、流路异常识别和设备运行状态反馈。":
    "The module outputs a digital pressure signal and supports I2C communication. It can be used in IVD, life science, laboratory automation, and analytical instruments for downstream-of-pump pressure monitoring, tubing blockage detection, fluidic anomaly identification, and equipment operating-status feedback.",
  "适合用于仪器液路中的压力监测、堵塞预警、泵后压力反馈和系统保护。":
    "It is suitable for pressure monitoring, clogging alerts, downstream-of-pump pressure feedback, and system protection in instrument fluidic paths.",
  "标准压力范围为 10–1200 kPa。":
    "The standard pressure range is 10–1200 kPa.",
  "PDM5 使用 I2C 通讯，默认 7-bit I2C 地址为 0x6D。":
    "PDM5 uses I2C communication; the default 7-bit I2C address is 0x6D.",
  "液路接口为 1/4-28 UNF 内螺纹，适合与常见微流体接头和管路系统集成。":
    "The fluidic interface is a 1/4-28 UNF female thread and is suitable for integration with common microfluidic fittings and tubing systems.",
  "适合。规格书中内部体积为 ≤55 µL。":
    "Yes. The internal volume listed in the datasheet is ≤55 µL.",
  "各接管端内径规格相同的为等径结构，不同接管端采用不同内径规格的为异径结构。":
    "A fitting is equal-bore when all tubing ports use the same ID; it is reducing when the port IDs differ.",
  "本页面接管尺寸按适配软管内径显示，实际装配前应同时确认软管材质、硬度和尺寸公差。":
    "Tubing dimensions on this page refer to the compatible tubing ID. Before assembly, also confirm the tubing material, hardness, and dimensional tolerance.",
  "需要结合输送介质、工作温度、压力和清洁要求确认，无法确定时请提交工况由工程师协助核对。":
    "Confirm compatibility based on the conveyed fluid, operating temperature, pressure, and cleaning requirements. If compatibility is uncertain, submit the operating conditions for engineering review.",
  "需要结合输送介质、工作温度、压力、清洁要求和密封圈材质综合确认，无法确定时请提交工况由工程师协助核对。":
    "Confirm compatibility based on the conveyed fluid, operating temperature, pressure, cleaning requirements, and seal material. If compatibility is uncertain, submit the operating conditions for engineering review.",
  "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。":
    "Add the current model to your list and request a drawing; our engineers will confirm the applicable version and provide it.",
  "可以将当前型号加入清单并添加图纸需求，由工程师核对商品编码和资料版本后提供。":
    "Add the current model to your list and request a drawing; our engineers will verify the product code and document revision before providing it.",
  "该型号为非穿板结构，通常用于管路中的直接连接。":
    "This model uses a non-bulkhead design and is generally used for direct in-line connections.",
  "该型号支持穿板安装，适用于设备面板、机壳或固定支架上的接口布置。":
    "This model supports bulkhead mounting for ports arranged on equipment panels, housings, or fixed brackets.",
  "该型号为带阀结构。带阀型号在接头断开时可以关闭流路，不带阀型号断开后流路保持开放。":
    "This model has a shut-off design. Shut-off versions close the fluidic path when disconnected, while non-shut-off versions leave the path open.",
  "该型号为不带阀结构。带阀型号在接头断开时可以关闭流路，不带阀型号断开后流路保持开放。":
    "This model has a non-shut-off design. Shut-off versions close the fluidic path when disconnected, while non-shut-off versions leave the path open.",
  "适配3.2 mm接管内径。选型时还需要同时确认公母端、阀门配置和设备安装方式。":
    "It accepts tubing with an ID of 3.2 mm. Selection should also confirm the gender, valve configuration, and equipment mounting method.",
  "适配6.4 mm接管内径。选型时还需要同时确认公母端、阀门配置和设备安装方式。":
    "It accepts tubing with an ID of 6.4 mm. Selection should also confirm the gender, valve configuration, and equipment mounting method.",
  "需要结合液体介质、浓度、温度、接触时间和清洗方式确认PVDF的材料兼容性。":
    "Confirm PVDF compatibility based on the fluid, concentration, temperature, contact time, and cleaning method.",
  "需要结合液体介质、浓度、温度、接触时间和清洗方式确认PPS的材料兼容性。":
    "Confirm PPS compatibility based on the fluid, concentration, temperature, contact time, and cleaning method.",
  "需要结合液体介质、浓度、温度、接触时间和清洗方式确认PEEK的材料兼容性。":
    "Confirm PEEK compatibility based on the fluid, concentration, temperature, contact time, and cleaning method.",
  "需要结合实际介质、温度、压力和清洁要求确认PP的化学兼容性。":
    "Confirm PP chemical compatibility based on the actual fluid, temperature, pressure, and cleaning requirements.",
  "不直接接触液体。模块夹持透明管路进行检测，可减少对液路的污染风险和额外流阻。":
    "It does not contact the fluid directly. The module clamps the transparent tubing for detection, helping reduce contamination risk and additional flow resistance in the fluidic path.",
  "标准配置覆盖 1.6、2.0、2.5、3.2、4.0、4.8、6.0、6.4 mm 透明软管外径。":
    "Standard configurations cover transparent tubing ODs of 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0, and 6.4 mm.",
  "支持。模块通讯接口为 TTL232，通讯协议支持 Modbus RTU。":
    "Yes. The module uses a TTL232 communication interface and supports the Modbus RTU protocol.",
  "需要结合实际气泡尺寸判断。可检测气泡或液体宽度为 > 0.8 mm，过小气泡或液柱可能无法稳定识别。":
    "Detection depends on the actual bubble size. The detector can identify bubbles or liquid columns wider than 0.8 mm; smaller bubbles or liquid columns may not be detected reliably.",
  "搅拌桨的叶片形状、直径、长度和安装端结构都与反应杯尺寸、液量和搅拌空间有关，不能只按单一标准型号选择。":
    "Blade shape, diameter, length, and mounting-end structure depend on the reaction cup dimensions, liquid volume, and available mixing space. A single standard model should not be selected without considering these factors.",
  "需要结合目标液量、杯底形状、转速范围、混匀时间和是否允许气泡或飞溅确认。平板、螺旋和角叶片适合不同混匀方式。":
    "Confirm the target liquid volume, cup-bottom geometry, speed range, mixing time, and whether bubbles or splashing are acceptable. Flat, spiral, and angled blades suit different mixing methods.",
  "可以。涂层主要用于降低挂液、改善清洗效果或满足特定介质要求，具体颜色和材料需根据项目确认。":
    "Yes. A coating can reduce liquid retention, improve cleanability, or meet specific fluid requirements. The coating color and material should be confirmed for the project.",
  "需要根据反应杯形状、液面高度、目标液量、转速范围和叶片结构确认。叶片角度、桨叶宽度、同轴度和搅拌深度都会影响气泡、飞溅和混匀稳定性。":
    "Confirm the reaction cup shape, liquid level, target volume, speed range, and blade structure. Blade angle, width, concentricity, and mixing depth all affect bubbles, splashing, and mixing stability.",
  "表面涂层通常用于降低挂液、改善清洗效果或满足特定介质兼容性要求。是否需要涂层，需要结合样本或试剂类型、清洗方式、颜色要求和寿命要求确认。":
    "Surface coatings are typically used to reduce liquid retention, improve cleanability, or meet fluid-compatibility requirements. Whether a coating is needed depends on the sample or reagent, cleaning method, color requirements, and service-life requirements.",
  "采样针主要按客户仪器结构来图定制。官网页面只展示典型用途和可定制方向，具体外径、内径、长度、针尖和安装方式需结合图纸确认。":
    "Sampling probes are primarily customized from the customer's instrument design. This page shows typical uses and customization options; the OD, ID, length, tip, and mounting method must be confirmed against the drawings.",
  "内壁抛光可降低液体残留和挂壁风险，有助于提升清洗效果和减少交叉污染，适合试剂、样本和低残留要求较高的液路。":
    "Internal polishing can reduce liquid retention and wall adhesion, improving cleaning performance and helping to reduce cross-contamination in reagent, sample, and low-residue fluidic paths.",
  "可以根据项目需求确认电容式液位检测适配方式，需要结合针体结构、线缆连接、安装方式和整机检测方案确认。":
    "Capacitive liquid-level detection can be evaluated for the project. Confirmation should include the probe structure, cable connection, mounting method, and the instrument-level detection scheme.",
  "建议优先提供 2D 图纸、3D 文件或实物样品。如果暂时没有完整图纸，也可以先提供仪器安装空间、目标液体、吸液容量、针体长度和接口要求，由 FOREACH 协助整理初步确认项。":
    "Providing 2D drawings, 3D files, or a physical sample is preferred. If complete drawings are not yet available, provide the instrument installation space, target fluid, aspiration volume, probe length, and interface requirements so FOREACH can prepare an initial configuration review.",
  "通常需要结合针尖形状、内壁抛光、外壁涂层、清洗方式和液体特性一起确认。对于高残留风险的样本或试剂，可重点评估内壁粗糙度、外壁防挂液处理和清洗站适配。":
    "Tip geometry, internal polishing, external coating, cleaning method, and fluid properties should be evaluated together. For samples or reagents with higher residue risk, review internal roughness, external anti-drip treatment, and cleaning-station compatibility in particular.",
  "采样针更偏液体吸取和分配，穿刺针更强调穿透封膜、瓶塞或密闭耗材后的取液能力，通常需要确认针尖强度、穿刺角度和排气结构。":
    "Sampling probes are mainly intended for liquid aspiration and dispensing, while piercing probes emphasize liquid access through seals, stoppers, or closed consumables. Tip strength, piercing angle, and venting structure usually need to be confirmed.",
  "可以。排气方向、排气槽、侧孔和液体通道需要根据耗材结构和取液动作确认，避免取液不稳定或产生气阻。":
    "Yes. The vent direction, vent groove, side port, and liquid channel should be confirmed against the consumable structure and aspiration sequence to avoid unstable aspiration or air lock.",
  "建议提供耗材结构、封膜或瓶塞材料、穿刺深度、取液位置、针体运动方向、安装空间和目标液体类型。":
    "Provide the consumable structure, seal or stopper material, piercing depth, aspiration position, probe travel direction, installation space, and target fluid type.",
  "可以。封膜、橡胶塞、塑料盖或密闭耗材的材料和厚度不同，针尖角度、刃口方向、强度和表面处理都需要重新确认，避免穿刺不稳定、堵针或耗材碎屑进入液路。":
    "Yes. Seal, rubber-stopper, plastic-cap, and other closed-consumable materials and thicknesses vary. Tip angle, cutting-edge direction, strength, and surface treatment must be reviewed to avoid unstable piercing, needle blockage, or debris entering the fluidic path.",
  "密闭耗材在取液时可能产生负压或气阻，影响取液稳定性。通过排气孔、排气槽或独立气液路径设计，可以改善取液连续性，并减少气泡对后端液路的影响。":
    "Closed consumables can develop negative pressure or air lock during aspiration, affecting stability. A vent port, vent groove, or separate gas-liquid path can improve aspiration continuity and reduce the effect of bubbles on the downstream fluidic path.",
  "清洗针主要用于针外壁清洗、针内壁冲洗、废液抽排和残液处理，目的是降低 carry-over、挂液和交叉污染风险。":
    "Cleaning probes are used for outer-wall cleaning, inner-wall flushing, waste-fluid evacuation, and residual-liquid removal. The aim is to reduce carry-over, liquid retention, and cross-contamination risk.",
  "需要根据清洗站空间、清洗液入口数量、废液出口数量和清洗动作确认。多头结构适合同时完成冲洗和排废，但对空间和加工一致性要求更高。":
    "Select the configuration based on cleaning-station space, wash-fluid inlet count, waste-fluid outlet count, and the cleaning sequence. Multi-head designs can combine flushing and waste discharge but place higher demands on space and manufacturing consistency.",
  "可以。侧孔方向、数量、孔径和位置需要结合清洗液喷射方向、目标清洗区域和废液回收路径确认。":
    "Yes. Side-port direction, quantity, diameter, and position should be confirmed against the wash-fluid spray direction, target cleaning area, and waste-fluid recovery path.",
  "需要同时确认喷孔方向、清洗液流量、废液抽排路径、针体相对位置和清洗动作。对于残留风险较高的场景，可结合侧孔喷洗、内外壁冲洗和防挂液表面处理。":
    "Confirm the spray-port direction, wash-fluid flow rate, waste-fluid evacuation path, probe position, and cleaning sequence together. For higher-residue applications, consider side-port spray cleaning, inner- and outer-wall flushing, and anti-drip surface treatment.",
  "可以。清洗针通常需要和清洗站空间、废液槽、进液路径和抽排路径一起确认。建议提供清洗站结构图、针体运动方向、目标清洗区域和废液回收方式。":
    "Yes. A cleaning probe normally needs to be reviewed together with the cleaning-station space, waste-fluid tank, inlet path, and evacuation path. Provide the station layout, probe travel direction, target cleaning area, and waste-fluid recovery method.",
  "可以。HMD 电磁阀系列可根据项目需求配置不同通道数和端口形式，HLD 旋转阀系列可根据液路切换需求配置不同阀位结构。":
    "Yes. The HMD solenoid-valve series can be configured with different channel counts and port arrangements. The HLD rotary-valve series can be configured with different valve-position structures for the required fluidic switching sequence.",
  "HMD3 适合 30mm 行程、单通道、小体积精密加液和紧凑型液路集成需求，可根据项目确认端口形式和注射器规格。":
    "The HMD3 Syringe Pump is designed for 30 mm travel, single-channel, low-volume precision dispensing, and compact fluidic integration. Confirm the port arrangement and syringe specification for the project.",
  "HMD6 系列可支持 1、2、3、4、6、8 通道配置，具体通道数量需结合设备空间、注射器规格和液路结构确认。":
    "The HMD6 Syringe Pump supports 1-, 2-, 3-, 4-, 6-, and 8-channel configurations. Confirm the required channel count based on the available equipment space, syringe specification, and fluidic architecture.",
  "HLD 旋转阀系列可根据项目需求配置 3通、5通、9通等多端口阀位结构，用于液路切换和试剂分配。":
    "The HLD rotary-valve series can be configured with 3-way, 5-way, 9-way, and other multiport valve-position arrangements for fluidic switching and reagent distribution.",
  "HLD 旋转阀系列适合多端口液路切换、试剂选择、定量分配和样本转移等需要多阀位控制的液路系统。":
    "The HLD rotary-valve series is suited to fluidic systems requiring multi-position control for multiport path switching, reagent selection, metered distribution, and sample transfer.",
  "可支持 RS-232、RS-485、CAN 等通讯方式，具体控制协议和接口形式可根据项目需求确认。":
    "RS-232, RS-485, and CAN communication are supported. The control protocol and interface format should be confirmed for the project.",
  "可以。可根据选型需求提供 2D 图纸或 3D 模型，用于设备布局、结构验证和液路集成评估。":
    "Yes. 2D drawings or 3D models can be provided for equipment layout, mechanical verification, and fluidic-integration evaluation.",
  "建议根据注射器规格、加液量程、通道数量、阀门结构、安装空间和通讯方式提交需求，由工程师协助确认配置。":
    "Provide the syringe specification, dispensing range, channel count, valve structure, installation space, and communication method so our engineers can confirm the configuration.",
  "有刷电机版本适合对成本和基础输送功能更敏感的设备；无刷电机版本更适合长时间运行、维护频率低、寿命和稳定性要求更高的仪器平台。":
    "Brushed-motor versions suit equipment where cost and basic delivery functions are the main priorities. Brushless-motor versions are better suited to instrument platforms requiring longer continuous operation, lower maintenance frequency, and higher service life and stability.",
  "选型时建议重点关注泵类型、额定流量、额定压力、电机类型、膜片材质、阀片材质、泵头材质、接口方式和安装空间，并结合实际液体介质进行确认。":
    "For selection, review the pump type, rated flow rate, rated pressure, motor type, diaphragm material, valve material, pump-head material, connection method, and installation space, together with the actual fluid.",
  "可以。隔膜泵具有一定自吸能力，适合用于仪器内部废液抽排、清洗液回收和低压力液体转移等场景。具体是否适用仍需结合废液成分和过液材料兼容性评估。":
    "Yes. Diaphragm pumps provide self-priming capability and can be used for internal waste-fluid evacuation, wash-fluid recovery, and low-pressure liquid transfer. Suitability still depends on the waste-fluid composition and wetted-material compatibility.",
  "如果标准型号在流量、压力、材料、接口方向或安装空间方面不能完全匹配，可点击“型号选择”进入隔膜泵选型页面，按具体参数进一步筛选，或提交需求由工程师协助确认。":
    "If a standard model does not fully match the required flow rate, pressure, materials, port orientation, or installation space, open the model-selection page to filter by the relevant parameters or submit the requirements for engineering review.",
  "支持。DPL30 标准型号中包含 DC 24V 和 DC 12V 两种电压配置。选型时可根据整机供电平台选择 24V 或 12V 版本，详情页规格表和型号配置表中应同时展示 12V / 24V 标准型号。":
    "Yes. Standard DPL30 models are available in both DC 24 V and DC 12 V configurations. Select the 24 V or 12 V version to match the system power platform; the specifications and model-configuration tables should show both standard options.",
  "EP/PS 适用于常规液体输送场景，配置为 EPDM 膜片、EPDM 阀片和 PPS 泵头。FF/PS 适用于对过液材料要求更高的场景，配置为 PTFE 膜片、FFKM 阀片和 PPS 泵头。实际选型需要根据液体介质、温度、浓度和兼容性测试结果确认。":
    "EP/PS is intended for conventional liquid delivery and uses an EPDM diaphragm, EPDM valves, and a PPS pump head. FF/PS is intended for more demanding wetted-material requirements and uses a PTFE diaphragm, FFKM valves, and a PPS pump head. Final selection should be based on the fluid, temperature, concentration, and compatibility-test results.",
  "DPL30 和 DPL60 都属于液体隔膜泵，主要区别是流量。DPL30 的流量为 300 mL/min，适合小流量液体输送、废液抽排和管路预充；DPL60 的流量为 600 mL/min，更适合对输送速度、清洗效率和排液效率要求更高的液路系统。如果压力需求相同但需要更大流量，可以优先选择 DPL60。":
    "DPL30 and DPL60 are both liquid diaphragm pumps; the main difference is flow rate. DPL30 delivers 300 mL/min and suits low-flow delivery, waste-fluid evacuation, and line priming. DPL60 delivers 600 mL/min and is better suited to fluidic systems requiring faster delivery, more efficient cleaning, or quicker drainage. If the pressure requirement is the same but a higher flow rate is needed, DPL60 is the preferred option.",
  "EP/PS 适合常规气液混合抽排和废液处理场景；FF/PS 更适合对材料兼容性要求更高的液路。具体选择应结合介质成分、工作环境和寿命要求确认。":
    "EP/PS suits conventional gas-liquid evacuation and waste-fluid handling. FF/PS is better suited to fluidic paths with more demanding material-compatibility requirements. Select based on the fluid composition, operating environment, and service-life requirements.",
  "可点击“型号选择”进入隔膜泵选型页面，按泵类型、流量、耐压、电机类型和材料组合进行筛选，也可以提交具体工况由工程师协助确认。":
    "Open the model-selection page to filter by pump type, flow rate, pressure rating, motor type, and material combination, or submit the operating conditions for engineering review.",
  "可以。具体排量、清洗口、接口形式和安装方向可根据客户液路方案确认。":
    "Yes. The specific displacement, cleaning port, interface format, and mounting orientation can be confirmed against the customer's fluidic design.",
  "无阀泵可减少外置电磁阀使用，降低液路复杂度，并减少阀件堵塞、卡滞和维护风险。":
    "A valveless pump reduces the need for external solenoid valves, simplifying the fluidic path and reducing the risk of valve blockage, sticking, and maintenance.",
  "基板型适合阀组集成，螺纹型适合 M6 或 1/4-28UNF 接头连接，倒刺型适合软管连接和低压液路开关。":
    "Manifold versions suit valve-bank integration, threaded versions suit M6 or 1/4-28 UNF fitting connections, and barbed versions suit tubing connections and low-pressure fluidic switching.",
  "MRV3 适合多试剂选择、样本分配、清洗液切换和废液路径管理。对于需要 10 / 16 / 24 通道集中切换的自动化分析仪器，可减少外部阀组和管路交叉。":
    "MRV3 suits multi-reagent selection, sample distribution, wash-fluid switching, and waste-fluid path management. It can reduce external valve banks and tubing crossovers in automated analytical instruments requiring centralized switching across 10, 16, or 24 channels.",
  "主要根据试剂瓶数量、清洗液数量、废液路径数量和预留端口数量确认。端口越多，越适合多试剂平台；端口较少时，结构更简单。":
    "Confirm the configuration based on the number of reagent bottles, wash-fluid paths, waste-fluid paths, and reserved ports. More ports suit multi-reagent platforms, while fewer ports provide a simpler structure.",
  "MRV3 规格包含 15.8μL、10μL、2.9μL 内容积。内容积越小，越有利于降低残留、混液和死体积风险，适合对进样稳定性敏感的液路。":
    "MRV3 is available with internal volumes of 15.8 μL, 10 μL, and 2.9 μL. A smaller internal volume helps reduce carry-over, mixing, and dead-volume risk, making it suitable for fluidic paths sensitive to injection stability.",
  "建议提供通道数量、通道直径、接口规格、介质类型、是否需要驱动器、通信方式、安装空间和阀位控制逻辑。":
    "Provide the channel count, channel diameter, interface specification, fluid type, driver requirement, communication method, installation space, and valve-position control logic.",
  "HP 高压阀适合 HPLC 自动进样、高压样品切换、系统排气、样品旁路和分析仪器高压流路模块。":
    "The HP high-pressure valve suits HPLC autosampling, high-pressure sample switching, system venting, sample bypass, and high-pressure fluidic modules in analytical instruments.",
  "需要确认最大工作压力、流动相或样品介质、接口规格、阀位切换逻辑、内体积要求、安装尺寸和控制方式。":
    "Confirm the maximum operating pressure, mobile phase or sample fluid, interface specification, valve-position switching logic, internal-volume requirement, installation dimensions, and control method.",
  "0.8μL 内体积适合对残留、滞留体积和样品扩散敏感的高压分析液路，常见于自动进样和检测前端流路切换。":
    "An internal volume of 0.8 μL suits high-pressure analytical fluidic paths sensitive to carry-over, hold-up volume, and sample dispersion, such as autosampling and detector-inlet switching paths.",
  "高压阀与系统压力、接口、介质兼容性、阀位切换状态和整机安装空间强相关，需要结合客户高压液路方案确认。":
    "High-pressure valve selection depends closely on system pressure, interfaces, fluid compatibility, valve-position states, and instrument installation space. The configuration should be confirmed against the customer's high-pressure fluidic design.",
  "不同材质如何选择？":
    "How should different fitting materials be selected?",
  "应根据介质兼容性、温度、强度和洁净要求选择PP、PA或PVDF等材质。":
    "Select PP, PA, PVDF, or another material based on fluid compatibility, temperature, mechanical strength, and cleanliness requirements.",
  "公鲁尔和母鲁尔如何选择？":
    "How should male and female Luer connections be selected?",
  "应根据对接端接口形式选择公鲁尔或母鲁尔，并确认是否需要锁圈结构。":
    "Select a male or female Luer connection to match the mating interface, and confirm whether a locking-ring design is required.",
  "接管尺寸如何确认？":
    "How should the tubing connection size be confirmed?",
  "接管尺寸按软管内径匹配，同时应核对软管材质、硬度和实际装配松紧度。":
    "Match the connection size to the tubing ID, and also verify the tubing material, hardness, and actual fit during assembly.",
  "锁圈式和一体式鲁尔接头有什么区别？":
    "What is the difference between a locking-ring Luer fitting and an integral Luer fitting?",
  "锁圈式适合需要旋紧固定的连接，一体式结构更紧凑，应结合装配空间和使用方式选择。":
    "A locking-ring design suits connections that require threaded retention, while an integral design is more compact. Select between them based on the available assembly space and connection method.",
  "颜色是否可以定制？":
    "Can the fitting color be customized?",
  "标准颜色以在售型号为准，其他颜色需求可在提交清单时说明。":
    "Standard colors follow the currently available models. Specify any other color requirement when submitting the product list.",
};

/*
 * These rows are translated from the original Chinese label/value pair.
 * The pair is important for technical wording such as switching time,
 * service life, dimensions, and valve configuration.
 */
const SPECIFICATION_ROW_TRANSLATIONS: Record<string, string> = {
  "名称::陶瓷转阀": "Ceramic Rotary Valve",
  "触液材质::PCTFE / 氧化锆陶瓷 / 蓝宝石":
    "PCTFE / Zirconia Ceramic / Sapphire",
  "初始位置::通电自动复位": "Automatic reset on power-up",
  "切换时间::≤2s/圈，相邻端口＜100ms":
    "≤2 s/revolution; <100 ms between adjacent ports",
  "寿命::100万圈": "1,000,000 revolutions",
  "电机/驱动器::可选": "Optional",
  "电机减速比::1：10": "1:10",
  "外形尺寸::42*61*132.3mm，详见3.1":
    "42 × 61 × 132.3 mm; see Section 3.1",
  "安装尺寸::2-φ3通孔，间距43.5、49.6mm":
    "2 × φ3 through holes; spacing 43.5 mm and 49.6 mm",
  "工作环境温度::0-50℃": "0–50 °C",
  "工作相对湿度::20-80%RH": "20–80% RH",
  "适用电源::DC24V/2A±10%": "DC 24 V / 2 A ±10%",
  "工作介质::纯化水，其他液体介质需实际评估":
    "Purified water; other fluids require evaluation",
  "接管规格::可接内径 3.2 mm 软管":
    "Accepts tubing with an ID of 3.2 mm",
};

const ADDITIONAL_SPECIFICATION_LABEL_TRANSLATIONS: Record<string, string> = {
  "产品类型": "Product Type",
  "压力检测模块": "Pressure Sensing Module",
  "压力范围": "Pressure Range",
  "压力分辨率": "Pressure Resolution",
  "默认 I2C 地址": "Default I2C Address",
  "压力分辨率优于": "Pressure Resolution",
  "绝对精度 / TEB": "Absolute Accuracy / TEB",
  "内部体积": "Internal Volume",
  "螺纹接口": "Threaded Port",
  "外形尺寸": "Overall Dimensions",
  "重量": "Weight",
  "使用寿命": "Service Life",
  "工作温度": "Operating Temperature",
  "液路接口": "Fluidic Interface",
  "二维图纸": "2D Drawing",
  "图纸或样品": "Drawings or Samples",
  "产品名称": "Product Name",
  "产品型号": "Product Model",
  "产品类别": "Product Category",
  "产品系列": "Product Series",
  "介电常数（KV/mm）": "Dielectric Strength (kV/mm)",
  "低残留工艺": "Low-Residue Process",
  "准确性": "Accuracy",
  "切阀时间": "Valve Switching Time",
  "响应时间-带节能回路": "Response Time - Energy-Saving Circuit",
  "响应时间-标准型": "Response Time - Standard Version",
  "尺寸/mm": "Dimensions (mm)",
  "工作噪音": "Operating Noise",
  "安装尺寸及螺纹参数": "Mounting Dimensions and Thread Parameters",
  "安装尺寸（长×宽×高）": "Installation Dimensions (L × W × H)",
  "定量分辨率": "Dispensing Resolution",
  "密封件材质": "Seal Material",
  "密封圈材质": "Seal Material",
  "密封方式": "Sealing Method",
  "密封类型": "Seal Type",
  "流量 QMax，mL/Min": "Flow Qmax (mL/min)",
  "流量 QMin，mL/Min": "Flow Qmin (mL/min)",
  "流量系数CV": "Flow Coefficient (Cv)",
  "浓缩液份数": "Concentrate Portions",
  "浓缩液定量（μL）": "Concentrate Volume (μL)",
  "液位检测适配": "Liquid-Level Detection Compatibility",
  "液量精确度（额定行程）": "Liquid-Volume Accuracy (Rated Stroke)",
  "液面探测": "Liquid-Level Detection",
  "混匀条件": "Mixing Conditions",
  "清洗对象": "Cleaning Target",
  "清洗液路接口": "Wash-Fluid Port",
  "满量程步数": "Full-Stroke Step Count",
  "滤网材质": "Filter Material",
  "环境温度": "Ambient Temperature",
  "环境湿度": "Ambient Humidity",
  "相邻流道切换时间": "Adjacent-Channel Switching Time",
  "硬度（Shore A/D）": "Hardness (Shore A/D)",
  "脱 TIP 头步数": "Tip Ejection Steps",
  "装吸头所需力": "Tip Installation Force",
  "触液材料-定子": "Wetted Material - Stator",
  "触液材料-转子": "Wetted Material - Rotor",
  "通径": "Bore Diameter",
  "通讯类型": "Communication Type",
  "通道数": "Number of Channels",
  "配液量（mL）": "Liquid Preparation Volume (mL)",
  "量程（玻璃注射器）": "Volume Range (Glass Syringe)",
  "针体形式": "Needle Body Type",
  "针尖与孔位": "Needle Tip and Port Position",
  "针尖结构": "Tip Structure",
  "阀门配置（电磁阀）": "Valve Configuration (Solenoid Valve)",
  "陶瓷套件": "Ceramic Set",
  "隔膜材质": "Diaphragm Material",
  "输出信号": "Output Signal",
  "默认采样率": "Default Sampling Rate",
  "最高采样率": "Maximum Sampling Rate",
  "绝对精度": "Absolute Accuracy",
  "绝对总误差": "Absolute Total Error",
  "流道材料": "Flow-Path Material",
  "推荐接头扭矩": "Recommended Fitting Torque",
  "推荐电压": "Recommended Voltage",
  "工作电压": "Operating Voltage",
  "工作电流": "Operating Current",
  "地址": "Address",
  "可调": "Adjustable",
  "连接方式": "Connection Type",
  "检测方式": "Detection Method",
  "检测对象": "Detection Target",
  "检测介质": "Detected Medium",
  "可检测尺寸": "Detectable Size",
  "通讯协议": "Communication Protocol",
  "输出方式": "Output Method",
  "储存温度": "Storage Temperature",
  "响应时间": "Response Time",
  "接管内径1": "Tube ID 1",
  "接管内径2": "Tube ID 2",
  "接管内径3": "Tube ID 3",
  "适配管外径": "Compatible Tube OD",
  "适配管材": "Compatible Tubing",
  "弯曲强度（MPa）": "Flexural Strength (MPa)",
  "弯曲强度（Mpa）": "Flexural Strength (MPa)",
  "拉伸强度（MPa）": "Tensile Strength (MPa)",
  "拉伸强度（Mpa）": "Tensile Strength (MPa)",
  "硬度（Shore A）": "Hardness (Shore A)",
  "硬度（Shore D）": "Hardness (Shore D)",
  "硬度（Shore）": "Hardness (Shore)",
  "稀释液定量（μL）": "Diluent Volume (μL)",
  "退 TIP 头推力": "Tip Ejection Force",
  "试剂A 工作液路接口": "Reagent A Working-Fluid Port",
  "试剂A 清洗液路接口": "Reagent A Wash-Fluid Port",
  "试剂A 端耐压": "Reagent A Port Pressure Rating",
  "试剂B 工作液路接口": "Reagent B Working-Fluid Port",
  "试剂B 清洗液路接口": "Reagent B Wash-Fluid Port",
  "试剂B 端耐压": "Reagent B Port Pressure Rating",
};

/*
 * These entries are taken from the current Chinese product records. They
 * stay ahead of the legacy phrase table so English pages follow the source
 * record instead of falling back to a generic product description.
 */
const ACTUAL_SPECIFICATION_LABEL_TRANSLATIONS: Record<string, string> = {
  "\u6709\u5237\u7535\u673a\u89c4\u683c\u53c2\u6570": "Brushed Motor Specifications",
  "\u65e0\u5237\u7535\u673a\u89c4\u683c\u53c2\u6570": "Brushless Motor Specifications",
  "\u6cf5\u5934\u6750\u8d28": "Pump Head Material",
  "\u4ea7\u54c1\u7c7b\u578b": "Product Type",
  "\u7535\u673a\u7c7b\u578b": "Motor Type",
  "\u989d\u5b9a\u7535\u538b\u3001\u8fde\u7eed\u8fd0\u884c": "Rated Voltage, Continuous Operation",
  "\u989d\u5b9a\u529f\u7387": "Rated Power",
  "\u9600\u7247\u6750\u8d28": "Valve Material",
  "\u5de5\u4f5c\u4ecb\u8d28": "Working Medium",
  "\u4ecb\u8d28\u6e29\u5ea6": "Fluid Temperature",
  "\u819c\u7247\u6750\u8d28": "Diaphragm Material",
  "\u5bff\u547d": "Service Life",
  "\u989d\u5b9a\u538b\u529b": "Rated Pressure",
  "\u5de5\u4f5c\u73af\u5883\u6e29\u5ea6": "Operating Temperature",
  "\u5de5\u4f5c\u73af\u5883\u76f8\u5bf9\u6e7f\u5ea6": "Operating Relative Humidity",
  "\u63a5\u7ba1\u89c4\u683c": "Port Size",
  "\u7a7a\u8f7d\u6d41\u91cf": "Free-Flow Rate",
  "\u7a7a\u8f7d\u6d41\u91cf\uff08\u5355\u5934\uff09": "Free-Flow Rate (Single Head)",
  "\u566a\u97f3": "Noise",
  "\u81ea\u5438\u9ad8\u5ea6": "Self-Priming Height",
  "\u5b58\u50a8\u73af\u5883\u6e29\u5ea6": "Storage Temperature",
  "\u5b58\u50a8\u73af\u5883\u76f8\u5bf9\u6e7f\u5ea6": "Storage Relative Humidity",
  "\u63a5\u53e3": "Interface",
  "\u91cd\u91cf": "Weight",
  "\u6700\u5927\u6b63\u538b": "Maximum Positive Pressure",
  "\u6700\u5927\u8d1f\u538b": "Maximum Negative Pressure",
  "\u4f7f\u7528\u6d41\u4f53": "Working Fluid",
  "\u9600\u7ed3\u6784": "Valve Configuration",
  "\u4f7f\u7528\u538b\u529b\u8303\u56f4": "Operating Pressure Range",
  "\u5b54\u53e3\u76f4\u5f84": "Orifice Diameter",
  "\u54cd\u5e94\u65f6\u95f4-\u6807\u51c6\u578b": "Response Time - Standard Version",
  "\u54cd\u5e94\u65f6\u95f4-\u5e26\u8282\u80fd\u56de\u8def": "Response Time - Energy-Saving Circuit",
  "\u6781\u9650\u8010\u538b": "Maximum Pressure Rating",
  "\u4f7f\u7528\u73af\u5883\u6e29\u5ea6": "Operating Ambient Temperature",
  "\u4f7f\u7528\u6d41\u4f53\u6e29\u5ea6": "Working Fluid Temperature",
  "\u9600\u5ba4\u5185\u5bb9\u79ef": "Valve-Chamber Volume",
  "\u9694\u819c\u6750\u8d28": "Diaphragm Material",
  "\u989d\u5b9a\u7535\u538b": "Rated Voltage",
  "\u7ebf\u5708\u7edd\u7f18\u7b49\u7ea7": "Coil Insulation Class",
  "\u529f\u8017-\u6807\u51c6\u578b": "Power Consumption - Standard Version",
  "\u6d41\u91cf\u7cfb\u6570CV": "Flow Coefficient (Cv)",
  "\u63a5\u7ba1\u5185\u5f84": "Tubing ID",
  "\u8fde\u63a5\u7ed3\u6784": "Connection Structure",
  "\u5bc6\u5c01\u65b9\u5f0f": "Sealing Method",
  /* PLUNGER_SPEC_LABEL_TRANSLATIONS_20260727 */
  "容量": "Capacity",
  "展示泵头材质": "Pump Head Material (Shown)",
  "泵头材质可选范围": "Available Pump Head Materials",
  "柱塞材质可选范围": "Available Plunger Materials",
  "液路接口": "Fluidic Port",
  "推荐最高转速": "Recommended Maximum Speed",
  "电机步距角": "Motor Step Angle",
  "导程": "Lead Screw Pitch",
  "100%量程准确性": "Accuracy at 100% Full Scale",
  "100%量程重复性": "Repeatability at 100% Full Scale",
  "2%量程准确性": "Accuracy at 2% Full Scale",
  "2%量程重复性": "Repeatability at 2% Full Scale",
  "背隙": "Backlash",
  "设计寿命": "Design Life",
  "最大流体压力": "Maximum Fluid Pressure",
};

const CONTROL_MODULE_SPEC_VALUE_TRANSLATIONS: Record<string, string> = {
  "气泡检测模块": "Air Bubble Detection Module",
  "非接触式红外检测": "Non-contact infrared detection",
  "气泡 / 液滴 / 气液状态": "Air bubbles / droplets / gas-liquid state",
  "> 0.8 mm 宽度": "Width > 0.8 mm",
  "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号":
    "UART/TTL digital signal, 0–5 V IO analog voltage, and IO digital alarm signal",
  "气泡检测 6 ms；液体检测 6 ms":
    "Air-bubble detection: 6 ms; liquid detection: 6 ms",
  "压力检测模块": "Pressure Sensing Module",
  "100 Hz 可调": "Adjustable to 100 Hz",
  "1/4-28 UNF 内螺纹": "1/4-28 UNF female thread",
};

const ACTUAL_SPECIFICATION_VALUE_TRANSLATIONS: Record<string, string> = {
  "\u5341\u5b57\u578b": "Cross-Shaped",
  "\u672a\u5355\u72ec\u547d\u540d": "Not Separately Named",
  "\u6309 EP/PS \u4e0e FF/PS \u6750\u8d28\u7ec4\u5408\u533a\u5206\u3002": "Distinguished by the EP/PS and FF/PS material combinations.",
  "\u89c4\u683c\u8868\u4f53\u73b0 12V / 24V\uff1b\u9009\u578b\u9875\u4e0d\u7b5b\u9009\u7535\u538b\u3002": "The specification table lists 12 V / 24 V; voltage is not used as a selection filter.",
  "\u989d\u5b9a\u7535\u538b\u3001\u8fde\u7eed\u8fd0\u884c": "Rated Voltage, Continuous Operation",
  "\u578b\u53f7\u914d\u7f6e\u4ee5\u9009\u578b\u8868\u4e3a\u51c6\u3002": "Refer to the selection table for the applicable model configuration.",
  "\u7a7a\u6c14\u3001\u6c34\u3001\u8131\u79bb\u5b50\u6c34\uff08\u7eaf\u6c34\uff09\u3001\u7a00\u91ca\u6db2\u3001\u6e05\u6d17\u6db2\u7b49":
    "Air, water, deionized water (purified water), diluent, and wash fluid",
  "\u6446\u81c2\u9694\u819c\u9600": "Swing-arm diaphragm valve",
  "-75kPa~0.25MPa": "-75 kPa to 0.25 MPa",
  "1.4mm": "1.4 mm",
  "15ms\u4ee5\u5185\uff08\u672a\u63a5\u8d1f\u8f7d\u72b6\u6001\uff09": "≤15 ms (without load)",
  "25ms\u4ee5\u5185\uff08\u672a\u63a5\u8d1f\u8f7d\u72b6\u6001\uff09": "≤25 ms (without load)",
  "0.38MPa": "0.38 MPa",
  "0～50℃": "0–50 °C",
  "0～50℃\uff08\u672a\u51bb\u7ed3\u72b6\u6001\uff09": "0–50 °C (unfrozen state)",
  "20uL": "20 µL",
  "EPDM\u3001FKM\u3001FFKM": "EPDM, FKM, FFKM",
  "DC 12/24V\uff08±10%\uff09": "DC 12/24 V (±10%)",
  "F\u7ea7": "Class F",
  "2.5W\uff080.11A\uff09": "2.5 W (0.11 A)",
  "\u9e2d\u5634\u5f0f": "Duckbill",
  "\u4e09\u4f4d\u4e03\u901a": "2-position, 6-port with vent",
  "\u9ad8\u5206\u5b50\u6750\u6599": "Polymer",
};

const ACTUAL_NARRATIVE_EXACT_TRANSLATIONS: Record<string, string> = {
  "\u578b\u53f7\u914d\u7f6e": "Model Configuration",
  "\u914d\u7f6e\u9884\u7559\u9875": "Configuration Placeholder",
  "\u540e\u7eed\u9884\u7559": "Reserved for Future Release",
  "\u89c4\u683c\u8868\u4f53\u73b0 12V / 24V\uff1b\u9009\u578b\u9875\u4e0d\u7b5b\u9009\u7535\u538b\u3002":
    "The specification table lists 12 V / 24 V; voltage is not a selection filter on the product-selection page.",
  "\u5185\u87ba\u7eb9\u516d\u89d2\u87ba\u6bcd": "Female Thread Hex Nut",
  "\u7a7f\u677f\u6bcd\u9c81\u5c14\u63a5\u5934": "Bulkhead Female Luer Fitting",
  "\u9009\u578b\u9875\u57fa\u7840\u578b\u53f7": "Base Model for Selection",
  "\u5411\u4e0b": "Downward",
  "\u53ef\u7a7f\u677f\u5b89\u88c5": "Panel-Mountable",
  "\u6cf5\u9600\u524d\u7aef\u9897\u7c92\u62e6\u622a": "Particle Filtration Upstream of Pumps and Valves",
  "\u5341\u5b57\u578b": "Cross-Shaped",
  "\u672a\u5355\u72ec\u547d\u540d": "Not Separately Named",
  "\u81ea\u52a8\u5316\u79fb\u6db2": "Automated Pipetting",
  "\u6837\u672c\u8f6c\u79fb": "Sample Transfer",
  "\u4e2d\u7b49\u4f53\u79ef\u6db2\u4f53\u5904\u7406": "Mid-Volume Liquid Handling",
  "\u81ea\u52a8\u5316\u6db2\u8def\u6a21\u5757": "Automated Fluidic Module Integration",
  "\u591a\u7aef\u53e3\u6db2\u8def\u5207\u6362": "Multiport Fluidic Switching",
  "\u8bd5\u5242\u9009\u62e9\u9600\u96c6\u6210": "Reagent Selection Valve Integration",
  "\u591a\u7aef\u53e3\u8bd5\u5242\u5206\u914d": "Multiport Reagent Dispensing",
  "\u590d\u6742\u6db2\u8def\u5207\u6362": "Complex Fluidic Switching",
  "\u5fae\u91cf\u52a0\u6837\u6cf5": "Microliter Dispensing Pump",
  "\u6ef4\u5b9a\u6cf5": "Titration Pump",
  "\u704c\u88c5\u6cf5": "Filling Pump",
  "\u6d53\u7f29\u6db2\u7a00\u91ca": "Concentrate Dilution",
  "\u53cc\u6db2\u8def\u914d\u6db2": "Dual-Path Liquid Preparation",
  "\u6bd4\u4f8b\u52a0\u6db2": "Proportional Liquid Addition",
  "\u81ea\u52a8\u5316\u914d\u6bd4\u6a21\u5757": "Automated Ratio-Control Module",
  "\u7a00\u91ca\u914d\u6db2\u6cf5": "Dilution and Liquid-Preparation Pump",
  "\u6db2\u4f53\u5206\u914d": "Liquid Dispensing",
  "\u4f4e\u6b8b\u7559\u6db2\u8def": "Low-Residual-Volume Fluidic Path",
  "\u6837\u672c\u4ed3\u53d6\u6db2": "Sample-Well Aspiration",
  "\u8bd5\u5242\u4ed3\u53d6\u6db2": "Reagent-Well Aspiration",
  "\u5bc6\u95ed\u8017\u6750\u6db2\u8def": "Closed Consumable Fluidic Path",
  "\u6e05\u6d17\u7ad9\u96c6\u6210": "Wash-Station Integration",
  "\u676f\u5185\u6405\u62cc": "In-Cup Mixing",
  "\u6d82\u5c42\u9632\u6302\u6db2": "Coating for Reduced Liquid Retention",
  "\u89c4\u683c\u53c2\u6570": "Specifications",
  "\u6280\u672f\u53c2\u6570": "Technical Specifications",
  "\u63d0\u4ea4\u9009\u578b\u9700\u6c42": "Submit a Selection Request",
  "\u63d0\u4ea4\u5b9a\u5236\u9700\u6c42": "Submit a Custom Request",
  "\u8054\u7cfb\u5de5\u7a0b\u5e08": "Contact an Engineer",
  "\u8054\u7cfb\u6211\u4eec": "Contact Us",
  "\u9009\u62e9\u578b\u53f7": "Select a Model",
  "\u6dfb\u52a0\u56fe\u7eb8": "Add Drawing",
  "\u52a0\u5165\u6e05\u5355": "Add to List",
  "\u67e5\u770b\u8be6\u60c5": "View Details",
  "\u5355\u7aef\u5835\u5934": "Single-End Plug",
  "\u662f\u5426\u53ef\u4ee5\u67e5\u770b\u4e8c\u7ef4\u5c3a\u5bf8\u56fe\uff1f": "Can I view a 2D dimensional drawing?",
  "\u5f53\u524d\u672a\u5339\u914d\u5230\u516c\u5f00\u4e8c\u7ef4\u56fe\u7eb8\uff0c\u53ef\u901a\u8fc7\u9700\u6c42\u63d0\u4ea4\u8868\u5355\u8054\u7cfb\u5de5\u7a0b\u5e08\u786e\u8ba4\u3002": "A public 2D drawing is not currently matched to this record. Contact an engineer through the request form to confirm availability.",
  "\u57fa\u677f\u578b\u3001\u87ba\u7eb9\u578b\u548c\u5012\u523a\u578b\u600e\u4e48\u9009\uff1f": "How should manifold, threaded, and barbed versions be selected?",
  "EPDM\u3001FKM\u3001FFKM \u819c\u7247\u5982\u4f55\u9009\u62e9\uff1f": "How should EPDM, FKM, and FFKM diaphragms be selected?",
  "\u662f\u5426\u9700\u8981\u8282\u80fd\u56de\u8def\uff1f": "Is an energy-saving circuit required?",
  "\u57fa\u677f\u578b\u9002\u5408\u9600\u7ec4\u96c6\u6210\uff0c\u87ba\u7eb9\u578b\u9002\u5408 M6 \u6216 1/4-28UNF \u63a5\u5934\u8fde\u63a5\uff0c\u5012\u523a\u578b\u9002\u5408\u8f6f\u7ba1\u8fde\u63a5\u548c\u4f4e\u538b\u6db2\u8def\u5f00\u5173\u3002": "Manifold versions suit valve-bank integration, threaded versions suit M6 or 1/4-28 UNF fitting connections, and barbed versions suit tubing connections and low-pressure fluidic switching.",
  "\u9700\u8981\u6839\u636e\u8bd5\u5242\u3001\u6e05\u6d17\u6db2\u3001\u6e29\u5ea6\u3001\u5bff\u547d\u548c\u5316\u5b66\u517c\u5bb9\u6027\u786e\u8ba4\u3002\u5e38\u89c4\u6c34\u6027\u4ecb\u8d28\u53ef\u5148\u8bc4\u4f30 EPDM\uff0c\u8010\u5316\u5b66\u6027\u8981\u6c42\u66f4\u9ad8\u65f6\u518d\u786e\u8ba4 FKM \u6216 FFKM\u3002": "Select based on the reagent, wash fluid, temperature, service life, and chemical compatibility. EPDM can be evaluated for conventional aqueous fluids; FKM or FFKM may be considered where higher chemical resistance is required.",
  "\u5982\u679c\u9600\u9700\u8981\u957f\u65f6\u95f4\u4fdd\u6301\u901a\u7535\u72b6\u6001\uff0c\u53ef\u8bc4\u4f30\u8282\u80fd\u56de\u8def\uff1b\u5982\u679c\u53ea\u662f\u77ed\u65f6\u95f4\u5207\u6362\uff0c\u901a\u5e38\u53ef\u6839\u636e\u63a7\u5236\u8282\u62cd\u548c\u529f\u8017\u8981\u6c42\u786e\u8ba4\u3002": "If the valve must remain energized for extended periods, consider an energy-saving circuit. For short switching cycles, confirm the configuration based on the control timing and power requirements.",
  "RPL-P4 \u65e0\u9600\u6cf5\u9002\u5408\u54ea\u4e9b\u5e94\u7528\u573a\u666f\uff1f": "Which applications is the RPL-P4 valveless pump suited for?",
  "RPL-P4 \u662f\u6807\u51c6\u54c1\u8fd8\u662f\u5b9a\u5236\u54c1\uff1f": "Is the RPL-P4 a standard product or a custom configuration?",
  "\u4e3a\u4ec0\u4e48\u9009\u62e9\u65e0\u9600\u6cf5\u7ed3\u6784\uff1f": "Why choose a valveless pump design?",
  "RPL-P4 \u662f\u5426\u9002\u5408\u5c0f\u4f53\u79ef\u6db2\u4f53\u5904\u7406\uff1f": "Is the RPL-P4 suitable for small-volume liquid handling?",
  "RPL-P4 \u7684\u63a5\u53e3\u53ef\u4ee5\u5b9a\u5236\u5417\uff1f": "Can the RPL-P4 fluidic interfaces be customized?",
  "RPL-P4 \u9002\u5408\u5fae\u91cf\u8bd5\u5242\u52a0\u6837\u3001\u5c0f\u4f53\u79ef\u6ef4\u5b9a\u3001\u5b9a\u91cf\u8f93\u9001\u548c\u6821\u51c6\u6db2\u52a0\u6ce8\u7b49\u573a\u666f\uff0c\u5e38\u7528\u4e8e\u81ea\u52a8\u5316\u5206\u6790\u4eea\u5668\u548c\u7d27\u51d1\u578b\u6db2\u8def\u6a21\u5757\u3002": "The RPL-P4 is suited to trace-reagent dispensing, small-volume titration, quantitative delivery, and calibration-fluid dispensing. It is commonly used in automated analytical instruments and compact fluidic modules.",
  "RPL-P4 \u6309\u9879\u76ee\u9700\u6c42\u8fdb\u884c\u914d\u7f6e\u786e\u8ba4\uff0c\u4e0d\u4f5c\u4e3a\u56fa\u5b9a\u6807\u51c6\u54c1\u76f4\u63a5\u9009\u8d2d\u3002\u5177\u4f53\u6392\u91cf\u3001\u63a5\u53e3\u548c\u5b89\u88c5\u65b9\u5f0f\u9700\u8981\u7ed3\u5408\u5ba2\u6237\u8bbe\u5907\u7ed3\u6784\u786e\u8ba4\u3002": "The RPL-P4 is configured for each project rather than offered as a fixed standard product. Confirm the displacement, interfaces, and mounting arrangement against the customer's equipment design.",
  "\u65e0\u9600\u6cf5\u53ef\u51cf\u5c11\u5916\u7f6e\u7535\u78c1\u9600\u4f7f\u7528\uff0c\u964d\u4f4e\u6db2\u8def\u590d\u6742\u5ea6\uff0c\u5e76\u51cf\u5c11\u9600\u4ef6\u5835\u585e\u3001\u5361\u6ede\u548c\u7ef4\u62a4\u98ce\u9669\u3002": "A valveless pump can reduce the need for external solenoid valves, simplify the fluidic path, and lower the risk of valve blockage, sticking, and maintenance.",
  "\u9002\u5408\u3002RPL-P4 \u8986\u76d6 12\u201380 \u03bcL/rev \u5c0f\u91cf\u7a0b\u8f93\u9001\u9700\u6c42\uff0c\u9002\u7528\u4e8e\u5fae\u91cf\u6db2\u4f53\u5904\u7406\u548c\u7d27\u51d1\u7a7a\u95f4\u96c6\u6210\u3002": "Yes. The RPL-P4 covers low-volume delivery requirements from 12 to 80 μL/rev and is suitable for trace-liquid handling and integration where space is limited.",
  "\u53ef\u4ee5\u6839\u636e\u9879\u76ee\u9700\u6c42\u786e\u8ba4\u5177\u4f53\u63a5\u53e3\u5f62\u5f0f\u3001\u5b89\u88c5\u65b9\u5f0f\u548c\u6db2\u8def\u8fde\u63a5\u65b9\u5f0f\u3002": "The interface type, mounting arrangement, and fluidic connection method can be confirmed for the project.",
  "6010 \u7cfb\u5217\u7535\u78c1\u9600\u9002\u5408\u54ea\u4e9b\u6db2\u8def\u63a7\u5236\uff1f": "Which fluidic control tasks is the 6010 Solenoid Valve suited for?",
  "6010 \u7cfb\u5217\u9002\u5408\u8bd5\u5242\u901a\u65ad\u3001\u6e05\u6d17\u6db2\u63a7\u5236\u3001\u5e9f\u6db2\u63a7\u5236\u3001\u6837\u672c\u9488\u6e05\u6d17\u548c\u5c0f\u578b\u9600\u7ec4\u96c6\u6210\uff0c\u5e38\u7528\u4e8e IVD \u4e0e\u81ea\u52a8\u5316\u5206\u6790\u4eea\u5668\u3002": "The 6010 series is suited to reagent on/off control, wash-fluid and waste-fluid control, sample-probe cleaning, and small valve-manifold integration. It is commonly used in IVD and automated analytical instruments.",
  "\u76f4\u901a\u5e95\u9762\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "straight bottom-sealed thread-to-barb fitting",
  "\u76f4\u901a\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934": "straight thread-sealed thread-to-barb fitting",
  "\u672c\u8272": "natural",
  "\u9ed1\u8272": "black",
  "\u767d\u8272": "white",
  "\u900f\u660e": "clear",
  "\u84dd\u8272": "blue",
  "\u8f6f\u7ba1\u6750\u8d28\u3001\u58c1\u539a\u548c\u786c\u5ea6": "tubing material, wall thickness, and hardness",
  "\u87ba\u7eb9\u6807\u51c6\u3001\u8f6f\u7ba1\u6750\u8d28\u4e0e\u786c\u5ea6\u3001\u4ecb\u8d28\u517c\u5bb9\u6027\u53ca\u88c5\u914d\u7a7a\u95f4": "thread standard, tubing material and hardness, fluid compatibility, and assembly space",
};

/*
 * Control-module copy is maintained from the Chinese source record rather
 * than assembled from generic product phrases. This keeps ABD and PDM5
 * descriptions, applications, highlights, and FAQ entries one-to-one with
 * the authoritative control-module detail data.
 */
const SOURCE_ALIGNED_NARRATIVE_TRANSLATIONS: Record<string, string> = {
  "DPL60 液体隔膜泵是一款适用于较高流量液体输送场景的隔膜泵，主要用于仪器内部清洗液输送、废液抽排、管路冲洗、液体循环和快速排液模块。与 DPL30 相比，DPL60 在相同 100 kPa 额定压力等级下提供更高流量，更适合对输送速度、清洗效率和排液效率要求更高的设备系统。\n\nDPL60 系列额定流量为 600 mL/min，额定压力为 100 kPa，自吸高度为 3 mH₂O，支持有刷电机和无刷电机配置。该系列可用于体外诊断设备、实验室自动化设备、生命科学仪器和分析检测系统中的清洗、排液、供液和液路循环模块。": "The DPL60 liquid diaphragm pump is designed for higher-flow liquid delivery in instrument-internal fluidic systems. It is suited to wash-fluid delivery, waste-fluid evacuation, line flushing, liquid circulation, and rapid-drain modules. Compared with the DPL30, the DPL60 provides a higher flow rate at the same 100 kPa rated pressure, making it suitable for systems that require faster delivery, more efficient cleaning, or faster waste-liquid evacuation.\n\nThe DPL60 series provides a rated flow rate of 600 mL/min, a rated pressure of 100 kPa, and a self-priming lift of 3 mH₂O. It is available with brushed or brushless motor configurations and can be used in cleaning, waste-drain, fluid-supply, and fluidic-circulation modules for IVD equipment, laboratory automation equipment, life science instruments, and analytical testing systems.",
  "DPL30H 液体隔膜泵是一款适用于较高出口压力液路系统的隔膜泵，适合用于仪器内部液体输送、试剂转移、加压供液、较长管路输送和阻力较高的液路模块。该系列在 300 mL/min 流量基础上提供 600 kPa 额定压力，适合对出口压力要求高于常规液体隔膜泵的设备系统。\n\nDPL30H 系列支持有刷电机和无刷电机版本，采用卡套接头结构，可连接 6×4 mm 硬管，适合需要稳定管路连接和较高压力输送的仪器内部液路集成。对于需要 300 mL/min 流量、600 kPa 额定压力和硬管连接方式的应用，DPL30H 可作为液体输送、管路供液和加压液路模块的隔膜泵方案。": "The DPL30H liquid diaphragm pump is designed for fluidic systems requiring higher outlet pressure. It is suited to instrument-internal liquid delivery, reagent transfer, pressurized fluid supply, longer fluidic lines, and higher-resistance fluidic modules. Based on a 300 mL/min flow rate, the series provides a rated pressure of 600 kPa for equipment requiring higher outlet pressure than conventional liquid diaphragm pumps.\n\nThe series is available with brushed or brushless motors and uses a compression-fitting connection for 6 × 4 mm rigid tubing, making it suitable for instrument-internal fluidic integration where stable tubing connections and higher-pressure delivery are required. For applications requiring 300 mL/min flow, 600 kPa rated pressure, and rigid-tubing connections, the DPL30H provides a diaphragm-pump solution for liquid delivery, fluidic supply, and pressurized fluidic modules.",
  "DPGL800 气液混合隔膜泵是一款适用于气体抽吸、负压建立和气液混合物抽排的无刷隔膜泵，可用于仪器内部负压抽吸模块、废液与气体混合抽排、密闭容器抽气和气路辅助输送等场景。该系列工作介质覆盖气体和气液混合物，适合需要同时考虑气体流量、负压能力和系统集成空间的设备应用。\n\nDPGL800 采用 24V 无刷电机，单头空载流量为 6 L/min，最大正压为 30 kPa，最大负压＜-90 kPa，接口为 G1/8 内螺纹。对于需要较高负压能力、较大气体流量和气液混合物抽排能力的体外诊断设备、实验室自动化设备和分析检测系统，DPGL800 可作为气液混合隔膜泵和负压抽吸泵方案进行集成。": "The DPGL800 gas-liquid diaphragm pump is a brushless pump designed for gas aspiration, negative-pressure generation, and gas-liquid mixture evacuation. It can be used in instrument-internal negative-pressure modules, mixed gas-liquid waste evacuation, closed-vessel air extraction, and auxiliary gas-path delivery. The series supports gas and gas-liquid mixtures and is suited to equipment applications that require a balance of gas flow, vacuum capability, and integration space.\n\nThe DPGL800 uses a 24 V brushless motor and provides a no-load flow rate of 6 L/min per head, a maximum positive pressure of 30 kPa, a maximum negative pressure of < -90 kPa, and a G1/8 female-thread interface. For IVD equipment, laboratory automation equipment, and analytical testing systems requiring high vacuum, higher gas flow, and gas-liquid mixture evacuation, the DPGL800 can be integrated as a gas-liquid diaphragm pump and vacuum-aspiration solution.",
  "HMD3 30mm 电磁阀注射泵是一款面向小体积精密液体处理的单通道注射泵配置，采用 30mm 行程结构，可适配 50μL–5mL 玻璃注射器，适合对加液体积、结构尺寸和液路控制稳定性有要求的自动化仪器集成。\n\n该系列可根据项目需求配置 2端口、3端口及分配阀结构，支持 TTL、RS-485、CAN 通讯方式，并可围绕端口形式、注射器规格、安装尺寸和液路连接方式进行定制确认。": "The HMD3 30 mm solenoid-actuated syringe pump is a single-channel configuration for precision low-volume liquid handling. It uses a 30 mm stroke and accepts 50 μL–5 mL glass syringes, making it suitable for automated instrument integration where delivered volume, compact dimensions, and stable fluidic control are important.\n\nThe series can be configured with 2-port, 3-port, or dispensing-valve structures. It supports TTL, RS-485, and CAN communication and can be customized for port arrangement, syringe specification, mounting dimensions, and fluidic connections.",
  "HMD6 60mm 电磁阀注射泵是一款 60mm 行程的电磁阀系列注射泵，支持 1–8 通道配置，可适配 25μL–25mL 玻璃注射器，适合中大量程定量输送、多通道加液和自动化液路模块集成。\n\n该系列可根据设备布局和液路需求选择不同通道数量、端口形式和阀门配置，支持 TTL、RS-485、CAN 通讯方式；多通道配置、注射器规格和安装结构需结合项目空间和输送量程进一步确认。": "The HMD6 60 mm solenoid-actuated syringe pump is a 60 mm-stroke configuration that supports 1 to 8 channels and accepts 25 μL–25 mL glass syringes. It is suited to medium- and high-volume quantitative delivery, multi-channel dispensing, and integration into automated fluidic modules.\n\nThe series can be configured with different channel counts, port arrangements, and valve configurations according to the equipment layout and fluidic requirements. It supports TTL, RS-485, and CAN communication; the final channel configuration, syringe specification, and mounting structure should be confirmed against the project space and delivery range.",
  "HLD3 30mm 旋转阀注射泵是一款 30mm 行程的多端口液路切换型注射泵，可适配 50μL–5mL 玻璃注射器，适合小体积定量分配、多端口试剂切换和样本转移等液路控制需求。\n\n该系列支持平面转阀或柱面转阀结构，可配置 3通非分配阀、3通分配阀和 9通分配阀等阀位形式，并可根据液路数量、切换逻辑、接口方式和安装空间进行定制确认。": "The HLD3 30 mm rotary-valve syringe pump is a multiport fluidic-switching configuration with a 30 mm stroke. It accepts 50 μL–5 mL glass syringes and is suited to low-volume quantitative dispensing, multiport reagent switching, and sample transfer.\n\nThe series supports planar or cylindrical rotary-valve structures and can be configured with 3-port non-distribution, 3-port distribution, and 9-port distribution valve arrangements. The final configuration can be confirmed according to the number of fluidic paths, switching sequence, interface type, and available installation space.",
  "HLD6 60mm 旋转阀注射泵是一款 60mm 行程的多端口旋转阀注射泵，可适配 25μL–25mL 玻璃注射器，适合中大量程定量输送、多端口试剂分配和复杂液路切换需求。\n\n该系列覆盖 HLD6 / HLD6M 相关配置，可根据项目需求配置 3通非分配阀、5通分配阀和 9通分配阀等旋转阀结构，并支持围绕阀位数量、端口形式、安装尺寸、通讯方式和系统集成方式进行定制确认。": "The HLD6 60 mm rotary-valve syringe pump is a multiport configuration with a 60 mm stroke. It accepts 25 μL–25 mL glass syringes and is suited to medium- and high-volume quantitative delivery, multiport reagent dispensing, and complex fluidic switching.\n\nThe series covers HLD6 and HLD6M configurations and can be configured with 3-port non-distribution, 5-port distribution, and 9-port distribution rotary-valve structures. The final valve-position count, port arrangement, mounting dimensions, communication interface, and system-integration method can be confirmed for the project.",
  "DRPL-0109 1:9 双头比例输送无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。\n\n该配置对应浓缩液 100 μL、稀释液 900 μL、配液量 1 mL，可用于需要稳定比例输送、减少外置阀件并降低液路复杂度的设备集成场景。": "The DRPL-0109 1:9 dual-head valveless piston pump is a ceramic-piston configuration for dilution, liquid preparation, and proportional delivery through two fluidic paths. It is suited to automated-instrument fluidic modules that deliver concentrate and diluent at a fixed ratio.\n\nThis configuration provides 100 μL for the concentrate, 900 μL for the diluent, and a 1 mL prepared volume. It is suited to equipment integration where stable ratio delivery, fewer external valves, and a simpler fluidic path are required.",
  "DRPL-0119 1:19 双头比例输送无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。\n\n该配置对应浓缩液 60 μL、稀释液 1140 μL、配液量 1.2 mL，可用于需要稳定比例输送、减少外置阀件并降低液路复杂度的设备集成场景。": "The DRPL-0119 1:19 dual-head valveless piston pump is a ceramic-piston configuration for dilution, liquid preparation, and proportional delivery through two fluidic paths. It is suited to automated-instrument fluidic modules that deliver concentrate and diluent at a fixed ratio.\n\nThis configuration provides 60 μL for the concentrate, 1,140 μL for the diluent, and a 1.2 mL prepared volume. It is suited to equipment integration where stable ratio delivery, fewer external valves, and a simpler fluidic path are required.",
  "PNC-U32-16-PK-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和PEEK主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。": "The PNC-U32-16-PK-N is a high-pressure fitting for rigid tubing with a 1.6 mm OD. It uses a 10-32 UNF thread and a PEEK body, with a rated pressure of 25 MPa, and is suited to high-pressure rigid-tubing connections in analytical instruments and laboratory automation equipment.",
  "PNC6-U32-16-PK-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和PEEK主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。": "The PNC6-U32-16-PK-N is a high-pressure fitting for rigid tubing with a 1.6 mm OD. It uses a 10-32 UNF thread and a PEEK body, with a rated pressure of 25 MPa, and is suited to high-pressure rigid-tubing connections in analytical instruments and laboratory automation equipment.",
  "PNF-U32-16-SS-N是一款适用于外径1.6 mm硬管的高压接头，采用10-32 UNF螺纹和SUS主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。": "The PNF-U32-16-SS-N is a high-pressure fitting for rigid tubing with a 1.6 mm OD. It uses a 10-32 UNF thread and a SUS body, with a rated pressure of 25 MPa, and is suited to high-pressure rigid-tubing connections in analytical instruments and laboratory automation equipment.",
  "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？": "Does the PMMA / PEEK notation in the model indicate the only available configuration?",
  "不是。页面型号用于展示常用基础配置，便于客户快速识别容量、接口和主要结构。实际项目中，泵头材质、柱塞材质、接口方式、电机配置、光耦反馈、阀组件和控制方式可根据液体兼容性、结构空间和系统集成需求进一步确认。": "No. The model shown on the page represents a commonly used base configuration so that customers can quickly identify the capacity, interfaces, and main construction. For a specific project, the pump-head material, piston material, interface type, motor configuration, optocoupler feedback, valve assembly, and control method can be confirmed according to fluid compatibility, available space, and system-integration requirements.",
};

const SOURCE_ALIGNED_CTA_TRANSLATIONS: Record<string, string> = {
  "注射泵可根据您的液路与结构需求进行定制": "Configure the syringe pump around your fluidic path and mechanical requirements.",
  "恒永达可根据您的应用场景、注射器规格、行程平台、通道数量、阀门结构、通讯方式、安装空间和液路集成需求，协助确认适合自动化仪器集成的注射泵配置。": "FOREACH can help confirm a syringe-pump configuration for automated instrument integration based on the application, syringe specification, stroke platform, channel count, valve structure, communication interface, available space, and fluidic integration requirements.",
  "需要确认倒刺接头规格？": "Need help confirming the barb fitting specification?",
  "提交软管内径、产品结构、材质、颜色及使用工况，由工程师协助确认标准型号或定制方案。": "Share the tube ID, fitting structure, material, color, and operating conditions so an engineer can confirm a standard model or custom configuration.",
  "需要确认穿板倒刺接头规格？": "Need help confirming the bulkhead barb fitting specification?",
  "提交螺纹规格、接管内径、软管材质、介质和安装空间，由工程师协助确认适用型号。": "Share the thread specification, tube ID, tubing material, fluid, and available installation space so an engineer can confirm the suitable model.",
  "需要确认六角螺母规格？": "Need help confirming the hex-nut specification?",
  "提交螺纹规格、材质和配套接头型号，由工程师协助确认适用配置。": "Share the thread specification, material, and mating fitting model so an engineer can confirm the suitable configuration.",
  "需要确认单向阀规格？": "Need help confirming the check-valve specification?",
  "提交接口规格、介质、流量、压力、开启条件和安装方向，由工程师协助确认适用产品。": "Share the port specification, fluid, flow rate, pressure, cracking condition, and installation direction so an engineer can confirm the suitable product.",
  "需要确认过滤器规格？": "Need help confirming the filter specification?",
  "提交过滤要求、接口规格、流量、压力、介质和温度，由工程师协助确认适用产品。": "Share the filtration requirement, port specification, flow rate, pressure, fluid, and temperature so an engineer can confirm the suitable product.",
  "需要确认快插接头型号？": "Need help confirming the push-in fitting model?",
  "提交接口尺寸、公母端、阀门配置、安装方式、材质及使用工况，由工程师协助确认标准型号。": "Share the port size, male or female end, valve configuration, mounting method, material, and operating conditions so an engineer can confirm the standard model.",
  "需要定制采样针结构？": "Need a custom sampling-needle design?",
  "请提供针管外径、内径、长度、针尖形状、侧孔要求、安装空间、液体类型和是否需要液位检测，FOREACH 可协助确认采样针定制方案。": "Please provide the needle-tube OD, ID, length, tip geometry, side-hole requirements, available space, fluid type, and whether liquid-level detection is required. FOREACH can help confirm a custom sampling-needle design.",
  "需要确认穿刺针针尖、排气和取液结构？": "Need to confirm the piercing-tip, venting, and liquid-draw structure?",
  "请提供耗材结构、穿刺对象、穿刺深度、排气方向、取液路径和安装空间，FOREACH 可协助确认穿刺针定制方案。": "Please provide the consumable structure, piercing target, piercing depth, venting direction, liquid-draw path, and available space. FOREACH can help confirm a custom piercing-needle design.",
  "需要定制清洗针或清洗站液路结构？": "Need a custom wash needle or wash-station fluidic design?",
  "请提供清洗站空间、清洗液路径、废液路径、喷孔方向、针体数量和清洗动作要求，FOREACH 可协助确认清洗针定制方案。": "Please provide the wash-station space, wash-fluid path, waste-fluid path, spray-hole direction, needle count, and washing-motion requirements. FOREACH can help confirm a custom wash-needle design.",
  "需要确认搅拌桨叶片形状和混匀效果？": "Need to confirm the impeller geometry and mixing performance?",
  "请提供反应杯尺寸、目标液量、转速范围、混匀时间、叶片形状、安装端结构和是否需要涂层，FOREACH 可协助确认搅拌桨定制方案。": "Please provide the reaction-cup dimensions, target liquid volume, speed range, mixing time, blade geometry, mounting-end structure, and whether a coating is required. FOREACH can help confirm a custom impeller design.",
  "实验室自动化设备管路": "Tubing for laboratory automation equipment",
};
const SOURCE_ALIGNED_DETAIL_TRANSLATIONS: Record<string, string> = {
  "DRPL-0109 稀释比1:9 双头无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。 该配置对应浓缩液 100 μL、稀释液 900 μL、配液量 1 mL，可用于需要稳定比例输送、减少外置阀件并降低液路复杂度的设备集成场景。": "The DRPL-0109 1:9 dual-head valveless piston pump is a ceramic-piston pump for dilution, liquid preparation, and proportional delivery through two fluidic paths. It is suited to automated-instrument fluidic modules that deliver concentrate and diluent at a fixed ratio. This configuration provides 100 μL of concentrate, 900 μL of diluent, and a 1 mL prepared volume for equipment integration where stable ratio delivery, fewer external valves, and a simpler fluidic path are required.",
  "DRPL-0119 稀释比1:19 双头无阀泵是一款用于稀释、配液和双液路比例加液的陶瓷柱塞无阀泵，适合浓缩液与稀释液按固定比例输送的自动化仪器液路模块。 该配置对应浓缩液 60 μL、稀释液 1140 μL、配液量 1.2 mL，可用于需要稳定比例输送、减少外置阀件并降低液路复杂度的设备集成场景。": "The DRPL-0119 1:19 dual-head valveless piston pump is a ceramic-piston pump for dilution, liquid preparation, and proportional delivery through two fluidic paths. It is suited to automated-instrument fluidic modules that deliver concentrate and diluent at a fixed ratio. This configuration provides 60 μL of concentrate, 1,140 μL of diluent, and a 1.2 mL prepared volume for equipment integration where stable ratio delivery, fewer external valves, and a simpler fluidic path are required.",
  "采样针系列用于自动化分析仪器中的试剂吸取、样本吸取、液体分配和定量转移，可根据仪器结构、液体类型、目标容量和液位检测方式进行来图定制。针管可根据项目需求确认外径、内径、长度、针尖形状、侧孔结构、折弯方向和安装方式，并可结合内壁抛光、外壁涂层和电容式液位检测适配，降低挂液、残留和交叉污染风险。": "The sampling-probe series is designed for reagent aspiration, sample aspiration, liquid dispensing, and measured transfer in automated analytical instruments. Designs can be developed from drawings according to the instrument structure, fluid type, target volume, and liquid-level detection method. The tube OD, ID, length, tip geometry, side-hole structure, bend direction, and mounting method can be specified for the project. Internal polishing, external coatings, and capacitive liquid-level detection can also be considered to reduce liquid carryover, residue, and cross-contamination.",
  "穿刺针系列用于自动化仪器中封膜、瓶塞、试剂仓、样本仓和密闭耗材的穿刺取液场景，可根据穿刺对象、穿刺深度、液体路径和排气需求进行定制。针尖形状、针管强度、排气口方向、侧孔位置、折弯结构和安装方式均可根据设备空间确认，适合需要稳定穿刺、取液和排气控制的分析仪器液路模块。": "The piercing-probe series is designed to pierce seals, vial closures, reagent reservoirs, sample reservoirs, and closed consumables for liquid extraction in automated instruments. The design can be customized for the piercing target, depth, liquid path, and venting requirements. Tip geometry, tube strength, vent direction, side-hole position, bend structure, and mounting method can be confirmed against the available equipment space, making the series suitable for analytical-instrument fluidic modules that require controlled piercing, liquid extraction, and venting.",
  "清洗针系列用于自动化分析仪器中的针外壁清洗、针内壁冲洗、废液排出和残液处理，可根据清洗站结构、清洗液路径、废液路径和喷孔方向进行定制。产品可做单头、双头、多头、侧孔、弯折和多种涂层结构，适用于样本针清洗、试剂针清洗、废液抽排和降低 carry-over 风险的液路模块。": "The wash-probe series is designed for external needle washing, internal needle flushing, waste-fluid discharge, and residual-liquid management in automated analytical instruments. Designs can be customized for the wash-station structure, wash-fluid path, waste-fluid path, and spray-hole direction. Single-head, dual-head, multi-head, side-hole, bent, and coated configurations are available for sample-probe washing, reagent-probe washing, waste-fluid evacuation, and fluidic modules intended to reduce carryover.",
  "搅拌桨系列用于自动化分析仪器中的样本、试剂、稀释液和反应液混匀场景，可根据反应杯结构、目标液量、搅拌空间、转速范围和混匀效果进行来图定制。桨叶可做平板、螺旋、90度角叶片等结构，并可根据项目需求确认表面涂层、焊接方式、同轴度和安装端结构，适合对混匀效率和液体飞溅控制有要求的仪器模块。": "The stirring-paddle series is designed to mix samples, reagents, diluents, and reaction liquids in automated analytical instruments. Designs can be developed from drawings according to the reaction-cup structure, target liquid volume, available mixing space, speed range, and required mixing performance. Paddle geometries include flat, helical, and 90-degree-angle blades. Surface coatings, welding method, concentricity, and mounting-end structure can be confirmed for instrument modules that require efficient mixing and controlled liquid splashing.",
  "可按仪器结构定制外径、内径、总长和有效长度": "Customize the OD, ID, overall length, and effective length to match the instrument structure.",
  "支持尖口、平口、V型口、侧孔和弯折结构": "Support pointed, flat, V-shaped, side-hole, and bent-tip configurations.",
  "可结合内壁抛光降低挂液、残留和交叉污染风险": "Add internal polishing to help reduce liquid carryover, residue, and cross-contamination.",
  "可按项目需求确认外壁涂层和电容式液位检测适配": "Confirm external coatings and capacitive liquid-level detection compatibility for the project.",
  "适用于试剂针、样本针和自动化液体处理针组件": "Suitable for reagent probes, sample probes, and automated liquid-handling probe assemblies.",
  "可根据封膜、瓶塞和耗材结构定制针尖形状": "Customize the tip geometry for seals, vial closures, and consumable structures.",
  "支持排气口方向、侧孔位置和液体路径定制": "Customize the vent direction, side-hole position, and liquid path.",
  "可按穿刺深度、运动方向和安装空间确认结构": "Confirm the structure against the piercing depth, motion direction, and available mounting space.",
  "适用于封闭试剂仓、样本仓和密闭耗材取液": "Suitable for liquid extraction from closed reagent reservoirs, sample reservoirs, and sealed consumables.",
  "可结合折弯、焊接和安装端结构进行整机适配": "Adapt the probe to the instrument through bend, welding, and mounting-end structures.",
  "可根据清洗站空间定制单头、双头和多头结构": "Customize single-head, dual-head, and multi-head structures for the wash-station space.",
  "支持侧孔喷洗、排废通道和多路径清洗结构": "Support side-hole spray washing, waste-discharge channels, and multi-path wash structures.",
  "适合样本针、试剂针和清洗站液路集成": "Suitable for integration with sample probes, reagent probes, and wash-station fluidic paths.",
  "可根据清洗液路径和废液路径确认孔位方向": "Confirm hole orientation according to the wash-fluid and waste-fluid paths.",
  "可结合涂层处理降低挂液和交叉污染风险": "Add coating treatment to help reduce liquid carryover and cross-contamination.",
  "支持平板、螺旋、90度角叶片等桨叶结构": "Support flat, helical, and 90-degree-angle paddle geometries.",
  "可根据反应杯尺寸、液量和转速范围定制": "Customize the paddle for the reaction-cup dimensions, liquid volume, and speed range.",
  "可确认同轴度、安装端结构和焊接方式": "Confirm concentricity, mounting-end structure, and welding method.",
  "可做表面涂层以降低挂液和改善清洗效果": "Add a surface coating to help reduce liquid carryover and improve cleanability.",
  "适合对混匀效率、飞溅控制和液体残留有要求的仪器模块": "Suitable for instrument modules that require mixing efficiency, splash control, and low liquid residue.",
  "实验室自动化设备管路": "Tubing for laboratory automation equipment",
  "该 100 μL 聚醚醚酮（PEEK）展示配置适用于对避光、液体兼容性或长期稳定性要求更高的微量液体处理场景，可用于分子诊断、生命科学样本处理、特殊试剂分配和小体积反应体系构建。实际项目可根据液体特性、结构空间和系统集成方式进一步确认完整配置。": "This 100 μL PEEK configuration is designed for low-volume liquid handling applications that require light protection, fluid compatibility, or long-term stability. It can be used for molecular diagnostics, life science sample handling, specialty-reagent dispensing, and small-volume reaction systems. The complete configuration can be confirmed for the fluid properties, available space, and system-integration method of the specific project.",
  "TM 超微型柱塞泵主要适合什么类型的设备？": "What types of equipment are best suited to the TM ultra-compact piston pump?",
  "TM 超微型柱塞泵适合超紧凑型检测模块、便携式分析设备、小型体外诊断（IVD）模块、紧凑型生命科学仪器和低容量微流体控制系统。该系列重点在于小空间安装、轻量化结构和超紧凑液路集成。": "The TM ultra-compact piston pump is suited to ultra-compact testing modules, portable analytical equipment, small IVD modules, compact life science instruments, and low-volume microfluidic control systems. The series is intended for installations that prioritize limited-space mounting, a lightweight structure, and highly compact fluidic integration.",
  "TM 系列和 SM 系列有什么区别？": "What is the difference between the TM and SM series?",
  "TM 系列比 SM 系列更强调超微型结构和有限空间安装，适合更小型的检测模块、便携式设备和低容量液路系统。SM 系列则适合紧凑型仪器和小型液路模块，结构空间和液体处理能力相对更宽。": "The TM series places greater emphasis on an ultra-compact structure and installation in limited space, making it suitable for smaller testing modules, portable equipment, and low-volume fluidic systems. The SM series is intended for compact instruments and small fluidic modules with somewhat more available space and liquid-handling capacity.",
  "TM 超微型柱塞泵采用什么接口？": "What interface does the TM ultra-compact piston pump use?",
  "TM 超微型柱塞泵官网主展示配置采用 6-40 UNF 液路接口，适合小型化、低容量和空间受限的液路系统集成。实际项目中，接口方式可结合整机液路布局、安装空间和连接方案进一步评估。": "The main TM configuration shown on the website uses a 6-40 UNF fluidic interface for compact, low-volume, space-constrained fluidic systems. For a specific project, the interface can be evaluated against the complete instrument layout, available space, and connection method.",
  "TM 系列支持哪些泵头材质？": "Which pump-head materials are available for the TM series?",
  "TM 超微型柱塞泵官网主展示配置以 PMMA 泵头为主。若项目对液体兼容性、避光、结构强度或特殊材料有要求，可根据液体特性、加工方式、结构空间和批量需求进一步评估定制泵头材质方案。": "The main TM configuration shown on the website uses a PMMA pump head. If a project requires specific fluid compatibility, light protection, structural strength, or a special material, a custom pump-head material can be evaluated according to the fluid properties, manufacturing method, available space, and required volume.",
  "TM 系列可以和阀、控制器或光耦反馈组合吗？": "Can the TM series be combined with valves, controllers, or optocoupler feedback?",
  "TM 系列可根据项目需求评估与控制器、光耦反馈、阀组件及其他液路部件的组合方式。由于 TM 系列结构更小，具体集成方案需要重点确认安装空间、接口位置、控制方式和整机液路布局。": "The TM series can be evaluated for integration with controllers, optocoupler feedback, valve assemblies, and other fluidic components. Because of its smaller structure, the final integration should specifically confirm the mounting space, interface position, control method, and complete instrument fluidic layout.",
};
const CONTROL_MODULE_NARRATIVE_TRANSLATIONS: Record<string, string> = {
  "ABD 气泡检测模块": "ABD Air Bubble Detection Module",
  "智控系列": "Control Series",
  "智控模块": "Control Module",
  "ABD 气泡检测模块用于透明管路中的气泡、液滴和气液状态检测。模块采用非接触式检测方式，通过红外光在气体与液体中的能量差异识别管路状态，不直接接触液体介质，可避免额外污染和流阻。":
    "The ABD Air Bubble Detection Module detects air bubbles, droplets, and gas-liquid states in transparent tubing. It uses non-contact infrared detection to identify tubing conditions from the difference in infrared energy between gas and liquid, without direct contact with the fluid, helping avoid additional contamination and flow resistance.",
  "该模块适用于 IVD、生命科学、实验室自动化、环境监测和食品检测等设备中的液路状态监测，可用于气泡报警、液滴识别、试剂管路状态判断和设备异常保护。产品覆盖 1.6 mm 至 6.4 mm 主流透明软管外径，可根据实际管径选择对应配置。":
    "The module is designed for fluidic-status monitoring in IVD, life science, laboratory automation, environmental monitoring, and food-testing equipment. It can be used for air-bubble alarms, droplet identification, reagent-line status monitoring, and equipment fault protection. Configurations cover common transparent tubing ODs from 1.6 mm to 6.4 mm; select the applicable configuration according to the tubing diameter.",
  "气泡报警": "Air-bubble alarms",
  "液滴检测": "Droplet detection",
  "透明管路状态监测": "Transparent-tubing status monitoring",
  "试剂管路状态判断": "Reagent-line status monitoring",
  "液路异常保护": "Fluidic anomaly protection",
  "自动化仪器管路监控": "Tubing-path monitoring in automated instruments",
  "非接触式气泡 / 液滴检测": "Non-contact air-bubble / droplet detection",
  "适配 1.6–6.4 mm 透明软管外径": "Compatible with transparent tubing ODs from 1.6 to 6.4 mm",
  "支持 TTL / Modbus RTU 通讯": "TTL / Modbus RTU communication",
  "支持 UART/TTL 数字信号、IO 模拟电压输出和 IO 数字报警输出":
    "UART/TTL digital signal, IO analog-voltage output, and IO digital alarm output",
  "气泡 / 液体检测尺寸 > 0.8 mm": "Detectable air-bubble / liquid width > 0.8 mm",
  "气泡检测响应时间 6 ms": "Air-bubble detection response time: 6 ms",
  "液体检测响应时间 6 ms": "Liquid detection response time: 6 ms",
  "ABD 可以检测哪些管径？": "What tubing diameters can ABD detect?",
  "ABD 是否支持 Modbus RTU？": "Does ABD support Modbus RTU?",
  "ABD 能否检测很小的微气泡？": "Can ABD detect very small air bubbles?",
  "PDM5 压力检测模块用于自动化仪器液路中的压力监测、堵塞预警和系统保护。模块采用 PEEK 流道结构，配备 1/4-28 UNF 内螺纹接口，适合与常见微流体管路和接头系统集成。":
    "The PDM5 Pressure Sensing Module is designed for pressure monitoring, blockage alerts, and system protection in automated-instrument fluidic paths. It uses a PEEK flow-path structure with a 1/4-28 UNF female-thread interface for integration with common microfluidic tubing and fitting systems.",
  "该模块输出数字压力信号，支持 I2C 通讯，可用于 IVD、生命科学、实验室自动化和分析仪器中的泵后压力检测、管路堵塞判断、流路异常识别和设备运行状态反馈。":
    "The module provides a digital pressure signal and supports I2C communication. It can be used in IVD, life science, laboratory automation, and analytical instruments for downstream-of-pump pressure monitoring, tubing blockage detection, fluidic anomaly identification, and equipment status feedback.",
  "液路压力监测": "Fluidic pressure monitoring",
  "管路堵塞预警": "Tubing blockage alerts",
  "泵后压力反馈": "Downstream-of-pump pressure feedback",
  "流路异常识别": "Fluidic anomaly detection",
  "系统保护": "System protection",
  "自动化仪器状态监控": "Automated-instrument status monitoring",
  "压力范围 10–1200 kPa": "Pressure range: 10–1200 kPa",
  "I2C 数字输出": "I2C digital output",
  "PEEK 流道结构": "PEEK flow-path structure",
  "1/4-28 UNF 内螺纹接口": "1/4-28 UNF female-thread interface",
  "内部体积 ≤55 µL": "Internal volume ≤55 µL",
  "压力分辨率优于 5 Pa": "Pressure resolution better than 5 Pa",
  "TEB 优于 1%FS": "TEB better than 1%FS",
  "默认采样率 37.5 Hz，最高可调至 100 Hz":
    "Default sampling rate: 37.5 Hz; adjustable up to 100 Hz",
};

const ACTUAL_NARRATIVE_PHRASE_TRANSLATIONS: Array<[string, string]> = [
  ["\u5e26O\u5708", "with O-ring"],
  ["\u5e26o\u5708", "with O-ring"],
  ["O\u5708FKM", "FKM O-ring"],
  ["O\u5708", "O-ring"],
  ["\u53ef\u65cb\u8f6c\u5e95\u9762\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "rotatable bottom-sealed thread-to-barb fitting"],
  ["L\u578b\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "L-shaped thread-sealed thread-to-barb fitting"],
  ["T\u578b\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "T-shaped thread-sealed thread-to-barb fitting"],
  ["Y\u578b\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "Y-shaped thread-sealed thread-to-barb fitting"],
  ["\u76f4\u901a\u5185\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "straight female-thread-to-barb fitting"],
  ["\u5185\u87ba\u7eb9\u8f6c\u5012\u523a", "female-thread-to-barb connection"],
  ["\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "thread-to-barb fitting"],
  ["\u87ba\u7eb9\u5bc6\u5c01", "thread sealing"],
  ["\u9525\u87ba\u7eb9", "tapered thread"],
  ["6010 \u7cfb\u5217\u7535\u78c1\u9600", "6010 Solenoid Valve"],
  ["\u7cfb\u5217\u7535\u78c1\u9600", "Solenoid Valve"],
  ["\u5fae\u91cf\u8bd5\u5242\u52a0\u6837", "trace-reagent dispensing"],
  ["\u5c0f\u4f53\u79ef\u6ef4\u5b9a", "small-volume titration"],
  ["\u5b9a\u91cf\u8f93\u9001", "quantitative delivery"],
  ["\u6821\u51c6\u6db2\u52a0\u6ce8", "calibration-fluid dispensing"],
  ["\u5fae\u91cf\u53cd\u5e94\u6db2\u5206\u914d", "trace reaction-fluid dispensing"],
  ["\u7d27\u51d1\u578b\u5206\u6790\u4eea\u5668\u6db2\u8def\u6a21\u5757", "fluidic modules for compact analytical instruments"],
  ["\u7d27\u51d1\u578b\u6db2\u8def\u6a21\u5757", "compact fluidic modules"],
  ["\u5c0f\u4f53\u79ef\u6db2\u4f53\u5904\u7406", "small-volume liquid handling"],
  ["\u8bd5\u5242\u901a\u65ad\u63a7\u5236", "reagent on/off control"],
  ["\u6e05\u6d17\u6db2\u63a7\u5236", "wash-fluid control"],
  ["\u5e9f\u6db2\u63a7\u5236", "waste-fluid control"],
  ["\u9600\u7ec4\u96c6\u6210", "valve-manifold integration"],
  ["\u6837\u672c\u9488\u6e05\u6d17", "sample-probe cleaning"],
  ["\u4f4e\u538b\u6db2\u8def\u5f00\u5173", "low-pressure fluidic switching"],
  ["\u4eea\u5668\u5185\u90e8\u6db2\u8def\u8f6c\u63a5", "fluidic transitions inside instruments"],
  ["\u6cf5\u9600\u87ba\u7eb9\u63a5\u53e3\u4e0e\u8f6f\u7ba1\u8fde\u63a5", "connections between pump/valve threaded ports and tubing"],
  ["IVD\u4e0e\u5206\u6790\u4eea\u5668\u6d41\u8def", "fluidic paths in IVD and analytical instruments"],
  ["\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u8bbe\u5907\u6db2\u8def", "fluidic paths in laboratory automation equipment"],
  ["\u8bbe\u5907\u88c5\u914d\u3001\u8c03\u8bd5\u3001\u7ef4\u62a4\u53ca\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure during equipment assembly, commissioning, maintenance, and transport"],
  ["\u8bbe\u5907\u88c5\u914d", "equipment assembly"],
  ["\u8c03\u8bd5", "commissioning"],
  ["\u7ef4\u62a4", "maintenance"],
  ["\u8fd0\u8f93", "transport"],
  ["\u76f4\u901a\u5e95\u9762\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "straight bottom-sealed thread-to-barb fitting"],
  ["\u76f4\u901a\u87ba\u7eb9\u5bc6\u5c01\u87ba\u7eb9\u8f6c\u5012\u523a\u63a5\u5934", "straight thread-sealed thread-to-barb fitting"],
  ["\u672c\u8272", "natural"],
  ["\u9ed1\u8272", "black"],
  ["\u767d\u8272", "white"],
  ["\u900f\u660e", "clear"],
  ["\u84dd\u8272", "blue"],
  ["\u53ca\u88c5\u914d\u7a7a\u95f4", "and assembly space"],
  ["\u4ecb\u8d28\u517c\u5bb9\u6027\u53ca\u88c5\u914d\u7a7a\u95f4", "fluid compatibility and assembly space"],
  ["\u8f6f\u7ba1\u6750\u8d28\u3001\u58c1\u539a\u548c\u786c\u5ea6", "tubing material, wall thickness, and hardness"],
  ["\u81ea\u52a8\u5316\u5206\u6790\u4eea\u5668", "automated analytical instruments"],
  ["\u4f4e\u538b\u6db2\u8def\u901a\u65ad\u63a7\u5236", "low-pressure fluidic on/off control"],
  ["\u8bd5\u5242\u3001\u6e05\u6d17\u6db2\u3001\u7a00\u91ca\u6db2\u548c\u5e9f\u6db2\u8def\u5f84\u7684\u5f00\u5173\u63a7\u5236", "on/off control for reagent, wash-fluid, diluent, and waste-fluid paths"],
  ["\u8bd5\u5242\u901a\u65ad", "reagent on/off control"],
  ["\u6e05\u6d17\u6db2\u63a7\u5236", "wash-fluid control"],
  ["\u5e9f\u6db2\u63a7\u5236", "waste-fluid control"],
  ["\u9600\u7ec4\u96c6\u6210", "valve-manifold integration"],
  ["\u6837\u672c\u9488\u6e05\u6d17", "sample-probe cleaning"],
  ["\u4f4e\u538b\u6db2\u8def\u5f00\u5173", "low-pressure fluidic switching"],
  ["\u5c0f\u578b\u9600\u7ec4\u96c6\u6210", "small valve-manifold integration"],
  ["IVD \u4e0e\u81ea\u52a8\u5316\u5206\u6790\u4eea\u5668", "IVD and automated analytical instruments"],
  ["\u57fa\u677f\u578b\u3001\u87ba\u7eb9\u578b\u548c\u5012\u523a\u578b\u7ed3\u6784", "manifold, threaded, and barbed configurations"],
  ["\u901a\u53e3\u6570\u3001\u9600\u5f62\u5f0f\u3001\u63a5\u53e3\u65b9\u5f0f\u3001\u819c\u7247\u6750\u8d28\u3001\u4ecb\u8d28\u517c\u5bb9\u6027\u3001\u989d\u5b9a\u7535\u538b\u548c\u662f\u5426\u9700\u8981\u8282\u80fd\u56de\u8def", "the number of ports, valve configuration, interface type, diaphragm material, fluid compatibility, rated voltage, and need for an energy-saving circuit"],
  ["\u4eea\u5668\u5185\u90e8\u6db2\u8def\u8f6c\u63a5", "fluidic transitions inside instruments"],
  ["\u8bbe\u5907\u87ba\u7eb9\u63a5\u53e3\u4e0e\u8f6f\u7ba1\u6db2\u8def\u4e4b\u95f4\u7684\u8f6c\u63a5", "transitions between equipment threaded ports and tubing fluidic lines"],
  ["\u5e95\u9762\u5bc6\u5c01", "bottom-face sealing"],
  ["\u87ba\u7eb9\u6807\u51c6", "thread standard"],
  ["\u8f6f\u7ba1\u6750\u8d28\u4e0e\u786c\u5ea6", "tubing material and hardness"],
  ["\u4ecb\u8d28\u517c\u5bb9\u6027", "fluid compatibility"],
  ["\u88c5\u914d\u7a7a\u95f4", "assembly space"],
];

function translateActualPhrase(value: string) {
  let translated = value.trim();

  for (const [source, target] of [
    ...ACTUAL_NARRATIVE_PHRASE_TRANSLATIONS,
    ...FITTING_FRAGMENT_TRANSLATIONS,
  ].sort((left, right) => right[0].length - left[0].length)) {
    translated = translated.split(source).join(target);
  }

  return normalizeSpacing(translated);
}

function translateActualTechnicalValue(value: string) {
  const trimmed = value.trim();
  const exact = ACTUAL_SPECIFICATION_VALUE_TRANSLATIONS[trimmed];

  if (exact) {
    return exact;
  }

  return normalizeSpacing(
    trimmed
      .replace(/(\d)\s*kPa/gi, "$1 kPa")
      .replace(/(\d)\s*MPa/gi, "$1 MPa")
      .replace(/(\d)\s*mm/gi, "$1 mm")
      .replace(/(\d)\s*uL/gi, "$1 µL")
      .replace(/~/g, " to ")
  );
}

function translateActualChineseNarrative(
  value: string,
  context: LocalizationContext
): string | null {
  const source = value.trim();
  const exact = ACTUAL_NARRATIVE_EXACT_TRANSLATIONS[source];
  const sourceAlignedTranslation =
    SOURCE_ALIGNED_NARRATIVE_TRANSLATIONS[source];
  const sourceAlignedCtaTranslation =
    SOURCE_ALIGNED_CTA_TRANSLATIONS[source];
  const sourceAlignedDetailTranslation =
    SOURCE_ALIGNED_DETAIL_TRANSLATIONS[source];
  const controlModuleTranslation =
    CONTROL_MODULE_NARRATIVE_TRANSLATIONS[source];

  if (sourceAlignedTranslation) {
    return sourceAlignedTranslation;
  }

  if (sourceAlignedCtaTranslation) {
    return sourceAlignedCtaTranslation;
  }

  if (sourceAlignedDetailTranslation) {
    return sourceAlignedDetailTranslation;
  }

  if (controlModuleTranslation) {
    return controlModuleTranslation;
  }

  const pumpSeoTitleMatch = source.match(
    /^((?:DPL\d+H?|DPGL\d+(?:-[A-Za-z0-9/]+)*))\s+(有刷|无刷)?(液体隔膜泵|高压液体隔膜泵|气液混合隔膜泵)｜(.+?)｜FOREACH$/
  );

  if (pumpSeoTitleMatch) {
    const motor =
      pumpSeoTitleMatch[2] === "有刷"
        ? "Brushed"
        : pumpSeoTitleMatch[2] === "无刷"
          ? "Brushless"
          : "";
    const type =
      pumpSeoTitleMatch[3] === "液体隔膜泵"
        ? "Liquid Diaphragm Pump"
        : pumpSeoTitleMatch[3] === "高压液体隔膜泵"
          ? "High-Pressure Liquid Diaphragm Pump"
          : "Gas-Liquid Diaphragm Pump";

    return `${pumpSeoTitleMatch[1]} ${[motor, type]
      .filter(Boolean)
      .join(" ")} | ${pumpSeoTitleMatch[4]} | FOREACH`;
  }

  const pumpSeoDescriptionMatch = source.match(
    /^((?:DPL\d+H?|DPGL\d+(?:-[A-Za-z0-9/]+)*))\s+(有刷|无刷)?(液体隔膜泵|高压液体隔膜泵|气液混合隔膜泵)适用于(.+?)，流量\s*(.+?)，额定压力\s*(.+?)。$/
  );

  if (pumpSeoDescriptionMatch) {
    const motor =
      pumpSeoDescriptionMatch[2] === "有刷"
        ? "Brushed"
        : pumpSeoDescriptionMatch[2] === "无刷"
          ? "Brushless"
          : "";
    const type =
      pumpSeoDescriptionMatch[3] === "液体隔膜泵"
        ? "Liquid Diaphragm Pump"
        : pumpSeoDescriptionMatch[3] === "高压液体隔膜泵"
          ? "High-Pressure Liquid Diaphragm Pump"
          : "Gas-Liquid Diaphragm Pump";
    const applicationTranslations: Record<string, string> = {
      "需要更长寿命和连续运行的仪器液路系统":
        "instrument fluidic systems requiring extended service life and continuous operation",
      "需要长寿命和连续运行的高流量液体输送模块":
        "high-flow liquid-delivery modules requiring long service life and continuous operation",
      "需要长寿命和较高压力输出的仪器液路系统":
        "instrument fluidic systems requiring long service life and higher pressure output",
    };
    const application =
      applicationTranslations[pumpSeoDescriptionMatch[4]];

    if (application) {
      return `${pumpSeoDescriptionMatch[1]} ${[motor, type]
        .filter(Boolean)
        .join(" ")} is designed for ${application}. It delivers ${pumpSeoDescriptionMatch[5]} at a rated pressure of ${pumpSeoDescriptionMatch[6]}.`;
    }
  }

  const gasPumpSeoDescriptionMatch = source.match(
    /^((?:DPL\d+H?|DPGL\d+(?:-[A-Za-z0-9/]+)*))\s+(有刷|无刷)?(液体隔膜泵|高压液体隔膜泵|气液混合隔膜泵)适用于(.+?)，流量\s*(.+?)，最大负压＜(.+?)。$/
  );

  if (gasPumpSeoDescriptionMatch) {
    const motor =
      gasPumpSeoDescriptionMatch[2] === "有刷"
        ? "Brushed"
        : gasPumpSeoDescriptionMatch[2] === "无刷"
          ? "Brushless"
          : "";
    const type =
      gasPumpSeoDescriptionMatch[3] === "液体隔膜泵"
        ? "Liquid Diaphragm Pump"
        : gasPumpSeoDescriptionMatch[3] === "高压液体隔膜泵"
          ? "High-Pressure Liquid Diaphragm Pump"
          : "Gas-Liquid Diaphragm Pump";
    const applicationTranslations: Record<string, string> = {
      "气体抽吸、负压建立和气液混合物抽排":
        "gas aspiration, negative-pressure generation, and gas-liquid mixture evacuation",
    };
    const application =
      applicationTranslations[gasPumpSeoDescriptionMatch[4]];

    if (application) {
      return `${gasPumpSeoDescriptionMatch[1]} ${[motor, type]
        .filter(Boolean)
        .join(" ")} is designed for ${application}. It delivers ${gasPumpSeoDescriptionMatch[5]} with a maximum vacuum of ${gasPumpSeoDescriptionMatch[6]}.`;
    }
  }

  /*
   * Resolve complete FAQ source sentences before the permissive phrase table.
   * Otherwise a model-specific question can be reduced to fragments such as
   * "material ?", and different answers can fall into the same generic copy.
   */
  let faqMatch = source.match(/^(.+?)的壳体材质是什么？$/);
  if (faqMatch) {
    return `What is the housing material of ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)的螺母材质是什么？$/);
  if (faqMatch) {
    return `What is the nut material of ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)的材质是什么？$/);
  if (faqMatch) {
    return `What is the material of ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)的颜色是什么？$/);
  if (faqMatch) {
    return `What is the standard color of ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)适配多大接管内径？$/);
  if (faqMatch) {
    return `What tubing ID does ${translateActualPhrase(faqMatch[1])} accept?`;
  }

  faqMatch = source.match(/^(.+?)的螺纹规格是什么？$/);
  if (faqMatch) {
    return `What thread specification does ${translateActualPhrase(faqMatch[1])} use?`;
  }

  faqMatch = source.match(/^(.+?)的接口规格是什么？$/);
  if (faqMatch) {
    return `What interface specification does ${translateActualPhrase(faqMatch[1])} use?`;
  }

  faqMatch = source.match(/^(.+?)适配什么规格的软管？$/);
  if (faqMatch) {
    return `What tubing specification is compatible with ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)适配什么螺纹和软管？$/);
  if (faqMatch) {
    return `What thread and tubing specifications are compatible with ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)适合什么安装方式？$/);
  if (faqMatch) {
    return `Which mounting method is suitable for ${translateFittingFragment(faqMatch[1])}?`;
  }

if (source === "不同螺纹能否互转？") {
  return "Can different thread standards be adapted to one another?";
}

if (source === "二通和三通如何选择？") {
  return "How should two-way and three-way fittings be selected?";
}

if (source === "通径是否等于螺纹尺寸？") {
  return "Is the nominal passage size the same as the thread size?";
}

if (source === "PP、PA和SS材质如何选择？") {
  return "How should PP, PA, and stainless-steel materials be selected?";
}

if (source === "能否提供二维图和三维模型？") {
  return "Can 2D drawings and 3D models be provided?";
}

if (source === "二通用于两路接口连接，三通用于一路分成两路或两路汇合，应根据液路结构选择。") {
  return "A two-way fitting connects two fluidic paths, while a three-way fitting splits one path into two or combines two paths into one. Select the configuration according to the fluidic architecture.";
}

if (source === "通径表示内部流道尺寸，螺纹规格表示接口连接标准，两者不是同一个参数。") {
  return "The nominal passage size describes the internal flow path, while the thread specification identifies the interface standard. They are different parameters.";
}

if (source === "应结合介质兼容性、压力、温度和机械强度选择合适材质。") {
  return "Select the material based on fluid compatibility, pressure, temperature, and mechanical strength.";
}

if (source === "已上传的资源会在详情页显示，暂未上传的型号可通过添加图纸或清单备注提交资料需求。") {
  return "Available resources are shown on the product detail page. For models without uploaded files, add a drawing request or include the documentation requirement in the product-list notes.";
}

  if (source === "六角螺母用于什么位置？") {
    return "Where is the hex nut used?";
  }

  if (source === "倒刺接头尺寸对应软管内径还是外径？") {
    return "Does the barb size correspond to the tubing ID or OD?";
  }

  faqMatch = source.match(/^(.+?)是否有二维图纸？$/);
  if (faqMatch) {
    return `Is a 2D drawing available for ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)是否可以申请2D图纸？$/);
  if (faqMatch) {
    return `Can I request a 2D drawing for ${translateActualPhrase(faqMatch[1])}?`;
  }

  faqMatch = source.match(/^(.+?)材质是否适合(?:当前|目标)介质？$/);
  if (faqMatch) {
    return `Is ${translateActualPhrase(faqMatch[1]).replace(/材质$/i, "")} compatible with the target fluid?`;
  }

  faqMatch = source.match(/^该型号的壳体材质为(.+?)，介质兼容性应结合温度和工况确认。$/);
  if (faqMatch) {
    return `The housing material is ${translateActualPhrase(faqMatch[1])}. Confirm fluid compatibility based on temperature and operating conditions.`;
  }

  faqMatch = source.match(/^该型号的螺母材质为(.+?)。$/);
  if (faqMatch) {
    return `The nut material is ${translateActualPhrase(faqMatch[1])}.`;
  }

  faqMatch = source.match(/^该型号的颜色为(.+?)。$/);
  if (faqMatch) {
    return `The standard color is ${translateActualPhrase(faqMatch[1])}.`;
  }

  faqMatch = source.match(/^该型号采用(.+?)螺纹。安装前应结合面板厚度和安装空间核对装配尺寸。$/);
  if (faqMatch) {
    return `This model uses ${translateActualPhrase(faqMatch[1])} threads. Before installation, verify the assembly dimensions against the panel thickness and available installation space.`;
  }

  faqMatch = source.match(/^该型号适配(.+?)接管内径，装配时应同时确认软管材质和尺寸公差。$/);
  if (faqMatch) {
    return `This model accepts tubing with an ID of ${translateActualPhrase(faqMatch[1])}. During assembly, also confirm the tubing material and dimensional tolerance.`;
  }

  faqMatch = source.match(/^适用于(.+?)，用于(.+?)。$/);
  if (faqMatch) {
    return `It is suitable for ${translateFittingFragment(faqMatch[1])} and is used to ${translateFittingFragment(faqMatch[2])}.`;
  }

  faqMatch = source.match(/^该型号详情页已提供二维图纸预览。$/);
  if (faqMatch) {
    return "A 2D drawing preview is available on this model's product detail page.";
  }

  if (source === "应以具体在售型号的接口组合为准，未列出的组合可提交定制需求。") {
    return "Use the interface combination of the specific listed model as the reference. For unlisted combinations, submit a custom request.";
  }

  if (exact) {
    return exact;
  }

  const phraseTranslation = translateActualPhrase(source);

  if (
    phraseTranslation !== source &&
    !HAN_PATTERN.test(phraseTranslation)
  ) {
    return phraseTranslation;
  }

  let match = source.match(
    /^(6010 \u7cfb\u5217\u7535\u78c1\u9600)\u7528\u4e8e\u81ea\u52a8\u5316\u5206\u6790\u4eea\u5668\u4e2d\u7684\u4f4e\u538b\u6db2\u8def\u901a\u65ad\u63a7\u5236\uff0c\u53ef\u7528\u4e8e\u8bd5\u5242\u3001\u6e05\u6d17\u6db2\u3001\u7a00\u91ca\u6db2\u548c\u5e9f\u6db2\u8def\u5f84\u7684\u5f00\u5173\u63a7\u5236\u3002\u8be5\u7cfb\u5217\u4e3a\u6446\u81c2\u9694\u819c\u9600\uff0c\u8986\u76d6\u57fa\u677f\u578b\u3001\u87ba\u7eb9\u578b\u548c\u5012\u523a\u578b\u7ed3\u6784\uff0c\u4f7f\u7528\u538b\u529b\u8303\u56f4\u4e3a\s*(.+?)\uff0c\u5b54\u53e3\u76f4\u5f84\s*(.+?)\uff0c\u9600\u5ba4\u5185\u5bb9\u79ef\s*(.+?)\uff0c\u6d41\u91cf\u7cfb\u6570\s*CV\s*\u4e3a\s*(.+?)\u3002\u5b9e\u9645\u9009\u578b\u65f6\u9700\u786e\u8ba4(.+?)\u3002$/
  );

  if (match) {
    const productTitle = match[1].replace(/\s*\u7cfb\u5217\u7535\u78c1\u9600/, " Solenoid Valve");

    return `${productTitle} is designed for low-pressure fluidic on/off control in automated analytical instruments, including reagent, wash-fluid, diluent, and waste-fluid paths. The series uses a swing-arm diaphragm valve and is available in manifold, threaded, and barbed configurations. Its operating pressure range is ${translateActualTechnicalValue(match[2])}; the orifice diameter is ${translateActualTechnicalValue(match[3])}, the valve-chamber volume is ${translateActualTechnicalValue(match[4])}, and the flow coefficient is CV ${translateActualTechnicalValue(match[5])}. For selection, confirm ${translateActualPhrase(match[6])}.`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u9002\u914d(.+?)\u87ba\u7eb9\u4e0e(.+?)\u5185\u5f84\u8f6f\u7ba1\uff0c\u7528\u4e8e(.+?)\u3002\u91c7\u7528(.+?)\u6750\u8d28\uff0c\u5bc6\u5c01\u65b9\u5f0f\u4e3a(.+?)\uff0c\u989c\u8272\u4e3a(.+?)\u3002\u9009\u578b\u65f6\u5e94\u7ed3\u5408(.+?)\u786e\u8ba4\u5339\u914d\u6027\u3002$/
  );

  if (match) {
    return `${translateActualPhrase(match[1])} is a ${translateActualPhrase(match[2])} for ${translateActualPhrase(match[3])} threads and tubing with an ID of ${translateActualPhrase(match[4])}. It is used for ${translateActualPhrase(match[5])}. It uses ${translateActualPhrase(match[6])}; sealing is provided by ${translateActualPhrase(match[7])}, and the color is ${translateActualPhrase(match[8])}. For selection, confirm compatibility based on ${translateActualPhrase(match[9])}.`;
  }

  match = source.match(/^(.+?)\u9002\u5408\u54ea\u4e9b\u6db2\u8def\u63a7\u5236\uff1f$/);

  if (match) {
    return `Which fluidic control tasks is ${translateActualPhrase(match[1])} suited for?`;
  }

  match = source.match(/^(.+?)\u9002\u5408(.+?)\uff0c\u5e38\u7528\u4e8e(.+?)\u3002$/);

  if (match) {
    return `${translateActualPhrase(match[1])} is suited to ${translateActualPhrase(match[2])}. It is commonly used in ${translateActualPhrase(match[3])}.`;
  }

  match = source.match(/^(.+?)\u9002\u914d\u4ec0\u4e48\u87ba\u7eb9\u548c\u8f6f\u7ba1\uff1f$/);

  if (match) {
    return `What thread and tubing does ${translateActualPhrase(match[1])} accept?`;
  }

  match = source.match(/^\u8be5\u578b\u53f7\u9002\u914d(.+?)\u87ba\u7eb9\uff0c\u5e76\u8fde\u63a5(.+?)\u5185\u5f84\u8f6f\u7ba1\u3002$/);

  if (match) {
    return `This model accepts ${translateActualPhrase(match[1])} threads and connects to tubing with an ID of ${translateActualPhrase(match[2])}.`;
  }

  match = source.match(/^\u8be5\u9875\u9762\u4e2d\u7684(.+?)\u8868\u793a\u9002\u914d\u8f6f\u7ba1\u5185\u5f84\u3002\u5b9e\u9645\u88c5\u914d\u65f6\u8fd8\u9700\u8981\u7ed3\u5408(.+?)\u786e\u8ba4\u3002$/);

  if (match) {
    return `${translateActualPhrase(match[1])} refers to the compatible tubing ID on this page. During assembly, also confirm ${translateActualPhrase(match[2])}.`;
  }

  match = source.match(/^(.+?)\u6750\u8d28\u662f\u5426\u9002\u5408\u5f53\u524d\u4ecb\u8d28\uff1f$/);

  if (match) {
    return `Is ${translateActualPhrase(match[1])} compatible with the current fluid?`;
  }

  match = source.match(/^\u9700\u8981\u7ed3\u5408\u5b9e\u9645\u4ecb\u8d28\u3001\u6e29\u5ea6\u3001\u538b\u529b\u548c\u6e05\u6d01\u8981\u6c42\u786e\u8ba4(.+?)\u7684\u5316\u5b66\u517c\u5bb9\u6027\u3002$/);

  if (match) {
    return `Confirm ${translateActualPhrase(match[1])} chemical compatibility based on the actual fluid, temperature, pressure, and cleaning requirements.`;
  }

  if (source === "\u5012\u523a\u5c3a\u5bf8\u5bf9\u5e94\u8f6f\u7ba1\u5185\u5f84\u8fd8\u662f\u5916\u5f84\uff1f") {
    return "Does the barb size correspond to the tubing ID or OD?";
  }

  if (source === "\u87ba\u7eb9\u5bc6\u5c01\u4e0e\u5e95\u9762\u5bc6\u5c01\u6709\u4ec0\u4e48\u533a\u522b\uff1f") {
    return "What is the difference between thread sealing and bottom-face sealing?";
  }

  if (source === "\u87ba\u7eb9\u5bc6\u5c01\u4e3b\u8981\u4f9d\u9760\u87ba\u7eb9\u8fde\u63a5\u533a\u57df\u5f62\u6210\u5bc6\u5c01\uff1b\u5e95\u9762\u5bc6\u5c01\u901a\u8fc7\u7aef\u9762\u5bc6\u5c01\u7ed3\u6784\u5b9e\u73b0\u5bc6\u5c01\u3002\u9009\u578b\u65f6\u5e94\u4e0e\u8bbe\u5907\u63a5\u53e3\u7ed3\u6784\u4fdd\u6301\u4e00\u81f4\u3002") {
    return "Thread sealing relies on the threaded connection area; bottom-face sealing uses an end-face sealing structure. For selection, match the equipment interface structure.";
  }

  return null;
}

type LocalizationContext = {
  model: string;
  productName: string;
};

/*
 * Fitting descriptions are assembled from several Chinese clauses. Keep
 * these source phrases together so the English result remains faithful to
 * the source record instead of mixing partial machine translations.
 */
const FITTING_FRAGMENT_TRANSLATIONS: Array<[string, string]> = [
  ["仪器面板、设备壳体或隔板穿板安装", "bulkhead installation through instrument panels, equipment housings, or partition panels"],
  ["连接面板两侧的软管液路", "connect tubing fluidic paths on both sides of the panel"],
  ["连接面板两侧的软管", "connect tubing on both sides of the panel"],
  ["设备面板、机壳或固定支架上的接口布置", "interface layouts on equipment panels, housings, or fixed brackets"],
  ["\u7528\u4e8e\u5c01\u58351.6 mm\u5185\u5f84\u8f6f\u7ba1\u7aef\u90e8\u6216\u6682\u65f6\u5173\u95ed\u9884\u7559\u652f\u8def", "to seal the end of tubing with a 1.6 mm ID or temporarily close a reserved branch"],
  ["\u5c01\u58351.6 mm\u5185\u5f84\u8f6f\u7ba1\u7aef\u90e8\u6216\u6682\u65f6\u5173\u95ed\u9884\u7559\u652f\u8def", "seal the end of tubing with a 1.6 mm ID or temporarily close a reserved branch"],
  ["\u53ef\u7528\u4e8e\u8bbe\u5907\u88c5\u914d\u3001\u8c03\u8bd5\u3001\u7ef4\u62a4\u53ca\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "it can be used for fluidic-path closure during equipment assembly, commissioning, maintenance, and transport"],
  ["\u8bbe\u5907\u88c5\u914d\u3001\u8c03\u8bd5\u3001\u7ef4\u62a4\u53ca\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure during equipment assembly, commissioning, maintenance, and transport"],
  ["\u53ca\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "and fluidic-path closure during transport"],
  ["\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure during transport"],
  ["\u8fd0\u8f93\u4e0e\u88c5\u914d\u8fc7\u7a0b\u9632\u62a4", "protection during transport and assembly"],
  ["\u8bbe\u5907\u7ef4\u62a4\u671f\u95f4\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure during equipment maintenance"],
  ["\u9884\u7559\u652f\u8def\u4e34\u65f6\u5173\u95ed", "temporary closure of a reserved branch"],
  ["\u8f6f\u7ba1\u7aef\u90e8\u5c01\u5835", "tubing-end sealing"],
  ["\u8fd0\u8f93\u8fc7\u7a0b\u4e2d\u7684\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure during transport"],
  ["\u7aef\u90e8\u6216\u6682\u65f6\u5173\u95ed\u9884\u7559\u652f\u8def", "the tubing end or temporarily close a reserved branch"],
  ["\u4eea\u5668\u5185\u90e8\u591a\u901a\u9053\u7ba1\u8def\u5e03\u7f6e", "multi-channel tubing routing inside instruments"],
  ["\u4eea\u5668\u5185\u90e8\u652f\u8def\u5e03\u7f6e", "internal instrument branch routing"],
  ["\u56db\u8def\u8f6f\u7ba1\u7684\u591a\u652f\u8def\u8fde\u63a5", "multi-branch connections for four tubing lines"],
  ["\u4e09\u8def\u8f6f\u7ba1\u7684\u5206\u6d41\u3001\u6c47\u6d41\u548c\u652f\u8def\u8fde\u63a5", "flow splitting, flow combining, and branch-line connection for three tubing lines"],
  ["\u540c\u4e00\u89c4\u683c\u8f6f\u7ba1\u7684\u76f4\u7ebf\u8fde\u63a5\u548c\u7ba1\u8def\u5ef6\u957f", "straight connections for same-size tubing and fluidic-path extension"],
  ["\u6539\u53d8\u8f6f\u7ba1\u8d70\u5411\uff0c\u51cf\u5c11\u8fde\u63a5\u4f4d\u7f6e\u5bf9\u76f4\u7ebf\u5b89\u88c5\u7a7a\u95f4\u7684\u8981\u6c42", "change tubing direction and reduce the straight-route space required for the connection"],
  ["\u6539\u53d8\u8f6f\u7ba1\u8d70\u5411", "change tubing direction"],
  ["\u5b89\u88c5\u7a7a\u95f4\u53d7\u9650\u6216\u9700\u8981\u8f6c\u89d2\u5e03\u7ba1\u7684\u4f4d\u7f6e", "locations with limited installation space or corner-routing requirements"],
  ["\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1\u4e4b\u95f4\u7684\u8fc7\u6e21\u8fde\u63a5", "a transition between tubing with different IDs"],
  ["\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1\u4e4b\u95f4\u7684\u76f4\u7ebf\u8fc7\u6e21\u8fde\u63a5", "make straight transition connections between tubing with different IDs"],
  ["\u6539\u53d8\u8f6f\u7ba1\u8d70\u5411\uff0c\u5e76\u5b8c\u6210\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1\u4e4b\u95f4\u7684\u8fc7\u6e21\u8fde\u63a5", "change tubing direction and complete a transition between tubing with different IDs"],
  ["\u6539\u53d8\u8f6f\u7ba1\u8d70\u5411\u5e76\u5b8c\u6210\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1\u4e4b\u95f4\u7684\u8fc7\u6e21\u8fde\u63a5", "change tubing direction and complete a transition between tubing with different IDs"],
  ["\u56db\u8def\u8f6f\u7ba1\u7684\u4ea4\u53c9\u5206\u914d\u3001\u6c47\u6d41\u548c\u591a\u652f\u8def\u8fde\u63a5", "perform cross-distribution, flow combining, and multi-branch connections for four tubing lines"],
  ["\u9700\u8981Y\u578b\u652f\u8def\u5e03\u7f6e\u7684\u4eea\u5668\u5185\u90e8\u6db2\u8def", "Y-branch routing inside instrument fluidic paths"],
  ["\u4eea\u5668\u5185\u90e8\u8f6c\u89d2\u7ba1\u8def", "corner-routed fluidic paths inside instruments"],
  ["\u8f6c\u89d2\u5e03\u7ba1\u7684\u6db2\u8def\u8fde\u63a5", "corner-routing fluidic connections"],
  ["\u4ea4\u53c9\u5206\u914d\u3001\u6c47\u6d41\u548c\u591a\u652f\u8def\u8fde\u63a5", "cross-distribution, flow combining, and multi-branch connections"],
  ["\u8bd5\u5242\u3001\u6e05\u6d17\u53ca\u4eea\u5668\u5185\u90e8\u591a\u901a\u9053\u6db2\u8def\u5e03\u7f6e", "reagent, wash-fluid, and multi-channel fluidic routing inside instruments"],
  ["\u5404\u63a5\u7ba1\u7aef\u9002\u914d", "each tubing port accepts"],
  ["\u7a7f\u677f\u63a5\u5934\u5b89\u88c5\u56fa\u5b9a", "bulkhead fitting installation and retention"],
  ["\u6c34\u5faa\u73af\u6216\u6db2\u8def\u7cfb\u7edf\u4e2d\u7684\u8fc7\u6ee4\u7ec4\u4ef6\u914d\u7f6e", "filter assembly configuration in water-circulation or fluidic systems"],
  ["\u6e29\u5ea6\u3001\u5b89\u88c5\u7a7a\u95f4\u548c\u8fc7\u6ee4\u8981\u6c42", "temperature, installation space, and filtration requirements"],
  ["\u964d\u4f4e\u56de\u6d41\u98ce\u9669\u5e76\u4fdd\u6301\u6db2\u8def\u65b9\u5411\u7a33\u5b9a", "reduce backflow risk and maintain stable fluid direction"],
  ["\u56de\u6d41\u98ce\u9669\u5e76\u4fdd\u6301\u6db2\u8def\u65b9\u5411\u7a33\u5b9a", "backflow risk and maintain stable fluid direction"],
  ["\u516d\u89d2\u87ba\u6bcd", "hex nut"],
  ["\u65b9\u5f62\u4e8c\u901a\u5185\u87ba\u7eb9\u4e92\u8f6c\u63a5\u5934", "square two-way female-thread adapter"],
  ["\u5fae\u6d41\u4f53\u7cfb\u7edf\u3001IVD\u4eea\u5668\u3001\u5206\u6790\u4eea\u5668\u53ca\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u8bbe\u5907\u4e2d\u7684\u6db2\u8def\u8f6c\u63a5", "fluidic transitions in microfluidic systems, IVD instruments, analytical instruments, and laboratory automation equipment"],
  ["\u5ba2\u6237\u7684\u6db2\u8def\u8bbe\u8ba1", "the customer's fluidic design"],
  ["\u5ba2\u6237\u7684\u8bbe\u5907\u8bbe\u8ba1", "the customer's equipment design"],
  ["\u4eea\u5668\u5185\u90e8\u9700\u8981\u4fdd\u6301\u76f4\u7ebf\u8d70\u7ba1\u7684\u8fde\u63a5\u4f4d\u7f6e", "instrument locations that require a straight tubing run"],
  ["\u8bd5\u5242\u7ba1\u8def", "reagent lines"],
  ["\u6e05\u6d17\u7ba1\u8def", "wash lines"],
  ["\u8bbe\u5907\u88c5\u914d", "equipment assembly"],
  ["\u8c03\u8bd5", "commissioning"],
  ["\u7ef4\u62a4", "maintenance"],
  ["\u88c5\u914d", "assembly"],
  ["\u5c01\u5835", "seal off"],
  ["\u591a\u652f\u8def\u8fde\u63a5", "multi-branch connection"],
  ["\u6db2\u8def\u5206\u914d", "fluidic distribution"],
  ["\u6db2\u8def\u8f6c\u63a5", "fluidic transition"],
  ["\u6db2\u8def\u8fde\u63a5", "fluidic connection"],
  ["\u5206\u6d41", "flow splitting"],
  ["\u6c47\u6d41", "flow combining"],
  ["\u652f\u8def\u8fde\u63a5", "branch-line connection"],
  ["\u5404\u63a5\u7ba1\u7aef", "each tubing port"],
  ["\u63a5\u7ba1\u7aef", "tubing port"],
  ["\u5916\u58f3", "housing"],
  ["\u58f3\u4f53", "housing"],
  ["\u5bc6\u5c01\u5708", "sealing ring"],
  ["\u652f\u6301\u7a7f\u677f\u5b89\u88c5", "supports bulkhead mounting"],
  ["\u91c7\u7528\u975e\u7a7f\u677f\u7ed3\u6784", "uses a non-bulkhead structure"],
  ["\u63a5\u5934\u65ad\u5f00\u65f6\u5173\u95ed\u6d41\u8def", "shutoff when the fitting is disconnected"],
  ["\u5feb\u901f\u62c6\u88c5", "quick installation and removal"],
  ["\u9700\u8981\u5feb\u901f\u62c6\u88c5\u7684\u8bbe\u5907\u6db2\u8def\u8fde\u63a5", "quick-disconnect fluidic connections in equipment"],
  ["\u4eea\u5668\u9762\u677f\u3001\u8bbe\u5907\u58f3\u4f53\u6216\u9694\u677f\u4e24\u4fa7\u7684\u8f6f\u7ba1\u8fde\u63a5", "tubing connections through instrument panels, equipment housings, or partition panels"],
  ["\u5fae\u6d41\u4f53\u7cfb\u7edf\u3001IVD\u4eea\u5668\u3001\u5206\u6790\u4eea\u5668\u53ca\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u8bbe\u5907\u4e2d\u7684\u6db2\u8def\u8f6c\u63a5", "fluidic transitions in microfluidic systems, IVD instruments, analytical instruments, and laboratory automation equipment"],
  ["\u5fae\u6d41\u4f53\u6db2\u8def\u3001IVD\u8bbe\u5907\u3001\u5206\u6790\u4eea\u5668\u53ca\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u7cfb\u7edf\u4e2d\u7684\u786c\u7ba1\u8fde\u63a5", "rigid-tubing connections in microfluidic paths, IVD equipment, analytical instruments, and laboratory automation systems"],
  ["\u8bbe\u5907\u87ba\u7eb9\u63a5\u53e3\u4e0e\u8f6f\u7ba1\u6db2\u8def\u4e4b\u95f4\u7684\u8f6c\u63a5", "transitions between equipment threaded ports and tubing fluidic lines"],
  ["\u8bbe\u5907\u5185\u90e8\u6db2\u8def", "internal equipment fluidic paths"],
  ["\u5206\u6790\u4eea\u5668\u6db2\u8def\u6a21\u5757", "analytical-instrument fluidic modules"],
  ["\u7528\u4e8e\u9650\u5236\u6d41\u4f53\u53cd\u5411\u6d41\u52a8\u3001\u964d\u4f4e\u56de\u6d41\u98ce\u9669\u5e76\u4fdd\u6301\u6db2\u8def\u65b9\u5411\u7a33\u5b9a", "to prevent reverse fluid flow, reduce backflow risk, and maintain stable fluid direction"],
  ["\u5b9e\u9645\u9009\u578b\u65f6\u5e94\u7ed3\u5408\u4ecb\u8d28\u3001\u6d41\u91cf\u3001\u5f00\u542f\u6761\u4ef6\u3001\u5de5\u4f5c\u538b\u529b\u3001\u6e29\u5ea6\u548c\u5b89\u88c5\u65b9\u5411\u786e\u8ba4", "for selection, confirm the fluid, flow rate, opening conditions, operating pressure, temperature, and mounting orientation"],
  ["\u9700\u8981\u786e\u8ba4\u5feb\u63d2\u63a5\u5934\u578b\u53f7", "the quick-connect fitting model needs to be confirmed"],
  ["\u53ef\u4ee5\u5c06\u5f53\u524d\u578b\u53f7\u52a0\u5165\u6e05\u5355\u5e76\u6dfb\u52a0\u56fe\u7eb8\u9700\u6c42\uff0c\u7531\u5de5\u7a0b\u5e08\u786e\u8ba4\u5bf9\u5e94\u7248\u672c\u540e\u63d0\u4f9b", "Add the current model to your list and request a drawing; our engineers will confirm the applicable version and provide it"],
  ["\u9700\u8981\u7ed3\u5408\u8f93\u9001\u4ecb\u8d28\u3001\u5de5\u4f5c\u6e29\u5ea6\u3001\u538b\u529b\u548c\u6e05\u6d01\u8981\u6c42\u786e\u8ba4", "confirm the conveyed fluid, operating temperature, pressure, and cleaning requirements"],
  ["\u65e0\u6cd5\u786e\u5b9a\u65f6\u8bf7\u63d0\u4ea4\u5de5\u51b5\u7531\u5de5\u7a0b\u5e08\u534f\u52a9\u6838\u5bf9", "if compatibility is uncertain, submit the operating conditions for engineering review"],
  ["\u76f4\u901a\u7b49\u5f84\u5012\u523a\u63a5\u5934", "Straight equal-bore barbed fitting"],
  ["\u76f4\u901a\u5f02\u5f84\u5012\u523a\u63a5\u5934", "Straight reducing barbed fitting"],
  ["L\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934", "L-shaped equal-bore barbed fitting"],
  ["L\u578b\u5f02\u5f84\u5012\u523a\u63a5\u5934", "L-shaped reducing barbed fitting"],
  ["T\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934", "T-shaped equal-bore barbed fitting"],
  ["T\u578b\u5f02\u5f84\u5012\u523a\u63a5\u5934", "T-shaped reducing barbed fitting"],
  ["Y\u578b\u7b49\u5f84\u5012\u523a\u63a5\u5934", "Y-shaped equal-bore barbed fitting"],
  ["Y\u578b\u5f02\u5f84\u5012\u523a\u63a5\u5934", "Y-shaped reducing barbed fitting"],
  ["\u03c0\u578b\u56db\u901a\u7b49\u5f84\u5012\u523a\u63a5\u5934", "Pi-shaped equal-bore four-way barbed fitting"],
  ["\u5341\u5b57\u578b\u56db\u901a\u7b49\u5f84\u5012\u523a\u63a5\u5934", "Cross-shaped equal-bore four-way barbed fitting"],
  ["\u5e73\u5e95\u63a5\u5934", "flat-bottom fitting"],
  ["\u5361\u7b8d\u63a5\u5934", "clamp fitting"],
  ["\u6807\u6eda\u5e73\u5e95\u63a5\u5934", "standard knurled flat-bottom fitting"],
  ["\u6807\u6eda\u5361\u7b8d\u63a5\u5934", "standard knurled clamp fitting"],
  ["\u7d27\u51d1\u5e73\u5e95\u63a5\u5934", "compact flat-bottom fitting"],
  ["\u7d27\u51d1\u5361\u7b8d\u63a5\u5934", "compact clamp fitting"],
  ["\u5b9e\u9645\u88c5\u914d\u8981\u6c42", "actual assembly requirements"],
  ["\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1\u8fc7\u6e21\u8fde\u63a5", "transitions between tubing with different IDs"],
  ["\u8f6f\u7ba1\u8f6c\u5411\u8fde\u63a5", "tubing direction-change connections"],
  ["\u6709\u9650\u7a7a\u95f4\u7ba1\u8def\u5e03\u7f6e", "fluidic routing in limited spaces"],
  ["\u6cf5\u9600\u5468\u8fb9\u6db2\u8def\u8fde\u63a5", "fluidic connections around pumps and valves"],
  ["\u4eea\u5668\u5185\u90e8\u8f6c\u89d2\u7ba1\u8def", "corner-routed fluidic paths inside instruments"],
  ["\u4e09\u8def\u8f6f\u7ba1\u5206\u6d41\u4e0e\u6c47\u6d41", "flow splitting and combining for three tubing lines"],
  ["\u6837\u54c1\u4e0e\u8bd5\u5242\u652f\u8def\u8fde\u63a5", "sample and reagent branch-line connections"],
  ["\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u6db2\u8def", "fluidic paths in laboratory automation systems"],
  ["\u56db\u8def\u8f6f\u7ba1\u5206\u914d\u4e0e\u6c47\u6d41", "distribution and combining for four tubing lines"],
  ["\u591a\u652f\u8def\u6db2\u8def\u8fde\u63a5", "multi-branch fluidic connections"],
  ["\u8bd5\u5242\u4e0e\u6e05\u6d17\u6db2\u8def\u5206\u914d", "reagent and wash-fluid distribution"],
  ["\u4eea\u5668\u5185\u90e8\u591a\u901a\u9053\u5e03\u7f6e", "multi-channel routing inside instruments"],
  ["\u4eea\u5668\u9762\u677f\u88c5\u914d", "instrument panel assembly"],
  ["\u8bbe\u5907\u58f3\u4f53\u6db2\u8def\u7ec4\u4ef6\u56fa\u5b9a", "fluidic-component retention in equipment housings"],
  ["\u6cf5\u51fa\u53e3\u9632\u56de\u6d41", "pump-outlet backflow prevention"],
  ["\u8bd5\u5242\u6db2\u8def\u5355\u5411\u63a7\u5236", "one-way control in reagent lines"],
  ["\u5206\u6790\u4eea\u5668\u6d41\u8def\u65b9\u5411\u63a7\u5236", "fluidic-direction control in analytical instruments"],
  ["\u6db2\u8def\u6a21\u5757\u538b\u529b\u4fdd\u6301", "pressure retention in fluidic modules"],
  ["\u4ecb\u8d28\u3001\u6d41\u91cf\u3001\u5f00\u542f\u6761\u4ef6\u3001\u5de5\u4f5c\u538b\u529b\u3001\u6e29\u5ea6\u548c\u5b89\u88c5\u65b9\u5411", "the fluid, flow rate, opening conditions, operating pressure, temperature, and mounting orientation"],
  ["\u5fae\u6d41\u4f53\u7cfb\u7edf\u3001IVD\u4eea\u5668\u3001\u5206\u6790\u4eea\u5668\u53ca\u5b9e\u9a8c\u5ba4\u81ea\u52a8\u5316\u8bbe\u5907", "microfluidic systems, IVD instruments, analytical instruments, and laboratory automation equipment"],
  ["\u5185\u90e8\u7ba1\u5f84\u8f6c\u6362", "internal tubing-size transitions"],
  ["\u4e0d\u540cID\u8f6f\u7ba1", "tubing with different IDs"],
  ["\u4e0d\u540c\u5185\u5f84\u8f6f\u7ba1", "tubing with different IDs"],
  ["\u591a\u901a\u9053\u7ba1\u8def\u5e03\u7f6e", "multi-channel tubing routing"],
  ["\u5185\u90e8\u591a\u901a\u9053\u7ba1\u8def", "internal multi-channel tubing"],
  ["\u56db\u8def\u8f6f\u7ba1", "four tubing lines"],
  ["\u4e09\u8def\u8f6f\u7ba1", "three tubing lines"],
  ["\u56db\u8def", "four-way"],
  ["\u4e09\u8def", "three-way"],
  ["\u591a\u901a\u9053", "multi-channel"],
  ["\u7ba1\u8def\u5ef6\u957f", "fluidic-path extension"],
  ["\u4fdd\u6301\u76f4\u7ebf\u8d70\u7ba1", "maintain a straight tubing run"],
  ["\u76f4\u7ebf\u8fde\u63a5", "straight connection"],
  ["\u4eea\u5668\u5185\u90e8", "inside instruments"],
  ["\u5185\u90e8\u7ba1\u8def", "internal tubing"],
  ["\u7ba1\u8def\u5c01\u95ed", "fluidic-path closure"],
  ["\u8bbe\u5907\u7ef4\u62a4", "equipment maintenance"],
  ["\u5c3a\u5bf8\u516c\u5dee", "dimensional tolerance"],
  ["\u5b9e\u9645\u88c5\u914d", "actual assembly"],
  ["\u5185\u90e8\u652f\u8def", "internal branch"],
  ["\u6db2\u8def", "fluidic path"],
  ["\u8f6f\u7ba1", "tubing"],
  ["\u7ba1\u8def", "fluidic path"],
];

function normalizeSpacing(value: string) {
  return value
    .replace(/[，、]/g, ", ")
    .replace(/。/g, ". ")
    .replace(/；/g, "; ")
    .replace(/：/g, ": ")
    .replace(/[（]/g, " (")
    .replace(/[）]/g, ") ")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/[ \t]+/g, " ")
    .replace(/(\d)\s*mm(?=[A-Za-z])/g, "$1 mm ")
    .replace(/\b(mm|MPa|kPa|mL|uL|\u03bcL|\u00b0C|PA|PP|PVDF|PCTFE|PEEK|PTFE|FKM|NBR|FEP|UNF|IVD|Automation)(?=[A-Za-z])/g, "$1 ")
    .replace(/\b(ID|OD)(?=[A-Za-z])/g, "$1 ")
    .replace(/\b(ID|OD)\s+s\b/gi, "$1s")
    .replace(/\b(\d+(?:\.\d+)?)\s+mm\s+mm\b/g, "$1 mm")
    .replace(/\bpanelstubing\b/gi, "panel tubing")
    .replace(/\b(requirements|compatibility|tubing|material|instrument|connection|equipment|fluidic|housing|seals)(?=[A-Za-z])/gi, "$1 ")
    .replace(/\b(is|are|uses|used|supports|suitable)\s*,/gi, "$1")
    .replace(/,\s*(and|or)\s*,\s*/gi, " $1 ")
    .replace(/\s+(and|or)\s*,\s*/gi, " $1 ")
    .replace(/,\s*,+/g, ", ")
    .replace(/\bfittingbarbed\s+fitting\b/gi, "barbed fitting")
    .replace(/\bfittingquick-?connect\s+fitting\b/gi, "quick-connect fitting")
    .replace(/\binstrument\s+s\b/gi, "instruments")
    .replace(/\bconnection\s+s\b/gi, "connections")
    .replace(/\bport\s+s\b/gi, "ports")
    .replace(/\bchannel\s+s\b/gi, "channels")
    .replace(/\bmaterial\s+s\b/gi, "materials")
    .replace(/\bID\s+s\b/gi, "IDs")
    .replace(/\bactualassembly\b/gi, "actual assembly")
    .replace(/\bdifferentIDtubing\b/gi, "tubing with different IDs")
    .replace(/\binstrument(?=internal|inside)/gi, "instrument ")
    .replace(/\binstrument\s+s(?!tatus\b)(?=[A-Za-z])/gi, "instrument ")
    .replace(/\bcustomer\s+s\b/gi, "customer's")
    .replace(/\bhousing\s+s\b/gi, "housings")
    .replace(/\b(accept|accepts|requires|with|from|to|and|or|for|of|in|a|an|the)(?=[A-Z0-9])/g, "$1 ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

function titleFromSlug(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) =>
      /\d/.test(part) || part.length <= 4
        ? part.toUpperCase()
        : `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`
    )
    .join(" ");
}

function inferProductName(data: DetailRecord) {
  const text = JSON.stringify(data).toLowerCase();
  const candidates: Array<[RegExp, string]> = [
    [/(无阀泵|无阀活塞泵|valveless)/i, "Valveless Piston Pump"],
    [/(注射泵|syringe-pump|hmd3|hmd6|hld3|hld6)/i, "Syringe Pump"],
    [/(隔膜泵|diaphragm)/i, "Diaphragm Pump"],
    [/(移液泵|pipetting|smtp)/i, "Pipetting Pump"],
    [/(柱塞泵|plunger|ea-|eas-|sm-|tm-)/i, "Plunger Pump"],
    [/(高压阀|high-pressure)/i, "High-Pressure Valve"],
    [/(电磁阀|solenoid)/i, "Solenoid Valve"],
    [/(旋转阀|rotary-valve|mrv)/i, "Rotary Valve"],
    [/(采样针|sampling-probe)/i, "Sampling Probe"],
    [/(穿刺针|piercing-probe)/i, "Piercing Probe"],
    [/(清洗针|wash-probe)/i, "Wash Probe"],
    [/(搅拌桨|mixing-paddle)/i, "Mixing Paddle"],
    [/(快插接头|快速接头|quick-connect)/i, "Quick-Connect Fitting"],
    [/(穿板倒刺接头|bulkhead-barbed)/i, "Bulkhead Barbed Fitting"],
    [/(倒刺接头|barbed-fitting)/i, "Barbed Fitting"],
    [/(硬管接头|hard-tube)/i, "Hard Tube Fitting"],
    [/(螺纹转倒刺|thread-to-barbed)/i, "Thread-to-Barb Fitting"],
    [/(鲁尔接头|luer)/i, "Luer Fitting"],
    [/(内螺纹转接头|female-thread)/i, "Female Thread Adapter"],
    [/(单向阀|check-valve)/i, "Check Valve"],
    [/(过滤器|filter)/i, "Inline Filter"],
    [/(管路|tubing)/i, "Tubing"],
    [/(气泡传感器|air-bubble)/i, "Air Bubble Detector"],
    [/(压力传感器|pressure-sensor)/i, "Pressure Sensor"],
  ];

  return candidates.find(([pattern]) => pattern.test(text))?.[1] || "Product";
}

function inferModel(data: DetailRecord, productName: string) {
  const raw = String(
    data.modelDisplay ||
      data.displayModel ||
      data.foreachModel ||
      data.model ||
      data.title ||
      data.productCode ||
      data.slug ||
      ""
  );
  const technicalText = normalizeSpacing(raw.replace(HAN_GLOBAL_PATTERN, " "));

  if (technicalText && technicalText.toLowerCase() !== "contact us") {
    return technicalText;
  }

  return data.slug ? titleFromSlug(String(data.slug)) : productName;
}

function localizeHref(value: string) {
    /*
     * STATIC_ASSET_LOCALE_PREFIX_GUARD
     *
     * public 目录资源使用网站根路径。
     * 不允许变成 /en/documents 或 /fr/images。
     */
    if (
      value.startsWith("/documents/") ||
      value.startsWith("/images/") ||
      value.startsWith("/models/") ||
      value.startsWith("/videos/") ||
      value.startsWith("/files/")
    ) {
      return value;
    }
  if (
    !value.startsWith("/") ||
    value.startsWith("/en/") ||
    value === "/en" ||
    value.startsWith("/assets/") ||
    value.startsWith("/images/") ||
    value.startsWith("/_next/") ||
    value.startsWith("/api/")
  ) {
    return value;
  }

  return `/en${value}`;
}

function translateKnownPhrases(value: string) {
  let translated =
    FITTING_EXACT_TRANSLATIONS[value.trim()] ||
    EXACT_TRANSLATIONS[value.trim()] ||
    value;

  for (const [source, target] of [...PHRASE_TRANSLATIONS].sort(
    (left, right) => right[0].length - left[0].length
  )) {
    translated = translated.split(source).join(target);
  }

  return normalizeSpacing(translated);
}

function translateSpecificationLabel(value: string) {
  const actualTranslation =
    ACTUAL_SPECIFICATION_LABEL_TRANSLATIONS[value.trim()];

  if (actualTranslation) {
    return actualTranslation;
  }

  const supplementalTranslation: Record<string, string> = {
    "对接端接口形式": "Mating-End Interface Type",
    "锁圈结构": "Lock-Ring Design",
    "连接结构": "Connection Structure",
    "产品结构": "Product Structure",
    "阀门配置": "Valve Configuration",
    "公母端": "Male/Female End",
    "形状": "Shape",
  };
  const directTranslation = supplementalTranslation[value.trim()];

  if (directTranslation) {
    return directTranslation;
  }

  const additionalTranslation =
    ADDITIONAL_SPECIFICATION_LABEL_TRANSLATIONS[value.trim()];

  if (additionalTranslation) {
    return additionalTranslation;
  }

  const translated = translateNarrativeFragment(
    translateKnownPhrases(value)
  );

  if (!HAN_PATTERN.test(translated)) {
    return translated;
  }

  return "Specification";
}

function translateSpecificationValue(value: string) {
  const trimmed = value.trim();

  const controlModuleTranslation =
    CONTROL_MODULE_SPEC_VALUE_TRANSLATIONS[trimmed];

  if (controlModuleTranslation) {
    return controlModuleTranslation;
  }

  const actualTranslation =
    ACTUAL_SPECIFICATION_VALUE_TRANSLATIONS[trimmed];

  if (actualTranslation) {
    return actualTranslation;
  }

  if (["/", "-", "—", "–"].includes(trimmed)) {
    return trimmed;
  }

  let translated = value
    .replace(/(\d+)\s*端口/g, (_, count: string) =>
      `${count} ${count === "1" ? "port" : "ports"}`
    )
    .replace(/(\d+)\s*通道/g, (_, count: string) =>
      `${count} ${count === "1" ? "channel" : "channels"}`
    )
    .replace(/(\d+)\s*通/g, (_, count: string) =>
      `${count}-way`
    )
    .replace(/(\d+)\s*万圈/g, (_, count: string) =>
      `${Number(count) * 10000} revolutions`
    )
    .replace(/(\d+)\s*圈/g, (_, count: string) =>
      `${count} revolutions`
    );

  translated = translateNarrativeFragment(
    translateKnownPhrases(translated)
  );

  translated = translated
    .replace(/(\d+)\s*μL/g, "$1 μL")
    .replace(/(\d+)\s*mm/g, "$1 mm")
    .replace(/(\d+)\s*MPa/g, "$1 MPa")
    .replace(/(\d+)\s*W/g, "$1 W")
    .replace(/(\d+)\s*℃/g, "$1 °C")
    .replace(/\/圈/g, "/revolution")
    .replace(/(\d+)\s*%RH/g, "$1% RH")
    .replace(/([≤＜])\s*/g, (match: string, symbol: string) =>
      symbol === "＜" ? "<" : "≤"
    )
    .replace(/：/g, ": ");

  translated = normalizeSpacing(translated);

  if (!HAN_PATTERN.test(translated)) {
    return translated;
  }

  const technicalRemainder = normalizeSpacing(
    translated.replace(HAN_GLOBAL_PATTERN, " ")
  );

  return technicalRemainder || "Available by configuration";
}

function localizeSpecificationEntry(
  item: unknown,
  context: LocalizationContext
): unknown {
  if (Array.isArray(item)) {
    return item.map((child) =>
      localizeSpecificationEntry(child, context)
    );
  }

  if (!item || typeof item !== "object") {
    return item;
  }

  const entry = item as DetailRecord;
  const rawLabel = typeof entry.label === "string" ? entry.label : "";
  const rawValue = typeof entry.value === "string" ? entry.value : "";
  const rowTranslation =
    rawLabel && rawValue
      ? SPECIFICATION_ROW_TRANSLATIONS[`${rawLabel}::${rawValue}`]
      : undefined;

  return Object.fromEntries(
    Object.entries(entry).map(([key, value]) => {
      if (key === "label" || key === "name") {
        return [
          key,
          typeof value === "string"
            ? translateSpecificationLabel(value)
            : value,
        ];
      }

      if (
        key === "tableName" ||
        key === "parameter" ||
        key === "groupName" ||
        key === "section" ||
        key === "category"
      ) {
        return [
          key,
          typeof value === "string"
            ? translateSpecificationLabel(value)
            : value,
        ];
      }

      if (key === "value") {
        return [
          key,
          rowTranslation ||
          (typeof value === "string"
            ? translateSpecificationValue(value)
            : value),
        ];
      }

      if (key === "text" && typeof value === "string") {
        return [
          key,
          translateSpecificationValue(value),
        ];
      }

      if (key === "content" && typeof value === "string") {
        return [
          key,
          translateSpecificationValue(value),
        ];
      }

      if (key === "note" && typeof value === "string") {
        return [
          key,
          value.trim()
            ? translateNarrativeText(value, context)
            : value,
        ];
      }

      if (key === "title" && typeof value === "string") {
        return [
          key,
          translateSpecificationLabel(value),
        ];
      }

      return [
        key,
        Array.isArray(value) ||
        (value && typeof value === "object")
          ? localizeSpecificationEntry(value, context)
          : value,
      ];
    })
  );
}

function translateNarrativeFragment(value: string) {
  let translated = value;

  for (const [source, target] of [
    ...Object.entries(NARRATIVE_EXACT_TRANSLATIONS),
    ...NARRATIVE_PHRASE_TRANSLATIONS,
  ].sort((left, right) => right[0].length - left[0].length)) {
    translated = translated.split(source).join(target);
  }

  return normalizeSpacing(
    translateKnownPhrases(translated)
      .replace(/\b(\d+-way)(?=[A-Za-z])/g, "$1 ")
  );
}

function translateTubingPhrase(value: string) {
  return translateNarrativeFragment(
    value
      .replace(
        /((?:\d+(?:\.\d+)?)(?:\s*\/\s*\d+(?:\.\d+)?)+)\s*mm\u5185\u5f84\u8f6f\u7ba1/g,
        "tubing with IDs of $1 mm"
      )
      .replace(
        /(\d+(?:\.\d+)?)\s*mm\s*转\s*(\d+(?:\.\d+)?)\s*mm\s*内径\s*软管/g,
        "tubing with an ID transition from $1 mm to $2 mm"
      )
      .replace(
        /(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?)\s*mm\s*内径\s*软管/g,
        "tubing with an ID of $1 mm"
      )
      .replace(
        /(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?)\s*mm\s*接管内径/g,
        "tubing with an ID of $1 mm"
      )
      .replace(
        /(\d+(?:\.\d+)?(?:\s*[–-]\s*\d+(?:\.\d+)?)?)\s*mm\s*外径\s*硬管/g,
        "rigid tubing with an OD of $1 mm"
      )
  );
}

function translateNarrativeClause(value: string) {
  const clause = value.trim();

  if (!clause) {
    return "";
  }

  let match = clause.match(/^(.+?)是一款面向(.+?)的(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[3])} designed for ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)是一款用于(.+?)的(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[3])} for ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)是一款(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)面向(.+?)(?:设计)?$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is designed for ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)采用(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} uses ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)适用于(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is suitable for ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)适合(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is suited to ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)用于(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is used for ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)支持(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} supports ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)为(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} is ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)可根据(.+?)进行(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} can be ${translateNarrativeFragment(match[3])} based on ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)可根据(.+?)确认$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} can be confirmed based on ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)可在(.+?)实现(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} can provide ${translateNarrativeFragment(match[3])} in ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^可在(.+?)实现(.+)$/);

  if (match) {
    return `It can provide ${translateNarrativeFragment(match[2])} in ${translateNarrativeFragment(match[1])}`;
  }

  match = clause.match(/^(.+?)额定流量为(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} has a rated flow rate of ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)额定压力为(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} has a rated pressure of ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)自吸高度为(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} has a self-priming lift of ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)通过(.+?)完成(.+)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} uses ${translateNarrativeFragment(match[2])} to perform ${translateNarrativeFragment(match[3])}`;
  }

  match = clause.match(/^可将(.+?)集中接入一个(.+)$/);

  if (match) {
    return `It can connect ${translateNarrativeFragment(match[1])} to a single ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^该系列覆盖(.+?)$/);

  if (match) {
    return `This series covers ${translateNarrativeFragment(match[1])}`;
  }

  match = clause.match(/^用户可根据(.+?)直接选择(.+)$/);

  if (match) {
    return `Users can select ${translateNarrativeFragment(match[2])} based on ${translateNarrativeFragment(match[1])}`;
  }

  match = clause.match(/^如需(.+?)可在(.+?)进一步确认$/);

  if (match) {
    return `For ${translateNarrativeFragment(match[1])}, see ${translateNarrativeFragment(match[2])} for confirmation`;
  }

  match = clause.match(/^可减少(.+?)，降低(.+)$/);

  if (match) {
    return `It can reduce ${translateNarrativeFragment(match[1])} and lower ${translateNarrativeFragment(match[2])}`;
  }

  match = clause.match(/^(.+?)并可在(.+?)$/);

  if (match) {
    return `${translateNarrativeFragment(match[1])} and can ${translateNarrativeFragment(match[2])}`;
  }

  if (clause.startsWith("可减少")) {
    return `It can reduce ${translateNarrativeFragment(clause.slice(3))}`;
  }

  if (clause.startsWith("可在")) {
    return `It can ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("并支持")) {
    return `It also supports ${translateNarrativeFragment(clause.slice(3))}`;
  }

  if (clause.startsWith("并可")) {
    return `It can also ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("适用于")) {
    return `It is suitable for ${translateNarrativeFragment(clause.slice(3))}`;
  }

  if (clause.startsWith("适合")) {
    return `It is suited to ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("用于")) {
    return `It is used for ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("采用")) {
    return `It uses ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("支持")) {
    return `It supports ${translateNarrativeFragment(clause.slice(2))}`;
  }

  if (clause.startsWith("可根据")) {
    return `It can be configured based on ${translateNarrativeFragment(clause.slice(3))}`;
  }

  if (clause.startsWith("实际选型时需结合")) {
    return `For selection, confirm ${translateNarrativeFragment(clause.slice(8).replace(/确认$/, ""))}`;
  }

  if (clause.startsWith("选型时应结合")) {
    return `When selecting, consider ${translateNarrativeFragment(clause.slice(6))}`;
  }

  if (clause.startsWith("选型时还需要")) {
    return `When selecting, also confirm ${translateNarrativeFragment(clause.slice(6))}`;
  }

  if (clause.startsWith("需要结合")) {
    return `Confirm ${translateNarrativeFragment(clause.slice(4))}`;
  }

  return translateNarrativeFragment(clause);
}

function translateNarrativeSentences(value: string) {
  const sentenceParts = value
    .split(/(?<=[。！？])/u)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentenceParts.length === 0) {
    return "";
  }

  return sentenceParts
    .map((part) => {
      const punctuation = /[。！？]$/.test(part) ? part.slice(-1) : "";
      const body = punctuation ? part.slice(0, -1) : part;
      const clauses = body.split("，").map((item) => item.trim()).filter(Boolean);
      const translated = clauses.map(translateNarrativeClause).filter(Boolean).join(", ");
      return `${translated}${punctuation === "？" ? "?" : punctuation === "！" ? "!" : translated ? "." : ""}`;
    })
    .join(" ");
}

function translateFittingFragment(value: string) {
  const exact = FITTING_EXACT_TRANSLATIONS[value.trim()];

  if (exact) {
    return exact;
  }

  let translated = value;

  for (const [source, target] of [...FITTING_FRAGMENT_TRANSLATIONS].sort(
    (left, right) => right[0].length - left[0].length
  )) {
    translated = translated.split(source).join(target);
  }

  translated = translateKnownPhrases(translated);

  return translateTubingPhrase(translated);
}

function translateFittingSentence(value: string) {
  const sentence = value.trim();

  if (sentence.startsWith("\u53ef\u7528\u4e8e")) {
    return `It can be used for ${translateFittingFragment(sentence.slice(3))}`;
  }

  if (sentence.startsWith("\u9002\u5408")) {
    return `It is suited to ${translateFittingFragment(sentence.slice(2))}`;
  }

  if (sentence.startsWith("\u4e24\u7aef\u5206\u522b\u9002\u914d")) {
    return translateFittingTubingSentence(
      sentence,
      "\u4e24\u7aef\u5206\u522b\u9002\u914d",
      "The two ends accept"
    );
  }

  if (sentence.startsWith("\u4e24\u7aef\u5747\u9002\u914d")) {
    return translateFittingTubingSentence(
      sentence,
      "\u4e24\u7aef\u5747\u9002\u914d",
      "Both ends accept"
    );
  }

  if (sentence.startsWith("\u4e09\u4e2a\u63a5\u7ba1\u7aef\u9002\u914d")) {
    return translateFittingTubingSentence(
      sentence,
      "\u4e09\u4e2a\u63a5\u7ba1\u7aef\u9002\u914d",
      "The three ports accept"
    );
  }

  if (sentence.startsWith("\u5404\u63a5\u7ba1\u7aef\u9002\u914d")) {
    return translateFittingTubingSentence(
      sentence,
      "\u5404\u63a5\u7ba1\u7aef\u9002\u914d",
      "Each tubing port accepts"
    );
  }

  return translateNarrativeClause(sentence);
}

function englishIndefiniteArticle(value: string) {
  return /^[AEIOU]/i.test(value.trim()) ? "an" : "a";
}

function translateFittingNarrativeTemplate(value: string): string | null {
  const source = value.trim();
  let match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u7528\u4e8e(.+?)\u3002(.+?)\u3002\u91c7\u7528(.+?)\u6750\u8d28\uff0c\u989c\u8272\u4e3a(.+?)\u3002\u9009\u578b\u65f6\u5e94\u7ed3\u5408(.+?)\u786e\u8ba4\u5339\u914d\u6027\u3002$/
  );

  if (match) {
    return [
      `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])}.`,
      `It is used to ${translateFittingFragment(match[3])}.`,
      `${translateFittingSentence(match[4])}.`,
      `It is made of ${translateFittingFragment(match[5])}; the color is ${translateFittingFragment(match[6])}.`,
      `For selection, confirm compatibility based on ${translateFittingFragment(match[7])}.`,
    ].join(" ");
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e\u9002\u7528\u4e8e\u5916\u5f84(.+?)\u786c\u7ba1\u7684(.+?)\uff0c\u91c7\u7528(.+?)\u87ba\u7eb9\u3001(.+?)\u4e3b\u4f53\u548c(.+?)\u7ed3\u6784\uff0c\u9002\u7528\u4e8e(.+?)\u3002$/
  );

  if (match) {
    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[3])} for rigid tubing with an OD of ${translateFittingFragment(match[2])}. It uses ${translateFittingFragment(match[4])} threads, a ${translateFittingFragment(match[5])} body, and a ${translateFittingFragment(match[6])} sealing structure. It is suitable for ${translateFittingFragment(match[7])}.`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u9002\u914d(.+?)\u63a5\u7ba1\u5185\u5f84\uff0c\u91c7\u7528(.+?)\u5916\u58f3\u548c(.+?)\u5bc6\u5c01\u5708\uff0c(\u652f\u6301\u7a7f\u677f\u5b89\u88c5|\u91c7\u7528\u975e\u7a7f\u677f\u7ed3\u6784)\u3002\u9002\u7528\u4e8e(.+?)(?:\uff0c\u5e76\u53ef\u5728\u63a5\u5934\u65ad\u5f00\u65f6\u5173\u95ed\u6d41\u8def)?\u3002$/
  );

  if (match) {
    const mounting =
      match[6] === "\u652f\u6301\u7a7f\u677f\u5b89\u88c5"
        ? "It supports bulkhead mounting."
        : "It uses a non-bulkhead structure.";
    const shutoff = source.includes("\u5e76\u53ef\u5728\u63a5\u5934\u65ad\u5f00\u65f6\u5173\u95ed\u6d41\u8def")
      ? " The fluidic path can be shut off when the fitting is disconnected."
      : "";

    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])} for tubing with an ID of ${translateFittingFragment(match[3])}. It uses a ${translateFittingFragment(match[4])} housing and ${translateFittingFragment(match[5])} seals. ${mounting} It is suitable for ${translateFittingFragment(match[7])}.${shutoff}`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u9002\u914d(.+?)\s*mm\u5185\u5f84\u8f6f\u7ba1\uff0c\u4e3b\u4f53\u6750\u8d28\u4e3a(.+?)\uff0c\u9002\u7528\u4e8e(.+?)\u4e2d\u7684\u6db2\u8def\u8fde\u63a5\u3002$/
  );

  if (match) {
    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])} for ${translateFittingFragment(`${match[3]} mm\u5185\u5f84\u8f6f\u7ba1`)}. The body is made of ${translateFittingFragment(match[4])}. It is intended for fluidic connections in ${translateFittingFragment(match[5])}.`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u63a5\u53e3\u89c4\u683c\u4e3a(.+?)\uff0c\u4e3b\u4f53\u6750\u8d28\u4e3a(.+?)\u3002\u7528\u4e8e(.+?)\u3002\u5b9e\u9645\u9009\u578b\u65f6\u5e94\u7ed3\u5408(.+?)\u786e\u8ba4\u3002$/
  );

  if (match) {
    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])} with a ${translateFittingFragment(match[3])} interface and a ${translateFittingFragment(match[4])} body. It is used to ${translateFittingFragment(match[5])}. For selection, confirm ${translateFittingFragment(match[6])}.`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u91c7\u7528(.+?)\u5185\u87ba\u7eb9\u63a5\u53e3\uff0c\u901a\u5f84\u4e3a(.+?)\uff0c\u4e3b\u4f53\u6750\u8d28\u4e3a(.+?)\uff0c\u9002\u7528\u4e8e(.+?)\u4e2d\u7684\u6db2\u8def\u8f6c\u63a5\u3002$/
  );

  if (match) {
    const body = translateFittingFragment(match[5]);

    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])} with a ${translateFittingFragment(match[3])} female-thread interface, a bore of ${translateFittingFragment(match[4])}, and ${englishIndefiniteArticle(body)} ${body} body. It is intended for fluidic transitions in ${translateFittingFragment(match[6])}.`;
  }

  match = source.match(
    /^\u5546\u54c1\u7f16\u7801(.+?)\u4e3a(.+?)\uff0c\u7ec4\u4ef6\u89c4\u683c\u4e3a(.+?)\uff0c\u91c7\u7528(.+?)\u6750\u8d28\u3002\u9002\u7528\u4e8e(.+?)\u3002\u5b9e\u9645\u9009\u578b\u65f6\u5e94\u7ed3\u5408(.+?)\u786e\u8ba4\u3002$/
  );

  if (match) {
    return `Product code ${translateFittingFragment(match[1])} identifies a ${translateFittingFragment(match[2])} with an assembly size of ${translateFittingFragment(match[3])}, made of ${translateFittingFragment(match[4])}. It is intended for ${translateFittingFragment(match[5])}. For selection, confirm ${translateFittingFragment(match[6])}.`;
  }

  match = source.match(
    /^(.+?)\u662f\u4e00\u6b3e(.+?)\uff0c\u6750\u8d28\u4e3a(.+?)\uff0c\u989c\u8272\u4e3a(.+?)\uff0c\u7528\u4e8e(.+?)\u3002$/
  );

  if (match) {
    return `${translateFittingFragment(match[1])} is a ${translateFittingFragment(match[2])}, made of ${translateFittingFragment(match[3])} in ${translateFittingFragment(match[4])}. It is used for ${translateFittingFragment(match[5])}.`;
  }

  return null;
}

function translateFittingTubingSentence(
  sentence: string,
  sourcePrefix: string,
  englishPrefix: string
) {
  const body = sentence.slice(sourcePrefix.length).trim();
  const [tubingSource, ...remainderParts] = body.split("，");
  const tubing = translateTubingPhrase(tubingSource);
  const remainder = remainderParts.join("，").trim();

  if (!remainder) {
    return `${englishPrefix} ${tubing}`;
  }

  if (remainder.startsWith("可用于")) {
    return `${englishPrefix} ${tubing}, and can be used for ${translateFittingFragment(remainder.slice(3))}`;
  }

  if (remainder.startsWith("适合")) {
    return `${englishPrefix} ${tubing}, and is suited to ${translateFittingFragment(remainder.slice(2))}`;
  }

  return `${englishPrefix} ${tubing}; ${translateFittingFragment(remainder)}`;
}

function translateNarrativePattern(
  value: string,
  context: LocalizationContext
) {
  const fittingTranslation = translateFittingNarrativeTemplate(value);

  if (fittingTranslation) {
    return fittingTranslation;
  }

  let match = value.match(
    /^(.+?)是一款(.+?)，用于(.+?)。两端均适配(.+?)，适合(.+?)。采用(.+?)材质，颜色为(.+?)。选型时应结合(.+?)确认匹配性。$/
  );

  if (match) {
    return [
      `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])}.`,
      `It is used for ${translateNarrativeFragment(match[3])}.`,
      `Both ends accept ${translateTubingPhrase(match[4])} and are suited to ${translateNarrativeFragment(match[5])}.`,
      `It uses ${translateNarrativeFragment(match[6])}; the color is ${translateNarrativeFragment(match[7])}.`,
      `For selection, assess compatibility based on ${translateNarrativeFragment(match[8])}.`,
    ].join(" ");
  }

  match = value.match(
    /^(.+?)是一款(.+?)，采用(.+?)螺纹，适配(.+?)接管内径，壳体材质为(.+?)。适用于(.+?)。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])}. It uses ${translateNarrativeFragment(match[3])} threads, accepts ${translateTubingPhrase(`${match[4]}接管内径`)}, and has a ${translateNarrativeFragment(match[5])} housing. It is suitable for ${translateFittingFragment(match[6])}.`;
  }

  match = value.match(
    /^(.+?)是一款(.+?)，接口规格为(.+?)，主体材质为(.+?)。用于(.+?)。实际选型时应结合(.+?)确认。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])} with a ${translateNarrativeFragment(match[3])} interface and a ${translateNarrativeFragment(match[4])} body. It is used to ${translateNarrativeFragment(match[5])}. For selection, confirm ${translateNarrativeFragment(match[6])}.`;
  }

  match = value.match(
    /^(.+?)是一款(.+?)，采用(.+?)内螺纹接口，通径为(.+?)，主体材质为(.+?)，适用于(.+?)。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])} with a ${translateNarrativeFragment(match[3])} female-thread interface and a ${translateNarrativeFragment(match[4])} bore. It uses a ${translateNarrativeFragment(match[5])} body and is suitable for ${translateNarrativeFragment(match[6])}.`;
  }

  match = value.match(
    /^(.+?)是一款适用于(.+?)硬管的(.+?)，采用(.+?)螺纹、(.+?)主体和(.+?)结构，适用于(.+?)。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[3])} for rigid tubing with an OD of ${translateNarrativeFragment(match[2])}. It uses ${translateNarrativeFragment(match[4])} threads, a ${translateNarrativeFragment(match[5])} body, and a ${translateNarrativeFragment(match[6])} structure. It is suitable for ${translateNarrativeFragment(match[7])}.`;
  }

  match = value.match(
    /^(.+?)是一款(.+?)，适配(.+?)内径软管，主体材质为(.+?)，适用于(.+?)。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])} for ${translateTubingPhrase(`${match[3]} mm内径软管`)}. It uses a ${translateNarrativeFragment(match[4])} body and is suitable for ${translateNarrativeFragment(match[5])}.`;
  }

  match = value.match(
    /^(.+?)是一款(.+?)，适配(.+?)接管内径，采用(.+?)外壳和(.+?)密封圈，支持穿板安装。适用于(.+?)，并可在接头断开时关闭流路。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])} for ${translateTubingPhrase(`${match[3]}接管内径`)}. It uses a ${translateNarrativeFragment(match[4])} housing and ${translateNarrativeFragment(match[5])} seals, supports bulkhead mounting, and is suitable for ${translateNarrativeFragment(match[6])}. The fluidic path can be shut off when the fitting is disconnected.`;
  }

  match = value.match(
    /^(.+?)是一款(.+?)，适配(.+?)螺纹与(.+?)内径软管，用于(.+?)。采用(.+?)材质，密封方式为(.+?)，颜色为(.+?)。选型时应结合(.+?)确认匹配性。$/
  );

  if (match) {
    return `${translateNarrativeFragment(match[1])} is a ${translateNarrativeFragment(match[2])} for ${translateNarrativeFragment(match[3])} threads and ${translateTubingPhrase(`${match[4]} mm内径软管`)}. It is used for ${translateNarrativeFragment(match[5])}. It uses ${translateNarrativeFragment(match[6])}; sealing is by ${translateNarrativeFragment(match[7])}, and the color is ${translateNarrativeFragment(match[8])}. For selection, assess compatibility based on ${translateNarrativeFragment(match[9])}.`;
  }

  match = value.match(/^适用(.+?)。选型时应以(.+?)为准。$/);

  if (match) {
    return `Compatible with ${translateTubingPhrase(match[1])}. For selection, use ${translateNarrativeFragment(match[2])}.`;
  }

  match = value.match(/^该型号采用(.+?)。安装前应结合(.+?)核对装配尺寸。$/);

  if (match) {
    return `This model uses ${translateNarrativeFragment(match[1])}. Before installation, verify the assembly dimensions against ${translateNarrativeFragment(match[2])}.`;
  }

  match = value.match(/^该型号适配(.+?)，装配时应同时确认(.+?)。$/);

  if (match) {
    return `This model accepts ${translateTubingPhrase(match[1])}. During assembly, also confirm ${translateNarrativeFragment(match[2])}.`;
  }

  match = value.match(/^当前记录的(.+?)为(.+?)。实际装配前还应核对(.+?)。$/);

  if (match) {
    return `The recorded ${translateNarrativeFragment(match[1])} is ${translateNarrativeFragment(match[2])}. Before assembly, also verify ${translateNarrativeFragment(match[3])}.`;
  }

  match = value.match(/^该产品属于(.+?)。选型时应进一步确认(.+?)。$/);

  if (match) {
    return `This product belongs to the ${translateNarrativeFragment(match[1])} category. For selection, further confirm ${translateNarrativeFragment(match[2])}.`;
  }

  match = value.match(/^该产品为(.+?)。不同结构在(.+?)方面可能存在差异。$/);

  if (match) {
    return `This product uses a ${translateNarrativeFragment(match[1])} design. Different designs may vary in terms of ${translateNarrativeFragment(match[2])}.`;
  }

  match = value.match(/^应根据(.+?)选择(.+?)，并确认(.+?)。$/);

  if (match) {
    return `Select based on ${translateNarrativeFragment(match[1])}, and confirm ${translateNarrativeFragment(match[3])}.`;
  }

  if (value.startsWith("可以。")) {
    const remainder = translateNarrativeSentences(value.slice(3));
    return remainder && !HAN_PATTERN.test(remainder)
      ? `Yes. ${remainder}`
      : "Yes. Contact the FOREACH engineering team for configuration review.";
  }

  const questionPatterns: Array<{
    pattern: RegExp;
    render: (subject: string, detail?: string) => string;
  }> = [
    {
      pattern: /^(.+?)是否接触液体？$/,
      render: (subject) =>
        `Does ${translateNarrativeFragment(subject)} come into direct contact with the fluid?`,
    },
    {
      pattern: /^(.+?)可以检测哪些管径？$/,
      render: (subject) =>
        `What tubing diameters can ${translateNarrativeFragment(subject)} detect?`,
    },
    {
      pattern: /^(.+?)能否检测很小的微气泡？$/,
      render: (subject) =>
        `Can ${translateNarrativeFragment(subject)} detect very small air bubbles?`,
    },
    {
      pattern: /^(.+?)适合做哪些(.+?)？$/,
      render: (subject, detail) =>
        `Which ${translateNarrativeFragment(detail || "applications")} is ${translateNarrativeFragment(subject)} suited for?`,
    },
    {
      pattern: /^(.+?)为什么需要按(.+?)定制？$/,
      render: (subject, detail) =>
        `Why does ${translateNarrativeFragment(subject)} need to be customized for ${translateNarrativeFragment(detail || "the application")}?`,
    },
    {
      pattern: /^如何判断(.+?)形状？$/,
      render: (subject) =>
        `How should the shape of ${translateNarrativeFragment(subject)} be selected?`,
    },
    {
      pattern: /^是否可以做(.+?)？$/,
      render: (detail) =>
        `Can ${translateNarrativeFragment(detail || "this configuration")} be provided?`,
    },
    {
      pattern: /^(.+?)如何避免(.+?)？$/,
      render: (subject, detail) =>
        `How can ${translateNarrativeFragment(subject)} avoid ${translateNarrativeFragment(detail || "this issue")}?`,
    },
    {
      pattern: /^(.+?)主要用于什么场景？$/,
      render: (subject) =>
        `What applications is ${translateNarrativeFragment(subject)} primarily intended for?`,
    },
    {
      pattern: /^为什么(.+?)按(.+?)展示？$/,
      render: (subject, detail) =>
        `Why is ${translateNarrativeFragment(subject)} presented as ${translateNarrativeFragment(detail || "a custom configuration")}?`,
    },
    {
      pattern: /^为什么选择(.+?)？$/,
      render: (subject) =>
        `Why choose ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)版本应该如何选择？$/,
      render: (subject) =>
        `How should the ${translateNarrativeFragment(subject)} versions be selected?`,
    },
    {
      pattern: /^(.+?)应该如何选择？$/,
      render: (subject) =>
        `How should ${translateNarrativeFragment(subject)} be selected?`,
    },
    {
      pattern: /^如果不确定选择哪个(.+)怎么办？$/,
      render: (subject) =>
        `What should I do if I am unsure which ${translateNarrativeFragment(subject)} to select?`,
    },
    {
      pattern: /^如果需要确认具体型号怎么办？$/,
      render: () =>
        `How can I confirm the specific model?`,
    },
    {
      pattern: /^(.+?)是带阀还是不带阀？$/,
      render: (subject) =>
        `Does ${translateNarrativeFragment(subject)} have a shut-off or non-shut-off design?`,
    },
    {
      pattern: /^(.+?)支持哪些通讯方式？$/,
      render: (subject) =>
        `What communication methods does ${translateNarrativeFragment(subject)} support?`,
    },
    {
      pattern: /^(.+?)使用什么通信方式？$/,
      render: (subject) =>
        `What communication method does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)的(.+?)对液路有什么影响？$/,
      render: (subject, detail) =>
        `How does the ${translateNarrativeFragment(detail || "configuration")} of ${translateNarrativeFragment(subject)} affect the fluidic path?`,
    },
    {
      pattern: /^(.+?)与(.+?)的主要区别是什么？$/,
      render: (subject, detail) =>
        `What is the main difference between ${translateNarrativeFragment(subject)} and ${translateNarrativeFragment(detail || "the alternative")}?`,
    },
    {
      pattern: /^(.+?)是标准品还是定制品？$/,
      render: (subject) =>
        `Is ${translateNarrativeFragment(subject)} a standard product or a custom configuration?`,
    },
    {
      pattern: /^(.+?)膜片如何选择？$/,
      render: (subject) =>
        `How should the ${translateNarrativeFragment(subject)} diaphragm material be selected?`,
    },
    {
      pattern: /^是否需要节能回路？$/,
      render: () =>
        `Is an energy-saving circuit required?`,
    },
    {
      pattern: /^(.+?)可以定制(.+?)吗？$/,
      render: (subject, detail) =>
        `Can ${translateNarrativeFragment(subject)} be configured with custom ${translateNarrativeFragment(detail || "requirements")}?`,
    },
    {
      pattern: /^(.+?)快插接头如何选择公端和母端？$/,
      render: (subject) =>
        `How should the male and female ends of ${translateNarrativeFragment(subject)} quick-connect fittings be selected?`,
    },
    {
      pattern: /^带阀和不带阀有什么区别？$/,
      render: () =>
        `What is the difference between shut-off and non-shut-off versions?`,
    },
    {
      pattern: /^穿板型号适合什么安装方式？$/,
      render: () =>
        `What mounting method is suitable for bulkhead models?`,
    },
    {
      pattern: /^(.+?)系列有哪些外形结构？$/,
      render: (subject) =>
        `What body configurations are available in the ${translateNarrativeFragment(subject)} series?`,
    },
    {
      pattern: /^如何获取具体型号的二维图或三维模型？$/,
      render: () =>
        `How can I obtain a 2D drawing or 3D model for a specific model?`,
    },
    {
      pattern: /^(.+?)适合做什么？$/,
      render: (subject) =>
        `What is ${translateNarrativeFragment(subject)} used for?`,
    },
    {
      pattern: /^(.+?)的压力范围是多少？$/,
      render: (subject) =>
        `What is the pressure range of ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)使用什么通讯方式？$/,
      render: (subject) =>
        `What communication method does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)的液路接口是什么？$/,
      render: (subject) =>
        `What fluidic interface does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)是否适合低死体积液路？$/,
      render: (subject) =>
        `Is ${translateNarrativeFragment(subject)} suitable for low-dead-volume fluidic paths?`,
    },
    {
      pattern: /^(.+?)适配什么规格的软管？$/,
      render: (subject) =>
        `What tubing size is compatible with ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)适配什么接口？$/,
      render: (subject) =>
        `What interface does ${translateNarrativeFragment(subject)} accept?`,
    },
    {
      pattern: /^(.+?)适配多大接管内径？$/,
      render: (subject) =>
        `What tubing ID does ${translateNarrativeFragment(subject)} accept?`,
    },
    {
      pattern: /^(.+?)的螺纹规格是什么？$/,
      render: (subject) =>
        `What thread specification does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)的接口规格是什么？$/,
      render: (subject) =>
        `What interface specification does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)采用什么(.+?)？$/,
      render: (subject, detail) =>
        `What type of ${translateNarrativeFragment(detail || "configuration")} does ${translateNarrativeFragment(subject)} use?`,
    },
    {
      pattern: /^(.+?)属于哪类(.+?)？$/,
      render: (subject, detail) =>
        `What type of ${translateNarrativeFragment(detail || "product")} is ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)为什么采用(.+?)？$/,
      render: (subject, detail) =>
        `Why does ${translateNarrativeFragment(subject)} use ${translateNarrativeFragment(detail || "this configuration")}?`,
    },
    {
      pattern: /^(.+?)与(.+?)的区别是什么？$/,
      render: (subject, detail) =>
        `What is the difference between ${translateNarrativeFragment(subject)} and ${translateNarrativeFragment(detail || "the alternative")}?`,
    },
    {
      pattern: /^(.+?)是否支持多通道配置？$/,
      render: (subject) =>
        `Does ${translateNarrativeFragment(subject)} support multi-channel configurations?`,
    },
    {
      pattern: /^(.+?)尺寸对应软管内径还是外径？$/,
      render: (subject) =>
        `Does the ${translateNarrativeFragment(subject)} size refer to the tubing ID or OD?`,
    },
    {
      pattern: /^(.+?)材质是否适合(?:当前|目标)介质？$/,
      render: (subject) =>
        `Is ${translateNarrativeFragment(subject).replace(/材质$/i, "")} compatible with the target fluid?`,
    },
    {
      pattern: /^(.+?)如何确认液体兼容性？$/,
      render: (subject) =>
        `How do I confirm fluid compatibility for ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)的等径和异径如何区分？$/,
      render: (subject) =>
        `How do I distinguish equal-bore and reducing versions of ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)安装时需要注意什么？$/,
      render: (subject) =>
        `What should I check when installing ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)是否支持穿板安装？$/,
      render: (subject) =>
        `Does ${translateNarrativeFragment(subject)} support bulkhead mounting?`,
    },
    {
      pattern: /^(.+?)是否可以查看二维尺寸图？$/,
      render: (subject) =>
        `Can I view a 2D dimensional drawing for ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)是否可以申请2D图纸？$/,
      render: (subject) =>
        `Can I request a 2D drawing for ${translateNarrativeFragment(subject)}?`,
    },
    {
      pattern: /^(.+?)和(.+?)怎么选？$/,
      render: (subject, detail) =>
        `How should ${translateNarrativeFragment(subject)} and ${translateNarrativeFragment(detail || "")} be selected?`,
    },
    {
      pattern: /^(.+?)和(.+?)如何选择？$/,
      render: (subject, detail) =>
        `How should ${translateNarrativeFragment(subject)} and ${translateNarrativeFragment(detail || "")} be selected?`,
    },
    {
      pattern: /^(.+?)支持(.+?)吗？$/,
      render: (subject, detail) =>
        `Does ${translateNarrativeFragment(subject)} support ${translateNarrativeFragment(detail || "")} ?`.replace(" ?", "?"),
    },
    {
      pattern: /^(.+?)可以用于(.+?)吗？$/,
      render: (subject, detail) =>
        `Can ${translateNarrativeFragment(subject)} be used for ${translateNarrativeFragment(detail || "")} ?`.replace(" ?", "?"),
    },
  ];

  for (const { pattern, render } of questionPatterns) {
    const match = value.match(pattern);

    if (match) {
      return render(match[1], match[2]);
    }
  }

  if (/^选型时需要提供哪些信息？$/.test(value)) {
    return "What information should be provided for selection?";
  }

  if (/^(.+?)适合哪些应用？$/.test(value)) {
    const subject = value.replace(/适合哪些应用？$/, "");
    return `Which applications is ${translateNarrativeFragment(subject)} suited for?`;
  }

  if (/^(.+?)适合哪些应用场景？$/.test(value)) {
    const subject = value.replace(/适合哪些应用场景？$/, "");
    return `Which applications is ${translateNarrativeFragment(subject)} suited for?`;
  }

  if (/^(.+?)对液路有什么影响？$/.test(value)) {
    const subject = value.replace(/对液路有什么影响？$/, "");
    return `How does ${translateNarrativeFragment(subject)} affect the fluidic path?`;
  }

  if (/^(.+?)是否支持/.test(value) && value.endsWith("？")) {
    const subject = value.replace(/是否支持.*$/, "");
    const detail = value.replace(/^.+?是否支持/, "").replace(/？$/, "");
    return `Does ${translateNarrativeFragment(subject)} support ${translateNarrativeFragment(detail)}?`;
  }

  if (value.includes("选择") && value.endsWith("？")) {
    return `${translateNarrativeFragment(value.replace(/？$/, ""))}?`;
  }

  const sentenceTranslation = translateNarrativeSentences(value);

  if (
    sentenceTranslation &&
    !HAN_PATTERN.test(sentenceTranslation)
  ) {
    return sentenceTranslation;
  }

  return "";
}

function translateNarrativeText(
  value: string,
  context: LocalizationContext
) {
  const raw = String(value || "").trim();

  if (!raw) {
    return "";
  }

  const actualTranslation =
    translateActualChineseNarrative(raw, context);

  if (actualTranslation) {
    return normalizeSpacing(actualTranslation);
  }

  const exact = NARRATIVE_EXACT_TRANSLATIONS[raw];

  if (exact) {
    return exact;
  }

  const isFittingSource =
    /(?:\u63a5\u5934|\u5012\u523a|\u8f6f\u7ba1|\u7ba1\u8def|\u652f\u8def|\u5835\u5934|\u786c\u7ba1|\u5feb\u63d2|\u9c81\u5c14|\u878d\u63a5|\u5185\u87ba\u7eb9|\u6db2\u8def|\u7a7f\u677f|\u5c01\u95ed|\u8f6c\u63a5|\u56de\u6d41)/.test(raw) ||
    context.productName.toLowerCase().includes("fitting");
  const fittingFragment = normalizeSpacing(
    translateFittingFragment(raw)
  );

  /*
   * Short fitting applications must be resolved before the generic
   * narrative sentence translator. Full product descriptions are kept on
   * the structured template path below.
   */
  if (
    isFittingSource &&
    !raw.includes("\u662f\u4e00\u6b3e") &&
    fittingFragment !== raw &&
    !HAN_PATTERN.test(fittingFragment)
  ) {
    return fittingFragment;
  }

  const patterned = translateNarrativePattern(raw, context);

  if (patterned) {
    return patterned;
  }

  const sentenceTranslated = translateNarrativeSentences(raw);
  let translated =
    sentenceTranslated && !HAN_PATTERN.test(sentenceTranslated)
      ? sentenceTranslated
      : translateNarrativeFragment(raw);

  translated = translated
    .replace(/(\d+)\s*℃/g, "$1 °C")
    .replace(/(\d+)\s*μL/g, "$1 μL")
    .replace(/(\d+)\s*mm/g, "$1 mm")
    .replace(/(\d+)\s*MPa/g, "$1 MPa")
    .replace(/(\d+)\s*kPa/g, "$1 kPa")
    .replace(/(\d+)\s*mL/g, "$1 mL")
    .replace(/(\d+)\s*L/g, "$1 L")
    .replace(/～/g, "–")
    .replace(/\n{3,}/g, "\n\n");

  translated = normalizeSpacing(translated);

  if (!HAN_PATTERN.test(translated)) {
    return translated;
  }

  /*
   * Remaining Chinese is removed only after the source phrases above have
   * been applied. The audit after build reports any such remainder so the
   * phrase dictionary can be extended without inventing product content.
   */
  const remainder = normalizeSpacing(
    translated.replace(HAN_GLOBAL_PATTERN, " ")
  );

  return remainder || `${context.productName} technical details`;
}

function isNarrativeKey(key: string) {
  return /description|summary|intro|overview|application|advantage|feature|question|answer|content|seo|bottomcta|custominquiry|headline|subtitle|title|name|model|faq|modelrow|modelconfiguration|imagealt|alt|aria/i.test(
    key
  );
}

function shouldPreserveLocalizedResourceValue(key: string) {
  return /(?:href|url|path|slug|link|image|drawing|pdf|asset|thumbnail|filename|file)$/i.test(
    key
  );
}

function localizeNarrativeValue(
  value: unknown,
  context: LocalizationContext
): unknown {
  if (typeof value === "string") {
    /* WHOLE_NARRATIVE_SOURCE_LOOKUP_START
     * Check the complete source sentence first. Product descriptions and
     * source-aligned CTA copy may contain multiple paragraphs.
     */
    const wholeSourceTranslation = translateActualChineseNarrative(
      value.trim(),
      context
    );

    if (wholeSourceTranslation) {
      return normalizeSpacing(wholeSourceTranslation);
    }

    const paragraphs = value.split(/\n{2,}/);

    if (paragraphs.length > 1) {
      return paragraphs
        .map((paragraph) =>
          translateNarrativeText(paragraph, context)
        )
        .join("\n\n");
    }

    return translateNarrativeText(value, context);
  }

  if (Array.isArray(value)) {
    const translated = value.map((item) =>
      localizeNarrativeValue(item, context)
    );

    if (translated.every((item) => typeof item === "string")) {
      /*
       * Preserve the source array one-to-one. FAQ questions and answers,
       * application entries, and advantages must not be collapsed merely
       * because two English strings happen to match after translation.
       */
      return translated.map((item) =>
        item.replace(/[.。]\s*$/, "")
      );
    }

    return translated;
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value as DetailRecord).map(([key, childValue]) => [
      key,
      key === "seoDirection"
        ? typeof childValue === "string"
          ? translateNarrativeText(childValue, context)
          : childValue
        : shouldPreserveLocalizedResourceValue(key)
        ? childValue
        : localizeNarrativeValue(childValue, context),
    ])
  );
}

function fallbackText(key: string, context: LocalizationContext) {
  const normalizedKey = key.toLowerCase();

  if (
    normalizedKey.includes("question") ||
    normalizedKey === "faqtitle"
  ) {
    return `What should be considered when selecting ${context.productName}?`;
  }

  if (
    normalizedKey.includes("answer") ||
    normalizedKey.includes("description") ||
    normalizedKey === "content" ||
    normalizedKey === "desc"
  ) {
    return `Confirm the fluid, operating range, wetted materials, connections, and installation requirements with the FOREACH engineering team.`;
  }

  if (
    normalizedKey.includes("application") ||
    normalizedKey.includes("advantage") ||
    normalizedKey.includes("feature")
  ) {
    return "Precision fluid handling and automated instrument integration";
  }

  if (normalizedKey.includes("label") || normalizedKey.includes("name")) {
    return context.productName;
  }

  if (
    normalizedKey.includes("title") ||
    normalizedKey === "model" ||
    normalizedKey === "h1"
  ) {
    return `${context.model} ${context.productName}`.trim();
  }

  if (normalizedKey.includes("value")) {
    return "Available by configuration";
  }

  return context.productName;
}

function localizeString(
  value: string,
  key: string,
  context: LocalizationContext
) {
  if (/href|url|link/i.test(key)) {
    return localizeHref(value);
  }

  if (isNarrativeKey(key)) {
    return translateNarrativeText(value, context);
  }

  if (!HAN_PATTERN.test(value)) {
    return value;
  }

  const translated = translateKnownPhrases(value);

  if (!HAN_PATTERN.test(translated)) {
    return translated;
  }

  const technicalRemainder = normalizeSpacing(
    translated.replace(HAN_GLOBAL_PATTERN, " ")
  );

  if (
    /value|model|code|slug|spec/i.test(key) &&
    /[a-z0-9μµ°%/×<>≤≥.-]/i.test(technicalRemainder)
  ) {
    return technicalRemainder;
  }

  return fallbackText(key, context);
}

function localizeValue(
  value: unknown,
  key: string,
  context: LocalizationContext
): unknown {
  if (typeof value === "string") {
    return localizeString(value, key, context);
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeValue(item, key, context));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value as DetailRecord).map(([childKey, childValue]) => [
      childKey,
      localizeValue(childValue, childKey, context),
    ])
  );
}

/* PLUNGER_PUMP_FAQ_EXACT_TRANSLATIONS_START
 * EA 常规柱塞泵 FAQ 使用完整精确翻译。
 *
 * 这里不修改中文源数据，也不依赖通用词组拆分翻译，
 * 从而保证英文 FAQ 的数量、顺序和内容与中文一一对应。
 */
const PLUNGER_PUMP_FAQ_EXACT_TRANSLATIONS: Record<
  string,
  {
    question: string;
    answer: string;
  }
> = {
  "页面型号中的 PMMA / PEEK 是否代表唯一可选配置？": {
    question:
      "Does “PMMA / PEEK” in the model number indicate the only available configuration?",
    answer:
      "No. The model shown on the page represents a commonly used base configuration so customers can quickly identify the nominal capacity, fluidic interface, and primary structure. For an actual project, the pump-head material, plunger material, interface type, motor configuration, optical-coupler feedback, valve assembly, and control method can be confirmed according to fluid compatibility, available space, and system-integration requirements.",
  },

  "EA 常规柱塞泵适合什么设备平台？": {
    question:
      "What types of equipment are EA standard plunger pumps suitable for?",
    answer:
      "EA standard plunger pumps are designed as platform-based precision liquid-handling modules for IVD systems, biochemical analyzers, immunoassay analyzers, life-science instruments, laboratory-automation equipment, and analytical instruments. They are particularly suitable for automated platforms that require stable volumetric delivery, long-term operating reliability, and flexible configuration options.",
  },

  "EA 系列支持哪些泵头材质？": {
    question:
      "Which pump-head materials are available for the EA series?",
    answer:
      "Depending on the nominal volume, structural design, and project requirements, EA standard plunger pumps can be evaluated with pump heads made from engineering materials such as PCTG, PMMA, PPS, PVDF, PP, PTFE, PEEK, POM, PSU, PEI, and PC. The final material combination should be confirmed based on fluid compatibility, mechanical strength, manufacturing process, and production volume.",
  },

  "EA 系列是否可以进行泵阀一体或控制集成？": {
    question:
      "Can the EA series be integrated with valves or control systems?",
    answer:
      "Yes. The EA series can be integrated with solenoid valves, controllers, optical-coupler feedback, valve assemblies, and other fluidic components to form a precision liquid-handling unit for automated analytical instruments. The specific integration method should be confirmed according to the complete fluidic-system design.",
  },

  "为什么产品卡片只显示部分配置？": {
    question:
      "Why do the product cards show only selected configurations?",
    answer:
      "The product cards display commonly used base configurations so customers can quickly identify the model, fluidic interface, repeatability, and full-stroke resolution. In an actual project, the pump-head material, plunger material, interface type, motor configuration, optical-coupler feedback, valve assembly, and control method can all be confirmed according to application requirements.",
  },

  "如何确认最终型号？": {
    question:
      "How is the final model determined?",
    answer:
      "The final model is determined by the required liquid volume, pump-head material, plunger material, interface type, motor configuration, optical-coupler feedback, valve assembly, control method, and overall system-integration plan. The models shown on the page are provided for quick identification; the complete configuration should be confirmed against the specific project requirements.",
  },
};

function applyExactPlungerPumpFaqTranslations(
  sourceValue: unknown,
  localizedValue: unknown
): unknown {
  if (
    !Array.isArray(sourceValue) ||
    !Array.isArray(localizedValue)
  ) {
    return localizedValue;
  }

  return localizedValue.map(
    (localizedItem, index) => {
      const sourceItem = sourceValue[index];

      if (
        !sourceItem ||
        typeof sourceItem !== "object" ||
        Array.isArray(sourceItem)
      ) {
        return localizedItem;
      }

      const sourceQuestion = String(
        (sourceItem as DetailRecord).question || ""
      ).trim();

      const exactTranslation =
        PLUNGER_PUMP_FAQ_EXACT_TRANSLATIONS[
          sourceQuestion
        ];

      if (!exactTranslation) {
        return localizedItem;
      }

      const localizedRecord =
        localizedItem &&
        typeof localizedItem === "object" &&
        !Array.isArray(localizedItem)
          ? (localizedItem as DetailRecord)
          : {};

      return {
        ...localizedRecord,
        question: exactTranslation.question,
        answer: exactTranslation.answer,
      };
    }
  );
}
/* PLUNGER_PUMP_FAQ_EXACT_TRANSLATIONS_END */
export function localizeProductDetailData<T extends DetailRecord>(data: T): T {
  const productName = inferProductName(data);
  const model = inferModel(data, productName);
  const context = { model, productName };
  const localized = localizeValue(data, "root", context) as DetailRecord;



  /* ENGLISH_DETAIL_IMAGE_FIELDS_KEEP_SOURCE
   * 英文详情页只翻译文字。
   * 图片、缩略图和图片替代文本直接继承中文原始数据，
   * 保证中英文图库结构、数量和样式完全一致。
   */
  for (const key of [
    "mainImage",
    "additionalImages",
    "image",
    "imagePath",
    "imageUrl",
    "heroImage",
    "imageCard",
    "coverImage",
    "images",
    "galleryImages",
    "thumbnails",
    "imageAlt",
    "mainImageAlt",
    "imageAltEn",
  ]) {
    if (data[key] !== undefined) {
      localized[key] = data[key];
    }
  }
  /* ENGLISH_DETAIL_IMAGE_FIELDS_KEEP_SOURCE_END */
  /*
   * Specs are translated from the original Chinese rows after the generic
   * object pass. This prevents unknown labels and values from falling back
   * to the product name or losing their technical meaning.
   */
  for (const key of [
    "specs",
    "specifications",
    "specGroups",
    "optionalConfigurations",
  ]) {
    if (Array.isArray(data[key])) {
      localized[key] = localizeSpecificationEntry(
        data[key],
        context
      );
    }
  }

  if (Array.isArray(data.specificationGroups)) {
    localized.specificationGroups = localizeSpecificationEntry(
      data.specificationGroups,
      context
    );
  }

  /*
   * These fields are copied directly from the Chinese product record.
   * Translate them as narrative data instead of sending them through the
   * generic fallback, so each product keeps its own description, use cases,
   * FAQ answers, model rows, and inquiry wording.
   */
  for (const key of [
    "description",
    "advantages",
    "commonApplications",
    "faqs",
    "faq",
    "faqItems",
    "modelRows",
    "modelConfigurations",
    "optionalModels",
    "bottomCta",
    "customInquiryCta",
    "seo",
  ]) {
    if (data[key] !== undefined) {
      localized[key] = localizeNarrativeValue(
        data[key],
        context
      );
    }
  }

  if (Array.isArray(data.faq) && !Array.isArray(data.faqs)) {
    localized.faqs = localized.faq;
  }

  /* PLUNGER_PUMP_FAQ_EXACT_OVERRIDE_START
   * 通用英文翻译完成后，再根据中文原问题执行精确覆盖。
   * 只命中 EA 柱塞泵既有的六组 FAQ。
   */
  if (
    Array.isArray(data.faqs) &&
    Array.isArray(localized.faqs)
  ) {
    localized.faqs =
      applyExactPlungerPumpFaqTranslations(
        data.faqs,
        localized.faqs
      );
  }
  /* PLUNGER_PUMP_FAQ_EXACT_OVERRIDE_END */
  const displayTitle = `${model} ${productName}`.trim();

  function localizeProductTitle(value: string) {
    const raw = value.trim().replace(/[.。]+$/, "");
    const exact = NARRATIVE_EXACT_TRANSLATIONS[raw];

    if (exact) {
      return exact;
    }

    let match = raw.match(
      /^(DPL\d+H?|DPGL\d+)\s+(有刷|无刷)(液体隔膜泵|高压液体隔膜泵|气液混合隔膜泵)$/
    );

    if (match) {
      const motor =
        match[2] === "有刷"
          ? "Brushed"
          : "Brushless";
      const type =
        match[3] === "液体隔膜泵"
          ? "Liquid Diaphragm Pump"
          : match[3] === "高压液体隔膜泵"
            ? "High-Pressure Liquid Diaphragm Pump"
            : "Gas-Liquid Diaphragm Pump";

      return `${match[1]} ${motor} ${type}`;
    }

    match = raw.match(
      /^(DPL\d+H?|DPGL\d+)\s+(有刷电机|无刷电机)\s+(.+)$/
    );

    if (match) {
      const motor =
        match[2] === "有刷电机"
          ? "Brushed-Motor"
          : "Brushless-Motor";
      const type =
        match[3] === "液体隔膜泵"
          ? "Liquid Diaphragm Pump"
          : match[3] === "高压液体隔膜泵"
            ? "High-Pressure Liquid Diaphragm Pump"
            : match[3] === "气液混合隔膜泵"
              ? "Gas-Liquid Diaphragm Pump"
              : translateNarrativeFragment(match[3]);

      return `${match[1]} ${motor} ${type}`;
    }

    match = raw.match(
      /^(DPL\d+H?|DPGL\d+)\s+(液体隔膜泵|高压液体隔膜泵|气液混合隔膜泵)$/
    );

    if (match) {
      const type =
        match[2] === "液体隔膜泵"
          ? "Liquid Diaphragm Pump"
          : match[2] === "高压液体隔膜泵"
            ? "High-Pressure Liquid Diaphragm Pump"
            : "Gas-Liquid Diaphragm Pump";

      return `${match[1]} ${type}`;
    }

    return translateNarrativeText(raw, context)
      .replace(/[.。]+$/, "")
      .trim();
  }

  localized.__locale = "en";
  localized.model = localizeProductTitle(
    String(data.model || data.title || displayTitle),
  );
  localized.name = localizeProductTitle(
    String(data.name || data.title || displayTitle),
  );
  localized.title = localizeProductTitle(
    String(data.title || data.name || displayTitle),
  );

  if (data.seo && typeof data.seo === "object") {
    const sourceSeo = data.seo as DetailRecord;
    const localizedSeo =
      (localized.seo as DetailRecord | undefined) || {};

    localized.seo = {
      ...localizedSeo,
      ...(sourceSeo.slug !== undefined
        ? { slug: sourceSeo.slug }
        : {}),
      ...(sourceSeo.path !== undefined
        ? { path: sourceSeo.path }
        : {}),
      ...(typeof sourceSeo.title === "string"
        ? {
            title: translateNarrativeText(
              sourceSeo.title,
              context
            ),
          }
        : {}),
      ...(typeof sourceSeo.description === "string"
        ? {
            description: translateNarrativeText(
              sourceSeo.description,
              context
            ),
          }
        : {}),
      ...(typeof sourceSeo.pageTitle === "string"
        ? {
            pageTitle: localizeProductTitle(
              sourceSeo.pageTitle
            ),
          }
        : {}),
    };
  }

  localized.description = localizeNarrativeValue(
    data.description || "",
    context
  );
  const valvelessSeries =
    /^drpl(?:-|$)/i.test(String(data.slug || data.productCode || data.model || ""))
      ? "DRPL"
      : "RPL";
  localized.productTypeName =
    productName === "Valveless Piston Pump"
      ? valvelessSeries === "DRPL"
        ? "DRPL Dual-Head Valveless Pump"
        : "RPL Valveless Pump"
      : productName;
  localized.categoryLabel =
    productName.includes("Fitting") ||
    productName === "Inline Filter" ||
    productName === "Check Valve"
      ? "Fittings"
      : productName.includes("Pump")
        ? "Pumps"
        : productName.includes("Valve")
          ? "Valves"
          : productName.includes("Probe") || productName === "Mixing Paddle"
            ? "Probes and Needles"
            : productName === "Tubing"
              ? "Tubing"
              : "Control Modules";

  const sourceBottomCtaTitle =
    data.bottomCtaTitle ||
    data.customInquiryTitle ||
    data.bottomCta?.title ||
    data.bottomCustomCta?.title ||
    data.customInquiryCta?.title;
  const sourceBottomCtaDescription =
    data.bottomCtaDescription ||
    data.bottomCtaDesc ||
    data.customInquiryDescription ||
    data.bottomCta?.description ||
    data.bottomCta?.desc ||
    data.bottomCustomCta?.description ||
    data.bottomCustomCta?.desc ||
    data.customInquiryCta?.description ||
    data.customInquiryCta?.desc;
  const sourceBottomCtaButton =
    data.bottomCtaButtonText ||
    data.bottomCtaButton ||
    data.customInquiryButtonText ||
    data.bottomCta?.buttonText ||
    data.bottomCta?.button ||
    data.bottomCustomCta?.buttonText ||
    data.bottomCustomCta?.button ||
    data.customInquiryCta?.buttonText ||
    data.customInquiryCta?.button;

  localized.bottomCtaTitle = sourceBottomCtaTitle
    ? translateNarrativeText(
        String(sourceBottomCtaTitle),
        context
      )
    : `Need help confirming the right ${productName.toLowerCase()} configuration?`;
  localized.bottomCtaDescription = sourceBottomCtaDescription
    ? translateNarrativeText(
        String(sourceBottomCtaDescription),
        context
      )
    : "Share the fluid, operating range, wetted materials, connections, control method, and installation requirements. The FOREACH engineering team can help confirm a suitable configuration.";
  localized.bottomCtaDesc = localized.bottomCtaDescription;
  localized.bottomCtaButtonText = sourceBottomCtaButton
    ? translateNarrativeText(
        String(sourceBottomCtaButton),
        context
      )
    : "Contact an Engineer";
  localized.bottomCtaButton = localized.bottomCtaButtonText;
  localized.bottomCtaHref = localizeHref(
    String(
      data.bottomCtaHref ||
        data.customInquiryHref ||
        data.bottomCta?.href ||
        data.customInquiryCta?.href ||
        "/contact"
    )
  );
  localized.customInquiryTitle = localized.bottomCtaTitle;
  localized.customInquiryDescription = localized.bottomCtaDescription;
  localized.customInquiryButtonText = localized.bottomCtaButtonText;
  localized.customInquiryHref = "/en/contact";


      /* FOREACH_EXPLICIT_EN_FIELDS_START */
      /*
       * 优先使用产品数据中人工维护的英文字段。
       *
       * 这段代码位于通用翻译逻辑之后，
       * 因此可以覆盖机器拼接产生的残缺英文，
       * 同时不影响没有独立英文内容的其他产品。
       */
      {
        const explicitData =
          data as Record<string, any>;

        const explicitLocalized =
          localized as Record<string, any>;

        const explicitTitle =
          explicitData.h1TitleEn ||
          explicitData.pageTitleEn ||
          explicitData.titleEn ||
          explicitData.productNameEn ||
          explicitData.modelNameEn;

        if (explicitTitle) {
          for (const key of [
            "title",
            "h1Title",
            "pageTitle",
            "displayName",
            "name",
            "productName",
            "modelName",
            "breadcrumbTitle",
            "breadcrumbLabel",
            "breadcrumbCurrent",
          ]) {
            explicitLocalized[key] =
              String(explicitTitle);
          }
        }

        if (explicitData.modelEn) {
          explicitLocalized.model =
            String(explicitData.modelEn);
        }

        if (explicitData.imageAltEn) {
          explicitLocalized.imageAlt =
            String(explicitData.imageAltEn);
        }

        if (explicitData.descriptionEn) {
          explicitLocalized.description =
            String(explicitData.descriptionEn);
        }

        if (
          Array.isArray(
            explicitData.commonApplicationsEn
          )
        ) {
          explicitLocalized.commonApplications =
            explicitData.commonApplicationsEn;
        }

        const explicitSpecs =
          explicitData.specificationsEn ||
          explicitData.specsEn ||
          explicitData.technicalSpecificationsEn;

        if (Array.isArray(explicitSpecs)) {
          explicitLocalized.specs =
            explicitSpecs;

          explicitLocalized.specifications =
            explicitSpecs;

          explicitLocalized.technicalSpecifications =
            explicitSpecs;
        }

        const explicitFaqs =
          explicitData.faqsEn ||
          explicitData.faqItemsEn ||
          explicitData.faqEn;

        if (Array.isArray(explicitFaqs)) {
          const normalizedFaqs =
            explicitFaqs
              .map((item: any) => ({
                question: String(
                  item?.question ||
                  item?.q ||
                  ""
                ).trim(),

                answer: String(
                  item?.answer ||
                  item?.a ||
                  ""
                ).trim(),
              }))
              .filter(
                (item: any) =>
                  item.question &&
                  item.answer
              );

          explicitLocalized.faqs =
            normalizedFaqs;

          explicitLocalized.faq =
            normalizedFaqs;

          explicitLocalized.faqItems =
            normalizedFaqs;
        }

        if (
          explicitData.bottomCtaTitleEn
        ) {
          explicitLocalized.bottomCtaTitle =
            explicitData.bottomCtaTitleEn;

          explicitLocalized.customInquiryTitle =
            explicitData.bottomCtaTitleEn;
        }

        if (
          explicitData.bottomCtaDescriptionEn
        ) {
          explicitLocalized.bottomCtaDescription =
            explicitData.bottomCtaDescriptionEn;

          explicitLocalized.bottomCtaDesc =
            explicitData.bottomCtaDescriptionEn;

          explicitLocalized.customInquiryDescription =
            explicitData.bottomCtaDescriptionEn;
        }

        if (
          explicitData.bottomCtaButtonTextEn
        ) {
          explicitLocalized.bottomCtaButtonText =
            explicitData.bottomCtaButtonTextEn;

          explicitLocalized.bottomCtaButton =
            explicitData.bottomCtaButtonTextEn;

          explicitLocalized.customInquiryButtonText =
            explicitData.bottomCtaButtonTextEn;
        }

        if (
          explicitData.seoEn &&
          typeof explicitData.seoEn === "object"
        ) {
          explicitLocalized.seo = {
            ...(explicitLocalized.seo || {}),
            ...explicitData.seoEn,
          };
        }

        if (explicitData.seoTitleEn) {
          explicitLocalized.seoTitle =
            explicitData.seoTitleEn;
        }

        if (
          explicitData.seoDescriptionEn
        ) {
          explicitLocalized.seoDescription =
            explicitData.seoDescriptionEn;
        }
      }
      /* FOREACH_EXPLICIT_EN_FIELDS_END */

      return localized as T;
}
