/**
 * Created by Lenovo on 2018/3/4.
 */
$(function(){
  //发送ajax请求，获取用户数据，渲染到页面中
  var page=1;
  var pageSize=5;

  function render(){
    $.ajax({
      type:'GET',
      url:'/user/queryUser',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('tmp',info));

        //6. 渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          numberOfPages:5,
          onPageClicked:function(a,b,c,p){
            page=p;
            render();
          }
        });
      }
    })
  }
  render();

  //启用禁用用户
  $('tbody').on('click','.btn',function(){
    //显示模态框
    //$('#userModal').modal("show");
    //显示模态框
    $("#userModal").modal("show")

    //获取到点击的按钮所在的用户的id
    //var id=$(this).
  })
})