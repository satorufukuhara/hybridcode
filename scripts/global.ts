import { Planet,generateCode,GeneralBigPot,OperationPot} from './index.js'

let planet = new Planet;
console.log('code_started');
document.getElementById("addNodeBtn").addEventListener('click', e => {addOperationPot(planet)});
document.getElementById("generateCodeBtn").addEventListener('click', e=>{generateCode(planet)});

export function addOperationPot(main:GeneralBigPot){ 
    new OperationPot(main);
    console.log('create node');
}