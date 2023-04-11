// /: d27dc183-2d35-4901-9c3c-7ccd9e890e13 sitnikov.artem91@gmail.com pass:12345
// import {token} from "./_login.js"
// import {selectCondition ,selectVisitsTerm,inputSearch,btnSearch,arrayOfCards,Validation} from './_cardsFilters.js'
// import {Card,CardiologistCard,DentistCard,TherapistCard,boardOfCards} from './_creatCard.js'
// // import {toggleClass} from "../app.js"

// async function renderingLoginCards(){
// let response = await fetch("https://ajax.test-danit.com/api/v2/cards", {
//     method: 'GET',
//     headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer d27dc183-2d35-4901-9c3c-7ccd9e890e13 '
//   }})
// let json = await response.json()
// let validation = new Validation(inputSearch,json,btnSearch,arrayOfCards);
// validation.validationFilters(selectCondition,"gggg");
// validation.validationFilters(selectVisitsTerm,"visitUrgency");
// validation.clickOnButtonSearch()
// let cards =new Card();
// cards.deleteCard(boardOfCards)
// cards.change()
// json.forEach(card=>{
//   console.log(card);
// //   fetch(`https://ajax.test-danit.com/api/v2/cards/160767`, {
// //     method: 'DELETE',
// //     headers: {
// //         'Authorization': "Bearer d27dc183-2d35-4901-9c3c-7ccd9e890e13"
// //     },
// // })
//   const cardsValues = Object.values(card);
//   const [doctor,...rest]= cardsValues;
//   let objDoctor;
//   switch (doctor) {
//     case "Кардіолог":
//       objDoctor = new CardiologistCard(...cardsValues);
     
//     break;
//     case "Стоматолог":
//       objDoctor =new DentistCard(...cardsValues);
      
//     break;
//     case "Терапевт":
//       objDoctor =new TherapistCard(...cardsValues);
      
//     break;
//     default: console.log("Помилка");
//       break;
// }
// objDoctor.renderingCard()
// // objDoctor.change()

// })  
// }



// // function setDataInLocalStorage(token){
// //   let emailValue = document.querySelector('.modal__email').value
// //   let passwordValue =document.querySelector('.modal__password').value

// //   const user ={
// //       email:`${emailValue}`,
// //       password:`${passwordValue}`,
// //       token:`${token}`
// //   }

// // localStorage.setItem("mainUser",JSON.stringify(user))
// // }

// // function validateEnter(localObj,emailInput,passwordInput,tokens){
// // let values = JSON.parse(localObj)
// // if(values.email === emailInput && values.password === passwordInput && values.token === tokens){
// //   renderingLoginCards()
// // }
// // }

// // function reloadPage(localObj){
// //   if(typeof localObj == "undefined"){
// //     console.error("No values")
// //   }
// //   else{
// //     let values = JSON.parse(localObj);
// //     if(Object.keys(values).includes("token")){
// //       toggleClass('header__btn')
// //       toggleClass('board-of-cards__text')
// //       renderingLoginCards()
// //     }
// //   }
// // }
// // window.onload =()=>{
// //   reloadPage(localStorage.getItem("mainUser"))
// // }
 

// export {renderingLoginCards,setDataInLocalStorage,validateEnter,reloadPage}