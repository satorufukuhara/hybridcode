import {BigPot,InputPin,InputPinBtn,OutputPinBtn, InputPinInfo,InputPinType, SmallPot,PotDivElement,PotTextElement, startFindPin,connectPins, dragNode,OutputPin} from './index.js'
import { DeletePinBtn, removeTargetFromList } from './deletepinbtn_class.js';
import { } from './outputarea_class.js';

// OperationNode
// -- InputArea
//    -- InputTitle
//    -- InputImmutablePinArea
//       -- AddInputBtn
//       -- InputPin
//          -- InputPinBtn
// -- TextArea
// -- OutputArea

export class InputAreaForBigPot extends PotDivElement{
    constructor(parent:BigPot){
        super(parent);
        let elementid = parent.id + "-input";
        this.DOM.id = elementid;
        this.id = elementid;
        this.DOM.className = this.pot.DOM.className +'__input-area';
        new InputTitleForBigPot(this);
        new InputImmutablePinAreaForBigPot(this);
    }
}


class InputTitleForBigPot extends PotDivElement{
    constructor(parent:InputAreaForBigPot){
        super(parent);
        this.DOM.appendChild(document.createTextNode("INPUT"));
        this.DOM.className = 'big-pot__input-title';
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.pot)} );
    }
}

class InputImmutablePinAreaForBigPot extends PotDivElement{
    constructor(parent:InputAreaForBigPot){
        super(parent);
        this.DOM.className = 'big-pot__input-pin-area--immutable'
        new AddInputBtnForBigPot(this);
    }
}

class AddInputBtnForBigPot extends PotDivElement{
    constructor(parent:InputImmutablePinAreaForBigPot){
        super(parent);
        const btntext = document.createTextNode("+");
        this.DOM.appendChild(btntext);
        this.DOM.className = 'big-pot__add-input-btn';
        this.DOM.addEventListener('click', event =>{
            new InputPinForBigPot(parent);
        })
    };
}

export class InputPinForBigPot extends PotDivElement{
    btn:InputPinBtn;
    inbtn:OutputPinBtn;
    info: InputPinInfo;
    type: InputPinType;
    constructor(parent:InputImmutablePinAreaForBigPot){
        super(parent);
        this.DOM.className = 'big-pot__input-pin';

        this.id = this.pot.id+'_'+ String(this.planet.pinCounter);
        console.log('pinID =' + this.id)
        this.planet.pinCounter +=1;
        //parent.parent.parent.inputPinList.push(this);
        this.pot.inputPinList[this.id]=this;

        this.btn = new InputPinBtn(this);
        this.info = new InputPinInfo(this);
        this.type = new InputPinType(this);
        this.inbtn = new OutputPinBtn(this);
        new DeletePinBtn(this);
    }
}



