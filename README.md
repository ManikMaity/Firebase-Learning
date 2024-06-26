## What Learned In Firebase
- A database gave us the ability to save data whcich can be accesssed by anyone, anytime we want.
- First go to [Firebase Console](https://console.firebase.google.com/u/0/?fb_gclid=CjwKCAjw9IayBhBJEiwAVuc3fhhaRQ-hOu9FCDAstnEfadZ-RWieCL2lEZbnLRLEpp-fIB8wVWr4lhoCkzQQAvD_BwE&_gl=1*123pvl*_up*MQ..*_ga*MTAxMjAwNDE1MS4xNzE1NjE0MzE5*_ga_CW55HF8NVT*MTcxNTYxNDMxOS4xLjEuMTcxNTYxNDMzNi40My4wLjA.&gclid=CjwKCAjw9IayBhBJEiwAVuc3fhhaRQ-hOu9FCDAstnEfadZ-RWieCL2lEZbnLRLEpp-fIB8wVWr4lhoCkzQQAvD_BwE&gclsrc=aw.ds&pli=1) and click on creaate projects.
- Enter the project name and press continue.
- click on Create project (enable google analitics if you wnat) project will  be made.

- Then go to your project and click on `realtime-database` under `Build`
- Then click on `Create Database` -> `US` -> `Test Mode` -> Realtime database is created
- press on 🔗 cody icon and copy database reference url.

- Make a obj with the database link copied in js
```js
const appSettings = {
    databaseURL : "https://playground-default-rtdb.firebaseio.com/"
}
```
- Then import initializeApp func from firebas.
```js
import { initializeApp  } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';
```
- Then make a app contant by using initializeApp passing appSettings obj as argument it returns a obj.
```js
const app = initializeApp(appSettings);
```
- import getDatabase and ref func
```js
import { getDatabase, ref } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

```

- make a database contant with getDatabase passing app obj created.

```js
const database = getDatabase(app);
```

- Get the refrence of the database like this passing database we created in ref and a refrence string-
```js
const itemsInDB = ref(database, "cartItems")
```
- import push func for inserting in database.
```js
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js'

```
- Now we can using this push function with the database refrense we created `itemsInDB` and `value`.
```js
    const item = itemInputEle.value;
    if (item == ""){
        return;
    }
    push(itemsInDB, item);
    console.log(`${item} is add to cart`)
```

- The item will be added under the refence name in firebase. We can see it in `Realtime Database`


### Firebase rules solving 
- According the firebase rules in test mode we cant read, write to database after 30 days.
- To solve this `Realtime Database` option in firebase.
- Go to `Rules` tab
- And change the rules to this
```js
{
  "rules": {
    ".read": true,  
    ".write": true, 
  }
}
```

- Shortcut to open firebase console - just paste the databaseURL in broswer
```js
const appSettings = {
    databaseURL : "https://cart-database-8618b-default-rtdb.firebaseio.com/",
}
```

- To fetch data from the database use have to import and use onValue function it takes the Database ref and a function with snapshop. Inside snapshot our database value. Whenever we change, add or removed item from DB snapshot func will execute automatically.
- We can get the array of obj with unique key and value of DB items by using `snapshot.val()`.
- We use `snapshot.exists()` to chack is there is value in the database
```js
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
        console.log('No Item avaiable')
    }
})
```
- To dalete items in the DB we have to import and use remove func.
```js
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js'
```
- firstly we get the exact location of the value in DB using ref.
```js
    let itemLocationInDB = ref(database, `shopingListApp/${uniqeID}`);
```
- Now we can use remove func to delete that value.
```js
    remove(itemLocationInDB);
```

## [Firebase docs Link](https://shorturl.at/yUV47)