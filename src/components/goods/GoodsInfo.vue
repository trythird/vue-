<template>
    <div class="goodsinfo-container">
      <!--  购物车小球  -->
        <transition @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
<div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
       <!-- 商品轮播图区域  -->
        <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
            </div>
        </div>
    </div>
      <!--  商品购买区域  -->
        <div class="mui-card">
            <div class="mui-card-header">{{  goodsinfo.title  }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
<p class="price">
    市场价：<del>￥{{  goodsinfo.market_price  }}</del>&nbsp;&nbsp;
    销售价：<span class="now_price">￥{{  goodsinfo.sell_price  }}</span>
</p>
                    <p class="font-buy">购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                </div>
                    <p class="button-buy">
                        <mt-button type="primary" size="small">立刻购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>

        <!--  商品参数区域  -->
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号：{{ goodsinfo.goods_no  }}</p>
                <p>库存情况：{{  goodsinfo.stock_quantity  }}件</p>
                <p>上架时间：{{  goodsinfo.add_time | dateFormat}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" size="large" @click="goDesc(id)">图文介绍</mt-button>
            <mt-button type="danger" size="large" @click="goComment(id)">商品评论</mt-button>
        </div>
    </div>
    </div>
</template>

<script>
    import swiper from "../subcomponents/swiper.vue";
    import numbox from "../subcomponents/goodsinfo_numbox.vue";
    export default {
data(){
    return{
id: this.$route.params.id, //将路由参数对象中的id挂载到data上，方便后期调用
        lunbotu:[],//轮播图的数据
        goodsinfo:{},//获取到的商品的信息
        ballFlag:false,//控制小球的隐藏和显示的标识符
        selectedCount:1,//保存用户选中的商品数量，默认为1
    }
},
        created(){
    this.getLunbotu();
    this.getGoodsInfo();
        },
        methods:{
    getLunbotu(){
      this.$http.get('api/getthumimages/'+ this.id).then(result=>{
          if(result.body.status === 0){
              //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中，只认识item.img，不认识img.src
              result.body.message.forEach(item=>{
                  item.img = item.src;
              });
              this.lunbotu = result.body.message;
          }
      })
    },
            getGoodsInfo(){
        this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
            if(result.body.status === 0){
this.goodsinfo = result.body.message[0];
            }
        })
            },
            goDesc(id){
        //点击使用编程式导航跳转到图文介绍页面
           this.$router.push({ name:"goodsdesc",params:{ id } });
            },
            goComment(id){
                //点击使用编程式导航跳转到评论页面
                this.$router.push({ name:"goodscomment",params:{ id } });
            },
            addToShopCar(){
        this.ballFlag = !this.ballFlag;
        //拼接出一个，要保存到store中car数组里的商品信息对象
        var goodsinfo = {
            id:this.id,
            count:this.selectedCount,
            price:this.goodsinfo.sell_price,
            selected:true
        }
                // 调用 store 中的 mutations 来将商品加入购物车
                this.$store.commit("addToCar", goodsinfo);
            },
            beforeEnter(el){
el.style.transform= "translate(0,0)";
            },
        enter(el,done) {
el.offsetWidth;
            // 小球动画优化思路：
            // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
            // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
            // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
            // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

            // 获取小球的 在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取 徽标 在页面中的位置
            const badgePosition = document
                .getElementById("badge")
                .getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

el.style.transform= `translate(${xDist}px,${yDist}px)`;
el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
done()
                },
                afterEnter(el){
this.ballFlag = !this.ballFlag;
                },
            getSelectedCount(count){
        //当子组件把选中的数量传递给父组件的时候，把选中的只保存到data上
this.selectedCount = count;
            },
            },
        components:{
    swiper,
            numbox
        }
    }
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background: #eeeeee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .font-buy{
        font-size: 16px;
        font-weight: bold;
        margin: 0;
    }
    .button-buy{
        margin-left:14px;
    }
    .mui-card-header{
        font-weight: bolder;
        font-size: 18px;
    }
    .mui-card-footer{
        display: block;
       button{
           margin:15px 0;
                  }
    }
    .ball{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: red;
        position: absolute;
        z-index: 99;
        top: 409px;
        left: 157px;
    }
}
</style>