const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        life: document.querySelector('#life')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 15,
        howManyLife: 3
    },
    actions: {

    }
};

async function decreaseLife() {
    return state.values.howManyLife--;
}

function clearIntervals() {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.actions.countDownTimerId = null;
    state.actions.timerId = null;
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        decreaseLife();
        state.view.life.textContent = `x${state.values.howManyLife}`;
        playSound('game-over-arcade-6435.mp3');
        clearIntervals();
        alert(`Play ${state.values.howManyLife} more times`);
        return state.values.currentTime = 15;
    }
}

function gameOver() {
    if (state.values.howManyLife <= 0) {
        alert(`Game Over! You scored ${state.values.result} points`);
        clearIntervals();
        state.values.result = 0;
        state.view.score.textContent = 0;
        state.values.howManyLife = 3;
        return state.view.life.textContent = `x${state.values.howManyLife}`;
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('hit.m4a');
            }
        })
    })
}

function initialize() {
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    setInterval(gameOver(), 1000);
}

