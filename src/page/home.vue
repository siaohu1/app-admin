<template>
    <div>
		<headtop></headtop>
      	<div class="hello">
			  hello!
		  </div>
    </div>
</template>

<script>
import * as api from '../api/api'
	import headtop from '../components/headtop.vue';
	export default{
		data() {
			return {

			}
		},
		components:{headtop},
		methods:{
			response(){
				api.getWaitIcoList({
					index:0,
					size:1
				}).then(data =>{
						let newCount = data.newCount;
                      	window.localStorage.setItem('newCount',newCount);
						window.localStorage.pathname='/'
				})
			}
		},
		mounted:function(){
                this.response();
            },
	}

	
</script>

<style lang="less">
.hello{
	width: 30%;
	height: 100px;
	margin: 0 auto;
	margin-top: 20%;
	font-size: 100px;
}
</style>
