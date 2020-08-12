<template>
    <div id="main">
        <!-- 头部 -->
        <div class="header">
            <div class="header_content">
                <font>已 领 取</font>
                <font>完美体验之旅，尽情享受吧！</font>
            </div>
        </div>
        <div class="middle">
            <!-- 商品展示 -->
            <div class="good_content">
                <div class="special_item">
                    <div class="avater">
                        <img src="../../assets/mine/seckill.jpg">
                    </div>
                    <div class="first_right">
                        <div class="first_right_top">
                            <div class="special_name">111</div>
                        </div>
                        <div class="area">
                            <div><font>222</font> 333</div>
                        </div>
                        <div class="good2">
                            <div class="shop_name">444</div>
                        </div>
                        <div class="useful">
                            有效期：2021-02-04 16:59:54
                        </div>
                        <div class="useful">
                            核销时间：2021-02-04 16:59:54
                        </div>
                    </div>
                </div>
                <!-- 分割虚线 -->
                <div class="div">
                    <div class="div_left"></div>
                    <div class="div_line"></div>
                    <div class="div_right"></div>
                </div>
                <!-- 评价 -->
                <div class="comment">
                    <div class="comment_left">商品觉得怎么样，请打个分吧~</div>
                    <div class="comment_right">立即评价</div>
                </div>
            </div>
            <!-- 以上福利奉上 -->
            <div class="welfare">
                <div class="welfare_title">以下福利奉上</div>
                <div class="welfare_content">
                    <div class="welfare_content_item">
                        <div class="shop_title">商家名称</div>
                        <div class="redbag">5元红包</div>
                        <div class="lingqu">领取</div>
                    </div>
                </div>
            </div>
            <!-- 广告位 -->
            <div class="advertise">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/click_look.png">
            </div>
            <!-- 分割线 -->
            <div class="devider">
                -- 附近大家都在去 --
            </div>
        </div>
    </div>
</template>

<script>
    import { Divider } from 'vant';
    export default{
        [Divider.name]:Divider,
    }
</script>

<style scoped>
    /* 头部样式 */
        .header{
            width:100%;
            height:9.15rem;
            background-color: #ff6e40;
            border-top: 1px solid #ff6e40;
        }
        .header_content{
            width:100%;
        }
        .header_content>font{
            display: block;
            width:100%;
            color:#fff;
            text-align: center;
        }
        .header_content>font:first-child{
            font-size: 0.64rem;
            font-weight: 700;
            margin:0.3rem 0;
        }
        .header_content>font:last-child{
            font-size: 0.35rem;
            font-weight: 500;
        }
    /* 商品展示 */
        .good_content{
            width:9.4rem;
            background-color: #fff;
            margin:0  auto;
            border-radius: 0.16rem;
        }
        .special_item{
            width:9.4rem;
            box-sizing: border-box;
            margin:0.22rem auto 0.22rem;
            display: flex;
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
    /* 评价 */
        .comment{
            width:100%;
            height: 1.3rem;
            line-height: 1.3rem;
            padding:0 0.2rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.35rem;
            box-sizing: border-box;
        }
        .comment_left{
            color:#999;
            font-weight: 500;
        }
        .comment_right{
            width:2rem;
            height:0.825rem;
            line-height: 0.825rem !important;
            text-align: center;
            background-color: #ff6e40;
            border-radius:0.41rem;
            margin-top:0.2rem;
            color:#fff;
            font-weight: 500;
        }
    /* 以上福利奉上 */
        .welfare{
            width:9.4rem;
            background-color: #fff;
            border-radius: 0.16rem;
            margin: 0.3rem auto 0;
            box-sizing: border-box;
            padding:0.2rem;
        }
        .middle{
            margin-top:-7rem
        }
        .welfare_title{
            font-size:0.43rem ;
            color: #333;
            font-weight: 700;
            margin-bottom: 0.3rem;
        }
        .welfare_content{
            width:8.4rem;
            margin:0 auto;
            display: flex;
            justify-content: space-around;
        }
        .welfare_content_item{
            width:2.4rem;
            font-size: 0.32rem;
            background: #FFE4DC;
            border:1px solid #ff6e40;
        }
        .shop_title{
            width:90%;
            margin:  0.3rem auto;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            color:#333;
            text-align: center;
            font-weight: 500;
        }
        .redbag{
            width:100%;
            text-align: center;
            font-weight: 500;
            color:#ff6e40;
        }
        .lingqu{
            width:1.33rem;
            height:0.66rem;
            color: #fff;
            margin:0.3rem auto;
            border-radius: 0.33rem;
            line-height: 0.66rem;
            text-align: center;
            font-size: 0.35rem;
            font-weight: 700;
            background: #ff6e40;
        }
    /* 广告位 */
        .advertise,.advertise>img{
            width:9.4rem;
            height:2.15rem;
        }
        .advertise{
            margin:0.35rem auto;
        }
    /* 分割线 */
        .devider{
            text-align: center;
            font-size:0.37rem ;
            position:relative;
        }
</style>