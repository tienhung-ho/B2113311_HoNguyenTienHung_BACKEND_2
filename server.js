const { log } = require('console')
const app = require('./app')
const config = require('./app/config')
const MongoDB = require('./app/untils/mongodb.untils')

const port = config.app.port
log(config.db.uri)

async function startServer () {
    try {
        await MongoDB.connect(config.db.uri)
        log('Connected!')

        app.listen(port, () => {
            log(`Server is running on port ${port}`)
        })
    }
    catch (error) {
        log("Can't connect to database", error)
        process.exit()
    }
}


startServer()