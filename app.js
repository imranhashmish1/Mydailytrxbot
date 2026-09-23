const telegramApp = window.Telegram?.WebApp;

if (telegramApp) {
  telegramApp.ready();
  telegramApp.expand();
}

const page = document.getElementById('page');

const titles = {
  home: 'Dashboard',
  wallet: 'Wallet',
  deposit: 'Deposit',
  withdraw: 'Withdraw',
  investment: 'Investment',
  referral: 'Referral',
  notifications: 'Notifications',
  support: 'Support',
  profile: 'Profile'
};

const DEPOSIT_ADDRESS =
  'TU9R3KZmkasLZbC3jZPyboEfNPFKfuY4kA';

function render(p) {

  document.querySelectorAll('.bottom button').forEach(b => {
    b.classList.toggle('active', b.dataset.page === p);
  });

  let content = '';

  if (p === 'deposit') {

    content = `
      <h2>Deposit TRX</h2>

      <div class="notice">
        Send TRX to the deposit address below, then submit your transaction hash.
      </div>

      <div class="stats">
        <div style="text-align:center;width:100%;">

          <small>Deposit Address</small>

          <div style="margin:15px auto;">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(DEPOSIT_ADDRESS)}"
              alt="TRX Deposit QR Code"
              style="width:220px;height:220px;border-radius:12px;background:#fff;padding:8px;box-sizing:border-box;"
            >
          </div>

          <strong
            id="depositAddress"
            style="font-size:12px;word-break:break-all;display:block;margin:10px 0;"
          >
            ${DEPOSIT_ADDRESS}
          </strong>

          <button
            id="copyDepositAddress"
            type="button"
            style="width:100%;padding:12px;margin-top:8px;border:0;border-radius:10px;cursor:pointer;"
          >
            📋 Copy Address
          </button>

        </div>
      </div>

      <label>Amount (TRX)</label>

      <input
        id="depositAmount"
        type="number"
        min="1"
        step="0.000001"
        placeholder="Enter TRX amount"
        style="width:100%;box-sizing:border-box;margin:8px 0;padding:12px;border-radius:10px;border:1px solid #ccc;"
      >

      <label>Transaction Hash</label>

      <input
        id="depositTx"
        type="text"
        placeholder="Enter transaction hash"
        autocomplete="off"
        style="width:100%;box-sizing:border-box;margin:8px 0;padding:12px;border-radius:10px;border:1px solid #ccc;"
      >

      <button
        id="submitDeposit"
        style="width:100%;padding:13px;margin-top:10px;border:0;border-radius:10px;cursor:pointer;"
      >
        Submit Deposit
      </button>

      <div id="depositMessage" style="margin-top:12px;text-align:center;"></div>
    `;

  } else if (p === 'withdraw') {

    content = `
      <h2>Withdraw</h2>

      <div class="notice">
        Withdrawal requests require backend validation and admin approval.
      </div>
    `;

  } else if (p === 'investment') {

    content = `
      <h2>Investment Plans</h2>

      <div class="notice">
        Plans, duration, return methodology and risk disclosures will be loaded from the backend.
      </div>
    `;

  } else if (p === 'referral') {

    content = `
      <h2>Referral</h2>

      <div class="stats">
        <div>
          <small>My Referral</small>
          <strong>Not available</strong>
        </div>

        <div>
          <small>Team</small>
          <strong>0 users</strong>
        </div>
      </div>
    `;

  } else if (p === 'wallet') {

    content = `
      <h2>Wallet</h2>

      <div class="stats">
        <div>
          <small>Available</small>
          <strong>0 TRX</strong>
        </div>

        <div>
          <small>Locked</small>
          <strong>0 TRX</strong>
        </div>
      </div>
    `;

  } else if (p === 'notifications') {

    content = `
      <h2>Notifications</h2>
      <div class="notice">No notifications.</div>
    `;

  } else {

    content = `
      <h2>${titles[p] || 'Dashboard'}</h2>

      <div class="notice">
        This module is ready for backend integration.
      </div>
    `;
  }

  page.innerHTML = content;

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  if (p === 'deposit') {
    setupDeposit();
  }
}

function setupDeposit() {

  const button = document.getElementById('submitDeposit');
  const copyButton = document.getElementById('copyDepositAddress');

  if (copyButton) {

    copyButton.addEventListener('click', async () => {

      try {

        await navigator.clipboard.writeText(DEPOSIT_ADDRESS);

        copyButton.textContent = '✅ Address Copied';

        setTimeout(() => {
          copyButton.textContent = '📋 Copy Address';
        }, 2000);

      } catch (error) {

        copyButton.textContent = '❌ Copy failed';

        setTimeout(() => {
          copyButton.textContent = '📋 Copy Address';
        }, 2000);
      }
    });
  }

  if (!button) return;

  button.addEventListener('click', async () => {

    const amount =
      document.getElementById('depositAmount').value.trim();

    const txHash =
      document.getElementById('depositTx').value.trim();

    const message =
      document.getElementById('depositMessage');

    if (!amount || !txHash) {

      message.textContent =
        'Please enter the amount and transaction hash.';

      return;
    }

    const telegramUser =
      telegramApp?.initDataUnsafe?.user;

    if (!telegramUser?.id) {

      message.textContent =
        'Please open Daily TRX from Telegram.';

      return;
    }

    button.disabled = true;
    button.textContent = 'Submitting...';

    try {

      const response = await fetch('/api/deposit', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          telegram_chat_id: String(telegramUser.id),

          amount_trx: amount,

          tx_hash: txHash

        })
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {

        throw new Error(
          data.message || 'Deposit submission failed'
        );
      }

      message.textContent =
        '✅ Deposit submitted. Waiting for verification.';

      document.getElementById('depositAmount').value = '';

      document.getElementById('depositTx').value = '';

    } catch (error) {

      message.textContent =
        '❌ ' + (
          error.message ||
          'Deposit submission failed.'
        );

    } finally {

      button.disabled = false;

      button.textContent = 'Submit Deposit';
    }
  });
}

document.addEventListener('click', e => {

  const b = e.target.closest('[data-page]');

  if (b) {
    render(b.dataset.page);
  }
});

const themeButton =
  document.getElementById('themeBtn');

if (themeButton) {

  themeButton.onclick = () => {

    document.body.classList.toggle('light');

    themeButton.textContent =
      document.body.classList.contains('light')
        ? '☀'
        : '☾';
  };
}
