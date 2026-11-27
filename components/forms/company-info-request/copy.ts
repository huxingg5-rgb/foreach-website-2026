import type { LocaleCode } from "@/lib/i18n";

type Copy = {
  close: string; back: string; requestedItems: string; items: string; summary: string;
  email: string; emailPlaceholder: string; sendCode: string; resendCode: string; sending: string;
  codeSent: string; verified: string; code: string; codePlaceholder: string; name: string;
  namePlaceholder: string; company: string; companyPlaceholder: string; country: string;
  countryPlaceholder: string; phone: string; phonePlaceholder: string; notes: string;
  notesPlaceholder: string; verifying: string; submitting: string; requestFailed: string;
  invalidEmail: string; requestCodeFirst: string; enterCode: string;
};

type RequestLocale = LocaleCode | "de" | "it" | "hi";

const copies: Record<RequestLocale, Copy> = {
  hi: {
    close: "डायलॉग बंद करें", back: "सूची पर लौटें", requestedItems: "माँगे गए आइटम", items: "आइटम",
    summary: "ज़रूरी दस्तावेज़ों की पुष्टि करें और अपनी कंपनी की जानकारी दें। आपके ईमेल पर छह अंकों का कोड भेजा जाएगा।",
    email: "ईमेल *", emailPlaceholder: "दस्तावेज़ पाने का ईमेल पता",
    sendCode: "कोड भेजें", resendCode: "कोड फिर भेजें", sending: "भेजा जा रहा है…",
    codeSent: "कोड भेज दिया गया है। अपना ईमेल देखें।", verified: "ईमेल सत्यापित हो गया।",
    code: "ईमेल सत्यापन कोड *", codePlaceholder: "सत्यापन कोड दर्ज करें",
    name: "नाम *", namePlaceholder: "संपर्क व्यक्ति का नाम", company: "कंपनी *", companyPlaceholder: "कंपनी का नाम",
    country: "देश / क्षेत्र", countryPlaceholder: "देश या क्षेत्र", phone: "फ़ोन / WhatsApp",
    phonePlaceholder: "वैकल्पिक, आगे संपर्क के लिए", notes: "टिप्पणी",
    notesPlaceholder: "अनुप्रयोग, इस्तेमाल का उद्देश्य या दूसरी ज़रूरतें जोड़ें",
    verifying: "सत्यापन जारी है…", submitting: "अनुरोध भेजा जा रहा है…",
    requestFailed: "अनुरोध पूरा नहीं हो सका। बाद में फिर कोशिश करें।",
    invalidEmail: "मान्य ईमेल पता दर्ज करें।", requestCodeFirst: "पहले सत्यापन कोड मँगाएँ।",
    enterCode: "छह अंकों का पूरा सत्यापन कोड दर्ज करें।",
  },
  de: {
    close: "Dialog schließen", back: "Zurück zur Auswahlliste", requestedItems: "Angefragte Unterlagen", items: "Einträge",
    summary: "Prüfen Sie die angefragten Unterlagen und geben Sie Ihre Unternehmensdaten ein. Sie erhalten einen sechsstelligen Code per E-Mail.",
    email: "E-Mail *", emailPlaceholder: "E-Mail-Adresse für den Empfang der Unterlagen",
    sendCode: "Code senden", resendCode: "Code erneut senden", sending: "Wird gesendet …",
    codeSent: "Der Code wurde gesendet. Prüfen Sie Ihren Posteingang.", verified: "E-Mail-Adresse bestätigt.",
    code: "Bestätigungscode *", codePlaceholder: "Bestätigungscode eingeben", name: "Name *", namePlaceholder: "Name der Kontaktperson",
    company: "Unternehmen *", companyPlaceholder: "Firmenname", country: "Land / Region", countryPlaceholder: "Land oder Region",
    phone: "Telefon / WhatsApp", phonePlaceholder: "Optional für Rückfragen", notes: "Anmerkungen",
    notesPlaceholder: "Anwendung, Verwendungszweck oder weitere Anforderungen ergänzen",
    verifying: "Wird geprüft …", submitting: "Wird gesendet …",
    requestFailed: "Die Anfrage konnte nicht verarbeitet werden. Versuchen Sie es später erneut.",
    invalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein.", requestCodeFirst: "Fordern Sie zuerst einen Bestätigungscode an.",
    enterCode: "Geben Sie den vollständigen sechsstelligen Bestätigungscode ein.",
  },
  it: {
    close: "Chiudi finestra", back: "Torna all’elenco", requestedItems: "Voci della richiesta", items: "voci",
    summary: "Conferma i documenti richiesti e inserisci i dati dell’azienda. Riceverai un codice a sei cifre via e-mail.",
    email: "E-mail *", emailPlaceholder: "Indirizzo e-mail per ricevere i documenti",
    sendCode: "Invia codice", resendCode: "Invia un nuovo codice", sending: "Invio in corso…",
    codeSent: "Codice inviato. Controlla la casella di posta.", verified: "E-mail verificata.",
    code: "Codice di verifica e-mail *", codePlaceholder: "Inserisci il codice di verifica",
    name: "Nome *", namePlaceholder: "Nome del contatto", company: "Azienda *", companyPlaceholder: "Nome dell’azienda",
    country: "Paese / Regione", countryPlaceholder: "Paese o regione", phone: "Telefono / WhatsApp",
    phonePlaceholder: "Facoltativo, per ulteriori contatti", notes: "Note",
    notesPlaceholder: "Aggiungi dettagli sull’applicazione, sull’uso previsto o su altri requisiti",
    verifying: "Verifica in corso…", submitting: "Invio in corso…",
    requestFailed: "Impossibile completare la richiesta. Riprova più tardi.",
    invalidEmail: "Inserisci un indirizzo e-mail valido.", requestCodeFirst: "Richiedi prima un codice di verifica.",
    enterCode: "Inserisci il codice di verifica completo di sei cifre.",
  },
  "zh-CN": { close:"关闭弹窗", back:"返回清单", requestedItems:"申请项目", items:"项", summary:"请确认需要申请的资料项目并填写公司信息。六位验证码将发送至您填写的邮箱。", email:"邮箱 *", emailPlaceholder:"请输入接收资料的邮箱", sendCode:"发送验证码", resendCode:"重新发送", sending:"发送中…", codeSent:"验证码已发送，请查收邮箱。", verified:"邮箱验证成功。", code:"邮箱验证码 *", codePlaceholder:"请输入邮箱验证码", name:"姓名 *", namePlaceholder:"请输入联系人姓名", company:"公司名称 *", companyPlaceholder:"请输入公司名称", country:"国家 / 地区", countryPlaceholder:"请输入国家或地区", phone:"电话", phonePlaceholder:"选填，便于进一步沟通", notes:"备注说明", notesPlaceholder:"可补充应用场景、资料用途或其他需求", verifying:"验证中…", submitting:"提交中…", requestFailed:"请求未能完成，请稍后重试。", invalidEmail:"请输入正确的邮箱地址。", requestCodeFirst:"请先发送邮箱验证码。", enterCode:"请输入完整的六位邮箱验证码。" },
  en: { close:"Close dialog", back:"Return to List", requestedItems:"Requested Items", items:"items", summary:"Confirm the requested materials and enter your company information. A six-digit code will be sent to your email.", email:"Email *", emailPlaceholder:"Email address for receiving materials", sendCode:"Send Code", resendCode:"Resend Code", sending:"Sending…", codeSent:"Code sent. Please check your email.", verified:"Email verified.", code:"Email Verification Code *", codePlaceholder:"Enter the verification code", name:"Name *", namePlaceholder:"Contact name", company:"Company *", companyPlaceholder:"Company name", country:"Country / Region", countryPlaceholder:"Country or region", phone:"Phone / WhatsApp", phonePlaceholder:"Optional, for further communication", notes:"Notes", notesPlaceholder:"Add application details, intended use, or other requirements", verifying:"Verifying…", submitting:"Submitting…", requestFailed:"The request could not be completed. Please try again later.", invalidEmail:"Please enter a valid email address.", requestCodeFirst:"Please request a verification code first.", enterCode:"Enter the complete six-digit verification code." },
  es: { close:"Cerrar ventana", back:"Volver a la lista", requestedItems:"Elementos solicitados", items:"elementos", summary:"Confirme los materiales solicitados e introduzca los datos de su empresa. Se enviará un código de seis dígitos a su correo.", email:"Correo electrónico *", emailPlaceholder:"Correo para recibir los materiales", sendCode:"Enviar código", resendCode:"Reenviar código", sending:"Enviando…", codeSent:"Código enviado. Revise su correo.", verified:"Correo verificado.", code:"Código de verificación *", codePlaceholder:"Introduzca el código de verificación", name:"Nombre *", namePlaceholder:"Nombre de contacto", company:"Empresa *", companyPlaceholder:"Nombre de la empresa", country:"País / Región", countryPlaceholder:"País o región", phone:"Teléfono / WhatsApp", phonePlaceholder:"Opcional, para facilitar el contacto", notes:"Observaciones", notesPlaceholder:"Añada la aplicación, el uso previsto u otros requisitos", verifying:"Verificando…", submitting:"Enviando…", requestFailed:"No se pudo completar la solicitud. Inténtelo de nuevo más tarde.", invalidEmail:"Introduzca una dirección de correo válida.", requestCodeFirst:"Solicite primero un código de verificación.", enterCode:"Introduzca el código completo de seis dígitos." },
  fr: { close:"Fermer la fenêtre", back:"Retour à la liste", requestedItems:"Éléments demandés", items:"éléments", summary:"Confirmez les documents demandés et renseignez les informations de votre société. Un code à six chiffres sera envoyé par e-mail.", email:"E-mail *", emailPlaceholder:"Adresse e-mail de réception", sendCode:"Envoyer le code", resendCode:"Renvoyer le code", sending:"Envoi…", codeSent:"Code envoyé. Consultez votre messagerie.", verified:"E-mail vérifié.", code:"Code de vérification *", codePlaceholder:"Saisissez le code de vérification", name:"Nom *", namePlaceholder:"Nom du contact", company:"Société *", companyPlaceholder:"Nom de la société", country:"Pays / Région", countryPlaceholder:"Pays ou région", phone:"Téléphone / WhatsApp", phonePlaceholder:"Facultatif, pour faciliter les échanges", notes:"Remarques", notesPlaceholder:"Précisez l’application, l’usage prévu ou toute autre demande", verifying:"Vérification…", submitting:"Envoi…", requestFailed:"La demande n’a pas pu être traitée. Réessayez plus tard.", invalidEmail:"Saisissez une adresse e-mail valide.", requestCodeFirst:"Demandez d’abord un code de vérification.", enterCode:"Saisissez le code complet à six chiffres." },
  ko: { close:"창 닫기", back:"목록으로 돌아가기", requestedItems:"신청 항목", items:"개", summary:"신청할 자료를 확인하고 회사 정보를 입력해 주세요. 입력한 이메일로 6자리 인증 코드가 발송됩니다.", email:"이메일 *", emailPlaceholder:"자료를 받을 이메일 주소를 입력해 주세요", sendCode:"인증 코드 전송", resendCode:"인증 코드 재전송", sending:"전송 중…", codeSent:"인증 코드가 전송되었습니다. 이메일을 확인해 주세요.", verified:"이메일 인증이 완료되었습니다.", code:"이메일 인증 코드 *", codePlaceholder:"이메일 인증 코드를 입력해 주세요", name:"이름 *", namePlaceholder:"담당자 이름을 입력해 주세요", company:"회사명 *", companyPlaceholder:"회사명을 입력해 주세요", country:"국가 / 지역", countryPlaceholder:"국가 또는 지역을 입력해 주세요", phone:"전화 / WhatsApp", phonePlaceholder:"선택 사항, 추가 연락에 사용됩니다", notes:"요청 사항", notesPlaceholder:"적용 분야, 자료 용도 또는 기타 요청 사항을 입력해 주세요", verifying:"인증 중…", submitting:"제출 중…", requestFailed:"요청을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.", invalidEmail:"올바른 이메일 주소를 입력해 주세요.", requestCodeFirst:"먼저 이메일 인증 코드를 요청해 주세요.", enterCode:"6자리 인증 코드를 모두 입력해 주세요." },
  ru: { close:"Закрыть окно", back:"Вернуться к списку", requestedItems:"Запрошенные материалы", items:"поз.", summary:"Подтвердите запрашиваемые материалы и укажите данные компании. Шестизначный код будет отправлен на вашу почту.", email:"Эл. почта *", emailPlaceholder:"Адрес для получения материалов", sendCode:"Отправить код", resendCode:"Отправить повторно", sending:"Отправка…", codeSent:"Код отправлен. Проверьте почту.", verified:"Адрес подтверждён.", code:"Код подтверждения *", codePlaceholder:"Введите код подтверждения", name:"Имя *", namePlaceholder:"Имя контактного лица", company:"Компания *", companyPlaceholder:"Название компании", country:"Страна / Регион", countryPlaceholder:"Страна или регион", phone:"Телефон / WhatsApp", phonePlaceholder:"Необязательно, для дальнейшей связи", notes:"Примечания", notesPlaceholder:"Укажите область применения, назначение материалов или другие требования", verifying:"Проверка…", submitting:"Отправка…", requestFailed:"Не удалось выполнить запрос. Повторите попытку позже.", invalidEmail:"Введите корректный адрес электронной почты.", requestCodeFirst:"Сначала запросите код подтверждения.", enterCode:"Введите полный шестизначный код." },
};

