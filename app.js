const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById("page");

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

const ADMIN_TELEGRAM_ID =
  "6504138324";

const SUPPORT_USERNAME =
  "my_Dailytrxbot";

const CHANNEL_URL =
  "https://t.me/mydailytrx_bot";

const titles = {
  home: "Dashboard",
  wallet: "Wallet",
  deposit: "Deposit",
  withdraw: "Withdraw",
  investment: "Investment",
  referral: "Referral",
  notifications: "Notifications",
  support: "Support",
  profile: "Profile",
  admin: "Admin Panel"
};

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

function getTelegramId() {
  return String(
    telegramApp?.initDataUnsafe?.user?.id || ""
  );
}

function isAdmin() {
  return getTelegramId() === ADMIN_TELEGRAM_ID;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function goTo(pageName) {
  render(pageName);
}

function setLanguage(language) {
  currentLanguage = language;

  localStorage.setItem(
    "dailytrx_language",
    language
  );

  render(
    document.body.dataset.page || "home"
  );
}
const translations = {
  en: {
    home: "Dashboard",
    wallet: "Wallet",
    deposit: "Deposit",
    withdraw: "Withdraw",
    investment: "Investment",
    referral: "Referral",
    notifications: "Notifications",
    support: "Support",
    profile: "Profile",
    admin: "Admin Panel",
    available: "Available Balance",
    total: "Total Balance",
    depositNow: "Deposit Now",
    withdrawNow: "Withdraw",
    investNow: "Invest Now",
    copy: "Copy Address",
    submit: "Submit Deposit",
    submitWithdraw: "Submit Withdrawal"
  },

  ps: {
    home: "ډشبورډ",
    wallet: "والټ",
    deposit: "ډیپازټ",
    withdraw: "ویډرا",
    investment: "پانګونه",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    support: "مرسته",
    profile: "پروفایل",
    admin: "اډمین پینل",
    available: "موجود بیلانس",
    total: "ټول بیلانس",
    depositNow: "ډیپازټ",
    withdrawNow: "ویډرا",
    investNow: "پانګونه",
    copy: "آدرس کاپي",
    submit: "ډیپازټ ثبت کړه",
    submitWithdraw: "ویډرا ثبت کړه"
  },

  fa: {
    home: "داشبورد",
    wallet: "کیف پول",
    deposit: "واریز",
    withdraw: "برداشت",
    investment: "سرمایه‌گذاری",
    referral: "معرفی",
    notifications: "اعلان‌ها",
    support: "پشتیبانی",
    profile: "پروفایل",
    admin: "پنل ادمین",
    available: "موجودی",
    total: "موجودی کل",
    depositNow: "واریز",
    withdrawNow: "برداشت",
    investNow: "سرمایه‌گذاری",
    copy: "کپی آدرس",
    submit: "ثبت واریز",
    submitWithdraw: "ثبت برداشت"
  },

  ur: {
    home: "ڈیش بورڈ",
    wallet: "والٹ",
    deposit: "ڈپازٹ",
    withdraw: "واپسی",
    investment: "سرمایہ کاری",
    referral: "ریفرل",
    notifications: "اطلاعات",
    support: "مدد",
    profile: "پروفائل",
    admin: "ایڈمن پینل",
    available: "دستیاب بیلنس",
    total: "کل بیلنس",
    depositNow: "ڈپازٹ",
    withdrawNow: "واپسی",
    investNow: "سرمایہ کاری",
    copy: "ایڈریس کاپی",
    submit: "ڈپازٹ جمع کریں",
    submitWithdraw: "واپسی جمع کریں"
  }
};

function t(key) {
  return translations[currentLanguage]?.[key]
    || translations.en[key]
    || key;
}
function render(pageName = "home") {

  if (!page) return;

  document.body.dataset.page = pageName;

  let html = `
    <div class="app-container">

      <div class="topbar">
        <div>
          <div class="brand">Daily TRX</div>
          <div class="page-title">
            ${escapeHtml(
              titles[pageName] || "Daily TRX"
            )}
          </div>
        </div>

        <button
          id="themeButton"
          type="button"
        >
          🌙
        </button>
      </div>

      <main class="main-content">
  `;

  if (pageName === "home") {
    html += `
      <section class="hero-card">
        <h2>Welcome to Daily TRX</h2>
        <p>
          Secure TRX wallet and investment platform
        </p>
      </section>

      <section class="balance-grid">

        <div class="stat-card">
          <span>${t("available")}</span>
          <strong id="homeAvailable">
            0 TRX
          </strong>
        </div>

        <div class="stat-card">
          <span>${t("total")}</span>
          <strong id="homeTotal">
            0 TRX
          </strong>
        </div>

      </section>
    `;
  }

  if (pageName === "wallet") {
    html += `
      <section class="balance-card">

        <div>
          ${t("available")}
        </div>

        <strong id="walletAvailable">
          0 TRX
        </strong>

      </section>
    `;
  }

  if (pageName === "deposit") {
    html += `
      <section class="panel">

        <h2>Deposit TRX</h2>

        <div class="qr-box">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
            alt="TRON QR"
          >
        </div>

        <div class="address-box">
          <span>
            ${escapeHtml(DEPOSIT_ADDRESS)}
          </span>

          <button
            id="copyDepositAddress"
            type="button"
          >
            ${t("copy")}
          </button>
        </div>

      </section>
    `;
  }

  page.innerHTML = html;

  setupThemeButton();

  if (pageName === "home") {
    loadWalletBalance();
  }

  if (pageName === "wallet") {
    loadWalletBalance();
  }
}
if (document.getElementById("copyDepositAddress")) {

  document
    .getElementById("copyDepositAddress")
    .addEventListener("click", async () => {

      try {

        await navigator.clipboard.writeText(
          DEPOSIT_ADDRESS
        );

        alert("Deposit address copied");

      } catch (error) {

        alert(DEPOSIT_ADDRESS);

      }

    });
}


async function loadWalletBalance() {

  const id = getTelegramId();

  if (!id) return;

  try {

    const response = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(id)}`
    );

    const data = await response.json();

    if (!data?.ok) return;

    const balance = Number(
      data.wallet?.available_trx ??
      data.available_trx ??
      0
    );

    const value =
      balance.toFixed(2) + " TRX";

    const home =
      document.getElementById("homeAvailable");

    const total =
      document.getElementById("homeTotal");

    const wallet =
      document.getElementById("walletAvailable");

    if (home) {
      home.textContent = value;
    }

    if (total) {
      total.textContent = value;
    }

    if (wallet) {
      wallet.textContent = value;
    }

  } catch (error) {

    console.error(
      "Wallet error:",
      error
    );

  }
}


function setupThemeButton() {

  const button =
    document.getElementById("themeButton");

  if (!button) return;

  button.onclick = () => {

    document.body.classList.toggle(
      "dark-mode"
    );

    button.textContent =
      document.body.classList.contains(
        "dark-mode"
      )
        ? "☀️"
        : "🌙";

  };
}
function showMessage(id, message, ok = false) {

  const box =
    document.getElementById(id);

  if (!box) return;

  box.textContent = message;

  box.className =
    ok ? "success-message" : "error-message";
}


function setupDeposit() {

  const form =
    document.getElementById("depositForm");

  if (!form) return;

  const copyButton =
    document.getElementById(
      "copyDepositAddress"
    );

  if (copyButton) {

    copyButton.onclick = async () => {

      try {

        await navigator.clipboard.writeText(
          DEPOSIT_ADDRESS
        );

        copyButton.textContent =
          "Copied ✓";

        setTimeout(() => {
          copyButton.textContent =
            t("copy");
        }, 1500);

      } catch (error) {

        alert(DEPOSIT_ADDRESS);

      }
    };
  }


  form.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const amount =
        Number(
          document.getElementById(
            "depositAmount"
          )?.value
        );

      const txHash =
        document.getElementById(
          "depositTxHash"
        )?.value.trim();

      const button =
        document.getElementById(
          "depositSubmit"
        );

      if (!amount || amount <= 0) {

        showMessage(
          "depositMessage",
          "Invalid TRX amount"
        );

        return;
      }

      if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {

        showMessage(
          "depositMessage",
          "Invalid TRON transaction hash"
        );

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
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              telegram_chat_id:
                getTelegramId(),

              amount_trx:
                amount,

              tx_hash:
                txHash
            })
          }
        );

        const data =
          await response.json();

        if (!response.ok || !data.ok) {

          throw new Error(
            data.message ||
            "Deposit failed"
          );
        }

        showMessage(
          "depositMessage",
          "Deposit verified successfully ✓",
          true
        );

        form.reset();

        loadWalletBalance();

      } catch (error) {

        showMessage(
          "depositMessage",
          error.message ||
          "Deposit failed"
        );

      } finally {

        button.disabled = false;
        button.textContent =
          t("submit");
      }
    }
  );
}
const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById("page");

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

const ADMIN_TELEGRAM_ID = "6504138324";

const SUPPORT_USERNAME = "my_Dailytrxbot";

const CHANNEL_URL =
  "https://t.me/mydailytrx_bot";

const titles = {
  home: "Dashboard",
  wallet: "Wallet",
  deposit: "Deposit",
  withdraw: "Withdraw",
  investment: "Investment",
  referral: "Referral",
  notifications: "Notifications",
  support: "Support",
  profile: "Profile",
  admin: "Admin Panel"
};

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

function getTelegramId() {
  return String(
    telegramApp?.initDataUnsafe?.user?.id || ""
  );
}

function isAdmin() {
  return getTelegramId() === ADMIN_TELEGRAM_ID;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
const translations = {
  en: {
    home:"Dashboard",
    wallet:"Wallet",
    deposit:"Deposit",
    withdraw:"Withdraw",
    investment:"Investment",
    referral:"Referral",
    notifications:"Notifications",
    support:"Support",
    profile:"Profile",
    admin:"Admin Panel",
    available:"Available Balance",
    total:"Total Balance",
    copy:"Copy Address",
    submit:"Submit Deposit",
    submitWithdraw:"Submit Withdrawal"
  },

  ps: {
    home:"ډشبورډ",
    wallet:"والټ",
    deposit:"ډیپازټ",
    withdraw:"ویډرا",
    investment:"پانګونه",
    referral:"ریفریل",
    notifications:"خبرتیاوې",
    support:"مرسته",
    profile:"پروفایل",
    admin:"اډمین پینل",
    available:"موجود بیلانس",
    total:"ټول بیلانس",
    copy:"آدرس کاپي",
    submit:"ډیپازټ ثبت کړه",
    submitWithdraw:"ویډرا ثبت کړه"
  },

  fa: {
    home:"داشبورد",
    wallet:"کیف پول",
    deposit:"واریز",
    withdraw:"برداشت",
    investment:"سرمایه‌گذاری",
    referral:"معرفی",
    notifications:"اعلان‌ها",
    support:"پشتیبانی",
    profile:"پروفایل",
    admin:"پنل ادمین",
    available:"موجودی",
    total:"موجودی کل",
    copy:"کپی آدرس",
    submit:"ثبت واریز",
    submitWithdraw:"ثبت برداشت"
  },

  ur: {
    home:"ڈیش بورڈ",
    wallet:"والٹ",
    deposit:"ڈپازٹ",
    withdraw:"واپسی",
    investment:"سرمایہ کاری",
    referral:"ریفرل",
    notifications:"اطلاعات",
    support:"مدد",
    profile:"پروفائل",
    admin:"ایڈمن پینل",
    available:"دستیاب بیلنس",
    total:"کل بیلنس",
    copy:"ایڈریس کاپی",
    submit:"ڈپازٹ جمع کریں",
    submitWithdraw:"واپسی جمع کریں"
  }
};

function t(key) {
  return translations[currentLanguage]?.[key]
    || translations.en[key]
    || key;
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  currentLanguage = lang;

  localStorage.setItem(
    "dailytrx_language",
    lang
  );

  render(
    document.body.dataset.page || "home"
  );
}
function render(pageName = "home") {

  if (!page) return;

  document.body.dataset.page = pageName;

  let html = `
    <div class="app-container">

      <div class="topbar">
        <div>
          <div class="brand">Daily TRX</div>
          <div class="page-title">
            ${escapeHtml(
              titles[pageName] || "Daily TRX"
            )}
          </div>
        </div>

        <button id="themeButton" type="button">
          🌙
        </button>
      </div>

      <div id="announcementBox"></div>

      <main class="main-content">
  `;

  if (pageName === "home") {
    html += `
      <section class="hero-card">
        <h2>Welcome to Daily TRX</h2>
        <p>
          Secure TRX wallet and investment platform
        </p>
      </section>

      <section class="balance-grid">
        <div class="stat-card">
          <span>${t("available")}</span>
          <strong id="homeAvailable">0 TRX</strong>
        </div>

        <div class="stat-card">
          <span>${t("total")}</span>
          <strong id="homeTotal">0 TRX</strong>
        </div>
      </section>

      <section class="quick-grid">
        <button data-page="deposit">➕ Deposit</button>
        <button data-page="withdraw">↗️ Withdraw</button>
        <button data-page="investment">📦 Investment</button>
        <button data-page="referral">👥 Referral</button>
        <button data-page="notifications">🔔 Notifications</button>
        <button data-page="support">💬 Support</button>

        ${
          isAdmin()
            ? `<button data-page="admin">🛡️ Admin</button>`
            : ""
        }
      </section>

      <div id="trxPrice" class="price-card">
        TRX Price: Loading...
      </div>
    `;
  }

  if (pageName === "wallet") {
    html += `
      <section class="balance-card">
        <div>${t("available")}</div>
        <strong id="walletAvailable">0 TRX</strong>
      </section>
    `;
  }  if (pageName === "deposit") {
    html += `
      <section class="panel">
        <h2>Deposit TRX</h2>

        <div class="qr-box">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
            alt="TRON Deposit QR"
          >
        </div>

        <div class="address-box">
          <span>${escapeHtml(DEPOSIT_ADDRESS)}</span>

          <button
            id="copyDepositAddress"
            type="button"
          >
            ${t("copy")}
          </button>
        </div>

        <form id="depositForm">

          <label>Amount (TRX)</label>

          <input
            id="depositAmount"
            type="number"
            min="0.1"
            step="0.1"
            required
          >

          <label>Transaction Hash</label>

          <input
            id="depositTxHash"
            type="text"
            minlength="64"
            maxlength="64"
            required
          >

          <button
            id="depositSubmit"
            class="primary-button"
            type="submit"
          >
            ${t("submit")}
          </button>

          <div id="depositMessage"></div>

        </form>
      </section>
    `;
  }

  if (pageName === "withdraw") {
    html += `
      <section class="panel">

        <h2>Withdraw TRX</h2>

        <p>Minimum withdrawal: 20 TRX</p>

        <form id="withdrawForm">

          <label>Amount (TRX)</label>

          <input
            id="withdrawAmount"
            type="number"
            min="20"
            step="0.1"
            required
          >

          <label>TRON Destination Address</label>

          <input
            id="withdrawAddress"
            type="text"
            minlength="34"
            maxlength="34"
            placeholder="T..."
            required
          >

          <button
            id="withdrawSubmit"
            class="primary-button"
            type="submit"
          >
            ${t("submitWithdraw")}
          </button>

          <div id="withdrawMessage"></div>

        </form>

      </section>
    `;
  }
    if (pageName === "investment") {
    html += `
      <section class="panel">
        <h2>Investment</h2>
        <div id="investmentPlans">
          Loading plans...
        </div>
      </section>
    `;
  }

  if (pageName === "referral") {
    html += `
      <section class="panel">
        <h2>Referral</h2>

        <div class="referral-card">
          <h3>3 Level Referral</h3>
          <p>Level 1 — 6%</p>
          <p>Level 2 — 2%</p>
          <p>Level 3 — 1%</p>
        </div>

        <div id="referralLink"></div>
      </section>
    `;
  }

  if (pageName === "notifications") {
    html += `
      <section class="panel">
        <h2>Notifications</h2>
        <div id="notificationsList">
          Loading...
        </div>
      </section>
    `;
  }

  if (pageName === "support") {
    html += `
      <section class="panel">

        <h2>Support</h2>

        <a
          class="link-button"
          href="https://t.me/${SUPPORT_USERNAME}"
          target="_blank"
        >
          💬 Telegram Support
        </a>

        <a
          class="link-button"
          href="${CHANNEL_URL}"
          target="_blank"
        >
          📢 Official Channel
        </a>

      </section>
    `;
  }

  if (pageName === "profile") {
    html += `
      <section class="panel">

        <h2>Profile</h2>

        <div id="profileContent">
          Loading...
        </div>

        <label>Language</label>

        <select id="languageSelect">
          <option value="en">English</option>
          <option value="ps">پښتو</option>
          <option value="fa">فارسی</option>
          <option value="ur">اردو</option>
        </select>

      </section>
    `;
  }
    if (pageName === "admin" && isAdmin()) {
    html += `
      <section class="panel">

        <h2>Admin Panel</h2>

        <div class="admin-tabs">

          <button
            type="button"
            data-admin-tab="announcement"
          >
            📢 Announcement
          </button>

          <button
            type="button"
            data-admin-tab="withdrawals"
          >
            💸 Withdrawals
          </button>

        </div>

        <div id="adminAnnouncementSection"></div>

        <div
          id="adminWithdrawalsSection"
          style="display:none"
        >
          <div id="adminWithdrawalsList">
            Loading...
          </div>
        </div>

      </section>
    `;
  }

  html += `
      </main>

      <div class="bottom-nav">

        <button data-page="home">
          🏠
        </button>

        <button data-page="wallet">
          💰
        </button>

        <button data-page="deposit">
          ➕
        </button>

        <button data-page="withdraw">
          ↗️
        </button>

        <button data-page="profile">
          👤
        </button>

      </div>

    </div>
  `;

  page.innerHTML = html;

  setupThemeButton();

  if (pageName === "home") {
    loadWalletBalance();
    loadTrxPrice();
    loadGlobalAnnouncement();
  }

  if (pageName === "wallet") {
    loadWalletBalance();
  }

  if (pageName === "deposit") {
    setupDeposit();
  }

  if (pageName === "withdraw") {
    setupWithdraw();
  }

  if (pageName === "investment") {
    setupInvestment();
  }

  if (pageName === "referral") {
    setupReferral();
  }

  if (pageName === "notifications") {
    setupNotifications();
  }

  if (pageName === "profile") {
    setupProfile();
  }

  if (pageName === "admin" && isAdmin()) {
    setupAdminPanel();
  }
}
async function loadWalletBalance() {

  const id = getTelegramId();

  if (!id) return;

  try {

    const response = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(id)}`
    );

    const data = await response.json();

    if (!data?.ok) return;

    const balance = Number(
      data.wallet?.available_trx ??
      data.available_trx ??
      0
    );

    const value =
      balance.toFixed(2) + " TRX";

    const a =
      document.getElementById("homeAvailable");

    const b =
      document.getElementById("homeTotal");

    const c =
      document.getElementById("walletAvailable");

    if (a) a.textContent = value;
    if (b) b.textContent = value;
    if (c) c.textContent = value;

  } catch (error) {
    console.error(error);
  }
}


