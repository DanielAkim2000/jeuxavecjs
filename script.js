let hold = document.getElementsByClassName("hold")
let roll = document.getElementsByClassName("roll")

$(document).ready(() =>{
    $('.divjoueur1').hide()
    $('.divjoueur2').hide()
    $('.afaire').hide()
    let playerarray = new Array()
    let game = new Array()
    let tour = true
    let player = $('.player')
    let i = -1
    let a = -2
    let b = -1
    $('.newgame').click(() => {
        if(i>=0){
            choix2 = confirm('Voulez vous mettre fin à la partie?')
            if(choix2){
                max = Math.max(playerarray[a].calculpendantmatch() , playerarray[b].calculpendantmatch() )
                if(playerarray[a].calculpendantmatch() == max)
                {
                    game[i].finpartie(playerarray[a],true)
                }
                else{
                    game[i].finpartie(playerarray[b],true)
                }
            } 
        }
        choix = confirm("Voulez vous commencer une nouvelle partie OK pour OUI et Annuler pour NON")
        if( choix){
            i++
            a+=2
            b+=2
            $('.divjoueur1').hide()
            $('.divjoueur2').hide()
            $('.afaire').hide()
            $('.newgame').hide()
            name1 = prompt("Nom du joueur numéro 1")
            name2 = prompt("Nom du joueur numéro 2")
            playerarray[a] = new Player(name1)
            playerarray[b] = new Player(name2)
            tour = true
            game[i] = new Game(false)
            game[i].statutsjoueur(playerarray[a],playerarray[b],tour,false,true)
            $('.divjoueur1').show(1500)
            $('.divjoueur2').show(1500)
            $('.newgame').html('<i class="fa-regular fa-circle-plus fa  p-0" style="color: #e32400;margin-right: 2%;"></i>')
            $('.newgame').show(1500)
            $('.afaire').show(1500)
            game[i].afficheGbobal(playerarray[a],tour)
            game[i].afficheGbobal(playerarray[b],!tour)
            game[i].afficheRoundActu(playerarray[a],tour,true,false)
            game[i].afficheRoundActu(playerarray[b],!tour,true,false)
            setTimeout(()=>{
                game[i].afficheJoueurEnCours(playerarray[a],tour,false,true)
            },1000)
            game[i].partie(playerarray[a],playerarray[b],tour)
        }

    })
    $('.info').click(()=>{
        alert(`Règles :
        Le jeu comprend 2 joueurs .
        Chaque joueur possède un score temporaire dans le rectangle ROUGE et un score GLOBAl.
        À chaque tour, le joueur peut lancer un dé autant de fois qu'il le souhaite. Le résultat d’un lancer est ajouté au score temporaire.
        Lors de son tour, le joueur peut décider à tout moment de:
        - Cliquer sur l’option “HOLD”, qui permet d’envoyer les points du score temporaire vers le score GLOBAL. Ce sera alors le tour de l’autre joueur.
        - S’il obtient un 1, son score temporaire est perdu et c’est la fin de son tour.
        Le premier joueur qui atteint les 100 points sur global gagne le jeu.
        BONNE CHANCE!!!
        `)
    })


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
    resetGlobal(){
        this.global = 0 
    }
    setName(name){
        this.name = name
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
    constructor(bool){
        this.gagnant= bool
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
        if(!this.gagnant){
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
                    this.finpartie(player,false)
                    this.gagnant = true
                }
                return tour
            }
        }
    }

    hold(player,tour){
        if(!this.gagnant){
            if(player.getround()!=0){
                player.setnewGlobal(player.getround())
                player.resetround()
                this.afficheGbobal(player,tour)
                this.afficheRoundActu(player,tour,true,false)
                this.afficheJoueurEnCours(player,!tour,false,true)
                return !tour
            }
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
        let verrouillage = false
        const gestionnaireClicHold = () => {
            if(tour){
                let fix=true
                if(player1.getround()==0){
                    fix=false
                }
                if(fix && player1!=null){
                    tour = this.hold(player1,tour)
                    this.statutsjoueur(player1,player2,tour,false,true)
                    
                }
                else{
                    fix=true
                }
            }
            else{
                let fix=true
                if(player2.getround()==0){
                    fix=false
                }
                if(fix && player2!=null){
                    tour = this.hold(player2,tour)
                    this.statutsjoueur(player1,player2,tour,false,true)
                }
                else{
                    fix=true
                }
            }
        }
        const gestionnaireClicRoll = () => {
            if(!verrouillage){
                verrouillage = true
                if(tour && player1!=null){
                    
                    tour = this.tour(player1,tour)
                    this.statutsjoueur(player1,player2,tour,true,false)
                }
                else if(player2!=null)
                {
                    
                    tour = this.tour(player2,tour)
                    this.statutsjoueur(player1,player2,tour,true,false)
                
                }
                setTimeout(() => {
                    verrouillage = false
                }, 1500)
            }
        }
        if(!this.getGagnant()){
            roll[0].addEventListener('click', gestionnaireClicRoll)
            hold[0].addEventListener('click', gestionnaireClicHold)
            console.log(this.getGagnant())
        }
        else{
            roll[0].removeEventListener('click', gestionnaireClicRoll)
            hold[0].removeEventListener('click', gestionnaireClicHold)
            console.log('event supp')
        }
    }

    getGagnant(){
        return this.gagnant
    }
    
    setGagnant(bool){
        this.gagnant = bool
    }

    finpartie(player,bool){
        if(bool == false ){
            setTimeout(() => {
                player.setnewGlobal(player.getround())
                alert("Le vainqueur de la partie est: "+player.name+" avec "+ player.getglobal() +" points")
                this.setGagnant(true)
            }, 1600) 
        }
        else{
            player.setnewGlobal(player.getround())
            alert("Le vainqueur de la partie est: "+player.name+" avec "+ player.getglobal() +" points")
            this.setGagnant(true)
        }
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
})