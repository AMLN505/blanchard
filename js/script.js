// burger

document.querySelector(".header__burger").addEventListener("click", function() {
  document.querySelector(".header__menu-top").classList.add("active");
  document.body.classList.add('disable-scroll');
})
document.querySelector(".menu-top__close").addEventListener("click", function() {
  document.querySelector(".header__menu-top").classList.remove("active");
  document.body.classList.remove('disable-scroll');
})
document.querySelectorAll(".menu-top__link").forEach(function (toplink) {
  toplink.addEventListener("click", function() {
    document.querySelector(".header__menu-top").classList.remove("active");
    document.body.classList.remove('disable-scroll');
})
})

// search-mobile

document.querySelector(".header__search-open").addEventListener("click", function () {
  document.querySelector(".header__search-mobile").classList.add("active");
  document.querySelector(".header__logo-link").classList.add("active");
  document.querySelector(".header__burger").classList.add("active");
  this.classList.add("active");
});
document.querySelector(".search-mobile__close").addEventListener("click", function() {
  let form = document.querySelector(".header__search-mobile");
  form.classList.remove("active");
  form.querySelector("input").value = "";
  document.querySelector(".header__search-open").classList.remove("active")
});

document.addEventListener("click", function(e) {
  let target = e.target;
  let form = document.querySelector(".header__search-mobile");
  if (!target.closest(".active")) {
    form.classList.remove("active");
    form.querySelector("input").value = "";
    document.querySelector(".header__search-open").classList.remove("active");
    document.querySelector(".header__logo-link").classList.remove("active");
    document.querySelector(".header__burger").classList.remove("active");
  }
})

// dropdown

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".menu-bottom__button").forEach(item => {
    item.addEventListener("click", function () {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".menu-bottom__dropdown");

      document.querySelectorAll(".menu-bottom__button").forEach(el => {
        if (el != btn) {
          el.classList.remove("menu-bottom__button_active");
        }
      });

      document.querySelectorAll(".menu-bottom__dropdown").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("menu-bottom__dropdown_active");
        }
      });

      dropdown.classList.toggle("menu-bottom__dropdown_active");
      btn.classList.toggle("menu-bottom__button_active")
    })
  });

  document.addEventListener("click", function (e) {
    let target = e.target;
    if (!target.closest(".menu-bottom__list")) {
      document.querySelectorAll(".menu-bottom__dropdown").forEach(el => {
        el.classList.remove("menu-bottom__dropdown_active");
      });

      document.querySelectorAll(".menu-bottom__button").forEach(el => {
        el.classList.remove("menu-bottom__button_active");
      });
    }
  })
});

// simplebar in header

document.querySelectorAll(".dropdown__list").forEach(item => {
  new SimpleBar(item, {
    autoHide: false,
    scrollbarMaxSize: 28,
    ariaLabel: 'Скроллбар',
  });
});

// hero-swiper

const swiper_1 = new Swiper(".section-hero__swiper", {
  spaceBetween: 0,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  }
});

// choices

document.addEventListener("DOMContentLoaded", function () {
  const selector = document.querySelector(".section-gallery__choices")
  const choices = new Choices(selector, {
    searchEnabled: false,
    itemSelectText: "",
    position: "bottom",
  });
});

// gallery-swiper

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".section-gallery__swiper", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".section-gallery__pagination",
      type: "fraction",
      slidesPerGroup: 1
    },

    navigation: {
      nextEl: ".section-gallery__next",
      prevEl: ".section-gallery__prev"
    },

    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2
      },

      965: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },

      1550: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      }
    }
  });
});

// section-gallery__modal

