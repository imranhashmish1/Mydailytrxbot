const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById("page");

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

const BOT_USERNAME = "MyDailyTRXBot";
const ADMIN_ID = "6504138324";

window.currentPage = "home";

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

let currentTheme =
  localStorage.getItem("dailytrx_theme") || "light";


/* =========================
   TELEGRAM
========================= */

function getTelegramId() {
  return String(
    telegramApp?.initDataUnsafe?.user?.id || ""
  );
}

function getTelegramUser() {
  return telegramApp?.initDataUnsafe?.user || {};
}


/* =========================
   TRANSLATIONS
========================= */

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

    dashboard: "Dashboard",
    welcome: "Welcome to Daily TRX",
    available: "Available Balance",
    locked: "Locked Balance",
    total: "Total Balance",
    quickActions: "Quick Actions",

    depositNow: "Deposit",
    withdrawNow: "Withdraw",
    investNow: "Invest",
    referralNow: "Referral",

    depositTitle: "Deposit TRX",
    depositText: "Send TRX to the address below.",
    copyAddress: "Copy Address",
    amount: "Amount (TRX)",
    txHash: "Transaction Hash",
    submitDeposit: "Submit Deposit",

    investmentTitle: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    totalProfit: "Total Profit",
    invest: "Invest Now",

    referralTitle: "Referral Program",
    referralText: "Invite users and earn referral commissions.",
    referralCode: "Referral Code",
    referralLink: "Referral Link",
    copyLink: "Copy Referral Link",
    shareLink: "Share Link",
    level1: "Level 1",
    level2: "Level 2",
    level3: "Level 3",

    withdrawTitle: "Withdraw",
    withdrawText: "Withdrawals require admin approval.",

    profileTitle: "Profile",
    username: "Username",
    telegramId: "Telegram ID",

    notificationsTitle: "Notifications",
    supportTitle: "Support",

    copied: "Copied successfully!",
    invalidHash: "Invalid TRON transaction hash",
    depositFailed: "Deposit submission failed",
    investmentCreated: "Investment created successfully",
    insufficient: "Insufficient available TRX"
  },

  ps: {
    home: "کور",
    wallet: "والټ",
    deposit: "ډیپازټ",
    withdraw: "ویډرا",
    investment: "انویسټمنټ",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    support: "مرسته",
    profile: "پروفایل",

    dashboard: "ډاشبورډ",
    welcome: "Daily TRX ته ښه راغلاست",
    available: "موجود بیلانس",
    locked: "لاک شوی بیلانس",
    total: "ټول بیلانس",
    quickActions: "چټک خدمات",

    depositNow: "ډیپازټ",
    withdrawNow: "ویډرا",
    investNow: "انویسټ",
    referralNow: "ریفریل",

    depositTitle: "TRX ډیپازټ",
    depositText: "TRX لاندې ادرس ته واستوئ.",
    copyAddress: "ادرس کاپي",
    amount: "مقدار (TRX)",
    txHash: "Transaction Hash",
    submitDeposit: "ډیپازټ ثبت کړه",

    investmentTitle: "انویسټمنټ پلانونه",
    dailyProfit: "ورځنۍ ګټه",
    duration: "موده",
    totalProfit: "ټوله ګټه",
    invest: "اوس انویسټ کړه",

    referralTitle: "ریفریل پروګرام",
    referralText: "کاروونکي دعوت کړئ او د ریفریل کمېشن ترلاسه کړئ.",
    referralCode: "ریفریل کوډ",
    referralLink: "ریفریل لینک",
    copyLink: "ریفریل لینک کاپي",
    shareLink: "لینک شریکول",
    level1: "لومړی لیول",
    level2: "دوهم لیول",
    level3: "درېیم لیول",

    withdrawTitle: "ویډرا",
    withdrawText: "ویډرا د اډمین تایید ته اړتیا لري.",

    profileTitle: "پروفایل",
    username: "یوزرنیم",
    telegramId: "Telegram ID",

    notificationsTitle: "خبرتیاوې",
    supportTitle: "مرسته",

    copied: "په بریالیتوب کاپي شو!",
    invalidHash: "د TRON Transaction Hash ناسم دی",
    depositFailed: "ډیپازټ ثبت نه شو",
    investmentCreated: "انویسټمنټ په بریالیتوب جوړ شو",
    insufficient: "موجود TRX کافي نه دی"
  },

  fa: {
    home: "خانه",
    wallet: "کیف پول",
    deposit: "دیپازیت",
    withdraw: "برداشت",
    investment: "سرمایه‌گذاری",
    referral: "معرفی",
    notifications: "اعلان‌ها",
    support: "پشتیبانی",
    profile: "پروفایل",

    dashboard: "داشبورد",
    welcome: "به Daily TRX خوش آمدید",
    available: "موجودی قابل استفاده",
    locked: "موجودی قفل‌شده",
    total: "موجودی کل",
    quickActions: "خدمات سریع",

    depositNow: "دیپازیت",
    withdrawNow: "برداشت",
    investNow: "سرمایه‌گذاری",
    referralNow: "معرفی",

    depositTitle: "دیپازیت TRX",
    depositText: "TRX را به آدرس زیر ارسال کنید.",
    copyAddress: "کپی آدرس",
    amount: "مقدار (TRX)",
    txHash: "Transaction Hash",
    submitDeposit: "ثبت دیپازیت",

    investmentTitle: "پلان‌های سرمایه‌گذاری",
    dailyProfit: "سود روزانه",
    duration: "مدت",
    totalProfit: "سود کل",
    invest: "سرمایه‌گذاری",

    referralTitle: "برنامه معرفی",
    referralText: "کاربران را دعوت کنید و کمیسیون دریافت کنید.",
    referralCode: "کد معرفی",
    referralLink: "لینک معرفی",
    copyLink: "کپی لینک معرفی",
    shareLink: "اشتراک لینک",
    level1: "سطح اول",
    level2: "سطح دوم",
    level3: "سطح سوم",

    withdrawTitle: "برداشت",
    withdrawText: "برداشت نیاز به تأیید ادمین دارد.",

    profileTitle: "پروفایل",
    username: "نام کاربری",
    telegramId: "Telegram ID",

    notificationsTitle: "اعلان‌ها",
    supportTitle: "پشتیبانی",

    copied: "با موفقیت کپی شد!",
    invalidHash: "Transaction Hash نادرست است",
    depositFailed: "ثبت دیپازیت انجام نشد",
    investmentCreated: "سرمایه‌گذاری با موفقیت ایجاد شد",
    insufficient: "TRX موجود کافی نیست"
  }
};


