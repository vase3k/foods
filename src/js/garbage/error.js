'use strict';

const data = [
    {
        id: 'box',
        tag: 'div',
    },
    {
        id: 'ff',
        tag: 'nav',
    },
    {
        id: 'circle',
        tag: '',
    },
];

data.forEach((blockObj, i) => {
    try {
        const block = document.createElement(blockObj.tag);

        if (!blockObj.id) throw new SyntaxError(`number ${i + 1} no unique ID`);

        block.setAttribute('id', blockObj.id);
        document.body.append(block);
    } catch (e) {
        if (e.name === 'SyntaxError') {
            console.log(e.message);
        } else {
            throw e;
        }
    }
});

console.log('the end');
