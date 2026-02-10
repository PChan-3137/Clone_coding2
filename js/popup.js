const Popup = document.getElementById('Popup');
const Close = document.querySelector('.popup-close');
const CloseDate = document.querySelector('.popup-close-date');
const Overlay = document.querySelector('.popup-overlay');
const PopBtn = document.querySelector('.pop-btn');

const todayKey = 'popup-hide-date';

function openPopup(){
  Popup.classList.add('show');
}
function closePopup(){
  Popup.classList.remove('show');
}
function getToday(){
  return new Date().toISOString().slice(0, 10);
}
CloseDate.addEventListener('click', () => {
  localStorage.setItem(todayKey, getToday());
  closePopup();
});

Close.addEventListener('click', closePopup);
Overlay.addEventListener('click', closePopup);

window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closePopup();
});

window.addEventListener('load', () => {
  const savedDate = localStorage.getItem(todayKey);
  if(savedDate !== getToday()){
    openPopup();
  }
});

PopBtn.addEventListener('click', openPopup);