import React from 'react'
import WtList from '../../component/wenti.list/wenti.list'
import { List } from 'antd-mobile';

const Item = List.Item;
class AnswerProblem extends React.Component{
    render(){
        console.log(this.props)
        return (
            <div>
                <List className="my-list">
                    <Item>全部快速咨询问题</Item>
                </List>
                <WtList problem={this.props.match.path}/>
            </div>
        )
    }
}

export default AnswerProblem