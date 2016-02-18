<template>
  <div class="main container">
    <input type="text" v-model="text" />
    <div class="hello">Hello1 {{ text }}!</div>
  </div>
  <asyn></asyn>
</template>

<script type="text/ecmascript-6">
  var Vue = require('vue');
  Vue.component('asyn', function () {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 ajax 请求自动下载。
    require(['./asyn'], function(){
      console.log(22222)
      console.log(arguments)
    })
  })
  var div = {
    replace:false,
    data:function(){
      return {
        text:'vue'
      }
    },
    components:{
      asyn:asyn
    }
  };
  module.exports = div;

</script>
<style scoped>
  .my-btn  {
    color: red;
  }
</style>
