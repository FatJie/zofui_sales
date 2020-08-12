<template>
    <div>
        <loading v-if="inited == 0 || inited == 1" />
        <div class="img" v-if="inited == 2">
            <img :src="img">
        </div>
    </div>
</template>

<script>
    import { ImagePreview } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        name:'poster',
        components:{
            [ImagePreview.name]:ImagePreview
        },
        data(){
            return{
                inited : false,
                img:'',
                sharedata:''
            }
        },
        created(){
            this.initData();
        },
        methods:{
            initData(){
                if(this.$route.query.type=='vip'){
                    this.$util.http('poster','GET',{op:'vip'},res=>{
                        this.inited = 1;
                        this.img=res.data.url;
                        this.sharedata=res.data.sharedata;
                        this.inited = 2;
                    })
                }else if(this.$route.query.type=='server'){
                    this.$util.http('poster','GET',{op:'server'},res=>{
                        this.inited = 1;
                        this.img=res.data.url;
                        this.sharedata=res.data.sharedata;
                        this.inited = 2;
                    })
                }else{
                    this.$util.http('poster','GET',{op:'invitation'},res=>{
                        this.inited = 1;
                        this.img=res.data.url;
                        this.sharedata=res.data.sharedata;
                        this.inited = 2;
                    })
                }
                this.$toast('长按图片保存并分享！');
                var self=this;
                wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                    wx.updateAppMessageShareData({ 
                        title: self.sharedata.title, // 分享标题
                        desc: self.sharedata.desc, // 分享描述
                        link: self.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: self.sharedata.img, // 分享图标
                    })
                });
            }
        }
    }
</script>

<style scoped>
    .img{
        width:100%;
        margin: 0.8rem auto;
        font-size: 0.5rem;
    }
    .img>img{
        width:100%;
        height:100%;
        border-radius: 0.16rem;
    }
</style>