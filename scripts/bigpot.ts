import {GeneralBigPot,InputArea, OutputArea,CodeAreaForBigPot, OutputAreaForBigPot} from './index.js'

export class BigPot extends GeneralBigPot{
    nameDOM:HTMLTextAreaElement;
    parent:BigPot;
    pot:BigPot;
    input:InputArea; //ForBigPot;
    output:OutputArea;
    constructor(garden:GeneralBigPot){
        super();
        this.parent = this; //BigPot root is itself. Similar as SmallPot
        this.pot = this;
        this.planet = garden.planet;
        this.garden = garden;
        this.DOM = document.createElement("div");
        this.DOM.className = 'big-pot';
        garden.DOM.appendChild(this.DOM);

        new InputArea(this);
        //new InputAreaForBigPot(this);
        //new TextArea(this);
        new CodeAreaForBigPot(this);
        new OutputArea(this);
    }
}