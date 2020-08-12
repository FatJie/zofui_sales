<template>
    <div>
        <div class="header">
            <div class="title">{{title}}</div>
            <div class="addr"><font>{{address}}</font></div>
        </div>
        <div class="input_money">
            <van-field @input="show=true" v-model="money" type="number" label="消费金额(元)：" placeholder="请询问服务员后输入"/>
        </div>
        <!-- <div class="input_money11">
            <van-field @input="show=true" v-model="none_money" type="number" label="不参与让利金额(元)：" placeholder="请询问服务员后输入"/>
        </div> -->
        <div class="fact" v-if="show">
            <font style="font-weight:700;font-size:0.4rem;">实际付款(元)：</font>
            <font>{{money}}</font>
        </div>
        <div class="fact" v-if="show">
            <font v-if="grade==0">升级VIP立省：</font>
            <font v-else>壹卡多会员返利(元)：</font>
            <font style="font-size:0.6rem;">{{back_money}}</font>
        </div>
        <div class="confirm" @click="pay">立 即 支 付</div>
    </div>
</template>

<script>
    import { Field } from 'vant';
    export default{
        name:'onlinepay',
        components: {
            [Field.name]:Field
        },
        data(){
            return{
                money:'',
                show:false,
                title:'',
                address:'',
                shopid:this.$route.query.shopid,
                none_money:0,
                grade:'',
                benefit:'',
                bili:''
            }
        },
        created(){
            this.initData();
        },
        computed:{
            back_money(){
                console.log(this.money)
                console.log(this.none_money)
                console.log(this.benefit)
                console.log(this.bili)
                return (( this.money - this.none_money ) * this.benefit * this.bili ).toFixed(2);
            }
        },
        methods:{
            pay(){
                if(this.money<=0 || this.money==''){
                    this.$toast('请输入正确的金额！')
                }else{
                    this.$router.push({path:'/onlinepaying',query:{money:this.money,shopid:this.shopid}})
                }
            },
            initData(){
                var uid=this.$route.query.uid;
                this.$util.http('user','GET',{op:'useronline',shopid:this.shopid,uid:uid},res=>{
					this.title=res.data.title;
					this.address=res.data.address;
					this.grade=res.data.grade;
					this.benefit=res.data.benefit/100;
					this.bili=res.data.bili/100;
                })
            }
        }
    }
</script>

<style scoped>
    .header{
        width:100%;
        height:3.7rem;
        background: #FF6E40;
        padding-top: 0.46rem;
        box-sizing: border-box;
    }
    .title{
        width: 100%;
        text-align: center;
        font-size: 0.64rem;
        font-weight: 700;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .addr{
        width: 100%;
        text-align: center;
        margin-top:0.28rem ;
        font-weight: 500;
        font-size: 0.28rem;
        color: #fff;
    }
    .addr>font{
        background: url('../../assets/images/info-shop_icon03.png') no-repeat 0rem center;
        background-size: 0.3rem;
        padding-left: 0.35rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .input_money{
        width:9.4rem;
        margin: -1.5rem auto 0;
        background: #fff;
        border-radius: 0.16rem;
        overflow: hidden;
    }
    .input_money /deep/ .van-cell{
        height:2rem;
        line-height: 1.5rem;
    }
    .input_money /deep/ .van-field__control{
        text-align: right;
    }
    .input_money11{
        width:9.4rem;
        margin: 0.5rem auto 0;
        background: #fff;
        border-radius: 0.16rem;
        overflow: hidden;
    }
    .input_money11 /deep/ .van-cell{
        height:1.6rem;
        line-height: 1.2rem;
    }
    .input_money11 /deep/ .van-cell__title{
        width:40%;
    }
    .input_money11 /deep/ .van-field__control{
        text-align: right;
    }
    .confirm{
        width:9.4rem;
        height:1.25rem ;
        margin: 0.3rem auto;
        text-align: center;
        line-height: 1.25rem;
        border-radius: 0.16rem;
        font-size:0.48rem ;
        color: #fff;
        font-weight: 500;
        background: #FF6E40;
    }
    .fact{
        width:9.4rem;
        margin: 0.3rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .fact>font:first-child{
        font-size: 0.37rem;
        color: #333;
        font-weight: 500;
    }
    .fact>font:last-child{
        font-size: 0.8rem;
        color: #FF6E40;
    }
</style>