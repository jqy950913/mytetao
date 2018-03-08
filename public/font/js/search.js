/**
 * Created by Lenovo on 2018/3/5.
 */
  $(function(){
    function getHistory(){
      var history=localStorage.getItem("search_list") || "[]";
      var arr=JSON.parse(history);
      return arr;
    }
    function render(){
      var arr= getHistory();
      console.log(arr);

      $('.lt_history').html(template("tpl",{arr:arr}));

    }
   render();


    //清空
    $(".lt_history").on("click", ".btn_empty", function () {
      localStorage.removeItem('search_list');

      mui.confirm("你确定要清空所有的历史记录吗？","温馨提示", ["是", "否"], function (e) {
        //通过e.index就可以知道点击了那个按钮
        if (e.index === 0) {
          //删除缓存
          localStorage.removeItem('search_list');

          render();
        }
      })
    });

    //功能3：删除
    $('.lt_history').on('click','.btn_delete',function(){
      var that=this;
      mui.confirm("你确定要删除这条历史记录吗?", "温馨提示", ["删了吧", "还是别"], function (e) {
       if(e.index===0){
         var index=$(that).data('index');

         var arr=getHistory();

         arr.splice(index,1);

         localStorage.setItem("search_list", JSON.stringify(arr) );
         render();
       }
      })

    });

    //功能4： 增加
    $(".lt_search button").on("click", function () {
      var value=$('.lt_search input').val().trim();
      $('.lt_search input').val("");
      if(value == "") {
        mui.toast("请输入搜索关键字");
        return;
      }

      var arr=getHistory();
      //把value添加到数组的最前面
      //需求1：数组长度不能过10
      //需求2：如果这个搜索关键字已经存在，需要删除掉
      //获取value在数组中的位置
      var index=arr.indexOf(value);
      if(index!=-1){
        arr.splice(index,1);
      }
      if(arr.length>=10){
        arr.pop();
      }
      arr.unshift(value);

      localStorage.setItem("search_list",JSON.stringify(arr));
      render();
    })






  })

