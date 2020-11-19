const fs = require('fs')

const writeInfo = '我在学习node，加油！'
fs.writeFile('./public/hello-world.txt', writeInfo, (err) => {
  if (err) {
    console.log('写入失败')
  } else {
    console.log('写入成功')
  }
})

fs.readFile('./public/hello-world.txt', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data.toString())
  }
})
