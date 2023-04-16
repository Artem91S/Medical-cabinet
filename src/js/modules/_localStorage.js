// /: d27dc183-2d35-4901-9c3c-7ccd9e890e13 sitnikov.artem91@gmail.com pass:12345
import { tokenUser,boarderText} from "./_login.js"
import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,Validation} from './_cardsFilters.js'
import {Card,CardiologistCard,DentistCard,TherapistCard,boardOfCards} from './_creatCard.js'
import {Modal,VisitDentist,VisitTherapeutic,VisitСardiologist}from './_creatModal.js'

async function renderingLoginCards(tokenUser){
  let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenUser}`
  }})
let json = await response.json();
if(json.length!==0){
  boarderText.classList.add("hidden")
  visualCard(json)
}
else{
  boarderText.classList.remove("hidden")
}

}
document.querySelector('.board-of-cards').addEventListener('click', (e)=>{
  let parentElementOfClickId = e.target.closest("div").parentElement.dataset.id;
  if(e.target.className === 'board-of-cards__patient-card__edit-btn' && e.target.closest("div").parentElement.dataset.id === parentElementOfClickId){
    createModalForChanges(parentElementOfClickId)
  }
})
async function createModalForChanges(parentElementOfClickId){
        const object = {};
        const contentObj = {};
        getCardsValue(contentObj,"board-of-cards__patient-card__content",parentElementOfClickId);
        getCardsValue(object,"board-of-cards__patient-card__more-details",parentElementOfClickId);
        const card ={...contentObj,...object}
        const {doctor} =card;
        let modals = new Modal()
        let newVisitDentist = new VisitDentist(card);
        let newVisitTherapeutic = new VisitTherapeutic(card);
        let newVisitCardiologist = new VisitСardiologist(card)
        doctor === "Стоматолог"?(
          newVisitDentist.changeForm(card),
          putDataFromForma(modals,tokenUser,parentElementOfClickId),
          modals.clickCloseModal() 
        ):
        doctor === "Терапевт"? (
          newVisitTherapeutic.changeForm(card),
          putDataFromForma(modals,tokenUser,parentElementOfClickId),
          modals.clickCloseModal() 
        ):
        doctor === "Кардіолог"? (
          newVisitCardiologist.changeForm(card),  
          modals.clickCloseModal(),
          putDataFromForma(modals,tokenUser,parentElementOfClickId)
        
        ):""
      }

function visualCard (json){
        let validation = new Validation(inputSearch,json,btnSearch);
        document.querySelector('.cards-filters').addEventListener('change',()=>{

           validation.validationFilters(selectCondition,"visitStatus",false),
           validation.validationFilters(selectVisitsTerm,"visitUrgency",true),
           validation.clickOnButtonSearch()
       })
       let cards =new Card();
       cards.deleteCard(boardOfCards)
       json.forEach(card=>{
         const cardsValues = Object.values(card);
         const [doctor]= cardsValues;
         let objDoctor; 
           doctor === "Кардіолог"?objDoctor = new CardiologistCard(...cardsValues):
           doctor === "Стоматолог"?objDoctor =new DentistCard(...cardsValues):
           doctor === "Терапевт"?objDoctor =new TherapistCard(...cardsValues):"";
           objDoctor.renderingCard()
       }) 
      }

function getCardsValue(obj,className,parentElementOfClickId){
        const dataOfCard =Array.from(document.querySelector(`[data-id="${parentElementOfClickId}"]`).querySelector(`.${className}`).children)
        const filterData= dataOfCard.filter(element=>{
          if(element.hasAttribute('data-name'))return element 
        })
        filterData.forEach(card =>{
          obj[card.dataset.name] = card.textContent;
        })
      }


function putDataFromForma(modalka,tokenUser,cardId){
    const card =document.querySelector(`[data-id="${cardId}"]`)
        const modal= document.querySelector(".modal");
        const btn = document.querySelector(".btn__rewrite");
            btn.addEventListener('click',()=>{
                const user ={};
                let all = modal.querySelectorAll('select,input,textarea');
                all.forEach(element =>{
                    const {name} = element
                    user[name] =element.value
                })
                fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenUser}`
                },
                body: JSON.stringify(user)
    })
      .then(response => {
        if(response.ok)return response.json()})
    .then(data=> {
        card.remove()
        modalka.closeModal()
        visualCard([data])
        })
      })
    }
function getDataFromForma(tokenUser,modal){
        const modals= document.querySelector(".modal");
        const btn = document.querySelector(".btn__send__visit");
      btn.addEventListener('click',()=>{
          const user ={};
          let all = modals.querySelectorAll('select,input,textarea');
          all.forEach(element =>{
              const {name} = element
              user[name] =element.value
          })
          fetch("https://ajax.test-danit.com/api/v2/cards", {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenUser}`
          },
          body: JSON.stringify(user)
})
.then(response => response.json())
.then(data=>{
  modal.closeModal()
  visualCard([data])
})
      })
      }

export{renderingLoginCards,visualCard,getDataFromForma,createModalForChanges}
