const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById('page');

const DEPOSIT_ADDRESS =
  'TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA';


/* =========================
   ADMIN
========================= */

const ADMIN_TELEGRAM_ID = '6504138324';


/* =========================
   LANGUAGES
========================= */

const translations = {

  en: {
    dashboard: 'Dashboard',
    wallet: 'Wallet',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    investment: 'Investment',
    referral: 'Referral',
    notifications: 'Notifications',
    support: 'Support',
    profile: 'Profile',
    admin: 'Admin',

    language: 'Language',
    english: 'English',
    pashto: 'پښتو',
    persian: 'فارسی',
    urdu: 'اردو',

    depositTRX: 'Deposit TRX',
    sendTRX:
      'Send TRX to the deposit address below, then submit your transaction hash.',
    depositAddress: 'Deposit Address',
    copyAddress: '📋 Copy Address',
    addressCopied: '✅ Address Copied',
    copyFailed: '❌ Copy failed',
    amountTRX: 'Amount (TRX)',
    enterAmount: 'Enter TRX amount',
    transactionHash: 'Transaction Hash',
    enterTransactionHash: 'Enter transaction hash',
    submitDeposit: 'Submit Deposit',
    submitting: 'Submitting...',
    enterAmountHash:
      'Please enter the amount and transaction hash.',
    openFromTelegram:
      'Please open Daily TRX from Telegram.',
    depositSubmitted:
      '✅ Deposit submitted. Waiting for verification.',
    depositFailed:
      'Deposit submission failed.',

    withdrawTitle: 'Withdraw',
    withdrawNotice:
      'Withdrawal requests require backend validation and admin approval.',

    investmentPlans: 'Investment Plans',
    loadingPlans: 'Loading investment plans...',
    noPlans: 'No investment plans available.',
    investment: 'Investment',
    dailyProfit: 'Daily Profit',
    duration: 'Duration',
    totalProfit: 'Total Profit',
    days: 'Days',
    investNow: 'Invest Now',
    processing: 'Processing...',
    confirmInvestment:
      'Are you sure you want to invest in this plan?',
    investmentCreated:
      '✅ Investment created successfully.',
    investmentFailed:
      'Investment failed.',
    couldNotLoadPlans:
      'Could not load investment plans.',

    myReferral: 'My Referral',
    notAvailable: 'Not available',
    team: 'Team',
    users: 'users',

    available: 'Available',
    locked: 'Locked',
    loading: 'Loading...',
    couldNotLoadWallet:
      '❌ Could not load wallet balance.',

    noNotifications: 'No notifications.',
    moduleReady:
      'This module is ready for backend integration.',

    adminPanel: 'Admin Panel',
    announcementTitle: 'Announcement Title',
    announcementMessage: 'Announcement Message',
    imageUrl: 'Image URL',
    startTime: 'Start Time',
    endTime: 'End Time',
    active: 'Active',
    createAnnouncement: 'Create Announcement',
    creatingAnnouncement: 'Creating...',
    announcementCreated:
      '✅ Announcement created successfully.',
    announcementFailed:
      'Failed to create announcement.',
    adminAccessDenied:
      'Access denied.'
  },


  ps: {
    dashboard: 'ډشبورډ',
    wallet: 'والټ',
    deposit: 'ډیپازټ',
    withdraw: 'ویډرا',
    investment: 'پانګونه',
    referral: 'ریفerral',
    notifications: 'خبرتیاوې',
    support: 'ملاتړ',
    profile: 'پروفایل',
    admin: 'اډمین',

    language: 'ژبه',
    english: 'English',
    pashto: 'پښتو',
    persian: 'فارسی',
    urdu: 'اردو',

    depositTRX: 'TRX ډیپازټ',
    sendTRX:
      'TRX لاندې ادرس ته واستوئ، بیا خپل Transaction Hash ثبت کړئ.',
    depositAddress: 'د ډیپازټ ادرس',
    copyAddress: '📋 ادرس کاپي کړئ',
    addressCopied: '✅ ادرس کاپي شو',
    copyFailed: '❌ کاپي ناکامه شوه',
    amountTRX: 'مقدار (TRX)',
    enterAmount: 'د TRX مقدار ولیکئ',
    transactionHash: 'Transaction Hash',
    enterTransactionHash: 'Transaction Hash ولیکئ',
    submitDeposit: 'ډیپازټ ثبت کړئ',
    submitting: 'ثبتېږي...',
    enterAmountHash:
      'مهرباني وکړئ مقدار او Transaction Hash ولیکئ.',
    openFromTelegram:
      'مهرباني وکړئ Daily TRX له Telegram څخه خلاص کړئ.',
    depositSubmitted:
      '✅ ډیپازټ ثبت شو. د تایید په انتظار کې دی.',
    depositFailed:
      'ډیپازټ ثبتول ناکام شول.',

    withdrawTitle: 'ویډرا',
    withdrawNotice:
      'د ویډرا غوښتنه د Backend تایید او د اډمین منظورۍ ته اړتیا لري.',

    investmentPlans: 'د پانګونې پلانونه',
    loadingPlans: 'د پانګونې پلانونه لوډ کېږي...',
    noPlans: 'اوس مهال د پانګونې پلان نشته.',
    investment: 'پانګونه',
    dailyProfit: 'ورځنۍ ګټه',
    duration: 'موده',
    totalProfit: 'ټوله ګټه',
    days: 'ورځې',
    investNow: 'اوس پانګونه وکړئ',
    processing: 'پروسس کېږي...',
    confirmInvestment:
      'ایا غواړئ په دې پلان کې پانګونه وکړئ؟',
    investmentCreated:
      '✅ پانګونه په بریالیتوب سره ثبت شوه.',
    investmentFailed:
      'پانګونه ناکامه شوه.',
    couldNotLoadPlans:
      'د پانګونې پلانونه نه شي لوډ کېدای.',

    myReferral: 'زما ریفرل',
    notAvailable: 'موجود نه دی',
    team: 'ټیم',
    users: 'کاروونکي',

    available: 'موجود بیلانس',
    locked: 'لاک شوی بیلانس',
    loading: 'لوډ کېږي...',
    couldNotLoadWallet:
      '❌ د والټ بیلانس نه شي لوډ کېدای.',

    noNotifications: 'هیڅ خبرتیا نشته.',
    moduleReady:
      'دا برخه د Backend اتصال لپاره چمتو ده.',

    adminPanel: 'د اډمین پینل',
    announcementTitle: 'د اعلان سرلیک',
    announcementMessage: 'د اعلان پیغام',
    imageUrl: 'د عکس URL',
    startTime: 'د پیل وخت',
    endTime: 'د پای وخت',
    active: 'فعال',
    createAnnouncement: 'اعلان جوړ کړئ',
    creatingAnnouncement: 'جوړېږي...',
    announcementCreated:
      '✅ اعلان په بریالیتوب سره جوړ شو.',
    announcementFailed:
      'د اعلان جوړول ناکام شول.',
    adminAccessDenied:
      'د لاسرسي اجازه نشته.'
  },


  fa: {
    dashboard: 'داشبورد',
    wallet: 'کیف پول',
    deposit: 'واریز',
    withdraw: 'برداشت',
    investment: 'سرمایه‌گذاری',
    referral: 'معرفی',
    notifications: 'اعلان‌ها',
    support: 'پشتیبانی',
    profile: 'پروفایل',
    admin: 'مدیریت',

    language: 'زبان',
    english: 'English',
    pashto: 'پښتو',
    persian: 'فارسی',
    urdu: 'اردو',

    depositTRX: 'واریز TRX',
    sendTRX:
      'TRX را به آدرس زیر ارسال کنید، سپس Transaction Hash را ثبت کنید.',
    depositAddress: 'آدرس واریز',
    copyAddress: '📋 کپی آدرس',
    addressCopied: '✅ آدرس کپی شد',
    copyFailed: '❌ کپی ناموفق بود',
    amountTRX: 'مقدار (TRX)',
    enterAmount: 'مقدار TRX را وارد کنید',
    transactionHash: 'Transaction Hash',
    enterTransactionHash: 'Transaction Hash را وارد کنید',
    submitDeposit: 'ثبت واریز',
    submitting: 'در حال ثبت...',
    enterAmountHash:
      'لطفاً مقدار و Transaction Hash را وارد کنید.',
    openFromTelegram:
      'لطفاً Daily TRX را از Telegram باز کنید.',
    depositSubmitted:
      '✅ واریز ثبت شد. منتظر تأیید است.',
    depositFailed:
      'ثبت واریز ناموفق بود.',

    withdrawTitle: 'برداشت',
    withdrawNotice:
      'درخواست برداشت نیاز به تأیید Backend و تأیید مدیر دارد.',

    investmentPlans: 'طرح‌های سرمایه‌گذاری',
    loadingPlans: 'طرح‌های سرمایه‌گذاری در حال بارگذاری...',
    noPlans: 'هیچ طرح سرمایه‌گذاری موجود نیست.',
    investment: 'سرمایه‌گذاری',
    dailyProfit: 'سود روزانه',
    duration: 'مدت',
    totalProfit: 'سود کل',
    days: 'روز',
    investNow: 'سرمایه‌گذاری',
    processing: 'در حال پردازش...',
    confirmInvestment:
      'آیا می‌خواهید در این طرح سرمایه‌گذاری کنید؟',
    investmentCreated:
      '✅ سرمایه‌گذاری با موفقیت ثبت شد.',
    investmentFailed:
      'سرمایه‌گذاری ناموفق بود.',
    couldNotLoadPlans:
      'طرح‌های سرمایه‌گذاری بارگذاری نشد.',

    myReferral: 'معرفی من',
    notAvailable: 'در دسترس نیست',
    team: 'تیم',
    users: 'کاربر',

    available: 'موجودی قابل استفاده',
    locked: 'موجودی قفل‌شده',
    loading: 'در حال بارگذاری...',
    couldNotLoadWallet:
      '❌ موجودی کیف پول بارگذاری نشد.',

    noNotifications: 'اعلانی وجود ندارد.',
    moduleReady:
      'این بخش برای اتصال Backend آماده است.',

    adminPanel: 'پنل مدیریت',
    announcementTitle: 'عنوان اعلان',
    announcementMessage: 'متن اعلان',
    imageUrl: 'آدرس تصویر',
    startTime: 'زمان شروع',
    endTime: 'زمان پایان',
    active: 'فعال',
    createAnnouncement: 'ایجاد اعلان',
    creatingAnnouncement: 'در حال ایجاد...',
    announcementCreated:
      '✅ اعلان با موفقیت ایجاد شد.',
    announcementFailed:
      'ایجاد اعلان ناموفق بود.',
    adminAccessDenied:
      'دسترسی مجاز نیست.'
  },


  ur: {
    dashboard: 'ڈیش بورڈ',
    wallet: 'والیٹ',
    deposit: 'جمع کروائیں',
    withdraw: 'رقم نکلوائیں',
    investment: 'سرمایہ کاری',
    referral: 'ریفرل',
    notifications: 'اطلاعات',
    support: 'مدد',
    profile: 'پروفائل',
    admin: 'ایڈمن',

    language: 'زبان',
    english: 'English',
    pashto: 'پښتو',
    persian: 'فارسی',
    urdu: 'اردو',

    depositTRX: 'TRX جمع کروائیں',
    sendTRX:
      'TRX نیچے دیے گئے ایڈریس پر بھیجیں، پھر Transaction Hash جمع کریں۔',
    depositAddress: 'جمع کرنے کا ایڈریس',
    copyAddress: '📋 ایڈریس کاپی کریں',
    addressCopied: '✅ ایڈریس کاپی ہوگیا',
    copyFailed: '❌ کاپی ناکام ہوگئی',
    amountTRX: 'رقم (TRX)',
    enterAmount: 'TRX رقم درج کریں',
    transactionHash: 'Transaction Hash',
    enterTransactionHash: 'Transaction Hash درج کریں',
    submitDeposit: 'جمع کروائیں',
    submitting: 'جمع ہو رہا ہے...',
    enterAmountHash:
      'براہ کرم رقم اور Transaction Hash درج کریں۔',
    openFromTelegram:
      'براہ کرم Daily TRX کو Telegram سے کھولیں۔',
    depositSubmitted:
      '✅ ڈپازٹ جمع ہوگیا۔ تصدیق کا انتظار ہے۔',
    depositFailed:
      'ڈپازٹ جمع نہیں ہوسکا۔',

    withdrawTitle: 'رقم نکلوائیں',
    withdrawNotice:
      'رقم نکلوانے کی درخواست Backend کی تصدیق اور Admin کی منظوری کی ضرورت ہے۔',

    investmentPlans: 'سرمایہ کاری کے منصوبے',
    loadingPlans: 'سرمایہ کاری کے منصوبے لوڈ ہو رہے ہیں...',
    noPlans: 'کوئی سرمایہ کاری منصوبہ دستیاب نہیں۔',
    investment: 'سرمایہ کاری',
    dailyProfit: 'روزانہ منافع',
    duration: 'مدت',
    totalProfit: 'کل منافع',
    days: 'دن',
    investNow: 'ابھی سرمایہ کاری کریں',
    processing: 'پروسیسنگ...',
    confirmInvestment:
      'کیا آپ اس منصوبے میں سرمایہ کاری کرنا چاہتے ہیں؟',
    investmentCreated:
      '✅ سرمایہ کاری کامیابی سے درج ہوگئی۔',
    investmentFailed:
      'سرمایہ کاری ناکام ہوگئی۔',
    couldNotLoadPlans:
      'سرمایہ کاری کے منصوبے لوڈ نہیں ہوسکے۔',

    myReferral: 'میرا ریفرل',
    notAvailable: 'دستیاب نہیں',
    team: 'ٹیم',
    users: 'صارفین',

    available: 'دستیاب بیلنس',
    locked: 'لاک شدہ بیلنس',
    loading: 'لوڈ ہو رہا ہے...',
    couldNotLoadWallet:
      '❌ والیٹ بیلنس لوڈ نہیں ہوسکا۔',

    noNotifications: 'کوئی اطلاعات نہیں۔',
    moduleReady:
      'یہ حصہ Backend کنکشن کے لیے تیار ہے۔',

    adminPanel: 'ایڈمن پینل',
    announcementTitle: 'اعلان کا عنوان',
    announcementMessage: 'اعلان کا پیغام',
    imageUrl: 'تصویر کا URL',
    startTime: 'شروع ہونے کا وقت',
    endTime: 'ختم ہونے کا وقت',
    active: 'فعال',
    createAnnouncement: 'اعلان بنائیں',
    creatingAnnouncement: 'بنایا جا رہا ہے...',
    announcementCreated:
      '✅ اعلان کامیابی سے بن گیا۔',
    announcementFailed:
      'اعلان نہیں بن سکا۔',
    adminAccessDenied:
      'رسائی کی اجازت نہیں ہے۔'
  }

};


