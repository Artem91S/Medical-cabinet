import {tokenUser} from './_login.js'
import {Modal,Visit,VisitСardiologist,VisitDentist,VisitTherapeutic} from './_creatModal.js'

let modal = new Modal("Кардіолог","Стоматолог","Терапевт");
let visitСardiologist = new VisitСardiologist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Звичайний тиск","Індекс маси тіла","Перенесені захворювання серцево-судинної системи","Вік")
let visitDentist = new VisitDentist("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Дата останнього відвідування")
let visitTherapeutic = new VisitTherapeutic("ПІБ","Мета візиту","Короткий опис візиту","Tерміновість","Вік")
const createVisitButton = document.querySelector('.header__btn-create-card');

createVisitButton.addEventListener("click",(e)=>{
    e.preventDefault();
    modal.createModal()
    const sendUser = document.querySelector('.btn__send__visit');
    const closeButton =document.querySelector('.modal-login__close-btn');
    const modalSection =document.querySelector('.modal');
    modal.clickCloseModal(modalSection,closeButton)
    modal.getDataFromForma(sendUser,modalSection,tokenUser)
    const form =document.querySelector(".modal-creating__form");
    const chooseDoctor = document.querySelector(".choose__doctor");
    const doctors = {};
    function makeDoctorsObject(key,value,modal){
        return doctors[key]= value.bind(modal)
    }
    makeDoctorsObject("Сardiologist",visitСardiologist.createFormСardiologist,visitСardiologist)
    makeDoctorsObject("Dentist",visitDentist.createFormDentist,visitDentist)
    makeDoctorsObject("Therapeutic",visitTherapeutic.createFormTherapeutic,visitTherapeutic)
    chooseDoctor.addEventListener("change", ()=>{
        form.innerHTML="";////delete form content
        doctors[chooseDoctor.value](form);
    })
    })
   
