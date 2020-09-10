import {addOperationNode, drawEdge} from './index.js';
import { threadId } from 'worker_threads';
import { OutputPin } from './outputarea_class.js';

export const nodeList = document.getElementById("nodeList");
document.getElementById("addNodeBtn").addEventListener('click', e => {addOperationNode()});
//document.getElementById("addNodeBtn").addEventListener('click', e => {console.log('clicked!!')});
console.log('code_started');

globalThis.edgeDrawing = false;
globalThis.dragStartX = 0;
globalThis.dragStartY = 0;

globalThis.number = 0;

//For Connecting Nodes (temporary pointer memo)
//tmpOutputPin
globalThis.startPinID = 'Null';
globalThis.nodeCounter = 0;
globalThis.pinCounter = 0;
globalThis.nodeArray = [];
globalThis.edgeArray = [];
console.log(globalThis.edgeDrawing);