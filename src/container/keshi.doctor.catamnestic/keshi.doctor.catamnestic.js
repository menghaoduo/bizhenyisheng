import React from 'react'
import {List,TextareaItem,ImagePicker,InputItem,WhiteSpace,DatePicker,Toast,Checkbox} from 'antd-mobile'
import './keshi.doctor.catamnestic.css'
import {withRouter} from 'react-router-dom'
import { keshiDoctorFillHelpP } from '../../redux/user.help.redux'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import { connect } from 'react-redux'
import {httpPost} from "../../config";
import lrz from 'lrz'
const getDoctorList ={
    title:'如何填写',
    type1:'',
    type1Info:['1、仅供医生的线下面诊患者使用，需要拍照上传门诊或住院信息，医生不确认填写无效。',
        '2、提供门诊后或出院后48小时内的补充咨询，免去因小问题往返医院的奔波之苦。',
        '3、若病情变化较大或出现严重问题，请及时前往医院复诊，而非选择线上咨询！',
        '4、默认回复时间为24小时，超时无应答即撤回咨询信息。',
        '5、目前不收咨询费。若对医生服务特别满意，可至其主页进行“致谢打赏”。 '],
    type2:'',
    type2Info:[],
    type3:'',
    type3Info:[],
    type4:'',
    qq:'',
    weixin:'',
    email:'',
    phonenumber:''
}
const CheckboxItem = Checkbox.CheckboxItem;
const Item = List.Item
let minDate = new Date(Date.now()-604800000)
@connect(
    state=>state.help,
    { keshiDoctorFillHelpP }
)
@withRouter
class KeshiDoctorCatamnestic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files:[],
            imgArr:[],
            date:new Date(),
            name:'',
            zhenliaoType:'',
            orderNum:0,
            bedNum:0,
            problemContent:'',
            shareValue:true,
            share:1,
        }
    }
    //处理跳转
    handleClick=()=>{
        const {problemContent,share,imgArr,date,orderNum,bedNum,name} = this.state
        if(!problemContent){
            Toast.info('请填写提问信息！')
            return null
        }
        if(!name){
            Toast.info('请输入您的姓名！')
            return null
        }
        if(!bedNum){
            Toast.info('请输入您的床位号！')
            return null
        }
        if(!orderNum){
            Toast.info('请输入您的门诊号！')
            return null
        }
        const djdcid=JSON.parse(this.props.match.params.data).dcid
        httpPost('/Qa/addProblem',{patient:{menzhennum:orderNum,name:name,bedNum:bedNum,date:date.toLocaleString()},problem:problemContent,is_urgent:0,doctorid:djdcid,typeid:3,share:share,money:1},{imgurl:Array.from(new Set(imgArr))}).then(res=>{
            if (res.data.code===200){
                this.props.history.push('/dcpay/'+JSON.stringify({id:res.data.data.id}))
            }
        })
    }
    //处理图片
    onChange = (files) => {
        this.setState({
            files,
            imgArr:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url,{quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr.push(rst.base64)
                    })
            })
        })
    }
    //是否公开问题
    onChangeShare = () => {
        this.setState({
            shareValue:!this.state.shareValue
        })
        if(!this.state.shareValue){
            this.setState({
                share:0
            })
        }else {
            this.setState({
                share:1
            })
        }
    }
    render(){
        return (
            <div>
                {this.props.keshiDoctorFill?<DrawerHelp helpList={getDoctorList}/>:null}
                {/*头部*/}
                <List className="my-list">
                    <Item>
                        <div className='wen-title'>提交问题</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}}  onClick={this.props.keshiDoctorFillHelpP}>如何申请<span className='ion-ios-help-outline' /></div>
                    </Item>
                </List>
                <WhiteSpace/>
                {/*填写诊后信息*/}
                <List renderHeader={() => '诊疗信息及身份确认'}>
                    <InputItem
                        clear
                        placeholder="请输入姓名"
                        onBlur={(v)=>this.setState({name:v})}
                    >患者姓名</InputItem>
                    <DatePicker
                        extra="年 月 日"
                        title="选择日期"
                        minDate={minDate}
                        value={this.state.date}
                        maxDate={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item className='consultation-time'>诊疗时间</List.Item>
                    </DatePicker>
                    <InputItem
                        clear
                        placeholder="请输入门诊号码"
                        onBlur={(v)=>this.setState({orderNum:v})}
                    >门诊号</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入出院病床号"
                        onBlur={(v)=>this.setState({bedNum:v})}
                    >病床号</InputItem>
                </List>
                <WhiteSpace/>
                {/*提问内容*/}
                <List renderHeader={() => '向医生提问（描述症状、部位、持续时间等）'}>
                    <TextareaItem
                        placeholder='请将您本次门诊就诊或住院经历简要概述，帮助医生回忆和确认您的身份。并请详细描述本次咨询事宜。'
                        rows={8}
                        count={150}
                        onBlur={(v)=>this.setState({problemContent:v})}
                    />
                </List>
                <WhiteSpace/>
                {/*上传照片*/}
                <List renderHeader={() => '上传门诊或住院信息、症状照片、病例、检查单，限6张，仅医生可见。'}>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        multiple
                        selectable={this.state.files.length < 6}
                        onImageClick={(index, fs) => console.log(index, fs)}
                    />
                </List>
                <List>
                    <CheckboxItem checked={this.state.shareValue} onChange={this.onChangeShare}>
                        公开问题
                    </CheckboxItem>
                </List>
                {/*提问按钮*/}
                <List>
                    <div className='ask-tab'>
                        <p>医生将在 <strong>72</strong> 小时内回复你,若超过最终限定时间医生仍未回复,系统将关闭该咨询,预付费用全额退还用户。</p>
                        <div onClick={this.handleClick}>支付 ¥ 1 提问</div>
                    </div>
                </List>
            </div>
        )
    }
}
export default KeshiDoctorCatamnestic