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

let currentLanguage =
  localStorage.getItem("dailytrx_language") || "en";

window.currentPage = "home";

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
  admin: "Admin"
};

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

function formatTRX(value) {
  const number = Number(value || 0);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return number.toLocaleString(undefined, {
    maximumFractionDigits: 6
  });
}

function t(key) {
  return (
    translations[currentLanguage]?.[key] ||
    translations.en?.[key] ||
    key
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
    admin: "Admin",

    welcome: "Welcome to Daily TRX",
    totalBalance: "Total Balance",
    availableBalance: "Available Balance",
    lockedBalance: "Locked Balance",

    depositTitle: "Deposit TRX",
    depositNotice:
      "Send TRX only to the address below. After payment, enter the exact amount and transaction hash.",
    depositAddress: "Deposit Address",
    amount: "Amount (TRX)",
    transactionHash: "Transaction Hash",
    copyAddress: "Copy Address",
    submitDeposit: "Submit Deposit",
    verifying: "Verifying...",
    depositSubmitted:
      "Deposit verified successfully and added to your wallet.",
    depositFailed: "Deposit failed",

    withdrawTitle: "Withdraw TRX",
    withdrawNotice:
      "Minimum withdrawal is 20 TRX. Withdrawal requests are reviewed by admin before payment.",
    withdrawAmount: "Withdrawal Amount (TRX)",
    withdrawAddress: "TRON Destination Address",
    enterWithdrawAmount: "Enter amount",
    enterWithdrawAddress: "Enter TRON address",
    minimumWithdrawal: "Minimum withdrawal: 20 TRX",
    submitWithdraw: "Submit Withdrawal",
    withdrawing: "Submitting...",
    withdrawSubmitted:
      "Withdrawal request submitted successfully. It is pending admin approval.",
    withdrawFailed: "Withdrawal failed",

    investmentTitle: "Investment Plans",
    invest: "Invest",
    investing: "Processing...",
    investmentCreated:
      "Investment created successfully.",
    investmentFailed: "Investment failed",

    referralTitle: "Referral",
    referralText:
      "Invite users and earn from three referral levels.",
    level1: "Level 1",
    level2: "Level 2",
    level3: "Level 3",

    notificationsTitle: "Notifications",
    noNotifications: "No notifications yet.",

    supportTitle: "Support",
    supportText:
      "Need help? Contact Daily TRX support.",
    contactSupport: "Contact Support",
    telegramChannel: "Telegram Channel",

    profileTitle: "Profile",
    username: "Username",
    email: "Email",
    telegramId: "Telegram ID",

    adminTitle: "Admin Announcement",
    announcementTitle: "Title",
    announcementMessage: "Message",
    imageUrl: "Image URL",
    startTime: "Start Time",
    endTime: "End Time",
    active: "Active",
    publishAnnouncement: "Publish Announcement",
    publishing: "Publishing...",

    language: "Language",
    theme: "Theme",

    openFromTelegram:
      "Please open this app from Telegram.",
    invalidAmount: "Please enter a valid amount.",
    invalidAddress:
      "Please enter a valid TRON address.",
    minimumAmount:
      "Minimum withdrawal is 20 TRX."
  },

  ps: {
    home: "ډشبورډ",
    wallet: "والټ",
    deposit: "ډیپازټ",
    withdraw: "ویډرا",
    investment: "انویسټمنټ",
    referral: "ریفریل",
    notifications: "خبرتیاوې",
    support: "مرسته",
    profile: "پروفایل",
    admin: "اډمین",

    welcome: "Daily TRX ته ښه راغلاست",
    totalBalance: "ټول بیلانس",
    availableBalance: "موجود بیلانس",
    lockedBalance: "لاک شوی بیلانس",

    depositTitle: "TRX ډیپازټ",
    depositNotice:
      "یوازې TRX لاندې ادرس ته واستوئ. له تادیې وروسته دقیق مقدار او Transaction Hash ولیکئ.",
    depositAddress: "ډیپازټ ادرس",
    amount: "مقدار (TRX)",
    transactionHash: "Transaction Hash",
    copyAddress: "ادرس کاپي",
    submitDeposit: "ډیپازټ ثبت کړه",
    verifying: "تایید کېږي...",
    depositSubmitted:
      "ډیپازټ تایید او ستاسو والټ ته اضافه شو.",
    depositFailed: "ډیپازټ ناکام شو",

    withdrawTitle: "TRX ویډرا",
    withdrawNotice:
      "د ویډرا لږ تر لږه اندازه 20 TRX ده. د ویډرا غوښتنه د اډمین له تایید وروسته اجرا کېږي.",
    withdrawAmount: "د ویډرا مقدار (TRX)",
    withdrawAddress: "د TRON ترلاسه کولو ادرس",
    enterWithdrawAmount: "مقدار ولیکئ",
    enterWithdrawAddress: "TRON ادرس ولیکئ",
    minimumWithdrawal: "لږ تر لږه ویډرا: 20 TRX",
    submitWithdraw: "ویډرا ثبت کړه",
    withdrawing: "ثبتېږي...",
    withdrawSubmitted:
      "د ویډرا غوښتنه ثبت شوه او د اډمین تایید ته منتظره ده.",
    withdrawFailed: "ویډرا ناکام شو",

    investmentTitle: "انویسټمنټ پلانونه",
    invest: "انویسټ کړه",
    investing: "پروسس کېږي...",
    investmentCreated:
      "انویسټمنټ په بریالیتوب جوړ شو.",
    investmentFailed: "انویسټمنټ ناکام شو",

    referralTitle: "ریفریل",
    referralText:
      "کاروونکي دعوت کړئ او له درې کچو څخه ریفریل ګټه ترلاسه کړئ.",
    level1: "لومړۍ کچه",
    level2: "دوهمه کچه",
    level3: "درېیمه کچه",

    notificationsTitle: "خبرتیاوې",
    noNotifications: "تر اوسه خبرتیا نشته.",

    supportTitle: "مرسته",
    supportText:
      "مرستې ته اړتیا لرئ؟ د Daily TRX له ملاتړ سره اړیکه ونیسئ.",
    contactSupport: "له ملاتړ سره اړیکه",
    telegramChannel: "Telegram چینل",

    profileTitle: "پروفایل",
    username: "یوزرنیم",
    email: "ایمیل",
    telegramId: "Telegram ID",

    adminTitle: "اډمین اعلان",
    announcementTitle: "عنوان",
    announcementMessage: "پیغام",
    imageUrl: "د عکس URL",
    startTime: "د پیل وخت",
    endTime: "د پای وخت",
    active: "فعال",
    publishAnnouncement: "اعلان خپور کړه",
    publishing: "خپرېږي...",

    language: "ژبه",
    theme: "موضوع",

    openFromTelegram:
      "مهرباني وکړئ اپ له Telegram څخه خلاص کړئ.",
    invalidAmount: "سم مقدار ولیکئ.",
    invalidAddress: "سم TRON ادرس ولیکئ.",
    minimumAmount:
      "د ویډرا لږ تر لږه اندازه 20 TRX ده."
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
    admin: "ادمین",

    welcome: "به Daily TRX خوش آمدید",
    totalBalance: "موجودی کل",
    availableBalance: "موجودی قابل استفاده",
    lockedBalance: "موجودی قفل‌شده",

    depositTitle: "واریز TRX",
    depositNotice:
      "فقط TRX به آدرس زیر ارسال کنید. بعد از پرداخت مقدار دقیق و Transaction Hash را وارد کنید.",
    depositAddress: "آدرس واریز",
    amount: "مقدار (TRX)",
    transactionHash: "Transaction Hash",
    copyAddress: "کپی آدرس",
    submitDeposit: "ثبت واریز",
    verifying: "در حال بررسی...",
    depositSubmitted:
      "واریز با موفقیت تایید و به کیف پول شما اضافه شد.",
    depositFailed: "واریز ناموفق بود",

    withdrawTitle: "برداشت TRX",
    withdrawNotice:
      "حداقل برداشت 20 TRX است. درخواست برداشت بعد از تایید ادمین اجرا می‌شود.",
    withdrawAmount: "مقدار برداشت (TRX)",
    withdrawAddress: "آدرس TRON مقصد",
    enterWithdrawAmount: "مقدار را وارد کنید",
    enterWithdrawAddress: "آدرس TRON را وارد کنید",
    minimumWithdrawal: "حداقل برداشت: 20 TRX",
    submitWithdraw: "ثبت برداشت",
    withdrawing: "در حال ثبت...",
    withdrawSubmitted:
      "درخواست برداشت با موفقیت ثبت شد و منتظر تایید ادمین است.",
    withdrawFailed: "برداشت ناموفق بود",

    investmentTitle: "پلان‌های سرمایه‌گذاری",
    invest: "سرمایه‌گذاری",
    investing: "در حال پردازش...",
    investmentCreated:
      "سرمایه‌گذاری با موفقیت ایجاد شد.",
    investmentFailed: "سرمایه‌گذاری ناموفق بود",

    referralTitle: "معرفی",
    referralText:
      "کاربران را دعوت کنید و از سه سطح درآمد دریافت کنید.",
    level1: "سطح اول",
    level2: "سطح دوم",
    level3: "سطح سوم",

    notificationsTitle: "اعلان‌ها",
    noNotifications: "هنوز اعلانی وجود ندارد.",

    supportTitle: "پشتیبانی",
    supportText:
      "به کمک نیاز دارید؟ با پشتیبانی Daily TRX تماس بگیرید.",
    contactSupport: "تماس با پشتیبانی",
    telegramChannel: "کانال Telegram",

    profileTitle: "پروفایل",
    username: "نام کاربری",
    email: "ایمیل",
    telegramId: "Telegram ID",

    adminTitle: "اعلان ادمین",
    announcementTitle: "عنوان",
    announcementMessage: "پیام",
    imageUrl: "آدرس عکس",
    startTime: "زمان شروع",
    endTime: "زمان پایان",
    active: "فعال",
    publishAnnouncement: "انتشار اعلان",
    publishing: "در حال انتشار...",

    language: "زبان",
    theme: "ظاهر",

    openFromTelegram:
      "لطفاً این اپ را از Telegram باز کنید.",
    invalidAmount: "مقدار معتبر وارد کنید.",
    invalidAddress: "آدرس معتبر TRON وارد کنید.",
    minimumAmount:
      "حداقل برداشت 20 TRX است."
  },

  ur: {
    home: "ڈیش بورڈ",
    wallet: "والٹ",
    deposit: "ڈپازٹ",
    withdraw: "رقم نکالیں",
    investment: "انویسٹمنٹ",
    referral: "ریفرل",
    notifications: "اطلاعات",
    support: "مدد",
    profile: "پروفائل",
    admin: "ایڈمن",

    welcome: "Daily TRX میں خوش آمدید",
    totalBalance: "کل بیلنس",
    availableBalance: "دستیاب بیلنس",
    lockedBalance: "لاک بیلنس",

    depositTitle: "TRX ڈپازٹ",
    depositNotice:
      "صرف TRX نیچے دیے گئے ایڈریس پر بھیجیں۔ ادائیگی کے بعد درست رقم اور Transaction Hash درج کریں۔",
    depositAddress: "ڈپازٹ ایڈریس",
    amount: "رقم (TRX)",
    transactionHash: "Transaction Hash",
    copyAddress: "ایڈریس کاپی کریں",
    submitDeposit: "ڈپازٹ جمع کریں",
    verifying: "تصدیق ہو رہی ہے...",
    depositSubmitted:
      "ڈپازٹ کامیابی سے تصدیق اور والٹ میں شامل ہوگیا۔",
    depositFailed: "ڈپازٹ ناکام ہوگیا",

    withdrawTitle: "TRX نکالیں",
    withdrawNotice:
      "کم از کم رقم 20 TRX ہے۔ درخواست ایڈمن کی منظوری کے بعد مکمل ہوگی۔",
    withdrawAmount: "رقم (TRX)",
    withdrawAddress: "TRON وصول کرنے والا ایڈریس",
    enterWithdrawAmount: "رقم درج کریں",
    enterWithdrawAddress: "TRON ایڈریس درج کریں",
    minimumWithdrawal: "کم از کم رقم: 20 TRX",
    submitWithdraw: "رقم نکالنے کی درخواست",
    withdrawing: "جمع ہو رہی ہے...",
    withdrawSubmitted:
      "رقم نکالنے کی درخواست کامیابی سے جمع ہوگئی اور ایڈمن کی منظوری کے منتظر ہے۔",
    withdrawFailed: "رقم نکالنا ناکام ہوگیا",

    investmentTitle: "انویسٹمنٹ پلانز",
    invest: "انویسٹ کریں",
    investing: "پروسیسنگ...",
    investmentCreated:
      "انویسٹمنٹ کامیابی سے بن گئی۔",
    investmentFailed: "انویسٹمنٹ ناکام ہوگئی",

    referralTitle: "ریفرل",
    referralText:
      "صارفین کو مدعو کریں اور تین لیول سے ریفرل آمدنی حاصل کریں۔",
    level1: "لیول 1",
    level2: "لیول 2",
    level3: "لیول 3",

    notificationsTitle: "اطلاعات",
    noNotifications: "ابھی کوئی اطلاع نہیں۔",

    supportTitle: "مدد",
    supportText:
      "مدد چاہیے؟ Daily TRX سپورٹ سے رابطہ کریں۔",
    contactSupport: "سپورٹ سے رابطہ",
    telegramChannel: "Telegram چینل",

    profileTitle: "پروفائل",
    username: "یوزرنیم",
    email: "ای میل",
    telegramId: "Telegram ID",

    adminTitle: "ایڈمن اعلان",
    announcementTitle: "عنوان",
    announcementMessage: "پیغام",
    imageUrl: "تصویر URL",
    startTime: "شروع کا وقت",
    endTime: "اختتام کا وقت",
    active: "فعال",
    publishAnnouncement: "اعلان شائع کریں",
    publishing: "شائع ہو رہا ہے...",

    language: "زبان",
    theme: "تھیم",

    openFromTelegram:
      "براہ کرم ایپ Telegram سے کھولیں۔",
    invalidAmount: "درست رقم درج کریں۔",
    invalidAddress: "درست TRON ایڈریس درج کریں۔",
    minimumAmount:
      "کم از کم رقم 20 TRX ہے۔"
  }
};
function languageSelector() {
  return `
    <div class="language-box">
      <label>${t("language")}</label>

      <select id="languageSelect">
        <option value="en" ${
          currentLanguage === "en"
            ? "selected"
            : ""
        }>
          English
        </option>

        <option value="ps" ${
          currentLanguage === "ps"
            ? "selected"
            : ""
        }>
          پښتو
        </option>

        <option value="fa" ${
          currentLanguage === "fa"
            ? "selected"
            : ""
        }>
          فارسی
        </option>

        <option value="ur" ${
          currentLanguage === "ur"
            ? "selected"
            : ""
        }>
          اردو
        </option>
      </select>
    </div>
  `;
}

