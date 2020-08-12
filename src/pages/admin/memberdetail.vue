<template>
    <div>
        <!-- 头部 -->
        <div class="header">
            <div class="header_top">
                <img :src="list.headimg">
                <div class="header_right">
                    <div class="header_name">{{list.nickname}}</div>
                    <div class="header_phone">手机号：{{list.tel}}</div>
                    <div class="header_comsume">最近消费：{{list.time}}</div>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom_left">
                    <font>{{list.zongnum}}</font>
                    <font>消费次数</font>
                </div>
                <div class="bottom_center">
                    <font>{{list.zongprice}}</font>
                    <font>消费金额(元)</font>
                </div>
                <div class="bottom_right">
                    <font>{{list.comment}}</font>
                    <font>评价次数</font>
                </div>
            </div>
        </div>
        <!-- 商品评价 -->
        <div class="good_comment">
            <div class="suit_title">
                <div class="suit_title_left" style="font-size:0.32rem;">商品评价</div>
            </div>
            <div class="good_comment_item" v-for="item in list.commentlist">
                <div class="good_comment_item_top">
                    <div class="avater">
                        <img :src="list.headimg">
                    </div>
                    <div class="user">
                        <div class="user_top">
                            <font>{{list.nickname}}</font>
                        </div>
                        <div class="user_bottom">
                            <van-rate v-model="item.star" allow-half void-icon="star" void-color="#eee" color="#ff6e40" size="8px" gutter="2px" readonly/> 
                        </div>
                    </div>
                    <div class="datatime">{{item.createtime}}</div>
                </div>
                <div class="good_comment_content">
                    {{item.content}}
                </div>
                <div class="comment_img">
                    <div v-for="(item_img,index) in item.img" :key="index">
                        <img :src="item_img" @click="preview(index)">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {Rate,ImagePreview} from 'vant';
    export default{
        components:{
            [Rate.name]:Rate,
            [ImagePreview.name]:ImagePreview,
        },
        activated(){
            this.uid=this.$route.query.uid;
            this.initData();
        },
        data(){
            return{
                star:4.5,
                uid:'',
                list:{}
            }
        },
        methods:{
            preview(index){
                ImagePreview({
                    images:this.list.commentlist.img,
                    startPosition: index,
                    // onClose() {
                        
                    // }
                })
            },
            initData(){
                
                this.$util.http('admin','GET',{op:'shopmemberinfo',uid:this.uid},res=>{
                    for(let item of res.data.list.commentlist){
                        item.star=Number(item.star)
                    }
                    this.list=res.data.list;
                })
            },
        }
    }
</script>

<style scoped>
    /* 头部 */
        .header{
            width:9.4rem;
            margin:0.3rem auto;
            font-size:0.37rem;
            background: #fff;
            border-radius: 0.16rem;
            box-sizing: border-box;
            padding: 0.8rem 0.7rem 0.3rem;
        }
        .header_top{
            width:100%;
            display: flex;
            margin-bottom: 1rem;
        }
        .header_top>img{
            width:2.15rem;
            height: 2.15rem;
            border-radius: 50%;
            margin-right: 0.3rem;
        }
        .header_right{
            font-size: 0.37rem;
            font-weight: 500;
            color: #333;
        }
        .header_name{
            font-size: 0.5rem;
            font-weight: 700;
            color: #333;
        }
        .header_phone{
            margin: 0.3rem 0;
        }
        .bottom{
            width:100%;
            display: flex;
        }
        .bottom>div{
            width: 33%;
            text-align: center;
        }
        .bottom font{
            display: inline-block;
            width:100%;
        }
        .bottom font:first-child{
            font-size: 0.5rem;
            font-weight: 700;
            color: #333;
            margin-bottom: 0.2rem;
        }
        .bottom font:last-child{
            font-size: 0.36rem;
            font-weight: 500;
            color: #999;
        }
        .bottom_center{
            border-left: 1px solid #f4f4f4;
            border-right: 1px solid #f4f4f4;
        }
    /* 商品评价 */
        .good_comment{
            width:9.4rem;
            margin:0.3rem auto 0;
            border-radius: 0.16rem;
            box-sizing: border-box;
            padding:0.3rem;
            background-color:#fff;
        }
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
        .comment_img img{
            width:2.25rem;
            height:2.25rem;
            border-radius: 0.16rem;
        }
</style>