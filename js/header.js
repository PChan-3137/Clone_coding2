const header = document.querySelector('.header');
const logoImg = document.querySelector('.logo img');
const depth1Items = document.querySelectorAll('.depth1');
const scrollTrigger = 50;

function changeLogo() {
  if (header.classList.contains('active')) {
    logoImg.src = 'img/logo-black.png';
  } else {
    logoImg.src = 'img/logo.png';
  }
}
depth1Items.forEach(item => {
  const subMenu = item.querySelector('.sub-menu');
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.sub-menu').forEach(menu => {
      menu.classList.remove('visible');
    });
    if (subMenu) {
      subMenu.classList.add('visible');
    }
    header.classList.add('active');
    changeLogo();
  });
  item.addEventListener('mouseleave', () => {
    if (subMenu) {
      subMenu.classList.remove('visible');
    }
    if (window.scrollY < scrollTrigger) {
      header.classList.remove('active');
      changeLogo();
    }
  });
});
window.addEventListener('scroll', () => {
  if (window.scrollY > scrollTrigger) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
  changeLogo();
});

// 검색창
document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.querySelector('.search ion-icon');
  const searchBox = document.querySelector('.search-container');
  const closeBtn = document.querySelector('.search-close');

  searchIcon.addEventListener('click', () => {
    searchBox.style.opacity = '1';
    searchBox.style.visibility = 'visible';
  });

  closeBtn.addEventListener('click', () => {
    searchBox.style.opacity = '0';
    searchBox.style.visibility = 'hidden';
  });
});

// 모바일
const allMenuBtn = document.querySelector('.allmenu .citemap');
const mobileMenuWrap = document.getElementById('m-nav').parentElement;
const mobileClose = document.querySelector('.mobile-close');
const mNavItems = document.querySelectorAll('.m-nav-inner > li');


allMenuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (window.innerWidth > 1200) {
    return;
  }
  const firstItem = mNavItems[0];
  const firstSub = firstItem.querySelector('.m-nav-submenu');

  mNavItems.forEach(item => {
    item.classList.remove('active');
    const sub = item.querySelector('.m-nav-submenu');
    if (sub) sub.style.display = 'none';
  });

  firstItem.classList.add('active');
  if (firstSub) firstSub.style.display = 'block';
  
  mobileMenuWrap.classList.add('show');
});

mobileClose.addEventListener('click', () => {
  mobileMenuWrap.classList.remove('show');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1200) {
    mobileMenuWrap.classList.remove('show');
  }
});


mNavItems.forEach(item => {
  const link = item.querySelector('a');
  const submenu = item.querySelector('.m-nav-submenu');

  link.addEventListener('click', (e) => {
    e.preventDefault();

    mNavItems.forEach(i => {
      i.classList.remove('active');
      const sub = i.querySelector('.m-nav-submenu');
      if (sub) sub.style.display = 'none';
    });

    item.classList.add('active');
    if (submenu) submenu.style.display = 'block';
  });
});

// swiper
const slideText = document.querySelector('.slide-text');
const progressCircle = document.querySelector('.progress-ring-fill');
const radius = 19;
const circumference = 2 * Math.PI * radius;
const toggleBtn = document.querySelector('.swiper-toggle');
const icon = toggleBtn.querySelector('span');

progressCircle.style.strokeDasharray = circumference;
progressCircle.style.strokeDashoffset = circumference;

const swiper = new Swiper('.swiper-section', {
  loop: true,
  effect: 'fade',
  speed: 500,
  fadeEffect: { crossFade: true },

  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  on: {
    init() {
      updateText(this);
    },

    slideChange() {
      updateText(this);
    },

    autoplayTimeLeft(swiper, time, progress) {
      const offset = circumference * (1 - progress);
      progressCircle.style.strokeDashoffset = offset;
    },
  },
});
let isPlaying = true;

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    swiper.autoplay.stop();
    icon.className = 'icon-play';
  } else {
    swiper.autoplay.start();
    icon.className = 'icon-pause';
  }
  isPlaying = !isPlaying;
});

function updateText(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex];
  slideText.style.opacity = 0;

  setTimeout(() => {
    slideText.innerHTML = activeSlide.dataset.desc;
    slideText.style.opacity = 1;
  }, 150);
}

