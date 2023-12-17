function getStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

function updateStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

function clearStorage(key) {
	localStorage.removeItem(key);
}

export {getStorage, updateStorage, clearStorage};