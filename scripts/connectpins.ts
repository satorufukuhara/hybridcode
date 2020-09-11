import {InputPin, OutputPin, InputPinBtn, OutputPinBtn, drawEdgeOfNode, clearEdgeOfNode} from './index.js'

export function startFindPin(e, pin:InputPin|OutputPin){ //InputPin or OutputPin
    pin.main.dragStartX = e.pageX;
    pin.main.dragStartY = e.pageY;

    pin.main.edgeDrawing = true;
    //globalThis.startPinID = pin.parent.id;
    pin.main.tmpStartPin = pin;
    
    window.addEventListener('mouseup', e =>{
        pin.main.edgeDrawing = false;
        console.log('mouseup');
    });
}

export function connectPins(e,terminalPinBtn: InputPinBtn|OutputPinBtn){
    let terminal = terminalPinBtn.parent;
    if(terminal.main.edgeDrawing === true){
        console.log("edge connected");
        //this.parent.DOM.dataset.list += ':'+ globalThis.startPinId;
        clearEdgeOfNode(terminal.parent.parent.parent);
        let start = terminal.main.tmpStartPin;
        terminal.connectList[start.id] = start; //record on TerminalPin
        start.connectList[terminal.id] = terminal; //record on StartPin

        terminal.main.edgeDrawing = false;
        drawEdgeOfNode(terminal.node);
        setInputVariableFromOutput(start,terminal);
    }
}

function setInputVariableFromOutput(start:InputPin|OutputPin,terminal:OutputPin|InputPin){
    if(start instanceof InputPin && terminal instanceof OutputPin){
        let text = terminal.info.DOM.value;
        start.info.DOM.appendChild(document.createTextNode(text) );
    }else if(terminal instanceof InputPin && start instanceof OutputPin){
        let text = start.info.DOM.value;
        terminal.info.DOM.appendChild(document.createTextNode(text) );
    }
    // To Do: error handling of Input to Input
}