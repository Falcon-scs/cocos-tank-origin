(function() {
    function a() {
        b.apply(this, [ 0, 0 ]), this.tag = "wpcanvas", this.canvas = wx.getSharedCanvas(), 
        this.ctx = this.canvas.getContext("2d"), this.ctx.imageSmoothingEnabled = !0, this.ctx.imageSmoothingQuality = "high", 
        this.update = function() {}, this.bindLoop = this.loop.bind(this), this.hasRequestAnimationFrame = !1;
    }
    var b = require("./wpnode.js").WPNode;
    a.prototype.requestAnimationFrame = function() {
        this.hasRequestAnimationFrame || (requestAnimationFrame(this.bindLoop), this.hasRequestAnimationFrame = !0);
    }, a.prototype.getWidth = function() {
        return this.canvas.width;
    }, a.prototype.getHeight = function() {
        return this.canvas.height;
    }, a.prototype.loop = function() {
        console.log("canvas loop"), this.hasRequestAnimationFrame = !1, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), 
        this.render(this.ctx), this.update();
    }, module.exports = {
        WPCanvas: a
    };
})();