/**
 * Created by Lenovo on 2018/3/6.
 */
$(function(){
  var page=1;
  var pageSize=5;

  //渲染列表和分页
  function render(){
    $.ajax({
      type:'GET',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('tpl',info));

        //渲染分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,p){
            page=p;
            render();
          }
        })
      }
    })
  }
  render();


  //添加分类功能
  $('.btn_add').on('click',function(){
    $('#firstModal').modal('show');
  });

  //初始化表单校验
  $('form').bootstrapValidator({
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'一级分类的名称不能为空'
          }
        }
      }
    }
  });


  //给表单注册校验成功的事件
  $('form').on("success.form.bv",function(e){
    //阻止表单默认提交
    e.preventDefault();
    //由ajax提交
    $.ajax({
      type:'POST',
      url:'/category/addTopCategory',
      data:$('form').serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          $('#firstModal').modal('hide');
          $('form').data('bootstrapValidator').resetForm(true);
          page=1;
          render();
        }
      }
    })
  })

})

