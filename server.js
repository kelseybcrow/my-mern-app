const { MongoClient } = require('mongodb')
const express = require('express')
let db

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.get('/', async (req, res) => {
  const allAnimals = await db.collection('animals').find().toArray()
  res.render('home', { allAnimals })
})

app.get('/admin', (req, res) => {
  res.send('Admin page')
})

app.get('/api/animals', async (req, res) => {
  const allAnimals = await db.collection('animals').find().toArray()
  res.json(allAnimals)
})

async function start() {
  const client = new MongoClient(
    'mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin'
  )
  await client.connect()
  db = client.db()
  app.listen(3000)
}
start()
