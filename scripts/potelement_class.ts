import {GeneralBigPot,Planet,Pot,SmallPot} from './index.js'
import { OperationPot } from './operation_pot.js';

export class PotElement{
    id:string;
    garden:GeneralBigPot;
    planet:Planet;
    pot:SmallPot;
    parent: PotElement|SmallPot;
    DOM:HTMLDivElement|HTMLTextAreaElement;
    constructor(parent:PotElement|SmallPot){
        this.parent = parent;
        this.pot = parent.pot;
        this.garden = parent.garden;
        this.planet = parent.planet;
    }
}

export class PotDivElement extends PotElement{
    DOM:HTMLDivElement;
    constructor(parent:PotElement|SmallPot){
        super(parent);
        this.DOM = document.createElement("div");
        parent.DOM.appendChild(this.DOM);
    }
}

export class PotTextElement extends PotElement{
    DOM:HTMLTextAreaElement;
    constructor(parent:PotElement|PotElement){
        super(parent);
        this.DOM = document.createElement("textarea");
        parent.DOM.appendChild(this.DOM);
    }
}

export class FunctionName extends PotDivElement{
    textarea:FunctionNameTextArea;
    constructor(parent:SmallPot){
        super(parent);
        this.DOM.className = 'operation-node__function-name';
        this.textarea= new FunctionNameTextArea(this);
    }
}

class FunctionNameTextArea extends PotTextElement{
    constructor(parent:FunctionName){
        super(parent);
        this.DOM.textContent = this.pot.id;
        //textform.width="100%";
        this.DOM.className = 'operation-node__function-name-text-area'
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