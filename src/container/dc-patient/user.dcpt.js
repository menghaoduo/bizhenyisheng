import React from 'react'
import {List} from 'antd-mobile'
import './user.dcpt.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Getfollowlist,MyPatient} from "../../api/api"

@connect(
    state=>state.user
)
@withRouter
class UserDCPT extends React.Component{
    constructor(props){
        super(props)
        this.state={
            date:null
        }
    }
    componentDidMount(){
        if(this.props.isDoctor){
            MyPatient().then(res=>{
                this.setState({
                    data:res.data.data
                })
            })
        }else {
            Getfollowlist().then(res=>{
                this.setState({
                    data:res.data.data
                })
            })
        }
    }
    render(){
        const Item =List.Item
        const {data} = this.state
        return(
            <div>
                {data?this.props.isDoctor?<List renderHeader={<div>
                    我的患者 <div style={{float:'right'}}>黑名单</div>
                </div>}>
                    {data.list.map(v=>{
                        return <Item
                            arrow="horizontal"
                            multipleLine
                            activeStyle={false}
                            onClick={() => {}}
                            className='user-patient'
                            key={v.header}
                        >
                            <div className='user-patient-child'>
                                <img src={v.header} alt="avatar"/>
                            </div>
                            <div className='user-patient-child' style={{marginLeft:'10px'}}>
                                <div>
                                    {v.username}
                                </div>
                                <div className='question-list-info-money'>
                                    <span style={{marginRight:0}}/>
                                    <span>{v.sex===1?'男':'女'}</span>
                                    {/*<span style={{color:'#F1BB38'}}>4.5分</span>*/}
                                    <span style={{color:'#999'}}>向我提问 {v.ordernum}次</span>
                                </div>
                            </div>
                        </Item>
                    })}
                </List>:<List renderHeader={<div>
                    我关注的医生<div style={{float:'right'}}>黑名单</div>
                </div>}>
                    {data.list.map(v=>{
                        return <Item
                            arrow="horizontal"
                            multipleLine
                            activeStyle={false}
                            onClick={() => {
                                this.props.history.push('/keshidoctorhome/'+JSON.stringify({id:v.id}))
                            }}
                            className='user-patient'
                            key={v.header}
                        >
                            <div className='user-patient-child'>
                                <img src={v.header} alt="avatar"/>
                            </div>
                            <div className='user-patient-child' style={{marginLeft:'10px'}}>
                                <div>
                                    {v.username} <span>{v.hospitalname}</span>
                                </div>
                                <div className='question-list-info-money'>
                                    <span style={{marginRight:0}}/>
                                    <span>{v.departmentname}</span>
                                    <span style={{color:'#999'}}>{v.ordernum}个咨询</span>
                                </div>
                            </div>
                        </Item>
                    })}
                </List>:null}
            </div>
        )
    }
}
export default UserDCPT