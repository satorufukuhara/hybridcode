import {drawEdge,InputPin,startFindPin,dragNode, OperationNode} from './index.js'


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
        this.DOM.className = 'node-operation__output';

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
        this.DOM.className = 'node-operation__output-title';
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
        this.DOM.className = 'node-operation__output-pinarea'
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
        this.DOM.className = 'node-operation__input-add';
        this.DOM.addEventListener('click', event =>{
            new OutputPin(parent);
        })
        parent.DOM.appendChild(this.DOM);
    };
}

export class OutputPin{
    DOM:HTMLDivElement;
    id:String;
    btn:OutputPinBtn
    connectList:Array<InputPin>;
    constructor(parent:OutputImmutablePinArea){
        this.DOM = document.createElement("div");
        this.DOM.dataset.list = 'none' //List of Connected Edge;
        this.connectList = [];
        this.DOM.className = 'node-operation__input-pin--immutable';
        this.id = parent.parent.parent.id+'_'+ String(globalThis.pinCounter);
        console.log('pinID =' + this.id)
        globalThis.pinCounter +=1;
        parent.DOM.appendChild(this.DOM);

        parent.parent.parent.outputPinList.push(this);

        this.btn = new OutputPinBtn(this);
    }
}

class OutputPinBtn{
    DOM:HTMLDivElement;
    parent:OutputPin;
    constructor(parent:OutputPin){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'node-operation__output-pin-button';
        parent.DOM.appendChild(this.DOM);

        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e,this.parent)});
    }
}