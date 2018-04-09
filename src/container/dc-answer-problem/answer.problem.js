import React from 'react'
import FastList from '../../component/doctor-fast-list/fast.list'
import { List } from 'antd-mobile';
const Item = List.Item;
class AnswerProblem extends React.Component{
    render(){
        const header = {header:false}
        return (
            <div>
                <List className="my-list">
                    <Item>全部快速咨询问题</Item>
                </List>
                <FastList header={header}/>
            </div>
        )
    }
}

export default AnswerProblem