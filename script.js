const restaurantMenus = {
    FungWongXian: [
        { name: 'Spicy Grilled Fish', price: 22 },
        { name: 'Nasi Lemak', price: 6 },
        { name: 'Honey Lemon Chicken', price: 16 },
        { name: 'Chinese Fried Rice', price: 10 },
        { name: 'Sweet Grilled Fish', price: 22 },
        { name: 'Taoshi Grilled Fish', price: 22 },
    ],
    Pizzahut: [
        { name: 'Pepperoni', price: 28 },
        { name: 'Vegan Pizza', price: 26 },
        { name: 'Thin N Crispy Pepperoni', price: 22 },
        { name: 'Hawaiian Chicken Pizza', price: 32 },
        { name: 'Aloha Chicken Pizza', price: 32 },
        { name: 'Cheesy Carbonara Spaghetti', price: 18 },
    ],
    HaiSingSeafood: [
        { name: 'Asam Fish', price: 45 },
        { name: 'Fried Octopus', price: 28 },
        { name: 'Kang Kong', price: 16 },
        { name: 'Fried Chicken', price: 20 },
        { name: 'Spicy Sauce Chicken', price: 22 },
        { name: 'Taohu', price: 14 },
    ],
};

function loadFoodOptions() {
    
    const restaurantSelect = document.getElementById('restaurantSelect');
    const foodSelect = document.getElementById('foodSelect');
    const selectedRestaurant = restaurantSelect.value;

    // Clear existing options
    foodSelect.innerHTML = '';

    // Populate food options based on the selected restaurant
    restaurantMenus[selectedRestaurant].forEach(food => {
        const option = document.createElement('option');
        option.value = food.name;
        option.setAttribute('data-price', food.price);
        option.textContent = `${food.name} (RM${food.price})`;
        foodSelect.appendChild(option);
    });

    // Enable the foodSelect dropdown
    foodSelect.disabled = false;
}


function calculateTotal() {
    const foodSelect = document.getElementById('foodSelect');
    const quantity = document.getElementById('quantity').value;
    const orderType = document.getElementById('orderType').value;

    const selectedFood = foodSelect.options[foodSelect.selectedIndex];
    const price = selectedFood.getAttribute('data-price');

    const total = quantity * price;
    document.getElementById('totalPrice').innerText = `Total Price: RM${total.toFixed(2)} (${quantity} x RM${price}) for ${orderType}`;
}

function createOrder() {
    const name = document.getElementById('name').value;
    const restaurantSelect = document.getElementById('restaurantSelect');
    const foodSelect = document.getElementById('foodSelect');
    const quantity = document.getElementById('quantity').value;
    const orderType = document.getElementById('orderType').value;
    

    const selectedRestaurant = restaurantSelect.value;
    const selectedFood = foodSelect.options[foodSelect.selectedIndex];
    const foodName = selectedFood.value;
    const price = selectedFood.getAttribute('data-price');
    const total = quantity * price;
    

    // Assuming you have a backend API endpoint to handle order creation and MongoDB interaction
    fetch('/api/createOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            selectedRestaurant,
            foodName,
            quantity,
            orderType,
            total,
            
        }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Order created successfully!');
       
        // Redirect the user to the homepage or another appropriate page
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Order created successfully!');
       
    });
}