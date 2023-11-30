const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');  // Added for path manipulation

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MongoDB (make sure to replace the connection string with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/foodOrders');

// Define a mongoose schema for orders
const orderSchema = new mongoose.Schema({
    name:String,
    foodName: String,
    quantity: Number,
    orderType: String,
    total: Number,
    selectedRestaurant:String
});

const Order = mongoose.model('Order', orderSchema);

// API endpoint to handle order creation
app.post('/api/createOrder', async (req, res) => {
    try {
        const { name,selectedRestaurant, foodName, quantity, orderType, total } = req.body;

        const newOrder = new Order({
            name,
            selectedRestaurant,
            foodName,
            quantity,
            orderType,
            total,
            
        });

        await newOrder.save();

        // Redirect to a success page (replace 'success.html' with the actual filename)
        res.redirect('/index.html');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// server.js
// ... (Previous code remains unchanged)

// API endpoint to get all orders
app.get('/api/getOrders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/deleteOrder/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;

        // Check if the order exists
        const order = await Order.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        // Delete the order
        await Order.findByIdAndDelete(orderId);

        res.json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Serve static files from the 'public' directory (replace 'public' with the actual directory name)
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});