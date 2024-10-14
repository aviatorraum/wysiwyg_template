class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const invertTree = (root) => {
  if (!root) return null;

  let queue = [root];

  while (queue.length) {
    let current = queue.shift();

    // Swap left and right children
    let temp = current.left;
    current.left = current.right;
    current.right = temp;

    // Add children to the queue if they exist
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }

  return root;
};

// create a tree from an array (level-order)
const arrayToTree = (arr) => {
  if (!arr.length) return null;

  let root = new TreeNode(arr[0]);
  let queue = [root];
  let i = 1;

  while (i < arr.length) {
    let current = queue.shift();

    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }
  return root;
};

// convert tree back to array (level-order)
const treeToArray = (root) => {
  if (!root) return [];

  let result = [];
  let queue = [root];

  while (queue.length) {
    let current = queue.shift();
    if (current) {
      result.push(current.val);
      queue.push(current.left);
      queue.push(current.right);
    } else {
      result.push(null);
    }
  }

  // Remove trailing null values
  while (result[result.length - 1] === null) {
    result.pop();
  }

  return result;
};

// Test examples
let input1 = [5, 3, 8, 1, 7, 2, 6];
let input2 = [6, 8, 9];
let input3 = [5, 3, 8, 1, 7, 2, 6, 100, 3, -1];
let input4 = [];

let tree1 = arrayToTree(input1);
let tree2 = arrayToTree(input2);
let tree3 = arrayToTree(input3);
let tree4 = arrayToTree(input4);

console.log(treeToArray(invertTree(tree1))); // Output: [5, 8, 3, 6, 2, 7, 1]
console.log(treeToArray(invertTree(tree2))); // Output: [6, 9, 8]
console.log(treeToArray(invertTree(tree3))); // Output: [5, 8, 3, 6, 2, 7, 1, null, null, null, null, null, -1, 3, 100]
console.log(treeToArray(invertTree(tree4))); // Output: []
