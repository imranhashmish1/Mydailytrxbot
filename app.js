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

let walletData = {
  available_trx: 0,
  locked_trx: 0
};

let profileData = {};

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
    balance: "Available Balance",
    available: "Available",
    locked: "Locked",
    quickActions: "Quick Actions",
    addFunds: "Add Funds",
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
      "Send TRX to the address above, then submit your transaction hash.",
    investmentPlans: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    totalProfit: "Total Profit",
    startInvestment: "Start Investment",
    referralProgram: "Referral Program",
    referralCode: "Referral Code",
    referralLink: "Referral Link",
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
      "Withdrawal service will be available through the system after the required balance and approval conditions are met.",
    loading: "Loading...",
    copied: "Copied successfully",
    failed: "Something went wrong",
    invalidAmount: "Enter a valid TRX amount.",
    invalidHash: "Enter a valid 64-character TRON transaction hash.",
    depositSuccess: "Deposit submitted successfully.",
    investing: "Processing...",
    investmentSuccess: "Investment created successfully.",
    insufficient:
      "Insufficient available TRX.",
    noPlans: "No active investment plans found.",
    admin: "Admin",
    announcement: "Announcement",
    noAnnouncement: "No announcement available.",
    language: "Language",
    light: "Light",
    dark: "Dark"
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
    balance: "موجود بیلانس",
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
      "TRX پورته ادرس ته واستوئ، بیا خپل Transaction Hash ثبت کړئ.",
    investmentPlans: "د انویسټمنټ پلانونه",
    dailyProfit: "ورځنۍ ګټه",
    duration: "موده",
    totalProfit: "ټوله ګټه",
    startInvestment: "انویسټمنټ شروع کړه",
    referralProgram: "ریفریل پروګرام",
    referralCode: "ریفریل کوډ",
    referralLink: "ریفریل لینک",
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
    invalidAmount: "د TRX صحیح مقدار ولیکئ.",
    invalidHash: "صحیح 64 کرکټر TRON Transaction Hash ولیکئ.",
    depositSuccess: "ډیپازټ په بریالیتوب ثبت شو.",
    investing: "پروسس کېږي...",
    investmentSuccess: "انویسټمنټ په بریالیتوب جوړ شو.",
    insufficient: "موجود TRX کافي نه دی.",
    noPlans: "فعال انویسټمنټ پلانونه ونه موندل شول.",
    admin: "اډمین",
    announcement: "اعلان",
    noAnnouncement: "اوس مهال اعلان نشته.",
    language: "ژبه",
    light: "روښانه",
    dark: "تیاره"
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
    balance: "موجودی قابل استفاده",
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
      "TRX را به آدرس بالا ارسال کنید و سپس هش تراکنش را ثبت کنید.",
    investmentPlans: "پلان‌های سرمایه‌گذاری",
    dailyProfit: "سود روزانه",
    duration: "مدت",
    totalProfit: "سود کل",
    startInvestment: "شروع سرمایه‌گذاری",
    referralProgram: "برنامه معرفی",
    referralCode: "کد معرفی",
    referralLink: "لینک معرفی",
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
    invalidAmount: "مقدار صحیح TRX را وارد کنید.",
    invalidHash: "هش صحیح ۶۴ کاراکتری TRON را وارد کنید.",
    depositSuccess: "واریز با موفقیت ثبت شد.",
    investing: "در حال پردازش...",
    investmentSuccess: "سرمایه‌گذاری با موفقیت ایجاد شد.",
    insufficient: "موجودی TRX کافی نیست.",
    noPlans: "پلان فعال سرمایه‌گذاری پیدا نشد.",
    admin: "مدیر",
    announcement: "اعلان",
    noAnnouncement: "اعلانی وجود ندارد.",
    language: "زبان",
    light: "روشن",
    dark: "تیره"
  }
};

function t(key) {
  return translations[currentLanguage]?.[key] ||
         translations.en[key] ||
         key;
}

