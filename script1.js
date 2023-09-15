function rollDice() {
    const die = document.getElementById("die");
    die.style.animation = "roll 2s ease";
    setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        die.textContent = randomNumber;
        die.style.animation = "none";
    }, 2000);
}
