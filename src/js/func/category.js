import { productArr, productCategoryArr } from "../app.js";
import { renderCategorySelect } from "../render/renderCategorySelect.js";

let title = document.querySelector(".section__header")
// заполение глобального массива категорий товаров productCategoryArr
// перебираем категории в каждом товаре, и если категория ещё не встречалась, то пушим в массив, а если уже была, то скипаем
function fillCategoryArr() {
	productArr.forEach(item => {
		if (!productCategoryArr.includes(item.category)) {
			productCategoryArr.push(item.category);
			// отрисовка списка категорий в выпадающем меню
			renderCategorySelect(item.category);
		}		
	})
}

// показ товаров из выбранной категории по клику
function showFilterProducts(category) {
	
	// перебираем все товары из массива и ищем совпадения по категорям, если совпадает, то показываем, иначе скрываем
	productArr.forEach(item => {
		if (item.category === category) {
			item.hidden = false;
			document.getElementById(`item__${item.id}`).classList.remove('hidden');
			title.scrollIntoView({ behavior: 'smooth' });
		} else {
			item.hidden = true;
			document.getElementById(`item__${item.id}`).classList.add('hidden');
		}
	})
}

export {fillCategoryArr, showFilterProducts,title}