const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
  const url = req.url.split('/'[1])
  const urlList = new Map([
    ['login', '登录页面'],
    ['register', '注册页面'],
    ['index', '首页'],
    ['main', '主界面']
  ])
  if (urlList.has(url)) {
    res.end(urlList.get(url))
  } else {
    res.end('404 页面')
  }
})

server.listen(3000, () => {
  console.log('服务在3000端口启动了...')
})
