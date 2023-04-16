import {toggleClass} from '../app.js'
import { boarderText } from './_login.js';
const BtnExit =document.querySelector('.header__btn-exit');
function exitFromVisit(){
    BtnExit.addEventListener('click',()=>{
        boarderText.classList.remove('hidden')
        toggleClass('header__btn')
        toggleClass('cards-filters')
        localStorage.removeItem("token");
        document.querySelectorAll('.board-of-cards__patient-card').forEach(card=>card.remove())  
    })
}
exitFromVisit()
export{exitFromVisit,BtnExit}