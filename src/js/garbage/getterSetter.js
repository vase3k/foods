'use strict';

const personne = {
    name: 'alex',
    age: 25,

    get userAge() {
        return this.age;
    },

    set userAge(age) {
        this.age = age;
    },
};
personne.userAge = 30;
console.log(personne.userAge);
