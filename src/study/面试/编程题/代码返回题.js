// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

// LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

class LazyManClass {
  constructor(name) {
    this.name = name
    this.task = []
    this.hi()
  }

  hi() {
    console.log(`Hi I am ${this.name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  next() {
    const fn = this.task.shift()
    fn && fn()
  }

  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time * 1000)
    }
    this.task.unshift(fn)
    return this
  }

  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time * 1000)
    }
    this.task.push(fn)
    return this
  }

  eat(foot) {
    const fn = () => {
      console.log(`I am eating ${foot}`)
      this.next()
    }
    this.task.push(fn)
    return this
  }
}

function LazyMan(name) {
  return new LazyManClass(name)
}

LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food')
