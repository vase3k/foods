'use strict';
//tabs
window.addEventListener('DOMContentLoaded', () => {
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

    const deadline = '2025-6-20 23:19:20';

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

    function modal() {
        const modal = document.querySelector('[data-modalMain]'),
            close = document.querySelector('[data-close]'),
            modalTrigger = document.querySelectorAll('[data-modal]');

        document.addEventListener('scroll', () => {
            document.documentElement.scrollTop >= 1000 ? modal.classList.add('show') : closeModal();
        });

        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflowY = '';
        }

        modalTrigger.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.target && e.target.matches('[data-modal]') && modal.classList.add('show');
                document.body.style.overflowY = 'hidden';
            });
        });

        modal.addEventListener('click', (e) => {
            e.target.matches('[data-modalMain]') && closeModal();
        });

        close.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            e.code === 'Escape' && modal.classList.contains('show') && closeModal();
        });
    }
    modal();
});
