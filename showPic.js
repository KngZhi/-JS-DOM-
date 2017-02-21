function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title"): "";
    if (placeholder.firstChild.nodeType == 3){
        description.firstChild.nodeValue =text;
    }
    var source = whichpic.getAttribute("href"); //whichpic是元素节点，通过 getAtt 将元素节点的 href 存入变量 source
    var placeholder = document.getElementById("placeholder");//获取占位符的地址并存入变量 placeholder
    placeholder.setAttribute("src",source);//setAtt()中第一个是属性名，第二个是属性的值。属性的值已经保存到 source 中，即获得节点的 href
    if (!document.getElementById("description")) {
        var text = whichpic.getAttribute("title");//将节点的物品保存进text 变量中
        var description = document.getElementById("description");//找到你需要的盒子
        description.firstChild.nodeValue = text;//见你找到的 title 放入你找到的盒子的第一个子节点
    } return true; // to report that the function executed successfully
}


function popUp(winURL) {
    window.open(winURL, "popup", "width=320,height=480");
}

//window.onload = prepareLinks;//该事件处理函数是指当 HTML 文档全部加载完毕，执行 prepareLinks 代码。
function prepareLinks() {
    if (!document.getElementByTagName) return false;//如果不支持 get 这个方法，请离开。
    var links = document.getElementByTagName("a");
    for (var i=0; i<links.length; i++) {
        if (links[i].getAttribute("class") == "popup") {
            links[i].onclick = function() {
                popUp(this.getAttribute("href"));
                return false;
            }
        }
    }
}

/*
* 1. 检查浏览器是否支持 getElementByTagName 行为本身.
* 2. 检查浏览器是否支持 getElementById 行为本身.
* 3. 检查结果是否存在一个元素的 ID 叫 imagegallery.
* 4. 将所有在 imagegallery ele 中的链接 loop through
* 5. 设置被点击时的 onclick 事件，以及接下来的步骤
*    1. 该链接呗传递到 showPic 函数。
*    2. 默认行为被取消所以链接不会被跟随。
*/

function prepareGallery() {
    if (!document.getElementByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementByTagName("a");//loop through all the links in the imagegallery ele.
    for (var i=0; i<links.length; i++) {
        links[i].onclick = function() {
            return showPic(this) ? true : false;//在返回前验证 showPic 的返回值，以便决定是否阻止默认行为，如果 showPic返回 true 则更新 placeholder，否则允许默认行为；
        }
    }
}

/* 只设置了函数是不起作用的，原因在于
>If the JavaScript is executed before the
document has finished loading, the Document Object Model will be incomplete. By the third line of the function (the test for the existence of imagegallery), things won’t go according to plan.
*/

/*
* 1. When the page loaded then execute the function
* 2. A workaround : If I got two function need executed when page loads, I can't `window.on load = function` both, because only the last function will actually be executed
*/

/*
* A workaround:
* - It stores the existing window.onload as a variable called oldonload.
* - If this hasn't yet had a function attached to it, addLoadEvent simply adds the new function in the usual way.
* - If there is already a function attached, addLoadEvent adds the new function after the existing instructions.
*/

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(prepareGallery);
addLoadEvent(prepareLinks);
