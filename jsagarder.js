$(document).ready(() =>{
    $('.newgame').click(() => {
        choix = choixnewgame() 
        if( choix === "o" || choix === "O"){
            name1 = prompt("Nom du joueur numéro 1","<Entrez le nom du joueur 1>")
            name2 = prompt("Nom du joueur numéro 2","<Entrez le nom du joueur 2>")
            let player1 = new Player(name1)
            let player2 = new Player(name2)
            console.log(player1,player2)
            tour=0
            fintour1=0
            fintour2=0
            while(player1.getglobal() <100 && player2.getglobal() <100 && player1.calculpendantmatch() <100 && player2.calculpendantmatch()<100 ){
                console.log("tour numero:"+tour)
                while(fintour1===0){
                    number=getnumber()
                    console.log(player1.name+" a eu "+number)
                    if(number === 1){
                        fintour1 = 1
                        player1.round=0
                        console.log(player1.name+" a en global "+ player1.getglobal())
                        break
                    }
                    if(number != 1){
                        player1.setnewRound(number)
                        console.log(player1.name+" a actuellement "+player1.getround())
                        choice = wantcontinue()
                        if(choice === 1){
                            fintour1 = 0
                        }
                        else{
                            fintour1 = 1
                            player1.setnewGlobal(player1.getround())
                            player1.resetround()
                            console.log(player1.name+" a en global "+ player1.getglobal())
                        }
                    }
                }
                while(fintour2===0){
                    number=getnumber()
                    console.log(player2.name+" a eu "+number)
                    if(number === 1){
                        fintour2 = 1
                        player2.resetround()
                        console.log(player2.name+" a en global "+ player2.getglobal())
                        break
                    }
                    if(number != 1){
                        player2.setnewRound(number)
                        console.log(player2.name+" a actuellement "+player2.getround())
                        choice = wantcontinue()
                        if(choice === 1){
                            fintour2 = 0
                        }
                        else{
                            fintour2 = 1
                            player2.setnewGlobal(player2.getround())
                            player2.resetround()
                            console.log(player2.name+" a en global "+ player2.getglobal())
                        }
                    }
                }
                fintour2=0;
                fintour1=0;
                tour+=1;
            }
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
    console.log("Lancé du dé...")
    aleatoire = Math.random()
    if(aleatoire != 0){
        return Math.floor(aleatoire * 7)
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