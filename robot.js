// Robots-JU - Groupe-avancé - Morpion
// Programme de l'intélligence du robot
// Auteur: Morgan Chételat
// Source : https://fr.m.wikihow.com/gagner-au-morpion#Gagner-ou-faire-un-match-nul-en-jouant-en-premier


let pions = ['.', 'X', '.', 'O', '.', '.', '.', '.', '.'];
console.log(pions);

function intelligence_commence() {
    //Jouer dans un coin
    playPion(0);
    //SI le joueur joue au millieu
    if(pions[4] == 'X' && pions[8] == '') {
        playPion(8);
        attendreJoueurFinitJouer();

        //Si le joueur joue en bas à gauche alors mettre un pion en haut à droite
        if(pions[6] == 'X') {
            playPion(2);
            attendreJoueurFinitJouer();

            if(pions[1] == '') {
                playPion(1);
            } else if(pions[5] == '') {
                playPion(5);
            }
        }

        //Si le joueur joue en haut à droite alors mettre un pion en bas à gauche
        if(pions[2] == 'X') {
            playPion(6);
            attendreJoueurFinitJouer();

            if(pions[3] == '') {
                playPion(3);
            } else if(pions[7] == '') {
                playPion(7);
            }
        }
    }

     //Cas où le joueur ne pose pas le pion au millieu
    if(pions[4] == '') {
        if(pions[1] == 'X') {
            playPion(6);
            attendreJoueurFinitJouer();
        }
        if(pions[3] == 'X') {
            playPion(2);
            attendreJoueurFinitJouer();
        }
        if(pions[5] == 'X') {
            playPion(6);
            attendreJoueurFinitJouer();
        }
        if(pions[7] == 'X') {
            playPion(2);
            attendreJoueurFinitJouer();
        }
    }

    playPion(9);

}

//Evoie le position du pion à placer
function playPion(position){
    //Todo
}

//Attend que le joueur est fini de jouer
function attendreJoueurFinitJouer() {

}

console.log(coupPossible(pions));