const DOCTOR = 'DOCTOR'
const initState = {
    isDoctor: false
}

export function user(state=initState,action) {
    switch (action.type){
        case DOCTOR:
            return {...state,isDoctor:true}
        default:
            return state
    }
}

export function doctor() {
    return {type:DOCTOR}
}