function t(key) {
  return translations[currentLanguage]?.[key] ||
         translations.en[key] ||
         key;
}


/* =========================
   THEME
========================= */

function applyTheme() {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(currentTheme);

  localStorage.setItem(
    "dailytrx_theme",
    currentTheme
  );
}

function toggleTheme() {

  currentTheme =
    currentTheme === "light"
      ? "dark"
      : "light";

  applyTheme();

  render(window.currentPage);
}


/* =========================
   LANGUAGE
========================= */

function changeLanguage(language) {

  if (!translations[language]) {
    return;
  }

  currentLanguage = language;

  localStorage.setItem(
    "dailytrx_language",
    language
  );

  render(window.currentPage);
}


/* =========================
   HEADER
========================= */

function appHeader() {

  return `
    <header class="app-header">

      <div class="brand-area">

        <div class="brand-logo">
          TRX
        </div>

        <div class="brand-info">
          <h2>Daily TRX</h2>
          <span>${t(window.currentPage)}</span>
        </div>

      </div>

      <div class="header-actions">

        <select
          class="language-select"
          onchange="changeLanguage(this.value)"
        >

          <option value="en"
            ${currentLanguage === "en" ? "selected" : ""}>
            EN
          </option>

          <option value="ps"
            ${currentLanguage === "ps" ? "selected" : ""}>
            پښتو
          </option>

          <option value="fa"
            ${currentLanguage === "fa" ? "selected" : ""}>
            فارسی
          </option>

        </select>

        <button
          class="header-icon"
          onclick="toggleTheme()"
        >
          ${currentTheme === "light" ? "🌙" : "☀️"}
        </button>

      </div>

    </header>
  `;
}


