import React from 'react'
import {List} from 'antd-mobile'
import avatar from './ask5.jpg'
import {withRouter} from 'react-router-dom'
@withRouter
class ShareList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        const huanzhe = [{key:1,icon:avatar,name:'医生',money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'},
            {key:2,icon:avatar,name:'王医生',money:20,people:244,sentence:'医生，我想问一个抽烟的问题。我的爸爸20年吸烟史。请问市面上的过滤烟嘴是不是真的有用？'}]
        this.setState({data:huanzhe})
    }
    render(){
        const Item = List.Item
        return (
            <div>
                <List>
                    {/*判断是否有头部*/}
                    {this.props.data?null:<Item>
                        <div className='wen-title'>共享问题</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}}>更多>></div>
                    </Item>}
                    {this.state.data.map(v=>(
                        <Item
                            arrow="horizontal"
                            multipleLine
                            key={v.key}
                            activeStyle={false}
                            onClick={() => {this.props.history.push('/sharequestion')}}
                        >
                            <div className='question-list'>
                                <div className='question-list-avatar'>
                                    <img src={avatar} alt="avatar"/>
                                    <div>{v.name}</div>
                                </div>
                                <div className='question-list-info'>
                                    <div className='question-list-info-word'>
                                        <span>患者问：</span>{v.sentence}
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥{v.money}</span>
                                        <span>{v.people}人看过</span>
                                    </div>
                                </div>
                            </div>
                        </Item>
                    ))}
                </List>
            </div>
        )
    }

}
export default ShareList