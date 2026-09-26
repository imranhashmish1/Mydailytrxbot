/* =========================================================
   DAILY TRX — APP.JS
   Modern Home + Splash + Wallet + Deposit + Withdraw
   Investment + Referral + Notifications + Support + Profile
   ========================================================= */

const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById("page");

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

const ADMIN_TELEGRAM_ID = "6504138324";

window.currentPage = "home";

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

let currentTheme =
  localStorage.getItem("dailytrx_theme") || "dark";


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

  en: {

    home: "Home",
    wallet: "Wallet",
    deposit: "Deposit",
    withdraw: "Withdraw",
    investment: "Investment",
    referral: "Referral",
    notifications: "Notifications",
    support: "Support",
    profile: "Profile",

    welcome: "Welcome to My Daily TRX",
    investmentWallet: "Investment Wallet",

    totalBalance: "Total Balance",
    availableBalance: "Available Balance",
    invested: "Invested",
    profit: "Profit",

    depositNow: "Deposit",
    withdrawNow: "Withdraw",

    investmentCard: "Investment",
    investmentDesc: "Plans & history",

    walletCard: "Wallet",
    walletDesc: "Balance & transactions",

    referralCard: "Referral",
    referralDesc: "Invite & earn",

    notificationsCard: "Notifications",
    notificationsDesc: "System updates",

    supportCard: "Support",
    supportDesc: "Help & assistance",

    quickActions: "Quick Actions",

    depositTitle: "Deposit TRX",
    depositNotice:
      "Send TRX only to the address below. Then submit your transaction hash.",

    depositAddress: "TRON Deposit Address",
    copyAddress: "Copy Address",
    amount: "Amount (TRX)",
    transactionHash: "Transaction Hash",
    submitDeposit: "Submit Deposit",

    withdrawTitle: "Withdraw TRX",
    withdrawAddress: "TRON Wallet Address",
    withdrawAmount: "Withdrawal Amount",
    submitWithdraw: "Submit Withdrawal",

    investmentTitle: "Investment Plan 📦",
    minimum: "Investment",
    dailyProfit: "Daily Profit",
    profitRate: "Daily Profit Rate",
    monthlyProfit: "30 Days Profit",
    yearlyProfit: "360 Days Profit",
    investmentDays: "Investment Period",
    days: "Days",

    referralTitle: "Referral Program",
    notificationTitle: "Notifications",
    supportTitle: "Support",
    profileTitle: "My Profile",

    language: "Language",
    username: "Username",
    email: "Email",
    telegramId: "Telegram ID",
    accountStatus: "Account Status",
    verified: "Verified",
    pending: "Pending",
    referralCode: "Referral Code",

    referralLevel1: "Level 1",
    referralLevel2: "Level 2",
    referralLevel3: "Level 3",

    referralRate1: "6%",
    referralRate2: "2%",
    referralRate3: "1%",

    telegramChannel: "Telegram Channel",
    telegramSupport: "Telegram Chat / Support",

    copySuccess: "Address copied successfully.",
    loading: "Loading...",
    noData: "No data available.",
    error: "Something went wrong.",
    back: "Back",

    createInvestment: "Invest Now",
    totalProfit: "Total Profit",
    balance: "Balance",
    status: "Status",
    history: "History",

    referralDescription:
      "Invite friends and build your referral network.",

    announcement: "Announcement",

    splashWelcome: "Welcome to My Daily TRX",
    splashMessage:
      "Build your TRX journey. Track your balance and grow your digital assets.",
    splashLoading: "Loading Daily TRX..."
  },


  ps: {

    home: "کور",
    wallet: "والټ",
    deposit: "ډیپازټ",
    withdraw: "ویډرا",
    investment: "پانګونه",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    support: "ملاتړ",
    profile: "پروفایل",

    welcome: "زموږ Daily TRX ته ښه راغلاست",
    investmentWallet: "د پانګونې والټ",

    totalBalance: "ټول بیلانس",
    availableBalance: "موجود بیلانس",
    invested: "پانګونه",
    profit: "ګټه",

    depositNow: "ډیپازټ",
    withdrawNow: "ویډرا",

    investmentCard: "پانګونه",
    investmentDesc: "پلانونه او تاریخچه",

    walletCard: "والټ",
    walletDesc: "بیلانس او معاملې",

    referralCard: "ریفریل",
    referralDesc: "ملګري راوبله او ګټه",

    notificationsCard: "خبرتیاوې",
    notificationsDesc: "د سیستم تازه معلومات",

    supportCard: "ملاتړ",
    supportDesc: "مرسته او ملاتړ",

    quickActions: "چټک انتخابونه",

    depositTitle: "TRX ډیپازټ",
    depositNotice:
      "یوازې TRX دې ادرس ته ولېږئ، بیا Transaction Hash ثبت کړئ.",

    depositAddress: "د TRON ډیپازټ ادرس",
    copyAddress: "ادرس کاپي",
    amount: "مقدار (TRX)",
    transactionHash: "Transaction Hash",
    submitDeposit: "ډیپازټ ثبت کړه",

    withdrawTitle: "TRX ویډرا",
    withdrawAddress: "د TRON والټ ادرس",
    withdrawAmount: "د ویډرا مقدار",
    submitWithdraw: "ویډرا ثبت کړه",

    investmentTitle: "د پانګونې پلان 📦",
    minimum: "د پانګونې مقدار",
    dailyProfit: "ورځنۍ ګټه",
    profitRate: "ورځنۍ ګټې فیصدي",
    monthlyProfit: "د ۳۰ ورځو ګټه",
    yearlyProfit: "د ۳۶۰ ورځو ګټه",
    investmentDays: "د پانګونې موده",
    days: "ورځې",

    referralTitle: "ریفریل پروګرام",
    notificationTitle: "خبرتیاوې",
    supportTitle: "ملاتړ",
    profileTitle: "زما پروفایل",

    language: "ژبه",
    username: "یوزرنیم",
    email: "ایمیل",
    telegramId: "Telegram ID",
    accountStatus: "د حساب حالت",
    verified: "تایید شوی",
    pending: "انتظار",
    referralCode: "ریفریل کوډ",

    referralLevel1: "لومړۍ کچه",
    referralLevel2: "دوهمه کچه",
    referralLevel3: "درېیمه کچه",

    referralRate1: "۶٪",
    referralRate2: "۲٪",
    referralRate3: "۱٪",

    telegramChannel: "Telegram چینل",
    telegramSupport: "Telegram چټ / ملاتړ",

    copySuccess: "ادرس کاپي شو.",
    loading: "Loading...",
    noData: "معلومات نشته.",
    error: "یوه ستونزه رامنځته شوه.",
    back: "بېرته",

    createInvestment: "پانګونه وکړه",
    totalProfit: "ټوله ګټه",
    balance: "بیلانس",
    status: "حالت",
    history: "تاریخچه",

    referralDescription:
      "ملګري راوبله او خپل ریفریل شبکه جوړه کړه.",

    announcement: "اعلان",

    splashWelcome: "زموږ Daily TRX ته ښه راغلاست",
    splashMessage:
      "خپل TRX سفر جوړ کړه، بیلانس تعقیب کړه او خپل ډیجیټل Assets منظم وساته.",
    splashLoading: "Daily TRX چمتو کېږي..."
  },


  fa: {

    home: "خانه",
    wallet: "کیف پول",
    deposit: "سپرده",
    withdraw: "برداشت",
    investment: "سرمایه‌گذاری",
    referral: "معرفی",
    notifications: "اعلان‌ها",
    support: "پشتیبانی",
    profile: "پروفایل",

    welcome: "به Daily TRX خوش آمدید",
    investmentWallet: "کیف پول سرمایه‌گذاری",

    totalBalance: "مجموع موجودی",
    availableBalance: "موجودی قابل استفاده",
    invested: "سرمایه‌گذاری",
    profit: "سود",

    depositNow: "سپرده",
    withdrawNow: "برداشت",

    investmentCard: "سرمایه‌گذاری",
    investmentDesc: "پلان‌ها و تاریخچه",

    walletCard: "کیف پول",
    walletDesc: "موجودی و تراکنش‌ها",

    referralCard: "معرفی",
    referralDesc: "دعوت و درآمد",

    notificationsCard: "اعلان‌ها",
    notificationsDesc: "به‌روزرسانی سیستم",

    supportCard: "پشتیبانی",
    supportDesc: "کمک و پشتیبانی",

    quickActions: "گزینه‌های سریع",

    depositTitle: "سپرده TRX",
    depositNotice:
      "فقط TRX به آدرس زیر ارسال کنید، سپس Transaction Hash را ثبت کنید.",

    depositAddress: "آدرس سپرده TRON",
    copyAddress: "کپی آدرس",
    amount: "مقدار (TRX)",
    transactionHash: "Transaction Hash",
    submitDeposit: "ثبت سپرده",

    withdrawTitle: "برداشت TRX",
    withdrawAddress: "آدرس کیف پول TRON",
    withdrawAmount: "مقدار برداشت",
    submitWithdraw: "ثبت برداشت",

    investmentTitle: "پلان سرمایه‌گذاری 📦",
    minimum: "مقدار سرمایه‌گذاری",
    dailyProfit: "سود روزانه",
    profitRate: "درصد سود روزانه",
    monthlyProfit: "سود ۳۰ روز",
    yearlyProfit: "سود ۳۶۰ روز",
    investmentDays: "مدت سرمایه‌گذاری",
    days: "روز",

    referralTitle: "برنامه معرفی",
    notificationTitle: "اعلان‌ها",
    supportTitle: "پشتیبانی",
    profileTitle: "پروفایل من",

    language: "زبان",
    username: "نام کاربری",
    email: "ایمیل",
    telegramId: "Telegram ID",
    accountStatus: "وضعیت حساب",
    verified: "تأیید شده",
    pending: "در انتظار",
    referralCode: "کد معرفی",

    referralLevel1: "سطح اول",
    referralLevel2: "سطح دوم",
    referralLevel3: "سطح سوم",

    referralRate1: "۶٪",
    referralRate2: "۲٪",
    referralRate3: "۱٪",

    telegramChannel: "کانال Telegram",
    telegramSupport: "چت / پشتیبانی Telegram",

    copySuccess: "آدرس کپی شد.",
    loading: "در حال بارگذاری...",
    noData: "اطلاعاتی موجود نیست.",
    error: "مشکلی رخ داد.",
    back: "برگشت",

    createInvestment: "سرمایه‌گذاری",
    totalProfit: "سود کل",
    balance: "موجودی",
    status: "وضعیت",
    history: "تاریخچه",

    referralDescription:
      "دوستان خود را دعوت کنید و شبکه معرفی خود را بسازید.",

    announcement: "اعلان",

    splashWelcome: "به Daily TRX خوش آمدید",
    splashMessage:
      "مسیر TRX خود را بسازید، موجودی خود را دنبال کنید و دارایی‌های دیجیتال خود را مدیریت کنید.",
    splashLoading: "Daily TRX در حال آماده‌سازی..."
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


function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function telegramId() {

  return telegramApp?.initDataUnsafe?.user?.id
    ? String(telegramApp.initDataUnsafe.user.id)
    : "";
}


function formatTRX(value) {

  const n = Number(value);

  return Number.isFinite(n)
    ? `${n.toLocaleString(undefined, {
        maximumFractionDigits: 6
      })} TRX`
    : "0 TRX";
}


function apiError(
  data,
  fallback = "Something went wrong."
) {

  return (
    data?.message ||
    data?.error?.message ||
    fallback
  );
}


/* =========================================================
   SPLASH SCREEN
   ========================================================= */

function createSplashScreen() {

  if (document.getElementById("splash-screen")) {
    return;
  }

  const splash =
    document.createElement("div");

  splash.id = "splash-screen";

  splash.innerHTML = `

    <div class="splash-content">

      <div class="splash-logo-wrap">

        <div class="splash-logo">

          <div class="splash-logo-symbol">
            ₮
          </div>

        </div>

      </div>

      <div class="splash-brand">
        DAILY TRX
      </div>

      <div class="splash-subtitle">
        ${t("investmentWallet")}
      </div>

      <div class="splash-welcome">
        ${t("splashWelcome")}
      </div>

      <div class="splash-message">
        ${t("splashMessage")}
      </div>

      <div class="splash-loader">

        <div class="splash-loader-bar"></div>

      </div>

      <div class="splash-loading">
        ${t("splashLoading")}
      </div>

    </div>
  `;

  document.body.prepend(splash);

  setTimeout(() => {

    splash.classList.add("hide");

    setTimeout(() => {

      splash.remove();

    }, 650);

  }, 2100);
}


/* =========================================================
   HEADER
   ========================================================= */

function languageSelector() {

  return `
    <select
      id="languageSelect"
      class="language-select"
      aria-label="${t("language")}">

      <option
        value="en"
        ${currentLanguage === "en" ? "selected" : ""}>
        English
      </option>

      <option
        value="ps"
        ${currentLanguage === "ps" ? "selected" : ""}>
        پښتو
      </option>

      <option
        value="fa"
        ${currentLanguage === "fa" ? "selected" : ""}>
        دری
      </option>

    </select>
  `;
}


function appHeader() {

  return `

    <header class="app-header">

      <div class="brand-area">

        <div class="brand-logo">
          ₮
        </div>

        <div class="brand-info">

          <strong>
            DAILY TRX
          </strong>

          <small>
            ${t("investmentWallet")}
          </small>

        </div>

      </div>


      <div class="header-actions">

        <button
          id="themeButton"
          class="header-icon"
          type="button"
          aria-label="Theme">

          ${currentTheme === "dark"
            ? "☀️"
            : "🌙"}

        </button>


        <div class="language-wrap">

          <span class="language-icon">
            🌐
          </span>

          ${languageSelector()}

        </div>


        <button
          class="header-icon"
          type="button"
          data-page="notifications"
          aria-label="Notifications">

          🔔

        </button>

      </div>

    </header>
  `;
}


function setupLanguage() {

  const el =
    document.getElementById("languageSelect");

  if (!el || el.dataset.ready) {
    return;
  }

  el.dataset.ready = "1";

  el.addEventListener("change", () => {

    currentLanguage = el.value;

    localStorage.setItem(
      "dailytrx_language",
      currentLanguage
    );

    document.documentElement.lang =
      currentLanguage;

    render(window.currentPage);
  });
}


/* =========================================================
   THEME
   ========================================================= */

function applyTheme() {

  document.body.classList.toggle(
    "dark",
    currentTheme === "dark"
  );

  document.documentElement.dataset.theme =
    currentTheme;

  const button =
    document.getElementById("themeButton");

  if (button) {

    button.textContent =
      currentTheme === "dark"
        ? "☀️"
        : "🌙";
  }
}


function setupTheme() {

  applyTheme();

  const button =
    document.getElementById("themeButton");

  if (!button || button.dataset.ready) {
    return;
  }

  button.dataset.ready = "1";

  button.addEventListener("click", () => {

    currentTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    localStorage.setItem(
      "dailytrx_theme",
      currentTheme
    );

    applyTheme();
  });
}


/* =========================================================
   HEADING
   ========================================================= */

function heading(title, icon) {

  return `

    <div class="page-heading">

      <button
        type="button"
        class="back-button"
        data-page="home">

        ←

      </button>

      <h2>
        ${icon || ""} ${title}
      </h2>

    </div>
  `;
}


function card(content, cls = "card") {

  return `
    <div class="${cls}">
      ${content}
    </div>
  `;
}


/* =========================================================
   HOME
   ========================================================= */

function homePage() {

  return `

    ${appHeader()}


    <section class="welcome-strip">

      <div>

        <span class="eyebrow">
          DAILY TRX
        </span>

        <h1>
          ${t("welcome")}
        </h1>

        <p>
          ${t("investmentWallet")}
        </p>

      </div>

    </section>


    <section class="balance-card">

      <div class="balance-top">

        <span>
          ${t("totalBalance")}
        </span>

        <span class="balance-dot">
          ●
        </span>

      </div>


      <div
        id="homeBalance"
        class="balance-value">

        0 TRX

      </div>


      <div class="balance-usd">
        ≈ $0.00
      </div>


      <div class="balance-actions">

        <button
          class="balance-action"
          data-page="deposit">

          <span>＋</span>
          ${t("depositNow")}

        </button>


        <button
          class="balance-action"
          data-page="withdraw">

          <span>↗</span>
          ${t("withdrawNow")}

        </button>

      </div>

    </section>


    <section class="mini-stats">

      <div class="mini-stat">

        <span>
          ${t("availableBalance")}
        </span>

        <strong id="homeAvailable">
          0 TRX
        </strong>

      </div>


      <div class="mini-stat">

        <span>
          ${t("invested")}
        </span>

        <strong id="homeInvested">
          0 TRX
        </strong>

      </div>


      <div class="mini-stat">

        <span>
          ${t("profit")}
        </span>

        <strong id="homeProfit">
          0 TRX
        </strong>

      </div>

    </section>


    <section class="quick-section">

      <div class="section-heading">

        <div>

          <span>
            ${t("quickActions")}
          </span>

          <h2>
            Daily TRX
          </h2>

        </div>

      </div>


      <div class="quick-grid">


        <button
          class="quick-card"
          data-page="investment">

          <div class="quick-icon">
            📈
          </div>

          <div class="quick-text">

            <strong>
              ${t("investmentCard")}
            </strong>

            <small>
              ${t("investmentDesc")}
            </small>

          </div>

        </button>


        <button
          class="quick-card"
          data-page="wallet">

          <div class="quick-icon">
            ▣
          </div>

          <div class="quick-text">

            <strong>
              ${t("walletCard")}
            </strong>

            <small>
              ${t("walletDesc")}
            </small>

          </div>

        </button>


        <button
          class="quick-card"
          data-page="referral">

          <div class="quick-icon">
            👥
          </div>

          <div class="quick-text">

            <strong>
              ${t("referralCard")}
            </strong>

            <small>
              ${t("referralDesc")}
            </small>

          </div>

        </button>


        <button
          class="quick-card"
          data-page="notifications">

          <div class="quick-icon">
            🔔
          </div>

          <div class="quick-text">

            <strong>
              ${t("notificationsCard")}
            </strong>

            <small>
              ${t("notificationsDesc")}
            </small>

          </div>

        </button>


        <button
          class="quick-card"
          data-page="deposit">

          <div class="quick-icon">
            📥
          </div>

          <div class="quick-text">

            <strong>
              ${t("deposit")}
            </strong>

            <small>
              ${t("depositNotice").split(".")[0]}
            </small>

          </div>

        </button>


        <button
          class="quick-card"
          data-page="withdraw">

          <div class="quick-icon">
            📤
          </div>

          <div class="quick-text">

            <strong>
              ${t("withdraw")}
            </strong>

            <small>
              ${t("withdrawAddress")}
            </small>

          </div>

        </button>


      </div>

    </section>

  `;
}


/* =========================================================
   HOME WALLET
   ========================================================= */

async function loadHomeWallet() {

  const id = telegramId();

  if (!id) return;

  try {

    const r = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(id)}`
    );

    const d = await r.json();

    if (!d?.ok) return;


    const w =
      d.wallet ||
      d.balance ||
      d.data ||
      d;


    /*
      Current wallet API:

      available_trx
      locked_trx
    */


    const available =
      Number(
        w.available_trx ?? 0
      );


    const locked =
      Number(
        w.locked_trx ?? 0
      );


    const total =
      available + locked;


    /*
      Profit system will be connected later.
      Until then keep it at 0.
    */

    const profit = 0;


    const a =
      document.getElementById(
        "homeBalance"
      );

    const b =
      document.getElementById(
        "homeAvailable"
      );

    const c =
      document.getElementById(
        "homeInvested"
      );

    const e =
      document.getElementById(
        "homeProfit"
      );


    if (a) {
      a.textContent =
        formatTRX(total);
    }


    if (b) {
      b.textContent =
        formatTRX(available);
    }


    if (c) {
      c.textContent =
        formatTRX(locked);
    }


    if (e) {
      e.textContent =
        formatTRX(profit);
    }

  } catch (_) {}
}


/* =========================================================
   WALLET
   ========================================================= */

function walletPage() {

  return `

    ${heading(t("wallet"), "💰")}

    <div
      id="walletContent"
      class="loading-box">

      ${t("loading")}

    </div>
  `;
}


async function loadWalletPage() {

  const box =
    document.getElementById(
      "walletContent"
    );

  const id = telegramId();

  if (!box || !id) return;


  try {

    const r = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(id)}`
    );


    const d = await r.json();


    if (!d?.ok) {

      throw new Error(
        apiError(d)
      );
    }


    const w =
      d.wallet ||
      d.balance ||
      d.data ||
      d;


    const available =
      Number(
        w.available_trx ?? 0
      );


    const locked =
      Number(
        w.locked_trx ?? 0
      );


    const total =
      available + locked;


    const profit = 0;


    box.innerHTML = `

      <div class="wallet-main">

        <span>
          ${t("totalBalance")}
        </span>

        <strong>
          ${formatTRX(total)}
        </strong>

      </div>


      <div class="mini-stats">

        <div class="mini-stat">

          <span>
            ${t("availableBalance")}
          </span>

          <strong>
            ${formatTRX(available)}
          </strong>

        </div>


        <div class="mini-stat">

          <span>
            ${t("invested")}
          </span>

          <strong>
            ${formatTRX(locked)}
          </strong>

        </div>


        <div class="mini-stat">

          <span>
            ${t("profit")}
          </span>

          <strong>
            ${formatTRX(profit)}
          </strong>

        </div>

      </div>
    `;


  } catch (e) {

    box.innerHTML = `
      <div class="error-box">
        ${escapeHtml(e.message)}
      </div>
    `;
  }
}


