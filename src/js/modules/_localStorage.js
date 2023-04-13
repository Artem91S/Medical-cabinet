// /: d27dc183-2d35-4901-9c3c-7ccd9e890e13 sitnikov.artem91@gmail.com pass:12345
import { tokenUser} from "./_login.js"
import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,arrayOfCards,Validation} from './_cardsFilters.js'
import {Card,CardiologistCard,DentistCard,TherapistCard,boardOfCards} from './_creatCard.js'
import {Modal}from './_creatModal.js'
import {visitDentist,visitСardiologist,visitTherapeutic} from './_createVisit.js'
async function renderingLoginCards(tokenUser){
  let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenUser}`
  }})
let json = await response.json();


let validation = new Validation(inputSearch,json,btnSearch,arrayOfCards);
 document.querySelector('.cards-filters').addEventListener('change',()=>{
  selectCondition.value === "Усі"?validation.validationFilters(selectVisitsTerm,"visitUrgency"):
  selectVisitsTerm.value === "Усі"?validation.validationFilters(selectCondition,"visitStatus"):(
    validation.validationFilters(selectCondition,"visitStatus"),
    validation.validationFilters(selectVisitsTerm,"visitUrgency")
  )
})

validation.clickOnButtonSearch();
let cards =new Card();
cards.deleteCard(boardOfCards)
json.forEach(card=>{
// console.log(card);
// fetch('https://ajax.test-danit.com/api/v2/cards/161931', {
//   method: 'DELETE',
//   headers: {
//       'Authorization': `Bearer ${tokenUser}`
//   },
// })
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
          // console.log(changingCard)
          let changeModal =new Modal("Кардіолог","Стоматолог","Терапевт");
          
        

          changeModal.createModal();

          let sectionModal = document.querySelector('.modal');
          let closeButton = document.querySelector('.modal__content__close-btn')
          let form = document.querySelector('.modal-creating__form');
          let btnSubmitData =document.querySelector('.btn__send__visit')
          btnSubmitData.classList.add("position")
          let optionDoctorSelected = document.querySelector('.modal__content__choose__doctor').querySelectorAll('option');
                  
          sectionModal.addEventListener("click",(e)=>{
            if(e.target === closeButton || e.target === sectionModal )
              changeModal.closeModal();
              renderingLoginCards(tokenUser)
                })
          doctor === "Сardiologist"?(
            optionDoctorSelected[0].selected= 'selected',
            visitСardiologist.changeForm(form,changingCard),
            changeModal.putDataFromForma(btnSubmitData,sectionModal,tokenUser,parentElementOfClickId)
            ):"";
         
          doctor === "Dentist"?(
            optionDoctorSelected[1].selected ='selected',
            visitDentist.changeForm(form,changingCard),
            changeModal.putDataFromForma(btnSubmitData,sectionModal,tokenUser,parentElementOfClickId)
                        ):"";
          doctor === "Therapeutic"?(
            optionDoctorSelected[2].selected= 'selected',
            visitTherapeutic.changeForm(form,changingCard),
            changeModal.putDataFromForma(btnSubmitData,sectionModal,tokenUser,parentElementOfClickId)
            ):""
          
          boardOfCards.innerHTML ="";
          btnSubmitData.addEventListener('click', ()=>{
            changeModal.closeModal();
            renderingLoginCards(tokenUser)
          }
            )
        }     
      }

export{renderingLoginCards}
// export {renderingLoginCards,setDataInLocalStorage,validateEnter,reloadPage}