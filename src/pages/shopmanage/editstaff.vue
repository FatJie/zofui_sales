<template>
    <div>
        <div class="content">
            <div class="img">
                <img :src="headimg">
            </div>
            <div class="staff_info">员工信息</div>
            <van-field v-model="name" label="员工姓名"/>
            <van-field  placeholder="请输入员工电话" label="员工电话" v-model="tel"/>
            <!-- 员工职位 -->
            <van-field clickable :value="staffshow"  label="员工职位" readonly @click="job = true" >
            </van-field>
            <van-popup v-model="job" position="bottom" >
                <van-picker :columns="staff"  value-key="name" confirm-button-text="确定" show-toolbar @cancel="job = false" @confirm="onChangeJob" />
            </van-popup>
            <!-- 员工状态 -->
            <van-field clickable :value="staffstate"  label="员工状态" readonly @click="state = true" >
            </van-field>
            <van-popup v-model="state" position="bottom" >
                <van-picker :columns="statestaff"  value-key="name" confirm-button-text="确定" show-toolbar @cancel="state = false" @confirm="onChangeState" />
            </van-popup>
            <div class="staff_info">设置权限</div>
            <div class="choose">
                <van-checkbox-group checked-color="#ff6e40" v-model="auth" direction="horizontal">
                    <van-checkbox name="hxorder">核销订单</van-checkbox>
                    <van-checkbox name="hxcard">核销活动</van-checkbox>
                    <van-checkbox name="login">登录商户中心 </van-checkbox>
                    <van-checkbox name="omess">接收订单消息 </van-checkbox>
                    <van-checkbox name="kfmess">接收客服消息</van-checkbox>
                    <van-checkbox name="admin">管理核销员</van-checkbox>
                </van-checkbox-group>
            </div>
            <!-- 保存 -->
            <div class="add" @click="save">保存</div>
        </div>
    </div>
</template>

<script>
    import { Field,Picker,Popup,Checkbox, CheckboxGroup } from 'vant';
    export default{
        name:'editstaff',
        components:{
            [Field.name]:Field,
            [Picker.name]:Picker,
            [Popup.name]:Popup,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
        },
        data(){
            return{
                auth: [],
                name:'  ',
                staffshow:'店员',
                job:false,
                staff:['店长','店员'],
                statestaff:['开启','关闭'],
                staffstate:'开启',
                state:false,
                headimg:'',
                tel:'',
                id:''
            }
        },
        created(){
            this.initData();
        },
        methods:{
            //请求后台数据
            initData(){
                var id=this.$route.query.id;
                this.$util.http('admin','GET',{op:'editadmin',id:id},res=>{ 
                    this.name=res.data.name;
                    this.headimg=res.data.headimg;
                    this.id=res.data.id;
                    this.tel=res.data.tel;
                    var obj=res.data.auth;
                    console.log(obj);
                    if(obj.admin==1){
                        this.auth.push('admin');
                    }
                    if(obj.hxorder==0){
                        this.auth.push('hxorder');
                    }
                    if(obj.login==0){
                        this.auth.push('login');
                    }
                    if(obj.kfmess==0){
                        this.auth.push('kfmess');
                    }
                    if(obj.hxcard==0){
                        this.auth.push('hxcard');
                    }
                    if(obj.omess==0){
                        this.auth.push('omess');
                    }
                    for(var i=0;i<this.staff.length;i++){
                        if(i==res.data.position){
                            this.staffshow=this.staff[i];
                        }
                    }
                    for(var i=0;i<this.statestaff.length;i++){
                        if(i==res.data.status){
                            this.staffstate=this.statestaff[i];
                        }
                    }
                })  
            },
            save(){
                var postData={
                    op:'editstaff',
                    auth:this.auth,
                    nickname:this.name,
                    position:this.staffshow,
                    status:this.staffstate,
                    id:this.id,
                    tel:this.tel
                }
                this.$util.http('admin','POST',postData,res=>{ 
                    this.$toast({
                        message:res.message,
                        onClose:()=>{
                            this.$router.push('/adminmine')
                        }
                    })
                })  
            },
            onChangeJob(value){
                this.staffshow=value;
                this.job=false;
            },
            onChangeState(value){
                this.staffstate=value;
                this.state=false;
            }
        }
    }
</script>

<style scoped>
    .content{
        width:9.4rem;
        margin: 0.3rem auto;
        border-radius: 0.16rem;
        background: #fff;
        padding:0.3rem 0;
    }
    .img{
        width:2rem;
        height:2rem;
        margin: 0.3rem auto 0;
    }
    .img>img{
        width:100%;
        height:100%;
        border-radius: 0.13rem;
    }
    .staff_info{
        font-size: 0.32rem;
        color: #999;
        font-weight: 500;
        box-sizing: border-box;
        padding:0.3rem ;
    }
    .choose{
        width:100%;
        font-size: 0.4rem;
    }
    .choose /deep/ .van-checkbox-group{
        display: flex;
        flex-wrap: wrap;
    }
    .choose /deep/ .van-checkbox{
        width:50%;
        box-sizing: border-box;
        padding:0.2rem 0 0.2rem 0.4rem;
    }
    /* 保存 */
        .add{
            width:9.4rem;
            height:1.3rem;
            line-height: 1.3rem;
            text-align: center;
            font-size:0.48rem ;
            font-weight: 500;
            color: #fff;
            background: #FF6E40;
            border-radius: 0.16rem;
            position:fixed;
            bottom:0.5rem;
            left:50%;
            transform:translateX(-50%);
            z-index: 2;
        }
</style>