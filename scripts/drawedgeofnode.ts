import {OperationNode,drawEdge,InputPin, OutputPin} from './index.js'
import { start } from 'repl'
import { clear } from 'console';

export function drawEdgeOfNode(target:OperationNode){
    //for every InputNode and OutputNode in target
    target.inputPinList.forEach((inPin,sindex) => {
        inPin.connectList.forEach( (outPin,tindex) => {
            drawEdgeBetweenPins(outPin, inPin);
        });
    });
    target.outputPinList.forEach((outPin,sindex) => {
        outPin.connectList.forEach( (inPin,tindex) => {
            drawEdgeBetweenPins(outPin,inPin);
        });
    });
}

export function drawEdgeBetweenPins(s:OutputPin,t:InputPin){
    let sPosition = s.btn.DOM.getBoundingClientRect();
    let tPosition = t.btn.DOM.getBoundingClientRect();
    let x1 = (sPosition.left + sPosition.right)/2 ;
    let y1 = (sPosition.top + sPosition.bottom)/2 ;
    let x2 = (tPosition.left + tPosition.right)/2 ;
    let y2 = (tPosition.top + tPosition.bottom)/2 ;
    let edgeName = s.id + '_to_' + t.id;
    drawEdge(x1,y1,x2,y2,edgeName);
    console.log('drawed '+edgeName);
}

export function clearEdgeOfNode(target:OperationNode){
    target.inputPinList.forEach((inPin,sindex) => {
        inPin.connectList.forEach( (outPin,tindex) => {
            document.getElementById(outPin.id+'_to_'+inPin.id).remove();
        });
    });
    target.outputPinList.forEach((outPin,sindex) => {
        outPin.connectList.forEach( (inPin,tindex) => {
            document.getElementById(outPin.id+'_to_'+inPin.id).remove();
        });
    });
}

export function redrawEdgeOfNode(target:OperationNode){
    clearEdgeOfNode(target);
    drawEdgeOfNode(target);
}