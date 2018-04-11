import React from 'react'
import {Route, Switch,withRouter} from 'react-router-dom'
import KeshiType from '../../container/keshi.doctor/keshi.doctor'
import KeshiAll from '../../container/keshi.all/keshi.all'
import KeshiDoctorHome from '../../container/keshi.doctor.home/keshi.doctor.home'
import KeshiDoctorCall from '../../container/keshi.doctor.call/keshi.doctor.call'
import KeshiDoctorPay from '../../container/keshi.doctor.pay/keshi.doctor.pay'
import KeshiDoctorCatamnestic from  '../../container/keshi.doctor.catamnestic/keshi.doctor.catamnestic'
import ShareQuestion from '../../container/share.question/share.question'
import ResultArticle from '../../container/user-pay-result/result.article'
import {Department1} from "../../api/api";
import FastDoctor from "../../container/user-fast-consultation/fast.doctor.pay";
@withRouter
class Kslink extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[{code:0,name:0}]
        }
    }
    componentDidMount(){
        Department1().then(res=>{
            this.setState({
                data:res.data.data
            })
        })
    }
    render(){
        const datas = [
            // 全部科室
            {path:'/全部科室',component:KeshiAll},
            //按科室搜索医生后,点进去向医生提问的路由
            {path:'/keshidoctorhome/:data',component:KeshiDoctorHome},
            //点名咨询
            {path:'/dccall/:data',component:KeshiDoctorCall},
            //诊后咨询
            {path:'/dczhenhou/:data',component:KeshiDoctorCatamnestic},
            //快速咨询
            {path:'/fastdc/:data',component:FastDoctor},
            //付钱
            {path:'/dcpay/:data',component:KeshiDoctorPay},
            //付款后的支付详情
            {path:'/payresult',component:ResultArticle},
            //共享问题详情页
            {path:'/sharequestion',component:ShareQuestion},
        ]
        return (
            <div>
                <Switch>
                    {/*科室路由，以科室名字为路由*/}
                    {this.state.data.map(v=>{
                        return <Route key={v.code} path={`/${v.name}/:data`} component={KeshiType} />
                    })}
                    {datas.map(v => {
                        return <Route key={v.path} path={v.path} component={v.component} />
                    })}
                </Switch>
            </div>
        )
    }
}

export default Kslink