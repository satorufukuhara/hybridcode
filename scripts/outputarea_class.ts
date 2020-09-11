import {drawEdge,InputPin,startFindPin,dragNode, OperationNode} from './index.js'
import { DeletePinBtn } from './deletpinbtn_class.js';


export class OutputArea{
    DOM:HTMLDivElement;
    id:string;
    parent:OperationNode;
    constructor(parent:OperationNode){
        this.parent = parent;
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
    constructor(parent:OutputArea){
        this.parent = parent;
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
    constructor(parent:OutputArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__output-pin-area--immutable'
        new AddOutputBtn(this);
        parent.DOM.appendChild(this.DOM);
    }
}
class AddOutputBtn{
    DOM:HTMLDivElement;
    constructor(parent:OutputImmutablePinArea){
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
    constructor(parent:OutputImmutablePinArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.dataset.list = 'none' //List of Connected Edge;
        this.connectList = {};
        this.DOM.className = 'operation-node__output-pin';
        this.id = parent.parent.parent.id+'_'+ String(globalThis.pinCounter);
        console.log('pinID =' + this.id)
        globalThis.pinCounter +=1;
        parent.DOM.appendChild(this.DOM);

        //parent.parent.parent.outputPinList.push(this);
        parent.parent.parent.outputPinList[this.id]=this;

        this.btn = new OutputPinBtn(this);
        this.info = new OutputPinInfo(this);
        new DeletePinBtn(this);
    }
}

class OutputPinBtn{
    DOM:HTMLDivElement;
    parent:OutputPin;
    constructor(parent:OutputPin){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__output-pin-btn';
        parent.DOM.appendChild(this.DOM);

        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e,this.parent)});
    }
}

class OutputPinInfo{
    parent:OutputPin;
    DOM:HTMLTextAreaElement;
    constructor(parent:OutputPin){
        this.parent = parent;
        this.DOM = document.createElement("textarea");
        //textform.width="100%";
        this.DOM.className = 'operation-node__output-pin-info'
        this.DOM.rows = 1;
        parent.DOM.appendChild(this.DOM);
    }
}