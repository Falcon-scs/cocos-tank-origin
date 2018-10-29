(function() {
    function a(a = "", c = 0, d = 0, e = !1) {
        b.apply(this, [ c, d ]), this.img = null, this.setSrc(a), this.round = e, this.render = function(a) {
            if (!this.visible) return !1;
            if (this.img) {
                let d = this.position.x - this.size.x / 2, e = this.position.y - this.size.y / 2;
                if (this.round) {
                    console.log("round");
                    let f = this.size.x / 2;
                    a.save();
                    var b = d + f, c = e + f;
                    a.arc(b, c, f, 0, 2 * Math.PI), a.clip(), a.drawImage(this.img, d, e, this.size.x, this.size.y), 
                    a.restore();
                } else a.save(), a.globalAlpha = this.opacity, a.drawImage(this.img, d, e, this.size.x, this.size.y), 
                a.restore();
            }
            return !0;
        };
    }
    var b = require("./wpnode.js").WPNode, c = require("./wppoint.js").WPPoint;
    a.prototype.setSrc = function(a) {
        if (!a || 0 == a.length) return;
        let b = this, c = wx.createImage();
        c.src = a, c.onload = function() {
            b.img = c, 0 == b.size.x && 0 == b.size.y && (b.size.x = c.width, b.size.y = c.height), 
            b.setNeedRequestAnimationFrame();
        };
    }, module.exports = {
        WPSprite: a
    };
})();