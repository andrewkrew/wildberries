import { showCardPopup } from "../func/cardPopup.js";
import { addToBasket } from "../func/basket.js";

let arrCards = document.querySelectorAll('.products__card');
let openScaleImgBtn = document.querySelectorAll('.photo__scale');
let productsWrapper = document.querySelector('.products__wrapper');

// генерация карточек на сайте
function generateCard({id, name, price, salePrice, sale, photo, inBasket, hidden}) {
	let product = document.createElement('div');
	product.classList.add('product__card');
	product.id = `item__${id}`;

	// у нас вешается обработчик по клику на всю карточку товара, чтобы открывалось окно с товаром большое.
	// поэтому елси произошел клик на кнопку "В корзину" мы не должны открывать окно с товаром
	product.addEventListener('click', function(e){
		if (e.target == toBasketBtn) return;
		showCardPopup(e.currentTarget);
	});

	let cardPhotoWrapper = document.createElement('div');
	cardPhotoWrapper.classList.add('card__photo');

	let cardPhoto = document.createElement('img');
	cardPhoto.src = photo;
	cardPhoto.alt = name;

	let cardName = document.createElement('h3');
	cardName.classList.add('card__name');
	cardName.innerHTML = name;

	let cardPriceWrapper = document.createElement('div');
	cardPriceWrapper.classList.add('card__price', 'price__wrapper');

	let priceCurrent = document.createElement('p');
	priceCurrent.classList.add('price__current');
	priceCurrent.innerHTML = `${salePrice} p.`;

	let saleProcent = document.createElement('p');
	saleProcent.classList.add('price__sale-procent');
	saleProcent.innerHTML = `-${sale}%`;

	let priceOld = document.createElement('p');
	priceOld.classList.add('price__before-sale');
	priceOld.innerHTML = `${price} p.`;

	caheckProductSale(sale, priceOld, saleProcent);

	let toBasketBtn = document.createElement('button');
	toBasketBtn.classList.add('card__to-basket', 'button');
	toBasketBtn.innerHTML = 'В корзину';
	if (inBasket) {
		toBasketBtn.classList.add('disabled');
	}

	hidden ? product.classList.add('hidden') : product.classList.remove('hidden');

	toBasketBtn.addEventListener('click', addToBasket);

	//render

	productsWrapper.append(product);
	product.append(cardPhotoWrapper, cardName, cardPriceWrapper, toBasketBtn);
	cardPhotoWrapper.append(cardPhoto);
	cardPriceWrapper.append(priceCurrent, saleProcent, priceOld);
}

// скрытие со страницы элементов, если скидка 0% 
function caheckProductSale(sale, priceHtml, saleHtml) {
	
	priceHtml.hidden = false;
	saleHtml.hidden = false;
	
	if (!sale) {
		priceHtml.hidden = true;
		saleHtml.hidden = true;
	}
}

export {arrCards, openScaleImgBtn, generateCard, caheckProductSale, productsWrapper};