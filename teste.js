const fs = require("fs");

class Node {  
    constructor(value, char, left, right) {  
        this.val = value;  
        this.char = char; 
        this.left = left;  
        this.right = right;  
    }  
}

class huffmanTree{  
    constructor(str) {  
        let hash = {};  
        for(let i = 0; i < str.length; i++){  
            hash[str[i]] = ~~hash[str[i]] + 1;  
        }  
        this.hash = hash;  
  
        this.huffmanTree = this.getHuffmanTree();  
  
        this.map = this.getHuffmanCode(this.huffmanTree);  
        //console.log(this.map);  
        
        this.binaryStr = this.getBinaryStr(this.map, str);  
    }  
  
    getHuffmanTree(){  
        let forest = []  
        for(let char in this.hash){  
            let node = new Node(this.hash[char], char); 
            forest.push(node);  
        }  
  
        let allnodes = []; 
        while(forest.length !== 1){  
            forest.sort((a, b) => { 
                return a.val - b.val;  
            });  
  
            let node = new Node(forest[0].val + forest[1].val, '');  
            allnodes.push(forest[0]);  
            allnodes.push(forest[1]);  
            node.left  = allnodes[ allnodes.length - 2]; 
            node.right  = allnodes[ allnodes.length - 1];
            forest = forest.slice(2);  
            forest.push(node);  
        }  
  
        return forest[0];  
    }  
  
    getHuffmanCode(tree){  
        let hash = {};
        let traversal = (node, curPath) => {  
            if (!node.length && !node.right) return;  
            if (node.left && !node.left.left && !node.left.right){  
                hash[node.left.char] = curPath + '0';  
            }  
            if (node.right && !node.right.left && !node.right.right){  
                hash[node.right.char] = curPath + '1';  
            }  
            if(node.left){  
                traversal(node.left, curPath + '0');  
            }  
            if(node.right){  
                traversal(node.right, curPath + '1');  
            }  
        };  
        traversal(tree, '');  
        return hash;  
    }  

    getBinaryStr(map, originStr){  
        let result = '';  
        for(let i = 0; i < originStr.length; i++){  
            result += map[originStr[i]] + " ";
        }
        return result;  
    }
    
    getWord(vet) {
        var a = this.huffmanTree
        var decode = ""
        var i = 0;
        var tam = vet.length
        while (i<=tam) {
            if(a.char != '') {
                decode += a.char
                a = this.huffmanTree
                i++;
                continue;
            }
            if(vet[i] == 0) {
                i++;
                a = a.left
            }
            else {
                i++;
                a = a.right
            }
        
        }
        return decode;
    }
}

var arvore  = new huffmanTree(fs.readFileSync("./teste.txt", "utf8"));

// Comandos:
// codificar
console.log(arvore.getBinaryStr(arvore.map, "teste"))

// decodificar:
console.log(arvore.getWord("0000 10010 11111 0000 10010"))
