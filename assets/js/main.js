const modal = document.getElementById('productDetailsModal');

window.onload = function(){
    getCategories();
    loadAllPlants();

};

async function getCategories(){
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/categories');
        const data = await response.json();
        const categories = data.categories

        let html = `<li class="category-item active px-[10px] py-[8px]"><a href="javascript:void(0);" onclick="setActive(this); loadAllPlants()" >All Trees</a></li>`

        categories.forEach(cat => {
            html+=`<li class="category-item px-[10px] py-[8px]"><a href="javascript:void(0);" onclick="setActive(this); getPlantByCategory(${cat.id})">${cat.category_name}</a></li>`
        });

        document.getElementById('categories').innerHTML = html;
    }catch (error) {
        console.log("Error loading categories:", error);
    }
}

async function getPlantByCategory(id){
    try{
         const response = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
        const data = await response.json();
        const plants = data.plants;

        let html = "";
        plants.forEach(item => {
            html+= `<div onclick="getPlantDetails(${item.id})" class="plant_item bg-white rounded-xl p-4 flex flex-col h-fit gap-2">
            <div class="image h-[186px] overflow-hidden flex justify-center items-center">
              <img class="w-full" src="${item.image}" alt="${item.name}">
            </div>
            <div class="flex flex-col gap-2">
              <h6 class="font-bold text-lg">${item.name}</h6>
              <p class="text-sm">${item.description.substring(0, 80) + "..."}</p>
              <div class="flex justify-between">
                <span class="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">${item.category}</span>
                <span class="font-bold">৳ ${item.price}</span>
              </div>
              <button class="addToCart w-full bg-[#15803D] text-white py-2 rounded-full">Add to cart</button>
            </div>
          </div>`
        });

        document.getElementById('plants-items').innerHTML = html;

        this.classList.add('active');



    }catch (error){
        console.log("Error loading categories:", error);

    }
}

async function loadAllPlants() {
    try{
        const response = await fetch('https://openapi.programming-hero.com/api/plants');
        const data = await response.json();
        const plants = data.plants;

        let html = "";
        plants.forEach(item => {
            html+= `<div onclick="getPlantDetails(${item.id})" class="plant_item bg-white rounded-xl p-4 flex flex-col h-fit gap-2">
            <div class="image h-[186px] overflow-hidden flex justify-center items-center">
              <img class="w-full" src="${item.image}" alt="${item.name}">
            </div>
            <div class="flex flex-col gap-2">
              <h6 class="font-bold text-lg">${item.name}</h6>
              <p class="text-sm">${item.description.substring(0, 80) + "..."}</p>
              <div class="flex justify-between">
                <span class="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">${item.category}</span>
                <span class="font-bold">৳ ${item.price}</span>
              </div>
              <button class="addToCart w-full bg-[#15803D] text-white py-2 rounded-full">Add to cart</button>
            </div>
          </div>`
        });
        document.getElementById('plants-items').innerHTML = html;

    }catch (error){
        console.log("Error loading plants:", error);
    }
    
}


async function getPlantDetails(id){
    try{
        const response = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
        const data = await response.json();
        const plant = data.plants;
        
        document.getElementById('plantTitle').innerText = plant.name;
        document.getElementById('plantImage').src = plant.image;
        document.getElementById('plantCategory').innerText = plant.category;
        document.getElementById('plantPrice').innerText = plant.price;
        document.getElementById('plantDetails').innerText = plant.description;


        modal.classList.remove('hidden');
        modal.classList.add('flex');

    }catch (error){
        console.log("Error loading plant details: ", error);
    }
    
}

function closeModal(){
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function setActive(element) {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => item.classList.remove('active'));

    element.parentElement.classList.add('active');
}