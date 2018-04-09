import React from 'react'
import { connect } from 'react-redux'
import {WhiteSpace,List,Icon,Result,Flex} from  'antd-mobile'
import './user.center.css'
import {httpGet} from "../../config";
@connect(
    state=>state.user
)
class UserMyself extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataDc:[
                {num:0,text:'我的患者',path:'/userdcpt'},
                {num:0,text:'我的回答',path:'/doctoranswer'},
                {num:0,text:'收到心意'}
            ],
            dataNotDc:[
                {num: 0, text: '我的医生', path: '/userdcpt'},
                {num: 0, text: '我的问诊', path: '/userquestion'},
                {num: 0, text: '看问题', path: '/userlookhistoryproblem'}
            ],
            dataTop:[
                {title:'健康档案',class:'ion-ios-list',extra:'2位',isDoctor:!this.props.isDoctor},
                {title:'特权优惠',class:'ion-ios-pricetags',extra:'5',isDoctor:!this.props.isDoctor},
                {title:'职业信息',class:'ion-ios-box',extra:'编辑',isDoctor:this.props.isDoctor,path:'/dcworkinfo'},
                {title:'积分纪录',class:'ion-ios-calendar-outline',extra:'50分',isDoctor:this.props.isDoctor}
            ],
            dataCenter: [{title:'我的二维码',class:'ion-code-download',isDoctor:this.props.isDoctor,path:'/dcmyqrcode'}],
            dataBottom: [{title:'推荐给朋友',class:'ion-ios-people'},
                {title:'设置',class:'ion-ios-gear',path:'/usersetting'},
                {title:'意见反馈',class:'ion-ios-compose'}
            ],
            bcDoctorState: true,
            bcDoctorText: ''

        }
    }
    componentDidMount(){
        httpGet('/Authenticationstate').then(res=>{
            this.setState({
                bcDoctorState: res.data.data.state,
                bcDoctorText: res.data.data.str
            })
        })
        if(this.props.isDoctor){
            httpGet('/User/doctorData').then(res=>{
                this.setState({
                    dataDc:[
                        {num:res.data.data.FollowPatient,text:'我的患者',path:'/userdcpt'},
                        {num:res.data.data.Qanum,text:'我的回答',path:'/doctoranswer'},
                        {num:res.data.data.Gift,text:'收到心意'}
                    ]})
            })
        }else {
            httpGet('/User/getUserData').then(res=> {
                this.setState({
                    dataNotDc: [
                        {num: res.data.data.FollowDoctor, text: '我的医生', path: '/userdcpt'},
                        {num: res.data.data.Qanum, text: '我的问诊', path: '/userquestion'},
                        {num: res.data.data.LookQa, text: '看问题', path: '/userlookhistoryproblem'}
                    ]
                })
            })
        }
    }
    render() {
        const {dataTop,dataCenter,dataBottom} = this.state
        const Item = List.Item;
        return (
            <div>
                <div className='user-info'>
                    <Result
                        img={<img src={this.props.header} alt="" onClick={()=>this.props.history.push('/personaldata')}/>}
                        title={<span onClick={()=>this.props.history.push('/personaldata')}>{this.props.name}</span>}
                    />
                    <Flex>
                        {this.props.isDoctor?this.state.dataDc.map(v=>(
                            <Flex.Item key={v.text} onClick={()=>this.props.history.push(v.path)}>
                                <h4 style={{margin:'9px 0'}}>{v.num}</h4>
                                <div>{v.text}</div>
                            </Flex.Item>
                        )):this.state.dataNotDc.map(v=>(
                            <Flex.Item key={v.text} onClick={()=>this.props.history.push(v.path)}>
                                <h4 style={{margin:'9px 0'}}>{v.num}</h4>
                                <div>{v.text}</div>
                            </Flex.Item>
                        ))}
                    </Flex>
                    <div className='top-bg' style={{backgroundImage:`url(${this.props.header})`,filter: 'blur(10px)',opacity:0.8}}/>
                </div>
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                <List>
                    {dataTop.map(v=>(
                        v.isDoctor?<Item
                            thumb={<div className={v.class}/>}
                            key={v.title}
                            arrow="horizontal"
                            onClick={() => {this.props.history.push(v.path)}}
                            activeStyle={false}
                            extra={v.extra}
                        >{v.title}</Item>:null
                    ))}
                    <Item
                        thumb={<div className='ion-ios-star'/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        activeStyle={false}>评价</Item>
                </List>
                <WhiteSpace/>
                <List>
                    {dataCenter.map(v=>(
                        v.isDoctor?<Item
                            thumb={<div className={v.class}/>}
                            key={v.title}
                            arrow="horizontal"
                            onClick={() => this.props.history.push(v.path)}
                            activeStyle={false}
                            extra={v.extra}
                        >{v.title}</Item>:null
                    ))}
                    {dataBottom.map(v=>(
                        <Item
                            thumb={<div className={v.class}/>}
                            key={v.title}
                            arrow="horizontal"
                            onClick={() => this.props.history.push(v.path)}
                            activeStyle={false}
                        >{v.title}</Item>
                    ))}
                </List>
                <WhiteSpace />
                <List>
                    <Item
                        thumb={<Icon type='check-circle-o' className='become-doctor'/>}
                        arrow="horizontal"
                        onClick={() => {
                            if (this.state.bcDoctorState) {
                                this.props.history.push('/becomedcfirst')
                            }
                        }}
                        extra={this.state.bcDoctorText}
                        activeStyle={false}
                    >成为医生</Item>
                </List>
            </div>
        )
    }
    shouldComponentUpdate(nextprops,nextstate){
        if(this.props  !== nextprops || nextstate !== this.state){
            return true
        }else {
            return false
        }
    }
}
export default UserMyself