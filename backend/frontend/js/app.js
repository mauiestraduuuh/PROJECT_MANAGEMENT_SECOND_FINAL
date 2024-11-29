// Frontend - app.js

// Fetch and display existing products, permits, and sales data when the page is ready
window.onload = function() {
    fetchProducts();
    fetchLicenses();
    fetchSales();
};

// Fetch and display products
function fetchProducts() {
    fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('productTableBody');
            tableBody.innerHTML = '';
            data.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.product_name}</td>
                    <td>${product.unit_price}</td>
                    <td>${product.quantity}</td>
                    <td>${product.date_added}</td>
                    <td>${product.expiry_date}</td>
                    <td><button onclick="editProduct(${product.id})">Edit</button><button onclick="deleteProduct(${product.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Fetch and display permits
function fetchLicenses() {
    fetch('http://localhost:5000/api/licenses')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('permitTableBody');
            tableBody.innerHTML = '';
            data.forEach(license => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${license.permit_name}</td>
                    <td>${license.issued_date}</td>
                    <td>${license.expiry_date}</td>
                    <td>${getStatus(license.expiry_date)}</td>
                    <td><button onclick="editLicense(${license.id})">Edit</button><button onclick="deleteLicense(${license.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching licenses:', error));
}

// Fetch and display sales
function fetchSales() {
    fetch('http://localhost:5000/api/sales')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('salesTableBody');
            tableBody.innerHTML = '';
            data.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.product_name}</td>
                    <td>${sale.sales_date}</td>
                    <td>${sale.price}</td>
                    <td>${sale.quantity}</td>
                    <td>${sale.total_amount}</td>
                    <td><button onclick="editSale(${sale.id})">Edit</button><button onclick="deleteSale(${sale.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching sales:', error));
}

// Get status for permit based on expiry date
function getStatus(expiryDate) {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < currentDate) return 'Expired';
    if ((expiry - currentDate) < 7 * 24 * 60 * 60 * 1000) return 'Expiring Soon';
    return 'Active';
}

// Login form submission handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Make POST request to backend for login authentication
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Login successful!') {
        alert('Login successful!');
        // Redirect or show a dashboard
        window.location.href = 'dashboard.html'; // Example redirect
      } else {
        alert('Invalid username or password');
      }
    })
    .catch(error => console.error('Error:', error));
  });
  
// Handle permit form submission
document.getElementById('addLicenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const permitName = document.getElementById('permitName').value;
    const issuedDate = document.getElementById('issuedDate').value;
    const expiryDate = document.getElementById('expiryDate').value;

    const newPermit = {
        permit_name: permitName,
        issued_date: issuedDate,
        expiry_date: expiryDate
    };

    fetch('http://localhost:5000/api/licenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPermit)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchLicenses();  // Refresh the list of licenses
    })
    .catch(error => console.error('Error adding permit:', error));
});

// Handle product form submission
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const unitPrice = document.getElementById('unitPrice').value;
    const quantity = document.getElementById('quantity').value;
    const dateAdded = document.getElementById('dateAdded').value;
    const expiryDate = document.getElementById('productExpiryDate').value;

    const newProduct = {
        product_name: productName,
        unit_price: unitPrice,
        quantity: quantity,
        date_added: dateAdded,
        expiry_date: expiryDate
    };

    fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchProducts();  // Refresh the list of products
    })
    .catch(error => console.error('Error adding product:', error));
});

// Handle sales form submission
document.getElementById('addSaleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const saleProductName = document.getElementById('saleProductName').value;
    const salesDate = document.getElementById('salesDate').value;
    const salePrice = document.getElementById('salePrice').value;
    const saleQuantity = document.getElementById('saleQuantity').value;
    const totalAmount = document.getElementById('totalAmount').value;

    const newSale = {
        product_name: saleProductName,
        sales_date: salesDate,
        price: salePrice,
        quantity: saleQuantity,
        total_amount: totalAmount
    };

    fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSale)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchSales();  // Refresh the list of sales
    })
    .catch(error => console.error('Error adding sale:', error));
});