/* =========================
   LANGUAGE SYSTEM
========================= */

let currentLanguage =
  localStorage.getItem('daily_trx_language') || 'en';


function t(key) {

  return (
    translations[currentLanguage]?.[key] ||
    translations.en[key] ||
    key
  );
}


function setLanguage(language) {

  if (!translations[language]) {
    return;
  }

  currentLanguage = language;

  localStorage.setItem(
    'daily_trx_language',
    language
  );

  applyLanguage();

  const activePage =
    document.querySelector(
      '.bottom button.active'
    )?.dataset.page;

  if (activePage) {
    render(activePage);
  }
}


function applyLanguage() {

  document.documentElement.lang =
    currentLanguage === 'ps'
      ? 'ps'
      : currentLanguage === 'fa'
        ? 'fa'
        : currentLanguage === 'ur'
          ? 'ur'
          : 'en';

  document.querySelectorAll(
    '.bottom button[data-page]'
  ).forEach(button => {

    const key =
      button.dataset.page;

    if (translations[currentLanguage]?.[key]) {

      button.textContent =
        translations[currentLanguage][key];

    }

  });

}


function languageSelector() {

  return `
    <div
      style="
        margin-bottom:14px;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        gap:8px;
      "
    >

      <span style="font-size:13px;">
        🌐 ${t('language')}
      </span>

      <select
        id="languageSelect"
        style="
          padding:8px 10px;
          border-radius:9px;
          border:1px solid #ccc;
          background:inherit;
          color:inherit;
        "
      >

        <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>
          ${t('english')}
        </option>

        <option value="ps" ${currentLanguage === 'ps' ? 'selected' : ''}>
          ${t('pashto')}
        </option>

        <option value="fa" ${currentLanguage === 'fa' ? 'selected' : ''}>
          ${t('persian')}
        </option>

        <option value="ur" ${currentLanguage === 'ur' ? 'selected' : ''}>
          ${t('urdu')}
        </option>

      </select>

    </div>
  `;
}


