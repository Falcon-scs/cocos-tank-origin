(function() {
    function a(a, b) {
        this.leftTop = a, this.widthHeight = b;
    }
    a.prototype.setLeft = function(a) {
        this.leftTop.setX(a);
    }, a.prototype.setTop = function(a) {
        this.leftTop.setY(a);
    }, a.prototype.setWidth = function(a) {
        this.widthHeight.setX(a);
    }, a.prototype.setHeight = function(a) {
        this.widthHeight.setY(a);
    }, module.exports = {
        WPRect: a
    };
})();