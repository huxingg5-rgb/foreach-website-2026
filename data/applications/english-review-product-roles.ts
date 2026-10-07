import type { EnglishApplicationKind } from './application-english';
import type { ApplicationDocument, ApplicationDocumentMetadata, ApplicationSection } from './analytical-documents/types';
import { applicationArticleHref } from './application-article-links';
import { getReviewFooterPlan, reviewProductCards, type ReviewProductCardId } from './english-review-resources';

export const productFamilies = {
  piston: { label:'柱塞泵', products:['ea','sm','tm'], explanation:'EA、SM与TM用于比较容量、接液配置和安装空间。实际剂量由工作行程及完整接液路径确认；系统液驱动与样本直接接触泵头分别核对。' },
  syringe: { label:'注射泵', products:['hld','hmd'], explanation:'HLD与HMD分别结合旋转阀或电磁阀组织吸排路径。容量预算需要包含有效工作量、保持阶段和补液位置，阀位与泵动作共同形成一次交付。' },
  pipetting: { label:'空气置换移液泵', products:['smtp'], explanation:'SMTP用于一次性吸头的空气置换架构，泵提供气柱位移。吸头密封、液体类别、浸入位置及平台运动共同决定接收量。' },
  valveless: { label:'无阀计量泵', products:['rpl'], explanation:'RPL系列可按任务比较重复计量或辅助连续供液。分别确认每次剂量、时间窗流量及累计量；配比任务还需比较实际到达的两路液体。' },
  liquidPump: { label:'液体隔膜泵', products:['dpl30','dpl60','dpl30h'], explanation:'DPL30、DPL60与DPL30H按实际供液负载比较。洗头、阀、管路和容器阻力共同确定装机流量，供液窗口与接收位置一并核对。' },
  gasLiquidPump: { label:'气液混合隔膜泵', products:['dpgl'], explanation:'DPGL800用于具体配置允许的气体或气液混合抽吸。按吸入口含气状态、泡沫、来液峰值和容器负压核对，纯液连续输送另选适用方案。' },
  rotary: { label:'多通道旋转阀', products:['mrv'], explanation:'MRV3选择来源或去向，需要端口状态图和共享体积预算。端口数量表示路径选择能力，各状态压力及独立同步供液需求分别确认。' },
  solenoid: { label:'电磁阀', products:['sv'], explanation:'电磁阀按实际端口、流向、压差及失电状态控制支路通断。与泵指令共同核对开闭顺序，关闭泄漏及共享段残液分别检查。' },
  highPressure: { label:'高压进样阀', products:['hp'], explanation:'HP系列按装载、注入及其他状态的端口连接和压力比较。受压分析路径与辅助低压来源选择分别配置。' },
  probe: { label:'采样针', products:['sampling'], explanation:'定制采样针连接来源容器和接收位置，针径、端部、表面及接口按样本与容器确定。针端几何需配合计量驱动和运动程序。' },
  washProbe: { label:'清洗针', products:['washing'], explanation:'定制清洗针形成洗液进入或残液抽出的容器接口。供液覆盖、吸液高度、排液时序与真实容器形状共同确认。' },
  mixing: { label:'搅拌部件', products:['mixing'], explanation:'定制搅拌桨用于需要机械混匀的容器。几何、动作和时序以混合均匀性、泡沫及具体方法结果验证。' },
  monitoring: { label:'气泡与压力检测', products:['abd','pdm'], explanation:'ABD提供指定管路的气泡或液体状态信号，PDM5提供指定位置的压力信息。检测模块、位置和动作时间窗分别配置，控制器关联受影响的样本或任务。' },
  connections: { label:'管材与接头', products:['tubing','fittings'], explanation:'管材与接头共同形成密封连接和实际输送路径。核对配方、内外径、长度、管端定位与端口几何，并将新增体积纳入残留和到达延迟。' },
  filter: { label:'过滤器', products:['filters'], explanation:'过滤器用于方法允许的颗粒截留或元件保护。目标组分、孔径和滤材决定选型，压降、吸附与更换后恢复在真实路径评价。' },
  checkValve: { label:'单向阀', products:['check'], explanation:'单向阀按允许流向限制回流。开启条件、反向泄漏和新增阻力与泵工作点一起确认，另行检查虹吸及整条路径的污染边界。' },
  pinch: { label:'软管夹闭方案', products:[], explanation:'按项目讨论软管夹闭，液体接触范围由软管与接头形成。管材、壁厚、夹闭密封及更换程序共同验证，清洁或灭菌按整条路径评价。' },
} satisfies Record<string,{label:string;products:ReviewProductCardId[];explanation:string}>;

export type ProductRoleKey = keyof typeof productFamilies;
export type ProductApplicationRole = { key:ProductRoleKey; duty:string; detail:string; products?:ReviewProductCardId[] };
function role(key:ProductRoleKey,duty:string,detail:string):ProductApplicationRole { return {key,duty,detail}; }

