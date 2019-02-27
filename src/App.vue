<template>
  <div class="app-container">
    <!--  顶部 Header 区域  -->
<mt-header fixed title="Vue商城项目">
  <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    <span> </span>
</mt-header>

      <!--  中间 路由 router-view 区域  -->
    <transition>
      <router-view></router-view>
    </transition>
      <!--  底部 Tabbar 区域  -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-change" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{  $store.getters.getAllCount }}</span></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-change" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>

  </div>
</template>

<script>
    export default {
        data() {
            return {
                flag: false
            };
        },
        created() {
            this.flag = this.$route.path === "/home" | this.$route.path === "/login"  ? false : true;
        },
        methods: {
            goBack() {
                // 点击后退
                this.$router.go(-1);
            }
        },
        watch: {
            "$route.path": function(newVal) {
                if (newVal === "/home") {
                    this.flag = false;
                } else {
                    this.flag = true;
                }
            }
        },
    };
</script>


<style lang="scss" scoped>
.app-container{
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
  .v-enter{
      opacity: 0;
      transform: translateX(100%);
  }
  .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
    position: absolute;
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
    //该类目解决 tabbar 点击无法切换问题
.mui-bar-tab .mui-tab-item-change.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-change {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
</style>
