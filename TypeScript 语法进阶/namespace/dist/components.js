"use strict";
var Components;
(function (Components) {
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
