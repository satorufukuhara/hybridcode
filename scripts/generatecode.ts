import { MainFunctionClass, InputPin, OutputPin, TextArea } from "./index.js";
import { OperationNode } from "./operationnode_class";

// Goal
//--function definition
//fn five() -> i32 {5}
//fn two() -> i32 {2}
//fn add(a:i32, b:i32)->{a+b}
//-- execute main function
//fn main(){
//    let a = five();
//    let b = two();
//    let c = add(a + b);
//    println!("{}",c);
// }


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
    
    //Generate Function List
    for(let nodeid in node_list){
        generateFunction(node_list[nodeid], node_list);
    }
    main.generatedText += 'fn main(){\n';

    //Main code
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
    //Finish Code
    main.generatedText += '}';

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
    original:OperationNode;
    constructor(main:MainFunctionClass, node_key){
        this.inputlist = [];
        this.outputlist = [];
        this.key = node_key;
        this.main = main;
        this.original = main.nodeList[node_key];
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


function generateFunction(node:SimpleInOutList, node_list:{[key: string]: SimpleInOutList;}){
    //
    node.main.generatedText += 'fn '
    node.main.generatedText += node.original.nameDOM.value+' (';
    //Input
    let exist_input = 0;
    for(let key in node.original.inputPinList){
        let in_variable = node.original.inputPinList[key].info.DOM.textContent;
        if(in_variable!=''){ //<div id= ...info >text </div> //createTextNode(text)
            exist_input = 1;
            node.main.generatedText += in_variable  ;
            node.main.generatedText += ', ';
        }
    }
    if(exist_input){
        node.main.generatedText = node.main.generatedText.slice(0,-2); //delete ", "
    }

    node.main.generatedText += ') -> (';

    //Output
    let exist_output = 0;
    for(let key in node.original.outputPinList){
        exist_output = 1;
        node.main.generatedText += node.original.outputPinList[key].info.DOM.value ;
        node.main.generatedText += ', '
    }
    //"function(a,b){ "
    if(exist_output){
        node.main.generatedText = node.main.generatedText.slice(0,-2); //delete ", "
    }
    node.main.generatedText += '){\n';

    //main function
    let textDOM = <HTMLTextAreaElement> document.getElementById(node.key+'text');
    node.main.generatedText += textDOM.value + '\n';

    node.main.generatedText += '}\n';
}
function generateCodeOfThisNode(node:SimpleInOutList, node_list:{[key: string]: SimpleInOutList;}){
    //1. write header 
    // c, d = function(a,b){
    let exist_output = 0;
    node.main.generatedText += 'let '
    for(let key in node.original.outputPinList){
        exist_output = 1;
        node.main.generatedText += node.original.outputPinList[key].info.DOM.value;
        node.main.generatedText += ', '
    }
    //"function(a,b){ "
    if(exist_output){
        node.main.generatedText = node.main.generatedText.slice(0,-2); //delete ", "
        node.main.generatedText += ' = '
    }else{
        node.main.generatedText = node.main.generatedText.slice(0,-4); //delete "let "
    }

    node.main.generatedText += node.original.nameDOM.value+ '(';

    //Input variable
    let exist_input = 0;
    for(let key in node.original.inputPinList){
        let in_variable = node.original.inputPinList[key].info.DOM.textContent;
        if(in_variable!=''){ //<div id= ...info >text </div> //createTextNode(text)
            exist_input = 1;
            node.main.generatedText += in_variable  ;
            node.main.generatedText += ', ';
        }
    }

    if(exist_input){
        node.main.generatedText = node.main.generatedText.slice(0,-2); //delete ", "
    }
    node.main.generatedText += ');\n';


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