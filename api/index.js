const dotenv = require('dotenv')
dotenv.config()
const app = require('./server')
const db = require('./db')


// conexion con base de datos
db.authenticate().then(() => {
  console.log('db connected successfully')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

// ejecutar el servidor
app.listen(app.get('port'), () => {
    console.log(`server listening on port ${app.get('port')}`)
})