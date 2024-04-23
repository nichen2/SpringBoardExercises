/** TreeNode: node for a general tree. */

const { chdir } = require("process");

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  depthFirstTraversal() {
    if (!this.root) return [];
    const toVisitStack = [this.root];
    const vals = [];
    while (toVisitStack.length) {
      const currNode = toVisitStack.pop();
      vals.push(currNode.val);
      
      if (!currNode.children) {
        continue;
      }
      
      for (let child of currNode.children) {
        toVisitStack.push(child);
      }
    }
    return vals;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    const vals = this.depthFirstTraversal();
    const result = vals.reduce((accumulator,currentVal) => accumulator + currentVal, 0);
    return result;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    const vals = this.depthFirstTraversal();
    const result = vals.filter(val => val % 2 === 0);
    return result.length;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    const vals = this.depthFirstTraversal();
    const result = vals.filter(val => val > lowerBound);
    return result.length;
  }
}

module.exports = { Tree, TreeNode };
