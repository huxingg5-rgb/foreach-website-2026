// Chinese authored copy. Shared card headings are also the detail H1 source.
export const instrumentCardsZh: Record<string, { model: string; type: string; parent: string; heading: string }> = {
  "smtp2-1000ul": {
    "model": "SMTP2-1000 μL",
    "type": "移液泵",
    "parent": "/products/pumps/pipetting-pumps/",
    "heading": "1000 μL 可编程气体置换式移液泵，用于样本转移、试剂分配与自动加样，集成液面、堵塞和吸头检测"
  },
  "smtp4-100ul": {
    "model": "SMTP4-100 μL",
    "type": "移液泵",
    "parent": "/products/pumps/pipetting-pumps/",
    "heading": "100 μL 气体置换式移液泵，用于小体积样本转移和反应体系加液，支持自动脱吸头及吸头适配"
  },
  "smtp4-500ul": {
    "model": "SMTP4-500 μL",
    "type": "移液泵",
    "parent": "/products/pumps/pipetting-pumps/",
    "heading": "500 μL 气体置换式移液泵，用于样本分装、稀释液添加与试剂转移，支持自动脱吸头及吸头适配"
  },
  "hmd3-30mm-solenoid-syringe-pump": {
    "model": "HMD3",
    "type": "注射泵",
    "parent": "/products/pumps/syringe-pumps/",
    "heading": "30 mm 行程单通道电磁阀注射泵，用于试剂定量加液与样本稀释，可配置 50 μL–5 mL 玻璃注射器"
  },
  "hmd6-60mm-solenoid-syringe-pump": {
    "model": "HMD6",
    "type": "注射泵",
    "parent": "/products/pumps/syringe-pumps/",
    "heading": "60 mm 行程电磁阀注射泵，1–8 通道可选，用于多针并行加液与缓冲液分配"
  },
  "hld3-30mm-rotary-valve-syringe-pump": {
    "model": "HLD3",
    "type": "注射泵",
    "parent": "/products/pumps/syringe-pumps/",
    "heading": "30 mm 行程旋转阀注射泵，用于多试剂选路与定量分配，可配置 50 μL–5 mL 玻璃注射器"
  },
  "hld6-60mm-rotary-valve-syringe-pump": {
    "model": "HLD6 / HLD6M",
    "type": "注射泵",
    "parent": "/products/pumps/syringe-pumps/",
    "heading": "60 mm 行程旋转阀注射泵，用于试剂、稀释液与清洗液的选路和定量输送，可配置 25 μL–25 mL 玻璃注射器"
  },
  "high-pressure-valves": {
    "model": "HP-26SSU3204",
    "type": "高压阀",
    "parent": "/products/valves/",
    "heading": "25 MPa 二位六通带排气高压旋转阀，用于 HPLC 自动进样与定量环切换，采用 10-32 UNF 接口"
  },
  "solenoid-valves": {
    "model": "6010 系列",
    "type": "电磁阀",
    "parent": "/products/valves/",
    "heading": "微型摆臂隔膜电磁阀，用于试剂、清洗液和稀释液通断控制，提供二通、三通及多种安装配置"
  }
};
export const instrumentIntrosZh: Record<string, {title:string;paragraphs:string[]}> = {
  "pipette-pump": {
    "title": "气体置换式移液泵",
    "paragraphs": [
      "Foreach 移液泵通过空气柱传递柱塞运动，配合一次性吸头完成吸液与排液，用于自动化分析仪器、样本前处理设备和实验室工作站中的样本转移、试剂加样与分装。产品包括集成控制与检测功能的 SMTP2，以及供设备配套驱动与控制的 SMTP4。",
      "在设备方案中，这类产品也称为气体置换式移液模块（air displacement pipetting module）或自动移液单元。样本转移强调从源容器到目标容器的体积准确性；分装（aliquoting）强调多个容器的分配一致性；自动加样还需配合运动轴、吸头装卸和异常处理。",
      "SMTP2-1000 μL 集成液面、尖端堵塞及吸头有无检测，并支持 RS232、RS485、CAN 通讯；SMTP4 提供 100 μL 与 500 μL 配置，支持自动脱吸头。应按是否需要集成检测、实际工作液量、吸头形式和设备控制架构选择，不能将电机步进分辨率作为最小可靠移液量。",
      "移液性能由泵、吸头、液体与动作参数共同决定。选型时请提供最小与最大工作液量、液体黏度和挥发性、容器及吸头规格，并说明吸液深度、移液节拍和清洁要求，以便确认吸排液速度与吸头适配。"
    ]
  },
  "syringe-pump": {
    "title": "仪器用注射泵",
    "paragraphs": [
      "Foreach 注射泵通过驱动玻璃注射器柱塞完成吸液与排液，配合电磁阀或旋转阀切换储液、加液和清洗路径，用于分析仪器、实验室配液设备及样本前处理模块。产品包括 30 mm 与 60 mm 行程，分别面向紧凑加液、多通道并行处理或多端口试剂分配。",
      "在不同液路任务中，仪器用注射泵也可称为试剂分配泵（reagent dispensing pump）、稀释加液泵或定量注液模块。这里的 syringe pump 指设备内的液体处理组件；单次分配量取决于注射器容量与实际运行行程，持续流量还受吸液补充和切阀时序影响。",
      "HMD 电磁阀系列适合明确的吸排液路径，HMD6 提供 1–8 通道可选配置；HLD 旋转阀系列用一个注射器配合多端口阀选择不同液源或目标路径。多通道代表多个液体计量通道，多端口代表可选择的连接路径，二者不能等同。",
      "请先确认工作液量、允许加液时间、液体与清洗介质，再选择注射器容量、通道数、阀结构和通讯方式。HMD6 多通道配置不支持 10 mL、25 mL 注射器；管路预充、残留体积及完整液路耐压应在实际配置下核对。"
    ]
  }
};
export const instrumentSeriesIntrosZh: Record<string, {title:string;paragraphs:string[]}> = {
  "SMTP2 可编程气体置换式移液泵": {
    "title": "SMTP2 可编程气体置换式移液泵",
    "paragraphs": [
      "Foreach SMTP2 是集成驱动、控制与移液检测的气体置换式移液泵，用于样本管取液、试剂加入和样本分装工位。SMTP2-1000 μL 配合一次性吸头，通过空气柱完成吸液与排液，适合需要将移液过程状态传回设备控制系统的自动化模块。",
      "SMTP2-1000 μL 集成驱动控制，提供压力型 pLLD、电容型 cLLD 及混合型 hLLD 液面检测，并支持尖端堵塞与吸头有无检测。用于需要移液状态反馈的样本转移、试剂分配和自动加样模块，设备端仍需配合运动轴、容器定位与异常处理。",
      "移液性能由泵、吸头、液体与动作参数共同决定。选型时请提供最小与最大工作液量、液体黏度和挥发性、容器及吸头规格，并说明吸液深度、移液节拍和清洁要求，以便确认吸排液速度与吸头适配。"
    ]
  },
  "SMTP4 气体置换式移液泵": {
    "title": "SMTP4 气体置换式移液泵",
    "paragraphs": [
      "SMTP4 提供 100 μL 与 500 μL 气体置换式移液配置，用于设备中的样本转移、分装及试剂加入，配合一次性吸头并支持自动脱吸头。适合由设备方统一配置驱动、运动轴与控制时序的液体处理模块。",
      "100 μL 与 500 μL 配置分别提供不同的标称容量，应按最小、常用和最大工作液量比较实际移液表现。SMTP4 支持自动脱吸头，驱动、运动轴与流程控制由设备方配套；液面和异常吸液监测按项目配置检测方案。",
      "移液性能由泵、吸头、液体与动作参数共同决定。选型时请提供最小与最大工作液量、液体黏度和挥发性、容器及吸头规格，并说明吸液深度、移液节拍和清洁要求，以便确认吸排液速度与吸头适配。"
    ]
  },
  "HMD 电磁阀系列注射泵": {
    "title": "HMD 电磁阀注射泵",
    "paragraphs": [
      "HMD 系列将玻璃注射器计量与电磁阀选路结合，用于试剂定量加液、稀释液添加及多针并行液体处理。HMD3 为 30 mm 行程单通道配置，HMD6 为 60 mm 行程，提供 1–8 通道可选配置。",
      "设备先开启对应吸液路径，再驱动注射器取液，切换到排液路径后按行程输出。阀的通口形式决定液路连接方式，注射器容量与驱动行程决定理论排量；选型时需把阀状态、运动指令和缺液处理纳入控制时序。",
      "请按注射器容量、通道数量及电磁阀连接关系确认具体配置，再核对试剂、清洗介质、加液节拍与整条液路的背压。HMD6 多通道配置不支持 10 mL、25 mL 注射器；每路均需安排预充与实际输出量检查。"
    ]
  },
  "HLD 旋转阀系列注射泵": {
    "title": "HLD 旋转阀注射泵",
    "paragraphs": [
      "HLD 系列采用玻璃注射器与多端口旋转阀，用于多瓶试剂、稀释液和清洗液的顺序选择与定量输送。HLD3 为 30 mm 行程，HLD6 / HLD6M 为 60 mm 行程，可按注射器容量、阀连接关系和设备空间选择配置。",
      "在同一分析设备中，这一组件可承担试剂分配、稀释加液和清洗液置换任务。不同端口共享的注射器与流道需要安排置换清洗；多端口用于顺序选路，不代表所有端口同时独立计量。",
      "选型先明确需要连接的液源与输出路径，再确认旋转阀端口、注射器容量及工作行程。共享流道的预充量、试剂切换时的清洗置换量和允许残留，应计入试剂消耗与节拍；整套液路耐压按注射器、阀及接管的实际配置核对。"
    ]
  }
};
