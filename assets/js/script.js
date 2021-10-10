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
  section.setAttribute('id', 'start-page');

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
  section.setAttribute('id', 'how-to-play-page');

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
}

function loadPlayGamePage() {}