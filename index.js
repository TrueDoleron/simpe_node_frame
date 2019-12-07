const Framework = require('./lib/Framework')
const Router = require('./middleware/Router')

const app = new Framework()

const router = new Router()


router.get('/users', (ctx) =>{
    ctx.body = {message: "U see all users"}
})

app.use(router.toMiddleware())

app.listen(8080, () => console.log('Server started'))