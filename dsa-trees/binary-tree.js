/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node = this.root) {
    if (!node) {
      return 0;
    }
    const queue = [node];
    let depth = 1;
    while (queue.length > 0) {
      const currNode = queue.shift();
      if (!currNode.left && !currNode.right) return depth;
      if (currNode.left !== null) queue.push(currNode.left);
      if (currNode.right !== null) queue.push(currNode.right);
      depth += 1;
    } 
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(root = this.root) {
    if (!root) {
      return 0;
    }
    const leftDepth = this.maxDepth(root.left);
    const rightDepth = this.maxDepth(root.right);
    return Math.max(leftDepth, rightDepth) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(node = this.root) {
    let max = -Infinity;
    function maxGain(node) {
      if (!node) {
        max = 0;
        return 0;
      }
      const leftGain = Math.max(maxGain(node.left),0);
      const rightGain = Math.max(maxGain(node.right),0);
      const currentPathVal = node.val + leftGain + rightGain;
      max = Math.max(max, currentPathVal);

      return node.val + Math.max(leftGain, rightGain);
    }
    maxGain(node);
    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound, root = this.root) {
    const vals = [];
    fillVals = (node) => {
      if (!node) return null;
      const queue = [node];
      while (queue.length > 0) {
        const currVal = queue.shift();
        vals.push(currVal.val);
        if(currVal.left) queue.push(currVal.left);
        if(currVal.right) queue.push(currVal.right);
      }
    }
    fillVals(root);
    const greaterThan = vals.filter(val => val > lowerBound);
    if (greaterThan.length === 0) return null;
    greaterThan.sort();
    return greaterThan[0];
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
