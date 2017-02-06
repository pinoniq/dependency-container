# Dependecy Injection Container for Node

A simple DIC based heavily on the Symfony DI Component.

## Installation

```
npm install dependencyinjection --save
```

## Configuration

The dependency injection container needs to be instantiated with a file loader.
Often, the global require will be enough:

```javascript
var ContainerBuilder = require('dependencyinjection/src/ContainerBuilder');
var myContainerBuilder = new ContainerBuilder(require);
```

## Usage

Before using it, the container needs to be configured:

## Registering services
To register a service:

```javascript
myContainerBuilder.register('serviceId', 'my/service');
```

retrieving an instance of your service now becomes:

```javascript
myContainerBuilder.get('serviceId');
```

## Configuring service definitions

When registering a service, a definition of that service is returned:
```javascript
var myServiceDefinition = myContainerBuilder.register('serviceId', 'my/service');
```

A definition can also be retrieved using
 ```javascript
var myServiceDefinition = myContainerBuilder.getDefinition('serviceID');
```

If your service requires values to be injected when create, you can configure it's arguments:

```javascript
myServiceDefinition.addArgument('someValue');
```

Next to simple values, you can also reference other services:

```javascript
myServiceDefinition.addArgument('@someOtherServiceId');
```

calling ```myContainerBuilder.get('serviceId')``` will create an instance of you service with the resolved otherServiceId passed in as an argument

## Adding parameters to the Container

```javascript
myContainerBuilder.addParameter('parameterName', 'value');
```

The argumentName can also be used in definitions by prefixing it's name with %:

```javascript
myServiceDefinition.addArgument('%parameterName');
```

## Roadmap

Implement all functionalities the Symfony DI Component delivers.

## Author

 - Jeroen "pinoniq" Meeus
 