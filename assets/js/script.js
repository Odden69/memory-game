// Declare game variables
let boardSize = '[4, 5]'; // Default size of board. Later chosen by player
let numberOfCards = 0; // Number of cards on the board
const darkColor = '#193C32';
const lightColor = '#F0F2DC';
let numberOfMoves = 0; // Number of pairs picked by the player
let activePage = ''; // Is set to indicate which game page is currently active  

// Max screen width used for the game area is 600px
let screenWidth = 0;
let screenHeight = 0;

function getScreenSize() {
  if (screen.width > 600) {
    screenWidth = 600;
  } else {
    screenWidth = screen.width;
  }
  screenHeight = screen.height;
}

// Wait for the DOM to finish loading before adding
// the section element for the first page to the html
document.addEventListener("DOMContentLoaded", function () {
  loadStartPage();
});

// Let a screen resize trigger a reload of the active screen
// Only enabled for the pages where it is needed
window.addEventListener("resize", reloadActivePage);

function reloadActivePage() {
  if (activePage === 'play-game-page') {
    reloadPlayGamePage();
  }
  if (activePage === 'start-page') {
    loadStartPage();
  }
  if (activePage === 'how-to-play-page') {
    loadHowToPlayPage();
  }
}

function loadStartPage() {
  activePage = 'start-page';

  // Create the section element for the start page 
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <div id="spacer"></div>
    <div id="start-page-button-cont">
      <button class="btn-how-to-play small-btn">How to play</button>
      <button class="btn-choose-board-size small-btn">Choose board size</button>
      <button class="btn-play-game large-btn">PLAY GAME</button>
    </div>
    <img id="start-page-image" src="assets/images/start-page-image.png" alt="Picture of the game board">
  `;

  // If statement which solves responsiveness of start-page-image for tall narrow screens
  getScreenSize();
  let screenRatio = screenHeight / screenWidth;

  if (screenRatio > 2.2) {
    section.children[2].style.height = 'auto';
    section.children[2].style.width = '90%';
  } else {
    section.children[2].style.height = '35%';
    section.children[2].style.width = 'auto';
  }

  // Add event listener to buttons on the start page
  let howToPlayButton = section.children[1].children[0];
  let chooseBoardSizeButton = section.children[1].children[1];
  let playGameButton = section.children[1].children[2];

  howToPlayButton.addEventListener('click', loadHowToPlayPage);
  chooseBoardSizeButton.addEventListener('click', loadChooseBoardSizePage);
  playGameButton.addEventListener('click', loadPlayGamePage);
}

function loadHowToPlayPage() {
  activePage = 'how-to-play-page';

  // Create the section element for the how to play page 
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <button class="btn-back-to-start small-btn">Back to start</button>
    <div id="how-to-play"><h2>How to play</h2>
      Pick two cards.<br>
      The cards will be turned over and you can see the image on the back of the cards.<br>
      If the images are identical the cards will be removed
      and you just pick another pair of cards.<br>
      If the two cards are not identical, the cards will flip back.<br>
      Try to remember where to find the different images.<br>
      Just go on and pick pairs of cards until all the cards have been
      removed from the screen.<br><br>
      The number of moves will be counted. Try to clear the board in less
      moves the next time. <br><br>
      You can choose the size of the board with the <span>"Choose board size"</span> buttons.<br>
      Smaller board makes the game easier. Bigger board makes it harder.
    </div>
  `;
  // Add id to the section element
  section.id = 'how-to-play-page';

  // If statement which solves responsiveness of how to play element when it's hight gets
  // too big for the screen
  getScreenSize();
  let howToPlayHeight = section.children[1].offsetHeight;
  let howToPlayTop = section.children[1].offsetTop;
  let headerOneHeight = document.getElementsByTagName('h1')[0].offsetHeight;

  if (screenHeight < howToPlayHeight + howToPlayTop + headerOneHeight + 30) {
    section.style.height = (howToPlayHeight + howToPlayTop + 30) + 'px';
  } else {
    section.style.height = '100%';
  }

  // Add event listener to buttons on the how to play page
  let startPageButton = section.children[0];
  let chooseBoardSizeLink = section.getElementsByTagName('span')[0];

  startPageButton.addEventListener('click', loadStartPage);
  chooseBoardSizeLink.addEventListener('click', loadChooseBoardSizePage);
}

