import React from 'react'
import {List,DatePicker,Checkbox,Toast,InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {httpGet,httpPost} from '../../config'
import './user.center.setting.css'
const CustomChildren = ({ extra, onClick, children }) => (
    <div
        onClick={onClick}
        style={{ backgroundColor: '#fff', height: '.45rem',minHeight:'.45rem', lineHeight: '.45rem', padding: '0 .15rem' }}
    >
        <span style={{ float: 'right', color: '#888' }}>{extra}</span>
    </div>
);
const CustomChildren2 = ({ extra, onClick, children }) => (
    <div
        onClick={onClick}
        style={{ backgroundColor: '#fff', height: '.45rem',minHeight:'.45rem', lineHeight: '.45rem', padding: '0 .15rem' }}
    >
        <span style={{ float: 'left', color: '#888' }}>{extra}</span>
    </div>
);
@connect(
    state=>state.user
)
class UserSetting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            unanswered:true,
            callchecked:true,
            fastchecked:true,
            zhenhouchecked:true,
            customChildValue:null,
            customChildValue2:null,
            refuse1:false,
            refuse2:false,
            refuse3:false,
            jiajimoney:0,
            sharemoney:0,
            commonmoney:0,
            suspension:0,
            num:0
        }
    }
    componentDidMount(){
        httpGet('/User/getDoctorSetUp').then(res=>{
            console.log(res.data.data)
            this.setState({
                unanswered:res.data.data.unanswered,
                callchecked:res.data.data.is_dianming,
                fastchecked:res.data.data.is_fast,
                zhenhouchecked:res.data.data.is_after,
                customChildValue:new Date(`2017-12-12 ${res.data.data.starttime}`),
                customChildValue2:new Date(`2017-12-12 ${res.data.data.entime}`),
                refuse1:res.data.data.refuse1,
                refuse2:res.data.data.refuse2,
                refuse3:res.data.data.refuse3,
                jiajimoney:res.data.data.jiajimoney,
                sharemoney:res.data.data.sharemoney,
                commonmoney:res.data.data.money,
                suspension:res.data.data.suspension,
                num:res.data.data.num
            })
        })
    }
    //上传开始时间
    handleStateTime(v){
        if(Date.parse(this.state.customChildValue2)<Date.parse(v)){
            Toast.info('开始时间不可以大于结束时间！')
            return null
        }
        let hour = new Date(v).getHours()
        let minute = new Date(v).getMinutes()
        if(hour<10){
            hour = `0${hour}`
        }
        if(minute<10){
            minute = `0${minute}`
        }
        const time = `${hour}:${minute}`
        this.setState({
            customChildValue: v,
        })
        httpPost('/User/doctorSetUp',{starttime:time}).then(res=>{
            console.log(res)
        })
    }
    //结束时间
    handleEndTime(v){
        //结束时间做判断
        if(!this.state.customChildValue){
            Toast.info('请先设置开始时间！')
            return null
        }
        console.log(Date.parse(this.state.customChildValue))
        console.log(Date.parse(v))
        if(Date.parse(this.state.customChildValue)>Date.parse(v)){
            Toast.info('结束时间不可以小于开始时间！')
            return null
        }
        let hour1 = new Date(v).getHours()
        let minute1 = new Date(v).getMinutes()
        if(hour1<10){
            hour1 = `0${hour1}`
        }
        if(minute1<10){
            minute1 = `0${minute1}`
        }
        const time2 = `${hour1}:${minute1}`
        this.setState({
            customChildValue2: v
        })
        httpPost('/User/doctorSetUp',{entime:time2}).then(res=>{
            console.log(res)
        })
    }
    //医生选框函数
    //17：00后不接受咨询
    onChangeUnanswered = () => {
        this.setState({
            unanswered:!this.state.unanswered
        })
        if(!this.state.unanswered){
            httpPost('/User/doctorSetUp',{unanswered:1}).then(res=>{
                console.log(res)
            })
        }else {
            httpPost('/User/doctorSetUp',{unanswered:0}).then(res=>{
                console.log(res)
            })
        }
    }
    //点名咨询
    onChangeCall = () => {
        this.setState({
            callchecked:!this.state.callchecked
        })
        if(!this.state.callchecked){
            httpPost('/User/doctorSetUp',{is_dianming:1}).then(res=>{
                console.log(res)
            })
        }else {
            httpPost('/User/doctorSetUp',{is_dianming:0}).then(res=>{
                console.log(res)
            })
        }
    }
    //快速咨询
    onChangeFast = () => {
        this.setState({
            fastchecked:!this.state.fastchecked
        })
        if(!this.state.callchecked){
            httpPost('/User/doctorSetUp',{is_fast:1}).then(res=>{
                console.log(res)
            })
        }else {
            httpPost('/User/doctorSetUp',{is_fast:0}).then(res=>{
                console.log(res)
            })
        }
    }
    //诊后咨询
    onChangeZhenhou = () => {
        this.setState({
            zhenhouchecked:!this.state.zhenhouchecked
        })
        if(!this.state.callchecked){
            httpPost('/User/doctorSetUp',{is_after:1}).then(res=>{
                console.log(res)
            })
        }else {
            httpPost('/User/doctorSetUp',{is_after:0}).then(res=>{
                console.log(res)
            })
        }
    }
    //用户选框函数以及上传
    onChanges = (val,label) => {
        if(val === 0){
            this.setState({
                refuse1:!this.state.refuse1
            })
            if (!this.state.refuse1){
                httpPost('/User/doctorSetUp',{refuse1:1}).then(res=>{
                    console.log(res)
                })
            }else {
                httpPost('/User/doctorSetUp',{refuse1:0}).then(res=>{
                    console.log(res)
                })
            }
        }else if(val === 1){
            this.setState({
                refuse2:!this.state.refuse2
            })
            if (!this.state.refuse2){
                httpPost('/User/doctorSetUp',{refuse2:1}).then(res=>{
                    console.log(res)
                })
            }else {
                httpPost('/User/doctorSetUp',{refuse2:0}).then(res=>{
                    console.log(res)
                })
            }
        }else {
            this.setState({
                refuse3:!this.state.refuse3
            })
            if (!this.state.refuse3){
                httpPost('/User/doctorSetUp',{refuse3:1}).then(res=>{
                    console.log(res)
                })
            }else {
                httpPost('/User/doctorSetUp',{refuse3:0}).then(res=>{
                    console.log(res)
                })
            }
        }
    }
    //咨询费用
    onBlurInput=(type,v)=>{
        // 如果找不到，则return出去，不上传数据
        if(!v){
            return null
        }
        if(type==='urgent'){
            this.setState({
                jiajimoney:v
            })
            httpPost('/User/doctorSetUp',{jiajimoney:v}).then(res=>{
                console.log(res)
            })
        }else if(type==='share'){
            this.setState({
                sharemoney:v
            })
            httpPost('/User/doctorSetUp',{sharemoney:v}).then(res=>{
                console.log(res)
            })
        }else if(type==='common'){
            this.setState({
                commonmoney:v
            })
            httpPost('/User/doctorSetUp',{money:v}).then(res=>{
                console.log(res)
            })
        }
    }
    //暂缓咨询时间
    onChangeSuspension = (suspension) => {
        // 如果找不到，则return出去，不上传数据
        if(!suspension){
            return null
        }
        if(suspension>23||suspension<0){
            Toast.info('请输入正确暂缓咨询时间！')
            return null
        }
        this.setState({
            suspension
        })
        httpPost('/User/doctorSetUp',{suspension:suspension}).then(res=>{
            console.log(res)
        })
    }
    onChangeNum = (num) => {
        // 如果找不到，则return出去，不上传数据
        if(!num){
            return null
        }
        if(num>30){
            Toast.info('问诊次数最高为30次！')
            return null
        }else if(num<0){
            Toast.info('请输入正确问诊次数！')
            return null
        }
        this.setState({
            num
        })
        httpPost('/User/doctorSetUp',{num:num}).then(res=>{
            console.log(res)
        })
    }
    render(){
        const {callchecked,fastchecked,zhenhouchecked,refuse1,refuse2,unanswered,refuse3,jiajimoney,sharemoney,commonmoney,suspension,num} = this.state
        const Item = List.Item
        const CheckboxItem = Checkbox.CheckboxItem;
        //用户拒绝咨询数据
        const dataNot = [
            { values: 0, label: '被我拉黑者',checked:refuse1},
            { values: 1, label: '被我评价低于3星者',checked:refuse2 },
            { values: 2, label: '公众五星评价比例低于95%',checked:refuse3 }
        ];
        return (
            <div>
                {this.props.isDoctor?<List renderHeader={() => '17:00后不接收咨询'}>
                    <CheckboxItem checked={unanswered} onChange={this.onChangeUnanswered}>
                        关闭问诊
                    </CheckboxItem>
                </List>:null}
                {/*咨询设置*/}
                {this.props.isDoctor?<List renderHeader={() => '咨询设置'}>
                    <CheckboxItem checked={callchecked} onChange={this.onChangeCall}>
                            点名咨询
                    </CheckboxItem>
                    <CheckboxItem checked={fastchecked} onChange={this.onChangeFast}>
                            快速咨询
                    </CheckboxItem>
                    <CheckboxItem checked={zhenhouchecked} onChange={this.onChangeZhenhou}>
                        诊后咨询
                    </CheckboxItem>
                </List>:null}
                {/*咨询定价*/}
                {this.props.isDoctor?<List renderHeader={() => '咨询定价'}>
                    <InputItem
                        type='number'
                        placeholder={commonmoney}
                        className='setting-consult'
                        extra="¥"
                        onBlur={v=>this.onBlurInput('common',v)}
                    >普通问诊金额</InputItem>
                    <InputItem
                        type='number'
                        placeholder={jiajimoney}
                        className='setting-consult'
                        extra="¥"
                        onBlur={v=>this.onBlurInput('urgent',v)}
                    >分享问诊金额</InputItem>
                    <InputItem
                        type='number'
                        placeholder={sharemoney}
                        className='setting-consult'
                        extra="¥"
                        onBlur={v=>this.onBlurInput('share',v)}
                    >加急问诊金额</InputItem>
                </List>:null}
                {/*暂缓咨询时间*/}
                {this.props.isDoctor?<List renderHeader={() => '暂缓咨询时间'}>
                        <InputItem
                            type='number'
                            placeholder={suspension}
                            className='setting-consult'
                            extra="H"
                            onBlur={v=>this.onChangeSuspension(v)}
                        >暂缓时间</InputItem>
                </List>:null}
                {/*问诊限数*/}
                {this.props.isDoctor?<List renderHeader={() => '问诊次数设置'}>
                    <InputItem
                        type='number'
                        placeholder={num}
                        className='setting-consult'
                        extra="次"
                        onBlur={v=>this.onChangeNum(v)}
                    >问诊次数</InputItem>
                </List>:null}
                {/*推送时间*/}
                {this.props.isDoctor?<List renderHeader={() => '推送时间'}>
                    <Item style={{width:'40%',display:'inline-block'}}>
                        <DatePicker
                            mode="time"
                            format="HH:mm"
                            value={this.state.customChildValue}
                            onChange={(v) => this.handleStateTime(v)}
                            extra="请选择"
                        >
                            <CustomChildren />
                        </DatePicker>
                    </Item>
                    -
                    <Item style={{width:'40%',display:'inline-block'}}>
                        <DatePicker
                            mode="time"
                            format="HH:mm"
                            value={this.state.customChildValue2}
                            onChange={(v) => this.handleEndTime(v)}
                            extra='请选择'
                        >
                            <CustomChildren2 />
                        </DatePicker>
                    </Item>
                </List>:null}
                {/*用户拒绝咨询选项*/}
                {this.props.isDoctor?null:<List renderHeader={() => '拒绝咨询'}>
                    {dataNot.map(i => (
                        <CheckboxItem key={i.values} checked={i.checked} onChange={() => this.onChanges(i.values,i.label,i.checked)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>}
            </div>
        )
    }
}
export default UserSetting
