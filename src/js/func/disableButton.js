import { productArr } from "../app.js";


function changeDisableBtnStyle() {

	productArr.forEach(item => {

		//находим кнопку по ID товара
		let productBtn = document.getElementById(`item__${item.id}`).querySelector('.card__to-basket');
		
		// меняем стили кнопки
		if (item.inBasket) {
			productBtn.classList.add('disabled');
		} else {
			productBtn.classList.remove('disabled');
		}
	});
}

export {changeDisableBtnStyle}