// Each entry describes a product in its actual instrument/workstation context.
// Domains are added only after their copy has been reviewed. Finalized LC pages bypass this data.
export const reviewProductRoles: Partial<Record<EnglishApplicationKind,Record<string,ProductApplicationRole[]>>> = {
  ivd: {
    clinical:[
      role('piston','样本与试剂定量交付','位于取样针或试剂针的计量驱动端，将规定液量送入反应杯。先说明样本保留在针端由系统液驱动，还是进入泵头，再协调吸样、排液、针运动和补液。'),
      role('syringe','吸取、保持与试剂分配','在采用注射式计量的支路中连接试剂来源与交付端，按阀位完成吸取、保持和推出。与柱塞式配置按实际架构比较，并将补液安排在允许的检测窗口。'),
      role('liquidPump','针洗与杯洗供液','从洗液容器向针洗站或反应杯洗站供液，为后续样本恢复接液表面。与清洗针、阀路和排废支路协调，分别确认针内、针外及杯洗的覆盖。'),
      role('gasLiquidPump','含气废液抽吸','在吸入口间歇含气的洗站废液支路抽出洗液及残留，或服务适用的容器真空架构。与洗液来液、废液瓶和满液控制共同防止洗站积液。'),
      role('rotary','样本、试剂与洗液来源选择','在需要多来源的支路选择当前液体及去向，给计量泵建立正确连接。阀切换后共享段仍需按下一液体的残留要求安排置换。'),
      role('probe','容器端取样与交付','在样本容器与反应杯之间形成吸液和交付接口，配合泵位移、液位和运动。针口位置、挂液及低余量吸样与清洗程序一起评价。'),
      role('washProbe','清洗覆盖与残液吸除','在针洗或杯洗工位将洗液引到污染表面，并在适用结构中抽出残液。配合供液和抽吸支路，按真实杯形核对高度及下一反应杯恢复。'),
      role('monitoring','识别空吸、气泡和异常压力','在样本、试剂或清洗支路的指定位置提供状态信号。控制器结合当前阀位、样本身份和已交付量判断报警，决定重采、弃杯或恢复。'),
      role('connections','连接来源、计量端和针端','将试剂瓶、泵阀、针及洗站连成实际液路。安装长度与接口体积影响预充、首剂和共享段残留，维修后与交付及清洗序列一起复核。'),
    ],
    immunoassay:[
      role('piston','固定针样本与试剂计量','在固定针计量架构中驱动样本或试剂进入反应容器。配合针运动与清洗区分实际加液量、针端挂液和样本间携带污染。'),
      role('syringe','多试剂吸取与分配','在采用注射式驱动的试剂支路组织吸取和推出，配合阀位选择实际来源。磁珠悬液、结合试剂与底物各自的待机、混匀和补液条件分别确认。'),
      role('liquidPump','磁分离洗涤与洗针供液','向方法需要的洗涤头或洗针站输送洗液。在磁性固相架构中与磁捕获、洗头位置和吸液支路协调，供液本身不承担磁分离。'),
      role('gasLiquidPump','洗涤站含气排废','在入口含空气或气液混合的排废路径中抽出洗涤残液，或服务适用的废液容器真空支路。与吸液针、供液峰值和满液互锁配合，避免积液影响下一轮洗涤。'),
      role('rotary','试剂与洗液的多来源选择','在需要来源选择的配置中连接当前试剂、洗液或维护去向。结合共享体积和置换程序组织切换，底物与其他配方是否共用由实际方法确认。'),
      role('solenoid','供液、排液支路通断','在采用通断控制的支路中配合泵和洗头执行洗液开启、排液及隔离。开闭顺序需与磁捕获和反应时序协调，避免错误液体进入反应容器。'),
      role('probe','样本或试剂的容器接口','在采用探针的架构中完成吸取及向反应容器交付，配合计量驱动和针洗。针端几何、挂液与来源切换后的清洗一起评价。'),
      role('washProbe','洗液加入与固相保留下的吸液','在需要分离洗涤的工位形成供液或吸液接口。磁珠架构下配合磁捕获和容器几何确定高度，兼顾残液移除与固相保留。'),
      role('monitoring','关联加液与洗涤异常','在实际配置允许的位置识别气泡、缺液或压力变化。控制器将信号关联到剂次、反应杯和已执行步骤，恢复后分别检查首剂及洗涤状态。'),
      role('connections','连接试剂、洗涤和排废支路','形成试剂来源、计量端、洗头及废液去向之间的接液路径。按各配方选材，并在完整共享段检查残留、密封与更换后恢复。'),
    ],
    hematology:[
      role('piston','全血取样与试剂计量','在适用计量架构中驱动取样或规定试剂液量，与采样针、样本混匀和低余量条件配合。取样量与后续稀释比例分别验证。'),
      role('syringe','稀释液与样本转移','在注射式支路中组织样本转移或稀释液交付，配合阀路和反应位置完成比例配制。方法采用溶血剂时另行核对其实际剂量。'),
      role('liquidPump','辅助清洗和液源供给','为实际配置中的清洗或辅助供液支路提供液体，配合通道冲洗和废液去向。检测端有专门流量或压力要求时，按该通道单独确认驱动配置。'),
      role('gasLiquidPump','适用的含气洗液抽排','在入口含气的洗站或废液架构中抽吸来液。与采样、反应和检测通道的冲洗峰值协调，纯液排液按对应液体驱动方案配置。'),
      role('rotary','样本处理与通道路径选择','在需要选择路径的位置连接相应试剂、通道或洗液来源。阀位与检测步骤绑定，并确认共享段更新、压力和关闭泄漏。'),
      role('probe','全血吸取接口','在样本容器内形成取样位置，配合样本混匀、计量驱动及液位控制。针口贴壁、低余量和颗粒风险与完整取样清洗序列一起核查。'),
      role('monitoring','区分空吸、气泡与堵塞异常','采集指定位置的压力或气泡信号，按吸样、加液和检测阶段建立基线。结合阀位和样本状态判断异常，不由单一压力变化直接判定凝块。'),
      role('connections','连接取样、稀释和检测支路','形成样本、试剂和检测通道的实际路径，按真实介质选择材料及通径。残留、气泡及维修后更新与通道空白和检测恢复共同复核。'),
    ],
    coagulation:[
      role('piston','反应杯样本与试剂定量交付','在适用的离散计量支路驱动规定液量进入反应杯。与针运动和检测程序配合，分别记录电机动作、针口出液及液体实际到达。'),
      role('syringe','试剂准备与吸排计量','在注射式架构中吸取试剂并按任务推出，配合来源选择和补液时点。容量及动作周期服务具体方法的加液顺序与允许窗口。'),
      role('rotary','方法所需试剂来源选择','在需要多来源选择的支路建立试剂到计量端的连接。阀位、共享段置换与真实到达时刻共同纳入反应程序。'),
      role('liquidPump','可重复使用路径的清洗供液','向实际配置中的针洗或其他可重复使用接液部件供洗液。配合清洗接口及排液去向，核查下一反应首剂中的残液影响。'),
      role('probe','反应杯接收位置控制','形成取样和加液的容器接口，配合计量驱动及运动程序。杯壁触液、挂液、飞溅和到达延迟与真实方法计时一起检查。'),
      role('monitoring','标记受影响的反应交付','在指定支路识别气泡或压力异常，控制器关联发生时刻、当前杯及已交付量。路径恢复后按方法判断反应是否继续。'),
      role('connections','维持加液路径与时延','连接液源、驱动与针端，密封和共享体积影响出液时刻及首剂。更换管长、接头或针后，重新核对液量和到达延迟。'),
    ],
    molecular:[
      role('pipetting','吸头式样本与反应体系转移','在一次性吸头架构中为样本、试剂或洗脱产物提供空气置换驱动。配合取弃头、运动和孔位记录，提取与下游配液分别设置程序。'),
      role('syringe','固定液路试剂吸排','在采用固定路径供液的配置中吸取并分配裂解、结合或其他试剂。与来源选择和预充配合，按实际配方确认材料、清洗及接收量。'),
      role('liquidPump','配置中需要的洗站供液','向实际存在的清洗工位供洗液，配合洗头与排废恢复接液表面。磁棒转移磁珠的分离步骤按固相运动组织，另行定位需要泵送液体的操作。'),
      role('gasLiquidPump','含气废液支路抽吸','在适用的含气抽吸或容器真空架构中服务废液移除。与产物接收路径保持明确去向，维护和反向泄漏检查覆盖污染边界。'),
      role('rotary','试剂、产物与维护去向选择','在需要阀路的固定液路中选择来源或出口，配合泵动作组织转移。运行、清洗与失电状态明确产物及废液去向，核对共享段残留。'),
      role('monitoring','保留异常对应的样本状态','在实际支路中提供气泡或压力信息，关联裂解、洗涤、洗脱及配液阶段。恢复时核对已经转移的产物和试剂，防止重复交付。'),
      role('connections','完整接液路径与产物回收','连接固定液路中的容器、驱动和接收端，按配方及污染区域确认材料和装配。目标物通过全部连接后比较回收，共享体积计入小体积洗脱预算。'),
    ],
  },
  'life-science': {
    genomics:[
      role('pipetting','样本、试剂与产物的吸头式转移','在一次性吸头流程中驱动样本、裂解或结合试剂以及洗脱产物转移。与孔位、耗材和固相保留步骤配合，洗涤弃液与产物回收分别设置动作。'),
      role('syringe','固定路径的试剂计量','在固定液路架构中吸取并推出方法需要的试剂，配合来源选择及预充。磁棒转移固相时，泵仅对应实际存在的补液或液体转移支路。'),
      role('rotary','试剂来源与转移去向选择','在采用阀路的工作站中连接当前试剂来源或接收出口，配合计量动作。共享段置换区分洗液、洗脱产物及废液去向。'),
      role('monitoring','定位转移中的缺液与气泡','在配置允许的固定支路提供压力或气泡信息，控制器关联提取、洗涤及洗脱阶段。恢复时核对已经交付的试剂和产物。'),
      role('connections','形成可评价回收的完整路径','在固定路径中连接来源、泵阀和产物接收端。将材料表面、接头和新增管内容积纳入低体积回收及样本切换检查。'),
    ],
    cellCulture:[
      role('syringe','周期补液与离散转移','为采用离散液量的培养基补充或适用转移任务提供吸排驱动。配合容器身份和补液时间；细胞悬液接触路径另按通径、停留与转移结果确认。'),
      role('valveless','适用的重复或连续培养基供给','在实际配方和背压允许时为补液支路提供重复或持续输出。与供料容器和控制时序配合，记录换瓶、预充、停流与累计液量。'),
      role('liquidPump','辅助培养基供液与清洗','在设备实际存在的大宗供液或清洗支路输送工作液，配合储液容器和阀路。培养基输送与细胞悬液转移分别确认，按真实培养条件评价接液配置。'),
      role('pinch','软管支路隔断','在采用软管控制的培养或转移配置中开启、关闭支路，配合供液与维护程序。软管、接头和更换步骤共同构成接液及污染边界。'),
      role('monitoring','识别供液中断与异常负载','在实际供给支路识别气泡或压力变化，将异常阶段连到累计补液记录。培养状态仍通过对应生物过程测量评价，控制器再决定是否继续。'),
      role('connections','连接培养容器与液体来源','形成补液、细胞转移及排液的实际通道。按真实配方、通径、温度和接触时间核对材料与连接，细胞转移结果覆盖全部接液部件。'),
    ],
    automation:[
      role('pipetting','机器人平台的吸头式移液','在一次性吸头平台中提供吸取与分配驱动，配合机器人运动、液面和容器位置。分别设置核酸、细胞和蛋白的实际液体程序。'),
      role('syringe','固定液路分装与试剂转移','在固定路径工位组织试剂吸取、保持及推出，配合阀位和工位接收。实际交付与下一实验步骤允许条件同时记录。'),
      role('rotary','多工位或多液源选择','在共享固定液路中选择实际来源与目标工位。与任务调度绑定样本身份，切换后按接收液体处理共享段残留。'),
      role('liquidPump','公共清洗或补液供给','为实际存在的公共洗站或储液补充支路供液，配合工位占用和峰值需求。平台动作完成后检查各工位实际接收与清洗恢复。'),
      role('gasLiquidPump','适用的含气洗站抽排','在含气抽吸或容器真空架构中服务洗站排液，配合清洗来液及废液容器。共享排废容量需覆盖允许并发的工位。'),
      role('monitoring','关联液路异常与样本步骤','在指定支路提供气泡或压力信息，将信号与当前容器及已交付阶段关联。实验流程据此处理部分执行、弃样或恢复。'),
      role('connections','形成工位之间的真实液路','连接来源、驱动、洗站及接收工位，标明可拆装段和去向。管长、共享体积和材料变化与实际实验回收及空白一起复核。'),
    ],
    protein:[
      role('monitoring','识别蛋白处理支路的供液与压力异常','在配置允许的固定支路提供压力或气泡信息，关联当前样本、缓冲液和分离阶段。信号用于定位缺液及负载变化，目标物回收和分析结果仍按实际方法验证。'),
      role('highPressure','需要时的受压分离路径切换','仅在实际流程包含受压分离且需要切换时，按各状态压力、端口与接口比较适用配置。该职责与低压缓冲液来源选择分开，不能由来源选择阀的能力推定。'),
      role('syringe','蛋白样本与缓冲液离散转移','在适用的固定路径中计量并转移蛋白样本或缓冲液。与容器、阀路和真实接液表面配合，分别检查体积和目标物回收。'),
      role('rotary','缓冲液与样本来源选择','在多来源配置中切换当前缓冲液或样本路径，配合驱动和共享段置换。按该支路的实际受压位置确认配置，并检查新组成到达。'),
      role('liquidPump','辅助缓冲液供给与清洗','在实际配置中的辅助供液或清洗支路提供液体，配合储液容器与工位负载。需要承担柱或其他受压引入任务时，另按该任务确认压力和驱动。'),
      role('pipetting','吸头式蛋白样本准备','在采用吸头的工作站中转移样本、缓冲液或反应配方，配合液体类别及容器。低浓度或低体积任务同时核对接收量、目标物回收和空白。'),
      role('connections','形成蛋白的全部接液表面','连接泵阀、来源及接收端，接头与软硬管一起纳入真实蛋白回收评价。材料名称与清水液量测试分别用于初筛，完整路径结果用于确认。'),
    ],
    bioProcess:[
      role('syringe','单次补料与采样计量','在离散任务中驱动补液或样本转移，配合来源、接收容器及补液时点。采样与路径更新弃液一起计入过程体积记录。'),
      role('valveless','适用的重复与持续补料','在实际工作点允许时为补料支路提供重复或持续计量，配合供料容器和过程阶段。时间窗流量、累计液量及中断恢复分别记录。'),
      role('rotary','补料、采样及维护去向选择','在采用选择阀的配置中建立当前任务连接，配合泵和互锁。清洗、弃样与产物去向分别标明，关闭后检查隔离及回流。'),
      role('pinch','软管路径隔断与更换','在软管支路中配合补料、采样和维护控制通断，减少液体接触阀体的范围。软管、接头及装配和清洁程序一起评价。'),
      role('monitoring','关联液路异常与过程记录','提供指定补料或采样位置的压力、气泡信息，配合控制器标记异常阶段。实际累计量、样品代表性与对应过程结果分别确认。'),
      role('connections','连接过程容器及液体支路','形成供料、采样和废液路径，按运行周期及配方选择接液材料。维护后核对装配、密封、预充和体积记录，再恢复任务。'),
    ],
  },
  'lab-automation': {
    samplePrep:[
      role('pipetting','吸头式样本准备','在采用一次性吸头的工位中提供吸排驱动，配合液体类别、机器人运动及样本容器。转移、稀释和分离动作按各自的保留对象设置。'),
      role('syringe','固定路径配液与转移','在固定针或固定液路工位吸取并交付规定液量，配合来源选择与接收位置。将补液时点、共享段及清洗插入完整准备流程。'),
      role('rotary','来源、工位及维护路径选择','在多来源或多工位固定液路中建立当前连接，配合计量驱动和任务调度。当前样本、阀位及目标容器同时记录，公共段置换有明确去向。'),
      role('liquidPump','洗站与公共供液','为实际配置中的公共洗站或供液容器提供液体，配合工位占用与洗头。单工位和并发运行分别核对供液量及允许窗口。'),
      role('gasLiquidPump','公共洗站含气抽排','在适用含气抽吸或容器真空路径中移除洗站来液，配合各工位的峰值排废。容器满、积液和中断状态进入平台互锁。'),
      role('monitoring','识别供液及转移异常','在实际支路采集压力或气泡信息，控制器关联当前来源、工位及交付阶段。部分转移与已完成转移按不同规则恢复。'),
      role('connections','工位与公共资源连接','形成来源、计量、清洗及排废的实际路径，并区分独立段和共享段。更换模块后复核标识、密封、预充和各工位交付。'),
    ],
    pipetting:[
      role('pipetting','一次性吸头空气置换','在空气置换架构中通过气柱位移驱动吸头内液体，配合取头密封、浸入位置和运动。一次吸取多次分配还需核算空气间隔与保留量。'),
      role('syringe','固定针液体置换驱动','在采用注射式液体置换的固定针架构中组织吸排，配合系统液、阀位和针运动。样本实际接液范围及针内外清洗分别确认。'),
      role('piston','适用固定针的离散计量','在对应固定针计量配置中提供受控位移，配合系统液或直接接液路径完成交付。与注射式方案按工作行程、容量和安装条件比较。'),
      role('probe','固定针容器端接口','在采用固定针的配置中连接来源液体与目标容器，配合驱动、液位和运动。针口位置、挂液及内外针洗影响实际移液序列。'),
      role('monitoring','关联移液阶段的状态信息','在允许的管路位置检测气泡或压力变化，配合控制器记录来源、目标容器和已经交付的剂次。对吸头或针端的密封及真实交付仍分别检查。'),
      role('connections','固定路径密封与共享体积','连接固定针架构的系统液、泵阀与针端，维持密封及预充。一次性吸头架构则按实际空气通道与密封结构确认，分别记录接液范围。'),
    ],
    microplate:[
      role('liquidPump','孔板站洗液与公共液体供给','从储液容器向实际孔板供液或洗涤歧管输送液体，配合支路阻力、洗头和并发需求。总供液量与各孔实际交付分别检查。'),
      role('gasLiquidPump','适用的孔板含气吸液与排废','在含气抽吸或容器真空架构中为吸液头提供抽排条件，配合孔位、高度和来液峰值。按实际入口介质确认配置，并记录各孔残液。'),
      role('syringe','逐孔或逐组离散分配','在采用计量分配的板式工位中按规定剂量供液，配合阀路、分配头和孔位顺序。首末孔、不同通道及补液后的首剂分别验收。'),
      role('solenoid','洗涤与分配支路通断','在采用通断阀的配置中组织供液及排液动作，配合泵和洗头时序。独立通道、公共歧管和同时来液需求由实际结构确认。'),
      role('washProbe','孔位洗液接口与吸液高度','在实际洗涤工位中形成供液或吸液接口，配合板型及运动位置。需要保留固相的方法同时检查吸液高度、残液和方法背景。'),
      role('monitoring','关联缺液与供排液异常','在公共或指定支路提供压力、气泡信息，配合平台记录受影响孔位及当前任务。供液总量正常时仍需定位堵孔、泄漏和局部阻力。'),
      role('connections','连接储液、歧管和排废','形成板式工位的供液与抽排网络，说明共享段和独立支路。长度、通径及接口差异进入逐孔或逐通道交付检查。'),
    ],
    reagentDispensing:[
      role('syringe','批次试剂吸取与逐剂分配','在注射式分装架构中完成吸取和重复推出，配合阀位与目标容器身份。按可用行程安排补液，并分别检查首、中、末剂。'),
      role('valveless','适用的重复剂量或持续供液','在允许的配方与负载下为分装支路提供重复或持续输出，配合启停与容器节拍。剂量、时间窗流量和累计量分别核对。'),
      role('rotary','试剂来源与分装去向选择','在多来源或多出口配置中建立当前分装连接，配合驱动及容器记录。换瓶、来源切换、预充与共享段置换按不同步骤执行。'),
      role('solenoid','分配出口通断','在采用通断控制的出口配合供液驱动组织开始与停止，核对失电状态。挂液、停止后滴液和实际交付量与接收容器一起检查。'),
      role('monitoring','标记缺液与受影响剂次','在指定供液位置提供气泡或压力信息，控制器保留当前容器及已交付状态。缺液恢复先区分未交付、部分交付和已完成。'),
      role('connections','连接液源、驱动及分配端','形成真实试剂通道，材料及接口按配方和接收端确认。换瓶预充、待机首剂与更换后的恢复覆盖全部连接。'),
    ],
    systemIntegration:[
      role('syringe','离散工位计量执行','在采用有限行程吸排的工位中执行规定液量，配合模块接口及任务记录。来源、接收容器和补液状态一并传递给平台控制。'),
      role('pipetting','吸头式工位移液执行','在空气置换工位中提供吸排驱动，配合取弃头、运动及液体程序。平台调度保留通道、耗材与目标容器的对应关系。'),
      role('rotary','共享固定液路资源选择','把实际来源与接收工位连接到共享计量路径，配合任务资源锁及端口状态。阀位与共享段更新纳入运行和维护程序。'),
      role('solenoid','支路隔离与状态互锁','在采用通断阀的支路执行开启或关闭，配合供液及排废动作。失电与异常状态有明确去向，并检查隔离是否实际成立。'),
      role('liquidPump','平台公共供液与清洗','为实际公共供液和洗站支路提供液体，按工位阻力及峰值需求配置。平台调度限制资源占用，完整循环检查实际接收。'),
      role('gasLiquidPump','适用公共废液抽吸','在允许的含气或容器真空架构中服务公共排废，配合废液瓶和并发来液。满液及堵塞互锁与平台中断恢复协调。'),
      role('monitoring','支路状态进入平台控制','在指定位置提供气泡及压力信号，平台将其关联到任务、资源和已交付阶段。通信成功、动作完成与实际液体结果分别记录。'),
      role('connections','模块间密封与可维护连接','形成液源、工位、洗站及废液之间的连接，明确模块身份与液流方向。装配和更换后的密封、预充及真实路径交付纳入平台验证。'),
    ],
  },
  'analytical-instruments': {
    spectroscopy:[
      role('syringe','标准配制、稀释及内标准备','在液体样品前处理支路分别交付母液、稀释剂或内标，配合来源选择及混合容器。配制液量与仪器引入端的持续流量要求分别确认。'),
      role('rotary','样品、标准、空白及洗液选择','在多来源液路中选择当前液体，配合计量或输送驱动建立到接收端的路径。共享段体积与实际流量决定组成更新和空白恢复。'),
      role('valveless','适用的连续辅助液供给','在仪器允许的辅助液体支路中提供重复或持续计量，配合引入端的真实负载。按实际基体、压力及信号恢复确认适配，替换原机引入配置需完整路径验证。'),
      role('probe','液体样品的来源接口','在采用采样针的配置中从样品容器取液，配合运动、计量及冲洗。针端材料、低余量和换样残留与完整分析空白一起核查。'),
      role('connections','连接基体液体与仪器接口','形成样品、标准及空白经过的实际路径，按酸、盐基体和受压位置核对材料。管长、共享体积及装配后信号到达需要与方法配合。'),
      role('monitoring','辅助液路供给与压力状态','在允许的引入或供液支路提供气泡和压力信息，控制器关联来源及当前测量窗口。实际流量、组成和分析响应分别作为验收。'),
    ],
    waterQuality:[
      role('piston','分析单元内样品及试剂计量','在接收水样后的计量支路交付规定样品或试剂液量，配合反应容器与检测程序。颗粒及基体变化按方法允许的样本状态确认。'),
      role('syringe','适用的吸排与比例配制','在采用注射式驱动的配置中完成样品、标准或试剂吸排，配合阀路及混合。各路实际交付、反应顺序与到达时刻一起记录。'),
      role('rotary','样品、试剂、洗液及旁路选择','在分析柜内选择当前来源或维护去向，配合计量驱动和反应时序。置换液有明确出口，避免旧样或洗液进入测量。'),
      role('liquidPump','柜内清洗及辅助液体供给','在实际存在的清洗或公共供液支路输送液体，配合阀与洗头负载。现场长距离取样另在环保监测说明，柜内供液按装机工作点评价。'),
      role('filter','方法允许的水样或元件保护','在方法允许的位置截留颗粒，配合被测组分定义与后续计量。过滤前后目标物、压降、空白及更换首样分别检查。'),
      role('monitoring','柜内交付异常识别','在指定支路提供压力或气泡信息，控制器关联当前样品、加液及检测阶段。报警解除后按实际路径恢复和方法检查决定数据状态。'),
      role('connections','柜内接液与反应路径连接','连接进入柜内的水样、试剂来源和反应位置，说明共享段与废液去向。材料、管长和维护更换与真实交付及首轮反应一起复核。'),
    ],
    samplePrep:[
      role('syringe','稀释与体积转移','在固定路径中分别计量原样、稀释剂或方法需要的添加液，配合来源选择与混合容器。接收比例、实际组成和下一步再取样共同确认。'),
      role('pipetting','吸头式转移与前处理','在一次性吸头架构中转移样本或各相液体，配合液体类别、界面和接收位置。按目标物所在相区分保留与弃液，再评价回收及相夹带。'),
      role('rotary','样本、溶剂及产物去向选择','在采用固定阀路的前处理配置中组织装载、洗涤或产物转移，配合驱动。各步骤保留对象不同，共享段和置换液去向分别标明。'),
      role('filter','方法规定的样品处理或保护','按分析对象在允许的位置截留颗粒，配合实际滤材和接收容器。样品处理与泵阀保护分别核查目标物损失、空白和压降。'),
      role('connections','保留目标物的完整转移路径','形成样本、溶剂及产物的接液路径，将管路、接头、泵阀和容器一并纳入回收评价。残留体积与维护后的首份样本一起检查。'),
    ],
    labAnalyzer:[
      role('piston','分析支路离散计量','在样品、标准或试剂的适用支路交付规定液量，配合阀位、针端和反应位置。工作行程、补液与检测窗口逐任务核对。'),
      role('syringe','吸取、保持及顺序交付','在采用注射式驱动的支路组织来源吸取和推出，配合切换阀与接收端。共享体积、补液时点和方法顺序进入整机状态表。'),
      role('valveless','适用连续辅助液计量','在实际方法允许的持续支路输出载液或辅助试剂，配合背压和到达时间。分别核查流量趋势、累计量及方法空白恢复。'),
      role('liquidPump','洗液供给与辅助循环','在实际存在的清洗、补液或循环支路驱动液体，配合工位及容器阻力。逐支路核算真实流量，公共需求与并发动作一起检查。'),
      role('gasLiquidPump','适用含气废液抽排','在入口含气或容器真空架构中服务废液支路，配合洗站来液及废液瓶。排废峰值、满液互锁和故障去向写入整机流程。'),
      role('rotary','样品、标准及清洗来源选择','在多来源固定液路中建立当前分析或维护连接，配合驱动和检测窗口。阀位正确后仍需确认新液体到达及残留恢复。'),
      role('solenoid','分支通断与维护隔离','在实际支路控制开启、关闭或两路切换，配合泵及旁路程序。正常、失电与故障状态分别标明去向和允许压力。'),
      role('monitoring','液路状态与测量窗口联动','在指定位置提供压力及气泡信息，控制器关联动作、来源和结果窗口。故障识别、路径恢复及方法信号有效状态分别确认。'),
      role('connections','模块间路径与密封连接','连接样品、标准、驱动、反应与废液模块，明确独立段和共享段。装机后核查预充、泄漏、到达延迟及方法空白，维修后重新复核。'),
    ],
  },
  'environmental-monitoring': {
    waterQuality:[
      role('liquidPump','现场水样输送与冲洗','在实际水样、吸扬程和颗粒条件允许时将现场样品送到分析接口，或服务独立冲洗支路。与取样位置、管路及维护程序配合，实测样品更新时间和代表性。'),
      role('rotary','取样、冲洗及维护旁路选择','在采用选择阀的配置中组织当前来源和去向，配合输送驱动及分析允许状态。排旧样、取新样和维护各状态分别确认。'),
      role('filter','方法允许的取样保护','在允许预处理的位置截留颗粒，配合被测组分定义及后续分析。源样与到达样品比较目标物，滤器压降及更换恢复进入维护记录。'),
      role('monitoring','识别现场液路供给异常','在实际允许的液体支路提供气泡或压力信息，控制器关联缺液、堵塞及清洗状态。恢复时确认真实样品更新，再按方法释放测量。'),
      role('connections','形成现场到分析接口的路径','连接取样点、驱动及分析接口，按距离、水位与介质核对材料、通径和管内容积。沉积、混合和共享段更新在实际接收端评价。'),
      role('checkValve','适用取送样支路回流限制','在需要止回的配置中控制允许流向，配合水位、吸扬程及泵停止状态。开启负载与真实输送量一起核对，维护后确认密封和样品更新。'),
    ],
    wastewater:[
      role('liquidPump','满足介质条件的废水输送','在具体配置允许的颗粒、黏度、温度及腐蚀范围内组织取送样或独立冲洗。配合实际扬程和管路，检查传送前后样品、沉积及维护需求。'),
      role('filter','方法允许的颗粒处理','按溶解态、总量或其他规定分析对象，在允许位置设置过滤。配合输送和维护观察截留、吸附、压降及目标物变化，过滤目的与保护需求分别说明。'),
      role('rotary','分析供样与维护去向选择','在采用选择阀的废水液路中连接当前样品、洗液或维护出口，配合驱动及分析状态。反冲与旁路返回后先确认密封及新样更新。'),
      role('solenoid','冲洗或反冲支路通断','在实际通断控制的配置中开启或关闭维护支路，配合泵和排液去向。流向、压差和失电状态明确，维护液体进入分析接口前有相应互锁。'),
      role('monitoring','记录污堵和供样异常','在配置允许的位置提供压力或气泡信息，配合实际负载及维护趋势定位异常。报警解除后核对到达样品和首轮分析，不以信号正常单独证明更新。'),
      role('connections','连接复杂基体与维护路径','按真实废水范围形成取样、输送及维护接液路径，明确可拆装段。材料、通径及接头与颗粒通过、沉积和完整传送结果共同评价。'),
    ],
    gasPretreatment:[
      role('gasLiquidPump','适用样气或气液混合抽吸','在具体配置允许的气体或气液混合路径中提供抽吸，配合入口状态及系统负压。明确是在样气支路还是含气冷凝液支路，分别检查气密、目标组成和实际排液。'),
      role('liquidPump','吸收液加注或辅助循环','在液体支路输送方法需要的吸收液，配合实际配方、背压和气液接触单元。吸收液流量与样气抽吸能力分别核对，完整分析结果由实际方法评价。'),
      role('pinch','软管支路的隔断与排液控制','在采用软管夹闭的样气或液体支路中控制开闭，配合负压、排放周期和维护。按入口介质确认软管与接头，检查关闭泄漏及开启阻力。'),
      {...role('filter','方法允许的样气保护','在方法允许的颗粒或液滴保护位置降低相应负荷，配合目标气体定义及预处理结构。具体滤材和结构按样气条件另行确认，核对新增压降和组成变化。'),products:[]},
      role('connections','分别连接样气与液体支路','形成样气主路、冷凝液和吸收液各自的连接，标明压力及去向。材料、负压密封与维护恢复分别核对，冷凝液不串联进入样气分析接口。'),
    ],
    samplingPrep:[
      role('syringe','环境样品分样与稀释','在固定路径架构中交付规定原样和稀释剂，配合容器及混合程序。样品保存状态、颗粒分布与共享段残留进入代表性及比例验证。'),
      role('pipetting','吸头式环境样本转移','在一次性吸头架构中驱动样品分取和配液，配合液体类别、混匀及容器身份。记录原容器、时点及目标容器，检查实际接收与样本间污染。'),
      role('filter','分析方法规定的过滤','在方法规定的位置处理样品，配合被测对象选择是否过滤及对应滤材。目标物、空白、压降和更换后首份样本分别评价。'),
      role('rotary','固定液路来源与弃液选择','在采用选择阀的准备配置中连接原样、稀释剂或清洗来源及对应出口。配合计量和维护程序，区分样本接收与废液去向。'),
      role('connections','保留组分的完整转移路径','连接固定液路中的样本、驱动和接收端，按真实基体核对接液材料。全部连接纳入目标物回收、样本间残留及清洗恢复。'),
    ],
    systemIntegration:[
      role('liquidPump','逐支路取送样及冲洗','在介质和工作点允许的支路驱动样品或洗液，配合输送距离、吸扬程及任务窗口。整柜各支路分别核算负载，再检查共同运行的实际需求。'),
      role('rotary','测量、清洗和维护路径选择','用实际端口状态连接样品、分析接口及维护去向，配合泵和有效数据状态。避免旧样、洗液或维护排液误入测量。'),
      role('solenoid','支路通断与异常互锁','在实际通断配置中组织供液、维护或排液动作，配合停测和恢复程序。正常、失电及通信异常状态分别确认去向。'),
      role('monitoring','液路异常与数据状态联动','在指定液体位置提供气泡及压力信息，配合来源、阀位和维护阶段判断故障。路径实际恢复和方法检查决定首轮有效测量释放。'),
      role('filter','方法允许的采样保护','在整柜图纸中标明允许保护位置，配合目标组分与维护旁路选择配置。压降变化、耗材更换和目标物偏差进入维护与数据记录。'),
      role('connections','柜内外连接与维护可达性','形成取样、预处理、分析及排废的实际路径，标明液流方向与拆装段。按现场温度、结露或低温条件评价连接，维护后重新验证样品更新。'),
    ],
  },
  'synthetic-biology': {
    microBioreactor:[
      role('syringe','脉冲补料与离散采样','在需要指定单次液量的支路中驱动培养基、添加液或样本转移，配合来源和接收容器。有效行程与补液时点明确，采样及弃液计入过程体积。'),
      role('valveless','适用的重复或持续补料','在实际配方和背压允许时为补料支路提供重复或持续输出，配合供料容器与过程阶段。时间窗流量、累计量及换瓶恢复分别核对。'),
      role('rotary','补料、采样及维护去向选择','在采用选择阀的配置中建立当前任务路径，配合驱动及培养容器身份。清洗液、采样弃液和废液去向明确，关闭状态检查隔离。'),
      role('pinch','软管补料或采样支路隔断','在采用夹闭方案的实际支路中控制通断，配合供给和维护步骤。软管、接头及更换程序一起确认接液和污染边界。'),
      role('gasLiquidPump','适用的含气废液抽吸','在实际入口含气或容器真空架构中服务排废，配合菌体、泡沫及来液峰值。按具体配置确认介质适用性，维护后检查密封及隔离。'),
      role('monitoring','支路状态进入过程记录','在补料、取样或排废的指定位置提供压力和气泡信息，配合异常时段及累计物料记录。培养状态由对应过程测量确认。'),
      role('connections','连接供料、培养及样本去向','形成各支路的实际接液路径，按配方、温度和运行周期核对材料。共享段更新体积与全部采样消耗共同进入过程预算。'),
    ],
    biofoundry:[
      role('pipetting','构建与筛选的吸头式液体操作','在一次性吸头架构中转移样本、酶液或培养配方，配合液体类别和目标孔位。构建、菌株、试剂来源及已完成操作关联到同一记录。'),
      role('syringe','固定液路试剂分配','在采用固定路径的分装支路组织试剂吸取与推出，配合容器或孔位身份。真实生物试剂的待机、首剂及补液条件按实验流程设置。'),
      role('rotary','多来源及目标路径选择','在多来源固定液路中建立当前构建任务的试剂连接，配合计量与资源互锁。来源、目标板位及阀位共同记录，切换共享段有明确置换。'),
      role('liquidPump','实际公共洗站与辅助供液','为配置中的公共洗站或辅助储液支路输送工作液，配合板式工位和任务调度。生物试剂分配与公共供液分别验收。'),
      role('monitoring','标记受影响的孔位与步骤','在指定支路提供气泡或压力信息，配合平台记录当前试剂源、目标孔位和已交付状态。异常恢复避免整板重复加液。'),
      role('connections','固定工位与公共路径连接','连接试剂来源、驱动、洗站及接收端，明确独立与共享接液段。样本切换、维护和恢复与交叉污染及实验结果一起检查。'),
    ],
    feedingControl:[
      role('valveless','适用的长周期补料计量','在真实配方、速度和背压允许时为补料支路提供持续或重复输出，配合过程阶段及供料容器。运行、换瓶、停流和重启覆盖时间窗流量及累计量。'),
      role('syringe','间歇或交替供液','在有限行程或交替架构中交付补料，配合阀路和补液程序。容量、切换及恢复确定实际连续性，允许停流按工艺定义。'),
      role('rotary','配方与补液来源选择','在采用选择阀的配置中连接当前介质或维护路径，配合预充和补料控制。共享段旧配方及洗液明确去向，并验证新组成到达培养容器。'),
      role('checkValve','补料支路回流限制','在需要回流保护的位置限定流向，配合培养端反压和驱动工作点。开启负载、反向泄漏与新增阻力共同核对。'),
      role('pinch','软管支路隔断与维护','在采用夹闭方案的补料管路中控制通断，配合换瓶、维护和恢复。密封、软管状态及完整清洁或灭菌程序按实际系统确认。'),
      role('monitoring','记录供料异常时间窗','提供实际补料位置的气泡或压力信息，配合实测交付、累计物料及控制记录。欠量是否补偿和恢复速度按过程程序确定。'),
      role('connections','长周期供料路径与负载','连接供料容器、计量驱动及培养端，按配方和长时接触确认材料。管路及保护元件的阻力与换瓶预充、到达延迟共同评价。'),
    ],
    onlineSampling:[
      role('syringe','采样液量与转移控制','在采用离散采样的支路取得并转移规定液量，配合取样口、路径更新及接收容器。正式样本、弃液和允许的回收分别记录。'),
      role('rotary','取样、更新与接收去向选择','在采用选择阀的采样路径中组织过程来源、分析接口或弃液出口，配合驱动。当前来源与样本时点明确，共享段置换计入采样预算。'),
      role('pinch','采样软管隔断','在实际软管支路中控制采样或维护开闭，配合取样口和接头。夹闭密封、装配及更换程序共同纳入污染边界评价。'),
      role('filter','方法规定的采样处理','在分析目标允许的位置保留或去除颗粒，配合需要测量的细胞、菌体或液相目标物。过滤前后组成、吸附、压降及维护恢复分别检查。'),
      role('monitoring','关联采样异常与样本身份','在允许的固定液路位置检测压力或气泡，配合采样周期及转移阶段。实际取样量、更新时间和样品代表性另与参考样本比较。'),
      role('connections','连接过程口、前处理及分析端','形成样本到达接收或分析位置的实际路径，按材料、滞留体积和时延设置更新。全部连接进入目标物回收、污染和维护恢复检查。'),
    ],
    bioProcessIntegration:[
      role('valveless','适用的持续补料支路驱动','在实际条件允许时驱动长周期补料，配合供料容器与阶段控制。时间窗流量、累计物料和中断后恢复一起纳入系统记录。'),
      role('syringe','离散补料与采样执行','在需要规定单次液量的支路吸取和交付，配合来源、目标容器及补液。指令、实际交付和未完成阶段共同保存，避免恢复后重复执行。'),
      role('rotary','多路过程任务连接','在采用来源选择的配置中组织补料、采样与维护去向，配合互锁及培养容器身份。运行和故障状态明确，检查误通及关闭后的隔离。'),
      role('pinch','软管路径隔断与模块维护','在实际软管控制位置开闭支路，配合模块更换与过程恢复。管材、接头、夹闭密封及清洁或灭菌步骤共同确认。'),
      role('gasLiquidPump','适用废液与含气抽排','在实际入口含气或容器真空结构中服务排废，配合菌体状态、泡沫和废液瓶。满液、堵塞及维护后密封纳入系统互锁。'),
      role('monitoring','支路异常进入恢复控制','提供指定位置的压力或气泡信息，配合断电、空料及堵塞阶段记录。控制器核对实际容器、累计物料及未完成动作后决定继续或终止。'),
      role('connections','长时接液及模块密封连接','连接培养容器、各供料、采样及废液模块，按温度、运行周期和维护程序确认材料与密封。拆装后复核污染边界及实际路径再恢复自动运行。'),
    ],
  },
};

