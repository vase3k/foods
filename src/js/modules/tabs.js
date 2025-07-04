'use strict';

export default function tabs(
    buttonsSelector,
    tabsContentSelector,
    buttonsParentSelector,
    activeClass
) {
    const buttons = document.querySelectorAll(buttonsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        buttonsParent = document.querySelector(buttonsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        });
        buttons.forEach(tab => {
            tab.classList.remove(activeClass);
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        buttons[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    buttonsParent.addEventListener('click', event => {
        const target = event.target;
        if (target && target.classList.contains(buttonsSelector.slice(1))) {
            buttons.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
