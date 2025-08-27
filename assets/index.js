// Get modal and close button
const modal = document.getElementById("product-modal");
const closeBtn = document.querySelector(".close");

// Product Data
const Products = {
    first: {
        id: 8347754430660,
        variantId: 45130499096772, 
        img: "{{ 'photo-1.png' | asset_url }}",
        productName: "Orange Wide Leg",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["White","Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        white: {
            'XS': 45130499260612,
            'S': 45130499293380,
            'M': 45130499326148,
            'L': 45130499358916,
            'XL': 45130499391684
        },
        black: {
            'XS': 45130499096772,
            'S': 45130499129540,
            'M': 45130499162308,
            'L': 45130499195076,
            'XL': 45130499227844
        }
    },

    second: {
        id: 8347975975108,
        variantId: 45131814666436, 
        img: "{{ 'photo-2.png' | asset_url }}",
        productName: "Tailored Jacket",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Blue","Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        Blue: {
            'XS': 45131814502596,
            'S': 45131814535364,
            'M': 45131814568132,
            'L': 45131814600900,
            'XL': 45131814633668
        },
        Black: {
            'XS': 45131814666436,
            'S': 45131814699204,
            'M': 45131814731972,
            'L': 45131814764740,
            'XL': 45131814797508
        }
    },

    third: {
        id: 8347976925380,
        variantId: 45131817517252, 
        img: "{{ 'photo-3.png' | asset_url }}",
        productName: "Accordion Pleated Dress",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Red","Grey"],
        sizes: ["XS", "S", "M", "L", "XL"],
        red: {
            'XS': 45131817681092,
            'S': 45131817713860,
            'M': 45131817746628,
            'L': 45131817779396,
            'XL': 45131817812164
        },
        grey: {
            'XS': 45131817517252,
            'S': 45131817550020,
            'M': 45131817582788,
            'L': 45131817615556,
            'XL': 45131817648324
        }
    },
    
    fourth: {
        id: 8347978989764,
        variantId: 45131825184964, 
        img: "{{ 'photo-4.png' | asset_url }}",
        productName: "Green Trench Coat",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["White","Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        white: {
            'XS': 45131825021124,
            'S': 45131825053892,
            'M': 45131825086660,
            'L': 45131825119428,
            'XL': 45131825152196
        },
        black: {
            'XS': 45131825184964,
            'S': 45131825217732,
            'M': 45131825250500,
            'L': 45131825283268,
            'XL': 45131825316036
        }
    },

    fifth: {
        id: 8347979284676,
        variantId: 45131827478724, 
        img: "{{ 'photo-5.png' | asset_url }}",
        productName: "Tennis Blue T-Shirt",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Grey","Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        grey: {
            'XS': 45131827314884,
            'S': 45131827347652,
            'M': 45131827380420,
            'L': 45131827413188,
            'XL': 45131827445956
        },
        black: {
            'XS': 45131827478724,
            'S': 45131827511492,
            'M': 45131827544260,
            'L': 45131827577028,
            'XL': 45131827609796
        }
    },

    sixth: {
        id: 8347980234948,
        variantId: 45131830067396, 
        img: "{{ 'photo-6.png' | asset_url }}",
        productName: "Long Sleeve Tennis Top",
        price: "980,00€",
        description: "This one-piece swimsuit is crafted from jersey featuring an allover micro Monogram motif in relief.",
        colors: ["Blue","Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        blue: {
            'XS': 45131830067396,
            'S': 45131832033476,
            'M': 45131832066244,
            'L': 45131832099012,
            'XL': 45131832131780
        },
        black: {
            'XS': 45131830100164,
            'S': 45131832164548,
            'M': 45131832197316,
            'L': 45131832230084,
            'XL': 45131832262852
        }
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

    //console.log("variantId", currentProduct[cartItem.color][cartItem.size]);
    console.log("current Product", currentProduct);
    console.log("color", cartItem.color.toLowerCase());
    console.log("size", cartItem.size);
    console.log("VariantId", currentProduct[cartItem.color.toLowerCase()][cartItem.size]);
    fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id:  currentProduct[cartItem.color.toLowerCase()][cartItem.size],
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



