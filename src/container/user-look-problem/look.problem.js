import React from 'react'
import WtList from '../../component/user-share-list/hot.list'
import Search from '../../component/search/search'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import AllSelect from '../../component/type.select/all.select'
import { List,WhiteSpace } from 'antd-mobile'
import { lookProblemHelpF } from '../../redux/user.help.redux'
import { connect } from 'react-redux'
import './look.problem.css'
@connect(
    state=>state.help,
    { lookProblemHelpF }
)
class LookProblem extends React.Component{
    render(){
        const Item = List.Item;
        // console.log(this.props)
        const getDoctorList ={
            title:'如何选择',
            type1:'',
            type1Info:['1、使用页面顶端的筛选功能，可控制入选的共享咨询信息数量而便于选择。','2、由于存在替他人咨询的情况（例如父母为孩童咨询），因此“用户年龄”存在一定偏差，此项仅供参考。'],
            type2:'',
            type2Info:[],
            type3:'',
            type3Info:[],
            type4:'',
            qq:'',
            weixin:'',
            email:'',
            phonenumber:''
        }
        return (
            <div>
                <Search className="my-search"/>
                <List className="my-list">
                    <Item>
                        <div className='wen-title'>热门共享咨询</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}} onClick={this.props.lookProblemHelpF}>如何选择<span className='ion-ios-help-outline'></span></div>
                    </Item>
                </List>
                <AllSelect/>
                <WhiteSpace style={{backgroundColor:'#f5f5f9'}}/>
                {/*传入problem为真，没有列表的头部*/}
                <WtList problem={this.props.match.path}/>
                {this.props.lookProblem?<DrawerHelp helpList={getDoctorList}/>:null}
            </div>
        )
    }
}

export default LookProblem