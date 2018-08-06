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


// create and display the cards on the deck

const myDeck = document.querySelector(".deck");

 for (var i=0; i<cardImages.length; i++) {
   const card = document.createElement("DIV");
   card.classList.add("card");
   myDeck.appendChild(card);
   };


// add click counter
    let clickCount=0;

    
// set up the event listener for a card.








*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/
