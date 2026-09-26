/* =========================================================
   DAILY TRX — PREMIUM FRONTEND
   Version: 2026.09.26.2
   Backend/API unchanged
========================================================= */

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const page = document.getElementById("page");

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

const ADMIN_TELEGRAM_ID = "6504138324";
const BOT_USERNAME = "MyDailyTRXBot";

let currentPage = "home";

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

let currentTheme =
  localStorage.getItem("dailytrx_theme") || "dark";

if (!["en", "ps", "fa"].includes(currentLanguage)) {
  currentLanguage = "en";
}

if (!["dark", "light"].includes(currentTheme)) {
  currentTheme = "dark";
}

let walletData = {
  available_trx: 0,
  locked_trx: 0
};

let profileData = {};


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

  en: {
    dashboard: "Dashboard",
    wallet: "Wallet",
    deposit: "Deposit",
    withdraw: "Withdraw",
    investment: "Investment",
    referral: "Referral",
    notifications: "Notifications",
    support: "Support",
    profile: "Profile",

    welcome: "Welcome back",
    balance: "Total Balance",
    available: "Available",
    locked: "Locked",
    quickActions: "Quick Actions",

    addFunds: "Deposit",
    invest: "Invest",
    invite: "Invite Friends",
    myWallet: "My Wallet",

    depositTRX: "Deposit TRX",
    depositAddress: "Deposit Address",
    copyAddress: "Copy Address",
    amount: "Amount (TRX)",
    transactionHash: "Transaction Hash",
    submitDeposit: "Submit Deposit",

    depositInfo:
      "Send TRX to the address below, then submit your transaction hash.",

    investmentPlans: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    totalProfit: "Total Profit",
    startInvestment: "Start Investment",

    referralProgram: "Referral Program",
    referralCode: "Referral Code",
    referralLink: "Complete Referral Link",
    copyLink: "Copy Link",
    share: "Share",

    level1: "Level 1",
    level2: "Level 2",
    level3: "Level 3",

    notificationsTitle: "Notifications",
    noNotifications: "No new notifications.",

    supportTitle: "Support",
    supportText:
      "For support, please contact the Daily TRX administrator.",

    profileTitle: "My Profile",
    username: "Username",
    email: "Email",
    telegramId: "Telegram ID",
    verified: "Verified",
    yes: "Yes",
    no: "No",

    withdrawTitle: "Withdraw",
    withdrawText:
      "Withdrawal service will be available after the required balance and approval conditions are met.",

    loading: "Loading...",
    copied: "Copied successfully",
    failed: "Something went wrong",

    invalidAmount: "Enter a valid TRX amount.",
    invalidHash:
      "Enter a valid 64-character TRON transaction hash.",

    depositSuccess:
      "Deposit submitted successfully.",

    investing: "Processing...",
    investmentSuccess:
      "Investment created successfully.",

    insufficient:
      "Insufficient available TRX.",

    noPlans:
      "No active investment plans found.",

    admin: "Admin",
    announcement: "Announcement",
    noAnnouncement: "No announcement available.",

    language: "Language",
    light: "Light Mode",
    dark: "Dark Mode",

    referralDescription:
      "Invite friends and earn from your 3 referral levels.",

    copyReferralLink:
      "Copy your complete referral link",

    referralCopied:
      "Referral link copied successfully",

    loadingApp:
      "Loading Daily TRX..."
  },


  ps: {
    dashboard: "ډشبورډ",
    wallet: "والټ",
    deposit: "ډیپازټ",
    withdraw: "ویډرا",
    investment: "انویسټمنټ",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    support: "مرسته",
    profile: "پروفایل",

    welcome: "بیا ښه راغلاست",
    balance: "ټول بیلانس",
    available: "موجود",
    locked: "لاک شوی",
    quickActions: "چټک انتخابونه",

    addFunds: "ډیپازټ",
    invest: "انویسټ",
    invite: "ملګري راوبلئ",
    myWallet: "زما والټ",

    depositTRX: "TRX ډیپازټ",
    depositAddress: "ډیپازټ ادرس",
    copyAddress: "ادرس کاپي",
    amount: "مقدار (TRX)",
    transactionHash: "ټرانزېکشن Hash",
    submitDeposit: "ډیپازټ ثبت کړه",

    depositInfo:
      "TRX لاندې ادرس ته واستوئ، بیا خپل Transaction Hash ثبت کړئ.",

    investmentPlans: "د انویسټمنټ پلانونه",
    dailyProfit: "ورځنۍ ګټه",
    duration: "موده",
    totalProfit: "ټوله ګټه",
    startInvestment: "انویسټمنټ شروع کړه",

    referralProgram: "ریفریل پروګرام",
    referralCode: "ریفریل کوډ",
    referralLink: "مکمل ریفرل لینک",
    copyLink: "لینک کاپي",
    share: "شریکول",

    level1: "لومړی Level",
    level2: "دوهم Level",
    level3: "درېیم Level",

    notificationsTitle: "خبرتیاوې",
    noNotifications: "اوس مهال نوې خبرتیا نشته.",

    supportTitle: "مرسته",
    supportText:
      "د مرستې لپاره د Daily TRX له اډمین سره اړیکه ونیسئ.",

    profileTitle: "زما پروفایل",
    username: "یوزرنیم",
    email: "ایمیل",
    telegramId: "Telegram ID",
    verified: "تایید شوی",
    yes: "هو",
    no: "نه",

    withdrawTitle: "ویډرا",
    withdrawText:
      "د ویډرا خدمت به د لازم بیلانس او تایید شرایطو له پوره کېدو وروسته فعال شي.",

    loading: "لوډ کېږي...",
    copied: "په بریالیتوب کاپي شو",
    failed: "یوه ستونزه رامنځته شوه",

    invalidAmount:
      "د TRX صحیح مقدار ولیکئ.",

    invalidHash:
      "صحیح 64 کرکټر TRON Transaction Hash ولیکئ.",

    depositSuccess:
      "ډیپازټ په بریالیتوب ثبت شو.",

    investing: "پروسس کېږي...",

    investmentSuccess:
      "انویسټمنټ په بریالیتوب جوړ شو.",

    insufficient:
      "موجود TRX کافي نه دی.",

    noPlans:
      "فعال انویسټمنټ پلانونه ونه موندل شول.",

    admin: "اډمین",
    announcement: "اعلان",
    noAnnouncement: "اوس مهال اعلان نشته.",

    language: "ژبه",
    light: "روښانه حالت",
    dark: "تیاره حالت",

    referralDescription:
      "ملګري راوبلئ او د خپلو 3 Referral Levelونو څخه ګټه ترلاسه کړئ.",

    copyReferralLink:
      "خپل مکمل Referral Link کاپي کړئ",

    referralCopied:
      "Referral Link په بریالیتوب کاپي شو",

    loadingApp:
      "Daily TRX لوډ کېږي..."
  },


  fa: {
    dashboard: "داشبورد",
    wallet: "کیف پول",
    deposit: "واریز",
    withdraw: "برداشت",
    investment: "سرمایه‌گذاری",
    referral: "معرفی",
    notifications: "اعلان‌ها",
    support: "پشتیبانی",
    profile: "پروفایل",

    welcome: "خوش آمدید",
    balance: "موجودی کل",
    available: "قابل استفاده",
    locked: "قفل شده",
    quickActions: "گزینه‌های سریع",

    addFunds: "واریز",
    invest: "سرمایه‌گذاری",
    invite: "دعوت دوستان",
    myWallet: "کیف پول من",

    depositTRX: "واریز TRX",
    depositAddress: "آدرس واریز",
    copyAddress: "کپی آدرس",
    amount: "مقدار (TRX)",
    transactionHash: "هش تراکنش",
    submitDeposit: "ثبت واریز",

    depositInfo:
      "TRX را به آدرس زیر ارسال کنید و سپس هش تراکنش را ثبت کنید.",

    investmentPlans: "پلان‌های سرمایه‌گذاری",
    dailyProfit: "سود روزانه",
    duration: "مدت",
    totalProfit: "سود کل",
    startInvestment: "شروع سرمایه‌گذاری",

    referralProgram: "برنامه معرفی",
    referralCode: "کد معرفی",
    referralLink: "لینک کامل معرفی",
    copyLink: "کپی لینک",
    share: "اشتراک‌گذاری",

    level1: "سطح ۱",
    level2: "سطح ۲",
    level3: "سطح ۳",

    notificationsTitle: "اعلان‌ها",
    noNotifications: "اعلان جدیدی وجود ندارد.",

    supportTitle: "پشتیبانی",
    supportText:
      "برای پشتیبانی با مدیر Daily TRX تماس بگیرید.",

    profileTitle: "پروفایل من",
    username: "نام کاربری",
    email: "ایمیل",
    telegramId: "شناسه تلگرام",
    verified: "تایید شده",
    yes: "بله",
    no: "خیر",

    withdrawTitle: "برداشت",
    withdrawText:
      "خدمات برداشت پس از تکمیل شرایط لازم موجودی و تایید فعال خواهد شد.",

    loading: "در حال بارگذاری...",
    copied: "با موفقیت کپی شد",
    failed: "مشکلی رخ داد",

    invalidAmount:
      "مقدار صحیح TRX را وارد کنید.",

    invalidHash:
      "هش صحیح ۶۴ کاراکتری TRON را وارد کنید.",

    depositSuccess:
      "واریز با موفقیت ثبت شد.",

    investing: "در حال پردازش...",

    investmentSuccess:
      "سرمایه‌گذاری با موفقیت ایجاد شد.",

    insufficient:
      "موجودی TRX کافی نیست.",

    noPlans:
      "پلان فعال سرمایه‌گذاری پیدا نشد.",

    admin: "مدیر",
    announcement: "اعلان",
    noAnnouncement: "اعلانی وجود ندارد.",

    language: "زبان",
    light: "حالت روشن",
    dark: "حالت تاریک",

    referralDescription:
      "دوستان خود را دعوت کنید و از 3 سطح معرفی خود درآمد دریافت کنید.",

    copyReferralLink:
      "لینک کامل معرفی خود را کپی کنید",

    referralCopied:
      "لینک معرفی با موفقیت کپی شد",

    loadingApp:
      "در حال بارگذاری Daily TRX..."
  }

};


