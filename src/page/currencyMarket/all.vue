<template>
    <div class="fillcontain">
        <div class="table_container">
            <!-- <el-row :gutter="24"><headtop></headtop></el-row> -->
          <el-row>
             <el-col :span="8" >
                 <!-- <el-form>
                     <el-form-item>
                        <el-input placeholder="搜索"></el-input>
                     </el-form-item>
                 </el-form> -->
                <div class="block">
                    <el-pagination
                        @current-change="getCurrentPage"
                        :current-page="currentPage"
                        layout=" prev, pager, next"
                        :page-size="20"
                        :total="2000">
                    </el-pagination>
                </div>
                 <ul class="coinslist" >
                     <li v-for="(item,items) in coinData" :key="items" @click="cionInfo(item)" >
                        <span>{{item}}</span>
                        <!-- <span >
                         <el-button size="mini">编辑</el-button>
                        </span> -->
    
                     </li>
                 </ul>

             </el-col>
             <el-col :span="12"  v-show="infoCoinShow" class="details" >
                 <!-- <img :src= details.logo alt=""> -->
                 <ul>
                     <li>币名称：{{details.symbol}}</li>
                     <li>ICO成本：{{details.icoNum}}</li>
                     <li>ICO时间：{{details.icoTime}}</li>
                 </ul>
                 <ul>
                     <li>所属行业{{details.secondClassName}}</li>
                     <li>已有标签{{details.tagList}}</li>
                 </ul>
                 <ul>
                     <li>项目介绍{{details.desc}}</li>
                     <li>官网链接{{details.url}}</li>
                     <li>白皮书{{details.bookUrl}}</li>
                     <li>其他文字链接{{details.symbol}}</li>
                    <li> 图标{{details.symbol}}</li>
                 </ul>
            </el-col>
         </el-row>
            
        </div>
    </div>
</template>

<script>
	import * as api from '../../api/api'
    export default {
        data(){
            return {
              selecttype:'',
              dialogVisible: false,
                sreachtab:'',  //搜索标签
                imageUrl: '',
                coinData:[],
                currentPage:1,
                getcurrentPage:'',
                infoCoinShow:false,//默认隐藏右边币详情
                details:[],
            }
        },
    
    	components: {
        },
        mounted:function(){
            this.request()
        },
            watch:{
            // //搜索tab
            //     sreachtab(curVal,oldVal){
            //         console.log(oldVal )
            //     },
              
            },
        methods: {
            //进入页面查询币
            request(){
                api.getAllIcoList({
                    index:0,
                    size:20
                }).then(data =>{
                    this.coinData = data;
                    console.log(data)
                })
            },
             getCurrentPage(val){//获取当前页码并调接口
                api.getAllIcoList({
                        index:val,
                        size:20
                    }).then(data =>{
                        this.coinData = data;
                        console.log(data)
                    })
             },
            cionInfo(item){//右边显示币详情
                this.infoCoinShow = true;
                console.log(item)
                api.getIcoInfo({
                    symbol:item,
                }).then(data =>{
                    this.details = data;
                    console.log(this.details)
                })
            },
          

            
        },
    }
</script>

<style lang="less" scoped>
	@import '../../style/mixin';
    .coinslist{
        margin: 3%;
        border: 1px solid #cccccc;
        li{
            height: 50px;
            border-bottom: 1px solid #cccccc;
            line-height: 50px;
            span{
                padding-left: 3%;
            }
        }
    }
    .block{
        margin:3% 12%;
    }
    .details{
        margin: 4% 3% 4% 0%;
        border: 1px solid #ccc;
        ul li{
            text-decoration-style: none;
            height: 50px;
            line-height: 50px;
        }
    }
   
   
</style>
