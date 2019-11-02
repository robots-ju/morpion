#!/usr/bin/env node

//demarrage//

var ev3dev = require('ev3dev-lang');
console.log("Ready !");


//Création des moteurs//

var mRailGauche = new ev3dev.MediumMotor(ev3dev.OUTPUT_A);
var mRailDroit = new ev3dev.MediumMotor(ev3dev.OUTPUT_B);
var mRailPince = new ev3dev.MediumMotor(ev3dev.OUTPUT_C);
var mPince = new ev3dev.MediumMotor(ev3dev.OUTPUT_D);

//Création des capteurs//

//var capteurCouleurPieces = new ev3dev.ColorSensor(ev3dev.INPUT_1);
//var capteurTouchStopPlayer = new ev3dev.TouchSensor(ev3dev.INPUT_2);

//Blocage des moteurs//

mRailGauche.setStopAction('brake');
mRailDroit.setStopAction('brake');
mRailPince.setStopAction('brake');
mPince.setStopAction('brake');
mRailGauche.reset();
mRailDroit.reset();
mRailPince.reset();
mPince.reset();

//Variables globales
let distanceBase = 135;
let distanceLigne = 210;
let distanceColonne = 0;
let distanceFinaleX = 0;
let distanceFinaleY = 0;
let piecesArray = ['', '', '', '', '', '', '', '', ''];

function runTo(position, speed) {

    //transformer position x en position moteur.
    switch (position[0]) {
        case 0:
            distanceFinaleX = distanceBase + 2 * distanceLigne;
            break;
        case 1:
            distanceFinaleX = distanceBase + distanceLigne;
        case 2:
            distanceFinaleX = distanceBase;
    }

    mRailPince.runToPosition(distanceFinaleX, speedRailPince);
    mRailPince.reset();

    console.log(distanceFinaleX);

    switch (position[1]) {
        case 0:
            distanceFinaleY = distanceBase;
            break;
        case 1:
            distanceFinaleY = distanceBase + distanceColonne;
        case 2:
            distanceFinaleY = distanceBase + 2 * distanceColonne;
    }
    
    mRailGauche(distanceFinaleY, speedRail);
    mRailDroit(-distanceFinaleY, speedRail);  // (-) car ce moteur tourne dans l'autre sens
    mRailGauche.reset();
    mRailDroit.reset();

    console.log(distanceFinaleY);

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
        case 5: return [1, 2]
        case 6: return [2, 0]
        case 7: return [2, 1]
        case 8: return [2, 2]
        default: "erreur"
    }
}

function returnHome() {
    mRailGauche.runTo(-distanceFinaleY);
    mRailDroit.runTo(distanceFinaleY);
    mRailPince.runTo(-distanceFinaleX);
    mRailGauche.reset();
    mRailDroit.reset();
    mRailPince.reset();
}

function putPiece() {
    mPince.runTo(/*ouverture*/);
    mPince.reset();
    mPince.runTo(/*-ouverutre*/);
}

function getNewPiece () {
    piecesArray.forEach((piece, index) => {
        if(piece == '') {
            runTo(getPosition(index), 500);
            if(capteurCouleurPieces.getValue('black')) {
                piecesArray[index] = 'X';
            }
        }
    })
}

function waitingForPlayer() {
    let playerIsPlaying = true;
    while(playerIsPlaying) {
        capteurTouchStopPlayer.isPressed ? playerIsPlaying = false : playerIsPlaying = true;
    }
}

while (true) {
    runTo(getPosition(5), 500);
    putPiece();
    returnHome();
    //waitingForPlayer();
    //getNewPiece();

}

console.log('fini !!');