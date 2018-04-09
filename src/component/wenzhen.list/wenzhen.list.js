import React from 'react'
import {List} from 'antd-mobile'
import './wenzhen.list.css'
import call from './ico1.png'
import fast from './ico2.png'
import share from './ico3.png'
import { connect } from 'react-redux'
import { getDoctorHelpF } from '../../redux/user.help.redux'
import {callF,fastF,shareF} from '../../redux/allKeshiEntrance.redux'
import {withRouter} from 'react-router-dom'
@connect(
    state=>(state.help,state.entrance),
    { getDoctorHelpF,callF,fastF,shareF }
)
@withRouter
class WzList extends React.Component{
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const wenList = [
            {icon:call,type:'点名咨询',sentence:'找到心仪医生进行一对一咨询',path:'/全部科室'},
            {icon:fast,type:'快速咨询',sentence:'向多位医生悬赏获得快速解答',path:'/全部科室'},
            {icon:share,type:'共享咨询',sentence:'共享经验多快好省解疑惑',path:'/全部科室'}
        ]
        return (
            <div>
                <List>
                    <Item>
                        <div className='wen-title'>问诊</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}} onClick={this.props.getDoctorHelpF}>问诊帮助<span className='ion-ios-help-outline' /></div>
                    </Item>
                    {wenList.map((v,i)=>(
                        <Item
                            activeStyle={false}
                            key={v.icon}
                            arrow="horizontal"
                            thumb={v.icon}
                            multipleLine
                            onClick={() => {
                                if(i===0)
                                    this.props.callF()
                                if(i===1)
                                    this.props.fastF()
                                if(i===2)
                                    this.props.shareF()
                                this.props.history.push(v.path)
                            }}
                        >
                            {v.type} <Brief>{v.sentence}</Brief>
                        </Item>
                    ))}
                </List>
            </div>
        )
    }
}

export default WzList