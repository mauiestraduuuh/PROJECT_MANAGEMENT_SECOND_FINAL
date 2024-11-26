// Fetch functions for License (Permit), Product (Inventory), and Sales (Transactions)
function fetchLicenses() {
    fetch('http://localhost:5000/api/licenses')  // Adjust URL if needed
      .then(response => response.json())
      .then(data => {
        displayLicenses(data);
      })
      .catch(error => console.error('Error fetching licenses:', error));
  }
  
  function fetchProducts() {
    fetch('http://localhost:5000/api/products')  // Adjust URL if needed
      .then(response => response.json())
      .then(data => {
        displayProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }
  
  function fetchSales() {
    fetch('http://localhost:5000/api/transactions')  // Adjust URL if needed
      .then(response => response.json())
      .then(data => {
        displaySales(data);
      })
      .catch(error => console.error('Error fetching sales:', error));
  }
  
  // Display functions for each entity
  function displayLicenses(licenses) {
    const tableBody = document.getElementById('permitTableBody');
    tableBody.innerHTML = '';
    licenses.forEach(license => {
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
  }
  
  function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    products.forEach(product => {
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
  }
  
  function displaySales(sales) {
    const tableBody = document.getElementById('salesTableBody');
    tableBody.innerHTML = '';
    sales.forEach(sale => {
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
  }
  
  // Helper function to get status based on expiry date
  function getStatus(expiryDate) {
    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < currentDate) return 'Expired';
    if ((expiry - currentDate) < 7 * 24 * 60 * 60 * 1000) return 'Expiring Soon';
    return 'Active';
  }
  
  // Call the fetch functions to load data on page load
  window.onload = function() {
    fetchLicenses();
    fetchProducts();
    fetchSales();
  };
  