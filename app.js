const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById("page");

const ADMIN_ID = "6504138324";

const DEPOSIT_ADDRESS =
  "TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA";

let currentPage = "home";

const translations = {
  en: {
    home: "Home",
    wallet: "Wallet",
    deposit: "Deposit",
    invest: "Invest",
    profile: "Profile",
    support: "Support",
    referral: "Referral",
    notifications: "Notifications",
    withdraw: "Withdraw",
    investment: "Investment",
    balance: "Available Balance",
    locked: "Locked",
    profit: "Total Profit",
    quickActions: "Quick Actions",
    depositNow: "Deposit",
    withdrawNow: "Withdraw",
    investNow: "Invest",
    referrals: "Referrals",
    welcome: "Welcome to Daily TRX",
    investmentPlans: "Investment Plans",
    dailyProfit: "Daily Profit",
    duration: "Duration",
    amount: "Amount",
    totalProfit: "Total Profit",
    invest: "Invest",
    copy: "Copy",
    submitDeposit: "Submit Deposit",
    transactionHash: "Transaction Hash",
    amountTrx: "Amount (TRX)",
    referralCode: "Referral Code",
    inviteLink: "Invite Link",
    copyLink: "Copy Link",
    noData: "No data available yet.",
    language: "Language"
  },

  ps: {
    home: "کور",
    wallet: "والټ",
    deposit: "ډیپازټ",
    invest: "پانګونه",
    profile: "پروفایل",
    support: "مرسته",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    withdraw: "ویډرا",
    investment: "پانګونه",
    balance: "موجوده بیلانس",
    locked: "لاک شوی",
    profit: "ټوله ګټه",
    quickActions: "چټک انتخابونه",
    depositNow: "ډیپازټ",
    withdrawNow: "ویډرا",
    investNow: "پانګونه",
    referrals: "ریفریلونه",
    welcome: "Daily TRX ته ښه راغلاست",
    investmentPlans: "د پانګونې پلانونه",
    dailyProfit: "ورځنۍ ګټه",
    duration: "موده",
    amount: "مقدار",
    totalProfit: "ټوله ګټه",
    submitDeposit: "ډیپازټ ثبت کړه",
    transactionHash: "Transaction Hash",
    amountTrx: "مقدار (TRX)",
    referralCode: "ریفریل کوډ",
    inviteLink: "د دعوت لینک",
    copyLink: "لینک کاپي",
    noData: "تر اوسه معلومات نشته.",
    language: "ژبه"
  },

  fa: {
    home: "خانه",
    wallet: "کیف پول",
    deposit: "واریز",
    invest: "سرمایه‌گذاری",
    profile: "پروفایل",
    support: "پشتیبانی",
    referral: "معرفی",
    notifications: "اعلان‌ها",
    withdraw: "برداشت",
    investment: "سرمایه‌گذاری",
    balance: "موجودی",
    locked: "قفل شده",
    profit: "سود کل",
    quickActions: "گزینه‌های سریع",
    depositNow: "واریز",
    withdrawNow: "برداشت",
    investNow: "سرمایه‌گذاری",
    referrals: "معرفی‌ها",
    welcome: "به Daily TRX خوش آمدید",
    investmentPlans: "پلان‌های سرمایه‌گذاری",
    dailyProfit: "سود روزانه",
    duration: "مدت",
    amount: "مقدار",
    totalProfit: "سود کل",
    submitDeposit: "ثبت واریز",
    transactionHash: "هش تراکنش",
    amountTrx: "مقدار (TRX)",
    referralCode: "کد معرفی",
    inviteLink: "لینک دعوت",
    copyLink: "کپی لینک",
    noData: "هنوز معلوماتی موجود نیست.",
    language: "زبان"
  }
};

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

function t(key) {
  return (
    translations[currentLanguage]?.[key] ||
    translations.en[key] ||
    key
  );
}

function getTelegramUser() {
  return telegramApp?.initDataUnsafe?.user || null;
}

function getTelegramId() {
  const user = getTelegramUser();
  return user?.id ? String(user.id) : "";
}

function getUsername() {
  return (
    localStorage.getItem("dailytrx_username") ||
    getTelegramUser()?.first_name ||
    "User"
  );
}


/* =========================
   HEADER
========================= */

