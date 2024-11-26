// Import necessary libraries
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// Set up middleware
app.use(cors({
  origin: 'http://127.0.0.1:80'  // Allow requests from your live server proxy
}));
app.use(bodyParser.json());

// Set up MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: 'mauestrada', // Replace with your MySQL password
  database: 'system_db' // Replace with your database name
});

// Test route to check if backend is working
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// --- API Routes ---

// **Licenses (Permits) Routes**
// Get all licenses
app.get('/api/licenses', (req, res) => {
  const query = 'SELECT * FROM licenses';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching permits:', err);
      res.status(500).json({ message: 'Error fetching permits', error: err });
    } else {
      res.json(result);
    }
  });
});

// Add a new license (permit)
app.post('/api/licenses', (req, res) => {
  const { permit_name, issued_date, expiry_date } = req.body;
  const query = 'INSERT INTO licenses (permit_name, issued_date, expiry_date) VALUES (?, ?, ?)';
  db.query(query, [permit_name, issued_date, expiry_date], (err, result) => {
    if (err) {
      console.error('Error adding permit:', err);
      res.status(500).json({ message: 'Error adding permit', error: err });
    } else {
      res.status(201).json({ message: 'Permit added successfully' });
    }
  });
});

// **Inventory Routes**
// Get all inventory products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching inventory:', err);
      res.status(500).json({ message: 'Error fetching inventory', error: err });
    } else {
      res.json(result);
    }
  });
});

// Add a new inventory product
app.post('/api/products', (req, res) => {
  const { product_name, unit_price, quantity, date_added, expiry_date } = req.body;
  const query = 'INSERT INTO products (product_name, unit_price, quantity, date_added, expiry_date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [product_name, unit_price, quantity, date_added, expiry_date], (err, result) => {
    if (err) {
      console.error('Error adding product to inventory:', err);
      res.status(500).json({ message: 'Error adding product to inventory', error: err });
    } else {
      res.status(201).json({ message: 'Product added to inventory successfully' });
    }
  });
});

// **Sales Routes**
// Get all sales transactions
app.get('/api/transactions', (req, res) => {
  const query = 'SELECT * FROM transactions';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching sales data:', err);
      res.status(500).json({ message: 'Error fetching sales data', error: err });
    } else {
      res.json(result);
    }
  });
});

// Add a new sale transaction
app.post('/api/transactions', (req, res) => {
  const { product_name, sales_date, price, quantity, total_amount } = req.body;
  const query = 'INSERT INTO transactions (product_name, sales_date, price, quantity, total_amount) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [product_name, sales_date, price, quantity, total_amount], (err, result) => {
    if (err) {
      console.error('Error adding sale:', err);
      res.status(500).json({ message: 'Error adding sale', error: err });
    } else {
      res.status(201).json({ message: 'Sale added successfully' });
    }
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
