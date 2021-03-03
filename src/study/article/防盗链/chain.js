const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const getHostName = function(str) {
  const { hostname } = url.parse(str)
  return hostname
}

http
  .createServer((req, res) => {
    const refer = req.headers['referer'] || req.headers['referrer']
    const { pathname } = url.parse(req.url)
    const src = path.join(__dirname, 'public', '.' + pathname)

    fs.stat(src, err => {
      if (!err) {
        if (refer) {
          const referHost = getHostName(refer)
          const host = req.headers['host'].split(':')[0]

          if (referHost !== host) {
            // 防盗链
            fs.createReadStream(path.join(__dirname, 'public', './1.jpg')).pipe(
              res
            )
          } else {
            // 正常显示
            fs.createReadStream(src).pipe(res)
          }
        } else {
          // 正常显示
          fs.createReadStream(src).pipe(res)
        }
      } else {
        res.end('end')
      }
    })
  })
  .listen(8888)
