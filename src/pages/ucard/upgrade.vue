<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <font>5</font>
        </div>
        <div class="bg">
            <!-- 升级攻略 -->
            <div class="categary">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/up_way.png">
            </div>
            <!-- 限时分享成功 -->
            <div class="share">
                <div class="share_content">
                    <div class="share_left">
                        <div class="add">+</div>
                        <div class="add">+</div>
                        <div class="add">+</div>
                        <div class="add">+</div>
                        <div class="add">+</div>
                    </div>
                    <div class="share_right">分享邀请好友</div>
                </div>
                <div class="share_num">已成功分享<font>0</font>/5</div>
            </div>
            <!-- 好友开通 -->
            <div class="friend">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/money_cash.png">
            </div>
            <!-- 赚钱小贴士 -->
            <div class="tips">
                <img src="http://ykd.lsh199.com/attachment/images/global/mobile/money_tips.png">
            </div>
        </div>
        <!-- 底部go -->
        <img class="go" src="http://ykd.lsh199.com/attachment/images/global/mobile/gogogo.png">
    </div>
</template>

<style scoped>
    /* 头部 */
        .header{
            width: 100%;
            height: 6.7rem;
            background: url("http://ykd.lsh199.com/attachment/images/global/mobile/invite_suc.png") no-repeat;
            background-size: 10rem 6.7rem;
            position: relative;
        }
        .header>font{
            font-size: 0.6rem;
            color: #934313;
            font-weight: 700;
            position: absolute;
            top:3.6rem;
            left:4.6rem;
        }
    /* 升级攻略 */
        .bg{
            width:100%;
            background: #EAD9C2;
            margin-top: -1px;
            padding: 0.2rem 0;
        }
        .categary{
            width:9.4rem;
            height:4rem;
            margin:0 auto;
        }
        .categary>img{
            width:100%;
            height:100%;
        }
    /* 限时分享成功 */
        .share{
            width:9.4rem;
            height:3.2rem;
            margin:0.3rem auto 0;
            background: url("http://ykd.lsh199.com/attachment/images/global/mobile/time_limit.png") no-repeat;
            background-size: 9.4rem 3.2rem;
            position: relative;
        }
        .share_content{
            width:100%;
            display: flex;
            justify-content: space-between;
            padding:0.2rem;
            box-sizing: border-box;
            position:absolute;
            bottom:0.6rem;
            left: 0;
        }
        .share_left{
            display: flex;
            justify-content: flex-start;
        }
        .add{
            width:1rem;
            height:1rem;
            border-radius: 50%;
            line-height: 1rem;
            text-align: center;
            font-size: 0.3rem;
            color: #DAA26B;
            border: 1px dashed #999;
        }
        .share_right{
            width:2.6rem;
            height:0.9rem;
            line-height: 0.9rem;
            text-align: center;
            background: #DAA26B;
            color: #fff;
            font-size:0.35rem ;
            border-radius: 0.45rem;
        }
        .share_num{
            font-size:0.32rem ;
            color: #666;
            font-weight: 500;
            position:absolute;
            bottom:0.2rem;
            left: 0.4rem;
        }
    /* 好友开通 */
        .friend{
            width:9.4rem;
            height:6.45rem;
            margin: 0.3rem auto 0;
        }
        .friend>img{
            width:9.4rem;
            height:6.45rem;
        }
    /* 赚钱小贴士 */
        .tips{
            width:9.4rem;
            height:5.3rem;
            margin: 0.3rem auto 0;
        }
        .tips>img{
            width:9.4rem;
            height:5.3rem;
        }
        .go{
            width:100%;
            height: 1.3rem;
        }
</style>