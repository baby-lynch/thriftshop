import Mock from 'mockjs'
import user from './user.js'

Mock.mock('localhost:8080/#/login', 'post', (req, res) => {
  for (let i = 0; i < user.length; i++) {
    if ((user[i].username === (JSON.parse(req.body)).username) && (user[i].password === (JSON.parse(req.body)).password)) {
      res = true
    }
  }
  return res
})
