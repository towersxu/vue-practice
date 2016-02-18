import Vue from 'vue'
import app from './app.vue'
import VueRouter from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

Vue.config.debug = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter);

Vue.component('asy',function(){
  template:'<div>1234</div>'
});

const router = new VueRouter()
const App = Vue.extend(app)
router.start(App, 'body')
