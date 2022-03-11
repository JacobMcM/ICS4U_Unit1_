class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }

    /*
    getLeft(){
        return this.left;
    }

    getRight(){
        return this.right;
    }

    getVal(){
        return this.val
    }
    */
}

module.exports = class BST{
    constructor(){
        this.root = null;
    }

    add(val){
        if (this.root === null){
            this.root == new Node(val);
        } else{
            function searchTree(node, val){
                if (val < node.val){

                    if (node.left !== null){
                        return searchTree(node.Left,val);
                    } else{
                        node.left = new Node(val);
                        return;
                    }
                    
                } else if (val > node.val){
                    if (node.right !== null){
                        return searchTree(node.right,val);
                    } else {
                        node.right = new Node(val);
                        return;
                    }

                } else {
                    return null
                }
            }

            return searchTree(node, val)
        }
    }

    findMax(){
        let curr = this.root;
        while (node.right !== null){
            curr = curr.right;
        }
        return curr.val
    }

    findMin(){
        let curr = this.root;
        while (node.left !== null){
            curr = curr.left;
        }
        return curr.val
    }

    display(){
        this.displayInOrder(this.root);
    }

    displayInOrder(node){
        if (node.left !== null){
            this.displayInOrder(node.left);
        }
        console.log(node.val);

        if (node.right !==null){
            this.displayInOrder(node.right);
        }
    }
}

