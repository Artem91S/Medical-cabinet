// import './modules/_modal.js'
// import './modules/_login.js'
// import './modules/_createCard.js'
import './modules/_login.js'
import './modules/_localStorage.js'
import './modules/_creatCard.js'
import './modules/_cardsFilters.js'


import './modules/_createVisit.js'
import './modules/_exitVisit.js'
import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

// d162abdb-66e1-4d64-ac8c-87306e9f84cb sart2010@ukr.net  12345678
// b29b9b34-1970-49da-8c53-7fa80b31a33f  kos2@ukr.net  456654
// Creating an asynchronous function to send requests to the server and receive data
// const getData = async (url, method, headers = {}, body = {}, format) => {
//     const response = await fetch(url, {
//         method: `${method}`,
//         headers: headers,
//         body: JSON.stringify(body)
//     })
//     if (!response.ok) {
//         throw new Error(`Network error: ${response.status}`)
//     }
    
//     if (format === 'text') {
//         return response.text();
//     }
//     return response.json();
// }

const toggleClass = (className) => {
    const targets = document.querySelectorAll(`.${className}`)
    targets.forEach(target => target.classList.toggle('hidden'))
}
export {toggleClass}

