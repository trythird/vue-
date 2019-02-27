<template>
    <div class="leave-word">
        <h5 class="mui-content-padded">留言类型</h5>
        <ul class="mui-table-view mui-table-view-radio">
            <li class="mui-table-view-cell mui-selected">
                <a class="mui-navigate-right">
                   点赞好评
                </a>
            </li>
            <li class="mui-table-view-cell ">
                <a class="mui-navigate-right">
                    吐槽投诉
                </a>
            </li>
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right">
                   问题咨询
                </a>
            </li>
            <li class="mui-table-view-cell">
                <a class="mui-navigate-right">
                    其他
                </a>
            </li>
        </ul>
        <div class="mui-content-padded">
            <p id="info"></p>
        </div>
        <textarea placeholder="请输入您留言的内容（最多留言一百二十字）"
                  maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="leaveWord">留言发射</mt-button>
    </div>
</template>

<script>
    export default{
        data(){
          return{
              suss_content:"留言发送成功，请耐心等待后台人员处理！",
              arr_content:"请输入留言",
              // 存放所选选项（字符串）
              value: "",
              // radio的选项
              msg:"",
          }
        },
        methods:{
            leaveWord(){
                if(this.msg) {
                    alert(this.suss_content);
                    this.msg =""
                }else{
                    alert(this.arr_content);
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .leave-word {
        background: white;
    }
        h2{
            background: white;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding-bottom: 0px;
        }
        textarea{
            height:200px;
            margin-top: 20px;
        }

    </style>