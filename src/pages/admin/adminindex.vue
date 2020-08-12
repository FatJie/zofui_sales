<template>
    <div id="main">
        <!-- 头部 -->
        <div class="header">
            <ul>
                <li @click="scan">
                    <img :src="imgPre+'/1.png'">
                    <span>扫码验证</span>
                </li>
                <li>
                    <router-link to="adminhexiao">
                        <img :src="imgPre+'/2.png'">
                        <span>输码验证</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="adminhexiao">
                        <img :src="imgPre+'/3.png'">
                        <span>核销统计</span>
                    </router-link>
                </li>
                <li @click="onlinePay">
                    <img :src="imgPre+'/4.png'">
                    <span>在线买单</span>
                </li>
            </ul>
        </div>
        <!-- 今日数据 -->
        <div class="today_data">
            <span>今日数据 <font style="color:#FF6E40">【{{name}}】</font></span>
            <ul>
                <li>
                    <span class="top">{{todayfee}}</span>
                    <span class="middle">今日结算额(元)</span>
                    <span class="bottom">昨日 {{todayfees}}</span>
                </li>
                <li>
                    <span class="top">{{todayorder}}</span>
                    <span class="middle">今日订单数(笔)</span>
                    <span class="bottom">昨日 {{todayorders}}</span>
                </li>
                <li>
                    <span class="top">{{todayscan}}</span>
                    <span class="middle">今日访客数(人)</span>
                    <span class="bottom">昨日 {{todayscans}}</span>
                </li>
            </ul>
        </div>
        <!-- 商品管理 -->
        <div class="shop">
            <ul>
                <li>
                    <router-link to="/admingoods">
                        <img :src="imgPre+'/5.png'">
                        <span>商品管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/pubgood">
                        <img :src="imgPre+'/6.png'">
                        <span>发布普通商品</span>
                    </router-link>
                </li>
                <li @click="toSpecial">
                    <img :src="imgPre+'/6.png'">
                    <span>发布特权商品</span>
                </li>
                <li @click="qrcode" data-type="shop">
                    <img :src="imgPre+'/7.png'">
                    <span>店铺推广</span>
                </li>
                <li>
                    <router-link to="/mymembers">
                        <img :src="imgPre+'/8.png'">
                        <span>会员管理</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/rundata">
                        <img :src="imgPre+'/9.png'">
                        <span>经营数据</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/shopincome">
                        <img :src="imgPre+'/10.png'">
                        <span>店铺营收</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 广告位 -->
        <img src="">
    </div>
</template>
<script>
    import { ImagePreview,Dialog } from 'vant';
    import wx from 'weixin-js-sdk';
    export default {
        name:'adminindex',
        components: {
	    	[Dialog.name] : Dialog,
	  	},
        created(){
            this.initData();
        },
        data(){
                return{
                    imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                    istequan:0,
                    todayorder:0,
                    todayfee:0,
                    todayscan:0,
                    todayorders:0,
                    todayfees:0,
                    todayscans:0,
                    name:''
                }
            },
        methods:{
            onlinePay(){
                this.$router.push('/onlineposter');
            },
            toSpecial(){
                if(this.istequan==0){
                    this.$toast('暂未开通发布特权商品权限！')
                }else(
                    this.$router.push('/pubspecial')
                )
            },
            qrcode(e){
                var self = this;
                var postdata = {
                    op:'shopqrcode',
                    type : e.currentTarget.dataset.type
                }
                self.$util.http('admin','GET',postdata,function(res){
                    if (!res.errno && res.data) {
                        ImagePreview({
                            images : [res.data.url],
                            closeOnPopstate : true
                        });
                    }else{
                        self.$toast(res.message);
                    }
                },true);
            },
            scan(){
                wx.scanQRCode();
            },
            initData(){
                this.$util.http('admin','GET',{op:'index'},res=>{
                    this.todayorder=res.data.shop.todayorder;
                    this.todayfee=res.data.shop.todayfee;
                    this.todayscan=res.data.shop.todayscan;
                    this.todayorders=res.data.shop.todayorders;
                    this.todayfees=res.data.shop.todayfees;
                    this.todayscans=res.data.shop.todayscans;
                    this.istequan=res.data.shop.istequan;
                    this.name=res.data.shop.name;
	            },true);
            }
        }
    }
</script>
<style scoped>
    /* 头部样式 */
        #main{
            width:100%;
        }
        .header{
            width:100%;
            height:5.2rem;
            background: #FF6E40;
            font-size:0.35rem ;
            color:#fff;
            text-align: center;
        }
        .header>ul{
            width:100%;
            display: flex;
            justify-content: space-around;
            padding-top:0.9rem;
        }
        .header li{
            width:25%;
        }
        .header img{
            width:0.8rem;
            height:0.8rem;
            padding-bottom:0.24rem;
        }
        .header span{
            display: inline-block;
            width:100%;

        }
    /* 今日数据样式 */
        .today_data{
            width:9.35rem;
            height:3.5rem;
            margin:-2.4rem auto 0;
            background: #fff;
            border-radius:0.32rem ;
            position:relative;
        }
        .today_data>span{
            display: inline-block;
            width:90%;
            height:0.35rem;
            font-size:0.4rem;
            font-weight:bold;
            color:rgba(51,51,51,1);
            position:absolute;
            top:0.5rem;
            left:0.4rem;
        }
        .today_data>span>font{
            display: inline-block;
            width:4rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .today_data>ul{
            width:100%;
            display: flex;
            justify-content: space-around;
        }
        .today_data li{
            width:33.33%;
            text-align: center;
            margin-top:1.4rem;
        }
        .today_data li:nth-child(2){
            border-left:1px solid #f4f4f4;
            border-right: 1px solid #f4f4f4;
        }
        .top,.middle,.bottom{
            display: block;
            color:#333;
        }
        .top{
            font-size: 0.45rem;
            font-weight: bold;
        }
        .middle{
            font-size: 0.35rem;
            font-weight: bold;
            margin:0.1rem 0;
        }
        .bottom{
            font-size: 0.26rem;
        }
    /* 商品管理 */
        .shop{
            width:100%;
            font-size:0.35rem ;
            text-align: center;
        }
        .shop>ul{
            width:100%;
            display: flex;
            justify-content:start;
            flex-wrap: wrap;
            padding-top:0.7rem;
        }
        .shop li{
            width:33.33%;
            margin-bottom:1.1rem;
        }
        .shop img{
            width:0.7rem;
            height:0.7rem;
            margin-bottom: 0.42rem;
        }
        .shop span{
            display: inline-block;
            width:100%;

        }
</style>