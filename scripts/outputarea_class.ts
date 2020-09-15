import {SmallPot,BigPot,connectPins,InputPin,startFindPin,dragNode} from './index.js'
import { DeletePinBtn } from './deletepinbtn_class.js';
import { PotDivElement, PotTextElement } from './potelement_class.js';
import { OperationPot } from './operation_pot.js';



export class OutputArea extends PotDivElement{
    constructor(parent:SmallPot|BigPot){
        super(parent);
        let elementid = parent.id + "-output";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = this.pot.DOM.className + '__output-area';

        new OutputTitle(this);
        new OutputImmutablePinArea(this);
    }
}

export class OutputAreaForBigPot extends OutputArea{
    constructor(parent:BigPot){
        super(parent);
    }
}
class OutputTitle extends PotDivElement{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.appendChild(document.createTextNode("OUTPUT"));
        this.DOM.className = 'operation-node__output-title';
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.pot)} );
    }
}

class OutputImmutablePinArea extends PotDivElement{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.className = 'operation-node__output-pin-area--immutable'
        new AddOutputBtn(this);
    }
}
class AddOutputBtn extends PotDivElement{
    constructor(parent:OutputImmutablePinArea){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'operation-node__add-output-btn';
        this.DOM.addEventListener('click', event =>{
            new OutputPin(parent);
        })
    };
}

export class OutputPin extends PotDivElement{
    btn:OutputPinBtn
    connectList: {[key:string]: InputPin;};
    info: OutputPinInfo;
    type: OutputPinType;
    constructor(parent:OutputImmutablePinArea){
        super(parent);
        this.connectList = {};
        this.DOM.className = 'operation-node__output-pin';
        this.id = parent.parent.parent.id+'_'+ String(this.planet.pinCounter);
        console.log('pinID =' + this.id)
        this.planet.pinCounter += 1;
        parent.DOM.appendChild(this.DOM);

        //parent.parent.parent.outputPinList.push(this);
        this.pot.outputPinList[this.id]=this;

        this.btn = new OutputPinBtn(this);
        this.info = new OutputPinInfo(this);
        this.type = new OutputPinType(this);
        new DeletePinBtn(this);
    }
}

export class OutputPinBtn extends PotDivElement{
    constructor(parent:OutputPin){
        super(parent);
        this.DOM.className = 'operation-node__output-pin-btn';

        this.DOM.addEventListener('mouseup',e =>{connectPins(e, parent)});
        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e,parent)});
    }
}

class OutputPinInfo extends PotTextElement{
    constructor(parent:OutputPin){
        super(parent);
        this.DOM.className = 'operation-node__output-pin-info'
        this.DOM.rows = 1;
        this.DOM.value = 'name';
    }
}

class OutputPinType extends PotTextElement{
    constructor(parent:OutputPin){
        super(parent);
        this.DOM.className = 'operation-node__output-pin-type'
        this.DOM.rows = 1;
        this.DOM.value = 'type';
    }
}