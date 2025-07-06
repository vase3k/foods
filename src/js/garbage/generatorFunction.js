'use strict';

function* generator() {
    yield 'S';
    yield 'C';
    yield 'R';
    yield 'A';
    yield 'I';
    yield 'Q';
}

const str = generator();

function* count(n) {
    for (let i = 0; i < n; i++) {
        yield i;
    }
}

const counter = count(3);

for (let k of count(7)) {
    console.log(k);
}
