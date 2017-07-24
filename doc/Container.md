# Container

Since it's a dependency injection container library (so many words), we need to start with our Container:

```javascript
const DIC = require('dependencyinjection');

const myContainer = new DIC.Container(serviceLocator);
```

## Registering services

To add a service to the container:

```javascript
myContainer.register('serviceId', 'my/service');
```

> The register method returns a Definition object. See [ServiceDefinition](/doc/ServiceDefinition.md) for more info

## Retrieving services

Now, this service can be retrieved anywhere using:

```javascript
myContainer.get('serviceId');
```

> Internally this will call the ServiceLocator.reslolve(serviceId) to retrieve the module
> Once retrieved, it will instantiate an instance and return it

> By default all services are Singletons, once instantiated, the same object is allways returned
> @see ServiceDefinition::setSingleton()

### Overwriting service parameters.
When working with non-singleton services. Some parameters are calculated at run-time.
You thus need to be able to overwrite certain parameters when creating a service.

This can be done by passing in the parameters as the optional second argument to container.get();

Lets say you have the following service definition:
```json
  {
    "myService": {
      "module": "ExampleService",
      "arguments": [
        "%foo"
      ],
      "singleton": false
    }
  }
```

you can now retrieve multiple instances of this service by doing the following calls:

```
container.get('myService', {
  foo: "some value"
});
container.get('myService', {
  foo: "some other value"
});
```

You can overwrite both services and parameters using this method.

## Registering parameters

To add a parameter to the container:

```javascript
myContainer.addParameter('parameterId', 'my-parameter');
```

## Retrieving parameters

Now, this parameter can be retrieved anywhere using:

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
const DIC = require('dependencyinjection');

var container = new DIC.Container({
    resolve: require
});
```

This package comes built in with a more advanced ServiceLocator that adds a lot of sugar. See [ServiceLocator](/doc/ServiceLocator.md)..

```javascript
const DIC = require('dependencyinjection')

const myServiceLocator = new DIC.ServiceLocator();
const myContainer = new DIC.Container(myServiceLocator);
```
