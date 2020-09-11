import { InputPin, OutputPin } from "./index.js";
import { clearEdgeOfNode } from "./drawedgeofnode.js";

export class DeletePinBtn{
    DOM:HTMLDivElement;
    parent:InputPin|OutputPin
    constructor(parent:InputPin|OutputPin){
        this.DOM = document.createElement("div");
        this.parent = parent;
        this.DOM.className = 'operation-node__delete-pin-btn'
        parent.DOM.appendChild(this.DOM);
        this.DOM.addEventListener('click', (e) => {deletePin(e,this.parent)});
    }
}

function deletePin(e, s: OutputPin|InputPin){
    s.connectList.forEach( (t:InputPin|OutputPin) =>{
        deleteConnectedEdge(s,t); //remove SVG DOM
        removeTargetFromList(t.connectList,s);
    });
    s.DOM.remove();

    //remove from In/Output Pin List
    console.log('inputpinlist(before=)'+s.parent.parent.parent.inputPinList);
    removeTargetFromList(s.parent.parent.parent.inputPinList, s);
    removeTargetFromList(s.parent.parent.parent.outputPinList,s);
    console.log('inputpinlist(sfter=)'+s.parent.parent.parent.inputPinList);
}

function deleteConnectedEdge(s: InputPin|OutputPin,t: InputPin|OutputPin){
    let s_to_t = document.getElementById(s.id+'_to_'+t.id);
    if(s_to_t){
        s_to_t.remove();
    }
    let t_to_s = document.getElementById(t.id+'_to_'+s.id);
    if(t_to_s){
        t_to_s.remove();
    }
}

export function removeTargetFromList(a, target){
    a = a.filter(
        function(v){
            return v!=target;
        }
    );
}