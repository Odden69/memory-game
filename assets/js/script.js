// Declare global variables
let boardSize = '[4, 5]'; // Game board size. Player option. Default value 4x5. 
let numberOfCards = 0; // Number of cards on the board
let numberOfMoves = 0; // Number of pairs picked by the player
let activePage = ''; // Is set to indicate which game page is currently active
const darkColor = '#193C32';
const lightColor = '#F0F2DC';
let screenWidth = 0; // Window width used by the game area
let screenHeight = 0; // Window height used by the game area
const section = document.getElementsByTagName('section')[0];

// Max screen width used for the game area is 600px
function getScreenSize() {
  if (window.innerWidth > 600) {
    screenWidth = 600;
  } else {
    screenWidth = window.innerWidth;
  }
  screenHeight = window.innerHeight;
}

/* Wait for the DOM to finish loading before adding
   the section element for the first page to the html */
document.addEventListener("DOMContentLoaded", function () {
  loadStartPage();
});

// Let a resize of the screen trigger a reload of the active game page
window.addEventListener("resize", reloadActivePage);

function reloadActivePage() {
  switch (activePage) {
    case 'play-game-page':
      reloadPlayGamePage();
      break;
    case 'start-page':
      loadStartPage();
      break;
    case 'how-to-play-page':
      loadHowToPlayPage();
      break;
    case 'choose-board-size-page':
      loadChooseBoardSizePage();
      break;
    default:
      break;
  }
}

function setSectionClassName() {
  section.className = activePage;
}

//  - Start Page -

function defineStartPageSectionElement() {
  section.innerHTML = `
    <div class="spacer"></div>
    <div class="start-page-button-cont">
      <button class="btn-how-to-play small-btn">How to play</button>
      <button class="btn-choose-board-size small-btn">Choose board size</button>
      <button class="btn-play-game large-btn">PLAY GAME</button>
    </div>
    <img class="start-page-image" src="assets/images/start-page-image.png" alt="Picture of the game board">
  `;
}

// Solves responsiveness of start page image
function setStartPageImageSize() {
  getScreenSize();
  let screenRatio = screenHeight / screenWidth;

  if (screenRatio > 1.6) {
    section.children[2].style.height = 'auto';
    section.children[2].style.width = '90%';
  } else {
    section.children[2].style.height = '40%';
    section.children[2].style.width = 'auto';
  }
}

function loadStartPage() {
  activePage = 'start-page';
  defineStartPageSectionElement();
  setSectionClassName();
  section.style.height = '100%';
  setStartPageImageSize();

  // Add event listener to buttons on the start page
  let howToPlayButton = section.children[1].children[0];
  let chooseBoardSizeButton = section.children[1].children[1];
  let playGameButton = section.children[1].children[2];

  howToPlayButton.addEventListener('click', loadHowToPlayPage);
  chooseBoardSizeButton.addEventListener('click', loadChooseBoardSizePage);
  playGameButton.addEventListener('click', loadPlayGamePage);
}

//  - How To Play Page -

function defineHowToPlayPageSectionElement() {
  section.innerHTML = `
    <button class="btn-back-to-start small-btn">Back to start</button>
    <div class="how-to-play"><h2>How to play</h2>
      Pick two cards from the board.<br>
      The cards will be turned over and you can see the image on the front of the cards.<br>
      If the images are identical the cards will be removed
      and you just pick another pair of cards.<br>
      If the two cards are not identical, the cards will flip back.<br>
      Try to remember where to find the different images.<br>
      Just go on and pick pairs of cards until all the cards have been
      removed from the screen.<br><br>
      The number of moves will be counted. Try to clear the board in less
      moves the next time. <br><br>
      You can choose the size of the board with the "Choose board size" buttons.<br>
      Smaller board makes the game easier. Bigger board makes it harder.
    </div>
  `;
}

// Solves responsiveness of how to play page
function setHowToPlayPageSectionHeight() {
  getScreenSize();
  let howToPlayHeight = section.children[1].offsetHeight;
  let howToPlayTop = section.children[1].offsetTop;
  let headerOneHeight = document.getElementsByTagName('h1')[0].offsetHeight;

  if (screenHeight < howToPlayHeight + howToPlayTop + headerOneHeight + 30) {
    section.style.height = (howToPlayHeight + howToPlayTop + 30) + 'px';
  } else {
    section.style.height = '100%';
  }
}

