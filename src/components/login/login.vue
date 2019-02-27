<template>

    <div class="login">
        <div class="login-wrap" v-show="showLogin" v-bind:style="style" id="aa">

            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="username">
            <input type="password" placeholder="请输入密码" v-model="password">
            <button v-on:click="login">登录</button>
            <span v-on:click="ToRegister">没有账号？马上注册</span>
        </div>

        <div class="register-wrap" v-show="showRegister" v-bind:style="style">

            <p v-show="showTishi">{{tishi}}</p>
            <input type="text" placeholder="请输入用户名" v-model="newUsername">
            <input type="password" placeholder="请输入密码" v-model="newPassword">
            <button v-on:click="register">注册</button>
            <span v-on:click="ToLogin">已有账号？马上登录</span>
        </div>
    </div>

</template>

<script>
   export default {
        data() {
            return {
                showLogin: true,
                showRegister: false,
                showTishi: false,
                tishi: '',
                username: '',
                password: '',
                newUsername: '',
                newPassword: '',
                style:{}
            }
        },
        mounted() {
      /*      /!*页
        },面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*!/
   setinterval(function(){if (this.$store.state.logined) {
       this.$router.push('/home')
   }},2000)*/

   this.getHeight();
            },
        methods: {
            getHeight(){
                var h1 = window.screen.height - 90;
                var h2 = h1+"px";
                this.style = {
                    height: h2
                }
            },
            login() {
                console.log(this.$store.state.loginlist)
                var loginObj={id:this.username,password:this.password};
                this.$store.commit("login",loginObj);
                var flag = this.$store.state.logined ;
                if (this.username === "" || this.password === "") {
                    alert("请输入用户名或密码")
                } else {
                    if (!flag) {
                        this.tishi = "账号或者密码错误"
                        this.showTishi = true
                    }  else{
                        this.tishi = "登录成功"
                        this.showTishi = true
                        setTimeout(function () {
                            this.$router.push('/home')
                        }.bind(this), 1000)
                    }
                }
            },
            register(){
                if (this.newUsername == "" || this.newPassword == "") {
                    alert("请输入用户名或密码")
                }else if (this.newUsername == ""){
                    alert("请输入用户名");
                }else if(this.newPassword == ""){
                    alert("请输入密码")
                }
                else {
                    var registerObj={id:this.newUsername ,password:this.newPassword};
                    this.$store.commit("register",registerObj);
                    var flag = this.$store.state.flag
                    if (flag === false) {
                        this.tishi = "账号已存在，注册失败，请重新注册"
                        this.showTishi = true
                    }  else if(flag === true){
                        this.tishi = "注册成功，2秒后返回登录页面"
                        this.showTishi = true
                        setTimeout(function () {
                          this.ToLogin();
                        }.bind(this), 1000)
                    }
                }
            },
            ToLogin(){
               this.showLogin = true;
                 this.showRegister=false;
                this.tishi = ""
                this.showTishi = false
            },
            ToRegister(){
                this.showLogin = false;
                this.showRegister=true;
                this.tishi = ""
                this.showTishi = false
            }
        },

    }

</script>

<style type="css" scoped>
    .login-wrap{
         padding-top: 180px;
         background: url("../../images/bg.jpg");
         background-repeat: no-repeat;
         text-align:center;
        background-size: cover;
     }
    .register-wrap{
        padding-top: 180px;
        background: url("../../images/bg.jpg");
        background-repeat: no-repeat;
        text-align:center;
        background-size: cover;
    }
    img{
        width: 80px;
        margin-bottom: 10px;
    }
    input{display:block; width:250px; height:40px; line-height:40px;
        margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888;
        padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0
    auto; border:none; background-color: #2dbcff; color:#fff; font-size:16px;
        margin-bottom:5px;}
    span{
    cursor:pointer;
    color: #999999}
    span:hover{color: #2ce6ff;}
    span:active{color: #2ce6ff;}
</style>