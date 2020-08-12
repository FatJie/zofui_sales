<template>
    <div id="main">
        <div class="img">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/shopenter.jpg">
        </div>
        <div class="shop">
            <van-button color="#ff6e40" to="freeshop" block >免 费 开 店</van-button>
        </div>
    </div>
</template>
<script>
    import { Button } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        components:{
            [Button.name]:Button,
        },
        created(){
            var self = this;
            this.$util.http('user','GET',{op:'info'},res=>{
                if(res.data.userinfo.parent == 0){
                    this.$router.push('/bindrecommend');
                };
                wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                    wx.updateAppMessageShareData({ 
                        title: res.data.sharedatas.title, // 分享标题
                        desc: res.data.sharedatas.desc, // 分享描述
                        link: res.data.sharedatas.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: res.data.sharedatas.img, // 分享图标
                        success: function () {
                            // self.$toast('分享成功！')// 设置成功
                        }
                    })
                });
            });
        },
    }
</script>
<style scoped>
    .img{
        width:100%;
        margin-bottom: 0.6rem;
    }
    .img>img{
        width:100%;
    }
    .shop{
        width:100%;
        height:1.6rem;
        position:fixed;
        left:0;
        bottom: 0;
        background:#fff;
        box-sizing: border-box;
        padding-top: 0.2rem;
    }
    #main /deep/ .van-button{
        width:9.5rem;
        font-size: 0.4rem;
        font-weight: 600;
        margin: 0 auto;
        color: #fff;
        border-radius: 0.16rem;
    }
</style>