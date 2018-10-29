(function() {
    (function() {
        function a() {
            var a = window._CCSettings;
            if (window._CCSettings = void 0, !a.debug) {
                var b = a.uuids, c = a.rawAssets, d = a.assetTypes, e = a.rawAssets = {};
                for (var f in c) {
                    var g = c[f], h = e[f] = {};
                    for (var k in g) {
                        var l = g[k], m = l[1];
                        "number" == typeof m && (l[1] = d[m]), h[b[k] || k] = l;
                    }
                }
                for (var n, o = a.scenes, p = 0; p < o.length; ++p) n = o[p], "number" == typeof n.uuid && (n.uuid = b[n.uuid]);
                var i = a.packedAssets;
                for (var q in i) for (var r = i[q], s = 0; s < r.length; ++s) "number" == typeof r[s] && (r[s] = b[r[s]]);
            }
            var j;
            cc.sys.isBrowser && (j = document.getElementById("GameCanvas"));
            var t = a.jsList, u = a.debug ? "src/project.dev.js" : "src/project.js";
            t ? (t = t.map(function(a) {
                return "src/" + a;
            }), t.push(u)) : t = [ u ], cc.sys.isNative && cc.sys.isMobile && (t = t.concat([ "src/anysdk/jsb_anysdk.js", "src/anysdk/jsb_anysdk_constants.js" ]));
            var v = {
                id: "GameCanvas",
                scenes: a.scenes,
                debugMode: a.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
                showFPS: !1,
                frameRate: 60,
                jsList: t,
                groupList: a.groupList,
                collisionMatrix: a.collisionMatrix,
                renderMode: 0
            };
            cc.game.run(v, function() {
                cc.view.resizeWithBrowserSize(!0), !1, cc.AssetLibrary.init({
                    libraryPath: "res/import",
                    rawAssetsBase: "res/raw-",
                    rawAssets: a.rawAssets,
                    packedAssets: a.packedAssets,
                    md5AssetsMap: a.md5AssetsMap
                }), !1;
                var b = a.launchScene;
                cc.director.loadScene(b, null, function() {
                    if (cc.sys.isBrowser) {
                        j.style.visibility = "";
                        var a = document.getElementById("GameDiv");
                        a && (a.style.backgroundImage = "");
                    }
                    cc.loader.onProgress = null, console.log("Success to load scene: " + b);
                });
            });
        }
        var b;
        require(window._CCSettings.debug ? "cocos2d-js.js" : "cocos2d-js-min.js");
        var b = cc.loader.md5Pipe || cc.loader.assetLoader;
        return cc.loader.insertPipeAfter(b, wxDownloader), void a();
    })();
})();