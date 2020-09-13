import {SmallPot,PotDivElement,PotTextElement, startFindPin,connectPins, dragNode,OutputPin} from './index.js'
import { DeletePinBtn, removeTargetFromList } from './deletepinbtn_class.js';

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
    constructor(parent:SmallPot){
        super(parent);
        let elementid = parent.id + "-input";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = 'operation-node__input-area';
        new InputTitle(this);
        new InputImmutablePinArea(this);
    }
}

class InputTitle extends PotDivElement{
    constructor(parent:InputArea){
        super(parent);
        this.DOM.appendChild(document.createTextNode("INPUT"));
        this.DOM.className = 'operation-node__input-title';
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.pot)} );
    }
}

class InputImmutablePinArea extends PotDivElement{
    constructor(parent:InputArea){
        super(parent);
        this.DOM.className = 'operation-node__input-pin-area--immutable'
        new AddInputBtn(this);
    }
}

class AddInputBtn extends PotDivElement{
    constructor(parent:InputImmutablePinArea){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'operation-node__add-input-btn';
        this.DOM.addEventListener('click', event =>{
            new InputPin(parent);
        })
    };
}

export class InputPin extends PotDivElement{
    btn:InputPinBtn;
    info: InputPinInfo;
    type: InputPinType;
    connectList: {[key:string]: OutputPin;};
    constructor(parent:InputImmutablePinArea){
        super(parent);
        this.DOM.className = 'operation-node__input-pin';
        this.connectList = {};
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
    constructor(parent:InputPin){
        super(parent);
        this.DOM.className = 'operation-node__input-pin-btn';
        this.DOM.addEventListener('mouseup',e =>{connectPins(e, parent)});
        this.DOM.addEventListener('mousedown', (e) => {startFindPin(e, parent)});
    }
}
class InputPinInfo extends PotDivElement{
    constructor(parent:InputPin){
        super(parent);
        this.DOM.className = 'operation-node__input-pin-info'
    }
}
class InputPinType extends PotDivElement{
    constructor(parent:InputPin){
        super(parent);
        this.DOM.className = 'operation-node__input-pin-type'
    }
}



