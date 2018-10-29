(function() {
    require("utils/ald-game.js"), require("libs/weapp-adapter/index");
    var a = require("libs/xmldom/dom-parser");
    window.DOMParser = a.DOMParser, require("libs/wx-downloader.js"), wxDownloader.REMOTE_SERVER_ROOT = "", 
    wxDownloader.SUBCONTEXT_ROOT = "", require("src/settings"), require("main");
})();