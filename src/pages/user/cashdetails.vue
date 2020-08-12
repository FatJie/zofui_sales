<template>
    <div id="main">
        <div class="de"></div>
        <van-list v-model="loading" :immediate-check="false" :finished="finished" loading-text="加载中" finished-text="到底了" :offset="100" @load="onLoad">
            <van-cell v-for="(item,index) in datalist" :key="index">
                <div class="header" @click="showPopup(item.remark,item.money,item.time)" >
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
        </van-list>
        <van-popup v-model="show" position="bottom">
            <div class="van_header">
                <div class="van_avater">
                    <img :src="imgPre+'/money.png'">
                </div>
                <div>
                    <div class="van_header_name_top">
                        {{remark}}
                    </div>
                    <div class="van_header_name_bottom">
                        {{time}}
                    </div>
                </div>
                <div class="van_money">
                    {{money}}
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import { Popup,Cell,List } from 'vant';
    export default{
        name:'cashdetails',
        components: {
	    	[Popup.name] : Popup,
	    	[Cell.name] : Cell,
	    	[List.name] : List,
	  	},
        created(){
            if(this.$route.query.isshop==1){
                this.initData();
            }else{
                this.shop=this.$route.query.shop;
                this.shopGet();
            };
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                datalist:{},
                show:false,
                item:[],
                remark:'',
                money:'',
                time:'',
                isadmin:'',
                shop:'',
                finished: false,
                loading: false,
                pages:1,
            }
        },
        methods:{
            onLoad() {
                var self = this;
                self.pages++;
                var post={
                    op:this.$route.query.isshop ? 'mymoney' : 'shopyingshoumoney',
                    page:self.pages,
                    shop:this.shop,
                };
                var dodata = this.$route.query.isshop ? 'user' : 'admin';
	            self.$util.http(dodata,'GET',post,function(res){
                    if(res.data.list.length!=0){
                        self.datalist = self.datalist.concat(res.data.list);
                        self.loading=false;
                    }else{
                        self.finished=true;
                    }
	            },true);
	  		},

            showPopup(remark,money,time) {
                this.remark=remark;
                this.money=money;
                this.time=time;
                this.show = true;
            },
            // 商户户请求后台数据
            shopGet(){
                var postData={
                    op:'shopyingshoumoney',
                    shop:this.shop
                }
                this.$util.http('admin','GET',postData,res=>{
                    this.datalist=res.data.list;
                })
            },
            // 用户请求后台数据
            initData(){
                var postData={
                    op:'mymoney',
                    // shop:this.shop
                }
                this.$util.http('user','GET',postData,res=>{
                    this.datalist=res.data.list;
                })
            }
        }
    }
</script>
<style scoped>
    .de{
        margin-top:0.5rem;
    }
    #main{
        width:100%;
    }
    #main *{
        box-sizing: border-box;
    }
    #main /deep/ .van-cell{
        background-color: #f4f4f4;
        width:9.5rem;
        margin:0 auto ;
        position:relative;
        padding:0 0.3rem;
    }
    #main /deep/ .van-icon{
        position:absolute;
        top:36%;
        right:0.45rem;
    }
    /* 头部 */
        .header{
            width:100%;
            background:#fff;
            display: flex;
            padding:0.38rem 0.3rem;
            border-radius: 0.16rem;
            position:relative;
        }
        .van_header{
            display: flex;
            align-items: center;
            padding:0.5rem 0;
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
        .van_avater{
            
            margin-left:0.6rem; 
        }
        .header_name{
            width:80%;
            margin-left:0.35rem;
        }
        .header_name_top{
            width:70%;
            color:#000;
            font-size: 0.38rem;
            text-align: left;
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
            width:5.5rem;
            margin-left:0.6rem;
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
            margin:0.2rem 0 0 0.6rem;
        }
</style>