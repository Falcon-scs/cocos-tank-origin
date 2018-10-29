function a(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function b(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function c(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var d = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./HTMLElement"), f = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(e), g = function(e) {
    function f(c) {
        return a(this, f), b(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, c));
    }
    return c(f, e), d(f, [ {
        key: "addTextTrack",
        value: function() {}
    }, {
        key: "captureStream",
        value: function() {}
    }, {
        key: "fastSeek",
        value: function() {}
    }, {
        key: "load",
        value: function() {}
    }, {
        key: "pause",
        value: function() {}
    }, {
        key: "play",
        value: function() {}
    } ]), f;
}(f.default);

exports.default = g, module.exports = exports["default"];