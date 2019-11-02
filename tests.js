#!/usr/bin/env node

//demarrage//

var ev3dev = require('ev3dev-lang');
console.log("Ready !");


//Création des moteurs//

var mRailGauche = new ev3dev.MediumMotor(ev3dev.OUTPUT_A);
var mRailDroit = new ev3dev.MediumMotor(ev3dev.OUTPUT_B);

//Blocage des moteurs//

mRailGauche.setStopAction('hold');
mRailDroit.setStopAction('hold');
mRailGauche.reset();
mRailDroit.reset();

//Variables globales
var distanceBaseY = 240;
var distanceLigne = 220;
var distanceColonne = 210;
var distanceFinaleX = 0;
var distanceFinaleY = 0;
var piecesArray = ['', '', '', '', '', '', '', '', ''];


function runTo(position, speedRail) {

    switch (position[1]) {
        case 0:
            distanceFinaleY = distanceBaseY;
            break;
        case 1:
            distanceFinaleY = distanceBaseY + distanceLigne;
            break;
        case 2:
            distanceFinaleY = distanceBaseY + 2 * distanceLigne;
            break;
    }
    
    mRailGauche.runToPosition(distanceFinaleY, speedRail);
    mRailDroit.runToPosition(-distanceFinaleY, speedRail);  // (-) car ce moteur tourne dans l'autre sens
/*     mRailGauche.reset();
    mRailDroit.reset(); */

    console.log(distanceFinaleY, speedRail);

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
    mRailGauche.runToPosition(-distanceFinaleY, 500);
    mRailDroit.runToPosition(distanceFinaleY, 500);
   // mRailPince.runTo(-distanceFinaleX);
    //mRailPince.reset();
}

runTo(getPosition(8), 500);
setTimeout(function(){
    returnHome();
}, 5000);


console.log('Move finish');