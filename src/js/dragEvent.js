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
			const transform = event.target.style.transform;
			if (transform.includes('rotate')) {
				console.log('Contains rotate');
				let transforms = transform.split(' ');

				// translate(2.39999px, 0px) rotate(180deg)

				console.log(transforms);
				if (transforms.length === 1) {
					event.target.style.transform = `translate(${position.x}px, ${position.y}px) ${transforms[0]}`;
				} else {
					transforms[0] = `translate(${position.x}px,`;
					transforms[1] = `${position.y}px)`;
					event.target.style.transform = `${transforms[0]} ${transforms[1]} ${transforms[2]}`;
				}
			} else {
				console.log('do not contains rotate');
				event.target.style.transform = `translate(${position.x}px,${position.y}px)`;
			}
		},
	},
	modifiers: [
		interact.modifiers.restrictRect({
			restriction: '.box',
		}),
	],
});

// interact('.dropzone').dropzone({
// 	checker: function (
// 		dragEvent, // related dragmove or dragend
// 		event, // Touch, Pointer or Mouse Event
// 		dropped, // bool default checker result
// 		dropzone, // dropzone Interactable
// 		dropzoneElement, // dropzone element
// 		draggable, // draggable Interactable
// 		draggableElement // draggable element
// 	) {
// 		console.log(draggable);
// 		return dropped;
// 	},
// });
