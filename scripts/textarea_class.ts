import {OperationNode} from './index.js'
export class TextArea{
    DOM:HTMLTextAreaElement;
    parent:OperationNode;
    id:string;
    constructor(parent:OperationNode){
        this.DOM = document.createElement("textarea");
        this.parent = parent;
        //textform.width="100%";
        this.DOM.className = 'operation-node__text-area'
        this.DOM.rows = 5;
        this.id = parent.id + 'text';
        this.DOM.id = this.id;
        parent.DOM.appendChild(this.DOM);
    }
}