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


###事件修饰符
在事件处理器中经常需要调用 event.preventDefault() 或 event.stopPropagation()。尽管我们在方法内可以轻松做到，不过让方法是纯粹的数据逻辑而不处理 DOM 事件细节会更好。
为了解决这个问题，Vue.js 为 v-on 提供两个 事件修饰符：.prevent 与 .stop。
```html
    <!-- 阻止单击事件冒泡 -->
    <a v-on:click.stop="doThis"></a>

    <!-- 提交事件不再重载页面 -->
    <form v-on:submit.prevent="onSubmit"></form>

    <!-- 修饰符可以串联 -->
    <a v-on:click.stop.prevent="doThat">

    <!-- 只有修饰符 -->
    <form v-on:submit.prevent></form>
```
1.0.16 添加了两个额外的修饰符：
```html
    <!-- 添加事件侦听器时使用 capture 模式 -->
    <div v-on:click.capture="doThis">...</div>

    <!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
    <div v-on:click.self="doThat">...</div>
```

###按键修饰符
在监听键盘事件时，我们经常需要检测 keyCode。Vue.js 允许为 v-on 添加按键修饰符：
Vue.js 为最常用的按键提供别名：
```html
    <!-- 同上 -->
    <input v-on:keyup.enter="submit">

    <!-- 缩写语法 -->
    <input @keyup.enter="submit">
```

###debounce
`debounce` 设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。
```html
    <input v-model="msg" debounce="500">
```

###组件
传入 Vue 构造器的多数选项也可以用在 Vue.extend() 中，不过有两个特例： data and el。试想如果我们简单地把一个对象作为 data 选项传给 Vue.extend()：
```javascript
  var data = { a: 1 }
  var MyComponent = Vue.extend({
    data: data
  })
```
这么做的问题是 MyComponent 所有的实例将共享同一个 data 对象！这基本不是我们想要的，因此我们应当使用一个函数作为 data 选项，函数返回一个新对象：
```javascript
  var MyComponent = Vue.extend({
    data: function () {
      return { a: 1 }
    }
  })
```
###is 特性
```html
  <table>
    <tr is="my-component"></tr>
  </table>
```
###Prop 绑定类型
prop 默认是单向绑定：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。不过，也可以使用 .sync 或 .once 绑定修饰符显式地强制双向或单次绑定。
注意如果 prop 是一个对象或数组，是按引用传递。在子组件内修改它会影响父组件的状态，不管是使用哪种绑定类型。

###父子组件通信
子组件可以用 this.$parent 访问它的父组件。根实例的后代可以用 this.$root 访问它。父组件有一个数组 this.$children，包含它所有的子元素。
尽管可以访问父链上任意的实例，不过子组件应当避免直接依赖父组件的数据，尽量显式地使用 props 传递数据。
- 在子组件中修改父组件的状态是非常糟糕的做法，这让父组件与子组件紧密地耦合；只看父组件，很难理解父组件的状态。因为它可能被任意子组件修改！理想情况下，只有组件自己能修改它的状态。

###自定义事件
每个 Vue 实例都是一个事件触发器：
- 使用 $on() 监听事件；
- 使用 $emit() 在它上面触发事件；
- 使用 $dispatch() 派发事件，事件沿着父链冒泡；
- 使用 $broadcast() 广播事件，事件向下传导给所有的后代。
不同于 DOM 事件，Vue 事件在冒泡过程中第一次触发回调之后自动停止冒泡，除非回调明确返回 true。

###使用 v-on 绑定自定义事件
```html
<child v-on:child-msg="handleIt"></child>
```
###子组件索引
尽管有 props 和 events，但是有时仍然需要在 JavaScript 中直接访问子组件。为此可以使用 v-ref 为子组件指定一个索引 ID
```html
  <div id="parent">
    <user-profile v-ref:profile></user-profile>
  </div>
```
```javascript
  var parent = new Vue({ el: '#parent' })
  // 访问子组件
  var child = parent.$refs.profile
```

