import React from 'react'
import {Route, Switch} from 'react-router-dom'
import BecomeDoctor from '../../container/user-become.dcEnd/become.doctor'
import BecomeDoctorFirst from '../../container/user-become-dcFirst/become.doctor.first'
import PersonData from '../../container/personal-information/personal.data'
import DcAnswer from '../../container/dc-question-list/dc.answer'
import DcAnswerInfo from '../../container/dc.answer.info/dc.answer.info'
import UserQuestion from '../../container/user-question-list/user.question'
import UserQuestionInfo from '../../container/user-question-info/user.question.info'
import PhoneAuth from '../../container/personal-phone-auth/phone.auth'
import UserDCPT from '../../container/dc-patient/user.dcpt'
import UserSetting from '../../container/user.center.setting/user.center.setting'
import HistoryProblem from "../../container/user-foregone.problem/user.lookhistory.propblem";
import UserQuestionClosely from "../../container/user.question.closely/user.question.closely";
import DcWorkInfo from "../../container/dc-work-info/dc.work.info";
import DcMyQrcode from '../../container/dc-my-qrcode/dc.my.qrcode'

class UserMyselfLink extends React.Component{
    render(){
        const datas = [
            //个人资料
            {path:'/personaldata',component:PersonData},
            //手机号码验证
            {path:'/phoneauth',component:PhoneAuth},
            // 我的患者或者我的医生
            {path:'/userdcpt',component:UserDCPT},
            //医生回答
            {path:'/doctoranswer',component:DcAnswer},
            //医生回答详情页
            {path:'/doctoranswerinfo/:id',component:DcAnswerInfo},
            //患者我的问诊
            {path:'/userquestion',component:UserQuestion},
            //患者我的问诊详情页
            {path:'/userquestioninfo/:id',component:UserQuestionInfo},
            //患者继续追问
            {path:'/userquestionclosely/:data',component:UserQuestionClosely},
            //看过的问题
            {path:'/userlookhistoryproblem',component:HistoryProblem},
            //用户设置
            {path:'/dcworkinfo',component:DcWorkInfo},
            //医生职业信息设置
            {path:'/usersetting',component:UserSetting},
            //医生二维码
            {path:'/dcmyqrcode',component:DcMyQrcode},
            //成为医生第一步
            {path:'/becomedcfirst',component:BecomeDoctorFirst},
            //成为医生第二步
            {path:'/becomedc/:data',component:BecomeDoctor},
        ]
        return (
            <div>
                <Switch>
                    {datas.map(v => {
                        return <Route key={v.path} path={v.path} component={v.component} />
                    })}
                </Switch>
            </div>
        )
    }
}

export default UserMyselfLink