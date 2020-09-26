import { Pot,Planet,SmallPot,BigPot,InputPin, OutputPin, OperationPot,TextArea } from "./index.js";
import { GeneralBigPot } from "./main_class.js";

// Goal
//--function definition
//fn five() -> i32 {5}
//fn two() -> i32 {2}
//fn add(a:i32, b:i32)-> (i32){a+b}
//-- execute main function
//fn main(){
//    let a = five();
//    let b = two();
//    let c = add(a + b);
//    println!("{}",c);
// }


export function generateCode(planet:Planet){
    console.log('start generate code');

    // Main Code: For pot in Pots expandPot(pot);
    // Pots: Depth First Search from the Planet. The Planet(main) function will be expanded at the last
    depthFirstSearchPot(planet);

    //output text
    let outputarea = <HTMLTextAreaElement> document.getElementById("generatedCode")
    outputarea.value = planet.generatedText;
    console.log('generated_text = \n' + planet.generatedText );
    //Clear Stored Text
    planet.generatedText = '';
}

function depthFirstSearchPot(parentPot){
    for (let id in parentPot.pots){
        let pot = parentPot.pots[id];
        if(pot.isBig){
            depthFirstSearchPot(pot); //Has child Pots
        }else{
            expandSmallPot(pot);   
        }
    }
    expandBigPot(parentPot); //Expand the Pot after all child pots are expanded
}

function expandSmallPot(pot:SmallPot){
    writeFunctionHeader(pot); // fn add (a:i32, b:i32) -> (i32){
            //main function
    let textDOM = <HTMLTextAreaElement> document.getElementById(pot.id+'text');
    pot.planet.generatedText += textDOM.value + '\n';
    pot.planet.generatedText += '}\n';
}

function expandBigPot(pot:GeneralBigPot){
    if(pot instanceof Planet){
        pot.planet.generatedText += 'fn main(){\n'
    }else if(pot instanceof BigPot){
        writeFunctionHeader(pot);
    }else{console.log('Alert: object not expanded');}
    expandFunctions(pot);
    pot.planet.generatedText += '}';
}

//--------------------------------------------------------
function writeFunctionHeader(pot:BigPot|SmallPot){
    pot.planet.generatedText += 'fn '
    pot.planet.generatedText += pot.nameDOM.value+' ('; //ToDo assign of Main
    
    //Input
    let exist_input = 0;
    for(let key in pot.inputPinList){
        let in_variable = pot.inputPinList[key].info.DOM.textContent;
        let in_type = pot.inputPinList[key].type.DOM.textContent;
        if(in_variable!=''){ //<div id= ...info >text </div> //createTextNode(text)
            exist_input = 1;
            pot.planet.generatedText += in_variable + ":" +in_type ;
            pot.planet.generatedText += ', ';
        }
    }
    if(exist_input){
        pot.planet.generatedText = pot.planet.generatedText.slice(0,-2); //delete ", "
    }

    pot.planet.generatedText += ') -> (';

    //Output
    let exist_output = 0;
    for(let key in pot.outputPinList){
        exist_output = 1;
        pot.planet.generatedText += pot.outputPinList[key].type.DOM.value ;
        pot.planet.generatedText += ', '
    }
    //"function(a,b){ "
    if(exist_output){
        pot.planet.generatedText = pot.planet.generatedText.slice(0,-2); //delete ", "
    }
    pot.planet.generatedText += '){\n';
}

function expandFunctions(pot:GeneralBigPot){    
    let node_list:{[key: string]: DependencyList;} = {};
    for (let node_key in pot.pots){
        //console.log('node list ='+ node_key);
        node_list[node_key] = new DependencyList(pot, node_key); //(Garden,node01)
        console.log('created' + node_key+' '+node_list[node_key].inputlist);
    }
    console.log('node list created');
    
    //ToDo: Write Codes for input in the fuction

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
}

class DependencyList{ //This Is Dependency List inside BigPot
    inputlist:string[]; // list of node id come in 
    outputlist:string[]; //list of node id go out
    key: string;//node0, node1 etc...
    garden: GeneralBigPot;
    original:OperationPot;
    planet:Planet;
    constructor(garden: GeneralBigPot, node_key){
        this.inputlist = [];
        this.outputlist = [];
        this.key = node_key;
        this.garden = garden;
        this.original = garden.pots[node_key];
        this.planet = garden.planet;

        let input: {[key: string]: InputPin;} = this.original.inputPinList;
        for( let i in input){
            let outputpinbtns = input[i].btn.connectList;
            for(let j in outputpinbtns){
                if(outputpinbtns[j].pot === garden){continue;} // Ignore Input From the Garden itself
                this.inputlist.push(outputpinbtns[j].pot.id); //Id of Node (Source)
            }
        }
        let output: {[key: string]: OutputPin;} = garden.pots[node_key].outputPinList;
        for( let i in output){
            let inputpins = output[i].btn.connectList;
            for(let pin in inputpins){
                this.outputlist.push(inputpins[pin].pot.id);
            }
        }
    }
}

function generateCodeOfThisNode(node:DependencyList, node_list:{[key: string]: DependencyList;}){
    //1. write header 
    // "let(c, d) = " function_name(a,b){
    let exist_output = 0;
    node.planet.generatedText += 'let ('
    for(let key in node.original.outputPinList){
        exist_output = 1;
        node.planet.generatedText += node.original.outputPinList[key].info.DOM.value;
        node.planet.generatedText += ', '
    }
    //let(c, d) = "function_name( " a,b){
    if(exist_output){
        node.planet.generatedText = node.planet.generatedText.slice(0,-2); //delete ", "
        node.planet.generatedText += ') = '
    }else{
        node.planet.generatedText = node.planet.generatedText.slice(0,-5); //delete "let ("
    }

    // " function_name("
    node.planet.generatedText += node.original.nameDOM.value+ '(';

    //Input variable
    //let(c, d) = function_name( "a,b);"
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