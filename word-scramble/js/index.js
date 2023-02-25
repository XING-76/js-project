let wordText = document.querySelector('.word');
let hintText = document.querySelector('.hint span');
let inputField = document.querySelector('.details input');
let refreshBtn = document.querySelector('.refresh-word');
let submitBtn = document.querySelector('.submit-word');
let time = document.querySelector('.time b');

const SECOND = 30;
let answer, timer;

function initTimer(maxTime) {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return (time.innerText = maxTime);
        }
        alert(`Time Off! ${answer.toUpperCase()} was the correct word`);
        clearInterval(timer);
        toggleButton(false);
    }, 1000);
}

function initGame() {
    const randomObj = data[Math.floor(Math.random() * data.length)];
    const hint = randomObj.hint;
    answer = randomObj.word.toLowerCase();
    const wordArray = randomObj.word.split('');

    toggleButton(true);
    initTimer(SECOND);

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // shuffling and swiping wordArray letters randomly
        [wordArray[j], wordArray[i]] = [wordArray[i], wordArray[j]];
    }

    wordText.innerText = wordArray.join('');
    hintText.innerText = hint;
    inputField.value = '';
    inputField.setAttribute('maxlength', answer.length);
}

function toggleButton(state) {
    if (state) {
        refreshBtn.innerText = 'ReFresh';
        refreshBtn.classList.remove('restart-word');
        refreshBtn.classList.add('refresh-word');
    } else {
        refreshBtn.innerText = 'ReStart';
        refreshBtn.classList.remove('refresh-word');
        refreshBtn.classList.add('restart-word');
    }
}

function checkAnswer() {
    const inputValue = inputField.value;
    if (!inputValue) return alert('Please enter a word');

    if (inputValue === answer) {
        alert(`Congrats! ${inputValue.toUpperCase()} is a correct word`);
        initGame();
        return;
    }

    if (inputValue !== answer) {
        alert(`Oops! ${inputValue} is not a correct word`);
        return;
    }
}

initGame();
refreshBtn.addEventListener('click', initGame);
submitBtn.addEventListener('click', checkAnswer);
