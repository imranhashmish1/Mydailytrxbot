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
  localStorage.getItem("dailytrx_theme") || "light";

const translations = {
  en: {
    home:"Home",
    wallet:"Wallet",
    deposit:"Deposit",
    withdraw:"Withdraw",
    investment:"Investment",
    referral:"Referral",
    notifications:"Notifications",
    support:"Support",
    profile:"Profile",

    welcome:"Welcome to Daily TRX",
    totalBalance:"Total Balance",
    availableBalance:"Available Balance",
    invested:"Invested",
    profit:"Profit",
    quickActions:"Quick Actions",

    depositNow:"Deposit Now",
    withdrawNow:"Withdraw",
    viewInvestment:"Investment Plans",
    referrals:"My Referrals",

    depositTitle:"Deposit TRX",
    depositNotice:"Send TRX only to the address below. Then submit your transaction hash.",
    depositAddress:"TRON Deposit Address",
    copyAddress:"Copy Address",
    amount:"Amount (TRX)",
    transactionHash:"Transaction Hash",
    submitDeposit:"Submit Deposit",

    withdrawTitle:"Withdraw TRX",
    withdrawAddress:"TRON Wallet Address",
    withdrawAmount:"Withdrawal Amount",
    submitWithdraw:"Submit Withdrawal",

    investmentTitle:"Investment Plan 📦",
    minimum:"Investment",
    dailyProfit:"Daily Profit",
    profitRate:"Daily Profit Rate",
    monthlyProfit:"30 Days Profit",
    yearlyProfit:"360 Days Profit",
    investmentDays:"Investment Period",
    days:"Days",

    referralTitle:"Referral Program",
    notificationTitle:"Notifications",
    supportTitle:"Support",
    profileTitle:"My Profile",

    language:"Language",
    username:"Username",
    email:"Email",
    telegramId:"Telegram ID",
    accountStatus:"Account Status",
    verified:"Verified",
    pending:"Pending",
    referralCode:"Referral Code",

    referralLevel1:"Level 1",
    referralLevel2:"Level 2",
    referralLevel3:"Level 3",

    referralRate1:"6%",
    referralRate2:"2%",
    referralRate3:"1%",

    telegramChannel:"Telegram Channel",
    telegramSupport:"Telegram Chat / Support",

    copySuccess:"Address copied successfully.",
    loading:"Loading...",
    noData:"No data available.",
    error:"Something went wrong.",
    back:"Back",

    createInvestment:"Invest Now",
    totalProfit:"Total Profit",
    balance:"Balance",
    status:"Status",
    history:"History"
  },

  ps: {
    home:"کور",
    wallet:"والټ",
    deposit:"ډیپازټ",
    withdraw:"ویډرا",
    investment:"پانګونه",
    referral:"ریفریل",
    notifications:"خبرتیاوې",
    support:"ملاتړ",
    profile:"پروفایل",

    welcome:"Daily TRX ته ښه راغلاست",
    totalBalance:"ټول بیلانس",
    availableBalance:"موجود بیلانس",
    invested:"پانګونه",
    profit:"ګټه",
    quickActions:"چټک انتخابونه",

    depositNow:"ډیپازټ",
    withdrawNow:"ویډرا",
    viewInvestment:"د پانګونې پلانونه",
    referrals:"زما ریفریلونه",

    depositTitle:"TRX ډیپازټ",
    depositNotice:"یوازې TRX دې ادرس ته ولېږئ، بیا Transaction Hash ثبت کړئ.",
    depositAddress:"د TRON ډیپازټ ادرس",
    copyAddress:"ادرس کاپي",
    amount:"مقدار (TRX)",
    transactionHash:"Transaction Hash",
    submitDeposit:"ډیپازټ ثبت کړه",

    withdrawTitle:"TRX ویډرا",
    withdrawAddress:"د TRON والټ ادرس",
    withdrawAmount:"د ویډرا مقدار",
    submitWithdraw:"ویډرا ثبت کړه",

    investmentTitle:"د پانګونې پلان 📦",
    minimum:"د پانګونې مقدار",
    dailyProfit:"ورځنۍ ګټه",
    profitRate:"ورځنۍ ګټې فیصدي",
    monthlyProfit:"د ۳۰ ورځو ګټه",
    yearlyProfit:"د ۳۶۰ ورځو ګټه",
    investmentDays:"د پانګونې موده",
    days:"ورځې",

    referralTitle:"ریفریل پروګرام",
    notificationTitle:"خبرتیاوې",
    supportTitle:"ملاتړ",
    profileTitle:"زما پروفایل",

    language:"ژبه",
    username:"یوزرنیم",
    email:"ایمیل",
    telegramId:"Telegram ID",
    accountStatus:"د حساب حالت",
    verified:"تایید شوی",
    pending:"انتظار",
    referralCode:"ریفریل کوډ",

    referralLevel1:"لومړۍ کچه",
    referralLevel2:"دوهمه کچه",
    referralLevel3:"درېیمه کچه",

    referralRate1:"۶٪",
    referralRate2:"۲٪",
    referralRate3:"۱٪",

    telegramChannel:"Telegram چینل",
    telegramSupport:"Telegram چټ / ملاتړ",

    copySuccess:"ادرس کاپي شو.",
    loading:"Loading...",
    noData:"معلومات نشته.",
    error:"یوه ستونزه رامنځته شوه.",
    back:"بېرته",

    createInvestment:"پانګونه وکړه",
    totalProfit:"ټوله ګټه",
    balance:"بیلانس",
    status:"حالت",
    history:"تاریخچه"
  },

  fa: {
    home:"خانه",
    wallet:"کیف پول",
    deposit:"سپرده",
    withdraw:"برداشت",
    investment:"سرمایه‌گذاری",
    referral:"معرفی",
    notifications:"اعلان‌ها",
    support:"پشتیبانی",
    profile:"پروفایل",

    welcome:"به Daily TRX خوش آمدید",
    totalBalance:"مجموع موجودی",
    availableBalance:"موجودی قابل استفاده",
    invested:"سرمایه‌گذاری",
    profit:"سود",
    quickActions:"گزینه‌های سریع",

    depositNow:"سپرده",
    withdrawNow:"برداشت",
    viewInvestment:"پلان‌های سرمایه‌گذاری",
    referrals:"معرفی‌های من",

    depositTitle:"سپرده TRX",
    depositNotice:"فقط TRX به آدرس زیر ارسال کنید، سپس Transaction Hash را ثبت کنید.",
    depositAddress:"آدرس سپرده TRON",
    copyAddress:"کپی آدرس",
    amount:"مقدار (TRX)",
    transactionHash:"Transaction Hash",
    submitDeposit:"ثبت سپرده",

    withdrawTitle:"برداشت TRX",
    withdrawAddress:"آدرس کیف پول TRON",
    withdrawAmount:"مقدار برداشت",
    submitWithdraw:"ثبت برداشت",

    investmentTitle:"پلان سرمایه‌گذاری 📦",
    minimum:"مقدار سرمایه‌گذاری",
    dailyProfit:"سود روزانه",
    profitRate:"درصد سود روزانه",
    monthlyProfit:"سود ۳۰ روز",
    yearlyProfit:"سود ۳۶۰ روز",
    investmentDays:"مدت سرمایه‌گذاری",
    days:"روز",

    referralTitle:"برنامه معرفی",
    notificationTitle:"اعلان‌ها",
    supportTitle:"پشتیبانی",
    profileTitle:"پروفایل من",

    language:"زبان",
    username:"نام کاربری",
    email:"ایمیل",
    telegramId:"Telegram ID",
    accountStatus:"وضعیت حساب",
    verified:"تأیید شده",
    pending:"در انتظار",
    referralCode:"کد معرفی",

    referralLevel1:"سطح اول",
    referralLevel2:"سطح دوم",
    referralLevel3:"سطح سوم",

    referralRate1:"۶٪",
    referralRate2:"۲٪",
    referralRate3:"۱٪",

    telegramChannel:"کانال Telegram",
    telegramSupport:"چت / پشتیبانی Telegram",

    copySuccess:"آدرس کپی شد.",
    loading:"در حال بارگذاری...",
    noData:"اطلاعاتی موجود نیست.",
    error:"مشکلی رخ داد.",
    back:"برگشت",

    createInvestment:"سرمایه‌گذاری",
    totalProfit:"سود کل",
    balance:"موجودی",
    status:"وضعیت",
    history:"تاریخچه"
  }
};

