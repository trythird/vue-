<template>
    <!--<div class="page-search">
      <mt-search
              autofocus
              v-model="value"
              :result="filterResult">
      </mt-search>
    </div>-->
    <div id="box" v-cloak>
        <div class="search-ban">
            <input type="text" v-model='msg' @keyup="get" @keyup.down='selDown' @keyup.up='selUp'>
            <button style="display: none">搜索</button>
        </div>
        <ul>
            <li v-for='item in items'>{{item}}</li>
        </ul>
    </div>
</template>

<script>
  //搜索框
  //把商品数据从搜索框下方显示出来，当没有输入东西时候是显示历史数据，当显示了数据则输出包含输入内容的商品数据
  //商品数据包括商品图片，商品简介，商品价格
  //@change触发
  export default {
      name: 'page-search',
      data() {
          return {
              //存储需要显示找到的数据
              items:[],
              // 输入框输入数据
              msg:'',
              // 锁定当前的选择项索引
              cindex:-1,
             /* value: '',*/
              // 默认数据
            /*  defaultResult: [
                  'Apple',
                  'Banana',
                  'Orange',
                  'Durian',
                  'Lemon',
                  'Peach',
                  'Cherry',
                  'Berry',
                  'Core',
                  'Fig',
                  'Haw',
                  'Melon',
                  'Plum',
                  'Pear',
                  'Peanut',
                  'Other'
              ]*/
          };
      },
      methods: {
          //    输入字符的执行函数
          get(e) {
              console.log(e)
              // 上下键return，避免和下面的选择冲突
              if (e.keyCode == 40 || e.keyCode == 38) {
                  return;
              }
              //当按回车的时候，直接跳转到百度网页
              if (e.keyCode == 13) {
                  window.open('https://www.baidu.com/s?wd=' + this.msg);
                  this.msg = '';
              }
              window.baidu={};
              window.baidu.sug=function(json){
                  window.boomshakalaka(JSON.stringify(json));
              }
              this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?',
                   {
                       params: {
                           wd: this.msg
                       },
                       jsonpCallback : 'boomshakalaka'
              }, {
                  jsonp: 'cb'
              }).then(function (res) {
                  this.items = res.data.s;
              });
          },
          //   按下键
          selDown() {
              this.cindex++;
              // 当当前索引和数据长度相等的时候，重新赋值
              if (this.cindex == this.items.length) {
                  this.cindex = 0;
              }
              this.msg = this.items[this.cindex];
          },
          //   按上键
          selUp() {
              this.cindex--;
              if (this.cindex <= -1) {
                  this.cindex = this.items.length - 1;
              }
              this.msg = this.items[this.cindex];
          }
          },

      computed: {
          filterResult() {
              return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
          }
      }
  };
</script>

<style lang="css">
  .page-search {
    height: 100%;
  }

</style>
