/**
 * Created by HUCC on 2018/3/7.
 */
$(function () {

  //约定：search_list


  //列表渲染功能
  //1. 从本地缓存中获取到需要渲染的数据

  //希望这个函数无论如何都能返回一个数组，如果没有记录，返回一个[]
  function getHistory() {
    var history = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse(history);
    return arr;
  }

  function render() {
    var arr = getHistory();
    //console.log(arr);
    //2. 结合模版引擎渲染数据。
    $(".lt_history").html( template("tpl", {arr:arr}) );
  }

  render();





  //功能二：清空
  //1. 给清空按钮注册点击事件(委托)
  //2. 清空 search_list 这个值
  //3. 重新渲染
  $(".lt_history").on("click", ".btn_empty", function () {
    localStorage.removeItem('search_list');

    //弹出一个确认框
    mui.confirm("你确定要清空所有的历史记录吗？","温馨提示", ["是", "否"], function (e) {
      //通过e.index就可以知道点击了那个按钮
      if(e.index === 0){
        //删除缓存
        localStorage.removeItem('search_list');

        //重新渲染
        render();
      }

    });


  });




  //功能3：删除
  //1. 给删除按钮注册点击事件
  //2. 获取到删除的下标
  //3. 获取到web存储中的数组
  //4. 删除数组中对应下标那项
  //5. 重新设置search_list的值
  //6. 重新渲染。
  $(".lt_history").on("click", ".btn_delete", function () {
    var that = this;

    mui.confirm("你确定要删除这条历史记录吗?", "温馨提示", ["删了吧", "还是别"], function (e) {
      if(e.index===0){
        //下标
        var index = $(that).data("index");

        //数组
        var arr = getHistory();

        //删除数组的对应下标项
        arr.splice(index, 1);

        //重新设置
        //stringify  ify:化
        localStorage.setItem("search_list", JSON.stringify(arr) );

        //重新渲染
        render();
      }
    })



  });




  //功能4： 增加
  //1. 给搜索按钮注册事件
  //2. 获取到文本框value值
  //3. 获取到存储中的数组
  //4. 把value值添加到数组中的最前面
  //5. 重新设置search_list的值
  //6. 重新渲染 （跳转到搜索详情页）
  $(".lt_search button").on("click", function () {

    var value = $(".lt_search input").val().trim();
    $(".lt_search input").val('');
    if(value == "") {
      mui.toast("请输入搜索关键字");
      return;
    }

    //数组
    var arr = getHistory();


    //把value添加到数组的最前面
    //需求1：数组长度不能过10
    //需求2：如果这个搜索关键字已经存在，需要删除掉
    //获取value在数组中的位置
    var index = arr.indexOf(value);
    if(index != -1){
      //干掉它
      arr.splice(index, 1);
    }

    if(arr.length >= 10) {
      //删除数组的最后一项
      arr.pop();
    }

    arr.unshift(value);

    //重新设置search_list
    localStorage.setItem("search_list", JSON.stringify(arr));

    //重新渲染, 需要跳转到searList页面
    //render();
    location.href = "searchList.html?key="+value;


  });


});