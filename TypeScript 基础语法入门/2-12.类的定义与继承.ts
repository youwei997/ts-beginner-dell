class Person {
  name = "张三";
  getName() {
    return this.name;
  }
  getAge() {
    return 18;
  }
}

// super 如果子类把父类方法重写后，还想调用父类方法，可以使用 super 关键字

class Student extends Person {
  getStudentName() {
    return "李四";
  }
  getAge() {
    return 20;
  }
  getInfo() {
    // 获取父类属性
    const str = "父类属性为 -- " + super.getName();
    return str;
  }
}
// Student 继承了 Person 所以 Student 有 getName() 方法
const student = new Student();
// console.log(student.getName());
// console.log(student.getStudentName());

// 重写 子类和父类有同名方法时，会覆盖父类的方法，叫重写
// console.log(student.getAge());

// 子类获取父类属性
console.log(student.getInfo());
