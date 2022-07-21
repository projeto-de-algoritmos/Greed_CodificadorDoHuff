
class Node {  
  val: any
  char: any
  left: any
  right: any
    constructor(value: any, char: any, left?: any, right?: any) {  
        this.val = value;  
        this.char = char; 
        this.left = left;  
        this.right = right;  
    }  
}


export class HuffmanTree {
  hash: any
  huffmanTree: Node
  map: any
  str: string
  binaryString: string

    constructor(str: any) {  
        let hash: any = {};  
        for(let i = 0; i < str.length; i++){  
            hash[str[i]] = ~~hash[str[i]] + 1;  
        }  
        this.str = str
        this.hash = hash;  
        this.huffmanTree = this.getHuffmanTree();  
        this.map = this.getHuffmanCode();    
        this.binaryString = this.getBinaryStr(str)
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

    getHuffmanCode(){  
        let hash: any = {};
        let traversal = (node: any, curPath: any) => {  
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
        traversal(this.huffmanTree, '');  
        return hash;  
    }  

    getBinaryStr(aWord: string){  
        let result = '';  
        for(let i = 0; i < aWord.length; i++){  
            result += this.map[aWord[i]] + " ";
        }
        return result;  
    }
    
    getWord(binaryWord: string) {
        var a = this.huffmanTree
        var decode = ""
        var i = 0;
        var tam = binaryWord.length
        while (i<=tam) {
            if(a.char != '') {
                decode += a.char
                a = this.huffmanTree
                i++;
                continue;
            }
            if(Number(binaryWord[i]) == 0) {
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

    getTableSimbols () {
        return this.map
    }
}

export function main(texto: string) {
    var arvore: HuffmanTree
    arvore = new HuffmanTree(texto);
    return arvore;
}