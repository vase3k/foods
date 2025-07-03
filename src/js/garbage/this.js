'use strict';

function showThis(a, b) {
    console.log(this);
    function sum() {
        console.log(this);
        return a + b;
    }

    console.log(sum());
}

//showThis(4, 5);

// const obj = {
//     a: 20,
//     b: 15,
//     sum: function () {
//         function shout() {
//             console.log(this);
//         }
//         shout();
//     },
// };

//obj.sum();

function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
}

let ivan = new User('ivan', 232);

function sayName() {
    console.log(this);
    console.log(this.name);
}

const applyThis = (surname) => {
    console.log(this);
    console.log(this.name + surname);
};

const user = {
    name: 'John',
};

// sayName.call(user, 'Wick');
// sayName.apply(user, ['Wick']);

function count(num) {
    return this * num;
}

//const double = count.bind(2);

//console.log(double(5));

const btn = document.querySelector('[data-event]');

btn.addEventListener('click', e => e.target.style.backgroundColor = 'red');

const obj = {
    num: 5,
    sayName: function () {
        (() => console.log(this.num))();
    },
};

//obj.sayName();

//const double = (a) => a * 2;
