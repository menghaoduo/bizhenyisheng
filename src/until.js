/*
公用方法
 */

export const HandleImage = (that,f) =>{
    console.log(that.state,f)
    let _this = that
    that.setState({
        files:f
    })
}


//select(option)选框
//that:组件的this.refs属性  args:{ref} 是哪个ref
export const radio = (that,args)=>{
    for (let i=0;i<that[args.ref].children.length;i++){
        if (that[args.ref].children[i].selected) {
            return that[args.ref].children[i]
        }
    }
}