async function loadTrxPrice() {

  const box =
    document.getElementById("trxPrice");

  if (!box) return;

  try {

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
    );

    const data = await response.json();

    const price =
      Number(data?.tron?.usd || 0);

    box.textContent =
      "TRX Price: $" + price.toFixed(4);

  } catch (error) {

    box.textContent =
      "TRX Price: unavailable";
  }
}


function setupThemeButton() {

  const button =
    document.getElementById("themeButton");

  if (!button) return;

  button.onclick = () => {

    document.body.classList.toggle(
      "dark-mode"
    );

    button.textContent =
      document.body.classList.contains(
        "dark-mode"
      )
        ? "☀️"
        : "🌙";
  };
}


function showMessage(id, message, ok = false) {

  const box =
    document.getElementById(id);

  if (!box) return;

  box.textContent = message;

  box.className =
    ok
      ? "success-message"
      : "error-message";
}
function setupDeposit() {

  const copy =
    document.getElementById(
      "copyDepositAddress"
    );

  if (copy) {

    copy.onclick = async () => {

      try {

        await navigator.clipboard.writeText(
          DEPOSIT_ADDRESS
        );

        copy.textContent = "Copied ✓";

      } catch (error) {

        alert(DEPOSIT_ADDRESS);
      }
    };
  }

  const form =
    document.getElementById("depositForm");

  if (!form) return;

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const amount =
        Number(
          document.getElementById(
            "depositAmount"
          ).value
        );

      const txHash =
        document.getElementById(
          "depositTxHash"
        ).value.trim();

      const button =
        document.getElementById(
          "depositSubmit"
        );

      if (amount <= 0) {

        showMessage(
          "depositMessage",
          "Invalid amount"
        );

        return;
      }

      if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {

        showMessage(
          "depositMessage",
          "Invalid TRON transaction hash"
        );

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
              "Content-Type":
                "application/json"
            },
            body: JSON.stringify({
              telegram_chat_id:
                getTelegramId(),
              amount_trx: amount,
              tx_hash: txHash
            })
          }
        );

        const data =
          await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(
            data.message ||
            "Deposit failed"
          );
        }

        showMessage(
          "depositMessage",
          "Deposit verified successfully ✓",
          true
        );

        form.reset();

        loadWalletBalance();

      } catch (error) {

        showMessage(
          "depositMessage",
          error.message
        );

      } finally {

        button.disabled = false;
        button.textContent = t("submit");
      }
    }
  );
}
function setupWithdraw() {

  const form =
    document.getElementById(
      "withdrawForm"
    );

  if (!form) return;

  form.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const amount =
        Number(
          document.getElementById(
            "withdrawAmount"
          ).value
        );

      const address =
        document.getElementById(
          "withdrawAddress"
        ).value.trim();

      const button =
        document.getElementById(
          "withdrawSubmit"
        );

      if (amount < 20) {

        showMessage(
          "withdrawMessage",
          "Minimum withdrawal is 20 TRX"
        );

        return;
      }

      if (
        !/^T[a-zA-Z0-9]{33}$/.test(address)
      ) {

        showMessage(
          "withdrawMessage",
          "Invalid TRON address"
        );

        return;
      }

      button.disabled = true;
      button.textContent = "Processing...";

      try {

        const response = await fetch(
          "/api/withdraw",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              telegram_chat_id:
                getTelegramId(),

              amount_trx:
                amount,

              destination_address:
                address
            })
          }
        );

        const data =
          await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(
            data.message ||
            "Withdrawal failed"
          );
        }

        showMessage(
          "withdrawMessage",
          "Withdrawal request submitted ✓",
          true
        );

        form.reset();

        loadWalletBalance();

      } catch (error) {

        showMessage(
          "withdrawMessage",
          error.message
        );

      } finally {

        button.disabled = false;
        button.textContent =
          t("submitWithdraw");
      }
    }
  );
}