/* =========================================================
   DEPOSIT
   ========================================================= */

function depositPage() {

  return `

    ${heading(t("depositTitle"), "📥")}

    <div class="notice-box">
      ℹ️ ${t("depositNotice")}
    </div>


    <div class="card deposit-card">

      <label>
        ${t("depositAddress")}
      </label>


      <div class="address-row">

        <input
          id="depositAddress"
          value="${DEPOSIT_ADDRESS}"
          readonly
        >


        <button
          id="copyDepositAddress"
          type="button">

          ${t("copyAddress")}

        </button>

      </div>


      <div class="qr-box">

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
          alt="TRON QR"
        >

      </div>


      <label>
        ${t("amount")}
      </label>


      <input
        id="depositAmount"
        type="number"
        min="0"
        step="0.000001"
        placeholder="0"
      >


      <label>
        ${t("transactionHash")}
      </label>


      <input
        id="depositTxHash"
        type="text"
        maxlength="64"
        placeholder="64-character TRON transaction hash"
      >


      <button
        id="submitDeposit"
        class="primary-btn"
        type="button">

        ${t("submitDeposit")}

      </button>


      <div
        id="depositMessage"
        class="form-message">
      </div>

    </div>
  `;
}


function setupDeposit() {

  const copy =
    document.getElementById(
      "copyDepositAddress"
    );

  const submit =
    document.getElementById(
      "submitDeposit"
    );


  copy?.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard.writeText(
          DEPOSIT_ADDRESS
        );

        showFormMessage(
          t("copySuccess"),
          "success"
        );

      } catch (_) {

        const input =
          document.getElementById(
            "depositAddress"
          );

        input?.select();

        document.execCommand("copy");

        showFormMessage(
          t("copySuccess"),
          "success"
        );
      }
    }
  );


  submit?.addEventListener(
    "click",
    async () => {

      const amount =
        document
          .getElementById("depositAmount")
          ?.value
          .trim();


      const txHash =
        document
          .getElementById("depositTxHash")
          ?.value
          .trim();


      const id = telegramId();


      if (!id) {

        return showFormMessage(
          "Please open the app from Telegram.",
          "error"
        );
      }


      if (!amount || Number(amount) <= 0) {

        return showFormMessage(
          "Enter a valid TRX amount.",
          "error"
        );
      }


      if (
        !/^[a-fA-F0-9]{64}$/.test(
          txHash || ""
        )
      ) {

        return showFormMessage(
          "Invalid TRON transaction hash.",
          "error"
        );
      }


      submit.disabled = true;
      submit.textContent = t("loading");


      try {

        const r = await fetch(
          "/api/deposit",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              telegram_chat_id: id,
              amount_trx: Number(amount),
              tx_hash: txHash
            })
          }
        );


        const d = await r.json();


        if (!r.ok || !d.ok) {

          throw new Error(
            apiError(
              d,
              "Deposit submission failed."
            )
          );
        }


        showFormMessage(
          d.message ||
          "Deposit submitted successfully.",
          "success"
        );


        document.getElementById(
          "depositAmount"
        ).value = "";


        document.getElementById(
          "depositTxHash"
        ).value = "";


      } catch (e) {

        showFormMessage(
          e.message,
          "error"
        );


      } finally {

        submit.disabled = false;

        submit.textContent =
          t("submitDeposit");
      }
    }
  );
}


