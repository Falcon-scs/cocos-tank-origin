(function() {
    function a(a, c, d, e, f, g, h) {
        b.apply(this, [ g, h ]), this.text = a, this.fontSize = c, this.fontColor = d, this.horizontalAlignment = e, 
        this.verticalAlignment = f, this.isBounder = !1, this.isBold = !0, this.render = function(a) {
            return !!this.visible && void (a.save(), a.textAlign = this.horizontalAlignment, 
            a.textBaseline = this.verticalAlignment, this.isBounder && (a.fillStyle = "#743406", 
            a.font = "bold " + (this.fontSize + 1) + "px JhengHei", a.fillText(this.text, this.position.x - 3, this.position.y), 
            a.fillStyle = "#743406", a.font = "bold " + (this.fontSize + 1) + "px JhengHei", 
            a.fillText(this.text, this.position.x + 2, this.position.y), a.font = "bold " + (this.fontSize + 1) + "px JhengHei", 
            a.fillText(this.text, this.position.x, this.position.y - 2), a.fillStyle = "#743406", 
            a.font = "bold " + (this.fontSize + 1) + "px JhengHei", a.fillText(this.text, this.position.x, this.position.y + 3)), 
            a.fillStyle = this.fontColor, a.font = this.isBold ? "bold " + this.fontSize + "px JhengHei " : this.fontSize + "px JhengHei ", 
            a.fillText(this.text, this.position.x, this.position.y), a.restore());
        };
    }
    var b = require("./wpnode.js").WPNode;
    a.prototype.setText = function(a) {
        this.text = a, this.setNeedRequestAnimationFrame();
    }, module.exports = {
        WPLabel: a
    };
})();