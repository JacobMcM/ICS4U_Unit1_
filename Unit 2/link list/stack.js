const LinkedList = require('./linkedList.js');

module.exports = class Stack {
   constructor() {
      this.stack = new LinkedList();
   }

   push(element) {
      this.stack.insertAt(element, 0);
   }

   pop() {
      return this.stack.removeFrom(0);
   }

   size() {
      return this.stack.getSize();
   }

   peek(){
       return this.stack.isEmpty();
   }

   isEmpty() {
      return this.stack.isEmpty();
   }

   display() {
      console.log('TOP');
      this.stack.printList();
   }


}