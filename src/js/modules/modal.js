'use strict';

export default function modal() {
    const modal = document.querySelector('[data-modalMain]'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    //window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const timeout = setTimeout(openModal, 100000000000);

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflowY = '';
    }

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflowY = 'hidden';
        clearTimeout(timeout);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target && e.target.matches('[data-modal]') && openModal();
        });
    });

    modal.addEventListener('click', e => {
        if (
            (e.target && e.target.matches('[data-modalMain]')) ||
            e.target.getAttribute('data-close') == ''
        )
            closeModal();
    });

    document.addEventListener('keydown', e => {
        e.code === 'Escape' && modal.classList.contains('show') && closeModal();
    });

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: '/src/img/form/spinner.svg',
        success: 'Thank you, we will contact you later',
        failure: 'Something went wrong',
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data,
        });

        return await res.json();
    };

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

            postData('http://localhost:3000/requests', json)
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

        openModal();

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
            closeModal();
        }, 5000);
    }
}
