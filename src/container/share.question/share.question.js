import React from 'react'
import {List,WhiteSpace,WingBlank,Modal} from 'antd-mobile'
import Star from '../../component/star/user.star'
import avatar from './ask5.jpg'
import {connect} from 'react-redux'
@connect(
    state=>state.user
)
class ShareQuestion extends React.Component{
    render(){
        const alert = Modal.alert;
        const Item = List.Item
        return (
            <div>
                {/*医师简介*/}
                <List>
                    <Item
                        multipleLine
                        activeStyle={false}
                        className='doctor-info'
                        onClick={() =>{
                        }}
                    >
                        <div className='question-list'>
                            <div className='question-list-avatar'>
                                <img src={avatar} alt="avatar"/>
                                <div className='score'>
                                    <strong>5</strong>分
                                    {/*星星组件*/}
                                    <Star/>
                                </div>
                            </div>
                            <div className='question-list-info'>
                                <div className='doctor-inner'>
                                    <div className='doctor-text doctor-name'>
                                        <strong>王医生</strong>
                                        <span className='doctor-level'>新生儿科 护士</span>
                                        <em>同城</em>
                                    </div>
                                    <div className='doctor-text'>
                                        北京医院
                                    </div>
                                    <div className='doctor-text tag'>
                                        <span>从业5年</span><span>三甲医院</span>
                                    </div>
                                    <div className="doctor-text dc-expert">
                                        擅长：新生儿科常见病，持续低烧，痘痘，新生儿科常见病，持续低烧，痘痘，持续发烧，流鼻血，发烧，脓包，新生儿黄疸
                                    </div>
                                </div>
                                <div className='question-list-info-money'>
                                    <span>¥12</span>
                                    <span>33个咨询</span>
                                    <span>咨询余额2个</span>
                                    <em className="online">在线</em>
                                    {/*{v.HOUR<2?<em className="online">在线</em>:<em className="offline">离线</em>}*/}
                                </div>
                            </div>
                        </div>
                    </Item>
                </List>
                <List renderHeader={() => '患者问：'}>
                    <WhiteSpace/>
                    <WingBlank>
                        <p>
                            疾病可分为传染性疾病和非传染性疾病。心里感到不适如火，人就得病了。由自体内遗传系统存在疾病基因或环境刺激因素等的作用下引发或诱发生命机能发生有害改变。引发代谢、功能、结构、空间、大小的变化，表现为症状、体征和行为的异常，称之疾病。疾病也可通过药物或手术来减轻或消除。普通疾病的诊断治疗常见而容易，人类遗传病是由受精卵或母体受到环境或遗传等的影响，引起的下一代的基因组发生有害改变产生的疾病。称之遗传病，近亲或有血缘关系的夫妇也会生下遗传病患者。
                        </p>
                    </WingBlank>
                    <WhiteSpace/>
                </List>
                <nav className='tabbar-bottom'>
                    <div className='tabbar-item ask-dm' onClick={()=>{
                        if(this.props.tel===null) {
                            alert('毕臻医生', '请完善信息！', [
                                { text: '否', onPress: () => console.log('cancel') },
                                {
                                    text: '是',
                                    onPress: () => {
                                        //判断是否完善电话
                                        this.props.history.push('/phoneauth')
                                    },
                                },
                            ])
                        }
                    }}>
                        <span className='tabbar-item-label'>支付 ￥2 看答案</span>
                    </div>
                </nav>
            </div>
        )
    }
}
export default ShareQuestion