function loadChooseBoardSizePage() {
  activePage = 'choose-board-size-page';

  // Create the section element for the choose board size page 
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <h2>Choose board size</h2>
    <button data-size='[3, 4]' class="small-btn">3 x 4</button>
    <button data-size='[4, 5]' class="small-btn">4 x 5</button>
    <button data-size='[5, 6]' class="small-btn">5 x 6</button>
    <button data-size='[6, 8]' class="small-btn">6 x 8</button>
    <button class="btn-play-game large-btn">PLAY GAME</button>
  `;

  // Add id to the section element
  section.id = 'choose-board-size-page';

  // Add background color to the button with the active board size 
  let buttons = section.getElementsByTagName('button');

  for (let button of buttons) {
    if (button.getAttribute('data-size') === boardSize) {
      button.style.backgroundColor = darkColor;
      button.style.color = lightColor;
    };
  }

  // Add event listener to buttons on the choose board size page
  // and set color of the selected board size button
  for (let button of buttons) {
    button.addEventListener('click', function () {
      if (this.className.split(' ')[0] === 'btn-play-game') {
        loadPlayGamePage();
      } else {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = lightColor;
          buttons[i].style.color = darkColor;
        }
        this.style.backgroundColor = darkColor;
        this.style.color = lightColor;
        boardSize = this.getAttribute('data-size');
        defValue = false;
      }
    })
  }
}

// Calculate the size and format of the game board depending on the
// screen size and the user's choice of board size.
let gameBoardWidth = 1; // Resulting board width in px
let gameBoardHeight = 1; // Resulting board height in px
let columns = 1; // Resulting number of columns
let rows = 1; // Resulting number of rows
let cardWidth = 1; // Width of an individual card

function calcBoardSize() {
  getScreenSize();

  // The height of the screen needs to be reduces by the height of the headers
  // and the quit game button to get the available board height
  let headerOneHeight = document.getElementsByTagName('h1')[0].offsetHeight;
  let headerTwoHeight = document.getElementsByTagName('h3')[0].offsetHeight;
  let headerThreeHeight = document.getElementsByTagName('h3')[1].offsetHeight;
  let buttonHeight = document.getElementsByTagName('button')[0].offsetHeight;
  let availableBoardHeight = screenHeight - (headerOneHeight + headerTwoHeight + headerThreeHeight + buttonHeight);

  // To decide the size of the board and if the board should be turned sideways,
  // compare the size of the individual cards
  let compareWidth = screenWidth * 0.9 / boardSize[1];
  let compareHeight = availableBoardHeight * 0.9 / boardSize[4];
  let compareWidthTurned = screenWidth * 0.9 / boardSize[4];
  let compareHeightTurned = availableBoardHeight * 0.9 / boardSize[1];

  let normalSize = 1;
  let normalHeight = 1;
  let normalWidth = 1;
  let turnedSize = 1;
  let turnedHeight = 1;
  let turnedWidth = 1;

  // If the board is unturned, is it the height or the width that limits
  // the size of the board?
  if (compareHeight < compareWidth) {
    normalSize = compareHeight * boardSize[4] * compareHeight * boardSize[1];
    normalHeight = compareHeight * boardSize[4];
    normalWidth = compareHeight * boardSize[1];
  } else {
    normalSize = compareWidth * boardSize[4] * compareWidth * boardSize[1];
    normalHeight = compareWidth * boardSize[4];
    normalWidth = compareWidth * boardSize[1];
  }

  // If the board is turned, is it the height or the width that limits
  // the size of the board?
  if (compareHeightTurned < compareWidthTurned) {
    turnedSize = compareHeightTurned * boardSize[1] * compareHeightTurned * boardSize[4];
    turnedHeight = compareHeightTurned * boardSize[1];
    turnedWidth = compareHeightTurned * boardSize[4];
  } else {
    turnedSize = compareWidthTurned * boardSize[1] * compareWidthTurned * boardSize[4];
    turnedHeight = compareWidthTurned * boardSize[1];
    turnedWidth = compareWidthTurned * boardSize[4];
  }

  // Turned or unturned - which gives the largest board?
  // Decide board height and width from that
  if (normalSize > turnedSize) {
    columns = boardSize[1];
    rows = boardSize[4];
    gameBoardWidth = normalWidth;
    gameBoardHeight = normalHeight;
  } else {
    columns = boardSize[4];
    rows = boardSize[1];
    gameBoardWidth = turnedWidth;
    gameBoardHeight = turnedHeight;
  }

  cardWidth = (gameBoardWidth - (columns - 1) * 4.2) / columns;
}

function loadPlayGamePage() {
  activePage = 'play-game-page';

  // Declare available images array
  let allImages = [
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
  ]

  // Create the section element for the play game page and define the first part
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <h3>Pick two cards to find two identical</h3>
    <div id="game-board">
    </div>
    <h3 id="number-of-moves">Number of moves: ${numberOfMoves}</h3>
    <button class="btn-quit-game large-btn">QUIT GAME</button>
  `;
  // Add id to the section element
  section.id = 'play-game-page';

  // Add eventlistener to quit game button 
  let quitGameButton = section.getElementsByTagName('button')[0];

  quitGameButton.addEventListener('click', quitGame);

  calcBoardSize();

  // Set the width and height of the game board div element
  let boardDiv = section.getElementsByTagName('div')[0];

  boardDiv.style.width = gameBoardWidth + 'px';
  boardDiv.style.height = gameBoardHeight + 'px';

  // Create an array from 1 to number of available images
  // to get all the images to choose from
  numberOfCards = columns * rows;
  let availableImages = [];

  for (i = 1; i <= allImages.length; i++) {
    availableImages.push(i);
  }

  // Create an array with a random set of available image numbers and with  
  // a size depending on the users choice of game board size
  let images = [];

  for (i = 0; i < numberOfCards / 2; i++) {
    let randomIndex = Math.floor(Math.random() * availableImages.length); //Pick a random index number
    let randomImage = availableImages[randomIndex]; // What available image has that index number?
    availableImages.splice(randomIndex, 1); // Remove that image from the available array
    images.push(randomImage); // Push that image to the image array          
  }

  images = images.concat(images); //Double the image array to get a pair of each image

  // Randomize the array of image numbers using Durstenfeld shuffle algorithm 
  // to get a chuffled deck of cards
  // Found on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  for (let i = (numberOfCards - 1); i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = images[i];
    images[i] = images[j];
    images[j] = temp;
  }

  console.log(images);

  // Add HTML code for each card 
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

  // Add the card elements to the game-board div
  section.children[1].innerHTML = cardsHtml;

  // Now the game is ready for the user to select the first card 
  selectFirstCard();
}

