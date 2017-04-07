## ServiceLocator

The sole purpose of a ServiceLocator is to "locate services". - Captain obvious

It does this by mapping serviceId's to the actual absolute path to require. This has 2 benefits:

* Services are no longer mapped to directory structure
* We can use alias's and replace service on the fly.

e.g. instead of requiring the file '/my/module/Foo/Some/Directory/Bar',
we can simply tell the Service Locator that:
* the alias Foo maps to /my/module/Foo
* the serviceId Bar maps to /some/Directory in the Foo module.

this means we now erquire the Foo/Bar service. And if during a refractoring of our Foo module, we change it's location, there is only the mapping to update.

> Much win

## Interface

The ServiceLocator has the following interface:

```javascript
ServiceLocator = {

    /**
     * Add an alias to the service locator
     * @param alias
     * @param root
     */
    addAlias: function addAlias(alias, root) {},
    
    /**
     * Resolve a serviceId and require the module
     *
     * @param serviceId
     * @returns {*}
     */
    resolve: function resolve(serviceId) {}
}
```