/* =========================================================
   HELPERS
========================================================= */

function t(key) {
  return (
    translations[currentLanguage]?.[key] ||
    translations.en[key] ||
    key
  );
}


function getTelegramId() {

  return String(
    tg?.initDataUnsafe?.user?.id ||
    localStorage.getItem(
      "dailytrx_telegram_id"
    ) ||
    ""
  );
}


function getUsername() {

  return (
    profileData.username ||
    profileData.profile?.username ||
    tg?.initDataUnsafe?.user?.username ||
    localStorage.getItem(
      "dailytrx_username"
    ) ||
    "User"
  );
}


function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function money(value) {

  const n = Number(value || 0);

  return n.toLocaleString(undefined, {
    maximumFractionDigits: 6
  });
}


function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}


/* =========================================================
   PREMIUM RUNTIME CSS
   This fixes theme/UI even if old CSS selectors differ.
========================================================= */

function installRuntimeStyles() {

  if (
    document.getElementById(
      "dailytrxRuntimeStyles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "dailytrxRuntimeStyles";

  style.textContent = `

    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      min-height: 100%;
    }

    body {
      transition:
        background .25s ease,
        color .25s ease;
    }


    /* -------------------------
       DARK MODE
    ------------------------- */

    html[data-theme="dark"] body,
    body.dark-mode {
      background:
        radial-gradient(
          circle at top,
          #142642 0%,
          #08111f 42%,
          #050a12 100%
        ) !important;

      color: #f5f7fb !important;
    }


    html[data-theme="dark"] .top-header,
    body.dark-mode .top-header {
      background:
        rgba(9,18,32,.92) !important;

      border-bottom:
        1px solid rgba(255,255,255,.08) !important;

      backdrop-filter:
        blur(18px);
    }


    html[data-theme="dark"] .card,
    body.dark-mode .card {
      background:
        linear-gradient(
          145deg,
          rgba(23,39,62,.96),
          rgba(11,22,38,.96)
        ) !important;

      color: #f7f9fc !important;

      border:
        1px solid rgba(255,255,255,.07) !important;

      box-shadow:
        0 12px 35px rgba(0,0,0,.18) !important;
    }


    html[data-theme="dark"] input,
    html[data-theme="dark"] select,
    body.dark-mode input,
    body.dark-mode select {
      background:
        rgba(255,255,255,.06) !important;

      color: #fff !important;

      border:
        1px solid rgba(255,255,255,.12) !important;
    }


    /* -------------------------
       LIGHT MODE
    ------------------------- */

    html[data-theme="light"] body,
    body.light-mode {
      background:
        linear-gradient(
          180deg,
          #f7f9fc 0%,
          #eef2f7 100%
        ) !important;

      color: #182334 !important;
    }


    html[data-theme="light"] .top-header,
    body.light-mode .top-header {
      background:
        rgba(255,255,255,.96) !important;

      color: #172033 !important;

      border-bottom:
        1px solid #e2e8f0 !important;

      box-shadow:
        0 4px 20px rgba(15,23,42,.06) !important;

      backdrop-filter:
        blur(18px);
    }


    html[data-theme="light"] .card,
    body.light-mode .card {
      background:
        #ffffff !important;

      color: #172033 !important;

      border:
        1px solid #e4e9f0 !important;

      box-shadow:
        0 10px 28px rgba(15,23,42,.07) !important;
    }


    html[data-theme="light"] .card-title,
    html[data-theme="light"] .quick-title,
    html[data-theme="light"] .plan-name,
    html[data-theme="light"] .brand-title,
    html[data-theme="light"] h1,
    html[data-theme="light"] h2,
    html[data-theme="light"] h3,
    html[data-theme="light"] p,

    body.light-mode .card-title,
    body.light-mode .quick-title,
    body.light-mode .plan-name,
    body.light-mode .brand-title,
    body.light-mode h1,
    body.light-mode h2,
    body.light-mode h3,
    body.light-mode p {
      color: #172033 !important;
    }


    html[data-theme="light"] .brand-subtitle,
    html[data-theme="light"] .welcome p,
    html[data-theme="light"] .small-stat-label,
    html[data-theme="light"] .quick-text,
    html[data-theme="light"] .info-label,
    html[data-theme="light"] .plan-row span,

    body.light-mode .brand-subtitle,
    body.light-mode .welcome p,
    body.light-mode .small-stat-label,
    body.light-mode .quick-text,
    body.light-mode .info-label,
    body.light-mode .plan-row span {
      color: #687588 !important;
    }


    html[data-theme="light"] input,
    html[data-theme="light"] select,
    body.light-mode input,
    body.light-mode select {
      background:
        #ffffff !important;

      color:
        #172033 !important;

      border:
        1px solid #d7dee8 !important;
    }


    html[data-theme="light"] input::placeholder,
    body.light-mode input::placeholder {
      color: #8a96a6 !important;
    }


    html[data-theme="light"] .bottom-nav,
    body.light-mode .bottom-nav {
      background:
        rgba(255,255,255,.97) !important;

      color: #526174 !important;

      border-top:
        1px solid #e1e7ee !important;

      box-shadow:
        0 -6px 25px rgba(15,23,42,.07) !important;
    }


    html[data-theme="light"] .nav-item,
    body.light-mode .nav-item {
      color: #687588 !important;
    }


    html[data-theme="light"] .nav-item.active,
    body.light-mode .nav-item.active {
      color: #dc2635 !important;
    }


    /* -------------------------
       HEADER
    ------------------------- */

    .top-header {
      position: sticky;
      top: 0;
      z-index: 100;

      padding:
        12px 15px;

      width: 100%;
    }


    .header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      max-width: 720px;
      margin: auto;
    }


    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }


    .brand-logo {
      width: 42px;
      height: 42px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 13px;

      background:
        linear-gradient(
          145deg,
          #ef233c,
          #b8172a
        );

      color: white;

      font-size: 25px;
      font-weight: 900;

      box-shadow:
        0 8px 22px rgba(220,38,53,.28);
    }


    .brand-title {
      font-size: 16px;
      font-weight: 900;
      letter-spacing: .5px;
      text-transform: uppercase;
    }


    .brand-subtitle {
      margin-top: 2px;
      font-size: 11px;
      opacity: .7;
    }


    .header-actions {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }


    .language-wrap {
      position: relative;
    }


    .language-select {
      height: 38px;
      min-width: 76px;
      padding: 0 9px;

      border-radius: 11px;

      outline: none;

      font-size: 12px;
      font-weight: 700;

      cursor: pointer;
    }


    .theme-btn {
      width: 38px;
      height: 38px;

      border: 0;
      border-radius: 11px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 17px;

      cursor: pointer;

      background:
        rgba(128,128,128,.12);
    }


    /* -------------------------
       PAGE
    ------------------------- */

    .page-content {
      width: 100%;
      max-width: 720px;

      margin: 0 auto;

      padding:
        18px 15px 110px;
    }


    .welcome {
      padding:
        8px 3px 16px;
    }


    .welcome h2 {
      margin: 0;
      font-size: 21px;
      line-height: 1.35;
      font-weight: 850;
    }


    .welcome p {
      margin: 5px 0 0;
      font-size: 13px;
      opacity: .7;
    }


    .card {
      border-radius: 20px;
      padding: 17px;
      margin-bottom: 14px;
    }


    .card-title {
      font-size: 16px;
      font-weight: 800;
      margin-bottom: 13px;
    }


    /* -------------------------
       BALANCE
    ------------------------- */

    .balance-card {
      position: relative;
      overflow: hidden;

      background:
        linear-gradient(
          135deg,
          #172a46,
          #0c1829
        ) !important;

      color: #fff !important;

      border: 0 !important;
    }


    html[data-theme="light"] .balance-card,
    body.light-mode .balance-card {
      background:
        linear-gradient(
          135deg,
          #172a46,
          #253e63
        ) !important;

      color: #fff !important;
    }


    .balance-card::after {
      content: "";

      position: absolute;

      width: 160px;
      height: 160px;

      right: -70px;
      top: -70px;

      border-radius: 50%;

      background:
        rgba(255,255,255,.07);
    }


    .balance-label {
      font-size: 12px;
      opacity: .72;
    }


    .balance-value {
      margin-top: 7px;

      font-size: 34px;
      line-height: 1.15;

      font-weight: 900;

      letter-spacing: -.8px;
    }


    .balance-unit {
      font-size: 14px;
      opacity: .7;
      font-weight: 700;
    }


    .balance-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      margin-top: 18px;
    }


    .small-stat {
      padding: 11px;
      border-radius: 13px;

      background:
        rgba(255,255,255,.08);
    }


    .small-stat-label {
      font-size: 10px;
      opacity: .65;
    }


    .small-stat-value {
      margin-top: 4px;
      font-size: 14px;
      font-weight: 800;
    }


    /* -------------------------
       QUICK CARDS
    ------------------------- */

    .quick-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }


    .quick-card {
      min-height: 112px;

      border: 0;
      border-radius: 17px;

      padding: 15px;

      text-align: left;

      cursor: pointer;

      background:
        rgba(128,128,128,.07);

      color: inherit;

      transition:
        transform .18s ease,
        box-shadow .18s ease;
    }


    .quick-card:active {
      transform: scale(.97);
    }


    html[data-theme="light"] .quick-card,
    body.light-mode .quick-card {
      background:
        #f6f8fb !important;

      border:
        1px solid #e8edf3;
    }


    .quick-icon {
      width: 39px;
      height: 39px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 12px;

      background:
        rgba(220,38,53,.10);

      font-size: 19px;
    }


    .quick-title {
      margin-top: 10px;
      font-size: 14px;
      font-weight: 850;
    }


    .quick-text {
      margin-top: 3px;
      font-size: 11px;
      opacity: .65;
    }


    /* -------------------------
       BUTTONS
    ------------------------- */

    .primary-button,
    .primary-btn {
      width: 100%;

      min-height: 46px;

      border: 0;
      border-radius: 13px;

      background:
        linear-gradient(
          135deg,
          #e62b3c,
          #b8172a
        ) !important;

      color: #fff !important;

      font-size: 14px;
      font-weight: 800;

      cursor: pointer;

      box-shadow:
        0 8px 20px rgba(220,38,53,.18);
    }


    .secondary-button {
      width: 100%;

      min-height: 44px;

      margin-top: 9px;

      border-radius: 12px;

      font-size: 13px;
      font-weight: 750;

      cursor: pointer;
    }


    html[data-theme="light"] .secondary-button,
    body.light-mode .secondary-button {
      background: #f5f7fa !important;
      color: #182334 !important;
      border: 1px solid #dfe5ed !important;
    }


    /* -------------------------
       INPUTS
    ------------------------- */

    .input-group {
      margin-bottom: 13px;
    }


    .input-group label {
      display: block;

      margin-bottom: 6px;

      font-size: 12px;
      font-weight: 700;
      opacity: .75;
    }


    input,
    select {
      width: 100%;
      min-height: 45px;

      border-radius: 12px;

      padding:
        0 12px;

      outline: none;

      font-size: 13px;
    }


    /* -------------------------
       REFERRAL
    ------------------------- */

    .referral-code {
      padding: 15px;

      border-radius: 13px;

      background:
        rgba(220,38,53,.09);

      border:
        1px dashed rgba(220,38,53,.35);

      text-align: center;

      font-size: 19px;
      font-weight: 900;

      letter-spacing: 1px;

      word-break: break-all;
    }


    .referral-link-box {
      display: flex;
      gap: 7px;
      align-items: stretch;
    }


    .referral-link-input {
      flex: 1;
      min-width: 0;

      font-size: 11px !important;
      font-weight: 600;

      direction: ltr;
      text-align: left;
    }


    .copy-btn {
      flex: 0 0 46px;

      border: 0;
      border-radius: 12px;

      background:
        #e62b3c;

      color: white;

      cursor: pointer;

      font-size: 18px;
    }


    .referral-levels {
      display: grid;
      gap: 9px;
    }


    .referral-level {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 12px 13px;

      border-radius: 13px;

      background:
        rgba(128,128,128,.07);
    }


    .level-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }


    .level-number {
      width: 32px;
      height: 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      background:
        rgba(220,38,53,.12);

      color:
        #dc2637;

      font-weight: 900;
    }


    .level-name {
      font-size: 13px;
      font-weight: 750;
    }


    .level-rate {
      font-size: 17px;
      font-weight: 900;
      color: #dc2637;
    }


    /* -------------------------
       DEPOSIT QR
    ------------------------- */

    .qr-box {
      display: flex;
      justify-content: center;

      padding: 14px;
      margin-bottom: 13px;

      border-radius: 17px;

      background: white;
    }


    .qr-box img {
      width: 190px;
      height: 190px;

      display: block;

      border-radius: 8px;
    }


    .address-box {
      padding: 12px;

      border-radius: 12px;

      background:
        rgba(128,128,128,.08);

      direction: ltr;
      text-align: center;

      font-size: 11px;
      line-height: 1.5;

      word-break: break-all;
    }


    /* -------------------------
       PLANS
    ------------------------- */

    .plan-card {
      overflow: hidden;
    }


    .plan-name {
      font-size: 15px;
      font-weight: 850;
    }


    .plan-amount {
      margin:
        12px 0;

      font-size: 27px;
      font-weight: 900;
    }


    .plan-row,
    .info-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 12px;

      padding: 9px 0;

      border-bottom:
        1px solid rgba(128,128,128,.12);

      font-size: 12px;
    }


    .plan-row:last-of-type,
    .info-line:last-child {
      border-bottom: 0;
    }


    .plan-row strong,
    .info-value {
      font-weight: 800;
    }


    .plan-card .primary-button {
      margin-top: 12px;
    }


    /* -------------------------
       NOTICE / MESSAGES
    ------------------------- */

    .notice {
      padding: 12px;

      border-radius: 12px;

      background:
        rgba(128,128,128,.07);

      font-size: 12px;
      line-height: 1.6;
    }


    .form-message {
      min-height: 18px;
      margin: 9px 0 0;

      font-size: 12px;
    }


    .error-text {
      color: #ef3346 !important;
    }


    .success-text {
      color: #16a36a !important;
    }


    .loading-box {
      min-height: 130px;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;

      gap: 10px;
    }


    .spinner {
      width: 30px;
      height: 30px;

      border:
        3px solid rgba(128,128,128,.18);

      border-top-color:
        #dc2637;

      border-radius: 50%;

      animation:
        dailySpin .75s linear infinite;
    }


    @keyframes dailySpin {
      to {
        transform: rotate(360deg);
      }
    }


    /* -------------------------
       BOTTOM NAV
    ------------------------- */

    .bottom-nav {
      position: fixed;

      left: 0;
      right: 0;
      bottom: 0;

      z-index: 200;

      display: grid;
      grid-template-columns:
        repeat(5, 1fr);

      max-width: 720px;
      margin: auto;

      padding:
        8px 6px
        calc(8px + env(safe-area-inset-bottom));

      backdrop-filter:
        blur(18px);
    }


    .nav-item {
      min-height: 52px;

      border: 0;
      background: transparent;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;

      gap: 3px;

      font-size: 9px;
      font-weight: 700;

      cursor: pointer;
    }


    .nav-icon {
      font-size: 19px;
      line-height: 1;
    }


    /* -------------------------
       SPLASH
    ------------------------- */

    #dailytrxSplash {
      position: fixed;

      inset: 0;

      z-index: 999999;

      display: flex;
      align-items: center;
      justify-content: center;

      background:
        radial-gradient(
          circle at center,
          #172d4d 0%,
          #08111f 48%,
          #040810 100%
        );

      color: white;

      opacity: 1;

      transition:
        opacity .45s ease,
        visibility .45s ease;
    }


    #dailytrxSplash.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }


    .splash-box {
      width: min(82vw, 320px);

      text-align: center;
    }


    .splash-logo {
      width: 82px;
      height: 82px;

      margin: 0 auto 17px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 25px;

      background:
        linear-gradient(
          145deg,
          #ef233c,
          #a91427
        );

      box-shadow:
        0 18px 45px rgba(220,38,53,.30);

      animation:
        splashPulse 1.4s ease-in-out infinite;
    }


    .splash-logo span {
      font-size: 50px;
      font-weight: 900;
      color: white;
    }


    .splash-title {
      font-size: 25px;
      font-weight: 950;
      letter-spacing: 1px;
      text-transform: uppercase;
    }


    .splash-subtitle {
      margin-top: 7px;

      font-size: 12px;

      color:
        rgba(255,255,255,.65);
    }


    .loading-line {
      position: relative;

      width: 100%;
      height: 4px;

      margin-top: 27px;

      overflow: hidden;

      border-radius: 99px;

      background:
        rgba(255,255,255,.12);
    }


    .loading-line::after {
      content: "";

      position: absolute;

      top: 0;
      bottom: 0;

      left: -40%;

      width: 40%;

      border-radius: 99px;

      background:
        linear-gradient(
          90deg,
          transparent,
          #ef3348,
          #ff7380,
          transparent
        );

      animation:
        loadingMove 1.05s ease-in-out infinite;
    }


    @keyframes loadingMove {
      from {
        left: -40%;
      }

      to {
        left: 100%;
      }
    }


    @keyframes splashPulse {
      0%, 100% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.055);
      }
    }


    /* -------------------------
       REGISTRATION
    ------------------------- */

    #registration {
      position: relative;
      z-index: 2;
    }


    #registration.hidden {
      display: none !important;
    }


    #app.app-hidden {
      display: none !important;
    }


    /* -------------------------
       RTL
    ------------------------- */

    html[dir="rtl"] .quick-card {
      text-align: right;
    }


    html[dir="rtl"] .referral-link-input,
    html[dir="rtl"] .address-box {
      direction: ltr;
      text-align: left;
    }


    /* -------------------------
       MOBILE
    ------------------------- */

    @media (max-width: 420px) {

      .page-content {
        padding-left: 12px;
        padding-right: 12px;
      }

      .brand-logo {
        width: 39px;
        height: 39px;
        border-radius: 12px;
      }

      .brand-title {
        font-size: 14px;
      }

      .brand-subtitle {
        font-size: 10px;
      }

      .language-select {
        min-width: 66px;
      }

      .balance-value {
        font-size: 30px;
      }

      .quick-card {
        min-height: 105px;
      }

    }

  `;

  document.head.appendChild(style);
}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

  currentTheme =
    currentTheme === "light"
      ? "light"
      : "dark";

  const root =
    document.documentElement;

  const body =
    document.body;

  root.dataset.theme =
    currentTheme;

  body.dataset.theme =
    currentTheme;

  body.classList.toggle(
    "light",
    currentTheme === "light"
  );

  body.classList.toggle(
    "dark",
    currentTheme === "dark"
  );

  body.classList.toggle(
    "light-mode",
    currentTheme === "light"
  );

  body.classList.toggle(
    "dark-mode",
    currentTheme === "dark"
  );

  root.style.colorScheme =
    currentTheme;

  localStorage.setItem(
    "dailytrx_theme",
    currentTheme
  );
}


function toggleTheme() {

  currentTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  applyTheme();

  render(currentPage);
}


/* =========================================================
   LANGUAGE
========================================================= */

function applyLanguageDirection() {

  document.documentElement.lang =
    currentLanguage;

  document.documentElement.dir =
    currentLanguage === "ps" ||
    currentLanguage === "fa"
      ? "rtl"
      : "ltr";
}


/* =========================================================
   SPLASH
========================================================= */

function createSplash() {

  if (
    document.getElementById(
      "dailytrxSplash"
    )
  ) {
    return;
  }

  const splash =
    document.createElement("div");

  splash.id =
    "dailytrxSplash";

  splash.innerHTML = `

    <div class="splash-box">

      <div class="splash-logo">
        <span>₮</span>
      </div>

      <div class="splash-title">
        DAILY TRX
      </div>

      <div class="splash-subtitle">
        ${escapeHtml(
          t("loadingApp")
        )}
      </div>

      <div class="loading-line"></div>

    </div>

  `;

  document.body.prepend(splash);
}


function hideSplash() {

  const splash =
    document.getElementById(
      "dailytrxSplash"
    );

  if (!splash) {
    return;
  }

  splash.classList.add("hide");

  setTimeout(() => {

    if (splash.parentNode) {
      splash.remove();
    }

  }, 500);
}


/* =========================================================
   API
========================================================= */

async function apiGet(url) {

  const response =
    await fetch(url, {
      cache: "no-store"
    });

  let data = {};

  try {
    data = await response.json();
  } catch (_) {}

  if (!response.ok) {

    throw new Error(
      data?.message ||
      data?.error ||
      "Request failed"
    );
  }

  return data;
}


async function apiPost(url, body) {

  const response =
    await fetch(url, {

      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(body)
    });

  let data = {};

  try {
    data = await response.json();
  } catch (_) {}

  if (!response.ok) {

    throw new Error(
      data?.message ||
      data?.error ||
      "Request failed"
    );
  }

  return data;
}


/* =========================================================
   HEADER
========================================================= */

function header(title = "Daily TRX") {

  return `

    <header class="top-header">

      <div class="header-row">

        <div class="brand">

          <div class="brand-logo">
            ₮
          </div>

          <div class="brand-text">

            <div class="brand-title">
              DAILY TRX
            </div>

            <div class="brand-subtitle">
              ${escapeHtml(title)}
            </div>

          </div>

        </div>


        <div class="header-actions">

          <select
            id="languageSelect"
            class="language-select"
            aria-label="${escapeHtml(
              t("language")
            )}"
          >

            <option
              value="en"
              ${currentLanguage === "en"
                ? "selected"
                : ""}
            >
              English
            </option>

            <option
              value="ps"
              ${currentLanguage === "ps"
                ? "selected"
                : ""}
            >
              پښتو
            </option>

            <option
              value="fa"
              ${currentLanguage === "fa"
                ? "selected"
                : ""}
            >
              دری
            </option>

          </select>


          <button
            type="button"
            id="themeButton"
            class="theme-btn"
            aria-label="${escapeHtml(
              currentTheme === "dark"
                ? t("light")
                : t("dark")
            )}"
          >

            ${
              currentTheme === "dark"
                ? "☀️"
                : "🌙"
            }

          </button>

        </div>

      </div>

    </header>

  `;
}


/* =========================================================
   NAVIGATION
========================================================= */

function navigation() {

  const items = [

    ["home", "⌂", t("dashboard")],

    ["wallet", "▣", t("wallet")],

    ["deposit", "＋", t("deposit")],

    ["investment", "◈", t("investment")],

    ["profile", "●", t("profile")]

  ];


  return `

    <nav class="bottom-nav">

      ${items.map(item => `

        <button
          type="button"
          class="nav-item ${
            currentPage === item[0]
              ? "active"
              : ""
          }"
          data-page="${item[0]}"
        >

          <span class="nav-icon">
            ${item[1]}
          </span>

          <span>
            ${escapeHtml(item[2])}
          </span>

        </button>

      `).join("")}

    </nav>

  `;
}


