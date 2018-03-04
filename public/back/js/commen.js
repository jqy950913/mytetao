/**
 * Created by Lenovo on 2018/3/3.
 */
$(function(){
  //禁用进度环
  NProgress.configure({
    showSpinner: false
  })

  $(document).ajaxStart(function(){
    NProgress.start();
  });

  $(document).ajaxStop(function(){
    NProgress.done();
  },500)
})
//非登陆页面，判断当前用户是否是登录了，如果登录了，就继续，如果没登陆，需要跳转到登录页面。
if(location.href.indexOf('login.html') == -1){
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin"',
    success:function(info){
      if(data.error===400){
        location.href="login.html";
      }
    }
  })
}
//二级分类显示隐藏功能
