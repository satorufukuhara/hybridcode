import { InputPin,OutputPin,InputPinBtn, OutputPinBtn } from "./index.js";

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
    for(let keys in s.btn.connectList){
        let t = s.btn.connectList[keys];
        deleteConnectedEdge(s.btn,t) //remove SVG DOM if exists;
        delete t.connectList[s.id];
        s.DOM.remove();
    };
    

    //remove from In/Output Pin List
    //console.log('inputpinlist(before=)'+ Object.keys(s.parent.parent.parent.inputPinList));
    delete s.pot.inputPinList[s.id]
    delete s.pot.outputPinList[s.id]
    //console.log('inputpinlist(sfter=)'+Object.keys(s.parent.parent.parent.inputPinList));
}

function deleteConnectedEdge(s: InputPinBtn|OutputPinBtn,t: InputPinBtn|OutputPinBtn){
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