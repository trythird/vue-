<template>
  <div class="person-center" >
    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4062672642,1538671881&fm=27&gp=0.jpg"/>
   <h3>Hi!123,欢迎来到会员中心</h3>
    <div class="mui-card" style="margin-bottom: 35px;">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
           我的购物车
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            我的收藏
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            我的购物记录
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            我的评论
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right">
            设置
          </a>
        </li>
        <li class="mui-table-view-cell">
          <a class="mui-navigate-right" style="color: red">
            退出登录
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.person-center{
  margin-top: 20px;
  text-align: center;
img{
  border-radius: 50%;
  border: 1px solid #cccccc;
  width: 200px;
}
  h3{
    font-weight: bold;
    margin: 20px 0;
    margin-bottom:40px;
    color:#999999;
  }
  .mui-table-view-cell{
    font-size: 20px;
    height: 50px;
  }
}


</style>
