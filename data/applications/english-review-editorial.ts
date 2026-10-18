import type { ApplicationBlock, ApplicationDocument, ApplicationReference } from './analytical-documents/types';
import type { EnglishApplicationKind } from './application-english';
import { applicationArticleHref } from './application-article-links';

export type ReviewTopicEditorial = {
  label: string;
  summary: string;
  focus: [string, string, string];
  questions: [string, string][];
  scope?: string;
  references?: ApplicationReference[];
  sectionBlocks?: Record<string, ApplicationBlock[]>;
  relatedGuides?: { label: string; href: string }[];

};
type ReviewDomainEditorial = {
  indexTitle: string;
  comparisonTitle: string;
  topics: Record<string, ReviewTopicEditorial>;
  inputs: [string, string][];
  evidence?: string;
};

// Enable one domain only after reviewing its content. Established English LC
// documents bypass this module; banner copy, CSS and source workflows are intact.
export const reviewEditorialDomains: Partial<Record<EnglishApplicationKind, ReviewDomainEditorial>> = {
  ivd: {
    indexTitle: '按诊断仪器类型进入专题',
    comparisonTitle: '五类诊断仪器的液路重点',
    evidence: '先在实际样本或试剂、针端、管路和时序下测量交付、切换与排废，再按具体诊断方法评价携带污染、反应杯背景、检测通道恢复或提取结果。计量合格与方法结果合格分别记录，并覆盖最低工作量、低余量、换瓶、待机和维护后的首轮。',
    inputs: [
      ['检测架构', '仪器类型、检测方法、固定针或吸头、直接接液或系统液驱动'],
      ['工作量与时序', '样本和各试剂的最小、常用、最大剂量，补液及反应时间窗口'],
      ['清洗与排废', '污染表面、洗液、峰值来液、残液及废液容器状态'],
      ['验收与恢复', '液量偏差、携带污染或方法背景目标，受影响杯或孔及重试规则'],
    ],
    topics: {
      clinical: {
        label: '生化分析仪', summary: '样本与试剂计量、针杯清洗及下一反应杯恢复。',
        focus: ['样本和试剂交付，针内外及反应杯清洗', '接液架构、工作行程、共享体积与检测节拍', '杯端液量、样本间携带污染及清洗后的方法结果'],
        questions: [
          ['样本量偏低和携带污染偏高，能用同一次校准解决吗？', '先分别测量反应杯接收量和高低样本切换后的残留。液量异常检查空吸、密封、针端和工作行程；污染异常检查针内、针外、共享段及杯洗。确认异常来源后，再调整对应程序。'],
          ['补液后第一杯异常，应先检查哪里？', '先核对补液结束时的阀位、有效液柱和针口状态，再比较首剂与后续剂。保留已加液的反应杯身份，确认是否存在部分交付，避免重发命令造成重复加液。'],
        ],
      },
      immunoassay: {
        label: '免疫分析仪', summary: '分开评价加液、固相分离洗涤和检测背景。',
        focus: ['样本及试剂加入，方法需要的固相分离与洗涤', '固相形式、洗涤轮次、吸液位置与底物路径', '实际交付、固相保留、洗后残液及方法背景'],
        scope: '本页重点讨论带固相分离洗涤的免疫分析，磁珠洗涤部分以磁性颗粒架构为例。先确认具体方法是否需要分离洗涤以及固相形式；其他架构按实际设备流程确定对应支路。这里的泵阀候选并不代表整机检测性能。',
        references: [{ id: 'immunoassay-architecture', title: 'Beckman Coulter Access：磁性固相分离、洗涤与底物检测的具体方法示例', href: 'https://www.beckmancoulter.com/download/file/phxD00913C-EN_US/D00913C?type=pdf' }],
        sectionBlocks: { 'task-immunoassay-beadWash': [
          { type: 'paragraph', text: '在磁性颗粒固相架构中，磁捕获后协调洗液加入、混合与吸液，保留固相并去除未结合成分。检查磁捕获时间、洗头覆盖、吸液高度、残液与排废积液，再用完整方法背景评价洗涤。其他固相形式按对应设备流程设置。' },
        ] },
        questions: [
          ['每次加液体积一致，为什么背景仍可能偏高？', '加液和分离洗涤是两项验收。对于磁珠架构，还要检查磁捕获、洗头覆盖、吸液高度、洗后残液及排废积液；用完整方法的背景结果判断洗涤恢复，不能只增加供液量。'],
          ['磁珠试剂、底物和洗液能共用一路吗？', '先明确各配方的接液、待机和清洁要求，再验证最差来源切换后的共享段残留与方法背景。阀有多个端口仅说明可以选择路径，共用与隔离方案需要单独确认。'],
        ],
      },
      hematology: {
        label: '血液分析仪', summary: '区分全血取样、稀释计量和检测通道供液。',
        focus: ['全血取样、稀释及各检测通道更新', '混匀与低余量、实际稀释比例及通道流量或压力', '取样和稀释结果、通道空白、气泡及检测恢复'],
        scope: '不同血液分析仪可采用不同检测原理与通道配置。稀释剂、溶血剂和鞘液的使用位置以具体方法为准；涉及鞘流的条件不能套用到全部计数通道。',
        references: [{ id: 'hematology-architecture', title: 'Sysmex 血液分析仪对照：阻抗和荧光流式检测配置', href: 'https://www.sysmex.com/-/media/project/sysmex/sysmex/documents/brochures/sysmex-pol-analyzers-comparison.pdf?sc_lang=en-us' }],
        sectionBlocks: { 'task-hematology-dilution': [
          { type: 'paragraph', text: '稀释液与方法需要的溶血剂按规定剂量加入，分别核对样本和各试剂在反应位置的实际比例。设备采用鞘流检测时，另行说明该支路的供液流量、压力和稳定性，不把鞘液供给等同于一次稀释加液。' },
          { type: 'paragraph', text: '将交付偏差、共享段残留和混匀纳入比例验证。命令体积一致只说明设定相同，不能代替接收体积和检测结果的测量。' },
        ] },
        questions: [
          ['取样重复性合格，稀释或计数仍异常时查什么？', '分别核对样本和稀释液在反应位置的实际交付、混匀及通道更新。将体积比例与检测支路的流量、压力和气泡分开检查，避免用一种计量指标解释全部结果。'],
          ['压力曲线变化是否就说明有凝块？', '压力还受液源、气泡、阀位和正常负载影响。按取样、加液和检测阶段比较基线，结合液位或气泡信息定位，再由方法程序处理受影响样本。'],
        ],
      },
      coagulation: {
        label: '凝血分析仪', summary: '把液量交付、实际到达和反应计时对应起来。',
        focus: ['方法规定的样本和试剂交付', '加液顺序、实际到达、温控和检测触发', '液量与到达时刻，以及对应方法的完整反应结果'],
        scope: '凝血设备可能运行凝固、发色底物或免疫比浊等不同检测方法。本页讨论液体交付与反应时序的配合；具体反应起点、预孵育和读数规则按方法定义，不把所有项目简化为同一个凝固终点。',
        references: [{ id: 'coagulation-architecture', title: 'Sysmex CA-600：凝固、发色底物和免疫比浊方法配置', href: 'https://www.sysmex.com/en-us/lab-solutions/hemostasis/sysmex-ca-600-series' }],
        questions: [
          ['泵运动完成，可以直接作为反应起点吗？', '先测针口实际出液、到达反应位置与控制事件之间的关系。检测起点按具体方法设置；管长、针或动作速度变化后，应复核液量、到达延迟和混匀。'],
          ['加快排液能否直接缩短检测节拍？', '同时检查接收位置、残滴、飞溅、泡沫和方法规定的等待窗口。只缩短电机动作而未复核真实交付与反应过程，不能据此确认新节拍有效。'],
        ],
      },
      molecular: {
        label: '分子诊断', summary: '区分试剂转移、提取洗涤、洗脱回收与扩增配液。',
        focus: ['样本处理、试剂转移、提取及反应体系准备', '提取架构、固相或产物去向、耗材与区域边界', '回收、洗液残留、污染空白及下游方法可用性'],
        scope: '本页流程以包含核酸提取的诊断工作站为例。磁珠提取既有移液操作，也有磁棒转移磁珠的架构；结合、洗涤和洗脱并不都需要泵驱动的固定液路。先区分需要搬运液体的动作、固相转移和下游配液，再讨论元件。',
        references: [{ id: 'molecular-architecture', title: 'Thermo Fisher KingFisher：通过转移磁珠完成结合、洗涤与洗脱', href: 'https://www.thermofisher.com/fr/fr/home/bioprocessing/products/pharmaceutical-analytics/sample-prep-automation/sample-purification-instruments.html' }],
        sectionBlocks: { 'task-molecular-wash': [
          { type: 'paragraph', text: '采用移液并保留固相的架构时，洗涤移除上清，洗脱后回收产物，需要分别确定吸液高度、允许残液和接收去向。采用磁棒转移磁珠的架构时，重点核对固相转移、试剂孔位和产物接收，并明确哪些补液或转移环节才需要液体驱动元件。' },
          { type: 'paragraph', text: '分别评价产物接收量、目标物回收、洗液残留与下游抑制风险。液量、提取结果和污染空白是不同的证据，均需结合完整方法判断。' },
        ] },
        questions: [
          ['洗涤和洗脱能使用同一套吸液设置吗？', '先确定动作保留的是固相还是洗脱产物，以及采用移液或磁珠转移架构。洗涤的弃液、洗脱的产物回收和下游配液具有不同去向，吸液高度、残液及耗材规则分别确定。'],
          ['转移体积合格，是否说明提取和污染控制也合格？', '还需按完整方法检查目标物回收、洗液或抑制物残留、阴性空白和下游反应。先定位产物损失或污染发生在哪一步，再调整材料、清洗或操作程序。'],
        ],
      },
    },
  },
  'life-science': {
    indexTitle: '按实验样本与处理任务进入专题', comparisonTitle: '五类生命科学任务的验收差异',
    evidence: '液体交付量与实验结果分开记录。核酸任务检查回收、残液和下游可用性，细胞任务检查回收与细胞状态，蛋白任务检查完整路径的回收和方法响应。覆盖低体积、样本切换、换液和恢复首轮，平台动作完成后仍需核对实际实验结果。',
    inputs: [['实验对象','核酸、细胞或蛋白，真实配方、浓度与温度'],['保留与去向','固相或产物位置、弃液与接收容器、允许残液'],['操作条件','工作体积、耗材或固定路径、接液周期与平台动作'],['验收目标','回收、空白、细胞状态或方法响应，以及中断处理']],
    topics: {
      genomics: {
        label:'核酸处理', summary:'把洗涤弃液、洗脱产物和下游反应分别验证。',
        focus:['样本准备、洗涤与洗脱回收','保留对象、提取架构、残液和耗材','回收、污染空白及下游反应'],
        scope:'本页讨论核酸处理中的液体操作。磁珠提取需先确认采用移液还是磁珠转移架构，泵仅对应实际需要的液体动作；不将所有分离步骤都解释为固定管路中的泵送。',
        references:[{id:'genomics-architecture',title:'Thermo Fisher KingFisher：磁珠转移的结合、洗涤和洗脱流程',href:'https://www.thermofisher.com/fr/fr/home/bioprocessing/products/pharmaceutical-analytics/sample-prep-automation/sample-purification-instruments.html'}],
        sectionBlocks:{'task-washElution':[{type:'paragraph',text:'先确认分离架构。移液并保留固相时，分别安排上清移除、残余洗液去除、洗脱和产物收集；磁棒转移磁珠时，按试剂孔位和固相转移程序安排操作。使用液体驱动的环节再核对吸液高度、完整接液路径和实际产物接收量。'}]},
        questions:[['洗涤排得更干，是否一定提高回收？','同时观察固相损失、残余洗液和后续洗脱。先明确方法允许的残液和保留对象，再调整高度与动作，不能只用排空程度判断流程。'],['液体量合格而下游反应异常，查什么？','分开检查产物回收、洗液或抑制物残留和污染空白，定位变化发生在提取、转移还是配液阶段。']],
      },
      cellCulture: {
        label:'细胞培养与转移', summary:'培养基补液和细胞悬液转移使用不同验收目标。',
        focus:['培养基补充与细胞悬液转移','供给模式、通径、停留及真实培养条件','补液累计量、细胞回收和细胞状态'],
        questions:[['培养基输送合格，能否直接用于细胞转移？','细胞悬液还需按真实通径、压差和停留条件比较转移前后的回收、活率及团聚。培养基的供液测试不能代替这项评价。'],['停流后恢复供液，先核对什么？','核对容器中的累计量、液柱和换瓶状态，再检查恢复首段；由实验要求确定允许中断和是否继续培养。']],
      },
      automation: {
        label:'实验流程自动化', summary:'液体操作、清洗和身份记录共同服务实验结果。',
        focus:['实验移液、清洗及多工位转移','液体类别、接液方式、耗材与样本身份','真实交付、空白和后续实验结果'],
        scope:'本页解释自动化动作如何服务核酸、细胞和蛋白实验。通道并行、资源调度和机器人平台集成在实验室自动化领域展开。',
        questions:[['同一移液程序能覆盖核酸、蛋白和细胞吗？','先按实际液体、耗材、接收位置和保留目标设置程序，再分别验证交付与实验结果；清洗和污染验收也按样本类型确定。'],['工位动作完成，如何确认实验步骤完成？','把样本身份、目标容器和已交付状态对应起来，同时核对实际接收和下一步骤允许条件。']],
      },
      protein: {
        label:'蛋白与抗体处理', summary:'分开检查液量、目标物回收和缓冲液切换。',
        focus:['蛋白转移、缓冲液选择与上样','真实配方、接液表面、停留和受压位置','完整路径回收、组成更新与方法响应'],
        questions:[['清水体积校准通过，为什么还要测蛋白回收？','水校准用于液量；真实蛋白还需经过实际材料、全部连接和容器后比较回收及方法响应。先区分体积损失和目标物变化。'],['缓冲液阀已切换，能立即进入下一步吗？','共享段仍有上一组成。结合体积估算和可测信号确认新组成到达，并按所在支路核对压力状态。']],
      },
      bioProcess: {
        label:'过程补料与采样', summary:'单次操作、样品更新和过程体积一起核算。',
        focus:['实验过程的补料、采样与排液','供给模式、弃样预算、维护与污染边界','单次及累计物料、代表性和恢复状态'],
        questions:[['采样弃液需要计入过程体积吗？','将取样、路径更新弃液和排液一并纳入体积记录，再检查样本代表性与接收去向。'],['更换部件后能立即恢复长周期运行吗？','先复核装配、密封、预充和污染边界，再核对实际累计状态；长周期控制与中断处理参见合成生物专题。']],
      },
    },
  },
  'lab-automation': {
    indexTitle:'按平台与工位任务进入专题', comparisonTitle:'五类自动化工位的配置重点',
    evidence:'按工位记录实际交付、首末剂和孔位差异，再核对样本身份、污染恢复与资源调度。并发测试覆盖公共供液和排废峰值；中断测试分别覆盖未交付、部分交付和交付完成，检查续做或重试是否导致错投与重复加液。',
    inputs:[['平台与容器','工位、针或吸头、板型及实际接收位置'],['工作量与节拍','单次量、剂数、孔数、批次时间及补液窗口'],['共享资源','泵阀、洗站、歧管和废液的占用与并发条件'],['恢复规则','容器身份、已交付状态、允许续做或重试的步骤']],
    topics:{
      samplePrep:{
        label:'样本准备平台',summary:'让移液、清洗和共享资源服务具体方法。',
        focus:['多工位移液、洗涤与产物转移','耗材、保留目标、公共资源与节拍','工位交付、残液、回收及方法结果'],
        questions:[['工位都能单独运行，为什么并发时失败？','核对共享泵阀、供液和排废资源的占用与峰值，再检查实际接收及清洗窗口。单工位通过不能说明并发资源充足。'],['平台更换模块后需要复核什么？','核对模块身份、液路方向、长度和内径，再完成密封、预充和各工位交付验证。']],
      },
      pipetting:{
        label:'自动移液',summary:'一起核对驱动、针头或吸头、液体类别和运动。',
        focus:['单次移液与一次吸取多次分配','置换方式、密封、液体类别及可用行程','实际接收量、首末剂和序列污染'],
        scope:'本页比较固定针液体置换和一次性吸头空气置换这两类候选方案。针或耗材形态本身不能替代驱动架构确认，实际置换方式及接液范围以设备设计为准。',
        references:[{id:'pipetting-architecture',title:'Hamilton 空气置换移液通道及吸头、监测和运动技术',href:'https://www.hamiltoncompany.com/technologies/fluid-motion'}],
        sectionBlocks:{'task-dispensing':[{type:'paragraph',text:'一次吸取多次分配时，按实际程序核算各剂交付、空气间隔、首末剂和保留量，并标记每个通道与接收位置。标称容量不能全部当成可分配试剂；比较首、中、末剂和补液后的首剂，而不只测平均值。'}]},
        questions:[['标称容量就是一次可分配的试剂总量吗？','按实际工作行程和程序核算空气间隔、保留量及各剂交付，再确定补液位置。验证针或吸头端实际接收量。'],['一次性吸头可以完全替代清洗验证吗？','按耗材策略验证取头密封、换头和弃头，并用样本序列检查污染；固定针则另外评价内外针清洗与排废。']],
      },
      microplate:{
        label:'孔板供液与洗涤',summary:'分开检查逐孔液量、残液和并发供排液。',
        focus:['孔位分配及方法需要的孔板洗涤','板型、供排峰值、歧管和洗头高度','逐孔交付、残液与整板方法结果'],
        scope:'固相保留与洗涤条件适用于包含该任务的孔板方法。单纯分装或其他板式操作按实际工位设置；阀端口数不代表可以独立同步供液的通道数量。',
        questions:[['总供液量合格，为什么部分孔仍偏低？','按各孔或各支路检查堵孔、泄漏、阻力和接收高度，并覆盖首末孔、边缘孔及并发动作。总量校准可能掩盖局部差异。'],['减小洗后残液时还要观察什么？','同时检查方法需要保留的固相、泡沫和整板背景，并确认吸液高度与排废峰值。']],
      },
      reagentDispensing:{
        label:'试剂分装',summary:'比较逐剂交付、补液停顿和换瓶首剂。',
        focus:['重复分配与批次节拍','循环总量、启停、真实配方和补液','首中末剂、换瓶首剂及受影响容器'],
        questions:[['批次平均值合格，是否还需要检查首末剂？','分别记录启动、连续分配、末剂以及待机或换瓶后的首剂，定位瞬态和稳态差异，再评价整批交付。'],['缺液恢复后能重发上一剂命令吗？','先确认该容器是否已部分或全部接收，再按程序选择续做、弃样或重新开始，避免重复交付。']],
      },
      systemIntegration:{
        label:'平台液路集成',summary:'把通信、真实液路与容器状态连到同一任务记录。',
        focus:['资源占用、模块接口及故障恢复','状态图、容器身份、已交付量与互锁','无错投或重复动作，维护后可复核'],
        questions:[['通信指令成功，是否代表液体已交付？','还要核对液路方向、来源与接收位置及实际液体结果。模块识别和动作完成分别与对应工作点记录关联。'],['所有报警都能用同一种重试策略吗？','区分未交付、部分交付和已交付后的中断，并记录当前容器和资源状态；按阶段定义允许续做或重新开始的条件。']],
      },
    },
  },
  'analytical-instruments': {
    indexTitle:'按分析仪器类型进入专题',comparisonTitle:'分析仪器的液路职责对照',
    inputs:[['仪器与方法','接收端、样品基体、分析目标和允许预处理'],['工作点','离散剂量或连续流量、各状态压力及控制时序'],['路径','共享体积、阀状态、清洗与废液去向'],['验收','真实交付、空白、方法响应与维护后的恢复']],
    topics:{
      spectroscopy:{
        label:'光谱与元素分析',summary:'区分标准配制、稀释、换样冲洗和液体引入。',
        focus:['液体样品输送、标准配制与来源切换','接收端、基体、持续流动及置换','实际组成、空白恢复和方法响应'],
        scope:'本页聚焦采用液体样品的元素分析及其辅助液路。固体、气体或其他光谱架构按实际引入装置讨论；这里的候选不能仅凭流量或容量直接替代原机样品引入配置。',
        relatedGuides:[{label:'注射泵标准配制与稀释',href:'/en/applications/analytical-instruments/syringe-dilution/'},{label:'连续载液与流通池供给',href:'/en/applications/analytical-instruments/valveless-continuous/'}],
        questions:[['标准配制和仪器引入能按同一个液量指标选择吗？','配制先核对各液体体积和混合组成；引入端另需满足实际流量、压力和响应要求。先说明接收端，再比较驱动。'],['选择阀切换后为什么还需要等待？','核对共享体积、真实流量和新样品到达，使用方法空白与稳定时间验证置换；阀到位不代表组成已更新。']],
      },
      waterQuality:{
        label:'水质分析单元',summary:'关注分析柜内的样品计量、试剂反应和方法允许的保护。',
        focus:['分析单元内取样、试剂反应与保护','方法目标、样品状态、剂量与时序','反应结果、空白和更换后的首样'],
        relatedGuides:[{label:'柱塞泵自动稀释',href:'/en/applications/analytical-instruments/piston-dilution/'},{label:'过滤与止回的工作边界',href:'/en/applications/analytical-instruments/fluidics-protection/'}],
        questions:[['加装过滤器保护泵阀前先确认什么？','先确认被测组分和方法是否允许该处理，再检查目标物损失、压降、空白与更换恢复，不能仅以液路更通畅判断样品有效。'],['分析柜的计量和现场取样怎样分工？','本页核对进入分析单元后的交付与反应；取样点、输送更新和现场维护参见环保监测，分别记录各阶段验收。']],
      },
      samplePrep:{
        label:'分析样本前处理',summary:'把比例配制、萃取转相和过滤分别检验。',
        focus:['稀释、萃取、相转移及过滤','目标物所在相、接收量与方法处理','实际比例、回收、相夹带及空白'],
        relatedGuides:[{label:'吸头式前处理与回收',href:'/en/applications/analytical-instruments/pipette-preparation/'},{label:'注射泵稀释与配制',href:'/en/applications/analytical-instruments/syringe-dilution/'}],
        questions:[['稀释后的浓度不对，应直接校准泵吗？','先分别核对原样和稀释剂交付，再检查共享段残液、混匀与再取样。定位是体积、组成还是方法问题后再调整。'],['萃取时吸液高度按什么确定？','标明目标物所在相、保留与弃液去向，结合界面、容器和残液设置动作，并用回收及相夹带评价。']],
      },
      labAnalyzer:{
        label:'分析系统集成',summary:'按计量、连续供液、清洗和排废配置支路。',
        focus:['样品、标准、试剂、清洗及废液组织','逐支路驱动、端口状态与真实负载','交付、信号到达、空白与互锁恢复'],
        relatedGuides:[{label:'各类驱动职责与隔膜泵选择',href:'/en/applications/analytical-instruments/diaphragm-pump/'},{label:'来源选择、分流与隔离阀',href:'/en/applications/analytical-instruments/valves/'},{label:'液路监测与控制响应',href:'/en/applications/analytical-instruments/monitoring/'}],
        questions:[['可以用一个额定流量描述整套液路吗？','离散计量核对逐剂量，连续支路核对时间窗流量与波动，排废核对入口介质与峰值积液。逐支路验证后再检查整机方法。'],['模块接口匹配后还要验证什么？','核对装配、密封、预充、共享体积和信号到达，再验证方法空白、切换及故障恢复。']],
      },
    },
  },
  'environmental-monitoring': {
    indexTitle:'按现场采样与维护任务进入专题',comparisonTitle:'环保监测的样品路径与验收重点',
    evidence:'先在分析接口测量实际样品更新，再按目标物比较来源样品与到达样品。输送、过滤与清洗分别记录对组成和空白的影响；长期运行覆盖污堵、换液、维护旁路与断电恢复，并核对首轮有效测量的释放条件。',
    inputs:[['监测对象','水样或样气、目标组分、监测方法与允许预处理'],['现场路径','取样位置、水位或压力、距离、管内容积和接收接口'],['维护条件','污堵趋势、冲洗与排废、旁路、环境温度及维护窗口'],['有效状态','样品更新、方法检查及恢复后首轮数据的判定条件']],
    topics:{
      waterQuality:{
        label:'在线水质取样',summary:'从现场来源检查到达样品和维护后首轮恢复。',
        focus:['现场取送样、更新和清洗','取样点、吸扬程、滞留与允许预处理','样品代表性、实际更新及恢复后首轮'],
        questions:[['管内容积除以流量能证明样品已经更新吗？','它只能估算名义输送时间。还需在分析接口检查真实更新及旧样混合，并结合目标组分评价到达样品。'],['冲洗完成后可以立即恢复有效数据吗？','先排除洗液及旧样残留，确认来源、阀位和样品更新，再按监测方法检查首轮结果并记录恢复时点。']],
        relatedGuides:[{label:'分析单元内的水样计量与反应',href:'/en/applications/analytical-instruments/guide-water-quality/'}],
      },
      wastewater:{
        label:'工业废水监测',summary:'把基体变化、颗粒和维护写入取送样条件。',
        focus:['复杂废水输送、允许预处理与反冲','目标组分、基体范围、沉积及实际负载','传送前后组分、堵塞趋势和维护恢复'],
        scope:'先按采用的分析方法定义目标组分。EPA Method 200.8 就对溶解态元素与总可回收元素规定了不同的样品处理；这说明过滤选择应跟随分析对象，不能将一种处理方式推广到全部废水监测。',
        references:[{id:'environmental-sample-definition',title:'EPA Method 200.8：水与废水元素分析的采集、保存和前处理',href:'https://www.epa.gov/sites/default/files/2015-06/documents/epa-200.8.pdf'}],
        questions:[['先加过滤器防堵，再确认监测对象可以吗？','先定义目标组分与方法允许的预处理，再比较滤材、截留、吸附和新增压降。按真实样品验证，避免去掉需要测量的颗粒或组分。'],['清水工况通过能说明废水输送适配吗？','还需覆盖可预见的颗粒、黏度、温度、腐蚀和扬程范围，观察实际交付、沉积与维护恢复；按具体配置判断通过能力。']],
      },
      gasPretreatment:{
        label:'样气与冷凝液处理',summary:'分别确认样气主路、排液支路和吸收液支路。',
        focus:['样气保护、冷凝排液及吸收液供给','各支路介质、负压、密封和新增阻力','排空、气密、目标组成与维护恢复'],
        scope:'样气、冷凝液和吸收液分别核对接触介质与工作点。气液隔膜泵的抽排能力按具体配置确认；液体供给、气体抽吸和含气排液的参数不能互换。',
        questions:[['吸收液泵是否可以直接用于样气抽吸？','先确认具体型号允许的介质与压力条件。吸收液支路的液体流量不能证明样气抽吸或气液排放能力，再核对完整系统气密及方法结果。'],['负压系统排冷凝液只要排得出去就可以吗？','同时检查排液时旁漏、回流、积液和入口含气状态，并评价对样气压力、流量及目标组成的影响。']],
      },
      samplingPrep:{
        label:'环境样品准备',summary:'保留样本身份，再按方法组织分样、稀释与过滤。',
        focus:['环境样品转移、分样、稀释与过滤','来源时点、保存状态、颗粒及允许操作','比例、目标物回收、分样代表性与空白'],
        questions:[['同一原样分出的两份样本为什么可能不同？','核对保存时间、混匀、颗粒分布和分取顺序，再检查材料接触与共享段残留。记录来源及目标容器，按方法评价代表性。'],['稀释液量合格是否代表前处理结果合格？','还需检查接收比例、混合、目标物回收及空白。过滤或转相等步骤分别验证，避免用体积测量替代方法结果。']],
        relatedGuides:[{label:'分析样本前处理的比例与回收',href:'/en/applications/analytical-instruments/guide-sample-prep/'}],
      },
      systemIntegration:{
        label:'在线监测集成',summary:'将测量、清洗、维护旁路和数据状态连成流程。',
        focus:['取样、分析接口、排废与恢复协调','逐支路负载、状态图、互锁及维护环境','实际样品恢复和数据状态可追溯'],
        questions:[['报警解除后能自动把数据标成有效吗？','先确认故障对应的路径已恢复，核对样品更新、清洗残留和方法检查，再按恢复程序释放数据；单个传感器正常不足以证明有效测量。'],['维护旁路应怎样与分析动作配合？','在状态表中标明样品和洗液去向、分析禁止条件以及返回测量的步骤，同时记录维护期间和首轮恢复的数据状态。']],
      },
    },
  },
  'synthetic-biology': {
    indexTitle:'按生物任务与过程阶段进入专题',comparisonTitle:'合成生物的物料、采样与恢复重点',
    evidence:'离散补料测逐剂交付，连续补料测时间窗流量和运行周期累计量；采样同时核对目标物代表性、路径更新弃液和过程体积记录。构建筛选关联样本与孔位身份，长周期恢复核对实际容器及已完成动作；液路状态、过程结果与污染边界分别验收。',
    inputs:[['生物任务','培养、构建、筛选或分析对象及验收目标'],['物料与体积','各路配方、补料曲线、采样及弃样预算和运行周期'],['路径边界','培养容器、共享段、隔离、材料及清洁或灭菌程序'],['恢复记录','累计交付、样本身份、未完成动作和允许补偿条件']],
    topics:{
      microBioreactor:{
        label:'微型反应器',summary:'一起核算补料、采样、弃液和过程体积。',
        focus:['小体系补料、取样与排液','供给模式、采样预算、并行隔离和污染边界','逐次及累计物料、代表性与体积记录'],
        sectionBlocks:{'task-sampling':[{type:'paragraph',text:'标明取样口、分析对象及样本去向，分别记录正式样本、滞留段更新弃液和其他排液对过程体积的影响。用配对样品检查代表性，并按程序确认是否允许回收；小体系不能只用正式样本体积核算采样消耗。'}]},
        questions:[['相同累计补料量能替代相同补料过程吗？','还需比较加入时间、脉冲或连续模式、允许波动与停流。分别验收逐剂量或时间窗流量，再核对累计量及过程结果。'],['采样消耗是否只等于分析容器里的样本体积？','把路径更新弃液和其他排液一并记录，检查是否存在允许的回收路径，再核对实际过程体积及样品代表性。']],
      },
      biofoundry:{
        label:'Biofoundry 构建与筛选',summary:'把构建、试剂源、目标孔位和已完成操作关联起来。',
        focus:['构建、培养与筛选的液体操作','样本和孔位身份、实际试剂、耗材与资源','逐孔交付、污染、追溯及筛选结果'],
        questions:[['逐孔液量合格是否足以证明筛选有效？','还需核对构建或菌株身份、试剂来源、目标孔位及已完成步骤，并结合污染检查与筛选结果评价。'],['板上操作中断后怎样选择继续位置？','先核对每个孔位的实际交付与状态，区分未执行、部分执行和已完成，再按实验程序确定续做或弃样，避免整板重复加液。']],
        relatedGuides:[{label:'自动移液的驱动、耗材与交付',href:'/en/applications/lab-automation/guide-pipetting/'},{label:'孔板工位的供排液与逐孔差异',href:'/en/applications/lab-automation/guide-microplate/'}],
      },
      feedingControl:{
        label:'连续补料',summary:'同时检查时间窗流量、补液停顿和长周期累计量。',
        focus:['连续或交替供料与换瓶切换','允许停流、真实背压、首段组成与保护阻力','流量趋势、累计量和中断后允许恢复'],
        sectionBlocks:{'task-monitoring':[{type:'paragraph',text:'关联泵命令、实测交付、异常时间窗和累计物料记录。压力或气泡信息用于判断液路状态，pH等过程闭环需要对应传感与控制程序；补料中断后是否补偿、补偿多少及以何种速度恢复，由工艺程序决定，不能只按累计欠量自动追补。'}]},
        questions:[['累计补料量正确，能说明连续供液满足要求吗？','还要检查各时间窗流量、波动、补液或换瓶停顿以及重启首段。在真实介质和负载下分别验收连续性与累计量。'],['停流后可以把欠量一次补齐吗？','先保存异常时段和实际已交付量，按工艺允许的补偿条件与恢复速度处理；累计欠量不能单独决定恢复动作。']],
      },
      onlineSampling:{
        label:'在线采样',summary:'按分析对象检查代表性、前处理和污染边界。',
        focus:['过程取样、路径更新及方法前处理','分析对象、时延、弃样或回收和整条路径','目标物保留、代表性、体积扰动与恢复'],
        questions:[['在线采样是否都应该过滤？','先说明测细胞或菌体，还是液相目标物，再按方法决定保留与去除。检查吸附、压降及更换恢复，不能仅以防堵选择。'],['使用夹管方案就能证明无菌采样吗？','还需按实际程序评价软管、接头、采样口、装配和维护的完整边界，分别验证夹闭密封与清洁或灭菌后的路径。']],
        relatedGuides:[{label:'分析前处理的目标物回收与时序',href:'/en/applications/analytical-instruments/guide-sample-prep/'}],
      },
      bioProcessIntegration:{
        label:'生物过程集成',summary:'把多路补料、采样和异常恢复连到实际物料记录。',
        focus:['多支路补料、采样、清洗和恢复','逐支路工作点、累计状态、互锁与维护旁路','实际交付、身份、隔离和长周期恢复'],
        questions:[['断电恢复后为什么不能重发最后一条命令？','命令可能已部分或全部完成。先核对累计物料、容器状态和未完成动作，再选择续做或终止，避免重复补料。'],['压力与气泡正常能说明培养过程正常吗？','它们提供指定位置的液路状态信息。培养状态依靠对应过程测量，污染边界与过程结果也需按完整系统分别评价。']],
      },
    },
  },
};

