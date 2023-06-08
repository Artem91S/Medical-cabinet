import {tokenUser} from './_login.js'
import {Modal,VisitСardiologist,VisitDentist,VisitTherapeutic} from './_creatModal.js'
import {getDataFromForma} from './_functionsCards.js'
let modal = new Modal("Кардіолог","Стоматолог","Терапевт");
const createVisitButton = document.querySelector('.header__btn-create-card');
let visitСardiologist;
let visitDentist;
let visitTherapeutic; 
function changeFormInputs(doctors,visitСardiologist,visitDentist,visitTherapeutic){
     visitСardiologist = new VisitСardiologist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Звичайний тиск","Індекс маси тіла","Перенесені захворювання серцево-судинної системи","Вік","Статус візиту")
     visitDentist = new VisitDentist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Дата останнього відвідування","Статус візиту")
     visitTherapeutic = new VisitTherapeutic("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Вік","Статус візиту")
     function makeDoctorsObject(key,value,modal){
        return doctors[key]= value.bind(modal)
    }
    makeDoctorsObject("Кардіолог",visitСardiologist.createFormСardiologist,visitСardiologist)
    makeDoctorsObject("Стоматолог",visitDentist.createFormDentist,visitDentist)
    makeDoctorsObject("Терапевт",visitTherapeutic.createFormTherapeutic,visitTherapeutic)
}
createVisitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    modal.createModal("Створити візит")
    modal.clickCloseModal()
    const form =document.querySelector(".modal-creating__form");
    const chooseDoctor = document.querySelector(".modal__content__choose__doctor");
    const doctors = {};
    changeFormInputs(doctors,visitСardiologist,visitDentist,visitTherapeutic)
    chooseDoctor.addEventListener("change", ()=>{
        form.innerHTML="";
        doctors[chooseDoctor.value](form);
        getDataFromForma(tokenUser,modal) 
    })

    })
   
export {visitDentist,visitTherapeutic,visitСardiologist,changeFormInputs}