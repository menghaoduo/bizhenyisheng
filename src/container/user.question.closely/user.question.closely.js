import React from 'react'
import {TextareaItem,List,WhiteSpace,ImagePicker,Button,WingBlank,Toast} from 'antd-mobile'
import {httpGet,httpPost} from "../../config";
import {withRouter} from 'react-router-dom'
import lrz from 'lrz'
@withRouter
class UserQuestionClosely extends React.Component{
    constructor(props){
        super(props)
        this.state={
            order:{},
            files:[],
            imgArr:[],
            problemContent:''
        }
    }
    //图片
    onChange = (files, type, index) => {
        this.setState({
            files,
            imgArr:[]
        },()=>{
            files.map((v,i)=>{
                lrz(files[i].url,{quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr.push(rst.base64)
                    })
            })
        });
    }
    componentDidMount(){
        httpGet('/Qa/getOrderById?code='+this.props.match.params.data).then(res=>{
            console.log(res.data.data)
            this.setState({
                order:res.data.data
            })
        })
    }
    onHandlePost=()=>{
        if(!this.state.problemContent){
            Toast.info('请填写追问信息！')
            return null
        }
        const {order} = this.state
        const data = {typeid:order.typeid,doctorid:order.doctorid,problem:this.state.problemContent,is_urgent:order.is_urgent,askid:order.id,money:order.paymoney}
        httpPost('/Qa/addProblem',data,{imgurl:Array.from(new Set(this.state.imgArr))}).then(res=>{
            console.log(res)
            if (res.data.code===200){
                this.props.history.goBack()
            }
            if(res.data.code!==200){
                Toast.info(res.data.msg,2,()=>this.props.history.goBack())
            }
        })
    }
    render(){
        return(
            <div>
                <List renderHeader={<div>
                    <WhiteSpace/>
                    <div>继续向王医生提问（描述症状、部位、持续时间等）</div>
                </div>}>
                    <WhiteSpace/>
                    <TextareaItem
                        placeholder='补充更多症状描述便于医生参考。'
                        rows={10}
                        count={500}
                        onBlur={(s)=>{this.setState({
                            problemContent:s
                        })}}
                    />
                </List>
                <List renderHeader={() => '如果有补充的照片，请上传，最多6张。'}>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        multiple
                        selectable={this.state.files.length < 6}
                        onImageClick={(index, fs) => console.log(index, fs)}
                    />
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button inline style={{width:'45%'}} onClick={()=>this.props.history.goBack()}>取消</Button>
                    <span style={{width:'10%',display:'inline-block'}}/>
                    <Button inline type='primary' style={{width:'45%'}} onClick={this.onHandlePost}>提交</Button>
                </WingBlank>
            </div>
        )
    }
}
export default UserQuestionClosely