function generateSecretCode() {
    const digits = [];
    while (digits.length < 4) {
        const randomDigit = Math.floor(Math.random() * 10);
        if (!digits.includes(randomDigit)) {
            digits.push(randomDigit);
        }
    }
    return digits.join('');
}


function calculateBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
}


const secretCode = generateSecretCode();
console.log(`Código secreto gerado: ${secretCode}`);  


function setupGame() {
    
    const guessInput = document.getElementById('guessInput');
    const submitGuess = document.getElementById('submitGuess');
    const revealCode = document.getElementById('revealCode');
    const guessList = document.getElementById('guessList');

    
    let attempts = [];

    
    revealCode.addEventListener('click', function() {
        alert(`A combinação aleatória escolhida pelo site é: ${secretCode}`);
    });

    
    submitGuess.addEventListener('click', function() {
        const guess = guessInput.value;

       
        if (guess.length !== 4 || isNaN(guess) || new Set(guess).size !== 4) {
            alert('Digite um número válido de 4 dígitos únicos!');
            return;
        }

        
        const { bulls, cows } = calculateBullsAndCows(secretCode, guess);

        
        attempts.unshift({ guess, bulls, cows });

        
        guessList.innerHTML = '';
        attempts.forEach(function(attempt) {
            const listItem = document.createElement('li');
            listItem.textContent = `Tentativa: ${attempt.guess} | Bulls: ${attempt.bulls}, Cows: ${attempt.cows}`;
            guessList.appendChild(listItem);
        });

      
        guessInput.value = '';

       
        if (bulls === 4) {
            alert('Parabéns! Você acertou a combinação!');
            guessInput.disabled = true;
            submitGuess.disabled = true;
        }
    });
}


document.addEventListener('DOMContentLoaded', setupGame);
