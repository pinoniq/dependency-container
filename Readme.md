# Dependecy Injection Container for Node

A simple DIC and ServiceLocator based heavily on the Symfony DI Component.

## Concepts

A container loads a requested service using a given ServiceLocator.

But, we have require, right?

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

### Container

Since it's a dependency injection container library (so many words), we need to start with our ContainerBuilder:

```javascript
var ContainerBuilder = require('dependencyinjection/src/ContainerBuilder');
```

The container builder requires a ServiceLocator as an argument. A service locator is a dock that quacks like:

```javascript
{
    /**
     * Resolve a serviceId and require the module
     *
     * @param serviceId
     * @returns {*}
     */
    resolve: function resolve(serviceId) {}
}
```

If you really like require, you can use the following:

```javascript
var container = new ContainerBuilder({
    resolve: require
});
```


### Registering services

To add a service to the container:

```javascript
container.register('serviceId', 'my/service');
```

Now, this service can be retrieved anywhere using:

```javascript
container.get('serviceId');
```

> Internally this will call the ServiceLocator.reslolve(serviceId) to retrieve the module
> Once retrieved, it will instantiate an instance and return it

> By default all services are Singletons, once instantiated, the same object is allways returned

### Definint our services

When registering a service, a Definition object is returned.
This allows us to configure the way our container will load our service.

```javascript
var definition = container.register('serviceId', 'my/service');
```

We can now add arguments to the definition:

```javascript
definition.addArgument('someValue');
```

> When the service is retrieve, 'someValue' will be passed in to the constructor as first argument.

> Currently named parameters are not yet supported, but are on the roadmap \o/

Next to simple value arguments, the container also supports references to other services:

```javascript
definition.addArgument('@serviceIdOfTheServiceThatNeedsToBeAddedAsADependency');
```

> Note that it's advised to not use serviceId's like the one above.

## Adding parameters to the Container

```javascript
myContainerBuilder.addParameter('parameterName', 'value');
```

We can now reference this parameter as an argument of our definitions:

```javascript
myServiceDefinition.addArgument('%parameterName');
```

## ServiceLocator

@TODO: write doc

## JsonFileLoader

@TODO: write doc

## Roadmap

* allow named arguments in servide definitions
* cool stuff

## Author

 - Jeroen "pinoniq" Meeus
 