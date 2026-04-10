// --- 1. DARK MODE SIMPLE ---//
let toggleBtn = document.getElementById('toggle-btn');
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.checked = true;
    console.log("Dark mode ON from localStorage ");
} else {
    console.log("Light mode ON from localStorage ");
}

if (toggleBtn) {
    toggleBtn.addEventListener('change', () => {
        document.body.classList.toggle("dark-mode");
        let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
        console.log(`Theme switched to: ${theme} `);
    });
}

// --- 2. GLOBAL DATA ---
let allRooms = [];
let roomsContainer = document.getElementById('rooms-container'); 
let featuredContainer = document.getElementById('featured-container'); 

// --- 3. FETCH DATA ---
async function getRoomsData() {
    try {
        let result = await fetch('data.json');
        let data = await result.json();
        allRooms = data.rooms;

        if (roomsContainer) {
            displayRooms(allRooms, roomsContainer);
        } else if (featuredContainer) {
            let firstThree = [];
            for (let i = 0; i < 3; i++) {
                if(allRooms[i]) firstThree.push(allRooms[i]);
            }
            displayRooms(firstThree, featuredContainer); 
        }
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// --- 4. DISPLAY ROOMS ---
function displayRooms(arr, container) {
    if (!container) return;
    
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
                        <button onclick="bookRoom(${arr[i].id})" class="btn btn-dark w-100 mt-2">Book Now</button>
                    </div>
                </div>
            </div>`;
    }
    container.innerHTML = cartona;
}

// --- 5. BOOK ROOM ---
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

// --- 6. FILTER ROOMS ===========//
function filterRooms() {
    let term = document.getElementById('searchInput')?.value.toLowerCase() || "";
    let type = document.getElementById('categorySelect')?.value || "all";
    let price = document.getElementById('priceRange')?.value || 220;

    if (document.getElementById('priceValue')) document.getElementById('priceValue').innerText = price;

    let filtered = [];
    
    for (let i = 0; i < allRooms.length; i++) {
        let r = allRooms[i];
        let matchesSearch = r.name.toLowerCase().includes(term) || r.type.toLowerCase().includes(term);
        let matchesType = (type === "all" || r.type === type);
        let matchesPrice = (Number(r.price) <= price);

        if (matchesSearch && matchesType && matchesPrice) {
            filtered.push(r);
        }
    }

    displayRooms(filtered, roomsContainer);
}

// --- 7. INIT ON DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    getRoomsData();

    document.getElementById('searchInput')?.addEventListener('input', filterRooms);
    document.getElementById('categorySelect')?.addEventListener('change', filterRooms);
    document.getElementById('priceRange')?.addEventListener('input', filterRooms);

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
});