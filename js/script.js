// Selector
const filterInputElm = document.querySelector("#filter");
const productNameElm = document.querySelector(".product-name");
const productPriceElm = document.querySelector(".product-price");
const submitBtn = document.querySelector(".add-product");
const formElm = document.querySelector('form');
const deleteProduct = document.querySelector(".delete-product");
const productCollectionElm = document.querySelector(".collection");
const msgElm = document.querySelector(".msg");
const updateBtn = document.querySelector(".update-product");

// data / state
let productData = getDataLocalStorageData();
function getDataLocalStorageData() {
    let items = '';
    if (localStorage.getItem('productItems') === null){
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('productItems'));
    }
    return items;
}

function addDataToLocalStorage(item) {
    let items = '';
    if (localStorage.getItem('productItems') === null) {
        items = []
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }else {
        items = JSON.parse(localStorage.getItem('productItems'));
        items.push(item);
        localStorage.setItem('productItems', JSON.stringify(items));
    }
}

function deleteItemsFormLocalStorage(id) {
    let items = JSON.parse(localStorage.getItem('productItems'))
    let result = items.filter((productItems) =>{
        return  productItems.id !== id;
    })
    localStorage.setItem('productItems', JSON.stringify(result));
}

function loadEventListener() {
    // submitBtn.addEventListener('click', addProduct);
    window.addEventListener('DomContentLoad', getData.bind(null, productData));
    productCollectionElm.addEventListener('click', modifyOrDeleteProduct);
    formElm.addEventListener('click', addOrUpdateProduct);
    filterInputElm.addEventListener('keyup', filterSearch);
}


function getData(productList) {
    if (productData.length > 0){
        msgElm.innerHTML = '';
        let li = '';
        productData.forEach(product =>{
            li = document.createElement('li');
            li.className = 'list-group-item collection-item';
            li.id = `product-${product.id}`;
            li.innerHTML = ` 
            <strong>${product.name}</strong>- <span class="price">$${product.price}</span>
            <i class="fa fa-trash float-right ml-3 delete-product"></i>
            <i class="fas fa-edit float-right edit-product"></i>
            `
            productCollectionElm.appendChild(li);
        })
    }else{
        msgElm.innerHTML = "No items to show!";
    }
}
getData(productData);
//
function addOrUpdateProduct(evt) {
    if (evt.target.classList.contains('add-product')){
        addProduct(evt);
    }else if(evt.target.classList.contains('edit-product')){
        updateEditProduct();
    }
    
}

// update edited product
function updateEditProduct() {
    const name = productNameElm.value;
    const price = productPriceElm.value;

}
// add product
const addProduct = (evt) =>{
    const name = productNameElm.value;
    const price = productPriceElm.value;
    let id;
    if (productData.length === 0){
        id = 0;
    }else{
        id = productData[productData.length - 1].id + 1;
    }
    if (name === '' || isNaN(price) || !(!isNaN(parseFloat(price)) && isFinite(price))){
        alert("Please input necessary information.");
    } else {
        let data = {
            id: id,
            name: name,
            price: price
        }
        productData.push(data);
        addDataToLocalStorage(data);
        productNameElm.value = '';
        productPriceElm.value = '';
        productCollectionElm.innerHTML = '';
        getData(productData);
    }

};
// find product for update
function findProductForUpdate(id) {
    return productData.find(product => product.id === id);
}

// populate ui with updated product info
function populateEditedProduct(product) {
    productNameElm.value = product.name;
    productPriceElm.value = product.price;
    updateBtn.setAttribute('value', `${product.id}`);

}
// delete items
const modifyOrDeleteProduct = (evt) => {
    const deleteItems = evt.target.parentElement;
    const editItem = evt.target.parentElement;
    console.log(editItem);
    if (evt.target.classList.contains('delete-product')){
        evt.target.parentElement.parentElement.removeChild(deleteItems);
    }else if (evt.target.classList.contains('edit-product')){
        // evt.target.parentElement.parentElement.removeChild(deleteItems);
        console.log(evt.target)
        updateBtn.style.display = '';
        submitBtn.style.display = 'none';

        const updatedProductId = Number(editItem.id.split('-')[1]);
        console.log(updatedProductId);
        const foundProduct = findProductForUpdate(updatedProductId);
        populateEditedProduct(foundProduct);
    }

    const productId = Number(deleteItems.id.split('-')[1]);
    deleteItemsFormLocalStorage(productId);

    productData = productData.filter((product) => {
        return product.id !== productId;
    })
//    edit product info

};

// filter product items / search products
const filterSearch = (evt) => {
    let inputText = evt.target.value;
    // console.log(evt.target.value);
    document.querySelectorAll(".collection .collection-item").forEach((items =>{
        let productName = items.firstElementChild.textContent;
        let itemMessage = 0;
        // console.log(items.firstElementChild.textContent);
        if (productName.indexOf(inputText) === -1){
            items.style.display = 'none';
        }else {
            msgElm.innerHTML = "";
            items.style.display = 'block';
            ++itemMessage;
        }
        if (itemMessage > 0){
            msgElm.innerHTML = "";
        } else{
            msgElm.innerHTML = "No items to show!";
        }
    }))
};

// edit productInfo

// editProductInfoElm.addEventListener('click', evt => {
//     console.log("connected");
// })

// all event listener

loadEventListener();

