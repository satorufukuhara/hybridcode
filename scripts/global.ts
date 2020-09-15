import { Planet,generateCode,GeneralBigPot,OperationPot, BigPot} from './index.js'

let planet = new Planet;
console.log('code_started');
document.getElementById("addNodeBtn").addEventListener('click', e => {addOperationPot(planet)});
document.getElementById("addBigPotBtn").addEventListener('click', e => {addBigPot(planet)});
document.getElementById("generateCodeBtn").addEventListener('click', e=>{generateCode(planet)});

export function addOperationPot(main:GeneralBigPot){ 
    new OperationPot(main);
    console.log('create node');
}

export function addBigPot(main:GeneralBigPot){ 
    new BigPot(main);
    console.log('create node');
}