/* =========================
   BOTTOM NAV
========================= */

function renderBottomNavigation() {

  return `
    <nav class="bottom-nav">

      <button
        class="bottom-nav-item ${window.currentPage === "home" ? "active" : ""}"
        data-page="home"
      >
        <span class="nav-icon">🏠</span>
        <span>${t("home")}</span>
      </button>

      <button
        class="bottom-nav-item ${window.currentPage === "wallet" ? "active" : ""}"
        data-page="wallet"
      >
        <span class="nav-icon">💰</span>
        <span>${t("wallet")}</span>
      </button>

      <button
        class="bottom-nav-item ${window.currentPage === "deposit" ? "active" : ""}"
        data-page="deposit"
      >
        <span class="nav-icon">➕</span>
        <span>${t("deposit")}</span>
      </button>

      <button
        class="bottom-nav-item ${window.currentPage === "investment" ? "active" : ""}"
        data-page="investment"
      >
        <span class="nav-icon">📈</span>
        <span>${t("investment")}</span>
      </button>

      <button
        class="bottom-nav-item ${window.currentPage === "profile" ? "active" : ""}"
        data-page="profile"
      >
        <span class="nav-icon">👤</span>
        <span>${t("profile")}</span>
      </button>

    </nav>
  `;
}


/* =========================
   PAGE WRAPPER
========================= */

function pageWrapper(content) {

  page.innerHTML = `
    ${appHeader()}

    <div class="page-container">
      ${content}
    </div>

    ${renderBottomNavigation()}
  `;

  window.scrollTo(0, 0);
}


/* =========================
   WALLET
========================= */

