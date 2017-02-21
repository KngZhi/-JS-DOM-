function showPic(whichpic) {
    var source = whichpic.getAttribute("href"); //whichpic是元素节点，通过 getAtt 将元素节点的 href 存入变量 source
    var placeholder = document.getElementById("placeholder");//获取占位符的地址并存入变量 placeholder
    placeholder.setAttribute("src",source);//setAtt()中第一个是属性名，第二个是属性的值。属性的值已经保存到 source 中，即获得节点的 href
    var text = whichpic.getAttribute("title");//将节点的物品保存进text 变量中
    var description = document.getElementById("description");//找到你需要的盒子
    description.firstChild.nodeValue = text;//见你找到的 title 放入你找到的盒子的第一个子节点
}

function popUp(winURL) {
    window.open(winURL, "popup", "width=320,height=480");
}

window.onload = prepareLinks;//该事件处理函数是指当 HTML 文档全部加载完毕，执行 prepareLinks 代码。
function prepareLinks() {
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
