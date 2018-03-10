<template>
    <div >
		<el-row :gutter="24" class="header_container">
			<el-col :span="5">
				<img src="" alt="">
			</el-col>
			<el-col :span="15">
				<el-tabs  @tab-click="handleClick" class="tabs" >
					<el-tab-pane  label="首页" name="home" ></el-tab-pane>
					<el-tab-pane  label="币行情" name="currency" ></el-tab-pane>
					<el-tab-pane  label="币圈" name="groupList" ></el-tab-pane>
					<el-tab-pane  label="币活动" name="carousel" ></el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="2">
				<el-button type="text" class="superadmin" @click="admin">超级管理员</el-button>
			</el-col>
			<el-col :span="2">
				<el-button class="outBTn" @click="outUser()" type="text">登出</el-button>
			</el-col>
		</el-row>
    </div>
</template>
<script>
    export default {
    	data(){
    		return {
			newCount:''
    		}
    	},
		methods: {
			  handleClick(tab) {//头部导航
			  let pagename = tab.name;
			  this.$router.push(pagename);
			},
			admin(){
				this.$router.push('superadmin');
			},
			response(){
				let newCountNub=localStorage.newCount;
				this.newCount = newCountNub;
			},
			outUser(){//登出
				localStorage.token = '';
				localStorage.newCount = '';
				this.$router.push('/');
			},
			mounted:function(){
                this.response();
        },
		}
	}
</script>

<style lang="less">
	@import '../style/mixin';
	.headerbox div{display: inline-block;}
	.header_container{
		background-color: rgb(50, 64, 87);	
	}
	.avator{
		margin-top: 20px;
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.superadmin{
		line-height: 60px;
		color: #8391a5;
	}
	.tabs{padding-top: 18px;}
	.outBTn{
		margin-top: 22px;
		color: #8391a5;
	}
	
</style>
