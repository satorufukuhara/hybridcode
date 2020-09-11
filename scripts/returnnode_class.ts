import {nodeList, InputArea, InputPin, OutputPin, TextArea, OutputArea} from "./index.js";

//let newNode = new OperationNode();
export class ReturnNode{
    DOM:HTMLDivElement;
    inputPinList:Array<InputPin>;
    outputPinList:Array<OutputPin>;
    id:string;
    constructor(){
        this.DOM = document.createElement("div");
        globalThis.nodeArray.push(this);
        this.inputPinList = [];//initialize
        this.outputPinList = [];

        let elementID = "return-node";
        this.id = elementID;
        this.DOM.id = elementID;
        this.DOM.className = 'operation-node';

        nodeList.appendChild(this.DOM);

        globalThis.nodeCounter +=  1;
        console.log(elementID);

        //new InputArea(this);
        //new TextArea(this);
        //new OutputArea(this);
        console.log('nodeArray =' + globalThis.nodeArray);
    }
}
