'use strict';
const multiply20 = price => price * 20;
const divide100 = price => price / 100;
const normalizePrice = price => price.toFixed(2);

const compose =
    (...fns) =>
    x =>
        fns.reduceRight((res, fn) => fn(res), x);

const cps = (...fns) => {
    return (x, res = 0) => {
        res = x;
        for (let i = 0; i < fns.length; i++) {
            res = fns[i](res);
        }
        return res;
    };
};

const composeWithArgs = (...fns) =>
    fns.reduceRight(
        (acc, func) =>
            (...args) =>
                func(acc(...args))
    );

const add1 = function (a) {
    return a + 1;
};
const addAll3 = function (a, b, c) {
    return a + b + c;
};

console.log(composeWithArgs(add1, addAll3)(8, 2, 3));

//console.log(cps(multiply20, divide100, normalizePrice)(4));

// const compositeFunc = compose(multiply20, divide100, normalizePrice);
// const compositeSpc = cps(multiply20, divide100, normalizePrice);

// console.log(compositeFunc(4));
// console.log(compositeSpc(4));