function setupLanguageSelector() {
  const select =
    document.getElementById("languageSelect");

  if (!select) return;

  select.addEventListener("change", () => {
    currentLanguage = select.value;

    localStorage.setItem(
      "dailytrx_language",
      currentLanguage
    );

    render(window.currentPage || "home");
  });
}

function navButtons() {
  return `
    <button data-page="home">
      🏠 ${t("home")}
    </button>

    <button data-page="wallet">
      💰 ${t("wallet")}
    </button>

    <button data-page="deposit">
      ➕ ${t("deposit")}
    </button>

    <button data-page="withdraw">
      ↗️ ${t("withdraw")}
    </button>

    <button data-page="investment">
      📦 ${t("investment")}
    </button>

    <button data-page="referral">
      👥 ${t("referral")}
    </button>

    <button data-page="notifications">
      🔔 ${t("notifications")}
    </button>

    <button data-page="support">
      💬 ${t("support")}
    </button>

    <button data-page="profile">
      👤 ${t("profile")}
    </button>

    ${
      isAdmin()
        ? `
          <button data-page="admin">
            🛡️ ${t("admin")}
          </button>
        `
        : ""
    }
  `;
}
async function render(p = "home") {

  window.currentPage = p;

  if (!page) return;

  let content = "";

  if (p === "home") {

    content = `
      ${languageSelector()}

      <div class="hero-card">
        <h2>${t("welcome")}</h2>
        <p>Daily TRX</p>
      </div>

      <div id="homeBalance">
        Loading...
      </div>

      <div class="menu-grid">
        ${navButtons()}
      </div>

      <div
        id="trxPrice"
        class="notice"
      >
        TRX Price: Loading...
      </div>
    `;

  } else if (p === "wallet") {

    content = `
      ${languageSelector()}

      <h2>${t("wallet")}</h2>

      <div id="walletContent">
        Loading...
      </div>
    `;

  } else if (p === "deposit") {

    content = `
      ${languageSelector()}

      <h2>${t("depositTitle")}</h2>

      <div class="notice">
        ${t("depositNotice")}
      </div>

      <div class="deposit-card">

        <label>
          ${t("depositAddress")}
        </label>

        <div class="address-row">

          <input
            id="depositAddress"
            value="${DEPOSIT_ADDRESS}"
            readonly
          />

          <button
            id="copyDepositAddress"
            type="button"
          >
            ${t("copyAddress")}
          </button>

        </div>

        <div class="qr-box">

          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
            alt="TRON Deposit QR"
          />

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
        />

        <label>
          ${t("transactionHash")}
        </label>

        <input
          id="depositTxHash"
          type="text"
          maxlength="64"
          placeholder="64-character TRON transaction hash"
        />

        <button
          id="submitDeposit"
          type="button"
        >
          ${t("submitDeposit")}
        </button>

        <div
          id="depositMessage"
          class="form-message"
        ></div>

      </div>
    `;

  } else if (p === "withdraw") {

    content = `
      ${languageSelector()}

      <h2>${t("withdrawTitle")}</h2>

      <div class="notice">
        ${t("withdrawNotice")}
      </div>

      <div class="withdraw-card">

        <div class="minimum-box">
          ${t("minimumWithdrawal")}
        </div>

        <label>
          ${t("withdrawAmount")}
        </label>

        <input
          id="withdrawAmount"
          type="number"
          min="20"
          step="0.000001"
          placeholder="${t("enterWithdrawAmount")}"
        />

        <label>
          ${t("withdrawAddress")}
        </label>

        <input
          id="withdrawAddress"
          type="text"
          maxlength="34"
          placeholder="${t("enterWithdrawAddress")}"
          autocomplete="off"
        />

        <button
          id="submitWithdraw"
          type="button"
        >
          ${t("submitWithdraw")}
        </button>

        <div
          id="withdrawMessage"
          class="form-message"
        ></div>

      </div>
    `;

  } else if (p === "investment") {

    content = `
      ${languageSelector()}

      <h2>${t("investmentTitle")}</h2>

      <div id="investmentPlans">
        Loading...
      </div>

      <div
        id="investmentMessage"
        class="form-message"
      ></div>
    `;

  } else if (p === "referral") {

    content = `
      ${languageSelector()}

      <h2>${t("referralTitle")}</h2>

      <div class="notice">
        ${t("referralText")}
      </div>

      <div class="referral-card">

        <div>
          <strong>${t("level1")}</strong>
          <span>6%</span>
        </div>

        <div>
          <strong>${t("level2")}</strong>
          <span>2%</span>
        </div>

        <div>
          <strong>${t("level3")}</strong>
          <span>1%</span>
        </div>

      </div>

      <div id="referralContent">
        Loading...
      </div>
    `;

  } else if (p === "notifications") {

    content = `
      ${languageSelector()}

      <h2>${t("notificationsTitle")}</h2>

      <div id="notificationsContent">
        Loading...
      </div>
    `;

  } else if (p === "support") {

    content = `
      ${languageSelector()}

      <h2>${t("supportTitle")}</h2>

      <div class="notice">
        ${t("supportText")}
      </div>

      <div class="support-card">

        <a
          href="https://t.me/${SUPPORT_USERNAME}"
          target="_blank"
          rel="noopener"
        >
          💬 ${t("contactSupport")}
        </a>

        <a
          href="${CHANNEL_URL}"
          target="_blank"
          rel="noopener"
        >
          📢 ${t("telegramChannel")}
        </a>

      </div>
    `;

  } else if (p === "profile") {

    const user =
      telegramApp?.initDataUnsafe?.user || {};

    content = `
      ${languageSelector()}

      <h2>${t("profileTitle")}</h2>

      <div class="profile-card">

        <p>
          <strong>
            ${t("username")}:
          </strong>

          @${escapeHtml(
            user.username || "-"
          )}
        </p>

        <p>
          <strong>
            ${t("telegramId")}:
          </strong>

          ${escapeHtml(
            user.id || "-"
          )}
        </p>

      </div>
    `;

  } else if (p === "admin" && isAdmin()) {

    content = `
      ${languageSelector()}

      <h2>${t("adminTitle")}</h2>

      <div class="admin-card">

        <label>
          ${t("announcementTitle")}
        </label>

        <input
          id="announcementTitle"
          type="text"
        />

        <label>
          ${t("announcementMessage")}
        </label>

        <textarea
          id="announcementMessage"
          rows="5"
        ></textarea>

        <label>
          ${t("imageUrl")}
        </label>

        <input
          id="announcementImage"
          type="url"
        />

        <label>
          ${t("startTime")}
        </label>

        <input
          id="announcementStart"
          type="datetime-local"
        />

        <label>
          ${t("endTime")}
        </label>

        <input
          id="announcementEnd"
          type="datetime-local"
        />

        <label>
          <input
            id="announcementActive"
            type="checkbox"
            checked
          />

          ${t("active")}
        </label>

        <button
          id="publishAnnouncement"
          type="button"
        >
          ${t("publishAnnouncement")}
        </button>

        <div
          id="announcementMessageBox"
          class="form-message"
        ></div>

      </div>
    `;

  } else {

    window.currentPage = "home";

    return render("home");
  }

  page.innerHTML = content;

  setupLanguageSelector();

  if (p === "home") {
    setupHome();
  }

  if (p === "wallet") {
    setupWallet();
  }

  if (p === "deposit") {
    setupDeposit();
  }

  if (p === "withdraw") {
    setupWithdraw();
  }

  if (p === "investment") {
    setupInvestment();
  }

  if (p === "referral") {
    setupReferral();
  }

  if (p === "notifications") {
    setupNotifications();
  }

  if (p === "admin" && isAdmin()) {
    setupAdminAnnouncement();
  }
}
async function setupHome() {

  const box =
    document.getElementById("homeBalance");

  if (!box) return;

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    box.innerHTML = `
      <div class="notice">
        ${t("openFromTelegram")}
      </div>
    `;
    return;
  }

  try {

    const response =
      await fetch(
        `/api/wallet?telegram_chat_id=${encodeURIComponent(
          telegramId
        )}`
      );

    const data =
      await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(
        data?.message ||
        "Could not load wallet"
      );
    }

    const wallet =
      data.wallet || data;

    const available =
      Number(
        wallet.available_trx ??
        wallet.available ??
        0
      );

    const locked =
      Number(
        wallet.locked_trx ??
        wallet.locked ??
        0
      );

    const total =
      available + locked;

    box.innerHTML = `
      <div class="wallet-grid">

        <div class="balance-card">
          <span>
            ${t("totalBalance")}
          </span>

          <strong>
            ${formatTRX(total)} TRX
          </strong>
        </div>

        <div class="balance-card">
          <span>
            ${t("availableBalance")}
          </span>

          <strong>
            ${formatTRX(available)} TRX
          </strong>
        </div>

        <div class="balance-card">
          <span>
            ${t("lockedBalance")}
          </span>

          <strong>
            ${formatTRX(locked)} TRX
          </strong>
        </div>

      </div>
    `;

  } catch (error) {

    box.innerHTML = `
      <div class="notice">
        ❌ ${escapeHtml(
          error.message ||
          "Could not load wallet"
        )}
      </div>
    `;
  }

  loadTrxPrice();
}

