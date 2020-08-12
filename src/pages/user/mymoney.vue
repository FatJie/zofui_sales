<template>
	<div>
        <loading v-show="inited == 0 || inited == 1" :inited="inited"/>
		<div v-if="inited==2">
			<!-- 头部背景 -->
			<div class="header"></div>
			<!-- 头部卡片 -->
			<div class="card">
				<ul>
					<li>
						<span class="bottom">{{datalist.yesterday_income}}</span>
						<span class="top">昨日收入</span>
					</li>
					<li>
						<span class="bottom">{{datalist.today_income}}</span>
						<span class="top">今日收入</span>
					</li>
					<li>
						<span class="bottom">{{datalist.gross_income}}</span>
						<span class="top">总收入</span>
					</li>
				</ul>
				<span class="funds">可提现金额(元)</span>
				<div class="money">
					<span class="money_left">{{datalist.tixian_price}}</span>
					<span class="money_center" @click="tomx">明细</span>
					<span class="money_right" @click="totx" data-type="user">提现</span>
				</div>
				<div class="balance">
					<ul>
						<li>
							<span class="balance_top">账户余额(元)</span>
							<span class="balance_bottom">{{datalist.zong_price}}</span>
						</li>
						<li>
							<span class="balance_top">冻结金额(元)</span>
							<span class="balance_bottom">{{datalist.freeze}}</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 已提现金额 -->
			<div class="already">
				<ul>
					<li>
						<p class="already_top">{{datalist.zong_tixian}}</p>
						<p class="already_bottom">已提现金额(元)</p>
					</li>
					<li>
						<p class="already_top">{{datalist.zong_consumption}}</p>
						<p class="already_bottom">总消费金额(元)</p>
					</li>
				</ul>
			</div>
			<!-- 海报分享 -->
			<div class="share">
				<div class="share_top" @click="friends" data-type="index">
					<div class="friends">邀请好友</div>
					<div class="cash">赚取分享奖励 ></div>
				</div>
				<div class="share_bottom" @click="enter" data-type="index">
					<div class="invite">邀请入驻</div>
					<div class="enjoy">享受商家让利收入 ></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import wx from 'weixin-js-sdk';
	export default{
		name:'mymoney',
		created(){
			this.download();
		},
		data(){
			return{
				inited:0,
				datalist:{},
				isshop:'1',
				sharedata:''
			}
		},
		methods:{
			download(){
				this.$util.http('user','GET',{op:'info'},res=>{
					this.inited=1;
					this.datalist=res.data.userinfo;
					this.sharedata=res.data.sharedata;
					this.inited=2;
					var self = this;
					wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.updateAppMessageShareData({ 
                            title: res.data.sharedata.title, // 分享标题
                            desc: res.data.sharedata.desc, // 分享描述
                            link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: res.data.sharedata.img, // 分享图标
                        })
                    });
                }) 
			},
			tomx(){
				this.$router.push({path:'/cashdetails',query:{isshop:this.isshop}});
			},
			totx(e){
				this.$router.push({path:'/suretixian',query:{money:this.datalist.tixian_price,type:e.currentTarget.dataset.type}});
			},
			friends(e){
				this.$router.push({path:'/poster',query:{type:e.currentTarget.dataset.type}});
			},
			enter(e){
				this.$router.push({path:'/poster',query:{type:e.currentTarget.dataset.type}});
			}
		}
	}
</script>
<style scoped>
	/* 头部样式 */
		.header{
			width:100%;
			height:3.7rem;
			background-color:#FF6E40 ;
		}
		.card{
			width:9.35rem;
			height:6rem;
			margin:-3.3rem auto 0;
			background-color: #fff;
			border-radius: 0.16rem;
			text-align: center;
			position:relative;
		}
		.card>ul{
			width:100%;
			display: flex;
			justify-content: space-around;
		}
		.card li{
			width:33.33%;
			position:relative;
		}
		.card li:nth-child(2) span{
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
		.funds{
			font-size: 0.35rem;
			color:#333;
			position:absolute;
			top:2.34rem;
			left:0.35rem;
		}
		.money{
			width:100%;
			margin-top:1.65rem;
			display: flex;
			justify-content: space-between;
		}
		.money span{
			display: inline-block;
		}
		.money_left{
			color:#FF6E40;
			font-size: 0.8rem;
			font-weight: 700;
			margin-left:0.45rem;
		}
		.money_center,.money_right{
			width:2rem;
			height:0.9rem;
			line-height: 0.9rem;
			border-radius: 0.45rem;
			font-size:0.4rem ;
			text-align: center;
		}
		.money_center{
			color:#FF6E40;
			border:1px solid #FF6E40;
		}
		.money_right{
			color:#fff;
			background-color: #FF6E40;
			margin-right:0.35rem ;
		}
		.balance{
			width:100%;
			padding-bottom: 0.2rem;
		}
		.balance>ul{
			width:100%;
			display: flex;
			justify-content: space-around;
		}
		.balance li{
			width:50%;
			text-align: center;
			position:relative;
		}
		.balance_bottom{
			display: inline-block;
			width:100%;
			color:#333;
			font-size: 0.45rem;
			font-weight: 700;
			position:absolute;
			top:1.3rem;
			left:0;
		}
		.balance_top{
			display: inline-block;
			width:100%;
			color:#333;
			font-size: 0.35rem;
		}
	/* 已提现金额 */
		.already{
			width:9.35rem;
			height:2.7rem;
			margin:0.4rem auto 0;
			background-color: #fff;
			border-radius: 0.32rem;
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
			border-radius: 0.32rem;
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
</style>