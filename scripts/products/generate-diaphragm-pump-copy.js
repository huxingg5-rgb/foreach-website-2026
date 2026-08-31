/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const sourcePath = process.argv[2];
const outputPath = path.resolve(
  __dirname,
  "../../data/products/detail/diaphragm-pump-copy.generated.json",
);

if (!sourcePath) {
  throw new Error(
    "Usage: node scripts/products/generate-diaphragm-pump-copy.js <copy-markdown-path>",
  );
}

const source = fs.readFileSync(path.resolve(sourcePath), "utf8");
const localeHeadings = [
  ["zh", /^# 中文 zh-CN\s*$/m],
  ["en", /^# English en\s*$/m],
  ["es", /^# Español es\s*$/m],
  ["fr", /^# Français fr\s*$/m],
  ["ko", /^# 한국어 ko\s*$/m],
  ["ru", /^# Русский ru\s*$/m],
];

const DPGL800_FACT_COPY = {
  zh: {
    intro: "恒永达 DPGL800 系列无刷气液混合隔膜泵专为气体及气液混合物设计，不适用于输送 100% 液体。产品采用 24 V 无刷电机，单泵头空载气体流量为 6 L/min，最大正压为 +30 kPa，最大负压为 < -90 kPa，使用寿命为 10000 h。产品适用于含气废液抽排、气液混合物输送、管路排空及需要较强抽吸能力的自动化设备。实际性能会受到介质状态、管路结构和工作负载影响，具体参数以页面下方规格表为准。",
    pureLiquidFaqAnswer: "DPGL800 仅适用于气体和气液混合物，不适用于输送 100% 液体。纯液体工况应选用液体隔膜泵。",
  },
  en: {
    intro: "The FOREACH DPGL800 Series Brushless Gas-Liquid Diaphragm Pump is designed for gas and gas-liquid mixtures. It is not suitable for pumping 100% liquid. It has a single-head no-load gas flow rate of 6 L/min, a maximum positive pressure of +30 kPa, a maximum negative pressure of < -90 kPa, a 24 V brushless motor, and a service life of 10000 h. It is suitable for gas-liquid waste extraction, gas-liquid mixture transfer, line evacuation, and automated equipment requiring strong suction performance. Actual performance may vary with the medium state, tubing configuration, and operating load. Refer to the specification table below for detailed parameters.",
    pureLiquidFaqAnswer: "Designed for gas and gas-liquid mixtures. It is not suitable for pumping 100% liquid. Use a liquid diaphragm pump for pure-liquid transfer.",
  },
  es: {
    intro: "La bomba de diafragma sin escobillas de la serie DPGL800 de FOREACH está diseñada para gases y mezclas gas-líquido. No es adecuada para bombear líquido al 100 %. Incorpora un motor sin escobillas de 24 V y ofrece, con un solo cabezal y sin carga, un caudal de gas de 6 L/min, una presión positiva máxima de +30 kPa, una presión negativa máxima de < -90 kPa y una vida útil de 10000 h. Es adecuada para la extracción de líquidos residuales con fase gaseosa, la transferencia de mezclas gas-líquido, el vaciado de tuberías y los equipos automatizados que requieren una alta capacidad de aspiración. El rendimiento real puede variar según el estado del medio, la configuración de las tuberías y la carga de trabajo. Consulte la tabla de especificaciones inferior para conocer los parámetros detallados.",
    pureLiquidFaqAnswer: "La DPGL800 está diseñada para gases y mezclas gas-líquido. No es adecuada para bombear líquido al 100 %. Para el trasvase de líquidos puros, utilice una bomba de diafragma para líquidos.",
  },
  fr: {
    intro: "La pompe à membrane sans balais série DPGL800 de FOREACH est conçue pour les gaz et les mélanges gaz-liquide. Elle ne convient pas au pompage de liquide à 100 %. Équipée d’un moteur sans balais 24 V, elle offre, avec une seule tête et à vide, un débit de gaz de 6 L/min, une pression positive maximale de +30 kPa, une pression négative maximale de < -90 kPa et une durée de vie de 10000 h. Elle convient à l’extraction d’effluents contenant une phase gazeuse, au transfert de mélanges gaz-liquide, à l’évacuation des conduites et aux équipements automatisés nécessitant une forte capacité d’aspiration. Les performances réelles peuvent varier selon l’état du fluide, la configuration des conduites et la charge de fonctionnement. Se reporter au tableau des spécifications ci-dessous pour les paramètres détaillés.",
    pureLiquidFaqAnswer: "La DPGL800 est conçue pour les gaz et les mélanges gaz-liquide. Elle ne convient pas au pompage de liquide à 100 %. Pour le transfert de liquide pur, utilisez une pompe à membrane pour liquides.",
  },
  ko: {
    intro: "FOREACH DPGL800 시리즈 브러시리스 다이어프램 펌프는 가스 및 기액 혼합물용으로 설계되었으며 100% 액체 펌핑에는 적합하지 않습니다. 24 V 브러시리스 모터를 사용하며, 단일 펌프 헤드 기준 무부하 기체 유량은 6 L/min, 최대 양압은 +30 kPa, 최대 음압은 < -90 kPa, 수명은 10000 h입니다. 기체가 포함된 폐액의 흡입 배출, 기액 혼합물 이송, 배관 배기 및 높은 흡입 성능이 필요한 자동화 장비에 적합합니다. 실제 성능은 매질 상태, 배관 구성 및 운전 부하에 따라 달라질 수 있으며, 자세한 수치는 아래 사양표를 참조하십시오.",
    pureLiquidFaqAnswer: "DPGL800은 가스 및 기액 혼합물용으로 설계되었으며 100% 액체 펌핑에는 적합하지 않습니다. 순수 액체 이송에는 액체용 다이어프램 펌프를 사용하십시오.",
  },
  ru: {
    intro: "Бесщёточный мембранный насос FOREACH серии DPGL800 предназначен для газа и газожидкостных смесей. Он не подходит для перекачивания 100 % жидкости. Насос оснащён бесщёточным двигателем 24 V; расход газа одной насосной головки без нагрузки составляет 6 L/min, максимальное положительное давление — +30 kPa, максимальное отрицательное давление — < -90 kPa, срок службы — 10000 h. Он подходит для откачивания жидких отходов с газовой фазой, транспортирования газожидкостных смесей, опорожнения трубопроводов и автоматизированного оборудования, требующего высокой всасывающей способности. Фактические характеристики могут зависеть от состояния среды, конфигурации трубопровода и рабочей нагрузки. Подробные параметры приведены в таблице характеристик ниже.",
    pureLiquidFaqAnswer: "DPGL800 предназначен для газа и газожидкостных смесей. Он не подходит для перекачивания 100 % жидкости. Для чистой жидкости используйте жидкостный мембранный насос.",
  },
};

function parseFaqs(productBlock, locale, key) {
  const faqHeadingIndex = productBlock.indexOf("### FAQ");

  if (faqHeadingIndex < 0) {
    throw new Error(`Missing FAQ section for ${locale}/${key}`);
  }

  const lines = productBlock.slice(faqHeadingIndex).split(/\r?\n/);
  const faqs = [];

  for (let index = 0; index < lines.length; index += 1) {
    const questionMatch = lines[index].match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);

    if (!questionMatch) continue;

    const answerLines = [];

    for (index += 1; index < lines.length; index += 1) {
      if (/^\d+\.\s+\*\*/.test(lines[index]) || /^---\s*$/.test(lines[index])) {
        index -= 1;
        break;
      }

      const answerLine = lines[index].trim();
      if (answerLine) answerLines.push(answerLine);
    }

    faqs.push({
      question: questionMatch[1],
      answer: answerLines.join(" "),
    });
  }

  if (faqs.length !== 5) {
    throw new Error(
      `Expected 5 FAQs for ${locale}/${key}, received ${faqs.length}`,
    );
  }

  return faqs;
}

function parseLocaleSection(locale, section) {
  const productMatches = Array.from(
    section.matchAll(/^## \d+\. `([^`]+)`\s*$/gm),
  );
  const products = {};

  for (let index = 0; index < productMatches.length; index += 1) {
    const current = productMatches[index];
    const next = productMatches[index + 1];
    const key = current[1];
    const productBlock = section.slice(
      current.index,
      next ? next.index : section.length,
    );
    const textBlocks = Array.from(
      productBlock.matchAll(/```text\r?\n([\s\S]*?)\r?\n```/g),
      (match) => match[1].trim(),
    );

    if (textBlocks.length !== 5) {
      throw new Error(
        `Expected 5 text blocks for ${locale}/${key}, received ${textBlocks.length}`,
      );
    }

    products[key] = {
      title: textBlocks[0],
      cardParameters: textBlocks[1].split(/\r?\n/),
      intro: textBlocks[2],
      applications: textBlocks[3],
      breadcrumbs: textBlocks[4].split(" / "),
      faqs: parseFaqs(productBlock, locale, key),
    };
  }

  if (Object.keys(products).length !== 7) {
    throw new Error(
      `Expected 7 products for ${locale}, received ${Object.keys(products).length}`,
    );
  }

  return products;
}

const output = {};

for (let index = 0; index < localeHeadings.length; index += 1) {
  const [locale, headingPattern] = localeHeadings[index];
  const headingMatch = headingPattern.exec(source);

  if (!headingMatch) {
    throw new Error(`Missing locale heading for ${locale}`);
  }

  const nextHeading = localeHeadings[index + 1];
  const nextMatch = nextHeading ? nextHeading[1].exec(source) : null;
  const section = source.slice(
    headingMatch.index,
    nextMatch ? nextMatch.index : source.length,
  );

  output[locale] = parseLocaleSection(locale, section);

  const dpgl800 = output[locale]["dpgl800-brushless"];
  const factCopy = DPGL800_FACT_COPY[locale];
  if (!dpgl800 || !factCopy || !dpgl800.faqs[3]) {
    throw new Error(`Missing DPGL800 fact-copy target for ${locale}`);
  }
  dpgl800.intro = factCopy.intro;
  dpgl800.faqs[3].answer = factCopy.pureLiquidFaqAnswer;
}

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Generated ${outputPath}`);
console.log("Validated 6 locales × 7 products × 5 FAQs.");
