const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const file = path.join(
  process.cwd(),
  "data-source/product-center/pumps/FOREACH_泵系列_产品数据源.xlsx"
);

if (!fs.existsSync(file)) {
  throw new Error("未找到泵系列数据源：" + file);
}

function text(value) {
  return String(value || "").trim();
}

function readSheet(wb, name) {
  const sheet = wb.Sheets[name];
  if (!sheet) return [];
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function writeSheet(wb, name, rows) {
  wb.Sheets[name] = XLSX.utils.json_to_sheet(rows);
}

const wb = XLSX.readFile(file);
const products = readSheet(wb, "02_泵产品索引");

const plungerProducts = products
  .filter((row) => text(row.pumpTypeSlug) === "plunger-pumps")
  .filter((row) => text(row.productId))
  .sort((a, b) => Number(a.sort || 9999) - Number(b.sort || 9999));

function isSm(row) {
  return text(row.seriesCode).toUpperCase() === "SM" ||
    text(row.seriesSlug).includes("sm-miniature");
}

function model(row) {
  return text(row.internalModelRef || row.productId).toUpperCase();
}

function capacity(row) {
  return text(row.capacity);
}

function material(row) {
  return text(row.material);
}

function faqTemplates(row) {
  const m = model(row);
  const c = capacity(row);
  const mat = material(row);

  if (isSm(row)) {
    return [
      {
        code: "POSITIONING",
        questionZh: `${m} 适合用在什么类型的设备中？`,
        answerZh: `${m} 属于 SM 微型柱塞泵，适合用于空间受限的紧凑型 IVD 设备、小型液路模块、实验室自动化设备和生命科学仪器。该型号主要用于 ${c} 级别的微量液体吸排、分配和转移，最终配置需结合整机空间、液路路径和控制方式确认。`,
        questionEn: `What type of equipment is ${m} suitable for?`,
        answerEn: `${m} is an SM miniature plunger pump designed for compact IVD instruments, small fluidic modules, laboratory automation systems, and life science instruments. It is mainly used for ${c}-level micro-volume aspiration, dispensing, and transfer. Final configuration should be confirmed according to instrument space, fluidic layout, and control method.`
      },
      {
        code: "CUSTOM",
        questionZh: `${m} 是否可以直接按标准型号下单？`,
        answerZh: `柱塞泵属于定制化产品。${m} 的容量、泵头材料、接口形式、阀体搭配、光耦类型和控制方式都需要根据实际应用确认。建议提交需求表单或联系我们进行方案评估后再确认最终型号。`,
        questionEn: `Can ${m} be ordered directly as a standard model?`,
        answerEn: `Plunger pumps are custom-engineered products. For ${m}, volume, pump head material, interface, valve configuration, optical sensor type, and control method should be confirmed according to the actual application. We recommend submitting requirements or contacting us before confirming the final model.`
      },
      {
        code: "STEPS",
        questionZh: `SM 微型柱塞泵和 EA 柱塞泵的满量程步数是否一样？`,
        answerZh: `不一样。SM 微型柱塞泵的满量程步数按 2000 步规划，不能直接套用 EA 系列参数。页面中的参数仅用于初步选型，最终规格应以正式图纸、规格书或工程确认结果为准。`,
        questionEn: `Does the SM miniature plunger pump use the same full-stroke steps as the EA series?`,
        answerEn: `No. The SM miniature plunger pump is planned with 2000 full-stroke steps and should not directly use EA series parameters. Parameters on the page are for preliminary selection only. Final specifications should follow official drawings, datasheets, or engineering confirmation.`
      },
      {
        code: "MATERIAL",
        questionZh: `${m} 的 ${mat} 泵头适合哪些场景？`,
        answerZh: `${mat} 泵头适用于对该材料兼容性有要求的液路系统。实际选材需要结合液体介质、清洗方式、使用寿命、接口结构和整机环境确认，不建议只根据型号名称判断材料适用性。`,
        questionEn: `What applications is the ${mat} pump head of ${m} suitable for?`,
        answerEn: `The ${mat} pump head is suitable for fluidic systems requiring compatibility with this material. Material selection should be confirmed based on liquid media, cleaning method, service life, interface structure, and instrument environment, rather than judging only by the model name.`
      },
      {
        code: "INTEGRATION",
        questionZh: `${m} 是否可以集成电磁阀、控制器或光耦？`,
        answerZh: `可以。SM 微型柱塞泵可根据设备结构选择单泵、泵阀一体、加控制器或泵阀控制器组合方案，也可根据控制需求配置光耦反馈。具体集成方式需要结合空间、线束、阀路和通讯方式确认。`,
        questionEn: `Can ${m} be integrated with solenoid valves, controllers, or optical sensors?`,
        answerEn: `Yes. The SM miniature plunger pump can be configured as a single pump, pump-valve assembly, pump with controller, or pump-valve-controller module. Optical feedback can also be configured according to control requirements. The integration method should be confirmed based on space, wiring, valve path, and communication method.`
      }
    ];
  }

  return [
    {
      code: "POSITIONING",
      questionZh: `${m} 适合用在什么液路场景？`,
      answerZh: `${m} 属于 EA 常规柱塞泵，适合用于自动化分析仪器、IVD 分析仪、实验室自动化设备和生命科学仪器中的精密液体吸排、分配和转移。该型号适用于 ${c} 级别的液体处理任务，最终选型需结合液体介质、分配体积、速度、寿命和集成方式确认。`,
      questionEn: `What fluidic applications is ${m} suitable for?`,
      answerEn: `${m} is an EA standard plunger pump for precision aspiration, dispensing, and transfer in automated analytical instruments, IVD analyzers, laboratory automation systems, and life science instruments. It is suitable for ${c}-level liquid handling tasks. Final selection should be confirmed based on liquid media, dispensing volume, speed, lifetime, and integration method.`
    },
    {
      code: "CUSTOM",
      questionZh: `${m} 是否可以直接按标准型号下单？`,
      answerZh: `柱塞泵属于定制化产品。${m} 的泵头材料、容量范围、接口方式、阀体搭配、控制器和传感器配置都需要根据实际应用确认。页面型号用于选型沟通和报价识别，最终交付型号以工程确认结果为准。`,
      questionEn: `Can ${m} be ordered directly as a standard model?`,
      answerEn: `Plunger pumps are custom-engineered products. Pump head material, volume range, interface, valve configuration, controller, and sensor options for ${m} should be confirmed according to the actual application. The page model is used for selection communication and quotation reference. The final delivered model should follow engineering confirmation.`
    },
    {
      code: "MATERIAL",
      questionZh: `${m} 的 ${mat} 泵头应该如何判断是否适用？`,
      answerZh: `${mat} 泵头的适用性需要结合液体介质、试剂浓度、清洗流程、工作温度、寿命要求和系统结构综合判断。对于腐蚀性、易结晶、避光或特殊试剂场景，建议提供液体信息后由 FOREACH 工程团队协助确认。`,
      questionEn: `How should the suitability of the ${mat} pump head on ${m} be evaluated?`,
      answerEn: `The suitability of the ${mat} pump head should be evaluated based on liquid media, reagent concentration, cleaning process, operating temperature, lifetime requirements, and system structure. For corrosive, crystallizing, light-sensitive, or special reagents, we recommend providing liquid information for engineering evaluation by FOREACH.`
    },
    {
      code: "CONFIGURATION",
      questionZh: `${m} 可以搭配哪些配置？`,
      answerZh: `${m} 可根据系统需求搭配电磁阀、控制器、三线光耦、五线光耦或泵阀控制器模块。不同配置会影响安装空间、接线方式、控制逻辑和整机调试流程，因此应在选型阶段同步确认。`,
      questionEn: `What configurations can be used with ${m}?`,
      answerEn: `${m} can be configured with solenoid valves, controllers, three-wire optical sensors, five-wire optical sensors, or pump-valve-controller modules. Different configurations affect installation space, wiring, control logic, and system debugging, so they should be confirmed during the selection stage.`
    },
    {
      code: "FILES",
      questionZh: `${m} 的 2D 图纸、3D 模型和规格书是否可以直接下载？`,
      answerZh: `页面可展示公开预览资料。完整工程文件、图纸版本和正式规格书通常需要在确认应用需求后提供，以避免客户拿到与实际配置不一致的文件。若需要图纸或模型，请通过联系我们或需求提交表单获取。`,
      questionEn: `Can 2D drawings, 3D models, and datasheets for ${m} be downloaded directly?`,
      answerEn: `The page may display public preview materials. Complete engineering files, drawing versions, and official datasheets are usually provided after application requirements are confirmed, to avoid mismatches with the final configuration. Please contact us or submit a requirements form to request drawings or models.`
    }
  ];
}

const faqRows = [];

for (const row of plungerProducts) {
  const productId = text(row.productId);
  const pumpTypeSlug = text(row.pumpTypeSlug) || "plunger-pumps";
  const seriesSlug = text(row.seriesSlug);

  const templates = faqTemplates(row);

  templates.forEach((faq, index) => {
    faqRows.push({
      faqId: `FAQ-${productId.toUpperCase()}-${faq.code}`,
      scope: "product",
      pumpTypeSlug,
      seriesSlug,
      productId,
      questionZh: faq.questionZh,
      answerZh: faq.answerZh,
      questionEn: faq.questionEn,
      answerEn: faq.answerEn,
      footnoteIds: "",
      sort: (index + 1) * 10,
      enabled: "yes",
    });
  });
}

writeSheet(wb, "12_FAQ", faqRows);
XLSX.writeFile(wb, file);

console.log("✅ 已根据 EA / SM 型号规划写入基础正式 FAQ");
console.log("产品数量：" + plungerProducts.length);
console.log("FAQ 行数：" + faqRows.length);