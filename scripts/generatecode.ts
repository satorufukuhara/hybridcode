export function generateCode(){
    console.log('clicked');
    for (let node_key in globalThis.nodeList){
        console.log(node_key);
    }
}