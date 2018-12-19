// const apiUrl = "http://h.hzksf.cn/labF";
const apiUrl = "http://k.ksf8.cn/f";
let url = window.location.href;

function indexRedict() {
    $.ajax({
        type:"post",
        url:apiUrl+"/a/login",
        async:true,
        data:{
            co:getUrlParam("co")
        }
        ,success:function(data){
            console.log(data);
            if(data.resultCode == 0){
             location.href = data.resultData;
            }
        }
    });
}

function userCenterRedict() {
    $.ajax({
        type:"post",
        url:apiUrl+"/ajax/game/login",
        async:true,
        data:{
            path:url
        }
        ,success:function(data){
            console.log(data);
            if(data.resultCode == 0){
             location.href = data.resultData;
            }
        }
    });
}

let latitude = ""; // 纬度
let longitude = ""; // 经度
let sign = sessionStorage.getItem("name");
let userId = sessionStorage.getItem("userId");
$.ajax({
    type:"post",
    url:apiUrl+"/ajax/userAjaxController/shareWx",
    data:{
        url:url
    },
    success:function(data){
        console.log(data);
        if(data.resultCode == 0){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                // appId: 'wx42d75087d442fdf4', // 必填，公众号的唯一标识
                appId: 'wx5af9674cd514ffab', // 必填，公众号的唯一标识
                timestamp: '1465296399', // 必填，生成签名的时间戳
                nonceStr: '1846399426', // 必填，生成签名的随机串
                signature: data.resultData,// 必填，签名，见附录1
                jsApiList:  ['onMenuShareAppMessage','onMenuShareTimeline','getLocation','hideAllNonBaseMenuItem','closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }else{
            layer.msg(data.resultMessage);
        }
    },
    error:function(data){
        layer.msg("系统繁忙,请稍后再试");
    }
});

wx.ready(function(){
    console.log("http://"+document.domain+"/web/images/share.png");
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
            console.log(res);
            latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        }
    });
    wx.hideAllNonBaseMenuItem();
});

//获取url中的参数
function getUrlParam(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}