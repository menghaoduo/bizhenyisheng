import React from 'react'
import {List,WhiteSpace,WingBlank,TextareaItem,Checkbox,Button,Toast} from 'antd-mobile'
import './dc.answer.info.css'
import {httpGet,httpPost} from "../../config";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
@connect(
    state =>state.user
)
@withRouter
class DcAnswerInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            order:{},
            order2:{},
            order3:{},
            other:null,
            imgurl:[],
            imgurl2:[],
            imgurl3:[],
            problemContent:'',
            money:0,
            toId:JSON.parse(this.props.match.params.id)
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        const data = JSON.parse(this.props.match.params.id)
        httpGet('/User/getUserInfoById?id='+data.userid).then(res=>{
            this.setState({
                user:res.data.data
            })
        })
        httpGet('/Qa/getOrderById?code='+data.id).then(res=>{
            console.log(res)
            this.setState({
                order:res.data.data,
                money:res.data.data.paymoney,
                toId:data.id
            })
            if(res.data.data.imgurl!==null){
                this.setState({
                    imgurl:res.data.data.imgurl.substring(0,res.data.data.imgurl.length-1).split(','),
                })
            }
            if(res.data.other.length){
                httpGet('/Qa/getOrderById?code='+res.data.other[0].id).then(re=>{
                    console.log('order2')
                    this.setState({
                        order2:re.data.data,
                        toId:re.data.data.id
                    })
                    if(re.data.data.imgurl!==null){
                        this.setState({
                            imgurl2:re.data.data.imgurl.substring(0,re.data.data.imgurl.length-1).split(','),
                        })
                    }
                    if(re.data.other.length){
                        httpGet('/Qa/getOrderById?code='+re.data.other[0].id).then(r=>{
                            console.log('order3')
                            this.setState({
                                order3:r.data.data,
                                toId:r.data.data.id
                            })
                            if(r.data.data.imgurl!==null){
                                this.setState({
                                    imgurl3:r.data.data.imgurl.substring(0,r.data.data.imgurl.length-1).split(','),
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    //标记选框函数
    onChange = val => {
        console.log(val);
    }
    //回答问题post
    handleClick(){
        httpPost('/Qa/Answer',{id:this.state.toId,content:this.state.problemContent}).then(res=>{
            console.log(res.data)
            if(res.data.code===200){
                this.props.history.goBack()
            }
        })
    }
    render(){
        const user= this.state.user
        const {order,order2,order3} = this.state
        const Item = List.Item
        const AgreeItem = Checkbox.AgreeItem;
        return (
            <div>
                <Item>
                    <div className='wen-title2'>等待回答</div>
                    <div className='wen-title' style={{textAlign:'right'}}>
                        <span style={{color:'#d55768'}}>¥{order.paymoney} </span>
                        {order.typeid===1?<span>点名咨询</span>:null}
                        {order.typeid===2?<span>快速咨询</span>:null}
                        {order.typeid===3?<span>共享咨询</span>:null}
                        {order.share?' 公开问题':' 私密问题'}
                    </div>
                </Item>
                <WhiteSpace/>
                <List>
                    <Item multipleLine>
                        提问者：王喵喵的历史评分 <span style={{color:'#F1BB38'}}>4.5评分 <i className='ion-ios-arrow-down '/></span>
                    </Item>
                    <Item multipleLine>
                        王喵喵咨询过类似问题：3次
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        王喵喵咨询过我的问题：3
                    </Item>
                    <Item arrow="horizontal" multipleLine onClick={() => {}}>
                        查看咨询主体的健康档案
                    </Item>
                </List>
                <List renderHeader={() => '第 1 次提问'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={user.header} alt=""/>
                                {user.name}
                            </div>
                        </div>
                        <p>
                            {order.problem}
                        </p>
                        <div className='detail-info'>
                            {this.state.imgurl===null?null:this.state.imgurl.map((v,i)=>(
                                <img key={i} src={`http://oi9l7yhwo.bkt.clouddn.com/${v}`} alt=""/>
                            ))}
                        </div>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order.addtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>
                {order.state===4?<List renderHeader={() => '医生回答'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.props.header} alt=""/>
                                {this.props.username}
                            </div>
                        </div>
                        <p>
                            {order.answertxt}
                        </p>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order.endtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order2.problem?<List renderHeader={() => '第 2 次提问'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={user.header} alt=""/>
                                {user.name}
                            </div>
                        </div>
                        <p>
                            {order2.problem}
                        </p>
                        <div className='detail-info'>
                            {this.state.imgurl2===null?null:this.state.imgurl2.map((v,i)=>(
                                <img key={i} src={`http://oi9l7yhwo.bkt.clouddn.com/${v}`} alt=""/>
                            ))}
                        </div>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order2.addtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order2.answertxt?<List renderHeader={() => '医生回答'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.props.header} alt=""/>
                                {this.props.username}
                            </div>
                        </div>
                        <p>
                            {order2.answertxt}
                        </p>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order2.endtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order3.problem?<List renderHeader={() => '第 2 次提问'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={user.header} alt=""/>
                                {user.name}
                            </div>
                        </div>
                        <p>
                            {order3.problem}
                        </p>
                        <div className='detail-info'>
                            {this.state.imgurl3===null?null:this.state.imgurl3.map((v,i)=>(
                                <img key={i} src={`http://oi9l7yhwo.bkt.clouddn.com/${v}`} alt=""/>
                            ))}
                        </div>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order2.addtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order3.answertxt?<List renderHeader={() => '医生回答'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.props.header} alt=""/>
                                {this.props.username}
                            </div>
                        </div>
                        <p>
                            {order3.answertxt}
                        </p>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order3.endtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {/*医生回答问题输入框*/}
                {order.answertxt===null||order2.answertxt===null||order3.answertxt===null? <List renderHeader={<div>
                    <WhiteSpace/>
                    <div>本次点名咨询将在<strong style={{color:'#ff9800'}}> {order.hour<=0?0:order.hour} </strong>小时之后自动结束。</div>
                    <div>如何回答<i className='ion-ios-help-outline' style={{fontSize:'.12rem'}}/></div>
                    <WhiteSpace/>
                </div>}>
                    <WhiteSpace/>
                    <Item arrow="horizontal" multipleLine extra='查询历史回复 ' onClick={() => {}}>
                        <div style={{visibility:'hidden'}}>s</div>
                    </Item>
                    <TextareaItem
                        placeholder='输入你的回答'
                        rows={10}
                        count={500}
                        onBlur={(s)=>{this.setState({
                            problemContent:s
                        })}}
                    />
                    <WingBlank>
                        <AgreeItem data-seed="logId" onChange={e => console.log('checkbox', e)} style={{display:'inline-block',color:'#bbb'}}>
                            ★标记这条回答
                        </AgreeItem>
                        <span> 如何使用？</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order.hour<=0?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>问答结束</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order.state!==4?null:order3.answertxt?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>问答结束</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order3.problem?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" onClick={()=>{
                        if(this.state.problemContent){
                            this.handleClick()
                        }else {
                            Toast.info('请先回答问题！')
                        }
                    }}>提交回答</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order2.answertxt?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>等待提问</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order2.problem?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" onClick={()=>{
                        if(this.state.problemContent){
                            this.handleClick()
                        }else {
                            Toast.info('请先回答问题！')
                        }
                    }}>提交回答</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>等待提问</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>}
                {/*提交按钮订单状态为4 进行中状态显示*/}
                {/*订单状态为1 待接单状态显示*/}
                {order.state===1?<WingBlank>
                    <WhiteSpace size='lg'/>
                    {/*提交*/}
                    <Button type="primary" onClick={this.handleClick}>回答并领取 ¥{this.state.money}</Button>
                    <WhiteSpace/>
                    <Button>退回</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:null}
            </div>
        )
    }
}
export default DcAnswerInfo