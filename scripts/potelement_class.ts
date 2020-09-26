import {dragNode,GeneralBigPot,Planet,BigPot,SmallPot,AddInputPinBtns,AddOutputPinBtns} from './index.js'
import { OperationPot } from './operation_pot.js';
import { InputArea } from './inputarea_class.js';
import { OutputArea } from './outputarea_class.js';

export class PotElement{
    id:string;
    garden:GeneralBigPot;
    planet:Planet;
    pot:SmallPot|BigPot;
    parent: PotElement|SmallPot|BigPot;
    DOM:HTMLDivElement|HTMLTextAreaElement;
    constructor(parent:PotElement|SmallPot|BigPot){
        this.parent = parent;
        this.pot = parent.pot;
        this.garden = parent.garden;
        this.planet = parent.planet;
    }
}

export class PotDivElement extends PotElement{
    DOM:HTMLDivElement;
    constructor(parent:PotElement|SmallPot|BigPot){
        super(parent);
        this.DOM = document.createElement("div");
        parent.DOM.appendChild(this.DOM);
    }
}

export class PinArea extends PotDivElement{
    constructor(parent:InputArea|OutputArea){
        super(parent);
    }
}


export class PotTextElement extends PotElement{
    DOM:HTMLTextAreaElement;
    constructor(parent:PotElement|PotElement|BigPot){
        super(parent);
        this.DOM = document.createElement("textarea");
        parent.DOM.appendChild(this.DOM);
    }
}


export class FunctionName extends PotDivElement{
    textarea:FunctionNameTextArea;
    constructor(parent:InputArea){
        super(parent);
        this.DOM.className = 'input-area__function-name';
        this.DOM.addEventListener('mousedown',(e) => { dragNode(e,this.pot)} );
        this.textarea= new FunctionNameTextArea(this);
    }
}

class FunctionNameTextArea extends PotTextElement{
    constructor(parent:FunctionName){
        super(parent);
        this.DOM.textContent = this.pot.id;
        //textform.width="100%";
        this.DOM.className = 'input-area__function-name-text-area'
        this.id = this.pot.id+'_name';
        this.DOM.id = this.pot.id+'_name';
        this.DOM.rows = 1;
        this.pot.nameDOM = this.DOM;
    }
}

export class TextArea extends PotTextElement{
    constructor(parent:OperationPot){
        super(parent);
        this.DOM.className = 'operation-node__text-area'
        this.DOM.rows = 5;
        this.id = parent.id + 'text';
        this.DOM.id = this.id;
    }
}

export class CodeAreaForBigPot extends PotDivElement{
    constructor(parent:BigPot){
        super(parent);
        this.DOM.className = 'big-pot__code-area'
        this.id = parent.id + 'codearea';
        this.DOM.id = this.id;

        new OperationPot(parent); //ToDo: make a UI to do this manually
    }
}