// Add eventlisteners to the cards. Skip the ones that has already been taken
let idFirstCard = '';
let idSecondCard = '';
let cardsMatched = [];
let imageSecondCard = '';
let imageFirstCard = '';

function selectFirstCard() {
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

// Find the id and the img of the first picked card and remove the 
// eventlistener from the picked card
function firstSelected() {
  let src = this.getElementsByTagName('img')[0].src;
  imageFirstCard = src;
  idFirstCard = this.id;
  this.getElementsByClassName('inner-card-cont')[0].style.transform = 'rotateY(180deg)';
  this.removeEventListener('click', firstSelected);
  selectSecondCard();
}

// Delete the firstSelected eventlisteners from all cards and add a new
// eventlistener to all cards except the ones that has already been matched
// and the just previously choosen card
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

// Find the id and the img of the second picked card
function secondSelected() {
  let src = this.getElementsByTagName('img')[0].src;
  imageSecondCard = src;
  idSecondCard = this.id;
  this.getElementsByClassName('inner-card-cont')[0].style.transform = 'rotateY(180deg)';
  compareCards();
}

// Compare the image of the two choosen cards
// If they are identical hide them, if not turn them back

// Start by removing the eventlistener from all cards
function compareCards() {
  for (let i = 0; i < numberOfCards; i++) {
    let card = document.getElementById('card' + i);
    card.removeEventListener('click', secondSelected);
  }
  numberOfMoves++;
  document.getElementById('number-of-moves').innerHTML = `<h3 id="number-of-moves">Number of moves: ${numberOfMoves}</h3>`
  if (imageFirstCard === imageSecondCard) {
    function hideCards() {
      document.getElementById(idFirstCard).style.visibility = "hidden";
      document.getElementById(idSecondCard).style.visibility = "hidden";
      selectFirstCard();
    }
    //The setTimeout method was found on https://www.w3schools.com/jsref/met_win_settimeout.asp
    setTimeout(hideCards, 1000);
    cardsMatched.push(idFirstCard, idSecondCard);
  } else {
    function turnCards() {
      let firstCard = document.getElementById(idFirstCard);
      let secondCard = document.getElementById(idSecondCard);
      firstCard.getElementsByClassName('inner-card-cont')[0].style.transform = 'none';
      secondCard.getElementsByClassName('inner-card-cont')[0].style.transform = 'none';
      selectFirstCard();
    }
    setTimeout(turnCards, 2500);
  }
}

// Recalculate the boardsize and cardwidth to adopt to a resized screen
function reloadPlayGamePage() {
  calcBoardSize();

  // Set the width and height of the game board div element
  let boardDiv = document.getElementById('game-board');

  boardDiv.style.width = gameBoardWidth + 'px';
  boardDiv.style.height = gameBoardHeight + 'px';

  // Give each card its new cardwidth
  for (let i = 0; i < numberOfCards; i++) {
    let cardId = 'card' + i;
    let card = document.getElementById(cardId);
    card.style.width = cardWidth + 'px';
    card.style.height = cardWidth + 'px';
  }

}

function gameFinished() {
  // HTML code to post a game finished note
  let html = `
    <div id="game-finished-background"></div>
    <div id="game-finished">
      <h2>Good job!</h2>
      <h3>You finished the game in ${numberOfMoves} moves!</h3>
      <button id="btn-gf-play-again" class="big-button small-btn">Play again</button>
      <button id="btn-gf-choose-board-size" class="big-button small-btn">Choose board size</button>
      <button id="btn-gf-back-to-start" class="big-button small-btn">Back to start</button>
    </div>
  `
  // Remove the eventlistener from the original quit game button
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML += html;
  let quitGameButton = section.getElementsByTagName('button')[0];
  quitGameButton.removeEventListener('click', quitGame);

  // Add eventlisteners to the buttons on the game finished note
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