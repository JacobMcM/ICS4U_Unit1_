const LinkedList = require('./linkedList.js');

module.exports = class Queue {
    constructor(){
        this.queue = new linkedList
    }

    enqueue(element) {
        this.queue.add(element);
    }

    dequeue() {
        return this.queue.removeFrom(0);
    }

    peek() {
        return this.queue.elementAt(0);
    }

    isEmpty() {
        return this.queue.isEmpty();
    }

    getSize(){
        return this.queue.getSize();
    }

    clear() {
        return this.queue.clear();
    }


}