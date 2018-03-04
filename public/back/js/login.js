/**
 * Created by Lenovo on 2018/3/3.
 */
$(function(){
  //1. 校验表单
  $('form').bootstrapValidator({

    //用户名,密码不能为空
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'长度应该在2~6位'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'长度应该在6~12位'
          }
        }
      }
    },
    //配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  });

  //2. 给表单注册一个校验成功的事件， 成功的时候阻止表单的默认提交，使用ajax进行。
  $('form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      type:'post',
      url:"/employee/employeeLogin",
      data: $("form").serialize(),
      dataType:'json',
      success:function (info) {
        console.log(info);
      }
    })
  })




});