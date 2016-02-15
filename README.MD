##vue-practice

###计算属性 vs $watch
```html
    <div id="demo">{{fullName}}</div>
```

```javascript
    var vm = new Vue({
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      }
    })
    
    vm.$watch('firstName', function (val) {
      this.fullName = val + ' ' + this.lastName
    })
    
    vm.$watch('lastName', function (val) {
      this.fullName = this.firstName + ' ' + val
    })

```

```javascript
    var vm = new Vue({
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })
```

计算属性默认只是 getter，不过在需要时你也可以提供一个 setter：
```javascript
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
```

###绑定内联样式
v-bind:style 的对象语法十分直观——看着非常像 CSS，其实它是一个 JavaScript 对象。CSS 属性名可以用驼峰式（camelCase）或短横分隔命名（kebab-case）：
```html
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```javascript
    data: {
      activeColor: 'red',
      fontSize: 30
    }
```
直接绑定到一个样式对象通常更好，让模板更清晰：
```html
<div v-bind:style="styleObject"></div>
```

```javascript
    data: {
      styleObject: {
        color: 'red',
        fontSize: '13px'
      }
    }    
```

当 v-bind:style 使用需要厂商前缀的 CSS 属性时，如 transform，Vue.js 会自动侦测并添加相应的前缀。
