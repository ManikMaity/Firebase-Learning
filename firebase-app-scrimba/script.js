// html element ref
const addToCratBtnEle = document.getElementById('addToCartBtn');
const itemInputEle = document.getElementById("itemInput");
const itemsContainerEle = document.querySelector('.items-container');
const alertItemEle = document.querySelector('.alert');
const yesBtnEle = document.getElementById('sure');
const cancelBtnELe = document.getElementById('cancel');

// importing firebase function 
import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js'
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js'


// firebase 
const appSettings = {
    databaseURL: "https://cart-database-8618b-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shopingListAppDB = ref(database, "shopingListApp");


function removeItem(uniqeID = "") {
    let itemLocationInDB = ref(database, `shopingListApp/${uniqeID}`);
    alertItemEle.classList.add('show');
    const deleteFunc = () => {
        remove(itemLocationInDB);
        alertItemEle.classList.remove('show');
        return;
    }
    yesBtnEle.removeEventListener('click', deleteFunc);
    yesBtnEle.addEventListener('click', deleteFunc);

    cancelBtnELe.addEventListener('click', () => {
        alertItemEle.classList.remove('show');
        yesBtnEle.removeEventListener('click', deleteFunc);
        return;
    })
}

function makeHTML(txt, id) {
    const uniqeID = id || `item-${Math.floor(Math.random() * 100000)}`;
    const html = document.createElement('p');
    html.innerText = txt;
    html.classList.add(uniqeID);
    html.addEventListener('click', () => {
        removeItem(uniqeID);
    })

    return html;
}


function printItems() {
    const item = itemInputEle.value;
    if (item == "") {
        return;
    }
    push(shopingListAppDB, item);
    itemInputEle.value = "";
}

onValue(shopingListAppDB, (snapshot) => {
    if (snapshot.exists()){
        const allItems = Object.entries(snapshot.val())
        itemsContainerEle.innerHTML = "";
        allItems.map(([itemID, itemValue]) => {
            let html = makeHTML(itemValue, itemID);
            itemsContainerEle.insertAdjacentElement('beforeend', html);
        })
    }
    else{
        itemsContainerEle.innerHTML = `No item available ＞﹏＜`
    }

})




addToCratBtnEle.addEventListener("click", (e) => {
    e.preventDefault()
    printItems();
})