const menuItems = [
    {
        name: "French Fries with Ketchup",
        price: 223,
        image: "plate__french-fries.png",
        alt: "French Fries",
        count: 1,
    },
    {
        name: "Salmon and Vegetables",
        price: 512,
        image: "plate__salmon-vegetables.png",
        alt: "Salmon and Vegetables",
        count: 1,
    },
    {
        name: "Spaghetti with Meat Sauce",
        price: 782,
        image: "plate__spaghetti-meat-sauce.png",
        alt: "Spaghetti with Meat Sauce",
        count: 1,
    },
    {
        name: "Bacon, Eggs, and Toast",
        price: 599,
        image: "plate__bacon-eggs.png",
        alt: "Bacon, Eggs, and Toast",
        count: 1,
    },
    {
        name: "Chicken Salad with Parmesan",
        price: 698,
        image: "plate__chicken-salad.png",
        alt: "Chicken Salad with Parmesan",
        count: 1,
    },
    {
        name: "Fish Sticks and Fries",
        price: 634,
        image: "plate__fish-sticks-fries.png",
        alt: "Fish Sticks and Fries",
        count: 1,
    },
];

//Steps
//Get the button to be disabled on click and show in cart
// Check local storage if item does not exist, add the item
// Get Items from local storage on dom load
// If count < 0 remove item and change the button to add to cart
// Update the quantity
// Get total
// clear cart button

//Query all the elements
const cartSummary = document.querySelector(".cart-summary");
const listItem = document.querySelectorAll(".panel .menu li");
const emptyMessage = document.querySelector(".empty");
const total = document.querySelector("#total");
const subTotal = document.querySelector(".subtotal");
const taxTotal = document.querySelector(".tax");
const content = document.querySelectorAll(".content");

//Initialize db
let db = null;
let cart = [];
let contents = [...content];
let buttonsDOM = [];
let tax = 0.0975;

//check if item is in localstorage
function setLocalStorage() {
    if (localStorage.getItem("cart") === null) {
        cart = [];
    } else {
        cart = JSON.parse(localStorage.getItem("cart"));
    }
}

// Function Calls

//On DOMCOntentLoaded Open DB,Check if the store is empty
document.addEventListener("DOMContentLoaded", getCart);

//Add Item to Cart
listItem.forEach((list) => {
    list.addEventListener("click", (e) => {
        let btn = e.target;
        let content = list.lastElementChild;
        if (btn.classList.contains("add")) {
            // already checks for the button click
            emptyMessage.classList.add("hidden");
            let itemName = content.firstElementChild.textContent;
            let item = menuItems.find((menuItem) => {
                return menuItem.name === itemName;
            });
            addToCart(item); // Adds item to cart
            cart = [...cart, item];
            saveCart(cart);
            setTotal(); // calculates the total of items in the cart
            btn.parentElement.removeChild(btn.parentElement.lastElementChild);
            let inCartBtn = `<button class="in-cart">
        <img src="images/check.svg" alt="Check" />
        In Cart
      </button>`;
            content.innerHTML += inCartBtn;
            content.lastElementChild.disabled = true;
        }
    });
});

