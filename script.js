// DOM elements
const catBtns = document.getElementById("category-buttons");
const plantsDiv = document.getElementById("plants-container");
const spinner = document.getElementById("spinner");
const cartList = document.getElementById("cart-list");
const totalEl = document.getElementById("total-price");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal");

let total = 0; // total price tracker

// Load categories from API
async function loadCategories() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();

    data.categories.forEach(c => {
      const btn = document.createElement("button");
      btn.textContent = c.category;
      btn.className = "px-4 py-2 border rounded";
      btn.onclick = () => loadPlantsByCategory(c.id, btn);
      catBtns.appendChild(btn);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

// Load plants by category
async function loadPlantsByCategory(catId, btn) {
  setActive(btn);
  spinner.classList.remove("hidden");
  plantsDiv.innerHTML = "";

  try {
    const res = await fetch(https://openapi.programming-hero.com/api/category/${catId});
    const data = await res.json();

    spinner.classList.add("hidden");
    plantsDiv.innerHTML = "";

    data.data.forEach(p => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow p-4";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="rounded">
        <h3 class="text-xl font-bold mt-2 cursor-pointer text-green-600">${p.name}</h3>
        <p class="text-sm text-gray-500">${p.short_description}</p>
        <p class="font-bold mt-2">$${p.price}</p>
        <button class="mt-2 bg-green-600 text-white px-4 py-2 rounded">Add to Cart</button>
      `;

      // Modal trigger
      card.querySelector("h3").onclick = () => openModal(p.id);
      // Add to cart trigger
      card.querySelector("button").onclick = () => addToCart(p);

      plantsDiv.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading plants:", err);
  }
}

// Open modal with plant details
async function openModal(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    const plant = data.data;

    modalContent.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="rounded mb-4">
      <h2 class="text-2xl font-bold">${plant.name}</h2>
      <p>${plant.description}</p>
      <p class="mt-2 font-bold">Category: ${plant.category}</p>
      <p class="font-bold">Price: $${plant.price}</p>
    `;
    modal.classList.remove("hidden");
  } catch (err) {
    console.error("Error loading plant details:", err);
  }
}
closeModalBtn.onclick = () => modal.classList.add("hidden");

// Add to cart
function addToCart(plant) {
  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";
  li.innerHTML = `
    <span>${plant.name} - $${plant.price}</span>
    <button class="text-red-500">❌</button>
  `;

  li.querySelector("button").onclick = () => {
    li.remove();
    total -= plant.price;
    updateTotal();
  };

  cartList.appendChild(li);
  total += plant.price;
  updateTotal();
}

// Update total price
function updateTotal() {
  totalEl.textContent = total.toFixed(2);
}

// Highlight active category
function setActive(btn) {
  Array.from(catBtns.children).forEach(b => b.classList.remove("active-category"));
  btn.classList.add("active-category");
}

// Initialize
loadCategories();