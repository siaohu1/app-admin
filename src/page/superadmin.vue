<template>
    <div>
		<headtop></headtop>
      	<el-row class="box">
            <el-col :span="10" >
                <el-form >
                    <el-form-item >
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                        <el-button>搜索</el-button>
                        <el-button class="addBtn">新建管理员</el-button>
                    </el-form-item>
                </el-form>
                <ul>
                    <li class="adminlist">
                        <ul >
                            <li>董涛涛</li>
                            <li><el-button  size="small">编辑</el-button></li>
                            <li >
                                <el-button  size="small" @click="dialogVisible = true">删除</el-button>
                                <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="30%"
                                :before-close="handleClose">
                                <span>是否删除</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                </span>
                                </el-dialog>
                            </li>
                        </ul>
                    </li>
                </ul>
            </el-col>
            <el-col :span="14" >
                <el-form  ref="form" :model="form"  >
                    <p>新建/编辑 管理员</p><br>
                    <p>管理员基本信息：</p>
                    <br><br>
                    <el-form-item label="管理员姓名：">
                        <el-col :span="12">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="管理员用户名：">
                        <el-col :span="12">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="管理员联系方式：">
                        <el-col :span="12">
                            <el-input v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-button class="submitBtn">重置密码</el-button>
                </el-form>
                <hr>
                <el-form >
                    <p>管理员权限信息：</p>
                    <br>
                    <el-form-item >
                        <el-checkbox label="币行情列表"></el-checkbox>
                        <el-checkbox-group v-model="form.type" class="checkboxG">
                            <el-checkbox class="boxright"  label="允许创建修改行业" name="type"></el-checkbox>
                            <el-checkbox class="boxright" label="允许创建修改标签" name="type"></el-checkbox>
                            <el-checkbox  class="boxright" label="允许修改币行情" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                       <el-checkbox label=" 币圈权限" ></el-checkbox>
                    </el-form-item>
                </el-form>
            
            </el-col>
        </el-row>
    </div>
</template>

<script>
	import headtop from '../components/headtop.vue'
	export default{
        components:{headtop},
        data() {
        return {
            dialogVisible: false,
            form:{
                name:'',
                type:[]
            }
        };
        },
        methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
        }
	}
</script>

<style lang="less">
    .box{
        height: 100vh;
        margin: 0% 3%;
        border: 1px solid #cccccc;
        .el-col-10{
           border-right:1px solid #cccccc;
           height: 100vh; 
        }
        }
        .el-form{
            margin: 3%;
            
        }
    .adminlist{
        height: 50px;
        border-bottom: 1px solid #ccc;
        ul {
              margin: 0% 5%;
              display: flex;
              justify-content: space-around;
            li{
            display: inline-block;
            line-height: 50px;
        }
        }
    }
   .checkboxG{
       margin-left: 8%;
       .boxright{margin-right: 5%;}
   }
   .addBTn{float: right;}
   .submitBtn{margin-left: 70%;}
</style>
