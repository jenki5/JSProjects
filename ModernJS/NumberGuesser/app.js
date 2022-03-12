let min = 1, max = 100, winningNum = getRandomNum(min, max), guessesLeft = 10;

const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-value');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className == 'play-again'){
        window.location.reload();
    }
})

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }
    else{
        if(guess == winningNum){
            gameOver(true, `YOU GOT THE RIGHT NUMBER!! ${winningNum} IS CORRECT!!`);
        }
        else{
            guessesLeft--;
            if(guessesLeft === 0){
                gameOver(false, `Game over! You lose, like always, Loser! The correct number was ${winningNum}`)
            }
            else {
                if(guess > winningNum){
                    console.log(`Guess: ${guess}; Correct: ${winningNum}`)
                    guessInput.style.borderColor = 'red';
                    guessInput.value = '';
                    setMessage(`${guess} was high, ${guessesLeft} guesses left`, 'yellow');
                }
                else{
                    console.log(`Guess: ${guess}; Correct: ${winningNum}`)
                    guessInput.style.borderColor = 'red';
                    guessInput.value = '';
                    setMessage(`${guess} was low, ${guessesLeft} guesses left`, 'yellow');
                }
            }
        }
    }
})

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(won, msg){
    var color = 'red';
    if(won){
        color = 'green';
    }
    guessInput.disabled = true;
    guessInput.style.Color = color;
    setMessage(msg, color);    

    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}