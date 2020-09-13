import { Planet,InputPin, OutputPin, OperationPot,TextArea } from "./index.js";

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


export function generateCode(planet:Planet){
    console.log('start generate code');
    
    let node_list:{[key: string]: SimpleInOutList;} = {};
    for (let node_key in planet.pots){
        //console.log('node list ='+ node_key);
        node_list[node_key] = new SimpleInOutList(planet, node_key);
        console.log('created' + node_key+' '+node_list[node_key].inputlist);
    }
    console.log('node list created');
    
    //Generate Function List
    for(let nodeid in node_list){
        generateFunction(node_list[nodeid], node_list);
    }
    planet.generatedText += 'fn main(){\n';

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
    planet.generatedText += '}';

    //output text
    let outputarea = <HTMLTextAreaElement> document.getElementById("generatedCode")
    outputarea.value = planet.generatedText
    console.log('generated_text = \n' + planet.generatedText );

    //Clear Stored Text
    planet.generatedText = '';

}

class SimpleInOutList{
    inputlist:string[]; // list of node id come in 
    outputlist:string[]; //list of node id go out
    key: string;//node0, node1 etc...
    planet: Planet;
    original:OperationPot;
    constructor(planet: Planet, node_key){
        this.inputlist = [];
        this.outputlist = [];
        this.key = node_key;
        this.planet = planet;
        this.original = planet.pots[node_key];
        let input: {[key: string]: InputPin;} = planet.pots[node_key].inputPinList;
        for( let i in input){
            let outputpins = input[i].connectList;
            for(let pin in outputpins){
                this.inputlist.push(outputpins[pin].pot.id); //Id of Node
            }
        }
        let output: {[key: string]: OutputPin;} = planet.pots[node_key].outputPinList;
        for( let i in output){
            let inputpins = output[i].connectList;
            for(let pin in inputpins){
                this.outputlist.push(inputpins[pin].pot.id);
            }
        }
    }
}


function generateFunction(node:SimpleInOutList, node_list:{[key: string]: SimpleInOutList;}){
    //
    node.planet.generatedText += 'fn '
    node.planet.generatedText += node.original.nameDOM.value+' (';
    //Input
    let exist_input = 0;
    for(let key in node.original.inputPinList){
        let in_variable = node.original.inputPinList[key].info.DOM.textContent;
        let in_type = node.original.inputPinList[key].type.DOM.textContent;
        if(in_variable!=''){ //<div id= ...info >text </div> //createTextNode(text)
            exist_input = 1;
            node.planet.generatedText += in_variable + ":" +in_type ;
            node.planet.generatedText += ', ';
        }
    }
    if(exist_input){
        node.planet.generatedText = node.planet.generatedText.slice(0,-2); //delete ", "
    }

    node.planet.generatedText += ') -> (';

    //Output
    let exist_output = 0;
    for(let key in node.original.outputPinList){
        exist_output = 1;
        node.planet.generatedText += node.original.outputPinList[key].type.DOM.value ;
        node.planet.generatedText += ', '
    }
    //"function(a,b){ "
    if(exist_output){
        node.planet.generatedText = node.planet.generatedText.slice(0,-2); //delete ", "
    }
    node.planet.generatedText += '){\n';

    //main function
    let textDOM = <HTMLTextAreaElement> document.getElementById(node.key+'text');
    node.planet.generatedText += textDOM.value + '\n';

    node.planet.generatedText += '}\n';
}
function generateCodeOfThisNode(node:SimpleInOutList, node_list:{[key: string]: SimpleInOutList;}){
    //1. write header 
    // c, d = function(a,b){
    let exist_output = 0;
    node.planet.generatedText += 'let ('
    for(let key in node.original.outputPinList){
        exist_output = 1;
        node.planet.generatedText += node.original.outputPinList[key].info.DOM.value;
        node.planet.generatedText += ', '
    }
    //"function(a,b){ "
    if(exist_output){
        node.planet.generatedText = node.planet.generatedText.slice(0,-2); //delete ", "
        node.planet.generatedText += ') = '
    }else{
        node.planet.generatedText = node.planet.generatedText.slice(0,-5); //delete "let ("
    }

    node.planet.generatedText += node.original.nameDOM.value+ '(';

    //Input variable
    let exist_input = 0;
    for(let key in node.original.inputPinList){
        let in_variable = node.original.inputPinList[key].info.DOM.textContent;
        if(in_variable!=''){ //<div id= ...info >text </div> //createTextNode(text)
            exist_input = 1;
            node.planet.generatedText += in_variable  ;
            node.planet.generatedText += ', ';
        }
    }

    if(exist_input){
        node.planet.generatedText = node.planet.generatedText.slice(0,-2); //delete ", "
    }
    node.planet.generatedText += ');\n';


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