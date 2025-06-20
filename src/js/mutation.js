'use strict';

const box = document.querySelector('.box');

let observer = new MutationObserver((mutationRecords) => {
    console.log(mutationRecords[0].addedNodes[0]);
});

observer.observe(box, {
    childList: true,
});

observer.disconnect();
