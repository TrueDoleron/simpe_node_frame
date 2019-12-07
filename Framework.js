const http = require('http')

module.exports = class Framework {
    constructor(){
        this.middleware = []
    }

    use(fn){
        this.middleware.push(fn)
    }

    listen(... args){
        return http.createServer(this.handle()).listen(...args)
    }

    handle(){
        return (req, res) => {}
    }
}
