'use strict';

function User(name, id) {
    (this.name = name),
        (this.id = id),
        (this.human = true),
        (this.hello = function () {
            console.log(`name is ${this.name}`);
        });
}

User.prototype.exit = function () {
    console.log(this.name + ' have quit');
};

const ivan = new User('ivan', 23);
const alex = new User('alex', 43);

console.log(ivan.exit(), alex.hello());
