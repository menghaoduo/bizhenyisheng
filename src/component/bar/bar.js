import React from 'react'
import './bar.css'
import {withRouter} from 'react-router-dom'
@withRouter
class Bar extends React.Component{
    render(){
        return(
            <nav className='tabbar-bottom'>
                <div className='tabbar-item ask-dm' onClick={()=>{this.props.history.push('/dccall')}}>
                    <span className='tabbar-item-label'>点名咨询 ¥30</span>
                </div>
                <div className='tabbar-item ask-zh' onClick={()=>{this.props.history.push('/dczhenhou')}}>
                    <span className='tabbar-item-label'>院后诊后咨询</span>
                </div>
            </nav>
        )
    }
}
export default Bar