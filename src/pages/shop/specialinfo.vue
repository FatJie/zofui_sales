<template>
    <div id="main">
        <loading v-show="inited == 0 || inited == 1" :inited="inited"/>
        <div v-if="inited=2">
            <!-- 头部 -->
            <div class="header">
                <van-swipe :autoplay="3000" indicator-color="white">

                    <div v-if="!data.img">
                        <van-swipe-item>
                            <img :src="data.thumbh">
                        </van-swipe-item>
                    </div>

                    <div v-else v-for="item_img in data.img">
                        <van-swipe-item>
                            <img :src="item_img">
                        </van-swipe-item>
                    </div>

                   
                </van-swipe>
            </div>
            <!-- 商品介绍 -->
            <div class="intro">
                <div class="intro_title">{{data.title}}</div>
                <div class="intro_content">{{data.describe}}</div>
            </div>
            <!-- 套餐内容 -->
            <div class="suit" v-if="data.goodinfo.length!=0">
                <div class="suit_title">
                    <div class="suit_title_left">套餐内容</div>
                    <!-- <div class="suit_title_right">查看图文</div> -->
                </div>
                <div class="suit_content">
                    <div class="suit_content_item" v-for="infoitem in data.goodinfo">
                        <div class="suit_content_item_left">
                            <div class="point"></div>
                            <div class="suit_good">{{infoitem.goodname}}<font> ({{infoitem.goodnum}}份)</font></div>
                        </div>
                        <div class="suit_content_item_right">{{infoitem.goodprice}}元</div>
                    </div>
                </div>
                <div class="more_suit">更多</div>
            </div>
            <!-- 商品须知 -->
            <div class="good_know">
                <div class="good_know_title">商品须知</div>
                <div class="useful">
                    <div class="useful_title">有效期：</div>
                    <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            {{data.end_time}}
                        </div>
                    </div>
                </div>
                <div class="useful">
                    <div class="useful_title">使用时间：</div>
                    <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            <font>{{data.startday}}</font>至<font>{{data.endday}}</font>
                        </div>
                    </div>
                </div>
                <div class="useful">
                    <div class="useful_title">预约信息：</div>
                    <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            <font>{{data.order_info}}</font>
                        </div>
                    </div>
                </div>
                <div class="useful">
                    <div class="useful_title">使用规则：</div>
                    <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            <font>{{data.tips}}</font>
                        </div>
                    </div>
                    <!-- <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            <font>每桌最多使用一份每桌最多使用一份每桌最多使用一份每桌最多使用一份</font>
                        </div>
                    </div>
                    <div class="useful_time">
                        <div class="point"></div>
                        <div class="useful_time_bottom">
                            <font>每桌最多使用一份每桌最多使用一份每桌最多使用一份每桌最多使用一份每桌最多使用一份</font>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- 使用说明 -->
            <div class="use">
                <div class="use_title">使用说明</div>
                <div class="use_pic">
                    <div class="use_pic_left">
                        <img :src="imgPre+'/zu1.png'">
                        <div class="use_pic_font">平台选择使用商品</div>
                    </div>
                    <div class="use_pic_right">
                        <img :src="imgPre+'/zu2.png'">
                        <div class="use_pic_font">门店商家核销可用</div>
                    </div>
                </div>
            </div>
            <!-- 适用商户 -->
            <div class="shop">
                <div class="shop_title">适用商户</div>
                <div class="shop_name">
                    <div class="shop_name_left">
                        <div class="shop_name_left_top">{{data.name}}</div>
                        <!-- <div class="rate">
                            <van-rate v-model="rate" allow-half void-icon="star" void-color="#eee" color="#ff6e40" size="8px" gutter="2px" readonly/> 
                            <font> {{rate}}分(888人评)</font>
                        </div> -->
                    </div>
                    <img class="shop_phone" :src="imgPre+'/phone_solid.png'" @click="bindtap($event,'tel')" :data-tel="data.tel">
                </div>
                <div class="devider"></div>
                <div class="shop_address" @click="bindtap($event,'loc')" :data-lat="data.lat/1000000" :data-lng="data.lng/1000000" :data-addname="data.name" :data-add="data.address">{{data.address}}</div>
            </div>
            <!-- 商品评价 -->
            <div class="good_comment">
                <div class="suit_title">
                    <div class="suit_title_left">商品评价</div>
                    <div class="suit_title_right">更多评价（{{clist.length}}条）</div>
                </div>
                <div class="good_comment_item" v-for="item in clist">
                    <div class="good_comment_item_top">
                        <div class="avater">
                            <img :src="item.headimg">
                        </div>
                        <div class="user">
                            <div class="user_top">
                                <font>{{item.nickname}}</font>
                                <div class="class">{{item.grade}}</div>
                            </div>
                            <div class="user_bottom">
                                <van-rate v-model="item.star" allow-half void-icon="star" void-color="#eee" color="#ff6e40" size="8px" gutter="2px" readonly/> 
                            </div>
                        </div>
                        <div class="datatime">{{item.ctime}}</div>
                    </div>
                    <div class="good_comment_content">
                        {{item.content}}
                    </div>
                    <div class="comment_img" v-for="cimg in item.img">
                        <img :src="cimg">
                    </div>
                </div>
                <div class="more_suit">查看{{clist.length}}条评价</div>
            </div>
            <div class="tabbar">
                <div class="home" @click="toHome">
                    <img :src="imgPre+'/home.png'">
                    <div class="home_text">首页</div>
                </div>
                <div class="tabbar_shop" @click="toShop(data.shopid)">
                    <img :src="imgPre+'/shop.png'">
                    <div class="home_text">店铺</div>
                </div>
                <button class="share" @click="openShareArea">分享</button>
                <button class="ljlq" @click="getSpecial" :data-id="data.id" v-if="data.buttons==0">立即领取</button>
                <button class="geted" v-if="data.buttons==2">已领取</button>
                <button class="saled" v-if="data.buttons==1">今日售罄</button>
            </div>

            <!-- 分享弹框 -->
            <sharetip :isshowshare="isshowshare" @shareit="shareit" />
            <van-popup v-model="SharePopupshow" position="bottom" :overlay="true" @click-overlay="SharePopupshow = true">

                <div class="share-area">
                    
                    <div @click="getPoster" class="item">
                        <img src="https://img11.360buyimg.com/ddimg/jfs/t1/79397/19/948/5580/5cf23bdbE11da7e29/b145f3c1ba828eba.png">
                        <div>生成海报</div>
                    </div>
                    <div class="item"  @click="isshowshare=true">
                        <img src="http://img11.360buyimg.com/ddimg/jfs/t1/103560/23/4172/8220/5de4dfe9Eee327186/6a18d9c78ef7ea10.png">
                        <div>分享好友</div>
                    </div>

                </div>
            </van-popup>
        </div>
        
    </div>
