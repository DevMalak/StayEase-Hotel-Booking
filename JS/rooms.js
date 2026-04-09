// --- 1. GLOBAL ELEMENTS ---
let roomsContainer = document.getElementById('rooms-container'); // container for rooms
let searchInput = document.getElementById('searchInput'); // search input
let categorySelect = document.getElementById('categorySelect'); // category dropdown list
let priceRange = document.getElementById('priceRange'); // price range slider
let priceValue = document.getElementById('priceValue'); // price value span

let allRooms = []; // Global array to store data

// --- 2. FETCH DATA FUNCTION ---
async function getRoomsData() {
    try {
        // CALL LOCAL JSON FILE AND WAIT FOR RESPONSE
        let result = await fetch('data.json');
        
        // TRANSLATE RESPONSE FROM JSON TO OBJECT
        let data = await result.json();
        
        // CHOOSE THE REQUIRED PROPERTY IN THE OBJECT
        allRooms = data.rooms;

        // PREPARE CONTENT IN JS
        displayRooms(allRooms);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// --- 3. DISPLAY FUNCTION (The "Cartona") ---
function displayRooms(arr) {
    if (!roomsContainer) return;
    
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        cartona += `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${arr[i].image}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body text-center">
                        <h5 class="fw-bold">${arr[i].name}</h5>
                        <p class="text-muted small">${arr[i].type}</p>
                        <h6 class="text-primary fw-bold">${arr[i].price} OMR / Night</h6>
                        <button onclick="bookRoom(${arr[i].id})" class="btn btn-dark w-100 mt-2">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>`;
    }
    // DISPLAY CONTENT IN HTML
    roomsContainer.innerHTML = cartona;
}

// --- 4. FILTERING LOGIC ---
function filterRooms() {
    let term = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let selectedType = categorySelect ? categorySelect.value : "all";
    let maxPrice = priceRange ? parseInt(priceRange.value) : 220;

    if (priceValue) priceValue.innerText = maxPrice;

    let filtered = [];
    for (let i = 0; i < allRooms.length; i++) {
        let room = allRooms[i];
        
        let matchesName = room.name.toLowerCase().includes(term) || room.type.toLowerCase().includes(term);
        let matchesType = (selectedType === "all" || room.type === selectedType);
        let matchesPrice = Number(room.price) <= maxPrice;

        if (matchesName && matchesType && matchesPrice) {
            filtered.push(room);
        }
    }

    displayRooms(filtered);
}

// ADD EVENT LISTENERS
if(searchInput) searchInput.addEventListener('input', filterRooms);
if(categorySelect) categorySelect.addEventListener('change', filterRooms);
if(priceRange) priceRange.addEventListener('input', filterRooms);

// --- 5. BOOKING LOGIC ---
function bookRoom(id) {
    let selectedRoom = null; 

    for (let i = 0; i < allRooms.length; i++) {
        if (allRooms[i].id == id) {
            selectedRoom = allRooms[i]; 
            break; 
        } 
    } 

    if (selectedRoom) {
        localStorage.setItem("selectedRoom", JSON.stringify(selectedRoom));
        window.location.href = "booking.html";
    }
}

// --- 6. RUN ON LOAD ---
window.onload = function() {
    getRoomsData(); 
    
    // Logic for Home Page Buttons (Explore & Book)
    let exploreBtn = document.getElementById('exploreBtn');
    let bookBtn = document.getElementById('bookBtn');

    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            window.location.href = "rooms.html";
        });
    }

    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            window.location.href = "booking.html";
        });
    }
}