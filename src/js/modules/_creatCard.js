import { Modal } from "./_creatModal.js";
import {tokenUser} from "./_login.js"
// import {createModalForChanges} from './_localStorage.js'
const boardOfCards =document.querySelector('.board-of-cards');
export class Card{
    constructor(fullName,visitType,visitDescription,visitStatus,visitUrgency,id){
      this.visitType = visitType,
      this.fullName=fullName,
      this.visitDescription=visitDescription,
      this.id = id,
      this.visitUrgency=visitUrgency,
      this.status =visitStatus
    }
    renderingCard(){
        let card = `
        <div class="board-of-cards__patient-card" data-doctor=${this.doctor} data-id=${this.id}>
            <h2  class="board-of-cards__patient-card__title" >Картка візиту</h2>
            <div  class="board-of-cards__patient-card__options" >
            <p class="board-of-cards__patient-card__close-btn">&times;</p>
            <p class="board-of-cards__patient-card__edit-btn" >&#10000;</p>
            </div>
            <div class="board-of-cards__patient-card__content">
              <p class="board-of-cards__patient-card__property-name">Статус:</p>
              <p class="board-of-cards__patient-card__property-name">${this.status}</p>
              <p class="board-of-cards__patient-card__property-name">ПІБ:</p>
              <p class="board-of-cards__patient-card__property-name">${this.fullName}</p>
              <p class="board-of-cards__patient-card__property-name">Терміновість візиту:</p>
              <p class="board-of-cards__patient-card__property-name">${this.visitUrgency}</p>
            <button class="board-of-cards__patient-card__btn-details" data-id="${this.id}__btn">Детальніше</button>
            <div class="board-of-cards__patient-card__more-details">
              <p class="board-of-cards__patient-card__property-name">Тип візиту:</p>
              <p class="board-of-cards__patient-card__property-name">${this.visitType}</p>
              <p class="board-of-cards__patient-card__property-name">Опис:</p>
              <p class="board-of-cards__patient-card__property-name">${this.visitDescription}</p>
            </div>
          </div>
        </div>
        `
       document.querySelector('.board-of-cards').insertAdjacentHTML('beforeend', card);
 
      }
  hiddenDetails(btn){
      btn.addEventListener('click', e=>{
      e.target.closest("div").querySelector(".board-of-cards__patient-card__more-details").classList.toggle("click-on-details")
    })
   }
change(){
  // boardOfCards.addEventListener('click', (e)=>{
  //   let parentElementOfClickId = e.target.closest("div").parentElement.dataset.id;
  //   if(e.target.className === 'board-of-cards__patient-card__edit-btn' && e.target.closest("div").parentElement.dataset.id === parentElementOfClickId){
  //     createModalForChanges(tokenUser,parentElementOfClickId)
  //   }
  // })

  ///lister
  // renderingLoginCards(tokenUser)


  ///change
  // boardOfCards.addEventListener('click', (e)=>{
  //   let parentElementOfClick = e.target.closest("div").parentElement;
  //   if(e.target.className === "board-of-cards__patient-card__edit-btn"){
  //     // renderingLoginCards(tokenUser,true)
     
         
  //   }
  // })
}

deleteCard(boardOfCards){
       boardOfCards.addEventListener("click", (e)=>{
        let parentElementOfClick = e.target.closest("div").parentElement;
    if(e.target.className === "board-of-cards__patient-card__close-btn"){
           // let cardId = parentElementOfClick.dataset.id;
          if(confirm("Ви дійсно хочити видалити картку?"))
        {
          try {
            
            fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${tokenUser}`
                },
            })
                .then(response => {
                    if(response.status === 200){
                        parentElementOfClick.remove()
                    }})
               
        } catch (error) {
            console.error(error)
        }
        }
    }
  })
       
    }
  }

export class CardiologistCard extends Card{
constructor(doctor,fullName,visitType,visitDescription,visitStatus,visitUrgency,bloodPressure,bodyMassIndex,cardiovascularDisease,age,id){
super(fullName,visitType,visitDescription,visitStatus,visitUrgency,id)
this.doctor = doctor,
this.bloodPressure = bloodPressure,
this.bodyMassIndex = bodyMassIndex,
this.cardiovascularDisease = cardiovascularDisease,
this.age = age
}
renderingCard(){
  super.renderingCard()
  let btn = document.querySelector(`[data-id="${this.id}__btn"]`)
  let cardContent = `
      <p class="board-of-cards__patient-card__property-name">Доктор:</p>
      <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
      <p class="board-of-cards__patient-card__property-name">Вік:</p>
      <p class="board-of-cards__patient-card__property-name">${this.age}</p>
      <p class="board-of-cards__patient-card__property-name">Тиск:</p>
      <p class="board-of-cards__patient-card__property-name">${this.bloodPressure}</p>
      <p class="board-of-cards__patient-card__property-name">Індекс тіла:</p>
      <p class="board-of-cards__patient-card__property-name">${this.bodyMassIndex}</p>
      <p class="board-of-cards__patient-card__property-name">Серцеві захворювання:</p>
      <p class="board-of-cards__patient-card__property-name">${this.cardiovascularDisease}</p>
 
  `
btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
super.hiddenDetails(btn)

}
change(){
  super.change()
}
}
export class DentistCard extends Card{
  constructor(doctor,fullName,visitType,visitDescription,visitStatus,visitUrgency,visitDate,id){
  super(fullName,visitType,visitDescription,visitStatus,visitUrgency,id)
  this.doctor = doctor,
  this.visitDate = visitDate
  }
  renderingCard(){
    super.renderingCard()
    let btn = document.querySelector(`[data-id="${this.id}__btn"]`)
    let cardContent = `
        <p class="board-of-cards__patient-card__property-name">Доктор:</p>
        <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
        <p class="board-of-cards__patient-card__property-name">Дата візиту:</p>
        <p class="board-of-cards__patient-card__property-name">${this.visitDate}</p>
    `
    btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
  super.hiddenDetails(btn)

  }
  change(){
    super.change()
  }

  }
export class TherapistCard extends Card{
    constructor(doctor,fullName,visitType,visitDescription,visitStatus,visitUrgency,age,id){
    super(fullName,visitType,visitDescription,visitStatus,visitUrgency,id)
    this.doctor = doctor,
    this.ageTherapist = age
    }
    renderingCard(){
      super.renderingCard()
      let btn = document.querySelector(`[data-id="${this.id}__btn"]`);
      let cardContent = `
          <p class="board-of-cards__patient-card__property-name">Доктор:</p>
          <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
          <p class="board-of-cards__patient-card__property-name">Вік:</p>
          <p class="board-of-cards__patient-card__property-name">${this.ageTherapist}</p>
      `
      btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
    super.hiddenDetails(btn)
    }
    change(){
      super.change()
    }
 
    }
export {boardOfCards}
