$(document).ready(() =>{
    $('.newgame').click(() => {
        choix = choixnewgame() 
        if( choix === "o" || choix === "O"){
            let player = $('.player')
            name1 = prompt("Nom du joueur numéro 1","<Entrez le nom du joueur 1>")
            player[0].textContent = `${name1}`
            name2 = prompt("Nom du joueur numéro 2","<Entrez le nom du joueur 2>")
            player[1].textContent = `${name2}`
            let player1 = new Player(name1)
            let player2 = new Player(name2)
            let game1 = new Game()
            let tour = true
            game1.afficheJoueurEnCours(player1,tour,false,true)
            game1.statutsjoueur(player1,player2,tour,false,true)
            game1.partie(player1,player2,tour)
        }

    })
});

let hold = document.getElementsByClassName("hold")
let roll = document.getElementsByClassName("roll")

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
    afficheGbobal(player,tour){
        setTimeout(() => {
            console.log(player.name+" a en global "+ player.getglobal())
            let id = ''
            if(tour){
                id = 'global1'
            }
            else{
                id = 'global2'
            }
            let global = document.getElementById(id)
            global.textContent = `${player.getglobal()}`
        }, 500);
        
    }

    afficheRoundActu(player,tour,hold,roll){
        console.log(player.name+" a actuellement "+player.getround())
        let id = ''
        if(tour){
                id = 'round1'
        }
        else{
                id = 'round2'
        }
        let current = document.getElementById(id)
        setTimeout(()=>{
            if(hold){
                current.textContent = '0'
            }
        },500)
        setTimeout(() => {
            current.textContent = `${player.getround()}`
            if(roll){
                current.textContent = '0'
            }
        }, 1500)
    }

    tour(player,tour){
        var number=getnumber()
        tourneDe(number)
        this.afficheResultDe(player,number,tour)
        if(number === 1){
            player.resetround()
            this.afficheGbobal(player,tour)
            this.afficheRoundActu(player,tour,false,true)
            this.afficheJoueurEnCours(player,!tour,true)
            return !tour
        }
        if(number != 1){
            player.setnewRound(number)
            this.afficheRoundActu(player,tour)
            if(this.checkGagnant(player))
            {
                this.finpartie(player);
            }
            return tour
        }
    }

    hold(player,tour){
        if(player.getround()!=0){
            player.setnewGlobal(player.getround())
            player.resetround()
            this.afficheGbobal(player,tour)
            this.afficheRoundActu(player,tour,true,false)
            this.afficheJoueurEnCours(player,!tour,false,true)
            return !tour
        }
    }

    afficheJoueurEnCours(player,tour,roll,hold){
        let id = ''
        let id1 = ''
        let idd = ''
        setTimeout(() => {
            if(roll){
                if(tour){
                    id = 'divjoueur1'
                    id1 = 'divjoueur2'
                }
                else{
                    id = 'divjoueur2'
                    id1 = 'divjoueur1'
                }
                let divcourante = document.getElementById(id)
                let divnoncourante = document.getElementById(id1)
                divcourante.style.backgroundColor = "whitesmoke"
                divnoncourante.style.backgroundColor = "white"

            }
        }, 1500)
        setTimeout(() => {
            if(hold){
                if(tour){
                    id = 'divjoueur1'
                    id1 = 'divjoueur2'
                }
                else{
                    id = 'divjoueur2'
                    id1 = 'divjoueur1'
                }
                let divcourante = document.getElementById(id)
                let divnoncourante = document.getElementById(id1)
                let name = document.getElementById(idd)
                divcourante.style.backgroundColor = "whitesmoke"
                divnoncourante.style.backgroundColor = "white"
            }
        }, 500);

    }

    statutsjoueur(player1,player2,tour,roll,hold){
        let id = ''
        let id1 =''
        setTimeout(() => {
            if(roll){
                if(tour){
                    id = 'player1'
                    id1 ='player2'
                }
                else{
                    id = 'player2'
                    id1 = 'player1'
                }
                let ajoutdiv = document.getElementById(id)
                let pasajoutdiv = document.getElementById(id1)
                if(tour){
                    pasajoutdiv.innerHTML = `${player2.name}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player1.name}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
                } 
                else{
                    pasajoutdiv.innerHTML = `${player1.name}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player2.name}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
                }
            }
        }, 1500);
        setTimeout(() => {
            if(hold){
                if(tour){
                    id = 'player1'
                    id1 ='player2'
                }
                else{
                    id = 'player2'
                    id1 = 'player1'
                }
                let ajoutdiv = document.getElementById(id)
                let pasajoutdiv = document.getElementById(id1)
                if(tour){
                    pasajoutdiv.innerHTML = `${player2.name}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player1.name}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
                }
                else{
                    pasajoutdiv.innerHTML = `${player1.name}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player2.name}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
                }
            }
        }, 500);
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

    partie(player1,player2,tour){
        this.afficheNbTours()
        roll[0].addEventListener('click',() => {
            if(tour){
                
                tour = this.tour(player1,tour)
                this.statutsjoueur(player1,player2,tour,true,false)
            }
            else
            {
                
                tour = this.tour(player2,tour)
                this.statutsjoueur(player1,player2,tour,true,false)
            }
        })
        hold[0].addEventListener('click',() =>{
            if(tour){
                
                tour = this.hold(player1,tour)
                this.statutsjoueur(player1,player2,tour,false,true)
            }
            else{
                
                tour = this.hold(player2,tour)
                this.statutsjoueur(player1,player2,tour,false,true)
            }
        })
        if(this.getGagnant()!= null){
            return 
        }
        this.nbtourInc()
        //if(!this.checkGagnant(player1) && !this.checkGagnant(player2)){
            //this.partie(player1,player2)
        //}
    }

    getGagnant(){
        return this.gagnant
    }

    setGagnant(player){
        this.gagnant = player
    }

    finpartie(player){
        player.setnewGlobal(player.getround())
        console.log("Le vainqueur de la partie est: "+player.name+" avec "+ player.getglobal +" points")
        this.setGagnant(player)
    }

}

function tourneDe(num) {
    const de = document.getElementById("de");
    de.style.animation = "roll 2s ease";
    setTimeout(() => {
        de.textContent = num;
        de.style.animation = "none";
    }, 1500);
}