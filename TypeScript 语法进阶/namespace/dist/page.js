"use strict";
// 命名空间 ，使用命名空间的成员，需要用export导出。使用 new Home.Page()
var Home;
(function (Home) {
    class Page {
        constructor() {
            new Components.Header();
            new Components.Content();
            new Components.Footer();
        }
    }
    Home.Page = Page;
})(Home || (Home = {}));
