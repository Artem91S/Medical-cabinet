import {getData} from "../app.js"

export default class Modal {
    constructor(title, buttonText) {
        this.renderContent(title, buttonText)
        this.modal = document.querySelector('.modal')
        this.closeButton = this.modal.querySelector('.close-btn')
        this.form = this.modal.querySelector('.form')
        this.submitButton = this.modal.querySelector(`.modal__btn`)
    }

    renderContent(title, buttonText) {
        const html = `
        <section class="modal">
            <div class="modal__content">
                <div class="modal__close-btn close-btn">&times;</div>
                <h2 class="modal__title">${title}</h2>
                <form class="modal__form form">
                <button class="modal__btn btn btn--grey">${buttonText}</button>
                </form>
            </div>
        </section>
        `
        document.body.insertAdjacentHTML('beforebegin', html)
    }

    setInputs(html) {
        this.submitButton.insertAdjacentHTML('beforebegin', html)
    }

    missingInformation() {
        const missingInfoP = this.modal.querySelector('.missing-info')
        if (missingInfoP) {
            missingInfoP.remove()
        }
        const html = `
                 <p class="missing-info">Заповніть всі поля</p>
            `
        this.submitButton.insertAdjacentHTML("beforebegin", html)
    }

    closeModal() {
        this.modal.remove()
    }

    handleCloseModal() {
        this.modal.addEventListener('click', e => {
            if (e.target === this.modal || e.target === this.closeButton) {
                this.closeModal()
            }
        })
    }


    handleSubmitForm(url, method, headers, format) {
        return new Promise((resolve) => {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                const body = {}
                const inputs = this.form.querySelectorAll('input, textarea, select')
                const fieldTypes = {
                    checkbox: (input) => input.checked,
                    radio: (input) => input.checked ? input.value : null,
                    textarea: (input) => input.value,
                    select: (input) => input.selectedOptions[0].textContent,
                    "select-one": (input) => input.selectedOptions[0].textContent,
                    default: (input) => input.value,
                }
                inputs.forEach((input) => {
                    const {name, type} = input
                    const fieldType = fieldTypes[type] || fieldTypes.default
                    body[name] = fieldType(input)
                })

                if (Object.values(body).every((val) => val)) {
                    resolve(getData(url, method, headers, body, format))
                } else {
                    this.missingInformation()
                }
            })
        })
    }

    // addEventListener(eventType, callback) {
    //     this.modal.addEventListener(eventType, callback)
    // }
}