function showFormMessage(text, type) {

  const box =
    document.getElementById(
      "depositMessage"
    );

  if (!box) return;

  box.textContent = text;

  box.className =
    `form-message ${type}`;
}


/* =========================================================
   WITHDRAW
   ========================================================= */

function withdrawPage() {

  return `

    ${heading(t("withdrawTitle"), "📤")}


    <div class="card">

      <div class="notice-box">
        Minimum withdrawal: 20 TRX
      </div>


      <label>
        ${t("withdrawAddress")}
      </label>


      <input
        id="withdrawAddress"
        type="text"
        placeholder="T..."
      >


      <label>
        ${t("withdrawAmount")}
      </label>


      <input
        id="withdrawAmount"
        type="number"
        min="20"
        step="0.000001"
        placeholder="20"
      >


      <button
        id="submitWithdraw"
        class="primary-btn"
        type="button">

        ${t("submitWithdraw")}

      </button>


      <div
        id="withdrawMessage"
        class="form-message">
      </div>

    </div>
  `;
}


function setupWithdraw() {

  const button =
    document.getElementById(
      "submitWithdraw"
    );


  button?.addEventListener(
    "click",
    async () => {

      const address =
        document
          .getElementById(
            "withdrawAddress"
          )
          ?.value
          .trim();


      const amount =
        Number(
          document
            .getElementById(
              "withdrawAmount"
            )
            ?.value
        );


      const message =
        document.getElementById(
          "withdrawMessage"
        );


      if (!address) {

        message.textContent =
          "Enter your TRON wallet address.";

        message.className =
          "form-message error";

        return;
      }


      if (
        !address.startsWith("T") ||
        address.length < 30
      ) {

        message.textContent =
          "Invalid TRON wallet address.";

        message.className =
          "form-message error";

        return;
      }


      if (
        !Number.isFinite(amount) ||
        amount < 20
      ) {

        message.textContent =
          "Minimum withdrawal is 20 TRX.";

        message.className =
          "form-message error";

        return;
      }


      const id = telegramId();

      if (!id) return;


      button.disabled = true;
      button.textContent = t("loading");


      try {

        const r = await fetch(
          "/api/withdraw",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              telegram_chat_id: id,
              wallet_address: address,
              amount_trx: amount
            })
          }
        );


        const d = await r.json();


        if (!r.ok || !d.ok) {

          throw new Error(
            apiError(
              d,
              "Withdrawal failed."
            )
          );
        }


        message.textContent =
          d.message ||
          "Withdrawal request submitted.";

        message.className =
          "form-message success";


      } catch (e) {

        message.textContent =
          e.message;

        message.className =
          "form-message error";


      } finally {

        button.disabled = false;

        button.textContent =
          t("submitWithdraw");
      }
    }
  );
}


