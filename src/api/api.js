import {httpPost,httpGet} from "../config";

//获取科室图标  Department0:三个图标   Department1:全部图标
export const Department0 =()=> httpGet('/Department/0')
export const Department1 =()=> httpGet('/Department/1')

//全部医院数据
export const AllHospital =()=> httpGet('/getHospital')
//按名称搜索医院
export const HospitalName =(name)=> httpGet('/getHospital?name='+name)

//患者关注的医生
export const Getfollowlist =()=> httpGet('/User/getfollowlist')
//医生的患者
export const MyPatient =()=> httpGet('/User/myPatient')