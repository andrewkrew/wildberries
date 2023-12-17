// попап с увеличенной карточкой товара
let cardPopup = document.querySelector('.card-info');
let closeCardPopup = cardPopup.querySelector('.card-info__close');
let scalePhoto = cardPopup.querySelector('.card-info__photo');

let cardToBasketBtn = cardPopup.querySelector('.card-info__to-basket');
let cardName = cardPopup.querySelector('.card-info__name');
let cardDesc = cardPopup.querySelector('.card-info__desc');
let cardPrice = cardPopup.querySelector('.price__current');
let cardSale = cardPopup.querySelector('.price__sale-procent');
let cardOldPrice = cardPopup.querySelector('.price__before-sale');

let pageUp = document.querySelector('.pageup');

export {cardPopup , closeCardPopup , scalePhoto, cardToBasketBtn, cardName, 
	cardDesc, cardPrice, cardSale, cardOldPrice, pageUp};