/**
 * Created by 2015 on 2016/4/6.
 */
/*
模拟一个队列
关于插入删除，创建标签节点之类的操作可以考虑用getAttribute()，appendChild(),innerHTML,removeChild() insertBefore(),
search(),indexOf()
等方法考虑。
*/
var arr=[];
var valueIn=document.getElementById("numInput");
var numQueue = document.getElementById("num-Queue");

function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g,"");
}
function initNum() {
    var flag = true;
    var value = trim(valueIn.value);
    var data=/[^0-9]/;
    if(value==''){
        alert("请输入数据！");
        valueIn.focus();
        flag=false;

    }
    if (data.test(value)){
        alert("输入不合法，只能输入数字，请重新输入！");
        valueIn.value="";
        valueIn.focus();
        flag = false;

    }
   return flag;

}
function leftIn() {
    if(initNum()){
        arr.unshift(valueIn.value);
        // alert(value.value);
        render();
        valueIn.value="";
    }

}
function rightIn() {
    if(initNum()) {
        arr.push(valueIn.value);
        render();
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
        arr.splice(index, 1);
        render();
    }

    return 0;

}
function render() {

    var fragment = document.createDocumentFragment();

    numQueue.innerHTML="";
    for (var i=0;i<arr.length;i++){
        var number=arr[i];
        var node = document.createElement("span");
        node.innerText=number;
        node.id =i;
        fragment.appendChild(node);

        //创建一个虚拟节点
    }
    numQueue.appendChild(fragment);

}
function init(){


    document.getElementById("LI").onclick= leftIn;
    document.getElementById("RI").onclick= rightIn;
    document.getElementById("LO").onclick= leftOut;
    document.getElementById("RO").onclick= rightOut;
    // numQueue.onclick = function (event) {
    //     randomOut(event);
    //
    // };
     numQueue.onclick = randomOut;

    // document.getElementById("RT").click = rightIn;
    // document.getElementById("LO").click = leftOut;
    // document.getElementById("RO").click = rightOut;
}
init();