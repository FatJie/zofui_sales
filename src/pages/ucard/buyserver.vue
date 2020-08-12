<template>
    <div>
        <div class="img">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/server.jpg">
        </div>
        <div class="button">
            <div class="money" @click="topay">1980元，立即开通</div>
            <div class="agree">开通即代表同意<font @click="show=true">《壹卡多服务商开通服务协议》</font></div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
            <div class="popup">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/serverxieyi.jpg">
            </div>
        </van-popup>
    </div>
</template>


<script>
    import { Popup } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        components:{
            [Popup.name]:Popup
        },
        data(){
            return{
                show: false,
                list:{}
            }
        },
        created(){
            this.initData();
        },
        methods:{
            topay(){
                if(this.list.parent==0 || !this.list.parent){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '暂未绑定推荐人',
                        confirmButtonText:'马上绑定',
                        confirmButtonColor:'#ff6e40',
                        cancelButtonText:'残忍拒绝',
                        cancelButtonColor:'#999'
                    }).then(() => {
                        this.$router.push('/bindrecommend');
                    }).catch(() => {
                        return;
                    });
                }else{
                    this.$router.push('/openserver');
                    // if(this.list.account=='' || this.list.account==null){
                    //     this.$router.push('/bindphone');
                    // }else{
                    //     this.$router.push('/openserver');
                    // }
                };
            },
            initData(){
                this.$util.http('ucard','GET',{op:'info',zfid : this.$route.query.zfid ? this.$route.query.zfid : 0 },res=>{
                    this.list=res.data.userinfo;
                    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.updateAppMessageShareData({ 
                            title: res.data.sharedata.title, // 分享标题
                            desc: res.data.sharedata.desc, // 分享描述
                            link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: res.data.sharedata.img, // 分享图标
                            success: function () {
                                // self.$toast('分享成功！')// 设置成功
                            }
                        })
                    });
                })
            }
        }
    }
</script>


<style scoped>
    .img{
        padding-bottom: 1.5rem;
    }
    .img,.img>img{
        width:100%;
    }
    .button{
        width:100%;
        height:2rem;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
    }
    .money{
        width:9.4rem;
        height:1rem;
        border-radius: 0.5rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.46rem;
        font-weight: 600;
        color: #402d00;
        background: #fcdd08;
        margin: 0.2rem auto;
    }
    .agree{
        width:100%;
        font-size: 0.32rem;
        text-align: center;
        color: #666;
    }
    .agree>font{
        color: #d8b424;
    }
    .popup{
        width:100%;
    }
    .popup>img{
        width:100%;
    }
</style>