async function setupNotifications() {

  const box =
    document.getElementById(
      "notificationsList"
    );

  if (!box) return;

  const id = getTelegramId();

  try {

    const response = await fetch(
      `/api/notifications?telegram_chat_id=${encodeURIComponent(id)}`
    );

    const data =
      await response.json();

    if (!data.ok) {
      throw new Error(
        data.message || "Failed"
      );
    }

    const list =
      data.notifications || [];

    if (!list.length) {

      box.innerHTML =
        "<p>No notifications yet.</p>";

      return;
    }

    box.innerHTML =
      list.map(item => `
        <div class="notification-card">

          <strong>
            ${escapeHtml(item.title)}
          </strong>

          <p>
            ${escapeHtml(item.message)}
          </p>

          <small>
            ${escapeHtml(
              item.status || ""
            )}
          </small>

        </div>
      `).join("");

  } catch (error) {

    box.textContent =
      error.message;
  }
}
async function setupInvestment() {

  const box =
    document.getElementById(
      "investmentPlans"
    );

  if (!box) return;

  try {

    const response =
      await fetch("/api/investment-plans");

    const data =
      await response.json();

    if (!data.ok) {
      throw new Error(
        data.message || "Failed"
      );
    }

    const plans =
      data.plans || [];

    if (!plans.length) {
      box.innerHTML =
        "<p>No plans available.</p>";
      return;
    }

    box.innerHTML =
      plans.map(plan => `

        <div class="investment-card">

          <h3>
            ${escapeHtml(
              plan.name || "Investment Plan"
            )}
          </h3>

          <p>
            Amount:
            ${Number(
              plan.min_amount || 0
            )} TRX
          </p>

          <p>
            Daily Profit:
            ${Number(
              plan.daily_profit || 0
            )} TRX
          </p>

          <p>
            Duration:
            ${Number(
              plan.duration_days || 0
            )} Days
          </p>

          <button
            type="button"
            data-invest="${escapeHtml(
              plan.id
            )}"
          >
            Invest Now
          </button>

        </div>

      `).join("");

  } catch (error) {

    box.textContent =
      error.message;
  }
}


