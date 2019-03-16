//这段程序的思想是，先写css代码，这段代码同时写在code里和styleTag里，然后开通一个新的paper
//将简历写在paper中，再将paper的markdown变成html


var result = `/*
*面试官你好
*我是XXX
*/
*{
    transition:all 1s;
}
html{
    background:rgb(222,222,222);
}
body{
    font-size:16px;
}
#code{
    border:1px solid red;
    padding:16px;
}

.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color: #DD4A68;
}

/*3d效果*/
#code{
    transform:rotate(360deg);
}
/*下面介绍我自己，先准备一张白纸*/
#code{
    position:fixed;
    left:0;
    width:50%;
    height:100%;
}
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    background:black;
    display:flex;
    justify-content:center;
    align-items:center;
    /*justify-content和align-items是控制flex子项在flex容器里两个方向的对齐方式的*/
    /*这里paper是flex容器，只有一个子项content，因此把这两句话去掉也无变化*/
    padding:16px;
    /*注意，background不包括margin部分，所以如果这里写成margin，则content背后的黑色显示不出来*/
}
#paper>#content{
    background:white;
    height:100%;
    width:100%;
}
`
function writeCode(prefix,code,fn) {
    let domCode = document.querySelector('#code')
    var n = 0;
    var id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix+code.substring(0, n), Prism.languages.css, 'javascript');
        //substring用于提取位于两个下标之间的字符
        //prism库用于实现代码高亮功能
        //code.innerHTML = code.innerHTML.replace('html', '<span style="color:red;">html</span>')
        //要把html这四个字母变红，用上面style标签的方法无法实现
        //可将html替换成span标签，span标签带style属性
        //span标签写在html里会自动识别出，写在style里没用，所以在styleTag里没替换
        styleTag.innerHTML = prefix+code.substring(0, n)
        domCode.scrollTop=10000
        //每次代码有变动，就往下拉10000像素（最底部）
        //等于domCode.scrollHeight，也表示拉到最底部
        if (n >= code.length) {
            //注意，这里的code不是id为code的元素，而是result
            window.clearInterval(id)
            fn.call()
        }
    }, 0)
}

function writeMarkdown(markdown,fm){
    let domPaper = document.querySelector('#paper>#content')
    let n = 0;
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop=10000
        if (n >= markdown.length) {
            window.clearInterval(id)
            fm.call()
        }
    }, 0)
}

var result2 = `
#paper{
/*
* 接下来把markdown变成html-----marked.js
*/
/*
* 接下来给html加样式
*/
/*
* 这就是我会动的简历
* 谢谢观看
*/
}
`
var md=`
# 我的自我介绍
我叫崔洁豪
北京交通大学毕业
自学前端
# 技能介绍
熟悉 javascript/css/html
# 项目介绍
1.轮播
2.画板
3.简历
# 联系方式
手机 18813093147
`

writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,mdToHtml)
        })
    })
})

function mdToHtml(){
    document.getElementById('content').innerHTML =marked(document.getElementById('content').innerHTML);
    //marked是marked.js中的函数，将markdown转变为html
}


//fn2()
//注意，若fn2()写在writeCode的下面
//writeCode内有各id定时器，由于它有10ms的延时，所以应该先执行fn2，再执行id内的内容
//这是异步的雏形
//异步：“不等结果”直接进行下一步
//回调可以拿到异步的结果

//回调是拿到异步结果的一种方式
//回调也可拿到同步结果
//在这里，()=>{}这个就是回调（买到票给我打电话）

//var promise=$.get('/xxx')
//ajax就是一个异步，只承诺拿到这个东西，之后成功了...失败了...，只给你这个这个承诺，你接着往下执行
//promise.then(success,error)


function createPaper(fn) {
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content=document.createElement('pre')  
    //pre标签内的内容会保留换行，div不会保留
    content.id='content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

//fn3已经没用了
function fn3(preResult) {

    var n = 0
    var id = setInterval(() => {
        n += 1
        //code.innerHTML=code.innerHTML+result.substring(n-1,n)
        //code.innerHTML=Prism.highlight(code.innerHTML, Prism.languages.css, 'javascript');
        //第一段程序运行的结果经prism处理后已经有span标签（高亮用）了，再添加程序会错乱
        code.innerHTML = preResult + result.substring(0, n)
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'javascript')
        styleTag.innerHTML = preResult + result.substring(0, n)
        if (n >= result.length) {
            window.clearInterval(id)
        }
    }, 50)
}