function setupLanguageSelector() {

  const selector =
    document.getElementById(
      'languageSelect'
    );

  if (!selector) {
    return;
  }

  selector.addEventListener(
    'change',
    event => {

      setLanguage(
        event.target.value
      );

    }
  );

}


/* =========================
   ADMIN BUTTON
========================= */

function setupAdminButton() {

  const telegramUser =
    telegramApp?.initDataUnsafe?.user;

  if (
    String(telegramUser?.id || '') !==
    ADMIN_TELEGRAM_ID
  ) {
    return;
  }

  const bottom =
    document.querySelector('.bottom');

  if (!bottom) {
    return;
  }

  if (
    bottom.querySelector(
      '[data-page="admin"]'
    )
  ) {
    return;
  }

  const adminButton =
    document.createElement('button');

  adminButton.type = 'button';
  adminButton.dataset.page = 'admin';
  adminButton.textContent = t('admin');

  bottom.appendChild(adminButton);
}


/* =========================
   TITLES
========================= */

const titles = {
  home: 'dashboard',
  wallet: 'wallet',
  deposit: 'deposit',
  withdraw: 'withdraw',
  investment: 'investment',
  referral: 'referral',
  notifications: 'notifications',
  support: 'support',
  profile: 'profile',
  admin: 'admin'
};