function setupReferral() {

  const box =
    document.getElementById(
      "referralLink"
    );

  if (!box) return;

  const id = getTelegramId();

  const link =
    `https://t.me/MyDailyTRXBot?start=ref_${id}`;

  box.innerHTML = `
    <p>Your referral link:</p>

    <div class="address-box">
      <span>${escapeHtml(link)}</span>
    </div>

    <p>Level 1: 6%</p>
    <p>Level 2: 2%</p>
    <p>Level 3: 1%</p>
  `;
}


function setupProfile() {

  const select =
    document.getElementById(
      "languageSelect"
    );

  if (select) {

    select.value =
      currentLanguage;

    select.onchange = () => {
      setLanguage(select.value);
    };
  }

  const box =
    document.getElementById(
      "profileContent"
    );

  if (!box) return;

  const user =
    telegramApp?.initDataUnsafe?.user;

  box.innerHTML = `
    <div class="profile-card">

      <h3>
        ${escapeHtml(
          user?.first_name ||
          user?.username ||
          "Telegram User"
        )}
      </h3>

      <p>
        Telegram ID:
        ${escapeHtml(getTelegramId())}
      </p>

    </div>
  `;
}


async function loadGlobalAnnouncement() {

  const box =
    document.getElementById(
      "announcementBox"
    );

  if (!box) return;

  try {

    const response =
      await fetch(
        "/api/global-announcement"
      );

    const data =
      await response.json();

    const item =
      data?.announcement;

    if (!item) return;

    box.innerHTML = `
      <div class="announcement-card">

        <strong>
          📢 ${escapeHtml(item.title)}
        </strong>

        <p>
          ${escapeHtml(item.message)}
        </p>

      </div>
    `;

  } catch (error) {

    console.error(
      "Announcement error:",
      error
    );
  }
}