###使用 Slot 分发内容
在父组件有内容的情况下包含子组件，父组件的内容将被抛弃，除非子组件模板包含 <slot>。如果只有一个没有特性的 slot，整个内容将被插到它所在的地方，替换 slot。
<slot> 标签的内容视为回退内容。回退内容在子组件的作用域内编译，只有当宿主元素为空并且没有内容供插入时显示。
<slot> 元素有一个特殊特性 name，用于配置如何分发内容。多个 slot 可以有不同的名字。命名 slot 将匹配有对应 slot 特性的内容片断。
也可以有一个未命名 slot，它是默认 slot，作为找不到匹配内容的回退插槽。如果没有默认的 slot，不匹配内容将被抛弃。

###动态组件
多个组件可以使用同一个挂载点，然后动态地在它们之间切换。使用保留的 <component> 元素，动态地绑定到它的 is 特性：
```javascript
  new Vue({
    el: 'body',
    data: {
      currentView: 'home'
    },
    components: {
      home: { /* ... */ },
      posts: { /* ... */ },
      archive: { /* ... */ }
    }
  })
```

```html
  <component :is="currentView"  keep-alive>
    <!-- 组件在 vm.currentview 变化时改变 -->
  </component>
```
如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 keep-alive 指令参数.

- activate 钩子 ???
在切换组件时，切入组件在切入前可能需要进行一些异步操作。为了控制组件切换时长，给切入组件添加 activate 钩子：
```javascript
  Vue.component('activate-example', {
    activate: function (done) {
      var self = this
      loadDataAsync(function (data) {
        self.someData = data
        done()
      })
    }
  })
```
注意 activate 钩子只作用于动态组件切换或静态组件初始化渲染的过程中，不作用于使用实例方法手工插入的过程中。

- transition-mode 特性用于指定两个动态组件之间如何过渡。
在默认情况下，进入与离开平滑地过渡。这个特性可以指定另外两种模式：
in-out：新组件先过渡进入，等它的过渡完成之后当前组件过渡出去。
out-in：当前组件先过渡出去，等它的过渡完成之后新组件过渡进入。
```html
  <!-- 先淡出再淡入 -->
  <component
    :is="view"
    transition="fade"
    transition-mode="out-in">
  </component>
```
```css
  .fade-transition {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
```

自定义组件可以像普通元素一样直接使用 v-for,但是，不能传递数据给组件，因为组件的作用域是孤立的。为了传递数据给组件，应当使用 props.
```html
  <my-component
    v-for="item in items"
    :item="item"
    :index="$index">
  </my-component>
```
不自动把 item 注入组件的原因是这会导致组件跟当前 v-for 紧密耦合。显式声明数据来自哪里可以让组件复用在其它地方。

- 编写可复用组件
```html
  <my-component
    :foo="baz"
    :bar="qux"
    @event-a="doThis"
    @event-b="doThat">
    <!-- content -->
    <img slot="icon" src="...">
    <p slot="main-text">Hello!</p>
  </my-component>
```

###异步组件
在大型应用中，我们可能需要将应用拆分为小块，只在需要时才从服务器下载。为了让事情更简单，Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。

```javascript
  Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 ajax 请求自动下载。
    require(['./my-async-component'], resolve)
  })
```
工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用。也可以调用 reject(reason) 指示加载失败

###片段实例
在使用 template 选项时，模板的内容将替换实例的挂载元素。因而推荐模板的顶级元素始终是单个元素。
- 模板包含多个顶级元素。
- 模板只包含普通文本。
- 模板只包含其它组件（其它组件可能是一个片段实例）。
- 模板只包含一个元素指令，如 <partial> 或 vue-router 的 <router-view>。
- 模板根节点有一个流程控制指令，如 v-if 或 v-for。
这些情况让实例有未知数量的顶级元素，它将把它的 DOM 内容当作片断。片断实例仍然会正确地渲染内容。不过，它没有一个根节点，它的 $el 指向一个锚节点，即一个空的文本节点（在开发模式下是一个注释节点）。
但是更重要的是，组件元素上的非流程控制指令，非 prop 特性和过渡将被忽略，因为没有根元素供绑定：
```javascript
  <!-- 不可以，因为没有根元素 -->
  <example v-show="ok" transition="fade"></example>

  <!-- props 可以 -->
  <example :prop="someData"></example>

  <!-- 流程控制可以，但是不能有过渡 -->
  <example v-if="ok"></example>
```

###自定义指令

##异步组件加载
practice/async-component