export function getTopicProductRoles(kind:EnglishApplicationKind,group:string) {
  return reviewProductRoles[kind]?.[group] ?? [];
}
export function productRoleAnchor(key:ProductRoleKey) { return `product-role-${key}`; }
export function getProductRoleNavigation(kind:EnglishApplicationKind,group:string) {
  return getTopicProductRoles(kind,group).map(item=>({label:`${productFamilies[item.key].label}：${item.duty}`,href:`${applicationArticleHref(kind,group)}#${productRoleAnchor(item.key)}`}));
}

function roleLabel(item:ProductApplicationRole) {
  if(item.products?.length===1 && item.key==='monitoring') return item.products[0]==='abd'?'气泡检测模块':'压力检测模块';
  if(item.products?.length===1 && item.key==='connections') return item.products[0]==='tubing'?'管材':'接头';
  return productFamilies[item.key].label;
}
function roleExplanation(item:ProductApplicationRole) {
  if(item.products?.length===1 && item.key==='monitoring') return item.products[0]==='abd'
    ? 'ABD在指定管路提供配置允许的气泡或液体状态信号。检测位置、管材、尺寸、真实介质和动作时间窗共同确认，控制器关联受影响的样本或任务。'
    : 'PDM5在指定位置提供压力信息。具体量程、接液配置、采样及动作时间窗共同确认，控制器结合阀位和正常负载定位异常。';
  const explanation=productFamilies[item.key].explanation;
  if(!item.products) return explanation;
  if(item.key==='piston') return explanation.replace('EA、SM与TM',item.products.map(id=>id.toUpperCase()).join('、'));
  if(item.key==='syringe' && item.products.length===1) return item.products[0]==='hld'
    ? 'HLD结合旋转阀组织来源与出口，注射驱动完成吸取、保持和推出。容量预算、有效行程、阀位及补液位置按具体配置共同核对。'
    : 'HMD结合电磁阀组织吸排路径，按实际开闭和失电状态确认去向。容量预算、有效行程及补液位置按具体配置共同核对。';
  if(item.key==='liquidPump') return explanation.replace('DPL30、DPL60与DPL30H',item.products.map(id=>id.toUpperCase()).join('、'));
  return explanation;
}
export function productRoleSections(roles:readonly ProductApplicationRole[],title='常用产品在本设备中的作用'):ApplicationSection[] {
  if(!roles.length) return [];
  return [{id:'product-roles',title,blocks:[
    {type:'table',caption:'产品、所在支路与职责对照',headers:['产品类别','承担的具体作用'],rows:roles.map(item=>[roleLabel(item),item.duty])},
    {type:'links',items:roles.map(item=>({label:`${roleLabel(item)}：${item.duty}`,href:`#${productRoleAnchor(item.key)}`}))},
  ]},...roles.map((item):ApplicationSection=>{
    const family=productFamilies[item.key];
    const products=item.products??family.products;
    return {id:productRoleAnchor(item.key),title:`${roleLabel(item)}：${item.duty}`,blocks:[
      {type:'paragraph',text:item.detail},
      {type:'paragraph',text:roleExplanation(item)},
      {type:'links',items:products.length ? products.map(key=>({label:`核对${reviewProductCards[key].title}的配置`,href:reviewProductCards[key].href})) : [{label:'讨论软管夹闭与路径条件',href:'/en/contact/'}]},
    ]};
  })];
}