function setupAdminPanel() {

  const announcement =
    document.getElementById(
      "adminAnnouncementSection"
    );

  if (announcement) {

    announcement.innerHTML = `
      <form id="adminAnnouncementForm">

        <input
          id="announcementTitle"
          placeholder="Title"
          required
        >

        <textarea
          id="announcementMessage"
          placeholder="Message"
          required
        ></textarea>

        <input
          id="announcementImage"
          placeholder="Image URL"
        >

        <input
          id="announcementStart"
          type="datetime-local"
          required
        >

        <button type="submit">
          Publish Announcement
        </button>

        <div id="announcementAdminMessage"></div>

      </form>
    `;

    const form =
      document.getElementById(
        "adminAnnouncementForm"
      );

    form.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        try {

          const response =
            await fetch(
              "/api/admin/announcement",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                  telegram_chat_id:
                    getTelegramId(),

                  title:
                    document.getElementById(
                      "announcementTitle"
                    ).value,

                  message:
                    document.getElementById(
                      "announcementMessage"
                    ).value,

                  image_url:
                    document.getElementById(
                      "announcementImage"
                    ).value || null,

                  starts_at:
                    new Date(
                      document.getElementById(
                        "announcementStart"
                      ).value
                    ).toISOString(),

                  active: true
                })
              }
            );

          const data =
            await response.json();

          if (!response.ok || !data.ok) {
            throw new Error(
              data.message ||
              "Failed"
            );
          }

          document.getElementById(
            "announcementAdminMessage"
          ).textContent =
            "Announcement published ✓";

          form.reset();

        } catch (error) {

          document.getElementById(
            "announcementAdminMessage"
          ).textContent =
            error.message;
        }
      }
    );
  }

  document
    .querySelectorAll("[data-admin-tab]")
    .forEach(button => {

      button.onclick = () => {

        const tab =
          button.dataset.adminTab;

        const a =
          document.getElementById(
            "adminAnnouncementSection"
          );

        const w =
          document.getElementById(
            "adminWithdrawalsSection"
          );

        if (tab === "announcement") {
          a.style.display = "block";
          w.style.display = "none";
        }

        if (tab === "withdrawals") {
          a.style.display = "none";
          w.style.display = "block";
          loadAdminWithdrawals();
        }
      };
    });
}


