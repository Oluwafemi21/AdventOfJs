const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 0
  },
  {
    name: 'Salmon and Vegetables',
    price: 512,
    image: 'plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 0
  },
  {
    name: 'Spaghetti with Meat Sauce',
    price: 782,
    image: 'plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 0
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 599,
    image: 'plate__bacon-eggs.png',
    alt: 'Bacon, Eggs, and Toast',
    count: 0
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 698,
    image: 'plate__chicken-salad.png',
    alt: 'Chicken Salad with Parmesan',
    count: 0
  },
  {
    name: 'Fish Sticks and Fries',
    price: 634,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 0
  }
]

//initialize all the elements
const cartSummary = document.querySelector('.cart-summary');
const listItem = document.querySelectorAll('.panel .menu li');
const emptyMessage = document.querySelector('.empty');
const totals = document.querySelector('.totals');


//Initialize db
let db = null;
let cart;


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
    if (e.target.classList.contains('add')) {
      let itemName = list.lastElementChild.firstElementChild.textContent;
      addToCart(itemName)
    }
  })
})
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

  })

}

function addToCart(id) {
  let item = menuItems.find((menuItem) => {
    menuItem.count += 1;
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
  cartSummary.append(addedItem)
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


