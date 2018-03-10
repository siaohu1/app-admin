<template>
	<div class="manage_page fillcontain">
	<el-row>
		<el-col :span="8" style="height:880px;border-right:1px solid #ccc;">
			<el-form style="border-bottom:1px solid #ccc;">
				<el-form-item style="margin:3%;">
					<el-col :span="16" >
						<el-input placeholder="单行输入"></el-input>
					</el-col>
					<el-button>搜索</el-button>
				</el-form-item>
			</el-form>
			<ul>
				<li class="groupInfo"><span style="float:right;">已经冻结43个圈子</span></li>
				<li class="groupInfo"  v-for="(item,index) in groupList" :key="index">
					<span>{{item.name}}</span>
					<span >{{item.memberCount}}人</span>
				</li>
			</ul>
		</el-col>
		<el-col :span="16" >
			<el-col style="margin:5%;">
				冻结理由：
				<br><br>
				<p style="margin-left:10%;">拒绝黄拒绝毒拒绝黄赌毒</p>
			</el-col>
			<el-col style="margin:5%;">
				董涛申诉
			</el-col>
			<el-button style="margin:10% 0% 0% 60%;">解冻</el-button>
		</el-col>
	</el-row>
  	</div>
</template>

<script>
	import * as api from '../../api/api'
    export default {
		data (){
			return{
				groupList:[]
			}
		},
		computed: {
			
		},
		methods:{
			getGroupLists(){//进入页面调圈子列表
				api.getGroupList({
					name:'',
					index:1,
					size:1
				}).then(data=>{
					this.groupList = data;
					console.log(this.groupList)
				})
			},
		},
		mounted(){
			this.getGroupLists();
		}

    }
</script>


<style lang="less" scoped>
	@import '../../style/mixin';
	.manage_page{
		margin-top: 0;
	}
		.groupInfo{
		height: 60px;
		border-bottom: 1px solid #ccc;
		span{
			line-height: 60px;
			margin: 3%;
			
		}
	}
</style>
