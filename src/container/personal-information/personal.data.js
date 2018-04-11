import React from 'react'
import {List,InputItem,Button,WhiteSpace,Modal,DatePicker,WingBlank,Toast} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './personal.data.css'
import {connect}  from 'react-redux'
import {DoctorPerfectmaterial} from "../../api/api"
import {getUserType} from "../../redux/user.redux"
@connect(
    state=>state.user,
    {getUserType}
)
@withRouter
class PersonData extends React.Component{
    constructor() {
        super();
        this.state = {
            username:'',
            data: [],
            visible: false,
            modal:false,
            bornDate:null
        }
        this.onClose = this.onClose.bind(this)
    }
    componentWillMount(){
        this.props.getUserType()
    }
    //关闭姓名更改modal
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
        this.props.getUserType()
    }
    //修改姓名提交点击事件
    postNameButton= ()=>{
        DoctorPerfectmaterial({username:this.state.username}).then(res=>{
            if(res.data.code===200){
                Toast.info('姓名修改成功!',1)
                this.onClose('modal')
            }
        })
    }
    //姓名输入框
    onNameBlur=(value)=>{
        this.setState({
            username:value
        })
    }
    //打开姓名更改modal
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    componentWillReceiveProps(nextprops){
        this.props.getUserType()
        this.setState(
            {bornDate:nextprops.starttime}
        )
    }
    render(){
        const Item = List.Item
        return (
            <div>
                <List className="my-list">
                    <Item multipleLine extra={<img src={this.props.header} alt='头像' style={{borderRadius:'100%'}}/>}>
                        头像
                    </Item>
                    <Item multipleLine extra={<p style={{textAlign:'right'}}>{this.props.name}</p>} >
                        昵称
                    </Item>
                    <Item arrow="horizontal" multipleLine extra={<p style={{textAlign:'right'}} onClick={this.showModal('modal')}>{this.props.username?this.props.username:'请输入姓名'}</p>}>
                        姓名
                    </Item>
                    {/*判断手机号码是否存在*/}
                    <Item arrow="horizontal" multipleLine extra={<p className='am-list-extra' onClick={()=>this.props.history.push('/phoneauth')}>
                        {this.props.tel===null?<p style={{textAlign:'right'}}>绑定手机号</p>:<p style={{textAlign:'right'}}>
                                {this.props.tel}
                            </p>}
                        </p>}
                    >
                        手机号
                    </Item>
                    {/*病人出生日期*/}
                    {!this.props.isDoctor?<DatePicker
                        mode="date"
                        title="选择日期"
                        extra={this.props.starttime?this.props.starttime.substr(0,10):null}
                        minDate={new Date(Date.now()-3.15576e12)}
                        maxDate={new Date()}
                        value={this.state.bornDate?new Date(this.state.bornDate):null}
                        onChange={date => {
                            this.setState({ bornDate:date })
                            DoctorPerfectmaterial({starttime:date}).then(res=>{
                                console.log(res)
                            })
                        }}
                    >
                        <Item arrow="horizontal">出生日期</Item>
                    </DatePicker>:null}
                </List>
                <WhiteSpace/>
                <List className="my-list">
                    <Item multipleLine extra={this.props.id}>
                        毕臻ID
                    </Item>
                </List>
                <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onClose('modal')}
                    animationType="slide-up"
                >
                    <List renderHeader={() => <div>修改姓名</div>} className="popup-list">
                        <WingBlank>
                            <div style={{paddingBottom:'.5rem',paddingTop:'.1rem'}}>
                                <InputItem placeholder="请输入姓名" className='perd-input' onBlur={this.onNameBlur}/>
                                <WhiteSpace/>
                                <Button style={{border:'1PX solid rgb(202,45,66)',color:'rgb(202,45,66)'}} onClick={this.postNameButton}>提交</Button>
                            </div>
                        </WingBlank>
                    </List>
                </Modal>
            </div>
        )
    }
}
export default PersonData