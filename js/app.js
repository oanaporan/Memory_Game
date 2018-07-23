//List that holds all of cards:
const cards = document.querySelectorAll('.card');
//Array of all cards icons
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle","fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube"];
//Deck of cards
const deck = document.querySelector('.deck');
//List of open cards for checking if cards match
const openCards = [];
//Moves counter
const movesCounter = document.querySelector('#moves');
//restart button
const restart = document.querySelector('.restart');
//List of matching cards
const matchingCards = [];

//Start Game for the first time
function startGame () {
    shuffle(icons);
    displayCards();
}  

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(icons) {
    var currentIndex = icons.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = icons[currentIndex];
        icons[currentIndex] = icons[randomIndex];
        icons[randomIndex] = temporaryValue;
    }

    return icons;
}
//Display cards on deck
function displayCards() {
    for (let i=0; i<icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class='${icons[i]}'</i>`;
        deck.appendChild(card);
        card.addEventListener('click', flipCard);
}
    }  
//Flip card
        function flipCard() { 
            this.classList.add('open','show');//show card 
            openCards.push(this);//add opened card to the openCards array
            checkMatch();
        }
        //Check if cards match 
        function checkMatch() {
            let firstCard = openCards[0];
            let secondCard = openCards[1];
            //If there are two cards open and they match then add class match
            if (openCards.length = 1) {
                if (firstCard.innerHTML === secondCard.innerHTML){
                    firstCard.classList.add('match');
                    secondCard.classList.add('match');
                    //remove the cards matched from the open cards array
                    openCards.splice(0, 2);
                    //add the matching cards to the matching cards array
                    matchingCards.push(firstCard, secondCard);
            //If the two cards do not match, wait 600ms and flip them back
                } else {
                    setTimeout(function(){
                        firstCard.classList.remove('show', 'open');
                        secondCard.classList.remove('show', 'open');
                        //remove the cards that do not match from the open cards array
                        openCards.splice(0, 2);
                    }, 600);
                    //Increase moves counter for every pair of cards checked
                    addMoves();
                }
            //If there is only one card open, then add it to the open cards array
            } else {
                openCards.push(this);    
            }
            gameOver();
        }
//Moves counter
let moves = 0;
function addMoves() {
        moves ++ ;
        movesCounter.innerHTML= moves;
        }
//Game Over
function gameOver() {
     if (matchingCards.length === icons.length) {
         window.alert('Congradulations!');
             }
        }
//Restart game




//Start Game on load
startGame(); 
  


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
