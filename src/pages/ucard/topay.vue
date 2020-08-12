<template>
    <div id="mine">
        <!-- 头部 -->
        <div class="header">
            <p class="price"><font>¥</font> {{vipprice}}</p>
            <p class="more">壹卡多VIP会员</p>
        </div>
        <!-- 选择支付 -->
        <van-radio-group v-model="radio">
            <div class="item">
                <van-radio name="1" checked-color="#ff6e40">微信支付</van-radio>
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/wx.png">
            </div>
            <div class="item" v-if="grade!=0">
                <!-- v-if="grade!=0" -->
                <van-radio name="2" checked-color="#ff6e40" :disabled="money < vipprice ? true : false">
                    <div class="money">余额支付（剩余：¥{{money}}）</div>
                    <div class="not_enough" v-if="money < vipprice">余额不足</div>
                </van-radio>
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/yue.png">
            </div>
        </van-radio-group>
        
        <!-- 确认支付 -->
        <div class="confirm" @click="confirm">确 认 支 付</div>
    </div>
</template>
<script>
    import { RadioGroup, Radio } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        name:'topay',
        components:{
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
        },
        created(){
            this.download();
        },
        data(){
            return{
                radio:'1',
                value1:true,
                value2:false,
                type:1,
                money:0,
                vipprice:this.$route.query.vipprice,
                isdetail:this.$route.query.isdetail,
                time:this.$route.query.time ? this.$route.query.time : '',
                grade:''
            }
        },
        methods:{
            // check(){
            //     var wx_tick=document.getElementsByClassName("wx_tick")[0];
            //     var balance_tick=document.getElementsByClassName("balance_tick")[0];
            //     if(this.value1==false && this.value2==true){
            //         this.value1=true;
            //         this.value2=false;
            //         wx_tick.classList.add("bg");
            //         balance_tick.classList.remove("bg");
            //         this.type=1;
            //     }else{
            //         this.value2=true;
            //         this.value1=false;
            //         wx_tick.classList.remove("bg");
            //         balance_tick.classList.add("bg");
            //         this.type=2;
            //     }
            // },
            confirm(){
                var self = this;
                var postdata={
                    op:'pay',
                    type:this.radio,
                    price:this.vipprice,
                    time:this.time == '长期' ? '' : this.time,
                    tobe:1,
                    status:this.vipprice==199 ? 0 : 2
                }
                self.$util.http('ucard','GET',postdata,function(res){
                    if( res && !res.errno ){ 
                        if( res.data.payed == 1 ){
                            self.$toast({
                                type:'success',
                                message:'恭喜您升级为VIP！',
                                onClose : function(){
                                    if(!self.isdetail){
                                        self.$router.push('/');
                                    }else{
                                        self.$router.go(-2);
                                    }
                                }
                            });
                        }else{
                            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                                'appId' : res.data.appId, 
                                'timeStamp': res.data.timeStamp,
                                'nonceStr' : res.data.nonceStr,
                                'package' : res.data.package,
                                'signType' : res.data.signType,
                                'paySign' : res.data.paySign
                            }, function(resa) {
                                if(resa.err_msg == 'get_brand_wcpay_request:ok') {
                                    self.$toast({
                                        type:'success',
                                        message: res.data.mess,
                                        onClose : function(){
                                            if(!self.isdetail){
                                                self.$router.push('/');
                                            }else{
                                                self.$router.go(-2);
                                            }
                                        }
                                    });
                                } else {
                                    if( resa.err_msg == 'get_brand_wcpay_request:cancel' ){
                                        self.$toast('已取消支付');
                                    }else{
                                        self.$toast('启动微信支付失败, 请检查你的支付参数. 详细错误为: ' + resa.err_msg);
                                    }
                                };
                            });
                        };
                    }else{
                        self.$toast(res.message);
                    };
                },true);
            },
            download(){
                var self = this;
                self.$util.http('user','GET',{op:'info'},res=>{
                    this.money=res.data.userinfo.umoney;
                    this.grade=res.data.userinfo.grade;
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
                },true);
            }      
        }}
</script>
<style scoped>  
    /* 支付方式 */
        .item{
            width:100%;
            height:1.77rem;
            display: flex;
            position: relative;
            padding:0.3rem;
        }
        .item>img{
            width:0.6rem;
            height:0.6rem;
            position:absolute;
            top:50%;
            right:0.3rem;
            margin-top:-0.3rem;
        }
        .item /deep/ .van-radio{
            font-size: 0.44rem;
        }
        .item /deep/ .van-radio__label{
            margin-left:0.3rem;
        }
    /************************************/
    #mine{
        width:100%;
        height:100%;
        background-color: #f4f4f4;
        position: relative;
        z-index: 1000;
    }
    #mine *{
        box-sizing: border-box;
    }
    p{
        margin:0;
    }
    #mine /deep/ .van-radio-group{
        width:9.2rem;
        margin:0 auto;
        background: #fff;
        border-radius: 0.16rem;
    }
    /* 头部 */
        .header{
            width:100%;
            height:3rem;
            text-align: center;
        }
        .price{
            width:100%;
            height:0.8rem;
            padding-top:0.8rem;
            font-size:1rem ;
            color:#333;
            font-weight: 600;
        }
        .price>font{
            font-size:0.8rem ;
        }
        .more{
            width:100%;
            height:0.3rem;
            padding-top:1.4rem;
            font-size:0.32rem ;
            color:#999;
        }
    /* 选择支付 */
        .pay{
            width:9.5rem;
            /* height:5rem; */
            margin:0.3rem auto 0;
            background-color: #fff;
            font-size: 0.43rem;
            border-radius: 0.32rem;
            margin-bottom: 8.3rem;
        }
        .wx,.balance1,.balance,.others{
            width:100%;
            height:1.66rem;
            padding-left:1.4rem;
            display: flex;
            position:relative;
        }
        .wx{
            background: url(http://ykd.lsh199.com/attachment/images/global/mobile/wx.png) no-repeat 5% center ;
            background-size:0.6rem ;
            border-bottom: 1px solid #f2f2f2;
        }
        .balance,.balance1{
            background: url(http://ykd.lsh199.com/attachment/images/global/mobile/yue.png) no-repeat 5% center ;
            background-size:0.6rem ;
        }
        .wx,.others,.balance1{
            line-height: 1.66rem;
        }
        .balance_pay{
            padding-top:0.25rem;
            color:#a2a2a2;
        }
        .not_enough{
            margin-top:0.2rem;
            font-size: 0.36rem;
        }
        .wx_tick,.balance_tick,.others_tick{
            width:0.6rem;
            height:0.6rem;
            border:1px solid #eee;
            border-radius: 50%;
            position: absolute;
            top:0.6rem;
            right:0.6rem;
        }
        .bg{
            background:url(../../assets/mine/gou.png) center center no-repeat;
            background-size: 100%;
        }
    /* 确认支付 */
        .confirm{
            width:9.4rem;
            height:1.3rem;
            background-color: #FF6E40;
            color:#f4f4f4;
            text-align: center;
            line-height: 1.3rem;
            font-size: 0.45rem;
            border-radius:0.24rem ;
            position: fixed;
            bottom:0.4rem;
            left:0.3rem;
        }
</style>