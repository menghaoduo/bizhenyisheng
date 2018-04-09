import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
    state=>state.select
)

class OfficeSelect extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: [
                {
                    value: '1',
                    label: '科室一',
                    children: [
                        {
                            label: '科室一一',
                            value: '1',
                        },
                        {
                            label: '科室一二',
                            value: '2',
                        }, {
                            label: '科室一三',
                            value: '3'
                        }, {
                            label: '科室一四',
                            value: '4',
                        }
                    ]
                },
                {
                    value: '2',
                    label: '科室二',
                    children: [
                        {
                            label: '科室二一',
                            value: '1',
                        },
                        {
                            label: '科室二二',
                            value: '2',
                        }, {
                            label: '科室二三',
                            value: '3',
                        }, {
                            label: '科室二四',
                            value: '4',
                        }
                    ]
                }
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
                    initData: this.state.data
                })
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
        const menuEl = (
            <Menu
                className="multi-foo-menu menu"
                data={initData}
                value={['1', ['1']]}
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
                            className="single-top-nav-bar"
                            style={{width:'100%'}}
                        >
                            科室<Icon type="down" size='xs'/>
                        </NavBar>

                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillUpdate(){
        if(!this.props.tags||!this.props.city||!this.props.rank){
            this.state.show = false;
        }
    }
}

export default OfficeSelect