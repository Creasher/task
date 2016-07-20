/**
 * Created by 2015 on 2016/4/13.
 */


/*
模式匹配*/
var arr = [];
var valueIn = document.getElementById("seInput");
var valueArr;
var valueSplit;
var numQueue = document.getElementById("num-Queue");

function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g,"");
}
function initNum() {
    var flag = true;
    valueArr = trim(valueIn.value);
    valueSplit = valueArr.split(/,|，|、|\s/);

    if(valueArr==''){
        alert("请输入字符串！");
        valueIn.focus();
        flag=false;
    }
    return flag;
}
function leftIn() {
    if(arr.length==60){
        alert("最多只能60，已达上限！");
        return;
    }
    if(initNum()){
        for (var i=0;i<valueSplit.length;i++){
            arr.unshift(valueSplit[i]);
            // alert(value.value);
            render();
        }
        valueIn.value="";
    }
}
function rightIn() {
    if(arr.length==60){
        alert("最多只能60，已达上限！");
        return;
    }
    if(initNum()) {
        for (var i=0;i<valueSplit.length;i++) {
            arr.push(valueSplit[i]);
            render();
        }
        valueIn.value = "";
    }
}
function leftOut() {

    alert(arr.shift());
    render();
}
function rightOut() {

    alert(arr.pop());
    render();
}
function randomOut(event) {

    event = event||window.event;
    var target = event.target||event.srcElement;
    var index = target.getAttribute("id");
    if(target.tagName.toLowerCase()=="span") {

        // alert(target.tagName);
        alert(arr.splice(index, 1));
        render();
    }
    return 0;
}
function render() {

    var fragment = document.createDocumentFragment();
    numQueue.innerHTML="";
    for (var i=0;i<arr.length;i++){
        var value=arr[i];
        var node = document.createElement("span");
        node.innerText=value;
        node.id =i;
        fragment.appendChild(node);
        //创建一个虚拟节点
    }
    numQueue.appendChild(fragment);
}
function findValue() {

    var valueFind = document.getElementById("searchInput");
    var value = trim(valueFind.value);
    if(value==""){
        alert("请输入字符！");
        valueFind.focus();
    }
    var spanNode = numQueue.getElementsByTagName("span");
    var flag = false;
    if(spanNode.length==0){
        alert("请输入字符串！");
        valueIn.focus();
        return;
    }
    for (var i=0;i<arr.length;i++){
        // 返回指定的字符串值在字符串首次出现的位置
        if(arr[i].indexOf(value)!=-1){
             // alert(arr[i].indexOf(value));
            // alert(spanNode[i].innerHTML);
            spanNode[i].style.backgroundColor = "yellow";
            spanNode[i].style.color = "black";
            flag = true;
        }
    }
    if (false){
        alert("没有匹配的字符串！");
    }
}
function init(){

    document.getElementById("LI").onclick = leftIn;
    document.getElementById("RI").onclick = rightIn;
    document.getElementById("LO").onclick = leftOut;
    document.getElementById("RO").onclick = rightOut;
    numQueue.onclick = randomOut;
    document.getElementById("search").onclick = findValue;
    // document.getElementById("RT").click = rightIn;
    // document.getElementById("LO").click = leftOut;
    // document.getElementById("RO").click = rightOut;
}
init();