async function setupWallet() {

  const walletContent =
    document.getElementById(
      "walletContent"
    );

  if (!walletContent) return;

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    walletContent.innerHTML = `
      <div class="notice">
        ${t("openFromTelegram")}
      </div>
    `;
    return;
  }

  try {

    const response =
      await fetch(
        `/api/wallet?telegram_chat_id=${encodeURIComponent(
          telegramId
        )}`
      );

    const data =
      await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(
        data?.message ||
        "Could not load wallet"
      );
    }

    const wallet =
      data.wallet || data;

    const available =
      Number(
        wallet.available_trx ??
        wallet.available ??
        0
      );

    const locked =
      Number(
        wallet.locked_trx ??
        wallet.locked ??
        0
      );

    const total =
      available + locked;

    walletContent.innerHTML = `
      <div class="wallet-grid">

        <div class="balance-card">
          <span>
            ${t("totalBalance")}
          </span>

          <strong>
            ${formatTRX(total)} TRX
          </strong>
        </div>

        <div class="balance-card">
          <span>
            ${t("availableBalance")}
          </span>

          <strong>
            ${formatTRX(available)} TRX
          </strong>
        </div>

        <div class="balance-card">
          <span>
            ${t("lockedBalance")}
          </span>

          <strong>
            ${formatTRX(locked)} TRX
          </strong>
        </div>

      </div>
    `;

  } catch (error) {

    walletContent.innerHTML = `
      <div class="notice">
        ❌ ${escapeHtml(
          error.message ||
          "Could not load wallet"
        )}
      </div>
    `;
  }
}

