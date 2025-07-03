'use strict';

const persone = {
    name: 'alex',
    tel: '+7563456454',
    parents: {
        mom: 'olda',
        dad: 'mike',
    },
    getName: function () {
        console.log(this.name);
    },
};
