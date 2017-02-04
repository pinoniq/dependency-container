function DependencyInjectionException(message) {
    this.message = message;
}

DependencyInjectionException.prototype = {
    toString: function toString(){
        return typeof this + ": " + this.message;
    }
};

module.exports = DependencyInjectionException;
