function Service(message) {
    this.services = [];
}

Service.prototype = {
    test: function test() {
        this.services.forEach(function (service) {
            service.test();
        });
    },

    addFoo: function addFoo(service) {
        this.services.push(service);
    }
};

module.exports = Service;
