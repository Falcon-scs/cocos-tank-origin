(function() {
    function a() {
        this.friendRankList = [], this.selfUserInfo = null, this.scoreInfo = null, this.levelInfos = new Map(), 
        this.openId = null;
    }
    var b = !1, c = "formalLevelInfo_seg_", d = "formalScoreInfo";
    a.prototype.getFriendRank = function(a, b) {
        var c = this;
        wx.getFriendCloudStorage({
            keyList: [ "score" ],
            success: function(b) {
                var d = b.data;
                d.sort(function(c, a) {
                    var b = parseInt(c.KVDataList[0].value), d = parseInt(a.KVDataList[0].value);
                    return b == d ? 0 : b > d ? -1 : 1;
                });
                for (let a, c = 0; c < d.length; c++) a = d[c], a.score = a.KVDataList[0].value;
                c.friendRankList = d, a(d);
            },
            fail: b
        });
    }, a.prototype.getUserInfos = function(a, b, c) {
        wx.getUserInfo({
            openIdList: a,
            lang: "zh_CN",
            success: b,
            fail: c
        });
    }, a.prototype.getSelfUserInfo = function(a) {
        var b = this;
        b.getUserInfos([ "selfOpenId" ], function(c) {
            b.selfUserInfo = c.data[0], "function" == typeof a && a();
        }, function() {
            console.log("get self user info failed");
        });
    }, a.prototype.updateScore = function(a) {
        var b = this;
        b.getUserScore(function(c, d) {
            c && a > d && b.setUserScore(a);
        });
    }, a.prototype.updateScoreInfo = function(a) {
        this.setUserScoreInfo(a);
    }, a.prototype.updateLevelInfo = function(a) {
        this.setUserLevelInfo(a);
    }, a.prototype.testFriendTotalRank = function() {
        let a = [];
        for (let b, c = 0; 20 > c; c++) {
            b = {}, b.nickname = "测试员" + c, b.avatarUrl = "";
            let d = {
                level: ~~(40 * Math.random()),
                stars: ~~(120 * Math.random()),
                time: ~~(12e4 * Math.random())
            };
            b.KVDataList = [ {
                value: JSON.stringify(d)
            } ], a.push(b);
        }
        return a;
    }, a.prototype.getBlankLevelData = function(a) {
        let b = {
            nickname: "测试员",
            avatarUrl: ""
        }, c = [], d = {
            level: a,
            star: ~~(3 * Math.random()) + 1,
            time: ~~(12e4 * Math.random())
        };
        return c.push(d), b.KVDataList = [ {
            value: JSON.stringify(c)
        } ], b;
    }, a.prototype.testFriendLevelRank = function(a) {
        let b = [];
        for (let c, d = 0; 20 > d; d++) {
            c = {}, c.nickname = "测试员" + d, c.avatarUrl = "";
            let e = [];
            for (let b, c = 0; 10 > c; c++) b = {
                level: a,
                star: ~~(3 * Math.random()) + 1,
                time: ~~(12e4 * Math.random())
            }, e.push(b);
            c.KVDataList = [ {
                value: JSON.stringify(e)
            } ], b.push(c);
        }
        return b;
    }, a.prototype.getFriendTotalRankList = function(a, b) {
        var c = this;
        wx.getFriendCloudStorage({
            keyList: [ d ],
            success: function(b) {
                console.log("getFriendCloudStorage success--\x3e" + JSON.stringify(b));
                var d = b.data;
                let e = d.length;
                for (let a, f = e - 1; 0 <= f; f--) {
                    if (a = d[f], 0 >= a.KVDataList.length) {
                        d.splice(f, 1);
                        continue;
                    }
                    a.openid == c.openId && null != c.scoreInfo && (a.KVDataList[0].value = JSON.stringify(c.scoreInfo));
                }
                d.sort(function(d, a) {
                    var b = JSON.parse(d.KVDataList[0].value), e = JSON.parse(a.KVDataList[0].value);
                    return c.compareScoreInfo(b, e);
                });
                for (let a = 0; a < d.length; a++) {
                    let b = d[a], c = JSON.parse(b.KVDataList[0].value);
                    b.level = c.level, b.stars = c.stars, b.time = c.time;
                }
                c.friendRankList = d, a(d);
            },
            fail: b
        });
    }, a.prototype.getFriendLevelRankList = function(d, a, b) {
        var e = this;
        let f = this.getLevelKey(d), g = c + f.seg;
        wx.getFriendCloudStorage({
            keyList: [ g ],
            success: function(b) {
                var c = b.data;
                let f = c.length;
                for (let a, h = f - 1; 0 <= h; h--) {
                    if (a = c[h], 0 >= a.KVDataList.length) {
                        c.splice(h, 1);
                        continue;
                    }
                    a.openid == e.openId && (e.levelInfos.has(g) ? (console.log("本地数据替换", e.levelInfos.get(g)), 
                    a.KVDataList[0].value = JSON.stringify(e.levelInfos.get(g))) : console.log("本地数据替换失败，没有改数据"));
                    let b = JSON.parse(a.KVDataList[0].value), f = e.verifyLevelInfo(b);
                    if (b = f.infos, f.flag && a.openid == e.openId) {
                        let a = [ {
                            key: g,
                            value: JSON.stringify(b)
                        } ];
                        wx.setUserCloudStorage({
                            KVDataList: a,
                            success: function() {
                                console.log("friend level setUserLevelInfo success--\x3e", b);
                            },
                            fail: function() {
                                console.log("friend level setUserLevelInfo fail--\x3e", b);
                            }
                        });
                    }
                    a.KVDataList[0].value = JSON.stringify(b), null == e.findHasLevelInfo(d, b) && (console.log("没有数据,移除信息", b), 
                    c.splice(h, 1));
                }
                c.sort(function(c, a) {
                    var b = JSON.parse(c.KVDataList[0].value), f = JSON.parse(a.KVDataList[0].value);
                    return e.compareLevelInfo(e.findHasLevelInfo(d, b), e.findHasLevelInfo(d, f));
                }), 5 < c.length && c.push(e.getBlankLevelData(d));
                for (let a = 0; a < c.length; a++) {
                    let b = c[a], f = JSON.parse(b.KVDataList[0].value), g = e.findHasLevelInfo(d, f);
                    b.level = g.level, b.star = g.star, b.time = g.time;
                }
                e.friendRankList = c, a(c);
            },
            fail: b
        });
    }, a.prototype.getLevelKey = function(a) {
        let b = parseInt(a / 10), c = a - 10 * b - 1;
        return -1 == c && (c = 9), {
            seg: b,
            num: c
        };
    }, a.prototype.findHasLevelInfo = function(a, b) {
        for (let c, d = 0; d < b.length; d++) if (c = b[d], null != c && void 0 != c && c.level == a) return c;
        return null;
    }, a.prototype.verifyLevelInfo = function(a) {
        let b = !1, c = a.length;
        for (let d, e = c - 1; 0 <= e; e--) d = a[e], (null == d || void 0 == d) && (console.log("有空数据,去除"), 
        b = !0, a.splice(e, 1));
        c = a.length;
        let d = [];
        for (let e, f = 0; f < c; f++) e = d.findIndex(b => b == a[f].level), -1 == e ? d.push(a[f].level) : (console.log("有重复数据,去除", a[f]), 
        b = !0, a.splice(f, 1), f--, c--);
        return {
            infos: a,
            flag: b
        };
    }, a.prototype.getUserLevelInfo = function(a, b) {
        var d = this;
        let e = this.getLevelKey(a.level), f = c + e.seg;
        console.log("要查询的关卡key为", f, "关卡为", a.level);
        wx.getUserCloudStorage({
            keyList: [ f ],
            success: function(c) {
                console.log("getLevelInfo success--\x3e" + JSON.stringify(c));
                var e = c.KVDataList;
                if (e && 0 < e.length) {
                    let c = JSON.parse(e[0].value), g = d.verifyLevelInfo(c);
                    if (c = g.infos, g.flag) {
                        let b = [ {
                            key: f,
                            value: JSON.stringify(c)
                        } ];
                        wx.setUserCloudStorage({
                            KVDataList: b,
                            success: function() {
                                console.log("verify setUserLevelInfo success--\x3e", a);
                            },
                            fail: function() {
                                console.log("verify setUserLevelInfo fail--\x3e", a);
                            }
                        });
                    }
                    if (!d.levelInfos.has(f)) console.log("将关卡数据缓存到本地"), d.levelInfos.set(f, c); else {
                        let a = d.levelInfos.get(f);
                        a.length < c.length && d.levelInfos.set(f, c);
                    }
                    let h = d.findHasLevelInfo(a.level, c);
                    return void (null == h ? b("noInfo") : b(h));
                }
                d.levelInfos.has(f) || d.levelInfos.set(f, []), b("noInfo");
            },
            fail: function() {
                console.log("getUserScore fail"), b("noInfo");
            }
        });
    }, a.prototype.compareScoreInfo = function(a, b) {
        return a.level == b.level ? a.stars == b.stars ? a.time == b.time ? 0 : a.time < b.time ? -1 : 1 : a.stars > b.stars ? -1 : 1 : a.level > b.level ? -1 : 1;
    }, a.prototype.compareLevelInfo = function(a, b) {
        return a.star == b.star ? a.time == b.time ? 0 : a.time < b.time ? -1 : 1 : a.star > b.star ? -1 : 1;
    }, a.prototype.setLevelInfo = function(a, b) {
        for (let c = 0; c < a.length; c++) if (a[c].level == b.level) return void (a[c] = b);
        a.push(b);
    }, a.prototype.setUserLevelInfo = function(a) {
        var b = this;
        let d = this.getLevelKey(a.level), e = c + d.seg;
        if (b.levelInfos.has(e)) {
            let c = b.levelInfos.get(e);
            b.setLevelInfo(c, a), b.levelInfos.set(e, c);
        } else {
            b.levelInfos.set(e, [ a ]);
        }
        this.getUserLevelInfo(a, function(c) {
            let d = !1, f = b.levelInfos.get(e);
            if ("noInfo" == c ? d = !0 : 0 > b.compareLevelInfo(a, c) ? d = !0 : console.log("成绩没有提升", a), 
            (e, b.verifyLevelInfo(f).flag) && (d = !0), d) {
                b.setLevelInfo(f, a);
                let c = [ {
                    key: e,
                    value: JSON.stringify(f)
                } ];
                wx.setUserCloudStorage({
                    KVDataList: c,
                    success: function() {
                        console.log("setUserLevelInfo success--\x3e", a);
                    },
                    fail: function() {
                        console.log("setUserLevelInfo fail--\x3e", a);
                    }
                });
            }
        });
    }, a.prototype.getUserScoreInfo = function(a) {
        this;
        null != this.scoreInfo && a(this.scoreInfo), wx.getUserCloudStorage({
            keyList: [ d ],
            success: function(b) {
                console.log("getUserScoreInfo success--\x3e" + JSON.stringify(b));
                var c = b.KVDataList;
                if (c && 0 < c.length) {
                    let b = JSON.parse(c[0].value);
                    a(b);
                } else a({
                    level: 0,
                    stars: 0
                });
            },
            fail: function() {
                console.log("getUserScoreInfo fail"), a({
                    level: 0,
                    stars: 0
                });
            }
        });
    }, a.prototype.setUserScoreInfo = function(a) {
        this;
        this.scoreInfo = a;
        var b = [ {
            key: d,
            value: JSON.stringify(a)
        } ];
        wx.setUserCloudStorage({
            KVDataList: b,
            success: function() {
                console.log("setUserScoreInfo success--\x3e", a);
            },
            fail: function() {
                console.log("setUserScoreInfo fail--\x3e", a);
            }
        });
    }, a.prototype.getUserScore = function(a) {
        this;
        wx.getUserCloudStorage({
            keyList: [ "score" ],
            success: function(b) {
                console.log("getUserScore success--\x3e" + JSON.stringify(b));
                var c = b.KVDataList;
                if (c && 0 < c.length) {
                    var d = parseInt(c[0].value);
                    a(!0, d);
                } else a(!0, -1);
            },
            fail: function() {
                console.log("getUserScore fail"), a(!1, 0);
            }
        });
    }, a.prototype.setUserScore = function(a) {
        var b = this;
        wx.setUserCloudStorage({
            KVDataList: [ {
                key: "score",
                value: a + ""
            } ],
            success: function() {
                console.log("setUserScore success--\x3e" + a);
            },
            fail: function() {
                console.log("setUserScore fail--\x3e" + a);
            }
        });
    };
    var e = new a();
    module.exports = {
        instance: e
    };
})();