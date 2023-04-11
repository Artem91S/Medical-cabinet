// // /: d27dc183-2d35-4901-9c3c-7ccd9e890e13 sitnikov.artem91@gmail.com pass:12345
// // import {token} from "./_login.js"
// import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,arrayOfCards,Validation} from './_cardsFilters.js'
// // import Modal from './_modal.js'
// // import {getData} from '../app.js'
// // import {renderingLoginCards} from './_localStorage.js'
// // import { VisitCardiologist,VisitDentist,VisitTherapist ,Visit} from './_Visit.js'
// const boardOfCards =document.querySelector('.board-of-cards');
// export class Card{
//     constructor(fullName,visitType,visitDescription,visitUrgency,id){
//       this.status = "Open",////no in our card
//       this.visitType = visitType,
//       this.fullName=fullName,
//       this.visitDescription=visitDescription,
//       this.id = id,
//       this.visitUrgency=visitUrgency
//     }
//     renderingCard(){
//         let card = `
//         <div class="board-of-cards__patient-card" data-doctor=${this.doctor} data-id=${this.id}>
//             <h2  class="board-of-cards__patient-card__title" >Картка візиту</h2>
//             <div  class="board-of-cards__patient-card__options" >
//             <p class="board-of-cards__patient-card__close-btn">&times;</p>
//             <p class="board-of-cards__patient-card__edit-btn" data-id=${this.id}>&#10000;</p>
//             </div>
//             <div class="board-of-cards__patient-card__content">
//               <p class="board-of-cards__patient-card__property-name">Статус:</p>
//               <p class="board-of-cards__patient-card__property-name">${this.status}</p>
//               <p class="board-of-cards__patient-card__property-name">ПІБ:</p>
//               <p class="board-of-cards__patient-card__property-name">${this.fullName}</p>
//               <p class="board-of-cards__patient-card__property-name">Терміновість візиту:</p>
//               <p class="board-of-cards__patient-card__property-name">${this.visitUrgency}</p>
//             <button class="board-of-cards__patient-card__btn-details" data-id="${this.id}__btn">Детальніше</button>
//             <div class="board-of-cards__patient-card__more-details">
//               <p class="board-of-cards__patient-card__property-name">Тип візиту:</p>
//               <p class="board-of-cards__patient-card__property-name">${this.visitType}</p>
//               <p class="board-of-cards__patient-card__property-name">Опис:</p>
//               <p class="board-of-cards__patient-card__property-name">${this.visitDescription}</p>
//             </div>
//           </div>
//         </div>
//         `
//        document.querySelector('.board-of-cards').insertAdjacentHTML('beforeend', card);
 
//       }
//   hiddenDetails(btn){
//       btn.addEventListener('click', e=>{
//       e.target.closest("div").querySelector(".board-of-cards__patient-card__more-details").classList.toggle("click-on-details")
//     })
//    }
// change(){
//   ///change
//   boardOfCards.addEventListener('click', (e)=>{
//     let parentElementOfClick = e.target.closest("div").parentElement;
//     if(e.target.className === "board-of-cards__patient-card__edit-btn"){
//      let modalChange = new Modal("Редагування картки","Змінити");
//      let visit = new Visit(modalChange);
//       visit.renderDoctorSelectInput()
//       visit.renderDefaultInputs()
//       visit.doctorSelectListener()
//       modalChange.handleCloseModal()
//       const putRequest = async (target) => {
//         try{
//           let cardId = parentElementOfClick.dataset.id;
//                 const send = await target.handleSubmitForm(
//                   `https://ajax.test-danit.com/api/v2/cards/${cardId}`,
//                   'PUT',
//                   {'Content-type': 'application/json',
//                     'Authorization': 'Bearer d27dc183-2d35-4901-9c3c-7ccd9e890e13'},
//                   'json')
//                   boardOfCards.innerHTML =""
//                   target.closeModal()  ;
//                   renderingLoginCards()
//               }
//               catch (err) {
//                 console.log(err)
//                 putRequest(target)
//               }
//     }
//     let btnSend = document.querySelector('.modal__btn')
//     btnSend.addEventListener('click',()=>{
//             putRequest(modalChange)
//             renderingLoginCards()
//             })
         
