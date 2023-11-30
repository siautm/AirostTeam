// adminScript.js
document.addEventListener('DOMContentLoaded', function () {
    // Fetch orders when the page is loaded
    fetchOrders();
});

function fetchOrders() {
    fetch('/api/getOrders')
        .then(response => response.json())
        .then(data => displayOrders(data))
        .catch(error => console.error('Error:', error));
}

function displayOrders(orders) {
    const tableBody = document.getElementById('orderTableBody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Populate the table with orders
    orders.forEach(order => {
        const row = tableBody.insertRow();
        
        const Name = row.insertCell(0);
        const Restaurant = row.insertCell(1);
        const foodNameCell = row.insertCell(2);
        const quantityCell = row.insertCell(3);
        const orderTypeCell = row.insertCell(4);
        const totalCell = row.insertCell(5);
        
        const actionCell = row.insertCell(6);
        Name.textContent = order.name;
        foodNameCell.textContent = order.foodName;
        quantityCell.textContent = order.quantity;
        orderTypeCell.textContent = order.orderType;
        totalCell.textContent = `RM${order.total.toFixed(2)}`;
        Restaurant.textContent = order.selectedRestaurant;

         // Create a delete button
         const deleteButton = document.createElement('button');
         deleteButton.textContent = 'Delete';
         deleteButton.addEventListener('click', () => deleteOrder(order._id));
 
         // Append the delete button to the action cell
         actionCell.appendChild(deleteButton);
    });
}

function deleteOrder(orderId) {
    // Confirm before deleting
    const confirmDelete = confirm('Are you sure you want to delete this order?');

    if (confirmDelete) {
        // Send a DELETE request to the server
        fetch(`/api/deleteOrder/${orderId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Refresh the orders after deletion
                fetchOrders();
                alert('Order deleted successfully!');
            } else {
                alert('Failed to delete order.');
            }
        })
        .catch(error => console.error('Error:', error));
    }
}