<template>
    <div id="mine">
        <!-- 头部 -->
        <div class="header">
            <p class="price"><font>¥</font> 1980.00</p>
            <p class="more">壹卡多服务商</p>
        </div>
        <!-- 选择支付 -->
        <van-radio-group v-model="radio">
            <div class="item">
                <van-radio name="1" checked-color="#ff6e40">微信支付</van-radio>
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/wx.png">
            </div>
            <div class="item"  v-if="grade!=0">
                <van-radio name="2" checked-color="#ff6e40" :disabled="umoney < 1980?true:false">
                    <div>余额支付（剩余：¥{{umoney}}）</div>
                    <div class="not_enough" v-if="umoney<1980">余额不足</div>
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
                umoney:0,
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
            //     }else if(this.value2==false && this.value1==true){
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
                    price:1980,
                    tobe:2
                }
                self.$util.http('ucard','GET',postdata,function(res){
                    if( res && !res.errno ){ 
                        if( res.data.payed == 1 ){
                            self.$toast({
                                type:'success',
                                message:'成功开通服务商!',
                                onClose : function(){
                                    self.$router.push('/user');
                                }
                            })
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
                                            self.$router.push('/user');
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
                        }
                    }else{
                        self.$toast(res.message);
                    }
                },true);
            },
            download(){
                var self = this;
                self.$util.http('user','GET',{op:'info'},res=>{
                    this.umoney=res.data.userinfo.umoney;
                    this.grade=res.data.userinfo.grade;
                },true);
            }      
        }}
</script>
<style scoped>  
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