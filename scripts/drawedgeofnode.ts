import {OperationNode,drawEdge,InputPin, OutputPin} from './index.js'
import { start } from 'repl'
import { clear } from 'console';

export function drawEdgeOfNode(target:OperationNode){
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

export function clearEdgeOfNode(target:OperationNode){
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
        for(let pin_id in outPin.connectList){
            let inPin = outPin.connectList[pin_id];
            console.log('remove Edge '+outPin.id+'_to_'+inPin.id)
            document.getElementById(outPin.id+'_to_'+inPin.id).remove()
        }
    };
}

export function redrawEdgeOfNode(target:OperationNode){
    clearEdgeOfNode(target);
    drawEdgeOfNode(target);
}