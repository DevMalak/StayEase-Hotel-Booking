// *======================== Define main HTML elements=================*//
let roomSummary = document.querySelector("#roomSummary");
let bookingForm = document.querySelector("#bookingForm");
let finalResult = document.querySelector("#finalResult");
let checkIn = document.querySelector("#checkIn");
let checkOut = document.querySelector("#checkOut");

// 2. Retrieve selected room data from LocalStorage
let room = JSON.parse(localStorage.getItem("selectedRoom"));

//* ====================== Display room details (The Card) ============== *//
if (room) {
    
    let cartona = `
        <div class="card border-0 shadow-sm">
            <img src="${room.image}" class="card-img-top rounded" style="height:200px; object-fit:cover;">
            <div class="card-body text-center">
                <h5 class="card-title text-warning fw-bold">${room.name}</h5>
                <p class="card-text mb-1"><b>Type:</b> ${room.type}</p>
                <p class="card-text text-success fw-bold">Price: ${room.price} OMR / Night</p>
            </div>
        </div>`;
    
    // Injecting the variable into HTML
    roomSummary.innerHTML = cartona;
}

//*====================== Set today's date and Apply Dark Mode Preference ===============================*//
window.onload = function() {
    // Check Dark Mode Preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Set minimum check-in date to today
    let today = new Date().toISOString().split('T')[0];
    if (checkIn) {
        checkIn.min = today;
    }
}

// 5. Dynamically update Check-out minimum date based on Check-in selection
checkIn.onchange = function() {
    checkOut.disabled = false;
    checkOut.min = checkIn.value;
}

// *===== Form submission and Validation ===========*/
bookingForm.onsubmit = function(e) {
    e.preventDefault(); 

    // Calculate the number of nights
    let d1 = new Date(checkIn.value);
    let d2 = new Date(checkOut.value);
    let diff = d2 - d1;
    let nights = Math.floor(diff / (1000 * 60 * 60 * 24));

    // JS Validation: Check-out must be after check-in
    if (nights <= 0) {
        alert("Check-out date must be after check-in date!");
        return;
    }

    // Calculate total price and retrieve input values
    let total = nights * room.price;
    let guestName = document.querySelector("#guestName").value;
    let guestEmail = document.querySelector("#guestEmail").value;
    let guestsNum = document.querySelector("#guestsNum").value;
    let requests = document.querySelector("#requests").value;

    // Build result summary using a variable (Cartona)
    let cartonaResult = `
        <div class="alert alert-success mt-4 animate__animated animate__fadeIn">
            <h4 class="alert-heading text-center">Booking Confirmed!</h4>
            <hr>
            <p><b>Guest Name:</b> ${guestName}</p>
            <p><b>Email:</b> ${guestEmail}</p>
            <p><b>Room Type:</b> ${room.name}</p>
            <p><b>Stay Duration:</b> ${nights} Nights</p>
            <p><b>Check-in:</b> ${checkIn.value}</p>
            <p><b>Check-out:</b> ${checkOut.value}</p>
            <p><b>Special Requests:</b> ${requests || 'None'}</p>
            <hr>
            <h4 class="text-center text-dark">Total Price: ${total} OMR</h4>
        </div>
    `;

    // Display the result content in HTML
    finalResult.innerHTML = cartonaResult;

    finalResult.classList.remove("d-none");
    finalResult.scrollIntoView({ behavior: 'smooth' });
}

// ================== Reset button logic =======//
document.querySelector("#resetBtn").onclick = function() {
    finalResult.classList.add("d-none");
    checkOut.disabled = true;
}