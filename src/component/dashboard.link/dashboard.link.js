import React from 'react';
import {connect} from 'react-redux'
import NavLinkBar from '../nav.bar/nav.bar'
import {Route, Switch} from 'react-router-dom'
import GetDoctor from '../../container/get.doctor/get.doctor'
import AnswerProblem from '../../container/dc-answer-problem/answer.problem'
import LookProblem from '../../container/user-look-problem/look.problem'
import UserMyself from '../../container/user.center/user.center'

@connect(
    state => state
)
class Dashboard extends React.Component {
    render() {
        const {isDoctor} = this.props.user
        const navList = [
            {
                path: '/get-doctor',
                text: '找医生',
                icon: 'ion-ios-medkit common',
                component: GetDoctor,
            },
            {
                path: '/answer-problem',
                text: '答问题',
                icon: 'ion-ios-paper common',
                component: AnswerProblem,
                hide: !isDoctor,
            },
            {
                path: '/look-problem',
                text: ' 看问题',
                icon: 'ion-ios-paper common',
                component: LookProblem,
                hide: isDoctor
            },
            {
                path: '/user-myself',
                text: '我的',
                badge: 3,
                icon: 'ion-ios-person common my',
                component: UserMyself
            }
        ]
        return (
            <div>
                <Switch>
                    {navList.map(v => {
                        return <Route key={v.path} path={v.path} component={v.component}/>
                    })}
                </Switch>
                <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default Dashboard