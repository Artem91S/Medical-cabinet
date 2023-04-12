// /: d27dc183-2d35-4901-9c3c-7ccd9e890e13 sitnikov.artem91@gmail.com pass:12345
import { tokenUser} from "./_login.js"
import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,arrayOfCards,Validation} from './_cardsFilters.js'
import {Card,CardiologistCard,DentistCard,TherapistCard,boardOfCards} from './_creatCard.js'
import {Modal,Visit,VisitСardiologist,VisitDentist,VisitTherapeutic}from './_creatModal.js'
import {visitDentist} from './_createVisit.js'
async function renderingLoginCards(tokenUser){
  let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenUser}`
  }})
let json = await response.json();
let validation = new Validation(inputSearch,json,btnSearch,arrayOfCards);
validation.validationFilters(selectCondition,"gggg");
validation.validationFilters(selectVisitsTerm,"visitUrgency");
validation.clickOnButtonSearch();
let cards =new Card();
cards.deleteCard(boardOfCards)
// boardOfCards.addEventListener('click', (e)=>{
//   let parentElementOfClickId = e.target.closest("div").parentElement.dataset.id;
//   if(e.target.className === 'board-of-cards__patient-card__edit-btn' && e.target.closest("div").parentElement.dataset.id === parentElementOfClickId){
//     createModalForChanges(tokenUser,parentElementOfClickId)
//   }
// })

// fetch(`https://ajax.test-danit.com/api/v2/cards/161521`, {
//   method: 'DELETE',
//   headers: {
//       'Authorization': `Bearer ${tokenUser}`
//   },
// })
json.forEach(card=>{

  const cardsValues = Object.values(card);
  const [doctor,...rest]= cardsValues;
  let objDoctor;
  switch (doctor) {
    case "Сardiologist":
      objDoctor = new CardiologistCard(...cardsValues);
    break;
    case "Dentist":
      objDoctor =new DentistCard(...cardsValues);
      
    break;
    case "Therapeutic":
      objDoctor =new TherapistCard(...cardsValues);
      
    break;
    default: console.log("Помилка");
      break;
}
objDoctor.renderingCard()

}) 
}

document.querySelector('.board-of-cards').addEventListener('click', (e)=>{
  let parentElementOfClickId = e.target.closest("div").parentElement.dataset.id;
  if(e.target.className === 'board-of-cards__patient-card__edit-btn' && e.target.closest("div").parentElement.dataset.id === parentElementOfClickId){
    createModalForChanges(tokenUser,parentElementOfClickId)
  }
})

  
 
async function createModalForChanges(tokenUser,parentElementOfClickId){
  
        let response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${parentElementOfClickId}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenUser}`
          }})
          if(response.ok){
          let changingCard = await response.json()
          const {doctor}=changingCard 
          console.log(changingCard)
          let changeModal =new Modal("Кардіолог","Стоматолог","Терапевт");
          
          changeModal.createModal();

          let sectionModal = document.querySelector('.modal');
          let closeButton = document.querySelector('.modal-login__close-btn');
          let form = document.querySelector('.modal-creating__form');
          let btnSubmitData =document.querySelector('.btn__send__visit')
          let optionDoctorSelected = document.querySelector('.choose__doctor').querySelectorAll('option');

      
          doctor === "Сardiologist"?optionDoctorSelected[0].selected= 'selected':""
         
          doctor === "Dentist"?(
            optionDoctorSelected[1].selected ='selected',
            visitDentist.changeForm(form,changingCard),
            changeModal.putDataFromForma(btnSubmitData,sectionModal,tokenUser,parentElementOfClickId),            
            changeModal.clickCloseModal(sectionModal,closeButton)
            ):""
          doctor === "Therapeutic"? optionDoctorSelected[2].selected= 'selected':""
          
          boardOfCards.innerHTML ="";
           
          
          btnSubmitData.addEventListener('click', ()=>{
            changeModal.closeModal();
            renderingLoginCards(tokenUser)
          }
            )
        }     
      }

export{renderingLoginCards,createModalForChanges}
// export {renderingLoginCards,setDataInLocalStorage,validateEnter,reloadPage}