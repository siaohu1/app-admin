<template>
    <div>
        <el-row style="margin-top: 20px; margin-left:2%;">
			<el-col :span="8" style="border:1px solid #ccc;">
				<div>
					<el-button  @click="levelone = true" style="margin:10px 30%;">新建一级行业</el-button>
						<el-dialog title="新建一级分类" :visible.sync="levelone">
						<el-form :model="form">
							<el-form-item label="行业名称" >
							<el-input v-model="form.name" auto-complete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="levelone = false,addlevelOneIndustry()">创建</el-button>
						</div>
						</el-dialog>
						<hr>
						<ul  class="itembox">
							<li class="liBorder" v-for="(item,index) in OneIndustryList" v-bind:key="index" v-model="firstid" :class="{'selectStauts':index === indexPrev}" @click="levelOnelist(item,index)">
								<ul>
									<li>行业:{{item.class_name}}</li>
									<li>子行业：{{item.second_class_count}}</li>
								</ul>
								<ul class="btnRight" >
									<li><el-button size="mini">编辑</el-button></li>
									<li>
										<el-button size="mini" @click="dialogVisible = true">删除</el-button>
										<el-dialog
										title="提示"
										:visible.sync="dialogVisible"
										width="30%"
										>
										<span>是否要删除此行业？</span>
										<span slot="footer" class="dialog-footer">
											<el-button @click="dialogVisible = false">取 消</el-button>
											<el-button type="primary" @click="dialogVisible = false,removeFirstIndustry()">确 定</el-button>
										</span>
										</el-dialog>
									</li>
									</ul>
							</li>
						</ul>
				</div>		
			</el-col>
			<el-col :span="8" style="border:1px solid #ccc;">
				<div>
					<el-button  @click="leveltwo= true" style="margin:10px 30%;">新建二级行业</el-button>
						<el-dialog title="新建二级分类" :visible.sync="leveltwo">
						<el-form :model="form2">
							<el-form-item label="行业名称" >
							<el-input v-model="form2.name" auto-complete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="leveltwo = false,addlevelTwoIndustry()">创建</el-button>
						</div>
						</el-dialog>
						<hr>
						<ul class="itembox">
							<li class="secondlist" v-for="(item,items) in TwoIndustryList" :class="{'selectStauts':items === indexPrev}" v-bind:key="items"  @click="getIcoList(item,items)" >
								<ul >
									<li>行业:{{item.class_name}}</li>
									<li>总项目：{{item.project_count}}</li>
								</ul>
								<ul  class="btnRight">
									<li><el-button size="mini">编辑</el-button></li>
									<li>
										<el-button size="mini" @click="dialogVisible = true">删除</el-button>
										<el-dialog
										title="提示"
										:visible.sync="dialogVisible"
										width="30%"
										>
										<span>是否要删除此行业？</span>
										<span slot="footer" class="dialog-footer">
											<el-button @click="dialogVisible = false">取 消</el-button>
											<el-button type="primary" @click="dialogVisible = false,removeSecondIndustry()">确 定</el-button>
										</span>
										</el-dialog>
									</li>
								</ul>
							</li>
						</ul>
				</div>
			</el-col>
			<el-col :span="8" style="border:1px solid #ccc;">
					 <ul>
						<li v-for="(item,items) in Icolist" v-bind:key="items">{{item.name}}</li>
					</ul> 
			</el-col>
				
  		</el-row>
    </div>
</template>

<script>

	import * as api from '../../api/api'
    export default {
    	data(){
    		return {
				//  dialogTableVisible: false,
				levelone:false,
				leveltwo:false,
				dialogFormVisible: false,
				dialogVisible: false,
				form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: '',
				},
				form2:{
					name:''
				},
				childertrades:'',
				OneIndustryList:'',
				TwoIndustryList:'',
				Icolist:'',
				firstid:'',
				secondid:'',
				indexPrev:1,
                status:''
				}
				
		},
		created(){
			
		},
		mounted:function(){
				this.request() 
		},
    	components: {

    	},
    	methods: {
			//进入页面查询一级行业列表
			request(){
				api.getFristIndustryList({
				}).then(data =>{
				this.OneIndustryList = data;
				})
			},
			//新建一级行业列表
		addlevelOneIndustry(){
			api.addFristIndustryList({
				class_name:this.form.name,
			}).then(data =>{
				alert('新建成功！');
				this.OneIndustryList.push({class_name:data.name,id:data.id})

			})
		},
		//点击一级行业传id给新建二级并查看对应的二级行业
		levelOnelist(item,index){
			this.indexPrev = index,
			this.firstid = item.id,
			api.getSecondIndustryList({
				first_id:item.id
			}).then(data =>{
				this.TwoIndustryList = data;
			})
			},
		//新建二级行业列表
    	addlevelTwoIndustry(){
			console.log(this.firstid)
			api.addSecondIndustryList({
				first_id:this.firstid,
				class_name:this.form2.name,
			}).then(data =>{
				alert('新建成功！')
				this.TwoIndustryList.push({class_name:data.name,id:data.id})
			})
		},	
		//点击二级行业获取对应币列表
		getIcoList(item,items){
			this.indexPrev = items;
			this.secondid = item.id
			console.log(item.id)
			api.getSecondIcoList({
				index:0,
				size:20,
				second_id:item.id
			}).then(data =>{
				this.Icolist = data;
			})
			},	
			removeFirstIndustry(){//删除一级行业列表
				api.removeIndustry({
					classId:this.firstid,
					type:1
				}).then(data=>{
					alert('删除成功！')
					this.request();
				})
			},
				removeSecondIndustry(){//删除二级级行业列表
				api.removeIndustry({
					classId:this.secondid,
					type:2
				}).then(data=>{
					alert('删除成功！')
					location.reload();
				})
			}
		},
		}
    
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
	.itembox{width: 100%;
	height: 100vh;
		.liBorder{margin: 0% 2%;
		border-bottom: 1px solid #cccccc;
			ul{display: inline-block;width: 50%;}
		}
		.secondlist{
			margin: 0% 2%;
			ul{display: inline-block;
				li{line-height: 30px;}
			}
		}
	}
	.btnRight{float: right;line-height: 30px;  li{display:inline-block;line-height: 30px;}	}
	    .selectStauts{
        background-color: rgb(174, 224, 224);
    }
</style>
