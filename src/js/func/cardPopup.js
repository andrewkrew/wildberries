import { cardPopup, scalePhoto } from "../render/popup.js";
import { productArr } from "../app.js";
import { getIdCard } from "./getIdElem.js";
import { cardToBasketBtn, cardName, cardDesc, cardPrice, cardSale, cardOldPrice} from "../render/popup.js";
import { addToBasket } from "./basket.js";
import { caheckProductSale } from "../render/cards.js";

//скрыть попап
function hideCardPopup() {
	cardPopup.classList.add('left-hide');
}

//открыть попап карточкой товара
function showCardPopup(card) {

	let cardClickId = card.id;
	let id = getIdCard(cardClickId);

	productArr.forEach(item => {
		if(item.id == id) {
			//создаем аттрибут в попапе с ID активного товара для того, чтобы мы могли найти при нажитии на кнопку 'В корзину' в попапе ID товара 
			cardPopup.dataset.cardId = id;

			//Заполяем поля
			scalePhoto.src = item.photo;
			cardName.innerHTML = item.name;
			cardDesc.innerHTML = item.desc;
			cardPrice.innerHTML = `${item.salePrice} p.`;
			caheckProductSale(item.sale, cardOldPrice, cardSale);
			cardSale.innerHTML = `-${item.sale}%`;
			cardOldPrice.innerHTML = `${item.price} p.`;
			if (item.inBasket) cardToBasketBtn.classList.add('disabled');
			else cardToBasketBtn.classList.remove('disabled');
		}
		cardToBasketBtn.removeEventListener('click', addToBasket);

	});

	cardPopup.classList.remove('left-hide');

	// ВОТ ТАК МНОГО РАЗ ВЫЗЫВАЕТСЯ
	// cardToBasketBtn.addEventListener('click', function() {
	// 	this.classList.add('disabled');
	// 	addToBasket.call(this);
	// });
	// ВОТ ТАК ОДИН РАЗ ВЫЗЫВАЕТСЯ
	cardToBasketBtn.addEventListener('click', addToBasket);

	// при нажатии на ESC закрывает карточку товара
	window.addEventListener('keydown', function(event){
		if(event.key === 'Escape') hideCardPopup();
	});
}

export {hideCardPopup, showCardPopup};