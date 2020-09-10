import {drawEdge, dragNode, OperationNode, OutputPin} from './index.js'
import { drawEdgeOfNode, clearEdgeOfNode } from './drawedgeofnode.js';

// OperationNode
// -- InputArea
//    -- InputTitle
//    -- InputImmutablePinArea
//       -- AddInputBtn
//       -- InputPin
//          -- InputPinBtn
// -- TextArea
// -- OutputArea

export class InputArea{
    DOM:HTMLDivElement;
    id:string;
    parent:OperationNode;
    constructor(parent:OperationNode){
        this.parent = parent;
        this.DOM = document.createElement("div");
        let elementid = parent.id + "-input";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = 'node-operation__input';

        parent.DOM.appendChild(this.DOM);

        new InputTitle(this);
        new InputImmutablePinArea(this);
    }
}

class InputTitle{
    DOM:HTMLDivElement;
    parent:InputArea;
    constructor(parent:InputArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.appendChild(document.createTextNode("INPUT"));
        //this.DOM.id = inputId+"-title";
        this.DOM.className = 'node-operation__input-title';
        parent.DOM.appendChild(this.DOM);
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.parent.parent)} );
    }
}

class InputImmutablePinArea{
    DOM:HTMLDivElement;
    parent:InputArea;
    constructor(parent:InputArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'node-operation__input-pinarea'
        parent.DOM.appendChild(this.DOM);
        new AddInputBtn(this);
    }
}

class AddInputBtn{
    DOM:HTMLDivElement;
    constructor(parent:InputImmutablePinArea){
        this.DOM = document.createElement("div");
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'node-operation__input-add';
        this.DOM.addEventListener('click', event =>{
            new InputPin(parent);
        })
        parent.DOM.appendChild(this.DOM);
    };
}

export class InputPin{
    parent:InputImmutablePinArea;
    DOM:HTMLDivElement;
    id:string;
    btn:InputPinBtn;
    connectList:Array<OutputPin>;
    constructor(parent:InputImmutablePinArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        //this.DOM.dataset.list = 'none' //List of Connected Edge;
        this.DOM.className = 'node-operation__input-pin--immutable';
        this.connectList = [];

        this.id = parent.parent.parent.id+'_'+ String(globalThis.pinCounter);
        console.log('pinID =' + this.id)
        globalThis.pinCounter +=1;

        parent.DOM.appendChild(this.DOM);
        parent.parent.parent.inputPinList.push(this);
        console.log('inputPinList =' + globalThis.nodeArray[0].inputPinList);
        this.btn = new InputPinBtn(this);
    }
}

class InputPinBtn{
    DOM:HTMLDivElement;
    parent:InputPin;
    constructor(parent:InputPin){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'node-operation__input-pin-button';
        parent.DOM.appendChild(this.DOM);

        this.DOM.addEventListener('mouseup',e =>{
            if(globalThis.edgeDrawing === true){
                console.log("edge connected");
                //this.parent.DOM.dataset.list += ':'+ globalThis.startPinId;
                clearEdgeOfNode(this.parent.parent.parent.parent);
                this.parent.connectList.push(globalThis.tmpStartPin);
                globalThis.tmpStartPin.connectList.push(this.parent); //record on OutputPin

                globalThis.edgeDrawing = false;
                
                drawEdgeOfNode(this.parent.parent.parent.parent);
                //drawEdge(globalThis.dragStartX, globalThis.dragStartY, e.pageX, e.pageY ,'testEdgeId');
                //console.log(inputPin.dataset.list.split(':'));
            }
        })

    }
}