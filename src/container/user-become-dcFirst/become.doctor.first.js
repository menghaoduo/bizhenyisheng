import React from 'react'
import {List,Button,WingBlank,WhiteSpace,Drawer,Radio,SearchBar,Toast} from 'antd-mobile'
import {AllHospital,Department1,HospitalName} from "../../api/api";
import './become.doctor.first.css'
import {withRouter} from 'react-router-dom'
@withRouter
class BecomeDoctorFirst extends React.Component{
    constructor(props){
        super(props)
        this.state={
            keshiDrawer:false,
            hospitalDrawer:false,
            titleDrawer:false,
            hospitalList:[],
            dataUpload:[],
            checkValue:1000,
            label:'',
            checkValueHospital:60002,
            labelHospital:'',
            checkValueTitle:1,
            labelTitle:''
        }
    }
    componentDidMount(){
        Department1.then(res=>{
            //科室数据
            this.setState({
                dataUpload:res.data.data
            })
        })
        AllHospital.then(res=>{
            //医院数据
            this.setState({
                hospitalList:res.data.data.list
            })
        })
    }
    //打开关闭科室抽屉
    onDrawerChange = (...args) => {
        this.setState({ keshiDrawer: !this.state.keshiDrawer });
    }
    //科室单选框
    onChecboxChange = (value,label) => {
        this.setState({
            checkValue:value,
            label,
            keshiDrawer: false
        });
    }
    //打开关闭医院抽屉
    onHospitalDrawerChange = (...args) => {
        this.setState({ hospitalDrawer: !this.state.hospitalDrawer });
    }
    //输入医院搜索
    onHospitalChange =value=>{
        HospitalName(value).then(res=>{
            console.log(res)
            this.setState({
                hospitalList:res.data.data.list
            })
        })
    }
    //医院检索列表点击
    onChecboxHospoitalChange = (value,label) => {
        this.setState({
            checkValueHospital:value,
            labelHospital:label,
            hospitalDrawer:false,
        });
    }
    //点击取消后关闭医院抽屉
    onHospitalCancel=()=>{
        this.setState({
            hospitalDrawer:false,
        });
    }
    //打开关闭职称抽屉
    onTitleDrawerChange = (...args) => {
        this.setState({ titleDrawer: !this.state.titleDrawer });
    }
    //职称单选框
    onChecboxTitleChange = (value,label) => {
        this.setState({
            checkValueTitle:value,
            labelTitle:label,
            titleDrawer:false,
        });
    }
    //跳转到下一页
    go = ()=> {
        if (!this.state.label || !this.state.labelHospital || !this.state.labelTitle ){
            Toast.info('专业信息不完整！')
            return null
        }
        const data = JSON.stringify({
            departmentcode:this.state.checkValue,
            departmentname:this.state.label,
            hospitalcode:this.state.checkValueHospital,
            hospitalname:this.state.labelHospital,
            title:this.state.labelTitle,
        })
        this.props.history.push('/becomedc/'+data)
    }
    render(){
        const Item = List.Item
        const RadioItem = Radio.RadioItem;
        //科室抽屉
        const sidebars = (<div>
            <List>
                {this.state.dataUpload.map(i => (
                    <RadioItem key={i.code} checked={this.state.checkValue === i.code} onChange={() => this.onChecboxChange(i.code,i.name)}>
                        {i.name}
                    </RadioItem>
                ))}
            </List>
        </div>)
        //医院抽屉
        const hospitalSidebars = (<div>
            <SearchBar placeholder="请输入医院名称" maxLength={15} onChange={this.onHospitalChange} onCancel={this.onHospitalCancel} />
            <List>
                {this.state.hospitalList.map(v=>(
                    <RadioItem key={v.id} onChange={() => this.onChecboxHospoitalChange(v.id,v.name)}>
                {v.name}
                    </RadioItem>
                    ))}
            </List>
        </div>)
        //职称抽屉
        const dataTitle = [
            {code:1,name:'初级职称'},
            {code:2,name:'中级职称'},
            {code:3,name:'副高级职称'},
            {code:4,name:'高级职称'}
        ]
        const titleSidebars = (<div>
            <List>
                {dataTitle.map(i => (
                    <RadioItem key={i.code} checked={this.state.checkValueTitle === i.code} onChange={() => this.onChecboxTitleChange(i.code,i.name)}>
                        {i.name}
                    </RadioItem>
                ))}
            </List>
        </div>)
        return (
            <div>
                <List renderHeader='设置专业信息'>
                    <Item thumb={<div className='become-doctor-first'>医院</div>} onClick={this.onHospitalDrawerChange} arrow="horizontal">
                        {this.state.labelHospital}
                    </Item>
                    <Item thumb={<div className='become-doctor-first'>科室</div>} onClick={this.onDrawerChange} arrow="horizontal">
                        {this.state.label}
                    </Item>
                    <Item thumb={<div className='become-doctor-first'>职称</div>} onClick={this.onTitleDrawerChange} arrow="horizontal">
                        {this.state.labelTitle}
                    </Item>
                </List>
                <WhiteSpace size='lg'/>
                <WingBlank>
                    <Button type="primary" style={{border:'0PX'}} onClick={this.go}>下一步：上传证明材料</Button>
                    <WhiteSpace />
                    <Button onClick={this.props.history.goBack} style={{border:'0'}}>返回</Button>
                    <WhiteSpace />
                </WingBlank>
                {/*医院抽屉*/}
                {this.state.hospitalDrawer?<Drawer
                    open={this.state.hospitalDrawer}
                    sidebar={hospitalSidebars}
                    onOpenChange={this.onHospitalDrawerChange}
                    position='bottom'
                    transitions={true}
                    touch={true}
                    dragToggleDistance={0}
                    sidebarStyle ={{backgroundColor:'white',width:'100%'}}
                    style={{ minHeight: document.documentElement.clientHeight }}
                    children=''
                >
                </Drawer>:null}
                {/*科室抽屉*/}
                {this.state.keshiDrawer?<Drawer
                    open={this.state.keshiDrawer}
                    sidebar={sidebars}
                    onOpenChange={this.onDrawerChange}
                    position='right'
                    transitions={true}
                    touch={true}
                    dragToggleDistance={0}
                    sidebarStyle ={{backgroundColor:'white',width:'75%'}}
                    style={{ minHeight: document.documentElement.clientHeight }}
                    children=''
                >
                </Drawer>:null}
                {/*职称抽屉*/}
                {this.state.titleDrawer?<Drawer
                    open={this.state.titleDrawer}
                    sidebar={titleSidebars}
                    onOpenChange={this.onTitleDrawerChange}
                    position='right'
                    transitions={true}
                    touch={true}
                    dragToggleDistance={0}
                    sidebarStyle ={{backgroundColor:'white',width:'75%'}}
                    style={{ minHeight: document.documentElement.clientHeight }}
                    children=''
                >
                </Drawer>:null}
            </div>

        )
    }
}
export default BecomeDoctorFirst