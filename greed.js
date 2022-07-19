const fs = require("fs");

class Node {  
    constructor(value, char, left, right) {  
        this.val = value;  
        this.char = char;
        this.left = left;  
        this.right = right;  
    }
}

function frequency(str) {
    var freqs = {};
    for (var i = 0; i<=str.length;i++){
        if (str[i] in freqs){
            freqs[str[i]] ++;
        }
        else{
            freqs[str[i]] = 1;
        }
    }
    return freqs;
}

class QElement {
    constructor(element, priority)
    {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
 
    constructor() {
        this.items = [];
        this.qtd = 0;
    }

    enqueue(element, priority) {
        this.qtd++
        var qElement = new QElement(element, priority);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
    
        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        if (this.isEmpty())
            return "Vazio";
        this.qtd--
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length == 0;
    }

    quantidade() {
        return this.qtd;
    }
}

function main(arquivo, formato) {
    
    var priorityQueue = new PriorityQueue();
    var file = fs.readFileSync(arquivo, formato);
    var frequencia = frequency(file)
    const keys = Object.keys(frequencia)
    
    for(const key of keys) {
        let node = new Node(key, frequencia[key])
        priorityQueue.enqueue(node, frequencia[key])
    }
    
    while(priorityQueue.quantidade() !== 1) {
        let aux1 = priorityQueue.dequeue()
        let aux2 = priorityQueue.dequeue()
        let node = new Node(aux1.priority + aux2.priority, '');
        node.left  = aux1.element;
        node.right  = aux2.element;
        priorityQueue.enqueue(node, node.val)
    }
    
    return priorityQueue.items[0].element
}

console.log(main("zzz.txt", "utf8"))