/* =========================================================
   HOME
========================================================= */

async function renderHome() {

  page.innerHTML = `

    ${header(t("dashboard"))}

    <main class="page-content">

      <div class="welcome">

        <h2>
          ${escapeHtml(t("welcome"))},
          ${escapeHtml(getUsername())} 👋
        </h2>

        <p>
          ${escapeHtml(
            t("dashboard")
          )}
        </p>

      </div>


      <div id="homeContent">

        <div class="card loading-box">

          <div class="spinner"></div>

          <div>
            ${escapeHtml(t("loading"))}
          </div>

        </div>

      </div>

    </main>

    ${navigation()}

  `;

  bindHeader();

  try {

    await loadWallet();

    let announcement = null;

    try {

      const data =
        await apiGet(
          "/api/announcement"
        );

      announcement =
        data?.announcement ||
        null;

    } catch (_) {}


    const total =
      Number(
        walletData.available_trx || 0
      ) +
      Number(
        walletData.locked_trx || 0
      );


    document.getElementById(
      "homeContent"
    ).innerHTML = `

      <div class="card balance-card">

        <div class="balance-label">
          ${escapeHtml(
            t("balance")
          )}
        </div>

        <div class="balance-value">
          ${money(total)}
          <span class="balance-unit">
            TRX
          </span>
        </div>


        <div class="balance-row">

          <div class="small-stat">

            <div class="small-stat-label">
              ${escapeHtml(
                t("available")
              )}
            </div>

            <div class="small-stat-value">
              ${money(
                walletData.available_trx
              )}
              TRX
            </div>

          </div>


          <div class="small-stat">

            <div class="small-stat-label">
              ${escapeHtml(
                t("locked")
              )}
            </div>

            <div class="small-stat-value">
              ${money(
                walletData.locked_trx
              )}
              TRX
            </div>

          </div>

        </div>

      </div>


      ${
        announcement
          ? `

            <div class="card">

              <div class="card-title">
                📢 ${escapeHtml(
                  t("announcement")
                )}
              </div>

              <div class="notice">

                ${escapeHtml(
                  typeof announcement ===
                  "string"
                    ? announcement
                    : announcement.message ||
                      announcement.text ||
                      ""
                )}

              </div>

            </div>

          `
          : ""
      }


      <div class="card">

        <div class="card-title">
          ${escapeHtml(
            t("quickActions")
          )}
        </div>


        <div class="quick-grid">

          <button
            class="quick-card"
            data-page="deposit"
            type="button"
          >

            <div class="quick-icon">
              💳
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("addFunds")
              )}
            </div>

            <div class="quick-text">
              ${escapeHtml(
                t("deposit")
              )}
            </div>

          </button>


          <button
            class="quick-card"
            data-page="investment"
            type="button"
          >

            <div class="quick-icon">
              📈
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("invest")
              )}
            </div>

            <div class="quick-text">
              ${escapeHtml(
                t("investment")
              )}
            </div>

          </button>


          <button
            class="quick-card"
            data-page="referral"
            type="button"
          >

            <div class="quick-icon">
              👥
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("invite")
              )}
            </div>

            <div class="quick-text">
              ${escapeHtml(
                t("referral")
              )}
            </div>

          </button>


          <button
            class="quick-card"
            data-page="wallet"
            type="button"
          >

            <div class="quick-icon">
              💰
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("myWallet")
              )}
            </div>

            <div class="quick-text">
              ${escapeHtml(
                t("wallet")
              )}
            </div>

          </button>

        </div>

      </div>

    `;

    bindPageButtons();

  } catch (error) {

    document.getElementById(
      "homeContent"
    ).innerHTML = `

      <div class="card">

        <div class="notice">
          ${escapeHtml(
            error.message ||
            t("failed")
          )}
        </div>

      </div>

    `;

  }
}


