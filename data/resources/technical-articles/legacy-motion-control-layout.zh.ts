export const motionReadingLinks: Record<string, { after: string; target: string; label: string; prefix: string; suffix: string }[]> = {
  "piston-pump-acceleration-deceleration-curves": [
    {
      "after": "失步与振动：先区分原因",
      "target": "stepper-motor-calculation-selection",
      "label": "精密柱塞泵步进电机计算与选型",
      "prefix": "计算脉冲频率、负载转矩和传动比时，可结合《",
      "suffix": "》核对工作点。"
    },
    {
      "after": "把电机速度换算成柱塞速度与理论流量",
      "target": "precision-piston-pump-backlash-compensation",
      "label": "精密柱塞泵应用指南：间隙补偿",
      "prefix": "吸排液换向时还需单独处理空行程，参见《",
      "suffix": "》。"
    },
    {
      "after": "柱塞泵程序调试顺序",
      "target": "modbus-protocol-fluid-control",
      "label": "Modbus协议：RTU、ASCII与TCP通信基础",
      "prefix": "通过通信接口设置运动参数时，可继续阅读《",
      "suffix": "》，区分指令应答和实际运动完成。"
    }
  ],
  "precision-piston-pump-backlash-compensation": [
    {
      "after": "把测得的空行程换成补偿指令",
      "target": "stepper-motor-calculation-selection",
      "label": "精密柱塞泵步进电机计算与选型",
      "prefix": "整步数、细分数和输入脉冲的换算方法见《",
      "suffix": "》。"
    },
    {
      "after": "单次吸入X、单次排出X",
      "target": "piston-pump-acceleration-deceleration-curves",
      "label": "柱塞泵驱动之加减速曲线",
      "prefix": "补偿完成后的有效吸排液行程也需要平稳启停，参见《",
      "suffix": "》。"
    },
    {
      "after": "一次吸入、多次排出：X = Y + Z",
      "target": "modbus-protocol-fluid-control",
      "label": "Modbus协议：RTU、ASCII与TCP通信基础",
      "prefix": "若由上位机下发时序，还应结合《",
      "suffix": "》核对计数单位、状态查询和超时处理。"
    }
  ],
  "stepper-motor-calculation-selection": [
    {
      "after": "计算示例：400 mm水平往复平台",
      "target": "piston-pump-acceleration-deceleration-curves",
      "label": "柱塞泵驱动之加减速曲线",
      "prefix": "如何选择加速与减速段的曲线形态，参见《",
      "suffix": "》。"
    },
    {
      "after": "传动比、细分与速度核算",
      "target": "precision-piston-pump-backlash-compensation",
      "label": "精密柱塞泵应用指南：间隙补偿",
      "prefix": "指令分辨率之外，换向空行程的测量与处理见《",
      "suffix": "》。"
    },
    {
      "after": "动态转矩核算与最终验收",
      "target": "modbus-protocol-fluid-control",
      "label": "Modbus协议：RTU、ASCII与TCP通信基础",
      "prefix": "电机接入控制系统后，可结合《",
      "suffix": "》检查参数下发与运行状态。"
    }
  ],
  "modbus-protocol-fluid-control": [
    {
      "after": "功能码与寄存器表需要一起看",
      "target": "stepper-motor-calculation-selection",
      "label": "精密柱塞泵步进电机计算与选型",
      "prefix": "当寄存器涉及速度、步数或细分时，可用《",
      "suffix": "》核对单位换算。"
    },
    {
      "after": "流体控制设备联调步骤",
      "target": "piston-pump-acceleration-deceleration-curves",
      "label": "柱塞泵驱动之加减速曲线",
      "prefix": "运动启停参数的设置方法见《",
      "suffix": "》。"
    },
    {
      "after": "流体控制设备联调步骤",
      "target": "precision-piston-pump-backlash-compensation",
      "label": "精密柱塞泵应用指南：间隙补偿",
      "prefix": "吸液与排液切换时的补偿时序见《",
      "suffix": "》。"
    }
  ]
};

export const motionFormulaBlocks: Record<string, { expression: string; note: string }[]> = {
  "把电机速度换算成柱塞速度与理论流量": [
    {
      "expression": "v = p × n；Q = A × v",
      "note": "v：mm/s；p：mm/rev；n：rev/s；A：mm²；Q：μL/s。适用于直接驱动丝杆的理论换算。"
    }
  ],
  "把测得的空行程换成补偿指令": [
    {
      "expression": "补偿整步数 ≈ b × N ÷ p；补偿脉冲数 ≈ b × N × m ÷ p",
      "note": "b为测得的空行程，p为导程，N为每转整步数，m为细分数；实际控制器计数单位需核对。"
    }
  ],
  "常用换算公式": [
    {
      "expression": "N = 360 ÷ θ；n = f ÷ (N × m)；rpm = 60 × n",
      "note": "θ：整步角（°）；f：输入脉冲频率（Hz）；n：rev/s。"
    },
    {
      "expression": "δ = C ÷ (G × N × m)",
      "note": "δ：mm/pulse；C：负载轴每转位移（mm）；G：电机与负载轴转速之比。"
    }
  ],
  "计算示例：400 mm水平往复平台": [
    {
      "expression": "v最大 = 0.4 ÷ (0.1/2 + 1.8 + 0.1/2) ≈ 0.2105 m/s",
      "note": "单程2 s，其中加速和减速各0.1 s、匀速1.8 s；不含两端停留。"
    }
  ]
};

export const motionImageSizes: Record<string, { width: number; height: number }> = {
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-1.png": {
    "width": 1381,
    "height": 510
  },
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-2.png": {
    "width": 1373,
    "height": 494
  },
  "/images/resources/technical-articles/legacy-motion-control/acceleration-curve-3.png": {
    "width": 1378,
    "height": 499
  },
  "/images/resources/technical-articles/legacy-motion-control/modbus-request-response.png": {
    "width": 1647,
    "height": 789
  }
};
