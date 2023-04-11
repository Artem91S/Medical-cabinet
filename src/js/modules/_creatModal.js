
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
    <div class="creating__visit">
        <div class="modal-login__close-btn">&times;</div>
              <h3 class="modal-login__title">Створити Візит</h3>  
              <select name="doctor"  class="choose__doctor">
                <option name="doctor" value="Виберіть доктора">Виберіть доктора</option>
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
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target ===closeButton) {
                this.closeModal()
            }
        })
    }
    createModalEnter(title){
        let modal = `
        <section class="modal">
        <div class="content">
        <h2>${title}</h2>
        <div class="modal-login__close-btn">&times;</div>
            <label for='email'>Email</label>
            <input type='email' name='email' class="modal__email"/>
            <label for='password'>Password</label>
            <input type='password' name='password' class="modal__password"/>
        </div>
        <button class="send-data">Send</button>
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
  .then(response => console.log(response))
        })
        }
}

class Visit {
    constructor(fullName,purpose,description,impotent){
        this.fullName = fullName;
        this.purpose =purpose;
        this.description =description;
        this.impotent=impotent
    }
createForma(elem){
    let addForm= `
                <label for="fullName"class="visit__labels">${this.fullName}:</label>
                     <input name="fullName" type="text" class="border">
               <label for="visitType" class="visit__labels">${this.purpose}:</label>
                     <input name="visitType" type="text" class="border">
                <label for="visitDescription" class="visit__labels">${this.description}:</label>
                     <textarea cols="10" id="" name="visitDescription" rows="5"></textarea>
                <label for="impotent" class="visit__labels">${this.impotent}:</label>
                <select name="visitUrgency">
                    <option value="Усі">All</option>
                    <option value="Невідкладна">Невідкладна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Звичайна">Звичайна</option>                
              </select>`
            elem.insertAdjacentHTML("beforeend",addForm)
}

}
class VisitСardiologist extends Visit{
    constructor(initials,purpose,description,impotent, pressure,indexWeight,heartDisease,age){
        super(initials,purpose,description,impotent);
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
                <input name="bloodPressure" type="text" class="border">
           <label class="visit__labels">${this.indexWeight}:</label>
                <input name="bodyMassIndex" type="text" class="border">
           <label class="visit__labels">${this.heartDisease}:</label>
                <input name="cardiovascularDisease" type="text" class="border">
           <label for="age"class="visit__labels">${this.age}:</label>
                <input name="age"type="text" class="border">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
}
class VisitDentist extends Visit{
    constructor(initials,purpose,description,impotent,date){
        super(initials,purpose,description,impotent);
        this.date =date
    }
    createFormDentist(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Dentist">
           <label for="visitDate" class="visit__labels">${this.date}:</label>
           <input type="date" name="visitDate" class="border">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
}
class VisitTherapeutic extends Visit{
    constructor(initials,purpose,description,impotent,age){
        super(initials,purpose,description,impotent);
        this.age =age
    }
    createFormTherapeutic(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Therapeutic">
           <label for="age" class="visit__labels">${this.age}:</label>
           <input type="text" name="age" class="border">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
}

export{Modal,Visit,VisitСardiologist,VisitDentist,VisitTherapeutic}

