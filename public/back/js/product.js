/**
 * Created by Lenovo on 2018/3/6.
 */
$(function() {
  var page = 1;
  var pageSize = 5;
  var result=[];

  //分页和列表渲染
  function render() {
    $.ajax({
      type: 'GET',
      url: '/product/queryProductDetailList',
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

  //1 点击添加分类，显示模态框, 加载二级分类的数据
  $('.btn_add').on('click', function () {
    $('#secondModal').modal('show');

    $.ajax({
      type: 'GET',
      url: "/category/querySecondCategoryPaging",
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

    var id=$(this).data('id');
    //console.log(id);

    $("[name='brandId']").val(id);

    $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });



  //3. 初始化图片上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done:function(e,data){

      if(result>=3){
        return;
      }
      var pic=data.result.picAddr;
      $('.img_box').append('<img src="'+pic+'" width="100" height="100" alt="">');

      //将结果保存到数组中
      result.push(data.result);
      if(result.length===3){
        $("form").data("bootstrapValidator").updateStatus("productLogo", "VALID");
      }else {
        //让某个字段校验失败
        $("form").data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }

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
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择品牌'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc: {
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num: {
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入一个有效的商品库存"
          }
        }
      },
      size:{
        validators:{
          //非空
          notEmpty:{
            message:"请输入商品尺码"
          },
          //要求：2位数字-2位数字
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入一个合法的尺码（例如32-44）"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          }
        }
      },
      productLogo: {
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
  },
    excluded:[]
  });

  //5. 给表单注册一个校验成功的事件
  $form.on("success.form.bv",function(e){
    e.preventDefault();

    var param = $form.serialize();

    param += "&picName1="+result[0].picName + "&picAddr1="+result[0].picAddr;
    param += "&picName2="+result[1].picName + "&picAddr2="+result[1].picAddr;
    param += "&picName3="+result[2].picName + "&picAddr3="+result[2].picAddr;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data: param,
      success:function(info){
        console.log(info);
        if(info.success){
          $('#secondModal').modal('hide');
          page=1;
          render();

          $form.data('bootstrapValidator').resetForm(true);
          $(".dropdown_text").text("请选择二级分类");
          $(".img_box img").remove();
        }
      }
    })
  })




})

