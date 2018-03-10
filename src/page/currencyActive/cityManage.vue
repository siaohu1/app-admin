<template>
    <div class="city-list">
        <div class="list-left">
            <div class="newAddCity">
                <el-button @click="addCity = true">新增城市</el-button>
                <el-dialog title="新增城市" :visible.sync="addCity">
                    <el-form>
                        <el-form-item label="输入城市名称:">
                            <el-input type="text" v-model="cityName"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button @click="addCity = false,savaCity()">保存</el-button>
                </el-dialog>
            </div>
            <el-table
                :data="cityLists"
                @row-click="rowClick"
                style="width: 100%;
overflow-x:hidden">
                <el-table-column
                    prop="cityName"
                    label="城市"
                    width="80"
                    style="height: 200px"
                >
                </el-table-column>
                <el-table-column
                    prop="endCount"
                    label="已结束"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="unendCount"
                    label="未结束">
                </el-table-column>
            </el-table>
            <el-pagination
                layout="prev, pager, next"
                :total="cityCount"
                @current-change="cityListsss">
            </el-pagination>
        </div>
        <div class="list-right">
            <div class="right-top">
                <el-button size="mini" :type="curType === 0 ? 'success' : 'text'" @click="changeTab(0)">未结束</el-button>
                <el-button size="mini" :type="curType === 1 ? 'success' : 'text'" @click="changeTab(1)">已结束</el-button>
            </div>
            <div class="city-main">
                <div class="right-content">
                    <ul>
                        <li v-for="item in detailList.activityList">
                            <img :src="item.topPic" alt="">
                            <div>
                                <p>活动名称:{{item.activityName}} <span>{{item.expectCount}}人</span></p>
                                <p>{{item.startTime}} - {{item.endTime}}</p>
                                <p>{{item.location}}
                                    <el-button size="mini" @click="offActivity(item.activityId)">下架活动</el-button>
                                </p>
                            </div>
                        </li>
                    </ul>
                    <!--<el-button size="mini" style="float: none;margin-left: 48%">分页</el-button>-->
                </div>
                <div class="block" style="margin-left: 34%;margin-top: 2%">
                    <span class="demonstration"></span>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="detailList.count"
                        @current-change="cityActivityDetailList">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import * as apiRequest from '../../api/api'
    import axios from 'axios'
    export default {
        data() {
            return {
                addCity: false,
                cityName: '',
                cityLists: [],
                cityCount: 0,
                curRow: {},
                curType: 0,
                detailList: {
                    activityList: [],
                    count: 0
                }
            }
        },
        mounted(){
            this.cityListsss();
        },
        // created(){
        //     this.cityList();
        // },
        methods: {
            //城市列表
            cityListsss(pageIndex = 1) {
                var _this = this
                apiRequest.cityList({
                    pageIndex,
                    pageSize: 10
                })
                    .then(data => {
                        _this.cityLists = data.cityList
                        _this.cityCount = data.count
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            //保存城市
            savaCity() {
                apiRequest.cityAdd({
                    cityName: this.cityName
                }).then(() => {
                    this.cityName = ''
                    this.cityListsss();
                    alert('添加成功')
                }).catch(error => {
                    console.log(error)
                })
            },
            //获取城市活动列表详情
            rowClick(row) {
                this.curRow = row
                this.cityActivityDetailList()
            },
            changeTab(type) {
                this.curType = type
                this.cityActivityDetailList()
            },
            cityActivityDetailList(pageIndex = 1) {
                if (this.curRow.cityName) {
                    apiRequest.cityActivityDetailList({
                        cityName: this.curRow.cityName,
                        pageIndex,
                        pageSize: 10,
                        type: this.curType
                    })
                        .then(data => {
                            console.log(data)
                        })
                        .catch(() => {})
                }
            },
            offActivity(activityId) {
                apiRequest.onoffActivity({
                    activityId,
                    status: 2
                })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(() => {})
            }
        }
    }
</script>

<style lang="less" scoped>
    li {
        list-style: none
    }
    .city-list {
        padding: 50px;
    }
    .list-right {
        float: left;
    }
    .list-left {
        width: 30%;
        float: left;
    }
    .list-right {
        width: 66%;
        margin-left: 3%;
    }
    .right-content ul {
        border-bottom: 2px solid #ccc;
    }
    .city-main {
        border: 1px solid #ccc;
        padding: 20px;
    }
    .right-content {
    }
    .right-content ul li img {
        height: 80px;
        width: 260px;
        float: left;
        margin-right: 30px;
        border: none;
    }
    .right-content ul li {
        border: 2px solid #ccc;
        border-collapse: collapse;
        padding: 10px 20px 5px 5px;
        border-bottom: none;
    }
    .right-content ul li p span {
        float: right;
    }
    .right-content ul li p button {
        float: right;
    }
    .right-content ul li p {
        margin-top: 10px;
    }
    .right-top {
        padding-left: 30px;
    }
</style>
