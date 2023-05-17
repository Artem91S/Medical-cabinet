const selectCondition =document.querySelector('.cards-filters__dropdown-condition');
const selectVisitsTerm =document.querySelector('.cards-filters__dropdown-visits-term');
const inputSearch =document.querySelector('.cards-filters__input-search');
const btnSearch = document.querySelector('.cards-filters__btn-search');
 export class Validation{
    constructor(searchInput,array,btn){
        this.searchInput = searchInput;
        this.filterCards = [];
        this.array =array;
        this.btn = btn
    }
    validationFilters(select,key,isOpen){
        
        this.btn.addEventListener("click",()=>{
            const filterArrayOfCards =isOpen?this.filterCards:this.array 
            this.filterCards = filterArrayOfCards.filter(userCard =>{
                
                if(select.value === "Усі"){
                    let allCards =document.querySelectorAll('.board-of-cards__patient-card');
                    allCards.forEach(card=>{
                        card.classList.remove("board-of-cards__patient-card__hidden-filter-card")
                        if(card.dataset.id !==userCard.id)return card.classList.add("board-of-cards__patient-card__hidden-filter-card")
                        
                    })
                        
                    return this.filterCards
                }
            
                    let changeClass = userCard[key]!== select.value ?("add"):"remove"
                    document.querySelector(`[data-id="${userCard.id}"]`).classList[changeClass]("board-of-cards__patient-card__hidden-filter-card")        
                    return changeClass == "remove"
            
               
                     })
                    })
    }
    clickOnButtonSearch(){
        this.btn.addEventListener("click",()=>{
            this.filterCards.forEach(card=>{
                document.querySelector(`[data-id="${card.id}"]`).classList.remove("board-of-cards__patient-card__hidden-filter-card")
                 const isInStr =(element)=>element.toString().toLowerCase().match(this.searchInput.value.toLowerCase());
                 if(!Object.values(card).some(isInStr)) return document.querySelector(`[data-id="${card.id}"]`).classList.add("board-of-cards__patient-card__hidden-filter-card")
                     })
             })
    }
  
 }
export {selectCondition ,selectVisitsTerm,inputSearch,btnSearch}

