import React from 'react'
import {List} from 'antd-mobile'
import './wenti.list.css'
import avatar from './avatar.png'
import {connect} from 'react-redux'

@connect(
    state=>state
)
//判断用户是谁，请求的接口就不一样   患者:热点问题   医生:快速咨询
class WtList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        const huanzhe = [{key:1,icon:avatar,name:'王医生',money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'},
            {key:2,icon:avatar,name:'王医生',money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'}]
        const yisheng = [{key:1,money:20,time:24,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史，前些日子查出心脏病，要求戒烟。请问市面上的过滤烟嘴是不是真的有用？'},
            {key:2,money:20,time:24,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史，前些日子查出心脏病，要求戒烟。请问市面上的过滤烟嘴是不是真的有用？'}]
        if(this.props.user.isDoctor)
            this.setState({data:yisheng})
        else
            this.setState({data:huanzhe})
    }
    render(){
        const Item = List.Item;
        return (
            <div>
                <List>
                    {this.props.problem?null:<Item>
                        {this.props.user.isDoctor?<div className='wen-title'>热点问题</div>:<div className='wen-title'>快速咨询</div>}
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}}>更多>></div>
                    </Item>}
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