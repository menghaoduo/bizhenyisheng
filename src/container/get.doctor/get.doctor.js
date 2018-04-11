import React from 'react'
import {NoticeBar,WhiteSpace} from 'antd-mobile'
import Search from '../../component/search/search'
import KsList from '../../component/keshi.list/keshi.list'
import WzList from '../../component/wenzhen.list/wenzhen.list'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import FastLsit from '../../component/doctor-fast-list/fast.list'
import ShareList from  '../../component/share.list/share.list'
import {connect} from 'react-redux'
import logo from './logo.png'
import './get.doctor.css'
import {httpPost} from "../../config";
let localId;
@connect(
    state=>state
)
class GetDoctor extends React.Component{
    start=()=>{
        httpPost('/WeixinJsConfig?url=http://bzys.caa.edu.cn:9000/get-doctor').then(res=>{
                window.wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.data.appId, // 必填，公众号的唯一标识
                    timestamp:res.data.data.timestamp , // 必填，生成签名的时间戳
                    nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名
                    jsApiList: ['startRecord'] // 必填，需要使用的JS接口列表
                });
            }
        )
        window.wx.ready(function(){window.wx.startRecord()})
    }
    stop=()=>{
        window.wx.ready(function(){window.wx.stopRecord({
            success: function (res) {
                alert(res)
                localId = res.localId;
            }
        })})
    }
    render(){
        const all = {allkeshi:true}
        const getDoctorList ={
            title:'问诊帮助',
            type1:'点名咨询:',
            type1Info:['1、可以选择心仪医生，定向推送咨询信息进行一对一咨询;','2、医生利用空闲时间解答，等待时间可能较长甚至无回复；','3、方便进行后续联系，前往医生单位进行面诊或其他服务。'],
            type2:'快速咨询:',
            type2Info:['1、向所有符合筛选条件的在线医生推送咨询信息（≥2人）;','2、不能指定医生，解答开始后才能知道医生信息；','3、适用急需回复者，多数情况下可获得快速解答。 '],
            type3:'共享咨询:',
            type3Info:['1、随时主动搜寻所需咨询信息，我的需求我做主；','2、每次2元借鉴他人咨询经验，多快好省长知识；','3、还能发现好医生，添加关注以备今后不时之需。'],
            type4:'毕臻客服:',
            qq:'QQ：18237283423',
            weixin:'微信：bizhenyisheng',
            email:'邮箱：18237283423@qq.com',
            phonenumber:'电话：18237283423'
        }
        return (
            <div style={{background:'white'}}>
                {this.props.user.isDoctor?<NoticeBar marqueeProps={{loop:true}} mode="link" onClick={() => alert('1')}>你有1个患者的问题还未回答，点击这里去回答</NoticeBar> :null}
                <div className='logo-view'>
                    <img src={logo} alt=""/>
                    <div className='slogan'>
                        我们只提供有价值的健康咨询
                        <br/>
                        （三甲医院中高级职称临床医生）
                    </div>
                </div>
                <WhiteSpace />
                <Search />
                <div className='index-ks' ><KsList bool={all} /></div>
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                <WzList />
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                {this.props.user.isDoctor?null:<ShareList/>}
                {this.props.user.isDoctor?<FastLsit/>:null}
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                {this.props.help.getDoctor?<DrawerHelp helpList={getDoctorList}/>:null}

                <div onTouchStart={this.start} onTouchEnd={this.stop}>录音</div>
            </div>
        )
    }
}
export default GetDoctor