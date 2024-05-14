// html element ref
const addToCratBtnEle = document.getElementById('addToCartBtn');
const itemInputEle = document.getElementById("itemInput");
const itemsContainerEle = document.querySelector('.items-container');

// importing firebase function 
import { initializeApp  } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'
import { getDatabase, ref, push  } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js'


// firebase 
const appSettings = {
    databaseURL : "https://cart-database-8618b-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shopingListAppDB = ref(database, "shopingListApp");

function removeItem(uniqeID = ""){
    const ele = document.querySelector(`.${uniqeID}`);
        const sure = confirm("Are you sure wanna delete this?")
        sure ? ele.remove() : null;
}

function makeHTML (txt) {
    const uniqeID = `item-${Math.floor(Math.random() * 100000)}`;
    const html = document.createElement('p');
    html.innerText = txt;
    html.classList.add(uniqeID);
    html.addEventListener('click', () => {
        removeItem(uniqeID);
    })

    return html;
}


function printItems (){
    const item = itemInputEle.value;
    if (item == ""){
        return;
    }
    // push(shopingListAppDB, item);
    const html = makeHTML(item);
    itemsContainerEle.insertAdjacentElement('beforeend', html);
    itemInputEle.value = "";
}




addToCratBtnEle.addEventListener("click", (e)=> {
    e.preventDefault()
    printItems();
})
