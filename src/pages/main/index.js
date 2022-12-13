import "../../assets/styles/main.scss";


/* Burger menu */

const headerBurger = document.querySelector   ('.header__burger'),
      burger       = document.querySelector   ('.burger'),
      burgerCross  = document.querySelector   ('.burger__button'),
      burgerLinks  = document.querySelectorAll('.burger__link');

headerBurger.addEventListener('click', () => {
    burger.classList.add('active');
    document.documentElement.classList.add('_lock');
});

function closeMenuBurger() {
    burger.classList.remove('active');
    setTimeout(() => { document.documentElement.classList.remove('_lock');}, 100);
}

burger.addEventListener('click', (e) => {
    if (!e.target.closest('.burger__inner')) {
        closeMenuBurger();
    }
});

burgerCross.addEventListener('click', () => {
    closeMenuBurger();
});

burgerLinks.forEach((item) => {
    item.addEventListener('click', () => {
        closeMenuBurger();
    });
});


/* Animals */

const carousel    = document.querySelector   ('.carousel'),
      buttonLeft  = document.querySelector   ('.animals__arrow_left'),
      buttonRight = document.querySelector   ('.animals__arrow_right'),
      cardsCenter = document.querySelectorAll('.active-card');

let left  = false,
    right = false;

const moveLeft = () => {
    shuffleCards('.left-card')
    carousel.classList.add('transition-right');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
    left = true;
}

const moveRight =() => {
    shuffleCards('.right-card');
    carousel.classList.add('transition-left');
    buttonLeft.removeEventListener('click', moveLeft);
    buttonRight.removeEventListener('click', moveRight);
    right = true;
}

buttonLeft.addEventListener('click', () => {
    buttonLeft.classList.add('disabled-left');
    buttonRight.classList.add('disabled-right');
    moveLeft();
});

buttonRight.addEventListener('click', () => {
    buttonLeft.classList.add('disabled-left');
    buttonRight.classList.add('disabled-right');
    moveRight();
});

carousel.addEventListener('animationend', () => {
        buttonLeft.classList.remove('disabled-left');
        buttonRight.classList.remove('disabled-right');
        buttonLeft.addEventListener('click', moveLeft);
        buttonRight.addEventListener('click', moveRight);
    if (right) {
        carousel.classList.remove('transition-left');
        right = false;
        document.querySelectorAll('.active-card').forEach((item, index) => {
            item.innerHTML = document.querySelectorAll('.right-card')[index].innerHTML
        })
    } else if (left) {
        carousel.classList.remove('transition-right');
        left = false;
        document.querySelectorAll('.active-card').forEach((item, index) => {
            item.innerHTML = document.querySelectorAll('.left-card')[index].innerHTML
        })
    }
});

function getShuffledArray() {
    let array = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function shuffleCards(cards) {
    let shuffledArray = getShuffledArray();
    for (let i = 0; i < cardsCenter.length; i++){
        document.querySelectorAll(cards)[i].innerHTML = cardsCenter[shuffledArray[i]].innerHTML;
    }
}


/* Testimonials */

const inputRange           = document.querySelector('input[type="range"]'),
      testimonialsCarousel = document.querySelector('.testimonials__card-holder');

testimonialsCarousel.style.marginLeft = `-0px`;
inputRange.addEventListener("input", () => {
    let temp = inputRange.value > 0 ?
    inputRange.value * (testimonialCards[0].getBoundingClientRect().width + testimonialsCarousel.getBoundingClientRect().width*0.0259): 0;
    testimonialsCarousel.style.marginLeft = `-${temp}px`;
});


const popUp            = document.querySelector   ('.pop-up'),
      popUpCloseButton = document.querySelector   ('.pop-up__button'),
      popUpTestimonial = document.querySelector   ('.pop-up__testimonial'),
      testimonialCards = document.querySelectorAll('.testimonials__card');

let windowWidth = window.innerWidth;
window.onresize = () => windowWidth = window.innerWidth;

if (windowWidth < 1000) {
    testimonialCards.forEach((item) => {
        item.addEventListener('click', () => {
            popUp.classList.add('active');
            document.body.classList.add('lock');
            popUpTestimonial.innerHTML = item.innerHTML;
            console.log(item.innerHTML);
        })
    })
    popUpCloseButton.addEventListener('click', () => {
        popUpTestimonial.innerHTML = '';
        popUp.classList.remove('active');
        document.body.classList.remove('lock');
    })
    popUp.addEventListener('click', (event) => {
        if(event.target.classList.contains('pop-up')){
            popUpTestimonial.innerHTML = '';
            popUp.classList.remove('active');
            document.body.classList.remove('lock');
        }
    });
}