export function addTopicProductRoles(kind:EnglishApplicationKind,group:string,document:ApplicationDocument):ApplicationDocument {
  const roles=getTopicProductRoles(kind,group);
  if(!roles.length) return document;
  return {...document,sections:document.sections.flatMap(section=>section.id==='fluid-path' ? [section,...productRoleSections(roles)] : [section])};
}

export function addHubProductRoles(kind:EnglishApplicationKind,document:ApplicationDocument):ApplicationDocument {
  const groups=reviewProductRoles[kind];
  if(!groups) return document;
  const keys=[...new Set(Object.values(groups).flatMap(roles=>roles.map(item=>item.key)))];
  return {...document,sections:document.sections.map(section=>section.id==='candidate-selection' ? {...section,title:'常用产品在本领域中的作用',blocks:[
    {type:'table',caption:'进入设备专题查看具体支路与配合方式',headers:['产品类别','本领域的主要作用'],rows:keys.map(key=>[productFamilies[key].label,[...new Set(Object.values(groups).flatMap(roles=>roles.filter(item=>item.key===key).map(item=>item.duty)))].join('；')])},
  ]} : section)};
}

// Existing component/task articles retain their URLs and explain the relevant
// products before their sizing and validation material.
export const guideProductDuties: Record<string,Partial<Record<ProductRoleKey,string>>> = {
  'piston-sample-transfer':{piston:'在生化取样针的驱动端形成受控位移，将方法规定的样本送入反应位置。配合针端位置、系统液界面和针洗序列，区分交付偏差与样本间污染。',probe:'形成样本容器与反应位置之间的吸取接口，配合计量位移与运动。最低液位、针口间隙及残液决定取样动作的实际边界。'},
  'piston-reagent-dispensing':{piston:'在生化试剂计量支路交付规定剂量，并按循环安排补液。与阀位、针端和反应杯身份配合，比较首、中、末剂及补液后的第一剂。'},
  'piston-pump':{piston:'在分析系统适用的离散计量支路产生受控位移，服务样品、标准或试剂交付。EA、SM与TM按工作量和安装条件比较，再通过针端或接收容器确认实际液量。'},
  'piston-dilution':{piston:'在自动稀释中分别交付原样和稀释剂，与混合容器和再取样步骤建立实际体积比例。共享段残留、低剂量偏差与混匀一起评价。',rotary:'选择原样、稀释剂或维护来源，配合计量动作形成当前稀释路径。端口位置与置换量明确，避免上一组成改变实际比例。'},
  'piston-titration':{piston:'在适用滴定架构中将滴定剂按实际步进液量加入反应容器，配合混匀、等待与终点读取。累计加液与实际到达分别记录，反应结果用于评价终点程序。'},
  'syringe-pump':{syringe:'在分析液路中执行吸取、保持和推出，配合阀路组织取样、分配或比例配制。HLD与HMD的来源连接、通断及补液周期按具体配置比较。'},
  'syringe-sampling':{syringe:'在取样针的驱动端组织样本吸取和向接收位置的转移，配合来源容器及阀位。比较低余量、共享段残留及真实样本条件下的接收量。',probe:'形成来源容器中的样本吸取接口，配合驱动、液位与运动。针端位置、挂液及样本切换清洗共同决定实际转移结果。'},
  'syringe-distribution':{syringe:'一次吸取后按程序向多个容器分配，配合出口状态与接收身份。核算有效行程、各剂交付和保留量，并把补液插在允许位置。'},
  'syringe-dilution':{syringe:'分别吸取并交付母液、稀释剂或内标，配合混合及后续再取样。各路实际体积形成配制比例，超量程处理按分析方法验证。',rotary:'连接当前母液、稀释剂或洗液来源，配合吸排顺序和共享段置换。多级配制时记录各级组成及去向。'},
  'syringe-sequential':{syringe:'在顺序注射或流动分析的适用架构中组织液段吸取、保持与推出，配合选择阀、保持路径及反应检测端。液段顺序、到达延迟与信号一起验证。',rotary:'依次连接样品、试剂和载液来源，配合注射驱动构建方法规定的液段。端口状态及共享体积进入完整操作程序。'},
  'pipetting-pump':{pipetting:'在一次性吸头分析平台中提供空气置换驱动，配合密封、液体类别及运动完成样本转移或配液。工作液量、吸头内状态和接收结果一起评价。'},
  'pipette-transfer':{pipetting:'驱动吸头从来源容器取得样本并送到目标容器，配合浸入位置、取弃头和容器身份。低余量、挂液和密封异常按完整转移过程检查。'},
  'pipette-dilution':{pipetting:'在吸头式稀释中分别转移原样和稀释剂，配合混合动作及必要的多次分配。接收比例、空气间隔和首末剂分别核算。'},
  'pipette-preparation':{pipetting:'在方法规定的吸头式前处理中移取样本或目标相，配合界面、吸液高度及接收容器。保留、弃液与产物转移分开设置，以回收和空白检查完整操作。'},
  'valveless-pump':{valveless:'在适用分析支路中通过对应驱动与排量提供重复剂量或辅助持续输出，配合真实介质、背压及接收端。每转排量、每次交付与每分钟流量分别用于选择。'},
  'valveless-dispensing':{valveless:'在适用分装支路重复输出试剂，配合启停、喷嘴及容器节拍。首、中、末剂和待机后首剂单独测量，再核对批次累计量。'},
  'valveless-titration':{valveless:'在适用滴定架构中输出滴定剂，配合混匀、读取等待及终点程序。按实际每次增量和停止后交付检查终点附近的控制。',piston:'作为有限行程离散计量方案参与比较，按实际末段增量、补液与接收条件核对。与无阀驱动按同一滴定任务评价实际加液和终点表现。'},
  'valveless-continuous':{valveless:'在实际方法允许的载液或流通池辅助支路提供持续流量，配合路径阻力和检测端。流量波动、累计量、到达延迟及维护恢复分别记录。'},
  'valveless-proportion':{valveless:'在双路配液配置中输出各路液体，配合对应驱动、真实负载及混合位置形成比例。DRPL等双路配置按实际到达体积、同步时序和混合组成验证。'},
  'diaphragm-pump':{liquidPump:'在清洗、补液或辅助循环的液体支路提供供液，配合管路、阀、洗头及容器阻力确定工作点。纯液输送与含气抽吸按各自入口介质配置。',gasLiquidPump:'在适用气体或气液混合抽吸支路服务洗站或容器真空，配合废液去向和满液控制。实际抽排能力以入口状态和峰值来液验证。'},
  'diaphragm-liquid':{liquidPump:'从洗液或工作液来源向使用位置供液，配合预充、出口阻力和任务窗口。按装机流量检查清洗覆盖、首轮供液及缺液恢复。'},
  'diaphragm-replenishment':{liquidPump:'将工作液送入实际补液容器或供液位置，配合来源通气、液位及补液互锁。比较低液位、换瓶和预充恢复，避免来源异常影响后续计量。'},
  'diaphragm-circulation':{liquidPump:'在实际辅助循环路径中驱动液体回路，配合储液容器、排气和全路径阻力。按温度、运行周期及气泡状态检查真实循环，反应或过程结果另行评价。'},
  'diaphragm-gas-liquid':{gasLiquidPump:'在含气洗站入口或适用废液容器真空架构中抽吸，配合管路提升、来液峰值及满液互锁。空气流量、实际液体排出和积液分别测量。'},
  valves:{rotary:'在多来源低压辅助支路选择样品、试剂或洗液，配合计量驱动与共享段置换。端口数量与独立同步供液能力分别确认。',highPressure:'在适用受压进样路径中切换定量环及分析连接，配合装载和注入时序。各状态端口压力与实际环配置共同核对。',solenoid:'在实际通断或两路选择支路控制开闭，配合泵、旁路和失电去向。按压差、流向及泄漏确认隔离。'},
  'valve-multiport':{rotary:'将当前样品、试剂、标准或洗液来源连接到驱动和接收端，配合端口状态表。共享段残留与新组成到达决定置换量及允许测量时点。'},
  'valve-high-pressure':{highPressure:'在受压定量环进样架构中连接装载、排废和注入路径，配合样本装环及分析系统状态。环装载体积、材料和各端口压力分别核对。'},
  'valve-diversion':{solenoid:'在压差和介质允许的旁路配置中控制支路开闭或两路选择，配合检测器保护及废液去向。切换压力扰动、泄漏和信号恢复一起评价。',highPressure:'在实际受压路径需要时承担对应的切换职责，按端口图与各状态压力比较配置。具体能否用于检测器分流以所需流路和阀配置确认。'},
  'valve-solenoid':{solenoid:'在支路中执行控制程序要求的通断或两路选择，配合泵启动、停止和维护互锁。失电状态、实际响应与关闭泄漏分别检查。'},
  probes:{probe:'在样本容器与驱动路径之间形成取样及交付接口，配合运动和计量。针端间隙、低余量及挂液与样本切换清洗一起评价。',washProbe:'在针洗或容器洗涤工位形成洗液和吸液接口，配合供液、抽排和容器位置。覆盖、残液与下一样本恢复分别检查。',mixing:'在需要机械混匀的反应容器中通过实际几何和运动组织混合，配合加液及读取时间。混合均匀性、泡沫和方法响应共同验收。'},
  'probe-sampling':{probe:'形成来源容器中的吸取位置及目标端交付接口，配合液位与运动。最低余量、颗粒风险和针口挂液用于评价真实采样范围。',piston:'在适用采样架构中为针端提供受控计量位移，配合接液路径和清洗。实际针端接收量与样本间携带污染分别验证。'},
  'probe-washing':{washProbe:'在针洗工位将洗液引到内外针表面或形成残液吸除接口，配合针位置及接触时长。实际污染表面和清洗后的空白用于检查恢复。',liquidPump:'从洗液容器向洗站供液，配合洗头与出口阻力覆盖需要清洗的位置。清洗窗口和峰值来液与排废支路协调。',gasLiquidPump:'在适用含气或容器真空架构中为洗站排液提供抽吸，配合来液和满液控制。排空和积液实际测量后检查下一次针洗恢复。'},
  'probe-vessel-washing':{washProbe:'在反应杯或孔板中形成洗液加入及残液吸除接口，配合容器几何、孔位和运动。吸液高度、清洗覆盖与方法需要保留的固相一起评价。',liquidPump:'向实际洗头或歧管输送洗液，配合供液支路阻力与并发需求。总量与各杯或各孔交付分别核对。',gasLiquidPump:'在实际含气抽吸或容器真空结构中服务排液，配合逐孔吸液与供液峰值。按入口状态检查残液、积液和废液瓶保护。'},
  'probe-mixing':{mixing:'在反应容器内通过实际桨形及运动促进方法规定的混匀，配合加液顺序与读取窗口。均匀性、泡沫、飞溅及清洗恢复在真实方法中验证。'},
  monitoring:{monitoring:'在实际液路位置分别采集气泡或压力信号，与当前动作阶段和控制程序关联。液路异常识别、真实交付及方法结果属于不同验收记录。'},
  'monitor-bubble':{monitoring:'在选定透明管位置识别配置允许的气泡或液体状态，配合管材、尺寸和液体确认基线。控制器结合流速及动作窗口决定受影响剂次与恢复步骤。'},
  'monitor-pressure':{monitoring:'在选定液路位置记录压力及其变化，配合阀位、泵动作和采样时序建立正常基线。堵塞、空源或泄漏按任务阶段及相关信息定位。'},
  fluidics:{connections:'在液源、泵阀、使用端和废液之间形成实际输送及密封路径。管材、通径、长度和端口几何共同影响负载、共享体积及维护恢复。',filter:'在方法允许的位置截留颗粒或保护元件，配合分析对象及真实介质选择孔径和滤材。目标物、空白与新增压降分别验收。',checkValve:'在实际支路限制反向流动，配合泵停止、阀位及容器压力核对开启条件和泄漏。另行识别正向虹吸及停止后残滴。'},
  'fluidics-tubing':{connections:'将各液体模块连接为实际路径，按配方、内外径和长度核对负载及共享体积。压力、温度与长期接触条件用于比较材料和尺寸，维修后重新预充。'},
  'fluidics-fittings':{connections:'在管端与模块端口之间形成定位和密封，配合实际外径、螺纹及孔底结构。装配间隙、误配与新增残留体积进入低体积交付及清洗恢复检查。'},
  'fluidics-protection':{filter:'在分析方法允许的位置截留颗粒，配合目标组分定义和真实管路选择滤材。保护前后回收、空白、压降及更换首轮一并评价。',checkValve:'在需要回流限制的支路建立允许方向，配合泵工作点核对开启压力和反向泄漏。新增阻力与停机回流或虹吸分别检查。'},
};
const cardRole:Record<string,ProductRoleKey>={pistonPump:'piston',syringePump:'syringe',pipettingPump:'pipetting',valvelessPump:'valveless',diaphragmPump:'liquidPump',gasLiquidPump:'gasLiquidPump',rotaryValve:'rotary',solenoidValve:'solenoid',highPressureValve:'highPressure',sensors:'monitoring',fittings:'connections',tubing:'connections',filters:'filter',checkValve:'checkValve'};
function productCardRole(id:ReviewProductCardId):ProductRoleKey {
  return id==='sampling'?'probe':id==='washing'?'washProbe':id==='mixing'?'mixing':cardRole[reviewProductCards[id].family];
}
const guideRoleLabels:Record<ProductRoleKey,string>={piston:'离散液量驱动',syringe:'吸取、保持与推出',pipetting:'吸头式吸取与交付',valveless:'重复或持续计量',liquidPump:'液体供给与循环',gasLiquidPump:'适用的含气抽吸',rotary:'来源或去向选择',solenoid:'支路通断与隔离',highPressure:'受压进样路径切换',probe:'取样与交付接口',washProbe:'供液与吸液接口',mixing:'容器内混匀',monitoring:'状态信号与控制联动',connections:'实际路径与密封连接',filter:'方法允许的颗粒截留',checkValve:'回流限制',pinch:'软管隔断'};
function getGuideProductRoles(kind:EnglishApplicationKind,document:ApplicationDocumentMetadata):ProductApplicationRole[] {
  if(!reviewProductRoles[kind]) return [];
  const duties=guideProductDuties[document.slug];
  if(!duties) return [];
  const cards=getReviewFooterPlan(kind,{...document,intro:[],sections:[],references:[]}).products;
  const keys=[...new Set(cards.map(productCardRole))];
  return keys.map(key=>{const detail=duties[key];if(!detail) throw new Error(`Missing product duty: ${document.slug}/${key}`);return {...role(key,guideRoleLabels[key],detail),products:cards.filter(id=>productCardRole(id)===key)};});
}
export function getGuideProductRoleNavigation(kind:EnglishApplicationKind,document:ApplicationDocumentMetadata) {
  return getGuideProductRoles(kind,document).map(item=>({label:`${roleLabel(item)}：${item.duty}`,href:`/en/applications/${kind}/${document.slug}/#${productRoleAnchor(item.key)}`}));
}
export function addGuideProductRoles(kind:EnglishApplicationKind,document:ApplicationDocument):ApplicationDocument {
  const roles=getGuideProductRoles(kind,document);
  if(!roles.length) return document;
  return {...document,sections:document.sections.flatMap(section=>section.id==='system-position'?[section,...productRoleSections(roles,'本任务中的产品分工')]:[section])};
}
