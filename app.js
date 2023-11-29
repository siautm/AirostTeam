// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodmine-db');

// Define a food schema and model
const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Food = mongoose.model('Food', foodSchema);

// Middleware for parsing POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to render the food data
app.get('/', async (req, res) => {
  try {
    // Retrieve food data from MongoDB
    const foods = await Food.find();

    // Render the EJS template and pass the data
    res.render('foods', { foods });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle food deletion
// Route to handle food deletion
app.post('/delete', async (req, res) => {
    try {
      const foodIdToDelete = req.body.id;
  
      // Use Mongoose to delete the document
      await Food.findByIdAndDelete(foodIdToDelete);
  
      // Redirect back to the /foods page
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});