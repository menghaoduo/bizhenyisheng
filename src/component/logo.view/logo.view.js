import React from 'react'
import './logo.view.css'
import logo from './logo.png'

class LogoView extends React.Component{
    render(){
        return (
            <div className='logo-view'>
                <img src={logo} alt=""/>
                <div className='slogan'>
                    我们只提供有价值的健康咨询
                    <br/>
                    （三甲医院中高级职称临床医生）
                </div>
            </div>
        )
    }
}

export default LogoView