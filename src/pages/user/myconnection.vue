<template>
    <div id="main">
        <!-- 头部背景 -->
        <div class="bg">
            <!-- 搜索框 -->
            <div class="search">
                <form action="/">
                    <van-search v-model="value" shape="round" placeholder="请输入昵称..." @search="onSearch" background="#ff6e40"/>
                </form>
            </div>
            <div class="line"></div>
            <!-- 人脉数据 -->
            <div class="connection_data">
                <div class="connection_data_today">
                    <font class="data_number">{{newadd}}</font>
                    <font>今日新增人脉</font>
                </div>
                <div class="connection_data_total">
                    <font class="data_number">{{count}}</font>
                    <font>我的总人脉</font>
                </div>
            </div>
        </div>
        <!-- 人脉导航栏 -->
        <van-tabs type="card" color="#ffffff" title-active-color="#FF6E40" title-inactive-color="#333" v-model="type" @click="zhitui0">
            <van-tab :title='"一度人脉("+zhitui_num+")"' type="0"> 
                <div class="first" v-for="item in zhitui" v-if="zhitui_num!=0">
                    <img class="avater" :src="item.headimg">
                    <div class="first_right">
                        <div class="first_name">{{item.nickname}}</div>
                        <div class="first_class">{{item.grade}}</div>
                        <div class="first_phone">手机：{{item.tel}}</div>
                        <div class="first_time">{{item.createtime}}</div>
                        <div class="first_id_number">ID号：{{item.id}}</div>
                        <div class="first_group">团队人数：{{item.team}}</div>
                        <div>累计消费：{{item.prices}}</div>
                        <div>有效期：{{item.cardend}}</div>
                    </div>
                </div>
                <div class="more" v-if="zhitui.length == 0 || zhitui.length % 10 != 0">暂无更多</div>
                <div class="more" @click="more1" v-else>查看更多</div>
            </van-tab>
            <van-tab :title='"二度人脉("+jiantui_num+")"' type="1">
                <div class="first" v-for="item in jiantui" v-if="jiantui_num!=0">
                    <img class="avater" :src="item.headimg">
                    <div class="first_right">
                        <div class="first_name">{{item.nickname}}</div>
                        <div class="first_class">{{item.grade}}</div>
                        <div class="first_phone">手机：{{item.tel}}</div>
                        <div class="first_time">{{item.createtime}}</div>
                        <div class="first_id_number">ID号：{{item.id}}</div>
                        <div class="first_group">团队人数：{{item.team}}</div>
                        <div>累计消费：{{item.prices}}</div>
                        <div>有效期：{{item.cardend}}</div>
                    </div>
                </div>
                <div class="more" v-if="jiantui.length == 0 || jiantui.length % 10 != 0">暂无更多</div>
                <div class="more" @click="more2" v-else>查看更多</div>
            </van-tab>
            <van-tab :title='"潜在人脉("+qianzai_num+")"' type="2">
                <div class="first" v-for="item in qianzai" v-if="qianzai_num!=0">
                    <img class="avater" :src="item.headimg">
                    <div class="first_right">
                        <div class="first_name">{{item.nickname}}</div>
                        <div class="first_class">{{item.grade}}</div>
                        <div class="first_phone">手机：{{item.tel}}</div>
                        <div class="first_time">{{item.createtime}}</div>
                        <div class="first_id_number">ID号：{{item.id}}</div>
                        <div class="first_group">团队人数：{{item.team}}</div>
                        <div>累计消费：{{item.prices}}</div>
                    </div>
                </div>
                <div class="more" v-if="qianzai.length == 0 || qianzai.length % 10 != 0">暂无更多</div>
                <div class="more" @click="more3" v-else>查看更多</div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import { Search,Toast,Tab,Tabs } from 'vant';
    import wx from 'weixin-js-sdk';
    export default{
        components:{
            [Search.name]:Search,
            [Toast.name]:Toast,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
        },
        data(){
            return{
                value:'',
                zhitui:[],
                jiantui:[],
                qianzai:[],
                zhitui_num:0,
                jiantui_num:0,
                qianzai_num:0,
                newadd:0,
                count:0,
                list:{},
                type:0,
                page1:1,
                page2:1,
                page3:1,
                sharedata:''
            }
        },
        created(){
            this.initData();
        },
        methods: {
            more1(){
                this.page1++;
                this.$util.http('user','GET',{op:'renmai',type:this.type,page:this.page1},res=>{
                    this.zhitui=this.zhitui.concat(res.data.zhitui);
                },true)
            },
            more2(){
                this.page2++;
                this.$util.http('user','GET',{op:'renmai',type:this.type,page:this.page2},res=>{
                    this.jiantui=this.jiantui.concat(res.data.jiantui);
                },true)
            },
            more3(){
                this.page3++;
                this.$util.http('user','GET',{op:'renmai',type:this.type,page:this.page3},res=>{
                    this.qianzai=this.qianzai.concat(res.data.qianzai);
                },true)
            },
            zhitui0(){
                this.$util.http('user','GET',{op:'renmai',type:this.type},res=>{
                    if(this.type==0){
                        this.zhitui=res.data.zhitui;
                    }else if(this.type==1){
                        this.jiantui=res.data.jiantui;
                    }else if(this.type==2){
                        this.qianzai=res.data.qianzai;
                    }
                },true)
            },
            //搜索功能
            onSearch(val) {
                var postdata={
                    op:'renmai',
                    val:this.value,
                    type:this.type
                }
                this.$util.http('user','GET',postdata,res=>{
                    if(this.type==0){
                        this.zhitui=res.data.query;
                    }else if(this.type==1){
                        this.jiantui=res.data.query;
                    }else if(this.type==2){
                        this.qianzai=res.data.query;
                    }
                })
            },
            // 请求后台数据
            initData(){
                var self=this;
                this.$util.http('user','GET',{op:'renmai'},res=>{
                    this.zhitui_num=res.data.zhitui_num;
                    this.jiantui_num=res.data.jiantui_num ? res.data.jiantui_num : 0;
                    this.qianzai_num=res.data.qianzai_num;
                    this.newadd=res.data.newadd;
                    this.count=res.data.count;
                    this.zhitui=res.data.zhitui;
                    this.sharedata=res.data.sharedata;
                    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.updateAppMessageShareData({ 
                            title: res.data.sharedata.title, // 分享标题
                            desc: res.data.sharedata.desc, // 分享描述
                            link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: res.data.sharedata.img, // 分享图标
                        })
                    });
                })
            }
        }
    }
