const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const timeDisplay = document.getElementById('time');

let score = 0;
let highScore = localStorage.getItem("whackHighScore") || 0;
let time = 30;
let speed = 800;
let timer, moleTimer;
let activeMole = null;

highScoreDisplay.textContent = highScore;

// Create grid
for (let i = 0; i < 9; i++) {
  const hole = document.createElement('div');
  hole.classList.add('hole');
  hole.dataset.index = i;

  const mole = document.createElement('div');
  mole.classList.add('mole');

  hole.appendChild(mole);
  game.appendChild(hole);

  hole.addEventListener('click', () => {
    if (mole.style.display === 'block') {
      score++;
      scoreDisplay.textContent = score;
      mole.style.display = 'none';
      activeMole = null;

      // Increase difficulty
      if (score % 5 === 0 && speed > 300) {
        speed -= 50;
      }
    }
  });
}

function showRandomMole() {
  const holes = document.querySelectorAll('.hole');
  if (activeMole !== null) {
    holes[activeMole].querySelector('.mole').style.display = 'none';
  }

  const index = Math.floor(Math.random() * holes.length);
  const mole = holes[index].querySelector('.mole');
  mole.style.display = 'block';
  activeMole = index;

  moleTimer = setTimeout(showRandomMole, speed);
}

function startGame() {
  score = 0;
  time = 30;
  speed = 1000;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;

  clearInterval(timer);
  clearTimeout(moleTimer);

  showRandomMole();

  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      clearTimeout(moleTimer);

      const holes = document.querySelectorAll('.hole');
      holes.forEach(hole => hole.querySelector('.mole').style.display = 'none');

      if (score > highScore) {
        localStorage.setItem("whackHighScore", score);
        highScoreDisplay.textContent = score;
        alert("🎉 New High Score: " + score);
      } else {
        alert("Time's up! Your score: " + score);
      }
    }
  }, 1000);
}
