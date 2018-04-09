import React from 'react'
import { connect } from 'react-redux'
import {WhiteSpace,List } from  'antd-mobile'
import UserMyselfCard from '../../component/user.myself.card/user.myself.card'
import './use.myself.css'
@connect(
    state=>state.user
)
class UserMyself extends React.Component {
    render() {
        console.log(this.props)
        const  dataTop = [
            {title:'健康档案',class:'ion-ios-list',extra:'2位',isDoctor:!this.props.isDoctor},
            {title:'特权优惠',class:'ion-ios-pricetags',extra:'5',isDoctor:!this.props.isDoctor},
            {title:'职业信息',class:'ion-ios-box',extra:'编辑',isDoctor:this.props.isDoctor},
            {title:'积分纪录',class:'ion-ios-calendar-outline',extra:'50分',isDoctor:this.props.isDoctor},
        ]
        const  dataBottom = [
            {title:'推荐给朋友',class:'ion-ios-people',isDoctor:!this.props.isDoctor},
            {title:'设置',class:'ion-ios-gear',isDoctor:this.props.isDoctor},
            {title:'意见反馈',class:'ion-ios-compose',isDoctor:this.props.isDoctor},
        ]
        const Item = List.Item;
        return (
            <div>
                <UserMyselfCard />
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                <List>
                    <Item
                        thumb={<div className='ion-ios-bell'/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        activeStyle={false}
                        extra='99+未读'>消息中心</Item>
                    {dataTop.map(v=>(
                        v.isDoctor?<Item
                            thumb={<div className={v.class}/>}
                            key={v.title}
                            arrow="horizontal"
                            onClick={() => {}}
                            activeStyle={false}
                            extra={v.extra}
                        >{v.title}</Item>:null
                    ))}
                    <Item
                        thumb={<div className='ion-ios-star'/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        activeStyle={false}>评价</Item>
                </List>
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                <List>
                    {this.props.isDoctor?<Item
                        thumb={<div className='ion-code-download'/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        activeStyle={false}
                       >我的二维码</Item>:null}
                    {dataBottom.map(v=>(
                        <Item
                            thumb={<div className={v.class}/>}
                            key={v.title}
                            arrow="horizontal"
                            onClick={() => {}}
                            activeStyle={false}
                        >{v.title}</Item>
                    ))}
                </List>
            </div>
        )
    }
}
export default UserMyself