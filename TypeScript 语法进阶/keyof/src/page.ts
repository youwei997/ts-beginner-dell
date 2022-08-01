// 泛型 keyof

interface Person {
    name: string
    age: number
    gender: string
}

class Teacher {
    constructor(private info: Person) { }
    // keyof 遍历 interface ----> T extends keyof Person
    // 这时候key 的类型就是一个字符串类型 ----> T = 'name'
    // getInfo 返回值就是  Person[T]
    getInfo<T extends keyof Person>(key: T): Person[T] {
        return this.info[key]
    }
}

const teacher = new Teacher({
    name: '张三',
    age: 11,
    gender: '男'
})

const res = teacher.getInfo('name')
console.log(res);