function appHeader() {
  return `
    <header class="app-header">

      <div class="brand-area">

        <div class="brand-logo">
          ₮
        </div>

        <div class="brand-info">
          <strong>DAILY TRX</strong>
          <small>Investment Wallet</small>
        </div>

      </div>

      <div class="header-actions">

        <div class="language-wrap">
          <span class="language-icon">🌐</span>

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
              دری
            </option>
          </select>
        </div>

        <button
          id="themeButton"
          class="header-icon"
          type="button"
          aria-label="Change theme"
        >
          ☾
        </button>

      </div>

    </header>
  `;
}


/* =========================
   BOTTOM NAVIGATION
========================= */

function renderBottomNavigation() {
  return `
    <nav class="bottom-nav">

      <button
        class="bottom-nav-item ${currentPage === "home" ? "active" : ""}"
        data-page="home"
        type="button"
      >
        <span>⌂</span>
        <small>${t("home")}</small>
      </button>

      <button
        class="bottom-nav-item ${currentPage === "wallet" ? "active" : ""}"
        data-page="wallet"
        type="button"
      >
        <span>▣</span>
        <small>${t("wallet")}</small>
      </button>

      <button
        class="bottom-nav-item ${currentPage === "deposit" ? "active" : ""}"
        data-page="deposit"
        type="button"
      >
        <span>＋</span>
        <small>${t("deposit")}</small>
      </button>

      <button
        class="bottom-nav-item ${currentPage === "investment" ? "active" : ""}"
        data-page="investment"
        type="button"
      >
        <span>◈</span>
        <small>${t("invest")}</small>
      </button>

      <button
        class="bottom-nav-item ${currentPage === "profile" ? "active" : ""}"
        data-page="profile"
        type="button"
      >
        <span>♙</span>
        <small>${t("profile")}</small>
      </button>

    </nav>
  `;
}


/* =========================
   PAGE WRAPPER
========================= */

function pageWrapper(content) {
  return `
    ${appHeader()}

    <div class="page-container">
      ${content}
    </div>

    ${renderBottomNavigation()}
  `;
}


/* =========================
   HOME
========================= */

