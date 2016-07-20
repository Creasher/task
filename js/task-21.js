/**
 * Created by 2015 on 2016/4/21.
 */
function inPut(queue,howIn,value){
    var arr = [];
    var valueIn = value;
    var valueArr;
    var valueSplit;
    var numQueue = queue;

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
    function rightIn() {
        for(var i =0;i<arr.length;i++){
            if(valueArr==arr[i]){
                valueIn.value = "";
                return;
            }
        }
        if(arr.length==10){
            alert("最多只能10，已达上限,自动删除最前面的元素！");
            arr.shift();
        }
        if(initNum()) {
            for (var i=0;i<valueSplit.length;i++) {
                arr.push(valueSplit[i]);
                render();
            }
            valueIn.value = "";
        }
    }

    function tagIn(event) {
        var keyCode = event.keyCode;
        if(keyCode==13||keyCode==188||keyCode==32){
            if(arr.length==10){
                alert("最多只能10，已达上限,自动删除最前面的元素！");
                arr.shift();
            }
            arr.push(valueIn.value);
            render();
        }
        
    }

    function randomOut(event) {

        event = event||window.event;
        var target = event.target||event.srcElement;
        var index = target.getAttribute("id");
        if(target.tagName.toLowerCase()=="li") {

            // alert(target.tagName);
            alert(arr.splice(index, 1));
            render();
        }
        return 0;
    }

    function deleteOr(event){
        event = event||window.event;
        var target = event.target||event.srcElement;
        var index = target.getAttribute("id");
        if(target.tagName.toLowerCase()=="li") {
            target.innerText = "点击删除"+arr[index];
        }
        target.addEventListener("click",randomOut,false);

    }

    function render() {

        var fragment = document.createDocumentFragment();
        numQueue.innerHTML="";
        for (var i=0;i<arr.length;i++){
            var value=arr[i];
            var node = document.createElement("li");
            node.innerText=value;
            node.id =i;
            fragment.appendChild(node);
            //创建一个虚拟节点
        }
        numQueue.appendChild(fragment);
    }

    function init(){
        var getIn = function (){
            if(howIn ==enter){
                value.onkeyup = handler;

            }
            else{
                howIn.onclick =handler;
            }
        };
        var handler = function (event) {
            switch(event.type){
                case "click":
                    rightIn();
                    break;
                case "keyup":
                    tagIn();
                    break;
            }

        };
        getIn();
        numQueue.onmouseover = deleteOr;
        // numQueue.onclick = randomOut;
    }
    init();

}
