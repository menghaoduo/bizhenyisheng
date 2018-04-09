import React from 'react'
import {Result,Icon,WhiteSpace,WingBlank,Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class ResultArticle extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:window.location.search.substring(4,window.location.search.length)
        }
    }
    render(){
        return(
            <div>
                <Result
                    classname='result-article'
                    img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6',width:'.6rem',height:'.6rem',marginTop:'.2rem' }} />}
                    title="支付成功"
                />
                <WingBlank>
                    <WhiteSpace size='lg'/>
                    {/*让只能进入这个页面一次 */}
                    <Button type='primary' onClick={()=>this.props.history.push('/dcpay/'+JSON.stringify({isCome:true,id:JSON.parse(this.state.id)}))}>查看问答</Button>
                    <WhiteSpace size='lg'/>
                </WingBlank>
            </div>
        )
    }
}
export default ResultArticle