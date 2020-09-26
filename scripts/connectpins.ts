import {InputPin, OutputPin,InputPinBtn, OutputPinBtn, drawEdgeOfNode, clearEdgeOfNode} from './index.js'

export function startFindPin(e, pinbtn:InputPinBtn|OutputPinBtn){ //InputPin or OutputPin
    


    pinbtn.garden.dragStartX = e.pageX;
    pinbtn.garden.dragStartY = e.pageY;

    pinbtn.garden.edgeDrawing = true;
    //globalThis.startPinID = pin.parent.id;
    pinbtn.garden.tmpStartPinBtn = pinbtn;
    
    window.addEventListener('mouseup', e =>{
        pinbtn.garden.edgeDrawing = false;
        console.log('mouseup');
    });
}

export function connectPins(e,terminal: InputPinBtn|OutputPinBtn){
    if(terminal.garden.edgeDrawing === true){
        console.log("edge connected");
        //this.parent.DOM.dataset.list += ':'+ globalThis.startPinId;
        clearEdgeOfNode(terminal.pot);
        let start = terminal.garden.tmpStartPinBtn;
        terminal.connectList[start.id] = start; //record on TerminalPin
        start.connectList[terminal.id] = terminal; //record on StartPin

        terminal.garden.edgeDrawing = false;
        drawEdgeOfNode(terminal.pot);
        setInputVariableFromOutput(start,terminal);
    }
}

function setInputVariableFromOutput(start:InputPinBtn|OutputPinBtn,terminal:OutputPinBtn|InputPinBtn){
    let input_pin;
    let output_pin;

    // start:input to terminal:output
    if(start instanceof InputPinBtn && terminal instanceof OutputPinBtn){
        input_pin = <InputPin> start.parent;
        output_pin = <OutputPin> terminal.parent;
    }
    // start:output to terminal:input
    else if(terminal instanceof InputPinBtn && start instanceof OutputPinBtn){
        input_pin = <InputPin> terminal.parent;
        output_pin = <OutputPin> start.parent;
    }

    let text = output_pin.info.DOM.value;
    let type = output_pin.type.DOM.value;
    input_pin.info.DOM.appendChild(document.createTextNode(text) );
    input_pin.type.DOM.appendChild(document.createTextNode(type) );
    // To Do: error handling of Input to Input
}

function startFindPin_edit(e, pinbtn:InputPinBtn|OutputPinBtn){
    // Activate EventListener for all pins of Target
    // Condition for target: 
    // 1. member of same garden
    // 2.

    // Activate Eventlistener
    for( let id in pinbtn.garden.pots){
        let pot = pinbtn.garden.pots[id];
        if(pinbtn instanceof InputPinBtn){
            for(let pin_id in pot.outputPinList){
                let target_pin = pot.outputPinList[pin_id];
                target_pin.btn.DOM.addEventListener('mouseup',e =>{connectPins(e, target_pin.btn)}); 
            }
        }else if(pinbtn instanceof OutputPinBtn){
            for(let pin_id in pot.inputPinList){
                let target_pin = pot.inputPinList[pin_id];
                target_pin.btn.DOM.addEventListener('mouseup',e =>{connectPins(e, target_pin.btn)}); 
            }
        }
    }
}