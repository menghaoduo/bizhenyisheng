import React from 'react'
import {Grid,Tabs} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'
import {withRouter} from 'react-router-dom'
import './keshi.list.css'
import allke from './ks4.png'
import {httpGet} from '../../config'
import { connect } from 'react-redux'
import {allF} from '../../redux/allKeshiEntrance.redux'
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
@connect(
    state=>state,
    { allF}
)
@withRouter
class KsList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            internal:{},
            surgery:{},
            other:{}
        }
    }
    componentDidMount(){
        if(this.props.bool.allkeshi){
            httpGet('/Department/0')
                .then(res=>{
                    this.setState({
                        data:this.state.data.concat(res.data.data,{imgurl:allke,name:'全部科室',code:99999})
                    })
                })
        }else {
            httpGet('/Department/1')
                .then(res=>{
                    console.log(res.data)
                    //添加全部科室的数据
                    res.data.data.filter(v=>v.imgurl === allke)
                    this.setState({
                        data:res.data.data
                    })
                })
        }
    }
    render(){
        const tabs = [
            { title: '内科' },
            { title: '外科' },
            { title: '其他' },
        ]
        return (
            <div>
                {this.props.bool.allkeshi?
                <Grid data={this.state.data}
                      classNama='index-gird'
                      columnNum={4}
                      hasLine={false}
                      activeStyle={false}
                      onClick={(o)=>{
                          this.props.allF()
                          const data = JSON.stringify({code:o.code,name:o.name})
                          this.props.history.push(`/${o.name}/${data}`)
                      }}
                      renderItem={dataItem => (
                          <div style={{ paddingTop: '10px',minHeight:'0.93rem' }}>
                              <img src={dataItem.imgurl} style={{ width: '.44rem', height: '.44rem' }} alt="" />
                              <div style={{ color: 'black', fontSize: '.10rem',marginTop:'.05rem' }}>
                                  <span>{dataItem.name}</span>
                              </div>
                          </div>
                      )}
                />:
                    <StickyContainer>
                        <Tabs tabs={tabs}
                              initalPage={'t2'}
                              renderTabBar={renderTabBar}
                        >
                            <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                {this.state.internal==={}?null:
                                    <Grid data={this.state.data.filter(v=>v.classid===1)}
                                          classNama='index-gird'
                                          columnNum={4}
                                          hasLine={false}
                                          activeStyle={false}
                                          onClick={(o)=>{
                                              const data = JSON.stringify({code:o.code,name:o.name})
                                              this.props.history.push(`/${o.name}/${data}`)
                                          }}
                                          renderItem={dataItem => (
                                              <div style={{minHeight:'0.93rem' }}>
                                                  <img src={dataItem.imgurl} style={{ width: '.44rem', height: '.44rem' }} alt="" />
                                                  <div style={{ color: 'black', fontSize: '.10rem',marginTop:'.05rem' }}>
                                                      <span>{dataItem.name}</span>
                                                  </div>
                                              </div>
                                          )}
                                    />}
                            </div>
                            <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                {this.state.surgery==={}?null:
                                    <Grid data={this.state.data.filter(v=>v.classid===2)}
                                          classNama='index-gird'
                                          columnNum={4}
                                          hasLine={false}
                                          activeStyle={false}
                                          onClick={(o)=>{
                                              const data = JSON.stringify({code:o.code,name:o.name})
                                              this.props.history.push(`/${o.name}/${data}`)
                                          }}
                                          renderItem={dataItem => (
                                              <div style={{ minHeight:'0.93rem' }}>
                                                  <img src={dataItem.imgurl} style={{ width: '.44rem', height: '.44rem' }} alt="" />
                                                  <div style={{ color: 'black', fontSize: '.10rem',marginTop:'.05rem' }}>
                                                      <span>{dataItem.name}</span>
                                                  </div>
                                              </div>
                                          )}
                                    />
                                }
                            </div>
                            <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                                {this.state.other==={}?null:
                                    <Grid data={this.state.data.filter(v=>v.classid===0)}
                                          classNama='index-gird'
                                          columnNum={4}
                                          hasLine={false}
                                          activeStyle={false}
                                          onClick={(o)=>{
                                              const data = JSON.stringify({code:o.code,name:o.name})
                                              this.props.history.push(`/${o.name}/${data}`)
                                          }}
                                          renderItem={dataItem => (
                                              <div style={{ minHeight:'0.93rem' }}>
                                                  <img src={dataItem.imgurl} style={{ width: '.44rem', height: '.44rem' }} alt="" />
                                                  <div style={{ color: 'black', fontSize: '.10rem',marginTop:'.05rem' }}>
                                                      <span>{dataItem.name}</span>
                                                  </div>
                                              </div>
                                          )}
                                    />}
                            </div>
                        </Tabs>
                    </StickyContainer>
                    }
            </div>
        )
    }
}

export default KsList