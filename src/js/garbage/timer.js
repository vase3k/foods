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

// let timerIdInterval,
//     i = 0;

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

const elem = document.querySelector('.box');
const btn = document.querySelector('.btn');
let pos = 0;
function myAnimation() {
    pos++;
    elem.style.top = pos + 'px';
    elem.style.left = pos + 'px';

    if (pos < 300) {
        requestAnimationFrame(myAnimation);
    }
}

btn.addEventListener('click', myAnimation);

let id = requestAnimationFrame(myAnimation);
cancelAnimationFrame(id);

const btnPhone = document.querySelector('#animateIphone'),
    iphoneImg = document.querySelector('.iphone');

let animateIphone;

btnPhone.addEventListener('click', () => {
    if (!animateIphone) {
        animateIphone = iphoneImg.animate(
            [
                { transform: 'translateX(0) rotate(0deg)', filter: 'opacity(100%)' },
                { scale: '1.2' },
                { transform: 'translateX(300px) rotate(180deg)' },
                { transform: 'translateX(150px)', filter: 'opacity(50%)' },
            ],
            {
                duration: 2000,
                iterations: 2,
            }
        );
    } else if (animateIphone.playState === 'paused') {
        animateIphone.play();
    } else {
        animateIphone.pause();
    }
});
