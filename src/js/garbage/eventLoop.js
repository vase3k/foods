'use strict';

// setTimeout(() => {
//     console.log('timout 2');
// }, 0);

// console.log(2);

setTimeout(() => {
    console.log('timeout');
});

Promise.resolve().then(() => {
    console.log('promise');
});

console.log('code');
