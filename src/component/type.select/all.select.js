import React from 'react'
import RankSelect from './rank.select'
import TagsSelect from './tags.select'
import CitySelect from './city.select'
import OfficeSelect from './office.select'
import { selectOffice,selectTags,selectCity,selectRank } from '../../redux/user.select.redux'
import { connect } from 'react-redux'
import './all.select.css'
@connect(
    state=>(state.select,state.entrance),
    { selectOffice,selectTags,selectCity,selectRank }
)
class AllSelect extends React.Component {
    render() {
        return (
                <div>
                    {this.props.fast?
                        <div className='type-select'>
                            <div className='type-select-son' style={{width:'33.3333%'}}><OfficeSelect /></div>
                            <div className='type-select-son' style={{width:'33.3333%'}}><CitySelect /></div>
                            <div className='type-select-son' style={{width:'33.3333%'}}><TagsSelect /></div>
                        </div>:
                        <div className='type-select'>
                            <div className='type-select-son'><OfficeSelect /></div>
                            <div className='type-select-son'><CitySelect /></div>
                            <div className='type-select-son'><TagsSelect /></div>
                            <div className='type-select-son'><RankSelect /></div>
                        </div>
                    }
                </div>
        )
    }
}
export default AllSelect