async function homePage() {

  const username = getUsername();

  let wallet = {
    available_trx: 0,
    locked_trx: 0
  };

  try {
    const response = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(
        getTelegramId()
      )}`
    );

    const data = await response.json();

    if (data.ok) {
      wallet = data;
    }
  } catch (error) {
    console.error("Wallet load error:", error);
  }

  page.innerHTML = pageWrapper(`

    <div class="welcome-strip">
      <strong>
        ${t("welcome")}, ${escapeHtml(username)} 👋
      </strong>

      <span>
        Manage your TRX wallet and investments from one place.
      </span>
    </div>


    <div class="balance-card">

      <div class="balance-top">
        <span>${t("balance")}</span>
        <span>TRX</span>
      </div>

      <div class="balance-value">
        ${formatTrx(wallet.available_trx)}
        <small>TRX</small>
      </div>

      <div class="balance-actions">

        <button
          class="balance-action"
          data-page="deposit"
          type="button"
        >
          ＋ ${t("depositNow")}
        </button>

        <button
          class="balance-action"
          data-page="withdraw"
          type="button"
        >
          ↑ ${t("withdrawNow")}
        </button>

      </div>

    </div>


    <div class="mini-stats">

      <div class="stat-card">
        <small>${t("locked")}</small>
        <strong>
          ${formatTrx(wallet.locked_trx)} TRX
        </strong>
      </div>

      <div class="stat-card">
        <small>${t("profit")}</small>
        <strong>
          0 TRX
        </strong>
      </div>

    </div>


    <div class="quick-section">

      <div class="section-heading">
        <strong>${t("quickActions")}</strong>
        <span>Daily TRX</span>
      </div>

      <div class="quick-grid">

        <button
          class="quick-card"
          data-page="deposit"
          type="button"
        >
          <span class="quick-icon">＋</span>

          <span class="quick-text">
            <strong>${t("depositNow")}</strong>
            <small>Add TRX</small>
          </span>
        </button>


        <button
          class="quick-card"
          data-page="investment"
          type="button"
        >
          <span class="quick-icon">◈</span>

          <span class="quick-text">
            <strong>${t("investNow")}</strong>
            <small>Choose a plan</small>
          </span>
        </button>


        <button
          class="quick-card"
          data-page="referral"
          type="button"
        >
          <span class="quick-icon">👥</span>

          <span class="quick-text">
            <strong>${t("referrals")}</strong>
            <small>Invite friends</small>
          </span>
        </button>


        <button
          class="quick-card"
          data-page="support"
          type="button"
        >
          <span class="quick-icon">?</span>

          <span class="quick-text">
            <strong>${t("support")}</strong>
            <small>Get help</small>
          </span>
        </button>

      </div>

    </div>

  `);

  bindHeader();
}


/* =========================
   WALLET
========================= */

async function walletPage() {

  let wallet = {
    available_trx: 0,
    locked_trx: 0
  };

  try {

    const response = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(
        getTelegramId()
      )}`
    );

    const data = await response.json();

    if (data.ok) {
      wallet = data;
    }

  } catch (error) {
    console.error(error);
  }

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("wallet")}</h2>
    </div>


    <div class="balance-card">

      <div class="balance-top">
        <span>${t("balance")}</span>
        <span>TRX</span>
      </div>

      <div class="balance-value">
        ${formatTrx(wallet.available_trx)}
        <small>TRX</small>
      </div>

    </div>


    <div class="mini-stats">

      <div class="stat-card">
        <small>${t("locked")}</small>
        <strong>
          ${formatTrx(wallet.locked_trx)} TRX
        </strong>
      </div>

      <div class="stat-card">
        <small>${t("profit")}</small>
        <strong>
          0 TRX
        </strong>
      </div>

    </div>


    <div class="card">
      <h3>Wallet Information</h3>

      <p>
        Your available TRX can be used for investment or withdrawal.
        Locked TRX represents funds currently committed to investments.
      </p>
    </div>

  `);

  bindHeader();
}


/* =========================
   DEPOSIT
========================= */

function depositPage() {

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(DEPOSIT_ADDRESS);

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("deposit")}</h2>
    </div>


    <div class="deposit-card">

      <div class="section-heading">
        <strong>TRX Deposit</strong>
        <span>TRON Network</span>
      </div>


      <div class="qr-wrap">
        <img
          src="${qrUrl}"
          alt="TRX Deposit QR Code"
        >
      </div>


      <div class="form-group">

        <label>
          Deposit Address
        </label>

        <div class="address-box">

          <input
            id="depositAddress"
            value="${DEPOSIT_ADDRESS}"
            readonly
          >

          <button
            id="copyAddress"
            class="copy-btn"
            type="button"
          >
            ${t("copy")}
          </button>

        </div>

      </div>


      <div class="form-group">

        <label for="depositAmount">
          ${t("amountTrx")}
        </label>

        <input
          id="depositAmount"
          type="number"
          min="0"
          step="0.000001"
          placeholder="Enter TRX amount"
        >

      </div>


      <div class="form-group">

        <label for="txHash">
          ${t("transactionHash")}
        </label>

        <input
          id="txHash"
          type="text"
          placeholder="Enter 64-character TRON TX hash"
          autocomplete="off"
        >

      </div>


      <div
        id="depositMessage"
        class="register-message"
      ></div>


      <button
        id="submitDeposit"
        class="primary-btn"
        type="button"
      >
        ${t("submitDeposit")}
      </button>

    </div>

  `);

  bindHeader();
  bindDeposit();
}


/* =========================
   DEPOSIT EVENTS
========================= */

function bindDeposit() {

  const copyButton =
    document.getElementById("copyAddress");

  copyButton?.addEventListener(
    "click",
    async () => {

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

        const input =
          document.getElementById(
            "depositAddress"
          );

        input?.select();

        document.execCommand("copy");

        copyButton.textContent =
          "Copied ✓";

      }

    }
  );


  const submitButton =
    document.getElementById(
      "submitDeposit"
    );


  submitButton?.addEventListener(
    "click",
    async () => {

      const amount =
        document.getElementById(
          "depositAmount"
        )?.value.trim();


      const txHash =
        document.getElementById(
          "txHash"
        )?.value.trim();


      const message =
        document.getElementById(
          "depositMessage"
        );


      message.textContent = "";

      message.className =
        "register-message";


      if (!amount || Number(amount) <= 0) {

        message.textContent =
          "Enter a valid TRX amount.";

        message.classList.add("error");

        return;
      }


      if (
        !/^[a-fA-F0-9]{64}$/.test(
          txHash
        )
      ) {

        message.textContent =
          "Invalid TRON transaction hash.";

        message.classList.add("error");

        return;
      }


      const telegramId =
        getTelegramId();


      if (!telegramId) {

        message.textContent =
          "Please open Daily TRX from Telegram.";

        message.classList.add("error");

        return;
      }


      submitButton.disabled =
        true;

      submitButton.textContent =
        "Checking transaction...";


      try {

        const response =
          await fetch(
            "/api/deposit",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                telegram_chat_id:
                  telegramId,

                amount_trx:
                  Number(amount),

                tx_hash:
                  txHash

              })

            }
          );


        const data =
          await response.json();


        if (
          !response.ok ||
          !data.ok
        ) {

          throw new Error(
            data.message ||
            "Deposit submission failed."
          );

        }


        message.textContent =
          "Deposit verified successfully ✓";

        message.classList.add(
          "success"
        );


        document.getElementById(
          "depositAmount"
        ).value = "";


        document.getElementById(
          "txHash"
        ).value = "";


      } catch (error) {

        message.textContent =
          error.message ||
          "Could not verify deposit.";

        message.classList.add(
          "error"
        );

      } finally {

        submitButton.disabled =
          false;

        submitButton.textContent =
          t("submitDeposit");

      }

    }
  );
}


