(function() {
    var a = require("./wplib/wpnode.js").WPNode, b = require("./wplib/wpsprite.js").WPSprite, c = require("./wplib/wplabel.js").WPLabel, d = require("wxapi");
    module.exports = {
        AddInGameRank: function(d, e, f) {
            if (d.children && 0 < d.children.length) {
                let a = d.children[0];
                if ("InGameRank" == a.tag) return;
            }
            d.removeAllChildren();
            let g = new a(298, 32);
            g.tag = "InGameRank", d.addChild(g);
            let h = new b("");
            h.setSize(64, 64), h.setPosition(-266, 0), g.addChild(h);
            let i = new b("");
            i.setSize(64, 64), i.setPosition(266, 0), g.addChild(i);
            let j = new c("", 34, e, "start", "middle");
            j.setPosition(-216, -18), g.addChild(j);
            let k = new c("", 34, e, "end", "middle");
            k.setPosition(216, -18), g.addChild(k);
            let l = new c("", 30, f, "start", "middle");
            l.setPosition(-216, 20), g.addChild(l);
            let m = new c("", 30, f, "end", "middle");
            m.setPosition(216, 20), g.addChild(m);
            let n = new c("即将超越", 30, f, "center", "middle");
            n.setPosition(0, 0), g.addChild(n);
        },
        UpdateInGameRank: function(a, b) {
            let c = a.children[0], e = c.children[0], f = c.children[1], g = c.children[2], h = c.children[3], i = c.children[4], j = c.children[5], k = d.instance.friendRankList, l = 0;
            for (let c, d = k.length - 1; 0 <= d; d--) if (c = k[d], c.score > b) {
                l = d + 1;
                break;
            }
            if (e.setSrc(d.instance.selfUserInfo.avatarUrl), g.setText("" + b), i.setText("第" + (l + 1) + "名"), 
            0 == l) f.setSrc(""), h.setText(""), j.setText(""); else {
                let a = k[l - 1];
                f.setSrc(a.avatarUrl), h.setText("" + a.score), j.setText("第" + l + "名");
            }
        }
    };
})();