# Dependecy Injection Container for Node

A simple DIC and ServiceLocator based heavily on the Symfony DI Component.

## Concepts

A container loads a requested service using a given ServiceLocator.

FileLoaders configure the containers for a set of Services.

But, we have require/import/whatever, right?

## Differences with require and it's ../ hell

A small lists, because lists are cool:

* require does not support alias
* require does not support parameter binding
* require tends to be a pain in the *ss with it's relative paths
* require kind of enforces tight coupling of implementations

## Installation

```
npm install dependencyinjection --save
```

## Usage

Start by Creating a simple service, e.g. in the folder moduleA:

```javascript
// @file moduleA/Service.js
function Service(message) {
    this.message = message;
}

Service.prototype = {
    test: function test() {
        console.info(this.message);
    }
}

module.exports = Service;
```

Now we have created our Service, we will add the service to our JSON definition file:

```json
// @file moduleA/services.json
{
  "services": {
    "myService": {
      "module": "Service",
      "arguments": ["%foo"]
    }
  }
}
```

Notice how we define an argument that is a parameter called foo. For more info see [ServiceDefinition](./doc/ServiceDefinition.md)

Let's add this parameter to our container definition:

```json
// @file moduleA/services.json
{
  "parameters": {
    "foo": "bar"
  },
  "services": {
    "myService": {
      "module": "Service",
      "arguments": ["%foo"]
    }
  }
}
```

Now that we have defined our services, we need to fire up the container, and let the JsonFileLoader do it's job:

```javascript
import DIC from dependencyinjection;

const container = new DIC.Container(new DIC.ServiceLocator());
const loader = new DIC.JsonFileLoader(container);
loader.loadFile('ModuleAlias', __dirname + '/ModuleA/services.json')
```

That's it, you can now start using your services:

```javascript

const myService = container.get('ModuleAlias/myService');
myService.test(); // will log "bar" to console.info
```
## Documentation

* [Container](doc/Container.md)
* [ServiceDefinition](doc/ServiceDefinition.md)
* [ServiceLocator](doc/ServiceLocator.md)

## Roadmap

* allow named arguments in servide definitions
* cool stuff

## Author

 - Jeroen "pinoniq" Meeus
 