</template>

<script>
    import { Loading,Swipe, SwipeItem,Rate,Dialog,Popup,ImagePreview } from 'vant';
    import sharetip from '../../components/sharetip';
    import wx from 'weixin-js-sdk';
    export default{
        name:'specialinfo',
        components:{
            [Swipe.name]:Swipe,
            [Rate.name]:Rate,
            [SwipeItem.name]:SwipeItem,
            [Dialog.name]:Dialog,
            [Popup.name]:Popup,
            [ImagePreview.name]:ImagePreview,
            [Loading.name]:Loading,
            sharetip,
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                inited:0,
                SharePopupshow:false,
                isshowshare:false,
                dev:'',
                data:{goodinfo:[]},
                rate:4.8,
                gid:0,
                clist:{},
                imgs:[],
                linking:'',
                sharedata:{}
            }
        },
        beforeRouteLeave (to, from, next) {
            document.documentElement.scrollTop = 0;
            next();
        },
        created(){
            this.gid=this.$route.query.id;
            this.initData();
        },
        methods:{
            getPoster(){
                var self = this;
                var postdata = {
                    op:'goods',
                    gid:self.data.id,
                    path:self.linking
                };
                self.$util.http('poster','GET',postdata,function(res){
                    if (!res.errno && res.data ) {
                        Dialog.alert({
                            message: '可将图片保存到本地相册和发给好友！'
                        }).then(() => {

                            ImagePreview({
                                images : [res.data.url],
                                closeOnPopstate : true,
                                showIndicators : true,
                            })
                        });

                    }else{
                        self.$toast(res.message);
                    }
                },true);
            },
            link(e){
                this.$router.push(e.currentTarget.dataset.url);
            },
            openShareArea(e){
                this.SharePopupshow = !this.SharePopupshow;
            },
            toShop(id){
                this.$router.push('/shopinfo?id='+id);
            },
            // 分享
            shareit(bool){
                this.isshowshare = bool;
            },
            toHome(){
                this.$router.push('/');
            },
            //跳转
            getSpecial(e){

                if(this.data.err==0){
                    this.$router.push({path:'/specialdetail',query:{id:this.gid}});
                }else if(this.errno==1){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: this.data.mess,
                        confirmButtonText:'马上升级',
                        confirmButtonColor:'#ff6e40',
                        cancelButtonText:'下次再说',
                        cancelButtonColor:'#999'
                    }).then(() => {
                        this.$router.push('/ucard')
                    }).catch(() => {
                        
                    });
                }else if(this.data.err==2){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: this.data.mess,
                        confirmButtonText:'马上升级',
                        confirmButtonColor:'#ff6e40',
                        cancelButtonText:'下次再说',
                        cancelButtonColor:'#999'
                    }).then(() => {
                        this.$router.push('/buyserver')
                    }).catch(() => {
                        
                    });
                }else if(this.data.err==3){
                    Dialog.alert({
                        title: '温馨提示',
                        message: this.data.mess,
                        confirmButtonColor:'#ff6e40',
                        cancelButtonColor:'#999'
                    }).then(() => {
                        
                    })
                };
            },

            //拨打电话，导航
            bindtap(e,type){
                this.$util.bindtap(e,type,this);
            },
            //请求后台数据
            initData(){
                var params={
                    op:'tequandetail',
                    gid:this.gid,
                }
                this.$util.http('good','GET',params,res=>{
                    this.inited=1;
                    this.linking=res.data.sharedata.link;
                    this.data=res.data.list;
                    this.clist=res.data.comment;
                    this.inited=2;
                })
                
            }
        }
    }
