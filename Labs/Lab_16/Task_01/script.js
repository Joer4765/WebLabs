// Елементи DOM
const productList = document.getElementById('product-list');
const addProductBtn = document.getElementById('add-product');
const filterInput = document.getElementById('filter-products');
const totalAmount = document.getElementById('total-amount');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.querySelector('.close');

// Дані про товари
let products = [];

// Функція для додавання нового товару
function addProduct() {
    const name = prompt('Введіть назву товару:');
    const price = parseFloat(prompt('Введіть ціну товару:'));
    const imageURL = prompt('Введіть URL зображення товару:');

    const newProduct = { name, price, imageURL };
    products.push(newProduct);
    renderProducts();
}

// Функція для видалення товару
function deleteProduct(index) {
    products.splice(index, 1);
    renderProducts();
}

// Функція для редагування товару
function editProduct(index) {
    const product = products[index];
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-price').value = product.price;

    // Збереження змін
    document.getElementById('save-changes').onclick = () => {
        product.name = document.getElementById('edit-name').value;
        product.price = parseFloat(document.getElementById('edit-price').value);
        renderProducts();
        productModal.style.display = 'none';
    };

    productModal.style.display = 'block';
}

// Функція для фільтрації товарів
function filterProducts() {
    const filterText = filterInput.value.toLowerCase();
    renderProducts(products.filter(product => product.name.toLowerCase().includes(filterText)));
}

// Функція для відображення товарів
function renderProducts(filteredProducts = products) {
    productList.innerHTML = '';
    let total = 0;

    filteredProducts.forEach((product, index) => {
        const li = document.createElement('li');
        li.classList.add('product');
        li.innerHTML = `
      <img src="${product.imageURL}" alt="${product.name}">

          <h3 class="product-name" onclick="editProduct(${index})">${product.name}</h3> 
          <p class="product-price" onclick="editProduct(${index})">${product.price} грн</p>

      <button class="delete" onclick="deleteProduct(${index})">Видалити</button>
    `;
        productList.appendChild(li);
        total += product.price;
    });

    totalAmount.textContent = total.toFixed(2);
}

// Прив'язка подій
addProductBtn.addEventListener('click', addProduct);
filterInput.addEventListener('input', filterProducts);
closeModalBtn.addEventListener('click', () => productModal.style.display = 'none');

// Початкове відображення товарів
renderProducts();
