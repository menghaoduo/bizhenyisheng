import React from 'react'
import './user.star.css'
class Star extends React.Component{
    constructor(props){
        super(props)
        this.state={
            star:3.7,
            fullstar:0,
            shortstar:0,
            nostar:0
        }
    }
    full=()=>{
        this.state.fullstar = Math.trunc(this.state.star)
        this.state.shortstar = (this.state.star - this.state.fullstar).toFixed(2)
        // this.setState({
        //     fullstar: Math.trunc(this.state.star),
        //     shortstar: (this.state.star - this.state.fullstar).toFixed(2)
        // })
        if(this.state.fullstar>5){
            this.state.fullstar =5
            this.state.shortstar = 0
        }
        const s= []
        for(let i=0;i<this.state.fullstar;i++){
            s.push(<span key={i} className='ion-ios-star'/>)
        }
        if(this.state.shortstar>=.5){
            s.push(<span key='half' className='ion-ios-star-half'/>)
        }
        //没有星星
        // if(this.state.fullstar<5&&this.state.shortstar<.5){
        //
        //     this.state.nostar = 5-this.state.fullstar
        //     console.log(this.state.nostar)
        //     // s.push(<span key='half' className='ion-ios-star-half'></span>)
        // }
        return s
    }
    render(){
        return (
            <div>
                {this.full}
            </div>
        )
    }
}
export default Star