</script>

<style scoped>
    /* 头部样式 */
        .bg{
            width:100%;
            height:3.7rem;
            background-color: #ff6e40;
            position:relative;
        }
        .search{
            width:100%;
        }
        .connection_data{
            width:100%;
            color:#fff;
            text-align: center;
            margin-top:0.44rem ;
            font-size: 0.32rem;
            display: flex;
        }
        .connection_data>div{
            width:50%;
        }
        .connection_data font{
            display: inline-block;
            width:100%;
        }
        .data_number{
            font-size: 0.535rem;
            font-weight: 700;
        }
        .line{
            width:1px;
            height:0.7rem;
            background-color: #fff;
            position: absolute;
            top:2rem;
            left:5rem;
        }
    /* 导航条样式 */
        #main /deep/ .van-tabs{
            margin-top:-0.54rem;
        }
        #main /deep/ .van-tabs__nav{
            width:9.4rem;
            margin:0 auto;
            border-radius: 0.16rem;
        }
        .first{
            width:9.4rem;
            background-color: #fff;
            box-sizing: border-box;
            margin:0.22rem auto 0;
            display: flex;
            border-radius: 0.16rem;
        }
        .avater{
            width:1.34rem;
            height:1.34rem;
            box-sizing: border-box;
            border-radius: 50%;
            margin:0.5rem 0 0 0.5rem;
        }
        .first_right{
            width:7rem;
            font-size: 0.32rem;
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            margin:0.5rem 0 0 0.4rem;
            color:#333;
        }
        .first_right>div{
            width:50%;
            margin-bottom: 0.3rem;
        }
        .first_name{
            font-size: 0.43rem;
            font-weight: 700;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .first_class{
            width:1rem !important;
            height:0.4rem;
            font-size: 0.3rem;
            font-weight: 700;
            text-align: center;
            line-height: 0.4rem;
            background-color: #000;
            color:#ff0;
            border-radius: 0.06rem;
        }
        .more{
            width:100%;
            font-size: 0.4rem;
            color: #666;
            text-align: center;
            margin: 0.5rem 0;
        }
</style>