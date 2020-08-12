<template>
    <div id="main">
        <van-cell v-for="(item,index) in datalist" :key="index">
            <div class="header"  @click="showPopup(item.remark,item.money,item.time)">
                <div class="avater">
                    <img :src="imgPre+'/money.png'">
                </div>
                <div class="header_name">
                    <div class="header_name_top">
                        {{item.remark}}
                    </div>
                    <div class="money">
                        {{item.money}}
                    </div>
                    <div class="header_name_bottom">
                        {{item.time}}
                    </div>
                </div>
            </div>
        </van-cell>
        <van-popup v-model="show" position="bottom">
            <div class="van_header">
                <div class="van_avater">
                    <img :src="imgPre+'/money.png'">
                </div>
                <div class="van_header_name_top">
                    {{remark}}
                </div>
                <div class="van_money">
                    {{money}}
                </div>
                <div class="van_header_name_bottom">
                    {{time}}
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Popup,Cell } from 'vant';
    export default{
        name:'reddetails',
        components: {
	    	[Popup.name] : Popup,
	    	[Cell.name] : Cell
	  	},
        created(){
            this.initData();
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                datalist:[],
                show:false,
                remark:'',
                money:'',
                time:'',
            }
        },
        methods:{
            showPopup(remark,money,time) {
                this.remark=remark;
                this.money=money;
                this.time=time;
                this.show = true;
            },
            // 请求后台数据
            initData(){
                this.$util.http('agent','GET',{op:'index'},res=>{
                    this.datalist=res.data.lists;
                    console.log(res);
                })
            }
        }
    }
</script>
<style scoped>
    #main{
        width:100%;
        margin-top:0.5rem;
    }
    #main *{
        box-sizing: border-box;
    }
    #main /deep/ .van-cell{
        background-color: #f4f4f4;
        width:9.5rem;
        margin:0 auto;
        padding:3px;
        position:relative;
    }
    #main /deep/ .van-icon{
        position:absolute;
        top:0.92rem;
        right:0.45rem;
    }
    /* 头部 */
        .header{
            width:100%;
            background:#fff;
            display: flex;
            padding:0.2rem ;
            border-radius: 0.16rem;
            position:relative;
        }
        .van_header{
            position:relative;
        }
        .avater,.van_avater{
            width:1.12rem;
            height:1.12rem;
            border:1px solid #fff;
            border-radius: 50%;
            overflow: hidden;
        }
        .avater>img,.van_avater>img{
            width:1.12rem;
            height:1.12rem;
        }
        .van_avater>img{
            position:absolute;
            top:50%;
            left:7%;
            margin-top:-0.56rem;
        }
        .header_name{
            width:80%;
            margin-left:0.35rem;
        }
        .header_name_top{
            width:70%;
            height:0.8rem;
            color:#000;
            font-size: 0.42rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .header_name_bottom{
            height:0.56rem;
            line-height: 0.56rem;
            font-size:0.28rem;
            color:#999;
            background:rgba(255,255,255,0.2);
        }
        .money{
            width:3rem;
            height:0.5rem;
            font-size: 0.48rem;
            text-align: right;
            position: absolute;
            top:0.6rem;
            right: 0.46rem;
            font-weight: 500;
        }
        .color{
            color:#FF6E40;
        }
    /* 弹框 */
        .van_header_name_top{
            width:5rem;
            margin-left:2.2rem;
            color:#000;
            font-size: 0.44rem;
            white-space:normal;
            word-break:break-all;
            word-wrap:break-word; 
        }
        .van_money{
            width:3rem;
            height:0.5rem;
            font-size: 0.48rem;
            text-align: right;
            position: absolute;
            top:50%;
            right: 0.36rem;
            margin-top:-0.25rem;
            font-weight: 500;
        }
        .van_header_name_bottom{
            width:3rem;
            height:0.56rem;
            line-height: 0.56rem;
            font-size:0.28rem;
            color:#999;
            background:rgba(255,255,255,0.2);
            margin:0 0 0.2rem 2.2rem ;
        }
</style>