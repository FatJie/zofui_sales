<template>
	<div>
		<loading v-show="inited == 0 || inited == 1" :inited="inited" />
		<div style="margin-bottom: 0.3rem;" v-if="inited == 2">
			<!-- 头部背景 -->
			<div class="header"></div>
			<!-- 头部卡片 -->
			<div class="card">
				<router-link to="reddetails">
					<div class="red">分红明细</div>
				</router-link>
				<div class="items">
					<div class="avater">
						<img :src="userinfo.headimg">
					</div>
					<div class=item_right>
						<div class="item_top">
							{{userinfo.nickname}}
						</div>
						<div class="item_bottom">
							<font>所属区域：</font><font>{{userinfo.agentarea}}</font>
						</div>
					</div>
				</div>
				<div class="earnings">
					<ul>
						<li>
							<span class="bottom">{{userinfo.month_income}}</span>
							<span class="top">本月收入</span>
						</li>
						<li>
							<span class="bottom">{{userinfo.zhituiorder}}</span>
							<span class="top">推广订单</span>
						</li>
						<li>
							<span class="bottom">{{userinfo.zhituishop}}</span>
							<span class="top">推广店铺</span>
						</li>
					</ul>
				</div>
			</div>
			
			<div class="earnings" style="width:9.35rem;margin: 0 auto;">
				<ul style="height:2.5rem;margin-top: 0.4rem;background: #fff;border-radius: 0.16rem;">
					<li>
						<span class="bottom">{{userinfo.month_bonus}}</span>
						<span class="top">本月预估</span>
					</li>
					<li>
						<span class="bottom">{{userinfo.lastmonth_bonus}}</span>
						<span class="top">上月分红</span>
					</li>
					<li>
						<span class="bottom">{{userinfo.zong_bonus}}</span>
						<span class="top">总分红</span>
					</li>
				</ul>
			</div>
	
			<!-- 查看权益店铺 -->
			<!-- <div class="user-list" style="width:9.35rem;margin:0.4rem auto 0;background:#fff;border-radius: 0.16rem;">
				<div class="item thin-border_b" style="box-sizing: border-box;padding: 0 0.4rem;">
					<div class="lt">
						<img class="icon" src="http://img11.360buyimg.com/ddimg/jfs/t1/57949/24/15068/1720/5dbeee83E4e358ef6/05fe45612a157ab5.png">
						<div class="tit">累计总收入</div>
					</div>
					<div class="info">0元</div>
				</div>
				<div class="home" style="width:100%;display: flex;justify-content: space-between;text-align: center;font-size:0.38rem ;color: #1e1e1e;">
					<div class="team" style="width:50%;padding:0.5rem 0;">
						<div style="width:100%;">0</div>
						<div style="width:100%;">门店总数(家)</div>
					</div>
					<div class="shop" style="width:50%;padding:0.5rem 0;color: #FF6E40;">
						<router-link to="/profitshop">
							<div style="width:100%;">0</div>
							<div style="width:100%;">权益店铺(家)</div>
						</router-link>
					</div>
				</div>
			</div> -->
	
			<div class="home" style="width:9.35rem;display: flex;justify-content: space-between;text-align: center;font-size:0.38rem ;color: #1e1e1e;border-radius: 0.16rem;margin: 0.4rem auto 0;background: #fff;">
				<div class="team" style="width:50%;padding:0.5rem 0;">
					<div style="width:100%;">0</div>
					<div style="width:100%;">个人业绩(元)</div>
				</div>
				<div class="shop" style="width:50%;padding:0.5rem 0;">
					<router-link to="/profitshop">
						<div style="width:100%;">0</div>
						<div style="width:100%;">预计奖励(元)</div>
					</router-link>
				</div>
			</div>
	
			<div class="user-link wrap" style="width:9.35rem;background: #fff;margin: 0.4rem auto 0;padding: 0.2rem;box-sizing: border-box;border-radius: 0.16rem;">
				<div @click="link" data-url="/fenxiaocard_record" class="item bg01" :style="{width:params.pfrank == 0 ? '2.7rem' : '3rem'}">
					<img class="icon" src="http://img11.360buyimg.com/ddimg/jfs/t1/80631/11/14265/2117/5dbef0bdE14cb3c8a/482800ce3029588b.png">
					<div>订单推广记录</div>
				</div>
				<div class="item bg02" @click="link" data-url="/fenxiaorank" v-if="params.pfrank == 0 || !params.pfrank">
					<img class="icon" src="http://img11.360buyimg.com/ddimg/jfs/t1/103092/17/1477/2227/5dbef0e0Eaf5112c1/8182ef204a21162b.png">
					<div>达人排行榜</div>
				</div>
				<div class="item bg03" @click="link" data-url="/fenxiaocard_record" :style="{width:params.pfrank == 0 ? '2.7rem' : '3rem'}">
					<img class="icon" src="http://img11.360buyimg.com/ddimg/jfs/t1/45970/10/15138/1767/5dbef0f2E4e21d94e/a345a7f50602e561.png">
					<div>会员推广记录</div>
				</div>
			</div>
	
			<!-- 海报分享 -->
			<div class="share">
				<div class="share_top" @click="getPoster" data-type="index">
					<div class="friends">邀请好友</div>
					<div class="cash">赚取分享奖励 ></div>
				</div>
				<div class="share_bottom" @click="getPoster" data-type="index">
					<div class="invite">邀请入驻</div>
					<div class="enjoy">享受商家让利收入 ></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import wx from 'weixin-js-sdk';
	export default {
        // name : 'shopprofit',
	  	data : function(){
	  		return {
				inited:false,
                isrefresh : false,
                inited : false,
	  			params : {},
	  			userinfo : {},
	  			sharedata :{},
	  			datalist : [],
                feedata : {},
                needback : false,
	  		}
	  	},
	  	created:function(e){
            // if( this.inited && this.$route.meta.keepAlive ) return false;
            this.initData();
            
            this.$route.meta.keepAlive = true;
	  	},
	  	methods: {
			link(e){
            	this.$router.push(e.currentTarget.dataset.url);
            },
			getPoster(e){
                this.$router.push({path:'/poster',query:{type:e.currentTarget.dataset.type}})
            },
			toProfit(){
				this.$router.push('/profitshop')
			},
            onRefresh(){
                this.initData();
            },
            initData(){
                var self = this;
                var query = this.$route.query;
                var postdata = {
                    op : 'index',
                    zfid : query.zfid ? query.zfid : 0,
				}
                self.$util.http('agent','GET',postdata,function(res){ 
					self.inited==1;
	                if( !res.errno && res.data ){

	                	self.needback = false;
                        self.sharedata = res.data.sharedata;
                        self.params = res.data.params;
	                   	self.feedata = res.data.feedata ? res.data.feedata : {};
						self.userinfo = res.data.userinfo;
	                	self.inited = 2;
						wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
							wx.updateAppMessageShareData({ 
								title: res.data.sharedata.title, // 分享标题
								desc: res.data.sharedata.desc, // 分享描述
								link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: res.data.sharedata.img, // 分享图标
							})
						});
                    }else if( res.errno == 3 ){
                        var isback = self.$util.cookie.get('needback');
                        if( isback ){
                            self.$util.cookie.del('needback');
                            self.$router.push('/user');
                        }else{
                            self.$toast({
                                message : res.message,
                                duration : 1000,
                                onClose : function(){
                                    self.$router.push('/agentjoin');
                                }
                            });
                            self.$util.cookie.set('needback',1,3600);
                        }
	                }else{
	                	self.$toast(res.message);
	                }
					self.isrefresh = false;
					self.inited==2;
	            });
            },
	  	}
  	}
