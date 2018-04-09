import React from 'react'
import RankSelect from './rank.select'
import TagsSelect from './tags.select'
import MenuExample from './ssss'
import CitySelect from './city.select'
import OfficeSelect from './office.select'
import { selectOffice,selectTags,selectCity,selectRank } from '../../redux/user.select.redux'
import { connect } from 'react-redux'
import './all.select.css'
@connect(
    state=>state,
    { selectOffice,selectTags,selectCity,selectRank }
)
class AllSelect extends React.Component {
    render() {
        return (
            <div>
                <div className='type-select'>
                    <div onClick={this.props.selectOffice} className='type-select-son'><OfficeSelect/></div>
                    {/*<div onClick={this.props.selectCity} className='type-select-son'><CitySelect/></div>*/}
                    <div className='type-select-son'><MenuExample onClick={this.props.selectCity}/></div>
                    <div onClick={this.props.selectRank} className='type-select-son'><RankSelect/></div>
                    <div onClick={this.props.selectTags} className='type-select-son'><TagsSelect/></div>
                </div>
            </div>
        )
    }
}
export default AllSelect