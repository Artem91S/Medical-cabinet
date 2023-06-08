import { tokenUser,boarderText} from "./_login.js"
import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,Validation} from './_cardsFilters.js'
import {Card,CardiologistCard,DentistCard,TherapistCard,boardOfCards} from './_creatCard.js'
import {Modal}from './_creatModal.js'
import { changeFormInputs } from "./_createVisit.js"
let cardDataArray=[];
async function renderingLoginCards(tokenUser){
  let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${tokenUser}`
  }})
let json = await response.json();
if(json.length!==0){
  cardDataArray= json;
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
        let modals = new Modal("Кардіоло","Стоматолог","Терапевт");
        let changeDentist ;
        let changeСardiologist;
        let changeTherapeutic;
        const doctors = {};
        changeFormInputs(doctors,changeСardiologist,changeDentist,changeTherapeutic)
        modals.createModal("Змінити візит")
          const form =document.querySelector(".modal-creating__form")
          const doctorSelected = document.querySelector(".modal__content__choose__doctor");
          document.querySelectorAll(".doctor").forEach(element=>{
            element.value === doctor? element.selected="selected":""
          })
          doctors[card.doctor](form);
          document.querySelectorAll("input,textarea,select").forEach(elem=>{
            Object.keys(card).includes(elem.name)?elem.value = card[elem.name]:""
          })
          doctorSelected.addEventListener("change", ()=>{
            form.innerHTML="";
            doctors[doctorSelected.value](form);
            document.querySelectorAll("input,textarea,select").forEach(elem=>{
              card.doctor =doctorSelected.value
              Object.keys(card).includes(elem.name)?elem.value = card[elem.name]:""
  
            })
          })
          putDataFromForma(modals,tokenUser,parentElementOfClickId),
          modals.clickCloseModal() 
      }
function visualCard (json){
        let validation = new Validation(inputSearch,json,btnSearch);
        document.querySelector('.cards-filters').addEventListener('change',()=>{
           validation.validationFilters(selectCondition,"visitStatus",false),
           validation.validationFilters(selectVisitsTerm,"visitUrgency",true),
           validation.clickOnButtonSearch()
       })
       let cards =new Card();
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
        const btn = document.querySelector(".btn__send__visit");
            btn.addEventListener('click',()=>{
                const user ={};
                let all = modal.querySelectorAll('select,input,textarea');
                all.forEach(element =>{
                    const {name} = element
                    user[name] =element.value
                    if(element.value.length === 0){
                      element.nextElementSibling?.className !== "error-create-card"?element.insertAdjacentHTML('afterend',`<p class="error-create-card">поле не може бути пустим</p>`):""
                      }
                     else{
                      element.nextElementSibling?.className == "error-create-card"?element.nextElementSibling.remove():''
                     }
                })
                cardDataArray=cardDataArray.filter(elem=>{
                    if(elem.id != cardId) return elem
                })
                if(Object.values(user).every(element=> element.length >0)){
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
                    
                    cardDataArray = [data,...cardDataArray]
                    card.remove()
                    visualCard([data])
                    modalka.closeModal()
                    })
         }   
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
            if(element.value.length === 0){
            element.nextElementSibling?.className !== "error-create-card"?element.insertAdjacentHTML('afterend',`<p class="error-create-card">поле не може бути пустим</p>`):""
            }
           else{
            element.nextElementSibling?.className == "error-create-card"?element.nextElementSibling.remove():''
           }
          })
          if(Object.values(user).every(element=> element.length >0)){
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
                      cardDataArray = [data,...cardDataArray]
                      modal.closeModal()
                      visualCard([data])
                      })
                   }
              })
      }
function showTextAfterDelete(){
        boardOfCards.contains(document.querySelector('.board-of-cards__patient-card'))?"":boarderText.classList.remove('hidden')
        
          }

function deleteCard(blockOfCards){
  let loading =document.querySelector('.wrapp-loader')
  blockOfCards.addEventListener("click", (e)=>{
    let parentElementOfClick = e.target.closest("div").parentElement;
      if(e.target.className === "board-of-cards__patient-card__close-btn"){
       let cardId = parentElementOfClick.dataset.id;
       if(confirm("Ви дійсно хочити видалити картку?")) {
        loading.classList.remove("hidden")
    
   try {
        fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization':`Bearer ${tokenUser}`
            },
        })
        .then(response=>{
          if(response.status === 200){
            setTimeout(()=>{
              loading.classList.add("hidden")
             },2000)
         
                parentElementOfClick.remove()
                showTextAfterDelete()
          }
        cardDataArray=cardDataArray.filter(elem=>{
          if(elem.id != cardId) return elem
         
      })    
        })
    } catch (error) {
        console.error(error)
    } 
}}
})
}
deleteCard(boardOfCards)
      
export{cardDataArray,renderingLoginCards,visualCard,getDataFromForma,createModalForChanges,showTextAfterDelete}
