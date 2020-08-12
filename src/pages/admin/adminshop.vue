<template>
    <div class="tabs">
        <van-tabs v-model="activeName" color="#FF6E40" title-active-color="#FF6E40" title-inactive-color="#333" swipeable>
            <van-tab title="门店管理" name="a">
                <!-- 顶部图片 -->
                <div class="van_image">
                    <img src="http://ykd.lsh199.com/attachment/images/global/mobile/click_look.png">
                </div>
                <!-- 门店相册 -->
                <div class="photo">
                    <div class="title">门店相册</div>
                    <div class="desc">优质图片吸引用户访问，增加门店曝光</div>
                    <div class="normal">普通门店相册</div>
                    <div class="upload">
                        <van-uploader :max-count="3" v-model="fileList1" multiple>
                        </van-uploader>
                    </div>
                </div>
                <!-- 门店信息 -->
                <div class="shop_info">
                    <div class="shop_info_title">门店信息</div>
                    <div class="shop_info_give">给出详细门店信息，用户更精准找店~</div>
                    <div class="basic">门店基础信息展示</div>
                    <div class="infomation">
                        门店分类：川湘菜<br>
                        门店电话：13811111111<br>
                        营业状态：营业中<br>
                        营业时间：周一至周日 08：00-22：00<br>
                        人均消费：95
                    </div>
                    <div class="edit line_bottom">编辑</div>
                    <div class="top">门店服务信息展示</div>
                    <div class="add">
                        附加功能：在线买<br>
                        服务信息：有WiFi、有小吃、有停车位
                    </div>
                    <div class="edit">编辑</div>
                </div>
                <!-- 门店简介 -->
                <div class="photo">
                    <div class="title">门店简介</div>
                    <div class="desc">优质图片吸引用户访问，增加门店曝光</div>
                    <div class="normal">商家详情展示</div>
                    <div class="upload">
                        <van-uploader :max-count="9" v-model="fileList2" multiple>
                        </van-uploader>
                    </div>
                </div>
                <!-- 底部分类 -->
                <div class="categary">
                    <div class="supplies">门店物料</div>
                    <div class="arrows">></div>
                </div>
                <div class="categary">
                    <div class="supplies">门店二维码</div>
                    <div class="arrows"><font class="color">免费快速推广门店</font> ></div>
                </div>
                <div class="categary">
                    <div class="supplies">门店收款</div>
                    <div class="arrows"><font class="color">门店自助买单 </font>></div>
                </div>
                <router-link to="shopverify">
                    <div class="categary">
                        <div class="supplies">资质信息</div>
                        <div class="arrows">></div>
                    </div>
                </router-link>
            </van-tab>
            <van-tab title="评价管理" name="b">内容 2</van-tab>
            <van-tab title="营销管理" name="c">内容 3</van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import { Tab, Tabs ,Image,Uploader  } from 'vant';
    export default{
        components:{
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Image.name]:Image,
            [Uploader .name]:Uploader,
        },
        data(){
            return{
                activeName: 'a',
                fileList1: [],
                fileList2: []
            }
        }
    }
</script>
<style scoped>
    /* 头部 */
        .tabs{
            width:100%;
        }
        .van_image{
            margin:0.3rem auto 0;
            width:9.5rem;
            height:2.5rem;
        }
        .van_image>img{
            border-radius: 0.16rem;
            width:9.5rem;
            height:2.5rem;
        }
    /* 门店相册 */
        .photo{
            width:9.5rem;
            margin:0.3rem auto 0;
            border-radius: 0.16rem;
            background:#fff;
        }
        .title{
            color:#333;
            font-size: 0.48rem;
            padding-left:0.3rem ;
            padding-top: 0.46rem;
            font-weight: 600;
        }
        .desc{
            font-size:0.38rem;
            color:#333;
            padding: 0.36rem 0 0.36rem 0.3rem;
            border-bottom:1px solid #f4f4f4;
        }
        .normal{
            font-size:0.3rem;
            color:#999;
            padding: 0.36rem 0 0.36rem 0.3rem;
        }
        .upload{
            width:100%;
            box-sizing: border-box;
            padding-left:1.2rem;
            display: flex;
            justify-content: start;
        }
        .van-image van-uploader__preview-image{
            width:33%;
        }
    /* 门店信息 */
        .shop_info{
            width:9.5rem;
            margin:0.3rem auto 0;
            border-radius: 0.16rem;
            background:#fff;
            font-size: 0.5rem;
            padding-bottom:0.2rem;
        }
        .shop_info_title{
            padding:0.46rem 0 0 0.3rem;
            color:#333;
            font-size: 0.48rem;
            font-weight: 700;
        }
        .shop_info_give{
            padding:0.36rem 0 0.36rem 0.3rem;
            color:#333;
            font-size: 0.38rem;
            border-bottom: 1px solid #f4f4f4;
        }
        .basic,.top{
            padding:0.36rem 0 0.2rem 0.44rem;
            color:#999;
            font-size: 0.32rem;
        }
        .infomation,.add{
            padding:0 0 0.4rem 0.44rem;
            color:#333;
            font-size: 0.38rem;
        }
        .edit{
            width:8.4rem;
            height:0.9rem;
            border-radius: 0.45rem;
            border: 1px solid #ff6e40;
            line-height: 0.9rem;
            text-align: center;
            color: #ff6e40;
            font-size: 0.4rem;
            margin: 0 auto 0.42rem;
        }
        .top{
            border-top: 1px solid #f4f4f4;
        }
        .categary{
            margin:0.3rem auto 0;
            width:9.5rem;
            height:1.32rem;
            border-radius: 0.16rem;
            line-height: 1.32rem;
            background-color: #fff;
            color:#333;
            font-size: 0.4rem;
            display: flex;
            justify-content: space-between;
            font-weight: 600;
        }
        .supplies{
            margin-left: 0.3rem;
        }
        .arrows{
            margin-right: 0.3rem;
        }
        .color{
            font-size:0.32rem ;
            color:#ff6e40;
        }
</style>