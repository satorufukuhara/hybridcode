export class TextArea{
    DOM:HTMLTextAreaElement;
    constructor(ParentNode){
        this.DOM = document.createElement("textarea");
        //textform.width="100%";
        this.DOM.className = 'node-operation__text'
        this.DOM.rows = 5;
        ParentNode.DOM.appendChild(this.DOM);
    }
}