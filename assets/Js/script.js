// PRODUCTS DATA (15 PRODUCTS)
// PRODUCTS WITH CATEGORIES

const products = [
  { id: 1, name: "Smart Watch", price: 1999, category: "Electronics", image: ".//assets/img/applewatch.webp" },
  { id: 2, name: "Headphones", price: 1499, category: "Electronics", image: ".//assets/img/Apple-Headphones.webp" },
  { id: 3, name: "Bluetooth Speaker", price: 1799, category: "Electronics", image: "./assets/img/speaker.webp" },
  { id: 4, name: "Wireless Mouse", price: 599, category: "Electronics", image: "./assets/img/mouse1.jpg" },
  { id: 5, name: "Keyboard", price: 899, category: "Electronics", image: "./assets/img/keybord.jpg" },

  { id: 6, name: "Shoes", price: 2499, category: "Fashion", image: "./assets/img/Shoes.webp" },
  { id: 7, name: "T-Shirt", price: 799, category: "Fashion", image: "./assets/img/t shirt.jpg" },
  { id: 8, name: "Jeans", price: 1899, category: "Fashion", image: "./assets/img/jeans1.jpg" },
  { id: 9, name: "Jacket", price: 3499, category: "Fashion", image: "./assets/img/Jacket.webp" },
  { id: 10, name: "Cap", price: 399, category: "Fashion", image: "./assets/img/cap.jpg" },

  { id: 11, name: "Backpack", price: 999, category: "Accessories", image: "./assets/img/Backpack.avif" },
  { id: 12, name: "Laptop Bag", price: 1999, category: "Accessories", image: "./assets/img/laptop bag.avif" },
  { id: 13, name: "Wallet", price: 699, category: "Accessories", image: "./assets/img/Wallet.jpg" },
  { id: 14, name: "Water Bottle", price: 499, category: "Accessories", image: "./assets/img/Water Bottle.jpg" },
  { id: 15, name: "Notebook", price: 199, category: "Accessories", image: "./assets/img/Notebook.webp" }
];

let currentProducts = products;

// CART OBJECT
let cart = {};


// DISPLAY PRODUCTS
function displayProducts(list) {
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
<button class="wish-btn" >♥️</button>
</div>
</div>
`;
  });
}
// WISHLIST OBJECT
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
function displayProducts(list) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  list.forEach(p => {
    const isWishlisted = wishlist[p.id] ? "❤️" : "🤍";

    productList.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>
        <div class="actions">
          <button class="cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
          <button class="wish-btn" onclick="toggleWishlist(${p.id})">${isWishlisted}</button>
        </div>
      </div>
    `;
  });
}
function toggleWishlist(id) {
  if (wishlist[id]) {
    delete wishlist[id];
  } else {
    wishlist[id] = products.find(p => p.id === id);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  displayProducts(currentProducts);
}
function updateWishlistCount() {
  document.getElementById("wishlistCount").innerText =
    Object.keys(wishlist).length;
}
updateWishlistCount();

//  WISHLIST end



// SEARCH FUNCTIONALITY
function fun(event) {
  
  event.preventDefault();
  var seacrh_input = document.getElementById("input").value.toLowerCase();
  
  console.log("search",seacrh_input);
  
  var data = products.filter((value) => value.category.toLowerCase().includes(seacrh_input) || value.name.toLowerCase().includes(seacrh_input));
var data1=""

  var get_data = document.getElementById("row1")
  data.map((value) => {
    data1 += `<div class="col-lg-3 mb-4">
    <div class="card shadow border-warning"> 
    <img src="${value.image}" class="card-img-top">
        <div class="card-body">
            <h5>${value.name}</h5>
            <p>💰${value.price}</p>
            <p>${value.category}</p>
            <button class="btn btn-danger  me-2" onclick="addToCart(${value.id})"><i class="fa-solid fa-cart-arrow-down"></i></button>
            <button class="btn btn-warning" onclick="likeProduct()">❤</button>
        </div>
    </div>
</div>`
  })
  get_data.innerHTML=data1
}


   



// ADD TO CART
function addToCart(id) {
  if (cart[id]) {
    cart[id].qty++;
  } else {
    cart[id] = { ...products.find(p => p.id === id), qty: 1 };
  }
  updateCart();
}

// UPDATE CART WITH + / - BUTTONS
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  for (let id in cart) {
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
function increaseQty(id) {
  cart[id].qty++;
  updateCart();
}

// DECREASE QUANTITY
function decreaseQty(id) {
  cart[id].qty--;
  if (cart[id].qty <= 0) {
    delete cart[id];
  }
  updateCart();
}


// TOGGLE CART
function toggleCart() {
  console.log("function is running");
  
  const cartDiv = document.getElementById("cart");
  cartDiv.style.display =
    cartDiv.style.display === "block" ? "none" : "block";
}


// CHECKOUT
function checkout() {
  if (Object.keys(cart).length === 0)   {
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

function filterCategory(category) {
  if (category === "All") {
    currentProducts = products;
  } else {
    currentProducts = products.filter(p => p.category === category);
  }

  // Reset search box when category changes
  document.getElementById("search").value = "";

  displayProducts(currentProducts);
}

