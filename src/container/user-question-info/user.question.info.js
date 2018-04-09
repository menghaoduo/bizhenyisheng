import React from 'react'
import {List,WhiteSpace,WingBlank,Button,Toast} from 'antd-mobile'
import KsDoctorOne from '../../component/keshi.doctor.one/keshi.doctor.one'
import {httpGet} from "../../config";
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
@connect(
    state=>state.user
)
@withRouter
class UserQuestionInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            doctorData:{},
            imgurl:[],
            order:{},
            order2:{},
            order3:{},
            imgurl2:[],
            imgurl3:[],
            toId:0,
            questionNum:2,
        }
    }
    componentDidMount(){
        const data = JSON.parse(this.props.match.params.id)
        httpGet('/User/lookDoctorDetailt?id='+data.doctorid).then(res=>{
            this.setState({
                doctorData:res.data.data
            })
        })
        httpGet('/Qa/getOrderById?code='+data.id).then(res=>{
            console.log('order',res)
            this.setState({
                order:res.data.data,
                toId:res.data.data.id
            })
            if(res.data.data.imgurl!==null){
                this.setState({
                    imgurl:res.data.data.imgurl.substring(0,res.data.data.imgurl.length-1).split(','),
                })
            }
            if(res.data.other.length){
                httpGet('/Qa/getOrderById?code='+res.data.other[0].id).then(re=>{
                    console.log('order2',re)
                    this.setState({
                        order2:re.data.data,
                        toId:re.data.data.id,
                        questionNum:1
                    })
                    if(re.data.data.imgurl!==null){
                        this.setState({
                            imgurl2:re.data.data.imgurl.substring(0,re.data.data.imgurl.length-1).split(','),
                        })
                    }
                    if(re.data.other.length){
                        httpGet('/Qa/getOrderById?code='+re.data.other[0].id).then(r=>{
                            console.log('order2',r)
                            this.setState({
                                order3:r.data.data,
                                questionNum:0
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
    render(){
        const {order,order2,order3}=this.state
        const Item = List.Item
        return (
            <div>
                <Item>
                    <div className='wen-title2'>等待回答</div>
                    <div className='wen-title' style={{textAlign:'right'}}>
                        <span style={{color:'#d55768'}}>¥{order.paymoney} </span>
                        {order.share?'公开问题':'私密问题'}
                    </div>
                </Item>
                <WhiteSpace/>
                {/*向医生组件传输医生信息*/}
                {this.state.doctorData==={}?null:<KsDoctorOne data={this.state.doctorData}/>}
                <List renderHeader={<div>第一次提问</div>}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.props.header} alt=""/>
                                {this.props.username}
                            </div>
                        </div>
                        <p>{order.problem}</p>
                        <div className='detail-info'>
                            {this.state.imgurl.map((v,i)=>(
                                <img key={i} src={`http://oi9l7yhwo.bkt.clouddn.com/${v}`} alt=""/>
                            ))}
                        </div>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order.addtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>
                {/*订单状态为4 医生回答*/}
                {order.state===4?<List renderHeader={() => '医生回答'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.state.doctorData.header} alt=""/>
                                {this.state.doctorData.username}
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
                                <img src={this.props.header} alt=""/>
                                {this.props.name}
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
                                <img src={this.state.doctorData.header} alt=""/>
                                {this.state.doctorData.username}
                            </div>
                        </div>
                        <p>
                            {order2.answertxt}
                        </p>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order2.endtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order3.problem?<List renderHeader={() => '第 3 次提问'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.props.header} alt=""/>
                                {this.props.name}
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
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order3.addtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                {order3.answertxt?<List renderHeader={() => '医生回答'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <div className='answer-info'>
                            <div className='answer-info-avatar'>
                                <img src={this.state.doctorData.header} alt=""/>
                                {this.state.doctorData.username}
                            </div>
                        </div>
                        <p>
                            {order3.answertxt}
                        </p>
                        <span style={{color:'#ccc',fontSize:'.12rem'}}>{order3.endtime}</span>
                    </WingBlank>
                    <WhiteSpace/>
                </List>:null}
                <WhiteSpace/>
                <List>
                    <WingBlank>
                        <WhiteSpace/>
                        {order.state===4?<div>本次咨询将在<strong style={{color:'#ff9800'}}> {order.hour<=0?0:order.hour} </strong>小时之后自动结束。{order.hour<=0?null:<div>您还可免费追问<strong style={{color:'#ff9800'}}> {this.state.questionNum} </strong>次</div>}</div>:
                            null}
                        <WhiteSpace/>
                    </WingBlank>
                </List>
                {/*状态4  还可以追问2次*/}
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
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>等待回答</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order2.answertxt?<WingBlank>
                    <WhiteSpace size='lg'/>
                    {/*追问*/}
                    <Button type="primary" onClick={()=>{
                        if(order.answertxt===null){
                            Toast.info('医生还没有接单')
                            return
                        }
                        if(order2.answertxt===null&&order3.answertxt===null){
                            Toast.info('医生还没有回答您的追问')
                            return
                        }
                        if(!this.state.questionNum){
                            Toast.info('您的追问次数已达上线')
                            return
                        }
                        this.props.history.push('/userquestionclosely/'+this.state.toId)
                    }}>补充提问（剩余{this.state.questionNum}次）</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:order2.problem?<WingBlank>
                    <WhiteSpace size='lg'/>
                    <Button type="primary" style={{backgroundColor:'lightgray'}}>等待回答</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>:<WingBlank>
                    <WhiteSpace size='lg'/>
                    {/*追问*/}
                    <Button type="primary" onClick={()=>{
                        if(order.answertxt===null){
                            Toast.info('医生还没有接单')
                            return
                        }
                        if(order2.answertxt===null&&order3.answertxt===null){
                            Toast.info('医生还没有回答您的追问')
                            return
                        }
                        if(!this.state.questionNum){
                            Toast.info('您的追问次数已达上线')
                            return
                        }
                        this.props.history.push('/userquestionclosely/'+this.state.toId)
                    }}>补充提问（剩余{this.state.questionNum}次）</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>}
            </div>
        )
    }
}
export default UserQuestionInfo