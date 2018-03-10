<template>
	<div class="manage_page fillcontain">
	<el-row>
		<el-col :span="8">
			<el-form >
				<el-form-item >
					<el-col :span="16" >
						<el-input placeholder="单行输入" v-model="groupname"></el-input>
					</el-col>
					<el-button @click="searchGroup()">搜索</el-button>
				</el-form-item>
			</el-form>
			<ul>
				<li class="groupInfo"  v-for="(item,index) in groupList" :key="index" @click="groupInfo(item)">
					<span>{{item.name}}</span>
					<span >{{item.memberCount}}人</span>
				</li>
			</ul>
		</el-col>
		<el-col :span="16" v-show="rightInfo">
			<template>
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane label="基本信息" name="info">
						<el-row>
							<el-col class="infoBox">
								<img class="groupBgImg" :src="groupInfos.avatar" alt="">
								<ul class="details">
									<li>圈子名称：{{groupInfos.name}}</li>
									<li>圈子创建时间：{{groupInfos.createTime}}</li>
									<li>圈子人数：{{groupInfos.memberCount}}</li>
									<li>圈子发帖数量：{{groupInfos.articleCount}}</li>
									<li>圈子加入方式：{{groupInfos.enterType}}</li>
									<li>发帖权限：{{groupInfos.permissionType}}</li>
								</ul>
							</el-col>
							<el-col class="infoBox">
							圈子简介：{{groupInfos.desc}}
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="帖子列表" name="articleList">
						<el-row>
							<el-col infoBox>
								<ul >
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
									<li>帖子列表：董涛说</li>
								</ul>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="成员列表" name="memberList" >
						<el-row>
							<el-col class="infoBox">
								<p>总共{{groupMemberList.memberCount}}个成员</p>
							</el-col>
							<el-col class="infoBox">
								<ul>
									<li   v-for="(item,index) in groupMemberList.list" :key="index">
										<ul class="userList">
											<li class="userImg"><img :src= item.avatar alt=""></li>
											<li>用户名:{{item.name}}</li>
											<li>权限:{{item.member_type}}</li>
										</ul>
									</li>
								</ul>
							</el-col>
						</el-row>
					</el-tab-pane>
					<el-tab-pane label="圈子操作" name="complain">
						<el-col class="infoBox">
							<el-form>
								<el-form-item>
									<el-col :span="15" >
										<el-input type="textarea" placeholder="冻结原因"></el-input>
									</el-col>
									
								</el-form-item>
								<el-button >冻结圈子</el-button>
							</el-form>
						</el-col>
					</el-tab-pane>
				</el-tabs>
			</template>
		</el-col>
	</el-row>
  	</div>
</template>

<script>

	import * as api from '../../api/api'
    export default {
		data() {
			return {
				activeName2: 'info',
				groupList:[],
				groupname:'',
				groupInfos:[],
				groupMemberList:[],
				memberList:'',
				groupname:'',
				rightInfo:false,

			};
			},
			methods: {
				getGroupLists(){//进入页面调圈子列表
					api.getGroupList({
						name:this.groupname,
						index:0,
						size:10
					}).then(data=>{
						this.groupList = data;
					})
				},
				searchGroup(){//搜索圈子
					api.getGroupList({
						name:'',
						index:0,
						size:10
					}).then(data=>{
						this.groupList = data;
					})
				},
				groupInfo(item){//点击圈子查看右侧信息
					this.rightInfo = true;
					api.getGroupInfo({//基本信息
						groupId:item.groupId
					}).then(data =>{
						this.groupInfos = data;

					})
					api.getGroupMemberList({//成员列表
						groupId:item.groupId,
						index:0,
						size:10
					}).then(data =>{

						this.groupMemberList = data;
						
					})
				},
			handleClick(tab) {
			}

    	},
			mounted (){
				this.getGroupLists();
			}

    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		margin-top: 0;
	}
	.el-col-8{
		height: 100vh;
		border-right: 1px solid #cccccc;
		.el-form{border-bottom: 1px solid #ccc;
			.el-form-item{
				margin: 3%;
			}
		}
	}
	.infoBox{
		margin: 3%;
	}
	.groupInfo{
		height: 60px;
		border-bottom: 1px solid #ccc;
		span{
			line-height: 60px;
			margin: 3%;
			
		}
	}
	.groupBgImg{
		width: 30%;
		height: 20%;
		border: 1px solid #cccccc;
		float: right;
		margin-right: 8%;
	}
	.details li{
		line-height: 40px;
	}
	.userList li{
		display: inline-block;
		margin: 0% 5%;
		line-height: 100px;
	}
		.userImg{
			width:80px;
			height:80px;
			border: 1px solid #cccccc;
			border-radius: 40px;
		}

</style>
