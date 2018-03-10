<template>
	<div class="manage_page fillcontain">
		<el-autocomplete
			v-model="state4"
			:fetch-suggestions="querySearchAsync"
			placeholder="请输入内容"
			@select="handleSelect"
			></el-autocomplete>
  	</div>
</template>

<script>
	import headtop from '../../components/headtop.vue'
    export default {
		    data() {
			return {
				restaurants: [],
				state4: '',
				timeout:  null
			};
			},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
		},
		components:{headtop},
		 methods: {
   
 
  
   
    },

    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		margin-top: 0;
	}
</style>