//     }
//   })
// }

// deleteCard(boardOfCards){
//        boardOfCards.addEventListener("click", (e)=>{
//         let parentElementOfClick = e.target.closest("div").parentElement;
//     if(e.target.className === "board-of-cards__patient-card__close-btn"){
//            // let cardId = parentElementOfClick.dataset.id;
//           if(confirm("Ви дійсно хочити видалити картку?"))
//         {
//           try {
//             parentElementOfClick.remove()
//             fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Authorization': "Bearer d27dc183-2d35-4901-9c3c-7ccd9e890e13"
//                 },
//             })
//                 .then(response => console.log(response.status))
               
//         } catch (error) {
//             console.error(error)
//         }
//         }
//     }
//   })
       
//     }
//   }

// export class CardiologistCard extends Card{
// constructor(doctor,fullName,visitType,visitDescription,visitUrgency,bloodPressure,bodyMassIndex,cardiovascularDisease,age,id){
// super(fullName,visitType,visitDescription,visitUrgency,id)
// this.doctor = doctor,
// this.bloodPressure = bloodPressure,
// this.bodyMassIndex = bodyMassIndex,
// this.cardiovascularDisease = cardiovascularDisease,
// this.age = age
// }
// renderingCard(){
//   super.renderingCard()
//   let btn = document.querySelector(`[data-id="${this.id}__btn"]`)
//   let cardContent = `
//       <p class="board-of-cards__patient-card__property-name">Доктор:</p>
//       <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
//       <p class="board-of-cards__patient-card__property-name">Вік:</p>
//       <p class="board-of-cards__patient-card__property-name">${this.age}</p>
//       <p class="board-of-cards__patient-card__property-name">Тиск:</p>
//       <p class="board-of-cards__patient-card__property-name">${this.bloodPressure}</p>
//       <p class="board-of-cards__patient-card__property-name">Індекс тіла:</p>
//       <p class="board-of-cards__patient-card__property-name">${this.bodyMassIndex}</p>
//       <p class="board-of-cards__patient-card__property-name">Серцеві захворювання:</p>
//       <p class="board-of-cards__patient-card__property-name">${this.cardiovascularDisease}</p>
 
//   `
// btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
// super.hiddenDetails(btn)

// }
// change(){
//   super.change()
// }
// }
// export class DentistCard extends Card{
//   constructor(doctor,fullName,visitType,visitDescription,visitUrgency,visitDate,id){
//   super(fullName,visitType,visitDescription,visitUrgency,id)
//   this.doctor = doctor,
//   this.visitDate = visitDate
//   }
//   renderingCard(){
//     super.renderingCard()
//     let btn = document.querySelector(`[data-id="${this.id}__btn"]`)
//     let cardContent = `
//         <p class="board-of-cards__patient-card__property-name">Доктор:</p>
//         <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
//         <p class="board-of-cards__patient-card__property-name">Дата візиту:</p>
//         <p class="board-of-cards__patient-card__property-name">${this.visitDate}</p>
//     `
//     btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
//   super.hiddenDetails(btn)

//   }
//   change(){
//     super.change()
//   }

//   }
// export class TherapistCard extends Card{
//     constructor(doctor,fullName,visitType,visitDescription,visitUrgency,age,id){
//     super(fullName,visitType,visitDescription,visitUrgency,id)
//     this.doctor = doctor,
//     this.ageTherapist = age
//     }
//     renderingCard(){
//       super.renderingCard()
//       let btn = document.querySelector(`[data-id="${this.id}__btn"]`);
//       let cardContent = `
//           <p class="board-of-cards__patient-card__property-name">Доктор:</p>
//           <p class="board-of-cards__patient-card__property-name">${this.doctor}</p>
//           <p class="board-of-cards__patient-card__property-name">Вік:</p>
//           <p class="board-of-cards__patient-card__property-name">${this.ageTherapist}</p>
//       `
//       btn.closest("div").querySelector('.board-of-cards__patient-card__more-details').insertAdjacentHTML('beforeend',cardContent)
//     super.hiddenDetails(btn)
//     }
//     change(){
//       super.change()
//     }
 
//     }
// export {boardOfCards}
