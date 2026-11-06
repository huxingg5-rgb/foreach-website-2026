/* =========================================================
   exhibition-booking-dialog.copy.ts
   恒永达官网｜「预约现场洽谈」弹窗专用文案（6 种语言）

   说明：
   1. 只放弹窗自己的文案：关闭按钮、提交成功标题、完成按钮
   2. 标题、副标题、字段、提示语与文章右侧预约表单共用 medica-2026-booking.ts
========================================================= */

import type { LocaleCode } from "@/lib/i18n";

type ExhibitionBookingDialogCopy = {
  /** 右上角关闭按钮（读屏用） */
  closeLabel: string;
  /** 提交成功后的标题 */
  successTitle: string;
  /** 提交成功后的按钮 */
  done: string;
};

export const EXHIBITION_BOOKING_DIALOG_COPY: Record<LocaleCode, ExhibitionBookingDialogCopy> = {
  "zh-CN": {
    closeLabel: "关闭预约现场洽谈",
    successTitle: "预约已提交",
    done: "完成",
  },
  en: {
    closeLabel: "Close meeting booking form",
    successTitle: "Booking received",
    done: "Done",
  },
  es: {
    closeLabel: "Cerrar formulario de reunión",
    successTitle: "Solicitud recibida",
    done: "Cerrar",
  },
  fr: {
    closeLabel: "Fermer le formulaire de rendez-vous",
    successTitle: "Demande reçue",
    done: "Fermer",
  },
  ko: {
    closeLabel: "미팅 예약 양식 닫기",
    successTitle: "예약이 접수되었습니다",
    done: "확인",
  },
  ru: {
    closeLabel: "Закрыть форму записи на встречу",
    successTitle: "Заявка получена",
    done: "Готово",
  },
};
