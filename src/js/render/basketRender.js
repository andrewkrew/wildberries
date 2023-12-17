import { delAllProducts } from "../func/basket.js";


const basketPopupBtn = document.querySelector("#cart");

const basket = document.querySelector(".basket");
const basketPopupClose = document.querySelector("#basket_close");

const popupContainer = document.querySelector("#basket_container");
const popupProductList = document.querySelector("#basket_product_list");
const popupCost = document.querySelector("#basket_cost");
const popupDiscount = document.querySelector("#basket_discount");
const popupCostDiscount = document.querySelector("#basket_cost_discount");

const deleteAllProductsBtn = document.querySelector('.basket__all-clear');
const basketEmpty = document.querySelector('.basket__empty');
const basketCost = document.querySelector('.basket__cost');
const basketConfirm = document.querySelector('.basket__confirm');

const checkout = document.querySelector(".basket__confirm");
const confirmBuy = document.querySelector(".confirm-buy__container");
const confirmBack = document.querySelector(".confirm-buy__clear")

const confirmDeltePopup = document.querySelector('.confirm-delete__container');
const confirmDeleteClear = document.querySelector('.confirm-delete__clear');
const confirmDeleteBack = document.querySelector('.confirm-delete__back');

let popupMessage = document.getElementById('popupMessage');
let popup = document.getElementById('popup');

deleteAllProductsBtn.addEventListener('click', () => {
	confirmDeltePopup.classList.remove('hidden');
});

checkout.addEventListener("click",()=>{
	confirmBuy.classList.remove('hidden');
});


confirmDeleteClear.addEventListener('click', () => {
	delAllProducts();
	confirmDeltePopup.classList.add('hidden');
})

confirmDeleteBack.addEventListener('click', () => {
	confirmDeltePopup.classList.add('hidden');
})

export{basketPopupBtn, 
	basket, basketPopupClose, 
	popupContainer,popupProductList,popupCost,
	popupDiscount,popupCostDiscount, deleteAllProductsBtn, 
	basketEmpty, basketCost, basketConfirm, checkout,confirmBack,popupMessage,popup}