import {tokenUser} from "./_login.js"
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
              <p class="board-of-cards__patient-card__property-name">Доктор:</p>
              <p class="board-of-cards__patient-card__property-name"data-name="doctor">${this.doctor}</p>
              <p class="board-of-cards__patient-card__property-name">ПІБ:</p>
              <p class="board-of-cards__patient-card__property-name" data-name="fullName">${this.fullName}</p>
            <button class="board-of-cards__patient-card__btn-details" data-btn="${this.id}">Детальніше</button>
            <div class="board-of-cards__patient-card__more-details" data-detailsid="${this.id}">
              <p class="board-of-cards__patient-card__property-name">Статус:</p>
              <p class="board-of-cards__patient-card__property-name" data-name="visitStatus">${this.status}</p>
              <p class="board-of-cards__patient-card__property-name">Терміновість візиту:</p>
              <p class="board-of-cards__patient-card__property-name" data-name="visitUrgency">${this.visitUrgency}</p>
              <p class="board-of-cards__patient-card__property-name">Тип візиту:</p>
              <p class="board-of-cards__patient-card__property-name" data-name="visitType">${this.visitType}</p>
              <p class="board-of-cards__patient-card__property-name">Опис:</p>
              <p class="board-of-cards__patient-card__property-name" data-name="visitDescription">${this.visitDescription}</p>
            </div>
          </div>
        </div>
        `
        boardOfCards.insertAdjacentHTML('beforeend', card);
 
      }
    hiddenDetails(btn){
      let all = document.querySelectorAll('.board-of-cards__patient-card__more-details');
      try{
        window.addEventListener('click', e=>{
          let showElement =e.target.closest("div").querySelector(".board-of-cards__patient-card__more-details");
          if(e.target.dataset.btn === btn.dataset.btn ){
            showElement.classList.toggle("click-on-details")
          }
          else{
          all.forEach(section=>{
          if(section.dataset.detailsid === btn.dataset.btn ){
            section.classList.remove("click-on-details")
          }
          })
          }
        })
      }
      catch(err){
        console.log(err);
      }
      

    // window.addEventListener("click", (e)=>{
    //   if(e.target.parentElement.dataset.id == e.target.dataset.id){
    //     e.target.closest("div").querySelector(".board-of-cards__patient-card__more-details").classList.toggle("click-on-details")

    //   }
    // })
   }
    deleteCard(blockOfCards){
      blockOfCards.addEventListener("click", (e)=>{
        let parentElementOfClick = e.target.closest("div").parentElement;
          if(e.target.className === "board-of-cards__patient-card__close-btn"){
          //  let cardId = parentElementOfClick.dataset.id;
       try {
            fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization':`Bearer ${tokenUser}`
                },
            })
            .then(response => {
                    if(response.status === 200){
                      if(confirm("Ви дійсно хочити видалити картку?")) return parentElementOfClick.remove()
                    }})
        } catch (error) {
            console.error(error)
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
      let btn = document.querySelector(`[data-btn="${this.id}"]`)
    let cardContent = `
      <p class="board-of-cards__patient-card__property-name">Вік:</p>
      <p class="board-of-cards__patient-card__property-name" data-name="age">${this.age}</p>
      <p class="board-of-cards__patient-card__property-name">Тиск:</p>
      <p class="board-of-cards__patient-card__property-name" data-name="bloodPressure">${this.bloodPressure}</p>
      <p class="board-of-cards__patient-card__property-name">Індекс тіла:</p>
      <p class="board-of-cards__patient-card__property-name" data-name="bodyMassIndex">${this.bodyMassIndex}</p>
      <p class="board-of-cards__patient-card__property-name">Серцеві захворювання:</p>
      <p class="board-of-cards__patient-card__property-name" data-name="cardiovascularDisease">${this.cardiovascularDisease}</p>
 
  `
btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
// super.hiddenDetails(btn)
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
    let btn = document.querySelector(`[data-btn="${this.id}"]`)
    let cardContent = `
        <p class="board-of-cards__patient-card__property-name">Дата візиту:</p>
        <p class="board-of-cards__patient-card__property-name" data-name="visitDate">${this.visitDate}</p>
    `
    btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
    super.hiddenDetails(btn)

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
      let btn = document.querySelector(`[data-btn="${this.id}"]`)

      let cardContent = `
          <p class="board-of-cards__patient-card__property-name">Вік:</p>
          <p class="board-of-cards__patient-card__property-name"data-name="age">${this.ageTherapist}</p>
      `
      btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
      super.hiddenDetails(btn)
    }
    }
export {boardOfCards}
