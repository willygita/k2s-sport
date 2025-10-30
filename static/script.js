// Player animation data
const players = [
    {
        name: "JANE SULEIMAN",
        nationality: "🇳🇬 NIGERIA",
        age: 21,
        weight: 75,
        position: "POINT-GUARD",
        height: 180,
        hand: "RIGHT",
        team: "NONE",
        rating: 89,
        stats: {
            "Pace": 91,
            "Passing": 78,
            "Shooting": 88,
            "Dribbling": 93,
            "Defense": 70,
            "Rebound": 85
        }
    },
    {
        name: "CHRIS MWANGI",
        nationality: "🇰🇪 KENYA",
        age: 24,
        weight: 72,
        position: "SMALL-FORWARD",
        height: 195,
        hand: "LEFT",
        team: "LAGOS LIONS",
        rating: 85,
        stats: {
            "Pace": 84,
            "Passing": 90,
            "Shooting": 79,
            "Dribbling": 88,
            "Defense": 73,
            "Rebound": 92
        }
    }
];

let current = 0;

// Get all required elements
const playerName = document.getElementById('player-name');
const playerNationality = document.getElementById('player-nationality');
const playerAge = document.getElementById('player-age');
const playerWeight = document.getElementById('player-weight');
const playerPosition = document.getElementById('player-position');
const playerHeight = document.getElementById('player-height');
const playerHand = document.getElementById('player-hand');
const playerTeam = document.getElementById('player-team');

const playerRating = document.getElementById('player-rating');
const playerStatsGrid = document.getElementById('player-stats-grid');
const nextBtn = document.getElementById('next-player');

