import {SmallPot,BigPot,InputPinForBigPot, connectPins,InputPinBtn,startFindPin,dragNode,PinArea} from './index.js'
import { DeletePinBtn } from './deletepinbtn_class.js';
import { PotDivElement, PotTextElement } from './potelement_class.js';
import { OperationPot } from './operation_pot.js';



export class OutputArea extends PotDivElement{
    mutableTunnel: OutputMutableTunnelPinArea;
    mutable: OutputMutablePinArea;
    immutable: OutputImmutablePinArea;
    constructor(parent:SmallPot|BigPot){
        super(parent);
        let elementid = parent.id + "-output";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = 'output-area';
        new AddOutputPinBtns(this);
        this.mutableTunnel = new OutputMutableTunnelPinArea(this);
        this.mutable = new OutputMutablePinArea(this);
        this.immutable = new OutputImmutablePinArea(this);
    }
}

export class AddOutputPinBtns extends PotDivElement{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.className = 'output-area__add-output-pin-btns'
        new AddMutableOutputPinBtn(this);
        new AddImmutableOutputPinBtn(this);
    }
}

class AddMutableOutputPinBtn extends PotDivElement{
    constructor(parent:AddOutputPinBtns){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'output-area__add-output-btn';
        this.DOM.addEventListener('click', event =>{
            new OutputPin(this.pot.output.mutable);
        })
    };
}

class AddImmutableOutputPinBtn extends PotDivElement{
    constructor(parent:AddOutputPinBtns){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'output-area__add-output-btn';
        this.DOM.addEventListener('click', event =>{
            new OutputPin(this.pot.output.immutable);
        })
    };
}


class OutputMutableTunnelPinArea extends PinArea{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.className = 'output-area__pin-area--mutable-tunnel'
    }
}

class OutputMutablePinArea extends PinArea{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.className = 'output-area__pin-area--mutable'
    }
}

class OutputImmutablePinArea extends PinArea{
    constructor(parent:OutputArea){
        super(parent);
        this.DOM.className = 'output-area__pin-area--immutable'
    }
}


export class OutputPin extends PotDivElement{
    btn:OutputPinBtn
    info: OutputPinInfo;
    type: OutputPinType;
    constructor(parent:PinArea){
        super(parent);
        this.DOM.className = 'output-area__output-pin';
        this.id = this.pot.id+'_'+ String(this.planet.pinCounter);
        console.log('pinID =' + this.id)
        this.planet.pinCounter += 1;

        //parent.parent.parent.outputPinList.push(this);
        this.pot.outputPinList[this.id]=this;

        this.btn = new OutputPinBtn(this);
        this.info = new OutputPinInfo(this);
        this.type = new OutputPinType(this);
        new DeletePinBtn(this);
    }
}

export class OutputPinBtn extends PotDivElement{
    connectList: {[key:string]: InputPinBtn;};
    constructor(parent:OutputPin|InputPinForBigPot){
        super(parent);
        this.connectList = {};
        this.DOM.className = 'operation-node__output-pin-btn';
        //this.DOM.addEventListener('mouseup',e =>{connectPins(e, parent)}); //Want to activate by startFindPin
        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e,this)});
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

export class OutputAreaForBigPot extends OutputArea{
    constructor(parent:BigPot){
        super(parent);
    }
}