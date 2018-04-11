import React from 'react'
import { List,InputItem, TextareaItem ,Picker,Button,WhiteSpace,WingBlank,Toast,DatePicker} from 'antd-mobile'
import './dc.work.info.css'
import {DoctorPerfectmaterial} from "../../api/api";
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getUserType} from "../../redux/user.redux"
import {city} from '../../static/mock/mock'
import {titleappellation} from '../../static/mock/mock'
import {radio} from "../../until";
const Item = List.Item
@connect(
    state=>state.user,
    {getUserType}
)
@withRouter
class DcWorkInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cityValue:[],
            username:'',
            introduction:'',
            expertise:'',
            achievements:'',
            major:'',
            learning:'',
            winning:'',
            autograph:'',
            sex:'',
            city:'',
            province:'',
            dcSystemName: '',
            dcSystem:'',
            starttime:null,
            address:'',
            appellation:'',
            appellationid:'',
            titleappellation:[],
        }
    }
    //提交
    onHandlePost=()=>{
        const {titleappellation,appellationid,appellation,username,introduction,expertise,achievements,major,learning,winning,autograph,sex,city,province,dcSystemName,starttime,address,dcSystem}=this.state
        DoctorPerfectmaterial({titleappellation:titleappellation[0],appellationid,appellation,starttime,classid:dcSystem,classname:dcSystemName,province,sex,city,username,introduction,expertise,autograph,achievements,major,learning,winning,address}).then(res=>{
            if(res.data.code===200){
                Toast.info('更新成功！',1,()=>{
                    this.props.history.goBack()
                    this.props.getUserType()
                })
            }else {
                Toast.info('更新失败！')
            }
        })
    }
    render(){
        const {classid,starttime,appellationid,sex,address,username,hospitalname,departmentname,expertise,introduction,learning,major,achievements,winning,autograph}=this.props
        return (
            <div>
                <WhiteSpace />
                <List>
                    <InputItem
                        clear
                        placeholder={username?username:"请输入真实姓名"}
                        onBlur={e=>this.setState({username:e})}
                    >姓名</InputItem>
                    {/*性别*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" >
                            <div className="item-title label">性别</div>
                            <div className="item-input">
                                <Item>
                                    <select defaultValue={sex} ref='sex' onChange={()=>{
                                        let sex = radio(this.refs,{ref:'sex'})
                                        this.setState({
                                           sex:sex.value
                                        })
                                    }}>
                                        <option value="1">男</option>
                                        <option value="2">女</option>
                                    </select>
                                </Item>
                            </div>
                        </div>
                    </div>
                    {/*所在地区*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" style={{display:'flex'}}>
                            <div className="item-title label">所在地区</div>
                            <div className="item-input">
                                <Picker style={{width:'100%'}} extra={this.props.province?`${this.props.province},${this.props.city}`:this.props.city}
                                        data={city}
                                        title="选择地区"
                                        cols={2}
                                        value={this.state.cityValue}
                                        onOk={(e) => {
                                            this.setState({
                                                cityValue:e,
                                                city:city[e[0]].children[e[1]].label,
                                                province:city[e[0]].label
                                            })
                                        }}
                                >
                                    <Item style={{width:'100%'}} className='picker'/>
                                </Picker>
                            </div>
                        </div>
                    </div>
                    {/*具体地址*/}
                    <InputItem
                        clear
                        placeholder={address?address:"请输入具体地址！"}
                        onBlur={e=>this.setState({address:e})}
                    >地址</InputItem>
                </List>
                <List renderHeader='详细资料'>
                    <InputItem
                        clear
                        placeholder={hospitalname}
                        disabled
                    >医院名称</InputItem>
                    <InputItem
                        clear
                        placeholder={departmentname}
                        disabled
                    >科室名称</InputItem>
                    {/*技术职称*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" style={{display:'flex'}}>
                            <div className="item-title label">技术职称</div>
                            <div className="item-input">
                                <Picker
                                    data={titleappellation}
                                    title="请选择"
                                    cascade={false}
                                    extra={this.props.titleappellation}
                                    value={this.state.titleappellation}
                                    cols={1}
                                    onOk={v=>this.setState({titleappellation: v})}
                                >
                                    <Item style={{width:'100%'}} className='picker'/>
                                </Picker>
                            </div>
                        </div>
                    </div>
                     {/*科室分类*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" >
                            <div className="item-title label" >业务擅长</div>
                            <div className="item-input">
                                <Item>
                                    <select defaultValue={appellationid} ref='depart' onChange={()=>{
                                        let dcdepart = radio(this.refs,{ref:'depart'})
                                        this.setState({
                                            appellationid: dcdepart.value,
                                            appellation: dcdepart.innerHTML
                                        })
                                    }}>
                                        <option value="0">成人疾病</option>
                                        <option value="1">儿童疾病</option>
                                        <option value="2">成人和儿童疾病</option>
                                    </select>
                                </Item>
                            </div>
                        </div>
                    </div>
                    {/*医学分类单选框*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" >
                            <div className="item-title label" >医学分类</div>
                            <div className="item-input">
                                <Item>
                                    <select defaultValue={classid} ref='dcSystem' onChange={()=>{
                                        let dcSystem = radio(this.refs,{ref:'dcSystem'})
                                        this.setState({
                                            dcSystem:dcSystem.value,
                                            dcSystemName:dcSystem.innerHTML
                                        })
                                    }}>
                                        <option value="0">西医</option>
                                        <option value="1">中医</option>
                                        <option value="2">中西医结合</option>
                                        <option value="3">其他民族医学</option>
                                    </select>
                                </Item>
                            </div>
                        </div>
                    </div>
                    {/*开始工作时间*/}
                    <div className="item-content">
                        <div className="item-inner am-list-line" style={{display:'flex'}}>
                            <div className="item-title label">工作时间</div>
                            <div className="item-input">
                                <DatePicker
                                    mode="date"
                                    title="选择日期"
                                    extra={starttime?starttime.substr(0,7):null}
                                    minDate={new Date(Date.now()-2.524608e12)}
                                    maxDate={new Date()}
                                    value={this.state.starttime?this.state.starttime:null}
                                    onChange={date => {
                                        this.setState({ starttime:date })
                                    }}
                                >
                                    <Item style={{width:'100%'}} className='picker'/>
                                </DatePicker>
                            </div>
                        </div>
                    </div>
                    <InputItem
                        disabled
                        placeholder={this.state.starttime?new Date().getFullYear()-this.state.starttime.getFullYear():this.props.starttime?new Date().getFullYear()-this.props.starttime.substr(0,4):null}
                    >从业年限</InputItem>
                    <InputItem
                        clear
                        placeholder={expertise?expertise:"可输入多条请用空格分隔"}
                        onBlur={e=>this.setState({expertise:e})}
                    >擅长疾病</InputItem>
                    <TextareaItem
                        title='个人简介'
                        placeholder={introduction?introduction:"请输入个人简介"}
                        rows={5}
                        onBlur={e=>this.setState({introduction:e})}
                        count={200}
                    />
                    <TextareaItem
                        title='学术经历'
                        placeholder={learning?learning:"请输入学术经历"}
                        rows={5}
                        onBlur={e=>this.setState({learning:e})}
                        count={200}
                    />
                    <TextareaItem
                        title='专业资历'
                        placeholder={major?major:"请输入专业资历"}
                        rows={5}
                        onBlur={e=>this.setState({major:e})}
                        count={200}
                    />
                    <TextareaItem
                        title='研究成果'
                        placeholder={achievements?achievements:"请输入研究成果"}
                        rows={5}
                        onBlur={e=>this.setState({achievements:e})}
                        count={200}
                    />
                    <TextareaItem
                        title='获奖介绍'
                        placeholder={winning?winning:'请输入获奖介绍'}
                        rows={5}
                        onBlur={e=>this.setState({winning:e})}
                        count={200}
                    />
                    <TextareaItem
                        title='个性签名'
                        placeholder={autograph?autograph:'请输入个性签名'}
                        rows={5}
                        onBlur={e=>this.setState({autograph:e})}
                        count={200}
                    />
                </List>
                <WhiteSpace size='lg'/>
                <WingBlank>
                    <Button type='primary' onClick={this.onHandlePost}>保存</Button>
                </WingBlank>
                <WhiteSpace size='lg'/>
            </div>
        )
    }
}
export default DcWorkInfo