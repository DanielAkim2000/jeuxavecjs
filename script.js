$(document).ready(() =>{
    $('.newgame').click(() => {
        choix = confirm("Voulez vous commencer une nouvelle partie OK pour OUI et Annuler pour NON")
        if( choix){
            let player = $('.player')
            name1 = prompt("Nom du joueur numéro 1","<Entrez le nom du joueur 1>")
            name2 = prompt("Nom du joueur numéro 2","<Entrez le nom du joueur 2>")
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

class Game{
    constructor(){
        this.gagnant=null;

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
                    pasajoutdiv.innerHTML = `${player2.name.toUpperCase()}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player1.name.toUpperCase()}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
                } 
                else{
                    pasajoutdiv.innerHTML = `${player1.name.toUpperCase()}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player2.name.toUpperCase()}</div><div class='col-2 modif'><div class ='encours'> </div></div>`
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
                    pasajoutdiv.innerHTML = `${player2.name.toUpperCase()}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player1.name.toUpperCase()}</div><div class='col-2 modif'><div class ='encours pl-1'> </div></div>`
                }
                else{
                    pasajoutdiv.innerHTML = `${player1.name.toUpperCase()}`
                    ajoutdiv.innerHTML = `<div class="col-10 container-fluid">${player2.name.toUpperCase()}</div><div class='col-2 modif'><div class ='encours pl-1'> </div></div>`
                }
            }
        }, 500);
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
                let fix=true
                if(player1.getround()==0){
                    fix=false
                }
                tour = this.hold(player1,tour)
                if(fix){
                    this.statutsjoueur(player1,player2,tour,false,true)
                }
            }
            else{
                let fix=true
                if(player2.getround()==0){
                    fix=false
                }
                tour = this.hold(player2,tour)
                if(fix){
                    this.statutsjoueur(player1,player2,tour,false,true)
                }
            }
        })
    
    }

    getGagnant(){
        return this.gagnant
    }

    setGagnant(player){
        this.gagnant = player
    }

    finpartie(player){
        setTimeout(() => {
            player.setnewGlobal(player.getround())
            alert("Le vainqueur de la partie est: "+player.name+" avec "+ player.getglobal() +" points")
            this.setGagnant(player)
            setTimeout(() => {
                location.reload()
            }, 2000);
        }, 1600);
    }

}

function tourneDe(num) {
    const de = document.getElementById("de");
    de.style.animation = "roll 1.6s ease";
    setTimeout(() => {
        de.innerHTML = affichede(num)
        de.style.animation = "none";
    }, 1500);
}

function affichede(valeur){
    switch(valeur){
        case 1 : return '<div class="shadow-lg point">  </div>';
        case 2 : return `<div class="row row-cols-2 h-100 align-items-center w-100 m-0">
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        </div>`;
        case 3 : return `<div class="row row-cols-3 h-100 align-items-center w-100 m-0">
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        </div>`;
        case 4 : return `<div class="row row-cols-3 h-100 align-items-center w-100 m-0">
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        </div>`;
        case 5 : return `<div class="row row-cols-3 h-100 align-items-center w-100 m-0">
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        </div>`;
        case 6 : return `<div class="row row-cols-3 h-100 align-items-center w-100 m-0">
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        <div class="col p-0"></div>
        <div class="col p-0"><div class="shadow-lg point">  </div></div>
        </div>`;
    }
}