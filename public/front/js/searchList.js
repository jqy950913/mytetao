/**
 * Created by HUCC on 2018/3/7.
 */
$(function () {

  //功能一：将地址栏中的key属性放到input框
  var key = getSearch("key");
  $(".lt_search input").val(key);

  //发送ajax请求，获取关键字对应的商品，渲染出来
  function render(){

    $(".product").html('<div class="loading"></div>');

    var param = {};

    //必须传递
    param.page = 1;
    param.pageSize = 100;
    //proName就是文本框的值
    param.proName = key;

    //对于price与num两个参数不一定要加
    //判断价格是否有now这个类，如果有now这个类，就需要传递price
    //判断库存是否有now这个类，如果有now这个类，就需要传递num
    //如果确定值：1 升序   2 降序

    //获取lt_sort下有没有now这个类的a
    var temp = $(".lt_sort a.now");
    if(temp.length > 0) {
      //说明需要排序,获取到了排序的名字
      var sortName = temp.data("type");

      //根据箭头来确定传递的具体的值。判断temp下的span是否有fa-angle-down这个类
      var sortValue = temp.find("span").hasClass("fa-angle-down")?2:1;

      //把sortName与sortValue添加给param
      param[sortName] = sortValue;

    }


    $.ajax({
      type: 'get',
      url: "/product/queryProduct",
      data: param,
      success:function (info) {

        setTimeout(function () {
          console.log(info);
          $(".product").html( template("tpl", info) );
        }, 1000);

      }
    })
  }

  render();


  //功能二：点击搜索按钮
  //1. 直接获取到input框中的value值
  //2. 再次发送ajax请求。
  $(".lt_search button").on("click", function () {
    //把所有的a的now全部干掉，并且把a的箭头全部向下
    $(".lt_sort a").removeClass("now").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");

    key = $(".lt_search input").val();
    render();


    var arr = JSON.parse( localStorage.getItem("search_list") || '[]' );
    var index = arr.indexOf(key);
    if(index != -1){
      //干掉它
      arr.splice(index, 1);
    }
    if(arr.length >= 10) {
      //删除数组的最后一项
      arr.pop();
    }
    arr.unshift(key);

    localStorage.setItem("search_list", JSON.stringify(arr));


  });



  //功能三：排序功能
  //1. 给lt_sort下的a注册点击事件
  //2. 判断点击的a是否有now这个类，
  // 如果没有,加上now这个类，并且删除其他a的类, 让所有的箭头都向下
  // 如果有，改变这个a下的span的箭头方向
  $(".lt_sort a[data-type]").on("click", function () {

    var $this = $(this);

    if($this.hasClass("now")) {

      //fa-angle-down  fa-angle-up
      $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");

    }else {
      $this.addClass("now").siblings().removeClass("now");
      $(".lt_sort span").removeClass("fa-angle-up").addClass("fa-angle-down");

    }


    render();



  });


});