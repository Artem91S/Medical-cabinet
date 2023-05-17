import './modules/_login.js'
import './modules/_functionsCards.js'
import './modules/_creatCard.js'
import './modules/_cardsFilters.js'
import './modules/_createVisit.js'
import './modules/_exitVisit.js'
import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();
const toggleClass = (className) => {
    const targets = document.querySelectorAll(`.${className}`)
    targets.forEach(target => target.classList.toggle('hidden'))
}
export {toggleClass}

