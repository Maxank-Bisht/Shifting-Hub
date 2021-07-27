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
		insertBackground: function (item) {
			const name = item.name;
		},
		createItem: function (item) {
			const div = document.createElement('div');
			div.id = `${item.id}`;
			div.className = 'border bg-light border-2 border-dark justify-content-center align-items-center draggable';
			div.setAttribute(
				'style',
				`display:flex;box-sizing:border-box;cursor: grab;height:${item.length}px;width:${item.breadth}px`
			);
			div.setAttribute('draggable', 'true');
			div.innerHTML = item.name;
			document.querySelector('#playground').insertAdjacentElement('afterbegin', div);
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
			document.querySelector('#delete').style.display = 'none';
			changeState('edit');
		},
		updateState: function () {
			document.querySelector('#add-item').style.display = 'none';
			document.querySelector('#edit').style.display = 'none';
			document.querySelector('#deleteAll').style.display = 'none';
			document.querySelector('#back').style.display = 'inline-block';
			document.querySelector('#editMessage').style.display = 'none';
			document.querySelector('#update').style.display = 'inline-block';
			document.querySelector('#delete').style.display = 'inline-block';
		},
		deleteItem: function (newItem) {
			document.getElementById(newItem.id).remove();
		},
		clearAllItems: function () {
			document.querySelector('#playground').innerHTML = '';
		},
	};
})();
const AppCtrl = (function (UICtrl, ItemCtrl) {
	const loadEventListerners = function () {
		document.querySelector('#add-item').addEventListener('click', addItemSubmit);

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
	};
	const addItemSubmit = function (e) {
		const item = UICtrl.getItemInput();
		const { name, length, breadth } = item;
		if (name && length && breadth) {
			const newItem = ItemCtrl.addItem(name, length, breadth);
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
		if (UICtrl.getState() === 'edit' && e.target.parentNode.id === 'playground') {
			const item = ItemCtrl.getItemById(e.target.id);
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
	return {
		init: function () {
			UICtrl.clearEditState();
			loadEventListerners();
		},
	};
})(UICtrl, ItemCtrl);

AppCtrl.init();