/* =========================
   RENDER
========================= */

function render(p) {

  document.querySelectorAll(
    '.bottom button'
  ).forEach(b => {

    b.classList.toggle(
      'active',
      b.dataset.page === p
    );

  });


  let content = '';


  if (p === 'deposit') {

    content = `

      ${languageSelector()}

      <h2>${t('depositTRX')}</h2>

      <div class="notice">
        ${t('sendTRX')}
      </div>

      <div class="stats">

        <div style="text-align:center;width:100%;">

          <small>${t('depositAddress')}</small>

          <div style="margin:15px auto;">

            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
              alt="TRX Deposit QR Code"
              style="
                width:220px;
                height:220px;
                border-radius:12px;
                background:#fff;
                padding:8px;
                box-sizing:border-box;
              "
            >

          </div>

          <strong
            id="depositAddress"
            style="
              font-size:12px;
              word-break:break-all;
              display:block;
              margin:10px 0;
            "
          >
            ${DEPOSIT_ADDRESS}
          </strong>

          <button
            id="copyDepositAddress"
            type="button"
            style="
              width:100%;
              padding:12px;
              margin-top:8px;
              border:0;
              border-radius:10px;
              cursor:pointer;
            "
          >
            ${t('copyAddress')}
          </button>

        </div>

      </div>


      <label>${t('amountTRX')}</label>

      <input
        id="depositAmount"
        type="number"
        min="1"
        step="0.000001"
        placeholder="${t('enterAmount')}"
        style="
          width:100%;
          box-sizing:border-box;
          margin:8px 0;
          padding:12px;
          border-radius:10px;
          border:1px solid #ccc;
        "
      >


      <label>${t('transactionHash')}</label>

      <input
        id="depositTx"
        type="text"
        placeholder="${t('enterTransactionHash')}"
        autocomplete="off"
        style="
          width:100%;
          box-sizing:border-box;
          margin:8px 0;
          padding:12px;
          border-radius:10px;
          border:1px solid #ccc;
        "
      >


      <button
        id="submitDeposit"
        style="
          width:100%;
          padding:13px;
          margin-top:10px;
          border:0;
          border-radius:10px;
          cursor:pointer;
        "
      >
        ${t('submitDeposit')}
      </button>


      <div
        id="depositMessage"
        style="
          margin-top:12px;
          text-align:center;
        "
      ></div>
    `;


  } else if (p === 'withdraw') {

    content = `

      ${languageSelector()}

      <h2>${t('withdrawTitle')}</h2>

      <div class="notice">
        ${t('withdrawNotice')}
      </div>

    `;


  } else if (p === 'investment') {

    content = `

      ${languageSelector()}

      <h2>${t('investmentPlans')}</h2>

      <div
        id="investmentMessage"
        style="
          margin:12px 0;
          text-align:center;
        "
      >
        ${t('loadingPlans')}
      </div>

      <div
        id="investmentPlans"
        style="
          display:grid;
          gap:14px;
        "
      ></div>

    `;


  } else if (p === 'referral') {

    content = `

      ${languageSelector()}

      <h2>${t('referral')}</h2>

      <div class="stats">

        <div>
          <small>${t('myReferral')}</small>
          <strong>${t('notAvailable')}</strong>
        </div>

        <div>
          <small>${t('team')}</small>
          <strong>0 ${t('users')}</strong>
        </div>

      </div>

    `;


  } else if (p === 'wallet') {

    content = `

      ${languageSelector()}

      <h2>${t('wallet')}</h2>

      <div class="stats">

        <div>

          <small>${t('available')}</small>

          <strong id="availableBalance">
            ${t('loading')}
          </strong>

        </div>


        <div>

          <small>${t('locked')}</small>

          <strong id="lockedBalance">
            ${t('loading')}
          </strong>

        </div>

      </div>


      <div
        id="walletMessage"
        style="
          margin-top:12px;
          text-align:center;
        "
      ></div>

    `;


  } else if (p === 'notifications') {

    content = `

      ${languageSelector()}

      <h2>${t('notifications')}</h2>

      <div class="notice">
        ${t('noNotifications')}
      </div>

    `;


  } else if (p === 'admin') {

    const telegramUser =
      telegramApp?.initDataUnsafe?.user;

    if (
      String(telegramUser?.id || '') !==
      ADMIN_TELEGRAM_ID
    ) {

      content = `

        ${languageSelector()}

        <h2>${t('admin')}</h2>

        <div class="notice">
          ${t('adminAccessDenied')}
        </div>

      `;

    } else {

      content = `

        ${languageSelector()}

        <h2>${t('adminPanel')}</h2>

        <div
          class="stats"
          style="
            display:block;
            padding:18px;
          "
        >

          <label
            for="announcementTitle"
            style="
              display:block;
              margin-bottom:6px;
            "
          >
            ${t('announcementTitle')}
          </label>

          <input
            id="announcementTitle"
            type="text"
            placeholder="${t('announcementTitle')}"
            style="
              width:100%;
              box-sizing:border-box;
              padding:12px;
              margin-bottom:14px;
              border-radius:10px;
              border:1px solid #ccc;
            "
          >


          <label
            for="announcementMessage"
            style="
              display:block;
              margin-bottom:6px;
            "
          >
            ${t('announcementMessage')}
          </label>

          <textarea
            id="announcementMessage"
            rows="5"
            placeholder="${t('announcementMessage')}"
            style="
              width:100%;
              box-sizing:border-box;
              padding:12px;
              margin-bottom:14px;
              border-radius:10px;
              border:1px solid #ccc;
              resize:vertical;
            "
          ></textarea>


          <label
            for="announcementImage"
            style="
              display:block;
              margin-bottom:6px;
            "
          >
            ${t('imageUrl')}
          </label>

          <input
            id="announcementImage"
            type="url"
            placeholder="https://example.com/image.jpg"
            style="
              width:100%;
              box-sizing:border-box;
              padding:12px;
              margin-bottom:14px;
              border-radius:10px;
              border:1px solid #ccc;
            "
          >


          <label
            for="announcementStart"
            style="
              display:block;
              margin-bottom:6px;
            "
          >
            ${t('startTime')}
          </label>

          <input
            id="announcementStart"
            type="datetime-local"
            style="
              width:100%;
              box-sizing:border-box;
              padding:12px;
              margin-bottom:14px;
              border-radius:10px;
              border:1px solid #ccc;
            "
          >


          <label
            for="announcementEnd"
            style="
              display:block;
              margin-bottom:6px;
            "
          >
            ${t('endTime')}
          </label>

          <input
            id="announcementEnd"
            type="datetime-local"
            style="
              width:100%;
              box-sizing:border-box;
              padding:12px;
              margin-bottom:14px;
              border-radius:10px;
              border:1px solid #ccc;
            "
          >


          <label
            style="
              display:flex;
              align-items:center;
              gap:8px;
              margin-bottom:14px;
              cursor:pointer;
            "
          >

            <input
              id="announcementActive"
              type="checkbox"
              checked
              style="
                width:18px;
                height:18px;
              "
            >

            <span>
              ${t('active')}
            </span>

          </label>


          <button
            id="createAnnouncement"
            type="button"
            style="
              width:100%;
              padding:14px;
              border:0;
              border-radius:12px;
              cursor:pointer;
              font-weight:600;
            "
          >
            ${t('createAnnouncement')}
          </button>


          <div
            id="announcementAdminMessage"
            style="
              margin-top:14px;
              text-align:center;
              line-height:1.5;
            "
          ></div>

        </div>

      `;

    }


  } else {

    content = `

      ${languageSelector()}

      <h2>
        ${t(titles[p] || 'dashboard')}
      </h2>

      <div class="notice">
        ${t('moduleReady')}
      </div>

    `;

  }


  page.innerHTML =
    content;


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });


  setupLanguageSelector();


  if (p === 'deposit') {
    setupDeposit();
  }


  if (p === 'wallet') {
    setupWallet();
  }


  if (p === 'investment') {
    setupInvestment();
  }


  if (p === 'admin') {
    setupAdminAnnouncement();
  }


  applyLanguage();

}