async function loadTrxPrice() {

  const box =
    document.getElementById("trxPrice");

  if (!box) return;

  try {

    const response =
      await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
      );

    const data =
      await response.json();

    const price =
      Number(data?.tron?.usd || 0);

    if (!price) {
      throw new Error("Price unavailable");
    }

    box.textContent =
      "TRX Price: $" +
      price.toFixed(4);

  } catch (error) {

    box.textContent =
      "TRX Price: unavailable";
  }
}

function setupReferral() {

  const box =
    document.getElementById(
      "referralContent"
    );

  if (!box) return;

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    box.innerHTML = `
      <div class="notice">
        ${t("openFromTelegram")}
      </div>
    `;
    return;
  }

  const link =
    `https://t.me/MyDailyTRXBot?start=ref_${telegramId}`;

  box.innerHTML = `
    <div class="address-row">

      <input
        value="${escapeHtml(link)}"
        readonly
      />

      <button
        id="copyReferral"
        type="button"
      >
        Copy
      </button>

    </div>
  `;

  document
    .getElementById("copyReferral")
    ?.addEventListener(
      "click",
      async () => {

        try {

          await navigator.clipboard.writeText(
            link
          );

          document.getElementById(
            "copyReferral"
          ).textContent = "Copied ✓";

        } catch (error) {

          alert(link);
        }
      }
    );
}
async function setupDeposit() {

  const copyButton =
    document.getElementById(
      "copyDepositAddress"
    );

  const submitButton =
    document.getElementById(
      "submitDeposit"
    );

  const amountInput =
    document.getElementById(
      "depositAmount"
    );

  const txInput =
    document.getElementById(
      "depositTxHash"
    );

  const message =
    document.getElementById(
      "depositMessage"
    );

  if (copyButton) {

    copyButton.addEventListener(
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
              t("copyAddress");

          }, 1500);

        } catch (error) {

          if (message) {
            message.textContent =
              DEPOSIT_ADDRESS;
          }
        }
      }
    );
  }

  if (!submitButton) return;

  submitButton.addEventListener(
    "click",
    async () => {

      const telegramId =
        getTelegramId();

      if (!telegramId) {

        message.textContent =
          t("openFromTelegram");

        return;
      }

      const amount =
        Number(
          amountInput?.value || 0
        );

      const txHash =
        String(
          txInput?.value || ""
        ).trim();

      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {

        message.textContent =
          t("invalidAmount");

        return;
      }

      if (
        !/^[a-fA-F0-9]{64}$/.test(
          txHash
        )
      ) {

        message.textContent =
          "Invalid TRON transaction hash";

        return;
      }

      submitButton.disabled = true;

      submitButton.textContent =
        t("verifying");

      message.textContent = "";

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
                  amount,

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
            data?.message ||
            "Deposit submission failed."
          );
        }

        message.textContent =
          "✅ " +
          (
            data.message ||
            t("depositSubmitted")
          );

        amountInput.value = "";
        txInput.value = "";

        if (
          window.currentPage ===
          "home"
        ) {
          setupHome();
        }

      } catch (error) {

        message.textContent =
          "❌ " +
          (
            error.message ||
            t("depositFailed")
          );

      } finally {

        submitButton.disabled = false;

        submitButton.textContent =
          t("submitDeposit");
      }
    }
  );
}