function t(key) {
  return translations[currentLanguage]?.[key]
    || translations.en[key]
    || key;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function telegramId() {
  return telegramApp?.initDataUnsafe?.user?.id
    ? String(telegramApp.initDataUnsafe.user.id)
    : "";
}

function formatTRX(value) {
  const n = Number(value);

  return `${
    Number.isFinite(n)
      ? n.toLocaleString(undefined,{
          maximumFractionDigits:6
        })
      : "0"
  } TRX`;
}
function languageSelector() {
  return `
    <div class="language-box">
      <span>🌐 ${t("language")}</span>

      <select id="languageSelect">
        <option value="en"
          ${currentLanguage==="en" ? "selected" : ""}>
          English
        </option>

        <option value="ps"
          ${currentLanguage==="ps" ? "selected" : ""}>
          پښتو
        </option>

        <option value="fa"
          ${currentLanguage==="fa" ? "selected" : ""}>
          دری
        </option>
      </select>
    </div>
  `;
}

function setupLanguage() {
  const el = document.getElementById("languageSelect");

  if (!el) return;

  el.addEventListener("change", () => {
    currentLanguage = el.value;

    localStorage.setItem(
      "dailytrx_language",
      currentLanguage
    );

    document.documentElement.lang = currentLanguage;

    render(window.currentPage);
  });
}

function applyTheme() {
  document.body.classList.toggle(
    "dark",
    currentTheme === "dark"
  );

  const b = document.getElementById("themeButton");

  if (b) {
    b.textContent =
      currentTheme === "dark" ? "☀️" : "🌙";
  }
}

function setupTheme() {
  applyTheme();

  const b = document.getElementById("themeButton");

  if (!b || b.dataset.ready) return;

  b.dataset.ready = "1";

  b.onclick = () => {
    currentTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    localStorage.setItem(
      "dailytrx_theme",
      currentTheme
    );

    applyTheme();
  };
}

function apiError(
  data,
  fallback="Something went wrong."
) {
  return (
    data?.message ||
    data?.error?.message ||
    fallback
  );
}

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

function card(content, cls="card") {
  return `
    <div class="${cls}">
      ${content}
    </div>
  `;
}
function homePage() {
  return `
    ${languageSelector()}

    <div class="hero-card">
      <div class="hero-small">
        ${t("welcome")}
      </div>

      <h1>Daily TRX</h1>

      <div class="hero-label">
        ${t("totalBalance")}
      </div>

      <div id="homeBalance"
           class="hero-balance">
        0 TRX
      </div>
    </div>

    <div class="stats-grid">

      <div class="stat-card">
        <span>${t("availableBalance")}</span>
        <b id="homeAvailable">0 TRX</b>
      </div>

      <div class="stat-card">
        <span>${t("invested")}</span>
        <b id="homeInvested">0 TRX</b>
      </div>

      <div class="stat-card">
        <span>${t("profit")}</span>
        <b id="homeProfit">0 TRX</b>
      </div>

    </div>

    <h3 class="section-title">
      ${t("quickActions")}
    </h3>

    <div class="action-grid">

      <button data-page="deposit"
              class="action-card">
        <span>📥</span>
        <b>${t("depositNow")}</b>
      </button>

      <button data-page="withdraw"
              class="action-card">
        <span>📤</span>
        <b>${t("withdrawNow")}</b>
      </button>

      <button data-page="investment"
              class="action-card">
        <span>📈</span>
        <b>${t("viewInvestment")}</b>
      </button>

      <button data-page="referral"
              class="action-card">
        <span>👥</span>
        <b>${t("referrals")}</b>
      </button>

    </div>

    <div class="home-links">

      <button data-page="notifications">
        🔔 ${t("notifications")}
      </button>

      <button data-page="support">
        🎧 ${t("support")}
      </button>

      <button data-page="profile">
        👤 ${t("profile")}
      </button>

    </div>
  `;
}

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

    const total = Number(
      w.total_balance ??
      w.balance ??
      w.total ??
      0
    );

    const available = Number(
      w.available_balance ??
      w.available ??
      w.balance ??
      0
    );

    const invested = Number(
      w.invested_balance ??
      w.invested ??
      0
    );

    const profit = Number(
      w.profit ??
      w.total_profit ??
      0
    );

    const a =
      document.getElementById("homeBalance");

    const b =
      document.getElementById("homeAvailable");

    const c =
      document.getElementById("homeInvested");

    const e =
      document.getElementById("homeProfit");

    if (a) a.textContent = formatTRX(total);
    if (b) b.textContent = formatTRX(available);
    if (c) c.textContent = formatTRX(invested);
    if (e) e.textContent = formatTRX(profit);

  } catch (_) {}
}

