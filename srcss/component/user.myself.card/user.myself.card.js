import React from 'react'
import { connect } from 'react-redux'
import { Result,Flex } from 'antd-mobile'
import './user.myself.card.css'
import img from './ask5.jpg'
@connect(
    state=>state.user
)
class UserMyselfCard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        if(this.props.isDoctor){
            this.setState({
                data:[
                    {num:4,text:'我的患者'},
                    {num:6,text:'我的回答'},
                    {num:8,text:'收到心意'}]
            })}
        else{
            this.setState({
                data:[
                    {num:2,text:'我的医生'},
                    {num:3,text:'我的问诊'},
                    {num:5,text:'看问题'}
                ]
            })
        }
    }
    render() {
        return (
            <div className='user-info'>
                <Result
                    img={<img src={img} alt=""/>}
                    title="王默默"
                />
                <Flex>
                    {this.state.data.map(v=>(
                        <Flex.Item key={v.text}>
                            <h4 style={{margin:'9px 0'}}>{v.num}</h4>
                            <div>{v.text}</div>
                        </Flex.Item>
                    ))}
                </Flex>
                <div className='top-bg' style={{backgroundImage:`url(${img})`,filter: 'blur(10px)',opacity:0.8}}></div>
            </div>
        )
    }
}
export default UserMyselfCard