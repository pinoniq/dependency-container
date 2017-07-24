function Service(message) {
    this.message = message;
}

Service.prototype = {
    test: function test() {
        console.info(this.message);
    }
};

module.exports = Service;