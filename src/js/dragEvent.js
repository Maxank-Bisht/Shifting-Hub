const position = { x: 0, y: 0 };
let drop = false;

interact('.draggable').draggable({
	listeners: {
		start(event) {
			// console.log(event.type, event.target);
		},
		move(event) {
			position.x += event.dx;
			position.y += event.dy;
			event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
		},
	},
	// modifiers: [
	// 	interact.modifiers.restrictRect({
	// 		restriction: '.box',
	// 	}),
	// ],
});

interact('.box').dropzone({
	ondrop: function (event) {
		drop = true;
	},
});

interact('.box').on('dropactivate', function (event) {
	if (event.target.classList.contains('box')) {
		console.log('yes');
	} else {
		console.log('no');
	}
});