async function getWallet() {

  const telegramId = getTelegramId();

  if (!telegramId) {
    return {
      available_trx: 0,
      locked_trx: 0
    };
  }

  try {

    const response = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(telegramId)}`
    );

    const data = await response.json();

    return {
      available_trx:
        Number(data.available_trx || 0),

      locked_trx:
        Number(data.locked_trx || 0)
    };

  } catch (error) {

    console.error("Wallet error:", error);

    return {
      available_trx: 0,
      locked_trx: 0
    };
  }
}


/* =========================
   HOME
========================= */

async function homePage() {

  const wallet = await getWallet();

  const available =
    Number(wallet.available_trx || 0);

  const locked =
    Number(wallet.locked_trx || 0);

  const total =
    available + locked;

  pageWrapper(`

    <div class="welcome-strip">

      <h1>${t("welcome")}</h1>

      <p>
        Daily TRX Wallet & Investment
      </p>

    </div>

    <div class="balance-card">

      <div class="balance-label">
        ${t("total")}
      </div>

      <div class="balance-value">
        ${total.toFixed(2)}
        <span class="balance-unit">TRX</span>
      </div>

      <div class="balance-stats">

        <div class="balance-stat">
          <small>${t("available")}</small>
          <strong>
            ${available.toFixed(2)} TRX
          </strong>
        </div>

        <div class="balance-stat">
          <small>${t("locked")}</small>
          <strong>
            ${locked.toFixed(2)} TRX
          </strong>
        </div>

      </div>

    </div>

    <div class="quick-title">
      ${t("quickActions")}
    </div>

    <div class="quick-actions">

      <button
        class="quick-card"
        data-page="deposit"
      >
        <div class="quick-icon">➕</div>
        <strong>${t("depositNow")}</strong>
        <span>TRX Deposit</span>
      </button>

      <button
        class="quick-card"
        data-page="withdraw"
      >
        <div class="quick-icon">💸</div>
        <strong>${t("withdrawNow")}</strong>
        <span>TRX Withdrawal</span>
      </button>

      <button
        class="quick-card"
        data-page="investment"
      >
        <div class="quick-icon">📈</div>
        <strong>${t("investNow")}</strong>
        <span>Investment Plans</span>
      </button>

      <button
        class="quick-card"
        data-page="referral"
      >
        <div class="quick-icon">👥</div>
        <strong>${t("referralNow")}</strong>
        <span>Invite & Earn</span>
      </button>

    </div>
  `);
}


/* =========================
   WALLET PAGE
========================= */

async function walletPage() {

  const wallet = await getWallet();

  const available =
    Number(wallet.available_trx || 0);

  const locked =
    Number(wallet.locked_trx || 0);

  const total =
    available + locked;

  pageWrapper(`

    <h1 class="page-title">
      ${t("wallet")}
    </h1>

    <p class="page-subtitle">
      Your TRX wallet
    </p>

    <div class="balance-card">

      <div class="balance-label">
        ${t("total")}
      </div>

      <div class="balance-value">
        ${total.toFixed(2)}
        <span class="balance-unit">TRX</span>
      </div>

      <div class="balance-stats">

        <div class="balance-stat">
          <small>${t("available")}</small>
          <strong>${available.toFixed(2)} TRX</strong>
        </div>

        <div class="balance-stat">
          <small>${t("locked")}</small>
          <strong>${locked.toFixed(2)} TRX</strong>
        </div>

      </div>

    </div>

  `);
}


/* =========================
   DEPOSIT
========================= */

function depositPage() {

  const qr =
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(DEPOSIT_ADDRESS)}`;

  pageWrapper(`

    <h1 class="page-title">
      ${t("depositTitle")}
    </h1>

    <p class="page-subtitle">
      ${t("depositText")}
    </p>

    <div class="deposit-card">

      <div class="qr-box">
        <img
          src="${qr}"
          alt="TRX QR"
        >
      </div>

      <div class="address-box">
        ${DEPOSIT_ADDRESS}
      </div>

      <button
        class="copy-button"
        onclick="copyDepositAddress()"
      >
        ${t("copyAddress")}
      </button>

    </div>

    <div class="deposit-card">

      <div class="form-group">

        <label>${t("amount")}</label>

        <input
          id="depositAmount"
          type="number"
          min="0"
          step="0.01"
          placeholder="100"
        >

      </div>

      <div class="form-group">

        <label>${t("txHash")}</label>

        <input
          id="depositTxHash"
          type="text"
          placeholder="64 character TRON TX hash"
        >

      </div>

      <button
        id="depositSubmit"
        class="primary-button"
        onclick="submitDeposit()"
      >
        ${t("submitDeposit")}
      </button>

      <div
        id="depositMessage"
        class="form-message"
      ></div>

    </div>

  `);
}


async function copyDepositAddress() {

  try {

    await navigator.clipboard.writeText(
      DEPOSIT_ADDRESS
    );

    alert(t("copied"));

  } catch {

    alert(DEPOSIT_ADDRESS);
  }
}


/* =========================
   DEPOSIT SUBMIT
========================= */

