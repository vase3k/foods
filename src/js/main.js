'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const buttons = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        buttonsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        buttons.forEach((tab) => {
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

    buttonsParent.addEventListener('click', (event) => {
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

    const deadline = '2025-6-21 23:19:20';

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

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.target && e.target.matches('[data-modal]') && openModal();
        });
    });

    modal.addEventListener('click', (e) => {
        if (
            (e.target && e.target.matches('[data-modalMain]')) ||
            e.target.getAttribute('data-close') == ''
        )
            closeModal();
    });

    document.addEventListener('keydown', (e) => {
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

    new MenuCard(
        '/src/img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        '/src/img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        '/src/img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        15,
        '.menu .container',
        'menu__item'
    ).render();

    //send HTTP request

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: '/src/img/form/spinner.svg',
        success: 'Thank you, we will contact you later',
        failure: 'Something went wrong',
    };

    forms.forEach((form) => {
        postData(form);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(object),
            })
                .then((data) => data.text())
                .then((data) => {
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

    fetch('http://localhost:3000/menu')
        .then((data) => data.json())
        .then((res) => console.log(res));
});
