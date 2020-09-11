import {OperationNode, OutputPin, InputPin} from './index.js'

export class MainFunctionClass{
    startPinID:string;
    tmpStartPin:OutputPin|InputPin;
    nodeCounter:number;
    pinCounter:number;
    edgeDrawing:boolean;
    dragStartX:number;
    dragStartY:number;
    nodeList : {[key: string]: OperationNode;}
    constructor(){
        this.edgeDrawing = false;
        this.startPinID = 'Null';
        this.nodeCounter = 0;
        this.pinCounter = 0;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.nodeList = {};

        document.getElementById("addNodeBtn").addEventListener('click', e => {addOperationNode(this)});
        document.getElementById("generateCodeBtn").addEventListener('click', e=>{generateCode(this)});
    }
}

export function addOperationNode(main){
    new OperationNode(main);
    console.log('create node');
}

function generateCode(main){
    for (let keys in main.nodeList){
        console.log(keys);
    }
}