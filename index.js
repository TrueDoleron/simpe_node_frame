const Framework = require('./lib/Framework')

const app = new Framework()

app.use((ctx, next) => {
    ctx.body = { message: 'Hello World!'}
    return next()
})

app.listen(8080, () => console.log('Server started'))