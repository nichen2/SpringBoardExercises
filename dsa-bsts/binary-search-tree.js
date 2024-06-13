class QNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    let node = new QNode(val);
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    }
    else {
      this.last.next = node;
      this.last = node;
    }
    this.size += 1;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Cannot dequeue from empty queue");
    }
    let node = this.first;
    this.first = this.first.next
    this.size -= 1;
    return node.val;
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek into empty queue");
    }
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    if(this.size == 0) {
      return true;
    } else {
      return false;
    }
  }
}

class StackNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    let node = new StackNode(val);
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first = node;
    }
    this.size += 1;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.isEmpty()) {
      throw new Error("Cannot pop from empty stack");
    }
    let node = this.first;
    this.first = this.first.next
    this.size -= 1;
    return node.val;
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.isEmpty()) {
      throw new Error("Cannot peek into empty stack");
    }
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */
  isEmpty() {
    if(this.size == 0) {
      return true;
    } else {
      return false;
    }
  }
}

class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
      if (this.root === null) {
        this.root = newNode;
        return this;
      } 
      let currentNode = this.root;
      while (true) {
        if (val < currentNode.val) {
          if (currentNode.left == null) {
            currentNode.left = newNode;
            return this;
          }
          currentNode = currentNode.left;
        } else if (val > currentNode.val){
          if (currentNode.right == null) {
            currentNode.right = newNode;
            return this;
          }
          currentNode = currentNode.right;
        } else {
          return this;
        }
      }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const newNode = new Node(val);
    const insert = (node) => {
      if (node === null) {
        return newNode;
      } else if (newNode.val < node.val){
        node.left = insert(node.left);
      } else if (newNode.val > node.val){
        node.right = insert(node.right);
      } 
      return node;  
    } 
    this.root = insert(this.root);
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while (true) {
      if (val === currentNode.val) {
        return currentNode;
      } else if (val < currentNode.val) {
        if (currentNode.left == null) {
          return undefined;
        } else if (currentNode.left.val === val){
          return currentNode.left;
        }
        currentNode = currentNode.left;
      } else if (val > currentNode.val){
        if (currentNode.right == null) {
          return undefined;
        } else if (currentNode.right.val === val) {
          return currentNode.right;
        }
        currentNode = currentNode.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const newNode = new Node(val);
    const find = (node) => {
      if (node === null) {
        return undefined;
      } else if (newNode.val < node.val) {
        return find(node.left);
      } else if (newNode.val > node.val) {
        return find(node.right);
      } else {
        return node;
      }
    }
    return find(this.root);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // const visited = [];
    // const stack = new Stack();
    // /* DFS Pre Order Algorithm
    //    lets think about this in a recursive manner?
    //    base case: we are at the node itself, top of stack, we should just return/add node val to visited
    //    recursive case: call dfs() on left node or top of stack
    //   if null, call dfs() right node or top of stack
    // */
    // stack.push(this.root);
    // while (!stack.isEmpty()){
    //   const top = stack.pop();
    //   visited.push(top.val);
    //   if (top.right != null) {
    //     stack.push(top.right);
    //   }
    //   if (top.left != null) {
    //     stack.push(top.left);
    //   }
    // }
    // return visited;
    const visited = [];
    preOrderTraverse = (node) => {
      visited.push(node.val);
      if (node.left != null) {
        preOrderTraverse(node.left);
      }
      if (node.right != null) {
        preOrderTraverse(node.right);
      }
    } 
    preOrderTraverse(this.root);
    return visited;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];
    inOrderTraverse = (node) => {
      if (node.left != null) {
        inOrderTraverse(node.left);
      }
      visited.push(node.val);
      if (node.right != null) {
        inOrderTraverse(node.right);
      }
    } 
    inOrderTraverse(this.root);
    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];
    postOrderTraverse = (node) => {
      if (node.left != null) {
        postOrderTraverse(node.left);
      }
      if (node.right != null) {
        postOrderTraverse(node.right);
      }
      visited.push(node.val);
    } 
    postOrderTraverse(this.root);
    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    const queue = new Queue();
    queue.enqueue(this.root);
    while (!queue.isEmpty()) {
      const frontNode = queue.dequeue();
      visited.push(frontNode.val);
      if(frontNode.left != null) {
        queue.enqueue(frontNode.left);
      }
      if (frontNode.right != null) {
        queue.enqueue(frontNode.right);
      }
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