async function submitDeposit() {

  const amount =
    Number(
      document.getElementById("depositAmount")?.value
    );

  const txHash =
    document.getElementById("depositTxHash")
      ?.value
      .trim();

  const message =
    document.getElementById("depositMessage");

  const button =
    document.getElementById("depositSubmit");

  const telegramId =
    getTelegramId();


  if (!amount || amount <= 0) {

    message.textContent =
      "❌ Enter a valid amount.";

    return;
  }


  if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {

    message.textContent =
      "❌ " + t("invalidHash");

    return;
  }


  if (!telegramId) {

    message.textContent =
      "❌ Telegram user not detected.";

    return;
  }


  button.disabled = true;
  button.textContent = "Checking...";


  try {

    const response = await fetch(
      "/api/deposit",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          telegram_chat_id: telegramId,
          amount_trx: amount,
          tx_hash: txHash
        })
      }
    );


    const data = await response.json();


    if (!response.ok || data.ok === false) {
      throw new Error(
        data.message ||
        t("depositFailed")
      );
    }


    message.textContent =
      "✅ Deposit verified successfully.";

  } catch (error) {

    console.error(error);

    message.textContent =
      "❌ " +
      (error.message || t("depositFailed"));

  } finally {

    button.disabled = false;
    button.textContent = t("submitDeposit");
  }
}


/* =========================
   WITHDRAW
========================= */

function withdrawPage() {

  pageWrapper(`

    <h1 class="page-title">
      ${t("withdrawTitle")}
    </h1>

    <p class="page-subtitle">
      ${t("withdrawText")}
    </p>

    <div class="card">

      <div class="form-group">
        <label>Amount (TRX)</label>

        <input
          type="number"
          placeholder="Enter amount"
          disabled
        >
      </div>

      <div class="form-group">
        <label>TRON Address</label>

        <input
          type="text"
          placeholder="TRON wallet address"
          disabled
        >
      </div>

      <button
        class="primary-button"
        disabled
      >
        ${t("withdrawTitle")}
      </button>

    </div>

  `);
}


/* =========================
   INVESTMENT
========================= */

async function investmentPage() {

  pageWrapper(`

    <h1 class="page-title">
      ${t("investmentTitle")}
    </h1>

    <p class="page-subtitle">
      360-day locked investment plans
    </p>

    <div
      id="investmentPlans"
      class="investment-plans"
    >
      <div class="card">
        Loading plans...
      </div>
    </div>

  `);


  try {

    const response =
      await fetch("/api/investment-plans");

    const data =
      await response.json();


    if (!data.ok) {
      throw new Error(
        data.message || "Could not load plans"
      );
    }


    const plans =
      data.plans || data.data || [];


    const container =
      document.getElementById("investmentPlans");


    if (!plans.length) {

      container.innerHTML = `
        <div class="card">
          No active investment plans.
        </div>
      `;

      return;
    }


    container.innerHTML =
      plans.map(plan => {

        const amount =
          Number(plan.amount_trx || 0);

        const daily =
          Number(plan.daily_profit_trx || 0);

        const days =
          Number(plan.duration_days || 360);

        const total =
          daily * days;


        return `

          <div class="plan-card">

            <h3>
              ${plan.name || "Investment Plan"}
            </h3>

            <div class="plan-amount">
              ${amount.toLocaleString()} TRX
            </div>

            <div class="plan-row">
              <span>${t("dailyProfit")}</span>
              <strong>
                ${daily.toLocaleString()} TRX
              </strong>
            </div>

            <div class="plan-row">
              <span>${t("duration")}</span>
              <strong>
                ${days} Days
              </strong>
            </div>

            <div class="plan-row">
              <span>${t("totalProfit")}</span>
              <strong>
                ${total.toLocaleString()} TRX
              </strong>
            </div>

            <button
              class="plan-button"
              onclick="createInvestment(${Number(plan.id)})"
            >
              ${t("invest")}
            </button>

          </div>

        `;

      }).join("");


  } catch (error) {

    console.error(error);

    document.getElementById(
      "investmentPlans"
    ).innerHTML = `
      <div class="card">
        ❌ Could not load investment plans.
      </div>
    `;
  }
}


/* =========================
   CREATE INVESTMENT
========================= */

