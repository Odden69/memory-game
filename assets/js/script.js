// Wait for the DOM to finish loading before adding
// the section element for the first page to the html
document.addEventListener("DOMContentLoaded", function () {
  loadStartPage();
});

function loadStartPage() {
  // Create the section element for the start page 
  let section = document.createElement('section');
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
  console.log('test');
}

function loadChooseBoardSizePage() {}

function loadPlayGamePage() {}