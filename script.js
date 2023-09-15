$(document).ready(() =>{
    $('.newgame').click(() => {
        choix = choixnewgame() 
        if( choix === "o" || choix === "O"){
            name1 = prompt("Nom du joueur numéro 1","<Entrez le nom du joueur 1>")
            name2 = prompt("Nom du joueur numéro 2","<Entrez le nom du joueur 2>")
            let player1 = new Player(name1)
            let player2 = new Player(name2)
            let game1 = new Game()
            game1.partie(player1,player2)
        }

    })
});

class Player
{
    constructor(name){
        this.name = name
        this.global = 0
        this.round = 0
    }
    
    getround(){
        return this.round
    }

    getglobal(){
        return this.global
    }
    setnewRound(num){
        this.round = this.round + num
    }
    setnewGlobal(num){
        this.global += num 
    }
    resetround(){
        this.round=0;
    }
    calculpendantmatch(){
        return this.global + this.round
    }
}

function choixnewgame(){
    choix = prompt("Voulez vous commencer une nouvelle partie O pour oui et N pour non")
    if( choix === "O" || choix === "o" || choix === "N" || choix === "n"){
        return choix
    }
    else{
        return choixnewgame()
    } 
}

function getnumber(){
    aleatoire = Math.random()
    num = Math.floor(aleatoire*7)
    if(num != 0 ){
        console.log("Lancé du dé...")
        return num
    }
    else{
        return getnumber()
    }
}

function wantcontinue(){
    choix = prompt("Veux tu continuer? O or N")
    if(choix == "O" || choix == "o"){
        return 1
    }
    else if(choix === "y" || choix === "Y") {
        return 0
    }
    else{
        return wantcontinue()
    }
}


class Game
{
    constructor(){
        this.gagnant=null;
        this.nbtour = 0;
    }
    afficheResultDe(player,num){
        console.log(player.name+" a eu "+num)
    }

    afficheGbobal(player){
        console.log(player.name+" a en global "+ player.getglobal())
    }

    afficheRoundActu(player){
        console.log(player.name+" a actuellement "+player.getround())
    }

    tour(player){
        fintour = false
        while(!fintour){
            var number=getnumber()
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
    }
    
    afficheNbTours(){
        console.log("tour numero:"+this.nbtour)
    }

    nbtourInc(){
        return this.nbtour++
    }

    checkGagnant(player){
        if(player.getglobal() >= 100 || player.calculpendantmatch() >= 100){
            return true
        }
        else{
            return false
        }
    }

    partie(player1,player2){
        while(!this.checkGagnant(player1) && !this.checkGagnant(player2))
        {
            this.afficheNbTours()
            this.tour(player1)
            if(this.getGagnant()!= null){
                break
            }
            this.tour(player2)
            if(this.getGagnant()!= null){
                break
            }
            this.nbtourInc()
        }
    }

    getGagnant(){
        return this.gagnant
    }

    setGagnant(player){
        this.gagnant = player
    }

    finpartie(player){
        console.log("Le vainqueur de la partie est: "+player.name+" avec "+ player.setnewGlobal(player.getround()) +" points")
        this.setGagnant(player)
    }

}