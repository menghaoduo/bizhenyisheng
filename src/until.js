
//单选框选择函数 selects:children
export const radio = (ref,id,val)=>{
    console.log(ref,id,val)
    for (var i=0;i<this.refs[ref].children3.length;i++){
        if (this.refs[ref].children3[i].selected) {
            this.setState({
                [id]: parseInt(this.refs[ref].children3[i].value),
                [val]: this.refs[ref].children3[i].innerHTML
            })
            return
        }
    }
}