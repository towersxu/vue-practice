<template>
  <div class="main container">
    <input type="text" v-model="text" />
    <div class="hello">Hello {{ text }}!</div>
    <div class="text-center">
      <dropdown>
        <button type="button" class="btn btn-success my-btn" data-toggle="dropdown">
          Welcome
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="#">Action123</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </dropdown>
    </div>
    <div class="btn btn-success" v-on:click="setName">load</div>
    <component :is="currentView">
      <!-- 组件在 vm.currentview 变化时改变 -->
    </component>
  </div>

</template>

<script>
  var dropdown = require('vue-strap/dist/vue-strap.js');
  var div1 = require('./div.vue');
  var home = require('./home.vue');
  var app = {
    replace:false,
    data:function(){
      return {
        currentView: 'home',
        text:'vue'
      }
    },
    components:{
      dropdown:dropdown,
      div1:div1,
      home:home
    },
    methods:{
      setName: function () {
        this.currentView='div1';
      }
    }
  };
  module.exports = app;
//  import { dropdown } from 'vue-strap/dist/vue-strap.js'
//
//  export default {
//    replace: false,
//  	data() {
//      return {
//        text: 'vue'
//      }
//    },
//    components: {
//      dropdown
//    }
//  }
//  export load = function(){
//    console.log('load')
//  }
</script>
<style scoped>
  .my-btn  {
    color: red;
  }
</style>
