const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .use(cors())

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({books: results.rows})
  })
}

app.route('/books').get(getBooks)

app.listen(process.env.PORT || 3002, ()=>{
  console.log('The server is listening ...')
})