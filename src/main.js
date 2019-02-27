// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
//安装路由
Vue.use(VueRouter)
//注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var loginlist = JSON.parse(localStorage.getItem('loginlist') || '[]')
var store = new Vuex.Store({
    state: {
        //调用方法：this.$store.state.***
        //将 购物车中的商品的数据，用一个数组存储起来，在car数据中，存储一些商品的对象，
        car: car,
        loginlist:loginlist,
        flag:false,
        logined:false,
    },
    mutations: {
        //this.$store.commit('方法名称'，'按需传递唯一的参数')
        //注册
        register(state, registerObj) {
            //点击注册，把账号密码保存到store中的loginlist上去
            //1.如果购物车中，之前注册过有这个账号，提示账号已存在
            //2.如果没有则直接把账号密码push到loginlist里面
            //初始化flag
            state.flag =false;
            var registerFlag = false;
            state.loginlist.some(item => {
                if (item.id == registerObj.id) {
                    state.flag = true;
                    registerFlag = true;
                }
            })
            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
                if (!registerFlag) {
                    state.flag = false;
                    state.loginlist.push( registerObj)
                }
//当loginlist更新之后，把loginlist数组存储到本地的localStorage
            localStorage.setItem('loginlist', JSON.stringify(state.loginlist))
        },
        //登录
        login(state, loginObj) {
            //点击登录，如果账号密码正确则返回正确
            state.loginlist.some(item => {
                if (item.id == loginObj.id  && item.password == loginObj.password) {
                    state.logined=true;
                    return state.logined;

                }else{
                    logined:false;
                    return false;
                }
            })
            localStorage.setItem('loginlist', JSON.stringify(state.loginlist))
        },
        addToCar(state, goodsinfo) {
            //点击加入购物车，把商品信息保存到store中的car上去
            //1.如果购物车中，之前添加过有这个商品并还没删除，只需更新数量
            //2.如果没有则直接把商品数据push到car里面
            var flag = false
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }
//当更新car之后，把car数组存储到本地的localStorage
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }
            })
            //当修改完商品的数量，把最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFromCar(state,id){
          //根据Id从store的购物车中删除对应商品的信息
            state.car.some((item,i)=> {
              if(item.id =id){
                  state.car.splice(i,1);
                  return true;
              }
            })
            //把最新的购物车数据保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            })
//把最新的购物车商品状态保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: {
        //this.$store.getters.***

        //相当于计算属性，相当于filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state){
          var o  = {};
          state.car.forEach(item=>{
              o[item.id] = item.selected
          })
            return o;
        },
        getGoodsCountAndAmount(state){
        var o = {
            count: 0,//勾选的数量
            amount: 0,//勾选的总价
        }
        state.car.forEach(item=>{
            if(item.selected){
                o.count += item.count;
                o.amount += item.count * item.price;
            }
        })
            return o;
        },
    }
})
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
return moment(dataStr).format(pattern)
})
//导入vue-resource
import VueResource from 'vue-resource'
//安装vue-resource
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
//导入mui样式
import './lib/mui/css/mui.min.css'
//导入拓展图标样式
import './lib/mui/css/icons-extra.css'

//导入并安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
//导入缩略图的样式（新的缩略图插件要求必须设置全局样式才可以）
import "./lib/gobal.css"

//按需导入 Mint-UI 中的组件
/*import { Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);


//导入路由模块
import router from './router.js'


//导入 App 组件
import app from "./App.vue"

var vm = new Vue({
el:'#app',
render:  c=> c(app),
    router, //挂载路由对象到vm实例上
    store,//挂载store状态管理对象
})