/* =========================================================
   WALLET
========================================================= */

async function renderWallet() {

  page.innerHTML = `

    ${header(t("wallet"))}

    <div class="page-content">

      <div class="card loading-box">

        <div class="spinner"></div>

        <div>
          ${escapeHtml(t("loading"))}
        </div>

      </div>

    </div>

    ${navigation()}

  `;

  bindHeader();

  try {

    await loadWallet();

    const total =
      Number(walletData.available_trx || 0) +
      Number(walletData.locked_trx || 0);


    page.innerHTML = `

      ${header(t("wallet"))}

      <div class="page-content">

        <div class="card balance-card">

          <div class="balance-label">
            ${escapeHtml(
              t("balance")
            )}
          </div>

          <div class="balance-value">
            ${money(total)}
            <span class="balance-unit">
              TRX
            </span>
          </div>

        </div>


        <div class="card">

          <div class="info-line">

            <span class="info-label">
              ${escapeHtml(
                t("available")
              )}
            </span>

            <span class="info-value">
              ${money(
                walletData.available_trx
              )} TRX
            </span>

          </div>


          <div class="info-line">

            <span class="info-label">
              ${escapeHtml(
                t("locked")
              )}
            </span>

            <span class="info-value">
              ${money(
                walletData.locked_trx
              )} TRX
            </span>

          </div>


          <div class="info-line">

            <span class="info-label">
              Total
            </span>

            <span class="info-value">
              ${money(total)} TRX
            </span>

          </div>

        </div>


        <div class="quick-grid">

          <button
            class="quick-card"
            data-page="deposit"
            type="button"
          >

            <div class="quick-icon">
              ＋
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("deposit")
              )}
            </div>

          </button>


          <button
            class="quick-card"
            data-page="withdraw"
            type="button"
          >

            <div class="quick-icon">
              ↗
            </div>

            <div class="quick-title">
              ${escapeHtml(
                t("withdraw")
              )}
            </div>

          </button>

        </div>

      </div>

      ${navigation()}

    `;

    bindHeader();
    bindPageButtons();

  } catch (error) {

    page.innerHTML = `

      ${header(t("wallet"))}

      <div class="page-content">

        <div class="card">

          <div class="notice">
            ${escapeHtml(
              error.message ||
              t("failed")
            )}
          </div>

        </div>

      </div>

      ${navigation()}

    `;

    bindHeader();
  }
}


