import React from 'react'
import {connect} from 'react-redux'
import {getUserType} from "./redux/user.redux"

@connect(
    state=>null,
    {getUserType}
)
class UserData extends React.Component{
    componentWillMount(){
        this.props.getUserType()
    }
    render(){
        return null
    }
}
export default UserData