/* =========================
   WITHDRAW
========================= */

function withdrawPage() {

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <button
        class="back-btn"
        data-page="wallet"
        type="button"
      >
        ←
      </button>

      <h2>${t("withdraw")}</h2>
    </div>


    <div class="card">

      <div class="withdraw-warning">
        Withdrawals require verification and admin approval.
        Minimum withdrawal and network rules will be applied by
        the backend.
      </div>


      <div class="form-group">

        <label>
          TRON Wallet Address
        </label>

        <input
          type="text"
          placeholder="Enter your TRX wallet address"
        >

      </div>


      <div class="form-group">

        <label>
          Amount (TRX)
        </label>

        <input
          type="number"
          min="0"
          step="0.000001"
          placeholder="Enter amount"
        >

      </div>


      <button
        class="primary-btn"
        type="button"
        disabled
      >
        Withdraw
      </button>

    </div>

  `);

  bindHeader();
}


/* =========================
   INVESTMENT
========================= */

async function investmentPage() {

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("investment")}</h2>
    </div>

    <div
      id="investmentPlans"
      class="plans-grid"
    >

      <div class="empty-state">
        Loading investment plans...
      </div>

    </div>

  `);

  bindHeader();

  await loadInvestmentPlans();
}


async function loadInvestmentPlans() {

  const container =
    document.getElementById(
      "investmentPlans"
    );

  if (!container) {
    return;
  }


  try {

    const response =
      await fetch(
        "/api/investment-plans"
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        "Could not load investment plans."
      );

    }


    const plans =
      Array.isArray(data.plans)
        ? data.plans
        : [];


    if (!plans.length) {

      container.innerHTML = `
        <div class="empty-state">
          ${t("noData")}
        </div>
      `;

      return;
    }


    container.innerHTML =
      plans
        .map(plan =>
          investmentPlanCard(plan)
        )
        .join("");


    container
      .querySelectorAll(
        "[data-invest-plan]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const planId =
              button.dataset.investPlan;

            createInvestment(
              planId
            );

          }
        );

      });


  } catch (error) {

    console.error(
      "Investment plans error:",
      error
    );


    container.innerHTML = `
      <div class="error-box">
        ${escapeHtml(
          error.message ||
          "Could not load investment plans."
        )}
      </div>
    `;

  }
}


function investmentPlanCard(plan) {

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
        ${escapeHtml(
          plan.name ||
          "Investment Plan"
        )}
      </h3>


      <div class="profit-badge">
        ${formatTrx(daily)} TRX / day
      </div>


      <div class="plan-row">
        <span>${t("amount")}</span>
        <strong>
          ${formatTrx(amount)} TRX
        </strong>
      </div>


      <div class="plan-row">
        <span>${t("dailyProfit")}</span>
        <strong>
          ${formatTrx(daily)} TRX
        </strong>
      </div>


      <div class="plan-row">
        <span>${t("duration")}</span>
        <strong>
          ${days} days
        </strong>
      </div>


      <div class="plan-row">
        <span>${t("totalProfit")}</span>
        <strong>
          ${formatTrx(total)} TRX
        </strong>
      </div>


      <button
        class="invest-btn"
        data-invest-plan="${plan.id}"
        type="button"
      >
        ${t("investNow")}
      </button>

    </div>
  `;
}


/* =========================
   CREATE INVESTMENT
========================= */

async function createInvestment(planId) {

  const telegramId =
    getTelegramId();


  if (!telegramId) {

    alert(
      "Please open Daily TRX from Telegram."
    );

    return;
  }


  const button =
    document.querySelector(
      `[data-invest-plan="${CSS.escape(
        String(planId)
      )}"]`
    );


  if (button) {

    button.disabled =
      true;

    button.textContent =
      "Processing...";

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
              telegramId,

            plan_id:
              Number(planId)

          })

        }
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        "Investment could not be created."
      );

    }


    alert(
      `Investment created successfully!\n\n` +
      `Amount: ${formatTrx(
        data.amount_trx
      )} TRX\n` +
      `Daily Profit: ${formatTrx(
        data.daily_profit_trx
      )} TRX`
    );


    await walletPage();


  } catch (error) {

    alert(
      error.message ||
      "Investment failed."
    );

  } finally {

    if (button) {

      button.disabled =
        false;

      button.textContent =
        t("investNow");

    }

  }
}


