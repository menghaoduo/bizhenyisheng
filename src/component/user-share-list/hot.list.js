import React from 'react'
import {List} from 'antd-mobile'
import './wenti.list.css'
import avatar from './avatar.png'
import {connect} from 'react-redux'
@connect(
    state=>({user:state.user})
)
class WtList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        const gongxiang = [{key:1,money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'},
            {key:2,money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'}]
        if(this.props.header){
            //共享问题 keshi.doctor.home
            this.setState({data:gongxiang})}
    }
    render(){
        const Item = List.Item;
        return (
            <div>
                <List>
                    {this.state.data.map(v=>(
                        <Item
                            arrow="horizontal"
                            multipleLine
                            key={v.key}
                            activeStyle={false}
                            onClick={() => {}}
                        >
                            <div className='question-list'>
                                {v.icon?<div className='question-list-avatar'>
                                    <img src={avatar} alt="avatar"/>
                                    <div>{v.name}</div>
                                </div>:null}
                                {v.people?<div className='question-list-info'>
                                    <div className='question-list-info-word'>
                                        <span>患者问：</span>{v.sentence}
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥{v.money}</span>
                                        <span>{v.people}人看过</span>
                                    </div>
                                </div>:null}
                                {v.time?<div className='question-list-info' style={{marginLeft:0}}>
                                    <div className='question-list-info-word'>
                                        <span>患者问：</span>{v.sentence}
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥{v.money}</span>
                                        <span>剩余时间：{v.time}</span>
                                    </div>
                                </div>:null}
                            </div>
                        </Item>
                    ))}
                </List>
            </div>
        )
    }
}

export default WtList