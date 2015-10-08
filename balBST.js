"use strict";

class BSTNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.leftheight = 0;
        this.rightheight = 0;
    }

    print() {
        console.log(this.key, this.leftheight, this.rightheight);
        if(this.left != null) {
            console.log("Left");
            this.left.print();
        }
        if(this.right != null) {
            console.log("Right");
            this.right.print();
        }
        console.log('------------');
    }

    checkImbalance() {
        var rotateDir;
        if (this.parent) {
            if (this.parent.left == this) {
                if ((this.parent.leftheight - this.parent.rightheight) > 1) {
                    rotateDir = "right";
                }
            }
            else if (this.parent.right == this) {
                if ((this.parent.leftheight - this.parent.rightheight) < -1) {
                    rotateDir = "left";
                }
            }
            return this.parent.balance(rotateDir);
        }
    }

    updateHeight() {
        if(this.parent) {
            if(this.parent.left == this) {
                this.parent.leftheight = Math.max(this.leftheight, this.rightheight) + 1;
            }
            else {
                this.parent.rightheight = Math.max(this.leftheight, this.rightheight) + 1;
            }
            this.parent.updateHeight();
        }
    }

    balance(dir) {
        if (dir) {
            var antiDir = (dir == "right")? "left" : "right";
            var dirHeight = dir+"height";
            var antiDirHeight = antiDir+"height";

            this[antiDir].parent = this.parent;
            if(this.parent) {
                this.parent[antiDirHeight]--;
                this.parent[antiDir] = this[antiDir];
            }
            this.parent = this[antiDir];
            this[antiDir] = this.parent[dir];
            if (this.parent[dir]) this.parent[dir].parent = this;
            this.parent[dir] = this;

            this[antiDirHeight]-=2;
            this.parent[dirHeight] = this[dirHeight]+1;

            if (BSTNode.root == this) BSTNode.root = this.parent;
        }
        else this.checkImbalance();
    }

    add(newNode) {
        var dir;
        if(newNode.key < this.key) dir = "left";
        else if(newNode.key > this.key) dir = "right";
        else return;
        
        if (this[dir] != null) {  
            this[dir].add(newNode);
        }
        else {
            this[dir] = newNode;
            newNode.parent = this;
            newNode.updateHeight();
            newNode.checkImbalance();
        }
    }    
}

function getRandom () {
    return Math.floor(Math.random()*100);
}

// var node = new BSTNode(50);
// BSTNode.root = node;
// BSTNode.root.add(new BSTNode(45));
// BSTNode.root.add(new BSTNode(59));
// BSTNode.root.add(new BSTNode(40));
// BSTNode.root.add(new BSTNode(48));
// BSTNode.root.add(new BSTNode(57));
// BSTNode.root.add(new BSTNode(61));
// BSTNode.root.add(new BSTNode(38));
// BSTNode.root.add(new BSTNode(42));
// BSTNode.root.add(new BSTNode(24));
// BSTNode.root.print();

var node = new BSTNode(50);
BSTNode.root = node;
BSTNode.root.add(new BSTNode(45));
BSTNode.root.add(new BSTNode(55));
BSTNode.root.add(new BSTNode(38));
BSTNode.root.add(new BSTNode(47));
BSTNode.root.add(new BSTNode(58));
BSTNode.root.add(new BSTNode(65));
BSTNode.root.add(new BSTNode(63));
BSTNode.root.add(new BSTNode(67));
BSTNode.root.add(new BSTNode(69));
BSTNode.root.print();