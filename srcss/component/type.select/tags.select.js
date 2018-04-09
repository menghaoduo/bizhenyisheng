import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import './tags.select.css'
import { connect } from 'react-redux'

@connect(
    state=>state.select
)

class TagsSelect extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: [
                {
                    value: '1',
                    label: '用户年龄',
                    children: [
                        {
                            label: '成人患者',
                            value: '1',
                        },
                        {
                            label: '儿童患者',
                            value: '2',
                        }
                    ]
                }, {
                    value: '2',
                    label: '医生职称',
                    children: [
                        {
                            label: '高级职称',
                            value: '1',
                        }, {
                            label: '中级职称',
                            value: '2',
                        }, {
                            label: '初级职称',
                            value: '3',
                        }]
                },
                {
                    value: '3',
                    label: '医院等级',
                    children: [
                        {
                            label: '三级医院',
                            value: '1',
                        },
                        {
                            label: '二级医院',
                            value: '2',
                        },
                        {
                            label: '一级医院',
                            value: '3',
                        },
                    ],
                },
                {
                    value: '4',
                    label: '医学体系',
                    children: [
                        {
                            label: '西医',
                            value: '1',
                        },
                        {
                            label: '中医',
                            value: '2',
                        },
                        {
                            label: '蒙藏苗医',
                            value: '3',
                        },
                    ],
                },
            ]
        };
    }
    componentDidMount(){
        const childrenComponent = []
        childrenComponent.push(this);
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
    onOk = (value) => {
        console.log(value);
        this.onCancel();
    }
    onCancel = () => {
        this.setState({ show: false });
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
        const menuEl = (
            <Menu
                className="multi-foo-menu menu rank-menu"
                data={initData}
                value={['1', ['1']]}
                onChange={this.onChange}
                onOk={this.onOk}
                onCancel={this.onCancel}
                height={document.documentElement.clientHeight * 0.3}
                multiSelect
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
                            筛选<Icon type="down" size='xs'/>
                        </NavBar>
                    {show ? initData ? menuEl : loadingEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillUpdate(){
        if(!this.props.office||!this.props.city||!this.props.rank){
            this.state.show = false;
        }
    }
}

export default TagsSelect