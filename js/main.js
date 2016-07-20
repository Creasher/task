/**
 * Created by 2015 on 2016/3/28.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var key;
var value;
var aqitable=document.getElementById("aqi-table");
//去除头尾空格
function trim(s){
    return s.replace(/(^\s*)|(\s*$)/g,"");
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input");
    var value=document.getElementById("aqi-value-input");
    var flag = true;
    // key = city.value.trim();
    // data = value.value.trim();
    key=trim(city.value);
    data=trim(value.value);
    var keyReg=/[^\u4e00-\u9fa5a-zA-Z]/;
    var dataReg=/[^0-9]/;
    if(key==''){
        alert("请输入城市名称！");
        city.focus();
        flag = false;
        return;
    }
    if(data==''){
        alert("请输入指数！");
        value.focus();
        flag = false;
        return;
    }
    if(keyReg.test(key)){
        alert("输入城市名不合法，只能输入汉字和英文字母，请重新输入！");
        city.value="";
        city.focus();
        flag=false;
        return;
    }
    if(dataReg.test(data)){
        alert("输入指数不合法，只能输入整数，请重新输入！");
        value.value="";
        value.focus();
        flag=false;
        return;
    }
    if(flag){
        // aqiData.city=city;
        // aqiData.value=value;
        // document.write(aqiData.city);
        aqiData[key] = data;
        city.value="";
        value.value="";
    }
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    // var node=document.createElement("tr");
    var itemHTML= "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";

    for(var item in aqiData){
        itemHTML+="<tr><td>" + item + "</td><td>" + aqiData[item] + "</td><td><button> \
		删除 </button></td></tr>";
    }
    // node.innerHTML="<td>" + aqiData.key + "</td><td>" + aqiData[key] + "</td><td><button> \
    // 删除 </button></td>";
    aqitable.innerHTML=itemHTML;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    //参考别人代码，这里用到了JS事件委托
    // var delNode=this.parentNode;
    // aqitable.deletRow(delNode.rowIndex);
    // delete aqiData[delNode.rowIndex];

    aqitable.onclick = function(event){
        event = event||window.event;
        var target = event.target||event.srcElement;
        if(target.tagName.toLowerCase()=="button"){
            var delNode = target.parentNode.parentNode;
            // aqitable.deleteRow(delNode.rowIndex);
            //rowIndex返回某行在表盒的行集合中的位置索引
            // aqiData[delNode.rowIndex];
            var city = delNode.firstChild.innerHTML;
            delete aqiData[city];
            renderAqiList();
        }
    }
}

function init() {
    var btn = document.getElementById("add-btn");
    btn.onclick = addBtnHandle;

    // if(aqitable.getElementsByTagName("button")){
    // 	aqitable.getElementsByTagName("button").onclick = delBtnHandle;
    // }
    delBtnHandle();


    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}
window.onload = function(){
    init();
};