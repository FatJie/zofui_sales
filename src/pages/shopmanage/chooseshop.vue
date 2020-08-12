<template>
    <div>
        <!-- 广告图片 -->
        <div class="ad_pic">
            <router-link to="/freeshop">
                <img class="swipe_img" src="http://ykd.lsh199.com/attachment/images/global/mobile/unlock.png">
            </router-link>
        </div>
        <!-- 店铺情况 -->
        <div  v-for="item in list">
            <div class="shop" @click="changeShop(item.shopid)">
                <div class="shop_avater">
                    <img :src="item.shop.headimg">
                </div>
                <div class="shop_middle">
                    <div class="shop_title">
                        <font>{{item.shop.name}}</font>
                        <!-- <font class="renzheng">认证</font> -->
                    </div>
                    <div class="shop_class" v-if="item.shop.dangqian==1"><font></font><font>当前店铺</font></div>
                </div>
                <div class="manager">{{item.level==1?'超级管理员':'普通管理员'}}</div>
            </div>
        </div>
        <!-- 权益店铺 -->
        <div class="profit">权益店铺</div>
        <div class="total">权益店铺共<font> {{equity.length}} </font>家，总收益 <font>{{wholemoney}}</font> 元</div>
        <div v-for="item in equity" :key="item.id">
            <div class="item" @click="toshopdetail(item.shopid)">
                <div class="avater">
                    <img :src="item.shop.headimg">
                </div>
                <div class=item_right>
                    <div class="item_top">
                        <div class="title">{{item.shop.name}}</div>
                        <div class="price color">+{{item.price}}</div>
                    </div>
                    <div class="item_bottom">
                        <div class="area"><font>{{item.shop.sortname}}</font> <font>{{item.shop.country}}</font></div>
                        <div class="time">{{item.shop.createtime}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'chooseshop',
        data(){
            return{
                list:[],
                equity:[],
                wholemoney:0
            }
        },
        created(){
            this.initData();
        },
        methods:{
            changeShop(shopid){
                this.$util.http('admin','GET',{op:'loginbyid',id:shopid},res=>{
                    if(res.errno==0){
                        this.$router.push('/adminindex')
                    }
                },true)
            },
            toshopdetail(id){
                this.$router.push('/shopdetails?id='+id);
            },
            initData(){
                var shopid=this.$route.query.shopid;
                this.$util.http('admin','GET',{op:'equityshop',id:shopid},res=>{
                    console.log(res);
                    this.list=res.data.admin;
                    this.equity=res.data.equity;
                    this.wholemoney=res.data.wholemoney;
                },true)
            },
        }
    }
</script>

<style scoped>
    /* 广告图片 */
        .ad_pic{
            width:9.4rem;
            height:2.5rem;
            margin:0.5rem auto;
        }
        .ad_pic img{
            width:100%;
            height:100%;
            border-radius:0.16rem;
        }
    /* 店铺情况 */
        .shop{
            width:9.4rem;
            margin: 0.1rem auto;
            background-color: #fff;
            border-radius: 0.16rem;
            font-size: 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding:0.5rem;
        }
        .shop_middle{
            width:4.5rem;
        }
        .shop_title{
            width:100%;
        }
        .shop_title>font:first-child{
            display: inline-block;
            width:3.4rem;
            font-size: 0.42rem;
            font-weight: 700;
            color: #333;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .renzheng{
            width:0.84rem;
            height:0.4rem;
            background: #3a3a3a;
            color: #ff0;
            text-align: center;
            line-height: 0.4rem;
            font-size: 0.32rem;
            border-radius: 0.08rem;
        }
        .shop_class{
            width:100%;
            font-size: 0.32rem;
            color: #333;
            font-weight: 500;
        }
        .shop_class>font:first-child{
            display: inline-block;
            width:0.2rem;
            height:0.2rem;
            border-radius: 0.1rem;
            background: #ff6e40;
            margin-right: 0.1rem;
        }
        .manager{
            font-size:0.32rem ;
            color: #333;
            font-weight: 500;
            background: url(../../assets/mine/arrow_right.png) no-repeat right center;
            background-size:0.1rem 0.2rem ;
            padding-right: 0.2rem;
        }
    /* 权益店铺 */
        .profit{
            width:9.4rem;
            color: #222;
            font-weight: 700;
            font-size: 0.5rem;
            margin: 0.3rem auto;
        }
        .item{
            width:9.5rem;
            height:2.15rem;
            background-color: #fff;
            margin:0 auto;
            padding:0.39rem 0.5rem 0.48rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
            margin-top: 0.32rem;
            display: flex;
        }
        .avater,.shop_avater{
            width:1.35rem;
            height:1.35rem;
            overflow: hidden;
            border-radius: 50%;;
        }
        .avater>img,.shop_avater>img{
            width:1.35rem;
            height:1.35rem;
        }
        .item_right{
            width:7rem;
            margin-left: 0.43rem;
        }
        .item_top{
            width:100%;
            font-size: 0.42rem;
        }
        .title{
            width:4rem;
            height:0.5rem;
            color:#333;
            font-weight: 700;
            float: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .price{
            float: right;
            font-weight: 700;
        }
        .color{
            color:#ff6e40;
        }
        .item_bottom{
            width:100%;
            font-size: 0.32rem;
            margin-top:0.82rem ;
            color:#333;
            display: flex;
            justify-content: space-between;
        }
        .total{
            width:9.4rem;
            margin: 0.1rem auto;
            background-color: #fff;
            border-radius: 0.16rem;
            font-size: 0.32rem;
            box-sizing: border-box;
            padding:0.3rem;
            font-weight: 500;
        }
        .total>font{
            color: #ff6e40;
        }
</style>