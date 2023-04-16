import {Modal} from './_creatModal.js'
import { toggleClass } from '../app.js';
import {renderingLoginCards} from './_functionsCards.js'
const enterBtn = document.querySelector('.header__btn-login');
const boarderText = document.querySelector('.board-of-cards__text');
let enterModal = new Modal();
enterBtn.onclick = enterPage;
let tokenUser= '';
function enterPage (){
      enterModal.createModalEnter("Прошу введіть дані:")
      const modalScreen = document.querySelector('.modal');
      const closeButton = document.querySelector('.modal__content__close-btn');
      enterModal.clickCloseModal(modalScreen,closeButton)
      const btnSubmit =document.querySelector('.modal__content__registration-btn');
      btnSubmit.addEventListener('click' ,()=>{
        let emailValue = document.querySelector('.modal__email').value;
        let passwordValue = document.querySelector('.modal__password').value;
        getToken(emailValue,passwordValue)
        enterModal.closeModal()
        boarderText.classList.add("hidden")
      })
 }
tokenUser= JSON.parse(localStorage.getItem("token"))?.token
window.onload =()=>{
    reloadPage(tokenUser)
  } 
async function getToken(emailValue,passwordValue){
   let getInfoFromServer= await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:`${emailValue}`, password: `${passwordValue}` })
      })
    tokenUser = await getInfoFromServer.text()
    sendData(tokenUser)
    reloadPage(JSON.parse(localStorage.getItem("token"))?.token)
}
function sendData(tokenUser){
  const user ={
      token:`${tokenUser}`
  }
  localStorage.setItem("token",JSON.stringify(user))
}
function reloadPage(localObj){
  if(localObj){
    toggleClass('header__btn')
    toggleClass('cards-filters')
    renderingLoginCards(localObj)
  }

}

export {tokenUser,boarderText}