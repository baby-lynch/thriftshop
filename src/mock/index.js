import Mock from 'mockjs'
import user from './User.js'
import goods from './Goods.js'
import address from './Address.js'

Mock.mock('localhost:8080/#/login', 'post', (req, res) => {
  for (let i = 0; i < user.length; i++) {
    if ((user[i].username === (JSON.parse(req.body)).username) && (user[i].password === (JSON.parse(req.body)).password)) {
      res = {
        valid: true,
        reqUser: user[i]
      }
      break
    } else {
      res = {
        valid: false
      }
    }
  }
  return res
})

Mock.mock('localhost:8080/#/shop', 'get', () => {
  return goods
})

Mock.mock('localhost:8080/#/item', 'post', (req, res) => {
  // console.log('request: ' + JSON.parse(req.body))
  const index = JSON.parse(req.body) - 1
  goods[index].click = goods[index].click + 1
  res = goods[index]
  return res
})
