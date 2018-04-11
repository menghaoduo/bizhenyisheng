import React from 'react'
import {Flex,WhiteSpace,Card,Modal,Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import './keshi.doctor.home.css'
import Star from '../../component/star/user.star'
import ShareList from '../../component/share.list/share.list'
import {AddFollow,LookDoctorDetailt,Afterverification} from "../../api/api"


const alert = Modal.alert;
@connect(
    state=>state.user
)
@withRouter
class KeshiDoctorHome extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:{},
            isfollow:false
        }
        this.doctorid = JSON.parse(this.props.match.params.data).id
    }
    componentDidMount(){
        LookDoctorDetailt(this.doctorid).then(res=>{
            //拿到医生的数据
            this.setState({
                data:res.data.data,
                isfollow:res.data.other.isfollow
            })
        })
    }
    //关注医生
    addfollow =()=>{
        this.setState({
            isfollow:true
        })
        AddFollow(this.doctorid).then(res=>{
            if(res.data.code===200){
                Toast.info('成功关注医生!',1)
            }
        })
    }
    render(){
        const {data} = this.state
        return (
            <div>
                <nav className='tabbar-bottom'>
                    <div className='tabbar-item ask-dm' onClick={()=>{
                        //判断是否完善电话信息
                        if(this.props.tel===null)
                            alert('毕臻医生', '请完善信息！', [
                                { text: '否', onPress: () => console.log('cancel') },
                                {
                                    text: '是',
                                    onPress: () => {
                                        //判断是否完善电话
                                        this.props.history.push('/phoneauth')
                                    },
                                },
                            ])
                        else
                            this.props.history.push('/dccall/'+JSON.stringify({money:data.money,dcid:this.doctorid}))
                    }}>
                        <span className='tabbar-item-label'>点名咨询 ¥{data.money}</span>
                    </div>
                    <div className='tabbar-item ask-zh' onClick={()=>{
                        Afterverification(this.doctorid).then(res=>{
                            if(res.data.code===200){
                                if(this.props.tel===null)
                                    alert('毕臻医生', '请完善信息！', [
                                        { text: '否', onPress: () => console.log('cancel') },
                                        {
                                            text: '是',
                                            onPress: () => {
                                                //判断是否完善电话
                                                this.props.history.push('/phoneauth')
                                            },
                                        },
                                    ])
                                else
                                    this.props.history.push('/dczhenhou/'+JSON.stringify({dcid:this.state.transfer.id}))
                            }else {
                                Toast.info("您暂不能使用诊后咨询")
                            }
                        })
                    }}>
                        <span className='tabbar-item-label'>诊后咨询</span>
                    </div>
                </nav>
                <div className='dc-home-wrap'>
                    <div className='dc-home-top'>
                        <div className='dc-avatar'>
                            <img src={data.header} className='avatar' alt="avatar"/>
                        </div>
                        <div className='dc-info'>
                            <div className='dc-name'>
                                {data.username}
                            </div>
                            <p>{data.departmentname} {data.job}</p>
                            <p>{data.hospitalname}</p>
                            <div className='dc-btn'>
                                {this.state.isfollow?<div className='follow' style={{backgroundColor:'white',color:'#78cdd4'}}>已关注</div>:<div className='follow' onClick={this.addfollow}>加关注</div>}
                                <div className='ion-ios-heart'> 送心意</div>
                            </div>
                        </div>
                    </div>
                    <Flex className='dc-home-bottom'>
                        <Flex.Item>
                            <div style={{marginBottom:'9px'}}><strong>{data.year} </strong>年</div>
                            <div>从业年限</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div style={{marginBottom:'9px'}}><strong>{data.ordernum} </strong>次</div>
                            <div>咨询次数</div>
                        </Flex.Item>
                        <Flex.Item>
                            <div style={{marginBottom:'9px',color:'#f9d065',fontWeight:'bold'}}>{data.score} 分</div>
                            <Star/>
                        </Flex.Item>
                    </Flex>
                </div>
                <WhiteSpace />
                <Card>
                    <Card.Header
                        title="个人简介"
                    />
                    <Card.Body className='dc-content'>
                        {data.introduction?<div>{data.introduction}</div>:<div>暂无简介</div>}
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <Card>
                    <Card.Header
                        title="擅长疾病"
                    />
                    <Card.Body className='dc-content-tag'>
                        {data.expertise}
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <ShareList/>
            </div>
        )
    }
}
export default KeshiDoctorHome