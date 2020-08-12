<template>  
    <div>
        <!-- 头部 -->
        <div class="header">壹卡多会员</div>
        <!-- 内容 -->
        <div class="content">
            <div class="avater">
                <img :src="list.headimg">
                <div class="avater_right">
                    <div class="name">{{list.nickname}}</div>
                    <div class="class">目前等级：{{list.gradename}}</div>
                </div>
            </div>
            <!-- CDK -->
            <input class="cdk" type="text" v-model="cdk" placeholder="请输入CDK，请注意区分大小写！">
            
            <button class="button" @click="exchange">立即验证，完成兑换</button>
            <!-- 兑换规则说明 -->
            <!-- <div class="rule">
                <div class="rule_title">兑换规则说明：</div>
                <div class="rule_content">
                    <font>1.  体验请输入CDK，请注意区分大小写！请输入CDK，请注意区分大小。</font>
                    <font>2.  体验请输入CDK，请注意区分大小写！请输入CDK，请注意区分大小。</font>
                    <font>3.  体验请输入CDK，请注意区分大小写！请输入CDK，请注意区分大小。</font>                 
                </div>
            </div> -->
            <!-- 解锁赚钱新姿势 -->
            <div class="lock">
                <div class="special_item" v-for="item in goods">
                    <div class="avater1" @click="getSpecial(item.id)">
                        <img :src="item.thumb">
                    </div>
                    <div class="first_right">
                        <div class="first_right_top">
                            <div class="special_class">{{item.receive}}</div>
                            <div class="special_name" @click="getSpecial(item.id)">{{item.title}}</div>
                        </div>
                        <div class="area">
                            <div>{{item.shopname}}</div>
                        </div>
                        <div class="good1">
                            <div class="good1_left"><font>{{item.oldprice}}</font>元</div>
                            <div class="good1_right">{{item.saled}}人领取</div>
                            <div class="get" @click="getSpecial(item.id)">免费领取</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 查看更多 -->  
            <router-link to='/speciallist'>
                <div class="look_more">~ 点击查看更多 ~</div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import wx from 'weixin-js-sdk';
    export default{
        activated(){
            this.grade=this.$route.query.grade;
            this.downLoad();
        },
        data(){
            return{
                list:{},
                goods:[],
                grade:'',
                cdk:''
            }
        },
        methods:{
            exchange(){
                // if (this.list.account == null || this.list.account == ''){
                //     this.$toast({
                //         message:'请绑定手机号！',
                //         onClose:()=>{
                //             this.$router.push('/bindphone')
                //         }
                //     })
                // }else{
                    var postdata={
                        op:'passbycode',
                        code:this.cdk
                    };
                    this.$util.http('ucard','GET',postdata,res=>{
                        if(res.errno==1){
                            this.$toast(res.message);
                            return;
                        }else{
                            this.$toast({
                                message:res.message,
                                onClose:()=>{
                                    this.$router.push('/user');
                                }
                            })
                        }
                        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                            wx.updateAppMessageShareData({ 
                                title: res.data.sharedata.title, // 分享标题
                                desc: res.data.sharedata.desc, // 分享描述
                                link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.sharedata.img, // 分享图标
                                success: function () {
                                    // self.$toast('分享成功！')// 设置成功
                                }
                            })
                        });
                    });
                // }
            },
            // 跳转特权详情
            getSpecial(id){
                this.$router.push({path:'/goodinfo',query:{id:id}});
            },
            downLoad(){
                var postdata={
                    op:'info',
                    grade:parseInt(this.grade)+1
                }
                this.$util.http('ucard','GET',postdata,res=>{
                    this.list=res.data.userinfo;
                    this.goods=res.data.goods;
                },true)
            },
        }
    }
</script>

