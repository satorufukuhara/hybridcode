import { InputArea } from "./inputarea_class";
import { OutputPin,InputPin } from "./index.js";

export function startFindPin(e, pin:InputPin|OutputPin){ //InputPin or OutputPin
    globalThis.dragStartX = e.pageX;
    globalThis.dragStartY = e.pageY;

    globalThis.edgeDrawing = true;
    //globalThis.startPinID = pin.parent.id;
    globalThis.tmpStartPin = pin;
    
    window.addEventListener('mouseup', e =>{
        globalThis.edgeDrawing = false;
        console.log('mouseup');
    });
}