function loadHowToPlayPage() {
  activePage = 'how-to-play-page';
  defineHowToPlayPageSectionElement();
  setSectionClassName();
  setHowToPlayPageSectionHeight();

  // Add event listener to button on the how to play page
  let startPageButton = section.children[0];

  startPageButton.addEventListener('click', loadStartPage);
}

//  - Choose Board Size Page -

function defineChooseBoardSizePageSectionElement() {
  section.innerHTML = `
    <h2 id="choose-board-size-header">Choose board size</h2>
    <button data-size='[3, 4]' class="small-btn" aria-labelledby='choose-board-size-header'>3 x 4</button>
    <button data-size='[4, 5]' class="small-btn" aria-labelledby='choose-board-size-header'>4 x 5</button>
    <button data-size='[5, 6]' class="small-btn" aria-labelledby='choose-board-size-header'>5 x 6</button>
    <button data-size='[6, 8]' class="small-btn" aria-labelledby='choose-board-size-header'>6 x 8</button>
    <button class="btn-play-game large-btn">PLAY GAME</button>
    <button class="btn-back-to-start small-btn">Back to start</button>
  `;
}

// Solves responsiveness of choose board size page
function setChooseBoardSizePageSectionHeight() {
  getScreenSize();

  section.style.height = (screenHeight < 525) ? 525 + 'px' : '100%';
}

function styleActiveButton() {
  let buttons = section.getElementsByTagName('button');
  for (let button of buttons) {
    if (button.getAttribute('data-size') === boardSize) {
      button.style.backgroundColor = darkColor;
      button.style.color = lightColor;
    } else {
      button.style.backgroundColor = lightColor;
      button.style.color = darkColor;
    }
  }
}

function setBoardSize(button) {
  boardSize = button.getAttribute('data-size');
}

function loadChooseBoardSizePage() {
  activePage = 'choose-board-size-page';
  defineChooseBoardSizePageSectionElement();
  setSectionClassName();
  setChooseBoardSizePageSectionHeight();
  styleActiveButton();

  let buttons = section.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function () {
      let buttonName = this.className.split(' ')[0];
      switch (buttonName) {
        case 'btn-play-game':
          loadPlayGamePage();
          break;
        case 'btn-back-to-start':
          quitGame();
          break;
        default:
          setBoardSize(this);
          break;
      }
      styleActiveButton();
    });
  }
}

//  - Play Game Page -

/* Calculate the size and format of the game board depending on the
   screen size and the user's choice of board size. */
let gameBoardWidth = 0; // Resulting board width in px
let gameBoardHeight = 0; // Resulting board height in px
let columns = 0; // Resulting number of columns
let rows = 0; // Resulting number of rows
let cardWidth = 0; // Width of an individual card

function calcAvailScreenHeight() {
  let headerOneHeight = document.getElementsByTagName('h1')[0].offsetHeight;
  let headerTwoHeight = document.getElementsByTagName('h3')[0].offsetHeight;
  let headerThreeHeight = document.getElementsByTagName('h3')[1].offsetHeight;
  let buttonHeight = document.getElementsByTagName('button')[0].offsetHeight;
  let availableScreenHeight = screenHeight - (headerOneHeight + headerTwoHeight + headerThreeHeight + buttonHeight);
  return availableScreenHeight;
}

// Is the board size limited by screen height or screen width?
function calcCompareCardWidth(boardSizeIndexX, boardSizeIndexY) {
  let availableScreenHeight = calcAvailScreenHeight();
  let compareCardWidth = screenWidth * 0.9 / boardSize[boardSizeIndexX];
  let compareCardHeight = availableScreenHeight * 0.9 / boardSize[boardSizeIndexY];
  compareCardWidth = Math.min(compareCardWidth, compareCardHeight);
  return compareCardWidth;
}

// Does a portrait or landscape orientation give the largest screen?
function portraitOrLandscape() {
  let tempCardWidth = 0;
  let compareWidthUnturned = calcCompareCardWidth(1, 4);
  let compareWidthTurned = calcCompareCardWidth(4, 1);
  if (compareWidthUnturned > compareWidthTurned) {
    columns = boardSize[1];
    rows = boardSize[4];
    tempCardWidth = compareWidthUnturned;
  } else {
    columns = boardSize[4];
    rows = boardSize[1];
    tempCardWidth = compareWidthTurned;
  }
  gameBoardWidth = tempCardWidth * columns;
  gameBoardHeight = tempCardWidth * rows;
}

