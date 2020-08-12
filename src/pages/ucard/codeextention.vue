<template>  
    <div>
        <!-- 更换推荐人 -->
        <div class="shop" v-if="list.is_parent==1">
            <div class="shop_avater">
                <img :src="list.parentheadimg">
            </div>
            <div class="shop_middle">
                <div class="shop_title">
                    <font>{{list.parentname}}</font>
                </div>
                <div class="shop_class"><font>推荐人ID：{{list.parentid}}</font></div>
            </div>
            <div class="manager" v-if="list.is_intensity==0 && list.editnum < 1 " @click="show=true">更改推荐人</div>
        </div>
        <!-- 恭喜您 -->
        <div class="happy">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/gongxi.png">
        </div>
        <!-- 绑定推荐人 -->
        <div class="mistake" v-if="list.is_parent==0" @click="show=true"> 绑 定 推 荐 人 </div>
        <template>
            <div class="sure" v-if="list.parentid" @click="makeSure">确 定</div>
            <div class="no_sure" v-else>确 定</div>
        </template>
        <!-- 弹框 -->
        <van-dialog v-model="show" title="请输入推荐人ID" confirm-button-color="#FF301E" @confirm="confirm">
            <van-search left-icon="none" v-model="list.parentid" placeholder="请输入推荐人ID" />
        </van-dialog>
    </div>
</template>

<script>
    import { Dialog,Search } from 'vant';
    export default{
        components: {
            [Dialog.Component.name] : Dialog.Component,
            [Search.name] : Search
        },
        data(){
            return{
                list:{parentid:''},
                show:false
            }
        },
        created(){
            this.initData();
        },
        methods:{
            makeSure(){
                var postdata={
                    op:'upgrade',
                    parentid:this.list.parentid,
                    code:this.$route.query.code ? this.$route.query.code : ''
                };
                this.$util.http('user','POST',postdata,res=>{
                    if(res.errno==0){
                        this.$router.push('/');
                    }else{
                        this.$toast(res.message);
                        this.initData();
                    };
                },true);
            },
            confirm(){
                var postdata={
                    op:'editparent',
                    id:this.list.id,
                    parentid:this.list.parentid,
                };
                this.$util.http('user','POST',postdata,res=>{
                    if(res.errno==0){
                        this.list.parentid=res.data.list.id;
                        this.list.parentname=res.data.list.nickname;
                        this.list.parentheadimg=res.data.list.headimg;
                        this.list.is_parent=1;
                    }else{
                        this.$toast(res.message);
                        this.initData();
                    };
                },true);
            },
            initData(){
                var postdata={
                    op:'codeextention',
                    code:this.$route.query.code ? this.$route.query.code : '',
                    zfid:this.$route.query.zfid ? this.$route.query.zfid : ''
                }
                this.$util.http('user','GET',postdata,res=>{
                    if(res.errno==0){
                        this.list=res.data.codeextention;
                    }else{
                        this.$toast(res.message);
                        this.$router.push('/');
                    };
                })
            }
        }
    }
</script>

<style scoped>
    .shop{
        width:9.4rem;
        margin: 0.4rem auto;
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
    .manager{
        font-size:0.32rem ;
        color: #333;
        font-weight: 500;
        background: url(../../assets/mine/arrow_right.png) no-repeat right center;
        background-size:0.1rem 0.2rem ;
        padding-right: 0.2rem;
    }
    .shop_avater{
        width:1.35rem;
        height:1.35rem;
        overflow: hidden;
        border-radius: 50%;;
    }
    .shop_avater>img{
        width:1.35rem;
        height:1.35rem;
    }
    .happy{
        width:9.4rem;
        margin:0.4rem auto;
    }
    .happy>img{
        width:100%;
    }
    .sure,.mistake,.no_sure{
        width:80%;
        margin: 0.5rem auto ;
        height:1.2rem;
        text-align: center;
        line-height: 1.2rem;
        font-size: 0.5rem;
        font-weight: 700;
        border-radius: 0.16rem;
    }
    .no_sure{
        border: 1px solid #999;
        color: #fff;
        background:#999;
        margin-top: 0 !important;
    }
    .sure{
        border: 1px solid #FF301E;
        color: #fff;
        background:#FF301E;
        /* margin-top: 0 !important; */
    }
    .mistake{
        color: #FF301E;
        border: 1px solid #FF301E;
    }
    .tip{
        width:80%;
        margin: 0.5rem auto;
        color: #999;
        font-size: 0.38rem;
        font-size: 500;
        word-break: break-all;
    }
    .tip>font{
        color: #FF301E;
        font-weight: 700;
        margin-right: 0.2rem;
    }
</style>