class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    }
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.section-gallery__modal');
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previousActiveElement = false;
    this.fixBlocks = document.querySelectorAll('.fix-block');
    this.focusElements = [
      'a[href]',
      'input',
      'button',
      'select',
      'textarea',
      '[tabindex]'
    ]
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest('[data-modal]');
        if (clickedElement) {
          let target = clickedElement.dataset.modal;
          let animation = clickedElement.dataset.animation;
          let speed = clickedElement.dataset.speed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 100;
          this.modalContainer = document.querySelector(`[data-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest('.modal__exit-button')) {
          this.close();
          return
        }
      }.bind(this));

      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) {
          if (this.isOpen) {
            this.close();
          }
        }

        if (e.keyCode == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));

      this.modal.addEventListener('click', function (e) {
        if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
          this.close();
        }
      }.bind(this))
    }
  }

  open() {
    this.previousActiveElement = document.activeElement;

    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');
    this.disableScroll();

    this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add('animate-open');
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove('modal-open');

      this.enableScroll();
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
    }
  }

  focusCatch(e) {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    if (this.isOpen) {
      focusable[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unclockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unclockPadding() {
    this.fixBlocks.forEach((el) => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
};


const modal = new Modal({
  isOpen: () => {
    console.log(modal);
    console.log('opened');
  },
  isClose: () => {
    console.log('closed');
  }
});

// accordion

(() => {
  new Accordion(".section-catalog__accordion", {
    openOnInit: [0]
  });
})();

// tabs

const params = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active"
};

function setTabs(params) {
  const tabBtns = document.querySelectorAll(`.${params.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${params.wrap}`);
    const currentContent = wrap.querySelector(`.${params.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${params.content}`);

    contents.forEach((el) => {
      el.classList.remove(params.active);
    });

    currentContent.classList.add(params.active);

    tabBtns.forEach((el) => {
      el.classList.remove(params.active);
    });

    this.classList.add(params.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
};

setTabs(params);

// swiper-events

document.addEventListener("DOMContentLoaded", () => {
  let eventsSlider = new Swiper(".section-events__swiper", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 40,
    pagination: {
      el: ".section-events__pagination",
      type: "bullets",
      clickable: true,
      slidesPerGroup: 1
    },

    navigation: {
      nextEl: ".section-events__nav-button_next",
      prevEl: ".section-events__nav-button_prev"
    },

    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },

      965: {
        slidesPerView: 3,
        spaceBetween: 27,
        slidesPerGroup: 3
      },

      1550: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          let link = slide.querySelector(".event-item__link")
          if (!slide.classList.contains("slide-visible")) {
            link.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            link.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          let link = slide.querySelector(".event-item__link")
          if (!slide.classList.contains("slide-visible")) {
            link.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            link.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      }
    }
  });
});

// tooltips

tippy('.section-projects__tooltip', {
  maxWidth: 264,
  offset: [0, 10],
  trigger: 'click',
  theme: 'projects',
});

// projects-swiper

document.addEventListener("DOMContentLoaded", () => {
  let projectsSlider = new Swiper(".section-projects__swiper", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 21,
    pagination: {
      slidesPerGroup: 1
    },

    navigation: {
      nextEl: ".section-projects__nav-button_next",
      prevEl: ".section-projects__nav-button_prev"
    },

    breakpoints: {
      650: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2
      },

      965: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2
      },

      1550: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      }
    }
  });
});

// forms

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999)-999-99-99");

im.mask(selector);

const validation = new JustValidate('.section-contacts__form', {
  focusInvalidField: false,
});


validation
  .addField('.section-contacts__input_name', [
    {
      rule: 'required',
      errorMessage: 'Укажите имя',
    },
    {
      rule: 'customRegexp',
      value: /^[a-zа-яё ]+$/i,
      errorMessage: 'Недопустимый формат',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Минимум 2 символа',
    },
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'Максимум 20 символов',
    },
  ])
  .addField('.section-contacts__input_tel', [
    {
      rule: 'required',
      errorMessage: 'Укажите номер',
    },
    {
      rule: 'function',
      validator: function () {
        const phone = selector.inputmask.unmaskedvalue()
        return phone.length === 10
      },
      errorMessage: 'Введите 10 цифр',
    }
  ]).onSuccess((event) => {
    event.currentTarget.submit();
  });

// map

ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.758468, 37.601088],
        zoom: 14.3,
        controls: ['geolocationControl', 'zoomControl']
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition:  { top: "350px", right: "18px" },
      geolocationControlFloat: 'none',
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "260px", right: "18px" }
    });

    myMap.behaviors.disable('scrollZoom');

    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
        iconLayout: 'default#image',
        iconImageHref: '/img/placemark.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [0, 0]
    });

    myMap.geoObjects.add(myPlacemark);
};

// scroll-behavior

document.querySelectorAll('.accordion__item-link').forEach(aclink => {
  if (document.documentElement.clientWidth < 965) {
    aclink.classList.add('js-scroll-link');
  }
});

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href').substring(1);
    const scrollTarget = document.getElementById(href);
    const elementPosition = scrollTarget.getBoundingClientRect().top;

    window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
    });
  })
});


