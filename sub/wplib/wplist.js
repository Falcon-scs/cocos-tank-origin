(function() {
    function a(a, c, d, e, f = 0, g = 0, h = 0, i = 0) {
        b.apply(this, [ f, g ]), this.numberOfItems = c, this.itemHeight = d, this.itemNodeAtIndexFunc = e, 
        this.touchEnabled = !0, this.isVertical = a, this.setSize(h, i), this._initVariables(), 
        this._updateNodes(), this._bindEvents(), this.superRender = this.render, this.render = function(a) {
            if (this.superRender(a), 0 != this.deltaOffsetY) {
                let a = this.offsetY + this.deltaOffsetY;
                0 > a && (a = 0, this.deltaOffsetY = 0), a > this.maxOffsetY && (a = this.maxOffsetY, 
                this.deltaOffsetY = 0), this.offsetY = a, this.deltaOffsetY *= .96, 1 > Math.abs(this.deltaOffsetY) && (this.deltaOffsetY = 0), 
                this._updateNodes(), this.setNeedRequestAnimationFrame();
            }
        };
    }
    var b = require("./wpnode.js").WPNode;
    a.prototype._initVariables = function() {
        let a = this.itemHeight * this.numberOfItems;
        this.offsetY = 0, this.deltaOffsetY = 0;
        let b = this.isVertical ? this.size.y : this.size.x;
        this.maxOffsetY = a > b ? a - b : 0, this.showStartIndex = 0, this.showEndIndex = -1, 
        this.recycleNodes = [];
    }, a.prototype._updateNodes = function() {
        var a = Math.floor;
        let b = this.showStartIndex, c = this.showEndIndex;
        this.showStartIndex = a(this.offsetY / this.itemHeight), 0 > this.showStartIndex && (this.showStartIndex = 0), 
        this.showEndIndex = this.isVertical ? a((this.offsetY + this.size.y) / this.itemHeight) : a((this.offsetY + this.size.x) / this.itemHeight), 
        this.showEndIndex >= this.numberOfItems && (this.showEndIndex = this.numberOfItems - 1);
        let d = [], e = new Map();
        for (let a, f = b; f <= c; f++) a = this.children[f - b], f < this.showStartIndex || f > this.showEndIndex ? d.push(a) : e.set(f + "", a);
        for (let a, b = 0; b < d.length; b++) a = d[b], a.parent = null, this.recycleNodes.push(a);
        this.children = [];
        for (let a, b = this.showStartIndex; b <= this.showEndIndex; b++) {
            if (a = e.get(b + ""), !a) {
                let c = 0 < this.recycleNodes.length ? this.recycleNodes.pop() : null;
                a = this.itemNodeAtIndexFunc(b, c);
            }
            if (this.isVertical) {
                let c = (b + .5) * this.itemHeight - this.offsetY - this.size.y / 2;
                a.setPosition(0, c);
            } else {
                let c = (b + .5) * this.itemHeight - this.offsetY - this.size.x / 2;
                a.setPosition(c, 0);
            }
            this.addChild(a);
        }
    }, a.prototype._bindEvents = function() {
        let a = this, b = !1, c = 0, d = 0;
        this.onTouchStart = function(f) {
            let e = f.touches[0].clientX, g = f.touches[0].clientY;
            a.touchEnabled && (a.deltaOffsetY = 0, b = !0, c = a.isVertical ? g : e, d = 0);
        }, this.onTouchMove = function(f) {
            let e = f.touches[0].clientX, g = f.touches[0].clientY;
            if (b) {
                let b = e;
                a.isVertical && (b = g);
                let f = a.offsetY + c - b;
                0 > f && (f = 0), f > a.maxOffsetY && (f = a.maxOffsetY), d = f - a.offsetY, c = b, 
                a.offsetY = f, a._updateNodes(), a.setNeedRequestAnimationFrame();
            }
        }, this.onTouchEnd = function() {
            b && (b = !1, a.deltaOffsetY = d, a.setNeedRequestAnimationFrame());
        };
    }, a.prototype.offEvents = function() {
        console.log("offTouch"), wx.offTouchStart(this.onTouchStart), wx.offTouchMove(this.onTouchMove), 
        wx.offTouchEnd(this.onTouchEnd), wx.offTouchCancel(this.onTouchEnd), this.touchEnabled = !1;
    }, module.exports = {
        WPList: a
    };
})();