/* =========================================================
   INVESTMENT
   ========================================================= */

function investmentPage() {

  return `

    ${heading(
      t("investmentTitle"),
      "📈"
    )}


    <div
      id="investmentContent"
      class="plans-grid">

      <div class="loading-box">
        ${t("loading")}
      </div>

    </div>
  `;
}


async function loadInvestments() {

  const box =
    document.getElementById(
      "investmentContent"
    );

  if (!box) return;


  try {

    const r = await fetch(
      "/api/investment-plans"
    );


    const d = await r.json();


    if (!r.ok || !d.ok) {

      throw new Error(
        apiError(
          d,
          "Could not load investment plans."
        )
      );
    }


    const plans =
      Array.isArray(d.plans)
        ? d.plans
        : [];


    if (!plans.length) {

      box.innerHTML = `
        <div class="empty-box">
          ${t("noData")}
        </div>
      `;

      return;
    }


    box.innerHTML =
      plans.map((p, index) => {

        const investment =
          Number(
            p.amount_trx ?? 0
          );


        const dailyProfit =
          Number(
            p.daily_profit_trx ?? 0
          );


        const duration =
          Number(
            p.duration_days ?? 360
          ) || 360;


        const dailyRate =
          investment > 0
            ? (
                dailyProfit /
                investment
              ) * 100
            : 0;


        const profit30 =
          dailyProfit * 30;


        const profit360 =
          dailyProfit * 360;


        const safeName =
          p.name ||
          `Plan ${index + 1}`;


        return `

          <div class="plan-card">

            <div class="plan-top">

              <span>
                📦
              </span>

              <b>
                ${escapeHtml(safeName)}
              </b>

            </div>


            <div class="profit-badge">

              🔥
              ${dailyRate.toFixed(2)}%

              ${t("dailyProfit")}

            </div>


            <div class="plan-row">

              <span>
                ${t("minimum")}
              </span>

              <strong>
                ${formatTRX(investment)}
              </strong>

            </div>


            <div class="plan-row">

              <span>
                ${t("dailyProfit")}
              </span>

              <strong>
                ${formatTRX(dailyProfit)}
              </strong>

            </div>


            <div class="plan-row">

              <span>
                ${t("profitRate")}
              </span>

              <strong>
                ${dailyRate.toFixed(2)}%
              </strong>

            </div>


            <div class="plan-row">

              <span>
                ${t("monthlyProfit")}
              </span>

              <strong>
                ${formatTRX(profit30)}
              </strong>

            </div>


            <div class="plan-row">

              <span>
                ${t("yearlyProfit")}
              </span>

              <strong>
                ${formatTRX(profit360)}
              </strong>

            </div>


            <div class="plan-row">

              <span>
                ${t("investmentDays")}
              </span>

              <strong>
                ${duration}
                ${t("days")}
              </strong>

            </div>


            <button
              class="primary-btn invest-btn"
              data-plan-id="${escapeHtml(
                p.id ?? ""
              )}"
              type="button">

              ${t("createInvestment")}

            </button>

          </div>
        `;

      }).join("");


    document
      .querySelectorAll(".invest-btn")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            createInvestment(
              button.dataset.planId
            );

          }
        );

      });


  } catch (e) {

    console.error(
      "Investment loading error:",
      e
    );


    box.innerHTML = `
      <div class="error-box">
        ${escapeHtml(e.message)}
      </div>
    `;
  }
}


