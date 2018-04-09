import {httpGet} from '../config'
const DOCTOR = 'DOCTOR'
const NODOCTOR = 'NODOCTOR'
const initState = {
    isDoctor: false
}

export function user(state=initState,action) {
    switch (action.type){
        case DOCTOR:
            return {...state,isDoctor:true,...action.payload}
        case NODOCTOR:
            return {...state,isDoctor:false,...action.payload}
        default:
            return state
    }
}
export function getUserType(){
    return dispatch=>{
            httpGet('/getUserInfo')
            .then(res=>{
                console.log(res.data.data)
                if(res.data.data.isdoctor){
                    dispatch(doctor(res.data.data))
                }else {
                    dispatch(notdoctor(res.data.data))
                }
            })
    }
}
export function doctor(data) {
    return {type:DOCTOR,payload:data}
}
export function notdoctor(data) {
    return {type:NODOCTOR,payload:data}
}
