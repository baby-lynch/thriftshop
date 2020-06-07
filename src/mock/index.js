import Mock from 'mockjs'
import user from './User.js'
import goods from './Goods.js'
import address from './Address.js'
import order from './Order.js'

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
  const index = JSON.parse(req.body) - 1
  goods[index].click = goods[index].click + 1
  res = goods[index]
  return res
})

Mock.mock('localhost:8080/#/purchase', 'post', (req, res) => {
  // console.log(JSON.parse(req.body))
  const userID = JSON.parse(req.body).userID
  const purchaseItemID = Number(JSON.parse(req.body).purchaseItemID) - 1
  const tempAddressArray = []
  var tempItemObj = {}
  for (let i = 0; i < address.length; i++) {
    if (address[i].owner.id === userID) {
      tempAddressArray.push(address[i])
    }
  }
  tempItemObj = goods[purchaseItemID]
  res = {
    addressInfo: tempAddressArray,
    itemInfo: tempItemObj
  }
  return res
})

Mock.mock('localhost:8080/#/checkout', 'post', (req, res) => {
  console.log(JSON.parse(req.body))
})
