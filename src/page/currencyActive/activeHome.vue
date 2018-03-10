<template>
	<div class="manage_page fillcontain">
		<el-row :gutter="24"><headtop></headtop></el-row>
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="carousel" ><i class="el-icon-menu"></i>币活动_轮播图</el-menu-item>
					<el-menu-item index="cityManage"><i class="el-icon-menu"></i>城市管理</el-menu-item>
					<el-menu-item index="examineList"><i class="el-icon-menu"></i>审核列表</el-menu-item>
					<!-- <el-menu-item index="taglist"><i class="el-icon-menu"></i>标签列表</el-menu-item>
					<el-menu-item index="industry"><i class="el-icon-menu"></i>行业列表</el-menu-item> -->
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
