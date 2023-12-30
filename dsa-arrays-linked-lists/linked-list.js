/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const insertion = new Node(val)
    if (this.length == 0) {
      this.head = insertion;
      this.next = null;
      this.tail = this.head;
      this.length += 1;
      return undefined;
    }
    if (this.length == 1) {
      this.head.next = insertion
    }
    this.tail.next = insertion
    this.tail = this.tail.next;
    this.length += 1;
    return undefined;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const insertion = new Node(val);
    if (this.length == 0) {
      this.head = insertion;
      this.tail = this.head;
      this.length += 1;
      return undefined;
    }
    insertion.next = this.head;
    this.head = insertion;
    this.length += 1;
    return undefined;
  }

  /** traverse(): traverse linked list based on depth. */
  traverse(depth) {
    let node = this.head;
    if (depth > this.length) {
      return undefined;
    }
    let count = 1;
    while (count != depth) {
      node = node.next;
      count += 1;
    }
    return node;
  }

  /** pop(): return & remove last item. */

  pop() {
    const val = this.tail.val;
    if (this.length == 1) {
      this.head = null;
      this.tail = this.head;
      this.length = 0;
      return val;
    }
    let node = this.head;
    this.tail = this.traverse(this.length - 1);
    this.length -= 1;
    return val;
  }

  /** shift(): return & remove first item. */

  shift() {
    const val = this.head.val;
    if (this.length == 1) {
      this.head = null;
      this.tail = this.head;
      this.length = 0;
      return val;
    }
    this.head = this.head.next;
    this.length -= 1;
    return val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    const node = this.traverse(idx + 1);
    return node.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx > this.length - 1) {
      throw console.error();
    }
    const node = this.traverse(idx + 1);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const node = new Node(val);
    if (this.length == 0) {
      this.push(val);
      return undefined
    }
    if (idx > this.length) {
      throw console.error();
    }
    if (idx == 0 && this.length > 0) {
      node.next = this.head;
      this.head = node;
      this.length += 1;
      return undefined;
    }
    if (idx == this.length) {
      this.tail.next = node;
      this.tail = node;
      this.length += 1;
      return undefined;
    }
    const prevNode = this.traverse(idx);
    const nextNode = this.traverse(idx + 1);
    prevNode.next = node;
    node.next = nextNode;
    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    this.head = null;
    this.tail = this.head;
    this.length = 0;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length == 0) {
      return 0;
    }
    let total = 0;
    let count = 0;
    while (count != this.length) {
      const node = this.traverse(count + 1);
      total += node.val;
      count += 1;
    }
    return total/this.length;
  }
}

module.exports = LinkedList;