/* =========================================================
   DEPOSIT
========================================================= */

function renderDeposit() {

  const qr =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(
      DEPOSIT_ADDRESS
    );


  page.innerHTML = `

    ${header(t("depositTRX"))}

    <div class="page-content">

      <div class="card">

        <div class="card-title">
          ${escapeHtml(
            t("depositAddress")
          )}
        </div>


        <div class="qr-box">

          <img
            src="${qr}"
            alt="TRX Deposit QR"
          />

        </div>


        <div class="address-box">
          ${escapeHtml(
            DEPOSIT_ADDRESS
          )}
        </div>


        <button
          id="copyAddressButton"
          class="secondary-button"
          type="button"
        >
          📋 ${escapeHtml(
            t("copyAddress")
          )}
        </button>

      </div>


      <div class="card">

        <div class="notice">
          ${escapeHtml(
            t("depositInfo")
          )}
        </div>


        <div class="input-group"
          style="margin-top:15px"
        >

          <label>
            ${escapeHtml(
              t("amount")
            )}
          </label>

          <input
            id="depositAmount"
            type="number"
            min="0"
            step="0.000001"
            placeholder="100"
          />

        </div>


        <div class="input-group">

          <label>
            ${escapeHtml(
              t("transactionHash")
            )}
          </label>

          <input
            id="depositTxHash"
            type="text"
            placeholder="64-character TRON TXID"
            autocomplete="off"
          />

        </div>


        <button
          id="submitDepositButton"
          class="primary-button"
          type="button"
        >
          ${escapeHtml(
            t("submitDeposit")
          )}
        </button>


        <p
          id="depositMessage"
          class="form-message"
        ></p>

      </div>

    </div>

    ${navigation()}

  `;

  bindHeader();


  document
    .getElementById(
      "copyAddressButton"
    )
    ?.addEventListener(
      "click",
      async () => {

        await copyText(
          DEPOSIT_ADDRESS
        );

        const button =
          document.getElementById(
            "copyAddressButton"
          );

        button.textContent =
          "✓ " + t("copied");

        setTimeout(() => {

          button.textContent =
            "📋 " +
            t("copyAddress");

        }, 1500);

      }
    );


  document
    .getElementById(
      "submitDepositButton"
    )
    ?.addEventListener(
      "click",
      submitDeposit
    );
}


