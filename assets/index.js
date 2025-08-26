// Get modal and close button
const modal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".close");

// Product Data
const Products = {
    first: {
        img: "{{ 'photo-1.png' | asset_url }}",
        productName: "Orange Wide Leg",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["White","Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },

    second: {
        img: "{{ 'photo-2.png' | asset_url }}",
        productName: "Tailored Jacket",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Blue","Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },

    third: {
        img: "{{ 'photo-3.png' | asset_url }}",
        productName: "Accordion Pleated Dress",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Red","Grey"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
    
    fourth: {
        img: "{{ 'photo-4.png' | asset_url }}",
        productName: "Green Trench Coat",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["White","Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },

    fifth: {
        img: "{{ 'photo-5.png' | asset_url }}",
        productName: "Tennis Blue T-Shirt",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Grey","Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },

    sixth: {
        img: "{{ 'photo-6.png' | asset_url }}",
        productName: "Long Sleeve Tennis Top",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Blue","Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    },
}

// Click events to open modal for each product
document.getElementById("first-item").onclick = () => openModal(Products.first);
document.getElementById("second-item").onclick = () => openModal(Products.second);
document.getElementById("third-item").onclick = () => openModal(Products.third);
document.getElementById("fourth-item").onclick = () => openModal(Products.fourth);
document.getElementById("fifth-item").onclick = () => openModal(Products.fifth);
document.getElementById("sixth-item").onclick = () => openModal(Products.sixth); 

let cart = [];
let currentProduct = null;

// Function to handle modal with product details
function openModal(product) {
    currentProduct = product; 

    document.getElementById("modal-img").src = product.img;
    document.getElementById("modal-name").textContent = product.productName;
    document.getElementById("modal-price").textContent = product.price;
    document.getElementById("modal-description").textContent = product.description;

    // Render color option
    const colorsDiv = document.getElementById("modal-colors");
    colorsDiv.innerHTML = "";
    product.colors.forEach(c => {
        const btn = document.createElement("button");
        btn.className="button-" + c.toLowerCase();
        btn.textContent = c;

        // Handle color selection
        btn.addEventListener("click", function () {
            document.querySelectorAll("#modal-colors button").forEach(b => {
                b.style.backgroundColor = "";
                b.style.color = "";
                b.classList.remove("selected-color");
            });
            this.style.backgroundColor = "black";
            this.style.color = "white";
            this.classList.add("selected-color");
        });

        colorsDiv.appendChild(btn);
    });

    // Render sizes
    const selectSize = document.getElementById("modal-sizes");
    selectSize.innerHTML = "<option value='' disabled selected hidden>Choose your size</option>";
    product.sizes.forEach(s => {
        const opt = document.createElement("option");
        opt.textContent = s;
        opt.value = s;
        selectSize.appendChild(opt);
    });

    // Close modal
    modal.style.display = "flex";
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
}

// Functions to handle Add to cart
function addToCart() {
    const selectedColorBtn = document.querySelector("#modal-colors button.selected-color");
    const sizeSelect = document.getElementById("modal-sizes");

    let valid = true;

    if (!selectedColorBtn) {
        alert("Please select a color");
        valid = false;
    }
    if (sizeSelect.value === "") {
        alert("Please select a size");
        valid = false;
    }

    if (!valid) return;

    const cartItem = {
        name: currentProduct.productName,
        price: currentProduct.price,
        color: selectedColorBtn.textContent,
        size: sizeSelect.value,
        img: currentProduct.img
    };

    cart.push(cartItem);

    fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: 1, // real variant ID
      name: currentProduct.productName,
        price: currentProduct.price,
        color: selectedColorBtn.textContent,
        size: sizeSelect.value,
        img: currentProduct.img,
      quantity: 1
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Added to cart:", data);
    window.location.href = "/cart"; // Redirect to custom cart page
  })
  .catch(err => console.error("Cart error:", err));
    modal.style.display = "none"; 
}

// Function to handle mobile hamburger menu
function hamburgerMenu(){
    var contents = document.getElementById("mobile-menu-contents");
    var hburger = document.getElementById("hamburger");

    if(contents.style.display === "block"){
        contents.style.display = "none";
        hburger.classList.remove("active");
    }
    else{
        contents.style.display = "block";
        hburger.classList.add("active");
    }
}

function loadCart() {
  console.log("Cart page loaded!");
  // Example: show number of items
  document.getElementById("cart-count").innerText = window.cart.item_count;
}
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === "/cart") {
    loadCart();
  }
});



