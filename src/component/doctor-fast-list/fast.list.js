import React from 'react'
import {List} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {httpGet} from "../../config";

@withRouter
class FastList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            fastList:null
        }
    }
    componentDidMount(){
        httpGet('/Qa/fastQa').then(res=>{
            this.setState({
                fastList:res.data.data.list
            })
        })
    }
    render(){
        const Item = List.Item
        return (
            <div>
                <List>
                    <Item>
                        <div className='wen-title'>快速咨询</div>
                        <div className='wen-title2' style={{textAlign:'right',color:'#aaa'}}>更多>></div>
                    </Item>
                    {this.state.fastList===null?null:this.state.fastList.map(v=>(
                        <Item
                            arrow="horizontal"
                            multipleLine
                            key={v.id}
                            activeStyle={false}
                            onClick={() => {this.props.history.push('/doctoranswerinfo/'+JSON.stringify({id:v.id,userid:v.userid}))}}
                        >
                            <div className='question-list'>
                                <div className='question-list-info' style={{marginLeft:0}}>
                                    <div className='question-list-info-word'>
                                        <span>患者问：</span>{v.problem}
                                    </div>
                                    <div className='question-list-info-money'>
                                        <span>¥{v.paymoney}</span>
                                        <span>剩余时间：{v.hour}</span>
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
export default FastList