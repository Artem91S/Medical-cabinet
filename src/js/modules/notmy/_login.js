// import Modal from './_modal.js'
// import {toggleClass} from "../app.js"
// import {setDataInLocalStorage,validateEnter} from './_localStorage.js'

// const openModalBtn = document.querySelector('.header__btn-login')
// let modalLogin = null
// // Creating an empty variable 'token'
// let token = ''
// const loginInputsHtml = `
//      <label for="email">Email:</label>
//      <input class="modal__email" id="email" name="email" type="text" data-input>
     
//      <label for="password">Пароль:</label>
//      <input class="modal__password" id="password" name="password" type="password" data-input>
// `

// const fetchRequest = async (target) => {
//     try {
//         token = await target.handleSubmitForm("https://ajax.test-danit.com/api/v2/cards/login",
//             'POST',
//             {'Content-Type': 'application/json'},
//             'text')
//         let emailInput =document.querySelector('.modal__email').value;
//         let passwordInput =document.querySelector('.modal__password').value;
//         setDataInLocalStorage(token)
//         target.closeModal()
//         validateEnter(localStorage.getItem("mainUser"),emailInput,passwordInput,token)
//         toggleClass('header__btn')
//         toggleClass('board-of-cards__text')
//     } catch (e) {
//         alert("Невірні дані")
//         fetchRequest(target)
//     }
// }

// openModalBtn.addEventListener('click', () => {
//     modalLogin = new Modal('Вхід на сайт', 'Увійти')
//     modalLogin.setInputs(loginInputsHtml)
//     modalLogin.handleCloseModal()
//     fetchRequest(modalLogin)
//     })
// export {token}

