/* Cooking Tips */

const cookingTips = [
    "Spread the peanut butter first for easier assembly!",
    "Use fresh bread for the best sandwich texture.",
    "Keep ingredients organized before starting.",
    "Clean up as you go while cooking."
];

function chooseRandomTip(tips) {
    const index = Math.floor(Math.random() * tips.length);
    return tips[index];
}

function displayTip(message) {
    const messageElement = document.getElementById("message");

    if (messageElement) {
        messageElement.textContent = message;
    }
}

function handleButtonClick() {
    const selectedTip = chooseRandomTip(cookingTips);
    displayTip(selectedTip);
}

/* Week 11 State Management */

let sandwichCount = 0;

function updateDisplay() {
    const counter = document.getElementById("counter");
    const counterMessage = document.getElementById("counterMessage");

    if (counter) {
        counter.textContent = sandwichCount;
    }

    if (counterMessage) {
        counterMessage.textContent =
            "You are making " + sandwichCount + " sandwiches.";
    }
}

function increaseCount() {
    if (typeof sandwichCount !== "number") {
        sandwichCount = 0;
    }

    sandwichCount++;
    updateDisplay();
}

function decreaseCount() {
    if (typeof sandwichCount !== "number") {
        sandwichCount = 0;
    }

    if (sandwichCount > 0) {
        sandwichCount--;
    }

    updateDisplay();
}

/* API Functionality */

async function loadUsers() {
    const userContainer = document.getElementById("user-container");

    if (!userContainer) {
        return;
    }

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to load users.");
        }

        const users = await response.json();

        /* Week 12 Performance Improvement:
           Build HTML once and update the DOM once. */

        let userHTML = "";

        users.slice(0, 5).forEach(user => {
            const name = user.name || "Unknown User";
            const email = user.email || "No Email Available";
            const city = user.address?.city || "Unknown City";

            userHTML += `
                <div class="user-card">
                    <h3>${name}</h3>
                    <p>Email: ${email}</p>
                    <p>City: ${city}</p>
                </div>
            `;
        });

        userContainer.innerHTML = userHTML;

    } catch (error) {
        userContainer.textContent =
            "Unable to load external data.";
    }
}

/* Event Listeners */

function setupEventListeners() {
    const recipeBtn = document.getElementById("recipeBtn");

    if (recipeBtn) {
        recipeBtn.addEventListener("click", handleButtonClick);
    }

    const plusBtn = document.getElementById("plusBtn");

    if (plusBtn) {
        plusBtn.addEventListener("click", increaseCount);
    }

    const minusBtn = document.getElementById("minusBtn");

    if (minusBtn) {
        minusBtn.addEventListener("click", decreaseCount);
    }
}

/* Initialize Application */

setupEventListeners();
updateDisplay();
loadUsers();
