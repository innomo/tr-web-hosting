const gameBoard = document.querySelector('.game-board');
        const restartButton = document.querySelector('.restart-button');
        const winMessage = document.querySelector('.win-message');
        const cards = [];
        let flippedCards = [];
        let matches = 0;
        // Shuffle the cards
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // Create cards
        function createCards() {
            const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
            shuffle(letters)
            gameBoard.innerHTML = '';
            cards.length = 0;
            flippedCards.length = 0;
            matches = 0;
            winMessage.textContent = '';
            for (let i = 0; i < 16; i++) {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="front"></div>
                    <div class="back">${letters[i]}</div>
                `;
                gameBoard.appendChild(card);
                cards.push(card);
        
                card.addEventListener('click', () => {
                    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                        card.classList.add('flipped');
                        flippedCards.push(card);
                        checkMatch();
                    }
                });
            }
        }
        
        createCards();
        
        // Check for match
        function checkMatch() {
            if (flippedCards.length === 2) {
                const card1 = flippedCards[0];
                const card2 = flippedCards[1];
                if (card1.querySelector('.back').textContent === card2.querySelector('.back').textContent) {
                    matches++;
                    flippedCards = [];
                    checkWin();
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                    }, 1000);
                }
            }
        }
        
        // Check for win
        function checkWin() {
            if (matches === 8) {
                winMessage.textContent = 'Congratulations! You won!';
            }
        }
        
        // Restart game
        restartButton.addEventListener('click', createCards);