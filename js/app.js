//List that holds all of cards:
const cards = document.querySelectorAll('.card');
//Array of all cards icons
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle","fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube"];
//Deck of cards
const deck = document.querySelector('.deck');
//List of open cards for checking if cards match
let openCards = [];
//Moves counter
const movesCounter = document.querySelector('#moves');
//restart button
const restart = document.querySelector('.restart');
//List of matching cards
let matchingCards = [];
//Score Panel
const score = document.querySelector('.stars');
//Timer
const timer = document.querySelector('.timer');
// first click
let firstClick = true;
//message/alert  when the game is over
const message = document.querySelector('.message');


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
            starScoring();
            if (firstClick) {
                startTimer();
                firstClick = false;
            }
        }
        //Check if cards match 
        function checkMatch() {
            let firstCard = openCards[0];
            let secondCard = openCards[1];
            //If there are two cards open and they match then add class match
            if (openCards.length > 0) {
                if (firstCard.innerHTML === secondCard.innerHTML){
                    firstCard.classList.add('match');
                    secondCard.classList.add('match');
                    //remove the cards matched from the open cards array
                    openCards.splice(0, 2);
                    //add the matching cards to the matching cards array
                    matchingCards.push(firstCard, secondCard);
                     //Increase moves counter for every pair of cards flipped
              addMoves();
            //If the two cards do not match, wait 600ms and flip them back
                } else {
                    firstCard.classList.add('nomatch');
                    secondCard.classList.add('nomatch');
                    setTimeout(function(){
                        firstCard.classList.remove('nomatch', 'open', 'show');
                        secondCard.classList.remove('nomatch', 'open', 'show');
                        //remove the cards that do not match from the open cards array
                        openCards.splice(0, 2);
                    }, 500);
                   //Increase moves counter for every pair of cards flipped
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
    setTimeout(function () {
        if (matchingCards.length === icons.length) {
            message.setAttribute('style', 'display: inline');
          stopTimer();
        }
           }, 400);
    }

  
//Restart game
restart.addEventListener('click', restartGame);
function restartGame() {
    //clean deck of cards
    deck.innerHTML = '';
    //shuffle cards
    shuffle(icons);
    //display new cards on deck
    displayCards();
    //reset the moves counter
    movesCounter.innerHTML = 0;
    moves = 0;
    //clear the matching cards array
    matchingCards = [];
    //reset the star scoring
    score.innerHTML = star + star + star;    
    //start timer
    stopTimer();
    minutes = 0;
    seconds = 0;
    firstClick = true;
    if (firstClick) {
        startTimer();
        firstClick = false;
    }
    timer.innerHTML = 'Time: min  '+ minutes+'  '+ 'sec.  '+ seconds+'  ';
    message.setAttribute('style', 'display: none');
}

//Stars Scoring
const star = '<li><i class="fa fa-star"></i></li>';
function starScoring() {
    switch(moves) {
        //if player makes more than 16 moves then reduce star rating to 2 out of 3
        case 16: score.innerHTML = star + star; 
        break;
        //if player makes more than 22 moves then reduce star rating to 1 out of 3
        case 22: score.innerHTML = star;
        break;
    }
}

//Timer
let gameTimer,
seconds = 0;
minutes = 0;
timer.innerHTML = 'Time: min  '+ minutes+'  '+ 'sec.  '+ seconds+'  ';//default variable for the timer
//Start Timer
function startTimer() {
    gameTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        seconds++;
        if (seconds > 59) {
            minutes++;
            seconds = 00;
        }
        // Update the timer with the new time
    timer.innerHTML = 'Timer: min.  '+ minutes+'  '+ 'sec.  '+ seconds;
    }, 1000);  
}

//Stop Timer
function stopTimer() {
    clearInterval(timer);
}

//Start Game on load
startGame();