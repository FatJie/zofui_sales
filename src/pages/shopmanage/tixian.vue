<template>
    <div>
        <!-- 提现金额 -->
        <div class="tixian">
            <div class="money">提现金额</div>
            <div class="money_num">16393.46</div>
            <div class="line"></div>
            <div class="ke">
                <div class="ke_left">可提现(元)：16393.46</div>
                <div class="ke_all" @click="toSuretixian">全部提现</div>
            </div>
        </div>
        <!-- 银行卡 -->
        <div class="card" @click="show=true">
            <img src="../../assets/mine/seckill.jpg">
            <div class="card_middle">
                <div class="card_title">中国农业银行</div>
                <div class="card_card_num">储蓄卡（7766）</div>
            </div>
        </div>
        <!-- 弹框 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '70%' }" closeable close-icon-position="top-left">
            <van-radio-group v-model="radio">
                <div class="popup_choose">选择提现方式</div>
                <div class="if_add">优先使用微信提现方式，如需使用其他提现方式请在下方添加</div>
                <van-cell-group>
                    <div class="item">
                        <img src="../../assets/mine/seckill.jpg">
                        <div class="item_left">
                            <van-cell title="微信" clickable @click="radio = '1'">
                                <van-radio slot="right-icon" name="1" checked-color="#ff6e40"/>
                            </van-cell>
                        </div>
                    </div>
                    <div class="item">
                        <img src="../../assets/mine/seckill.jpg">
                        <div class="item_left">
                            <van-cell title="中国农业银行储蓄卡(5556)" clickable @click="radio = '2'">
                                <van-radio slot="right-icon" name="2" checked-color="#ff6e40"/>
                            </van-cell>
                        </div>
                    </div>
                    <div class="item_add item">
                        <img src="../../assets/mine/seckill.jpg">
                        <div class="item_left">
                            <van-cell title="添加银行卡">
                            </van-cell>
                        </div>
                    </div>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
    </div>
</template>

<script>
    import { Popup,RadioGroup, Radio,CellGroup,Cell,Dialog } from 'vant';
    export default{
        components:{
            [Popup.name]:Popup,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
            [CellGroup.name]:CellGroup,
            [Cell.name]:Cell,
            [Dialog.name]:Dialog,
        },
        data() {
            return {
                show: false,
                radio: '1'
            }
        },
        methods: {
            toSuretixian(){
                this.$router.push('/suretixian')
            }
        }
    }
</script>

<style scoped>
    /* 提现金额 */
        .tixian{
            width:9.4rem;
            background: #fff;
            margin: 0.3rem auto;
            padding:0.4rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
        }
        .money{
            font-size: 0.38rem;
            font-weight: 500;
            color: #333;
        }
        .money_num{
            font-weight: 700;
            font-size: 0.68rem;
            color: #333;
            margin: 0.5rem 0;
        }
        .line{
            width:100%;
            border: 0.5px solid #f6f6f6;
            margin-bottom: 0.3rem;
        }
        .ke{
            width:100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ke_left{
            color:#999;
            font-weight: 500;
            font-size: 0.32rem;
        }
        .ke_all{
            width:2.46rem;
            height:0.925rem;
            font-size:0.3rem ;
            border-radius: 0.46rem;
            line-height: 0.925rem;
            text-align: center;
            color: #fff;
            background: #ff6e40;
        }
    /* 银行卡 */
        .card{
            width:9.4rem;
            /* background: #fff; */
            margin: 0.3rem auto;
            padding:0.4rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
            display: flex;
            justify-content: start;
            align-items: center;
            background:#fff url(../../assets/mine/arrow_right.png) no-repeat 8.5rem center;
            background-size:0.1rem 0.2rem ;
        }
        .card>img{
            width:1.5rem;
            height:1.5rem;
            margin-right: 0.36rem;
        }
        .card_middle{
            width:7rem;
            height:1.5rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .card_title{
            width:100%;
            font-size: 0.425rem;
            font-weight: 700;
            color: #333;
        }
        .card_card_num{
            width:100%;
            font-size:0.32rem ;
            font-weight: 500;
            color: #333;
        }
    /* 弹框 */
        .popup_choose{
            width:100%;
            color: #333;
            font-weight: 500;
            height:1.36rem;
            line-height: 1.36rem;
            font-size: 0.48rem;
            text-align: center;
        }
        .if_add{
            width:100%;
            color:#666;
            font-weight: 500;
            font-size: 0.4rem;
            padding:0.4rem;
            box-sizing: border-box;
            background:rgba(171,171,171,.1);
        }
        .item{
            width:100%;
            display: flex;
            align-items: center;
            justify-content: start;
            padding:0.3rem;
            box-sizing: border-box;
            border-bottom: 1px solid #f4f4f4;
        }
        .item>img{
            width:0.625rem;
            height:0.625rem;
        }
        .item /deep/ .van-cell{
            width:9rem;
        }
        .item_add /deep/ .van-cell{
            background: url(../../assets/mine/arrow_right.png) no-repeat 8.5rem center;
            background-size:0.1rem 0.2rem ;
        }
</style>