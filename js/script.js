const currentEl = document.querySelector('.research .current');
const totalEl = document.querySelector('.research .total');
const barEl = document.querySelector('.research .bar');

let remainingTime = 0;
let isPaused = false;

const researchSwiper = new Swiper('.research-swiper', {
  loop: true,
  speed: 700,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.research .research-nav .swiper-button-next',
    prevEl: '.research .research-nav .swiper-button-prev',
  },
  on: {
    init(swiper){
      updateResearchUI(swiper);
      startProgress(swiper, swiper.params.autoplay.delay);
    },
    slideChangeTransitionStart(swiper){
      if(!isPaused){
        updateResearchUI(swiper);
        startProgress(swiper, swiper.params.autoplay.delay);
      }
    }
  }
});

function startProgress(swiper, duration){
  if(!barEl) return;

  barEl.style.transition = 'none';
  barEl.style.width = '0%';
  barEl.offsetWidth;
  barEl.style.transition = `width ${duration}ms linear`;
  barEl.style.width = '100%';
  remainingTime = duration;
}

function pauseProgress(swiper){
  const computedWidth = getComputedStyle(barEl).width;
  const totalWidth = barEl.parentElement.offsetWidth;

  const percent = parseFloat(computedWidth) / totalWidth;
  remainingTime = swiper.params.autoplay.delay * (1 - percent);

  barEl.style.transition = 'none';
  barEl.style.width = computedWidth;
}

function resumeProgress(swiper){
  if(!barEl) return;

  barEl.offsetWidth;
  barEl.style.transition = `width ${remainingTime}ms linear`;
  barEl.style.width = '100%';
}

function updateResearchUI(swiper){
  if(!currentEl || !totalEl) return;

  const realIndex = swiper.realIndex + 1;
  const total = document.querySelectorAll(
    '.research-swiper .swiper-slide:not(.swiper-slide-duplicate)'
  ).length;

  currentEl.textContent = String(realIndex).padStart(2,'0');
  totalEl.textContent   = String(total).padStart(2,'0');
}

const researchPause = document.querySelector('.research .pause-btn');
const researchPlay  = document.querySelector('.research .play-btn');

if(researchPause && researchPlay){

  researchPause.addEventListener('click', ()=>{
    researchSwiper.autoplay.stop();
    isPaused = true;

    pauseProgress(researchSwiper);

    researchPause.style.display='none';
    researchPlay.style.display='flex';
  });

  researchPlay.addEventListener('click', ()=>{
    researchSwiper.autoplay.start();
    isPaused = false;

    resumeProgress(researchSwiper);

    researchPlay.style.display='none';
    researchPause.style.display='flex';
  });

}

const photoSwiper = new Swiper('.photo-swiper', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  pagination: {
    el: '.photo-pagination',
    clickable: true,
  }
});

const photoPause = document.querySelector('.photo-swiper .pause-btn');
const photoPlay  = document.querySelector('.photo-swiper .play-btn');

if(photoPause && photoPlay){
  photoPause.addEventListener('click', ()=>{
    photoSwiper.autoplay.stop();
    photoPause.style.display='none';
    photoPlay.style.display='flex';
  });

  photoPlay.addEventListener('click', ()=>{
    photoSwiper.autoplay.start();
    photoPlay.style.display='none';
    photoPause.style.display='flex';
  });
}

import { newsData } from "./newsData.js";

const tabs = document.querySelectorAll(".news-tab");
const list = document.querySelector(".news-list");
const moreBtn = document.querySelector(".news-more");

const today = new Date();
function diffDays(dateStr) {
  const target = new Date(dateStr);
  return Math.floor((today - target) / (1000 * 60 * 60 * 24));
}
function renderNews(type) {
  list.innerHTML = "";
  let filtered = [];
  if (type === "ALL") {
    filtered = [...newsData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    moreBtn.hidden = true;
  } else {
    filtered = newsData
      .filter(v => v.id === type)
      .slice(0, 5);
    moreBtn.hidden = false;
  }
  filtered.forEach(item => {
    const isNew = diffDays(item.date) <= 7;
    const li = document.createElement("li");
    li.className = "news-item";
    li.innerHTML = `
      <a href="#none">
        <span class="category ${item.class}">${item.id}</span>
        <p class="title">
          ${item.title}
          ${isNew ? `<span class="new">N</span>` : ""}
        </p>
        <span class="date">${item.date}</span>
      </a>
    `;

    list.appendChild(li);
  });
}
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const type = tab.dataset.type;
    renderNews(type);
  });
});

renderNews("ALL");

var pzoneSwiper = new Swiper(".popupzoneSwiper", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".popupzone-pagination",
  },
});

const pzonePause = document.querySelector('.popup-pause-btn');
const pzonePlay  = document.querySelector('.popup-play-btn');

if(pzonePause && pzonePlay){

  pzonePause.addEventListener('click', ()=>{
    pzoneSwiper.autoplay.stop();
    isPaused = true;
    pzonePause.style.display='none';
    pzonePlay.style.display='flex';
  });

  pzonePlay.addEventListener('click', ()=>{
    pzoneSwiper.autoplay.start();
    isPaused = false;

    pzonePlay.style.display='none';
    pzonePause.style.display='flex';
  });

}