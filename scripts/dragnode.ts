import { OperationPot } from "./index.js";
import { drawEdgeOfNode, clearEdgeOfNode } from "./drawedge.js";

export function dragNode(event,target:OperationPot){
        //const el = inputTitle
        clearEdgeOfNode(target);
        const el = target.DOM;

        console.log('start drag')//
        let dragArea = document.getElementById("codearea"); // if all, set as window
            //window.addEventListener('mousemove', mousemove);
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
            
        let prevX = event.pageX;
        let prevY = event.pageY;
        
        function mousemove(e){
            let diffX = e.pageX - prevX;
            let diffY = e.pageY - prevY;

            const rect = el.getBoundingClientRect();
            const bound = dragArea.getBoundingClientRect();
        
            el.style.left = Math.max(0, rect.left  + diffX - bound.left) + "px";
            //console.log(rect.left);
            el.style.top = (rect.top + diffY - bound.top) + "px";

            prevX = e.pageX;
            prevY = e.pageY;
        }
        function mouseup(){
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup)
            drawEdgeOfNode(target);
        }
    }