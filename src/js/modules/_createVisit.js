import {tokenUser} from './_login.js'
import {Modal,VisitСardiologist,VisitDentist,VisitTherapeutic} from './_creatModal.js'
import {getDataFromForma} from './_localStorage.js'

let modal = new Modal("Кардіолог","Стоматолог","Терапевт");
let visitСardiologist = new VisitСardiologist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Звичайний тиск","Індекс маси тіла","Перенесені захворювання серцево-судинної системи","Вік","Статус візиту")
let visitDentist = new VisitDentist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Дата останнього відвідування","Статус візиту")
let visitTherapeutic = new VisitTherapeutic("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Вік","Статус візиту")
const createVisitButton = document.querySelector('.header__btn-create-card');

createVisitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    modal.createModal()
    const sendUser = document.querySelector('.btn__send__visit');
    const modalSection =document.querySelector('.modal');
    modal.clickCloseModal()
   
    const form =document.querySelector(".modal-creating__form");
    const chooseDoctor = document.querySelector(".modal__content__choose__doctor");
    const doctors = {};
    function makeDoctorsObject(key,value,modal){
        return doctors[key]= value.bind(modal)
    }
    makeDoctorsObject("Кардіолог",visitСardiologist.createFormСardiologist,visitСardiologist)
    makeDoctorsObject("Стоматолог",visitDentist.createFormDentist,visitDentist)
    makeDoctorsObject("Терапевт",visitTherapeutic.createFormTherapeutic,visitTherapeutic)
    chooseDoctor.addEventListener("change", ()=>{
        form.innerHTML="";////delete form content
        doctors[chooseDoctor.value](form);
        getDataFromForma(tokenUser,modal)
       
    })

    })
   
export {visitDentist,visitTherapeutic,visitСardiologist}