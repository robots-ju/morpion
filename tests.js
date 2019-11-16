#!/usr/bin/env node

//demarrage//

var ev3dev = require('ev3dev-lang');
var Promise = require('promise-polyfill');
console.log(Promise);
console.log("Ready !");


//Création des moteurs//

var mRailGauche = new ev3dev.MediumMotor(ev3dev.OUTPUT_A);
console.log('Moteur A ok !');
var mRailDroit = new ev3dev.MediumMotor(ev3dev.OUTPUT_B);
console.log('Moteur B ok !');
var mRailPince = new ev3dev.MediumMotor(ev3dev.OUTPUT_C);
console.log('Moteur C ok !');
var mPince = new ev3dev.MediumMotor(ev3dev.OUTPUT_D);
var capteurCouleurPieces = new ev3dev.ColorSensor(ev3dev.INPUT_1);

//Blocage des moteurs//

mRailGauche.setStopAction('coast');
mRailDroit.setStopAction('coast');
mRailPince.setStopAction('coast');
mPince.setStopAction('brake');
mRailPince.reset();
mRailGauche.reset();
mRailDroit.reset();
mPince.reset();
mPince.runToPosition(-50, 500);

//Variables globales
var distanceBaseY = 200;
var distanceLigne = 220;
var distanceColonne = 1650;
var distanceFinaleX = 0;
var distanceFinaleY = 0;
var piecesArray = ['', 'X', 'O', '', 'X', 'O', '', '', ''];


function runTo(position, speedRail, withBase) {


    switch (position[0]) {
        case 0:
            distanceFinaleX = 0;
            break;
        case 1:
            distanceFinaleX = distanceColonne;
            break;
        case 2:
            distanceFinaleX = 2 * distanceColonne;
            break;
    }

    mRailPince.runToPosition(-distanceFinaleX, 600);

    switch (position[1]) {
        case 0:
            distanceFinaleY = 0;
            break;
        case 1:
            distanceFinaleY = distanceLigne;
            break;
        case 2:
            distanceFinaleY = 2 * distanceLigne;
            break;
    }
     
    if(withBase) {
        distanceFinaleY += distanceBaseY;
        console.log('Ajout de la base !!');
    }

    console.log('La position finale pour les moteurs des rails est de : ' + distanceFinaleY);
    mRailGauche.runToPosition(distanceFinaleY, speedRail);
    mRailDroit.runToPosition(-distanceFinaleY, speedRail);  // (-) car ce moteur tourne dans l'autre sens
    /*     mRailGauche.reset();
        mRailDroit.reset(); */


    //mA.runToPosition(distanceFinaleY, speed);
    //mB.runToPosition(-distanceFinaleY, speed);

}

function getPosition(caseNumber) {
    switch (caseNumber) {
        case 0: return [0, 0]
        case 1: return [1, 0]
        case 2: return [2, 0]
        case 3: return [0, 1]
        case 4: return [1, 1]
        case 5: return [2, 1]
        case 6: return [0, 2]
        case 7: return [1, 2]
        case 8: return [2, 2]
        default: "erreur"
    }
}

function returnHome() {
    return new Promise(function(resolve, reject){
        mRailGauche.runToPosition(0, 500);
        mRailDroit.runToPosition(0, 500);
        mRailPince.runToPosition(0, 600);
        setTimeout(function(){
            resolve();
        }, 5000)
    });
}

function getNewPiece () {
    var nombreCaseAVerifier = 0;
    piecesArray.forEach(function(piece, index){
        if(piece == '') {
            console.log('Pas de pièce dans la case: ' + index);
            setTimeout(function(){
                runTo(getPosition(index), 500, false); 
                setTimeout(function(){
                    console.log('Je suis à la case: ' + index);
                    if(capteurCouleurPieces.color === 5) {
                        console.log('La pièce à l\'emplacement: ' + index + 'est ')
                        piecesArray[index] = 'X';
                    } 
                }, 5000);               
            }, 7500 * nombreCaseAVerifier);
            nombreCaseAVerifier++;
        }
    });
    setTimeout(function(){
        returnHome();
    }, 7500 * nombreCaseAVerifier);
}

runTo(getPosition(4), 500, true);

setTimeout(function(){
    returnHome().then(function(){
        console.log('getNewPiece appelé !!');
        getNewPiece();
    })
}, 5000);



console.log('Move finish');
