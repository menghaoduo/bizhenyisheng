import React from 'react'
import {connect} from 'react-redux'
import {getUserType} from "./redux/user.redux"
import {Department0} from "./api/api"

@connect(
    state=>state.user,
    {getUserType}
)
class Weixin extends React.Component{
    componentDidMount(){
        Department0.then(res => {
                if (res.data.code === 401){
                    window.location.href = res.data.data;
                }else {
                    this.props.getUserType()
                }
            })
    }
    render(){
        return null
    }
}
export default Weixin