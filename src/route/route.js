import React from 'react'
import KsLink from './keshi.link/keishi.link'
import UserMyselfLink from './user.myself.link/user.myself.link'
class RouteLink extends React.Component{
    render(){
        return (
            <div>
                <KsLink/>
                <UserMyselfLink/>
            </div>
        )
    }
}
export default RouteLink