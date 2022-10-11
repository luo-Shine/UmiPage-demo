import Mock from 'mockjs'

const {data} = Mock.mock({
  // 20条数据
  "data|7": [{
    //id
    "key|+1": 0,
    //企业名
    "name": "@name",
    //综合指数
    "goodsSale0|5-100": 5,
    //创新指数
    "goodsSale1|10-20": 10,
    //营业收入
    "goodsSale2|0-50000": 0,
    //税收
    "goodsSale3|0-5000": 0,
    //固投
    "goodsSale4|0-60000": 0,
  }]
})

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { data: data },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req:any, res:any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
}