async function submitDeposit() {

  const button =
    document.getElementById(
      "submitDepositButton"
    );

  const message =
    document.getElementById(
      "depositMessage"
    );

  const amount =
    Number(
      document.getElementById(
        "depositAmount"
      )?.value || 0
    );

  const txHash =
    String(
      document.getElementById(
        "depositTxHash"
      )?.value || ""
    ).trim();


  if (!amount || amount <= 0) {

    message.textContent =
      "❌ " +
      t("invalidAmount");

    message.className =
      "form-message error-text";

    return;
  }


  if (
    !/^[a-fA-F0-9]{64}$/.test(
      txHash
    )
  ) {

    message.textContent =
      "❌ " +
      t("invalidHash");

    message.className =
      "form-message error-text";

    return;
  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {

    message.textContent =
      "❌ Telegram ID not found.";

    message.className =
      "form-message error-text";

    return;
  }


  button.disabled = true;
  button.textContent =
    t("loading");

  message.textContent = "";


  try {

    const result =
      await apiPost(
        "/api/deposit",
        {
          telegram_chat_id:
            telegramId,

          amount_trx:
            amount,

          tx_hash:
            txHash
        }
      );


    if (!result.ok) {

      throw new Error(
        result.message ||
        t("failed")
      );
    }


    message.textContent =
      "✅ " +
      t("depositSuccess");

    message.className =
      "form-message success-text";


    document.getElementById(
      "depositAmount"
    ).value = "";

    document.getElementById(
      "depositTxHash"
    ).value = "";


    await loadWallet();

  } catch (error) {

    message.textContent =
      "❌ " +
      (
        error.message ||
        t("failed")
      );

    message.className =
      "form-message error-text";

  } finally {

    button.disabled = false;

    button.textContent =
      t("submitDeposit");
  }
}


/* =========================================================
   INVESTMENT
========================================================= */

async function renderInvestment() {

  page.innerHTML = `

    ${header(
      t("investmentPlans")
    )}

    <div class="page-content">

      <div class="card loading-box">

        <div class="spinner"></div>

        <div>
          ${escapeHtml(
            t("loading")
          )}
        </div>

      </div>

    </div>

    ${navigation()}

  `;

  bindHeader();


  try {

    const data =
      await apiGet(
        "/api/investment-plans"
      );


    const plans =
      Array.isArray(data)
        ? data
        : data?.plans || [];


    if (!plans.length) {

      page.innerHTML = `

        ${header(
          t("investmentPlans")
        )}

        <div class="page-content">

          <div class="card">

            <div class="notice">
              ${escapeHtml(
                t("noPlans")
              )}
            </div>

          </div>

        </div>

        ${navigation()}

      `;

      bindHeader();

      return;
    }


    page.innerHTML = `

      ${header(
        t("investmentPlans")
      )}

      <div class="page-content">

        ${plans.map(plan => {

          const amount =
            Number(
              plan.amount_trx || 0
            );

          const daily =
            Number(
              plan.daily_profit_trx || 0
            );

          const days =
            Number(
              plan.duration_days || 0
            );

          const total =
            daily * days;


          return `

            <div class="card plan-card">

              <div class="plan-name">
                📦 ${escapeHtml(
                  plan.name ||
                  "Investment Plan"
                )}
              </div>


              <div class="plan-amount">
                ${money(amount)}
                TRX
              </div>


              <div class="plan-row">

                <span>
                  ${escapeHtml(
                    t("dailyProfit")
                  )}
                </span>

                <strong>
                  ${money(daily)} TRX
                </strong>

              </div>


              <div class="plan-row">

                <span>
                  ${escapeHtml(
                    t("duration")
                  )}
                </span>

                <strong>
                  ${days} days
                </strong>

              </div>


              <div class="plan-row">

                <span>
                  ${escapeHtml(
                    t("totalProfit")
                  )}
                </span>

                <strong>
                  ${money(total)} TRX
                </strong>

              </div>


              <button
                class="primary-button invest-button"
                data-plan-id="${escapeHtml(
                  plan.id
                )}"
                type="button"
              >
                ${escapeHtml(
                  t("startInvestment")
                )}
              </button>


              <p
                class="form-message"
                id="investmentMessage-${escapeHtml(
                  plan.id
                )}"
              ></p>

            </div>

          `;

        }).join("")}

      </div>

      ${navigation()}

    `;


    bindHeader();


    document
      .querySelectorAll(
        ".invest-button"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            createInvestment(
              button.dataset.planId,
              button
            );

          }
        );

      });


  } catch (error) {

    page.innerHTML = `

      ${header(
        t("investmentPlans")
      )}

      <div class="page-content">

        <div class="card">

          <div class="notice">
            ${escapeHtml(
              error.message ||
              t("failed")
            )}
          </div>

        </div>

      </div>

      ${navigation()}

    `;

    bindHeader();
  }
}


async function createInvestment(
  planId,
  button
) {

  const telegramId =
    getTelegramId();


  if (!telegramId) {

    alert(
      "Telegram ID not found."
    );

    return;
  }


  button.disabled = true;

  button.textContent =
    t("investing");


  try {

    const result =
      await apiPost(
        "/api/create-investment",
        {
          telegram_chat_id:
            telegramId,

          plan_id:
            Number(planId)
        }
      );


    if (!result.ok) {

      throw new Error(
        result.message ||
        t("failed")
      );
    }


    alert(
      "✅ " +
      (
        result.message ||
        t("investmentSuccess")
      )
    );


    await loadWallet();

    await renderInvestment();


  } catch (error) {

    alert(
      "❌ " +
      (
        error.message ||
        t("failed")
      )
    );


    button.disabled = false;

    button.textContent =
      t("startInvestment");
  }
}


/* =========================================================
   REFERRAL
========================================================= */

async function getReferralProfile() {

  const telegramId =
    getTelegramId();


  if (!telegramId) {
    return null;
  }


  try {

    const data =
      await apiGet(
        "/api/profile?telegram_chat_id=" +
        encodeURIComponent(
          telegramId
        )
      );


    profileData =
      data?.profile ||
      data?.user ||
      data ||
      profileData;


    return profileData;

  } catch (_) {

    return profileData;
  }
}


function getReferralCode() {

  const code =
    profileData?.referral_code ||
    profileData?.profile?.referral_code ||
    profileData?.user?.referral_code ||
    "";

  return String(code || "").trim();
}


function buildReferralLink(
  referralCode
) {

  if (!referralCode) {
    return "";
  }

  return (
    "https://t.me/" +
    BOT_USERNAME +
    "?start=" +
    encodeURIComponent(
      referralCode
    )
  );
}


