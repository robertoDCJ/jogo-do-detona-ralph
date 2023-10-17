const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 6,
    },
    actions: {
        
    }
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        playSound('game-over-arcade-6435.mp3');
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        state.actions.countDownTimerId = null;
        state.actions.timerId = null;
        alert('Game Over! O seu resultado foi: ' + state.values.result);
        state.values.result = 0;
        return state.values.currentTime = 6;
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
    state.view.score.textContent = 0;
    addListenerHitBox();
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

