import {toggleClass} from '../app.js'
const BtnExit =document.querySelector('.header__btn-exit');
function exitFromVisit(){
    BtnExit.addEventListener('click',()=>{
        document.querySelector('.board-of-cards__text').classList.remove('hidden')
        toggleClass('header__btn')
        toggleClass('cards-filters')
        localStorage.removeItem("token");
        document.querySelectorAll('.board-of-cards__patient-card').forEach(card=>card.remove())  
    })
}
exitFromVisit()
export{exitFromVisit,BtnExit}