/* =========================================================
   CREATE INVESTMENT
   ========================================================= */

async function createInvestment(planId) {

  const id = telegramId();


  if (!id || !planId) {

    alert(
      "Please open the app from Telegram."
    );

    return;
  }


  const button =
    document.querySelector(
      `.invest-btn[data-plan-id="${CSS.escape(String(planId))}"]`
    );


  if (button) {

    button.disabled = true;

    button.textContent =
      t("loading");
  }


  try {

    const r = await fetch(
      "/api/create-investment",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          telegram_chat_id: id,
          plan_id: Number(planId)
        })
      }
    );


    const d = await r.json();


    if (!r.ok || !d.ok) {

      throw new Error(
        apiError(
          d,
          "Investment failed."
        )
      );
    }


    alert(
      `Investment successful!\n\n` +
      `Amount: ${formatTRX(d.amount_trx)}\n` +
      `Daily Profit: ${formatTRX(d.daily_profit_trx)}\n` +
      `Duration: ${d.end_at ? "360 days" : "360 days"}`
    );


    render("investment");


  } catch (e) {

    alert(
      e.message ||
      "Investment failed."
    );


  } finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        t("createInvestment");
    }
  }
}


/* =========================================================
   REFERRAL
   ========================================================= */

function referralPage() {

  const id = telegramId();

  return `

    ${heading(
      t("referralTitle"),
      "👥"
    )}


    <div class="referral-code card">

      <span>
        ${t("referralCode")}
      </span>

      <strong id="myReferralCode">
        ${id || "—"}
      </strong>

    </div>


    <div class="referral-levels">

      <div class="referral-card">

        <span>
          🥇 ${t("referralLevel1")}
        </span>

        <strong>
          ${t("referralRate1")}
        </strong>

      </div>


      <div class="referral-card">

        <span>
          🥈 ${t("referralLevel2")}
        </span>

        <strong>
          ${t("referralRate2")}
        </strong>

      </div>


      <div class="referral-card">

        <span>
          🥉 ${t("referralLevel3")}
        </span>

        <strong>
          ${t("referralRate3")}
        </strong>

      </div>

    </div>


    <div class="card">

      <h3>
        ${t("referralTitle")}
      </h3>

      <p>
        ${t("referralDescription")}
      </p>

    </div>
  `;
}


