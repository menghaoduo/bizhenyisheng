import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import './navlink.css'
@withRouter
class NavLinkBar extends React.Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        return (
            <div>
                <TabBar
                    tintColor="#ca2d42"
                    unselectedTintColor="#929292"
                >
                    {navList.map(v=>(
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={<div className={v.icon} />}
                            selected={pathname===v.path}
                            selectedIcon={<div className={v.icon} style={{color:'#ca2d42'}} />}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}
export default NavLinkBar