async function loadAdminWithdrawals() {

  const box =
    document.getElementById(
      "adminWithdrawalsList"
    );

  if (!box) return;

  try {

    const response =
      await fetch(
        `/api/admin/withdrawals?telegram_chat_id=${encodeURIComponent(getTelegramId())}`
      );

    const data =
      await response.json();

    if (!data.ok) {
      throw new Error(
        data.message || "Failed"
      );
    }

    const list =
      data.withdrawals || [];

    if (!list.length) {

      box.innerHTML =
        "<p>No pending withdrawals.</p>";

      return;
    }

    box.innerHTML =
      list.map(item => `

        <div class="admin-withdrawal">

          <h3>
            Withdrawal #${item.id}
          </h3>

          <p>
            User:
            ${escapeHtml(
              item.telegram_chat_id
            )}
          </p>

          <p>
            Amount:
            ${escapeHtml(
              item.amount_trx
            )} TRX
          </p>

          <p>
            Address:
            ${escapeHtml(
              item.destination_address
            )}
          </p>

          <textarea
            data-note="${item.id}"
            placeholder="Admin note"
          ></textarea>

          <button
            data-action="approve"
            data-id="${item.id}"
          >
            Approve
          </button>

          <button
            data-action="reject"
            data-id="${item.id}"
          >
            Reject
          </button>

        </div>

      `).join("");

  } catch (error) {

    box.textContent =
      error.message;
  }
}


