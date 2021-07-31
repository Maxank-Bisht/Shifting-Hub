const ItemCtrl = (function () {
	const Item = function (id, name, length, breadth) {
		this.id = id;
		this.name = name;
		this.length = length;
		this.breadth = breadth;
	};
	const data = {
		items: [],
		currentItem: null,
	};
	return {
		getItems: function () {
			return data.items;
		},
		addItem: function (name, length, breadth) {
			//Create ID
			let ID = 'item-';
			if (data.items.length > 0) {
				ID += data.items[data.items.length - 1].id + 1;
			} else {
				ID += 0;
			}
			//create new item
			newItem = new Item(ID, name, length, breadth);
			//push to items array
			data.items.push(newItem);
			return newItem;
		},
		getItemById: function (id) {
			let found = null;
			data.items.forEach(function (item) {
				if (item.id === id) {
					found = item;
				}
			});
			return found;
		},
		updateItem: function (name, length, breadth) {
			let found = null;
			data.items.forEach(function (item) {
				if (item.id === data.currentItem.id) {
					item.name = name;
					item.length = length;
					item.breadth = breadth;
					found = item;
				}
			});
			return found;
		},
		deletItem: function (id) {
			const IDs = data.items.map(function (item) {
				return item.id;
			});

			const index = IDs.indexOf(id);

			data.items.splice(index, 1);
		},
		clearAllItems: function () {
			data.items = [];
		},
		setCurrentItem: function (item) {
			data.currentItem = item;
		},
		getCurrentItem: function () {
			return data.currentItem;
		},
		logData: function () {
			return data.items;
		},
	};
})();
const UICtrl = (function () {
	let state = 'normal';
	const getState = function () {
		return state;
	};
	const changeState = function (newState) {
		state = newState;
	};

	return {
		getState: getState,
		// getIconId: async (item) => {
		// 	const name = item.name;
		// 	const res = await fetch(
		// 		`https://search.icons8.com/api/iconsets/v5/search?term=${name}&amount=1&token=mWEovT3GtWeY0h90m8Gu49w4pBxgxUFvnRjFwNBL`
		// 	);
		// 	const data = await res.json();

		// 	return data.icons[0].id;
		// },
		// searchIcon: async (iconId) => {
		// 	const res = await fetch(
		// 		`https://api-icons.icons8.com/publicApi/icons/icon?id=${iconId}&token=mWEovT3GtWeY0h90m8Gu49w4pBxgxUFvnRjFwNBL`
		// 	);
		// 	const data = await res.json();
		// 	return data.icon.svg;
		// },
		createItem: function (item) {
			if (item.length * item.breadth >= 90000) {
				UICtrl.showAlert(item.name);
			} else {
				const div = document.createElement('div');
				div.id = `${item.id}`;
				div.className = 'd-flex justify-content-center align-items-center draggable';
				div.style.boxSizing = 'border-box';
				div.style.cursor = 'grab';
				div.style.position = 'fixed';
				div.style.height = `${item.length}px`;
				div.style.width = `${item.breadth}px`;
				div.style.zIndex = '1';
				// div.setAttribute('style', `display:flex;box-sizing:border-box;cursor: grab;`);
				// div.setAttribute('draggable', 'true');
				let img;
				const name = item.name.toLowerCase();
				const isSquare = item.length == item.breadth ? true : false;
				const isHorizontal = item.length > item.breadth ? true : false;
				if (name.includes('bed')) {
					if (isSquare) {
						img = `<img src='../src/imgs/bed (2).png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
					} else if (isHorizontal) {
						img = `<img src='../src/imgs/bed (3).png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					} else {
						img = `<img src='../src/imgs/bed (3).png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					}
				} else if (name.includes('chair')) {
					img = `<img src='../src/imgs/armchair.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('bath')) {
					img = `<img src='../src/imgs/bath.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('book')) {
					img = `<img src='../src/imgs/bookshelf.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('cabinet')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/cabinet.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/cabinet.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('car')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/car.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/car.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('cupboard') || name.includes('almirah')) {
					img = `<img src='../src/imgs/cupboard.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('desk')) {
					img = `<img src='../src/imgs/desk.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('table')) {
					if (isSquare) {
						img = `<img src='../src/imgs/dining-table.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
					} else if (isHorizontal) {
						img = `<img src='../src/imgs/dining-table (1).png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/dining-table (1).png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('door')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/door.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/door.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('fridge')) {
					img = `<img src='../src/imgs/fridge.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('hob')) {
					img = `<img src='../src/imgs/hob.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('jacuzzi')) {
					img = `<img src='../src/imgs/jacuzzi.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('plant')) {
					if (isSquare) {
						img = `<img src='../src/imgs/plant.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
					} else if (isHorizontal) {
						img = `<img src='../src/imgs/plant (1).png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/plant (1).png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('sink')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/sink.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/sink.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('slipper') || name.includes('shoe')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/slippers.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/slippers.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('sofa') || name.includes('couch')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/sofa (1).png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/sofa (1).png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('toilet')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/toilet.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					} else {
						img = `<img src='../src/imgs/toilet.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					}
				} else if (name.includes('treadmill')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/treadmill.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					} else {
						img = `<img src='../src/imgs/treadmill.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					}
				} else if (name.includes('tv') || name.includes('television')) {
					if (isHorizontal) {
						img = `<img src='../src/imgs/tv.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px' ></img>`;
					} else {
						img = `<img src='../src/imgs/tv.png' class='dragIcon' height ='${item.breadth}px' width='${item.length}px' class='rotate90' ></img>`;
					}
				} else if (name.includes('washbasin')) {
					img = `<img src='../src/imgs/washbasin.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else if (name.includes('workplace')) {
					img = `<img src='../src/imgs/workplace.png' class='dragIcon' height ='${item.length}px' width='${item.breadth}px'></img>`;
				} else {
					img = name;
					div.classList.add('border');
					div.classList.add('border-3');
					div.classList.add('border-dark');
				}
				div.innerHTML = img;
				document.querySelector('#playground').insertAdjacentElement('afterbegin', div);
			}
		},
		getItemInput: function () {
			return {
				name: document.querySelector('#name').value,
				length: document.querySelector('#length').value,
				breadth: document.querySelector('#breadth').value,
			};
		},
		clearInputFields: function () {
			document.querySelector('#name').value = '';
			document.querySelector('#length').value = '';
			document.querySelector('#breadth').value = '';
		},
		clearEditState: function () {
			document.querySelector('#add-item').style.display = 'inline-block';
			document.querySelector('#edit').style.display = 'inline-block';
			document.querySelector('#deleteAll').style.display = 'inline-block';
			document.querySelector('#back').style.display = 'none';
			document.querySelector('#editMessage').style.display = 'none';
			document.querySelector('#update').style.display = 'none';
			document.querySelector('#delete').style.display = 'none';
			document.querySelector('#rotate').style.display = 'none';
			changeState('normal');
			UICtrl.clearInputFields();
		},
		editIconClick: function () {
			document.querySelector('#add-item').style.display = 'none';
			document.querySelector('#edit').style.display = 'none';
			document.querySelector('#deleteAll').style.display = 'none';
			document.querySelector('#back').style.display = 'inline-block';
			document.querySelector('#editMessage').style.display = 'inline-block';
			document.querySelector('#update').style.display = 'none';
			document.querySelector('#rotate').style.display = 'none';
			document.querySelector('#delete').style.display = 'none';
			changeState('edit');
		},
		updateState: function () {
			document.querySelector('#add-item').style.display = 'none';
			document.querySelector('#edit').style.display = 'none';
			document.querySelector('#deleteAll').style.display = 'none';
			document.querySelector('#back').style.display = 'inline-block';
			document.querySelector('#editMessage').style.display = 'none';
			document.querySelector('#rotate').style.display = 'inline-block';
			document.querySelector('#update').style.display = 'inline-block';
			document.querySelector('#delete').style.display = 'inline-block';
		},
		deleteItem: function (newItem) {
			document.getElementById(newItem.id).remove();
		},
		clearAllItems: function () {
			document.querySelectorAll('.draggable').forEach(function (a) {
				a.remove();
			});
		},
		rotateItem: function (item) {
			const id = item.id;
			const element = document.getElementById(id);
			let transform = element.style.transform;
			let newTransform;
			if (transform.includes('rotate(90deg)')) {
				newTransform = transform.replace('rotate(90deg)', 'rotate(180deg)');
			} else if (transform.includes('rotate(180deg)')) {
				newTransform = transform.replace('rotate(180deg)', 'rotate(270deg)');
			} else if (transform.includes('rotate(270deg)')) {
				newTransform = transform.replace('rotate(270deg)', 'rotate(0deg)');
			} else if (transform.includes('rotate(0deg)')) {
				newTransform = transform.replace('rotate(0deg)', 'rotate(90deg)');
			} else {
				newTransform = transform + ' rotate(90deg)';
			}
			element.style.transform = newTransform;
		},
		showAlert: function (name) {
			document.querySelector('.alert').style.display = 'block';
			document.querySelector('.alert').innerHTML = `Cannot insert ${name} in any room.`;
			setTimeout(() => {
				UICtrl.hideAlert();
			}, 2000);
		},
		hideAlert: function () {
			document.querySelector('.alert').style.display = 'none';
		},
	};
})();
const AppCtrl = (function (UICtrl, ItemCtrl) {
	const loadEventListerners = function () {
		document.querySelector('#add-item').addEventListener('click', addItemSubmit);
		//increse z-index
		document.querySelector('#playground').addEventListener('click', (e) => {
			if (e.target.classList.contains('draggable')) {
				e.target.style.zIndex = parseInt(e.target.style.zIndex) + 2;
			} else if (e.target.classList.contains('dragIcon')) {
				e.target.parentNode.style.zIndex = parseInt(e.target.parentNode.style.zIndex) + 2;
			}
		});

		//Edit icon event listenser
		document.querySelector('#edit').addEventListener('click', editBtnClick);
		//back button event listener
		document.querySelector('#back').addEventListener('click', UICtrl.clearEditState);
		//update event listener
		document.querySelector('#update').addEventListener('click', itemUpdateSubmit);
		//delete item listerner
		document.querySelector('#delete').addEventListener('click', itemDeleteSubmit);
		//Item to edit click listener
		document.querySelector('#playground').addEventListener('click', itemToEdit);
		//delete all item
		document.querySelector('#deleteAll').addEventListener('click', deleteAllItems);
		//rotate btn
		document.querySelector('#rotate').addEventListener('click', rotateItemClick);
	};
	const addItemSubmit = function (e) {
		const item = UICtrl.getItemInput();
		const { name, length, breadth } = item;
		if (name && length && breadth) {
			const newItem = ItemCtrl.addItem(name, length, breadth);
			// const iconId = await UICtrl.getIconId(newItem);
			// const iconSVG = await UICtrl.searchIcon(iconId);
			UICtrl.createItem(newItem);
			UICtrl.clearInputFields();
		} else {
			console.log('Please Enter All Information');
		}
		e.preventDefault();
	};
	const editBtnClick = function () {
		UICtrl.editIconClick();
	};
	const itemToEdit = function (e) {
		if (
			UICtrl.getState() === 'edit' &&
			(e.target.parentNode.parentNode.id === 'playground' || e.target.parentNode.id === 'playground')
		) {
			let id;
			if (e.target.parentNode.parentNode.id === 'playground') {
				id = e.target.parentNode.id;
			} else {
				id = e.target.id;
			}
			const item = ItemCtrl.getItemById(id);
			ItemCtrl.setCurrentItem(item);
			document.querySelector('#name').value = item.name;
			document.querySelector('#length').value = item.length;
			document.querySelector('#breadth').value = item.breadth;
			UICtrl.updateState();
		}
	};
	const itemUpdateSubmit = function (e) {
		//get item input
		const input = UICtrl.getItemInput();
		//update item
		const updatedItem = ItemCtrl.updateItem(input.name, input.length, input.breadth);
		//update UI
		UICtrl.deleteItem(updatedItem);
		UICtrl.createItem(updatedItem);

		UICtrl.clearEditState();
		e.preventDefault();
	};
	const itemDeleteSubmit = function () {
		const currentItem = ItemCtrl.getCurrentItem();
		ItemCtrl.deletItem(currentItem.id);
		UICtrl.deleteItem(currentItem);
		UICtrl.clearInputFields();
		UICtrl.clearEditState();
	};
	const deleteAllItems = function () {
		ItemCtrl.clearAllItems();
		UICtrl.clearAllItems();
	};
	const rotateItemClick = function () {
		const currentItem = ItemCtrl.getCurrentItem();
		UICtrl.rotateItem(currentItem);
	};
	return {
		init: function () {
			UICtrl.clearEditState();
			UICtrl.hideAlert();
			loadEventListerners();
		},
	};
})(UICtrl, ItemCtrl);

AppCtrl.init();
