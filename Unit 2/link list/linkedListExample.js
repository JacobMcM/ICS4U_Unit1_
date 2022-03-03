const LinkedList = require('./mYlinkedList.js');

let ll = new LinkedList();
console.log(ll.isEmpty());
console.log(ll.indexOf(4));
ll.add(1);
ll.add(4);
ll.add(3);
ll.add(8);

console.log(ll.isEmpty());
console.log(ll.size);
ll.printList();
console.log(ll.indexOf(4));