async function renderReferral() {

  await getReferralProfile();


  const code =
    getReferralCode();


  const link =
    buildReferralLink(code);


  page.innerHTML = `

    ${header(
      t("referralProgram")
    )}

    <div class="page-content">


      <div class="card">

        <div class="card-title">
          👥 ${escapeHtml(
            t("referralProgram")
          )}
        </div>


        <div class="notice">
          ${escapeHtml(
            t("referralDescription")
          )}
        </div>

      </div>


      <div class="card">

        <div class="card-title">
          🔑 ${escapeHtml(
            t("referralCode")
          )}
        </div>


        <div class="referral-code">

          ${
            code
              ? escapeHtml(code)
              : "NOT-AVAILABLE"
          }

        </div>

      </div>


      <div class="card">

        <div class="card-title">
          🔗 ${escapeHtml(
            t("referralLink")
          )}
        </div>


        ${
          link

            ? `

              <div class="referral-link-box">

                <input
                  id="referralLinkInput"
                  class="referral-link-input"
                  type="text"
                  readonly
                  value="${escapeHtml(
                    link
                  )}"
                  aria-label="${escapeHtml(
                    t("referralLink")
                  )}"
                />


                <button
                  id="copyReferral"
                  class="copy-btn"
                  type="button"
                  aria-label="${escapeHtml(
                    t("copyLink")
                  )}"
                >
                  📋
                </button>

              </div>


              <div
                class="notice"
                style="margin-top:10px"
              >
                ${escapeHtml(
                  t("copyReferralLink")
                )}
              </div>


              <button
                id="shareReferral"
                class="primary-button"
                type="button"
                style="margin-top:10px"
              >
                ↗ ${escapeHtml(
                  t("share")
                )}
              </button>

            `

            : `

              <div class="notice">
                Referral code is not available yet.
              </div>

            `
        }

      </div>


      <div class="card">

        <div class="card-title">
          💰 Referral Commission
        </div>


        <div class="referral-levels">


          <div class="referral-level">

            <div class="level-left">

              <div class="level-number">
                1
              </div>

              <div class="level-name">
                ${escapeHtml(
                  t("level1")
                )}
              </div>

            </div>

            <div class="level-rate">
              6%
            </div>

          </div>


          <div class="referral-level">

            <div class="level-left">

              <div class="level-number">
                2
              </div>

              <div class="level-name">
                ${escapeHtml(
                  t("level2")
                )}
              </div>

            </div>

            <div class="level-rate">
              2%
            </div>

          </div>


          <div class="referral-level">

            <div class="level-left">

              <div class="level-number">
                3
              </div>

              <div class="level-name">
                ${escapeHtml(
                  t("level3")
                )}
              </div>

            </div>

            <div class="level-rate">
              1%
            </div>

          </div>


        </div>

      </div>

    </div>

    ${navigation()}

  `;


  bindHeader();


  document
    .getElementById(
      "copyReferral"
    )
    ?.addEventListener(
      "click",
      async () => {

        if (!link) {
          return;
        }

        await copyText(link);


        const button =
          document.getElementById(
            "copyReferral"
          );


        button.textContent =
          "✓";


        setTimeout(() => {

          button.textContent =
            "📋";

        }, 1500);

      }
    );


  document
    .getElementById(
      "shareReferral"
    )
    ?.addEventListener(
      "click",
      () => {

        if (!link) {
          return;
        }


        const shareUrl =
          "https://t.me/share/url?url=" +
          encodeURIComponent(
            link
          ) +
          "&text=" +
          encodeURIComponent(
            "Join Daily TRX using my referral link."
          );


        if (
          tg?.openTelegramLink
        ) {

          tg.openTelegramLink(
            shareUrl
          );

        } else {

          window.open(
            shareUrl,
            "_blank"
          );

        }

      }
    );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

async function renderNotifications() {

  let announcement = null;


  try {

    const data =
      await apiGet(
        "/api/announcement"
      );

    announcement =
      data?.announcement ||
      null;

  } catch (_) {}


  page.innerHTML = `

    ${header(
      t("notificationsTitle")
    )}

    <div class="page-content">

      <div class="card">

        <div class="card-title">
          📢 ${escapeHtml(
            t("notificationsTitle")
          )}
        </div>


        ${
          announcement
            ? `

              <div class="notice">
                ${escapeHtml(
                  typeof announcement ===
                  "string"
                    ? announcement
                    : announcement.message ||
                      announcement.text ||
                      ""
                )}
              </div>

            `
            : `

              <div class="notice">
                ${escapeHtml(
                  t("noNotifications")
                )}
              </div>

            `
        }

      </div>

    </div>

    ${navigation()}

  `;


  bindHeader();
}


/* =========================================================
   SUPPORT
========================================================= */

function renderSupport() {

  page.innerHTML = `

    ${header(
      t("supportTitle")
    )}

    <div class="page-content">

      <div class="card">

        <div class="card-title">
          🎧 ${escapeHtml(
            t("supportTitle")
          )}
        </div>


        <div class="notice">
          ${escapeHtml(
            t("supportText")
          )}
        </div>


        <button
          class="primary-button"
          id="adminContact"
          type="button"
          style="margin-top:12px"
        >
          ${escapeHtml(
            t("support")
          )}
        </button>

      </div>

    </div>

    ${navigation()}

  `;


  bindHeader();


  document
    .getElementById(
      "adminContact"
    )
    ?.addEventListener(
      "click",
      () => {

        const url =
          "https://t.me/" +
          BOT_USERNAME;


        if (
          tg?.openTelegramLink
        ) {

          tg.openTelegramLink(
            url
          );

        } else {

          window.open(
            url,
            "_blank"
          );

        }

      }
    );
}


/* =========================================================
   WITHDRAW
========================================================= */

function renderWithdraw() {

  page.innerHTML = `

    ${header(
      t("withdrawTitle")
    )}

    <div class="page-content">

      <div class="card">

        <div class="card-title">
          💸 ${escapeHtml(
            t("withdrawTitle")
          )}
        </div>


        <div class="notice">
          ${escapeHtml(
            t("withdrawText")
          )}
        </div>

      </div>

    </div>

    ${navigation()}

  `;


  bindHeader();
}


/* =========================================================
   PROFILE
========================================================= */

async function renderProfile() {

  const telegramId =
    getTelegramId();


  try {

    const data =
      await apiGet(
        "/api/profile?telegram_chat_id=" +
        encodeURIComponent(
          telegramId
        )
      );


    profileData =
      data?.profile ||
      data?.user ||
      data ||
      profileData;

  } catch (_) {}


  const username =
    profileData.username ||
    tg?.initDataUnsafe?.user?.username ||
    "—";


  const email =
    profileData.email ||
    "—";


  const verified =
    profileData.is_verified;


  page.innerHTML = `

    ${header(
      t("profileTitle")
    )}

    <div class="page-content">

      <div class="card">

        <div class="card-title">
          👤 ${escapeHtml(
            t("profileTitle")
          )}
        </div>


        <div class="info-line">

          <span class="info-label">
            ${escapeHtml(
              t("username")
            )}
          </span>

          <span class="info-value">
            ${escapeHtml(username)}
          </span>

        </div>


        <div class="info-line">

          <span class="info-label">
            ${escapeHtml(
              t("email")
            )}
          </span>

          <span class="info-value">
            ${escapeHtml(email)}
          </span>

        </div>


        <div class="info-line">

          <span class="info-label">
            ${escapeHtml(
              t("telegramId")
            )}
          </span>

          <span class="info-value">
            ${escapeHtml(
              telegramId || "—"
            )}
          </span>

        </div>


        <div class="info-line">

          <span class="info-label">
            ${escapeHtml(
              t("verified")
            )}
          </span>

          <span class="info-value">
            ${
              verified
                ? "✓ " + t("yes")
                : t("no")
            }
          </span>

        </div>

      </div>


      <div class="card">

        <button
          class="secondary-button"
          data-page="referral"
          type="button"
        >
          👥 ${escapeHtml(
            t("referral")
          )}
        </button>


        <button
          class="secondary-button"
          data-page="notifications"
          type="button"
        >
          🔔 ${escapeHtml(
            t("notifications")
          )}
        </button>


        <button
          class="secondary-button"
          data-page="support"
          type="button"
        >
          🎧 ${escapeHtml(
            t("support")
          )}
        </button>

      </div>

    </div>

    ${navigation()}

  `;


  bindHeader();
  bindPageButtons();
}