function getTelegramId() {
  return String(
    tg?.initDataUnsafe?.user?.id ||
    localStorage.getItem("dailytrx_telegram_id") ||
    ""
  );
}

function getUsername() {
  return (
    profileData.username ||
    profileData.profile?.username ||
    tg?.initDataUnsafe?.user?.username ||
    localStorage.getItem("dailytrx_username") ||
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

function setTheme() {
  document.documentElement.dataset.theme = currentTheme;
}

function applyLanguageDirection() {
  document.documentElement.lang = currentLanguage;

  if (currentLanguage === "ps" || currentLanguage === "fa") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }
}

setTheme();
applyLanguageDirection();

async function apiGet(url) {
  const response = await fetch(url);

  const data = await response.json();

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
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      "Request failed"
    );
  }

  return data;
}

/* Header */

function header(title = "Daily TRX") {

  return `
    <div class="top-header">

      <div class="brand">

        <div class="brand-small">₮</div>

        <div>
          <div class="brand-title">
            Daily TRX
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
        >
          <option value="en" ${currentLanguage === "en" ? "selected" : ""}>
            EN
          </option>

          <option value="ps" ${currentLanguage === "ps" ? "selected" : ""}>
            پښتو
          </option>

          <option value="fa" ${currentLanguage === "fa" ? "selected" : ""}>
            فارسی
          </option>
        </select>

        <button
          class="icon-button"
          id="themeButton"
          type="button"
        >
          ${currentTheme === "dark" ? "☀️" : "🌙"}
        </button>

      </div>

    </div>
  `;
}

/* Navigation */

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
          class="nav-button ${currentPage === item[0] ? "active" : ""}"
          data-page="${item[0]}"
        >
          <span class="nav-icon">${item[1]}</span>
          <span class="nav-label">${escapeHtml(item[2])}</span>
        </button>
      `).join("")}

    </nav>
  `;
}

/* Home */

