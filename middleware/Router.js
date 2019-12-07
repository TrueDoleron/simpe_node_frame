const combineFucntions = require('../lib/combine-functions')

module.exports = class Router{
    constructor(){
        this.routes = {}

        for ( const method of ['get','post', 'put', 'delete']) {
            this[method] = (path, ...middleware) => {
                const fns = combineFucntions(middleware)
                if(!this.routes[path]){
                    this.routes[path] = {}
                }
                this.routes[path][method] = fns
            }
        }
    }

    toMiddleware(){
        return (ctx, next) => {
            const {url, method } = ctx.req
            const meth = method.toLowerCase()

            if(!this.routes[url]){
                ctx.body = {message: 'Not Found'}
                ctx.status = 404
                return Promise.resolve()
            }

            if(!this.routes[url][meth]){
                ctx.body = { message: 'Method not supposted'}
                ctx.body = 405

                return Promise.resolve()
            }

            return this.routes[url][meth](ctx, next)
        }
    }
}