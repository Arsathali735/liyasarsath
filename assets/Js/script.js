// PRODUCTS DATA (15 PRODUCTS)
// PRODUCTS WITH CATEGORIES

const products = [
  {id:1, name:"Smart Watch", price:1999, category:"Electronics", image:".//assets/img/applewatch.webp"},
  {id:2, name:"Headphones", price:1499, category:"Electronics", image:".//assets/img/Apple-Headphones.webp"},
  {id:3, name:"Bluetooth Speaker", price:1799, category:"Electronics", image:".//assets/img/applewatch.webp"},
  {id:4, name:"Wireless Mouse", price:599, category:"Electronics", image:".//assets/img/applewatch.webp"},
  {id:5, name:"Keyboard", price:899, category:"Electronics", image:".//assets/img/applewatch.webp"},

  {id:6, name:"Shoes", price:2499, category:"Fashion", image:"https://via.placeholder.com/200"},
  {id:7, name:"T-Shirt", price:799, category:"Fashion", image:"https://via.placeholder.com/200"},
  {id:8, name:"Jeans", price:1899, category:"Fashion", image:"https://via.placeholder.com/200"},
  {id:9, name:"Jacket", price:3499, category:"Fashion", image:"https://via.placeholder.com/200"},
  {id:10, name:"Cap", price:399, category:"Fashion", image:"https://via.placeholder.com/200"},

  {id:11, name:"Backpack", price:999, category:"Accessories", image:"https://via.placeholder.com/200"},
  {id:12, name:"Laptop Bag", price:1999, category:"Accessories", image:"https://via.placeholder.com/200"},
  {id:13, name:"Wallet", price:699, category:"Accessories", image:"https://via.placeholder.com/200"},
  {id:14, name:"Water Bottle", price:499, category:"Accessories", image:"https://via.placeholder.com/200"},
  {id:15, name:"Notebook", price:199, category:"Accessories", image:"https://via.placeholder.com/200"}
];

let currentProducts = products;

// CART OBJECT
let cart = {};


// DISPLAY PRODUCTS
function displayProducts(list){
const productList = document.getElementById("productList");
productList.innerHTML = "";


list.forEach(p => {
productList.innerHTML += `
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p class="price">₹${p.price}</p>
<div class="actions">
<button class="cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
<button class="wish-btn">♥️</button>
</div>
</div>
`;
});
}

// SEARCH FUNCTIONALITY
document.getElementById("search").addEventListener("keyup", function () {
  const searchText = this.value.toLowerCase();

  const result = currentProducts.filter(product =>
    product.name.toLowerCase().includes(searchText)
  );

  displayProducts(result);
});


// ADD TO CART
function addToCart(id){
if(cart[id]){
cart[id].qty++;
} else {
cart[id] = {...products.find(p => p.id === id), qty:1};
}
updateCart();
}

// UPDATE CART WITH + / - BUTTONS
function updateCart(){
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  for(let id in cart){
    const item = cart[id];
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>

        <div class="qty-controls">
          <button onclick="decreaseQty(${id})">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${id})">+</button>
        </div>

        <span>₹${item.price * item.qty}</span>
      </div>
    `;
  }

  document.getElementById("total").innerText = total;
  document.getElementById("cartCount").innerText = count;
}

// INCREASE QUANTITY
function increaseQty(id){
  cart[id].qty++;
  updateCart();
}

// DECREASE QUANTITY
function decreaseQty(id){
  cart[id].qty--;
  if(cart[id].qty <= 0){
    delete cart[id];
  }
  updateCart();
}


// TOGGLE CART
function toggleCart(){
const cartDiv = document.getElementById("cart");
cartDiv.style.display =
cartDiv.style.display === "block" ? "none" : "block";
}


// CHECKOUT
function checkout(){
if(Object.keys(cart).length === 0){
alert("Cart is empty!");
return;
}


alert("Order placed successfully!");
cart = {};
updateCart();
toggleCart();
}


// INITIAL LOAD
displayProducts(products);

function filterCategory(category){
  if(category === "All"){
    currentProducts = products;
  } else {
    currentProducts = products.filter(p => p.category === category);
  }

  // Reset search box when category changes
  document.getElementById("search").value = "";

  displayProducts(currentProducts);
}

