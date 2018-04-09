import React from 'react'
import {List} from 'antd-mobile'
import ShareList from '../../component/share.list/share.list'
class HistoryProblem extends React.Component{
    render (){
        const header = {header:false}
        return (
            <div>
                <List renderHeader={<div>
                    我看过的问题
                </div>}>
                    <ShareList data={header}/>
                </List>
            </div>
        )
    }
}
export default HistoryProblem