const tg = window.Telegram?.WebApp;
if(tg){tg.ready();tg.expand();}

setTimeout(()=>{document.getElementById('splash').classList.add('hidden');document.getElementById('app').classList.remove('hidden')},1100);

const page=document.getElementById('page');
const titles={home:'Dashboard',wallet:'Wallet',deposit:'Deposit',withdraw:'Withdraw',investment:'Investment',referral:'Referral',notifications:'Notifications',support:'Support',profile:'Profile'};

function render(p){
  document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.page===p));
  let content='';
  if(p==='deposit') content=`<h2>Deposit</h2><div class="notice">Deposit processing will be connected to the secure backend and transaction verification layer.</div>`;
  else if(p==='withdraw') content=`<h2>Withdraw</h2><div class="notice">Withdrawal requests require backend validation and admin approval.</div>`;
  else if(p==='investment') content=`<h2>Investment Plans</h2><div class="notice">Plans, duration, return methodology and risk disclosures will be loaded from the backend.</div>`;
  else if(p==='referral') content=`<h2>Referral</h2><div class="stats"><div><small>My Referral</small><strong>Not available</strong></div><div><small>Team</small><strong>0 users</strong></div></div>`;
  else if(p==='wallet') content=`<h2>Wallet</h2><div class="stats"><div><small>Available</small><strong>0 TRX</strong></div><div><small>Locked</small><strong>0 TRX</strong></div></div>`;
  else if(p==='notifications') content=`<h2>Notifications</h2><div class="notice">No notifications.</div>`;
  else content=`<h2>${titles[p]||'Dashboard'}</h2><div class="notice">This module is ready for backend integration.</div>`;
  page.innerHTML=content;
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-page]');
 if(b) render(b.dataset.page);
});
document.getElementById('themeBtn').onclick=()=>{
 document.body.classList.toggle('light');
 document.getElementById('themeBtn').textContent=document.body.classList.contains('light')?'☀':'☾';
};
