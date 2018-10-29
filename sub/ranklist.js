(function() {
    function a() {
        this.dataList = [], this.cityName = "";
    }
    function b(a) {
        return "sub/res/images/starNum" + a + ".png";
    }
    function c(a) {
        return 0 == a && (a = 1), 3 < a && (a = 3), "sub/res/images/levelStar" + a + ".png";
    }
    var d = require("./wplib/wpnode.js").WPNode, e = require("./wplib/wpsprite.js").WPSprite, f = require("./wplib/wplist.js").WPList, g = require("./wplib/wplabel.js").WPLabel, h = require("./wxapi"), j = "sub/res/images/first_total.png", i = "sub/res/images/numsbg.png", k = "sub/res/images/headFrame_top.png", l = "sub/res/images/headFrame_normal.png";
    a.prototype.getFriendRankList = function(a, b) {
        var c = this;
        h.instance.getFriendRank(function(b) {
            c.dataList = b, a(c.genList());
        }, b);
    }, a.prototype.getTodayRankList = function(a, b, c) {
        let d = this, e = [];
        for (let d = 0; d < a.length; d++) e.push(a[d].openid);
        h.instance.getUserInfos(e, function(c) {
            for (let b = 0; b < a.length; b++) {
                let d = a[b], e = c.data[b];
                d.nickname = e.nickName, d.avatarUrl = e.avatarUrl;
            }
            d.dataList = a, b(d.genList());
        }, c);
    }, a.prototype.getFriendTotalRankList = function(a, b) {
        var c = this;
        h.instance.getFriendTotalRankList(function(b) {
            c.dataList = b, 0 == c.dataList.length ? a(c.getNullLabel(!0)) : a(c.createList(!0));
        }, b);
    }, a.prototype.getNullLabel = function(a) {
        let b = new g("暂无排行数据，快去邀请好友加入！", 28, "#B96A46", "center", "middle");
        b.isBold = !1;
        let c, d, e, f, h;
        return a ? (c = 980, d = 468, h = 115) : (c = 820, d = 186, h = 150), e = c / 2 - 20, 
        f = d / 2, a, b.setPosition(e, f), b;
    }, a.prototype.getFriendLevelRankList = function(a, b, c) {
        var d = this;
        h.instance.getFriendLevelRankList(a, function(a) {
            d.dataList = a, 0 == d.dataList.length ? b(d.getNullLabel(!1)) : b(d.createList(!1));
        }, c);
    }, a.prototype.getWorldTotalRankList = function(a, b, c) {
        var d = this;
        this.getWorldRankList(!0, a, function(a) {
            d.dataList = a, 0 == d.dataList.length ? b(d.getNullLabel(!0)) : b(d.createList(!0));
        }, c);
    }, a.prototype.getWorldLevelRankList = function(a, b, c) {
        var d = this;
        this.getWorldRankList(!1, a, function(a) {
            d.dataList = a, 0 == d.dataList.length ? b(d.getNullLabel(!1)) : b(d.createList(!1));
        }, c);
    }, a.prototype.getCityTotalRankList = function(a, b, c, d) {
        var e = this;
        this.cityName = a, this.getWorldRankList(!0, b, function(a) {
            e.dataList = a, 0 == e.dataList.length ? c(e.getNullLabel(!0)) : c(e.createList(!0));
        }, d, !0);
    }, a.prototype.getCityLevelRankList = function(a, b, c, d) {
        var e = this;
        this.cityName = a, this.getWorldRankList(!1, b, function(a) {
            e.dataList = a, 1 == e.dataList.length ? c(e.getNullLabel(!1)) : c(e.createList(!1, !0));
        }, d, !0);
    }, a.prototype.getBlankLevelData = function(a) {
        let b = {
            nickname: "测试员",
            avatarUrl: "",
            level: a,
            star: 3,
            time: ~~(12e4 * Math.random())
        };
        return b;
    }, a.prototype.getWorldRankList = function(a, b, c, d, e = !1) {
        let f = this, g = [];
        for (let f = 0; f < b.length; f++) a ? (b[f].level = b[f].total_level, b[f].stars = b[f].total_star, 
        b[f].time = b[f].total_time) : (b[f].level = b[f].game_level, b[f].star = b[f].game_star, 
        b[f].time = b[f].game_time), g.push(b[f].openid);
        h.instance.getUserInfos(g, function(d) {
            for (let a = 0; a < b.length; a++) for (let c = 0; c < d.data.length; c++) if (b[a].openid == d.data[c].openId) {
                let e = b[a], f = d.data[c];
                e.nickname = f.nickName, e.avatarUrl = f.avatarUrl;
                break;
            }
            !a && 5 < b.length && b.push(f.getBlankLevelData(b[0].level)), e && !a ? b.unshift(f.getBlankLevelData(1)) : e && a && 4 <= b.length && (console.log("城市总排行底部补充"), 
            b.push(f.getBlankLevelData(1))), f.dataList = b, c(b);
        }, d);
    }, a.prototype.genList = function() {
        var a = this;
        return new f(this.dataList.length, 100, function(b, c) {
            return c || (c = a.newRankItemNode(b)), a.configRankItemNode(b, c), c;
        }, 319, 441, 638, 882);
    }, a.prototype.createList = function(a, b = !1) {
        var c = this;
        let d, e, g, h, i;
        return a ? (d = 980, e = 468, i = 115) : (d = 900, e = 186, i = 150), g = d / 2, 
        h = e / 2, new f(a, this.dataList.length, i, function(d, e) {
            return e || (e = a ? c.newTotalRankItemNode(d) : c.newLevelRankItemNode(d)), a ? c.configTotalRankItemNode(d, e) : b ? c.configCityLevelRankItemNode(d, e) : c.configLevelRankItemNode(d, e), 
            e;
        }, g, h, d, e);
    }, a.prototype.newRankItemNode = function() {
        let a = new d(), b = new e("sub/res/images/item_bg.png");
        b.setSize(636, 100), a.addChild(b);
        let c = new e("sub/res/images/first_icon.png");
        c.setSize(52, 52), c.setPosition(-260, 0), a.addChild(c);
        let f = new g("", 30, "#ffffff", "center", "middle");
        f.setPosition(-260, 0), a.addChild(f);
        let h = new e("");
        h.setSize(68, 68), h.setPosition(-160, 0), a.addChild(h);
        let i = new g("", 30, "#ffffff", "start", "middle");
        i.setPosition(-80, 0), a.addChild(i);
        let j = new g("", 30, "#ffffff", "end", "middle");
        return j.setPosition(260, 0), a.addChild(j), a;
    }, a.prototype.newLevelRankItemNode = function() {
        let a = new d(), b = new e("");
        b.setSize(70, 70), b.setPosition(0, -23), a.addChild(b);
        let c = new e(k);
        c.setSize(70, 70), c.setPosition(0, -23), a.addChild(c);
        let f = new e("sub/res/images/headMask2.png");
        f.setSize(70, 70), f.setPosition(0, -23), a.addChild(f);
        let h = new e("");
        h.setPosition(0, -77), a.addChild(h);
        let i = this.createSpriteLevelRank(1);
        i.setPosition(34, 11), a.addChild(i);
        let j = new g("", 20, "#FFF03F", "center", "middle");
        j.setPosition(0, 41), a.addChild(j);
        let l = new e("sub/res/images/timer.png");
        l.setSize(22, 22), l.setPosition(-27, 72), a.addChild(l);
        let m = new g("", 22, "#ffffff", "start", "middle");
        m.setPosition(-12, 71), a.addChild(m);
        let n = new d();
        return n.setPosition(0, 0), a.addChild(n), a;
    }, a.prototype.newTotalRankItemNode = function() {
        let a = new d(), b = new e("sub/res/images/itembg_total.png");
        b.setSize(952, 102), a.addChild(b);
        let c = new e(j);
        c.setPosition(-418, 0), a.addChild(c);
        let f = this.createSpriteRankNum(100);
        f.setPosition(-418, 0), a.addChild(f);
        let h = new e("");
        h.setSize(86, 86), h.setPosition(-316, 0), a.addChild(h);
        let i = new e("sub/res/images/headMask.png");
        i.setSize(86, 86), i.setPosition(-316, 0), a.addChild(i);
        let k = new g("", 28, "#fff03f", "start", "middle");
        k.isBounder = !1, k.setPosition(-251, 0), a.addChild(k);
        let l = new g("", 36, "#ffffff", "start", "middle");
        l.setPosition(-23, 0), a.addChild(l);
        let m = new e("sub/res/images/star_total.png");
        m.setPosition(155, 0), a.addChild(m);
        let n = new g("", 36, "#ffffff", "start", "middle");
        n.setPosition(191, 0), a.addChild(n);
        let o = new g("", 28, "#ffffff", "start", "middle");
        return o.setPosition(339, 0), a.addChild(o), a;
    }, a.prototype.createSpriteRankNum = function(a) {
        let b = new d();
        9 >= a && (a = "0" + a);
        let c = new g(a, 48, "#7F3F20", "center", "middle");
        return c.isBounder = !1, c.opacity = .8, c.setPosition(0, 0), b.addChild(c), b;
    }, a.prototype.setSpriteRankNum = function(a, b) {
        9 >= b && (b = "0" + b);
        let c = a.children[0];
        c.setText(b), c.setPosition(0, 0);
    }, a.prototype.createSpriteLevelNum = function(a) {
        let c = new d(), f = parseInt(a / 100), g = parseInt(a / 10) % 10, h = new e(b(f));
        h.setSize(35, 36), h.setPosition(-15, 0), c.addChild(h);
        let i = new e(b(g));
        i.setSize(35, 36), i.setPosition(15, 0), c.addChild(i);
        let j = new e(b(a - 10 * g - 100 * f));
        j.setSize(35, 36), j.setPosition(45, 0), c.addChild(j);
        let k = new e("sub/res/images/guan.png");
        return k.setSize(40, 42), k.setPosition(77, 0), c.addChild(k), c;
    }, a.prototype.setSpriteLevelNum = function(a, c) {
        let d = a.children[0], e = a.children[1], f = a.children[2], g = parseInt(c / 100), h = parseInt(c / 10) % 10, i = c - 10 * h - 100 * g;
        99 >= c ? (d.visible = !1, e.visible = !0, f.visible = !0, e.setSrc(b(h)), f.setSrc(b(i))) : (d.visible = !0, 
        e.visible = !0, f.visible = !0, d.setSrc(b(g)), e.setSrc(b(h)), f.setSrc(b(i)));
    }, a.prototype.createSpriteStarNum = function(a) {
        let c = new d(), f = parseInt(a / 1e3) % 10, g = parseInt(a / 100) % 10, h = parseInt(a / 10) % 10, i = a - 10 * h - 100 * g - 1e3 * f, j = new e(b(g));
        j.setSize(35, 36), j.setPosition(45, 0), c.addChild(j);
        let k = new e(b(h));
        k.setSize(35, 36), k.setPosition(75, 0), c.addChild(k);
        let l = new e(b(i));
        l.setSize(35, 36), l.setPosition(105, 0), c.addChild(l);
        let m = new e(b(i));
        m.setSize(35, 36), m.setPosition(135, 0), c.addChild(m);
        let n = new e("sub/res/images/mutiply.png");
        return n.setSize(30, 30), n.setPosition(15, 3), c.addChild(n), c;
    }, a.prototype.setSpriteStarNum = function(a, c) {
        let d = a.children[0], e = a.children[1], f = a.children[2], g = a.children[3], h = parseInt(c / 1e3) % 10, i = parseInt(c / 100) % 10, j = parseInt(c / 10) % 10, k = c - 10 * j - 100 * i - 1e3 * h;
        999 < c ? (d.visible = !0, e.visible = !0, f.visible = !0, g.visible = !0, d.setSrc(b(h)), 
        e.setSrc(b(i)), f.setSrc(b(j)), g.setSrc(b(k))) : 999 >= c && 99 < c ? (d.visible = !0, 
        e.visible = !0, f.visible = !0, g.visible = !1, d.setSrc(b(i)), e.setSrc(b(j)), 
        f.setSrc(b(k))) : 99 >= c && 9 < c ? (d.visible = !0, e.visible = !0, f.visible = !1, 
        g.visible = !1, d.setSrc(b(j)), e.setSrc(b(k))) : (d.visible = !0, e.visible = !1, 
        f.visible = !1, g.visible = !1, d.setSrc(b(k)));
    }, a.prototype.createSpriteTime = function(a) {
        let c = new d(), f = 1e3 < a ? ~~(a / 1e3) : a, g = parseInt(f / 60), h = f - 60 * g, i = parseInt(h / 10) % 10, j = new e(b(g));
        j.setSize(26, 30), j.setPosition(13, 0), c.addChild(j);
        let k = new e(b(i));
        k.setSize(26, 30), k.setPosition(65, 0), c.addChild(k);
        let l = new e(b(h - 10 * i));
        l.setSize(26, 30), l.setPosition(91, 0), c.addChild(l);
        let m = new e("sub/res/images/time.png");
        return m.setSize(26, 30), m.setPosition(39, 0), c.addChild(m), c;
    }, a.prototype.setSpriteTime = function(a, c) {
        let d = a.children[0], e = a.children[1], f = a.children[2], g = 1e3 < c ? ~~(c / 1e3) : c, h = parseInt(g / 60), i = g - 60 * h, j = parseInt(i / 10) % 10;
        d.setSrc(b(h)), e.setSrc(b(j)), f.setSrc(b(i - 10 * j));
    }, a.prototype.createSpriteLevelRank = function(a) {
        let b = new d(), c = new e(i);
        c.setSize(76, 32), c.setPosition(0, 0), b.addChild(c);
        let f = new g(a, 24, "#7F3F20", "center", "middle");
        return f.isBounder = !1, f.setPosition(1, 0), b.addChild(f), b;
    }, a.prototype.setSpriteLevelRank = function(a, b) {
        let c = a.children[1], d = a.children[0];
        c.setText(b), c.setPosition(0, 0), 99 < b ? (d.setSrc(i), d.setSize(84, 32)) : 9 < b && 99 >= b ? (d.setSrc(i), 
        d.setSize(56, 32)) : (3 >= b ? d.setSrc("sub/res/images/singlebg.png") : d.setSrc(i), 
        d.setSize(38, 32));
    }, a.prototype.configRankItemNode = function(a, b) {
        let c = b.children[0], d = b.children[1], e = b.children[2], f = b.children[3], g = b.children[4], h = b.children[5];
        if (3 > a) {
            d.setVisible(!0), e.setVisible(!1), d.setSrc([ "sub/res/images/first_icon.png", "sub/res/images/second_icon.png", "sub/res/images/third_icon.png" ][a]);
        } else d.setVisible(!1), e.setVisible(!0), this.setSpriteRankNum(e, a + 1);
        if (a < this.dataList.length) {
            var i = this.dataList[a];
            f.setSrc(i.avatarUrl), g.setText(i.nickname), h.setText("" + i.score);
        }
    }, a.prototype.configTotalRankItemNode = function(a, b) {
        let c = b.children[0], d = b.children[1], e = b.children[2], f = b.children[3], g = b.children[4], h = b.children[5], i = b.children[6], k = b.children[7], l = b.children[8], m = b.children[9];
        if (3 > a) {
            d.setVisible(!0), e.setVisible(!1), d.setSrc([ j, "sub/res/images/second_total.png", "sub/res/images/third_total.png" ][a]);
        } else d.setVisible(!1), e.setVisible(!0), this.setSpriteRankNum(e, a + 1);
        if (a < this.dataList.length) {
            var n = this.dataList[a];
            let c = !0;
            a == this.dataList.length - 1 && "测试员" == n.nickname && (b.setVisible(!1), c = !1), 
            c && (b.setVisible(!0), f.setSrc(n.avatarUrl), h.setText(this.getStringByLen(n.nickname, 14)), 
            i.setText(n.level + "关"), l.setText("x" + n.stars), m.setText(this.getTimeStringHour(n.time)));
        }
    }, a.prototype.setRankItemVisible = function(a, b) {
        let c = b.children[0], d = b.children[2], e = b.children[1], f = b.children[3], g = b.children[4], h = b.children[5], i = b.children[6], j = b.children[7];
        c.setVisible(a), d.setVisible(a), e.setVisible(a), f.setVisible(a), g.setVisible(a), 
        h.setVisible(a), i.setVisible(a), j.setVisible(a);
    }, a.prototype.configCityLevelRankItemNode = function(a, b) {
        let d = b.children[0], e = b.children[2], f = b.children[1], g = b.children[3], h = b.children[4], i = b.children[5], j = b.children[6], m = b.children[7], n = b.children[8];
        if (this.setRankItemVisible(!0, b), n.removeAllChildren(), 0 == a) {
            this.setRankItemVisible(!1, b);
            let a = this.getStringWrap(this.cityName, 4);
            a.unshift("当前城市"), this.getWrapText(n, a, 24);
        } else 1 <= a && 3 >= a ? (f.setSize(93, 93), f.setSrc(k), i.fontColor = "#FFF03F") : (f.setSize(70, 70), 
        f.setSrc(l), i.fontColor = "#EBA380");
        if (this.setSpriteLevelRank(h, a), 0 < a && a < this.dataList.length) {
            var o = this.dataList[a];
            d.setSrc(o.avatarUrl), i.setText(this.getStringByLen(o.nickname, 8)), g.setSrc(c(o.star)), 
            m.setText(this.getTimeString(o.time));
        }
    }, a.prototype.configLevelRankItemNode = function(a, b) {
        let d = b.children[0], e = b.children[2], f = b.children[1], g = b.children[3], h = b.children[4], i = b.children[5], j = b.children[6], m = b.children[7];
        if (3 > a ? (f.setSize(93, 93), f.setSrc(k), i.fontColor = "#FFF03F") : (f.setSize(70, 70), 
        f.setSrc(l), i.fontColor = "#EBA380"), this.setSpriteLevelRank(h, a + 1), a < this.dataList.length) {
            var n = this.dataList[a];
            d.setSrc(n.avatarUrl), i.setText(this.getStringByLen(n.nickname, 8)), g.setSrc(c(n.star)), 
            m.setText(this.getTimeString(n.time));
        }
    }, a.prototype.getTimeString = function(a) {
        let b = 1e3 < a ? ~~(a / 1e3) : a, c = parseInt(b / 60), d = b - 60 * c;
        return 10 > d && (d = "0" + d), c + ":" + d;
    }, a.prototype.getTimeStringHour = function(a) {
        let b = 1e3 < a ? ~~(a / 1e3) : a, c = parseInt(b / 60), d = parseInt(c / 60);
        c -= 60 * d;
        let e = b - 60 * c - 3600 * d;
        return 10 > e && (e = "0" + e), 10 > c && (c = "0" + c), d + ":" + c + ":" + e;
    }, a.prototype.getStringByLen = function(a, b) {
        if (a = "" + a, 2 * a.length <= b) return a;
        for (var c = 0, d = "", e = 0; e < a.length; e++) if (d += a.charAt(e), 128 < a.charCodeAt(e)) {
            if (c += 2, c >= b) return d.substring(0, d.length - 1) + "...";
        } else if (++c, c >= b) return d.substring(0, d.length - 2) + "...";
        return d;
    }, a.prototype.getStringWrap = function(a, b) {
        if (a += "", a.length <= b) return [ a ];
        let c = [], d = 0;
        for (;c.push(a.substring(d, d + b)), !(d + b > a.length); ) d += b;
        return c;
    }, a.prototype.getWrapText = function(a, b, c) {
        2 >= b.length && (c += 10);
        let d = !(1 != b.length % 2), e = parseInt(b.length / 2), f = d ? e * c : e * c - c / 2, h = c;
        for (let d, j = 0; j < e; j++) d = new g(b[j], 24, "#B96A46", "center", "middle"), 
        d.setPosition(0, -f + h * j), a.addChild(d);
        let j = 0;
        if (d) {
            for (let c, d = b.length - 1; d > e; d--) c = new g(b[d], 24, "#B96A46", "center", "middle"), 
            c.setPosition(0, f - h * j), a.addChild(c), j++;
            let c = new g(b[e], 24, "#B96A46", "center", "middle");
            c.setPosition(0, 0), a.addChild(c);
        } else for (let c, d = b.length - 1; d >= e; d--) c = new g(b[d], 24, "#B96A46", "center", "middle"), 
        c.setPosition(0, f - h * j), a.addChild(c), j++;
    };
    var m = new a(), n = new a(), o = new a(), p = new a(), q = new a(), r = new a();
    module.exports = {
        RankList: a,
        cityLevel: m,
        cityTotal: n,
        friendLevel: o,
        friendTotal: p,
        worldLevel: q,
        worldTotal: r
    };
})();