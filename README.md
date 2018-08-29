# 一款让你感到幸福的 React 组件库

✨✨这是 Mona 系列的 React 实现，服务于移动端 H5 产品。

[![npm](https://img.shields.io/npm/v/mor-mobile.svg?style=flat-square)](https://www.npmjs.com/package/mor-mobile) [![npm](https://img.shields.io/npm/dt/mor-mobile.svg?style=flat-square)](https://www.npmjs.com/package/mor-mobile) 

- [主页](http://home.mor.monajs.cn)

- [手机访问](http://mor.monajs.cn)

## 大致介绍

这是一款轻量级 React 组件库，拥有非常强的可扩展性和自定义功能。

你完全可以根据自己的需要自定义主题样式、组件样式，你也可以根据业务需要扩展组件功能。

可以满足你各种姿势，给你提供各种体位。


### 依赖

- [classnames](https://www.npmjs.com/package/classnames)
- [jsx-control-statements](https://www.npmjs.com/package/jsx-control-statements)
- [mona-events](https://www.npmjs.com/package/mona-events)

## 安装

### NPM

```bash
npm i mor-mobile --save
```

### 按需加载

- 使用 babel-plugin-import（推荐用法）

`babel-plugin-import` 是一款 `babel` 插件，它会在编译过程中将 `import` 的写法自动转换为按需引入的方式

```bash
# 安装 babel-plugin-import 插件
npm i babel-plugin-import -dev
```

```js
.babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "mor-mobile",
      "libraryDirectory": "lib",
      "style": true // 加载 less 文件
    }]
  ]
}
```

- 手动引入

```js
import DatePicker from 'mor-mobile/lib/modal';  // 加载 JS
import 'mor-mobile/lib/modal/style';         // 加载 LESS
```

✨✨你也可以为`mor-mobile` 起一个别名，让代码变的更好看一点

```
// webpack 添加解析配置
...js
resolve: {
	extensions: ['.js', '.jsx'],
	alias: {
		'mona': path.resolve('./node_modules/mor-mobile')
	}
}
...
```

```js
.babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "mona",
      "libraryDirectory": "lib",
      "style": true // 加载 less 文件
    }]
  ]
}
```



### 开始使用
接着你可以在代码中直接引入 Mor-mobile 组件

```js
import { Row, Col } from 'mona';
```


## 联系我
> 微信：599321378


### TODO

* toast，添加隐藏回调
* listView添加头部尾部自定义
* loading修改阴影样式
* 通用修改动画

* Row Col 支持一下offset

* Toast 支持蒙层cancel，默认可点击
* Toast 支持自定义图片
* Toast 支持api方法
* Toast 支持同时提示多个

* ListView 支持自定义头部和底部

* DatePicker 支持disable日期
* DatePicker 支持api方法

