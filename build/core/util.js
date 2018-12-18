const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
require('console.table')

function log (message = '', type, timestamp = true) {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  
  console.log(timestamp ? chalk.gray(`[${hours}:${minutes}:${seconds}]`) : '', type ? chalk[type](message) : message)
}

log.success = (message) => {
  log(message, 'green')
}

log.error = (message, error) => {
  log(message, 'red')
  error && console.error(error)
}

log.info = (message) => {
  log(message, 'yellow')
}

log.line = (num = 1) => {
  console.log(' '.padEnd(num, '\n'))
}

log.table = (list) => {
  list = list.map(item => {
    let firstKey = true
    for (const key in item) {
      if (firstKey) {
        item[key] = chalk.cyan(item[key])
      } else {
        item[key] = chalk.gray(item[key])
      }
      firstKey = false
    }
    
    return item
  })
  console.table(list)
}

module.exports = {
  log,
  // 绘制字节码
  renderAscii () {
    const ascii = fs.readFileSync(path.resolve(__dirname, './ascii-monajs.txt'))
    log('', null, false)
    log(ascii, 'green', false)
    log('', null, false)
  }
}
