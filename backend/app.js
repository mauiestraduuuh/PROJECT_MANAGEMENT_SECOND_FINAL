const express = require('express');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

const app = express();

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // change if your username is different
  password: 'mauestrada',  // put your MySQL password here if applicable
  database: 'system_db'  // replace with your actual database name
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5000',
  methods: ['GET', 'POST']
}));

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Serve static files from 'frontend' directory (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'frontend')));

// Root route - serves the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // Serve the index.html file
});

// API route for products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products'; // Query to fetch products from the database
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API route to add a product
app.post('/api/products', (req, res) => {
  const { product_name, unit_price, quantity, date_added, expiry_date } = req.body;
  const query = 'INSERT INTO products (product_name, unit_price, quantity, date_added, expiry_date) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [product_name, unit_price, quantity, date_added, expiry_date], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product added successfully!' });
  });
});

// API route for licenses (permits)
app.get('/api/licenses', (req, res) => {
  const query = 'SELECT * FROM licenses'; // Query to fetch licenses from the database
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// API route to add a license (permit)
app.post('/api/licenses', (req, res) => {
  const { permit_name, issued_date, expiry_date } = req.body;
  const query = 'INSERT INTO licenses (permit_name, issued_date, expiry_date) VALUES (?, ?, ?)';
  db.query(query, [permit_name, issued_date, expiry_date], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Permit added successfully!' });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