/* =========================
   REFERRAL
========================= */

async function referralPage() {

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("referral")}</h2>
    </div>


    <div class="card">

      <div class="referral-code">

        <small>
          ${t("referralCode")}
        </small>

        <strong id="myReferralCode">
          Loading...
        </strong>

      </div>


      <div class="section-heading">
        <strong>${t("inviteLink")}</strong>
      </div>


      <div
        id="myReferralLink"
        class="referral-link"
      >
        Loading...
      </div>


      <button
        id="copyReferral"
        class="primary-btn"
        type="button"
        style="margin-top:12px;"
      >
        ${t("copyLink")}
      </button>

    </div>


    <div class="card">

      <h3>Referral Commission</h3>

      <p>
        Level 1 — 6%<br>
        Level 2 — 2%<br>
        Level 3 — 1%
      </p>

    </div>

  `);

  bindHeader();

  await loadReferralData();
}


async function loadReferralData() {

  const telegramId =
    getTelegramId();


  if (!telegramId) {
    return;
  }


  try {

    const response =
      await fetch(
        `/api/profile?telegram_chat_id=${encodeURIComponent(
          telegramId
        )}`
      );


    const data =
      await response.json();


    if (!response.ok || !data.ok) {
      throw new Error(
        data.message ||
        "Could not load profile."
      );
    }


    const code =
      data.referral_code ||
      data.user?.referral_code ||
      "";


    const referralCode =
      document.getElementById(
        "myReferralCode"
      );


    const referralLink =
      document.getElementById(
        "myReferralLink"
      );


    if (referralCode) {

      referralCode.textContent =
        code || "—";

    }


    if (referralLink) {

      referralLink.textContent =
        code
          ? `https://t.me/MyDailyTRXBot?start=${code}`
          : "—";

    }


    const copyButton =
      document.getElementById(
        "copyReferral"
      );


    copyButton?.addEventListener(
      "click",
      async () => {

        if (!code) {
          return;
        }

        const link =
          `https://t.me/MyDailyTRXBot?start=${code}`;

        try {

          await navigator.clipboard.writeText(
            link
          );

          copyButton.textContent =
            "Copied ✓";

          setTimeout(() => {

            copyButton.textContent =
              t("copyLink");

          }, 1500);

        } catch (error) {

          alert(link);

        }

      }
    );


  } catch (error) {

    console.error(
      "Referral error:",
      error
    );

  }
}


/* =========================
   NOTIFICATIONS
========================= */

async function notificationsPage() {

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("notifications")}</h2>
    </div>


    <div
      id="notificationsList"
    >
      <div class="empty-state">
        Loading...
      </div>
    </div>

  `);

  bindHeader();

  await loadAnnouncements();
}


async function loadAnnouncements() {

  const container =
    document.getElementById(
      "notificationsList"
    );


  if (!container) {
    return;
  }


  try {

    const response =
      await fetch(
        "/api/announcement"
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        "Could not load announcement."
      );

    }


    if (!data.announcement) {

      container.innerHTML = `
        <div class="empty-state">
          ${t("noData")}
        </div>
      `;

      return;
    }


    const announcement =
      data.announcement;


    container.innerHTML = `
      <div class="notification-card">

        <strong>
          ${escapeHtml(
            announcement.title ||
            "Announcement"
          )}
        </strong>

        <p>
          ${escapeHtml(
            announcement.message ||
            ""
          )}
        </p>

      </div>
    `;


  } catch (error) {

    container.innerHTML = `
      <div class="error-box">
        ${escapeHtml(
          error.message ||
          "Could not load notifications."
        )}
      </div>
    `;

  }
}


/* =========================
   SUPPORT
========================= */

function supportPage() {

  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("support")}</h2>
    </div>


    <div class="support-card">

      <div class="support-item">

        <div class="support-icon">
          💬
        </div>

        <div>
          <strong>Telegram Support</strong>

          <p>
            Contact Daily TRX support through Telegram.
          </p>
        </div>

      </div>


      <div class="support-item">

        <div class="support-icon">
          ❓
        </div>

        <div>
          <strong>Need Help?</strong>

          <p>
            Contact the administrator for account issues.
          </p>
        </div>

      </div>

    </div>

  `);

  bindHeader();
}


