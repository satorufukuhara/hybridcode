import {InputArea, InputPin, OutputPin, TextArea, OutputArea} from "./index.js";
import { MainFunctionClass } from "./mainfunction.js";

//let newNode = new OperationNode();
export class OperationNode{
    DOM:HTMLDivElement;
    inputPinList : {[key: string]: InputPin;} //:Array<InputPin>;
    outputPinList: {[key: string]: OutputPin;}//:Array<OutputPin>;
    id:string;
    main:MainFunctionClass;
    constructor(main:MainFunctionClass){
        this.main = main;
        this.DOM = document.createElement("div");
        //globalThis.nodeArray.push(this);
        this.inputPinList = {};//initialize
        this.outputPinList = {};

        let elementID:string = "node"+ String(this.main.nodeCounter);
        this.id = elementID;
        this.DOM.id = elementID;
        this.DOM.className = 'operation-node';
        this.main.nodeList[this.id] = this;

        document.getElementById("nodeListDOM").appendChild(this.DOM);

        this.main.nodeCounter +=  1;
        console.log(elementID);

        new InputArea(this);
        new TextArea(this);
        new OutputArea(this);
    }
}