//Display the items from the cart
function getCart() {
    if (cart) {
        emptyMessage.classList.add("hidden");
        let template;
        setLocalStorage();
        cart.forEach((item) => {
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
        $${((item.price / 100) * item.count).toFixed(2)}
      </div>
    </li>`;

            cartSummary.innerHTML += template;
        });

        //Check for the button
        const btns = [...document.querySelectorAll(".add")];
        btns.forEach((btn) => {
            let id = btn.parentElement.children[0].textContent;
            //check if id is in the cart
            let inCart = cart.find((item) => item.name === id);
            if (inCart) {
                let inCartBtn = `<button class="in-cart">
        <img src="images/check.svg" alt="Check" />
        In Cart
      </button>`;
                btn.disabled = true;
                btn.parentElement.removeChild(
                    btn.parentElement.lastElementChild
                );
                contents.forEach((content) => {
                    if (content.firstElementChild.textContent === id) {
                        content.innerHTML += inCartBtn;
                    }
                });
            }
        });

        setTotal();
    } else {
        emptyMessage.classList.remove("hidden");
    }
}

//Add an item to cart
function addToCart(item) {
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
    $${((item.price / 100) * item.count).toFixed(2)}
  </div>
</li>`;
    cartSummary.innerHTML += addedItem;
}

//Cart Logic
cartSummary.addEventListener("click", (e) => {
    let cartButton = e.target;
    let id =
        cartButton.parentElement.parentElement.children[1].firstElementChild
            .textContent;
    let subTotal = cartButton.parentElement.nextElementSibling;
    let temp = cart.find((item) => item.name === id);
    if (cartButton.classList.contains("increase")) {
        temp.count += 1;
        cartButton.previousElementSibling.innerText = temp.count;
        cartButton.parentElement.parentElement.firstElementChild.lastElementChild.textContent =
            temp.count;
        subTotal.textContent = `$${((temp.count * temp.price) / 100).toFixed(
            2
        )}`;
        setTotal();
        saveCart(cart);
    } else if (cartButton.classList.contains("decrease")) {
        temp.count -= 1;
        if (temp.count > 0) {
            cartButton.nextElementSibling.innerText = temp.count;
            cartButton.parentElement.parentElement.firstElementChild.lastElementChild.textContent =
                temp.count;
            subTotal.textContent = `$${(
                (temp.count * temp.price) /
                100
            ).toFixed(2)}`;
            setTotal();
            saveCart(cart);
        } else {
            removeItem(temp);
            cartSummary.removeChild(cartButton.parentElement.parentElement);
            // if cart summary is empty show emptyMessage
            if (cartSummary.children.length === 0) {
                emptyMessage.classList.remove("hidden");
            }
            // if item has been removed show add to cart button again
            contents.forEach((content) => {
                console.log(content.firstElementChild.textContent);
                if (content.firstElementChild.textContent === id) {
                    let btn = `<button class="add">
              Add to Cart
            </button>`;
                    content.removeChild(content.lastElementChild);
                    content.innerHTML += btn;
                }
            });
        }
    }
});

//Save Item added to cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    setLocalStorage();
}

//Update the totals
function setTotal() {
    let totalPrice = 0;
    let cartTotal = 0;
    cart.map((item) => {
        cartTotal += (item.price / 100) * item.count;
    });
    taxPrice = tax * cartTotal;
    totalPrice = cartTotal + taxPrice;

    subTotal.textContent = `$${cartTotal.toFixed(2)}`;
    taxTotal.textContent = `$${taxPrice.toFixed(2)}`;
    total.textContent = `$${totalPrice.toFixed(2)}`;
}

//Remove an item
function removeItem(id) {
    cart = cart.filter((item) => item.name !== id.name);
    setTotal();
    saveCart(cart);
}

//Using IndexedDB
//function to create a db
function createDB() {
    //create a db for the cart
    const request = indexedDB.open("cart", 1);

    request.onupgradeneeded = (e) => {
        db = e.target.result;
        db.createObjectStore("cart", { keyPath: "name" });

        console.log("Database has been created!");
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        console.log("Success");
    };

    request.onerror = (e) => {
        console.log("Error don dey boss, fix up!");
    };
}

//function to view items in the db
function viewDb() {
    const tx = db.transaction("cart", "readonly");
    const pNotes = tx.objectStore("cart");
    const request = pNotes.openCursor();

    request.onsuccess = (e) => {
        const cursor = e.target.result;

        if (cursor) {
            //do something
            console.log("Something dey here boss");
            cursor.continue();
        } else {
            console.log(cursor);
        }
    };
}

//function to add an item to the db
function addToCartDb() {
    const item = {
        name: "French Fries with Ketchup",
        price: 223,
        image: "plate__french-fries.png",
        alt: "French Fries",
        count: 0,
    };

    const tx = db.transaction("cart", "readwrite");
    tx.onerror = (e) => {
        alert(`Error! ${e.target.error}`);
    };

    const pNotes = tx.objectStore("cart");
    pNotes.add(item);
    console.log("Item has been added to cart!!");
}
