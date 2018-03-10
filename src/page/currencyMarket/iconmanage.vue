<template>
    <div class="fillcontain">
        <div class="table_container">
            <el-row>
                <el-col :span="10" style="border:1px solid #ccc;">
                   <el-form style="border-bottom:1px solid #ccc;">
                       <el-form-item style="line-height:60px;">
                           <el-button style="margin:3% 0% 0% 80%;" @click="dialogFormVisible = true">新增</el-button>
                           <el-dialog title="新建图标" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                         <el-upload
                                            action="123"  
                                            :http-request="requestImg"              
                                            :before-upload="beforeAvatarUpload"
                                            enctype="multipart/form-data"
                                            list-type="picture-card">
                                            <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible" >
                                                <img width="100%" :src="dialogImageUrl" alt="">
                                            </el-dialog>
                                            <el-form-item label="名称">
                                                <el-col :span="6">
                                                    <el-input v-model="form.name"></el-input>
                                                </el-col>
                                            </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false,uploadImg()">确 定</el-button>
                                </div>
                                </el-dialog>
                       </el-form-item>
                   </el-form>
                    <ul>
                        <li class="icoList" v-for="(item,itmes) in icoList " :key="itmes">
                          <ul class="icoInfo">
                              <li><img class="imgstyle" :src="item.picUrl" alt=""></li>
                              <li><span>{{item.name}}</span><span>图片</span></li>
                              <li style="float:right;"><el-button>编辑</el-button></li>
                          </ul>
                        </li>
                    </ul>
                </el-col>
                <!-- <el-col :span="16" style="border:1px solid #ccc;">
                    <div style="width:80%;margin:0 auto;margin-top:30px;">
                         <el-upload
                            class="avatar-uploader"
                            action="https://bit.macsen318.com/btoken/admin/coin/add_icon"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <el-form >
                            <el-form-item label="图标：">
                                <el-col :span="10">
                                    <el-input style="position: relative;"></el-input>
                                    <el-button style="position: absolute; top:0;left:52%;">确定</el-button>
                                </el-col>

                            </el-form-item>
                            <el-form-item label="类型：">
                                <el-col :span="14">
                                      <el-select v-model="selecttype" placeholder="选择类型" style="display:inline-block;">
                                        <el-option label="链接" value="wechat"></el-option>
                                        <el-option label="图片" value="weibo"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-form>
                       <el-button style="margin-left:75%;margin-bottom:30px;">确定</el-button>
                    </div>
                </el-col> -->
            </el-row>
        </div>
    </div>
</template>

<script>

import * as api from '../../api/api'
  var myToken = localStorage.token;
    export default {
        data(){
            return {
                url:'',
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl: '',
                picUrl:'',
                imgFile:'',
               imageUrl: '' ,
                 dialogFormVisible: false,
                 form:{
                        name:''
                 },
                 icoList:''
            }
        },

        methods: {
            response(){//查询图标列表
                api.getIconLinkList({
                }).then(data =>{
                    this.icoList = data;
                    console.log(data)
                })
    
            },
            progress(event, file, fileList){
                console.log(file)
            },
                beforeAvatarUpload(file) {
                 this.imgFile= file;
                },
                requestImg(){//上传图片
                    let fileValue = document.querySelector('.el-upload .el-upload__input');
                    let url = "https://bit.macsen318.com/btoken/api/upload";
                    let formData = new FormData();
                    let imgData  = new FormData(fileValue.files[0]);
                    formData.append('file', this.imgFile);
                    formData.append('sys', 'admin')
                    formData.append('token', myToken);
                    let xhr = new XMLHttpRequest()
                    xhr.open('POST', url, true)
                    xhr.send(formData)
                    xhr.onload = () => {
                    if (xhr.status === 200) {
                    let responseText  =  xhr.responseText; 
                    let responseData  = JSON.parse(responseText);
                    this.imageUrl = responseData.data.url;
                    }
                    }
                },
                uploadImg(){
                    api.upImg({
                        url:this.imageUrl,
                        name:this.form.name,
                    }).then(data =>{
                        if (data.ret==1) {
                           alert('新建成功！')
                       }
                    })
                }

           
            
    },
            mounted:function(){
            this.response();
        },
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
  
    .table_container{
        padding: 20px;
    }
    .icoList{
        margin: 3%;
        border-bottom: 1px solid #cccccc;
    }
    .icoInfo{
        height: 60px;
        margin:2%;
        li{display: inline-block;
            line-height: 60px;
        }
    }
    .imgstyle{
        width: 40px;height: 40px;
    }
  

</style>