/* =========================================================
   WALLET API
========================================================= */

async function loadWallet() {

  const telegramId =
    getTelegramId();


  if (!telegramId) {

    throw new Error(
      "Telegram ID not found"
    );
  }


  const data =
    await apiGet(
      "/api/wallet?telegram_chat_id=" +
      encodeURIComponent(
        telegramId
      )
    );


  walletData = {

    available_trx:
      Number(
        data?.available_trx ??
        data?.wallet?.available_trx ??
        0
      ),

    locked_trx:
      Number(
        data?.locked_trx ??
        data?.wallet?.locked_trx ??
        0
      )

  };


  return walletData;
}


/* =========================================================
   COPY
========================================================= */

async function copyText(text) {

  if (!text) {
    return false;
  }


  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        text
      );

      return true;
    }

  } catch (_) {}


  try {

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;

    textarea.style.position =
      "fixed";

    textarea.style.left =
      "-9999px";

    textarea.style.top =
      "0";


    document.body.appendChild(
      textarea
    );


    textarea.focus();
    textarea.select();

    document.execCommand(
      "copy"
    );


    textarea.remove();

    return true;

  } catch (_) {

    return false;
  }
}


/* =========================================================
   HEADER CONTROLS
========================================================= */

function bindHeader() {

  const language =
    document.getElementById(
      "languageSelect"
    );


  if (language) {

    language.addEventListener(
      "change",
      () => {

        currentLanguage =
          language.value;


        if (
          !translations[
            currentLanguage
          ]
        ) {
          currentLanguage = "en";
        }


        localStorage.setItem(
          "dailytrx_language",
          currentLanguage
        );


        applyLanguageDirection();


        render(
          currentPage
        );

      }
    );

  }


  const theme =
    document.getElementById(
      "themeButton"
    );


  if (theme) {

    theme.addEventListener(
      "click",
      toggleTheme
    );

  }
}


/* =========================================================
   PAGE BUTTONS
========================================================= */

function bindPageButtons() {

  document
    .querySelectorAll(
      "[data-page]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          render(
            button.dataset.page
          );

        }
      );

    });
}


/* =========================================================
   RENDER
========================================================= */

async function render(
  pageName
) {

  currentPage =
    pageName;


  window.scrollTo({
    top: 0,
    behavior: "auto"
  });


  switch (pageName) {

    case "home":
      await renderHome();
      break;

    case "wallet":
      await renderWallet();
      break;

    case "deposit":
      renderDeposit();
      break;

    case "investment":
      await renderInvestment();
      break;

    case "referral":
      await renderReferral();
      break;

    case "notifications":
      await renderNotifications();
      break;

    case "support":
      renderSupport();
      break;

    case "withdraw":
      renderWithdraw();
      break;

    case "profile":
      await renderProfile();
      break;

    default:
      await renderHome();
  }


  applyTheme();
}


window.render =
  render;


/* =========================================================
   START APP
========================================================= */

installRuntimeStyles();

applyLanguageDirection();
applyTheme();

createSplash();


const telegramUser =
  tg?.initDataUnsafe?.user;


if (telegramUser?.id) {

  localStorage.setItem(
    "dailytrx_telegram_id",
    String(
      telegramUser.id
    )
  );

}


const app =
  document.getElementById(
    "app"
  );


const registration =
  document.getElementById(
    "registration"
  );


const userId =
  getTelegramId();


/*
  IMPORTANT:
  Do not let the old global registration key
  bypass registration for a different Telegram user.
*/

const userRegistered =
  userId
    ? localStorage.getItem(
        "dailytrx_registered_" +
        userId
      )
    : localStorage.getItem(
        "dailytrx_registered"
      );


async function startApplication() {

  const startedAt =
    Date.now();


  /* -------------------------
     EXISTING USER
  ------------------------- */

  if (
    userRegistered === "true"
  ) {

    registration?.classList.add(
      "hidden"
    );

    app?.classList.remove(
      "app-hidden"
    );


    try {

      await render("home");

    } catch (error) {

      console.error(
        "Daily TRX startup error:",
        error
      );

    }


    const elapsed =
      Date.now() -
      startedAt;


    const remaining =
      Math.max(
        1100 - elapsed,
        0
      );


    await delay(
      remaining
    );


    hideSplash();

    return;
  }


  /* -------------------------
     NEW USER
  ------------------------- */

  app?.classList.add(
    "app-hidden"
  );

  registration?.classList.remove(
    "hidden"
  );


  const referral =
    tg?.initDataUnsafe?.start_param ||
    "";


  const referralInput =
    document.getElementById(
      "regReferral"
    );


  if (referralInput) {

    referralInput.value =
      referral;

  }


  const elapsed =
    Date.now() -
    startedAt;


  const remaining =
    Math.max(
      1100 - elapsed,
      0
    );


  await delay(
    remaining
  );


  hideSplash();


  const registerButton =
    document.getElementById(
      "registerButton"
    );


  if (
    !registerButton ||
    registerButton.dataset.bound === "true"
  ) {
    return;
  }


  registerButton.dataset.bound =
    "true";


  registerButton.addEventListener(
    "click",
    async () => {

      const username =
        String(
          document.getElementById(
            "regUsername"
          )?.value || ""
        ).trim();


      const email =
        String(
          document.getElementById(
            "regEmail"
          )?.value || ""
        ).trim();


      const pin =
        String(
          document.getElementById(
            "regPin"
          )?.value || ""
        ).trim();


      const confirmPin =
        String(
          document.getElementById(
            "regConfirmPin"
          )?.value || ""
        ).trim();


      const referralCode =
        String(
          document.getElementById(
            "regReferral"
          )?.value || ""
        ).trim();


      const message =
        document.getElementById(
          "registerMessage"
        );


      if (!message) {
        return;
      }


      if (
        !username ||
        username.length < 3
      ) {

        message.textContent =
          "❌ Username must contain at least 3 characters.";

        return;
      }


      if (
        !email ||
        !email.includes("@")
      ) {

        message.textContent =
          "❌ Enter a valid email.";

        return;
      }


      if (
        !/^\d{4,6}$/.test(
          pin
        )
      ) {

        message.textContent =
          "❌ PIN must contain 4–6 digits.";

        return;
      }


      if (
        pin !== confirmPin
      ) {

        message.textContent =
          "❌ PINs do not match.";

        return;
      }


      const telegramId =
        getTelegramId();


      if (!telegramId) {

        message.textContent =
          "❌ Telegram user information not found.";

        return;
      }


      registerButton.disabled =
        true;

      registerButton.textContent =
        "Creating...";


      try {

        const result =
          await apiPost(
            "/api/register",
            {

              telegram_chat_id:
                telegramId,

              username,

              email,

              pin,

              referral_code:
                referralCode

            }
          );


        if (!result.ok) {

          throw new Error(
            result.message ||
            "Registration failed."
          );

        }


        localStorage.setItem(
          "dailytrx_registered_" +
          telegramId,
          "true"
        );


        localStorage.setItem(
          "dailytrx_username",
          username
        );


        /*
          Keep old key only for compatibility.
          It is no longer used to bypass a new
          Telegram user's registration.
        */

        localStorage.setItem(
          "dailytrx_registered",
          "true"
        );


        profileData = {

          username,

          email,

          ...(result.profile ||
            {})

        };


        registration.classList.add(
          "hidden"
        );


        app.classList.remove(
          "app-hidden"
        );


        await render("home");

      } catch (error) {

        message.textContent =
          "❌ " +
          (
            error.message ||
            "Registration failed."
          );


        registerButton.disabled =
          false;


        registerButton.textContent =
          "Create Account";
      }

    }
  );
}


/* =========================================================
   RUN
========================================================= */

startApplication();


console.log(
  "DAILY TRX PREMIUM UI LOADED — 2026.09.26.2"
);
