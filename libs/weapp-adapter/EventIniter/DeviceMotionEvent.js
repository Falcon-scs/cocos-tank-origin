function a(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var b = function b() {
    a(this, b), this.type = "devicemotion", this.accelerationIncludingGravity = null;
};

exports.default = b, wx.onAccelerometerChange && wx.onAccelerometerChange(function(a) {
    var c = new b();
    c.accelerationIncludingGravity = a, document.dispatchEvent(c);
}), module.exports = exports["default"];