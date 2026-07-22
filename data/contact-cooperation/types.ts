/* =========================================================
   types.ts
   恒永达官网｜联系与合作模块数据类型定义

   文件路径：
   data/contact-cooperation/types.ts

   作用：
   1. 统一约束“联系我们 / 联系与合作 / 找经销商”相关数据结构
   2. 防止中文、英文、多语言数据字段写乱
   3. 方便后续组件读取数据时有 TypeScript 提示
   4. 当前主要服务：
      - 中文联系我们页面 /contact
      - 后续多语言联系我们 /en/contact 等
      - 后续多语言找经销商 /en/become-a-distributor 等

   注意：
   1. 这个文件只定义类型，不写具体文案
   2. 具体中文文案放在 contact.zh.ts
   3. 具体英文/多语言文案后面放在 contact.intl.ts
   4. 经销商页面文案后面放在 distributor.intl.ts
========================================================= */

/* =========================================================
   语言类型
   说明：
   1. 中文默认页面不走 /zh 路径，所以单独用 zh-CN
   2. 其他语言和你项目当前多语言路径保持一致：
      /en /es /fr /ko /ru
========================================================= */

export type ContactDefaultLocale = "zh-CN";

export type ContactIntlLocale = "en" | "es" | "fr" | "ko" | "ru";

export type ContactLocale = ContactDefaultLocale | ContactIntlLocale;

/* =========================================================
   SEO 类型
   说明：
   页面 title 和 description 后续会用于 app/contact/page.tsx
========================================================= */

export type ContactSeoData = {
   title: string;
   description: string;
};

/* =========================================================
   图片类型
   说明：
   1. 图片文件实际放在 public/images/contact-cooperation/ 里面
   2. 这里保存的是图片访问路径和 alt 描述
========================================================= */

export type ContactImageData = {
   src: string;
   alt: string;
};

/* =========================================================
   按钮类型
========================================================= */

export type ContactButtonData = {
   label: string;
   href: string;
};

/* =========================================================
   Banner 类型
========================================================= */

export type ContactHeroData = {
   titlePrefix: string;
   highlightText: string;
   titleSuffix: string;
   image: ContactImageData;
   buttons: {
      support: ContactButtonData;
      form: ContactButtonData;
   };
};

/* =========================================================
   支持内容类型
   例如：
   - 产品选型支持
   - 资料与图纸申请
   - 样品测试支持
   - 液路方案沟通
   - 定制需求沟通
   - 售后服务支持
========================================================= */

export type ContactSupportItem = {
   key: string;
   title: string;
   description: string;

   /*
     点击支持项后，可以自动带入表单里的“需求类型”
     例如：
     requestType: "技术与选型支持"
   */
   requestType: string;
};

export type ContactSupportData = {
   title: string;
   description: string;
   items: ContactSupportItem[];
};

/* =========================================================
   表单字段类型
========================================================= */

export type ContactTextFieldData = {
   label: string;
   placeholder: string;
};

/* =========================================================
   邮箱验证码类型
========================================================= */

export type ContactEmailVerificationData = {
   emailLabel: string; // 邮箱字段标签，例如“邮箱”
   emailPlaceholder: string; // 邮箱输入框占位文案
   sendButton: string; // 发送验证码按钮文案
   codePlaceholder: string; // 验证码输入框占位文案
   verifyButton: string; // 验证按钮文案
   tip: string; // 默认提示文案
   codeSentTip: string; // 验证码发送后的提示文案前半段
   invalidCodeTip: string; // 验证码错误时的提示文案前半段
   verifiedTip: string; // 验证通过后的提示文案

   /*
     H5 / 前端测试用验证码
     正式上线后会改为后端接口生成，不应继续写死在前端
   */
   mockCode: string;
};

/* =========================================================
   产品分组类型
   用于“目标产品 / 部件类型”下拉
========================================================= */

export type ContactProductGroup = {
   groupName: string;
   options: string[];
};

/* =========================================================
   表单完整数据类型
========================================================= */

