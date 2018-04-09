import React from 'react'
import {Menu,NavBar,Icon,ActivityIndicator} from 'antd-mobile'
import { connect } from 'react-redux'
import { selectOffice} from '../../redux/user.select.redux'
import {httpGet} from "../../config";
@connect(
    state=>state.select,
    {selectOffice}
)
class OfficeSelect extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: []
        };
    }
    onChange = (value) => {
        console.log(value)
        this.setState({
            show: false,
        });
        let lable = '';
        this.state.data.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            lable = `${cItem.lable}`;
                            console.log(lable);
                        }
                    });
                }
            }
        });
    }
    componentDidMount(){
        httpGet('/NewDepartment').then(res=>{
            console.log(res.data.data)
            this.setState({
                data:res.data.data
            })
        })
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
        this.props.selectOffice()
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
                value={['1', ['1002']]}
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
    componentWillReceiveProps(nextprops){
        if(nextprops.tags||nextprops.city||nextprops.rank){
            this.setState({
                show:false
            })
        }
    }
}

export default OfficeSelect