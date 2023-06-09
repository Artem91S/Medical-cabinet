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
                <option name="doctor" value="Кардіолог">${this.cardiologist}</option>
                <option name="doctor" value="Стоматолог">${this.dentist}</option>
                <option name="doctor" value="Терапевт">${this.therapeutic}</option>   
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
     clickCloseModal() {
        let modal =document.querySelector('.modal');
        let closeButton =document.querySelector('.modal__content__close-btn');
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
    }

class Visit {
    constructor(fullName,visitType,visitDescription,visitUrgency,visitStatus){
        this.fullName = fullName;
        this.visitType =visitType;
        this.visitDescription =visitDescription;
        this.visitUrgency=visitUrgency;
        this.visitStatus = visitStatus
    }
createForma(elem){
    let addForm= `
                <label for="fullName"class="visit__labels">${this.fullName}:</label>
                     <input name="fullName" type="text" value="" class="border input--size">
               <label for="visitType" class="visit__labels">${this.visitType}:</label>
                     <input name="visitType" type="text" value="" class="border input--size">
                <label for="visitDescription" class="visit__labels">${this.visitDescription}:</label>
                     <textarea cols="10" class="border"  name="visitDescription" value="" rows="5"></textarea>
                <label for="impotent" class="visit__labels">${this.visitStatus}:</label>
                <select name="visitStatus" class="input--size">
                    <option name="visitStatus" value="Вікрита">Вікрита</option>
                    <option name="visitStatus"value="Закрита">Закрита</option>
                </select>
                <label for="impotent" class="visit__labels">${this.visitUrgency}:</label>
                <select name="visitUrgency" class="input--size">
                    <option value="Невідкладна">Невідкладна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Звичайна">Звичайна</option>                
              </select>`
            elem.insertAdjacentHTML("beforeend",addForm)
}
changeForm(obj){
    const{doctor:doctorValue,fullName:fullNameValue,visitType:visitTypeValue,visitDescription:description,...rest}=obj
    let changeForm= `
    <section class="modal">
    <div class="modal__content">
        <div class="modal__content__close-btn">&times;</div>
        <h3 class="modal__content__title">Зміна візиту:</h3>  
            <form class="modal-creating__form form flex__forma">           
                <label for="fullName"class="visit__labels">Доктор:</label>
                    <input name="doctor" type="text" value="${doctorValue}" class="border input--size">
                <label for="fullName"class="visit__labels">ПІБ:</label>
                     <input name="fullName" type="text" value="${fullNameValue}" class="border input--size">
               <label for="visitType" class="visit__labels">Тип візиту:</label>
                     <input name="visitType" type="text" value="${visitTypeValue}" class="border input--size">
                <label for="visitDescription" class="visit__labels">Опис:</label>
                     <textarea cols="10" class="input--size" name="visitDescription" rows="5">${description}</textarea>
                <label for="impotent" class="visit__labels">Статус:</label>
                <select name="visitStatus" class="input--size">
                    <option name="visitStatus" value="Вікрита">Вікрита</option>
                    <option name="visitStatus" value="Закрита">Закрита</option>
                </select>
                <label for="impotent" class="visit__labels">Терміновість візиту:</label>
                <select name="visitUrgency" class="input--size">
                    <option value="Невідкладна">Невідкладна</option>
                    <option value="Пріоритетна">Пріоритетна</option>
                    <option value="Звичайна">Звичайна</option>                
                 </select>
            </form> 
            <button class="btn btn__rewrite" >Змінити</button>
    </div>
    </section>`
            document.body.insertAdjacentHTML("afterbegin",changeForm)
}

}
class VisitСardiologist extends Visit{
    constructor(fullName,visitType,visitDescription,visitUrgency, bloodPressure,indexWeight,cardiovascularDisease,age,visitStatus){
        super(fullName,visitType,visitDescription,visitUrgency,visitStatus);
        this.bloodPressure = bloodPressure;
        this.indexWeight =indexWeight;
        this.cardiovascularDisease =cardiovascularDisease;
        this.age =age
    }
    createFormСardiologist(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Сardiologist">
           <label class="visit__labels">${this.bloodPressure}:</label>
                <input name="bloodPressure" type="text" class="border input--size">
           <label class="visit__labels">${this.indexWeight}:</label>
                <input name="bodyMassIndex" type="text" class="border input--size">
           <label class="visit__labels">${this.cardiovascularDisease}:</label>
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
           <<label class="visit__labels">:</label>
           <input name="bloodPressure" value=${bloodPressure} type="text" class="border input--size">
      <label class="visit__labels">:</label>
           <input name="bodyMassIndex" value=${bodyMassIndex} type="text" class="border input--size">
      <label class="visit__labels">:</label>
           <input name="cardiovascularDisease" value=${cardiovascularDisease} type="text" class="border input--size">
      <label for="age"class="visit__labels">:</label>
           <input name="age"type="text" value=${age}class="border input--size">
        `
        elem.insertAdjacentHTML("beforeend", changeForm)
    }
}
class VisitDentist extends Visit{
    constructor(fullName,visitType,visitDescription,visitUrgency,visitDate,visitStatus){
        super(fullName,visitType,visitDescription,visitUrgency,visitStatus);
        this.visitDate =visitDate
    }
    createFormDentist(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Dentist">
           <label for="visitDate" class="visit__labels">${this.visitDate}:</label>
           <input type="date" name="visitDate" class="border input--size">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
    changeForm(obj){
        super.changeForm(obj)
        const {visitDate:visitDateValue}=obj;
        let changeForm =`
           <label for="visitDate" class="visit__labels">Дата:</label>
           <input type="date" name="visitDate" value=${visitDateValue} class="border input--size">
        `
        document.querySelector('.form').insertAdjacentHTML("beforeend", changeForm)
    }
}
class VisitTherapeutic extends Visit{
    constructor(fullName,visitType,visitDescription,visitUrgency,visitAge,visitStatus){
        super(fullName,visitType,visitDescription,visitUrgency,visitStatus);
        this.visitAge =visitAge
    }
    createFormTherapeutic(elem){
        super.createForma(elem)
        let addForm =`
        <div class="add__inputs Therapeutic">
           <label for="age" class="visit__labels">${this.visitAge}:</label>
           <input type="text" name="age" class="border input--size">
       </div>
        `
        elem.insertAdjacentHTML("beforeend", addForm)
    }
    changeForm(obj){
        super.changeForm(obj)
        const {age:visitAge}=obj;
        let changeForm =`
        <label for="age"class="visit__labels">Вік:</label>
        <input name="age" type="text" value=${visitAge} class="border input--size"/>
        `
        document.querySelector('.form').insertAdjacentHTML("beforeend", changeForm)
    }

}

export{Modal,Visit,VisitСardiologist,VisitDentist,VisitTherapeutic}

