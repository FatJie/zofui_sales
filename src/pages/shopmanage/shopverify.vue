<template>
    <div>
        <van-tabs v-model="activeName" color="#FF6E40" title-active-color="#FF6E40" title-inactive-color="#333" swipeable>
            <van-tab title="资质认证" name="a">
                <div class="verify">
                    <!-- 基本参数信息 -->
                    <div class="shopinfo">
                        <div class="top_title">
                            <div class="title_left">主体信息</div>
                            <!-- <div class="title_right">联系客服 ></div> -->
                        </div>
                        <div class="following">请按照要求填写，方便我们审核</div>
                        <van-field v-model="info.subject_name"  placeholder="必填，营业执照上的名称" label="主体名称"/>
                        <van-field v-model="info.license"  placeholder="必填，营业执照上的注册号" label="执照号"/>
                        <van-field v-model="info.legal_person" placeholder="必填，营业执照上的法人姓名" label="法人姓名"/>
                        <van-field v-model="info.legal_person_tel" type="tel"  placeholder="必填，请输入法人联系电话" label="法人电话"/>
                    </div>
                    <!-- 商品图文详情 -->
                    <div class="photo">
                        <div class="top_title">
                            <div class="title_left">请上传图片</div>
                            <!-- <div class="title_right">联系客服 ></div> -->
                        </div>
                        <div class="following">请按照要求上传图片，方便我们审核</div>
                        <div class="door_photo">
                            <div class="door_title">
                                <div class="door_title_left">营业执照</div>
                            </div>
                            <div class="door_following">必须上传清晰的营业执照，与认证填写内容一致</div>
                            <van-uploader v-if="status==3" v-model="licence_img" :after-read="upLicence"  :max-count="1"/>
                            <template  v-else>
                                <div class="img">
                                    <img :src="info.license_img">
                                </div>
                            </template>
                        </div>
                        <div class="door_photo">
                            <div class="door_title">
                                <div class="door_title_left">其他认证资料</div>
                            </div>
                            <div class="door_following">必须上传清晰的法人身份证或经营许可证，与认证填写内容一致</div>
                            <van-uploader v-if="status==3" v-model="legal_person_img" :after-read="upIDcard"  :max-count="1"/>
                            <template  v-else>
                                <div class="img">
                                    <img :src="info.legal_person_img">
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="read">
                        <div class="agree">开通即代表同意<font @click="show1=true">《认证店铺服务协议》</font></div>
                    </div>
                    <van-popup v-model="show1" round position="bottom" :style="{ height: '70%' }">
                        <div class="popup">
                            <img :src="imgPre+'/shopverify1.jpg'">
                        </div>
                    </van-popup>
                    <!-- 保存 -->
                    <div class="add" v-if="status==3" @click="save">保 存</div>
                    <div class="add" v-if="status==0">申 请 中</div>
                    <div class="add" v-if="status==1">审 核 通 过</div>
                </div>
            </van-tab>
            <van-tab title="诚信保证金" name="b">
                <div class="money">
                    <div class="title">
                        <font>需缴纳保证金(元)</font>
                        <font v-if="payed<=0">未缴纳</font>
                        <font v-if="payed>0">已缴纳</font>
                    </div>
                    <div class="num">{{money}}</div>
                    <div class="intro">
                        <font>保证金说明：</font>
                        <div class="intro_content">保证金用于商家未兑现服务承诺，赔偿客户！</div>
                    </div>
                </div>
                <div class="read">
                    <div class="agree">开通即代表同意<font @click="show2=true">《诚信店铺服务协议》</font></div>
                </div>
                <van-popup v-model="show2" round position="bottom" :style="{ height: '70%' }">
                    <div class="popup">
                        <img :src="imgPre+'/shopverify2.jpg'">
                    </div>
                </van-popup>
                <!-- 保存 -->
                <div class="add" @click="hand" v-if="payed<=0">缴 纳</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { Tab, Tabs,Field ,Uploader,Checkbox,Popup  } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        name:'shopverify',
        components:{
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Field.name]:Field,
            [Uploader.name]:Uploader,
            [Checkbox.name]:Checkbox,
            [Popup.name]:Popup,
        },
        created(){
            this.initData();
        },
        data(){
            return{
                show1:false,
                show2:false,
                activeName: 'a',
                licence_img:[],
                legal_person_img:[],
                info:{},
                money:1000,
                shopid:'',
                payed:0,
                status:3,
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
            }
        },
        methods:{
            initData(){
                this.$util.http('admin','GET',{op:'authentication'},res=>{
                    this.shopid=res.data.shopid;
                    this.money=res.data.fee;
                    this.payed=res.data.authentication;
                    this.status=res.data.status ? res.data.status : this.status;
                    this.info=res.data.info==false ? this.info : res.data.info;
                })
            },
            save(){
                if(!this.info.subject_name){
                    this.$toast('营业执照主体名称不能为空')
                    return
                }
                if(!this.info.license){
                    this.$toast('营业执照执照号称不能为空')
                    return
                }
                if(!this.info.legal_person){
                    this.$toast('营业执照法人姓名不能为空')
                    return
                }
                if(!this.info.legal_person_tel){
                    this.$toast('营业执照法人电话不能为空')
                    return
                }
                if(this.info.license_img.length==0){
                    this.$toast('请上传营业执照图片')
                    return
                }
                var postData={
                    op:'certification',
                    info:this.info,
                    shopid:this.shopid
                }
                this.$util.http('admin','POST',postData,res=>{
                    if(res.errno==1){
                        this.$toast(res.message);
                    }else if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onOpened:()=>{
                                this.$router.go(-1);
                            }
                        })
                    }
                })
            },
            hand(){
                var self=this;
                self.$util.http('admin','GET',{op:'bond',fee:this.money},function(res){
                    if( res && !res.errno ){
                        if( res.data.payed == 1 ){
                            self.$toast({
                                type:'success',
                                message:res.message,
                                onClose : function(){
                                    self.$router.go(-1);
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
                                            self.$router.go(-1);
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
            upLicence(e){ 
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.info.license_img = res.attachment;
                })
            },
            upIDcard(e){ 
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.info.legal_person_img = res.attachment;
                })
            },
        }
    }
</script>

<style scoped>
    /* 填写背景信息 */
        .shopinfo{
            width:9.5rem;
            padding:0.5rem ;
            box-sizing: border-box;
            margin:0.3rem auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
        }
        .top_title{
            width:100%;
            margin-bottom: 0.3rem;
            display: flex;
            justify-content: space-between;
        }
        .title_left{
            font-size: 0.38rem;
            color:#333;
            font-weight: 700;
        }
        .title_right{
            color:#FF6E40;
            font-size: 0.32rem;
            font-weight: 500;
        }
        .following{
            font-size:0.32rem ;
            color:#333;
            font-weight: 500;
        }
    /* 上传图片 */
        .photo{
            width:9.5rem;
            padding:0.5rem ;
            margin:0 auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
            margin-top:0.3rem;
            box-sizing: border-box;
        }
        .door_photo{
            width:8.5rem;
            margin:0.35rem auto;
            background-color: #f4f4f4;
            padding:0.3rem ;
            font-size: 0.375rem;
            border-radius: 0.16rem;
            box-sizing: border-box;
        }
        .door_title{
            width:100%;
            margin-bottom: 0.3rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.32rem;
        }
        .door_title_left{
            color:#333;
        }
        .door_title_right{
            color:#ff6e40;
        }
        .door_following{
            color:#999;
            font-size: 0.32rem;
            margin-bottom:0.26rem ;
        }
    /* 阅读 */
        .read{
            width: 100%;
            box-sizing: border-box;
            padding:0.2rem;
            font-size: 0.32rem;
        }
    /* 保存 */
        .add{
            width:9.4rem;
            height:1.3rem;
            line-height: 1.3rem;
            text-align: center;
            margin: 0 auto;
            font-size:0.48rem ;
            font-weight: 500;
            color: #fff;
            background: #FF6E40;
            border-radius: 0.16rem;
        }
    /* 诚信保证金 */
        .money{
            width:9.4rem;
            margin: 0.3rem auto;
            border-radius: 0.16rem;
            background: #fff;
            box-sizing: border-box;
            padding:0.5rem;
        }
        .title{
            display: flex;
            justify-content: space-between;
            color:#333;
            font-size: 0.37rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
        }
        .num{
            font-size: 0.64rem;
            font-weight: 700;
            color: #333;
            border-bottom: 0.015rem solid #f4f4f4;
            padding-bottom: 0.3rem;
            box-sizing: border-box;
        }
        .intro>font{
            display:block;
            width:100%;
            font-size:0.32rem ;
            color: #333;
            font-weight: 700;
            margin: 0.5rem 0 0.2rem;
        }
        .intro_content{
            color: #999;
            font-size: 0.32rem;
        }
        .agree{
            width:100%;
            font-size: 0.32rem;
            text-align: center;
            color: #666;
        }
        .agree>font{
            color: #ff6e40;
        }
    /* 图片 */
        .img,.img>img{
            width:2.35rem;
            height:2.35rem;
        }
    /* 弹框 */
        .popup{
            width:100%;
        }
        .popup>img{
            width:100%;
        }
</style>