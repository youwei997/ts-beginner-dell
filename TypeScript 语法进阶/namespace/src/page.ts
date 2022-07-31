// 命名空间声明
// 声明当前文件依赖某个文件
/// <reference path="./components.ts" />

// 命名空间 ，使用命名空间的成员，需要用export导出。使用 new Home.Page()
namespace Home {
    export class Page {
        user: Components.User = {
            name: 'name'
        }
        constructor() {
            new Components.Header()
            new Components.Content()
            new Components.Footer()
        }
    }
}