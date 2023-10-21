const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
        life: document.querySelector('#life'),
        textAlert: document.querySelector('#text-custom-alert'),
        buttonAlert: document.querySelector('#button-custom-alert')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 4,
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
        clearIntervals();
        showAlert(`Play ${state.values.howManyLife} more times`, 'Restart');
        return state.values.currentTime = 4;
    }
}

function gameOver() {
    if (state.values.howManyLife <= 0) {
        setTimeout(() => {
            showAlert(`Game Over! You scored ${state.values.result} points`, 'Exit');
            playSound('game-over-arcade-6435.mp3');
            clearIntervals();
            state.values.result = 0;
            state.view.score.textContent = 0;
            state.values.howManyLife = 3;
            state.view.life.textContent = `x${state.values.howManyLife}`;
        }, 600);
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

function refresh() {
    location.reload();
}

function showAlert(text, button) {
    state.view.textAlert.textContent = text;
    state.view.buttonAlert.textContent = button;
    const alert = document.getElementById('custom-alert');
    alert.style.display = 'block';
    setTimeout(() => {
        alert.classList.add('show');
    }, 50)

    if (state.view.buttonAlert.textContent === 'START') {
        state.view.buttonAlert.addEventListener('click', initialize);
    }

    if (state.view.buttonAlert.textContent === 'Exit') {
        state.view.buttonAlert.removeEventListener('click', initialize);
        state.view.buttonAlert.addEventListener('click', refresh);
    }
}

function closedAlert() {
    const alert = document.getElementById('custom-alert');
    alert.classList.remove('show');
    setTimeout(() => {
        alert.style.display = 'none';
    }, 500);
}

function initialize() {
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    setInterval(gameOver(), 1000);
}

showAlert("Let's go!", 'START');