import {connectPins,InputPin,startFindPin,dragNode, OperationNode} from './index.js'
import { DeletePinBtn } from './deletpinbtn_class.js';
import { MainFunctionClass } from './mainfunction.js';


export class OutputArea{
    DOM:HTMLDivElement;
    id:string;
    parent:OperationNode;
    main:MainFunctionClass;
    constructor(parent:OperationNode){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        let elementid = parent.id + "-output";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = 'operation-node__output-area';

        parent.DOM.appendChild(this.DOM);

        new OutputTitle(this);
        new OutputImmutablePinArea(this);
    }
}

class OutputTitle{
    DOM:HTMLDivElement;
    parent:OutputArea;
    main: MainFunctionClass;
    constructor(parent:OutputArea){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        this.DOM.appendChild(document.createTextNode("OUTPUT"));
        //this.DOM.id = inputId+"-title";
        this.DOM.className = 'operation-node__output-title';
        parent.DOM.appendChild(this.DOM);
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.parent.parent)} );
    }
}

class OutputImmutablePinArea{
    DOM:HTMLDivElement;
    parent:OutputArea;
    main:MainFunctionClass;
    constructor(parent:OutputArea){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__output-pin-area--immutable'
        new AddOutputBtn(this);
        parent.DOM.appendChild(this.DOM);
    }
}
class AddOutputBtn{
    DOM:HTMLDivElement;
    parent:OutputImmutablePinArea;
    main: MainFunctionClass;
    constructor(parent:OutputImmutablePinArea){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'operation-node__add-output-btn';
        this.DOM.addEventListener('click', event =>{
            new OutputPin(parent);
        })
        parent.DOM.appendChild(this.DOM);
    };
}

export class OutputPin{
    DOM:HTMLDivElement;
    id: string;
    btn:OutputPinBtn
    connectList: {[key:string]: InputPin;};
    info: OutputPinInfo;
    parent: OutputImmutablePinArea;
    main: MainFunctionClass;
    node: OperationNode;
    constructor(parent:OutputImmutablePinArea){
        this.parent = parent;
        this.node = this.parent.parent.parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        this.DOM.dataset.list = 'none' //List of Connected Edge;
        this.connectList = {};
        this.DOM.className = 'operation-node__output-pin';
        this.id = parent.parent.parent.id+'_'+ String(this.main.pinCounter);
        console.log('pinID =' + this.id)
        this.main.pinCounter += 1;
        parent.DOM.appendChild(this.DOM);

        //parent.parent.parent.outputPinList.push(this);
        parent.parent.parent.outputPinList[this.id]=this;

        this.btn = new OutputPinBtn(this);
        this.info = new OutputPinInfo(this);
        new DeletePinBtn(this);
    }
}

export class OutputPinBtn{
    DOM:HTMLDivElement;
    parent:OutputPin;
    main:MainFunctionClass;
    constructor(parent:OutputPin){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__output-pin-btn';
        parent.DOM.appendChild(this.DOM);

        this.DOM.addEventListener('mouseup',e =>{connectPins(e,this)});
        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e,this.parent)});
    }
}

class OutputPinInfo{
    parent:OutputPin;
    DOM:HTMLTextAreaElement;
    main:MainFunctionClass;
    constructor(parent:OutputPin){
        this.parent = parent;
        this.main = parent.main;
        this.DOM = document.createElement("textarea");
        //textform.width="100%";
        this.DOM.className = 'operation-node__output-pin-info'
        this.DOM.rows = 1;
        parent.DOM.appendChild(this.DOM);
    }
}