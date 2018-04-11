import React from 'react'
import {List,ImagePicker,WhiteSpace,WingBlank,Button,Toast} from 'antd-mobile'
import {UploadAuthentication} from "../../api/api"
import lrz from 'lrz'
import {connect} from 'react-redux'
@connect(state=>state.user)
class BecomeDoctor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            files:[], //执业医师证书
            files2:[],//身份证正反面或驾驶证
            files3:[],//其他证明材料
            files4:[],//医师资格证
            files5:[],//职称等级
            imgArr:[],//执业医师证书
            imgArr2:[],//身份证正反面或驾驶证
            imgArr3:[],//其他证明材料
            imgArr4:[],//医师资格证
            imgArr5:[],//职称等级
        }
    }
    //上传执业医师证书
    onChange = (files) => {
        this.setState({
            files,
            imgArr:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url, {quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr.push(`${rst.base64}@certi1`)
                    })
            })
        })
    }
    //上传身份证正面
    onChange2 = (files) => {
        this.setState({
            files2:files,
            imgArr2:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url, {quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr2.push(`${rst.base64}@cardfront`)
                    })
            })
        });
    }
    //上传身份证反面
    onChange3 = (files) => {
        this.setState({
            files3:files,
            imgArr3:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url, {quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr3.push(`${rst.base64}@cardreverse`)
                    })
            })
        });
    }
    //上传医师资格证
    onChange4 = (files) => {
        this.setState({
            files4:files,
            imgArr4:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url, {quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr4.push(`${rst.base64}@certi2`)
                    })
            })
        })
    }
    //上传职称等级
    onChange5 = (files) => {
        this.setState({
            files5:files,
            imgArr5:[]
        },()=>{
            files.map((v,i)=>{
                return lrz(files[i].url, {quality:0.3})
                    .then((rst)=>{
                        // 处理成功会执行
                        this.state.imgArr5.push(`${rst.base64}@certi3`)
                    })
            })
        })
    }
    //提交数据，按钮
    onPostData= ()=>{
        if(!this.state.imgArr.length){
            Toast.info('请上传执业医师证书！');
            return null
        }
        if(!this.state.imgArr4.length){
            Toast.info('请上传医师资格证书！');
            return null
        }
        if(!this.state.imgArr5.length){
            Toast.info('请上传职称等级证书！');
            return null
        }
        if(!this.state.imgArr2.length&&!this.state.imgArr2.length){
            Toast.info('请至少上传身份证正反面或驾驶证及其他身份证明材料一种！');
            return null
        }
        //图片组合在一起
        this.state.imgArr = this.state.imgArr.concat(this.state.imgArr2,this.state.imgArr3,this.state.imgArr4,this.state.imgArr5)
        UploadAuthentication(JSON.parse(this.props.match.params.data),{imgStr:Array.from(new Set(this.state.imgArr))}).then((res)=>{
            if (res.data.code===200){
                this.props.history.push('/user-myself')
            }
        })
    }
    render(){
        const Item= List.Item;
        return (
            <div>
                <List renderHeader={() => '上传证明材料，每个种类最多可以上传4张'}>
                    <Item  extra={this.state.label}>上传资料</Item>
                    {/*执业资格证书*/}
                    <p style={{margin:'0',color: '#888',paddingTop:'9px',paddingLeft:'.15rem'}}>上传执业资格证书</p>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        multiple
                        selectable={this.state.files.length < 4}
                    />
                    {/*医师资格证书*/}
                    <p style={{margin:'0',color: '#888',paddingTop:'9px',paddingLeft:'.15rem'}}>上传医师资格证书</p>
                    <ImagePicker
                        files={this.state.files4}
                        onChange={this.onChange4}
                        multiple
                        selectable={this.state.files4.length < 4}
                    />
                    {/*职称等级证书*/}
                    <p style={{margin:'0',color: '#888',paddingTop:'9px',paddingLeft:'.15rem'}}>上传职称等级证书</p>
                    <ImagePicker
                        files={this.state.files5}
                        multiple
                        onChange={this.onChange5}
                        selectable={this.state.files5.length < 4}
                    />
                    {/*身份证正反面或驾驶证*/}
                    <p style={{margin:'0',color: '#888',paddingLeft:'.15rem'}}>上传身份证正反面或驾驶证</p>
                    <ImagePicker
                        files={this.state.files2}
                        multiple
                        onChange={this.onChange2}
                        selectable={this.state.files2.length < 4}
                    />
                    {/*其他证明材料*/}
                    <p style={{margin:'0',color: '#888',paddingLeft:'.15rem'}}>上传其他身份证明材料</p>
                    <ImagePicker
                        files={this.state.files3}
                        multiple
                        onChange={this.onChange3}
                        selectable={this.state.files3.length < 4}
                    />
                </List>
                <WingBlank>
                    <p>
                        以上信息仅用于医生认证，毕臻医生将为您严格保密，认证成功后仅显示身份与科室信息，请放心填写。请勿遮挡证件号码。
                    </p>
                    <Button type="primary" style={{border:'0PX'}} onClick={this.onPostData}>提交</Button>
                    <WhiteSpace />
                    <Button onClick={this.props.history.goBack} style={{border:'0PX'}}>返回</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}
export default BecomeDoctor