// If score has a stored value, parse it and set the score as that
// Otherwise, use the default values
let score = JSON.parse(localStorage.getItem('score')) || {wins:0,losses:0,ties:0};


// Display score when the page loads
updateScoreElement();


function generateComputerPick(){
  const randomNumber = Math.random();

  if(randomNumber>=0 && randomNumber<1/3){
    computerPick = `rock`;
  }
  else if(randomNumber>=1/3 && randomNumber<2/3){
    computerPick = `paper`;
  }
  else{
    computerPick = `scissors`;
  }
  return computerPick;
}

function play(userPick,computerPick){
  let result;

  // Calculate result of game
  if(userPick === `rock`){
    if(computerPick === `rock`){
      result = `tie`;
    }
    else if(computerPick === `paper`){
      result = `lose`;
    }
    else{
      result = `win`;
    }
  }
  else if(userPick === `paper`){
    if(computerPick === `rock`){
      result = `win`;
    }
    else if(computerPick === `paper`){
      result = `tie`;
    }
    else{
      result = `lose`;
    }
  }
  else{
    if(computerPick === `rock`){
      result = `lose`;
    }
    else if(computerPick === `paper`){
      result = `win`;
    }
    else{
      result = `tie`;
    }
  }

  // Update the 'score' counter that keeps track of wins, losses, and ties
  if(result===`win`){
    score.wins++;
  }
  else if(result===`lose`){
    score.losses++;
  }
  else{
    score.ties++;
  }


  // This saves a JSON string version of our score object to local storage
  localStorage.setItem('score', JSON.stringify(score)); // Local storage only supports strings
  
  // Update the elements on the page
  updateResultElement(result);
  updateMovesElement(userPick,computerPick);
  updateScoreElement();
}

function choose(n){
  computerPick = generateComputerPick();
  userPick = n;
  play(userPick,computerPick);
}

function resetScore(){
  score.wins=0;
  score.losses=0;
  score.ties=0;
  localStorage.removeItem('score');
  updateScoreElement();
  updateResultElement();
  updateMovesElement();
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResultElement(result){
  const resultElement = document.querySelector('.js-result');
  result ? resultElement.innerText = `You ${result}!`  :  resultElement.innerHTML = ` `; // If result is not null, print the result
}

function updateMovesElement(userMove,computerMove){
  const movesElement = document.querySelector('.js-moves');
  // If the moves not null, display the images of the moves and who picked them
  (userMove&&computerMove) ? movesElement.innerHTML = 
  `You <img src="rock-paper-scissors-icons/${userPick}-emoji.png" class="move-icon">
    Computer <img src="rock-paper-scissors-icons/${computerPick}-emoji.png" class="move-icon">` 
    : movesElement.innerHTML = ` `;
}