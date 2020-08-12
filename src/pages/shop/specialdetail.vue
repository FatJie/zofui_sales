<template>
    <div id="main">
        <loading v-show="inited == 0 || inited == 1" :inited="inited" />
        <div class="content" v-if="inited == 2">
            <!-- 特权商品展示 -->
            <div class="special_item">
                <div class="avater">
                    <img :src="list.thumb">
                </div>
                <div class="first_right">
                    <div class="first_right_top">
                        <div class="special_name">{{list.title}}</div>
                    </div>
                    <div class="area">
                        <div><font>{{list.type}}</font> {{list.country}}</div>
                    </div>
                    <div class="good2">
                        <div class="shop_name">{{list.name}}</div>
                    </div>
                    <div class="useful">
                        有效期：2021-02-04 16:59:54
                    </div>
                </div>
            </div>
            <!-- 分割虚线 -->
            <div class="div">
                <div class="div_left"></div>
                <div class="div_line"></div>
                <div class="div_right"></div>
            </div>
            <!-- 二维码 -->
            <div class="code">
                <div class="title">
                    <font>核销二维码</font>
                </div>
                <div class="code_content">
                    <img :src="list.img">
                </div>
                <div class="consumer_code">
                    <font>消费码：</font>
                    <font class="consumer_code_num">{{list.code}}</font>
                </div>
            </div>
            <!-- 分割虚线 -->
            <div class="div">
                <div class="div_left"></div>
                <div class="div_line"></div>
                <div class="div_right"></div>
            </div>
            <!-- 定位电话 -->
            <div class="addr">
                <div class="shop_title">{{list.name}}</div>
                <div class="address">
                    <div class="address_left">{{list.address}}</div>
                    <div class="address_right">
                        <img :src="imgPre+'/loc.png'" class="loc" @click="bindtap($event,'loc')" :data-lat="list.lat/1000000" :data-lng="list.lng/1000000" :data-addname="list.name" :data-add="list.address">
                        <img :src="imgPre+'/phone.png'" class="phone" @click="bindtap($event,'tel')" :data-tel="list.tels">
                    </div>
                </div>
            </div>
            <!-- 分割虚线 -->
            <div class="div_line_bottom"></div>
            <!-- 领取须知 -->
            <div class="get_know">
                <div class="get_know_title">领取须知</div>
                <div>
                    到店请出示核销码，由商家微信核销后即可消费！
                </div>
            </div>
            <!-- 分割虚线 -->
            <div class="div_line_bottom"></div>
            <!-- 返回首页 -->
            <router-link to="/">
                <div class="back">返回首页</div>
            </router-link>
        </div>

        <div class="timg" @click="show=true" v-if="list.is_guanzhu==0">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/timg.jpg">
        </div>
        <div class="tankuang" v-if='show'>
            <div class="content">
                <div class="content_title">长按二维码关注公众号</div>
                <div class="content_img">
                    <img src="http://ykd.lsh199.com/attachment/images/4/2020/05/G84q58GAAjq5SSGJdnM2T8cfngGTmd.jpg">
                </div>
            </div>
            <img @click="show=false" src="http://ykd.lsh199.com/attachment/images/global/mobile/close.png">
        </div>

    </div>  
</template>

<script type="text/javascript">

    let timer = null;
    export default{
        name:'specialdetail',
        data(){
            return{
                show:false,
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                list:{},
                gid:this.$route.query.id,
                inited:0
            }
        },
        created(){
            this.initData();
            this.getData();
        },
        beforeRouteLeave(to,from,next) {
            timer && clearInterval(timer);
            next();
        },
        methods: {
            //核销二维码
            getData(){
                var self = this;
                timer = setInterval(function(){
                    self.$util.http('good','GET',{op:'orderstatus',orderid:self.list.orderid},function(res){
                        if (res.errno==0){
                            self.$router.push('/commentorder?id='+self.list.orderid);
                            clearInterval(timer);
                        }
                    });
                },500)
            },
            //地址导航
            bindtap(e,type){
                this.$util.bindtap(e,type,this);
            },
            //请求后台数据
            initData(){
                var params={
                    op:'lingqu',
                    gid:this.gid,
                }
                this.$util.http('good','GET',params,res=>{
                    this.inited=1;
                    this.list=res.data.list;
                    this.inited=2;
                })
            },
        }
    }
</script>

<style scoped>