</script>

<style scoped>
    /* 头部图片 */
        .header,.header img{
            width:100%;
            height:5.25rem ;
        }
    /* 商品介绍 */
        .intro,.suit,.good_know,.use,.shop,.good_comment{
            width:9.4rem;
            margin:0.3rem auto 0;
            border-radius: 0.16rem;
            box-sizing: border-box;
            padding:0.3rem;
            background-color:#fff;
        }
        .intro_title,.use_title,.shop_title{
            margin-bottom: 0.2rem;
            font-size: 0.48rem;
            color: #333;
            font-weight: 700;
        }
        .intro_content{
            width:8.32rem;
            margin:0 auto;
            font-size: 0.37rem;
            color: #333;
            font-weight: 500;
        }
    /* 套餐内容 */
        .suit_title{
           display: flex;
           justify-content: space-between;
           align-items: baseline;
           margin-bottom: 0.35rem;
        }
        .suit_title_left{
            font-size: 0.48rem;
            color: #333;
            font-weight: 700;
        }
        .suit_title_right{
            box-sizing: border-box;
            padding-right: 0.3rem;
            font-size: 0.32rem;
            color: #333;
            font-weight: 500;
            background: url(../../assets/mine/arrow_right.png) no-repeat right center;
            background-size:0.1rem 0.2rem ;
            margin-right: 0.1rem;
        }
        .suit_content{
            width:100%;
        }
        .suit_content_item{
            width:100%;
            box-sizing: border-box;
            padding:0 0.2rem;
            display: flex;
            justify-content: space-between;
            margin-bottom:0.2rem;
        }
        .suit_content_item_left{
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
        }
        .point{
            width:0.1rem;
            height: 0.1rem;
            margin-right: 0.2rem;
            background-color: #999;
            border-radius: 0.05rem;
        }
        .suit_good{
            font-size:0.37rem;
            color: #333;
            font-weight: 500;
        }
        .suit_good>font{
            color: #999;
            font-size: 0.32rem;
        }
        .suit_content_item_right{
            font-size:0.37rem;
            color: #333;
            font-weight: 500;
        }
        .more_suit{
            width:100%;
            font-size: 0.32rem;
            box-sizing: border-box;
            background: url(../../assets/mine/arrow_bottom.png) no-repeat right center;
            background-size:0.2rem 0.1rem ;
            text-align: right;
            padding-right: 0.4rem;
            margin-top: 0.8rem;
        }
    /* 商品须知 */
        .good_know_title{
            font-size: 0.48rem;
            color: #333;
            font-weight: 700;
            margin-bottom: 0.4rem;
        }
        .useful{
            font-size: 0.38rem;
            margin-bottom: 0.2rem;
        }
        .useful_title{
            width:100%;
            color: #999;
        }
        .useful_time{
            padding-left: 0.1rem;
            box-sizing: border-box;
            display: flex;
            align-items: center;
        }
        .useful_time_bottom{
            width:8rem;
            color: #333;
            font-weight: 500;
        }
    /* 使用说明 */
        .use_pic{
            width:6.72rem;
            margin:0 auto;
            display: flex;
            justify-content: space-between;
            margin-top:1rem ;
        }
        .use_pic_left,.use_pic_right{
            text-align: center;
        }
        .use_pic_font{
            font-size: 0.35rem;
            color: #333;
        }
        .use_pic img{
            width:2rem;
            height:2rem;
        }
    /* 适用商户 */
        .shop_name{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .shop_name_left_top{
            width:8rem;
            /* white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden; */
            font-size: 0.43rem;
            color: #333;
            font-weight: 700;
        }
        .rate{
            font-size: 0.32rem;
            color: #333;
        }
        .shop_phone{
            width:0.5rem;
            height:0.5rem;
        }
        .devider{
            width:90%;
            height: 0;
            margin: 0.3rem auto;
            border: 0.5px solid #eee;
        }
        .shop_address{
            width:100%;
            font-size: 0.43rem;
            color: #333;
            background: url(../../assets/mine/arrow_right.png) no-repeat right center;
            background-size:0.1rem 0.2rem ;
        }
    /* 商品评价 */
        .good_comment_item{
            width:100%;
            box-sizing: border-box;
            padding:0.3rem;
            font-size: 0.32rem;
        }
        .good_comment_item_top{
            display: flex;
            justify-content: space-between;
            position: relative;
        }
        .avater{
            width:0.9rem;
            height:0.9rem;
            overflow: hidden;
        }
        .avater>img{
            width:0.9rem;
            height:0.9rem;
            border-radius: 0.45rem;
        }
        .user{
            position: absolute;
            top:0;
            left: 1.2rem;
        }
        .user_top{
            display: flex;
        }
        .class{
            margin-left: 0.2rem;
        }
        .datatime{
            color:#999;
            font-size: 0.32rem;
        }
        .good_comment_content{
            /* white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; */
            /* height:1.5rem; */
            margin:0.2rem 0 0 1.2rem;
            font-size: 0.38rem;
            color: #333;
        }
        .comment_img{
            margin:0.2rem 0 0 1.2rem;
            display: flex;
            justify-content: space-between;
        }
        .comment_img>img{
            width:33%;
            height: 33%;
            border-radius: 0.16rem;
        }
    /* 底部导航 */
        .tabbar{
            width:100%;
            height:1.3rem;
            background: #fff;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 990;
            display: flex;
        }
        .tabbar img{
            width:0.5rem;
            height:0.5rem;
        }
        .home,.tabbar_shop{
            padding-top:0.15rem ;
            width:20%;
            box-sizing: border-box;
            text-align: center;
            font-size:0.3rem;
            color: #4c4c4c;
        }
        .share,.ljlq{
            width:30%;
            height:1.3rem;
            line-height: 1.3rem;
            font-size:0.43rem ;
            color: #fff;
            text-align: center;
            border: none;
        }
        .saled,.geted{
            width:30%;
            height:1.3rem;
            line-height: 1.3rem;
            font-size:0.43rem ;
            color: #fff;
            text-align: center;
            border: none;
            background: #999;
        }
        .share{
            background: #FFBD44;
        }
        .ljlq{
            background: #ff6e40;
        }
    /* 弹框 */
        .toast{
            width:100%;
            height:100%;
            background: rgba(255,255,255,.2);
            position:fixed;
            left: 0;
            right: 0;
            z-index: 1000;
        }
    /* 分享弹框 */
        .share-area {
            position: relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            padding: 26px 0 20px;
        }

        .share-area .item {
            -webkit-box-flex: 1;
            flex: 1;
            font-size: 13px;
            text-align: center;
            line-height: 20px;
            background-color: transparent;
            border-radius: 0;
        }

        .share-area .item img {
            width: 38px;
            height: 38px;
        }
</style>
