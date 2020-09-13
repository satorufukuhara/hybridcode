import {InputPin, OutputPin, drawEdgeOfNode, clearEdgeOfNode} from './index.js'

export function startFindPin(e, pin:InputPin|OutputPin){ //InputPin or OutputPin
    pin.garden.dragStartX = e.pageX;
    pin.garden.dragStartY = e.pageY;

    pin.garden.edgeDrawing = true;
    //globalThis.startPinID = pin.parent.id;
    pin.garden.tmpStartPin = pin;
    
    window.addEventListener('mouseup', e =>{
        pin.garden.edgeDrawing = false;
        console.log('mouseup');
    });
}

export function connectPins(e,terminal: InputPin|OutputPin){
    if(terminal.garden.edgeDrawing === true){
        console.log("edge connected");
        //this.parent.DOM.dataset.list += ':'+ globalThis.startPinId;
        clearEdgeOfNode(terminal.pot);
        let start = terminal.garden.tmpStartPin;
        terminal.connectList[start.id] = start; //record on TerminalPin
        start.connectList[terminal.id] = terminal; //record on StartPin

        terminal.garden.edgeDrawing = false;
        drawEdgeOfNode(terminal.pot);
        setInputVariableFromOutput(start,terminal);
    }
}

function setInputVariableFromOutput(start:InputPin|OutputPin,terminal:OutputPin|InputPin){
    if(start instanceof InputPin && terminal instanceof OutputPin){
        let text = terminal.info.DOM.value;
        let type = terminal.type.DOM.value;
        start.info.DOM.appendChild(document.createTextNode(text) );
        start.type.DOM.appendChild(document.createTextNode(type) );
    }else if(terminal instanceof InputPin && start instanceof OutputPin){
        let text = start.info.DOM.value;
        let type = start.type.DOM.value;
        terminal.info.DOM.appendChild(document.createTextNode(text) );
        terminal.type.DOM.appendChild(document.createTextNode(type) );
    }
    // To Do: error handling of Input to Input
}