document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-page]"
      );

    if (button) {

      event.preventDefault();

      render(
        button.dataset.page
      );

      return;
    }

    const invest =
      event.target.closest(
        "[data-invest]"
      );

    if (invest) {

      investInPlan(
        invest.dataset.invest
      );

      return;
    }

    const action =
      event.target.closest(
        "[data-action]"
      );

    if (action) {

      processAdminWithdrawal(
        action.dataset.id,
        action.dataset.action
      );
    }
  }
);


async function investInPlan(planId) {

  if (!confirm("Confirm investment?")) {
    return;
  }

  try {

    const response =
      await fetch(
        "/api/create-investment",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            telegram_chat_id:
              getTelegramId(),

            plan_id:
              planId
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(
        data.message ||
        "Investment failed"
      );
    }

    alert(
      "Investment created successfully ✓"
    );

    loadWalletBalance();

  } catch (error) {

    alert(error.message);
  }
}


async function processAdminWithdrawal(
  withdrawalId,
  action
) {

  const note =
    document.querySelector(
      `[data-note="${withdrawalId}"]`
    )?.value || "";

  if (
    !confirm(
      `Confirm ${action} withdrawal?`
    )
  ) {
    return;
  }

  try {

    const response =
      await fetch(
        "/api/admin/withdrawals",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            telegram_chat_id:
              getTelegramId(),

            withdrawal_id:
              Number(withdrawalId),

            action,

            admin_note:
              note
          })
        }
      );

    const data =
      await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(
        data.message ||
        "Action failed"
      );
    }

    alert(
      `Withdrawal ${action}d successfully`
    );

    loadAdminWithdrawals();

  } catch (error) {

    alert(error.message);
  }
}


if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    () => render("home")
  );

} else {

  render("home");
}
