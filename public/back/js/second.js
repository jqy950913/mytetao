/**
 * Created by Lenovo on 2018/3/6.
 */
$(function() {
  var page = 1;
  var pageSize = 5;

  //分页和列表渲染
  function render() {
    $.ajax({
      type: 'GET',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info);
        $("tbody").html(template("tpl", info));

        //分页标签
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });
      }
    })
  }

  render()

  //1 点击添加分类，显示模态框, 加载一级分类的数据
  $('.btn_add').on('click', function () {
    $('#secondModal').modal('show');

    $.ajax({
      type: 'GET',
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html(template("tpl2", info));
      }
    });
  });

  //2. 给dropdown-menu下的所有的li添加功能
  $('.dropdown-menu').on('click','a',function(){
    var text =$(this).text();
    $('.dropdown_text').text(text);

    var id=$(this).parent().data('id');
    //console.log(id);

    $("[name='categoryId']").val(id);

    $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  });



  //3. 初始化图片上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done:function(e,data){
      var pic=data.result.picAddr;
      $('.img_box img').attr('src',pic);

      $('[name="brandLogo"]').val(pic);

      $('form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });

  //4. 表单校验功能
  var $form=$('form');
  $form.bootstrapValidator({
    //小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入品牌的名称'
          }
        }
      },
      brandLogo: {
        validators:{
          notEmpty:{
            message:'请上传品牌的图片'
          }
        }
      }
  },
    excluded:[]
  });

  //5. 添加二级分类
  $form.on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:"/category/addSecondCategory",
      data: $form.serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          $('#secondModal').modal('hide');
          page=1;
          render();

          $form.data('bootstrapValidator').resetForm(true);
          $(".dropdown_text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
        }
      }
    })
  })




})

