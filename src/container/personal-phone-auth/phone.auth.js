import React from 'react'
import {List,InputItem,Toast,Button,WingBlank,WhiteSpace} from 'antd-mobile'
import {DoctorPerfectmaterial} from "../../api/api"
import './phone.auth.css'
import {withRouter} from 'react-router-dom'
@withRouter
class PhoneAuth extends React.Component{
    constructor(props){
        super(props)
        this.state={
            hasError: false,
            value: '',
        }
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确手机号码');
        }
    }
    //setState电话号码
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }
    onHandlePost=()=>{
        if (this.state.hasError) {
            Toast.info('请输入正确手机号码');
            return
        }
        DoctorPerfectmaterial({tel:this.state.value}).then(res=>{
            if(res.data.code ===200){
                this.props.history.push('/personaldata')
            }
        })
    }
    render(){
        return (
            <div>
                <List>
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号码"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                    >手机号码</InputItem>
                    <InputItem
                        className='phone-auth'
                        type='money'
                        placeholder={<p>845943</p>}
                        clear
                        moneyKeyboardAlign="left"
                        extra="发送验证码"
                    >输入验证码</InputItem>
                </List>
                <WhiteSpace/>
                <WingBlank>
                    <Button type='primary' onClick={this.onHandlePost}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default PhoneAuth