"use strict";
var Components;
(function (Components) {
    // 导出子命名空间
    let SubComponent;
    (function (SubComponent) {
        class Test {
        }
        SubComponent.Test = Test;
    })(SubComponent = Components.SubComponent || (Components.SubComponent = {}));
    class Header {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is Footer';
            document.body.appendChild(elem);
        }
    }
    Components.Header = Header;
    class Content {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is Content';
            document.body.appendChild(elem);
        }
    }
    Components.Content = Content;
    class Footer {
        constructor() {
            const elem = document.createElement('div');
            elem.innerText = 'this is Footer';
            document.body.appendChild(elem);
        }
    }
    Components.Footer = Footer;
})(Components || (Components = {}));
// 命名空间声明
// 声明当前文件依赖某个文件
/// <reference path="./components.ts" />
// 命名空间 ，使用命名空间的成员，需要用export导出。使用 new Home.Page()
var Home;
(function (Home) {
    class Page {
        constructor() {
            this.user = {
                name: 'name'
            };
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
    Home.Page = Page;
})(Home || (Home = {}));