/* =========================================================
   NOTIFICATIONS
   ========================================================= */

function notificationsPage() {

  return `

    ${heading(
      t("notificationTitle"),
      "🔔"
    )}


    <div
      id="notificationsContent"
      class="notification-list">

      <div class="loading-box">
        ${t("loading")}
      </div>

    </div>
  `;
}


async function loadNotifications() {

  const box =
    document.getElementById(
      "notificationsContent"
    );


  const id = telegramId();


  if (!box || !id) return;


  try {

    const r = await fetch(
      `/api/notifications?telegram_chat_id=${encodeURIComponent(id)}`
    );


    const d = await r.json();


    if (!d.ok) {

      throw new Error(
        apiError(d)
      );
    }


    const items =
      d.notifications ||
      d.data ||
      [];


    if (!items.length) {

      box.innerHTML = `
        <div class="empty-box">
          ${t("noData")}
        </div>
      `;

      return;
    }


    box.innerHTML =
      items.map(n => `

        <div class="notification-card">

          <b>
            ${escapeHtml(
              n.title ||
              "Notification"
            )}
          </b>

          <p>
            ${escapeHtml(
              n.message ||
              n.body ||
              ""
            )}
          </p>

          <small>
            ${escapeHtml(
              n.created_at ||
              ""
            )}
          </small>

        </div>

      `).join("");


  } catch (e) {

    box.innerHTML = `
      <div class="error-box">
        ${escapeHtml(e.message)}
      </div>
    `;
  }
}