export function getCompanyInfoRequestCopy(locale: string): Copy {
  return copies[locale as RequestLocale] ?? copies.en;
}

const drawingCopies: Record<RequestLocale, { description: string; emptyTitle: string; emptyDescription: string; submit: string; successTitle: string; successDescription: string }> = {
  hi: {
    description: "ज़रूरी ड्रॉइंग वाले मॉडल की पुष्टि करें और अपनी संपर्क जानकारी दें।",
    emptyTitle: "कोई ड्रॉइंग नहीं चुनी गई",
    emptyDescription: "सूची पर लौटें और अनुरोध भेजने से पहले हर ज़रूरी मॉडल के लिए ड्रॉइंग जोड़ें।",
    submit: "ड्रॉइंग का अनुरोध भेजें",
    successTitle: "ड्रॉइंग का अनुरोध भेज दिया गया",
    successDescription: "अनुरोध मिल गया है और पुष्टि का ईमेल भेज दिया गया है। हमारी टीम ज़रूरी ड्रॉइंग देने से पहले चुने गए मॉडल जाँचेगी।",
  },
  de: {
    description: "Prüfen Sie, für welche Modelle Sie Zeichnungen benötigen, und geben Sie Ihre Kontaktdaten ein.",
    emptyTitle: "Keine Zeichnungen ausgewählt",
    emptyDescription: "Kehren Sie zur Auswahlliste zurück und wählen Sie pro Modell die benötigten Zeichnungen aus.",
    submit: "Zeichnungsanfrage senden",
    successTitle: "Zeichnungsanfrage gesendet",
    successDescription: "Ihre Anfrage wurde gesendet. Sie erhalten eine Bestätigung per E-Mail. Unser Team prüft die angefragten Modelle und stellt die zugehörigen Zeichnungen bereit.",
  },
  it: {
    description: "Conferma i modelli per cui servono i disegni e inserisci i tuoi recapiti.",
    emptyTitle: "Nessun disegno richiesto",
    emptyDescription: "Torna all’elenco e seleziona i disegni per ogni modello prima di inviare la richiesta.",
    submit: "Invia richiesta di disegni",
    successTitle: "Richiesta di disegni inviata",
    successDescription: "La richiesta è stata inviata. Abbiamo inviato un’e-mail di conferma. Il nostro team verificherà i modelli prima di fornire i disegni corrispondenti.",
  },
  "zh-CN": { description:"请确认需要申请的图纸型号，并留下联系信息。", emptyTitle:"当前还没有图纸需求", emptyDescription:"请先回到清单，在需要图纸的型号旁点击“添加图纸”，再提交图纸申请。", submit:"提交申请图纸", successTitle:"图纸申请已提交", successDescription:"图纸申请已成功发送，系统已向您的邮箱发送确认邮件。我们会审核申请型号，并在确认后提供相关图纸资料。" },
  en: { description:"Confirm the models that require drawings and provide your contact information.", emptyTitle:"No drawings requested", emptyDescription:"Return to the list and select Add Drawing for each required model before submitting the request.", submit:"Submit Drawing Request", successTitle:"Drawing Request Submitted", successDescription:"Your drawing request has been submitted successfully. A confirmation email has been sent, and our team will review the requested models before providing the relevant drawings." },
  es: { description:"Confirme los modelos cuyos planos necesita e indique sus datos de contacto.", emptyTitle:"No se han solicitado planos", emptyDescription:"Vuelva a la lista y seleccione Añadir plano en cada modelo antes de enviar la solicitud.", submit:"Enviar solicitud de planos", successTitle:"Solicitud de planos enviada", successDescription:"La solicitud se ha enviado correctamente. Recibirá un correo de confirmación y nuestro equipo revisará los modelos antes de facilitar los planos." },
  fr: { description:"Confirmez les modèles pour lesquels vous souhaitez des plans et indiquez vos coordonnées.", emptyTitle:"Aucun plan demandé", emptyDescription:"Revenez à la liste et sélectionnez Ajouter un plan pour chaque modèle avant d’envoyer la demande.", submit:"Envoyer la demande de plans", successTitle:"Demande de plans envoyée", successDescription:"Votre demande a bien été envoyée. Un e-mail de confirmation vous a été adressé et notre équipe vérifiera les modèles avant de fournir les plans." },
  ko: { description:"도면이 필요한 모델을 확인하고 연락처 정보를 입력해 주세요.", emptyTitle:"신청한 도면이 없습니다", emptyDescription:"목록으로 돌아가 필요한 모델마다 ‘도면 추가’를 선택한 후 요청을 제출해 주세요.", submit:"도면 요청 제출", successTitle:"도면 요청이 제출되었습니다", successDescription:"도면 요청이 정상적으로 제출되었습니다. 확인 이메일이 발송되었으며, 담당자가 요청 모델을 검토한 후 관련 도면을 제공해 드립니다." },
  ru: { description:"Подтвердите модели, для которых нужны чертежи, и укажите контактные данные.", emptyTitle:"Чертежи не запрошены", emptyDescription:"Вернитесь к списку и выберите «Добавить чертёж» для каждой нужной модели, затем отправьте запрос.", submit:"Отправить запрос чертежей", successTitle:"Запрос чертежей отправлен", successDescription:"Запрос успешно отправлен. Вам направлено письмо с подтверждением; наша команда проверит модели и предоставит соответствующие чертежи." },
};

export function getDrawingRequestCopy(locale: string) {
  return drawingCopies[locale as RequestLocale] ?? drawingCopies.en;
}
