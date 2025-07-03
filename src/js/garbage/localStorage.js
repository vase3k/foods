'use strict';

const checkbox = document.querySelector('#checkbox'),
    form = document.querySelector('form'),
    change = document.querySelector('#color');

if (localStorage.getItem('isChecked') === 'true') {
    checkbox.checked = true;
}

if (localStorage.getItem('bg')) {
    form.style.backgroundColor = 'red';
}

checkbox.addEventListener('change', e => {
    localStorage.setItem('isChecked', e.target.checked);
});

change.addEventListener('click', () => {
    if (localStorage.getItem('bg') === 'changed') {
        localStorage.removeItem('bg');
        form.style.backgroundColor = '#fff';
    } else {
        localStorage.setItem('bg', 'changed');
        form.style.backgroundColor = 'red';
    }
});

const data = JSON.stringify({ name: 'ivan', age: 27 });
localStorage.setItem('data', data);
console.log(JSON.parse(localStorage.data).name);
