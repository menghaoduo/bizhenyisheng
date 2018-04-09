import React from 'react'
import {List} from 'antd-mobile'
import './wenzhen.list.css'
import call from './ico1.png'
import fast from './ico2.png'
import share from './ico3.png'
import { connect } from 'react-redux'
import { getDoctorHelpF } from '../../redux/user.help.redux'

@connect(
    state=>state.help,
    { getDoctorHelpF }
)

class WzList extends React.Component{
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const wenList = [
            {icon:call,type:'点名咨询',sentence:'找到心仪医生进行一对一咨询'},
            {icon:fast,type:'快速咨询',sentence:'向多位医生悬赏获得快速解答'},
            {icon:share,type:'共享咨询',sentence:'共享经验多快好省解疑惑'}
        ]
        return (
            <div>
                <List>
                    <Item>
                        <div className='wen-title'>问诊</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}} onClick={this.props.getDoctorHelpF}>问诊帮助<span className='ion-ios-help-outline'></span></div>
                    </Item>
                    {wenList.map(v=>(
                        <Item
                            activeStyle={false}
                            key={v.icon}
                            arrow="horizontal"
                            thumb={v.icon}
                            multipleLine
                            onClick={() => {}}
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