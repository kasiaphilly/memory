/*
 * Create a list that holds all of your cards
 */

const cardImages = ["fa fa-cloud", "fa fa-cloud", "fa fa-heart", "fa fa-heart", "fa fa-eye", "fa fa-eye", "fa fa-bolt", "fa fa-bolt", "fa fa-futbol-o", "fa fa-futbol-o", "fa fa-bicycle", "fa fa-bicycle", "fa fa-paw", "fa fa-paw", "fa fa-puzzle-piece", "fa fa-puzzle-piece"];

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

//function adding class of clicked card to openCardCont
function storeImage(card) {
  const currentImage = card.firstElementChild.className;
  openCardCont.push(currentImage);
}

// set up the event listener for a card.
myCards.forEach( function(currentValue, currentIndex, listObj) {
currentValue.addEventListener("click", function (e) {
    e.preventDefault();
    clickCount++;
    showSymbol(currentValue);
    addOpen(currentValue);
    storeImage(currentValue);
    console.log("listening to this click!");
    console.log(clickCount);
  });
});







 // if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

function lockCards() {
  const openCards = document.querySelectorAll('div.open');
  openCards.forEach( function(currentValue, currentIndex, listObj) {
    currentValue.classList.add("match");
    currentValue.classList.remove("open");
  }
}


/*



*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)

*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
