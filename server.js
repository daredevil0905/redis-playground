const express = require('express')
const axios = require('axios').default
const client = require('./client')

const app = express()

const URL = 'https://jsonplaceholder.typicode.com/todos'

app.get('/', async (req, res) => {
  let data = await client.get(`api_url:${URL}`)
  if (data) {
    res.json(JSON.parse(data))
  } else {
    const { data } = await axios.get(URL)
    await client.set(`api_url:${URL}`, JSON.stringify(data))
    await client.expire(`api_url:${URL}`, 30)
    res.json(data)
  }
})

app.listen(9000)