function showPic(whichpic) {
    var source = whichpic.getAttribute("href"); //whichpic是元素节点，通过 getAtt 将元素节点的 href 存入变量 source
    var placeholder = document.getElementById("placeholder");//获取占位符的地址并存入变量 placeholder
    placeholder.setAttribute("src",source);//setAtt()中第一个是属性名，第二个是属性的值。属性的值已经保存到 source 中，即获得节点的 href
    // var text = whichpic.getAttribute("title");
    // var description = document.getElementById("description");
    // description.firstChild.nodeValue = text;
}