</script>
<style scoped>
    /* 头部样式 */
        .red{
            width:1.8rem;
            height:0.7rem;
            line-height: 0.7rem;
            text-align: center;
            color:#FF6E40;
            font-size: 0.35rem;
            font-weight: 700;
            background: linear-gradient(to bottom, #FFEDB3 , #FCC46D);
            border-top-left-radius: 0.35rem;
            border-bottom-left-radius: 0.35rem;
            position: absolute;
            top:0.7rem;
            right: 0;
        }
        .header{
			width:100%;
			height:3.7rem;
			background-color:#FF6E40 ;
		}
        .card{
            width:9.5rem;
            height:3.75rem;
            background-color: #fff;
            margin:-3.3rem auto 0;
            padding:0.39rem 0.5rem 0.48rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
            position: relative;
        }
        .items{
            display: flex;
        }
        .avater{
            width:1.35rem;
            height:1.35rem;
            overflow: hidden;
            border-radius: 50%;;
        }
        .avater>img{
            width:1.35rem;
            height:1.35rem;
        }
        .item_right{
            width:6rem;
            margin-left: 0.43rem;
        }
        .item_top{
            width:80%;
            font-size: 0.42rem;
            color:#333;
            font-weight: 700;
            float: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .item_bottom{
            width:100%;
            font-size: 0.32rem;
            margin-top:0.82rem ;
            color:#333;
        }
        .earnings{
            width:100%;
			text-align: center;
        }
        .earnings>ul{
			width:100%;
			display: flex;
			justify-content: space-around;
		}
		.earnings li{
			width:33.33%;
			position:relative;
		}
		.earnings li:nth-child(2) span{
			border-left: 1px solid #f4f4f4;
			border-right: 1px solid #f4f4f4;
		}
        .orders{
            width:9.35rem;
            height:2.2rem;
			margin:0.4rem auto 0;
			background-color: #fff;
			border-radius: 0.16rem;
			text-align: center;
		}
		.orders>ul{
			width:100%;
			display: flex;
			justify-content: space-around;
		}
		.orders li{
			width:33.33%;
			position:relative;
		}
		.orders li:nth-child(2) span{
			border-left: 1px solid #f4f4f4;
			border-right: 1px solid #f4f4f4;
		}
		.bottom,.top{
			display: inline-block;
			width: 100%;
			color:#333;
		}
		.bottom{
			font-weight: 700;
			font-size:0.46rem ;
		}
		.top{
			font-size: 0.35rem;
			position:absolute;
			top:1.2rem;
			left:0;
		}
    /* 上架商品总数 */
        .look{
            font-size:0.32rem ;
            color:#FF6E40;
            position:absolute;
            top:0.3rem;
            right: 0.5rem;
        }
        .already{
			width:9.35rem;
			height:2.7rem;
			margin:0.4rem auto 0;
			background-color: #fff;
			border-radius: 0.16rem;
            position:relative;
		}
		.already>ul{
			width:100%;
			display: flex;
			justify-content: space-around;
		}
		.already li{
			width:50%;
			margin-top:0.84rem;
		}
		.already li:first-child{
			border-right: 1px solid #f4f4f4;
		}
		.already_top,.already_bottom{
			margin:0;
			text-align: center;
		}
		.already_top{
			font-size: 0.45rem;
			font-weight: 700;
			color:#333;
		}
		.already_bottom{
			font-size: 0.35rem;
			color:#333;
		}
    /* 海报分享 */
		.share{
			width:9.35rem;
			height:2.7rem;
			margin:0.4rem auto 0;
			border-radius: 0.16rem;
			background-color: #fff;
		}
		.share_top,.share_bottom{
			width:100%;
			height:1.35rem;
			line-height: 1.35rem;
			display: flex;
			justify-content: space-between;
			text-align: center;
			padding-right:0.5rem;  
			padding-left:1.5rem;
			box-sizing: border-box;
		}
		.share_top{
			border-bottom: 1px solid #f4f4f4;
			background-image: url(../../assets/income/coin.png);
			background-repeat: no-repeat;
			background-size:0.4rem ;
			background-position: 8% center;
		}
		.share_bottom{
			background-repeat: no-repeat;
			background-image: url(../../assets/income/order.png);
			background-size:0.4rem ;
			background-position: 8% center;
		}
		.friends,.invite{
			font-size: 0.38rem;
			color:#333;
			font-weight: 600;
		}
		.cash,.enjoy{
			color:#FF6E40;
			font-size: 0.32rem;
		}
		.user-list .item {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			height: 44px;
			font-size: 13px;
			line-height: 44px;
			color: #1e1e1e;
		}

		.user-list .item:last-child:after {
			visibility: hidden;
		}

		.user-list .item .lt {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-flex: 1;
			flex: 1;
			-webkit-box-align: center;
			align-items: center;
		}

		.user-list .item .icon {
			width: 20px;
			height: 20px;
			margin-right: 7.5px;
		}

		.user-list .item .tit {
			font-size: 14px;
		}

		.user-list .item .info {
			float: right;
			color: #969696;
		}
		.user-link {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: justify;
			justify-content: space-between;
			padding-top: 25px;
			padding-bottom: 25px;
		}

		.user-link .item {
			width: 103px;
			height: 80px;
			font-size: 13px;
			text-align: center;
			line-height: 16px;
			color: #fff;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-size: 100% 100%;
			border-radius: 2px;
			box-shadow: 0 0 2.5px 0 rgba(0,0,0,0.1);
		}

		.user-link .item.bg01 {
			background-image: url(http://img11.360buyimg.com/ddimg/jfs/t1/61286/34/14738/3020/5dbef17fE16f0d147/221b025b6a3eed7c.jpg);
		}

		.user-link .item.bg02 {
			background-image: url(http://img11.360buyimg.com/ddimg/jfs/t1/90762/24/1388/2344/5dbef190E9ed4060f/ccfe83a2c1d2a42f.jpg);
		}

		.user-link .item.bg03 {
			background-image: url(http://img11.360buyimg.com/ddimg/jfs/t1/58878/30/14762/2566/5dbef1a1E24d050b2/1b850bca6d66123d.jpg);
		}

		.user-link .item .icon {
			width: 32px;
			height: 32px;
			margin: 12px auto 5px;
		}
</style>