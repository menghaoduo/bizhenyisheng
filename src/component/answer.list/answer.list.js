import React from 'react'
import {List,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import './answer.list.css'
import {withRouter} from 'react-router-dom'
@connect(
    state=>({user:state.user})
)
@withRouter
class AnswerLsit extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            data: null
        }
    }
    componentWillReceiveProps(ss){
        if(JSON.stringify(ss.data)!== '{}'){
            this.setState({
                data:ss.data
            })
        }
    }
    render(){
        const Item = List.Item
        return (
            <List>
                {this.state.data?this.state.data.list.map((v,i)=>{
                    return v.state===5?null:<div key={i} style={{width:'100%'}}>
                        <Item
                            arrow="horizontal"
                            multipleLine
                            activeStyle={false}
                            onClick={() => {
                                if(!v.state){
                                    this.props.history.push('/dcpay/'+JSON.stringify({id:v.id}))
                                }else {
                                    if(this.props.user.isDoctor){
                                        this.props.history.push('/doctoranswerinfo/'+JSON.stringify({id:v.id,userid:v.userid}))
                                    }else {
                                        this.props.history.push('/userquestioninfo/'+JSON.stringify({id:v.id,doctorid:v.doctorid}))
                                    }
                                }
                            }
                            }
                        >
                            <div className='question-header'>
                                <div className='question-header-avatar'>
                                    <img src={v.header} alt=""/>
                                    {v.name}
                                </div>
                                <div className='question-header-staus' style={{textAlign:'right'}}>
                                    {v.state===1?<span>待回答</span>:null}
                                    {v.state===4?<span>进行中</span>:null}
                                    {v.state===0?<span>待支付</span>:null}
                                    {v.state===3?<span>已结束</span>:null}|
                                    {v.typeid===1?<span>点名咨询</span>:null}
                                    {v.typeid===2?<span>快速咨询</span>:null}
                                    {v.typeid===2?<span>诊后咨询</span>:null}</div>
                            </div>
                            <WhiteSpace/>
                            {this.props.user.isDoctor?
                                <div className='question-list'>
                                    <div className='question-list-info' style={{minHeight:'.83rem',height:'.83rem'}}>
                                        <div className='question-list-info-word'>
                                            <span>患者问：</span>{v.problem}
                                        </div>
                                        <div className='question-list-info-money'>
                                            <span style={{marginRight:'0'}}/>
                                            <span>剩余时间：{v.time} | {v.share?'公开问题':'私密问题'}</span>
                                        </div>
                                    </div>
                                </div> :
                                <div className='question-list' style={{minHeight:'.63rem',height:'.63rem'}}>
                                    <div className='question-list-info' style={{marginLeft:0}}>
                                        <div className='question-list-info-word'>
                                            {v.problem}
                                        </div>
                                    </div>
                                </div>}
                        </Item>
                        <WhiteSpace style={{backgroundColor:'rgb(245, 245, 249)'}}/>
                    </div>
                }):null}
            </List>
        )
    }
}

export default AnswerLsit