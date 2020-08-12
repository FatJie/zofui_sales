<template>
    <div id="mine">
        <loading v-show="inited == 0 || inited == 1" :inited="inited" />
        <div v-if="inited == 2">
            <!-- 个人信息 -->
            <div class="header">
                <div class="avater">
                    <img :src="datalist.headimg">
                </div>
                <div class="header_name">
                        <div class="header_name_top">
                            <span>{{datalist.nickname}}</span>
                            <span>
                                <font v-if="datalist.qiangruo==1 || datalist.editnum > 0" @click="toReferrals">联系推荐人</font>
                                <font v-if="datalist.qiangruo==0 && datalist.editnum==0" @click="bind">更换推荐人</font>
                            </span>
                        </div>
                        <div class="header_name_center">
                            <font v-if="datalist.endtime">{{datalist.endtime}}</font>
                        </div>
                        <!-- 对应会员等级名称显示 -->
                        <div class="header_name_bottom" v-if="datalist.grade==0">
                            <span>普通会员</span>
                            <span v-if="datalist.parent">ID:{{datalist.id}}</span>
                        </div>
                        <div class="header_name_bottom" v-if="datalist.grade==1">
                            <span>VIP会员</span>
                            <span v-if="datalist.parent">ID:{{datalist.id}}</span>
                        </div>
                        <div class="header_name_bottom" v-if="datalist.grade==2">
                            <span>服务商</span>
                            <span v-if="datalist.parent">ID:{{datalist.id}}</span>
                        </div>
                        <div class="header_name_bottom" v-if="datalist.grade==3">
                            <span>代理商</span>
                            <span v-if="datalist.parent">ID:{{datalist.id}}</span>
                        </div>
                </div>
            </div>
            <!-- 内容主体 -->
            <div class="content">
                <!-- 收入版块 -->
                <div class="income" v-show="datalist.grade!=0">
                    <div class="income_top">
                        <span class="income_top_left">本月收入</span>
                        <span class="income_top_center">{{datalist.month_income}}</span>
                        <span class="income_top_right" @click="toAll">查看所有收入</span>
                    </div>
                    <div class="comsume">
                        <span class="comsume_left">本月消费额</span>
                        <span class="comsume_right">{{datalist.consumption}}</span>
                    </div>
                    <div class="today">
                        <p class="today_left">
                            <span>{{datalist.today_income}}</span>
                            <span>今日收入 (元)</span>
                        </p>
                        <p class="today_center" v-if="datalist.grade!=3">
                            <span>{{datalist.freeze}}</span>
                            <span>冻结收入 (元)</span>
                        </p>
                        <p class="today_right">
                            <span>{{datalist.gross_income}}</span>
                            <span>总收入 (元)</span>
                        </p>
                    </div>
                </div>
                <!-- 绑定手机号 -->
                <router-link to="/bindphone">
                    <div class="add_phone" v-if=" datalist.account == null || datalist.account == '' ">
                        <font>未绑定手机号？</font>
                        <font>立即绑定</font>
                    </div>
                </router-link>
                <!-- 普通会员特权版块 -->
                <div class="invite" v-show="datalist.grade==0">
                    <div class="invite_left">
                        <router-link to="/buycard">
                            <img :src="imgPre+'/toVIP.png'">
                        </router-link>
                    </div>
                    <div class="invite_left" @click="toServer"><img :src="imgPre+'/server.png'"></div>
                </div>
                <!-- 邀请版块 -->
                <div class="invite" v-show="datalist.grade >= 2">
                    <div class="invite_left" @click="getPoster" data-type="vip"><img :src="imgPre+'/invite_VIP.png'"></div>
                    <div class="invite_left" @click="getPoster" data-type="server"><img :src="imgPre+'/invite_server.png'"></div>
                </div>
                <!-- 升级服务商（VIP会员） -->
                <div @click="toServer" class="unit" v-show="datalist.grade==1">
                    <img :src="imgPre+'/toserver.png'">
                </div>
                <!-- 我的订单 -->
                <div class="order">
                    <div class="order_top">
                        <p>我的订单</p>
                        <p @click="orderlist">查看所有订单</p>
                    </div>
                    <div class="order_bottom">
                        <div class="order_item">
                            <router-link to="/orderlist?status=1">
                                <img :src="imgPre+'/rights.png'">
                                <p>待付款</p>
                            </router-link>
                        </div>
                        <div class="order_item">
                            <router-link to="/orderlist?status=2">
                                <img :src="imgPre+'/used.png'">
                                <p>待使用</p>
                            </router-link>
                        </div>
                        <div class="order_item">
                            <router-link to="/orderlist?status=3">
                                <img :src="imgPre+'/completed.png'">
                                <p>待完成</p>
                            </router-link>
                        </div>
                        <div class="order_item">
                            <router-link to="/orderlist?status=4 ">
                                <img :src="imgPre+'/evaluate.png'">
                                <p>待评价</p>
                            </router-link>
                        </div>
                    </div>
                </div>
                <!-- 邀请好友有礼(普通会员/VIP会员) -->
                <div class="invite_gift" v-show="datalist.grade <= 1" @click="getPoster" data-type="friend">
                    <p>邀请有礼 分享赚钱</p>
                    <p>邀请好友</p>
                </div>
                <!-- 我的资产 -->
                <!-- <div class="assets">
                    <div class="assets_top">
                        <p>我的资产</p>
                        <p>查看所有资产</p>
                    </div>
                    <div class="assets_bottom">
                        <ul>
                            <li class="assets_bottom_item">
                                <p>999.00</p>
                                <p>资产总额</p>
                            </li>
                            <li class="assets_bottom_item assets_middle">
                                <p>99.00</p>
                                <p>消费额</p>
                            </li>
                            <li class="assets_bottom_item">
                                <p>900.00</p>
                                <p>余额</p>
                            </li>
                        </ul>
                    </div>
                </div> -->
                <!-- 我的邀请 -->
                <div class="assets">
                    <div class="assets_top">
                        <p>我的邀请</p>
                        <p @click="renmai">查看所有人脉</p>
                    </div>
                    <div class="assets_bottom">
                        <ul>
                            <li class="assets_bottom_item">
                                <p>{{datalist.zhitui}}</p>
                                <p>一度人脉</p>
                            </li>
                            <li class="assets_bottom_item assets_middle">
                                <p>{{datalist.jiantui}}</p>
                                <p>二度人脉</p>
                            </li>
                            <li class="assets_bottom_item">
                                <p>{{datalist.qianzai}}</p>
                                <p>潜在人脉</p>
                            </li>
                        </ul>
                        <div class="line_left"></div>
                        <div class="line_right"></div>
                    </div>
                </div>
                <!-- 我的工具 -->
                <div class="tools">
                    <div class="tools_title">我的工具</div>
                    <div class="tools_content">
                        <ul>
                            <li class="tools_content_item">
                                <router-link to="/mypromot">
                                    <img :src="imgPre+'/zhibo.png'">
                                    <p>我的推广</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item" @click="toShop">
                                <img :src="imgPre+'/Merchants.png'">
                                <p>商户中心</p>
                            </li>
                            <li class="tools_content_item" @click="togd">
                                <img :src="imgPre+'/group.png'">
                                <p>代理中心</p>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/redbagmylist">
                                    <img :src="imgPre+'/redpag.png'">
                                    <p>我的红包</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/groupmylist">
                                    <img :src="imgPre+'/pingdan.png'">
                                    <p>拼单商品</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/cardmylist">
                                    <img :src="imgPre+'/youhui.png'">
                                    <p>优惠券</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/cutmylist">
                                    <img :src="imgPre+'/biaoqian.png'">
                                    <p>减价活动</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/collect">
                                    <img :src="imgPre+'/shoucang.png'">
                                    <p>我的收藏</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/aboutindex">
                                    <img :src="imgPre+'/team.png'">
                                    <p>关于我们</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item">
                                <router-link to="/page?id=195">
                                    <img :src="imgPre+'/strategy.png'">
                                    <p>新手指南</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item" v-if="datalist.id==6106 || datalist.id==1687 || datalist.id==5558 || datalist.id==6063  || datalist.id==1682  || datalist.id==1686">
                                <router-link to="/extension">
                                    <img :src="imgPre+'/11.png'">
                                    <p>拓客专区1</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item" v-if="datalist.id==6106 || datalist.id==1687 || datalist.id==5558 || datalist.id==6063  || datalist.id==1682  || datalist.id==1686">
                                <router-link to="/extension2">
                                    <img :src="imgPre+'/11.png'">
                                    <p>拓客专区2</p>
                                </router-link>
                            </li>
                            <li class="tools_content_item" v-if="datalist.id==5558">
                                <router-link to="/groupmylist">
                                    <img :src="imgPre+'/11.png'">
                                    <p>拼团列表</p>
                                </router-link>
                            </li>
                            <!-- <li class="tools_content_item">
                                <router-link>
                                    <img :src="imgPre+'/Promo.png'">
                                    <p>优惠码</p>
                                </router-link>
                            </li> -->
                            <!-- <li class="tools_content_item">
                                <router-link to="/helplist">
                                    <img :src="imgPre+'/wenhao.png'">
                                    <p>帮助中心</p>
                                </router-link>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { Loading } from 'vant';
    import wx from 'weixin-js-sdk';
	export default {
        components: {
            [Loading.name]: Loading,
        },
        deactivated() {
            this.inited = 0;
        },
        activated(e){
            
            this.initData();
			
            this.$route.meta.keepAlive = true;
        },
        data(){
            return{
                inited : false,
                datalist:{},
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile'
            }
        },
        
        methods:{
            toReferrals(){
                this.$router.push('/referrals');
            },
            bind(){
                this.$router.push('/bindrecommend');
            },
            getPoster(e){
                this.$router.push({path:'/poster',query:{type:e.currentTarget.dataset.type}})
            },
            //跳转至我的人脉
            renmai(){
                this.$router.push('/myconnection');
            },
            togd(){
                if(this.datalist.grade < 3){
                    this.$router.push("/agentjoin")
                }else{
                    this.$router.push("/shopprofit")
                }
            },
            //跳转商户后台
            toShop(){
                if(this.datalist.isshop==0){
                    this.$router.push('/shopenter');
                }
                else{
                    this.$router.push('/adminlogin');
                }
            },
            toAll(){
                this.$router.push('/mymoney')
            },
            //跳转订单
            orderlist(){
                this.$router.push("/orderlist");
            },
            //升级服务商
            toServer(){
                this.$router.push('/buyserver');
            },
            // 请求后台数据
            initData(){
                var postData={
                    op:'info',
                    zfid: this.$route.query.zfid ? this.$route.query.zfid : ''
                }
                this.$util.http('user','GET',postData,res=>{
                    this.inited = 1;
                    this.datalist=res.data.userinfo;
                    this.inited = 2;
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
    #mine{
        width:100%;
        background: #eee;
    }
    #mine *{
        box-sizing:border-box;
    }
    /* 个人信息样式 */
        .header{
            width:100%;
            height:3.48rem;
            background:#ff6e40;
            display: flex;
            padding:0.45rem 0.56rem 0.56rem;
        }
        .avater{
            width:1.3rem;
            height:1.3rem;
            border:1px solid #fff;
            border-radius: 50%;
            overflow: hidden;
        }
        .avater>img{
            width:1.3rem;
            height:1.3rem;
        }
        .header_name{
            width:80%;
            margin-left:2%;
        }
        .header_name_top{
            width:70%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.2rem;
        }
        .header_name_center{
            color: #fff;
            margin-bottom: 0.1rem;
            font-size: 0.325rem;
        }
        .header_name_top>span:first-child{
            display:inline-block;
            width:58%;
            color:#fff;
            font-size: 0.53rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .header_name_top>span:last-child{
            display: inline-block;
            border-radius: 0.16rem;
            border:1px solid #fff;
            color: #fff;
            font-size: 0.325rem;
            padding:2px;
        }
        .header_name_bottom{
            width:70%;
            display: flex;
            justify-content: space-between;
        }
        .header_name_bottom>span:first-child{
            display: inline-block;
            height:0.56rem;
            line-height: 0.56rem;
            padding:0 0.2rem 0 0.5rem ;
            font-size:0.285rem;
            color:#fefefe;
            border-radius: 0.28rem;
            background:rgba(255,255,255,0.2);
            background-image: url(../../assets/mine/level.png);
            background-position:5% center  ;
            background-repeat: no-repeat;
            background-size: 0.35rem ;
        }
        .header_name_bottom>span:nth-child(2){
            display: inline-block;
            height:0.56rem;
            padding:0 0.2rem;
            background:rgba(255,255,255,0.4);
            line-height: 0.56rem;
            text-align: center;
            font-size:0.27rem;
            border-radius: 0.29rem;
            color:#fff;
            margin-right:0;
        }
    /* 收入样式 */
        .content{
            width:9.36rem;
            margin:-0.7rem auto 1.8rem;  
        }
        .income{
            width:100%;
            height:5.33rem;
            display:flex;
            flex-wrap: wrap;
            padding:0.5rem  0.38rem;
            border-radius: 0.36rem;
            font-size: 0.375rem;
            background: #fff;
            margin-bottom:0.5rem;
        }
        .income_top,.comsume,.today{
        width:100%;
        }
        .income_top{
            margin-bottom:0.5rem;
        }
        .comsume{
            margin-bottom:0.5rem;
            padding-bottom:0.5rem;
            border-bottom:1px solid #F2F2F2;
        }
        .income_top_left,.comsume_left{
            color:#666;
        }
        .income_top_center,.comsume_right{
            width:0.95rem;
            height:0.36rem;
            margin-left:0.37rem;
            font-size: 0.47rem;;
            font-weight:700;
            color:rgba(51,51,51,1);
        }
        .income_top_right{
            width:2.5rem;
            height:0.4rem;
            font-size: 0.32rem;
            float:right;
            text-align: right;
            font-weight:500;
            color:rgba(255,110,64,1);
        }
        .today{
            display: flex;
            padding-bottom: 0.5rem;
            text-align: center;
        }
        .today_left,.today_center,.today_right,.today span{
        display: inline-block; 
        }
        .today_left,.today_right,.today_center{
            width:50%;
            margin:0;
            padding:0;
        }
        .today_left,.today_center{
            border-right:1px solid #f2f2f2;
        }
        .today span{
            width:100%
        }
        .today_left>span:first-child,.today_right>span:first-child,.today_center>span:first-child{
            color:#333;
            font-size: 0.5rem;
            padding-bottom:0.26rem;
            font-weight: 700;
        }
        .today_left>span:last-child,.today_right>span:last-child,.today_center>span:last-child{
            color:#333;
            font-size: 0.33rem;
        }
    /* 邀请板块 */
        .invite{
            width:100%;
            display: flex;
            justify-content: space-between;
        }
        .invite_left,.invite_right{
            width:49%;
        }
        .invite img{
            width:100%;
        }
    /* 合伙人成为联合创始人入口 */
        .unit{
            width:100%;
        } 
        .unit>img{
            width:100%;
        }
    /* 我的订单样式 */
        .order,.assets,.tools{
            width:100%;
            background: #fff;
            margin-top:0.05rem;
            border-radius: 0.36rem;
        }
        .order_top,.assets_top{
            width:100%;
            display: flex;
            padding:0 0.32rem;
            border-bottom: 1px solid #f2f2f2;
            justify-content: space-between;
        }
        .order_top>p:first-child,.assets_top>p:first-child{
            font-size: 0.375rem;
            color:#333;
            font-weight: 700;
        }
        .order_top>p:last-child,.assets_top>p:last-child{
            font-size: 0.32rem;
            color:#FF6E40;
        }
        .order_bottom{
            display: flex;
            justify-content: space-around;
            padding:0.5rem 0.5rem 0;
        }
        .order_item{
            width:25%;
            text-align: center;
            font-size:0.32rem ;
            color:#666;
        }
        .order_item img{
            width:0.6rem;
            height:0.6rem;
        }
    /* 邀请好友 */
        .add_phone{
            width:100%;
            height:1.2rem;
            line-height: 1.2rem;
            font-size: 0.4rem;
            display: flex;
            justify-content: space-between;
            font-weight: 700;
            background-color: #fff;
            box-sizing: border-box;
            padding:0 0.35rem;
            border-radius: 0.16rem;
            margin-bottom: 0.5rem;
        }
        .add_phone>font:last-child{
            color: #ff6e40;
        }
        .invite_gift{
            width:100%;
            height:1rem;
            line-height:0.55rem;
            display:flex;
            justify-content: space-between;
            padding:0.2rem 0.35rem 0.2rem 1.2rem ;
            margin: 0.5rem 0;
            font-size: 0.3rem;
            font-weight: 700;
            background-color: #fff;
            border-radius: 0.2rem;
            background-image: url(http://ykd.lsh199.com/attachment/images/global/mobile/gifts.png);
            background-repeat: no-repeat;
            background-size: 0.5rem;
            background-position: 5% center;
        }
        .invite_gift>p{
            margin:0;
        }
    /* 我的邀请样式 */
        .assets{
            width:100%;
            margin:0.5rem 0;
        }
        .assets_bottom{
            position:relative;
        }
        .assets_bottom>ul{
            list-style: none;
            display: flex;
            justify-content: space-between;
            text-align: center;
        }
        .assets_bottom_item{
            width:33%;
        }
        .line_left,.line_right{
            width:1px;
            height:1.8rem;
            background-color:#f2f2f2;
            position:absolute;
            top:0.55rem;
        }
        .line_left{
            left:3.11rem;
        }
        .line_right{
            right: 3.11rem;
        }
        .assets_bottom_item>p:first-child{
            width:100%;
            font-size:0.6rem;
            color:#333;
            font-weight: bold;
        }
        .assets_bottom_item>p:last-child{
            width:100%;
            font-size:0.35rem;
            color:#333;
        }
    /* 我的工具样式 */
        .tools_title{
            width:100%;
            padding:0.3rem; 
            border-bottom: 1px solid #f2f2f2;
            margin-bottom:0.75rem;
            font-size: 0.375rem;
            color:#333;
            font-weight: 700;
        }
        .tools_content{
            width:100%;
        }
        .tools_content>ul{
            width:100%;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            justify-content: start;
        }
        .tools_content_item{
            width:25%;
            font-size: 0.32rem;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .tools_content_item img{
            width:0.7rem;
            height:0.7rem;
        }
</style>