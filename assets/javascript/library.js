const games = document.querySelectorAll(".grid-item");

for (var game of games) {
	game.addEventListener('click', () => {
		console.log("testing");
	});
	if (game.classList.contains('playable')) {
		game.addEventListener('click', () => {
			if (window.confirm('Launch game?')) {
				window.location = '/resources/new';
			}
			else{
				window.alert('Cancelling Launch');
			}
		});
	}
}

// let newGrid = (size) => {
//     for (i = 0; i < size * size; i++) {
//         let gridItem = document.createElement("div");
//         gridItem.addEventListener('mouseenter', () => {
//             if (gridItem.style.background == '') {
//                 gridItem.style.background = 'black';
// 							}
//         });
//         gridContainer_div.appendChild(gridItem).className = 'grid-item';
//     }
//     gridContainer_div.style.gridTemplateColumns = `repeat(${size}, 240px)`;
//     gridContainer_div.style.gridTemplateRows = `repeat(${size}, 240px)`;
// }
//
// newGrid(4);
