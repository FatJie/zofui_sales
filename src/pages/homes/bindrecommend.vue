<template>
    <div id="main">
        <div class="please id" v-if="sure">请输入推荐人ID</div>
        <div class="please info" v-if="!sure">请确认推荐人信息</div>
        <div v-if="sure">
            <van-field v-model="code" placeholder="请输入推荐人ID" type="number"/>
        </div>
        <div class="img" v-if="!sure">
            <img :src="list.headimg">
        </div>
        <div v-if="!sure" class="people">推荐人</div>
        <div v-if="!sure" class="name">{{list.nickname}}</div>
        <div class="sure" @click="comfirm">确 定</div>
        <div v-if="!sure" class="mistake" @click="sure=true"> 更 改 推 荐 人 </div>
        <div class="tip"><font>*</font>
            推荐人ID是壹卡多会员为会员用户提供的专属ID,普通用户需要有会员的推荐方法可在壹卡多平台内购买商品，快去找您身边的壹卡多会员注册吧！
        </div>
    </div>
</template>

<script>
    import { Field } from 'vant';
    import wx from 'weixin-js-sdk';
    // window.onpopstate = function(event) {   
    //     WeixinJSBridge.call('closeWindow');
    // }
    export default {
        name : 'admindraw',
        components: {
            [Field.name] : Field,
        },
        data(){
            return{
                code:'',
                sure:true,
                list:''
            }
        },
        created(){
            this.initdata();
        },
        methods:{
            comfirm(){
                if(this.sure){
                    this.$util.http('index','GET',{op:'getparent',code:this.code},res=>{
                        if(res.errno==0){
                            this.list=res.data;
                        }else{
                            this.$toast(res.message);
                            return;
                        }
                        this.sure=false;
                    },true)
                }else{
                    this.$util.http('index','GET',{op:'editparent',id:this.list.id},res=>{
                        if(res.errno==0){
                            this.$toast(res.message);
                        }else{
                            this.$toast(res.message);
                            return;
                        };
                        this.$router.push('/');
                    },true)
                }
            },
            initdata(){
                this.$util.http('index','GET',{op:'info',zfid:this.$route.query.zfid},res=>{})
            }
            // onBackCloseWindow() {
            //     pushHistory();
            //     window.addEventListener("popstate", function(e) {
            //         //关闭当前浏览器
            //         wx.closeWindow();
            //     }, false);
            //     function pushHistory() {
            //         var state = {
            //             title: "title",
            //             url: "#"
            //         };
            //         window.history.pushState(state, "title", "#");
            //     }   
            // }
        }
    }
</script>

<style scoped>
    .please{
        width:100%;
        text-align: center;
        font-size: 0.5rem;
        font-weight: 500;
        color: #333;
    }
    .id{
        margin: 3.4rem 0;
    }
    .info{
        margin-top: 1.6rem;
    }
    #main{
        background: #f4f4f4;
    }
    #main /deep/ .van-cell{
        width:90%;
        margin: 0 auto;
        border-bottom: 1px solid #dfdfdf;
        background: #f4f4f4;
    }
    .img{
        width:2rem;
        height:2rem;
        margin: 0.5rem auto 0.2rem;
    }
    .img>img{
        width:2rem;
        height:2rem;
        border-radius: 50%;;
    }
    .people{
        width:100%;
        color: #FF301E;
        text-align: center;
        font-size: 0.35rem;
        font-weight: 500;
        margin-bottom: 0.2rem;
    }
    .name{
        width:100%;
        text-align: center;
        font-size: 0.5rem;
        font-weight: 700;
        color: #333;
    }
    .sure,.mistake{
        width:80%;
        margin: 1.6rem auto 0.5rem;
        height:1.2rem;
        text-align: center;
        line-height: 1.2rem;
        font-size: 0.5rem;
        font-weight: 700;
        border-radius: 0.16rem;
    }
    .mistake{
        margin-top: 0 !important;
    }
    .sure{
        border: 1px solid #FF301E;
        color: #fff;
        background:#FF301E;
    }
    .mistake{
        color: #FF301E;
        border: 1px solid #FF301E;
    }
    .tip{
        width:80%;
        margin: 0 auto;
        color: #999;
        font-size: 0.38rem;
        font-size: 500;
        word-break: break-all;
    }
    .tip>font{
        color: #FF301E;
        font-weight: 700;
        margin-right: 0.2rem;
    }
</style>