
//关闭微信浏览器
function wxClose() {
    wx.closeWindow();
}


//实物领取
function opwinMask(){
    var name = $("#materialObject_name").val();
    var userCard = $("#materialObject_idCart").val();
    var phone = $("#materialObject_phone").val();
    var address = $("#materialObject_address").val();
    var province = $("#province option:selected").val();
    var city = $("#city option:selected").val();
    var provinceTxt = $("#province option:selected").text();
    var cityTxt = $("#city option:selected").text();
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(name == null || name == ""){
        layer.msg("请输入您的真实姓名");
        return false;
    }
    if(userCard == null || userCard == ""){
        layer.msg("请输入您的身份证号");
        return false;
    }
    if (!pattern.test(userCard)) {
        layer.msg("请输入正确的身份证号");
        return false;
    }
    if(phone == null || phone == ""){
        layer.msg("请输入您的手机号");
        return false;
    }
    if (!myreg.test(phone)) {
        layer.msg("请输入正确的手机号");
        return false;
    }
    if(province == null || province == ""){
        layer.msg("请选择省份");
        return false;
    }
    if(city == null || city == ""){
        layer.msg("请选择城市");
        return false;
    }
    if(address == null || address == ""){
        layer.msg("请输入您的地址");
        return false;
    }
    var opwinLayer = layer.load(1);
    $.ajax({
        type:"post",
        url:apiUrl+"/ajax/userAjaxController/cashPrize",
        data:{
            sign:sign,
            name:name,
            userCard:userCard,
            phone:phone,
            address:provinceTxt + cityTxt +address,
            longitude:longitude,
            latitude:latitude,
            userId:userId
        },
        success:function(data){
            console.log(data);
            layer.close(opwinLayer);
            if(data.resultCode == 0){
            	$(".shuru").hide();
				$("#name").text($("#materialObject_name").val())
				$("#phone").text($("#materialObject_phone").val())
				$("#userId").text($("#materialObject_idCart").val())
				$("#address").text($("#province option::selected").text()+$("#city option::selected").text()+$("#materialObject_address").val())
				$(".queding").show();
            }else{
                layer.msg(data.resultMessage);
            }
        },
        error:function(data){
            layer.close(opwinLayer);
            location.href = "result.html?type=5";
        }
    });
}
//发送验证码
var sendLoad = true;
function sendCode(obj){
    var obj = $(obj);
    if(sendLoad == true){
        sendLoad = false;
        var cash_phone = $("#cash_phone").val();
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(cash_phone == null || cash_phone == ""){
            layer.msg("请输入您的手机号码");
            sendLoad = true;
            return false;
        }
        if (!myreg.test(cash_phone)) {
            layer.msg("请输入正确的手机号");
            sendLoad = true;
            return false;
        }
        var cashLayer = layer.load(1);
        $.ajax({
            type:"post",
            url:apiUrl+"/ajax/userAjaxController/smsCode",
            data:{
                sign:sign,
                phone:cash_phone,
                userId:userId
            },
            success:function(data){
                console.log(data);
                layer.close(cashLayer);
                if(data.resultCode == 0){
                    var s = 60;
                    var timer = setInterval(function(){
                        if(s > 0){
                            s--;
                            obj.text("("+s+")");
                        }else{
                            s = 60;
                            obj.text("获取验证码");
                            sendLoad = true;
                            clearInterval(timer);
                        }
                    }, 1000);
                }else{
                    layer.msg(data.resultMessage);
                }
            },
            error:function(){
                layer.close(cashLayer);
                location.href = "result.html?type=5";
            }
        });
    }
}
//校验验证码
function exchangeBag(){
    var name = sessionStorage.getItem("name");
    var len = $("#haveMobel").length;
    if(len < 1){
        layer.msg("恭喜您！领取成功");
        setTimeout(function(){
            location.href = "games.html?name="+name;
        },1500);
        return false;
    }
    var cash_phone = $("#cash_phone").val();
    var cash_code = $("#cash_code").val();
    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
    if(cash_phone == null || cash_phone == ""){
        layer.msg("请输入您的手机号码");
        return false;
    }
    if (!myreg.test(cash_phone)) {
        layer.msg("请输入正确的手机号");
        return false;
    }
    if(cash_code == null || cash_code == ""){
        layer.msg("请输入手机验证码");
        return false;
    }
    var exchangeLayer = layer.load(1);
    $.ajax({
        type:"post",
        url:apiUrl+"/ajax/userAjaxController/exchangeBag",
        data:{
            sign:sign,
            phone:cash_phone,
            code:cash_code,
            longitude:longitude,
            latitude:latitude,
            userId:userId
        },
        success:function(data){
            console.log(data);
            layer.close(exchangeLayer);
            if(data.resultCode == 0){
                layer.msg("恭喜您！领取成功");
                setTimeout(function () {
                    $('#success').hide();
                    $('#tip').show();
                },1500)
            }else{
                layer.msg(data.resultMessage);
            }
        },
        error:function(data){
            layer.close(exchangeLayer);
            location.href = "result.html?type=5";
        }
    });
}

window.onload = function(){
    audioAutoPlay("musicid");
};

function audioAutoPlay(id){
    var audio = document.getElementById("musicid");
    var play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
    // console.log(audio);
    // audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}