async function createInvestment(planId) {

  const telegramId =
    getTelegramId();


  if (!telegramId) {
    alert("Telegram user not detected.");
    return;
  }


  const confirmed =
    confirm("Start this investment plan?");


  if (!confirmed) return;


  try {

    const response =
      await fetch(
        "/api/create-investment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            telegram_chat_id: telegramId,
            plan_id: Number(planId)
          })
        }
      );


    const data =
      await response.json();


    if (!response.ok || data.ok === false) {

      throw new Error(
        data.message ||
        t("insufficient")
      );
    }


    alert(
      "✅ " + t("investmentCreated")
    );

    render("wallet");


  } catch (error) {

    console.error(error);

    alert(
      "❌ " +
      (error.message || "Investment failed")
    );
  }
}


/* =========================
   REFERRAL
========================= */

async function referralPage() {

  pageWrapper(`

    <h1 class="page-title">
      ${t("referralTitle")}
    </h1>

    <p class="page-subtitle">
      ${t("referralText")}
    </p>

    <div class="referral-box">

      <h3>
        ${t("referralCode")}
      </h3>

      <div
        id="referralCode"
        class="referral-code"
      >
        Loading...
      </div>


      <h3 class="referral-link-title">
        ${t("referralLink")}
      </h3>

      <div
        id="referralLink"
        class="referral-link-box"
      >
        Loading...
      </div>


      <button
        id="copyReferralButton"
        class="primary-button"
        onclick="copyReferralLink()"
      >
        📋 ${t("copyLink")}
      </button>


      <button
        id="shareReferralButton"
        class="share-button"
        onclick="shareReferralLink()"
      >
        📤 ${t("shareLink")}
      </button>

    </div>


    <div class="referral-levels">

      <div class="referral-level">
        <strong>${t("level1")}</strong>
        <span>6%</span>
      </div>

      <div class="referral-level">
        <strong>${t("level2")}</strong>
        <span>2%</span>
      </div>

      <div class="referral-level">
        <strong>${t("level3")}</strong>
        <span>1%</span>
      </div>

    </div>

  `);


  const telegramId =
    getTelegramId();


  if (!telegramId) {

    setReferralError();

    return;
  }


  try {

    const response =
      await fetch(
        `/api/profile?telegram_chat_id=${encodeURIComponent(telegramId)}`
      );


    const data =
      await response.json();


    const code =
      data.referral_code ||
      data.profile?.referral_code ||
      "";


    if (!code) {

      setReferralError();

      return;
    }


    const cleanCode =
      String(code).trim();


    const link =
      `https://t.me/${BOT_USERNAME}?start=${encodeURIComponent(cleanCode)}`;


    document.getElementById(
      "referralCode"
    ).textContent = cleanCode;


    document.getElementById(
      "referralLink"
    ).textContent = link;


    window.dailyReferralLink = link;


  } catch (error) {

    console.error(
      "Referral error:",
      error
    );

    setReferralError();
  }
}


function setReferralError() {

  const code =
    document.getElementById("referralCode");

  const link =
    document.getElementById("referralLink");

  if (code) {
    code.textContent = "Not available";
  }

  if (link) {
    link.textContent = "Referral link unavailable";
  }
}


/* =========================
   COPY REFERRAL LINK
========================= */

async function copyReferralLink() {

  const link =
    window.dailyReferralLink;


  if (!link) {

    alert("Referral link is not available.");

    return;
  }


  try {

    await navigator.clipboard.writeText(link);

    alert(t("copied"));

  } catch {

    prompt(
      "Copy your referral link:",
      link
    );
  }
}


/* =========================
   SHARE REFERRAL LINK
========================= */

function shareReferralLink() {

  const link =
    window.dailyReferralLink;


  if (!link) {

    alert("Referral link is not available.");

    return;
  }


  const text =
    `Join Daily TRX using my referral link:\n${link}`;


  const telegramShare =
    `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent("Join Daily TRX")}`;


  if (
    telegramApp &&
    telegramApp.openTelegramLink
  ) {

    telegramApp.openTelegramLink(
      telegramShare
    );

    return;
  }


  window.open(
    telegramShare,
    "_blank"
  );
}


