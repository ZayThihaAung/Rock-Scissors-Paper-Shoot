const pickedItemTag = document.querySelector(".pickedItem");
const scoreTag = document.querySelector(".score");
const roundTag = document.querySelector(".round");
const scoreInRoundTag = document.querySelector(".scoreInRound");
const declareTag = document.querySelector(".winnerOrLoser");
const containerTag = document.querySelector(".container");
const rulesTag = document.querySelector(".rules");
const winnerTag = document.querySelector('.winner');

let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  lose : 0,
  tie : 0
};

let roundScore = JSON.parse(localStorage.getItem('roundScore')) || {
  wins: 0,
  lose : 0,
  tie: 0
};
let index = localStorage.getItem('roundNumber') || 0;

function task() {
  index++;
  declareTag.innerHTML = '';
  pickedItemTag.innerHTML = '';
  roundTag.innerHTML = `Round : ${index}`;
  score = {
    wins: 0,
    lose: 0,
    tie:0
  }
  scoreInRoundTag.innerHTML = `You : ${roundScore.wins} | ${roundScore.lose} Computer | Ties : ${roundScore.tie}`;
  localStorage.setItem('roundScore', JSON.stringify(roundScore));
  localStorage.setItem('roundNumber', index);
  localStorage.removeItem('score');
}
function gameOver() {
  if (score.wins === 5) {
    roundScore.wins++;
    task();
  } else if (score.lose === 5) {
    roundScore.lose++;
    task();
  } else if (score.tie === 5) {
    roundScore.tie++;
    task();
  } else if (index === 5) {
    reloadPage();
  }
}

const reloadPage = () => {
  containerTag.innerHTML = '';
  if (roundScore.wins >= 3) {
    winnerTag.innerHTML = "You Win!";
  } else if(roundScore.lose >= 3) {
    winnerTag.innerHTML = "You Lose!";
  } else if (roundScore.tie >= 4) {
    winnerTag.innerHTML = 'Tie!';
  }
  localStorage.removeItem('roundScore');
  localStorage.removeItem('roundNumber');
  localStorage.removeItem('score');
  winnerTag.classList.add("styled");
  console.log(winnerTag);
  setTimeout(() => {
    location.reload();
  }, 200000);
}

// Game's Rules
const rules = () => {
  rulesTag.style.top = '60%'; 
  setTimeout(() => {
    rulesTag.style.top = '-50%';
  }, 19000);
}

let result = '';
function playGame(userMove) {
  const computerMove = pickComputerMove();

  if (userMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You Lose.';
    } 
    else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
    else if (computerMove === 'paper') {
      result = 'You Win.';
    }
  }

    if (userMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You Win.';
      } 
      else if (computerMove === 'scissors') {
        result = 'You Lose.';
      }
      else if (computerMove === 'paper') {
        result = 'Tie.';
      }
    }

    if (userMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } 
      else if (computerMove === 'scissors') {
        result = 'You Win.';
      }
      else if (computerMove === 'paper') {
        result = 'You Lose.';
      }
    }

  if (result === 'You Win.') {
    score.wins += 1;
  } else if (result === 'Tie.'){
    score.tie += 1;
  } else if (result === 'You Lose.') {
    score.lose += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  scoreTag.innerHTML = `Wins :${score.wins}, Lose :${score.lose}, Tie :${score.tie}`;
  declareTag.innerHTML = result;
  pickedItemTag.innerHTML = `You :
  <img src="${userMove}-emoji.png" class='itemsImg'>
  <img src="${computerMove}-emoji.png" class='itemsImg'>
  : Computer
  `;
  gameOver();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  }else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
    computerMove = 'paper';  
  } else if(randomNumber >= 2 / 3 && randomNumber < 1 ) {
    computerMove = 'scissors';
  }
  
  return computerMove;
}