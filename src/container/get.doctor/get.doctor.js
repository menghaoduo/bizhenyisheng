import React from 'react'
import {NoticeBar,WhiteSpace} from 'antd-mobile'
import LogoView from '../../component/logo.view/logo.view'
import Search from '../../component/search/search'
import KsList from '../../component/keshi.list/keshi.list'
import WzList from '../../component/wenzhen.list/wenzhen.list'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import FastLsit from '../../component/doctor-fast-list/fast.list'
import ShareList from  '../../component/share.list/share.list'
import {connect} from 'react-redux'
import './get.doctor.css'

@connect(
    state=>state
)
class GetDoctor extends React.Component{
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
                <LogoView />
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
            </div>
        )
    }
}
export default GetDoctor