export function getReviewTopicEditorial(kind: EnglishApplicationKind, group: string) {
  return reviewEditorialDomains[kind]?.topics[group];
}

export function reviseReviewHub(kind: EnglishApplicationKind, document: ApplicationDocument): ApplicationDocument {
  const editorial = reviewEditorialDomains[kind];
  if (!editorial) return document;
  const topics = Object.entries(editorial.topics);
  return { ...document, navLabel: document.title.split('液路：')[0], sections: document.sections.map(section => {
    if (section.id === 'topic-guides') return { ...section, title: editorial.comparisonTitle, blocks: [
      { type: 'table', caption: '先比较设备任务，再进入对应专题', headers: ['设备或工作站', '主要液体任务', '优先确认', '验收关注'], rows: topics.map(([,topic]) => [topic.label, ...topic.focus]) },
      { type: 'links', items: topics.map(([group,topic]) => ({ label: `阅读${topic.label}专题`, href: applicationArticleHref(kind,group) })) },
    ] };
    if (section.id === 'project-inputs') return { ...section, blocks: [
      { type: 'table', caption: '用于本领域配置讨论的资料', headers: ['资料类别', '需要说明'], rows: editorial.inputs },
      { type: 'links', items: [{ label: '带上工作条件，联系工程师', href: '/en/contact/' }] },
    ] };
    if (section.id === 'evidence' && editorial.evidence) return { ...section, blocks: [{ type: 'paragraph', text: editorial.evidence }] };
    return section;
  }) };
}

export function reviseReviewTopic(kind: EnglishApplicationKind, group: string, document: ApplicationDocument): ApplicationDocument {
  const editorial = getReviewTopicEditorial(kind,group);
  if (!editorial) return document;
  const scope: ApplicationBlock[] = editorial.scope ? [{ type: 'callout', title: '本页适用的设备与方法', text: editorial.scope, references: editorial.references?.map(reference => reference.id) }] : [];
  return { ...document, navLabel: editorial.label, intro: [...document.intro, ...scope],
    sections: document.sections.map(section => section.id === 'questions'
      ? { ...section, title: '本专题的常见选型与恢复问题', blocks: editorial.questions.flatMap(([title,text]): ApplicationBlock[] => [{ type: 'subheading', title }, { type: 'paragraph', text }]) }
      : editorial.sectionBlocks?.[section.id] ? { ...section, blocks: editorial.sectionBlocks[section.id] } : section),
    references: [...document.references, ...(editorial.references ?? [])],
    related: [...(document.related ?? []), ...(editorial.relatedGuides ?? [])].filter((item,index,items) => items.findIndex(other => other.href === item.href) === index),
  };
}
