import React from 'react'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import AllSelect from '../../component/type.select/all.select'
import KsSearchDoctor from '../../component/keshi.doctor.list/keshi.doctor.list'
import Sharelist from '../../component/share.list/share.list'
import { List,WhiteSpace ,Modal} from 'antd-mobile'
import { lookProblemHelpF } from '../../redux/user.help.redux'
import { connect } from 'react-redux'
import {httpGet} from "../../config";
@connect(
    state=>({help:state.help,entrance:state.entrance,user:state.user}),
    { lookProblemHelpF }
)
class KeshiType extends React.Component{
    constructor(props){
        super(props)
        this.state={
            keshi:null,
            code:0,
            num:0,
            data:null,
            max:0
        }
    }
    componentDidMount(){
        const transfer = JSON.parse(this.props.match.params.data)
        this.setState({
            keshi:transfer.name,
            code:transfer.code
        })
        httpGet('/doctorSearch?code='+transfer.code).then(res=>{
            this.setState({
                num:res.data.data.totalRow,
                data:res.data.data.list,
                max:res.data.other
            })
        })
    //科室code
    }
    render(){
        const Item = List.Item;
        const alert = Modal.alert;
        //传到Drawer中的数据
        const getDoctorList ={
            title:'如何选择',
            type1:'',
            type1Info:['1、使用页面顶端的筛选功能，可控制入选医生人数而便于选择心仪的医生。','2、暂停期间不推送咨询信息，医生回复时间延后。','3、停止期间不提供咨询，可前往医生主页进行关注，等待恢复咨询通知。'],
            type2:'',
            type2Info:[],
            type3:'',
            type3Info:[],
            type4:'',
            qq:'',
            weixin:'',
            email:'',
            phonenumber:''
        }
        return (
            <div>
                <List className="my-list">
                    <Item>
                        {this.props.entrance.fast?<div className='wen-title'>已筛选出{this.state.num}位医生</div>:<div className='wen-title'>{this.state.keshi}</div>}
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}} onClick={this.props.lookProblemHelpF}>如何选择<span className='ion-ios-help-outline'/></div>
                    </Item>
                </List>
                <AllSelect/>
                <WhiteSpace/>
                {/*判断是不是分享咨询*/}
                {this.props.entrance.share?<Sharelist data={{ss:'ss'}}/>:<KsSearchDoctor data={this.state.data}/>}
                {/*判断是不是快速咨询*/}
                {this.props.entrance.fast?<nav className='tabbar-bottom'>
                    <div className='tabbar-item ask-dm' onClick={()=>{
                        if(this.props.user.tel===null)
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
                            this.props.history.push('/fastdc/'+JSON.stringify({max:this.state.max,code:this.state.code}))
                    }}>
                        <span className='tabbar-item-label'>向{this.state.num}位医生发布快速咨询</span>
                    </div>
                </nav>:null}
                {this.props.help.lookProblem?<DrawerHelp helpList={getDoctorList}/>:null}
            </div>
        )
    }
}

export default KeshiType