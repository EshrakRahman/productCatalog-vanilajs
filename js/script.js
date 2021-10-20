// Selector
const filterInputElm = document.querySelector("#filter");
const productNameElm = document.querySelector(".product-name");
const productPriceElm = document.querySelector(".product-price");
const submitBtn = document.querySelector(".add-product");
const deleteProduct = document.querySelector(".delete-product");
const productCollectionElm = document.querySelector(".collection");
const msgElm = document.querySelector(".msg");

// data / state
let productData = [];

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
            <i class="fa fa-trash float-right delete-product"></i>
            `
            productCollectionElm.appendChild(li);
        })
    }else{
        msgElm.innerHTML = "No items to show!";
    }
}
getData(productData);

// add product
const addProduct = (evt) =>{
    {
        evt.preventDefault();
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
        }
        else {
            productData.push({
                id: id,
                name: name,
                price: price
            })
            productNameElm.value = '';
            productPriceElm.value = '';
            productCollectionElm.innerHTML = '';
            getData(productData);
        }
    }
};

// delete items
const deleteItem = (evt) => {
    console.log(evt.target.classList.contains('delete-product'));
    const deleteItems = evt.target.parentElement;
    if (evt.target.classList.contains('delete-product')){
        evt.target.parentElement.parentElement.removeChild(deleteItems);
    }
    const productId = Number(deleteItems.id.split('-')[1]);
    console.log(productId);
    productData = productData.filter((product) => {
        return product.id !== productId;
    })
};

// filter product items / search products
const filterSearch = (evt) => {
    let inputText = evt.target.value;
    // console.log(evt.target.value);
    document.querySelectorAll(".collection .collection-item").forEach((items =>{
        let productName = items.firstElementChild.textContent;
        // console.log(items.firstElementChild.textContent);
        if (productName.indexOf(inputText) === -1){
            msgElm.innerHTML = "No items to show!";
            items.style.display = 'none';
        }else {
            msgElm.innerHTML = "";
            items.style.display = 'block';
        }
    }))
};

// all event listener
function loadEventListener() {
    submitBtn.addEventListener('click', addProduct);
    productCollectionElm.addEventListener('click', deleteItem);
    filterInputElm.addEventListener('keyup', filterSearch);
}

loadEventListener();