const OFFICE = "OFFICE"
const CITY = "CITY"
const RANK = "RANK"
const TAGS = "TAGS"

const initState = {
    office:false,
    city:false,
    rank:false,
    tags:false
}

export function select(state=initState,action) {
    switch (action.type){
        case OFFICE:
            return {...state,office:!state.office,city:false,rank:false,tags:false}
        case CITY:
            return {...state,city:!state.city,office:false,rank:false,tags:false}
        case RANK:
            return {...state,rank:!state.rank,city:false,office:false,tags:false}
        case TAGS:
            return {...state,tags:!state.tags,city:false,rank:false,office:false}
        default:
            return state
    }
}

export function  selectOffice() {
    return {type:OFFICE}
}
export function  selectCity() {
    return {type:CITY}
}
export function  selectRank() {
    return {type:RANK}
}
export function  selectTags() {
    return {type:TAGS}
}