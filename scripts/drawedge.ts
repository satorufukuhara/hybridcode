import {OperationPot,InputPin, OutputPin} from './index.js'

export function drawEdge(x1:number,y1:number,x2:number,y2:number, objectId:string){
    let svgarea = document.getElementById("svgArea");
    let svgOffsets = svgarea.getBoundingClientRect();
    //let svgEdge = document.createElement("svg");
    //svgEdge.id = objectId;
    let line1 = document.createElementNS('http://www.w3.org/2000/svg','line');
    line1.id = objectId;
    line1.setAttribute('x1', String(x1 - svgOffsets.left) );
    line1.setAttribute('y1', String(y1 - svgOffsets.top) );
    line1.setAttribute('x2', String(x2 - svgOffsets.left) );
    line1.setAttribute('y2', String(y2 - svgOffsets.top) );
    line1.setAttribute('stroke','#9CDCFE');
    svgarea.appendChild(line1);
}

export function drawEdgeOfNode(target:OperationPot){
    //for every InputNode and OutputNode in target
    for(let keys in target.inputPinList){
        let inPin = target.inputPinList[keys];

        for(let outpin_id in inPin.connectList){
            let outPin = inPin.connectList[outpin_id];
            drawEdgeBetweenPins(outPin, inPin);
        };
    };
    for(let keys in target.outputPinList){
        let outPin = target.outputPinList[keys];
        for(let inpin_id in outPin.connectList){
            let inPin = outPin.connectList[inpin_id];
            drawEdgeBetweenPins(outPin, inPin);
        };
    };
}

export function drawEdgeBetweenPins(s:OutputPin,t:InputPin){
    let sPosition = s.btn.DOM.getBoundingClientRect();
    let tPosition = t.btn.DOM.getBoundingClientRect();
    let x1 = (sPosition.left + sPosition.right)/2 ;
    let y1 = (sPosition.top + sPosition.bottom)/2 ;
    let x2 = (tPosition.left + tPosition.right)/2 ;
    let y2 = (tPosition.top + tPosition.bottom)/2 ;
    let edgeName = s.id + '_to_' + t.id;
    
    //clear edge If exist
    let previous_line = document.getElementById(edgeName);
    if(previous_line){
        console.log('line exists');
        previous_line.remove();
    }

    drawEdge(x1,y1,x2,y2,edgeName);
    console.log('drawed '+edgeName);
}

export function clearEdgeOfNode(target:OperationPot){
    console.log('clear edge when start drag');
    console.log(target.outputPinList);
    for(let keys in target.inputPinList){
        let inPin = target.inputPinList[keys];
        for(let pin_id in inPin.connectList){
            let outPin = inPin.connectList[pin_id];
            console.log('remove Edge '+outPin.id+'_to_'+inPin.id)
            document.getElementById(outPin.id+'_to_'+inPin.id).remove()
        }
    };
    for(let keys in target.outputPinList){
        let outPin = target.outputPinList[keys];
        for(let inpin_id in outPin.connectList){
            console.log('connected pin = '+inpin_id);
            let inPin = outPin.connectList[inpin_id];
            console.log('remove Edge '+outPin.id+'_to_'+inPin.id)
            document.getElementById(outPin.id+'_to_'+inPin.id).remove()
        }
    };
}