<template>
    <div>
        <div class="card_title">推荐人名片</div>
        <div class="card_content">
            <img class="avater" :src="parent.headimg">
            <div class="nickname">{{parent.nickname}}</div>
            <div class="intro">还不了解壹卡多和壹卡多权益吗？<br>添加你的邀请人，咨询吧！</div>
            <div class="none" v-if=" parent.wechatimg == '' ">* 邀请人暂未上传二维码</div>
            <img class="image" v-else :src="parent.wechatimg">
            <div v-if=" parent.wechatnum " class="wechatnum">微信号：{{parent.wechatnum}}</div>
        </div>
        <div class="card_title">我的微信二维码</div>
        <div class="code">
            <div class="code_content">
                <div class="left">上传我的微信二维码</div>
                <div class="code_photo">

                    <template v-if="isUpload">
                        <div class="img">
                            <img :src="userinfo.wechatimg">
                        </div>
                    </template>

                    <van-uploader v-else v-model="code_photo" :after-read="uploadCode"  :max-count="1"/>
                    
                </div>
            </div>
            
            <div class="add">
                <van-field v-model="userinfo.wechatnum" label="添加我的微信号:" placeholder="请输入微信号"/>
            </div>
            <div class="save" @click="save" v-if="status==0">
                保  存
            </div>
            <div class="save" @click="deleteInfo" v-if="status==1">
                删  除
            </div>
        </div>
        
    </div>
</template>

<script>
    import { Uploader,Field } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        name:'referrals',
        components:{
            [Field.name] : Field,
            [Uploader.name] : Uploader
        },
        created(){
            this.initData()
        },
        data(){
            return{
                status:'',
                isUpload:'',
                parent:{},
                userinfo:{
                    wechatimg:'',
                    wechatnum:''
                },
                code_photo:[],
            }
        },
        methods:{
            save(){
                var postData={
                    op:'savewechatinfo',
                    userinfo:this.userinfo
                }
                this.$util.http('user','GET',postData,res=>{
                    if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onClose:()=>{
                                this.$router.go(-1);
                            }
                        });
                    }else{
                        this.$toast({
                            message:res.message,
                        });
                    }
                })
            },
            deleteInfo(){
                var postData={
                    op:'savewechatinfo',
                    userinfo:{
                        wechatimg:'',
                        wechatnum:''
                    }
                }
                this.$util.http('user','GET',postData,res=>{
                    if(res.errno==0){
                        this.$toast({
                            message:"删除成功！",
                            onClose:()=>{
                                this.$router.go(-1);
                            }
                        });
                    }else{
                        this.$toast({
                            message:"删除失败！",
                        });
                    }
                })
            },
            initData(){
                var self=this;
                var postData={
                    op:'wechatinfo',
                }
                this.$util.http('user','GET',postData,res=>{
                    this.parent=res.data.parent;
                    this.userinfo=res.data.userinfo;
                    this.status=res.data.status;
                    if(res.data.userinfo.wechatimg==''){
                        this.isUpload=false;
                    }else{
                        this.isUpload=true;
                    }
                    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.updateAppMessageShareData({ 
                            title: res.data.sharedata.title, // 分享标题
                            desc: res.data.sharedata.desc, // 分享描述
                            link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: res.data.sharedata.img, // 分享图标
                        })
                    });
                },true)
            },
            uploadCode(e){ 
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.userinfo.wechatimg = res.attachment;
                })
            },
        }
    }
</script>

<style scoped>
    .image{
        width:5rem;
    }
    .card_title{
        width: 100%;
        box-sizing: border-box;
        padding: 0.3rem;
        font-size: 0.35rem;
        color: #666666;
        font-weight: 600;
    }
    .card_content{
        width:9.4rem;
        margin: 0 auto;
        border-radius: 0.16rem;
        text-align: center;
        background: #fff;
    }
    .avater{
        width:2.1rem;
        height:2.1rem;
        border-radius: 50%;
        margin: 0.3rem 0;
    }
    .nickname{
        color: #333;
        font-size: 0.43rem;
        font-weight: 700;
    }
    .intro{
        color: #999;
        font-size: 0.35rem;
        margin-bottom: 0.3rem;
    }
    .none{
        color: #4D4D4D;
        font-size: 0.35rem;
        padding-bottom: 0.2rem;
    }
    .wechatnum{
        color: #4D4D4D;
        font-size: 0.35rem;
        padding-bottom: 0.5rem;
    }
    .code{
        width:9.4rem;
        margin: 0 auto;
        border-radius: 0.16rem;
        background: #fff;
        padding-bottom: 1px;
    }
    .code_content{
        width:9.4rem;
        margin: 0 auto;
        border-radius: 0.16rem;
        background: #fff;
        background-image: url('../../assets/mine/arrow_right.png');
        background-repeat: no-repeat;
        background-size:0.2rem ;
        background-position: 95% center;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding:0.3rem 1.5rem 0.3rem 0.3rem;
        border-bottom: 1px solid #f4f4f4;
    }
    .left{
        font-size: 0.48rem;
        font-weight: 700;
        color: #333;
    }
    .img,.img>img{
        width:2rem;
        height:2rem;
    }
    .add{
        width:9.4rem;
        margin: 0.3rem auto;
        border-radius: 0.16rem;
        overflow: hidden;
    }
    .add /deep/ .van-cell{
        border-bottom:1px solid #f4f4f4;
    }
    .add /deep/ .van-cell__title{
        width:3.8rem;
        font-size: 0.4rem;
        color: #333;
        font-weight: 700;
    }
    .save{
        width:5rem;
        margin: 1rem auto;
        padding: 0.2rem 0;
        background: #ff6e40;
        border-radius: 0.08rem;
        font-size: 0.4rem;
        color: #fff;
        text-align: center;
        
    }
</style>