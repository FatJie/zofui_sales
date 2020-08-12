<template>
    <div id="main">
        <loading v-show="inited == 0 || inited == 1" :inited="inited"/>
        <!-- 个人信息 -->
        <div v-if="inited==2">
            <div class="header">
                <div class="avater">
                    <img :src="list.headimg">
                </div>
                <div class="header_name">
                    <div class="header_name_top">
                        <span>{{list.nickname}}</span>
                        <span>{{list.gradename}}</span>
                    </div>
                    <div class="header_name_center" v-if="list.endtime && list.grade==1">
                        <font>{{list.endtime}}</font>
                        <font @click="renewal" style="text-align: center;border-radius: 0.16rem;border:1px solid #fff;color: #fff;font-size: 0.325rem;padding:1px 2px;">去续费</font>
                    </div>
                    <!-- 对应会员等级名称显示 -->
                    <div class="header_name_bottom">
                        <span>邀请码:{{list.id}}</span>
                        <span @click="add(list.grade)"  v-if="list.grade!=3">激活码升级 ></span>
                    </div>
                    <!-- <div class="header_name_bottom" v-if="datalist.grade==1">
                        <span>VIP会员</span>
                        <span>邀请码:11111111</span>
                    </div>
                    <div class="header_name_bottom" v-if="datalist.grade==2">
                        <span>合伙人</span>
                        <span>邀请码:11111111</span>
                    </div>
                    <div class="header_name_bottom" v-if="datalist.grade==3">
                        <span>联合创始人</span>
                        <span>邀请码:11111111</span>
                    </div> -->
                </div>
                <!-- 邀请好友高收益 -->
                <div class="profit" v-if="list.grade!=0" @click="getPoster" data-type="index">
                    <img :src="imgPre+'/to_invite.png'">
                </div>
            </div>
            <!-- 5大特权内容 -->
            <div class="five" v-if="list.grade==0">
                <div class="enjoy">
                    <img :src="imgPre+'/five_big.jpg'">
                </div>
                <img @click="topay" :src="imgPre+'/go.png'">
            </div>
            
            <!-- 点击查看专属福利 -->
            <!-- <div class="welfare" @click="invite" v-if="list.grade==0">
                <img :src="imgPre+'/group.png'">
            </div> -->
            <!-- 解锁赚钱新姿势 -->
            <!-- <div class="school" v-if="list.grade!=0">商学院</div> -->
            <div class="lock_img">
                <img :src="imgPre+'/unlock.png'" @click="toNew">
            </div>
            <div class="lock">
                <img :src="imgPre+'/only.png'" v-if="list.grade!=0">
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
                            <div>{{item.distance}}</div>
                        </div>
                        <div class="good1">
                            <div class="good1_left"><font>{{item.oldprice}}</font>元</div>
                            <div class="good1_right">{{item.saled}}人领取</div>
                            <div class="get" @click="getSpecial(item.id)">免费领取</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 查看更多 -->  
        <div class="look_more" @click="look_more">~ 点击查看更多 ~</div>
    </div>
</template>
<script>
    import wx from 'weixin-js-sdk';
    export default{
        name:'ucard',
        created(){
            this.downLoad()
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                inited:0,
                list:{},
                goods:[],
            }
        },
        methods:{
            renewal(){
                this.$router.push('/buycard');
            },
            toNew(){
                this.$router.push('/page?id=195');
            },
            look_more(){
                this.$router.push('/speciallist');
            },
            getPoster(e){
                this.$router.push({path:'/poster',query:{type:e.currentTarget.dataset.type}})
            },
            // 跳转特权详情
            getSpecial(id){
                this.$router.push({path:'/goodinfo',query:{id:id}});
            },
            invite(){
                this.$router.push('/upgrade')
            },
            add(grade){
                this.$router.push('/codechange?grade='+grade);
            },
            downLoad(){
                var loc = this.$util.getCache('loc');
                var data={
                    op:'info',
                    zfid : this.$route.query.zfid ? this.$route.query.zfid : 0 ,
                    lat:loc.lat,
                    lng:loc.lng
                }
                this.$util.http('ucard','GET',data,res=>{
                    this.inited=1;
                    this.list=res.data.userinfo;
                    this.goods=res.data.goods;
                    this.inited=2;
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
                })
            },
            topay(){
                this.$router.push('/buycard');
                // if(this.list.account=='' || this.list.account==null){
                //     this.$router.push('/bindphone');
                // }else{
                //     this.$router.push('/buycard');
                // }
            }
        }
    }