.timg{
    position: fixed;
    top:35%;
    right: 0;
}
.timg>img{
    width: 100px;
    height: 100px;
    border-radius: 50%;

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

    #main{
        background: #ff6e40;
        border:1px #ff6e40 solid;
    }
    .content{
        width:9.4rem;
        margin:0.32rem auto;
        background:#fff;
        border-radius: 0.16rem;
        padding-bottom: 0.65rem;
    }
    /* 特权商品展示 */
        .special_item{
            width:9.4rem;
            background-color: #fff;
            box-sizing: border-box;
            margin:0.22rem auto 0.22rem;
            display: flex;
            border-radius: 0.16rem;
        }
        .avater,.avater>img{
            width:2.6rem;
            height:2.6rem;
            border-radius: 0.16rem;
        }
        .avater{
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
            padding-right: 0.3rem;
        }
        .first_right>div{
            margin-bottom:0.2rem;
        }
        .first_right_top{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
        }
        .special_class{
            width:1.7rem;
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
            font-size: 0.43rem;
            font-weight: 700;
            color:#333;
        }
        .area{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
        .km{
            color:#666;
        }
        .good1,.good2{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
        }
        .good2{
            height:0.8rem;
            line-height: 0.8rem;
            justify-content: space-between;
        }
        .good1{
            display: table;
        }
        .good1_left{
            color:#FF301E;
        }
        .good1_left>font{
            font-weight: 700;
            font-size: 0.56rem;
        }
        .good1_right{
            display: table-cell;
            vertical-align: bottom;
            text-align: right;
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
        .useful{
            color:#FF6E40;
            font-size: 0.32rem;
            font-weight: 500;
        }
    /* 分割区域样式 */
        .div{
            width:100%;
            display: flex;
            justify-content: space-between;
        }
        .div_left{
            width:0.22rem;
            height:0.44rem;
            border-radius:0 0.22rem 0.22rem 0 ;
            background: #ff6e40;
            margin-left:-1px;
        }
        .div_right{
            width:0.22rem;
            height:0.44rem;
            border-radius: 0.22rem 0 0 0.22rem;
            background: #ff6e40;
        }
        .div_line{
            width:8.08rem;
            height:0;
            border:0.5px dashed #999;
            margin-top:0.2rem;
        }
    /* 二维码样式 */
        .code{
            width:100%;
        }
        .title{
            width:8.08rem;
            margin: 0 auto;
            font-size: 0.5rem;
            color:#333;
            font-weight: 700;
            text-align: center;
        }
    /* 二维码 */
        .code_content,.code_content>img{
            width:4.3rem;
            height:4.3rem;
        }
        .code_content{
            margin:1rem auto 0.65rem;
        }
    /* 消费码 */
        .consumer_code{
            width:7.7rem;
            height:1.44rem;
            margin: 0 auto;
            line-height: 1.44rem;
            text-align: center;
            font-size: 0.35rem;
            color:#999 ;
        }
        .consumer_code_num{
            font-size:0.45rem ;
            font-weight: 700;
            color:#333;
        }
    /* 定位电话 */
        .addr{
            width:8.08rem;
            margin:1rem auto 0.72rem;
            font-size: 0.5rem;
        }
        .shop_title{
            width:100%;
            font-weight: 700;
            color:#333;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .address{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-top: 0.3rem;
        }
        .address_left{
            width:5.7rem;
            font-size:0.35rem ;
            color:#999;
        }
        .address_right{
            width:2.3rem;
            display: flex;
            justify-content: space-around;
        }
        .address_right>img{
            width:0.5rem;
            height:0.5rem;
        }
    /* 底部分割虚线 */
        .div_line_bottom{
            width:8.08rem;
            height:0;
            border:0.5px dashed #999;
            margin:0 auto;
        }
    /* 领取须知 */
        .get_know{
            width:8.08rem;
            margin: 0.8rem auto;
            font-size: 0.32rem;
            color:#999;
        }
        .get_know_title{
            font-size: 0.5rem;
            color:#333;
            font-weight: 700;
            margin: 0.4rem 0 ;
        }
    /* 返回首页 */
        .back{
            width:8.08rem;
            height:0.9rem;
            line-height: 0.9rem;
            text-align: center;
            margin: 0.65rem auto 0;
            border: 1px solid #999;
            font-size: 0.5rem;
            color: #999;
            font-weight: 500;
            border-radius: 0.45rem;
        }
</style>