import React from 'react'
import {List} from  'antd-mobile'
import Star from '../user.star/user.star'
import {withRouter} from 'react-router-dom'
import {httpGet} from '../../config'
import {connect} from 'react-redux'
@connect(
    state=>state.user
)
@withRouter
class KsDoctorOne extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null
        }
    }
    componentWillReceiveProps(ss){
        //医生看到的是没有头像
        if(JSON.stringify(ss.data)!== '{}'){
            console.log(ss)
            this.setState({
                data:ss.data
            })
        }
    }
    render(){
        const data = this.state.data
        const Item = List.Item;
        return (
            <List>
                {this.state.data?<Item
                    multipleLine
                    activeStyle={false}
                    className='doctor-info'
                >
                    <div className='question-list'>
                        <div className='question-list-avatar'>
                            <img src={data.header} alt="avatar"/>
                            <div className='score'>
                                <strong>5</strong>分
                                {/*星星组件*/}
                                <Star/>
                            </div>
                        </div>
                        <div className='question-list-info'>
                            <div className='doctor-inner'>
                                <div className='doctor-text doctor-name'>
                                    <strong>{data.username?data.username:data.name}</strong>
                                    <span className='doctor-level'>{data.departmentname} {data.job}</span>
                                    <em>同城</em>
                                </div>
                                <div className='doctor-text'>
                                    {data.hospitalname}
                                </div>
                                <div className='doctor-text tag'>
                                    <span>{`从业${data.year}年`}</span>
                                </div>
                                <div className="doctor-text dc-expert">
                                    擅长：{data.expertise}
                                </div>
                            </div>
                            <div className='question-list-info-money'>
                                <span>¥{data.money}</span>
                                <span>{data.ordernum}个咨询</span>
                            </div>
                        </div>
                    </div>
                </Item>:null}
            </List>
        )
    }
}

export default KsDoctorOne