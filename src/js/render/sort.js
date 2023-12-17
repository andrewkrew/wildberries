const selectSingle = document.querySelector('.sort');
const selectSingleTitle = selectSingle.querySelector('.sort__title');
const selectSingleLabels = selectSingle.querySelectorAll('.sort__label');
const resetSelect = document.querySelector('.reset');

const selectCheap = document.getElementById('selectCheap');
const selectHigh = document.getElementById('selectHigh');
const selectSale = document.getElementById('selectSale');

// Category
const categorySelect = document.querySelector('.category');
const categorySelectTitle = categorySelect.querySelector('.category__title');
const resetCategorySelect = document.querySelector('.category__reset');

export {selectSingle, selectSingleTitle, selectSingleLabels, resetSelect, selectCheap, selectHigh, selectSale,
	categorySelect, categorySelectTitle, resetCategorySelect}