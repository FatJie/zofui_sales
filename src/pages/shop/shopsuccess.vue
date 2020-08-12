<template>
    <div id="main">
        <div class="content">
            <div class="img"><img src="http://ykd.lsh199.com/attachment/images/global/mobile/Submitted@2x.png"></div>
            <div class="submit">提交成功</div>
            <div class="wait">客服将在1-2工作日审核<br>请耐心等待</div>
            <router-link to="/">
                <div class="back">返回首页</div>
            </router-link>
        </div>
    </div>
</template>
<style scoped>
    .content{
        width:5.5rem;
        height:6rem;
        background-color: #fff;
        border-radius: 0.16rem;
        margin:3.7rem auto 0;
        font-size: 0.5rem;
        border:1px solid #fff;
        text-align: center;
    }
    .img,.img>img{
        width:3.15rem;
        height:2.72rem;
    }
    .img{
        margin:-0.35rem auto 0; 
    }
    .submit{
        color:#333;
        font-size: 0.43rem;
        font-weight: 700;
        margin-top:0.1rem;
    }
    .wait{
        color:#999;
        font-size: 0.32rem;
        margin:0.2rem;
    }
    .back{
        width:3.2rem;
        height:1.2rem;
        font-size: 0.43rem;
        line-height: 1.2rem;;
        border-radius: 0.6rem;
        color:#fff;
        background-color: #ff6e40;
        margin:0 auto;
    }
</style>