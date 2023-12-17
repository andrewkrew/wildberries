import { selectSingle, selectSingleTitle, categorySelect, categorySelectTitle} from "../render/sort.js";
import { productArr, productArrForSort } from "../app.js";
import { productsWrapper, generateCard } from "../render/cards.js";
import { clearHiddenStaus } from "./searchPanel.js";

// работа с выпадающим меню ---------------------
function toggleStatusSort() {
	// если пришел клик из окна с сортировкой
	if (this.parentNode === selectSingle) {
		// меняем атрибут data-state на data-state = active (ракрываем меню) и наборот его закрываем при клике
		// тут открываем меню с сортировкой
		if ('active' === selectSingle.getAttribute('data-state')) {
		selectSingle.setAttribute('data-state', '');
		// тут закрываем меню с сортировкой
		} else {
			selectSingle.setAttribute('data-state', 'active');
		}
		// если пришел клик из окна с категориями
	} else if (this.parentNode === categorySelect) {
		// тут открываем меню категорий
		if ('active' === categorySelect.getAttribute('data-state')) {
			categorySelect.setAttribute('data-state', '');
		// тут закрываем меню категорий
		} else {
			categorySelect.setAttribute('data-state', 'active');
		}
	}
}

function closeMenu(e) {
	let parentClick = e.target.closest('[data-state]');
	
	// если пришел клик из окна с сортировкой
	// меняем значение по умолчанию на то значение, на которое кликнули
	if (parentClick === selectSingle) {
		selectSingleTitle.textContent = e.target.textContent;
		selectSingle.setAttribute('data-state', '');
	
	// если пришел клик из окна с категориями
	// меняем значение по умолчанию на то значение, на которое кликнули
	} else if (parentClick === categorySelect) {
		categorySelectTitle.textContent = e.target.textContent;
		categorySelect.setAttribute('data-state', '');
	}
}

function resetTitle() {
	// 
	let nextSibling = this.previousElementSibling;
	
	// если пришел клик из окна с сортировкой
	// если нажали сбоку на крестик меняем на значение по умолчанию и скрываем меню
	if (nextSibling === selectSingle) {
		selectSingleTitle.textContent = selectSingleTitle.getAttribute('data-default');
		selectSingle.setAttribute('data-state', '');

	// если пришел клик из окна с категориями
	// если нажали сбоку на крестик меняем на значение по умолчанию и скрываем меню
	} else if (nextSibling === categorySelect) {
		categorySelectTitle.textContent = categorySelectTitle.getAttribute('data-default');
		categorySelect.setAttribute('data-state', '');
		// очищаем все классы .hidden  и паказываем все товары из массива
		clearHiddenStaus();
		document.querySelectorAll('.product__card').forEach(item => {
			item.classList.remove('hidden');
		})

	}
}
//-------------------------------------------------

// создание копии массива чисто для сортировки, чтобы не трогать исходный массив
function createArrForSort(){
	productArr.forEach(item => {
		productArrForSort.push(createObjForSort(item));
	});
}

// функция конструктор для объектов в массиве для сортировки productArrForSort
function createObjForSort({id, sale, salePrice}) {
	return {
		id: id,
		sale: sale,
		salePrice: salePrice,
	}
}

// сортировка от min к max цене
function sortProductMinToMax() {
	// очищаем окно с товарами
	productsWrapper.innerHTML = '';
	// сотрируем массив для сортировки (чтобы не трогать исходный массив)
	productArrForSort.sort((a, b) => a.salePrice - b.salePrice);
	// затем ищем по ID товары в исходном массиве и отрисовываем их на странице в той последовательности, 
	// которую мы получили в массиве productArrForSort
	productArrForSort.forEach(sortedItem => {
		productArr.forEach(mainItem => {
			if (sortedItem.id == mainItem.id) generateCard(mainItem);
		})
	});
}

// аналогичная логика только от max к min
function sortProductMaxToMin() {
	productsWrapper.innerHTML = '';
	productArrForSort.sort((a, b) => b.salePrice - a.salePrice);
	productArrForSort.forEach(sortedItem => {
		productArr.forEach(mainItem => {
			if (sortedItem.id == mainItem.id) generateCard(mainItem);
		})
	});
}

// аналогичная логика только сортируем наиболее выгодной скидке
function sortProductBySale() {
	productsWrapper.innerHTML = '';
	productArrForSort.sort((a, b) => b.sale - a.sale);
	productArrForSort.forEach(sortedItem => {
		productArr.forEach(mainItem => {
			if (sortedItem.id == mainItem.id) generateCard(mainItem);
		})
	});
}

// вернуть товары в той последовательности, в которой они были изначально
function sortProductByDefault() {
	productsWrapper.innerHTML = '';
	productArr.sort((a, b) => a.id - b.id);

	productArr.forEach(item => {
		generateCard(item);
	});
}

export {toggleStatusSort, closeMenu, resetTitle, sortProductMinToMax,
	sortProductMaxToMin, sortProductBySale, sortProductByDefault, createArrForSort}