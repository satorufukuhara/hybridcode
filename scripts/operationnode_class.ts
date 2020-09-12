import {InputArea, InputPin, OutputPin, TextArea, OutputArea} from "./index.js";
import { MainFunctionClass } from "./mainfunction.js";
import { threadId } from "worker_threads";

//let newNode = new OperationNode();
export class OperationNode{
    DOM:HTMLDivElement;
    inputPinList : {[key: string]: InputPin;} //:Array<InputPin>;
    outputPinList: {[key: string]: OutputPin;}//:Array<OutputPin>;
    id:string;
    main:MainFunctionClass;
    nameDOM:HTMLTextAreaElement;
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

        new FunctionName(this);
        new InputArea(this);
        new TextArea(this);
        new OutputArea(this);
    }
}

export class FunctionName{
    parent:OperationNode;
    DOM:HTMLDivElement;
    main:MainFunctionClass;
    textarea:FunctionNameTextArea;
    constructor(parent:OperationNode){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__function-name';


        parent.DOM.appendChild(this.DOM);

        this.textarea= new FunctionNameTextArea(this);
    }
}

class FunctionNameTextArea{
    parent:FunctionName;
    DOM:HTMLTextAreaElement;
    main:MainFunctionClass;
    id:string;
    constructor(parent:FunctionName){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("textarea");
        this.DOM.textContent = parent.parent.id;
        //textform.width="100%";
        this.DOM.className = 'operation-node__function-name-text-area'
        this.id = parent.parent.id+'_name';
        this.DOM.id = parent.parent.id+'_name';
        this.DOM.rows = 1;
        parent.DOM.appendChild(this.DOM);
        parent.parent.nameDOM = this.DOM;
    }
}