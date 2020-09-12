import { MainFunctionClass, InputPin, OutputPin, TextArea } from "./index.js";
import { OperationNode } from "./operationnode_class";

export function generateCode(main:MainFunctionClass){
    console.log('start generate code');
    let generated_text = main.generatedText;//not simple string but pointer for string
    let node_list:{[key: string]: SimpleInOutList;} = {};
    for (let node_key in main.nodeList){
        //console.log('node list ='+ node_key);
        node_list[node_key] = new SimpleInOutList(main, node_key);
        console.log('created' + node_key+' '+node_list[node_key].inputlist);
    }
    console.log('node list created');
    

    while(Object.keys(node_list).length != 0 ){
        console.log(Object.keys(node_list).length);
        for(let nodeid in node_list){
            let node = node_list[nodeid];
            console.log(node.inputlist);
            if(node.inputlist.length===0){
                console.log('generate from '+nodeid);
                generateCodeOfThisNode(node, node_list);
            }
        }
    }

    //output text
    let outputarea = <HTMLTextAreaElement> document.getElementById("generatedCode")
    outputarea.value = main.generatedText
    console.log('generated_text = \n' + main.generatedText );

    //Clear Stored Text
    main.generatedText = '';

}

class SimpleInOutList{
    inputlist:string[]; // list of node id come in 
    outputlist:string[]; //list of node id go out
    key: string;//node0, node1 etc...
    main:MainFunctionClass;
    constructor(main:MainFunctionClass, node_key){
        this.inputlist = [];
        this.outputlist = [];
        this.key = node_key;
        this.main = main;
        let input: {[key: string]: InputPin;} = main.nodeList[node_key].inputPinList;
        for( let i in input){
            let outputpins = input[i].connectList;
            for(let pin in outputpins){
                this.inputlist.push(outputpins[pin].node.id); //Id of Node
            }
        }
        let output: {[key: string]: OutputPin;} = main.nodeList[node_key].outputPinList;
        for( let i in output){
            let inputpins = output[i].connectList;
            for(let pin in inputpins){
                this.outputlist.push(inputpins[pin].node.id);
            }
        }
    }
}



function generateCodeOfThisNode(node:SimpleInOutList, node_list:{[key: string]: SimpleInOutList;}){
    //1. write header "function(a,b){ "
    node.main.generatedText += 'function(){\n';
    //2. main Code
    //console.log(node.key+'text');
    let textDOM = <HTMLTextAreaElement> document.getElementById(node.key+'text');
    node.main.generatedText += textDOM.value + '\n';
    //console.log('function text = ' + textDOM.value + '\n');
    //console.log('text come here');   // getText.print
    //3. write footer " }"
    node.main.generatedText += '}\n';
    //3. remove This node from InputList of Other Nodes
    for(let index in node.outputlist){
        let nodeid = node.outputlist[index];
        console.log('no more dependency from this node in ' + nodeid); //
        
        console.log('delete '+ node.key + ' from ' + node_list[nodeid].inputlist );
        node_list[nodeid].inputlist = deleteTargetFromList(node_list[nodeid].inputlist, node.key); //inputlist=node0_0  node.key =node0
        
        console.log('remaining dependency = ' + node_list[nodeid].inputlist);
    }
    //4. delete This node from NodeList
    console.log('finish '+node.key);
    delete　node_list[node.key];
    
}

function deleteTargetFromList(list:string[], target:string){
    //return  list.filter( element => element.slice(0,target.length) != target ); // node0_0 is pin of node0
    return  list.filter( element => element != target ); // node0_0 is pin of node0
}