async function setupWithdraw() {

  const amountInput =
    document.getElementById(
      "withdrawAmount"
    );

  const addressInput =
    document.getElementById(
      "withdrawAddress"
    );

  const submitButton =
    document.getElementById(
      "submitWithdraw"
    );

  const message =
    document.getElementById(
      "withdrawMessage"
    );

  if (!submitButton) return;

  submitButton.addEventListener(
    "click",
    async () => {

      const telegramId =
        getTelegramId();

      if (!telegramId) {

        message.textContent =
          t("openFromTelegram");

        return;
      }

      const amount =
        Number(
          amountInput?.value || 0
        );

      const address =
        String(
          addressInput?.value || ""
        ).trim();

      if (
        !Number.isFinite(amount) ||
        amount <= 0
      ) {

        message.textContent =
          t("invalidAmount");

        return;
      }

      if (amount < 20) {

        message.textContent =
          t("minimumAmount");

        return;
      }

      if (
        !/^T[a-zA-Z0-9]{33}$/.test(
          address
        )
      ) {

        message.textContent =
          t("invalidAddress");

        return;
      }

      submitButton.disabled = true;

      submitButton.textContent =
        t("withdrawing");

      message.textContent = "";

      try {

        const response =
          await fetch(
            "/api/withdraw",
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
                  amount,

                destination_address:
                  address
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
            data?.message ||
            t("withdrawFailed")
          );
        }

        message.textContent =
          "✅ " +
          (
            data.message ||
            t("withdrawSubmitted")
          );

        amountInput.value = "";
        addressInput.value = "";

      } catch (error) {

        message.textContent =
          "❌ " +
          (
            error.message ||
            t("withdrawFailed")
          );

      } finally {

        submitButton.disabled = false;

        submitButton.textContent =
          t("submitWithdraw");
      }
    }
  );
}
async function setupInvestment() {

  const container =
    document.getElementById(
      "investmentPlans"
    );

  if (!container) return;

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
        data?.message ||
        "Could not load investment plans"
      );
    }

    const plans =
      data.plans ||
      data.investment_plans ||
      [];

    if (!plans.length) {

      container.innerHTML = `
        <div class="notice">
          No investment plans available.
        </div>
      `;

      return;
    }

    container.innerHTML =
      plans.map(
        (plan, index) => {

          const id =
            plan.id ??
            plan.plan_id ??
            index + 1;

          const name =
            plan.name ||
            plan.title ||
            `Investment Plan #${index + 1}`;

          const minimum =
            Number(
              plan.minimum_amount ??
              plan.min_amount ??
              plan.amount ??
              0
            );

          const daily =
            Number(
              plan.daily_profit ??
              plan.daily_return ??
              0
            );

          const days =
            Number(
              plan.duration_days ??
              plan.days ??
              30
            );

          const totalProfit =
            daily * days;

          return `
            <div class="investment-card">

              <h3>
                ${escapeHtml(name)}
              </h3>

              <p>
                Minimum:
                <strong>
                  ${formatTRX(minimum)} TRX
                </strong>
              </p>

              <p>
                Daily Profit:
                <strong>
                  ${formatTRX(daily)} TRX
                </strong>
              </p>

              <p>
                Duration:
                <strong>
                  ${days} Days
                </strong>
              </p>

              <p>
                Total Profit:
                <strong>
                  ${formatTRX(totalProfit)} TRX
                </strong>
              </p>

              <button
                class="invest-button"
                data-plan-id="${escapeHtml(id)}"
                data-plan-name="${escapeHtml(name)}"
                data-minimum="${minimum}"
                type="button"
              >
                ${t("invest")}
              </button>

            </div>
          `;
        }
      ).join("");

    document
      .querySelectorAll(
        ".invest-button"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          async () => {

            await investInPlan({
              planId:
                button.dataset.planId,

              planName:
                button.dataset.planName,

              minimum:
                Number(
                  button.dataset.minimum ||
                  0
                ),

              button
            });
          }
        );
      });

  } catch (error) {

    container.innerHTML = `
      <div class="notice">
        ❌ ${escapeHtml(
          error.message ||
          "Could not load investment plans"
        )}
      </div>
    `;
  }
}

