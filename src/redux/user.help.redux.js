const GETDOCTORHELP = 'GETDOCTORHELP'
const LOOKPROBLEMHELP = 'LOOKPROBLEMHELP'
const KESHIDOCTOR = 'KESHIDOCTOR'
const KESHIDOCTORONLINE = 'KESHIDOCTORONLINE'
const KESHIDOCTORFILL = 'KESHIDOCTORFILL'
const initState = {
    getDoctor: false,
    lookProblem:false,
    keshiDoctor:false,
    keshiDoctorOnline:false,
    keshiDoctorFill:false
}
export function help(state=initState,action) {
    switch (action.type){
        case GETDOCTORHELP:
            return {...state,getDoctor:!state.getDoctor}
        case LOOKPROBLEMHELP:
            return {...state,lookProblem:!state.lookProblem}
        case KESHIDOCTOR:
            return {...state,keshiDoctor:!state.keshiDoctor}
        case KESHIDOCTORONLINE:
            return {...state,keshiDoctorOnline:!state.keshiDoctorOnline}
        case KESHIDOCTORFILL:
            return {...state,keshiDoctorFill:!state.keshiDoctorFill}
        default:
            return state
    }
}

export function getDoctorHelpF() {
    return { type:GETDOCTORHELP}
}
export function lookProblemHelpF() {
    return { type:LOOKPROBLEMHELP }
}
export function keshiDoctorHelpP() {
    return { type:KESHIDOCTOR }
}
export function keshiDoctorFillHelpP() {
    return { type:KESHIDOCTORFILL }
}
export function keshiDoctorOnlineHelpP() {
    return { type:KESHIDOCTORONLINE}
}