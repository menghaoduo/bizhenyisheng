import React from 'react'
import {List,WhiteSpace,Button,WingBlank,Flex,Checkbox,Toast} from 'antd-mobile'
import './keshi.doctor.pay.css'
import {httpGet} from '../../config'
import {withRouter} from 'react-router-dom'
@withRouter
class KeshiDoctorPay extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            doctordata:{},
            hide:true,
            imgurl:[],
            payUrl:'',
            status:-1,
            params:this.props.match.params.data,
            agree:false,
            typeid:0
        }
    }
    componentDidMount(){
        httpGet('/Qa/getOrderById?code='+JSON.parse(this.state.params).id).then(res=>{
            console.log(res.data.data)
            //截取图片数组
            this.setState({
                data:res.data.data,
                typeid:res.data.data.typeid
            })
            if(res.data.data.imgurl!==null){
                this.setState({
                    imgurl:res.data.data.imgurl.substring(0,res.data.data.imgurl.length-1).split(',')
                })
            }
            //如果是快速咨询  typeid不等于2，就不获取医生信息
            //获取医生信息
            if(res.data.data.typeid!==2){
                httpGet('/User/lookDoctorDetailt?id='+res.data.data.doctorid).then(res=>{
                    this.setState({
                        doctordata:res.data.data
                    })
                })
            }
            if(res.data.data.state === 0){
                this.setState({
                    payUrl:`http://bzys.caa.edu.cn/Pay?code=${res.data.data.id}`,
                    status:0
                })
            }else if(res.data.data.state ===1){
                this.setState({
                    status:1
                })
                //限制 只能进入支付成功页面一次
                const isCome = JSON.parse(this.state.params)
                if(!isCome) {
                    this.props.history.push('/payresult')
                }
            }
        })
    }
    //付款点击事件
    onClickPay=()=>{
        if(JSON.parse(this.state.params).isCome){
            Toast.info('已支付完成！')
            return null
        }
        //判断是否同意服务条款
        if(!this.state.agree){
            Toast.info('请先同意服务条款！')
            return null
        }
        if(this.state.payUrl)
            window.location.href = this.state.payUrl
    }
    render(){
        const data = this.state.data
        const doctordata = this.state.doctordata
        const Item = List.Item
        const AgreeItem = Checkbox.AgreeItem;
        return (
            <div>
                {/*患者整理信息*/}
                <List className="my-list">
                    <Item>
                        <div className='wen-title' style={{color:'#d55768'}}>确认支付</div>
                        <div className='wen-title2' style={{textAlign:'right'}}>{data.share?'公开问题':'私密问题'}</div>
                    </Item>
                    <div className='detail-info'>
                        {data.problem}
                    </div>
                    {/*图片*/}
                    <div className='detail-info'>
                        {this.state.imgurl.map((v,i)=>(
                            <img key={i} src={`http://oi9l7yhwo.bkt.clouddn.com/${v}`} alt=""/>
                        ))}
                    </div>
                    {/*这里要判断是否是诊后咨询*/}
                    {data.typeid===3?<div className='detail-info'>
                        <li>患者姓名：张嬷嬷</li>
                        <li>诊疗时间：2017-01-02</li>
                        <li>门诊号：20</li>
                        <li>病床号：20</li>
                    </div>:null}
                </List>
                <WhiteSpace/>
                {/*服务详情*/}
                <List className="my-list list-type">
                    {/*不为快速咨询时被询问的医生信息*/}
                    {this.state.typeid!==2?<Item
                        multipleLine
                        activeStyle={false}
                        className='dc-call'
                    >
                        <div className='question-list'>
                            <div className='question-list-avatar'>
                                <img src={doctordata.header} alt="avatar"/>
                            </div>
                            <div className='question-list-info'>
                                <div className='doctor-inner'>
                                    <div className='doctor-text doctor-name'>
                                        <strong>{doctordata.username}</strong>
                                        <span className='doctor-level'>{doctordata.departmentname} {doctordata.job}</span>
                                    </div>
                                    <div className='doctor-text'>
                                        {doctordata.hospitalname}
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥ {doctordata.money}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Item>:null}
                    {/*判断咨询方式*/}
                    {data.typeid===1?<Item extra='点名咨询'>服务</Item>:null}
                    {data.typeid===2?<Item extra='快速咨询'>服务</Item>:null}
                    {data.typeid===3?<Item extra='诊后咨询'>服务</Item>:null}
                    <Item extra={'24小时内回复'}>回复时间</Item>
                    <Item extra={data.addtime}>订单时间</Item>
                    <Item extra={data.ordernum}>订单编号</Item>
                    <div className='total'>
                        合计：¥ {this.state.data.paymoney}
                    </div>
                    <WhiteSpace/>
                    <WingBlank>
                        {JSON.parse(this.state.params).isCome?<Button type="warning" style={{background: '#d86776'}}>支付已完成</Button>
                            :<Button type="warning" style={{background: '#d86776'}} onClick={this.onClickPay}><span>微信支付 ¥ {this.state.data.paymoney}</span></Button>}
                    </WingBlank>
                    <WhiteSpace/>
                    {/*服务条款*/}
                    {JSON.parse(this.state.params).isCome?null:<Flex style={{ padding: '.15rem'}}>
                        <Flex.Item>
                            <AgreeItem data-seed="logId" className='fuwu' onChange={(e) => this.setState({agree:e.target.checked})}>
                                我已阅读并同意
                            </AgreeItem><span style={{color:'#ff9800'}} onClick={()=>{this.setState({hide:!this.state.hide})}}> 服务条款 <i style={{color:'#ff9800'}} className='ion-ios-arrow-down'/></span>
                        </Flex.Item>
                    </Flex>}
                    {this.state.hide?null:
                        <div>
                            <div style={{ padding: '0 .15rem .15rem',color:'#999' }}><p>点击服务条款查看内容</p></div>
                            <div style={{ padding: '0 .15rem .15rem',color:'#999' }}>
                                <p>请确认以下注意事项后再进行支付：</p>
                                <p>1、并非所有问题都适合线上咨询，病情紧急、重症、复杂等情况请前往医院就诊。</p>
                                <p>2、虽然提供咨询者均为专业医生，但与正式就诊相比，受用户提供资料的影响程度较大，因此只作为健康类咨询供用户参考，而不作为诊断和治疗依据，更不能代替医生面诊，正式医疗处理仍需亲自前往医院就诊。</p>
                                <p>3、咨询有效时间为72小时，若提问超过24小时而医生没有回复，可以选择撤回咨询，也可以继续等待满72小时，此后系统将关闭该咨询。</p>
                                <p>4、等待期间病情变化者请及时前往医院就诊。</p>
                            </div>
                        </div>}
                </List>
            </div>
        )
    }
}
export default KeshiDoctorPay