async function investInPlan({
  planId,
  planName,
  minimum,
  button
}) {

  const telegramId =
    getTelegramId();

  const message =
    document.getElementById(
      "investmentMessage"
    );

  if (!telegramId) {

    if (message) {
      message.textContent =
        t("openFromTelegram");
    }

    return;
  }

  const amountText =
    prompt(
      `Enter investment amount in TRX.\nMinimum: ${minimum} TRX`
    );

  if (amountText === null) {
    return;
  }

  const amount =
    Number(
      String(amountText).trim()
    );

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {

    if (message) {
      message.textContent =
        t("invalidAmount");
    }

    return;
  }

  if (amount < minimum) {

    if (message) {
      message.textContent =
        `Minimum investment is ${formatTRX(
          minimum
        )} TRX.`;
    }

    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent =
      t("investing");
  }

  if (message) {
    message.textContent = "";
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
              planId,

            amount_trx:
              amount
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
        data?.message ||
        t("investmentFailed")
      );
    }

    if (message) {

      message.textContent =
        "✅ " +
        (
          data.message ||
          t("investmentCreated")
        );
    }

    await setupWallet();

  } catch (error) {

    if (message) {

      message.textContent =
        "❌ " +
        (
          error.message ||
          t("investmentFailed")
        );
    }

  } finally {

    if (button) {

      button.disabled = false;

      button.textContent =
        t("invest");
    }
  }
}
async function setupNotifications() {

  const container =
    document.getElementById(
      "notificationsContent"
    );

  if (!container) return;

  const telegramId =
    getTelegramId();

  if (!telegramId) {

    container.innerHTML = `
      <div class="notice">
        ${t("openFromTelegram")}
      </div>
    `;

    return;
  }

  try {

    const response =
      await fetch(
        `/api/notifications?telegram_chat_id=${encodeURIComponent(
          telegramId
        )}`
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data?.message ||
        "Could not load notifications"
      );
    }

    const notifications =
      data.notifications || [];

    if (!notifications.length) {

      container.innerHTML = `
        <div class="notice">
          ${t("noNotifications")}
        </div>
      `;

      return;
    }

    container.innerHTML =
      notifications
        .map(notification => {

          const title =
            notification.title ||
            "Notification";

          const message =
            notification.message ||
            "";

          const status =
            notification.status ||
            "";

          const amount =
            notification.amount_trx;

          const date =
            notification.created_at
              ? new Date(
                  notification.created_at
                ).toLocaleString()
              : "";

          return `
            <div class="notification-card">

              <div class="notification-header">

                <strong>
                  ${escapeHtml(title)}
                </strong>

                ${
                  status
                    ? `
                      <span>
                        ${escapeHtml(status)}
                      </span>
                    `
                    : ""
                }

              </div>

              <p>
                ${escapeHtml(message)}
              </p>

              ${
                amount !== null &&
                amount !== undefined
                  ? `
                    <div>
                      ${formatTRX(amount)}
                      TRX
                    </div>
                  `
                  : ""
              }

              ${
                date
                  ? `
                    <small>
                      ${escapeHtml(date)}
                    </small>
                  `
                  : ""
              }

            </div>
          `;

        })
        .join("");

  } catch (error) {

    container.innerHTML = `
      <div class="notice">
        ❌ ${escapeHtml(
          error.message ||
          "Could not load notifications"
        )}
      </div>
    `;
  }
}

