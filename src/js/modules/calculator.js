'use strict';

export default function calculator() {
    function calculatorByMe() {
        const calculator = document.querySelector('.calculating .calculating__field'),
            gender = calculator.querySelectorAll('#gender div'),
            activity = calculator.querySelectorAll('.calculating__choose_big div'),
            constitution = calculator.querySelectorAll('input'),
            result = calculator.querySelector('.calculating__result span');

        let man = true;
        let activityIndex = 'low';
        let height = 183;
        let weight = 73;
        let age = 37;

        const activityBase = { low: 1.2, small: 1.375, medium: 1.55, high: 1.725 };

        function classHightlight(block) {
            block.forEach(item => {
                item.addEventListener('click', e => {
                    block.forEach(item => item.classList.remove('calculating__choose-item_active'));
                    e.target && e.target.classList.add('calculating__choose-item_active');
                    e.target.innerHTML === 'Мужчина' ? (man = true) : (man = false);
                    e.srcElement.id && (activityIndex = e.srcElement.id);
                    result.innerHTML = calcCalories();
                });
            });
        }

        classHightlight(gender);
        classHightlight(activity);

        constitution.forEach(input =>
            input.addEventListener('change', e => {
                e.target.id === 'height' && (height = e.target.value);
                e.target.id === 'weight' && (weight = e.target.value);
                e.target.id === 'age' && (age = e.target.value);
                result.innerHTML = calcCalories();
            })
        );

        function calcCalories() {
            return (
                man
                    ? (13.4 * weight + 4.8 * height + 5.7 * age) * activityBase[activityIndex]
                    : (9.2 * weight + 3.1 * height + 4.3 * age) * activityBase[activityIndex]
            ).toFixed();
        }
    }

    function calculator() {
        const res = document.querySelector('.calculating__result span');
        let sex, height, weight, age, ratio;

        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio', '1.375');
        } else {
            ratio = '1.375';
            localStorage.setItem('ratio', '1.375');
        }

        function initLocalSetting(selector, activeClass) {
            const elements = document.querySelectorAll(selector);

            elements.forEach(element => {
                element.classList.remove(activeClass);
                element.id === sex && element.classList.add(activeClass);
                element.getAttribute('data-ratio') === ratio && element.classList.add(activeClass);
            });
        }

        initLocalSetting('#gender div', 'calculating__choose-item_active');
        initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');

        function calcTotal() {
            if (!sex || !height || !weight || !age || !ratio) {
                res.textContent = '____';
                return;
            }

            if (sex === 'female') {
                res.textContent = Math.round(
                    (447.6 + 9.2 * weight + 3.1 * height + 4.3 * age) * ratio
                );
            } else {
                res.textContent = Math.round(
                    (88.36 + 13.4 * weight + 4.8 * height + 5.7 * age) * ratio
                );
            }
        }

        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(item => {
                // if (item.id === localStorage.getItem('sex')) {
                //     sex = localStorage.getItem('sex');
                //     elements.forEach(e => e.classList.remove(activeClass));
                //     item.classList.add(activeClass);
                // }
                // if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                //     ratio = localStorage.getItem('ratio');
                //     elements.forEach(e => e.classList.remove(activeClass));
                //     item.classList.add(activeClass);
                // }
                item.addEventListener('click', e => {
                    if (e.target.getAttribute('data-ratio')) {
                        ratio = +e.target.getAttribute('data-ratio');
                        localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                    } else {
                        sex = e.target.getAttribute('id');
                        localStorage.setItem('sex', e.target.getAttribute('id'));
                    }

                    elements.forEach(e => e.classList.remove(activeClass));
                    e.target.classList.add(activeClass);

                    calcTotal();
                });
            });
        }

        function getDinamicInformation(selector) {
            const input = document.querySelector(selector);

            input.addEventListener('input', () => {
                switch (input.getAttribute('id')) {
                    case 'height':
                        height = +input.value;
                        break;
                    case 'weight':
                        weight = +input.value;
                        break;
                    case 'age':
                        age = +input.value;
                        break;
                }
                if (input.value.match(/\D/gi)) {
                    input.style.outline = 'solid red medium';
                } else {
                    input.style.outline = '';
                    input.removeAttribute('style');
                }
                calcTotal();
            });
        }

        getDinamicInformation('#height');
        getDinamicInformation('#weight');
        getDinamicInformation('#age');

        getStaticInformation('#gender div', 'calculating__choose-item_active');
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

        calcTotal();
    }

    calculator();
}
