import React from 'react'
import {Grid} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './keshi.list.css'

@withRouter
class KsList extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const data = this.props.data;
        return (
            <div>
                <Grid data={data}
                      columnNum={4}
                      hasLine={false}
                      activeStyle={false}
                      onClick={(o,d)=>{
                          console.log(o.path)
                          this.props.history.push(o.path)
                      }}
                      renderItem={dataItem => (
                          <div style={{ padding: '10px',minHeight:'0.93rem' }}>
                              <img src={dataItem.icon} style={{ width: '.44rem', height: '.44rem' }} alt="" />
                              <div style={{ color: 'black', fontSize: '.10rem',marginTop:'.05rem' }}>
                                  <span>{dataItem.title}</span>
                              </div>
                          </div>
                      )}
                />
            </div>
        )
    }
}

export default KsList