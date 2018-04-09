import React from 'react'
import {Tabs} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import AnswerLsit from '../../component/answer.list/answer.list'
import {httpGet} from "../../config";

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class UserQuestion extends React.Component{
    constructor(props){
        super(props)
        this.state={
            call:{},
            fast:{},
            share:{}
        }
    }
    componentDidMount(){
        // 点名咨询
        httpGet('/Qa/myQaOrder?type=1').then(res=>{
            console.log(res.data)
            this.setState({
                call:res.data.data
            })
        })
        //快速咨询
        httpGet('/Qa/myQaOrder?type=2').then(res=>{
            this.setState({
                fast:res.data.data
            })
        })
        //诊后
        httpGet('/Qa/myQaOrder?type=3').then(res=>{
            this.setState({
                share:res.data.data
            })
        })
    }
    render(){
        const tabs = [
            { title: '点名咨询' },
            { title: '快速咨询' },
            { title: '诊后咨询' },
        ]
        return (
            <div style={{width:'100%'}}>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initalPage={'t2'}
                          renderTabBar={renderTabBar}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',width:'100%' }}>
                            {this.state.call==={}?null:<AnswerLsit data={this.state.call} style={{width:'100%'}}/>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',width:'100%' }}>
                            {this.state.fast==={}?null:<AnswerLsit data={this.state.fast} style={{width:'100%'}}/>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',width:'100%' }}>
                            {this.state.share==={}?null:<AnswerLsit data={this.state.share}style={{width:'100%'}}/>}
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
}
export default UserQuestion