/* =========================
   NOTIFICATIONS
========================= */

async function notificationsPage() {

  pageWrapper(`

    <h1 class="page-title">
      ${t("notificationsTitle")}
    </h1>

    <div
      id="announcement"
      class="notice-card"
    >
      Loading...
    </div>

  `);


  try {

    const response =
      await fetch("/api/announcement");

    const data =
      await response.json();


    const box =
      document.getElementById("announcement");


    if (
      data.ok &&
      data.announcement
    ) {

      box.innerHTML = `

        <h3>
          ${data.announcement.title || "Announcement"}
        </h3>

        <p>
          ${data.announcement.message || ""}
        </p>

      `;

    } else {

      box.innerHTML = `
        <h3>No announcements</h3>
        <p>No new notifications.</p>
      `;
    }


  } catch {

    document.getElementById(
      "announcement"
    ).innerHTML = `
      <p>Could not load announcement.</p>
    `;
  }
}


/* =========================
   SUPPORT
========================= */

function supportPage() {

  pageWrapper(`

    <h1 class="page-title">
      ${t("supportTitle")}
    </h1>

    <div class="support-card">

      <h3>
        Daily TRX Support
      </h3>

      <p>
        If you have a problem with your account,
        deposit or investment, please contact support.
      </p>

    </div>

  `);
}


/* =========================
   PROFILE
========================= */

function profilePage() {

  const user =
    getTelegramUser();

  const username =
    user.username
      ? "@" + user.username
      : "Not available";


  pageWrapper(`

    <h1 class="page-title">
      ${t("profileTitle")}
    </h1>

    <div class="profile-card">

      <div class="profile-avatar">
        ${(user.first_name || "U")
          .charAt(0)
          .toUpperCase()}
      </div>

      <div class="profile-item">
        <span>${t("username")}</span>
        <strong>${username}</strong>
      </div>

      <div class="profile-item">
        <span>${t("telegramId")}</span>
        <strong>
          ${getTelegramId() || "Not available"}
        </strong>
      </div>

    </div>

  `);
}


/* =========================
   ADMIN
========================= */

function adminPage() {

  if (getTelegramId() !== ADMIN_ID) {
    render("home");
    return;
  }

  pageWrapper(`

    <h1 class="page-title">
      Admin
    </h1>

    <div class="card">

      <h3>
        Daily TRX Admin
      </h3>

      <p>
        Admin dashboard.
      </p>

    </div>

  `);
}


/* =========================
   RENDER
========================= */

function render(targetPage) {

  window.currentPage =
    targetPage || "home";

  applyTheme();

  switch (window.currentPage) {

    case "home":
      homePage();
      break;

    case "wallet":
      walletPage();
      break;

    case "deposit":
      depositPage();
      break;

    case "withdraw":
      withdrawPage();
      break;

    case "investment":
      investmentPage();
      break;

    case "referral":
      referralPage();
      break;

    case "notifications":
      notificationsPage();
      break;

    case "support":
      supportPage();
      break;

    case "profile":
      profilePage();
      break;

    case "admin":
      adminPage();
      break;

    default:
      homePage();
  }
}


/* =========================
   NAVIGATION
========================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-page]");

    if (!button) return;

    render(button.dataset.page);
  }
);


/* =========================
   START
========================= */

applyTheme();

setTimeout(() => {
  render("home");
}, 500);


/* =========================
   GLOBAL
========================= */

window.render = render;
window.changeLanguage = changeLanguage;
window.toggleTheme = toggleTheme;
window.copyDepositAddress = copyDepositAddress;
window.submitDeposit = submitDeposit;
window.createInvestment = createInvestment;
window.copyReferralLink = copyReferralLink;
window.shareReferralLink = shareReferralLink;
