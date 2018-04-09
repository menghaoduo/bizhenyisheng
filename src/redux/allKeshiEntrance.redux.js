const ALL = 'ALL'
const CALL = 'CALL'
const FAST = 'FAST'
const SHARE ='SHARE'
const initState = {
    all:0,
    call:0,
    fast:0,
    share:0
}

export function entrance(state=initState,action) {
    switch (action.type){
        case ALL:
            return {...state,all:1,call:0,fast:0,share:0}
        case CALL:
            return {...state,all:0,call:1,fast:0,share:0}
        case FAST:
            return {...state,all:0,call:0,fast:1,share:0}
        case SHARE:
            return {...state,all:0,call:0,fast:0,share:1}
        default:
            return state
    }
}

export function allF(data) {
    return {type:ALL}
}
export function callF(data) {
    return {type:CALL}
}
export function fastF(data) {
    return {type:FAST}
}
export function shareF(data) {
    return {type:SHARE}
}
