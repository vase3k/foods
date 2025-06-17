'use strict';

// let user = { name: 'ivan' };

// let map = new WeakMap();
// map.set(user, 'data');

// user = null;

// console.log(map);

let cache = new WeakMap();

function cacheUser(user) {
    if (!cache.has(user)) {
        cache.set(user, Date.now());
    }
    return cache.get(user);
}

let lena = { name: 'elena' };
let alex = { name: 'alex' };

cacheUser(lena);
cacheUser(alex);

lena = null;

// console.log(cache);
// console.log(cache.has(lena));
// console.log(cache.has(alex));

let messages = [
    { text: 'hello', from: 'john' },
    { text: 'world', from: 'alex' },
    { text: 'lol', from: 'Mm' },
];

let readMessage = new WeakSet();

readMessage.add(messages[0]);
readMessage.add(messages[1]);

messages.shift();
console.log(readMessage.has(messages[0]));
