/* =========================================================
   q20.detail.intl.ts
   恒永达官网｜接头替代查询｜快插接头 Q20 详情页多语言文案

   文件路径：
   data/resources/fitting-replacement/fittings/quick-connect/q20/q20.detail.intl.ts

   作用：
   1. 存放 Q20 接头替代查询详情页多语言文案
   2. 服务中文详情页和外语详情页
   3. 不存放产品数据
   4. 产品数据来自 q20.zh.ts
   5. 后续 Q40 / Q60 / 硬管 / 倒刺接头可按同样结构新增

   当前支持语言：
   zh 中文
   en 英文
   es 西班牙语
   fr 法语
   ko 韩语
   ru 俄语
========================================================= */

export type FittingReplacementDetailLocale =
  | "zh"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

/* =========================================================
   Q20 详情页多语言文案
========================================================= */
export const fittingReplacementQuickConnectQ20DetailIntl = {
  zh: {
    breadcrumbs: [
      {
        label: "首页",
        href: "/",
      },
      {
        label: "资源中心",
        href: "/resources",
      },
      {
        label: "接头替代查询",
        href: "/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "商品编码",
      compatibleModels: "兼容编码",
    },

    actions: {
      addToCart: "加入清单",
      addedToCart: "已加入清单",
      addDrawing: "添加图纸",
      addedDrawing: "已添加图纸",
    },

    drawingPreview: {
      title: "2D 图纸",
      loadingLabel: "正在加载 2D 图纸...",
      previewButton: "点击预览图纸",
      description: "如需图纸文件，请添加至清单列表",
    },

    faq: {
      eyebrow: "FAQ",
      title: "常见问题",
      description: "关于型号替代、图纸预览、图纸需求和清单提交的常见说明。",
      items: [
        {
          question: "预览图纸和添加图纸有什么区别？",
          answer:
            "预览图纸用于在线查看结构和尺寸；添加图纸表示后续提交清单时，希望我们把该型号的正式 2D 图纸纳入图纸发送范围。",
        },
        {
          question: "为什么图纸不直接下载？",
          answer:
            "图纸会根据客户加入清单并标记的型号统一整理，避免客户下载错误型号。后续可通过需求提交、邮件或资料包方式统一发送。",
        },
        {
          question: "可以一次选择多个型号吗？",
          answer:
            "可以。多个型号可以加入同一个选型清单，并且每个型号都可以单独标记是否需要 2D 图纸。",
        },
      ],
    },
  },

  en: {
    breadcrumbs: [
      {
        label: "Home",
        href: "/en",
      },
      {
        label: "Resources",
        href: "/en/resources",
      },
      {
        label: "Fitting Replacement",
        href: "/en/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "Product Code",
      compatibleModels: "Compatible Models",
    },

    actions: {
      addToCart: "Add to List",
      addedToCart: "Added",
      addDrawing: "Add Drawing",
      addedDrawing: "Drawing Added",
    },

    drawingPreview: {
      title: "2D Drawing",
      loadingLabel: "Loading 2D drawing...",
      previewButton: "Preview Drawing",
      description: "To request the drawing file, please add it to your list.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      description:
        "Common notes about model replacement, drawing preview, drawing requests, and list submission.",
      items: [
        {
          question:
            "What is the difference between previewing and adding a drawing?",
          answer:
            "Previewing a drawing lets you view the structure and dimensions online. Adding a drawing means you want the official 2D drawing included when submitting your selection list.",
        },
        {
          question: "Why is the drawing not available for direct download?",
          answer:
            "Drawings are organized based on the models added to your list and marked as required, helping avoid downloading the wrong model. They can later be sent through a request form, email, or document package.",
        },
        {
          question: "Can I select multiple models at once?",
          answer:
            "Yes. Multiple models can be added to one selection list, and each model can be marked separately for whether a 2D drawing is required.",
        },
      ],
    },
  },

  es: {
    breadcrumbs: [
      {
        label: "Inicio",
        href: "/es",
      },
      {
        label: "Recursos",
        href: "/es/resources",
      },
      {
        label: "Sustitución de conectores",
        href: "/es/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "Código de producto",
      compatibleModels: "Modelos compatibles",
    },

    actions: {
      addToCart: "Añadir a la lista",
      addedToCart: "Añadido",
      addDrawing: "Añadir plano",
      addedDrawing: "Plano añadido",
    },

    drawingPreview: {
      title: "Plano 2D",
      loadingLabel: "Cargando plano 2D...",
      previewButton: "Previsualizar plano",
      description:
        "Para solicitar el archivo del plano, añádalo a la lista de selección.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Preguntas frecuentes",
      description:
        "Notas frecuentes sobre sustitución de modelos, previsualización de planos, solicitud de planos y envío de la lista.",
      items: [
        {
          question:
            "¿Cuál es la diferencia entre previsualizar y añadir un plano?",
          answer:
            "La previsualización permite ver la estructura y las dimensiones en línea. Añadir un plano significa que desea incluir el plano 2D oficial al enviar la lista de selección.",
        },
        {
          question: "¿Por qué el plano no se descarga directamente?",
          answer:
            "Los planos se organizan según los modelos añadidos y marcados en la lista, lo que ayuda a evitar descargas incorrectas. Posteriormente se pueden enviar mediante formulario, correo electrónico o paquete de documentos.",
        },
        {
          question: "¿Puedo seleccionar varios modelos a la vez?",
          answer:
            "Sí. Se pueden añadir varios modelos a una misma lista de selección, y cada modelo puede marcarse por separado si requiere plano 2D.",
        },
      ],
    },
  },

  fr: {
    breadcrumbs: [
      {
        label: "Accueil",
        href: "/fr",
      },
      {
        label: "Ressources",
        href: "/fr/resources",
      },
      {
        label: "Remplacement de raccords",
        href: "/fr/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "Code produit",
      compatibleModels: "Modèles compatibles",
    },

    actions: {
      addToCart: "Ajouter à la liste",
      addedToCart: "Ajouté",
      addDrawing: "Ajouter le plan",
      addedDrawing: "Plan ajouté",
    },

    drawingPreview: {
      title: "Plan 2D",
      loadingLabel: "Chargement du plan 2D...",
      previewButton: "Prévisualiser le plan",
      description:
        "Pour demander le fichier du plan, veuillez l’ajouter à votre liste de sélection.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Questions fréquentes",
      description:
        "Notes fréquentes sur le remplacement de modèles, la prévisualisation des plans, les demandes de plans et l’envoi de la liste.",
      items: [
        {
          question:
            "Quelle est la différence entre prévisualiser et ajouter un plan ?",
          answer:
            "La prévisualisation permet de consulter la structure et les dimensions en ligne. Ajouter un plan signifie que vous souhaitez inclure le plan 2D officiel lors de l’envoi de votre liste de sélection.",
        },
        {
          question:
            "Pourquoi le plan n’est-il pas téléchargeable directement ?",
          answer:
            "Les plans sont organisés selon les modèles ajoutés à la liste et marqués comme nécessaires, afin d’éviter le téléchargement d’un mauvais modèle. Ils peuvent ensuite être envoyés via un formulaire, un e-mail ou un dossier documentaire.",
        },
        {
          question: "Puis-je sélectionner plusieurs modèles à la fois ?",
          answer:
            "Oui. Plusieurs modèles peuvent être ajoutés à une même liste de sélection, et chaque modèle peut être marqué séparément selon le besoin d’un plan 2D.",
        },
      ],
    },
  },

  ko: {
    breadcrumbs: [
      {
        label: "홈",
        href: "/ko",
      },
      {
        label: "자료실",
        href: "/ko/resources",
      },
      {
        label: "피팅 대체 조회",
        href: "/ko/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "제품 코드",
      compatibleModels: "호환 모델",
    },

    actions: {
      addToCart: "목록에 추가",
      addedToCart: "추가됨",
      addDrawing: "도면 추가",
      addedDrawing: "도면 추가됨",
    },

    drawingPreview: {
      title: "2D 도면",
      loadingLabel: "2D 도면을 불러오는 중...",
      previewButton: "도면 미리보기",
      description: "도면 파일이 필요한 경우 선정 목록에 추가해 주세요.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "자주 묻는 질문",
      description:
        "모델 대체, 도면 미리보기, 도면 요청 및 목록 제출에 대한 일반적인 안내입니다.",
      items: [
        {
          question: "도면 미리보기와 도면 추가의 차이는 무엇인가요?",
          answer:
            "도면 미리보기는 구조와 치수를 온라인으로 확인하는 기능입니다. 도면 추가는 선정 목록 제출 시 해당 모델의 공식 2D 도면을 함께 요청한다는 의미입니다.",
        },
        {
          question: "도면을 직접 다운로드할 수 없는 이유는 무엇인가요?",
          answer:
            "도면은 목록에 추가되고 필요로 표시된 모델을 기준으로 정리되어 잘못된 모델을 다운로드하는 것을 방지합니다. 이후 요청 양식, 이메일 또는 자료 패키지로 전달할 수 있습니다.",
        },
        {
          question: "여러 모델을 한 번에 선택할 수 있나요?",
          answer:
            "네. 여러 모델을 하나의 선정 목록에 추가할 수 있으며, 각 모델별로 2D 도면 필요 여부를 별도로 표시할 수 있습니다.",
        },
      ],
    },
  },

  ru: {
    breadcrumbs: [
      {
        label: "Главная",
        href: "/ru",
      },
      {
        label: "Ресурсы",
        href: "/ru/resources",
      },
      {
        label: "Поиск аналогов фитингов",
        href: "/ru/resources/selection-support/fitting-replacement",
      },
    ],

    tableLabels: {
      productCode: "Код изделия",
      compatibleModels: "Совместимые модели",
    },

    actions: {
      addToCart: "Добавить в список",
      addedToCart: "Добавлено",
      addDrawing: "Добавить чертеж",
      addedDrawing: "Чертеж добавлен",
    },

    drawingPreview: {
      title: "2D-чертеж",
      loadingLabel: "Загрузка 2D-чертежа...",
      previewButton: "Просмотреть чертеж",
      description:
        "Чтобы запросить файл чертежа, добавьте его в список подбора.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Часто задаваемые вопросы",
      description:
        "Общие пояснения по замене моделей, просмотру чертежей, запросу чертежей и отправке списка.",
      items: [
        {
          question:
            "В чем разница между просмотром чертежа и добавлением чертежа?",
          answer:
            "Просмотр чертежа позволяет онлайн ознакомиться со структурой и размерами. Добавление чертежа означает, что официальный 2D-чертеж должен быть включен при отправке списка подбора.",
        },
        {
          question: "Почему чертеж нельзя скачать напрямую?",
          answer:
            "Чертежи подготавливаются на основе моделей, добавленных в список и отмеченных как требующие чертежа, чтобы избежать загрузки неверной модели. Затем они могут быть отправлены через форму запроса, по электронной почте или в составе пакета документов.",
        },
        {
          question: "Можно ли выбрать несколько моделей одновременно?",
          answer:
            "Да. Несколько моделей можно добавить в один список подбора, при этом для каждой модели можно отдельно указать необходимость 2D-чертежа.",
        },
      ],
    },
  },
} as const;

/* =========================================================
   获取 Q20 详情页指定语言文案
========================================================= */
export function getFittingReplacementQuickConnectQ20DetailIntl(
  locale: string = "zh"
) {
  if (locale in fittingReplacementQuickConnectQ20DetailIntl) {
    return fittingReplacementQuickConnectQ20DetailIntl[
      locale as FittingReplacementDetailLocale
    ];
  }

  return fittingReplacementQuickConnectQ20DetailIntl.en;
} 