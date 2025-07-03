'use strict';

const log = function (a, b, ...rest) {
    console.log(a, b, ...rest);
};

//log('basic', 'rest', 'a', 'b', 'd');

function calcOrDouble(number, basis = 2) {
    console.log(number * basis);
}

//calcOrDouble(3);

const bank = 1324.15,
    credit = -4846.45,
    pension = 1415.15,
    lena = -513,
    total = (bank + pension + lena + credit).toFixed(),
    rate = 0.43;

console.log(total);
