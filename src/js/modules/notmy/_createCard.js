// import Modal from './_modal.js'
// import Visit from './_Visit.js'
// import {token} from "./_login.js"

const openModalCreateCard = document.querySelector('.header__btn-create-card')
let modalCreateCard = null

openModalCreateCard.addEventListener('click', () => {
    modalCreateCard = new Modal('Створити візит', 'Зберегти')
    modalCreateCard.handleCloseModal()
    const visitCard = new Visit(modalCreateCard)
    visitCard.renderDoctorSelectInput()
    visitCard.doctorSelectListener()
    fetchCreateCard(modalCreateCard, token).then()

})

const fetchCreateCard = async (target, token) => {
    try {
        const response = await target.handleSubmitForm('https://ajax.test-danit.com/api/v2/cards',
            'POST',
            {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            'json'
        )
        console.log(response)
        target.closeModal()
        console.log('успішний запит')
    } catch (err) {
        console.log(err)
        fetchCreateCard(target, token).then()
    }
}