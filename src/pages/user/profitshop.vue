<template>
    <div>
        <loading v-show="inited == 0 || inited == 1" :inited="inited" />
        <!-- 顶部搜索框 -->
        <div v-if="inited == 2">
            <form action="/">
                <van-search v-model="title" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
                    <div slot="action" @click="onSearch">搜索</div>
                </van-search>
            </form>
            <!-- 门店信息 -->
            <div class="none" v-if="list.length==0">-- 暂无权益店铺 --</div>
            <div v-else>
                <div class="total">权益店铺共<font> {{list.length}} </font>家，总收益 <font>{{wholemoney}}</font> 元</div>
                <div v-for="item in list" :key="item.id">
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
                                <div class="area"><font>{{item.shop.sprtname}}</font> <font>{{item.shop.country}}</font></div>
                                <div class="time">{{item.shop.createtime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Search,Image,Loading } from 'vant'; 
    export default{
        name:'profitshop',
        components:{
            [Search.name]:Search,
            [Image.name]:Image,
            [Loading.name]:Loading,
        },
        data(){
            return{
                inited : false,
                title:'',
                wholemoney:0,
                list:[]
            }
        },
        created(){
            this.initData();
        },
        methods:{
            toshopdetail(shopid){
                this.$router.push('/shopdetails?id='+shopid);
            },
            onSearch(){
                var post={
                    op:'equityshop',
                    title:this.title
                }
                this.$util.http('agent','GET',post,res=>{
                    if(res.errno!=1){
                        this.list=res.data.equity;
                        this.wholemoney=res.data.wholemoney;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            initData(){
                this.$util.http('agent','GET',{op:'equityshop'},res=>{
                    this.inited=1;
                    this.list=res.data.equity;
                    this.wholemoney=res.data.wholemoney;
                    this.inited=2;
                })
            }
        }
    }
</script>
<style scoped>
    .none{
        width:100%;
        text-align: center;
        margin: 0.5rem auto 0;
        font-size: 0.4rem;
        color: #666;
    }
    /* 门店信息 */
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