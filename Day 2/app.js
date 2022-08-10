const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 1
  },
  {
    name: 'Salmon and Vegetables',
    price: 512,
    image: 'plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 1
  },
  {
    name: 'Spaghetti with Meat Sauce',
    price: 782,
    image: 'plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 1
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 599,
    image: 'plate__bacon-eggs.png',
    alt: 'Bacon, Eggs, and Toast',
    count: 1
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 698,
    image: 'plate__chicken-salad.png',
    alt: 'Chicken Salad with Parmesan',
    count: 1
  },
  {
    name: 'Fish Sticks and Fries',
    price: 634,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 1
  }
]


//Steps
//Get the button to be disabled on click and show in cart
// Check local storage if item does not exist, add the item
// Get Items from local storage on dom load
// If count < 0 remove item and change the button to add to cart
// Update the quantity 
// Get total
// clear cart button




//Query all the elements
const cartSummary = document.querySelector('.cart-summary');
const listItem = document.querySelectorAll('.panel .menu li');
const emptyMessage = document.querySelector('.empty');
const total = document.querySelector('.total');
const subTotal = document.querySelector('.subtotal');
const taxTotal = document.querySelector('.tax');
const content = document.querySelectorAll('.content');


//Initialize db
let db = null;
let cart = [];
let buttonsDOM = [];
let contents = [...content]


//check if item is in localstorage
function setLocalStorage() {
  if (localStorage.getItem("cart") === null) {
    cart = [];
  } else {
    cart = JSON.parse(localStorage.getItem("cart"))
  };
}



// Function Calls
listItem.forEach(list => {
  list.addEventListener('click', (e) => {
    let btn = e.target;
    let content = list.lastElementChild;
    if (btn.classList.contains('add')) { //already checks for the button click
      let itemName = content.firstElementChild.textContent;
      addToCart(itemName)
      btn.parentElement.removeChild(btn.parentElement.lastElementChild);
      let inCartBtn = `<button class="in-cart">
        <img src="images/check.svg" alt="Check" />
        In Cart
      </button>`;
      content.innerHTML += inCartBtn;
      content.lastElementChild.disabled = true;
    }
  })
});

//On DOMCOntentLoaded Open DB,Check if the store is empty
document.addEventListener('DOMContentLoaded', getCart);


//Using LocalStorage
function getCart() {
  let template;
  setLocalStorage();
  cart.forEach(item => {

    template = `<li>
      <div class="plate">
        <img src="images/${item.image}" alt="${item.alt}" class="plate" />
        <div class="quantity">${item.count}</div>
      </div>
      <div class="content">
        <p class="menu-item">${item.name}</p>
        <p class="price">$${item.price / 100}</p>
      </div>
      <div class="quantity__wrapper">
        <button class="decrease">
          <img src="images/chevron.svg" />
        </button>
        <div class="quantity">${item.count}</div>
        <button class="increase">
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div class="subtotal">
        $${item.price / 100 * item.count}
      </div>
    </li>`;

    cartSummary.innerHTML += template;

  });

  //Check for the button
  const btns = [...document.querySelectorAll('.add')];
  btns.forEach(btn => {
    let id = btn.parentElement.children[0].textContent;
    //check if id is in the cart
    let inCart = cart.find(item => item.name === id);
    if (inCart) {
      let inCartBtn = `<button class="in-cart">
        <img src="images/check.svg" alt="Check" />
        In Cart
      </button>`;
      btn.disabled = true
      btn.parentElement.removeChild(btn.parentElement.lastElementChild);
      contents.forEach(content => {
        if (content.firstElementChild.textContent === id) {
          content.innerHTML += inCartBtn
        }
      })
    }
  })
}

function addToCart(id) {
  let item = menuItems.find((menuItem) => {
    return menuItem.name === id;
  });

  //Save item to cart
  saveCart(item);
  let addedItem = `<li>
  <div class="plate">
    <img src="images/${item.image}" alt="${item.alt}" class="plate" />
    <div class="quantity">${item.count}</div>
  </div>
  <div class="content">
    <p class="menu-item">${item.name}</p>
    <p class="price">$${item.price / 100}</p>
  </div>
  <div class="quantity__wrapper">
    <button class="decrease">
      <img src="images/chevron.svg" />
    </button>
    <div class="quantity">${item.count}</div>
    <button class="increase">
      <img src="images/chevron.svg" />
    </button>
  </div>
  <div class="subtotal">
    $${item.price / 100 * item.count}
  </div>
</li>`;
  cartSummary.innerHTML += addedItem


  //if the item does not exist, add it
  //if the item exists do not add it
}

function saveCart(item) {
  setLocalStorage();
  cart = [...cart, item]
  localStorage.setItem('cart', JSON.stringify(cart));
}

//Using IndexedDB
//function to create a db
function createDB() {
  //create a db for the cart
  const request = indexedDB.open('cart', 1);

  request.onupgradeneeded = e => {
    db = e.target.result
    db.createObjectStore('cart', { keyPath: 'name' })

    console.log('Database has been created!')
  }

  request.onsuccess = e => {
    db = e.target.result
    console.log('Success')
  }

  request.onerror = e => {
    console.log('Error don dey boss, fix up!')
  }
}

//function to view items in the db
function viewDb() {
  const tx = db.transaction('cart', 'readonly')
  const pNotes = tx.objectStore('cart')
  const request = pNotes.openCursor();

  request.onsuccess = e => {
    const cursor = e.target.result;

    if (cursor) {
      //do something
      console.log('Something dey here boss')
      cursor.continue();
    } else {
      console.log(cursor)
    }
  }
}

//function to add an item to the db
function addToCartDb() {
  const item = {
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 0
  }

  const tx = db.transaction('cart', 'readwrite')
  tx.onerror = e => { alert(`Error! ${e.target.error}`) }

  const pNotes = tx.objectStore('cart')
  pNotes.add(item);
  console.log('Item has been added to cart!!')
}


