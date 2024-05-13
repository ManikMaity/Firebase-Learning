
import { initializeApp  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'


const appSettings = {
    databaseURL : "https://playground-1821f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "cartItems")




const itemInputEle = document.getElementById("itemInput");
const addToCratBtnEle = document.getElementById("addToCartBtn");


function printItems (){
    const item = itemInputEle.value;
    if (item == ""){
        return;
    }
    push(itemsInDB, item);
    console.log(`${item} is add to cart`)
}


addToCratBtnEle.addEventListener("click", (e)=> {
    e.preventDefault()
    printItems();
})
