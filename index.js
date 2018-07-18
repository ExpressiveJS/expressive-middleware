let expressRoutes = {}

const flatten = require('flat') // Pending formal consent: https://github.com/hughsk/flat/issues/73

module.exports = function(routes, config) {
  let skipParse = false
  if (config && config.skipParse)
    skipParse = true

  if (!skipParse)
    routes = require('expressive-parser')(routes)

  expressRoutes.GET = {}
  expressRoutes.PUT = {}
  expressRoutes.POST = {}
  expressRoutes.DELETE = {}
  expressRoutes.IGNORE = {}

  for (let route of routes) {
    const method = methodForRoute(route)
    const path = `/${route.path.replace(/\./g, '/')}` // Replace all route periods with forward slashes

    if (!expressRoutes[method])
      expressRoutes[method] = {}

    expressRoutes[method][path] = route.fn
  }

  return function(req, res, next) {
    if (!expressRoutes[req.method])
      return res.status(500).end('Unknown HTTP method')

    let route = expressRoutes[req.method][req.path]

    if (!route)
      if (config.routeNotFound)
        return res.status(404).end(config.routeNotFound)
      else
        return next()

    const callback = routeCallback(res, config)

    const context = {
      protocol: 'express',
      server: true,
      method: req.method,
      callback: callback,
      req: res,
      res: res,
      next: next,
    }

    let params = {}
    if (req.method == 'GET')
      params = flatten.unflatten(req.query, { safe: true, object: true })
    else
      params = req.body

    route(context, params, callback)
  }
}

function methodForRoute(route) {
  switch (route.type) {
    case 'create':
      return 'POST'

    case 'read':
      return 'GET'

    case 'update':
      return 'PUT'

    case 'delete':
      return 'DELETE'

    case 'list':
      return 'GET'

    default:
      return 'GET'
  }
}

function routeCallback(res, config) {
  return function responseCallback(err, data) {
    let status = 200

    if (err) {
      if (typeof err === 'object' && err.status)
        status = err.status
      else
        status = 404

      if (!config.statusInResponse)
        delete err.status

      return res.status(status).send(err)
    }

    if (typeof data === 'object' && data.status)
      status = data.status

    if (!config.statusInResponse)
      delete data.status

    res.status(status).send(data)
  }
}
