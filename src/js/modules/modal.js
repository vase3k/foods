'use strict';

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    document.body.style.overflowY = '';
}

function openModal(modalSelector, timeout) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style.overflowY = 'hidden';
    if (timeout) {
        clearTimeout(timeout);
    }
}

export default function modal(triggerSelector, modalSelector, timeout) {
    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);

    //window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal(modalSelector, timeout);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target && e.target.matches('[data-modal]') && openModal(modalSelector, timeout);
        });
    });

    modal.addEventListener('click', e => {
        if (
            (e.target && e.target.matches('[data-modalMain]')) ||
            e.target.getAttribute('data-close') == ''
        )
            closeModal(modalSelector);
    });

    document.addEventListener('keydown', e => {
        e.code === 'Escape' && modal.classList.contains('show') && closeModal(modalSelector);
    });
}

export { openModal, closeModal };
