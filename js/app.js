
// Create a list that holds all card symbols

const cardImages = ["far fa-angry", "far fa-angry", "fas fa-grin-squint-tears", "fas fa-grin-squint-tears", "far fa-kiss-wink-heart", "far fa-kiss-wink-heart", "far fa-grin-tongue-wink", "far fa-grin-tongue-wink", "far fa-grin-stars", "far fa-grin-stars", "fas fa-meh-rolling-eyes", "fas fa-meh-rolling-eyes", "fas fa-sad-cry", "fas fa-sad-cry", "far fa-smile", "far fa-smile"];

// create array of star symbols
const starSymbols = ["fas fa-star", "far fa-star", "fas fa-star-half-alt"];

// reference to the card deck
const myDeck = document.querySelector(".deck");

// reference to the star panel
const starPanel = document.querySelector(".stars");

// reference to reset icon
const restart = document.getElementById("restart");

// add click counter
let clickCount=0;

//reference to move counter
const moveCounter = document.getElementById("moves");

// container for comparing open cards
const openCardCont = [];

// counter of matches
let matchCount = 0;

// welcome & start the game screen
function startMessage() {
  alert(`Welcome to the memory game! Are you ready to start?`);
};

startMessage();

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

// event handler for click on card
function cardClickListener(e){
  e.preventDefault();
  clickCount++;
  moveCounter.innerHTML = Number(moveCounter.innerHTML) + 1;
  removeClickListener(e.target);
  showSymbol(e.target);
  addOpen(e.target);
  storeImage(e.target);
  // compare cards (if they are 2 different ones!!!)
  delay();
  console.log(clickCount);
};

// function removing event listener from card
function removeClickListener(card) {
  card.removeEventListener("click", cardClickListener);
};

// function to create and display the cards on the deck
function buildDeck() {
  for (var i=0; i<cardImages.length; i++) {
   const card = document.createElement("DIV");
   card.classList.add("card", "clickable");
   const cardImage = cardImages[i];
   card.insertAdjacentHTML('afterbegin', `<i class='${cardImage}'></i>`);
   myDeck.appendChild(card);
   card.addEventListener("click", cardClickListener); // adds listener to each card
  };
};

// create the deck
buildDeck();

// start timer
//increment();

// function to create and display the stars panel
function buildStars() {
  for (var i=0; i<3; i++) {
    const star = document.createElement("LI");
    star.classList.add("star"+i);
    star.insertAdjacentHTML('afterbegin', `<i class='${starSymbols[2]}'></i>`);
    starPanel.appendChild(star);
  };
}

// create the stars panel
buildStars();


// sets up timer
function startTimer(){
  let time = 0;
  const myTime = setInterval(function() {
    time++;
    var min = Math.floor(time/60);
    var sec = time % 60;

    if (min<10){
      min = `0${min}`;
    };
    if (sec<10){
      sec = `0${sec}`;
    };
  // displays time in timer
    document.getElementById("timer").innerHTML = `${min}min ${sec}sec`;
  }, 1000);
};

startTimer();



// set reference to all cards
const myCards = document.querySelectorAll('div.card');

// function adding "open" class to clicked card
function addOpen(card) {
  card.classList.add("open");
};

// function displaying the card's symbol
function showSymbol(card) {
  card.classList.add("show");
};

//function adding class of clicked card to openCardCont
function storeImage(card) {
  if (card.children.length > 0){
    const currentImage = card.firstElementChild.className;
    openCardCont.push(currentImage);
  } else {
    console.log("nothing to store");
  }
};

// function locking matching cards in the open position
function lockCards() {
  const openCards = document.querySelectorAll('div.open');
  openCards.forEach( function(currentValue, currentIndex, listObj) {
    currentValue.classList.add("match");
    currentValue.classList.remove("open");
    //removeClickListener(currentValue);
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
};

// function removing unmatched cards from the list and hiding card's symbols
function hideCards() {
  const openCards = document.querySelectorAll('div.open');
  openCards.forEach( function(currentValue, currentIndex, listObj) {
    currentValue.classList.remove("open");
    currentValue.classList.remove("show");
    currentValue.addEventListener("click", cardClickListener);
    openCardCont.pop();
    openCardCont.pop();
  });
};

//function setting a delay to allow seeing second card before running checkMatch
function delay() {
  const checkDelay = setTimeout(checkMatch, 1000);
};

// if the list already has another card, check to see if the two cards match
function checkMatch() {
  const cardQuant = openCardCont.length;
  if (cardQuant>0 && cardQuant%2==0) {
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
};

// if all cards have matched, display a message with the final score
function endMessage() {
  const moves = clickCount;
  alert(`End of the game! It took you ${moves} moves to complete it`);
};

// function to remove old deck
function removeDeck(){
  while (myDeck.firstChild) {
      myDeck.removeChild(myDeck.firstChild);
  };
};

// function to remove old star panel
function removeStars(){
  while (starPanel.firstChild) {
      starPanel.removeChild(starPanel.firstChild);
  };
};

// set up event listener for reseting the game
restart.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Are you sure you want to start again?")) {
    shuffleCards(cardImages);
    removeDeck(); //remove old deck
    removeStars(); //remove old star panel
    buildDeck();
    buildStars();
    clickCount = 0;
    matchCount = 0;
    moveCounter.innerHTML = Number("0");
  } else {
  console.log("staying in the game")};
});
