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

      if (this.isEmpty()) {
         this.head = node;
         this.tail = node;
      } else {
         let curr = this.head;
         for (let i = 0; i < this.size - 1; i++) {
            // shift the current element
            curr = curr.next;
         }
         curr.next = node;
         this.tail = node;
      }
      this.size++;
   }

   // insert element at the position index of the list
   insertAt(element, index) {
      if (index > this.size || index < 0) {
         console.log(`Invalid index ${index} in the linked list of size ${this.size}`);
      } else {
         // creates a new node and variables for curr and prev
         let node = new Node(element);
         let curr, prev;

         if (index === 0) {
            node.next = this.head;
            this.head = node;
         } else {
            // iterate into position
            curr = this.head.next;
            prev = this.head;
            for (let i = 0; i < index - 1; i++) {
               prev = prev.next;
               curr = curr.next;
            }
            node.next = curr;
            prev.next = node;
         }

         if (index == this.size)
            this.tail = node;
         this.size++;
      }


   }

   // removes an element from the specified location and returns the element
   removeFrom(index) {
      if (index > this.size || index < 0) {
         console.log(`Invalid index ${index} in the linked list of size ${this.size}`);
      } else {
         let toGo;
         if (index === 0) {
            toGo = this.head;
            this.head = this.head.next;
         } else {
            let curr = this.head;   // index 0 to start
            for (let i = 0; i < index - 1; i++) {  // i becomes 1
               curr = curr.next;
            }
            toGo = curr.next.element;
            if (index === this.size - 1) {
               this.tail = curr;
            }
            curr.next = curr.next.next;


         }
         this.size--;
         return toGo.element;
      }



   }

   // removes a given element from the list and return it - if not there return -1
   removeElement(element) {
      let current = this.head;
      let prev = null;

      // iterate over the list
      while (current != null) {
         // comparing element with current
         // element if found then remove the
         // and return true
         if (current.element === element) {
            if (prev == null) {
               this.head = current.next;
            } else {
               prev.next = current.next;
            }
            this.size--;

            if (current.next === null)
               this.tail = prev;
            return current.element;
         }
         prev = current;
         current = current.next;
      }
      return -1;
   }

   // finds the index of first element -1 if not there
   indexOf(element) {
      if (this.head === null) return -1

      let curr = this.head;
      let index = 0;

      // shift curr until you fall off the list or you find it
      while (curr !== null && curr.element !== element) {
         curr = curr.next;
         index++;
      }

      if (curr !== null)
         return index;

      return -1;
   }

   // checks the list for empty
   isEmpty() {
      return this.head === null;
   }

elementAt(index){
   if (index >= this.size || index < 0){

   }else{
      if (index = 0){
         return this.head.element;
      }

      let curr = this.head;
      for (let i = 0; i < index-1; i++){
         curr = curr.next;
      }

      return curr.element;
   }
}

   // display the size of the list
   size_of_list() {
      console.log(this.size);
   }


   // prints the list items
   printList() {
      let curr = this.head;
      while (curr !== null && curr.next !== null) {
         console.log(curr.element);
         curr = curr.next;
      }

      if (curr !== null)
         console.log(curr.element);
   }

   getTail() {
      if (this.tail !== null)
         console.log(this.tail.element);
   }

}