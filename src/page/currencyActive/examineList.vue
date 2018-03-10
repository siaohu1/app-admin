<template>
    <div class="audit-list" style="padding: 40px;">
        <div class="audit-left">
            <div class="left-border">
                <div class="left-header">
                    <el-badge :value="number1" class="item">
                        <el-button size="mini" @click="changeTab(0)">发起人审核</el-button>
                    </el-badge>
                    <el-badge :value="number2" class="item" style="margin-left: 20px">
                        <el-button size="mini" @click="changeTab(1)">活动审核</el-button>
                    </el-badge>
                </div>
                <ul v-if="n===1">
                    <li v-for="item in aduitList0.list" @click="getAdultDetail(item.id)">{{item.name}}</li>
                </ul>
                <ul v-if="n===2">
                    <li v-for="item in aduitList1.list" @click="activityDetail(item,id)">{{item.name}}</li>
                </ul>
            </div>
            <div class="block" style="margin-left: 20%" v-if="n===1">
                <span class="demonstration"></span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="aduitList0.count"
                    @current-change="getAdultList0">
                </el-pagination>
            </div>
            <div class="block" style="margin-left: 20%" v-if="n===2">
                <span class="demonstration"></span>
                <el-pagination
                    layout="prev, pager, next"
                    :total="aduitList1.count"
                    @current-change="getAdultList1">
                </el-pagination>
            </div>
        </div>
        <div class="audit-right1" v-show="n===1">
            <p>发起人姓名:{{adultDetail.name}}</p>
            <p>活动发起人身份证号:{{adultDetail.idNo}}</p>
            <p>活动发起人电话:{{adultDetail.tel}}</p>
            <ul>
                <li>
                    <p>身份证正面照</p>
                    <img :src="adultDetail.idFacadePic" alt="">
                </li>
                <li>
                    <p>身份证背面照</p>
                    <img :src="adultDetail.idReversePic" alt="">
                </li>
                <li>
                    <p>发起人照片</p>
                    <img :src="adultDetail.userPic" alt="">
                </li>
            </ul>
            <el-input
                type="textarea"
                :rows="7"
                placeholder="拒绝理由"
                v-model="textarea"
                style="margin: 10px 0"
            >
            </el-input>
            <div style="margin-left: 33%">
                <el-button @click="audit0(1)">审核通过</el-button>
                <el-button @click="audit0(2)">审核不通过</el-button>
            </div>
        </div>
        <!--content:'',-->
        <!--endTime	:'',-->
        <!--picList:''	,-->
        <!--startTime:'',-->
        <!--status	:'',-->
        <!--title:'',-->
        <div class="audit-right2" v-show="n===2">
            <p>活动详情</p>
            <p style="text-indent: 30px">{{activityDetails.status}}</p>
            <p style="padding: 0 7%;color: red">
                {{activityDetails.content}}
            </p>
            <swiper :options="swiperOption" class="swiperbox">
                <swiper-slide  v-for="(item,index) in activityDetails.picList"><img :src="item"  :key="index" style="width: 80%;margin-left: 10%"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <p>{{activityDetails.title}}</p>
            <p>{{activityDetails.startTime}} - {{activityDetail.endTime}}</p>
            <el-input
                type="textarea"
                :rows="5"
                placeholder="拒绝理由"
                v-model="textarea"
                style="margin: 10px 0"
            >
            </el-input>
            <div style="margin-left: 33%">
                <el-button @click="audit0(1)">审核通过</el-button>
                <el-button @click="audit0(2)">审核不通过</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.min.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import * as apiReguest from '../../api/api'

    export default {
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                swiperOption: {
                    autoplay: true,
                    mousewheelControl: true,
                    grabCursor: true,
                    setWrapperSize: true,
                    autoHeight: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                textarea: '',
                n: 1,
                number1: '33',
                number2: '66',
                pageSize: 10,
                aduitList0: {
                    count: 0,
                    list: []
                },
                aduitList1: {
                    count: 0,
                    list: []
                },
                adultDetail: {
                    id: '',
                    idFacadePic: '',
                    idNo: '',
                    idReversePic: '',
                    name: '',
                    tel: '',
                    userPic: '',
                },
                activityDetails:{
                    content:'',
                    endTime	:'',
                    picList:''	,
                    startTime:'',
                    status	:'',
                    title:'',
                }
            }
        },
        mounted () {
            this.getAdultList0()
        },
        methods: {
            // 人/活动
            changeTab (val) {
                if (val === 0) {
                    this.n = 1
                    this.number1 = ''
                    this.getAdultList0()
                } else {
                    this.n = 2
                    this.number2 = ''
                    this.getAdultList1()
                }
            },
            //发起人审核列表
            getAdultList0 (pageIndex = 1) {
                apiReguest.adultList({
                    type: 0,
                    pageIndex,
                    pageSize: this.pageSize
                })
                    .then(data => {
                        this.aduitList0 = data
                    })
                    .catch(() => {})
            },
            //活动审核列表
            getAdultList1 (pageIndex = 1) {
                apiReguest.adultList({
                    type: 1,
                    pageIndex,
                    pageSize: this.pageSize
                })
                    .then(data => {
                        this.aduitList1 = data
                    })
                    .catch(() => {})
            },
            //发起人审核详情
            getAdultDetail (id) {
                apiReguest.adultDetail(id)
                    .then(data => {
                        this.adultDetail = {
                            ...data,
                            id
                        }
                    })
                    .catch(() => {})
            },
            //活动审核详情
            activityDetail(id){
                apiReguest.activityAuditDetail(id)
                    .then(data =>{
                        this.activityDetails = {
                            ...data,
                            id
                        }
                    })
            },
            //审核
            audit0(type) {
                if (this.adultDetail.id) {
                    apiReguest.audit({
                        checkType: 0,
                        type,
                        id: this.adultDetail.id,
                        reason: this.textarea
                    })
                        .then(() => {
                            if (type === 1) {
                                alert('审核通过')
                            } else {
                                alert('审核不通过')
                            }
                        })
                        .catch(() => {})
                }
            }
        }
    }
</script>
<style scoped>
    .swiperbox{
        height: 200px;
        width: 100%;
    }
    li {
        list-style: none;
    }

    .audit-left {
        width: 30%;
        float: left;
    }

    .left-border ul li {
        height: 60px;
        line-height: 60px;
        border: 2px solid #ccc;
        border-bottom: none;
        padding-left: 30px;
    }

    .left-border ul {
        border-bottom: 2px solid #ccc;
    }

    .left-header {
        height: 30px;
    }

    .audit-right1 {
        float: left;
        width: 65%;
        margin-left: 5%;
    }

    .audit-right1 ul {
        margin-bottom: 10px;
    }

    .audit-right1 ul li {
        float: left;
        margin-right: 20px;
    }

    .audit-right1 > p {
        margin-top: 10px;
    }

    .audit-right1 li p {
        margin: 10px 0;
    }

    .audit-right2 {
        float: left;
        width: 65%;
        margin-left: 5%;
    }

    .audit-right2 p {
        margin: 10px 0;
    }
</style>

