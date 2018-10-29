(function() {
    var a = require("./wppoint.js").WPPoint;
    module.exports = {
        WPNode: function(b = 0, c = 0) {
            this.tag = "wpnode", this.visible = !0, this.position = new a(b, c), this.size = new a(0, 0), 
            this.backgroundColor = null, this.clipToBounds = !1, this.children = [], this.parent = null, 
            this.wpcanvas = null, this.opacity = 1, this.setNeedRequestAnimationFrame = function() {
                if (!this.wpcanvas) for (let a = this.parent; a; ) {
                    if ("wpcanvas" == a.tag) {
                        this.wpcanvas = a;
                        break;
                    }
                    a = a.parent;
                }
                this.wpcanvas && this.wpcanvas.requestAnimationFrame();
            }, this.setVisible = function(a) {
                this.visible = a, this.setNeedRequestAnimationFrame();
            }, this.setPosition = function(a, b) {
                this.position.setXY(a, b), this.setNeedRequestAnimationFrame();
            }, this.setSize = function(a, b) {
                this.size.setXY(a, b), this.setNeedRequestAnimationFrame();
            }, this.setBackgroundColor = function(a) {
                this.backgroundColor = a, this.setNeedRequestAnimationFrame();
            }, this.addChild = function(a) {
                this.children.push(a), a.parent = this, this.setNeedRequestAnimationFrame();
            }, this.removeAllChildren = function() {
                for (let a, b = 0; b < this.children.length; b++) a = this.children[b], a.parent = null;
                this.children = [], this.setNeedRequestAnimationFrame();
            }, this.removeFromParent = function() {
                let a = this.parent.children.indexOf(this);
                -1 != a && this.parent.children.splice(a, 1), this.parent.setNeedRequestAnimationFrame(), 
                this.parent = null;
            }, this.render = function(a) {
                if (!this.visible) return !1;
                if (a.save(), this.clipToBounds) {
                    let b = this.position.x - this.size.x / 2, c = this.position.y - this.size.y / 2;
                    a.rect(b, c, this.size.x, this.size.y), a.clip();
                }
                if (this.backgroundColor) {
                    let b = this.position.x - this.size.x / 2, c = this.position.y - this.size.y / 2;
                    a.fillStyle = this.backgroundColor, a.fillRect(b, c, this.size.x, this.size.y);
                }
                a.translate(this.position.x, this.position.y);
                for (let b, c = 0; c < this.children.length; c++) b = this.children[c], b.render(a);
                return a.restore(), !0;
            };
        }
    };
})();