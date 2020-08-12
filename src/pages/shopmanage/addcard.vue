<template>
    <div>
        <div class="please">请绑定持卡人本人的银行储蓄卡</div>
        <van-field v-model="info.name" placeholder="请输入本人姓名" label="持卡人"></van-field>
        <van-field v-model="info.phone" type="tel" placeholder="请输入本人手机号" label="手机号"></van-field>
        <van-field v-model="info.card_num" type="number" placeholder="请输入本人银行卡号" label="卡号"></van-field>
        <van-field v-model="info.bank_name" placeholder="请输入银行" label="银行"></van-field>
        <van-field v-model="info.bank_account" placeholder="请输入开户行名称" label="开户行名称"></van-field>
        <div class="save" @click="save">保 存</div>
    </div>
</template>
<script>
    import { Field } from 'vant';
    export default {
        name:'addcard',
        components: {
            [Field.name]: Field,
        },
        data(){
            return{
                info:{}
            }
        },
        methods:{
            save(){
                if(!this.info.name){
                    this.$toast("本人姓名不能为空！");
                    return;
                }
                if(!this.info.phone){
                    this.$toast("本人手机号不能为空！");
                    return;
                }
                if(!this.info.card_num){
                    this.$toast("本人银行卡号不能为空！");
                    return;
                }
                if(!this.info.bank_name){
                    this.$toast("银行不能为空！");
                    return;
                }
                if(!this.info.bank_account){
                    this.$toast("开户行名称不能为空！");
                    return;
                }
                var postData={
                    op:'addcard',
                    info:this.info
                }
                this.$util.http('admin','POST',postData,res=>{
                    if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onOpened:()=>{
                                this.$router.go(-1);
                            }
                        })
                    }else{
                        this.$toast(res.message)
                    }
                });
            },
        }
    }
</script>
<style scoped>
    .please{
        width:100%;
        font-size: 0.4rem;
        box-sizing: border-box;
        padding-left: 0.2rem;
        color: #666;
        margin: 0.6rem 0 0.3rem;
    }
    .save{
        width:9.4rem;
        height:1.2rem;
        margin: 1.5rem auto 0;
        border-radius: 0.16rem;
        line-height: 1.2rem;
        text-align: center;
        font-size:0.38rem ;
        color:#fff;
        background: #ff6e40;
    }
</style>