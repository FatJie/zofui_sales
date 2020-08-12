<template>
    <div>
        <loading v-show="inited == 0 || inited == 1" :inited="inited" />
        <div v-if="inited == 2">
            <div class="bg_audio"  @click="replaybg">
                <img :class="audioplaying ? 'music-btn-ani' : ''" src="https://img11.360buyimg.com/ddimg/jfs/t1/74637/31/7451/1357/5d57e82eE1c06ed22/5965b60a624b89e2.png" />  
                <audio id="bgMusic" src="https://data.rrxh5.cc/g1/2019/08/17/1566025508620.mp3" autoplay="autoplay" loop="loop"></audio>
            </div>
            <div class="top">
                <img :src="imgPre+'/publicity22.jpg'">
                <font class="buy">{{num}}</font>
                <font class="look">{{count}}</font>
                <div class="look_img">
                    <div v-for="(item,index) in list" :key="index">
                        <img :src="item.headimg">
                    </div>
                </div>
                <div class="gif">
                    <img :src="imgPre+'/timg.gif'">
                </div>
            </div>
            <div class="welfare">
                <!-- 特权专区 -->
                <img :src="imgPre+'/publicity21.jpg'">
                <div class="good">
                    <div class="good_item" v-for="(item,index) in goods" :key="index">
                        <div class="good_img"  @click="getSpecial(item.id)">
                            <img :src="item.thumb">
                        </div>
                        <div class="good_content"  @click="getSpecial(item.id)">
                            <div class="good_name"><font>{{item.shopname}}</font><font>{{item.area}}</font></div>
                            <div class="good_desc">{{item.title}}</div>
                            <div class="good_num">
                                <font>已售：{{item.saled}}份</font>
                                <font>仅剩：{{item.stock}}份</font>
                            </div>
                            <div class="good_bottom">
                                <div class="good_left">
                                    <font class="good_price">￥<font>{{item.oldprice}}</font></font>
                                    <font class="good_total">免单福利总价值</font>
                                </div>
                                <div class="get">立即领取</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 精选专区 -->
                <img :src="imgPre+'/publicity22-1.jpg'">
                <div class="good">
                    <div class="good_item" v-for="(item,index) in jingxuan" :key="index">
                        <div class="good_img"  @click="getSpecial(item.id)">
                            <img :src="item.thumb">
                        </div>
                        <div class="good_content"  @click="getSpecial(item.id)">
                            <div class="good_name"><font>{{item.shopname}}</font><font>{{item.area}}</font></div>
                            <div class="good_desc">{{item.title}}</div>
                            <div class="good_num">
                                <font>已售：{{item.saled}}份</font>
                                <font>仅剩：{{item.stock}}份</font>
                            </div>
                            <div class="good_bottom">
                                <div class="good_left">
                                    <font class="good_price">￥<font>{{item.price}}</font></font>
                                    <font class="good_total">壹卡多会员价</font>
                                </div>
                                <div class="get">立即购买</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 抢购专区 -->
                <img :src="imgPre+'/publicity22-2.jpg'">
                <div class="good">
                    <div class="good_item" v-for="(item,index) in qianggou" :key="index">
                        <div class="good_img"  @click="getSpecial(item.id)">
                            <img :src="item.thumb">
                        </div>
                        <div class="good_content"  @click="getSpecial(item.id)">
                            <div class="good_name"><font>{{item.shopname}}</font><font>{{item.area}}</font></div>
                            <div class="good_desc">{{item.title}}</div>
                            <div class="good_num">
                                <font>已售：{{item.saled}}份</font>
                                <font>仅剩：{{item.stock}}份</font>
                            </div>
                            <div class="good_bottom">
                                <div class="good_left">
                                    <font class="good_price">￥<font>{{item.price}}</font></font>
                                    <font class="good_total">壹卡多会员价</font>
                                </div>
                                <div class="get">立即购买</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img :src="imgPre+'/publicity23.jpg'" style="width:100%;margin-bottom: 1.1rem;">
            <!-- 同意规则 -->
            <div style="width:100%;position: fixed;bottom:0;left: 0;background: #fff;display:flex;justify-content: space-around;" v-if="grade>0">
                <div @click="more" style="margin:0.2rem 0;width:48%;text-align:center;border-radius:0.16rem;height:1rem;font-size:0.48rem;font-weight:500;color:#fff;line-height:1rem;background: #FF122E;">更 多 福 利</div>
                <div @click="getPoster" style="margin:0.2rem 0;width:48%;text-align:center;border-radius:0.16rem;height:1rem;font-size:0.48rem;font-weight:500;color:#fff;line-height:1rem;background: #FF122E;">我 要 分 享</div>
            </div>
            <div style="width:100%;position: fixed;bottom:0;left: 0;background: #fff;" v-else>
                <div class="rule">
                    <van-checkbox label-disabled v-model="values" checked-color="#E42034">
                        <font class="me">我已阅读并同意</font>
                        <font class="terms"  @click="show=true">《会员规则  || 会员服务条款》</font>
                    </van-checkbox>
                </div>
                <div class="pay">
                    <div class="pay_left">
                        <font class="cardprice1">{{cardprice}}</font>元<font class="cardprice2" v-if="cardprice < usercardprice元">{{usercardprice}}元</font>
                    </div>
                    <div class="lijipay" @click="confirm">立即购买</div>
                </div>
            </div>
            <!-- 规则弹出 -->
            <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
                <div class="popup">
                    <img :src="imgPre+'/vipxieyi.jpg'">
                </div>
            </van-popup>
            <!-- 固定栏 -->
                <van-swipe :show-indicators="false" :vertical="true" class="top-swiper fade-in" :autoplay="1000" >
                    <van-swipe-item v-for="(item,index) in userlist" :key="index">
                        <div class="item_cell_box">
                            <div class="avatar">
                                <img class="avatar" :src="item.headimg" />
                            </div>
                            <div class="txt item_cell_flex">
                                {{item.nickname}}支付成功！
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            <div class="fixed_right">
                <div @click="code=true">联系<br>客服</div>
                <div @click="openShareArea">分享<br>好友</div>
                <div @click="freeshop">商家<br>入驻</div>
            </div>
            <div class="tankuang" v-if='code'>
                <div class="content">
                    <div class="content_title">扫码添加客服微信号~</div>
                    <div class="content_img">
                        <img :src="imgPre+'/service_code.jpg'">
                    </div>
                </div>
                <img @click="code=false" :src="imgPre+'/close.png'">
            </div>
            <!-- 分享弹框 -->
            <sharetip :isshowshare="isshowshare" @shareit="shareit" />
            <van-popup v-model="SharePopupshow" position="bottom" :overlay="true" @click-overlay="SharePopupshow = true">
    
                <div class="share-area">
                    
                    <div @click="getPoster" class="item">
                        <img src="https://img11.360buyimg.com/ddimg/jfs/t1/79397/19/948/5580/5cf23bdbE11da7e29/b145f3c1ba828eba.png">
                        <div>生成海报</div>
                    </div>
                    <div class="item"  @click="isshowshare=true">
                        <img src="http://img11.360buyimg.com/ddimg/jfs/t1/103560/23/4172/8220/5de4dfe9Eee327186/6a18d9c78ef7ea10.png">
                        <div>分享好友</div>
                    </div>
    
                </div>
            </van-popup>
        </div>
    </div>
    