async function setupAdminAnnouncement() {

  const publishButton =
    document.getElementById(
      "publishAnnouncement"
    );

  const messageBox =
    document.getElementById(
      "announcementMessageBox"
    );

  if (!publishButton) return;

  const telegramId =
    getTelegramId();

  publishButton.addEventListener(
    "click",
    async () => {

      if (
        telegramId !==
        ADMIN_TELEGRAM_ID
      ) {

        messageBox.textContent =
          "Admin access required.";

        return;
      }

      const title =
        document.getElementById(
          "announcementTitle"
        )?.value.trim();

      const message =
        document.getElementById(
          "announcementMessage"
        )?.value.trim();

      const imageUrl =
        document.getElementById(
          "announcementImage"
        )?.value.trim();

      const start =
        document.getElementById(
          "announcementStart"
        )?.value;

      const end =
        document.getElementById(
          "announcementEnd"
        )?.value;

      const active =
        document.getElementById(
          "announcementActive"
        )?.checked === true;

      if (
        !title ||
        !message ||
        !start
      ) {

        messageBox.textContent =
          "Title, message and start time are required.";

        return;
      }

      publishButton.disabled = true;

      publishButton.textContent =
        t("publishing");

      messageBox.textContent = "";

      try {

        const startsAt =
          new Date(start)
            .toISOString();

        const endsAt =
          end
            ? new Date(end)
                .toISOString()
            : null;

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
                  telegramId,

                title,
                message,

                image_url:
                  imageUrl || null,

                starts_at:
                  startsAt,

                ends_at:
                  endsAt,

                active
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
            data?.message ||
            "Could not create announcement"
          );
        }

        messageBox.textContent =
          "✅ " +
          (
            data.message ||
            "Announcement created successfully."
          );

        document.getElementById(
          "announcementTitle"
        ).value = "";

        document.getElementById(
          "announcementMessage"
        ).value = "";

        document.getElementById(
          "announcementImage"
        ).value = "";

      } catch (error) {

        messageBox.textContent =
          "❌ " +
          (
            error.message ||
            "Announcement failed"
          );

      } finally {

        publishButton.disabled = false;

        publishButton.textContent =
          t("publishAnnouncement");
      }
    }
  );
}
async function loadGlobalAnnouncement() {

  try {

    const response =
      await fetch(
        "/api/global-announcement"
      );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.ok ||
      !data.announcement
    ) {
      return;
    }

    showAnnouncement(
      data.announcement
    );

  } catch (error) {

    console.error(
      "Announcement load error:",
      error
    );
  }
}

