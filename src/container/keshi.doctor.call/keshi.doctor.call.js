import React from 'react'
import {List,TextareaItem,ImagePicker,Checkbox,WhiteSpace,Toast} from 'antd-mobile'
import './keshi.doctor.call.css'
import {withRouter} from 'react-router-dom'
import { keshiDoctorFillHelpP } from '../../redux/user.help.redux'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import { connect } from 'react-redux'
import {httpPost} from '../../config'
import {HandleImage} from "../../until"

@connect(
    state=>(
        state.help,
        state.user
    ),
    { keshiDoctorFillHelpP }
)
@withRouter
class KeshiDoctorCall extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files:[],
            imgArr:[],
            problemContent:'',
            shareValue:true,
            share:1,
            money:JSON.parse(this.props.match.params.data).money,
            djdcid:JSON.parse(this.props.match.params.data).dcid
        }
    }
    //是否公开问题
    onChangeShare = () => {
        this.setState({
            shareValue:!this.state.shareValue
        })
        if(!this.state.shareValue){
            this.setState({
                share:0
            })
        }else {
            this.setState({
                share:1
            })
        }
    }
    //跳转传到下个页面的参数
    handleClick=()=>{
        if(!this.state.problemContent){
            Toast.info('请填写提问信息！')
            return null
        }
        httpPost('/Qa/addProblem',{problem:this.state.problemContent,is_urgent:0,doctorid:this.state.djdcid,typeid:1,share:this.state.share,money:this.state.money},{imgurl:Array.from(new Set(this.state.imgArr))}).then(res=>{
            console.log(res)
            if (res.data.code===200){
                this.props.history.push('/dcpay/'+JSON.stringify({id:res.data.data.id}))
            }
        })
    }
    render(){
        const getDoctorList ={
            title:'如何填写',
            type1:'',
            type1Info:['1、您有1次提问、2次追问机会。若需继续追问，可使用邀请亲友时获赠的免费追问机会（限3次），或续费后再追问（限1次续费，可追问3次）。',
                        '2、每次最多可上传500字、6张图片。上传前请确认图片清晰可见，且已遮盖姓名、电话、地址等隐私信息。使用“快速咨询”时，隐私部位图片请在追问中再上传，确保仅有您的咨询医生可见。',
                        '3、医生回复后24 小时内无追问将关闭该咨询。若提问后始终无医生应答，超时后也将关闭该咨询，预付费全额退还用户。',
                        '4、信息处理：“本人私密”为仅有本人可见。非隐私问题建议“共享公开”，您的头像、姓名、昵称、图片等私人信息都将被隐藏。每次共享您将获得1元酬劳。对于生活保健、疾病预防等共性问题，分享到微信群和朋友圈，还能赚取更多收益。此外，您也可以根据自身需要选择“删除咨询”，系统将在咨询结束48小时后删除本次咨询信息，且永久不可恢复。',
                        '5、提交问题后您可以补充更详细的健康档案资料，便于医生为您推荐更优方案和规避不利之处。支持随时更新。'],
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
        const Item = List.Item
        const CheckboxItem = Checkbox.CheckboxItem;
        return (
            <div>
                {this.props.keshiDoctorFill?<DrawerHelp helpList={getDoctorList}/>:null}
                {/*头部*/}
                <List className="my-list">
                    <Item>
                        <div className='wen-title'>提交问题</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}}  onClick={this.props.keshiDoctorFillHelpP}>如何填写<span className='ion-ios-help-outline' /></div>
                    </Item>
                </List>
                <WhiteSpace/>
                {/*提问内容*/}
                <List renderHeader={() => '向医生提问（描述症状、部位、持续时间等）'}>
                    <TextareaItem
                        placeholder='请详细描述本次咨询问题的发生时间、初发部位、症状、持续时间、缓解与加剧诱因、曾在什么医院就诊过、当时的诊断、如何治疗、治疗效果和转归、目前仍存在的问题和需要获取的帮助。可将您的门诊病历、出院小结、检查报告、病损照片、取药单等一并拍照上传，便于医生参考。'
                        rows={8}
                        count={500}
                        onBlur={(v)=>this.setState({problemContent:v})}
                    />
                </List>
                <WhiteSpace/>
                {/*上传照片*/}
                <List renderHeader={() => '上传症状照片、病例、检查单，限6张，仅医生可见。'}>
                    <ImagePicker
                        files={this.state.files}
                        onChange={(files)=>HandleImage(this,files,{fileStr:'files',imgStr:'imgArr',str:''})}
                        multiple
                        selectable={this.state.files.length < 6}
                        onImageClick={(index, fs) => console.log(index, fs)}
                    />
                </List>
                <WhiteSpace/>
                <List>
                    <CheckboxItem checked={this.state.shareValue} onChange={this.onChangeShare}>
                        公开问题
                    </CheckboxItem>
                </List>
                <WhiteSpace/>
                <List>
                    <div className='ask-tab'>
                        <p>医生将在 <strong>24</strong> 小时内回复你,若超过最终限定时间医生仍未回复,系统将关闭该咨询,预付费用全额退还用户。</p>
                        <div onClick={this.handleClick}>支付 ¥{this.state.money} 提问</div>
                    </div>
                </List>
            </div>
        )
    }
}
export default KeshiDoctorCall