import React from 'react';
import {Route, Switch} from 'react-router-dom'
import erke from './ks1.png'
import fuchanke from './ks2.png'
import zhongliu from './ks3.png'
import allke from './ks4.png'
import KsList from '../keshi.list/keshi.list'
class Keshi extends React.Component {
    render() {
        return (
            <div>
                我去动漫大师你离开
            </div>
        )
    }
}
class KsLink extends React.Component {
    render() {
        console.log(this.props)
        const data = [
            {path:'/keshi:erke',icon:erke,title:'儿科',component:Keshi},
            {path:'/keshi:fuchanke',icon:fuchanke,title:'妇产科',component:Keshi},
            {path:'/keshi:fanzhi',icon:zhongliu,title:'肿瘤及防治科',component:Keshi},
            {path:'/allkeshi',icon:allke,title:'全部科室',component:Keshi}
        ]
        return (
            <div>
                <Switch>
                        {data.map(v => {
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        })}
                </Switch>
                <KsList data={data}></KsList>
            </div>
        )
    }
}

export default KsLink