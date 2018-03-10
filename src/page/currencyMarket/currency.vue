<template>
	<div class="manage_page fillcontain">
		<el-row :gutter="24"><headtop></headtop></el-row>
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-submenu index="2">
						
						 <template slot="title">
						 	<el-badge :value= newCount class="item"> <i class="el-icon-document"></i>币列表 </el-badge>
						</template>
					
							<el-menu-item index="all"><i class="el-icon-menu"></i>全部币</el-menu-item>
							<el-badge :value= newCount class="item">
								<el-menu-item index="waitcomplete" ><i class="el-icon-menu"></i>待补全数据的币copy</el-menu-item>
							</el-badge>
							<el-menu-item index="iconmanage"><i class="el-icon-menu"></i>图标链接管理</el-menu-item>
					</el-submenu>
					<el-menu-item index="taglist"><i class="el-icon-menu"></i>标签列表</el-menu-item>
					<el-menu-item index="industry"><i class="el-icon-menu"></i>行业列表</el-menu-item>
				</el-menu>
			</el-col>	
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import headtop from '../../components/headtop.vue'
    export default {
		data(){
			return {
				newCount:''
			}
		},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			},
		},
		methods:{
			response(){
				let newCountNub=localStorage.newCount;
				this.newCount = newCountNub;
			}
			},
		components:{headtop},
		mounted:function(){
         this.response();
        },
		
    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		margin-top: 0;
	}
</style>
