import taskProfiles from './application-task-profiles.json';

type TaskCopy = { label: string; input: string; validation: string; fault: string; recovery: string };
const task = (label: string,input: string,validation: string,fault: string,recovery = '复核受影响步骤的实际结果，再恢复下一动作'): TaskCopy => ({label,input,validation,fault,recovery});
// Review-only semantic corrections. The source workflows used by other locales stay intact.
const overrides: Record<string, TaskCopy> = {
  pipette: task('移液与接收','吸头或固定针架构、密封、工作量、液体类别、浸入位置与接收动作','测实际容器中的交付量，并覆盖低余量、换头或针洗和样本间污染','密封漏气、空吸、挂液或错误浸入可能改变交付'),
  dilution: task('比例配制','原样、稀释剂或内标的实际体积、各级浓度、混合和再取样条件','分别测各路交付、接收比例和混合均匀性，再检查方法响应','小量偏差、共享段残液或混合不足可能改变实际比例'),
  extraction: task('分离与产物回收','保留相或固相、弃液与洗脱去向、吸液高度、允许残液和目标物','测目标物回收、相夹带、空白和残留','吸液界面错误、相夹带或表面吸附可能造成产物损失'),
  timedDose: task('交付与反应计时','工作量、加液顺序、液体到达延迟、混匀等待及检测触发','联合测液量、实际到达时刻和完整反应结果','液体到达与控制触发错配、残滴或混匀不足可能改变反应起点'),
  onlineSample: task('样品更新与代表性','分析对象、取样周期、滞留段更新、弃样预算与允许预处理','在分析或接收接口测更新时间，并用配对样品检查目标物代表性','旧样混合、沉积、吸附或更新时间不足可能使样品偏离实际来源'),
  drain: task('实际排液与容器状态','入口液体或气液状态、峰值来液、允许积液、提升与废液容器','测真实来液下的排空、积液及满液或堵塞后的互锁','泄漏、泡沫、堵塞或容器满可能使实际排液不足'),
  feeding: task('补料模式与物料累计','单次或连续补料模式、时间曲线、介质、负载、累计量与允许中断','分别测脉冲剂量或时间窗流量，再核对累计物料、换瓶及重启','缺液、气泡、补液中断或状态重复可能改变实际补料'),
  beadWash: task('固相保留、洗涤与回收','固相位置与保留目标、洗涤轮次、吸液高度、残液、去向及后续方法要求','同时评价固相损失、洗后残液和后续方法背景或产物回收','捕获不足、吸液高度错误、覆盖不均或积液可能使洗涤与回收异常'),
  drive: task('逐支路驱动配置','离散剂量、连续流量或排液任务，各自的介质、负载和节拍','离散任务测逐剂量，连续任务测时间窗和累计量，排废测峰值积液','容量、自由流量或气体流量混用可能选错驱动配置'),
  sequential: task('顺序注射与液体段','各液体段的体积和吸取次序、保持管容量、转移方向与检测窗口','测实际段序、到达时刻、峰响应和换样后的空白','液体段次序、分散、气泡或检测时间错配可能改变分析响应'),
  interface: task('容器与液体接口','容器开口和底部、最低液位、位置精度及取样、洗涤或混匀目标','按具体任务测交付、残液、覆盖或均匀性，并覆盖容器切换','几何不匹配、位置偏移或表面残留可能影响液体操作'),
  mixing: task('反应混匀','容器几何、液量、黏度、浸入位置、速度、持续时间与反应窗口','对比不同位置和时刻的均匀性、泡沫、反应响应与携带污染','未混匀、发泡、飞溅或混匀件残留可能改变后续检测'),
  titration: task('粗细加液与终点','预计总消耗、粗加液速度、终点附近的有效增量、残滴及信号稳定时间','分别测粗加液、停止后的残液和细加液，再用标准比较完整终点及累计消耗','残滴、增量过大、未混匀或信号未稳定可能使终点过量'),
  replenishment: task('储量与液位补充','工作罐有效储量、峰值消耗、液位上下限、回差和空源或溢流处理','测峰值消耗时的液位保持、补液越界、空源互锁及换瓶重启','缺液、液位误判、补液能力不足或阀路泄漏可能造成断供或溢流'),
  proportion: task('连续双路配比','各路目标流量、背压、启动延迟、允许组成波动和汇合混合路径','分别测两路累计量，并在启动、稳态和缺液恢复时测出口瞬时组成及均匀性','两路负载或启停不同步可能使累计比例合格而瞬时组成失配'),
  protection: task('过滤与回流保护','保护目的、目标物、滤材孔径、止回开启条件、新增压降与允许维护','分别测颗粒截留或反向泄漏、正常流量及目标物回收和空白','堵塞、吸附、反向泄漏或开启负载过高可能改变液路与方法结果'),
};
export function getReviewTaskCopy(key: string): TaskCopy {
  if (overrides[key]) return overrides[key];
  const source = (taskProfiles as Record<string, typeof taskProfiles.sample>)[key];
  if (!source) throw new Error('Unknown review task '+key);
  return task(source.label.zh,source.input.zh,source.validation.map(item=>item.zh).join('；'),source.faults[0].zh,source.faults[1].zh);
}
export const reviewModuleOverrides: Record<string, Partial<TaskCopy>> = {
  'ivd/hematology/hematology-channel': { label:'检测通道流动与恢复', input:'方法要求的流量与压力、样品更新、气泡及检测窗口',validation:'测检测通道实际流动、空白与气泡，并关联计数或检测结果',fault:'通道堵塞、气泡或更新不足可能改变检测状态' },
  'ivd/molecular/molecular-connection': { validation:'测密封与真实交付，并对完整接液路径比较核酸回收和空白',fault:'表面吸附、滞留或维护污染可能降低回收或改变空白' },
  'ivd/immunoassay/immunoassay-beadWash': { validation:'逐轮测磁珠损失、洗后残液和后续方法背景，不以液量或回收单独评价洗涤',fault:'磁捕获不足、吸液偏位、洗涤覆盖或排废积液可能使背景升高' },
  'life-science/genomics/connection': { validation:'测密封与真实交付，并对完整路径比较目标物回收和空白',fault:'吸附、滞留或维护污染可能使体积合格而回收下降' },
  'life-science/protein/sample': { validation:'同时测交付量、蛋白回收、聚集或方法响应和样本间残留',fault:'材料吸附、聚集、挂液或残留可能使液量合格而回收下降' },
  'synthetic-biology/feedingControl/protection': { label:'负载与回流保护',input:'止回开启压、反向泄漏、滤器压降、真实负载与维护状态',validation:'测开启负载、正常流量、反向泄漏及更换后恢复；无菌边界另行验证',fault:'开启压过高、反向泄漏或滤器堵塞可能扰动供料' },
  'synthetic-biology/microBioreactor/waste': { ...overrides.drain },
  'life-science/bioProcess/waste': { ...overrides.drain },
  'lab-automation/pipetting/needleWash': { label:'清洗或换头恢复',input:'固定针或吸头架构、接液表面、换头规则和污染目标',validation:'固定针检查清洗与空白恢复，吸头架构检查取头密封、换头及样本序列污染',fault:'洗涤覆盖不足、换头遗漏或密封失败可能影响下一样本' },
  'lab-automation/systemIntegration/monitoring': { label:'中断与恢复控制',input:'中断阶段、当前容器、已交付量、资源状态和可重试条件',validation:'覆盖未交付、部分交付和交付完成后中断，核对重试是否导致错投或重复加液',fault:'状态记录丢失或盲目重发命令可能造成重复操作' },
  'synthetic-biology/bioProcessIntegration/monitoring': { label:'过程状态恢复',input:'累计物料、样本身份、已执行阶段、未完成动作和恢复限制',validation:'覆盖断电、空料或堵塞，核对物料账本与实际容器状态再恢复',fault:'补料状态丢失或重复执行可能改变累计物料和过程体积' },
  'environmental-monitoring/gasPretreatment/protection': { label:'样气保护与组成',input:'颗粒、液滴或冷凝保护位置、新增压降、目标组分和允许采样处理',validation:'测气密、系统流量与压降，并比较保护前后的目标气体组成和维护后恢复',fault:'吸附、冷凝、泄漏或滤器堵塞可能改变样气组成与流量' },
  'environmental-monitoring/waterQuality/washWaste': { label:'冲洗、排空与恢复',input:'污堵趋势、冲洗配方与周期、峰值排液、含气状态及废液容器',validation:'测冲洗覆盖、实际排空和满液互锁，再核查共享段与首轮样品恢复',fault:'冲洗不足、积液或废液满可能使旧样与清洗液残留' },
  'environmental-monitoring/wastewater/drainage': { label:'排液、反洗与维护恢复',input:'沉积物、峰值来液、反洗条件、维护旁路及样品更新窗口',validation:'测排空、反洗后密封和样品更新时间，再确认首轮有效数据状态',fault:'沉积堵塞、反洗残液或旁路状态错误可能使实际排液与新样更新不足' },
  'environmental-monitoring/samplingPrep/waste': { label:'弃液、清洗与下一样本恢复',input:'样品与清洗液的弃液去向、共享路径、峰值排液和维护要求',validation:'测真实排液和容器保护，并用空白或下一样本检查共享段清洗恢复',fault:'弃液去向错误、积液或清洗残留可能污染下一样本' },
};
export function getReviewModuleTask(kind: string,group: string,key: string,sourceTask: string) {
  return {...getReviewTaskCopy(sourceTask),...reviewModuleOverrides[`${kind}/${group}/${key}`]};
}
export const reviewFlowNotes: Record<string, string> = {
  'piston-sample-transfer':'图示为取样与交付任务顺序。系统液隔离时样本不经过泵腔；直接接液时另行核对全部样本接触表面。',
  'pipetting-pump':'泵驱动空气柱，液体吸入一次性吸头后转移至目标容器；液体通常不经过驱动泵。图示为操作关系。',
  'pipette-transfer':'空气置换驱动吸头内的液体，移动动作把吸头带到目标位置；图示为任务顺序。',
  'syringe-sequential':'液体段先吸入保持管，再按阀位反向或转移经过反应与检测路径；图示不代表四段始终单向串联。',
  'diaphragm-gas-liquid':'直接抽排时介质经过适用泵再进入废液容器；间接真空时液体先进入容器，泵接容器气相支路。两种架构分别评估。',
  'valve-high-pressure':'装样支路与高压流动相支路由阀状态连接，分别核查装载和注入状态；图示不代表计量装置始终串在高压主路中。',
};
