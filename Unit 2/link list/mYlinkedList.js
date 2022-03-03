class Node {
   constructor(element) {
      this.element = element;
      this.next = null
   }
}
 
module.exports = class LinkedList {
   constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
   }
 
   // adds an element at the end of list
   add(element) {
      // creates a new node
      let node = new Node(element);
 
       // to store current node
      if (this.isEmpty()){
         this.head = node;
      }  else {
         let curr = this.head;
         for (let i = 0; i < this.size-1; i++){
            curr = curr.next;
         }
         curr.next = node;
      }
      this.size++;
   }
 
    // insert element at the position index of the list
   insertAt(element, index) {
      if (index > this.size || index < 0) {
         console.log(`Inavalid index ${index} in the linked list of size ${this.size}`)
      }else{
         let node = new Node(element);
         let curr, prev;
         

         if (index === 0){
            node.next = this.head;
            this.head = node;
         }else{
            curr = this.head.next;
            prev = this.head;
            for (let i = 0; i < index - 1; i++){
               prev = prev.next;
               curr = curr.next;
            }
   
            node.next = curr;
            prev.next = node;
         }
         //iterate into position
         
         this.size++;
      }

   }
 
    // removes an element from the specified location and returns the element
   removeFrom(index) {
      if (index > this.size || index < 0) {
         console.log(`Inavalid index ${index} in the linked list of size ${this.size}`)
      }else{
         let deleted;
         if (index === 0){
            let deleted = this.head;
            this.head = this.head.next
         }else{
            let curr = this.head;
            let prev;

            for (let i = 0; i < index-1; i++){
               curr = curr.next
            }
            let deleted = curr.next;
            curr.next = curr.next.next;

         }
         this.size--;
         return deleted;
      }
      
      
 
 
 
   }
 
    // removes a given element from the list and return it - if not there return -1
   removeElement(element) {
      
   }
 
    // finds the index of first element -1 if not there
   indexOf(element) {
      if (this.head === null){
         return -1;
      }

      let curr = this.head;
      let index = 0;
      while (curr !== null && curr.element !== element){
         curr = curr.next;
         index++;
                  
      }
      if (curr !== null && curr.element === element){
         return  index;
      }
      return -1;  
   }
 
    // checks the list for empty
   isEmpty() {
      return this.head === null;
   }
 
    // display the size of the list
   size_of_list() {
      console.log(this.size);
   }
 
 
    // prints the list items
   printList() {
      let curr = this.head;
      while (curr !== null && curr.next !== null){
         console.log(curr.element);
         curr = curr.next;
      }
      if (curr !== null){
         console.log(curr.element);
      }
   }
 


   
}