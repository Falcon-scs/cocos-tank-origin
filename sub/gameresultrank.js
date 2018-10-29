(function() {
    function a(a, b) {
        let c = 0;
        for (;c < b.length; c++) {
            let d = b[c];
            if (d.openid == a) break;
        }
        return c;
    }
    function b(a, b) {
        let f = a - 1;
        0 > f && (f = 0), console.log("startDataIndex--\x3e" + f), console.log("dataList--\x3e" + JSON.stringify(b));
        let g = new c(0, 0);
        for (let h, j = 0; 3 > j && (h = f + j, !(h >= b.length)); j++) {
            let f = b[h], i = new c(213 * (.5 + j), 0);
            if (h == a) {
                let a = new c(0, 130);
                a.setSize(214, 340), a.setBackgroundColor("#393247"), i.addChild(a);
            } else {
                let a = new c(0, 130);
                a.setSize(213, 340), a.setBackgroundColor("#2c293c"), i.addChild(a);
            }
            g.addChild(i);
            let k = new e("" + (h + 1), "bold 40", "#E6A400", "center", "middle", 0, 46);
            i.addChild(k);
            let l = new d(f.avatarUrl, 0, 138);
            l.setSize(92, 92), i.addChild(l);
            let m = new e(f.nickname, 24, "#FFF5EE", "center", "middle", 0, 210);
            i.addChild(m);
            let n = new e("" + f.score, 40, "#FFF5EE", "center", "middle", 0, 260);
            i.addChild(n);
        }
        return g;
    }
    var c = require("./wplib/wpnode.js").WPNode, d = require("./wplib/wpsprite.js").WPSprite, e = require("./wplib/wplabel.js").WPLabel, f = require("wxapi");
    module.exports = {
        GetGameResultRankNode: function(c, d, e) {
            f.instance.getFriendRank(function(e) {
                let f = a(c, e);
                d(b(f, e));
            }, e);
        }
    };
})();