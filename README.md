# expressive-middleware
A stand-alone version of Expressive for Express middleware. [Create express routes from an object!]

### Example: ###

    const routes = {
      user: function(name, callback) {
        callback(null, `Username: ${name}`)
      },
    }
    
    const app = require('express')()
    app.use(expressive(routes))
    app.listen(80)

<br>

### CRUD-L (Create, Read, Update, Delete, List) example: ###
    const routes = {
      users: {
        create: function(user, password, callback) {
    
        },
    
        read: function(user, callback) {
          callback(null, 'OKAY')
        },
    
        ...
      },
    }

    const app = require('express')()
    app.use(expressive(routes))
    app.listen(80)

### Custom CRUD-L terms: ###

    const terms = {
      verbs: {
        create: 'post',
        read: 'get',
        update: 'put',
        delete: 'delete',
        list: 'options',
      }
    }

    const routes = {
      users: {
        post: createUser // Function
        get: getUser // Function
        ...
      }
    }
    
    ...
    
    app.use(expressive(routes, terms))
