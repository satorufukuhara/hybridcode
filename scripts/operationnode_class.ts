import {nodeList, InputArea, InputPin, OutputPin, TextArea, OutputArea} from "./index.js";

//let newNode = new OperationNode();
export class OperationNode{
    DOM:HTMLDivElement;
    inputPinList:Array<InputPin>;
    outputPinList:Array<OutputPin>;
    id:string;
    constructor(){
        this.DOM = document.createElement("div");
        globalThis.nodeArray.push(this);
        this.inputPinList = [];//initialize
        this.outputPinList = [];

        let elementID = "node"+ String(globalThis.nodeCounter);
        this.id = elementID;
        this.DOM.id = elementID;
        this.DOM.className = 'node-operation';

        nodeList.appendChild(this.DOM);

        globalThis.nodeCounter +=  1;
        console.log(elementID);

        new InputArea(this);
        new TextArea(this);
        new OutputArea(this);
        console.log('nodeArray =' + globalThis.nodeArray);
        
    }
}
