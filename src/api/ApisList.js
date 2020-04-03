import axios from 'axios';

const URL = 'https://my-json-server.typicode.com/banshilaldangi/ecommerce';

const products = new Promise((resolve, reject) => {
    axios.get(`${URL}/products`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const brands = new Promise((resolve, reject) => {
    axios.get(`${URL}/brands`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const features = new Promise((resolve, reject) => {
    axios.get(`${URL}/features`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const categories = new Promise((resolve, reject) => {
    axios.get(`${URL}/categories`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});


export {products,brands,features,categories}; 