
function getCardRequest() {
	const URL_API = 'https://64e23291ab0037358818d078.mockapi.io/';
	return new Promise ((request, reject) => {
		fetch(URL_API + 'cards')
			.then(response => {
				if (response.status == 200) request(response.json());
				else reject(new Error('Error API'))
			})
	})
}

//добвляем свойства photo и count в массив объектов пришедшего с сервака
function modifyProductProperty(products) {
	
	// создаем массив с адресами картинок
	let photoDataBase = [];
	for(let i = 0; i <= 30; i++) {
		photoDataBase[i] = `/cards/${i + 1}.jpg`;
	}

	products.forEach(item => {
		item.count = 1;
		item.price = +item.price;
		item.salePrice = item.price * (100 - item.sale) / 100;
		item.inBasket = false;
		item.hidden = false;
		// если картинок в папке не хватает, то по будет отображаться картинка "без фото"
		if (item.id >= photoDataBase.length) {
			item.photo = `/cards/no-photo.jpg`;
		} else {
			item.photo = photoDataBase[item.id - 1];
		}
	});
}

export { getCardRequest, modifyProductProperty };