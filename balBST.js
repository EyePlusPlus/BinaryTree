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
            if (dir == "right") {
                this.left.parent = this.parent;
                if(this.parent) {
                    this.parent.leftheight--;
                    this.parent.left = this.left;
                }
                this.parent = this.left;
                this.left = this.parent.right;
                if (this.parent.right) this.parent.right.parent = this;
                this.parent.right = this;

                this.leftheight-=2;
                this.parent.rightheight = this.rightheight+1;
            }
            
            if (dir == "left") {
                this.right.parent = this.parent;
                if(this.parent) {
                    this.parent.rightheight--;
                    this.parent.right = this.right;
                }
                this.parent = this.right;
                this.right = this.parent.left;
                if (this.parent.left) this.parent.left.parent = this;
                this.parent.left = this;

                this.rightheight-=2;
                this.parent.leftheight = this.leftheight+1;
            }

            if (BSTNode.root == this) BSTNode.root = this.parent;
        }
        else this.checkImbalance();
    }

    add(newNode) {
        if(newNode.key < this.key) {
            if (this.left != null) { 
                this.left.add(newNode);
            }
            else {
                this.left = newNode;
                newNode.parent = this;
                newNode.updateHeight();
                newNode.checkImbalance();
            }
        }
        else if(newNode.key > this.key) {
            if (this.right != null) {  
                this.right.add(newNode);
            }
            else {
                this.right = newNode;
                newNode.parent = this;
                newNode.updateHeight();
                newNode.checkImbalance();
            }
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

// var node = new BSTNode(50);
// BSTNode.root = node;
// BSTNode.root.add(new BSTNode(45));
// BSTNode.root.add(new BSTNode(55));
// BSTNode.root.add(new BSTNode(38));
// BSTNode.root.add(new BSTNode(47));
// BSTNode.root.add(new BSTNode(58));
// BSTNode.root.add(new BSTNode(65));
// BSTNode.root.add(new BSTNode(63));
// BSTNode.root.add(new BSTNode(67));
// BSTNode.root.add(new BSTNode(69));
// BSTNode.root.print();