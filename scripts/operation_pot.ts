import {FunctionName,SmallPot, InputArea, InputPin, OutputPin, TextArea, OutputArea} from "./index.js";
import { GeneralBigPot } from "./main_class.js";

//let newNode = new OperationNode();
export class OperationPot extends SmallPot{
    nameDOM:HTMLTextAreaElement;
    constructor(garden:GeneralBigPot){
        super(garden);
        console.log('created '+ this.id);
        this.DOM.className = 'operation-node';

        //new FunctionName(this);
        this.input = new InputArea(this);
        new TextArea(this);
        this.output = new OutputArea(this);
    }
}