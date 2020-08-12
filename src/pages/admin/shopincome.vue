<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <span class="funds">可提现金额(元)</span>
            <div class="money">
                <span class="money_left">{{list.money}}</span>
                <span class="money_right" @click="Tixian" data-type="shop">提现</span>
            </div>
            <div class="balance">
                <ul>
                    <li>
                        <span class="balance_top">账户余额(元)</span>
                        <span class="balance_bottom">{{list.money}}</span>
                    </li>
                    <li>
                        <span class="balance_top">冻结金额(元)</span>
                        <span class="balance_bottom">0</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 中间 --> 
        <div class="center">
            <router-link to="/cashdetails?shop=1">
                <div class="payment">收支明细</div>
            </router-link>
            <router-link to="/cashdetails?shop=2">
                <div class="record">提现记录</div>
            </router-link>
            <van-cell title="是否开通在线买单">
                <template #right-icon>
                    <van-switch :value="checked" @input="onInput" size="24" />
                </template>
            </van-cell>
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <!-- <div class="bottom_no"><font>未核销/未确认收货(元)</font><font>0.00</font></div> -->
            <div class="bottom_keep"><font>保证金(元)</font><font><font>0</font></font></div>
        </div>
    </div>
</template>

<script>
    import { Switch,Cell,Dialog } from 'vant';
    export default{
        components: {
            [Switch.name]: Switch,
            [Cell.name]: Cell,
            [Dialog.name]: Dialog
	    	
	  	},
        created(){
            this.initData();
        },
        data(){
            return{
                list:{},
                checked:false
            }
        },
        methods:{
            onInput(checked) {
                Dialog.confirm({
                    title: '提醒',
                    message: '是否切换该功能？',
                }).then(() => {
                    var postdata={
                        op:'isonlinepay',
                        onlinepay:checked ? 1 : 0
                    }
                    this.$util.http('admin','GET',postdata,res=>{
                        if(res.errno == 0){
                            this.checked=checked;
                            this.initData();
                            this.$toast(res.message);
                        }else{
                            this.$toast(res.message);
                        };
                    });
                });
            },
            Tixian(e){
                this.$router.push({path:'/suretixian',query:{money:this.list.money,type:e.currentTarget.dataset.type}});
            },
            initData(){
                this.$util.http('admin','GET',{op:'shopmoney'},res=>{
                    console.log(res);
					this.list=res.data.list;
                    if(res.data.list.onlinepay=='0'){
                        this.checked=false
                    }else if(res.data.list.onlinepay=='1'){
                        this.checked=true
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .center /deep/ .van-cell{
        padding-left: 0;
        padding-right: 0;
    }
    /* 头部 */
        .header{
            width:9.4rem;
            margin: 0.3rem auto;
            background: #fff;
            border-radius: 0.16rem;
            box-sizing: border-box;
            padding: 0.2rem;
        }
        .funds{
            font-size: 0.35rem;
            color:#333;
        }
        .money{
            width:100%;
            margin-top:0.5rem;
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
        }
        .balance>ul{
            width:100%;
            display: flex;
            justify-content: space-around;
        }
        .balance li{
            width:50%;
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.3rem;
        }
        .balance_bottom{
            display: inline-block;
            width:100%;
            color:#333;
            font-size: 0.45rem;
            font-weight: 700;
            margin-top: 0.2rem;
        }
        .balance_top{
            display: inline-block;
            width:100%;
            color:#333;
            font-size: 0.35rem;
        }
    /* 中间 */
        .center,.bottom{
            width:9.4rem;
            margin:0 auto 0.3rem;
            padding:0 0.2rem;
            border-radius: 0.16rem;
            background: #fff;
            font-size: 0.37rem;
            color: #333;
            font-weight: 700;
            box-sizing: border-box;
        }
        .payment,.record{
            height: 1.3rem;
            line-height: 1.3rem;
            background: url(../../assets/mine/arrow_right.png) no-repeat right center ;
            background-size: 0.12rem 0.26rem;
            margin-right: 0.2rem;
            box-sizing: border-box;
        }
        .bottom_no,.bottom_keep{
            height: 1.3rem;
            line-height: 1.3rem;
            display: flex;
            justify-content: space-between;
        }
        .payment,.bottom_no,.record{
            border-bottom: 1px solid #f4f4f4;
        }
</style>