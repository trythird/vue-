<template>
    <div class="search">
    <div class="page-search">
      <mt-search
              autofocus
              v-model.trim="value"
      >
      </mt-search>
    </div>
        <div class="search-list-box">
    <router-link  :to="'/home/goodsinfo/'+ item.id" tag="div" v-for="item in searchlist" class="search-list"  :key="item.id">
    <img :src="item.img_url" alt="" />
        <div class="title-box">
    <h1 class="title">{{ item.title }}</h1>
            <p class="price">
                <span class="now">￥{{ item.sell_price }}</span>
                <span class="old">￥ {{ item.market_price }}</span>
            </p>
        </div>
    </router-link>
        <mt-button  type="danger" size="large" @click="getMore">更多商品</mt-button>
    </div>
    </div>

</template>

<script>
  //搜索框
  //把商品数据从搜索框下方显示出来，当没有输入东西时候是显示历史数据，当显示了数据则输出包含输入内容的商品数据
  //商品数据包括商品图片，商品简介，商品价格
  //@change触发
  // 节流函数
  const delay = (function() {
      let timer = 0;
      return function(callback, ms) {
          clearTimeout(timer);
          timer = setTimeout(callback, ms);
      };
  })();
  export default {
      watch: {
          //watch title change
          value() {
              delay(() => {
                  this.search();
                  if(this.value === ""){
                      this.searchlist = this.showlist;
                      console.log("hhh")
                  }
              }, 300);

          },
      },
      name: 'page-search',
      data() {
          return {
              //存储需要显示找到的数据
              items:[],
              // 输入框输入数据
              msg:'',
              // 锁定当前的选择项索引
              id:0,
              value: '',
              pageindex:1,
              // 默认数据
             searchlist: [],
              showlist:[],
          };
      },
      created(){
          this.getGoodsList();
      },
      methods: {
          //    输入字符的执行函数
          async search() {
               const o = this.showlist;
              const v = this.value;
              this.searchlist = [];
              for(let i=0; i< o.length; i++)
              {
               if(o[i].title.search(v) !== -1){
                 this.searchlist.push(o[i])
               }
           };
          },
          getGoodsList(){
              // 获取商品列表
              this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                  if(result.body.status === 0 ){
                      this.searchlist = this.searchlist.concat(result.body.message);
                      this.showlist = this.showlist.concat(result.body.message);
                  }
              })
          },
          getMore(){
              this.pageindex++;
              this.getGoodsList();
              this.search();
              this.search();
          },
          },
  };
</script>

<style lang="css" scoped>
    .search-list {
        padding: 0 15px;
        height: 100px;
        border-bottom: 1px solid #cccccc;
    }
    img{
  height: 80px;
      float: left;
      padding-top: 10px;
        padding-right: 10px;
    }
        .title-box {
            height: 80px;
        }

    h1{
        padding-top: 10px;
        font-size: 15px;
        height: 40px;
        margin-bottom: 20px;
    }
    .price {
        font-size: 16px;
        color: red;
        font-weight: bold;
        padding-bottom: 20px;
        height: 30px;
    }
        .old{
            padding-left: 30px;
            text-decoration: line-through;
        }

</style>
