<template>
  <div class="main container">
    <input type="text" v-model="text" />
    <div class="hello">Hello12 {{ text }}!</div>
  </div>
</template>

<script type="text/ecmascript-6">
  var div = {
    replace:false,
    data:function(){
      return {
        text:'vue'
      }
    }
  };
  module.exports = div;
</script>
<style scoped>
  .my-btn  {
    color: red;
  }
</style>