function calcBoardSize() {
  getScreenSize();
  portraitOrLandscape();

  // The card width calculated from the board width minus an approximation of the gaps between the cards
  cardWidth = (gameBoardWidth - (columns - 1) * 4.6) / columns;
}

function definePlayGamePageSectionElement() {
  section.innerHTML = `
    <h3>Pick two cards to find two identical</h3>
    <div class="game-board">
    </div>
    <h3 id="number-of-moves">Number of moves: ${numberOfMoves}</h3>
    <button class="btn-quit-game large-btn">QUIT GAME</button>
  `;
}

function setGameBoardElementSize() {
  calcBoardSize();
  let boardDiv = section.getElementsByTagName('div')[0];

  boardDiv.style.width = gameBoardWidth + 'px';
  boardDiv.style.height = gameBoardHeight + 'px';
}

function declareAllImagesArray() {
  return [
    'building blocks',
    'abacus',
    'dinosaur',
    'blue car',
    'rubber duck',
    'bike',
    'toy airplane',
    'teddy bear',
    'cube',
    'yellow car',
    'toy boat',
    'helicopter',
    'circus tent',
    'black board',
    'ball',
    'paint bucket',
    'pterosaur',
    'tricycle',
    'maracas',
    'lego',
    'globe',
    'toy train',
    'slide',
    'bathing ball',
  ];
}