/* =========================================================
   SUPPORT
   ========================================================= */

function supportPage() {

  return `

    ${heading(
      t("supportTitle"),
      "🎧"
    )}


    <div class="support-grid">


      <button
        type="button"
        class="support-card"
        data-telegram="https://t.me/mydailytrx_bot">

        <span>
          📢
        </span>

        <b>
          ${t("telegramChannel")}
        </b>

        <small>
          @mydailytrx_bot
        </small>

      </button>


      <button
        type="button"
        class="support-card"
        data-telegram="https://t.me/my_Dailytrxbot">

        <span>
          💬
        </span>

        <b>
          ${t("telegramSupport")}
        </b>

        <small>
          @my_Dailytrxbot
        </small>

      </button>

    </div>


    <div class="card">

      <h3>
        Daily TRX
      </h3>

      <p>
        For questions and support,
        contact us through Telegram.
      </p>

    </div>
  `;
}


/* =========================================================
   PROFILE
   ========================================================= */

function profilePage() {

  const user =
    telegramApp?.initDataUnsafe?.user || {};


  return `

    ${heading(
      t("profileTitle"),
      "👤"
    )}


    <div class="profile-card">

      <div class="profile-avatar">

        ${(
          user.first_name ||
          "D"
        ).charAt(0).toUpperCase()}

      </div>


      <h2>

        ${escapeHtml(
          [
            user.first_name,
            user.last_name
          ]
          .filter(Boolean)
          .join(" ")
          ||
          "Daily TRX User"
        )}

      </h2>


      <div class="profile-row">

        <span>
          ${t("username")}
        </span>

        <b>
          @${escapeHtml(
            user.username || "—"
          )}
        </b>

      </div>


      <div class="profile-row">

        <span>
          ${t("telegramId")}
        </span>

        <b>
          ${escapeHtml(
            telegramId() || "—"
          )}
        </b>

      </div>


      <div class="profile-row">

        <span>
          ${t("accountStatus")}
        </span>

        <b class="status-ok">
          ${t("verified")}
        </b>

      </div>

    </div>


    <button
      class="danger-btn"
      id="logoutLocal"
      type="button">

      Clear Local App Session

    </button>
  `;
}


function setupProfile() {

  document
    .getElementById("logoutLocal")
    ?.addEventListener(
      "click",
      () => {

        localStorage.removeItem(
          "dailytrx_registered"
        );

        localStorage.removeItem(
          "dailytrx_username"
        );

        location.reload();

      }
    );
}


/* =========================================================
   ADMIN
   ========================================================= */

function adminPage() {

  return `

    ${heading(
      "Admin",
      "👑"
    )}


    <div class="card">

      <h3>
        Admin Announcement
      </h3>


      <textarea
        id="adminAnnouncement"
        rows="5"
        placeholder="Write announcement...">
      </textarea>


      <button
        id="sendAdminAnnouncement"
        class="primary-btn"
        type="button">

        Send Announcement

      </button>


      <div
        id="adminMessage"
        class="form-message">
      </div>

    </div>
  `;
}


function setupAdmin() {

  const button =
    document.getElementById(
      "sendAdminAnnouncement"
    );


  if (!button) return;


  button.addEventListener(
    "click",
    async () => {

      const message =
        document
          .getElementById(
            "adminAnnouncement"
          )
          ?.value
          .trim();


      const box =
        document.getElementById(
          "adminMessage"
        );


      if (!message) {

        box.textContent =
          "Write an announcement first.";

        box.className =
          "form-message error";

        return;
      }


      try {

        const r = await fetch(
          "/api/admin/announcement",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              telegram_chat_id:
                telegramId(),
              message
            })
          }
        );


        const d = await r.json();


        if (!r.ok || !d.ok) {

          throw new Error(
            apiError(
              d,
              "Announcement failed."
            )
          );
        }


        box.textContent =
          d.message ||
          "Announcement sent.";

        box.className =
          "form-message success";


        document.getElementById(
          "adminAnnouncement"
        ).value = "";


      } catch (e) {

        box.textContent =
          e.message;

        box.className =
          "form-message error";
      }
    }
  );
}


