<template>
    <div>
        <loading v-show="inited == 0 || inited == 1" :inited="inited"/>
        <div v-if="inited == 2">
            <div class="item">
                <div class="item_title">营业额统计</div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>总营业额</div>
                        <div class="bottom_left_num">{{data.zongfee?data.zongfee:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>今日营业额</div>
                        <div class="bottom_left_num">{{data.turnovertoday?data.turnovertoday:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>总收入</div>
                        <div class="bottom_left_num">{{data.allfee?data.allfee:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>今日收入</div>
                        <div class="bottom_left_num">{{data.todayshopfee?data.todayshopfee:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>昨日收入(元)</div>
                        <div class="bottom_left_num">{{data.todayshopfees?data.todayshopfees:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>近三月收入(元)</div>
                        <div class="bottom_left_num">{{data.threemonth?data.threemonth:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>昨日营业额(元)</div>
                        <div class="bottom_left_num">{{data.turnovertodays?data.turnovertodays:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>近三月营业额(元)</div>
                        <div class="bottom_left_num">{{data.threeturnover?data.threeturnover:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>总计在线买单收入(元)</div>
                        <div class="bottom_left_num">{{data.zaixiantotalincome?data.zaixiantotalincome:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>总计在线买单营业额(元)</div>
                        <div class="bottom_left_num">{{data.zaixiantotal?data.zaixiantotal:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>当月在线买单收入(元)</div>
                        <div class="bottom_left_num">{{data.zaixianonemonthincome?data.zaixianonemonthincome:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>当月在线买单营业额(元)</div>
                        <div class="bottom_left_num">{{data.zaixianonemonth?data.zaixianonemonth:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>今日在线买单收入(元)</div>
                        <div class="bottom_left_num">{{data.zaixiantodayincome?data.zaixiantodayincome:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>今日在线买单营业额(元)</div>
                        <div class="bottom_left_num">{{data.zaixianfee?data.zaixianfee:0}}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item_title">订单统计</div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>累计订单数(单)</div>
                        <div class="bottom_left_num">{{data.allcom?data.allcom:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>总计在线买单数(单)</div>
                        <div class="bottom_left_num">{{data.zaixiantotalorder?data.zaixiantotalorder:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>今日在线买单数(单)</div>
                        <div class="bottom_left_num">{{data.zaixianoneorder?data.zaixianoneorder:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>当月累计在线买单数(单)</div>
                        <div class="bottom_left_num">{{data.zaixianonemonthorder?data.zaixianonemonthorder:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>今日交易单数(单)</div>
                        <div class="bottom_left_num">{{data.jiaoyiorder?data.jiaoyiorder:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>今日特权单数(单)</div>
                        <div class="bottom_left_num">{{data.tequanorder?data.tequanorder:0}}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item_title">商品统计</div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>全部商品(种)</div>
                        <div class="bottom_left_num">{{data.zonggoodsnum?data.zonggoodsnum:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>在售商品(种)</div>
                        <div class="bottom_left_num">{{data.uppergoods?data.uppergoods:0}}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item_title">客户统计</div>
                <div class="center">
                    <div class="center_title">总客户数(人)</div>
                    <div class="center_num">{{data.customernum?data.customernum:0}}</div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>今日下单客户数(人)</div>
                        <div class="bottom_left_num">{{data.todaycustomernum?data.todaycustomernum:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>新增下单客户数(人)</div>
                        <div class="bottom_left_num">{{data.todaycustomernewnum?data.todaycustomernewnum:0}}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="item_title">核销统计</div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>总核销单数(单)</div>
                        <div class="bottom_left_num">{{data.hexiaototal?data.hexiaototal:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>当月核销单数(单)</div>
                        <div class="bottom_left_num">{{data.yhexiao?data.yhexiao:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>今日核销数量(单)</div>
                        <div class="bottom_left_num">{{data.hexiaotoday?data.hexiaotoday:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>待核销单数(单)</div>
                        <div class="bottom_left_num">{{data.hexiaonone?data.hexiaonone:0}}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="bottom_left">
                        <div>特权今日核销数量(单)</div>
                        <div class="bottom_left_num">{{data.teqaunhexiaotoday?data.teqaunhexiaotoday:0}}</div>
                    </div>
                    <div class="bottom_right">
                        <div>特权待核销单数(单)</div>
                        <div class="bottom_left_num">{{data.tequanhexiaonone?data.tequanhexiaonone:0}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ImagePreview } from 'vant';
    export default{
        name:'rundata',
        components:{
            [ImagePreview.name]:ImagePreview
        },
        data(){
            return{
                inited:0,
                data:{}
            }
        },
        created(){
            this.initData();
        },
        methods:{
            initData(){
                this.$util.http('admin','GET',{op:'shopdata'},res=>{
                    this.inited=1;
                    this.data=res.data;
                    this.inited=2;
                })
            }
        }
    }
</script>

<style scoped>
    .item{
        width:9.4rem;
        margin:0.3rem auto;
        font-size:0.37rem;
        color:#333;
        background: #fff;
        border-radius: 0.16rem;
    }
    .item_title{
        font-size: 0.5rem;
        padding: 0.45rem 0.3rem;
        font-weight: 700;
    }
    .center{
        padding:0.45rem 0.3rem ;
    }
    .center_num,.bottom_left_num{
        margin-top: 0.56rem;
        font-weight: 700;
    }
    .bottom{
        width:100%;
        display: flex;
        padding:0.45rem 0.3rem ;
        box-sizing: border-box;
        border-bottom: 1px solid #f4f4f4;
    }
    .bottom_left,.bottom_right{
        width:50%;
    }
</style>