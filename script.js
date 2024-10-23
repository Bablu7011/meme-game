document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Array of card pairs (can add more pairs as needed)
    const cardArray = [
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card1', img: 'images/distracted.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card2', img: 'images/drake.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card3', img: 'images/fine.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card4', img: 'images/rollsafe.png' },
        { name: 'card5', img: 'images/success.png' },
        { name: 'card5', img: 'images/success.png' }
    ];

    // Shuffle the cards randomly
    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    // Create the game board
    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = ''; // Clear the board
        cardsWon = []; // Reset the won cards

        // Loop through the cards to create the board
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png'); // Set the initial image
            card.setAttribute('data-id', i); // Store the card's ID
            card.addEventListener('click', flipCard); // Add event listener for flipping
            grid.appendChild(card); // Add card to the board
        }
    }

    // Flip the card when clicked
    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) { // Avoid flipping the same card twice
            cardsChosen.push(cardArray[cardId].name); // Store the card name
            cardsChosenId.push(cardId); // Store the card ID
            this.setAttribute('src', cardArray[cardId].img); // Flip the card to show the image
            if (cardsChosen.length === 2) { // Check for match after two cards are chosen
                setTimeout(checkForMatch, 500); // Wait a bit before checking
            }
        }
    }

    // Check if two selected cards match
    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            // If a match is found
            cards[firstCardId].style.visibility = 'hidden'; // Hide the matched cards
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard); // Disable further clicks
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen); // Add to the list of won cards
        } else {
            // If no match, flip the cards back
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        // Reset the chosen arrays for the next selection
        cardsChosen = [];
        cardsChosenId = [];

        // Check if all pairs have been found
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    // Start the game when the "Start Game" button is clicked
    startButton.addEventListener('click', createBoard);
});