function showAnnouncement(
  announcement
) {

  const existing =
    document.getElementById(
      "globalAnnouncementPopup"
    );

  if (existing) {
    existing.remove();
  }

  const title =
    escapeHtml(
      announcement.title || ""
    );

  const message =
    escapeHtml(
      announcement.message || ""
    );

  const image =
    announcement.image_url
      ? `
        <img
          src="${escapeHtml(
            announcement.image_url
          )}"
          alt="Announcement"
          style="
            width:100%;
            border-radius:16px;
            margin-bottom:12px;
          "
        />
      `
      : "";

  const popup =
    document.createElement("div");

  popup.id =
    "globalAnnouncementPopup";

  popup.innerHTML = `
    <div class="announcement-overlay">

      <div class="announcement-modal">

        <button
          type="button"
          id="closeAnnouncement"
          class="announcement-close"
        >
          ×
        </button>

        ${image}

        <h3>
          ${title}
        </h3>

        <p>
          ${message}
        </p>

      </div>

    </div>
  `;

  document.body.appendChild(
    popup
  );

  document
    .getElementById(
      "closeAnnouncement"
    )
    ?.addEventListener(
      "click",
      () => {
        popup.remove();
      }
    );
}

function setupTheme() {

  const themeButton =
    document.getElementById(
      "themeButton"
    );

  const savedTheme =
    localStorage.getItem(
      "dailytrx_theme"
    ) || "light";

  document.body.classList.toggle(
    "dark",
    savedTheme === "dark"
  );

  if (!themeButton) return;

  themeButton.addEventListener(
    "click",
    () => {

      const isDark =
        document.body.classList.toggle(
          "dark"
        );

      localStorage.setItem(
        "dailytrx_theme",
        isDark
          ? "dark"
          : "light"
      );
    }
  );
}

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-page]"
      );

    if (!button) return;

    const target =
      button.dataset.page;

    if (!target) return;

    render(target);
  }
);
function addBottomNavigation() {

  const old =
    document.getElementById(
      "dailytrxBottomNav"
    );

  if (old) {
    old.remove();
  }

  const nav =
    document.createElement("div");

  nav.id =
    "dailytrxBottomNav";

  nav.className =
    "bottom-nav";

  nav.innerHTML = `
    <button
      type="button"
      data-page="home"
    >
      🏠
    </button>

    <button
      type="button"
      data-page="wallet"
    >
      💰
    </button>

    <button
      type="button"
      data-page="deposit"
    >
      ➕
    </button>

    <button
      type="button"
      data-page="withdraw"
    >
      ↗️
    </button>

    <button
      type="button"
      data-page="profile"
    >
      👤
    </button>
  `;

  document.body.appendChild(nav);
}

function startDailyTRXApp() {

  setupTheme();

  render("home");

  loadGlobalAnnouncement();

  addBottomNavigation();

  if (telegramApp) {

    try {

      telegramApp.MainButton.hide();

    } catch (error) {

      console.log(
        "Telegram MainButton unavailable"
      );
    }
  }

  console.log(
    "Daily TRX app loaded successfully."
  );
}

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    startDailyTRXApp
  );

} else {

  startDailyTRXApp();
}
