function rollDice() {
    const die = document.getElementById("die");
    die.style.animation = "roll 2s ease";
    setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        die.textContent = randomNumber;
        die.style.animation = "none";
    }, 2000);
}


//a garder

/* var number=getnumber()
            this.afficheResultDe(player,number)
            if(number === 1){
                var fintour = true
                player.resetround()
                this.afficheGbobal(player)
                break
            }
            if(number != 1){
                player.setnewRound(number)
                this.afficheRoundActu(player)
                if(this.checkGagnant(player))
                {
                    this.finpartie(player);
                    break
                }
                var choice = wantcontinue()
                if(choice === 1){
                    fintour = false
                }
                else{
                    fintour = true
                    player.setnewGlobal(player.getround())
                    player.resetround()
                    this.afficheGbobal(player)
                }
            }
        }
    } */