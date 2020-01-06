const qwerty = document.getElementById('qwerty');
const phrases = document.getElementById('phrase');
const ul = phrases.querySelector('ul');
var missed = 0;
const score = document.querySelector('ol');
const heart = document.querySelectorAll('.tries');
const overlay = document.getElementById('overlay');
const gameStart = document.querySelector('.btn__reset');
const keys = document.querySelectorAll('#qwerty button');
const phraseList = ['hello there',
                'we take those',
                'under the sea',
                'roll for initiative',
                'how do you want to do it'];

// Choose a random phrase from the list and convert it into an array
function getRandomPhraseAsArray(arr) {
    let randomNumber = Math.floor(Math.random() * 5);
    let chosenPhrase = arr[randomNumber];
    let newArray = chosenPhrase.split('');
    return newArray;
}

// Loop through the chosen phrase array and create an li for each letter, then add classes to display it
function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.innerHTML = arr[i];
    ul.appendChild(li);
    if (arr[i] !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
}

// Check if the letter chosen matches any of the letters in the chosen phrase
function checkLetter(button) {
  let li = phrases.querySelectorAll('li');
  let letterMatch = null;
  for (let i = 0; i < li.length; i++) {
    if (button.textContent === li[i].textContent) {
      li[i].className += ' show';
      letterMatch = button;
      console.log(letterMatch);
    }
  }
  return letterMatch;
}

// Check if the number of letter with the class 'show' equals the total letters in the phrase, if yes, then display win screen
// Also check if number of guesses has reached 5, if so display the lose screen
function checkWin() {
  let letterTotal = document.querySelectorAll('.letter');
  let letterShow = document.querySelectorAll('.show');
  if (letterShow.length === letterTotal.length) {
    overlay.className = 'win';
    overlay.style.display = '';
    gameStart.textContent = 'You Win!';
  } else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = '';
    gameStart.textContent = 'You Lose!';
  }
}

// Hide start screen
gameStart.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Get phrase as an array
const phraseArray = getRandomPhraseAsArray(phraseList);
addPhraseToDisplay(phraseArray);

// Event listener to get chosen letters for the checkletter function and remove a try if it doesnt match, and call checkWin function
for (let i = 0; i < keys.length; i++) {
  keys[i].addEventListener('click', (event) => {
      const clickedButton = event.target;
      clickedButton.className = 'chosen';
      clickedButton.disabled = 'true';
      let letterFound = checkLetter(clickedButton);
      if (letterFound === null) {
        score.removeChild(heart[missed]);
        missed += 1;
      }
      checkWin();
  });
}
