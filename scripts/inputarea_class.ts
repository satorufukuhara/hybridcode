import {BigPot,SmallPot,PotDivElement,PotTextElement, startFindPin,connectPins, dragNode, OutputPin, OutputPinBtn,PinArea} from './index.js'
import { DeletePinBtn, FunctionName} from './index.js';

// OperationNode
// -- InputArea
//    -- InputTitle
//    -- InputImmutablePinArea
//       -- AddInputBtn
//       -- InputPin
//          -- InputPinBtn
// -- TextArea
// -- OutputArea

export class InputArea extends PotDivElement{
    mutableTunnel: InputMutableTunnelPinArea;
    immutable: InputImmutablePinArea;
    constructor(parent:SmallPot|BigPot){
        super(parent);
        let elementid = parent.id + "-input";
        this.DOM.id = elementid;
        this.id = elementid;
        //this.DOM.className = this.pot.DOM.className +'__input-area';
        this.DOM.className = 'input-area';
        new FunctionName(this);
        //new InputTitle(this);
        new AddInputPinBtns(this);
        this.mutableTunnel = new InputMutableTunnelPinArea(this);
        this.immutable = new InputImmutablePinArea(this);
    }
}

export class AddInputPinBtns extends PotDivElement{
    constructor(parent:InputArea){
        super(parent);
        this.DOM.className = 'input-area__add-input-pin-btns'
        new AddImmutableInputPinBtn(this);
        new AddMutableInputPinBtn(this);
    }
}

class InputMutableTunnelPinArea extends PinArea{
    constructor(parent:InputArea){
        super(parent);
        this.DOM.className = 'input-area__pin-area--mutable-tunnel'
        //new AddInputBtn(this);
    }
}

class InputImmutablePinArea extends PinArea{
    constructor(parent:InputArea){
        super(parent);
        this.DOM.className = 'input-area__pin-area--immutable'
        //new AddInputBtn(this);
    }
}


class AddImmutableInputPinBtn extends PotDivElement{
    constructor(parent:AddInputPinBtns){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'input-area__add-input-btn';
        this.DOM.addEventListener('click', event =>{
            new InputPin(this.pot.input.immutable);
        })

    };
}

class AddMutableInputPinBtn extends PotDivElement{
    constructor(parent:AddInputPinBtns){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'input-area__add-input-btn';
        this.DOM.addEventListener('click', event =>{
            new InputPin(this.pot.input.mutableTunnel);
        })
        this.DOM.addEventListener('click', event =>{
            new OutputPin(this.pot.output.mutableTunnel);
        })
    };
}

export class InputPin extends PotDivElement{
    btn:InputPinBtn;
    info: InputPinInfo;
    type: InputPinType;
    
    constructor(parent:PinArea){
        super(parent);
        this.DOM.className = 'input-area__input-pin';
        
        this.id = this.pot.id+'_'+ String(this.planet.pinCounter);
        console.log('pinID =' + this.id)
        this.planet.pinCounter +=1;
        //parent.parent.parent.inputPinList.push(this);
        this.pot.inputPinList[this.id]=this;

        this.btn = new InputPinBtn(this);
        this.info = new InputPinInfo(this);
        this.type = new InputPinType(this);
        new DeletePinBtn(this);
    }
}

export class InputPinBtn extends PotDivElement{
    connectList: {[key:string]: OutputPinBtn;};
    constructor(parent:InputPin){
        super(parent);
        this.connectList = {};
        this.DOM.className = 'input-area__input-pin-btn';
        this.DOM.addEventListener('mouseup',e =>{connectPins(e, this)});
        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e, this)});
    }
}
export class InputPinInfo extends PotDivElement{
    constructor(parent:InputPin){
        super(parent);
        this.DOM.className = 'input-area__input-pin-info'
    }
}
export class InputPinType extends PotDivElement{
    constructor(parent:InputPin){
        super(parent);
        this.DOM.className = 'input-area__input-pin-type'
    }
}



