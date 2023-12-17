import { showFilterProducts,title } from "../func/category.js";
import { closeMenu } from "../func/sortProducts.js";

const categoryContent = document.querySelector('.category__content');

// создание выпадающего меню с категориями
function renderCategorySelect(categoryName) {
	let categoryInput = document.createElement('input');
	categoryInput.id = `category__${categoryName}`;
	categoryInput.classList.add('category__input');
	categoryInput.setAttribute('type', 'radio');
	categoryInput.setAttribute('name', 'singleSelect');

	let categoryLabel = document.createElement('label');
	categoryLabel.classList.add('category__label');
	categoryLabel.setAttribute('for', categoryInput.id);
	categoryLabel.textContent = categoryName;

	categoryContent.append(categoryInput, categoryLabel);

	
	categoryLabel.addEventListener('click', function(e) {
		showFilterProducts(categoryName);
		closeMenu(e);

		title.scrollIntoView({ behavior: 'smooth' });
	})
}

export {renderCategorySelect}