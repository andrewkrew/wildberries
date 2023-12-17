import { getIdCard } from "./getIdElem.js";
import { basketArr, productArr } from "../app.js";
import { updateStorage, clearStorage } from "./storage.js";
import { generateBasketCard } from "../render/basketProducts.js";
import { basketEmpty, basketCost, basketConfirm, deleteAllProductsBtn, confirmBack,popupMessage,popup } from "../render/basketRender.js";
import { changeDisableBtnStyle } from "./disableButton.js";



function showMessage( message) {
	popupMessage.innerHTML = message;
	
	popup.style.display = 'block';
	setTimeout(() => {
		popup.style.display = 'none';
	}, 2000);
}


function addToBasket() {
	this.classList.add('disabled');
	// смотрим откуда пришел клик, из главной страницы, или из карты товара и получаем ID
	let clickedId = getIdCard(this.closest('.product__card')?.id || 
						this.closest('.card-info')?.dataset.cardId);
	productArr.forEach(item => {
		if (item.id == clickedId && !checkExistId(clickedId)) { // 
		// если товара нет в корзине, то добавляем его туда
		showMessage(`<i class="fa-solid fa-check"></i> Товар успешно добавлен в корзину!`);	
		item.inBasket = true;
		basketArr.push(item);
		generateBasketCard(item);
		} 
	});

	// обновляем localStorage
	updateStorage('basketCards', basketArr);
	updateStorage('productCards', productArr);
	// меняем цвет кнопок
	changeDisableBtnStyle();
	// проверка на пустоту корзины
	checkEmptyBasket();
	// Подсчёт финальной суммы 
	calcFinalSum();
	showCount()
}

// если товар есть в корзине, то выводим сообщение, что товар уже был добавлен
function checkExistId(id) {
	let result = basketArr.find(item => item.id == id);
	if (result) {
		showMessage(' Товар уже добавлен в вашу корзину!');	
		return true;
	}
}

// проверка на пустую корзину, скрываем/показываем кнопки и информативные сообщения
function checkEmptyBasket() {
	if (basketArr.length) {
		basketEmpty.hidden = true;
		deleteAllProductsBtn.hidden = false;
		basketConfirm.hidden = false;
	} else {
		basketEmpty.hidden = false;
		deleteAllProductsBtn.hidden = true;
		basketConfirm.hidden = true;
	}
}

function deleteProduct() {
	let product = this.closest('.basket__product');
	let productId = product.dataset.basketItemId;


	// при удалении меняем статус .inBasket на false, т.к. мы его удалили
	// при удалении меняем статус .count на 1 по умолчанию, чтобы при добавлении этого же товара снова в корзину
	// у нас не сохраняась старое значение 

	productArr.forEach(product => {
		if (product.id == productId) {
			product.inBasket = false;
			product.count = 1
		}
	});

	updateStorage('productCards', productArr);
	changeDisableBtnStyle();

	let updateData = basketArr.filter(item => item.id != productId);
	product.remove();
	
	// перезаписываем массив объектов в корзине
	basketArr.length = 0;
	for (let i = 0; i < updateData.length; i++){
		basketArr[i] = updateData[i];
	}

	// обновляем данные
	updateStorage('basketCards', basketArr);
	checkEmptyBasket();
	calcFinalSum();
	showCount()
}

function delAllProducts() {

	let productItems =  document.querySelectorAll('.basket__product');
		
	productItems.forEach(item => item.remove());

	productArr.forEach(product => {
			product.inBasket = false;
			product.count = 1
	});

	updateStorage('productCards', productArr);
	changeDisableBtnStyle();
	basketArr.length = 0;
	clearStorage('basketCards');
	checkEmptyBasket();
	calcFinalSum();
	showCount()
}

function calcFinalSum() {
	let resultSum = basketArr.reduce((accum, {salePrice, count}) => {
		return accum + count * salePrice;
	}, 0);
	basketCost.innerHTML = `Итого: ${resultSum.toFixed(2)} p.`;
}

function showCount(){
	let headerCount = document.getElementById("count")
	let itemCount = basketArr.length;
	headerCount.innerHTML= itemCount
}

confirmBack.addEventListener("click", () => {
	window.location.href = window.location.origin; 
    delAllProducts();
    
});

export {addToBasket, deleteProduct, delAllProducts, checkEmptyBasket, calcFinalSum,showCount};