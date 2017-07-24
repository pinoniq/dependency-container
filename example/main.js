const DIC = require('../main');

const container = new DIC.Container(new DIC.ServiceLocator());
const loader = new DIC.JsonFileLoader(container);
loader.loadFile('ModuleA', __dirname + '/ModuleA/services.json');

const myService = container.get('ModuleA/myService');
myService.test();

const myOverwrittenService = container.get('ModuleA/myService', {
    foo: "A different message"
});
myOverwrittenService.test();

const myServiceLocator = container.get('ModuleA/myServiceLocator');
myServiceLocator.test();
