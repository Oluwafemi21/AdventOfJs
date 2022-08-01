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
    name: 'Spaghetti Meat Sauce',
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

let template = `  <!-- item 1 -->
<li>
  <div class="plate">
    <img src="images/plate__fish-sticks-fries.png" alt="Fish Sticks and Fries" class="plate" />
    <div class="quantity">1</div>
  </div>
  <div class="content">
    <p class="menu-item">Fish Sticks and Fries</p>
    <p class="price">$6.34</p>
  </div>
  <div class="quantity__wrapper">
    <button class="decrease">
      <img src="images/chevron.svg" />
    </button>
    <div class="quantity">1</div>
    <button class="increase">
      <img src="images/chevron.svg" />
    </button>
  </div>
  <div class="subtotal">
    $6.34
  </div>
</li>

<!-- item 2 -->
<li>
  <div class="plate">
    <img src="images/plate__french-fries.png" alt="French Fries" class="plate" />
    <div class="quantity">2</div>
  </div>
  <div class="content">
    <p class="menu-item">French Fries with Ketchup</p>
    <p class="price">$2.23</p>
  </div>
  <div class="quantity__wrapper">
    <button class="decrease">
      <img src="images/chevron.svg" />
    </button>
    <div class="quantity">2</div>
    <button class="increase">
      <img src="images/chevron.svg" />
    </button>
  </div>
  <div class="subtotal">
    $4.46
  </div>
</li>
</ul>

<div class="totals">
<div class="line-item">
  <div class="label">Subtotal:</div>
  <div class="amount price subtotal">$10.80</div>
</div>
<div class="line-item">
  <div class="label">Tax:</div>
  <div class="amount price tax">$1.05</div>
</div>
<div class="line-item total">
  <div class="label">Total:</div>
  <div class="amount price total">$11.85</div>
</div>
</div>`


//initialize all the elements
const buttons = document.querySelectorAll('add');


//Initialize db
let db = null;


//On DOMCOntentLoaded Open DB,Check if the store is empty
document.addEventListener('DOMContentLoaded', () => {
  createDB();
  createDB();
  setTimeout(() => {
    viewDb();
  }, 40)
})

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
      console.log('Wetin you dey keep for here wey you dey find?')
    }
  }
}

//function to add an item to the db
function addToCart() {
  const item = {
    name: 'Fish Sticks and Fries',
    price: 634,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 0
  }
  const tx = db.transaction('cart', 'readwrite')
  tx.onerror = e => { alert(`Error! ${e.target.error}`) }

  const pNotes = tx.objectStore('cart')
  pNotes.add(item);
  console.log('Item has been added to cart!!')
}

setTimeout(() => {
  addToCart();
  alert('Bad boy push this thing')
}, 2000)