/* =========================
   DEPOSIT
========================= */

function setupDeposit() {

  const button =
    document.getElementById(
      'submitDeposit'
    );

  const copyButton =
    document.getElementById(
      'copyDepositAddress'
    );


  if (copyButton) {

    copyButton.addEventListener(
      'click',
      async () => {

        try {

          await navigator.clipboard.writeText(
            DEPOSIT_ADDRESS
          );

          copyButton.textContent =
            t('addressCopied');


          setTimeout(() => {

            copyButton.textContent =
              t('copyAddress');

          }, 2000);

        } catch (error) {

          copyButton.textContent =
            t('copyFailed');


          setTimeout(() => {

            copyButton.textContent =
              t('copyAddress');

          }, 2000);

        }

      }
    );

  }


  if (!button) {
    return;
  }


  button.addEventListener(
    'click',
    async () => {

      const amount =
        document
          .getElementById(
            'depositAmount'
          )
          .value
          .trim();


      const txHash =
        document
          .getElementById(
            'depositTx'
          )
          .value
          .trim();


      const message =
        document.getElementById(
          'depositMessage'
        );


      if (!amount || !txHash) {

        message.textContent =
          t('enterAmountHash');

        return;
      }


      const telegramUser =
        telegramApp?.initDataUnsafe?.user;


      if (!telegramUser?.id) {

        message.textContent =
          t('openFromTelegram');

        return;
      }


      button.disabled =
        true;

      button.textContent =
        t('submitting');


      try {

        const response =
          await fetch(
            '/api/deposit',
            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({

                telegram_chat_id:
                  String(
                    telegramUser.id
                  ),

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
            data.message ||
            t('depositFailed')
          );

        }


        message.textContent =
          t('depositSubmitted');


        document.getElementById(
          'depositAmount'
        ).value = '';


        document.getElementById(
          'depositTx'
        ).value = '';


      } catch (error) {

        message.textContent =
          '❌ ' +
          (
            error.message ||
            t('depositFailed')
          );

      } finally {

        button.disabled =
          false;

        button.textContent =
          t('submitDeposit');

      }

    }
  );

}


/* =========================
   WALLET
========================= */

async function setupWallet() {

  const available =
    document.getElementById(
      'availableBalance'
    );


  const locked =
    document.getElementById(
      'lockedBalance'
    );


  const message =
    document.getElementById(
      'walletMessage'
    );


  const telegramUser =
    telegramApp?.initDataUnsafe?.user;


  if (!telegramUser?.id) {

    available.textContent =
      '0 TRX';

    locked.textContent =
      '0 TRX';

    message.textContent =
      t('openFromTelegram');

    return;
  }


  try {

    const response =
      await fetch(
        `/api/wallet?telegram_chat_id=${encodeURIComponent(
          String(
            telegramUser.id
          )
        )}`
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        'Could not load wallet'
      );

    }


    available.textContent =
      `${Number(
        data.available_trx || 0
      ).toFixed(6)} TRX`;


    locked.textContent =
      `${Number(
        data.locked_trx || 0
      ).toFixed(6)} TRX`;


    message.textContent =
      '';


  } catch (error) {

    available.textContent =
      '0 TRX';

    locked.textContent =
      '0 TRX';

    message.textContent =
      t('couldNotLoadWallet');

  }

}


