'use strict';

import { openModal, closeModal } from './modal';
import axios from 'axios';

export default function form(modalSelector, timeout) {
    const forms = document.querySelectorAll('form');
    const messages = {
        loading: '/src/img/form/spinner.svg',
        success: 'Thank you, we will contact you later',
        failure: 'Something went wrong',
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                    `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // postData('http://localhost:3000/requests', json)
            //     .then(data => {
            //         console.log(data);
            //         showThankModal(messages.success);
            //         statusMessage.remove();
            //     })
            //     .catch(() => showThankModal(messages.failure))
            //     .finally(() => form.reset());

            axios
                .post('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThankModal(messages.success);
                    statusMessage.remove();
                })
                .catch(() => showThankModal(messages.failure))
                .finally(() => form.reset());
        });
    }
    function showThankModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');

        openModal(modalSelector, timeout);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                    <div class="modal__content">
                            <div data-close class="modal__close">&times;</div>
                            <div class="modal__title">${message}</div>
                    </div>
                `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            closeModal(modalSelector);
        }, 5000);
    }
}
