/*
 * Create a list that holds all of your cards
 */

const cardImages = ["fa fa-cloud", "fa fa-cloud", "fa fa-heart", "fa fa-heart", "fa fa-eye", "fa fa-eye", "fa fa-bolt", "fa fa-bolt", "fa fa-futbol-o", "fa fa-futbol-o", "fa fa-bicycle", "fa fa-bicycle", "fa fa-paw", "fa fa-paw", "fa fa-puzzle-piece", "fa fa-puzzle-piece"];

//create and display counter of moves
let moveCount = 0;
const moveCounter = document.getElementById("moves");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffleCards(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }
     return array;
 }

// shuffle the deck
shuffleCards(cardImages);

// create and display the cards on the deck
const myDeck = document.querySelector(".deck");

 for (var i=0; i<cardImages.length; i++) {
   const card = document.createElement("DIV");
   card.classList.add("card");
   const cardImage = cardImages[i];
   card.insertAdjacentHTML('afterbegin', `<i class='${cardImage}'></i>`);
   myDeck.appendChild(card);
   };

// create and display the stars panel

const starPanel = document.querySelector(".stars");

for (var i=0; i<3; i++) {
  const star = document.createElement("LI");
  star.insertAdjacentHTML('afterbegin', `<i class="fa fa-star"></i>`);
  starPanel.appendChild(star);
  };


// add click counter
let clickCount=0;

// set reference to all cards
const myCards = document.querySelectorAll('div.card');

// function adding "open" class to clicked card
function addOpen(card) {
  card.classList.add("open");
}

// function displaying the card's symbol
function showSymbol(card) {
  card.classList.add("show");
}

// container for comparing open cards
const openCardCont = [];

// counter of matches
let matchCount = 0;

//function adding class of clicked card to openCardCont
function storeImage(card) {
  const currentImage = card.firstElementChild.className;
  openCardCont.push(currentImage);
}

// function locking matching cards in the open position
function lockCards() {
  const openCards = document.querySelectorAll('div.open');
  openCards.forEach( function(currentValue, currentIndex, listObj) {
    currentValue.classList.add("match");
    currentValue.classList.remove("open");
    openCardCont.pop();
    openCardCont.pop();
  });
  matchCount++;
  //check if the game is complete and if to display end message
  if (matchCount === 8) {
    endMessage();
  } else {
    console.log(`number of pairs matched: ${matchCount}`);
  }
}

// function removing unmatched cards from the list and hiding card's symbols
function hideCards() {
  const openCards = document.querySelectorAll('div.open');
  openCards.forEach( function(currentValue, currentIndex, listObj) {
    currentValue.classList.remove("open");
    currentValue.classList.remove("show");
    openCardCont.pop();
    openCardCont.pop();
  });
}

// function setting a delay to allow seeing second card before running checkMatch
function delay() {
  const checkDelay = setTimeout(checkMatch, 3000);
}


// if the list already has another card, check to see if the two cards match
function checkMatch() {
  const cardQuant = openCardCont.length;
  if (cardQuant>0 && cardQuant%2==0) {
    moveCount++;
    moveCounter.innerHTML = Number(moveCounter.innerHTML) + 1;
    //compare the cards
    if (openCardCont[0] == openCardCont[1]){
      lockCards();
    } else {
      hideCards();
    }
  }
  else {
    return cardQuant;
  };
}


// if all cards have matched, display a message with the final score
function endMessage() {
  const moves = moveCount;
  alert(`End of the game! It took you ${moves} moves to complete it`);
  }



// set up the event listener for a card.
myCards.forEach( function(currentValue, currentIndex, listObj) {
currentValue.addEventListener("click", function (e) {
    e.preventDefault();
    clickCount++;
    showSymbol(currentValue);
    addOpen(currentValue);
    storeImage(currentValue);
    // compare cards (if they are 2 different ones!!!)
    delay();
    console.log(clickCount);
  });
});





//TO-DOs:

//do not allow to click twice on the same card to lock it

// remove the card from the myCards array once locked, to stop counting clicks on it

// figure out the timing problem - if you click too fast on a new card after uncovering a match, it messes up the game --> another click event listener?? It should be somewhere in the lockCards function?


// create timer




/* increment the move counter and display it on the page (put this functionality in another function that you call from this one)

*/