/* =========================
   INVESTMENT
========================= */

async function setupInvestment() {

  const plansContainer =
    document.getElementById(
      'investmentPlans'
    );


  const message =
    document.getElementById(
      'investmentMessage'
    );


  const telegramUser =
    telegramApp?.initDataUnsafe?.user;


  if (!telegramUser?.id) {

    message.textContent =
      t('openFromTelegram');

    return;
  }


  try {

    const response =
      await fetch(
        '/api/investment-plans'
      );


    const data =
      await response.json();


    if (
      !response.ok ||
      !data.ok
    ) {

      throw new Error(
        data.message ||
        t('couldNotLoadPlans')
      );

    }


    const plans =
      Array.isArray(data.plans)
        ? data.plans
        : [];


    if (!plans.length) {

      message.textContent =
        t('noPlans');

      return;
    }


    message.textContent =
      '';


    plansContainer.innerHTML =
      plans.map(
        plan => {

          const amount =
            Number(
              plan.amount_trx || 0
            );


          const daily =
            Number(
              plan.daily_profit_trx || 0
            );


          const duration =
            Number(
              plan.duration_days || 0
            );


          const totalProfit =
            daily * duration;


          return `

            <div
              class="stats"
              style="display:block;"
            >

              <div
                style="margin-bottom:10px;"
              >

                <strong
                  style="
                    font-size:18px;
                    display:block;
                  "
                >
                  ${escapeHtml(
                    plan.name
                  )}
                </strong>

              </div>


              <div
                style="
                  display:grid;
                  grid-template-columns:
                    1fr 1fr;
                  gap:10px;
                "
              >

                <div>

                  <small>
                    ${t('investment')}
                  </small>

                  <strong>
                    ${formatTRX(amount)}
                  </strong>

                </div>


                <div>

                  <small>
                    ${t('dailyProfit')}
                  </small>

                  <strong>
                    ${formatTRX(daily)}
                  </strong>

                </div>


                <div>

                  <small>
                    ${t('duration')}
                  </small>

                  <strong>
                    ${duration}
                    ${t('days')}
                  </strong>

                </div>


                <div>

                  <small>
                    ${t('totalProfit')}
                  </small>

                  <strong>
                    ${formatTRX(totalProfit)}
                  </strong>

                </div>

              </div>


              <button
                class="investButton"
                data-plan-id="${plan.id}"
                style="
                  width:100%;
                  padding:13px;
                  margin-top:14px;
                  border:0;
                  border-radius:10px;
                  cursor:pointer;
                "
              >
                ${t('investNow')}
              </button>

            </div>

          `;

        }
      ).join('');


    document
      .querySelectorAll(
        '.investButton'
      )
      .forEach(
        button => {

          button.addEventListener(
            'click',
            () => {

              investInPlan(
                button,
                button.dataset.planId
              );

            }
          );

        }
      );


  } catch (error) {

    message.textContent =
      '❌ ' +
      (
        error.message ||
        t('couldNotLoadPlans')
      );

  }

}


