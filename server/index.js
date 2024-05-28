const express = require('express')
const app = express()
const port = 5000

app.get('/me', (req, res) => {
  res.send({
    name: 'Samsher',
    age: 20,
    gender:'male'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})