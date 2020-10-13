/* 把code写到#code和style标签里 */
/** prefix是前缀，就是前面的代码，后面code的内容会往后追加，第一次为空 */
function writeCode(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)  // 第一个参数的内容高亮
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 10)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(()=>{
        n += 1
        domPaper.innerHTML = markdown.substring(0, n) 
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 10)    
}

var result = `/*
 * 面试官你好，我是陈俊年
 * 我将以动画的形式介绍我自己
 * 只用文字介绍太单调了
 * 首先准备一些样式
 */

*{
  transition: all 1s;
  font-family: Microsoft YaHei
}

html{
  background: rgb(222,222,222);
  font-size:16px;
}

#code{
  border:1px solid red;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector {
    color: #690;
}

.token.property {
    color: #905;
}

.token.function {
    color: #DD4A68;
}


/* 加点3D效果 */
/*#code{
    transform: rotate(360deg);
}*/


/* 正式介绍一下我自己吧 */
/* 我需要一张白纸 */

#code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%
}

#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 16px;
}

#paper > .content{
    background: white;
    width: 100%;
    height: 100%;
}

`

// 白纸相关的
var result2 = `
#paper{

}
`

var md = `
# 自我介绍

我叫 陈俊年
1998 年 1月出生
华中科技大学毕业

# 技能介绍

熟悉 JavaScript CSS HTML VUE

`

writeCode('', result, () => {    // writeCode call the function
    console.log('哦，你结束了')
    createPaper(() => {
        writeCode(result, result2, () => {
            writeMarkdown(md)
        })
    })
})


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()    // 展示一下，同步也可以回调，不一定只有异步能回调
}
