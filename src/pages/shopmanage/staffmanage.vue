<template>
    <div style="width:100%;padding-bottom: 1.8rem;">
        <!-- 店员信息 -->
        <div class="item" v-for="item in list">
            <img :src="item.headimg">
            <div class="middle">
                <div class="name">
                    <font>{{item.nickname}}</font>
                    <img v-if="item.status==1" :src="imgPre+'/forbid.png'">
                    <img v-if="item.status==0" :src="imgPre+'/tick.png'">
                </div>
                <div class="juese">角色：{{item.level==1?'超级管理员':'普通管理员'}}</div>
            </div>
            <div class="edit" v-if="level==1">
                <div v-if="item.level!=1">
                    <div class="edit_staff" @click="edit(item.id)">编辑店员</div>
                    <div class="stop_open" @click="stop(item.id)">
                        <font class="stop" v-if="item.status==0">停用</font>
                        <font class="open" v-if="item.status==1">开启</font>
                    </div>
                </div>
            </div>
        </div>
        <!-- 添加员工 -->
        <div class="add" @click="showAdd">添加员工</div>
        <!-- 弹框 -->
        <div class="tankuang" v-if='show'>
            <div class="content">
                <div class="content_title">用微信扫一扫，成为店员</div>
                <div class="content_img">
                    <img :src="img_code">
                </div>
            </div>
            <img @click="cancelAdd" :src="imgPre+'/close.png'">
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';

    export default{
        components:{
            [Dialog.name]:Dialog
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                value:0,
                show: false,
                list:[],
                img_code:'',
                status:'',
                level:''
            }
        },
        activated(){
            this.initData();
        },
        methods:{
            showAdd(){
                if(this.level!=0 || this.status==1){
                    this.add();
                    this.show=true;
                }else{
                    this.$toast('您暂时没有权限！');
                }
            },
            cancelAdd(){
                this.show=false;
                this.initData();
            },
            //添加员工
            add(){
                var params = {
                    op:'addadmin',
                }
                this.$util.http('admin','POST',params,res=>{
                    this.img_code=res.data.url;
                })
            },
            //请求后台数据
            initData(){
                this.$util.http('admin','GET',{op:'adminlist'},res=>{
                    this.list=res.data.list;
                    this.level=res.data.level;
                    this.status=res.data.status;
                    
                })  
            },
            edit(id){
                this.$router.push({path:'/editstaff',query:{id:id}});
            },
            stop(id){
                this.$util.http('admin','GET',{op:'editstatus',id:id},res=>{
                    this.initData();
                },true)  
            }
        }
    }
</script>


<style scoped>
    /* 店员信息 */
        .item{
            width:9.4rem;
            margin: 0.3rem auto;
            padding: 0.4rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background: #fff;
            border-radius: 0.16rem;
        }
        .item>img{
            width:1.33rem;
            height:1.33rem;
            border-radius: 50%;
            margin-right: 0.4rem;
        }
        .middle{
            width:3.5rem;
            display: flex;
            flex-wrap: wrap;
        }
        .name{
            width:3.5rem;
            display: flex;
            justify-content: start;
            font-size:0.43rem ;
            font-weight: 700;
            color: #333;
            align-items: center;
            margin-bottom: 0.36rem;
        }
        .name>font{
            width:2.8rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .name>img{
            width:0.37rem;
            height:0.37rem;
        }
        .juese{
            width:100%;
            font-size:0.32rem ;
            color: #333;
            font-weight: 500;
        }
        .edit{
            width:3rem;
        }
        .edit>div{
            width:100%;
            display: flex;
            justify-content: space-between;
            font-size:0.32rem ;
        }
        .edit_staff{
            width:1.65rem;
            height:0.61rem;
            line-height: 0.61rem;
            text-align: center;
            color: #FF6E40;
            background:rgba(255,110,64,.1);
            border-radius: 0.08rem;
        }
        .stop_open{
            width:1.1rem;
            font-size:0.32rem ;
            font-weight: 500;
        }
        .stop{
            display: inline-block;
            width:1rem;
            height:0.61rem;
            line-height: 0.61rem;
            text-align: center;
            color: #FF6E40;
            border-radius: 0.08rem;
            background: #fff;
            border:0.015rem solid #FF6E40
        }
        .open{
            display: inline-block;
            width:1rem;
            height:0.61rem;
            line-height: 0.61rem;
            text-align: center;
            color:#fff;
            border-radius: 0.08rem;
            background: #FF6E40;
        }
    /* 添加员工 */
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
    /* 弹框 */
        .tankuang{
            width:100%;
            height:100%;
            background: rgba(0, 0, 0, 0.3);
            position:fixed;
            top:0;
            left:0;
        }
        .content{
            width:7rem;
            margin:2rem auto 0.5rem;
            background-color: #fff;
            border-radius: 0.16rem;
            padding-bottom: 0.3rem;
        }
        .content_title{
            width:100%;
            text-align: center;
            font-size: 0.45rem;
            font-weight: 500;
            color: #333;
            box-sizing: border-box;
            padding: 0.3rem;
        }
        .content_img{
            width:80%;
            margin: 0 auto;
        }
        .content img{
            width:100%;
        }
        .tankuang>img{
            width:0.56rem;
            height:0.56rem;
            position:absolute;
            top:10rem;
            left:50%;
            transform:translateX(-50%);
        }
</style>