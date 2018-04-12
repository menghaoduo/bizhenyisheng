/*
公用方法
 */
import lrz from 'lrz'

//上传图片 公用函数
//that:组件的this  files:图片files  args:{fileStr,imgStr,str}
export const HandleImage = (that,files,args) =>{
    that.setState({
        [args.fileStr]:files,
        [args.imgStr]:[]
    },()=>{
        files.map((v,i)=>(
            lrz(files[i].url, {quality:0.3})
                .then((rst)=>{
                    // 处理成功会执行
                    that.state[args.imgStr].push(`${rst.base64}${args.str}`)
                }))
        )
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