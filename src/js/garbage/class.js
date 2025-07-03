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

//console.log(ivan.exit(), alex.hello());

class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    calcArea() {
        return this.height * this.width;
    }
    calcSize = () => this.height ** 2;
}

const rectangle200 = new Rectangle(20, 10);
const rectangle800 = new Rectangle(40, 20);

class ColoredRectangleWithText extends Rectangle {
    constructor(height, width, text, bc) {
        super(height, width);
        this.text = text;
        this.bc = bc;
    }

    showMyProps() {
        console.log(`text : ${this.text}, color: ${this.bc}`);
    }
}

const redRectangle = new ColoredRectangleWithText(200, 300, 'red', 'blue');

const div = new ColoredRectangleWithText(25, 10, 'hello', 'red');