async function renderHome() {

  page.innerHTML = `
    ${header(t("dashboard"))}

    <div class="welcome">

      <h2>
        ${escapeHtml(t("welcome"))},
        ${escapeHtml(getUsername())} 👋
      </h2>

      <p>${escapeHtml(t("dashboard"))}</p>

    </div>

    <div id="homeContent">

      <div class="card loading-box">
        <div class="spinner"></div>
        <div>${escapeHtml(t("loading"))}</div>
      </div>

    </div>

    ${navigation()}
  `;

  bindHeader();

  try {

    await loadWallet();

    let announcement = null;

    try {
      const data = await apiGet("/api/announcement");
      announcement =
        data?.announcement ||
        null;
    } catch (_) {}

    document.getElementById("homeContent").innerHTML = `

      <div class="card balance-card">

        <div class="balance-label">
          ${escapeHtml(t("balance"))}
        </div>

        <div class="balance-value">
          ${money(walletData.available_trx)}
          <span class="balance-unit">TRX</span>
        </div>

        <div class="balance-row">

          <div class="small-stat">
            <div class="small-stat-label">
              ${escapeHtml(t("available"))}
            </div>

            <div class="small-stat-value">
              ${money(walletData.available_trx)}
            </div>
          </div>

          <div class="small-stat">
            <div class="small-stat-label">
              ${escapeHtml(t("locked"))}
            </div>

            <div class="small-stat-value">
              ${money(walletData.locked_trx)}
            </div>
          </div>

        </div>

      </div>

      ${
        announcement
        ? `
          <div class="card">
            <div class="card-title">
              📢 ${escapeHtml(t("announcement"))}
            </div>

            <div class="notice">
              ${escapeHtml(
                typeof announcement === "string"
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
          ${escapeHtml(t("quickActions"))}
        </div>

        <div class="quick-grid">

          <button
            class="quick-card"
            data-page="deposit"
          >
            <div class="quick-icon">💳</div>
            <div class="quick-title">${escapeHtml(t("addFunds"))}</div>
            <div class="quick-text">${escapeHtml(t("deposit"))}</div>
          </button>

          <button
            class="quick-card"
            data-page="investment"
          >
            <div class="quick-icon">📈</div>
            <div class="quick-title">${escapeHtml(t("invest"))}</div>
            <div class="quick-text">${escapeHtml(t("investment"))}</div>
          </button>

          <button
            class="quick-card"
            data-page="referral"
          >
            <div class="quick-icon">👥</div>
            <div class="quick-title">${escapeHtml(t("invite"))}</div>
            <div class="quick-text">${escapeHtml(t("referral"))}</div>
          </button>

          <button
            class="quick-card"
            data-page="wallet"
          >
            <div class="quick-icon">💰</div>
            <div class="quick-title">${escapeHtml(t("myWallet"))}</div>
            <div class="quick-text">${escapeHtml(t("wallet"))}</div>
          </button>

        </div>

      </div>

    `;

    bindPageButtons();

  } catch (error) {

    document.getElementById("homeContent").innerHTML = `
      <div class="card">
        <div class="notice">
          ${escapeHtml(error.message || t("failed"))}
        </div>
      </div>
    `;
  }
}

/* Wallet */

async function renderWallet() {

  page.innerHTML = `
    ${header(t("wallet"))}

    <div class="card loading-box">
      <div class="spinner"></div>
      <div>${escapeHtml(t("loading"))}</div>
    </div>

    ${navigation()}
  `;

  bindHeader();

  try {

    await loadWallet();

    page.innerHTML = `
      ${header(t("wallet"))}

      <div class="card balance-card">

        <div class="balance-label">
          ${escapeHtml(t("balance"))}
        </div>

        <div class="balance-value">
          ${money(walletData.available_trx)}
          <span class="balance-unit">TRX</span>
        </div>

      </div>

      <div class="card">

        <div class="info-line">
          <span class="info-label">
            ${escapeHtml(t("available"))}
          </span>

          <span class="info-value">
            ${money(walletData.available_trx)} TRX
          </span>
        </div>

        <div class="info-line">
          <span class="info-label">
            ${escapeHtml(t("locked"))}
          </span>

          <span class="info-value">
            ${money(walletData.locked_trx)} TRX
          </span>
        </div>

        <div class="info-line">
          <span class="info-label">
            Total
          </span>

          <span class="info-value">
            ${money(
              Number(walletData.available_trx || 0) +
              Number(walletData.locked_trx || 0)
            )} TRX
          </span>
        </div>

      </div>

      <div class="quick-grid">

        <button class="quick-card" data-page="deposit">
          <div class="quick-icon">＋</div>
          <div class="quick-title">${escapeHtml(t("deposit"))}</div>
        </button>

        <button class="quick-card" data-page="withdraw">
          <div class="quick-icon">↗</div>
          <div class="quick-title">${escapeHtml(t("withdraw"))}</div>
        </button>

      </div>

      ${navigation()}
    `;

    bindHeader();
    bindPageButtons();

  } catch (error) {

    page.innerHTML = `
      ${header(t("wallet"))}

      <div class="card">
        <div class="notice">
          ${escapeHtml(error.message || t("failed"))}
        </div>
      </div>

      ${navigation()}
    `;

    bindHeader();
  }
}

/* Deposit */

function renderDeposit() {

  const qr =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(DEPOSIT_ADDRESS);

  page.innerHTML = `

    ${header(t("depositTRX"))}

    <div class="card">

      <div class="card-title">
        ${escapeHtml(t("depositAddress"))}
      </div>

      <div class="qr-box">
        <img
          src="${qr}"
          alt="TRX Deposit QR"
        />
      </div>

      <div class="address-box">
        ${escapeHtml(DEPOSIT_ADDRESS)}
      </div>

      <button
        id="copyAddressButton"
        class="secondary-button"
      >
        📋 ${escapeHtml(t("copyAddress"))}
      </button>

    </div>

    <div class="card">

      <div class="notice">
        ${escapeHtml(t("depositInfo"))}
      </div>

      <div class="input-group" style="margin-top:15px">

        <label>
          ${escapeHtml(t("amount"))}
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
          ${escapeHtml(t("transactionHash"))}
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
      >
        ${escapeHtml(t("submitDeposit"))}
      </button>

      <p id="depositMessage" class="form-message"></p>

    </div>

    ${navigation()}
  `;

  bindHeader();

  document
    .getElementById("copyAddressButton")
    ?.addEventListener("click", async () => {

      await copyText(DEPOSIT_ADDRESS);

      const button =
        document.getElementById("copyAddressButton");

      button.textContent = "✓ " + t("copied");

      setTimeout(() => {
        button.textContent = "📋 " + t("copyAddress");
      }, 1500);
    });

  document
    .getElementById("submitDepositButton")
    ?.addEventListener("click", submitDeposit);
}

async function submitDeposit() {

  const button =
    document.getElementById("submitDepositButton");

  const message =
    document.getElementById("depositMessage");

  const amount =
    Number(document.getElementById("depositAmount")?.value || 0);

  const txHash =
    String(
      document.getElementById("depositTxHash")?.value || ""
    ).trim();

  if (!amount || amount <= 0) {

    message.textContent = "❌ " + t("invalidAmount");
    message.className = "form-message error-text";

    return;
  }

  if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {

    message.textContent = "❌ " + t("invalidHash");
    message.className = "form-message error-text";

    return;
  }

  const telegramId = getTelegramId();

  if (!telegramId) {

    message.textContent =
      "❌ Telegram ID not found.";

    message.className =
      "form-message error-text";

    return;
  }

  button.disabled = true;
  button.textContent = t("loading");

  message.textContent = "";

  try {

    const result = await apiPost("/api/deposit", {
      telegram_chat_id: telegramId,
      amount_trx: amount,
      tx_hash: txHash
    });

    if (!result.ok) {
      throw new Error(
        result.message || t("failed")
      );
    }

    message.textContent =
      "✅ " + t("depositSuccess");

    message.className =
      "form-message success-text";

    document.getElementById("depositAmount").value = "";
    document.getElementById("depositTxHash").value = "";

    await loadWallet();

  } catch (error) {

    message.textContent =
      "❌ " + (
        error.message ||
        t("failed")
      );

    message.className =
      "form-message error-text";

  } finally {

    button.disabled = false;
    button.textContent = t("submitDeposit");
  }
}

/* Investment */

async function renderInvestment() {

  page.innerHTML = `
    ${header(t("investmentPlans"))}

    <div class="card loading-box">
      <div class="spinner"></div>
      <div>${escapeHtml(t("loading"))}</div>
    </div>

    ${navigation()}
  `;

  bindHeader();

  try {

    const data =
      await apiGet("/api/investment-plans");

    const plans =
      Array.isArray(data)
        ? data
        : data.plans || [];

    if (!plans.length) {

      page.innerHTML = `
        ${header(t("investmentPlans"))}

        <div class="card">
          <div class="notice">
            ${escapeHtml(t("noPlans"))}
          </div>
        </div>

        ${navigation()}
      `;

      bindHeader();

      return;
    }

    page.innerHTML = `
      ${header(t("investmentPlans"))}

      <div id="plansContainer">

        ${plans.map(plan => {

          const amount =
            Number(plan.amount_trx || 0);

          const daily =
            Number(plan.daily_profit_trx || 0);

          const days =
            Number(plan.duration_days || 0);

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
                ${money(amount)} TRX
              </div>

              <div class="plan-row">
                <span>${escapeHtml(t("dailyProfit"))}</span>
                <strong>${money(daily)} TRX</strong>
              </div>

              <div class="plan-row">
                <span>${escapeHtml(t("duration"))}</span>
                <strong>${days} days</strong>
              </div>

              <div class="plan-row">
                <span>${escapeHtml(t("totalProfit"))}</span>
                <strong>${money(total)} TRX</strong>
              </div>

              <button
                class="primary-button invest-button"
                data-plan-id="${escapeHtml(plan.id)}"
              >
                ${escapeHtml(t("startInvestment"))}
              </button>

              <p
                class="form-message"
                id="investmentMessage-${escapeHtml(plan.id)}"
              ></p>

            </div>
          `;
        }).join("")}

      </div>

      ${navigation()}
    `;

    bindHeader();

    document
      .querySelectorAll(".invest-button")
      .forEach(button => {

        button.addEventListener(
          "click",
          () => createInvestment(
            button.dataset.planId,
            button
          )
        );
      });

  } catch (error) {

    page.innerHTML = `
      ${header(t("investmentPlans"))}

      <div class="card">
        <div class="notice">
          ${escapeHtml(
            error.message || t("failed")
          )}
        </div>
      </div>

      ${navigation()}
    `;

    bindHeader();
  }
}

async function createInvestment(planId, button) {

  const telegramId = getTelegramId();

  if (!telegramId) {
    alert("Telegram ID not found.");
    return;
  }

  button.disabled = true;
  button.textContent = t("investing");

  try {

    const result =
      await apiPost("/api/create-investment", {
        telegram_chat_id: telegramId,
        plan_id: Number(planId)
      });

    if (!result.ok) {
      throw new Error(
        result.message ||
        t("failed")
      );
    }

    alert(
      "✅ " +
      (result.message ||
       t("investmentSuccess"))
    );

    await loadWallet();

    renderInvestment();

  } catch (error) {

    alert(
      "❌ " +
      (error.message ||
       t("failed"))
    );

    button.disabled = false;
    button.textContent =
      t("startInvestment");
  }
}

/* Referral */

async function renderReferral() {

  const telegramId = getTelegramId();

  try {

    const data =
      await apiGet(
        "/api/profile?telegram_chat_id=" +
        encodeURIComponent(telegramId)
      );

    profileData =
      data?.profile ||
      data ||
      profileData;

  } catch (_) {}

  const code =
    profileData.referral_code ||
    profileData.profile?.referral_code ||
    "NOT-AVAILABLE";

  const link =
    "https://t.me/" +
    BOT_USERNAME +
    "?start=" +
    encodeURIComponent(code);

  page.innerHTML = `

    ${header(t("referralProgram"))}

    <div class="card">

      <div class="card-title">
        ${escapeHtml(t("referralCode"))}
      </div>

      <div class="referral-code">
        ${escapeHtml(code)}
      </div>

      <div class="card-title">
        ${escapeHtml(t("referralLink"))}
      </div>

      <div class="referral-link">
        ${escapeHtml(link)}
      </div>

      <button
        id="copyReferral"
        class="secondary-button"
      >
        📋 ${escapeHtml(t("copyLink"))}
      </button>

      <button
        id="shareReferral"
        class="primary-button"
      >
        ↗ ${escapeHtml(t("share"))}
      </button>

    </div>

    <div class="card">

      <div class="card-title">
        ${escapeHtml(t("referralProgram"))}
      </div>

      <div class="level-grid">

        <div class="level-card">
          <div class="level-number">
            ${escapeHtml(t("level1"))}
          </div>
          <div class="level-rate">6%</div>
        </div>

        <div class="level-card">
          <div class="level-number">
            ${escapeHtml(t("level2"))}
          </div>
          <div class="level-rate">2%</div>
        </div>

        <div class="level-card">
          <div class="level-number">
            ${escapeHtml(t("level3"))}
          </div>
          <div class="level-rate">1%</div>
        </div>

      </div>

    </div>

    ${navigation()}
  `;

  bindHeader();

  document
    .getElementById("copyReferral")
    ?.addEventListener("click", async () => {

      await copyText(link);

      document.getElementById(
        "copyReferral"
      ).textContent = "✓ " + t("copied");
    });

  document
    .getElementById("shareReferral")
    ?.addEventListener("click", () => {

      const shareUrl =
        "https://t.me/share/url?url=" +
        encodeURIComponent(link) +
        "&text=" +
        encodeURIComponent(
          "Join Daily TRX using my referral link."
        );

      if (tg?.openTelegramLink) {
        tg.openTelegramLink(shareUrl);
      } else {
        window.open(shareUrl, "_blank");
      }
    });
}

/* Notifications */

async function renderNotifications() {

  let announcement = null;

  try {

    const data =
      await apiGet("/api/announcement");

    announcement =
      data?.announcement ||
      null;

  } catch (_) {}

  page.innerHTML = `

    ${header(t("notificationsTitle"))}

    <div class="card">

      <div class="card-title">
        📢 ${escapeHtml(t("notificationsTitle"))}
      </div>

      ${
        announcement
        ? `
          <div class="notice">
            ${escapeHtml(
              typeof announcement === "string"
                ? announcement
                : announcement.message ||
                  announcement.text ||
                  ""
            )}
          </div>
        `
        : `
          <div class="notice">
            ${escapeHtml(t("noNotifications"))}
          </div>
        `
      }

    </div>

    ${navigation()}
  `;

  bindHeader();
}

/* Support */

function renderSupport() {

  page.innerHTML = `

    ${header(t("supportTitle"))}

    <div class="card">

      <div class="card-title">
        🎧 ${escapeHtml(t("supportTitle"))}
      </div>

      <div class="notice">
        ${escapeHtml(t("supportText"))}
      </div>

      <button
        class="primary-button"
        id="adminContact"
      >
        ${escapeHtml(t("support"))}
      </button>

    </div>

    ${navigation()}
  `;

  bindHeader();

  document
    .getElementById("adminContact")
    ?.addEventListener("click", () => {

      const url =
        "https://t.me/" + BOT_USERNAME;

      if (tg?.openTelegramLink) {
        tg.openTelegramLink(url);
      } else {
        window.open(url, "_blank");
      }
    });
}

/* Withdraw */

function renderWithdraw() {

  page.innerHTML = `

    ${header(t("withdrawTitle"))}

    <div class="card">

      <div class="card-title">
        💸 ${escapeHtml(t("withdrawTitle"))}
      </div>

      <div class="notice">
        ${escapeHtml(t("withdrawText"))}
      </div>

    </div>

    ${navigation()}
  `;

  bindHeader();
}

/* Profile */

async function renderProfile() {

  const telegramId = getTelegramId();

  try {

    const data =
      await apiGet(
        "/api/profile?telegram_chat_id=" +
        encodeURIComponent(telegramId)
      );

    profileData =
      data?.profile ||
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

    ${header(t("profileTitle"))}

    <div class="card">

      <div class="card-title">
        👤 ${escapeHtml(t("profileTitle"))}
      </div>

      <div class="info-line">

        <span class="info-label">
          ${escapeHtml(t("username"))}
        </span>

        <span class="info-value">
          ${escapeHtml(username)}
        </span>

      </div>

      <div class="info-line">

        <span class="info-label">
          ${escapeHtml(t("email"))}
        </span>

        <span class="info-value">
          ${escapeHtml(email)}
        </span>

      </div>

      <div class="info-line">

        <span class="info-label">
          ${escapeHtml(t("telegramId"))}
        </span>

        <span class="info-value">
          ${escapeHtml(telegramId || "—")}
        </span>

      </div>

      <div class="info-line">

        <span class="info-label">
          ${escapeHtml(t("verified"))}
        </span>

        <span class="info-value">
          ${verified ? "✓ " + t("yes") : t("no")}
        </span>

      </div>

    </div>

    <div class="card">

      <button
        class="secondary-button"
        data-page="referral"
      >
        👥 ${escapeHtml(t("referral"))}
      </button>

      <button
        class="secondary-button"
        data-page="notifications"
      >
        🔔 ${escapeHtml(t("notifications"))}
      </button>

      <button
        class="secondary-button"
        data-page="support"
      >
        🎧 ${escapeHtml(t("support"))}
      </button>

    </div>

    ${navigation()}
  `;

  bindHeader();
  bindPageButtons();
}

/* Load wallet */

async function loadWallet() {

  const telegramId = getTelegramId();

  if (!telegramId) {
    throw new Error("Telegram ID not found");
  }

  const data =
    await apiGet(
      "/api/wallet?telegram_chat_id=" +
      encodeURIComponent(telegramId)
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

/* Copy */

async function copyText(text) {

  try {

    await navigator.clipboard.writeText(text);

    return true;

  } catch (_) {

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    textarea.remove();

    return true;
  }
}

/* Header controls */

function bindHeader() {

  const language =
    document.getElementById("languageSelect");

  if (language) {

    language.addEventListener(
      "change",
      () => {

        currentLanguage =
          language.value;

        localStorage.setItem(
          "dailytrx_language",
          currentLanguage
        );

        applyLanguageDirection();

        render(currentPage);
      }
    );
  }

  const theme =
    document.getElementById("themeButton");

  if (theme) {

    theme.addEventListener(
      "click",
      () => {

        currentTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";

        localStorage.setItem(
          "dailytrx_theme",
          currentTheme
        );

        setTheme();

        render(currentPage);
      }
    );
  }
}

/* Buttons */

function bindPageButtons() {

  document
    .querySelectorAll("[data-page]")
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

/* Render */

async function render(pageName) {

  currentPage = pageName;

  window.scrollTo({
    top: 0,
    behavior: "instant"
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
}

window.render = render;

/* Start app */

const telegramUser =
  tg?.initDataUnsafe?.user;

if (telegramUser?.id) {

  localStorage.setItem(
    "dailytrx_telegram_id",
    String(telegramUser.id)
  );
}

const app =
  document.getElementById("app");

const registration =
  document.getElementById("registration");

const oldRegistered =
  localStorage.getItem(
    "dailytrx_registered"
  );

const userId =
  getTelegramId();

const userRegistered =
  userId
    ? localStorage.getItem(
        "dailytrx_registered_" + userId
      )
    : oldRegistered;

if (userRegistered === "true" || oldRegistered === "true") {

  registration?.classList.add("hidden");

  app?.classList.remove("app-hidden");

  render("home");

} else {

  app?.classList.add("app-hidden");

  registration?.classList.remove("hidden");

  const referral =
    tg?.initDataUnsafe?.start_param || "";

  const referralInput =
    document.getElementById("regReferral");

  if (referralInput) {
    referralInput.value = referral;
  }

  const registerButton =
    document.getElementById("registerButton");

  registerButton?.addEventListener(
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

      if (!username || username.length < 3) {

        message.textContent =
          "❌ Username must contain at least 3 characters.";

        return;
      }

      if (!email || !email.includes("@")) {

        message.textContent =
          "❌ Enter a valid email.";

        return;
      }

      if (!/^\d{4,6}$/.test(pin)) {

        message.textContent =
          "❌ PIN must contain 4–6 digits.";

        return;
      }

      if (pin !== confirmPin) {

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

      registerButton.disabled = true;
      registerButton.textContent = "Creating...";

      try {

        const result =
          await apiPost("/api/register", {

            telegram_chat_id:
              telegramId,

            username,

            email,

            pin,

            referral_code:
              referralCode

          });

        if (!result.ok) {
          throw new Error(
            result.message ||
            "Registration failed."
          );
        }

        localStorage.setItem(
          "dailytrx_registered",
          "true"
        );

        localStorage.setItem(
          "dailytrx_registered_" +
          telegramId,
          "true"
        );

        localStorage.setItem(
          "dailytrx_username",
          username
        );

        profileData = {
          username,
          email,
          ...(result.profile || {})
        };

        registration.classList.add(
          "hidden"
        );

        app.classList.remove(
          "app-hidden"
        );

        render("home");

      } catch (error) {

        message.textContent =
          "❌ " +
          (
            error.message ||
            "Registration failed."
          );

        registerButton.disabled = false;
        registerButton.textContent =
          "Create Account";
      }
    }
  );
}