// Navbar toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Hero CTA button functionality
const heroCta = document.querySelector('.hero-cta');
if (heroCta) {
    heroCta.addEventListener('click', function () {
        // Scroll to the marketplace section
        const marketplaceSection = document.querySelector('.marketplace-section');
        if (marketplaceSection) {
            marketplaceSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function updatePlayer() {
    const p = players[current];

    // Update Text Details
    playerName.textContent = p.name;
    playerNationality.innerHTML = `<span>${p.nationality}</span>`;
    playerAge.textContent = p.age;
    playerWeight.textContent = `${p.weight} KG`;
    playerPosition.textContent = p.position;
    playerHeight.textContent = `${p.height} CM`;
    playerHand.textContent = p.hand;
    playerTeam.textContent = p.team;

    // Update Overall Rating
    playerRating.textContent = p.rating;

    // Update Stats Grid (Flat style)
    playerStatsGrid.innerHTML = ''; // Clear previous stats
    for (const [statName, statValue] of Object.entries(p.stats)) {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';

        const statValueDiv = document.createElement('div');
        statValueDiv.className = 'stat-value';
        statValueDiv.textContent = statValue;

        const statLabel = document.createElement('div');
        statLabel.className = 'stat-label';
        statLabel.textContent = statName.toUpperCase(); // Capitalize label

        statItem.appendChild(statValueDiv);
        statItem.appendChild(statLabel);
        playerStatsGrid.appendChild(statItem);
    }
}

nextBtn.addEventListener('click', () => {
    current = (current + 1) % players.length;
    updatePlayer();
});

// Auto slide every 6 seconds
setInterval(() => {
    current = (current + 1) % players.length;
    updatePlayer();
}, 6000);

// Initialize the first player card on load
updatePlayer();

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = document.getElementById('cart-count');
let cartModal = document.getElementById('cartModal');
let cartItems = document.getElementById('cartItems');
let cartTotal = document.getElementById('cartTotal');
let cartBtn = document.getElementById('cartBtn');
let closeCart = document.getElementById('closeCart');
let proceedPayment = document.querySelector('.proceed-to-payment');

// Update cart count display
function updateCartCount() {
    if (cartBtn) {
        cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${cart.length})`;
    }
}

// Update cart display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(itemDiv);
        total += parseFloat(item.price.replace('$', ''));
    });

    cartTotal.textContent = total.toFixed(2);
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const name = productCard.querySelector('.name').textContent;
        const price = productCard.querySelector('.price').textContent;
        const image = productCard.querySelector('img').src;

        const item = { name, price, image };
        cart.push(item);

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        updateCartDisplay();

        // Show feedback
        alert(`${name} added to cart!`);
    });
});

// Cart modal functionality
cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
    updateCartDisplay();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Remove item from cart
cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }
});

// Proceed to payment
proceedPayment.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to payment... (This is a simulation)');
    // Here you would typically redirect to a payment page or integrate with a payment gateway
});

// Initialize cart on page load
updateCartCount();

// Dashboard Dynamic Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Update user info dynamically (simulate from localStorage or API)
    updateUserInfo();

    // Animate stat values on load
    animateStats();

    // Simulate notifications and messages
    loadNotifications();
    loadMessages();

    // Update wallet and transactions
    updateWallet();

    // Add event listeners for dashboard buttons
    addDashboardEventListeners();
});

function updateUserInfo() {
    // Simulate dynamic user data
    const userData = {
        name: 'John Doe',
        role: 'Player',
        verified: true,
        avatar: '../images/WhatsApp_Image_2025-10-25_at_16.24.26_92ac47b1-removebg-preview.png'
    };

    document.getElementById('user-name').textContent = userData.name;
    document.getElementById('user-role').textContent = userData.role;
    document.getElementById('verification-status').innerHTML = userData.verified ?
        '<i class="fas fa-check-circle"></i><span>Verified</span>' :
        '<i class="fas fa-times-circle"></i><span>Unverified</span>';
    document.querySelector('.user-avatar img').src = userData.avatar;
}

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value, .perf-value, .stat-num, .analytics-value');
    statValues.forEach(stat => {
        const target = parseFloat(stat.textContent.replace(/[^0-9.-]/g, ''));
        if (!isNaN(target)) {
            animateNumber(stat, 0, target, 1000);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        element.textContent = isNaN(end) ? current.toFixed(1) : Math.floor(current);
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

function loadNotifications() {
    const notifications = [
        { icon: 'fas fa-trophy', title: 'Tournament Update', message: 'Your team advanced to the next round!', time: '2 hours ago' },
        { icon: 'fas fa-handshake', title: 'Sponsorship Approved', message: 'Nike partnership has been approved.', time: '1 day ago' },
        { icon: 'fas fa-calendar-alt', title: 'New Match Scheduled', message: 'Match against City United on March 20.', time: '3 hours ago' }
    ];

    const notificationList = document.querySelector('.notification-list');
    if (notificationList) {
        notificationList.innerHTML = '';
        notifications.forEach(notif => {
            const item = document.createElement('div');
            item.className = 'notification-item';
            item.innerHTML = `
                <i class="${notif.icon}"></i>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <span class="notification-time">${notif.time}</span>
                </div>
            `;
            notificationList.appendChild(item);
        });
    }
}

function loadMessages() {
    const messages = [
        { sender: 'Scout Manager', message: 'You have a new message regarding your profile.', time: '3 hours ago' },
        { sender: 'Team Captain', message: 'Practice schedule updated for next week.', time: '1 day ago' },
        { sender: 'Tournament Organizer', message: 'Registration confirmed for Premier League.', time: '2 days ago' }
    ];

    const messageList = document.querySelector('.message-list');
    if (messageList) {
        messageList.innerHTML = '';
        messages.forEach(msg => {
            const item = document.createElement('div');
            item.className = 'message-item';
            item.innerHTML = `
                <div class="message-sender">${msg.sender}</div>
                <p>${msg.message}</p>
                <span class="message-time">${msg.time}</span>
            `;
            messageList.appendChild(item);
        });
    }
}

function updateWallet() {
    // Simulate wallet data
    const balance = 1250.00;
    const transactions = [
        { title: 'Sponsorship Payment', desc: 'Nike Partnership - Monthly', amount: 2500.00, date: 'March 1, 2024' },
        { title: 'Tournament Fee', desc: 'Premier League Registration', amount: -150.00, date: 'Feb 28, 2024' },
        { title: 'Prize Money', desc: 'Championship Cup Winner', amount: 500.00, date: 'Feb 20, 2024' }
    ];

    document.querySelector('.balance-amount').textContent = `$${balance.toFixed(2)}`;

    const transactionList = document.querySelector('.transaction-list');
    if (transactionList) {
        transactionList.innerHTML = '';
        transactions.forEach(trans => {
            const item = document.createElement('div');
            item.className = 'transaction-item';
            item.innerHTML = `
                <div class="transaction-info">
                    <h4>${trans.title}</h4>
                    <p>${trans.desc}</p>
                </div>
                <div class="transaction-amount">${trans.amount > 0 ? '+' : ''}$${Math.abs(trans.amount).toFixed(2)}</div>
                <span class="transaction-date">${trans.date}</span>
            `;
            transactionList.appendChild(item);
        });
    }
}

function addDashboardEventListeners() {
    // Add event listeners for dashboard buttons
    document.querySelectorAll('.dashboard-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.textContent.toLowerCase();
            if (action.includes('browse')) {
                alert('Redirecting to tournaments page...');
            } else if (action.includes('create')) {
                alert('Opening team creation form...');
            } else if (action.includes('invite')) {
                alert('Opening invite players modal...');
            } else if (action.includes('apply')) {
                alert('Redirecting to sponsorship applications...');
            } else if (action.includes('add funds')) {
                alert('Opening add funds modal...');
            } else {
                alert(`${this.textContent} clicked!`);
            }
        });
    });

    // Apply buttons for trials
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Application submitted successfully!');
        });
    });
}
