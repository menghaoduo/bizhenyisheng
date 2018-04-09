import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import './rank.select.css'
import { connect } from 'react-redux'

@connect(
    state=>state.select
)
class RankSelect extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data:[
                {
                    value: '1',
                    label: '综合排序'
                }, {
                    value: '2',
                    label: '看过人数'
                },
                {
                    value: '3',
                    label: '星级评分'
                },
            ]
        };
    }
    onChange = (value) => {
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
            // setTimeout(() => {
                this.setState({
                    initData: this.state.data,
                });
            // }, 500);
        }
    }
    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }
    render(){
        const { initData, show } = this.state;
        const menuEl= (
            <Menu
                className="single-foo-menu menu"
                data={initData}
                value={['1']}
                level={1}
                onChange={this.onChange}
                height='1.32rem'
            />
        )
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
                            className="single-top-nav-bar"
                            style={{width:'100%'}}
                        >
                            排序<Icon type="down" size='xs'/>
                        </NavBar>

                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillUpdate(){
        if(!this.props.office||!this.props.city||!this.props.tags){
            this.state.show = false;
        }
    }
}

export default RankSelect