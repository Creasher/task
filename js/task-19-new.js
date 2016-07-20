/**
 * Created by 2015 on 2016/4/7.
 */

/*
 模拟一个队列
 冒泡排序的可视化写法
 */
var arr=[];
var valueIn=document.getElementById("numInput");
var numQueue = document.getElementById("num-Queue");
var time = 10;
var timer;

function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g,"");
}
function initNum() {
    var flag = true;
    var value = trim(valueIn.value);
    var data=/[^0-9]/;//不是数字
    var data1 =/^[1-9][0-9]$|^100$/;
    //或者直接用<100  >10来判断
    if(value==''){
        alert("请输入数据！");
        valueIn.focus();
        flag=false;

    }
    else if (data.test(value)){
        alert("输入不合法，只能输入数字，请重新输入！");
        valueIn.value="";
        valueIn.focus();
        flag = false;

    }
    else if (!data1.test(value)){
        alert("输入不合法，只能输入10-100的数字，请重新输入！");
        valueIn.value="";
        valueIn.focus();
        flag = false;
    }
    return flag;

}
function leftIn() {
    if(arr.length==60){
        alert("最多只能60，已达上限！");

        return;
    }

    if(initNum()){
        arr.unshift(valueIn.value);
        // alert(value.value);
        render();
        valueIn.value="";
    }

}
function rightIn() {
    if(arr.length==60){
        alert("最多只能60，已达上限！");

        return;
    }
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
        alert(arr.splice(index, 1));
        render();
    }
    return 0;
}
function randomBuild() {
    clearInterval(timer);

    for(var i=0;i<60;i++){
        // alert(Math.ceil(Math.random() * 100));
        arr[i]=Math.ceil(Math.random() * 100);
    }
    render();
}
function render() {

    numQueue.innerHTML="";
    var fragment = document.createDocumentFragment();


    for (var i=0;i<arr.length;i++){
        var number=arr[i];
        var node = document.createElement("span");
        // node.innerText=number;
        node.id =i;
        node.title= number;
        node.style.height=number*8+"px";
        node.style.cursor = "pointer";
        fragment.appendChild(node);

        //创建一个虚拟节点
    }
    numQueue.appendChild(fragment);

}
//把排序过程用可视化方法表现出来
function renderSortG(a,b,c) {
    var dataBox=numQueue.getElementsByTagName("span");
    for (var i=0;i<arr.length;i++){

        if(i==a){
            dataBox[a].style.backgroundColor = "green";
            dataBox[b].style.backgroundColor = "green";
            if(c>0){
                for (var j=1;j<=c;j++){
                    dataBox[arr.length-j].style.backgroundColor="yellow";
                }
            }
        }
        else if(i!=b&&i<arr.length-c){

            dataBox[i].style.backgroundColor = "red";
        }
    }
}
function renderSortY(a,b,c) {
    var dataBox=numQueue.getElementsByTagName("span");
    if(a!=b){
        dataBox[a].style.height = arr[a]*8 + "px";//记得加上px
        dataBox[b].style.height = arr[b]*8 + "px";
        dataBox[a].style.backgroundColor = "yellow";
        dataBox[b].style.backgroundColor = "yellow";
    }
    else{
        if (c>0){
            for(var j=1;j<=c;j++){
                dataBox[arr.length-j].style.backgroundColor="yellow";
            }
        }
    }
}
function mSort() {
    // alert(arr.length);
    var i=0;
    var j=0;

    clearInterval(timer);
    timer = setInterval(function () {
        
        
        if (i<arr.length){
            if(j<arr.length-i-1){
                renderSortG(j,j+1,i);//做比较的2个颜色先变绿，其他的颜色为红色，除了最后已经确定的颜色是黄色以外。
                setTimeout(function () {
                    if (arr[j]>arr[j+1]){
                        var temp = arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                        renderSortY(j,j+1,i);
                    }
                    j++;
                },time/2);
            }//j=arr.length-i-1
            else{
                renderSortY(0,0,i);
                i++;
                j=0;
            }

        }//i=arr.length
        else{
            renderSortY(0,0,i);
            clearInterval(timer);
        }

    },time);
}
function init(){

    document.getElementById("LI").onclick = leftIn;
    document.getElementById("RI").onclick = rightIn;
    document.getElementById("LO").onclick = leftOut;
    document.getElementById("RO").onclick = rightOut;
    document.getElementById("sort").onclick = mSort;
    document.getElementById("random").onclick = randomBuild;
    document.getElementById("changeTime").onclick = function(){
        // alert(document.getElementById("timeInput").value);
        time = document.getElementById("timeInput").value;
    };
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
