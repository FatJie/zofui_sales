<template>
    <div id="main">
        <!-- 头部 -->
        <div class="header">
            <div class="avater">
                <img :src="shop.headimg">
            </div>
            <div>
                <router-link :to="{path:'/shopinfo',query: {id: shop.id}}">
                    <div class="shop_name">
                        {{shop.name}}
                    </div>
                    <!-- <div class="shop_level">
                        店铺等级
                        <font>特权商家</font>
                    </div> -->
                </router-link>
            </div>
            <!-- <div class="edit" @click="toEdit(shop.id)">
                编辑店铺 >
            </div> -->
        </div>
        <!-- 可提现金额 -->
        <div class="money">
            <div class="title">可提现金额(元)</div>
            <div class="number">
                <div class="number_left">{{shop.money}}</div>
                <div class="number_right" @click="toSure" data-type="shop">提现</div>
            </div>
        </div>
        <!-- 店员管理 -->
        <div class="manage">
            <div class="item1" @click="manageStaff">
                <div class="left">店员管理</div>
                <div class="right">></div>
            </div>
            <div class="item2" @click="shopverify">
                <div class="left">店铺认证</div>
                <div class="right">></div>
            </div>
            <router-link :to="{path:'/shopinfo',query: {id: shop.id}}">
                <div class="item3">
                    <div class="left">店铺主页</div>
                    <div class="right">></div>
                </div>
            </router-link>
            <div class="item4" @click="change(shop.id)">
                <div class="left">切换店铺</div>
                <div class="right">></div>
            </div>
        </div>
        <div class="out">
            <div class="item5" @click="logout">
                <div class="left">退出商户中心</div>
                <div class="right">></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    export default {
        name:'adminmine',
        components: {
            [Dialog.name]: Dialog,
        },
        data(){
            return{
                value:1,
                shop:{}
            }
        },
        created(){
            this.initData();
        },
        methods:{
            logout(){
                var self = this;
                self.$util.http('admin','GET',{op:'loginout'},function(res){     
                    if (!res.errno && res.data) {
                        self.$toast({
                            message : '已退出',
                            onClose : function(){
                                self.$router.push('/');
                            }
                        })
                    }else{
                        self.$toast(res.message);
                    }
                },true);
            },
            shopverify(){
                if(this.shop.adminstatus==1){
                    this.$router.push('/shopverify')
                }else{
                    this.$toast('您暂时没有此权限！')
                }
            },
            manageStaff(){
                this.$router.push('/staffmanage')
            },
            initData(){
                this.$util.http('admin','GET',{op:'myadmin'},res=>{
                    this.shop=res.data.list;
	            },true);
            },
            change(id){
                this.$router.push('/chooseshop?shopid='+id);
            },
            toEdit(id){
                if(this.shop.adminstatus==1){
                    this.$router.push({path:'/editshop',query:{id:id}})
                }else{
                    this.$toast('您暂时没有此权限！')
                }
            },
            toSure(e){
                if(this.shop.adminstatus==1){
                    this.$router.push({path:'/suretixian',query:{money:this.shop.money,type:e.currentTarget.dataset.type}})
                }else{
                    this.$toast('您暂时没有此权限！')
                }
            }
        }
    }
</script>
<style scoped>
    #main{
        width:100%;
    }
    #main *{
        box-sizing: border-box;
    }
    /* 头部样式 */
        .header{
            width:9.5rem;
            height:2.15rem;
            margin:0 auto;
            border-radius: 0.16rem;
            padding-top:0.35rem;
            background-color: #fff;
            margin-top:0.4rem;
            display: flex;
            justify-content: space-around;
        }
        .avater{
            width:1.5rem;
            height:1.5rem;
            border-radius: 0.75rem;
            overflow: hidden;
        }
        .avater>img{
            width:100%;
            height:100%;
        }
        .shop_name{
            /* width: 3.5rem; */
            width: 6.5rem;
            margin-bottom: 0.36rem;
            font-size: 0.43rem;
            color: #333;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .shop_level{
            font-size: 0.32rem;
            color: #333;
        }
        .edit{
            width:2rem;
            height:0.5rem;
            font-size: 0.32rem;
            color: #333;
            position:relative;
            top:27%;
            left: 0;
        }
    /* 可提现金额 */
       .money{
            width:9.5rem;
            height:2.95rem;
            margin:0 auto;
            border-radius: 0.16rem;
            padding-top:0.35rem;
            background-color: #fff;
            margin-top:0.4rem;
       } 
       .title{
            width:100%;
            margin-top:0.2rem;
            padding-left:0.35rem ;
            font-size: 0.35rem;
            font-weight: 600;
            color:#333;
       }
       .number{
           width:90%;
           margin: 0.35rem auto 0;
           display: flex;
           justify-content: space-between;
       }
       .number_left{
           font-size:0.8rem ;
           color:#ff6e40;
           font-weight: 700;
       }
       .number_right{
           width:2rem;
           height:0.9rem;
           font-size:0.43rem ;
           color:#fff;
           background-color: #ff6e40;
           line-height: 0.9rem;
           text-align: center;
           border-radius: 0.45rem;
       }
    /* 店员管理 */
       .manage,.out{
            width:9.5rem;
            margin:0.4rem auto 0;
            border-radius: 0.16rem;
            background-color: #fff;
       }
       .item1,.item2,.item3,.item4,.item5{
           width:100%;
           height:1.28rem;
           line-height: 1.28rem;
           padding:0 0.5rem 0 1.58rem;
           
       }
       .item1,.item2,.item3{
           border-bottom: 1px solid #f4f4f4;
       }
       .item1{
           background: url(http://ykd.lsh199.com/attachment/images/global/mobile/1.1.png) no-repeat 0.6rem center;
           background-size: 0.5rem;
       }
       .item2{
           background: url(http://ykd.lsh199.com/attachment/images/global/mobile/2.1.png) no-repeat 0.6rem center;
           background-size: 0.5rem;
       }
       .item3{
           background: url(http://ykd.lsh199.com/attachment/images/global/mobile/3.1.png) no-repeat 0.6rem center;
           background-size: 0.5rem;
       }
       .item4{
           background: url(http://ykd.lsh199.com/attachment/images/global/mobile/4.1.png) no-repeat 0.6rem center;
           background-size: 0.5rem;
       }
       .item5{
           margin-top:0.44rem;
           background: url(http://ykd.lsh199.com/attachment/images/global/mobile/5.1.png) no-repeat 0.6rem center;
           background-size: 0.5rem;
       }
       .left{
           font-size: 0.38rem;
           color: #333;
           font-weight: 700;
       }
       .right{
           color: #999;
           font-size: 0.28rem;
       }
</style>