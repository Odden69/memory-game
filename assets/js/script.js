// Declare board size variable
let boardSize = [3, 4];
let defValue = true;
let markedButtonColor = 'red';
let unmarkedButtonColor = 'white';

// Declare available cards array
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
]

// Wait for the DOM to finish loading before adding
// the section element for the first page to the html
document.addEventListener("DOMContentLoaded", function () {
  loadStartPage();
});

function loadStartPage() {
  // Create the section element for the start page 
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <button class="btn-how-to-play small-btn">How to play</button>
    <button class="btn-choose-board-size small-btn">Choose board size</button>
    <button class="btn-play-game large-btn">PLAY GAME</button>
  `;
  // Add id to the section element
  section.id = 'start-page';

  // Add event listener to buttons on the start page
  let howToPlayButton = section.children[0];
  let chooseBoardSizeButton = section.children[1];
  let playGameButton = section.children[2];

  howToPlayButton.addEventListener('click', loadHowToPlayPage);
  chooseBoardSizeButton.addEventListener('click', loadChooseBoardSizePage);
  playGameButton.addEventListener('click', loadPlayGamePage);

  // Insert the section element before the script element  
  let scriptElement = document.getElementById('script');
  document.body.insertBefore(section, scriptElement);
}

function loadHowToPlayPage() {
  // Create the section element for the how to play page 
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <button class="btn-back-to-start small-btn">Back to start</button>
    <div id="how-to-play"><h2>How to play</h2>
      Pick two cards.<br>
      The cards will be turned over and the back side will show.<br>
      If the images on the backsides are identical the cards will be removed
      and you just pick another pair of cards.<br>
      If the two cards are not identical, the cards will flip back.<br>
      Just go on and pick pairs of cards until all the cards have been
      removed from the screen.<br><br>
      The number of moves will be counted. Try to clear the board in less
      moves the next time. <br><br>
      You can choose the size of the board under <span>"Choose board size"</span><br>
      Fewer cards makes the game easier. More cards makes it harder.
    </div>
  `;
  // Add id to the section element
  section.id = 'how-to-play-page';

  // Add event listener to buttons on the how to play page
  let startPageButton = section.children[0];
  let chooseBoardSizeLink = section.getElementsByTagName('span')[0];
  console.log(chooseBoardSizeLink)

  startPageButton.addEventListener('click', loadStartPage);
  chooseBoardSizeLink.addEventListener('click', loadChooseBoardSizePage);

  // Insert the section element before the script element  
  let scriptElement = document.getElementById('script');
  document.body.insertBefore(section, scriptElement);
}

function loadChooseBoardSizePage() {
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

  // Add background color to the default button 
 if (defValue) {
    section.querySelector('[data-size = "[4, 5]"]').style.backgroundColor = markedButtonColor;
  }

  // Add event listener to buttons on the choose board size page
  // and set color of the selected board size button
  let buttons = section.getElementsByTagName('button');

  for (let button of buttons) {
    button.addEventListener('click', function(){
      if (this.className.split(' ')[0] === 'btn-play-game') {
        loadPlayGamePage();
      } else {
        for (let i = 0; i<buttons.length; i++) {
          buttons[i].style.backgroundColor = unmarkedButtonColor;
        }
        this.style.backgroundColor = markedButtonColor;
        boardSize = this.getAttribute('data-size');
        defValue = false;
      }
    })
  }

 /* // Insert the section element before the script element  
  let scriptElement = document.getElementById('script');
  document.body.insertBefore(section, scriptElement);*/
}

