console.log('开始学习js继承的6种方式')

// super
function Person(name) {
  this.name = name
}

Person.prototype.job = 'frontend'
Person.prototype.sayHello = function() {
  console.log('Hello ' + this.name)
}

const person = new Person('jia ming')
person.sayHello() // Hello jia ming

/**
 * 原型链继承
 */
// function Child() {
//   this.name = 'Child'
// }

// Child.prototype = new Person()
// const child = new Child()
// console.log(child.job) // frontend
// instanceof 判断元素是否在另一个元素的原型链上
// child是Person类的实例
// console.log(child instanceof Person) // true

// 关键点：子类原型等于父类的实例Child.prototype = new Person()

// 特点：实例可继承的属性有：实例的构造函数的属性，父类构造函数的属性，父类原型上的属性
// （新实例不会继承父类实例的属性）

// 注意事项：
//     1、新实例无法向父类构造函数传参
//     2、继承单一
//     3、所有实例都会共享父类实例的属性（一个实例修改了原型属性，另一个实例的原型属性也会被修改）

/**
 * 借用构造函数
 */
// function Child() {
//   Person.call(this, 'cheng')
// }
// const child = new Child()
// console.log(child.name) // cheng
// console.log(child instanceof Person); // false
// child.sayHello() // 报错，继承不了父类原型上的东西

// 关键点：用call或者apply将父类构造函数引入子类函数

// 特点：
//     1、只继承了父类构造函数的属性，没有继承父类原型的属性
//     2、解决了原型链继承的注意事项
//     3、可以继承多个构造函数的属性
//     4、在子实例中可以向父实例传参

// 注意事项：
//     1、只能继承父类的构造函数的属性
//     2、无法实现构造函数的复用
//     3、每个新实例都有构造函数的副本，臃肿

/**
 * 组合继承：原型链和借用构造函数继承的组合
 */
// function Child(name) {
//   Person.call(this, name)
// }
// Child.prototype = new Person()
// const child = new Child('jia')
// child.sayHello() // Hello jia
// console.log(child instanceof Person) // true

// 关键点：结合了两种模式的有点————向父类传参和复用

// 特点：
//     1、可以继承父类原型上的属性，可以传参，可复用
//     2、每个新实例引入的构造函数属性是私有的

// 注意事项：
//     1、调用了两次父类的构造函数（耗内存）
//     2、子类的构造函数会代替原型上的那个父类的构造函数

/**
 * 原型式继承
 */
// function object(obj) {
//   function F() {}
//   F.prototype = obj
//   return new F()
// }
// const super0 = new Person()
// const super1 = object(super0)
// console.log(super1 instanceof Person) // true
// console.log(super1.job) // frontend

// // 关键点：用一个函数包装一个对象，然后返回这个函数的调用，
// // 这个函数就变成了可以随意增添属性的实例或对象。Object.create()就是这个原理。

// 特点：
//     1、类似于复制一个对象，用函数来包装

// 注意事项：
//     1、所有的实例都会继承原型上的属性
//     2、 无法实现复用。（新实例属性都是后面添加的）

// Object.create()方法规范了原型式继承。这个方法接收两个参数，一个用作新对象原型的对象和
// （可选的）一个为新对象定义额外属性的对象。

// 传一个参数的时候
// const anotherPerson = Object.create(new Person());
// console.log(anotherPerson.job); // frontend
// console.log(anotherPerson instanceof Person); // true
// // 传两个参数的时候
// const anotherPerson = Object.create(new Person(), {
//     name: {
//         value: 'come on'
//     }
// });
// anotherPerson.sayHello(); // Hello come on
