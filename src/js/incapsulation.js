'use strict';

// function User(name, age) {
//     this.name = name;
//     let userAge = age;

//     this.say = function () {
//         console.log(`username: ${this.name}, age: ${this.userAge}`);
//     };

//     this.getAge = () => this.name;
//     this.setAge = age => typeof age === 'number' && (userAge = age);
// }
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    #userAge = '22';

    say() {
        return this.#userAge;
    }

    get age() {
        return this.#userAge;
    }

    set age(age) {
        typeof age === 'number' && (this.#userAge = age);
    }
}

const user1 = new User('ivan', 27);

user1.age = 33;
console.log(user1.age);
