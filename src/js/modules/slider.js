'use strict';

export default function slider() {
    function sliderByMe() {
        const sliderBody = document.querySelector('.offer__slider');
        const sliderNext = sliderBody.querySelector('.offer__slider-next');
        const sliderPrev = sliderBody.querySelector('.offer__slider-prev');
        const sliderCounter = sliderBody.querySelector('#current');
        const sliderTotal = sliderBody.querySelector('#total');
        const sliderWrapper = sliderBody.querySelector('.offer__slider-wrapper');
        const sliders = sliderWrapper.querySelectorAll('.offer__slide');
        let activeSlider = 0;

        function showSlider(active, animation) {
            sliders.forEach((e, i) => {
                e.classList.remove('hide', 'animate__animated', animation);
                i == active && e.classList.add('animate__animated', animation);
                i !== active && e.classList.add('hide');
            });
            sliderCounter.innerHTML = activeSlider + 1;
            sliderTotal.innerHTML = sliders.length;
        }

        showSlider(activeSlider);

        function changeCounter(change) {
            activeSlider += change;
            if (activeSlider >= sliders.length) {
                activeSlider = 0;
                showSlider(activeSlider);
            }
            if (activeSlider < 0) {
                activeSlider = sliders.length - 1;
                showSlider(activeSlider);
            }
        }

        sliderNext.addEventListener('click', e => {
            e.target && changeCounter(1);
            showSlider(activeSlider, 'animate__bounceInLeft');
        });

        sliderPrev.addEventListener('click', e => {
            e.target && changeCounter(-1);
            showSlider(activeSlider, 'animate__bounceInRight');
        });
    }

    function sliderSimple() {
        const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current');

        let slideIndex = 1;

        showSlides(slideIndex);

        slides.length < 10
            ? (total.textContent = `0${slides.length}`)
            : (total.textContent = slides.length);

        function showSlides(n) {
            if (n > slides.length) slideIndex = 1;
            if (n < 1) slideIndex = slides.length;
            slides.forEach(e => {
                e.classList.add('hide');
            });
            slides[slideIndex - 1].classList.remove('hide');
            current.innerHTML = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
        }

        function plusSlides(n) {
            showSlides((slideIndex += n));
        }

        prev.addEventListener('click', e => {
            e.target && plusSlides(-1);
        });
        next.addEventListener('click', e => {
            e.target && plusSlides(1);
        });
    }
    function sliderCarouselByMe() {
        const slides = document.querySelectorAll('.offer__slide'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            inner = document.querySelector('.offer__slider-inner');

        let totalSlides = slides.length;
        const slideStep = (1 / totalSlides) * 100;
        total.innerHTML = totalSlides < 10 ? '0' + totalSlides : totalSlides;
        inner.style.width = totalSlides * 100 + '%';

        let slideIndex = 0;
        let touchStart = 0;
        let touchEnd = 0;

        changeSlide(slideIndex);

        function changeSlide(n) {
            inner.style.transform = `translateX(${n}%)`;
            current.innerHTML = Math.round((slideIndex * -1 * totalSlides) / 100 + 1);
        }

        function changeCounter(n) {
            slideIndex += n;
            slideIndex < slideStep * -totalSlides + slideStep && (slideIndex = 0);
            slideIndex > 0 && (slideIndex = slideStep * -totalSlides + slideStep);
        }

        function touchChange() {
            if (touchStart < touchEnd) {
                changeCounter(slideStep);
            } else {
                changeCounter(-slideStep);
            }
        }

        next.addEventListener('click', e => {
            changeCounter(-slideStep);
            e.target && changeSlide(slideIndex);
        });

        prev.addEventListener('click', e => {
            changeCounter(slideStep);
            e.target && changeSlide(slideIndex);
        });

        inner.addEventListener('touchstart', e => {
            touchStart = e.changedTouches[0].screenX;
            touchChange();
            changeSlide(slideIndex);
        });

        inner.addEventListener('touchend', e => {
            touchEnd = e.changedTouches[0].screenX;
        });
    }
    function sliderCarousel() {
        const slides = document.querySelectorAll('.offer__slide'),
            slider = document.querySelector('.offer__slider'),
            prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'),
            width = parseInt(window.getComputedStyle(slidesWrapper).width);

        let slideIndex = 1;
        let offset = 0;

        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }

        slidesField.style.width = 100 * slides.length + '%';
        slides.forEach(slide => (slide.style.width = width));

        next.addEventListener('click', () => {
            offset >= width * (slides.length - 1) ? (offset = 0) : (offset += width);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex >= slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot, i) => {
                dot.classList.remove('offer__slider-dot_active');
                if (i == slideIndex - 1) dot.classList.add('offer__slider-dot_active');
            });
        });

        prev.addEventListener('click', () => {
            offset <= 0 ? (offset = width * (slides.length - 1)) : (offset -= width);
            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slideIndex <= 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach((dot, i) => {
                dot.classList.remove('offer__slider-dot_active');
                if (i == slideIndex - 1) dot.classList.add('offer__slider-dot_active');
            });
        });

        const navWrapper = document.querySelector('.offer__slider-nav');

        slides.forEach((e, i) => {
            const dot = document.createElement('div');
            dot.classList.add('offer__slider-dot');
            dot.setAttribute('data-slide-to', i + 1);
            navWrapper.append(dot);
        });

        const dots = document.querySelectorAll('.offer__slider-dot');
        dots.forEach((dot, i) => {
            if (i == slideIndex - 1) dot.classList.add('offer__slider-dot_active');
            dot.addEventListener('click', e => {
                e.target && e.target.matches('div') && (slideIndex = i + 1);
                current.innerHTML = slideIndex < 10 ? `0${slideIndex}` : slideIndex;
                offset = width * i;
                slidesField.style.transform = `translateX(-${offset}px)`;
                dots.forEach(dot => dot.classList.remove('offer__slider-dot_active'));
                if (e.target == dot) {
                    dot.classList.add('offer__slider-dot_active');
                }
            });
        });
    }
    sliderCarousel();
}
