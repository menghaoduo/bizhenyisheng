import React from 'react'
import {List} from  'antd-mobile'
import './keshi.doctor.list.css'
import Star from '../star/user.star'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@connect(
    state=>state.entrance
)
@withRouter
class KsSearchDoctor extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:null,
        }
    }
    render(){
        const Item = List.Item;
        return (
            <div>
                {this.state.data?this.state.data.length?<List>
                    {this.state.data.map(v=>{
                        return <Item
                            key={v.header}
                            multipleLine
                            activeStyle={false}
                            className='doctor-info'
                            onClick={() =>{
                                //如果是快速咨询，不能点击
                                if(this.props.fast){
                                    return null
                                }
                                // 传过去这个数据的位置
                                this.props.history.push('/keshidoctorhome/'+JSON.stringify({id:v.id}))
                            }}
                        >
                            <div className='question-list'>
                                <div className='question-list-avatar'>
                                    <img src={v.header} alt="avatar"/>
                                    <div className='score'>
                                        <strong>5</strong>分
                                        {/*星星组件*/}
                                        <Star/>
                                    </div>
                                </div>
                                <div className='question-list-info'>
                                    <div className='doctor-inner'>
                                        <div className='doctor-text doctor-name'>
                                            <strong>{v.username?v.username:v.name}</strong>
                                            <span className='doctor-level'>{v.departmentname} {v.job}</span>
                                            <em>同城</em>
                                        </div>
                                        <div className='doctor-text'>
                                            {v.hospitalname}
                                        </div>
                                        <div className='doctor-text tag'>
                                            <span>{v.starttime?`从业${new Date().getFullYear()-v.starttime.substr(0,4)}年`:null}</span>
                                        </div>
                                        <div className="doctor-text dc-expert">
                                            擅长：{v.expertise}
                                        </div>
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥{v.money}</span>
                                        <span>{v.daynum}个咨询</span>
                                        <span>咨询余额{v.num-v.daynum}个</span>
                                    </div>
                                </div>
                            </div>
                        </Item>
                    })}
                </List>:<div style={{padding:'.1rem',textAlign:'center'}}>该科室暂时还没有入驻医生</div>:null}
            </div>
        )
    }
    componentWillReceiveProps(nextprops){
        this.setState({
            data:nextprops.data
        })
    }
}

export default KsSearchDoctor