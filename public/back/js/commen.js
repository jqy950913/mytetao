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