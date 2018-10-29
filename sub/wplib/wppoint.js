(function() {
    function a(a, b) {
        this.x = a, this.y = b;
    }
    a.prototype.setXY = function(a, b) {
        this.x = a, this.y = b;
    }, a.prototype.setX = function(a) {
        this.x = a;
    }, a.prototype.setY = function(a) {
        this.y = a;
    }, module.exports = {
        WPPoint: a
    };
})();