const DIC = require('dependencyinjection');

const container = new DIC.Container(new DIC.ServiceLocator());
const loader = new DIC.JsonFileLoader(container);
loader.loadFile('ModuleA', __dirname + '/ModuleA/services.json');

const myService = container.get('ModuleA/myService');
myService.test();
