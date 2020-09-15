import {OperationPot,OutputPin, InputPin, generateCode,FunctionName,InputAreaForBigPot,CodeAreaForBigPot,OutputAreaForBigPot} from './index.js'
//1 Pot  - Small Pot 
//                -OperationPot
//       - GeneralBigPot - Planet
//                        - BigPot //Not Planet
// or
//2 Pot   - Planet
//       - NonPlanet  
//          - OperationPot
//          - BigPot

// Try to Code with 1


export class Pot{
    DOM:HTMLDivElement;
    inputPinList : {[key: string]: InputPin;} //:Array<InputPin>;
    outputPinList: {[key: string]: OutputPin;}//:Array<OutputPin>;
    planet: Planet;// Constructor Exist in each Child Class
    id: string;
    garden: GeneralBigPot;
    //pot: Pot;
    constructor(){
        //this.DOM = document.createElement("div");
        this.inputPinList = {};//initialize
        this.outputPinList = {};
        //this.pot = this;
    }
}

export class SmallPot extends Pot{
    nameDOM:HTMLTextAreaElement;
    pot:SmallPot;
    parent:SmallPot;
    constructor(garden:GeneralBigPot){
        super();
        this.DOM = document.createElement("div");
        this.parent = this; //Small Pot is root of "parent"
        this.garden = garden;
        this.planet = garden.planet;
        this.pot = this;

        let elementID:string = "node"+ String(this.planet.potCounter);
        this.planet.potCounter +=1;
        this.id = elementID;
        this.DOM.id = elementID;
        this.garden.DOM.appendChild(this.DOM);
        console.log('garden is '+this.garden.id);
        this.garden.pots[this.id] = this;
    }
}



export class GeneralBigPot extends Pot{
    edgeDrawing:boolean;
    startPinID:string;
    dragStartX:number;
    tmpStartPin:OutputPin|InputPin;
    dragStartY:number;
    planet:Planet;//Do not define here
    pots : {[key: string]: SmallPot;} //CHANGE TO "PotList" or "Pots", and allow GeneralPots
    constructor(){
        super();
        
        this.edgeDrawing = false;
        this.startPinID = 'Null';
        this.pots = {}; //have to initialize
    }
}

export class BigPot extends GeneralBigPot{
    nameDOM:HTMLTextAreaElement;
    parent:BigPot;
    pot:BigPot;
    constructor(garden:GeneralBigPot){
        super();
        this.parent = this; //BigPot root is itself. Similar as SmallPot
        this.pot = this;
        this.planet = garden.planet;
        this.garden = garden;
        this.DOM = document.createElement("div");
        this.DOM.className = 'big-pot';
        garden.DOM.appendChild(this.DOM);

        new FunctionName(this);
        new InputAreaForBigPot(this);
        //new TextArea(this);
        new CodeAreaForBigPot(this);
        new OutputAreaForBigPot(this);
    }
}
export class Planet extends GeneralBigPot{
    potCounter:number;
    pinCounter:number;
    generatedText :string;
    
    constructor(){
        super();
        this.garden = this;
        this.planet = this;
        this.id = 'codearea';

        this.potCounter = 0; //Only for PLANET
        this.pinCounter = 0; //Only for PLANET(note nesesarry)
        this.generatedText = '';//Only for PLANET(note nesesarry)
        this.DOM = <HTMLDivElement> document.getElementById('codearea');
        console.log('set codearea');
    }
}

