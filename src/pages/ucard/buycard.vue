<template>
    <div id="mine">

        <div class="img">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/vip1.jpg">
        </div>

        <div v-if="isforvermember && isforvermember==1">
            <div style="box-sizing:border-box;width:9.2rem;margin:0.26rem auto;padding:0.4rem;display:flex;justify-content:space-between;background:#FFD69E;border-radius:0.07rem;color:#8B1827;">
                <div style="width:50%;display:flex;flex-flow: column;">
                    <div style="width:100%;font-size:0.4rem;font-weight:700;margin:0.25rem 0 0.2rem;">壹卡多VIP会员</div>
                    <div style="width:100%;font-size:0.32rem;">会员有效期长期</div>
                </div>
                <div style="display:flex;flex-flow:column;">
                    <div>
                        <div style="font-size:0.65rem;font-weight:700;">199<font style="font-size:0.4rem;font-weight:400;">元</font></div>
                    </div>
                    <div style="text-align:center;padding:0.12rem 0.36rem;color:#fff;font-size:0.252rem;border-radius:0.3rem;background:#B82A36;" @click="topay">马上开通</div>
                </div>
            </div>
        </div>


        <div v-else>
            <div v-for="(item,index) in list" :key="index" style="box-sizing:border-box;width:9.2rem;margin:0.26rem auto;padding:0.4rem;display:flex;justify-content:space-between;background:#FFD69E;border-radius:0.07rem;color:#8B1827;">
                <div style="width:50%;display:flex;flex-flow: column;">
                    <div style="width:100%;font-size:0.4rem;font-weight:700;margin:0.25rem 0 0.2rem;">壹卡多VIP会员</div>
                    <div style="width:100%;font-size:0.32rem;">会员有效期{{item.tian}}</div>
                </div>
                <div style="display:flex;flex-flow:column;">
                    <div>
                        <div style="font-size:0.65rem;font-weight:700;">{{item.price}}<font style="font-size:0.4rem;font-weight:400;">元</font></div>
                    </div>
                    <div style="text-align:center;padding:0.12rem 0.36rem;color:#fff;font-size:0.252rem;border-radius:0.3rem;background:#B82A36;" @click="topay" :data-price="item.price" :data-time="item.time">马上开通</div>
                </div>
            </div>
        </div>
        

        

        <!-- <van-radio-group v-model="radio">
            <van-radio name="1" checked-color="#fcdd08">{{ucardprice}}元 / 90天</van-radio>
            <van-radio name="2" checked-color="#fcdd08">199元 / 无期限</van-radio>
        </van-radio-group> -->
        <!-- <div class="img">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/vip.jpg">
        </div>
        <div class="button">
            <div class="money" @click="topay"  v-if="miss==666"> {{ucardprice}}元（90天）丨立即开通</div>
            <div class="money" @click="topay" v-else> 199元（长期）丨立即开通</div>
            <div class="agree">开通即代表同意<font @click="show=true">《壹卡多VIP开通服务协议》</font></div>
        </div> -->
        <div class="img">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/vip2.jpg">
        </div>
        <!-- 规则弹出 -->
        <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
            <div class="popup">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/vipxieyi.jpg">
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Popup,Radio,RadioGroup,Dialog } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        name:'buycard',
        components:{
            [Popup.name]:Popup,
            [Radio.name]:Radio,
            [RadioGroup.name]:RadioGroup,
            [Dialog.name] : Dialog,
        },
        data(){
            return{
                isforvermember:'',
                value:false,
                show: false,
                ucardprice:'',
                miss:this.$route.query.miss ? this.$route.query.miss : '',
                isdetail:this.$route.query.isdetail ? this.$route.query.isdetail : '',
                list:[
                    {price:'29.9',time:'90',tian:'90天'},
                    {price:'99',time:'365',tian:'365天'},
                    {price:'199',time:'',tian:'长期',}
                ]
            }
        },
        created(){
            this.initData();
        },
        methods:{
            // check(){
            //     var input=document.getElementById("input");
            //     var pay_right=document.getElementsByClassName("pay_right")[0]
            //     if(this.value==false){
            //         this.value=true;
            //         input.classList.add("bg")
            //         pay_right.classList.add("open")
            //         pay_right.classList.remove("noopen")
            //     }else{
            //         this.value=false;
            //         input.classList.remove("bg")
            //         pay_right.classList.add("noopen")
            //     }
            // },
            topay(e){
                // console.log(e.currentTarget.dataset.price)
                // console.log(e.currentTarget.dataset.time)
                if(this.userinfo.parent==0 || !this.userinfo.parent){
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
                    if(this.isforvermember && this.isforvermember==1){
                        this.$router.push({path:'/topay',query:{vipprice:199,isdetail:this.isdetail}});
                    }else{
                        this.$router.push({path:'/topay',query:{
                            vipprice:e.currentTarget.dataset.price,
                            isdetail:this.isdetail,
                            time:e.currentTarget.dataset.time
                        }});
                    }
                };
            },
            initData(){
                this.$util.http('ucard','GET',{op:'info',zfid : this.$route.query.zfid ? this.$route.query.zfid : 0 },res=>{
                    this.ucardprice=res.data.ucardprice;
                    this.userinfo=res.data.userinfo;
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
                });
            }
        }
    }
</script>
<style scoped>  
    #mine /deep/ .van-radio__label{
        font-size: 0.32rem;
        color: #666;
        margin-left: 0.5rem;
    }
    #mine /deep/ .van-radio{
        background-color: #fff;
        padding: 0.2rem 0.3rem;
    }
    /* #mine{
        width:100%;
        height:100%;
        background-color: #f4f4f4;
    }
    #mine *{
        box-sizing: border-box;
    }
    .popup{
        box-sizing: border-box;
        padding:0.2rem;
    } */
    .popup >>> p{
        /* display:inline-block;
        width:100%;
        margin:0;
        padding:0;
        font-size:14px; */
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