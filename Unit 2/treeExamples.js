const BST = rewuire('./BST.js'); ///bst = binary search tree

const bst = new BST();

bst.add(30);
bst.add(17);
bst.add(54);
bst.add(11);
bst.add(13);
bst.add(6);

console.log(bst.findMax());

console.log(bst.findMin());