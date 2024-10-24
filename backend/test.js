import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50, 
  duration: '1m', 
};

const BASE_URL = 'http://localhost:7000'; 
const AUTH_TOKEN = 'mksdjiudie102i92uusjhdyr'; 

// Function to test the create product endpoint
function createProduct() {
  const url = `${BASE_URL}/create/product`;

  const payload = JSON.stringify({
    title: 'Test Product',
    content: 'This is a test product created for load testing.',
    image: null,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  };

  // Send POST request to create product
  const res = http.post(url, payload, params);
  
  // Check response status
  check(res, {
    'Create product status is 201': (r) => r.status === 201,
  });
}

// Function to test the fetch products endpoint (GET)
function getAllProducts() {
  const url = `${BASE_URL}/products`;

  const params = {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  };

  // Send GET request to fetch all products
  const res = http.get(url, params);

  check(res, {
    'Get products status is 200': (r) => r.status === 200,
  });
}

//update product endpoint (PUT)
function updateProduct(productId) {
  const url = `${BASE_URL}/edit/product/${productId}`;

  const payload = JSON.stringify({
    title: 'Updated Test Product',
    content: 'This is an updated product for load testing.',
    image: null,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  };

  // Send PUT request to update product
  const res = http.put(url, payload, params);

  check(res, {
    'Update product status is 200': (r) => r.status === 200,
  });
}

//delete product endpoint (DELETE)
function deleteProduct(productId) {
  const url = `${BASE_URL}/delete/product/${productId}`;

  const params = {
    headers: {
      'Authorization': `Bearer ${AUTH_TOKEN}`,
    },
  };

  const res = http.del(url, null, params);

  check(res, {
    'Delete product status is 204': (r) => r.status === 204,
  });
}

export default function () {
  
  createProduct(); 
  getAllProducts(); 

  
  const productId = '6719fd3ae2b47a41988fd964'; 
  updateProduct(productId); 
  deleteProduct(productId); 

  sleep(1); 
}
