import React from 'react'
import {Drawer} from 'antd-mobile'
import './drawer.help.css'
import {connect} from 'react-redux'
import { getDoctorHelpF,lookProblemHelpF ,keshiDoctorHelpP,keshiDoctorFillHelpP,keshiDoctorOnlineHelpP} from '../../redux/user.help.redux'
@connect(
    state=>state.help,
    { getDoctorHelpF,lookProblemHelpF,keshiDoctorHelpP ,keshiDoctorFillHelpP,keshiDoctorOnlineHelpP}
)

class DrawerHelp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            help:false
        }
    }
    componentDidMount(){
        if (this.props.getDoctor)
            this.setState({
                help:this.props.getDoctor
            })
        else if(this.props.lookProblem)
            this.setState({
                help:this.props.lookProblem
            })
        else if(this.props.keshiDoctor)
            this.setState({
                help:this.props.keshiDoctor
            })
        else if(this.props.keshiDoctorOnline)
            this.setState({
                help:this.props.keshiDoctorOnline
            })
        else if(this.props.keshiDoctorFill)
            this.setState({
                help:this.props.keshiDoctorFill
            })
    }
    render(){
        console.log(this.state.help)
        const sidebar = (<div>
                                <div className='panel-pop-title'>{this.props.helpList.title}
                                    {this.props.getDoctor?<span className='close-popup ion-ios-close-empty' onClick={this.props.getDoctorHelpF}/>:null}
                                    {this.props.lookProblem?<span className='close-popup ion-ios-close-empty' onClick={this.props.lookProblemHelpF}/>:null}
                                    {this.props.keshiDoctor?<span className='close-popup ion-ios-close-empty' onClick={this.props.keshiDoctorHelpP}/>:null}
                                    {this.props.keshiDoctorOnline?<span className='close-popup ion-ios-close-empty' onClick={this.props.keshiDoctorOnlineHelpP}/>:null}
                                    {this.props.keshiDoctorFill?<span className='close-popup ion-ios-close-empty' onClick={this.props.keshiDoctorFillHelpP}/>:null}
                                </div>
                                <div className='panel-pop-content'>
                                    {/*<h2>{this.props.helpList.title}</h2>*/}
                                    <h3>{this.props.helpList.type1}</h3>
                                    <div>
                                        {this.props.helpList.type1Info.map((v,k)=>(
                                           <p key={k}>{v}</p>
                                     ))}
                                    </div>
                                    <h3>{this.props.helpList.type2}</h3>
                                    <div>
                                        {this.props.helpList.type2Info.map((v,k)=>(
                                            <p key={k}>{v}</p>
                                        ))}
                                    </div>
                                    <h3>{this.props.helpList.type3}</h3>
                                    <div>
                                        {this.props.helpList.type3Info.map((v,k)=>(
                                            <p key={k}>{v}</p>
                                        ))}
                                    </div>
                                    <h3>{this.props.helpList.type4}</h3>
                                    <div>
                                        <span>{this.props.helpList.weixin}</span>
                                        <br/>
                                        <span>{this.props.helpList.phonenumber}</span>
                                        <br/>
                                            <span>{this.props.helpList.qq}</span>
                                        <br/>
                                        <span>{this.props.helpList.email}</span>
                                    </div>
                                </div>
                        </div>)
        return (
                <Drawer
                    open={this.state.help}
                    sidebar={sidebar}
                    position='bottom'
                    className="my-drawer"
                    transitions={true}
                    touch={true}
                    dragToggleDistance={1}
                    overlayStyle={{backgroundColor:'white'}}
                    children=''
                >
                </Drawer>
        )
    }
}

export default DrawerHelp