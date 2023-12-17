
let slider = document.querySelector('.slider');
let prevButton = document.querySelector('.prev-button');
let nextButton = document.querySelector('.next-button');
let dotsContainer = document.querySelector('.slider-dots');
const slides = Array.from(slider.querySelectorAll('img'));


const slideCount = slides.length;
let slideIndex = 0;

let dots = [];

// Создаем точки и добавляем их в контейнер
for (let i = 0; i < slideCount; i++) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        slideIndex = i;
        updateSlider();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
}

// Функция для показа предыдущего слайда
function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}
prevButton.addEventListener('click', showPreviousSlide);

// Функция для показа следующего слайда
function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}
nextButton.addEventListener('click', showNextSlide);


// Функция для обновления отображения слайдера
function updateSlider() {
    slides.forEach((slide, index) => {
        if (index === slideIndex) {
            slide.classList.add('active');
            dots[index].classList.add('active'); 
        } else {
            slide.classList.remove('active');
         
            dots[index].classList.remove('active'); 
        }
    });
}

updateSlider();

let autoSlideInterval = setInterval(showNextSlide, 5000);

slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(showNextSlide, 5000);
});


export{showPreviousSlide,showNextSlide, updateSlider,autoSlideInterval, dotsContainer}