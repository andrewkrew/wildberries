import { productArr } from "../app.js";
import{searchBtn,panelSearch,searchBtnClear, searchBtnDel,notFoundMessage} from "../render/search.js"
import { getIdCard } from "./getIdElem.js";
import { updateStorage } from "./storage.js";
import { title } from "./category.js";

//Поиск

let isSearching = false;

function searchCard() {
    const searchText = panelSearch.value.trim().toLowerCase();
    const productItems = document.querySelectorAll('.product__card');

    let foundItemCount = 0;
    let firstFoundItem = null;

    productItems.forEach(item => {
        const taskText = item.querySelector('.card__name').textContent.toLowerCase();
        let elemId = getIdCard(item.id);
		  if (searchText === "" || taskText.includes(searchText)) {
                item.classList.remove('hidden');
				productArr.forEach(product => {
					if (product.id == elemId) product.hidden = false;
				});
                if (!firstFoundItem) {
                    firstFoundItem = item;
                }
                foundItemCount++;
            } else {
                item.classList.add('hidden');
                    productArr.forEach(product => {
                        if (product.id == elemId) product.hidden = true;
                    });
                 }
         });

    updateClearButton();
    if (foundItemCount === 0) {
        notFoundMessage.classList.remove('hidden');
        title.scrollIntoView({ behavior: 'smooth' });
        isSearching = true;
    } else {
        notFoundMessage.classList.add('hidden');
        isSearching = false;
        if (firstFoundItem) {
            title.scrollIntoView({ behavior: 'smooth' });
        }}
    }

function updateClearButton() {
    const clearSearchBtn = document.querySelector('.search_button-cansel');
    if (isSearching || panelSearch.value.trim().length > 0) {
        clearSearchBtn.classList.remove('hidden');
    } else {
        clearSearchBtn.classList.add('hidden');
    }
}

    panelSearch.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
        searchCard()
        }});

    searchBtn.addEventListener("click", function () {
        if (panelSearch.value.trim().length > 0) {
            searchCard();
        }
    });

// крестик
    function searchClear(){
        panelSearch.value = "";
    }

searchBtnClear.addEventListener("click", searchClear)

// Отмена
function searchDel(){
    const hiddenCards = document.querySelectorAll('.product__card.hidden');
        hiddenCards.forEach(card => card.classList.remove('hidden'));
 
		clearHiddenStaus();
        notFoundMessage.classList.add('hidden');
        searchClear();
        isSearching = false; // При отмене сбрасываем состояние поиска
        updateClearButton();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
}

function clearHiddenStaus() {
	productArr.forEach(product => {
		product.hidden = false;
	});
	updateStorage('productCards', productArr);
}

searchBtnDel.addEventListener("click",searchDel)

export{searchCard,searchClear,searchDel, clearHiddenStaus}
