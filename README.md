# expressive-middleware
A stand-alone version of Expressive for Express middleware. [Create express routes from an object!]

### Install: ###
    npm install https://github.com/bugs181/expressive-middleware/ --save

### Use: ###
    const expressive = require('expressive-middleware')
    const app = require('express')()

    app.use(expressive(routes))
    app.listen(80)

### Routes Example: ###
    const routes = {
      user: function(name, callback) {
        callback(null, `Username: ${name}`)
      },
    }

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

<br>

### Documenttion: ###
More examples of Expressive routes can be found here: 
https://github.com/bugs181/Expressive/blob/master/README.md

<br>

### License: ###
#### MIT: https://opensource.org/licenses/MIT ####
