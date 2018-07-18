# expressive-middleware
A stand-alone version of [Expressive.js](https://github.com/bugs181/Expressive.js) for [Express](https://github.com/expressjs/express) middleware. [Create express routes from an object!]<br>
You may be looking for [Express plugin for Expressive](https://github.com/bugs181/expressive-express) <br>

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
        post: createUser, // Function
        get: getUser, // Function
        ...
      }
    }
    
    ...
    
    app.use(expressive(routes, terms))

<br>

### Other config options: ###
    const config = {
      statusInResponse: true, // If data is JSON, sends status code along with data.
      routeNotFound: '404', // Can be a 404.html file. fs.fileSync('404.html')
    }
    
    ...
    
    app.use(expressive(routes, config))

<br>
    

### Documenttion: ###
The full routing capabilities of Expressive can be found here: <br>
[Expressive Documentation](https://github.com/bugs181/Expressive.js/blob/master/README.md)

<br>

### License: ###
#### [MIT LICENSE](https://github.com/bugs181/expressive-middleware/blob/master/LICENSE) ####
