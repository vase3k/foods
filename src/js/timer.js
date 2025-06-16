'use strict';

// const timerId = setTimeout(
//     (text, text2) => {
//         console.log(text, text2);
//     },
//     1000,
//     'timer done',
//     'timer done 2'
// );

// const timerId2 = setTimeout(logger, 1000, 'timer2');

// clearTimeout(timerId);

const btn = document.querySelector('.btn');
// let timerIdInterval,
//     i = 0;

function myAnimation() {
    const elem = document.querySelector('.box');
    let pos = 0;

    const id = setInterval(frame, 10);
    function frame() {
        if (pos == 295) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}

btn.addEventListener('click', myAnimation);

// btn.addEventListener('click', () => {
//     timerIdInterval = setInterval(logger, 500, 'setInterval');
// });

// function logger(text) {
//     if (i === 3) {
//         clearInterval(timerIdInterval);
//     }
//     console.log(text);
//     i++;
// }

// let id = setTimeout(function log() {
//     console.log('hello');
//     id = setTimeout(log, 500);
// }, 500);
