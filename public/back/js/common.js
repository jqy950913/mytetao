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
if(location.href.indexOf("login.html") == -1){
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    success:function (data) {
      if(data.error === 400){
        //说明用户没有登录，跳转到登录页面
        location.href = "login.html";
      }
    }
  })
}
//二级分类显示隐藏功能
$('.child').prev().on('click',function(){
  $(this).next().slideToggle();
});
//侧边栏显示隐藏功能
$('.icon_menu').on('click',function(){
  $('.lt_aside').toggleClass('now');
  $('.lt_topbar').toggleClass('now');
  $('.lt_main').toggleClass('now');
})

//退出功能
$('.icon_logout').on('click',function(){
  $("#logoutModal").modal("show");
});

//给退出按钮注册事件, off:解绑所有的事件
$('.btn_logout').on('click',function(){
  $.ajax({
    type:'get',
    url:"/employee/employeeLogout",
    success:function(info){
      console.log(info);
      if(info.success){
        location.href="login.html";
      }
    }
  })
})
