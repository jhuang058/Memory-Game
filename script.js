const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1;
let card2;
let noClicking = false;
let cardsFlipped = 0;
let clicks = 0;
const scoreKeeper = document.querySelector('#score');
const bestScore = JSON.parse(localStorage.getItem("score"));

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;

  clicks++;
  scoreKeeper.innerText = clicks;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = (currentCard === card1) ? card2 : currentCard;
  }

  if (card1 && card2) { //no more clicking
    noClicking = true;

    let color1 = card1.className;
    let color2 = card2.className;

    if(color1 == color2) { //remove eventlistener, reset card1 and card2, enable clicking
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout( () => {
      card1.removeAttribute('style');
      card2.removeAttribute('style');
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1 = null;
      card2 = null;
      noClicking = false;
      }, 1000)
      
    }
  }

  const button = document.querySelector('#startbtn');

  if (cardsFlipped == 10) {
    if (!bestScore) {
      alert(`Game Over! \nIt took ${clicks} clicks!`)
    } else if (clicks >= bestScore) {
      alert(`Game Over! \nTook you ${clicks} clicks. \n Best Score is ${bestScore} clicks!`)
    } else if (clicks < bestScore) {
      alert(`Congratulations on new best score! \n${clicks} clicks`)
    }

    button.innerText = 'Restart';
    if (clicks < bestScore || !bestScore) {
      localStorage.setItem('score', JSON.stringify(clicks));
    }
    
  }
}
  

// when the DOM loads
createDivsForColors(shuffledColors);

if(bestScore) {
  const bestScoreBoard = document.querySelector('#bestScoreBoard');
  bestScoreBoard.innerText = "Best Score: " + bestScore;
}


