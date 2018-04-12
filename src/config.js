import axios from 'axios'
import { Toast } from 'antd-mobile'
//拦截请求
axios.interceptors.request.use(function (config) {
    if(config.method==='get'){
        Toast.loading('加载中',0)
    }else if(config.method==='post'){
        Toast.loading('数据提交中',0)
    }
	return config
})
axios.interceptors.response.use(function (config) {
    console.log(config.data)
    //code为401时，微信未认证状态
    if(config.data.code===401){
        window.location.href = config.data.data;
    }
    if(config.data.code!==200){
        Toast.info('错误,请与客服联系！')
    }
	Toast.hide()
	return config
})
//参数3是图片上传
export const httpPost = (url,params,img) =>
    axios({
        method: "post",
        baseURL: 'http://bzys.caa.edu.cn'+url,
        data: JSON.stringify(img),
        params: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
    })
export const httpGet = url =>
    axios({
        method: "get",
        baseURL: 'http://bzys.caa.edu.cn'+url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
        crossDomain: true,
        changeOrigin:true,
    })