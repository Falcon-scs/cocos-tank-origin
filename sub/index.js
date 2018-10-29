(function() {
    function a() {
        this.canvas = new d(), this.rankList = null, this.isShowTotal = !1, this.currentCityLevel = 0, 
        this.buffer_FriendTotalRankList = null, this.buffer_WorldTotalRankList = null, this.buffer_FriendLevelRankList = null, 
        this.buffer_WorldLevelRankList = null, this.buffer_CityLevelRankList = null, this.buffer_CityTotalRankList = null, 
        this.currentFriendLevel = 0, this.currentWorldLevel = 0, this.reLoadTime = 26e3, 
        this.LastReLoadTime_FriendLevel = 0, this.LastReLoadTime_WorldLevel = 0, this.LastReLoadTime_FriendTotal = 0, 
        this.LastReLoadTime_WorldTotal = 0, this.LastReLoadTime_CityTotal = 0, this.LastReLoadTime_CityLevel = 0;
    }
    var b = require("wxapi"), c = require("ranklist"), d = require("wplib/wpcanvas").WPCanvas, e = require("ingamerank"), f = require("gameresultrank");
    a.prototype.registerWxEvents = function() {
        var a = this;
        wx.onMessage(b => {
            let c = b.message + "";
            switch (c.includes("listTouch") || console.log("onMessage--\x3e" + b.message + "   ", JSON.stringify(b)), 
            b.message) {
              case "updateUserScore":
                {
                    let c = b.data.score;
                    a.updateScore(c);
                    break;
                }

              case "showFriendRank":
                {
                    a.showFriendRank();
                    break;
                }

              case "dismissFriendRank":
                {
                    a.dismissRank();
                    break;
                }

              case "showTodayRank":
                {
                    let c = b.data;
                    a.showTodayRank(c);
                    break;
                }

              case "dismissTodayRank":
                {
                    a.dismissRank();
                    break;
                }

              case "updateInGameRank":
                {
                    var d = b.data.score, e = b.data.color1, f = b.data.color2;
                    a.updateInGameRank(d, e, f);
                    break;
                }

              case "showGameResultRank":
                {
                    let c = b.data.openid;
                    a.showGameResultRank(c);
                    break;
                }

              case "dismissFriendRankAndShowGameResultRank":
                {
                    let c = b.data.openid;
                    a.dismissRank(), a.showGameResultRank(c);
                    break;
                }

              case "hideRankList":
                {
                    a.dismissRank();
                    break;
                }

              case "updateUserLevelInfo":
                {
                    a.updateOpendId(b.openid), a.updateLevelInfo(JSON.parse(b.data));
                    break;
                }

              case "updateUserScoreInfo":
                {
                    a.updateOpendId(b.openid), a.updateScoreInfo(JSON.parse(b.data));
                    break;
                }

              case "showFriendTotalRankList":
                {
                    a.updateOpendId(b.openid), a.showFriendRank(!0);
                    break;
                }

              case "showFriendLevelRankList":
                {
                    a.updateOpendId(b.openid), a.showFriendRank(!1, b.level);
                    break;
                }

              case "showWorldLevelRankList":
                {
                    a.updateOpendId(b.openid), a.showWorldRank(!1, JSON.parse(b.data), b.level);
                    break;
                }

              case "showWorldTotalRankList":
                {
                    a.updateOpendId(b.openid), a.showWorldRank(!0, JSON.parse(b.data));
                    break;
                }

              case "showCityTotalRankList":
                {
                    a.updateOpendId(b.openid), a.showCityRank(!0, JSON.parse(b.data), b.city);
                    break;
                }

              case "showCityLevelRankList":
                {
                    a.updateOpendId(b.openid), a.showCityRank(!1, JSON.parse(b.data), b.city, b.level);
                    break;
                }

              case "listTouchStart":
                {
                    if (a.rankList) {
                        let c = JSON.parse(b.data);
                        a.rankList.onTouchStart({
                            touches: [ c ]
                        });
                    }
                    break;
                }

              case "listTouchMove":
                {
                    if (a.rankList) {
                        let c = JSON.parse(b.data);
                        a.rankList.onTouchMove({
                            touches: [ c ]
                        });
                    }
                    break;
                }

              case "listTouchEnd":
                {
                    if (a.rankList) {
                        let c = JSON.parse(b.data);
                        a.rankList.onTouchEnd({
                            touches: [ c ]
                        });
                    }
                    break;
                }
            }
        });
    }, a.prototype.updateOpendId = function(a) {
        b.instance.openId = a;
    }, a.prototype.updateScore = function(a) {
        b.instance.updateScore(a);
    }, a.prototype.updateScoreInfo = function(a) {
        b.instance.updateScoreInfo(a);
    }, a.prototype.updateLevelInfo = function(a) {
        b.instance.updateLevelInfo(a);
    }, a.prototype.showFriendRank = function(a, b) {
        var d = this;
        d.canvas.removeAllChildren(), d.canvas.loop(), this.isShowTotal = a, a ? this.TimeReload(this.LastReLoadTime_FriendTotal) ? (d.LastReLoadTime_FriendTotal = Date.now(), 
        c.friendTotal.getFriendTotalRankList(function(a) {
            d.buffer_FriendTotalRankList = a, d.canvas.removeAllChildren(), d.applyList(a);
        }, function() {})) : d.applyList(d.buffer_FriendTotalRankList) : this.TimeReload(this.LastReLoadTime_FriendLevel) || b != this.currentFriendLevel ? (d.LastReLoadTime_FriendLevel = Date.now(), 
        this.currentFriendLevel = b, c.friendLevel.getFriendLevelRankList(b, function(a) {
            d.buffer_FriendLevelRankList = a, d.canvas.removeAllChildren(), d.applyList(a);
        }, function() {})) : d.applyList(d.buffer_FriendLevelRankList);
    }, a.prototype.showWorldRank = function(a, b, d) {
        var e = this;
        e.canvas.removeAllChildren(), e.canvas.loop(), this.isShowTotal = a, a ? this.TimeReload(this.LastReLoadTime_WorldTotal) ? (e.LastReLoadTime_WorldTotal = Date.now(), 
        c.worldTotal.getWorldTotalRankList(b, function(a) {
            e.buffer_WorldTotalRankList = a, e.canvas.removeAllChildren(), e.applyList(a);
        }, function() {})) : e.applyList(e.buffer_WorldTotalRankList) : this.TimeReload(this.LastReLoadTime_WorldLevel) || d != this.currentWorldLevel ? (e.LastReLoadTime_WorldLevel = Date.now(), 
        this.currentWorldLevel = d, c.worldLevel.getWorldLevelRankList(b, function(a) {
            e.buffer_WorldLevelRankList = a, e.canvas.removeAllChildren(), e.applyList(a);
        }, function() {})) : e.applyList(e.buffer_WorldLevelRankList);
    }, a.prototype.showCityRank = function(a, b, d, e) {
        var f = this;
        f.canvas.removeAllChildren(), f.canvas.loop(), this.isShowTotal = a, a ? this.TimeReload(this.LastReLoadTime_CityTotal) ? (f.LastReLoadTime_CityTotal = Date.now(), 
        c.cityTotal.getCityTotalRankList(d, b, function(a) {
            f.buffer_CityTotalRankList = a, f.canvas.removeAllChildren(), f.applyList(a);
        }, function() {})) : f.applyList(f.buffer_CityTotalRankList) : this.TimeReload(this.LastReLoadTime_CityLevel) || e != this.currentCityLevel ? (f.LastReLoadTime_CityLevel = Date.now(), 
        this.currentCityLevel = e, c.cityLevel.getCityLevelRankList(d, b, function(a) {
            f.buffer_CityLevelRankList = a, f.canvas.removeAllChildren(), f.applyList(a);
        }, function() {})) : f.applyList(f.buffer_CityLevelRankList);
    }, a.prototype.applyList = function(a) {
        this.canvas.addChild(a), a.onTouchStart != void 0 && (this.rankList = a), this.canvas.loop();
    }, a.prototype.TimeReload = function(a) {
        let b = Date.now();
        return !!(b - a >= this.reLoadTime);
    }, a.prototype.dismissRank = function() {
        var a = this;
        a.rankList = null, a.canvas.removeAllChildren();
    }, a.prototype.updateInGameRank = function(a, b, c) {
        var d = this;
        e.AddInGameRank(d.canvas, b, c), e.UpdateInGameRank(d.canvas, a);
    }, a.prototype.showGameResultRank = function(a) {
        var b = this;
        b.canvas.removeAllChildren(), f.GetGameResultRankNode(a, function(a) {
            b.canvas.addChild(a);
        }, function() {});
    };
    var g = new a();
    g.registerWxEvents();
})();