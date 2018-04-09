import React from 'react'
import {Menu,NavBar,Icon} from 'antd-mobile'
import './tags.select.css'
import { connect } from 'react-redux'
import { selectTags} from '../../redux/user.select.redux'
// 存储已选的标签
let tags = []
@connect(
    state=>state.select,
    {selectTags}
)
class TagsSelect extends React.Component{
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            data: []
        };
    }
    click=(e)=>{
        let ev = e || window.event;
        let target = ev.target || ev.srcElement;
        let parent = target.parentNode.childNodes
        //防止点击到父元素
        if (target.children.length)
            return
        //被选中的元素 改变颜色
        if(target.nodeName.toLowerCase() === 'a'){
            target.style['backgroundColor'] = '#ca2d42'
            target.style['color'] = '#fff'
        }
        parent.forEach(v=>{
            //被选中的target 不需要改变颜色
            if(v===target){
                tags.push(v.innerHTML)
                return
            }
            //indexOf返回-1是判断没有该元素
            if(tags.indexOf(v.innerHTML)!==-1){
                tags.splice(tags.indexOf(v.innerHTML),1)
            }
            v.style['backgroundColor'] = '#fff'
            v.style['color'] = '#000'
        })
    }
    clearTags=()=>{
        const allTags = [].concat(...this.refs.parent1.children,...this.refs.parent2.children,...this.refs.parent3.children,...this.refs.parent4.children)
        allTags.forEach(v=>{
            //被选中的target 不需要改变颜色
            v.style['backgroundColor'] = '#fff'
            v.style['color'] = '#000'
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
                    initData: this.state.data,
                });
        }
        //点击NavBar，让select取反，关闭或打开
        this.props.selectTags()
    }
    //关闭
    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }
    render(){
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                level={1}
                className="multi-foo-menu menu rank-menu"
                height={document.documentElement.clientHeight * 0.3}
            />
        );
        const loadingEl = (
            <div className="multi-foo-menu menu" style={{ height: document.documentElement.clientHeight * 0.3 ,backgroundColor:'white',overflow:'auto'}}>
                <li className="select-item">
                    <dl>
                        <dt>用户年龄</dt>
                        <dd ref='parent1' onClick={this.click}><a>成人患者</a><a>儿童患者</a></dd>
                    </dl>
                </li>
                <li className="select-item">
                    <dl>
                        <dt>医学体系</dt>
                        <dd ref='parent2' onClick={this.click}><a>西医</a><a>中医</a><a>中西医结合</a><a>蒙藏苗医</a></dd>
                    </dl>
                </li>
                <li className="select-item">
                    <dl>
                        <dt>医院等级</dt>
                        <dd ref='parent3' onClick={this.click}><a>一级医院</a><a>二级医院</a><a>三级医院</a></dd>
                    </dl>
                </li>
                <li className="select-item">
                    <dl>
                        <dt>医生职称</dt>
                        <dd ref='parent4' onClick={this.click}><a>高级职称</a><a>副高级医院</a><a>中级职称</a><a>初级职称</a></dd>
                    </dl>
                </li>
                <li className="select-item">
                    <div className="select-btn row">
                        <div className="col-50">
                            <input type="button" onClick={this.clearTags} className="button reset" value="清除全部" style={{color:'#444',border:'1px solid #888',backgroundColor:'#fff'}}/>
                        </div>
                        <div className="col-50">
                            <input type="submit" className="button" style={{color:'#fff',border:'1px solid #ca2d42',backgroundColor:'#ca2d42'}}/>
                        </div>
                    </div>
                </li>
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
                    {show ? initData ? loadingEl : menuEl : null}
                    {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
                </div>
        )
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.office||nextprops.city||nextprops.rank){
            this.setState({
                show:false
            })
        }
    }
}

export default TagsSelect