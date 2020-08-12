<template>
    <div>
        <!-- 头部背景 -->
		<div class="header"></div>
		<!-- 头部卡片 -->
		<div class="card">
            <div class="item">
                <div class="avater">
                    <img :src="list.headimg">
                </div>
                <div class=item_right>
                    <div class="item_top">
                        {{list.name}}
                    </div>
                    <div class="item_bottom">
                        <font>推荐上级：</font><font> {{list.parentname}} (ID:<font>{{list.parentid}}</font>)</font>
                    </div>
                </div>
            </div>
            <div class="earnings">
                <ul>
                    <li>
                        <span class="bottom">{{list.today}}</span>
                        <span class="top">今日收益</span>
                    </li>
                    <li>
                        <span class="bottom">{{list.yesterday}}</span>
                        <span class="top">昨日收益</span>
                    </li>
                    <li>
                        <span class="bottom">{{list.whole}}</span>
                        <span class="top">总收益</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 商家商品总数 -->
        <div class="already">
			<ul>
				<li>
					<p class="already_top">{{list.goodsnum}}</p>
					<p class="already_bottom">上架商品总数(份)</p>
				</li>
				<li>
					<p class="already_top">{{list.whole}}</p>
					<p class="already_bottom">推荐店铺收益(元)</p>
				</li>
			</ul>
        </div>
        <!-- 订单数 -->
        <div class="orders">
            <ul>
                <li>
                    <span class="bottom">{{list.todayorder}}</span>
                    <span class="top">今日订单</span>
                </li>
                <li>
                    <span class="bottom">{{list.yesterdayorder}}</span>
                    <span class="top">昨日订单</span>
                </li>
                <li>
                    <span class="bottom">{{list.wholeorder}}</span>
                    <span class="top">总订单</span>
                </li>
            </ul>
        </div>
        <!-- 推广本店 -->
        <div class="share" @click="push">
            <div class="friends">推广本店</div>
            <div class="cash">赚取分享奖励金 ></div>
        </div>
    </div>
</template>
<script type="text/javascript">
	import { ImagePreview,Dialog } from 'vant';
	export default {
		name:'shopdetails',
		components:{
            [ImagePreview.name]:ImagePreview,
            [Dialog.name]:Dialog
        },
		data(){
			return{
				shopid:this.$route.query.id,
				list:{}
			}
		},
		created(){
			this.initData();
		},
	  	methods: {
            push(){
                var self = this;
                var postdata = {
                    op:'shop',
                    sid:self.shopid
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
			initData(){
				this.$util.http('admin','GET',{op:'equityshopdetail',shopid:this.shopid},res=>{
					this.list=res.data.list;
				},true);
			},
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
            width:9.5rem;
            height:3.75rem;
            background-color: #fff;
            margin:-3.3rem auto 0;
            padding:0.39rem 0.5rem 0.48rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
        }
        .item{
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
        .already{
			width:9.35rem;
			height:2.7rem;
			margin:0.4rem auto 0;
			background-color: #fff;
			border-radius: 0.16rem;
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
    /* 推广本店 */
        .share{
            width:9.35rem;
			height:1.35rem;
			line-height: 1.35rem;
			display: flex;
			justify-content: space-between;
			text-align: center;
			padding-right:0.5rem;  
			padding-left:1.5rem;
			box-sizing: border-box;
			margin:0.4rem auto 0;
			border-radius: 0.16rem;
			background-color: #fff;
            background-image: url(../../assets/income/coin.png);
			background-repeat: no-repeat;
			background-size:0.4rem ;
			background-position: 8% center;
        }
        .friends{
			font-size: 0.38rem;
			color:#333;
			font-weight: 600;
		}
		.cash{
			color:#FF6E40;
			font-size: 0.32rem;
		}
</style>