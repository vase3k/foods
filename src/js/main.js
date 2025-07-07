'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import form from './modules/form';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', async () => {
    const timeout = setTimeout(openModal, 4000000, '[data-modalMain]');
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2025-7-07 22:35:00');
    cards();
    modal('[data-modal]', '[data-modalMain]', timeout);
    form('[data-modalMain]', timeout);
    slider({
        slidesSelector: '.offer__slide',
        prevSelector: '.offer__slider-prev',
        nextSelector: '.offer__slider-next',
        totalSelector: '#total',
        currentSelector: '#current',
        slidesWrapperSelector: '.offer__slider-wrapper',
        slidesFieldSelector: '.offer__slider-inner',
        activeClass: 'offer__slider-dot_active',
    });
    calculator();
});
