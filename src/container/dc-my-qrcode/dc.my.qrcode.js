import React from 'react'
import {connect} from 'react-redux'
import './dc.my.qrcode.css'
@connect(
    state=>({user:state.user})
)
class DcMyQrcode extends React.Component{
    render(){
        return (
            <div className='page'>
                <div className='qrcode-wrap'>
                    <div className='qrcode-c'>
                        <div className='my-info'>
                            <div className='avatar-c'>
                                <img src={this.props.user.header} alt=""/>
                            </div>
                            <div>
                                <strong>{this.props.user.name}</strong>
                                <p>{this.props.user.hospitalname}</p>
                                <p>{this.props.user.departmentname}</p>
                            </div>
                        </div>
                        <div className='my-code'>
                            {this.props.user.qrcode?<img src={`https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=`+this.props.user.qrcode} alt=""/>:<p style={{textAlign:'center',paddingTop:'1.2rem'}}>请联系客服进行处理!</p>}
                        </div>
                        <p style={{textAlign:'center'}}>扫一扫上面的二维码图案<br/>

                            在毕臻健康关注我
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DcMyQrcode