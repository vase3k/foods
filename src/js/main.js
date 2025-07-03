'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';

window.addEventListener('DOMContentLoaded', async () => {
    tabs();
    timer();
    cards();
    modal();
    slider();
    calculator();
});
