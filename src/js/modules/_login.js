import {Modal} from './_creatModal.js'
// TestSytnikov.a@ukr.net pass =1234 token 211ef4b7-06d9-430f-afaa-e3364727538b
import { toggleClass } from '../app.js';
import {renderingLoginCards} from './_localStorage.js'
const enterBtn = document.querySelector('.header__btn-login');
let enterModal = new Modal();
enterBtn.onclick = enterPage;
let tokenUser= '';
 function enterPage (){
      enterModal.createModalEnter()
      const btnSubmit =document.querySelector('.send-data');
      btnSubmit.addEventListener('click' ,()=>{
        let emailValue = document.querySelector('.modal__email').value;
        let passwordValue = document.querySelector('.modal__password').value;
        getToken(emailValue,passwordValue)
        enterModal.closeModal()
      })
 }
tokenUser= JSON.parse(localStorage.getItem("token"))?.token//////'getting token
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
    toggleClass('board-of-cards__text')
    renderingLoginCards(localObj)
  }

}

export {tokenUser}