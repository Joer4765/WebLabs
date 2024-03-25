const products = new Map();

const productHistory = new WeakMap();

const orders = new Set();

const users = new WeakSet();

let productID = 0;
function addProduct(productName, price, quantity) {
    products.set(productID, { name: productName, price: price, quantity: quantity });
    productHistory.set(products.get(productID), [{ price: price, quantity: quantity, timestamp: new Date(), status: "created"}]);
    // ++productID;
    return productID++;
}

function deleteProduct(productId) {
    if (!products.has(productId)) {
        return false;
    }
    products.delete(productId);
    return true;
}

function updateProduct(productId, newPrice, newQuantity) {
    const product = products.get(productId);
    if (!product) {
        return false;
    }
    if (newPrice) {
        product.price = newPrice
    }
    if (newQuantity) {
        product.quantity = newQuantity;
    }
    const history = productHistory.get(product);
    history.push({ price: product.price, quantity: product.quantity, timestamp: new Date(), status: "updated"});
    return true;


}

function findProductByName(productName) {
    for (const [_, product] of products) {
        if (product.name === productName) {
            return product;
        }
    }
    return null;
}

function trackOrder(order) {
    const product = products.get(order.productID);
    let newQuantity = product.quantity - order.quantity;
    updateProduct(order.productID, false, newQuantity);
}

let orderID = 0;
function addOrder(productID, quantity, user) {
    if (!users.has(user)) {
        return false;
    }
    let order = { orderID: orderID, productID: productID, quantity: quantity, user: user};
    orders.add(order);
    trackOrder(order);
    ++orderID;
    return true;
}

let userID = 0;
function addUser(name) {
    let user = { userID: userID, name: name};
    users.add(user);
    ++userID;
    return user;
}

let prodID = addProduct("Годинник", 50, 100);
console.log(`Created product: ${JSON.stringify(products.get(prodID))}`);

updateProduct(prodID, 60, 90);
console.log(`Updated product: ${JSON.stringify(findProductByName("Годинник"))}`);

let user = addUser('Vanya');

addOrder(prodID, 3, user);
console.log(`Ordered product: ${JSON.stringify(products.get(prodID))}`);

console.log(productHistory.get(products.get(prodID)));

let isDeleted = deleteProduct(prodID);
console.log(isDeleted ? 'Product is deleted!' : 'Product is not deleted(?)');


