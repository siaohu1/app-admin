import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'https://bit.macsen318.com/btoken/',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {
        // Do whatever you want to transform the data

        return qs.stringify({
            ...data,
            sys: 'admin',
            token:localStorage.token,
            systemVersion:7,
            pVersion:1, 
            version:1, 
            system:'win', 
            channel : 1,
            mobileInfo:'pc',
        })
    }]
})
// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         if (localStorage.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//             config.headers.Authorization = `token ${localStorage.token}`;
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });
// // http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     // 返回 401 清除token信息并跳转到登录页面
//                     store.commit(types.LOGOUT);
//                     router.replace({
//                         path: '/page/login',
//                         query: {redirect: router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//     });
instance.interceptors.response.use(res => { // 拦截请求后的状态
    if (res.data.ret === 1) {
        return res.data.data
    } else {
        return Promise.reject(res.data)
    }
})
//login
// export const login = params => {
//     return instance.post('/admin/passport/login',params)
// }
//币详情接口str
//全部币
export const getAllIcoList = params => {
    return instance.post('/admin/coin/all_coins',params)
}
//币详情
export const getIcoInfo = params => {
    return instance.post('/admin/coin/get_coin_info',params)
}
//查询待补全币列表
export const getWaitIcoList = params => {
    return instance.post('/admin/coin/get_coins',params)
}

//查询标签列表
export const getTagList = () => {
    return instance.post('/admin/tag/list')
}
//点击标签获取币列表
export const getTagIcoList = params => {
    return instance.post('/admin/coin/all_coins_by_tagid',params)
}
//查询一级行业列表
export const getFristIndustryList = () => {
    return instance.post('/admin/class/look_first')
}
//新建一级行业列表
export const addFristIndustryList = params => {
    return instance.post('/admin/class/add_first',params)
}
//删除行业列表
export const removeIndustry = params => {
    return instance.post('admin/class/del',params)
}
//查看二级行业列表
export const getSecondIndustryList = params => {
    return instance.post('/admin/class/look_second',params)
}
//新建二级行业列表
export const addSecondIndustryList = params => {
    return instance.post('/admin/class/add_second',params)
}
//点击二级行业查看对应币列表
export const getSecondIcoList = params => {
    return instance.post('/admin/class/look_project',params)
}
//查询图标链接列表
export const getIconLinkList = () => {
    return instance.post('/admin/coin/all_icons')
}
//保存草稿
export const saveDraft = params => {
    return instance.post('/admin/coin/add_coin_info',params)
}
//保存发布
export const saveUpICO = params => {
    return instance.post('/admin/coin/fabu_coin_info',params)
}

//新建ico图标
export const upImg = params => {
    return instance.post('/admin/coin/add_icon',params)
}
//新建标签
export const addTag = params => {
    return instance.post('/admin/tag/add',params)
}
//币圈接口str
//圈子列表
export const getGroupList = params => {
    return instance.post('/admin/group/group_list',params)
}
//圈子信息
export const getGroupInfo = params => {
    return instance.post('/admin/group/group_info',params)
}
//圈子成员列表
export const getGroupMemberList = params => {
    return instance.post('/admin/group/group_member_list',params)
}


//币活动接口
//轮播图列表
export const getBannerList = () => {
    return instance.post('/admin/activity/bannerList')
}
//轮播图新增
export const bannerAdd = params => {
    return instance.post('/admin/activity/bannerAdd', params)
}
//轮播图编辑
export const bannerEdit = params => {
    return instance.post('/admin/activity/bannerEdit', params)
}
//轮播图删除
export const bannerDelete = params => {
    return instance.post('/admin/activity/bannerDelete', params)
}
//城市列表
export const cityList = params => {
    return instance.post('/admin/activity/cityList', params)
}
//城市活动列表详情
export const cityActivityDetailList = params => {
    return instance.post('/admin/activity/cityActivityDetailList', params)
}
//城市新增
export const cityAdd = params => {
    return instance.post('/admin/activity/cityAdd', params)
}
//发起人审核详情
export const adultDetail = id => {
    return instance.post('/admin/activity/adultDetail', {id})
}
//审核列表
export const adultList = params => {
    return instance.post('/admin/activity/aduitList', params)
}
//审核接口
export const audit = params => {
    return instance.post('/admin/activity/audit', params)
}
//活动上下架
export const onoffActivity = params => {
    return instance.post('/admin/activity/onoffActivity', params)
}
//活动审核详情
export const activityAuditDetail = params => {
    return instance.post('/admin/activity/activityAuditDetail', params)
}