/* =========================
   PROFILE
========================= */

async function profilePage() {

  const username =
    getUsername();


  const telegramId =
    getTelegramId();


  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>${t("profile")}</h2>
    </div>


    <div class="profile-card">

      <div class="profile-avatar">
        ♙
      </div>


      <h3>
        ${escapeHtml(username)}
      </h3>


      <p>
        Telegram ID: ${escapeHtml(
          telegramId || "—"
        )}
      </p>

    </div>


    <div class="card">

      <h3>Account</h3>

      <p>
        Your Daily TRX account is connected to your Telegram account.
      </p>

    </div>

  `);

  bindHeader();
}


/* =========================
   ADMIN
========================= */

function adminPage() {

  if (
    getTelegramId() !== ADMIN_ID
  ) {

    page.innerHTML = pageWrapper(`
      <div class="error-box">
        Access denied.
      </div>
    `);

    bindHeader();

    return;
  }


  page.innerHTML = pageWrapper(`

    <div class="page-heading">
      <h2>Admin</h2>
    </div>


    <div class="card">

      <h3>Daily TRX Admin</h3>

      <p>
        Admin controls will be connected to the backend here.
      </p>

    </div>

  `);

  bindHeader();
}


/* =========================
   HEADER EVENTS
========================= */

function bindHeader() {

  const languageSelect =
    document.getElementById(
      "languageSelect"
    );


  languageSelect?.addEventListener(
    "change",
    () => {

      currentLanguage =
        languageSelect.value;

      localStorage.setItem(
        "dailytrx_language",
        currentLanguage
      );

      render(
        currentPage
      );

    }
  );


  const themeButton =
    document.getElementById(
      "themeButton"
    );


  themeButton?.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light"
      );


      const light =
        document.body.classList.contains(
          "light"
        );


      localStorage.setItem(
        "dailytrx_theme",
        light
          ? "light"
          : "dark"
      );


      themeButton.textContent =
        light
          ? "☀"
          : "☾";

    }
  );


  const savedTheme =
    localStorage.getItem(
      "dailytrx_theme"
    );


  if (savedTheme === "light") {

    document.body.classList.add(
      "light"
    );

    if (themeButton) {
      themeButton.textContent =
        "☀";
    }

  }

}


/* =========================
   RENDER
========================= */

async function render(targetPage) {

  currentPage =
    targetPage || "home";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  switch (currentPage) {

    case "home":
      await homePage();
      break;

    case "wallet":
      await walletPage();
      break;

    case "deposit":
      depositPage();
      break;

    case "withdraw":
      withdrawPage();
      break;

    case "investment":
      await investmentPage();
      break;

    case "referral":
      await referralPage();
      break;

    case "notifications":
      await notificationsPage();
      break;

    case "support":
      supportPage();
      break;

    case "profile":
      await profilePage();
      break;

    case "admin":
      adminPage();
      break;

    default:
      await homePage();
      break;

  }

}


window.render =
  render;


/* =========================
   GLOBAL CLICK
========================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-page]"
      );


    if (!button) {
      return;
    }


    const target =
      button.dataset.page;


    if (!target) {
      return;
    }


    render(target);

  }
);


/* =========================
   HELPERS
========================= */

function formatTrx(value) {

  const number =
    Number(value || 0);


  if (!Number.isFinite(number)) {
    return "0";
  }


  return number.toLocaleString(
    undefined,
    {
      maximumFractionDigits: 6
    }
  );
}


function escapeHtml(value) {

  return String(
    value ?? ""
  )
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================
   INITIALIZE
========================= */

setTimeout(() => {

  const registered =
    localStorage.getItem(
      "dailytrx_registered"
    ) === "true";


  if (!registered) {

    return;

  }


  render("home");

}, 1000);
