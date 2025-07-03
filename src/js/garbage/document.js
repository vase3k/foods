'use strict';

const box = document.querySelector('.box'),
    btn = document.querySelector('button');
// const width = box.clientWidth;
// const height = box.clientHeight;
// const width = box.offsetWidth;
// const height = box.offsetHeight;
const width = box.scrollWidth;
const height = box.scrollHeight;

btn.addEventListener('click', () => {
    box.style.height = box.scrollHeight + 'px';

    //console.log(box.scrollTop);
});

//console.log(box.getBoundingClientRect());

//const style = window.getComputedStyle(box, 'after');
// console.log(window.getComputedStyle(box).height);
// console.log(box.style.height);

// window.addEventListener('scroll', () => {
//      document.documentElement.scrollBy({ top: 20, left: 0, behavior: 'smooth' });
// });