<style scoped>
    /* 头部 */
        .header{
            width:100%;
            height:4rem;
            line-height: 4rem;
            text-align: center;
            font-size: 0.93rem;
            color: #fff;
            font-weight: 700;
            font-style: italic;
            background: url(http://ykd.lsh199.com/attachment/images/global/mobile/code.png) no-repeat;
            background-size: 10rem 4rem;
        }
    /* 内容 */
        .content{
            width:9.4rem;
            margin: 0 auto;
        }
        .avater{
            width:100%;
            display: flex;
            font-size: 0.4rem;
            box-sizing: border-box;
            padding: 0.2rem;
        }
        .avater>img{
            width:1.4rem;
            height:1.4rem;
            border-radius: 50%;
        }
        .avater_right{
            margin-left: 0.2rem;
        }
        .name{
            color: #333;
            font-weight: 500;
            margin-bottom: 0.25rem;
        }
        .class{
            color: #999;
            font-weight: 500;
        }
    /* CDK */
        .cdk{
            width:100%;
            height:1.1rem;
            border-radius: 0.55rem;
            font-size: 0.4rem;
            padding-left: 0.3rem;
            box-sizing: border-box;
            border: none;
        }
    /* 手机号 */
        .phone{
            width:100%;
            font-size: 0.4rem;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            margin: 0.7rem 0;
        }
        .phone_num{
            color: #333;
        }
        .change_phone{
            color: #FF301E;
        }
    /* 验证码 */
        .auth_code{
            width:100%;
            display: flex;
            justify-content: space-between;
        }
        .auth_code>input{
            width:73%;
            height:1.1rem;
            line-height: 1.1rem;
            text-align: center;
            border-top-left-radius: 0.55rem;
            border-bottom-left-radius: 0.55rem;
            font-size: 0.4rem;
            padding-left: 0.3rem;
            box-sizing: border-box;
            border: none;
        }
        .auth_code>button{
            width:27%;
            height:1.1rem;
            line-height: 1.1rem;
            text-align: center;
            border-top-right-radius: 0.55rem;
            border-bottom-right-radius: 0.55rem;
            font-size: 0.4rem;
            border: none;
            background: #FF301E;
            color: #fff;
        }
        .button{
            width:100%;
            height:1.1rem;
            line-height: 1.1rem;
            text-align: center;
            border-radius: 0.55rem;
            font-size: 0.44rem;
            border: none;
            background: #FF301E;
            color: #fff;
            margin: 1rem 0;
        }
    /* 规则 */
        .rule{
            width:100%;
            padding-top: 0.3rem;
        }
        .rule_title{
            font-size: 0.4rem;
            color: #333;
            font-weight: 500;
            margin-bottom: 0.3rem;
        }
        .rule_content{
            font-size: 0.35rem;
            color: #999;
            font-weight: 500;
        }
        .rule_content>font{
            display: block;
            margin-bottom: 0.15rem;
        }
    /* 解锁赚钱新姿势样式 */
        .lock{
            width:100%; 
            background: #fff;
            margin-top: 0.3rem;
            border-radius: 0.16rem;
        }
        .lock>img{
            width:100%;
            height:3.2rem;
            border-top-left-radius:0.16rem ;
            border-top-right-radius:0.16rem ;
        }
        .lock_img{
            width:9rem;
            height:3.2rem;
            margin: 0 auto 0.3rem;
        }
        .lock_img>img{
            width:9rem;
            height:3.2rem;
            border-radius:0.16rem ;
        }
        .special_item{
            width:100%;
            background-color: #fff;
            box-sizing: border-box;
            margin:0.22rem auto 0.22rem;
            display: flex;
            border-radius: 0.16rem;
            padding-bottom: 0.2rem;
            border-bottom: 1px solid #f4f4f4;
        }
        .avater1,.avater1>img{
            width:2.5rem;
            height:2.5rem;
            border-radius: 0.16rem;
        }
        .avater1{
            margin: 0.32rem 0 0 0.2rem;
        }
        .first_right{
            width:6.5rem;
            font-size: 0.32rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            box-sizing: border-box;
            margin:0.32rem 0 0 0.2rem;
            color:#999;
            padding-right: 0.1rem;
        }
        .first_right_top{
            width:100%;
            display: flex;
            margin-bottom: 0.3rem;
            flex-wrap: nowrap;
        }
        .special_class{
            width:20%;
            height:0.5rem;
            font-size: 0.25rem;
            font-weight: 500;
            text-align: center;
            line-height: 0.5rem;
            background-color: #000;
            color:#ff0;
            border-radius: 0.06rem;
            margin-right: 0.2rem;
        }
        .special_name{
            width:75%;
            font-size: 0.43rem;
            font-weight: 700;
            color:#333;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .area{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
            margin-bottom: 0.3rem;
            justify-content: space-between;
        }
        .km{
            color:#666;
        }
        .good1{
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            flex-wrap: nowrap;
        }
        .good1_left{
            color:#FF301E;
        }
        .good1_left>font{
            font-weight: 700;
            font-size: 0.45rem;
        }
        .shop_name{
            width:3.3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .arrow{
            width: 0;
            height: 0;
            margin-top:0.2rem;
            border-left: 0.2rem solid #ccc;
            border-top: 0.2rem solid transparent;
            border-bottom: 0.2rem solid transparent;
        }
        .get{
            width:1.7rem;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            color:#fff;
            border-radius: 0.4rem;
            background: #FF301E;
        }
    /* 查看更多 */
        .look_more{
            width:35%;
            text-align: center;
            height:0.6rem;
            line-height: 0.6rem;
            margin: 0.5rem auto 0;
            color: #fff;
            font-weight: 700;
            font-size: 0.4rem;
            background: rgb(255,48,30,.9);
            border-radius: 0.16rem;
        }
</style>