export type ContactFormData = {
   title: string; // 表单模块标题，例如“提交需求”
   description: string; // 表单模块说明文字
   panelTitle: string; // 右侧表单面板标题，例如“需求提交表单”

   fileTip: string; // 附件上传说明文字
   submitButton: string; // 提交按钮文字
   uploadButton: string; // 上传附件按钮文字

   emailVerification: ContactEmailVerificationData; // 邮箱验证码相关文案

   fields: {
      name: ContactTextFieldData; // 姓名字段文案
      company: ContactTextFieldData; // 公司名称字段文案
      phone: ContactTextFieldData; // 电话 / WhatsApp 字段文案
      targetModel: ContactTextFieldData; // 具体型号 / 竞品型号字段文案
      message: ContactTextFieldData; // 需求描述字段文案
   };

   labels: {
      requestType: string; // 需求类型标签
      productType: string; // 目标产品 / 部件类型标签
      projectStage: string; // 当前阶段标签
   };

   placeholders: {
      productType: string; // 目标产品下拉默认占位文案
      projectStage: string; // 当前阶段下拉默认占位文案
   };

   actions: {
      removeFile: string; // 删除附件按钮文案
      emailVerified: string; // 邮箱已验证文案
      resendCountdownSuffix: string; // 重新发送倒计时后缀，例如“秒后重发”
      retryCountdownSuffix: string; // 验证失败重试倒计时后缀，例如“秒后重试”
   };

   alerts: {
      emailRequired: string; // 未填写邮箱时提示
      invalidEmail: string; // 邮箱格式错误提示
      sendCodeFirst: string; // 未发送验证码时提示
      codeRequired: string; // 未填写验证码时提示
      verifyEmailFirst: string; // 提交前未完成邮箱验证提示
      popupBlocked: string; // 浏览器阻止 PDF 弹窗提示
      fileTooLargePrefix: string; // 文件过大提示前半段
      fileTooLargeSuffix: string; // 文件过大提示后半段
   };

   mapTexts: {
      loading: string; // 地图加载中文字
      error: string; // 地图加载失败文字
      openMap: string; // 打开地图按钮文案
   };

   successModal: {
      title: string; // 提交成功弹窗标题
      description: string; // 提交成功弹窗说明
      pdfTip: string; // PDF 保存提示
      closeButton: string; // 关闭按钮文字
   };

   pdfTexts: {
      documentTitle: string; // PDF 标题，例如“联系需求单”
      documentSubtitle: string; // PDF 副标题
      requestNumber: string; // PDF 需求单号
      createdAt: string; // PDF 生成时间
      source: string; // PDF 来源
      sourceValue: string; // PDF 来源内容
      customerInfo: string; // PDF 第一部分标题
      requirementInfo: string; // PDF 第二部分标题
      requirementDescription: string; // PDF 第三部分标题
      attachmentList: string; // PDF 第四部分标题
      notFilled: string; // 未填写
      notSelected: string; // 未选择
      noAttachment: string; // 未上传附件
      index: string; // 序号
      attachmentName: string; // 附件名称
      attachmentType: string; // 类型
      attachmentSize: string; // 大小
      footerNote: string; // PDF 底部说明
      printTip: string; // PDF 打印提示
   };

   requestTypes: string[]; // 需求类型下拉选项
   productGroups: ContactProductGroup[]; // 目标产品 / 部件类型分组下拉选项
   projectStages: string[]; // 当前阶段下拉选项
};

/* =========================================================
   左侧填写说明类型
========================================================= */

export type ContactGuideItem = {
   number: string;
   title: string;
   description: string;
};

export type ContactGuideData = {
   title: string;
   description: string;
   items: ContactGuideItem[];
   note: string;
};

/* =========================================================
   联系方式类型
========================================================= */

export type ContactInfoRow = {
   label: string;
   value: string;
};

export type ContactInfoData = {
   title: string; // 联系方式模块标题，例如“联系方式”
   description: string; // 联系方式模块说明文字
   companyName: string; // 公司中文名称
   companyPosition: string; // 公司定位说明
   rows: ContactInfoRow[]; // 联系方式列表，例如电话、邮箱、官网、地址、工作时间
   map: {
      title: string; // 地图模块标题，例如“公司位置”
      address: string; // 公司详细地址
      lng: number; // 高德地图经度，用于地图中心点和标记点
      lat: number; // 高德地图纬度，用于地图中心点和标记点
      mapUrl: string; // 高德地图外链地址，用于点击“打开高德地图”
   };
};

/* =========================================================
   底部 CTA 类型
========================================================= */

export type ContactBottomCtaData = {
   title: string;
   description: string;
   buttons: {
      form: ContactButtonData;
      contact: ContactButtonData;
   };
};

/* =========================================================
   联系我们页面完整数据类型
   当前中文 /contact 页面会使用这个类型
========================================================= */

export type ContactPageData = {
   seo: ContactSeoData;
   hero: ContactHeroData;
   support: ContactSupportData;
   form: ContactFormData;
   guide: ContactGuideData;
   contactInfo: ContactInfoData;
   bottomCta: ContactBottomCtaData;
};

/* =========================================================
   多语言联系我们数据类型
   后续 /en/contact /es/contact 等会使用
========================================================= */

export type ContactIntlPageDataMap = Record<ContactIntlLocale, ContactPageData>;

/* =========================================================
   找经销商页面基础类型
   现在先预留，后续做 Become a Distributor 页面时再扩展
========================================================= */

export type DistributorPageData = {
   seo: ContactSeoData;
   hero: ContactHeroData;
};

export type DistributorIntlPageDataMap = Record<
   ContactIntlLocale,
   DistributorPageData
>;