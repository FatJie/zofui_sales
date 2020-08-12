<template>
    <div>
        <div class="search">
            <van-search v-model="nickname" placeholder="通过昵称搜索" shape="round" @search="onSearch"/>
        </div>
        <div class="item" v-for="item in list">
            <img class="avater" :src="item.headimg">
            <div class="middle" @click="toDetail(item.uid)">
                <div class="middle_top">{{item.nickname}}</div>
                <div class="middle_bottom">最近消费：{{item.createtime}}</div>
            </div>
            <img class="arrow_right" src="../../assets/mine/arrow_right.png">
        </div>
        <div class="none" v-if="list==null">
            ~ 暂无相关数据 ~
        </div>
    </div>
</template>

<script>
    import { Search } from 'vant';
    export default{
        components:{
            [Search.name]:Search,
        },
        data(){
            return{
                nickname:'',
                list:[]
            }
        },
        created(){
            this.initData();
        },
        methods:{
            onSearch(value){
                this.$util.http('admin','GET',{op:'shopmember',nickname:this.nickname},res=>{
                    if(res.errno==0){
                        this.list=res.data.list;
                    }else{
                        this.$toast(res.message);
                    }
                })
            },
            toDetail(uid){
                this.$router.push({path:'/memberdetail',query:{uid:uid}})
            },
            initData(){
                this.$util.http('admin','GET',{op:'shopmember'},res=>{
                    this.list=res.data.list;
                })
            }
        }
    }
</script>

<style scoped>
    .none{
        width:100%;
        text-align: center;
        font-size: 0.3rem;
        color: #666;
        font-weight: 600;
        margin-top: 0.4rem;
    }
    .item{
        width: 9.4rem;
        margin: 0.1rem auto;
        box-sizing: border-box;
        padding: 0.2rem;
        display: flex;
        justify-content: space-between;
        border-radius: 0.16rem;
        background: #fff;
        align-items: center;
    }
    .avater{
        width:1.24rem;
        height:1.24rem;
        border-radius: 50%;

    }
    .middle{
        width:75%;
    }
    .middle_top{
        font-size: 0.42rem;
        font-weight: 700;
        color: #333;
        margin-bottom: 0.3rem;
    }
    .middle_bottom{
        font-size: 0.32rem;
        font-weight: 500;
        color: #999;
    }
    .arrow_right{
        width:0.23rem;
        height:0.4rem;
    }
</style>