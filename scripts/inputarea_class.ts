import {drawEdge, dragNode, OperationNode, OutputPin} from './index.js'
import { drawEdgeOfNode, clearEdgeOfNode } from './drawedgeofnode.js';
import { DeletePinBtn, removeTargetFromList } from './deletpinbtn_class.js';

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
        this.DOM.className = 'operation-node__input-area';

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
        this.DOM.className = 'operation-node__input-title';
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
        this.DOM.className = 'operation-node__input-pin-area--immutable'
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
        this.DOM.className = 'operation-node__add-input-btn';
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
    info: InputPinInfo;
    connectList: {[key:string]: OutputPin;};
    constructor(parent:InputImmutablePinArea){
        this.parent = parent;
        this.DOM = document.createElement("div");
        //this.DOM.dataset.list = 'none' //List of Connected Edge;
        this.DOM.className = 'operation-node__input-pin';
        this.connectList = {};

        this.id = parent.parent.parent.id+'_'+ String(globalThis.pinCounter);
        console.log('pinID =' + this.id)
        globalThis.pinCounter +=1;

        parent.DOM.appendChild(this.DOM);
        //parent.parent.parent.inputPinList.push(this);
        parent.parent.parent.inputPinList[this.id]=this;

        console.log('inputPinList =' + globalThis.nodeArray[0].inputPinList);
        this.btn = new InputPinBtn(this);
        this.info = new InputPinInfo(this);
        new DeletePinBtn(this);
    }
}

class InputPinBtn{
    DOM:HTMLDivElement;
    parent:InputPin;
    constructor(parent:InputPin){
        this.parent = parent;
        this.DOM = document.createElement("div");
        this.DOM.className = 'operation-node__input-pin-btn';
        parent.DOM.appendChild(this.DOM);

        this.DOM.addEventListener('mouseup',e =>{
            if(globalThis.edgeDrawing === true){
                console.log("edge connected");
                //this.parent.DOM.dataset.list += ':'+ globalThis.startPinId;
                clearEdgeOfNode(this.parent.parent.parent.parent);
                let target = globalThis.tmpStartPin;
                this.parent.connectList[target.id] = target;
                target.connectList[this.parent.id] = this.parent; //record on OutputPin

                globalThis.edgeDrawing = false;
                drawEdgeOfNode(this.parent.parent.parent.parent);
                getInputVariable(globalThis.tmpStartPin,this.parent);
            }
        })

    }
}


class InputPinInfo{
    parent:InputPin;
    DOM:HTMLDivElement;
    constructor(parent:InputPin){
        this.parent = parent;
        this.DOM = document.createElement("div");
        //textform.width="100%";
        this.DOM.className = 'operation-node__input-pin-info'
        parent.DOM.appendChild(this.DOM);
    }
}

function getInputVariable(output:OutputPin,input:InputPin){
    let text = output.info.DOM.value;
    console.log(text);
    input.info.DOM.appendChild(document.createTextNode(text));
}
