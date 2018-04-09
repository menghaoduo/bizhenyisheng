import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import './city.select.css'
import { connect } from 'react-redux'
import { selectCity } from '../../redux/user.select.redux'
import {city} from '../../static/mock/mock'
@connect(
    state=>state.select,
    { selectCity }
)
class CitySelect extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: city}
    }
    onChange = (value) => {
        this.setState({
            show: false,
        });
        let label = '';
        this.state.data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += ` ${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
                this.setState({
                    initData: this.state.data
                })
        }
        //点击NavBar，让select取反，关闭或打开
        this.props.selectCity()
    }
    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }
    onSelect = ()=>{
        if(this.props.office||this.props.rank||this.props.tags){
            this.setState({
                show: false,
            });
        }
    }
    render(){
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="multi-foo-menu menu"
                data={initData}
                value={['1', '1']}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.3}
            />
        );
        const loadingEl = (
            <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
                <div className={show ? 'single-menu-active' : ''} style={{width:'100%',display:'inline-block',zIndex: '22'}}>
                        <NavBar
                            leftContent="Menu"
                            mode="light"
                            onClick={this.handleClick}
                            value={['1', ['1']]}
                            className="single-top-nav-bar"
                            style={{width:'100%'}}
                        >
                            城市<Icon type="down" size='xs'/>
                        </NavBar>

                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.office||nextprops.rank||nextprops.tags){
            this.setState({
                show: false
            })
        }
    }
}

export default CitySelect