</template>

<script>
    import { Dialog,Checkbox,Popup,Swipe,SwipeItem,ImagePreview,Loading } from 'vant';
    import sharetip from '../../components/sharetip';
    import wx from 'weixin-js-sdk';
    export default {
        name:'extension',
        components: {
            [Loading.name]: Loading,
	    	[Dialog.name] : Dialog,
	    	[Checkbox.name] : Checkbox,
	    	[Popup.name] : Popup,
	    	[Swipe.name] : Swipe,
	    	[SwipeItem.name] : SwipeItem,
            [ImagePreview.name]:ImagePreview,
            sharetip
	  	},
        created(){
            this.initData();
        },
        data(){
            return{
                inited : false,
                code:false,
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                values:true,
                isshowshare:false,
                show:false,
                count:'',
                cardprice:0,
                goods:[],
                jingxuan:[],
                qianggou:[],
                list:[],
                userlist:[],
                SharePopupshow:false,
                num:0,
                grade:'',
                music:false,
                audioplaying:false,
                sharedatas:{},
                price:0,
                tenkey:'',
                lat:'',
                lng:''
            }
        },
        methods:{
            replaybg(){
                if(this.music.paused) {
                    this.music.play();
                    this.audioplaying = true;
                } else {
                    this.music.pause();
                    this.audioplaying = false;
                }
            },
            more(){
                this.$router.push('/speciallist');
            },
            shareit(bool){
                this.isshowshare = bool;
            },
            getPoster(){
                var self = this;
                var postdata = {
                    op:'tuoke',
                    path:self.linking
                };
                self.$util.http('poster','GET',postdata,function(res){
                    if (!res.errno && res.data ) {
                        Dialog.alert({
                            message: '可将图片保存到本地相册和发给好友！'
                        }).then(() => {

                            ImagePreview({
                                images : [res.data.url],
                                closeOnPopstate : true,
                                showIndicators : true,
                            })
                        });

                    }else{
                        self.$toast(res.message);
                    }
                },true);
            },
            openShareArea(e){
                this.SharePopupshow = !this.SharePopupshow;
            },
            freeshop(){
                this.$router.push('/shopenter');
            },
            getSpecial(id){
                this.$router.push({path:'/goodinfo',query:{id:id}});
            },
            initData(){
                var self=this;
                var loc = self.$util.getCache('loc');
                if( loc.lat ) {
                    self.lat = loc.lat;
                }
                if( loc.lng ){
                    self.lng = loc.lng;
                } 
                var zfid=this.$route.query.zfid ? this.$route.query.zfid : 0;
                var postData = {
                    op:'tuoke',
                    zfid:zfid,
                    lat:self.lat,
                    lng:self.lng
                }
                // setTimeout(function(){
                    self.music = document.getElementById('bgMusic');
                    self.audioplaying = true;
                    // self.music.play();
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        document.getElementById('bgMusic').play();
                    }, false);
                // },100);
                this.$util.http('fenxiao','GET',postData,res=>{ 
                    self.inited = 1;
                    this.count=res.data.count;
                    this.goods=res.data.goods;
                    this.jingxuan=res.data.jingxuan;
                    this.qianggou=res.data.qianggou;
                    this.list=res.data.list;
                    this.cardprice=res.data.cardprice;
                    this.price=res.data.usercardprice;
                    this.num=res.data.num;
                    this.userlist=res.data.userlist;
                    this.grade=res.data.grade;
                    this.sharedatas=res.data.sharedatas;
                    this.tenkey=res.data.tenkey;
                    window.document.title="壹卡多免费吃喝玩乐嗨翻天！";
                    // this.$util.share(wx,this.sharedata);
                    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.updateAppMessageShareData({ 
                            title: self.sharedatas.title, // 分享标题
                            desc: self.sharedatas.desc, // 分享描述
                            link: self.sharedatas.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: self.sharedatas.img, // 分享图标
                            success: function () {
                                // self.$toast('分享成功！')// 设置成功
                            }
                        })
                    });
                    if( !loc ){
                        self.$util.getLocation(function(){
                            self.initData();
                        },self.tenkey,wx)
                    }
                    self.inited = 2;
                });
                
            },
            confirm(){
                if(this.values){
                    var self = this;
                    var postdata={
                        op:'pay',
                        type:1,
                        price:self.cardprice,
                        tobe:1,
                        status:1
                    }
                    self.$util.http('ucard','GET',postdata,function(res){
                        if( res && !res.errno ){
                            if( res.data.payed == 1 ){
                                self.$toast({
                                    type:'success',
                                    message:'恭喜您升级为VIP！',
                                    onClose : function(){
                                        self.$router.push('/');
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
                            };
                        }else{
                            self.$toast(res.message);
                        };
                    },true);
                }else{
                    this.$toast('请先阅读会员规则！')
                }
            },
        }
    }
</script>

<style scoped>
    .top{
        width:100%;
        position: relative;
        background: #fb5448;
    }
    .top>img{
        width: 100%;
    }
    .buy,.look{
        font-size: 0.4rem;
        font-weight: 700;
        color: #fb5448;
    }
    .buy{
        position: absolute;
        top:30.19rem;
        left:2.75rem;
    }
    .look{
        text-align: right;
        position: absolute;
        top:30.19rem;
        right:2.75rem;
    }
    .look_img{
        width:7.655rem;
        height:4.145rem;
        position: absolute;
        top: 29.94rem;
        left:1.18rem;
        border-radius: 0.16rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-top: 1.4rem ;
    }
    .look_img img{
        width:1.1rem;
        height:1.1rem;
        border-radius: 50%;
    }
    .welfare{
        width:100%;
        background: #fb5448;
    }
    .welfare>img{
        width:100%;
    }
    .good{
        width:100%;
        box-sizing: border-box;
        padding: 0 0.1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .good_item{
        width:4.615rem;
        height:7.426rem;
        background: url('http://ykd.lsh199.com/attachment/images/global/mobile/good_item.png') no-repeat;
        margin-bottom: 1rem;
        background-size: 100%;
    }
    .good_img{
        width:4.615rem;
        height:4.465rem;
        padding:0.1rem;
        box-sizing: border-box;
    }
    .good_img>img{
        width:4.4rem;
        height:4.3rem;
        border-radius: 0.16rem;
    }
    .good_content{
        width:4.4rem;
        margin: 0 auto;
    }
    .good_name{
        width:100%;
        font-size: 0.35rem;
        color: #6E4428;
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-between;
        font-weight: 700;
    }
    .good_name>font:first-child{
        width:78%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .good_name>font:last-child{
        width:22%;
        text-align: right;
        font-size: 0.28rem;
    }
    .good_desc{
        width:100%;
        height:0.6rem;
        margin-top:0.1rem;
        font-size: 0.22rem;
        color: #6E4428;
        font-weight: 500;
        overflow: hidden;
    }
    .good_num{
        width:100%;
        font-size: 0.3rem;
        font-weight: 500;
        color: #e82038;
        display: flex;
        justify-content: space-between;
        margin-top: 0.15rem;
    }
    .good_num>font{
        width:50%;
    }
    .good_num>font:last-child{
        text-align: right;
    }
    .good_bottom{
        width:100%;
        display: flex;
        align-items: center;
    }
    .good_left>font{
        display: inline-block;
        width:100%;
    }
    .good_left{
        width:55%;
        font-size: 0.2rem;
    }
    .good_price{
        font-size:0.335rem ;
        color: #E82038;
        font-weight: 500;
    }
    .good_price>font{
        color: #E82038;
        font-size: 0.6rem;
        font-weight: 700;
    }
    .good_total{
        width:45%;
        font-size: 0.2rem;
        color: #E82038;
    }
    .get{
        width:1.6rem;
        height:0.6rem;
        font-size: 0.22rem;
        text-align: center;
        line-height: 0.6rem;
        border-radius: 0.08rem;
        background: #E82038;
        color: #FFD4B6;
        margin-left: 0.5rem;
    }
    /* 规则 */
        .rule{
            width:100%;
            padding-left: 0.3rem;
            font-size: 0.362rem;
            margin-top:0.1rem;
            font-weight: 700;
            vertical-align: middle;
            box-sizing: border-box;
        }
        .me{
            color:#333;
        }
        .terms{
            color:#E42034;
        }
        .popup{
            width:100%;
        }
        .popup>img{
            width:100%;
        }
        .pay{
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding:0 0.3rem;
        }
        .pay_left{
            font-size: 0.44rem;
            color: #EB122B;
            font-weight: 700;
        }
        .cardprice1{
            font-size: 0.8rem;
            color: #EB122B;
            font-weight: 700;
        }
        .cardprice2{
            color: #999999;
            font-weight: 700;
            text-decoration: line-through;
            margin-left: 0.2rem;
        }
        .lijipay{
            width:3.5rem;
            height:0.9rem;
            line-height: 0.9rem;
            text-align: center;
            font-size: 0.48rem;
            color: #fff;
            font-weight: 500;
            border-radius: 0.635rem;
            background: #FF122E;
        }
    /* 固定栏 */
        .fixed_right{
            width:1.3rem;
            font-size: 0.32rem;
            font-weight: 700;
            color: #fff;
            position:fixed;
            bottom: 2.9rem;
            right: -0.2rem;
        }
        .fixed_right>div{
            width:1.3rem;
            height: 1.3rem;
            text-align: center;
            border-radius: 50%;
            background: #F11831;
            box-sizing: border-box;
            padding-top: 0.2rem;
        }


        .top-swiper {
    position: fixed;
    bottom: 2.9rem;
    left: 15px;
    z-index: 1000;
    width: 190px;
    height: 28px;
    padding: 0 3px;
    font-size: 11px;
    color: #fff;
    background-color: rgba(0,0,0,0.6);
    box-sizing: border-box;
    border-radius: 14px;
    /* opacity: 0; */
    padding-top: 3px;
}

.top-swiper:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.top-swiper swiper-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.top-swiper .avatar {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border-radius: 50%;
}

.top-swiper .txt {
    -webkit-box-flex: 1;
    flex: 1;
    height: 23px;
    padding-right: 10px;
    line-height: 22px;
    overflow: hidden;
    display: box;
    display: -webkit-box;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    margin-left: -8px;
}
/* 弹框 */
    .tankuang{
        width:100%;
        height:100%;
        background: rgba(0, 0, 0, 0.3);
        position:fixed;
        top:0;
        left:0;
    }
    .content{
        width:7rem;
        margin:2rem auto 0.5rem;
        background-color: #fff;
        border-radius: 0.16rem;
        padding-bottom: 0.3rem;
    }
    .content_title{
        width:100%;
        text-align: center;
        font-size: 0.45rem;
        font-weight: 500;
        color: #333;
        box-sizing: border-box;
        padding: 0.3rem;
    }
    .content_img{
        width:80%;
        margin: 0 auto;
    }
    .content img{
        width:100%;
    }
    .tankuang>img{
        width:0.56rem;
        height:0.56rem;
        position:absolute;
        top:10rem;
        left:50%;
        transform:translateX(-50%);
    }
    /* 分享弹框 */
        .share-area {
            position: relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            padding: 26px 0 20px;
        }

        .share-area .item {
            -webkit-box-flex: 1;
            flex: 1;
            font-size: 13px;
            text-align: center;
            line-height: 20px;
            background-color: transparent;
            border-radius: 0;
        }

        .share-area .item img {
            width: 38px;
            height: 38px;
        }

    /* 音乐 */
        .bg_audio img{
            width: 40px;
            height: 40px;
            border-radius:50%;
            position: fixed;
            z-index:2;
            top: 10px;
            right: 10px;
        }
        .music-btn-ani {
            -webkit-animation: music 1.5s infinite linear;
            animation: music 1.5s infinite linear;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both
        }

        @keyframes music {
            0% {
                -webkit-transform: rotate(0deg) scale(1);
                transform: rotate(0deg) scale(1)
            }

            50% {
                -webkit-transform: rotate(180deg) scale(1.1);
                transform: rotate(180deg) scale(1.1)
            }

            to {
                -webkit-transform: rotate(1turn) scale(1);
                transform: rotate(1turn) scale(1)
            }
        }
        /* 动图 */
            .gif{
                width:8.1rem;
                height:4.5rem;
                overflow: hidden;
                position: absolute;
                top:22.35rem;
                left:0.96rem;
            }
            .gif>img{
                width:100%;
                height:100%;
                border-radius: 0.16rem;
            }
</style>