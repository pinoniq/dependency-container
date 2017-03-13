# Container

Since it's a dependency injection container library (so many words), we need to start with our Container:

```javascript
const Container = require('dependencyinjection/src/Container');

const myContainer = new Container(serviceLocator);
```

## Registering services

To add a service to the container:

```javascript
myContainer.register('serviceId', 'my/service');
```

> The register method returns a Definition object. See [ServiceDefinition](doc/ServiceDefinition.md) for more info

## Retrieving services

Now, this service can be retrieved anywhere using:

```javascript
myContainer.get('serviceId');
```

> Internally this will call the ServiceLocator.reslolve(serviceId) to retrieve the module
> Once retrieved, it will instantiate an instance and return it

> By default all services are Singletons, once instantiated, the same object is allways returned

## Registering parameters

To add a parameter to the container:

```javascript
myContainer.addParameter('parameterId', 'my-parameter');
```

## Retrieving services

Now, this service can be retrieved anywhere using:

```javascript
myContainer.getParameter('parameterId');
```

## Container ServiceLocator

The container builder requires a ServiceLocator as an argument. A service locator is a duck that quacks like:

```javascript
{
    /**
     * Resolve a serviceId and require the module
     *
     * @param serviceId
     * @returns {*} the resolved dependency
     */
    resolve: function resolve(serviceId) {}
}
```

### RequireJs as a ServiceLocator

If you really like require, you can use the following:

```javascript
const Container = require('dependencyinjection/src/Container');

var container = new Container({
    resolve: require
});
```

This package comes built in with a more advanced ServiceLocator that adds a lot of sugat. See [ServiceLocator](doc/ServiceLocator.md)..

```javascript
const ServiceLocator = require('dependencyinjection/src/ServiceLocator')
const Container = require('dependencyinjection/src/Container');

const myServiceLocator = new ServiceLocator();
const myContainer = new Container(myServiceLocator);
```
