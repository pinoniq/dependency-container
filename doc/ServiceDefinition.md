# Defining our services

When registering a service, a Definition object is returned. (See [Container::register](/doc/Container.md))
This allows us to configure the way our container will load our service.

```javascript
var definition = container.register('serviceId', 'my/service');
```

## Adding arguments by value

We can now add arguments to the definition:

```javascript
definition.addArgument('someValue');
```

> When the service is retrieved, 'someValue' will be passed in to the constructor as first argument as-is.

## Adding a container parameter as an argument

Next to simple value arguments, the container also supports references to parameters:

```javascript
definition.addArgument('%parameterId');
```

When retrieving the service from the container, the container will retrieve the parameter using container::getParameter.

## Adding a container service as an argument

The container also supports references to other services:

```javascript
definition.addArgument('@parameterId');
```

When retrieving the service from the container, the container will retrieve the service using container::get.

## Singleton

By default, each service is a Singleton. Calling container.get() will thus always return the same instance.

To overwrite this, you can call:
```angular2html
definition.setSingleton(false);
```
This will tell the container to create a new isntance everytime container.get() is called.
