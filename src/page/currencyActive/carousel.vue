<template>
    <div class="swipe">
        <div class="swipe-header">
            <p>轮播图设置</p>
            <el-button size="mini" @click="addlabel = true">新增轮播图</el-button>
            <el-dialog title="新增轮播图" :visible.sync="addlabel">
                <el-form :model="form1">
                    <el-form-item label="标题">
                        <el-input type="text" v-model="form1.title"></el-input>
                    </el-form-item>
                    <el-form-item label="活动链接">
                        <el-input type="text" v-model="form1.url"></el-input>
                    </el-form-item>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://bit.macsen318.com/btoke/api/upload"
                        multiple
                        :before-upload="beforeUpload"
                        :on-change="handleOnchange">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <div>
                        <img width="150" v-if="uploadImg" :src="uploadImg">
                    </div>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addlabel = false,saveSwipe()">保存</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="swipe-main">
            <ul>
                <li v-for="(list,index) in bannerList">
                    <div class="main-left">
                        <img :src="list.picture" alt="">
                        <div>
                            <p>标题:{{list.title}}</p>
                            <p>链接:{{list.linkUrl}}</p>
                            <p>有效城市:{{list.city}}</p>
                        </div>
                    </div>
                    <div class="main-right">
                        <div>
                            <el-button size="mini" @click="editBanner(list.bannerId)">编辑</el-button>
                        </div>
                        <div>
                            <el-button size="mini" @click="delBanner(list.bannerId)">删除</el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>
<script>
    import * as apiRequest from '../../api/api'
    const cityOptions = ['上海', '北京', '广州', '深圳', '杭州']
    export default {
        data() {
            return {
                addlabel: false,
                form1: {
                    title: '',
                    url: '',
                },
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                bannerList: [],
                bannerId: '',
                form2: {
                    title: '',
                    url: '',
                },
                isIndeterminate: false,
                uploadImg: ''
            }
        },
        mounted() {
            this.getBannerLists()
        },
        // created() {
        //     this.getBannerLists();
        // },
        methods: {
            // 获取轮播图列表
            getBannerLists() {
                var _this = this
                apiRequest.getBannerList()
                    .then(data => {
                        _this.bannerList = data.bannerList
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : []
                this.isIndeterminate = false
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length
                this.checkAll = checkedCount === this.cities.length
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
            },
            //保存轮播图
            saveSwipe() {
                apiRequest.bannerAdd({
                    title: this.form1.title,
                    linkUrl: this.form1.url,
                    activeCity: this.checkedCities.join(','),
                    picture: this.uploadImg
                })
                    .then(() => {
                        this.form1 = {
                            title: '',
                            url: '',
                        }
                        this.checkedCities = []
                        this.picture = ''
                        this.uploadImg = ''
                        this.getBannerLists()
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //删除轮播图
            delBanner(bannerId) {
                apiRequest.bannerDelete({
                    bannerId
                })
                    .then(data => {
                        alert('删除成功');
                        this.getBannerLists();
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //编辑轮播图
            editBanner() {
            },
            beforeUpload() {
                return false
            },
            handleOnchange() {
                let fileValue = document.querySelector('.el-upload .el-upload__input');
                let url = "https://bit.macsen318.com/btoken/api/upload";
                let formData = new FormData();
                // 配置post请求的参数。参数名file,后面跟要传的文件，参数名fileType，值为category（看后端的具体要求）
                formData.append('file', fileValue.files[0])
                formData.append('sys', 'admin')
                formData.append('token', localStorage.token);
                let xhr = new XMLHttpRequest()
                xhr.open('POST', url, true)
                // url就是要发送的post请求的地址
                xhr.send(formData)
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        //   console.log(xhr.responseText.data);
                        let responseText  =  xhr.responseText;
                        let responseData  = JSON.parse(responseText);
                        this.uploadImg = responseData.data.url
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    li {
        list-style: none;
    }
    .swipe {
        padding: 50px;
    }
    .swipe-header {
        border-bottom: 2px solid #ccc;
        height: 40px;
        clear: both;
    }
    .swipe-header p {
        float: left;
    }
    .swipe-header button {
        float: right;
        width: 100px;
        height: 30px;
        background: white;
    }
    .swipe-main img {
        height: 100px;
        width: 260px;
        float: left;
        margin-right: 30px;
    }
    .swipe-main p {
        margin-top: 20px;
    }
    .main-right {
        float: right;
        clear: both;
        position: relative;
        bottom: 100px;
    }
    .main-right div button {
        width: 100px;
        height: 30px;
        background: white;
        margin-top: 10px;
    }
    .swipe-main ul li {
        height: 150px;
        border-bottom: 2px solid #ccc;
        padding-top: 20px;
    }
</style>
