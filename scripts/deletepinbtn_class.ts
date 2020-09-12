import { InputPin, OutputPin } from "./index.js";

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
    for(let keys in s.connectList){
        let t = s.connectList[keys];
        deleteConnectedEdge(s,t) //remove SVG DOM if exists;
        delete t.connectList[s.id];
        s.DOM.remove();
    };
    

    //remove from In/Output Pin List
    //console.log('inputpinlist(before=)'+ Object.keys(s.parent.parent.parent.inputPinList));
    delete s.parent.parent.parent.inputPinList[s.id]
    delete s.parent.parent.parent.outputPinList[s.id]
    //console.log('inputpinlist(sfter=)'+Object.keys(s.parent.parent.parent.inputPinList));
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

//export function removeTargetFromDictionary(list, key_name){
//    delete list.key_name;
//}