function loadPlayGamePage() {
  // Create the section element for the play game page and define the first part
  let section = document.getElementsByTagName('section')[0];
  section.innerHTML = `
    <h2>Pick two cards to find two identical</h2>
    <div id="game-board">
    </div>
  `;
console.log(section);
  // Set height and width of the game board
  // The number of cards is selected by player

  let gameBoardWidth = 1; // Resulting board width in px
  let gameBoardHeight = 1; // Resulting board height in px
  let columns = 1; // Resulting number of columns
  let rows = 1; // Resulting number of rows

  // Use the actual screen size to get the size of the board
  let screenWidth = screen.width;
  let screenHeight = screen.height;
  
  // Max screen width 600px
  if (screenWidth > 600) {
    screenWidth = 600;
  }
  // The height of the screen needs to be reduces by the height of the headers
  // to get the available board height
  let headerOneHeight = document.getElementsByTagName('h1')[0].offsetHeight;
  let headerTwoHeight = document.getElementsByTagName('h2')[0].offsetHeight;
  
  // To decide the size of the board and if the board should be turned sideways,
  // compare the size of the individual cards
  let compareWidth = screenWidth * 0.9 / boardSize[0];
  let compareHeight = (screenHeight - headerOneHeight - headerTwoHeight) * 0.9 / boardSize[1]; 
  let compareWidthTurned = screenWidth * 0.9 / boardSize[1];
  let compareHeightTurned = (screenHeight - headerOneHeight - headerTwoHeight) * 0.9 / boardSize[0];

  let normalSize = 1;
  let normalHeight = 1;
  let normalWidth = 1;
  let turnedSize = 1;
  let turnedHeight = 1;
  let turnedWidth = 1;

  // If the board is unturned, is it the height or the width that limits
  // the size of the board?
  if (compareHeight < compareWidth) {
    normalSize = compareHeight * boardSize[1] * compareHeight * boardSize[0];
    normalHeight = compareHeight * boardSize[1];
    normalWidth = compareHeight * boardSize[0];
  } else {
    normalSize = compareWidth * boardSize[1] * compareWidth * boardSize[0];
    normalHeight = compareWidth * boardSize[1];
    normalWidth = compareWidth * boardSize[0];
  }

  // If the board is turned, is it the height or the width that limits
  // the size of the board?
  if (compareHeightTurned < compareWidthTurned) {
    turnedSize = compareHeightTurned * boardSize[0] *compareHeightTurned * boardSize[1];
    turnedHeight = compareHeightTurned * boardSize[0];
    turnedWidth = compareHeightTurned * boardSize[1];
  } else {
    turnedSize = compareWidthTurned * boardSize[0] * compareWidthTurned * boardSize[1];
    turnedHeight = compareWidthTurned * boardSize[0];
    turnedWidth = compareWidthTurned * boardSize[1];
  }

  // Turned or unturned - which gives the largest board?
  if (normalSize > turnedSize) {
    columns = boardSize[0];
    rows = boardSize[1];
    gameBoardWidth = normalWidth;
    gameBoardHeight = normalHeight;
  } else {
    columns = boardSize[1];
    rows =  boardSize[0];
    gameBoardWidth = turnedWidth;
    gameBoardHeight = turnedHeight;
  }

  // Set the width and height of the game board div element
  let boardDiv = section.getElementsByTagName('div')[0];
  
  boardDiv.style.width = gameBoardWidth + 'px';
  boardDiv.style.height = gameBoardHeight + 'px';

  // Create an array from 1 to number of available images
  let numberOfCards = columns * rows;
  let availableImages = [];

  for (i = 1; i <= allImages.length; i++) {
    availableImages.push(i);
  }

  // Create an array of all the cards from a random set of images
  let images = [];

  for (i = 0; i < numberOfCards / 2; i++) {
    let randomIndex = Math.floor(Math.random() * availableImages.length);
    let randomImage = availableImages[randomIndex];
    availableImages.splice(randomIndex, 1);
    images.push(randomImage);
  }

  images = images.concat(images);  //Double it to get a pair of each image

  // Randomize images using Durstenfeld shuffle algorithm 
  // Found on https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  for (let i = (numberOfCards - 1); i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let temp = images[i];
    images[i] = images[j];
    images[j] = temp; 
  }
  console.log('total' + images);

  let cardsHtml = '';

  for (let i = 0; i < numberOfCards; i++) {
    let image = images[i];
    let cardWidth = gameBoardWidth / numberOfCards - 1;
    let cardId = 'card' + i;
    let cardHtml = `
      <div id="${cardId}" class="card-cont" style="width: ${cardWidth}px; height: ${cardWidth}px;>
        <div class="inner-card-cont">
          <div class="front-card"></div>
          <div class="back-card"><img src="assets/images/img-${image}.png" alt="buildng blocks"></div>
        </div>
      </div>`;
    cardsHtml += cardHtml;
    console.log('card ' + cardHtml);
    console.log('cards '+ cardsHtml);
  }
  
  section.children[1].innerHTML = cardsHtml;
  console.log(section.innerHTML);
 
  // Add the last part of the section

  // Add id to the section element
  section.setAttribute('id', 'play-game-page');
}