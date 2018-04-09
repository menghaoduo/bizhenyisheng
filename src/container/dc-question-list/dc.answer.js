import React from 'react'
import {List,Tabs,Popover} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import AnswerLsit from '../../component/answer.list/answer.list'
import {httpGet} from "../../config";

function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class DcAnswer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
            selected: '',
            willAnswer:{},
            answering:{},
            over:{}
        }
    }
    //筛选种类选择
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    //气泡开关
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    componentDidMount(){
        // 待回答数据
        httpGet('/Qa/doctorOrder?state=1').then(res=>{
            this.setState({
                willAnswer:res.data.data
            })
        })
        //进行中
        httpGet('/Qa/doctorOrder?state=2').then(res=>{
            this.setState({
                answering:res.data.data
            })
        })
        //回答完毕
        httpGet('/Qa/doctorOrder?state=3').then(res=>{
            this.setState({
                over:res.data.data
            })
        })
    }
    render(){
        const Item = Popover.Item;
        const tabs = [
            { title: '待回答' },
            { title: '进行中' },
            { title: '已结束' },
        ]
        return (
            <div>
                {/*分类筛选气泡*/}
                <List renderHeader={<div>
                    全部问题 <Popover mask
                                  overlayClassName="fortest"
                                  overlayStyle={{ color: 'currentColor' }}
                                  visible={this.state.visible}
                                  overlay={[
                                      (<Item key="4" value="scan" data-seed="logId">点名咨询</Item>),
                                      (<Item key="5" value="special" style={{ whiteSpace: 'nowrap' }}>诊后咨询</Item>),
                                      (<Item key="6" value="button ct" >快速咨询</Item>),
                                  ]}
                                  align={{
                                      overflow: { adjustY: 0, adjustX: 0 },
                                      offset: [-10, 0],
                                  }}
                                  onVisibleChange={this.handleVisibleChange}
                                  onSelect={this.onSelect}>
                    <div style={{float:'right'}}>分类筛选</div>
                </Popover>
                </div>}/>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initalPage={'t2'}
                          renderTabBar={renderTabBar}
                    >
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.state.willAnswer==={}?null:<AnswerLsit data={this.state.willAnswer}/>}
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.state.answering==={}?null:<AnswerLsit data={this.state.answering}/>}
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                            {this.state.over==={}?null:<AnswerLsit data={this.state.over}/>}
                        </div>
                    </Tabs>
                </StickyContainer>
            </div>
        )
    }
}
export default DcAnswer