/* =========================
   CREATE INVESTMENT
========================= */

async function investInPlan(
  button,
  planId
) {

  const telegramUser =
    telegramApp?.initDataUnsafe?.user;


  if (!telegramUser?.id) {

    alert(
      t('openFromTelegram')
    );

    return;
  }


  const confirmed =
    window.confirm(
      t('confirmInvestment')
    );


  if (!confirmed) {
    return;
  }


  button.disabled =
    true;

  button.textContent =
    t('processing');


  try {

    const response =
      await fetch(
        '/api/create-investment',
        {

          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({

            telegram_chat_id:
              String(
                telegramUser.id
              ),

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
        t('investmentFailed')
      );

    }


    alert(
      t('investmentCreated')
    );


    await setupInvestment();


  } catch (error) {

    alert(
      '❌ ' +
      (
        error.message ||
        t('investmentFailed')
      )
    );


    button.disabled =
      false;

    button.textContent =
      t('investNow');

  }

}


/* =========================
   ADMIN ANNOUNCEMENT
========================= */

function setupAdminAnnouncement() {

  const telegramUser =
    telegramApp?.initDataUnsafe?.user;


  if (
    String(telegramUser?.id || '') !==
    ADMIN_TELEGRAM_ID
  ) {
    return;
  }


  const button =
    document.getElementById(
      'createAnnouncement'
    );


  if (!button) {
    return;
  }


  button.addEventListener(
    'click',
    async () => {

      const title =
        document
          .getElementById(
            'announcementTitle'
          )
          .value
          .trim();


      const message =
        document
          .getElementById(
            'announcementMessage'
          )
          .value
          .trim();


      const imageUrl =
        document
          .getElementById(
            'announcementImage'
          )
          .value
          .trim();


      const startsAt =
        document
          .getElementById(
            'announcementStart'
          )
          .value;


      const endsAt =
        document
          .getElementById(
            'announcementEnd'
          )
          .value;


      const active =
        document
          .getElementById(
            'announcementActive'
          )
          .checked;


      const result =
        document.getElementById(
          'announcementAdminMessage'
        );


      if (
        !title ||
        !message ||
        !startsAt
      ) {

        result.textContent =
          '❌ Title, message and start time are required.';

        return;
      }


      button.disabled =
        true;

      button.textContent =
        t('creatingAnnouncement');

      result.textContent =
        '';


      try {

        const response =
          await fetch(
            '/api/admin/announcement',
            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({

                telegram_chat_id:
                  String(
                    telegramUser.id
                  ),

                title:
                  title,

                message:
                  message,

                image_url:
                  imageUrl || null,

                starts_at:
                  new Date(
                    startsAt
                  ).toISOString(),

                ends_at:
                  endsAt
                    ? new Date(
                        endsAt
                      ).toISOString()
                    : null,

                active:
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
            data.message ||
            t('announcementFailed')
          );

        }


        result.textContent =
          t('announcementCreated');


        document.getElementById(
          'announcementTitle'
        ).value = '';


        document.getElementById(
          'announcementMessage'
        ).value = '';


        document.getElementById(
          'announcementImage'
        ).value = '';


        document.getElementById(
          'announcementStart'
        ).value = '';


        document.getElementById(
          'announcementEnd'
        ).value = '';


        document.getElementById(
          'announcementActive'
        ).checked = true;


      } catch (error) {

        result.textContent =
          '❌ ' +
          (
            error.message ||
            t('announcementFailed')
          );

      } finally {

        button.disabled =
          false;

        button.textContent =
          t('createAnnouncement');

      }

    }
  );

}


/* =========================
   HELPERS
========================= */

function formatTRX(value) {

  const number =
    Number(value || 0);


  return (
    number.toLocaleString(
      undefined,
      {
        maximumFractionDigits: 6
      }
    ) +
    ' TRX'
  );

}


function escapeHtml(value) {

  return String(
    value ?? ''
  )
    .replaceAll(
      '&',
      '&amp;'
    )
    .replaceAll(
      '<',
      '&lt;'
    )
    .replaceAll(
      '>',
      '&gt;'
    )
    .replaceAll(
      '"',
      '&quot;'
    )
    .replaceAll(
      "'",
      '&#039;'
    );

}


/* =========================
   NAVIGATION
========================= */

document.addEventListener(
  'click',
  e => {

    const b =
      e.target.closest(
        '[data-page]'
      );


    if (b) {

      render(
        b.dataset.page
      );

    }

  }
);


/* =========================
   THEME
========================= */

const themeButton =
  document.getElementById(
    'themeBtn'
  );


if (themeButton) {

  themeButton.onclick =
    () => {

      document.body.classList.toggle(
        'light'
      );


      themeButton.textContent =
        document.body.classList.contains(
          'light'
        )
          ? '☀'
          : '☾';

    };

}


/* =========================
   INITIAL LANGUAGE
========================= */

applyLanguage();


/* =========================
   ADMIN BUTTON INIT
========================= */

setupAdminButton();


/* =========================
   GLOBAL ANNOUNCEMENT POPUP
========================= */

async function loadGlobalAnnouncement() {

  try {

    const response =
      await fetch(
        '/api/global-announcement'
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


    const announcement =
      data.announcement;


    const storageKey =
      `daily_trx_announcement_${announcement.id}`;


    const closedAt =
      Number(
        localStorage.getItem(
          storageKey
        ) || 0
      );


    const twentyFourHours =
      24 * 60 * 60 * 1000;


    if (
      closedAt &&
      Date.now() - closedAt <
        twentyFourHours
    ) {
      return;
    }


    showGlobalAnnouncement(
      announcement,
      storageKey
    );


  } catch (error) {

    console.error(
      'Announcement error:',
      error
    );

  }

}


function showGlobalAnnouncement(
  announcement,
  storageKey
) {

  const oldPopup =
    document.getElementById(
      'globalAnnouncementPopup'
    );


  if (oldPopup) {
    oldPopup.remove();
  }


  const popup =
    document.createElement(
      'div'
    );


  popup.id =
    'globalAnnouncementPopup';


  popup.style.cssText = `
    position:fixed;
    inset:0;
    z-index:99999;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
    background:rgba(0,0,0,.72);
    backdrop-filter:blur(8px);
  `;


  popup.innerHTML = `

    <div
      style="
        width:100%;
        max-width:420px;
        max-height:85vh;
        overflow:auto;
        position:relative;
        border-radius:22px;
        padding:18px;
        background:
          linear-gradient(
            145deg,
            #161616,
            #252525
          );
        color:#fff;
        box-shadow:
          0 20px 60px
          rgba(0,0,0,.45);
      "
    >

      <button
        id="closeAnnouncement"
        type="button"
        aria-label="Close"
        style="
          position:absolute;
          right:12px;
          top:12px;
          width:36px;
          height:36px;
          border:0;
          border-radius:50%;
          background:rgba(255,255,255,.14);
          color:#fff;
          font-size:20px;
          cursor:pointer;
          z-index:2;
        "
      >
        ×
      </button>


      ${
        announcement.image_url
          ? `
            <img
              src="${escapeHtml(
                announcement.image_url
              )}"
              alt=""
              style="
                width:100%;
                max-height:260px;
                object-fit:cover;
                border-radius:16px;
                display:block;
                margin-bottom:16px;
              "
            >
          `
          : ''
      }


      <h2
        style="
          margin:4px 40px 10px 0;
          font-size:22px;
        "
      >
        ${escapeHtml(
          announcement.title
        )}
      </h2>


      <div
        style="
          line-height:1.6;
          font-size:15px;
          white-space:pre-wrap;
          opacity:.92;
        "
      >
        ${escapeHtml(
          announcement.message
        )}
      </div>

    </div>

  `;


  document.body.appendChild(
    popup
  );


  const closeButton =
    document.getElementById(
      'closeAnnouncement'
    );


  closeButton.addEventListener(
    'click',
    () => {

      localStorage.setItem(
        storageKey,
        String(
          Date.now()
        )
      );


      popup.remove();

    }
  );

}


/* =========================
   LOAD ANNOUNCEMENT
========================= */

loadGlobalAnnouncement();
