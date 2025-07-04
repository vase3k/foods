'use strict';

import axios from 'axios';

export default function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');
            !this.classes.length && (this.classes = ['menu__item']);
            element.classList.add(...this.classes);
            element.innerHTML = `
                        <img src=${this.src} alt=${this.alt} />
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                                `;
            this.parent.append(element);
        }
    }

    // const getRessource = async url => {
    //     const res = await fetch(url);
    //     if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     return await res.json();
    // };

    // getRessource('http://localhost:3000/menu').then((data) => {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         new MenuCard(
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price,
    //             '.menu .container',
    //             'menu__item'
    //         ).render();
    //     });
    // });

    axios
        .get('http://localhost:3000/menu')
        .then(({ data }) =>
            data.forEach(({ img, altimg, title, descr, price }) =>
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    '.menu .container',
                    'menu__item'
                ).render()
            )
        );

    // getRessource('http://localhost:3000/menu').then((data) => {
    //     createCard(data);
    // });

    // function createCard(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //                     <img src=${img} alt=${altimg} />
    //                     <h3 class="menu__item-subtitle">${title}</h3>
    //                     <div class="menu__item-descr">${descr}</div>
    //                     <div class="menu__item-divider"></div>
    //                     <div class="menu__item-price">
    //                         <div class="menu__item-cost">Цена:</div>
    //                         <div class="menu__item-total"><span>${price}</span> $/день</div>
    //                     </div>
    //                             `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }
}
