import { closeCardPopup, pageUp} from "./render/popup.js";
import { hideCardPopup } from "./func/cardPopup.js";
import { generateCard } from "./render/cards.js";
import { getCardRequest, modifyProductProperty } from "./func/CardRequest.js";
import { getStorage, updateStorage, clearStorage} from "./func/storage.js";
import { generateBasketCard } from "./render/basketProducts.js";
import { changeDisableBtnStyle } from "./func/disableButton.js";
import { clearHiddenStaus} from "./func/searchPanel.js"
import { showPreviousSlide} from "./func/slider.js"
import { basketPopupBtn, basket, basketPopupClose} from "./render/basketRender.js"
import { checkEmptyBasket, calcFinalSum,showCount } from "./func/basket.js";
import { toggleStatusSort, closeMenu, resetTitle, sortProductMinToMax, sortProductMaxToMin, sortProductBySale, sortProductByDefault, createArrForSort } from "./func/sortProducts.js";
import { selectSingleTitle, selectSingleLabels, resetSelect, selectCheap, selectHigh, selectSale, categorySelectTitle, resetCategorySelect } from "./render/sort.js";
import { fillCategoryArr } from "./func/category.js";

let productArr = getStorage('productCards') || [];
let basketArr = getStorage('basketCards') || [];
let productArrForSort = [];
let productCategoryArr = [];


function app() {
	if (!productArr.length) {
		getCardRequest()
				.then(data => {
					//добвляем свойства photo, count и priceSale в массив объектов пришедшего с сервака
					modifyProductProperty(data);
					productArr = data;
					updateStorage('productCards', productArr);
				})
				.then(() => {
					// отрисовка всех карточек товара
					productArr.forEach(item => {
						generateCard(item);
					});

					// заполнение массивов с категориями товаров и массива для сортировки
					createArrForSort();
					fillCategoryArr();
				})
	} else {
		// очиска hidden статуса
		clearHiddenStaus();
		// отрисовка всех карточек товара
		productArr.forEach(item => {
			generateCard(item);
		});
		// заполнение массивов с категориями товаров и массива для сортировки
		createArrForSort();
		fillCategoryArr();
	}

	// отрисовка всех карточек товара в корзине
	checkEmptyBasket();
	basketArr.forEach(item => {
		generateBasketCard(item);
	});
	showCount()
	// изменение стилей кнопок, если какой-то товар уже есть в корзине
	changeDisableBtnStyle();
	
	// открытие/закрытие корзины
	basketPopupBtn.addEventListener("click", () => {
		basket.classList.remove("left-hide");
		checkEmptyBasket();
		calcFinalSum();

		// закрытие корзины при нажатиина ESC
		window.addEventListener('keydown', function(event){
			if(event.key === 'Escape') basket.classList.add("left-hide");
		});
	 });

	 basketPopupClose.addEventListener("click", () => {
		basket.classList.add("left-hide");
	 });

	//скрыть попап (крестик)
	closeCardPopup.addEventListener('click', hideCardPopup);

//--------------------------------

// Toggle menu
selectSingleTitle.addEventListener('click', function() {
	toggleStatusSort.call(this);
});

categorySelectTitle.addEventListener('click', function() {
	toggleStatusSort.call(this);
});

// Close when click to option
selectSingleLabels.forEach(item => {
	item.addEventListener('click', (e) => {
		closeMenu(e);
	})
});

// Reset title
resetSelect.addEventListener('click', function() {
	resetTitle.call(this);
});

resetCategorySelect.addEventListener('click', function() {
	resetTitle.call(this);
});

// назанчение обработчиков на сортировку
resetSelect.addEventListener('click', sortProductByDefault);
selectCheap.addEventListener('click', sortProductMinToMax);
selectHigh.addEventListener('click', sortProductMaxToMin);
selectSale.addEventListener('click', sortProductBySale);

pageUp.addEventListener('mousedown', () => {
	window.scrollTo({
		top: 0,
		left: 0,
	});
});

}
export { productArr, basketArr, productArrForSort, productCategoryArr, app }
