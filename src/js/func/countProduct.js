import { basketArr } from "../app.js";
import { calcFinalSum } from "./basket.js";
import { updateStorage } from "./storage.js";

function setProductCount(event) {
	
	// смотрим откуда пришёл клик и берем оттуда ID товара
	let product = event.currentTarget.closest('.basket__product');
	let productId = product.dataset.basketItemId;
	
	// если нажали на минус, то находим ID в глобальном массиве и изменяем свойство count--
	if (event.currentTarget.classList.contains('counter__minus')) {
		basketArr.forEach(item => {
			if (item.id == productId && item.count > 1) {
				item.count--;
				// обновляем на странице цифру и цену
				updateCountItem(product, item);
			}; 
		}); // если нажали на плюс, то находим ID в глобальном массиве и изменяем свойство count++
	} else if (event.currentTarget.classList.contains('counter__plus')) {
		basketArr.forEach(item => {
			if (item.id == productId) {
				item.count++;
				// обновляем на странице цифру и цену
				updateCountItem(product, item);
			}; 
		});
	}
}

function updateCountItem(product, item) {
	product.querySelector('.counter__number').innerHTML = item.count;
	product.querySelector('.basket__product-price').innerHTML = `${(item.salePrice * item.count).toFixed(2)} p.`;
	updateStorage('basketCards', basketArr);
	calcFinalSum();
}

export {setProductCount}