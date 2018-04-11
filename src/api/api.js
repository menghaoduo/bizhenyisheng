import {httpPost,httpGet} from "../config";

//获取科室图标  Department0:三个图标   Department1:全部图标
export const Department0 =()=> httpGet('/Department/0')
export const Department1 =()=> httpGet('/Department/1')

//个人信息修改
export const DoctorPerfectmaterial = (params)=> httpPost('/User/DoctorPerfectmaterial',params)
//全部医院数据
export const AllHospital =()=> httpGet('/getHospital')
//按名称搜索医院
export const HospitalName = name => httpGet('/getHospital?name='+name)

//关注医生
export const AddFollow = doctorid => httpPost('/User/addfollow?doctorid='+doctorid)

//患者关注的医生
export const Getfollowlist =()=> httpGet('/User/getfollowlist')

//诊后咨询权限验证
export const Afterverification =doctorid =>httpGet('/Qa/Afterverification?doctorid='+doctorid)

//医生信息
export const LookDoctorDetailt= doctorid =>httpGet('/User/lookDoctorDetailt?id='+doctorid)
//医生的患者
export const MyPatient =()=> httpGet('/User/myPatient')

//医生认证
export const UploadAuthentication = (params,img)=>httpPost('/uploadAuthentication',params,img)

