/**
 * Created by 2015 on 2016/4/7.
 */
/**
 * Created by 2015 on 2016/4/6.
 */
/*
 模拟一个队列
 冒泡排序的可视化写法
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

function render() {

    numQueue.innerHTML="";
    var fragment = document.createDocumentFragment();


    for (var i=0;i<arr.length;i++){
        var number=arr[i];
        var node = document.createElement("span");
        // node.innerText=number;
        node.id =i;
        node.title= number;
        node.style.height=number+"px";
        node.style.cursor = "pointer";
        fragment.appendChild(node);

        //创建一个虚拟节点
    }
    numQueue.appendChild(fragment);

}
//把排序过程用可视化方法表现出来
function renderSortG(a,b,c) {

    var dataBox=numQueue.getElementsByTagName("span");
        // dataBox[a].style.height=arr[a];
        // dataBox[b].style.height=arr[b];
    for(var i=0;i<arr.length;i++){
        if (i==a){
            dataBox[a].style.backgroundColor="green";
            dataBox[b].style.backgroundColor="green";
        }
        else
            if(c>0){
                for(var j=1;j<=c;j++){

                    dataBox[arr.length-j].style.backgroundColor="yellow";
                }
            }
        
    }

}
function renderSortY(a,b) {
    var dataBox = numQueue.getElementsByTagName("span");
    for (var i = 0; i < arr.length; i++) {
        if (i == a) {
            dataBox[a].style.height = arr[a];
            dataBox[b].style.height = arr[a];
            dataBox[a].style.backgroundColor = "yellow";
            dataBox[b].style.backgroundColor = "yellow";
        }
    }
}
function mSort() {
    // alert(arr.length);
    var j=0;
    var i=0;
    var timer;
    clearInterval(timer);
    timer = setInterval(function () {
        if(i<arr.length){
            if (j<arr.length-i-1) {
                renderSortG(j,j+1,i);
                setTimeout(function () {
                    if (arr[j] > arr[j+1]) {
                        var temp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                        // alert("1");
                        renderSortY(j,j+1);
                    }
                    else{
                        renderSortG(j,j+1);
                    }
                    j++;
                }, 50);

            }
            else{

                i++;
                j=i;
            }
        }
        else{
            clearInterval(timer);
        }
    },100);
}
function init() {
    document.getElementById("LI").onclick = leftIn;
    document.getElementById("RI").onclick = rightIn;
    document.getElementById("LO").onclick = leftOut;
    document.getElementById("RO").onclick = rightOut;
    document.getElementById("sort").onclick = mSort;
    

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