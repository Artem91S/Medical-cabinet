
class Modal {
    constructor(cardiologist,dentist,therapeutic){
    this.title="",
    this.cardiologist= cardiologist;
    this.dentist = dentist;
    this.therapeutic =therapeutic
    }
    createModal(){
        let modal = `
    <section class="modal">
    <div class="modal__content">
        <div class="modal__content__close-btn">&times;</div>
              <h3 class="modal__content__title">Створити Візит</h3>  
              <select name="doctor" class="modal__content__choose__doctor">
                <option name="doctor" >Усі</option>
                <option name="doctor" value="Сardiologist">${this.cardiologist}</option>
                <option name="doctor" value="Dentist">${this.dentist}</option>
                <option name="doctor" value="Therapeutic">${this.therapeutic}</option>   
             </select>  
                <form class="modal-creating__form form flex__forma">            
                  
                </form>
        <button class="btn btn__send__visit">Відправити</button>
    </div>
    </section>
    `
    document.body.insertAdjacentHTML('beforeend', modal);
    }
    closeModal(){
        document.querySelector(".modal").remove()
    }
     clickCloseModal(modal,closeButton) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target ===closeButton) {
                this.closeModal()
            }
        })
    }
    createModalEnter(title){
        let modal = `
        <section class="modal">
        <div class="modal__content">
        <h2 class="modal__content__title">${title}</h2>
        <div class="modal__content__close-btn">&times;</div>
            <label for='email'>Email:</label>
            <input type='email' name='email' class="modal__email"/>
            <label for='password'>Password:</label>
            <input type='password' name='password' class="modal__password"/>
            <button class="modal__content__registration-btn btn btn--red">Увійти</button>
            </div>
        </section>
         `
        document.body.insertAdjacentHTML("beforeend",modal)
    }
    getDataFromForma(btn,modal,tokenUser){
        btn.addEventListener('click',()=>{
            const user ={};
            let all = modal.querySelectorAll('select,input,textarea');
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
  .then(response => {
    if(response.ok){
        modal.closeModal()
        renderingLoginCards(tokenUser)
    }
  })
        })
        }
    putDataFromForma(btn,modal,tokenUser,cardId){
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
      .then(response => response.json())
            })
            }
    }

class Visit {
    constructor(fullName,purpose,description,impotent,status){
        this.fullName = fullName;
        this.purpose =purpose;
        this.description =description;
        this.impotent=impotent;
        this.status = status
    }
createForma(elem){
    let addForm= `

                <label for="fullName"class="visit__labels">${this.fullName}:</label>
                     <input name="fullName" type="text" value="" class="border input--size">
               <label for="visitType" class="visit__labels">${this.purpose}:</label>
                     <input name="visitType" type="text" value="" class="border input--size">
                <label for="visitDescription" class="visit__labels">${this.description}:</label>
                     <textarea cols="10" class="border"  name="visitDescription" value="" rows="5"></textarea>
                <label for="impotent" class="visit__labels">${this.status}:</label>
                <select name="visitStatus" class="input--size">
                    <option name="visitStatus" value="Вікрита">Вікрита</option>
                    <option name="visitStatus"value="Закрита">Закрита</option>
                </select>
                <label for="impotent" class="visit__labels">${this.impotent}:</label>
                <select name="visitUrgency" class="input--size">
                    <option  value="Невідкладна">Невідкладна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Звичайна">Звичайна</option>                
              </select>`
            elem.insertAdjacentHTML("beforeend",addForm)
}
changeForm(elem,obj){
    const{doctor,fullName:pationtName,visitType:typeVisit,visitDescription:description,...rest}=obj
    let changeForm= `

                <label for="fullName"class="visit__labels">${this.fullName}:</label>
                     <input name="fullName" type="text" value="${pationtName}" class="border input--size">
               <label for="visitType" class="visit__labels">${this.purpose}:</label>
                     <input name="visitType" type="text" value="${typeVisit}" class="border input--size">
                <label for="visitDescription" class="visit__labels">${this.description}:</label>
                     <textarea cols="10" class="input--size" name="visitDescription" rows="5">${description}</textarea>
                <label for="impotent" class="visit__labels">${this.status}:</label>
                <select name="visitStatus" class="input--size">
                    <option name="visitStatus" value="Вікрита">Вікрита</option>
                    <option name="visitStatus" value="Закрита">Закрита</option>
                </select>
                <label for="impotent" class="visit__labels">${this.impotent}:</label>
                <select name="visitUrgency" class="input--size">
                    <option value="Невідкладна">Невідкладна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Звичайна">Звичайна</option>                
              </select>`
            elem.insertAdjacentHTML("beforeend",changeForm)
}

}
class VisitСardiologist extends Visit{
    constructor(initials,purpose,description,impotent, pressure,indexWeight,heartDisease,age,status){
        super(initials,purpose,description,impotent,status);
        this.pressure = pressure;
        this.indexWeight =indexWeight;
        this.heartDisease =heartDisease;
        this.age =age
    }
    createFormСardiologist(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Сardiologist">
           <label class="visit__labels">${this.pressure}:</label>
                <input name="bloodPressure" type="text" class="border input--size">
           <label class="visit__labels">${this.indexWeight}:</label>
                <input name="bodyMassIndex" type="text" class="border input--size">
           <label class="visit__labels">${this.heartDisease}:</label>
                <input name="cardiovascularDisease" type="text" class="border input--size">
           <label for="age"class="visit__labels">${this.age}:</label>
                <input name="age"type="text" class="border input--size">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
    changeForm(elem,obj){
        super.changeForm(elem,obj)

        let changeForm =`
           <<label class="visit__labels">${this.pressure}:</label>
           <input name="bloodPressure" value=${bloodPressure} type="text" class="border input--size">
      <label class="visit__labels">${this.indexWeight}:</label>
           <input name="bodyMassIndex" value=${bodyMassIndex} type="text" class="border input--size">
      <label class="visit__labels">${this.heartDisease}:</label>
           <input name="cardiovascularDisease" value=${cardiovascularDisease} type="text" class="border input--size">
      <label for="age"class="visit__labels">${this.age}:</label>
           <input name="age"type="text" value=${age}class="border input--size">
        `
        elem.insertAdjacentHTML("beforeend", changeForm)
    }
}
class VisitDentist extends Visit{
    constructor(initials,purpose,description,impotent,date,status){
        super(initials,purpose,description,impotent,status);
        this.date =date
    }
    createFormDentist(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Dentist">
           <label for="visitDate" class="visit__labels">${this.date}:</label>
           <input type="date" name="visitDate" class="border input--size">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
    changeForm(elem,obj){
        super.changeForm(elem,obj)
        const {visitDate:visitDateValue}=obj;
        let changeForm =`
           <label for="visitDate" class="visit__labels">${this.date}:</label>
           <input type="date" name="visitDate" value=${visitDateValue} class="border input--size">
        `
        elem.insertAdjacentHTML("beforeend", changeForm)
    }
}
class VisitTherapeutic extends Visit{
    constructor(initials,purpose,description,impotent,age,status){
        super(initials,purpose,description,impotent,status);
        this.age =age
    }
    createFormTherapeutic(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Therapeutic">
           <label for="age" class="visit__labels">${this.age}:</label>
           <input type="text" name="age" class="border input--size">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
}

export{Modal,Visit,VisitСardiologist,VisitDentist,VisitTherapeutic}

