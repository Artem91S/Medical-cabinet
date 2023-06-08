import {Modal} from './_creatModal.js'
import { toggleClass } from '../app.js';
import {renderingLoginCards} from './_functionsCards.js'

const enterBtn = document.querySelector('.header__btn-login');
const boarderText = document.querySelector('.board-of-cards__text');
let enterModal = new Modal();
enterBtn.onclick = enterPage;
let tokenUser= '';

function validateEnterFields(emailValue,passwordValue){
  if(!emailValue.includes("@") || !emailValue.length > 0) {
    if(!passwordValue.length > 0&&!document.querySelector('.error-password')){
      document.querySelector('.modal__password').insertAdjacentHTML('afterend',`<p class="error-password">Невірний password</p>`)
    }
    else if(passwordValue.length > 0&&document.querySelector('.error-password')){
      document.querySelector('.error-password').remove()
    }
    !document.querySelector(".error-email")  ?(
      document.querySelector('.modal__email').insertAdjacentHTML('afterend',`<p class="error-email">Невірний email</p>`)
      )
      :""
    }
    else if(!passwordValue.length > 0 ) {
    if(!emailValue.includes("@") || !emailValue.length > 0){
      document.querySelector('.modal__email').insertAdjacentHTML('afterend',`<p class="error-email">Невірний email</p>`)
    }
    else if(document.querySelector('.error-email')){
      document.querySelector('.error-email').remove()
    }
    
     !document.querySelector('.error-password')  ?
      document.querySelector('.modal__password').insertAdjacentHTML('afterend',`<p class="error-password">Невірний password</p>`)
      :""
    }
    else{
    !document.querySelector('.error-password')|| !document.querySelector(".error-email")  ?(
      document.querySelector('.modal__password').insertAdjacentHTML('afterend',`<p class="error-password">Невірний password</p>`),
      document.querySelector('.modal__email').insertAdjacentHTML('afterend',`<p class="error-email">Невірний email</p>`))
      :""
  }
}

function enterPage (){
      enterModal.createModalEnter("Прошу введіть дані:")
      const modalScreen = document.querySelector('.modal');
      const closeButton = document.querySelector('.modal__content__close-btn');
      enterModal.clickCloseModal(modalScreen,closeButton)
      const btnSubmit =document.querySelector('.modal__content__registration-btn');
      btnSubmit.addEventListener('click' ,()=>{
        let emailValue = document.querySelector('.modal__email').value;
        let passwordValue = document.querySelector('.modal__password').value;

        emailValue.length > 0 && emailValue.includes("@")&& passwordValue.length > 0 ?(
         getToken(emailValue,passwordValue),
         boarderText.classList.add("hidden"))
         :validateEnterFields(emailValue,passwordValue)
    }
      )   
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
      getInfoFromServer.status!== 200?(!document.querySelector('.incorrect-login')?document.querySelector('.modal__content__registration-btn').insertAdjacentHTML('afterend',`<h2 class="incorrect-login">Невірний логін чи пароль</h2>`):""):
      (tokenUser = await getInfoFromServer.text(),
      enterModal.closeModal(),
      sendData(tokenUser),
      reloadPage(JSON.parse(localStorage.getItem("token"))?.token)
      )
  
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