</script>
<style scoped>
     #main *{
        box-sizing: border-box;
     }
     #main{
        background: #F2F2F2;
        padding-bottom:2rem;
     }
    /* 个人信息样式 */
        .header{
            width:100%;
            height:4rem;
            background:#ff6e40;
            display: flex;
            padding:0.56rem;
            position: relative;
        }
        .avater{
            width:1.3rem;
            height:1.3rem;
            border:1px solid #fff;
            border-radius: 50%;
            overflow: hidden;
        }
        .avater>img{
            width:1.3rem;
            height:1.3rem;
        }
        .header_name{
            width:80%;
            margin-left:2%;
        }
        .header_name_center{
            color: #fff;
            margin-bottom: 0.1rem;
            font-size: 0.325rem;
            padding:1px 0;
        }
        .header_name_top{
            width:70%;
            display: flex;
            justify-content: start;
            align-items: center;
            margin-bottom: 0.1rem;
        }
        .header_name_top>span:first-child{
            display:inline-block;
            width:60%;
            color:#fff;
            margin-right: 0.2rem;
            font-size: 0.53rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .header_name_top>span:last-child{
            display: inline-block;
            width:35%;
            text-align: center;
            border-radius: 0.16rem;
            border:1px solid #fff;
            color: #fff;
            font-size: 0.325rem;
            padding:2px;
        }
        .header_name_bottom{
            width:70%;
            display: flex;
            justify-content: space-between;
        }
        .header_name_bottom>span:first-child{
            display: inline-block;
            height:0.56rem;
            background:rgba(255,255,255,0.4);
            line-height: 0.56rem;
            font-size:0.27rem;
            border-radius: 0.29rem;
            color:#fff;
            padding:0 0.2rem;
        }
        .header_name_bottom>span:nth-child(2){
            display: inline-block;
            height:0.56rem;
            line-height: 0.56rem;
            font-size:0.285rem;
            border:1px solid #fff;
            color: #fff;
            border-radius: 0.28rem;
            padding:0 0.2rem;
        }
        /* .header_name_bottom>span:first-child{
            display: inline-block;
            height:0.56rem;
            line-height: 0.56rem;
            padding:0 0.2rem 0 0.5rem ;
            font-size:0.285rem;
            color:#fefefe;
            border-radius: 0.28rem;
            background:rgba(255,255,255,0.2);
            background-image: url(../../assets/mine/level.png);
            background-position:5% center  ;
            background-repeat: no-repeat;
            background-size: 0.35rem ;
        }
        .header_name_bottom>span:nth-child(2){
            display: inline-block;
            height:0.56rem;
            padding:0 0.2rem;
            background:rgba(255,255,255,0.4);
            line-height: 0.56rem;
            text-align: center;
            font-size:0.27rem;
            border-radius: 0.29rem;
            color:#fff;
            margin-right:0;
        } */
    /* 邀请好友高收益 */
        .profit{
            width:9rem;
            height:1.5rem;
            position:absolute;
            bottom:0;
            left: 50%;
            transform: translateX(-50%);
        }
        .profit>img{
            width:100%;
            height:100%;
        }
    /* 5大特权内容样式 */
        .five{
            width:9rem;
            margin:0 auto 0.35rem;
            background: #fff;
            margin-top:-0.6rem;
            border-radius: 0.15rem;
            position:relative;
        }
        .five>img{
            width:7.3rem;
            height:1.5rem;
            border-radius: 0.15rem;
            position: absolute;
            bottom:0.3rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .five_header{
            width:100%;
            margin:0 auto;
            height:1.72rem;
            padding:0.32rem 0.72rem;
            border-bottom: 1px solid #f2f2f2;
            display: flex;
        }
        .five_header_left,.five_header_left>img{
            width:1.12rem;
            height:1.12rem;
        }
        .five_header_left{
            border-radius: 50%;
            overflow: hidden;
        }
        .five_header_right{
            width:70%;
            margin-left:0.3rem;
        }
        .name{
            width:100%;
            height:0.5rem;
            font-size:0.46rem;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:0.6rem;
            margin:0;
        }
        .invite{
            width:100%;
            height:0.35rem;
            padding-top:0.24rem;
            margin:0;
            font-size: 0.35rem;
            font-weight: 700;
            color:#999;
        }
        .enjoy,.enjoy>img{
            width:100%;
            height:9.1rem;
            border-radius: 0.16rem;
        }
        .button{
            width:90%;
            height:1.35rem;
            line-height: 1.35rem;
            text-align: center;
            border-radius: 0.7rem;
            background-color: #FF6E40;
            font-size: 0.5rem;
            font-weight: 700;
            color:#fff;
            position:absolute;
            bottom:0.52rem;
            left:0.4rem;
            border:0;
        }
    /* 点击查看专属福利样式 */
        .welfare{
            width:9rem;
            margin:0 auto 0.3rem;
        }
        .welfare>img{
            width:100%;
        }
    /* 解锁赚钱新姿势样式 */
        .school{
            width:9rem;
            font-size: 0.43rem;
            font-weight: 700;
            color: #333;
            margin: 0.5rem auto;
        }
        .lock{
            width:9rem; 
            margin:0 auto;
            background: #fff;
            border-radius: 0.16rem;
        }
        .lock>img{
            width:100%;
            height:1.9rem;
            border-top-left-radius:0.16rem ;
            border-top-right-radius:0.16rem ;
        }
        .lock_img{
            width:9rem;
            margin: 0.3rem auto;
        }
        .lock_img>img{
            width:9rem;
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
            width:6rem;
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
            flex-wrap: nowrap;
            margin-bottom: 0.3rem;
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
            width:80%;
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
            margin-bottom: 0.3rem;
            flex-wrap: nowrap;
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