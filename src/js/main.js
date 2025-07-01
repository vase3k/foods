'use strict';

import axios from 'axios';

window.addEventListener('DOMContentLoaded', async () => {
    //tabs
    const buttons = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        buttonsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        buttons.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        buttons[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    buttonsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            buttons.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //timer

    const deadline = '2025-7-10 23:19:20';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.now();
        if (t > 0) {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    function getZero(num) {
        return num >= 0 && num < 10 ? `0${num}` : num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            daysCounter = timer.querySelector('#days'),
            hoursCounter = timer.querySelector('#hours'),
            minutesCounter = timer.querySelector('#minutes'),
            secondsCounter = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endTime);

            daysCounter.innerHTML = getZero(t.days);
            hoursCounter.innerHTML = getZero(t.hours);
            minutesCounter.innerHTML = getZero(t.minutes);
            secondsCounter.innerHTML = getZero(t.seconds);

            t.total <= 0 && clearInterval(timeInterval);
        }
    }
    setClock('.timer', deadline);

    //modal

    const modal = document.querySelector('[data-modalMain]'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    //window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const timeout = setTimeout(openModal, 100000000000);

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflowY = '';
    }

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflowY = 'hidden';
        clearTimeout(timeout);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target && e.target.matches('[data-modal]') && openModal();
        });
    });

    modal.addEventListener('click', e => {
        if (
            (e.target && e.target.matches('[data-modalMain]')) ||
            e.target.getAttribute('data-close') == ''
        )
            closeModal();
    });

    document.addEventListener('keydown', e => {
        e.code === 'Escape' && modal.classList.contains('show') && closeModal();
    });

    //классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            !this.classes.length && (this.classes = ['menu__item']);
            element.classList.add(...this.classes);
            element.innerHTML = `
                        <img src=${this.src} alt=${this.alt} />
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                                `;
            this.parent.append(element);
        }
    }

    const getRessource = async url => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        return await res.json();
    };

    // getRessource('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             '.menu .container',
    //             'menu__item'
    //         ).render();
    //     });
    // });

    axios
        .get('http://localhost:3000/menu')
        .then(({ data }) =>
            data.forEach(({ img, altimg, title, descr, price }) =>
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    '.menu .container',
                    'menu__item'
                ).render()
            )
        );

    // getRessource('http://localhost:3000/menu').then((data) => {
    //     createCard(data);
    // });

    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //                     <img src=${img} alt=${altimg} />
    //                     <h3 class="menu__item-subtitle">${title}</h3>
    //                     <div class="menu__item-descr">${descr}</div>
    //                     <div class="menu__item-divider"></div>
    //                     <div class="menu__item-price">
    //                         <div class="menu__item-cost">Цена:</div>
    //                         <div class="menu__item-total"><span>${price}</span> $/день</div>
    //                     </div>
    //                             `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    //send HTTP request

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: '/src/img/form/spinner.svg',
        success: 'Thank you, we will contact you later',
        failure: 'Something went wrong',
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data,
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThankModal(messages.success);
                    statusMessage.remove();
                })
                .catch(() => showThankModal(messages.failure))
                .finally(() => form.reset());
        });
    }
    function showThankModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');

        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${message}</div>
                </div>
            `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            closeModal();
        }, 5000);
    }

    //slider
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

    function calculatorByMe() {
        const calculator = document.querySelector('.calculating .calculating__field'),
            gender = calculator.querySelectorAll('#gender div'),
            activity = calculator.querySelectorAll('.calculating__choose_big div'),
            constitution = calculator.querySelectorAll('input'),
            result = calculator.querySelector('.calculating__result span');

        let man = true;
        let activityIndex = 'low';
        let height = 183;
        let weight = 73;
        let age = 37;

        const activityBase = { low: 1.2, small: 1.375, medium: 1.55, high: 1.725 };

        function classHightlight(block) {
            block.forEach(item => {
                item.addEventListener('click', e => {
                    block.forEach(item => item.classList.remove('calculating__choose-item_active'));
                    e.target && e.target.classList.add('calculating__choose-item_active');
                    e.target.innerHTML === 'Мужчина' ? (man = true) : (man = false);
                    e.srcElement.id && (activityIndex = e.srcElement.id);
                    result.innerHTML = calcCalories();
                });
            });
        }

        classHightlight(gender);
        classHightlight(activity);

        constitution.forEach(input =>
            input.addEventListener('change', e => {
                e.target.id === 'height' && (height = e.target.value);
                e.target.id === 'weight' && (weight = e.target.value);
                e.target.id === 'age' && (age = e.target.value);
                result.innerHTML = calcCalories();
            })
        );

        function calcCalories() {
            return (
                man
                    ? (13.4 * weight + 4.8 * height + 5.7 * age) * activityBase[activityIndex]
                    : (9.2 * weight + 3.1 * height + 4.3 * age) * activityBase[activityIndex]
            ).toFixed();
        }
    }

    function calculator() {
        const res = document.querySelector('.calculating__result span');
        let sex = 'female',
            height,
            weight,
            age,
            ratio = 1.375;

        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {
                res.textContent = '____';
                return;
            }

            if (sex === 'female') {
                res.textContent = Math.round(
                    (447.6 + 9.2 * weight + 3.1 * height + 4.3 * age) * ratio
                );
            } else {
                res.textContent = Math.round(
                    (88.36 + 13.4 * weight + 4.8 * height + 5.7 * age) * ratio
                );
            }
        }

        function getStaticInformation(parentSelector, activeClass) {
            const elements = document.querySelectorAll(`${parentSelector} div`);
            elements.forEach(item => {
                item.addEventListener('click', e => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                    } else {
                        sex = e.target.getAttribute('id');
                    }

                    elements.forEach(e => e.classList.remove(activeClass));
                    e.target.classList.add(activeClass);

                    calcTotal();
                });
            });
        }

        function getDinamicInformation(selector) {
            const input = document.querySelector(selector);

            input.addEventListener('input', () => {
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                calcTotal();
            });
        }

        getDinamicInformation('#height');
        getDinamicInformation('#weight');
        getDinamicInformation('#age');

        getStaticInformation('#gender', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

        calcTotal();
    }
    calculator();
});
