import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/Newsinfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/Photoinfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import Login from './components/login/login.vue'
import LeaveWord from './components/leaveWord/leaveWord.vue'
import Video from './components/video/video.vue'
// 3. 创建路由对象
var router = new VueRouter({
  routes: [ // 配置路由规则
      {  path: '/',redirect: '/login'},
    {  path: '/home', component: HomeContainer,},
    {  path:'/member',component:MemberContainer},
    {  path:'/shopcar',component:ShopcarContainer},
    {  path:'/search',component:SearchContainer},
      {path:'/home/newslist',component:NewsList},
      {path:'/home/newsinfo/:id',component:NewsInfo},
      {path:'/home/photolist',component:PhotoList},
      {path:'/home/photoinfo/:id',component:PhotoInfo},
      {path:'/home/goodslist',component:GoodsList},
      {path:'/home/goodsinfo/:id',component:GoodsInfo},
      {path:'/home/goodsdesc/:id',component:GoodsDesc,name:'goodsdesc' },
      {path:'/home/goodscomment/:id',component:GoodsComment, name:'goodscomment'},
      {path:'/home/leaveword',component: LeaveWord},
      {path:'/home/video',component: Video},
      {path: '/login', component: Login},
  ],
    linkActiveClass: 'mui-active'//覆盖默认的路由高亮的link，默认的类叫做router-link-active
})
// 把路由对象暴露出去
export default router;