function createRandomizedArray() {
  let allImages = declareAllImagesArray();

  // Create an array from 1 to number of all available images
  let availableImages = [];

  for (let i = 1; i <= allImages.length; i++) {
    availableImages.push(i);
  }

  /* Create a new array with a random set of available image numbers and with  
     a size depending on the users choice of game board size */
  let images = [];
  numberOfCards = columns * rows;

  for (let i = 0; i < numberOfCards / 2; i++) {
    let randomIndex = Math.floor(Math.random() * availableImages.length);
    let randomImage = availableImages[randomIndex];
    availableImages.splice(randomIndex, 1);
    images.push(randomImage);
  }

  //Double the image array to get a pair of each image
  images = images.concat(images);

  /* Randomize the array of image numbers using Durstenfeld shuffle algorithm 
     to get a shuffled deck of cards
     Found on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
  for (let i = (numberOfCards - 1); i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }
  return images;
}

function addCardHtmlElements() {
  let images = createRandomizedArray();
  let allImages = declareAllImagesArray();
  let cardsHtml = '';

  for (let i = 0; i < numberOfCards; i++) {
    let image = images[i];
    let cardId = 'card' + i;
    let cardHtml = `
      <div id="${cardId}" class="card-cont" style="width: ${cardWidth}px; height: ${cardWidth}px;">
        <div class="inner-card-cont">
          <div class="front-card"></div>
          <div class="back-card"><img src="assets/images/img-${image}.png" alt="${allImages[(image-1)]}"></div>
        </div>
      </div>`;
    cardsHtml += cardHtml;
  }

  section.children[1].innerHTML = cardsHtml;
}

function loadPlayGamePage() {
  activePage = 'play-game-page';
  definePlayGamePageSectionElement();
  setSectionClassName();
  section.style.height = '100%';
  setGameBoardElementSize();
  addCardHtmlElements();

  // Add event listener to quit game button 
  let quitGameButton = section.getElementsByTagName('button')[0];

  quitGameButton.addEventListener('click', quitGame);

  // Now the game is ready for the user to select the first card 
  selectFirstCard();
}

let idFirstCard = '';
let idSecondCard = '';
let cardsMatched = [];
let imageSecondCard = '';
let imageFirstCard = '';

function selectFirstCard() {
  // Add event listeners to the cards. Skip the ones that has already been taken
  if (cardsMatched.length === numberOfCards) {
    gameFinished();
  } else {
    for (let i = 0; i < numberOfCards; i++) {
      let card = document.getElementById('card' + i);
      if (cardsMatched.includes(card.id)) {
        continue;
      } else {
        card.addEventListener('click', firstSelected);
      }
    }
  }
}

/* Find the id and the img of the first picked card, turn it and remove the 
   event listener from that card
   The code for flipping an image was found on 
   https://www.w3schools.com/howto/howto_css_flip_image.asp */
function firstSelected() {
  let src = this.getElementsByTagName('img')[0].src;
  imageFirstCard = src;
  idFirstCard = this.id;
  this.getElementsByClassName('inner-card-cont')[0].style.transform = 'rotateY(180deg)';
  this.removeEventListener('click', firstSelected);
  selectSecondCard();
}

/* Delete the firstSelected event listeners from all cards and add a new
   event listener to all cards except the ones that has already been matched
   and the just previously chosen card */
function selectSecondCard() {
  for (let i = 0; i < numberOfCards; i++) {
    let card = document.getElementById('card' + i);
    card.removeEventListener('click', firstSelected);
  }
  for (let j = 0; j < numberOfCards; j++) {
    let card = document.getElementById('card' + j);
    if (cardsMatched.includes(card.id) || card.id === idFirstCard) {
      continue;
    } else {
      card.addEventListener('click', secondSelected);
    }
  }
}

// Find the id and the img of the second picked card and turn it
function secondSelected() {
  let src = this.getElementsByTagName('img')[0].src;
  imageSecondCard = src;
  idSecondCard = this.id;
  this.getElementsByClassName('inner-card-cont')[0].style.transform = 'rotateY(180deg)';
  compareCards();
}

function hideCards() {
  if (document.getElementById(idFirstCard) !== null) {
    document.getElementById(idFirstCard).style.visibility = "hidden";
    document.getElementById(idSecondCard).style.visibility = "hidden";
    selectFirstCard();
  }
}

function turnCards() {
  if (document.getElementById(idFirstCard) !== null) {
    let firstCard = document.getElementById(idFirstCard);
    let secondCard = document.getElementById(idSecondCard);
    firstCard.getElementsByClassName('inner-card-cont')[0].style.transform = 'none';
    secondCard.getElementsByClassName('inner-card-cont')[0].style.transform = 'none';
    selectFirstCard();
  }
}

/* Compare the image of the two selected cards. If they are identical hide them,
   if they are not, turn them back. */
function compareCards() {
  for (let i = 0; i < numberOfCards; i++) {
    let card = document.getElementById('card' + i);
    card.removeEventListener('click', secondSelected);
  }

  // The setTimeout method was found on https://www.w3schools.com/jsref/met_win_settimeout.asp
  if (imageFirstCard === imageSecondCard) {
    setTimeout(hideCards, 950);
    cardsMatched.push(idFirstCard, idSecondCard);
  } else {
    setTimeout(turnCards, 2000);
  }

  numberOfMoves++;
  document.getElementById('number-of-moves').innerHTML = `Number of moves: ${numberOfMoves}`;
}

// Recalculate the board size and card width to adopt to a resized screen
function reloadPlayGamePage() {
  calcBoardSize();

  // Set the width and height of the game board div element
  let boardDiv = document.getElementsByClassName('game-board')[0];

  boardDiv.style.width = gameBoardWidth + 'px';
  boardDiv.style.height = gameBoardHeight + 'px';

  // Give each card its new card width
  for (let i = 0; i < numberOfCards; i++) {
    let cardId = 'card' + i;
    let card = document.getElementById(cardId);
    card.style.width = cardWidth + 'px';
    card.style.height = cardWidth + 'px';
  }
}

function defineGameFinishedHtmlElements() {
  let html = `
    <div class="game-finished-background"></div>
    <div class="game-finished">
      <h2>Good job!</h2>
      <h3>You finished the game in ${numberOfMoves} moves!</h3>
      <button class="btn-gf-play-again small-btn">Play again</button>
      <button class="btn-gf-choose-board-size small-btn">Choose board size</button>
      <button class="btn-gf-back-to-start small-btn">Back to start</button>
    </div>
  `;
  return html;
}

function gameFinished() {
  let html = defineGameFinishedHtmlElements();
  section.innerHTML += html;

  // Add event listeners to the buttons on the game finished note
  let playAgainButton = section.getElementsByTagName('button')[1];
  let chooseBoardSizeButton = section.getElementsByTagName('button')[2];
  let backToStartButton = section.getElementsByTagName('button')[3];

  chooseBoardSizeButton.addEventListener('click', changeSize);
  playAgainButton.addEventListener('click', playAgain);
  backToStartButton.addEventListener('click', quitGame);
}

function resetGame() {
  numberOfMoves = 0;
  cardsMatched = [];
  document.getElementsByTagName('section')[0].innerHTML = '';
}

function quitGame() {
  resetGame();
  loadStartPage();
}

function playAgain() {
  resetGame();
  loadPlayGamePage();
}

function changeSize() {
  resetGame();
  loadChooseBoardSizePage();
}