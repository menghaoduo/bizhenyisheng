import React from 'react'
import {SearchBar} from 'antd-mobile'
import './search.css'

class Search extends React.Component{
    render(){
        return (
            <div>
                <SearchBar placeholder="搜索症状/疾病/科室/医院/医生名" maxLength={15} />
            </div>
        )
    }
}

export default Search