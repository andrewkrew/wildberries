import {popupProductList}  from "./basketRender.js";
import { deleteProduct } from "../func/basket.js";
import { setProductCount } from "../func/countProduct.js";

// отрисовка карточек товара в корзине
function generateBasketCard({id, name, salePrice, photo, count}) {
	let product = document.createElement('div');
	product.classList.add('basket__product');
	product.dataset.basketItemId = id;

	let productInfo = document.createElement('div');
	productInfo.classList.add('basket__product-wrap');

	let productPhoto = document.createElement('img');
	productPhoto.classList.add('basket__product-image');
	productPhoto.src = photo;
	productPhoto.alt = name;

	let productName = document.createElement('h3');
	productName.classList.add('basket__product-title');
	productName.innerHTML = name;

	let counter	= document.createElement('div');
	counter.classList.add('basket__product-counter', 'counter');
	
	let countMinus =  document.createElement('button');
	countMinus.classList.add('counter__minus');
	countMinus.innerHTML = '<span>_</span>';
	countMinus.addEventListener('click', (event) => {
		setProductCount(event);
	})

	let countNum = document.createElement('p');
	countNum.classList.add('counter__number');
	countNum.innerHTML = count;

	let countPlus =  document.createElement('button');
	countPlus.classList.add('counter__plus');
	countPlus.innerHTML = '+';
	countPlus.addEventListener('click', (event) => {
		setProductCount(event);
	})

	let productRemove = document.createElement('div');
	productRemove.classList.add('basket__product-remove');

	let productPrice = document.createElement('p');
	productPrice.classList.add('basket__product-price');
	productPrice.innerHTML = `${(salePrice * count).toFixed(2)} p.`;

	let deleteProductBtn = document.createElement('button');
	deleteProductBtn.classList.add('basket__product-delete');
	deleteProductBtn.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';
	deleteProductBtn.addEventListener('click', deleteProduct)

	popupProductList.append(product);
	product.append(productInfo, counter, productRemove);
	counter.append(countMinus, countNum, countPlus);
	productInfo.append(productPhoto, productName);
	productRemove.append(productPrice, deleteProductBtn);
}

export {generateBasketCard};