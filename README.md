## Build Setup

``` bash

# Install dependencies
npm install

# serve with hot reload at localhost:9530
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Element-Ui using cdn tutorial
First find `index.html`([root directory](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/index.html))

Import css and js of `Element`, and then import vue. Because `Element` is vue-dependent, vue must be import before it.

Then find [webpack.base.conf.js](https://github.com/PanJiaChen/vueAdmin-template/blob/element-ui-cdn/build/webpack.base.conf.js)
Add `externals` to make webpack not package vue and element.

```
externals: {
  vue: 'Vue',
  'element-ui':'ELEMENT'
}
```

Finally there is a small detail to pay attention to that if you import vue in global, you don't need to manually `Vue.use(Vuex)`, it will be automatically mounted, see
 [issue](https://github.com/vuejs/vuex/issues/731)

And you can use `npm run build --report` to see the effect
