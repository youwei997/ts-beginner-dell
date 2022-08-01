declare module 'jquery' {
    interface JqueryInstance {
        html: (html: string) => JqueryInstance
    }

    // $是混合类型 既是函数也是命名空间（对象）
    function $(readyFunc: () => void): void
    function $(selector: string): JqueryInstance
    namespace $ {
        namespace fn {
            class init { }
        }
    }
    export = $
}