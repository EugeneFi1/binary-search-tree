class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    add(value) {
        let newNode = new Node(value);
        if (this.root == null) {
            this.root = newNode;
        } else {
            this.addNode(this.root, newNode);
        }
    }

    addNode(parentNode, childNode) {
        if (parentNode.value < childNode.value) {
            if (parentNode.right == null) {
                parentNode.right = childNode;
            } else {
                this.addNode(parentNode.right, childNode);
            }
        } else if (parentNode.value > childNode.value) {
            if (parentNode.left == null) {
                parentNode.left = childNode;
            } else {
                this.addNode(parentNode.left, childNode);
            }
        }
    }

    delete(index) {
        try {
            this.deleteNode(this.root, index);
        } catch (TypeError) {
            console.log("Error: cann`t find node to delete");
        }
    }

    deleteNode(node, index, parentNode) {
        if (node.value < index) {
            this.deleteNode(node.right, index, node)
        } else if (node.value > index) {
            this.deleteNode(node.left, index, node);
        } else {
            // удаляю узел без потомков
            if (node.left == null && node.right == null) {
                node = null;
                this.changeObjectReference(parentNode, index, null);
                return node;
            }
            // удаляю узел с одним потомком
            if (node.left == null) {
                node = node.right;
                this.changeObjectReference(parentNode, index, node);
                return node;
            }
            if (node.right == null) {
                node = node.left;
                this.changeObjectReference(parentNode, index, node);
                return node;
            }
            // удаляю узел с двумя потомками
            let newNode = this.findMin(node.right);
            newNode.left = node.left;
            node = newNode;
            this.changeObjectReference(parentNode, index, node);
        }
    }

    findMin(node) {
        if (node.left === null) {
            return node;
        } else {
            this.findMin(node.left);
        }
    }

    changeObjectReference(parentNode, index, node) {
        parentNode.left.value === index ? parentNode.left = node :
            parentNode.right = node;
    }

    search(index) {
        if (this.root.value === index) {
            this.searchMessage(this.root.value)
        } else {
            this.searchNode(this.root, index);
        }
    }

    searchMessage(message) {
        console.log("search node: " + message);
    }

    searchNode(node, index) {
        try {
            if (node.left != null && node.left.value === index) {
                this.searchMessage(node.left.value);
            } else if (node.right != null && node.right.value === index) {
                this.searchMessage(node.right.value);
            } else {
                node.value < index ? this.searchNode(node.right, index)
                    : this.searchNode(node.left, index);
            }
        } catch (TypeError) {
            console.log("NOT FOUND");
        }
    }

    traverseStart() {
        this.traverse(this.root);
    }

    traverse(node) {
        if (node != null) {
            this.traverse(node.left);
            console.log(node.value);
            this.traverse(node.right);
        }
    }
}

let bst = new BinarySearchTree();
bst.add(123);
bst.add(46);
bst.add(332);
bst.add(456);
bst.add(300);
bst.add(20);
bst.add(30);
bst.add(4);

bst.delete(332);
bst.search(123);

bst.traverseStart();


