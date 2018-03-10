import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import {FormatData} from './api/datatime.js'


Vue.config.productionTip = false;

Vue.use(ElementUI);
// Vue.use(datatime);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