function walletPage() {
  return `
    ${heading(t("wallet"),"💰")}
    ${languageSelector()}

    <div id="walletContent"
         class="loading-box">
      ${t("loading")}
    </div>
  `;
}

async function loadWalletPage() {
  const box =
    document.getElementById("walletContent");

  const id = telegramId();

  if (!box || !id) return;

  try {
    const r = await fetch(
      `/api/wallet?telegram_chat_id=${encodeURIComponent(id)}`
    );

    const d = await r.json();

    if (!d?.ok) {
      throw new Error(apiError(d));
    }

    const w =
      d.wallet ||
      d.balance ||
      d.data ||
      d;

    box.innerHTML = `
      <div class="wallet-main">
        <span>${t("totalBalance")}</span>

        <strong>
          ${formatTRX(
            w.total_balance ??
            w.balance ??
            w.total ??
            0
          )}
        </strong>
      </div>

      <div class="stats-grid">

        <div class="stat-card">
          <span>${t("availableBalance")}</span>
          <b>
            ${formatTRX(
              w.available_balance ??
              w.available ??
              w.balance ??
              0
            )}
          </b>
        </div>

        <div class="stat-card">
          <span>${t("invested")}</span>
          <b>
            ${formatTRX(
              w.invested_balance ??
              w.invested ??
              0
            )}
          </b>
        </div>

        <div class="stat-card">
          <span>${t("profit")}</span>
          <b>
            ${formatTRX(
              w.profit ??
              w.total_profit ??
              0
            )}
          </b>
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
function depositPage() {
  return `
    ${heading(t("depositTitle"),"📥")}
    ${languageSelector()}

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

      <label>${t("amount")}</label>

      <input
        id="depositAmount"
        type="number"
        min="0"
        step="0.000001"
        placeholder="0"
      >

      <label>${t("transactionHash")}</label>

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
        document.getElementById(
          "depositAmount"
        )?.value.trim();

      const txHash =
        document.getElementById(
          "depositTxHash"
        )?.value.trim();

      const id = telegramId();

      if (!id) {
        return showFormMessage(
          "Please open the app from Telegram.",
          "error"
        );
      }

      if (
        !amount ||
        Number(amount) <= 0
      ) {
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
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              telegram_chat_id:id,
              amount_trx:Number(amount),
              tx_hash:txHash
            })
          }
        );

        const d = await r.json();

        if (
          !r.ok ||
          !d.ok
        ) {
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

function showFormMessage(
  text,
  type
) {
  

  const box =
    document.getElementById(
      "depositMessage"
    );

  if (!box) return;

  box.textContent = text;

  box.className =
    `form-message ${type}`;
}
function withdrawPage() {
  return `
    ${heading(t("withdrawTitle"),"📤")}
    ${languageSelector()}

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
        document.getElementById(
          "withdrawAddress"
        )?.value.trim();

      const amount =
        Number(
          document.getElementById(
            "withdrawAmount"
          )?.value
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
      button.textContent =
        t("loading");

      try {

        const r = await fetch(
          "/api/withdraw",
          {
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              telegram_chat_id:id,
              wallet_address:address,
              amount_trx:amount
            })
          }
        );

        const d = await r.json();

        if (
          !r.ok ||
          !d.ok
        ) {
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

function investmentPage() {
  return `
    ${heading(
      t("investmentTitle"),
      "📈"
    )}

    ${languageSelector()}

    <div id="investmentContent"
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

    if (
      !r.ok ||
      !d.ok
    ) {
      throw new Error(
        apiError(d)
      );
    }

    const plans =
      d.plans ||
      d.data ||
      [];

    if (!plans.length) {

      box.innerHTML = `
        <div class="empty-box">
          ${t("noData")}
        </div>
      `;

      return;
    }

    box.innerHTML =
      plans.map((p,i) => {

        const minimum = Number(
          p.min_amount ??
          p.minimum_amount ??
          p.amount ??
          p.min ??
          0
        );

        const daily = Number(
          p.daily_profit ??
          p.dailyProfit ??
          p.profit_daily ??
          0
        );

        const duration = Number(
          p.duration_days ??
          p.days ??
          360
        );

        /*
          Profit percentage is calculated
          from Daily Profit ÷ Investment.
        */

        const profitPercent =
          minimum > 0
            ? (daily / minimum) * 100
            : 0;

        /*
          Your system uses 30 days
          as one month and 360 days
          as one investment year.
        */

        const monthly =
          daily * 30;

        const yearly =
          daily * 360;

        const displayedDuration =
          duration > 0
            ? duration
            : 360;

        return `
          <div class="plan-card">

            <div class="plan-top">

              <span>📦</span>

              <b>
                ${escapeHtml(
                  p.name ||
                  `Plan ${i + 1}`
                )}
              </b>

            </div>

            <div class="profit-badge">
              🔥
              ${profitPercent.toFixed(2)}%
              ${t("dailyProfit")}
            </div>

            <div class="plan-row">
              <span>
                ${t("minimum")}
              </span>

              <strong>
                ${formatTRX(minimum)}
              </strong>
            </div>

            <div class="plan-row">
              <span>
                ${t("dailyProfit")}
              </span>

              <strong>
                ${formatTRX(daily)}
              </strong>
            </div>

            <div class="plan-row">
              <span>
                ${t("profitRate")}
              </span>

              <strong>
                ${profitPercent.toFixed(2)}%
              </strong>
            </div>

            <div class="plan-row">
              <span>
                ${t("monthlyProfit")}
              </span>

              <strong>
                ${formatTRX(monthly)}
              </strong>
            </div>

            <div class="plan-row">
              <span>
                ${t("yearlyProfit")}
              </span>

              <strong>
                ${formatTRX(yearly)}
              </strong>
            </div>

            <div class="plan-row">
              <span>
                ${t("investmentDays")}
              </span>

              <strong>
                ${displayedDuration}
                ${t("days")}
              </strong>
            </div>

            <button
              class="primary-btn invest-btn"
              data-plan-id="${escapeHtml(
                p.id ?? ""
              )}">

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

    box.innerHTML = `
      <div class="error-box">
        ${escapeHtml(e.message)}
      </div>
    `;
  }
}

async function createInvestment(planId) {

  const id = telegramId();

  if (!id || !planId) return;

  const amount =
    prompt(
      "Enter investment amount in TRX:"
    );

  if (amount === null) return;

  const n = Number(amount);

  if (
    !Number.isFinite(n) ||
    n <= 0
  ) {

    alert(
      "Enter a valid amount."
    );

    return;
  }

  try {

    const r = await fetch(
      "/api/create-investment",
      {
        method:"POST",
        headers:{
          "Content-Type":
            "application/json"
        },
        body:JSON.stringify({
          telegram_chat_id:id,
          plan_id:planId,
          amount_trx:n
        })
      }
    );

    const d = await r.json();

    if (
      !r.ok ||
      !d.ok
    ) {
      throw new Error(
        apiError(
          d,
          "Investment failed."
        )
      );
    }

    alert(
      d.message ||
      "Investment created successfully."
    );

    render("investment");

  } catch (e) {

    alert(e.message);
  }
}
function referralPage() {

  const id = telegramId();

  return `
    ${heading(
      t("referralTitle"),
      "👥"
    )}

    ${languageSelector()}

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
        ${t("referrals")}
      </h3>

      <p>
        Your referral system uses 3 levels.
      </p>

    </div>
  `;
}

function notificationsPage() {

  return `
    ${heading(
      t("notificationTitle"),
      "🔔"
    )}

    ${languageSelector()}

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
function supportPage() {

  return `
    ${heading(
      t("supportTitle"),
      "🎧"
    )}

    ${languageSelector()}

    <div class="support-grid">

      <!-- Telegram Channel -->
      <button
        type="button"
        class="support-card"
        data-telegram="https://t.me/mydailytrx_bot">

        <span>📢</span>

        <b>
          ${t("telegramChannel")}
        </b>

        <small>
          @mydailytrx_bot
        </small>

      </button>

      <!-- Telegram Chat / Support -->
      <button
        type="button"
        class="support-card"
        data-telegram="https://t.me/my_Dailytrxbot">

        <span>💬</span>

        <b>
          ${t("telegramSupport")}
        </b>

        <small>
          @my_Dailytrxbot
        </small>

      </button>

    </div>

    <div class="card">

      <h3>Daily TRX</h3>

      <p>
        For questions and support,
        contact us through Telegram.
      </p>

    </div>
  `;
}

function profilePage() {

  const user =
    telegramApp?.initDataUnsafe?.user ||
    {};

  return `
    ${heading(
      t("profileTitle"),
      "👤"
    )}

    ${languageSelector()}

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
            user.username ||
            "—"
          )}
        </b>

      </div>

      <div class="profile-row">

        <span>
          ${t("telegramId")}
        </span>

        <b>
          ${escapeHtml(
            telegramId() ||
            "—"
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
function adminPage() {

  return `
    ${heading(
      "Admin",
      "👑"
    )}

    ${languageSelector()}

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
        document.getElementById(
          "adminAnnouncement"
        )?.value.trim();

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
            method:"POST",
            headers:{
              "Content-Type":
                "application/json"
            },
            body:JSON.stringify({
              telegram_chat_id:
                telegramId(),
              message
            })
          }
        );

        const d = await r.json();

        if (
          !r.ok ||
          !d.ok
        ) {
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

async function loadGlobalAnnouncement() {

  try {

    const r = await fetch(
      "/api/global-announcement"
    );

    const d = await r.json();

    if (
      !d?.ok ||
      !d.announcement
    ) return;

    const a = d.announcement;

    const title =
      a.title ||
      "Announcement";

    const message =
      a.message ||
      a.body ||
      "";

    if (!message) return;

    const home =
      document.querySelector(
        ".hero-card"
      );

    if (!home) return;

    const box =
      document.createElement(
        "div"
      );

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

function renderBottomNavigation() {

  return `
    <div class="mobile-page-nav">

      <button data-page="home">
        ⌂
        <small>
          ${t("home")}
        </small>
      </button>

      <button data-page="wallet">
        ▣
        <small>
          ${t("wallet")}
        </small>
      </button>

      <button data-page="deposit">
        ＋
        <small>
          ${t("deposit")}
        </small>
      </button>

      <button data-page="investment">
        ◈
        <small>
          ${t("investment")}
        </small>
      </button>

      <button data-page="profile">
        ♙
        <small>
          ${t("profile")}
        </small>
      </button>

    </div>
  `;
}
async function render(target="home") {

  window.currentPage = target;

  if (!page) return;

  let content = "";

  if (target === "home") {
    content = homePage();

  } else if (target === "wallet") {
    content = walletPage();

  } else if (target === "deposit") {
    content = depositPage();

  } else if (target === "withdraw") {
    content = withdrawPage();

  } else if (target === "investment") {
    content = investmentPage();

  } else if (target === "referral") {
    content = referralPage();

  } else if (target === "notifications") {
    content = notificationsPage();

  } else if (target === "support") {
    content = supportPage();

  } else if (target === "profile") {
    content = profilePage();

  } else if (target === "admin") {
    content = adminPage();

  } else {
    content = homePage();
  }

  page.innerHTML = content;

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
}

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
          top:0,
          behavior:"smooth"
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

function initializeApp() {

  currentLanguage =
    localStorage.getItem(
      "dailytrx_language"
    ) || "en";

  currentTheme =
    localStorage.getItem(
      "dailytrx_theme"
    ) || "light";

  document.documentElement.lang =
    currentLanguage;

  applyTheme();

  render("home");

  setTimeout(
    () => {
      loadGlobalAnnouncement();
    },
    700
  );
}

window.render = render;
window.setupTheme = setupTheme;

initializeApp();

/*
===========================================================
DAILY TRX — APP.JS
===========================================================

✓ Home
✓ Wallet
✓ Deposit + QR
✓ Withdraw
✓ Investment
✓ Investment Profit %
✓ 30 Days Profit
✓ 360 Days Profit
✓ Referral 6% / 2% / 1%
✓ Notifications
✓ Telegram Channel
✓ Telegram Chat / Support
✓ Profile
✓ English
✓ پښتو
✓ دری
✓ Light Mode
✓ Dark Mode
✓ Admin
✓ Existing Vercel APIs
✓ Existing TRON Deposit Address

Deposit Address:
TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA

Admin Telegram ID:
6504138324

Telegram Channel:
@mydailytrx_bot

Telegram Chat / Support:
@my_Dailytrxbot

===========================================================
*/