/* =========================================================
   GLOBAL ANNOUNCEMENT
   ========================================================= */

async function loadGlobalAnnouncement() {

  try {

    const r = await fetch(
      "/api/global-announcement"
    );


    const d = await r.json();


    if (
      !d?.ok ||
      !d.announcement
    ) {
      return;
    }


    const a =
      d.announcement;


    const title =
      a.title ||
      t("announcement");


    const message =
      a.message ||
      a.body ||
      "";


    if (!message) return;


    const home =
      document.querySelector(
        ".balance-card"
      );


    if (!home) return;


    const box =
      document.createElement("div");


    box.className =
      "announcement-card";


    box.innerHTML = `

      <b>
        📢 ${escapeHtml(title)}
      </b>

      <p>
        ${escapeHtml(message)}
      </p>

    `;


    home.after(box);


  } catch (_) {}
}


/* =========================================================
   BOTTOM NAVIGATION
   ========================================================= */

function renderBottomNavigation() {

  return `

    <nav class="bottom-nav">

      <button
        data-page="home"
        class="bottom-nav-item">

        <span>
          ⌂
        </span>

        <small>
          ${t("home")}
        </small>

      </button>


      <button
        data-page="wallet"
        class="bottom-nav-item">

        <span>
          ▣
        </span>

        <small>
          ${t("wallet")}
        </small>

      </button>


      <button
        data-page="support"
        class="bottom-nav-item">

        <span>
          🎧
        </span>

        <small>
          ${t("support")}
        </small>

      </button>


      <button
        data-page="profile"
        class="bottom-nav-item">

        <span>
          ♙
        </span>

        <small>
          ${t("profile")}
        </small>

      </button>

    </nav>
  `;
}


/* =========================================================
   ACTIVE BOTTOM NAV
   ========================================================= */

function updateBottomNavigation() {

  document
    .querySelectorAll(
      ".bottom-nav-item"
    )
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.page ===
        window.currentPage
      );

    });
}


/* =========================================================
   RENDER
   ========================================================= */

async function render(target = "home") {

  window.currentPage = target;


  if (!page) return;


  let content = "";


  if (target === "home") {

    content =
      homePage();


  } else if (target === "wallet") {

    content =
      walletPage();


  } else if (target === "deposit") {

    content =
      depositPage();


  } else if (target === "withdraw") {

    content =
      withdrawPage();


  } else if (target === "investment") {

    content =
      investmentPage();


  } else if (target === "referral") {

    content =
      referralPage();


  } else if (target === "notifications") {

    content =
      notificationsPage();


  } else if (target === "support") {

    content =
      supportPage();


  } else if (target === "profile") {

    content =
      profilePage();


  } else if (target === "admin") {

    content =
      adminPage();


  } else {

    content =
      homePage();
  }


  page.innerHTML =
    content;


  setupLanguage();
  setupTheme();


  if (target === "home") {

    loadHomeWallet();

  }


  if (target === "wallet") {

    loadWalletPage();

  }


  if (target === "deposit") {

    setupDeposit();

  }


  if (target === "withdraw") {

    setupWithdraw();

  }


  if (target === "investment") {

    loadInvestments();

  }


  if (target === "notifications") {

    loadNotifications();

  }


  if (target === "profile") {

    setupProfile();

  }


  if (target === "admin") {

    setupAdmin();

  }


  updateBottomNavigation();

}


/* =========================================================
   GLOBAL CLICK HANDLER
   ========================================================= */

document.addEventListener(
  "click",
  event => {


    const pageButton =
      event.target.closest(
        "[data-page]"
      );


    if (pageButton) {

      const target =
        pageButton.dataset.page;


      if (target) {

        render(target);


        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }


      return;
    }


    const telegramButton =
      event.target.closest(
        "[data-telegram]"
      );


    if (telegramButton) {

      const url =
        telegramButton.dataset.telegram;


      if (url) {

        openTelegram(url);

      }

    }

  }
);


/* =========================================================
   TELEGRAM LINKS
   ========================================================= */

function openTelegram(url) {

  if (!url) return;


  if (
    telegramApp?.openTelegramLink
  ) {

    telegramApp.openTelegramLink(
      url
    );


  } else {

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

  }
}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializeApp() {

  currentLanguage =
    localStorage.getItem(
      "dailytrx_language"
    ) || "en";


  currentTheme =
    localStorage.getItem(
      "dailytrx_theme"
    ) || "dark";


  document.documentElement.lang =
    currentLanguage;


  applyTheme();


  createSplashScreen();


  render("home");


  setTimeout(
    () => {

      loadGlobalAnnouncement();

    },
    900
  );

}


window.render =
  render;

window.setupTheme =
  setupTheme;


initializeApp();


/* =========================================================
   DAILY TRX CONFIG
   =========================================================

   Deposit Address:
   TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA

   Admin Telegram ID:
   6504138324

   Telegram Channel:
   @mydailytrx_bot

   Telegram Support:
   @my_Dailytrxbot

   Investment API:
   /api/investment-plans

   Create Investment API:
   /api/create-investment

   Investment fields:
   amount_trx
   daily_profit_trx
   duration_days

   Referral:
   Level 1 = 6%
   Level 2 = 2%
   Level 3 = 1%

   Withdrawal minimum:
   20 TRX

   Wallet:
   available_trx
   locked_trx

   ========================================================= */
