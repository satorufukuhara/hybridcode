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
