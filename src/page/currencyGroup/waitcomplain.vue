<template>
	<div class="manage_page fillcontain">
			<el-cascader
			:options="options"
			 @active-item-change="handleItemChange"
			v-model="selectedOptions3"
			></el-cascader>

  	</div>
</template>

<script>
	import headtop from '../../components/headtop.vue'
	import * as api  from '../../api/api'
    export default {
		  data() {
			return {
				options:[],
				selectedOptions3: []
			}
		  },
		   methods: {
			   request(){
				        api.getFristIndustryList({//查询一级行业列表
                    }).then(data =>{
                         let industrydata = data;             
                         this.options = industrydata.map(function(item){
                             return {value:item.id,label:item.class_name,children:[]}
						 })
  
                    })
			   },
			    handleItemChange(val){
					console.log(val)
					   api.getSecondIndustryList({
                    first_id:val[0],
					}).then(data =>{
						let secondIndustry = data;
						this.a = secondIndustry.map(function(item){
							return {value:item.id,label:item.class_name}
						})
						//  this.options2.cities = a;
						// console.log(  this.options.cities)
				
						console.log(this.a)
					})
				}
			   
	  },
	 
	   mounted() {
		   this.request();
    },
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
		},
		components:{headtop}
    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		margin-top: 0;
	}
</style>
