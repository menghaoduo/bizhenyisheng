const GETDOCTORHELP = 'GETDOCTORHELP'
const LOOKPROBLEMHELP = 'LOOKPROBLEMHELP'
const initState = {
    getDoctor: false,
    lookProblem:false
}
export function help(state=initState,action) {
    switch (action.type){
        case GETDOCTORHELP:
            return {...state,getDoctor:!state.getDoctor}
        case LOOKPROBLEMHELP:
            return {...state,lookProblem:!state.lookProblem}
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