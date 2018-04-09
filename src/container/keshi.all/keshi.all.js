import React from 'react'
import {List} from 'antd-mobile'
import { lookProblemHelpF } from '../../redux/user.help.redux'
import { connect } from 'react-redux'
import DrawerHelp from '../../component/drawer.help/drawer.help'
import KsList from '../../component/keshi.list/keshi.list'
import {httpGet} from '../../config'
@connect(
    state=>state.help,
    { lookProblemHelpF }
)
class KeshiAll extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        httpGet('/Department/1').then(res=>{
            this.setState({
                data:res.data.data
            })
        })
    }
    render(){
        const Item = List.Item
        //传到KsList的自定义数据
        const all = {allkeshi:false}
        //传到Drawer中的数据
        const getDoctorList ={
            title:'如何选择医生',
            type1:'',
            type1Info:['1、输入任意字段，或点击下面的科室图标，可查询所有符合匹配条件的医生信息。',' 2、输入姓名、科室、医院、城市等组合信息（例如：张三 皮肤科 中山医院），可查询特定医生的咨询信息。 ',],
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
                <List className="my-list">
                    <Item>
                        <div className='wen-title'>请先选择科室</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}} onClick={this.props.lookProblemHelpF}>如何找医生<span className='ion-ios-help-outline'/></div>
                    </Item>
                </List>
                <KsList bool={all} />
                {this.props.lookProblem?<DrawerHelp helpList={getDoctorList}/>:null}
            </div>
        )
    }
}
export default KeshiAll