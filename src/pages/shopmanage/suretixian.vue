<template>
    <div>
        <div class="tixian">
            <div class="money">提现金额</div>
            <van-cell-group>
                <van-field v-model="input" placeholder="请输入提现金额" type="number"/>
            </van-cell-group>
            <div class="ke">
                <div class="ke_left">可提现(元)：{{money}},手续费：{{percent}}% </div>
                <div class="ke_all" @click="toSure">全部提现</div>
            </div>
            <div class="toTixian"><font>24小时内到账</font><font @click="confirm">提现</font></div>
        </div>
        <!-- 银行卡 -->
        <div class="card" @click="show = true" v-if="type=='shop'">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/weixin.png" v-if="radio==1">
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/bank_card.png" v-if="radio==2">
            <div class="wx_middle">
                {{radio==1 ? '提现到微信' : bank_name }}
            </div>
        </div>
        <div class="card" v-else>
            <img src="http://ykd.lsh199.com/attachment/images/global/mobile/weixin.png">
            <div class="wx_middle">
                提现到微信
            </div>
        </div>
        <!-- 弹框 -->
        <van-popup v-model="show" position="bottom" :style="{ height: '70%' }" closeable close-icon-position="top-left">
            <van-radio-group v-model="radio" @change="change">
                <div class="popup_choose">选择提现方式</div>
                <div class="if_add">优先使用微信提现方式，如需使用其他提现方式请在下方添加</div>
                <van-cell-group>
                    <div class="item">
                        <img src="http://ykd.lsh199.com/attachment/images/global/mobile/weixin.png">
                        <div class="item_left">
                            <van-cell title="微信" clickable @click="radio = '1'">
                                <van-radio slot="right-icon" name="1" checked-color="#ff6e40"/>
                            </van-cell>
                        </div>
                    </div>
                    <div class="item" v-if="binded==1">
                        <img src="http://ykd.lsh199.com/attachment/images/global/mobile/bank_card.png">
                        <div class="item_left">
                            <van-cell :title="bank_name" clickable @click="radio = '2'">
                                <van-radio slot="right-icon" name="2" checked-color="#ff6e40"/>
                            </van-cell>
                        </div>
                    </div>
                    <div class="item_add item" @click="addCard" v-if="binded==0">
                        <img src="http://ykd.lsh199.com/attachment/images/global/mobile/bank_card.png">
                        <div class="item_left">
                            <van-cell title="添加银行卡">
                            </van-cell>
                        </div>
                    </div>
                    <div class="item_add item" @click="delCard" v-if="binded==1">
                        <img src="http://ykd.lsh199.com/attachment/images/global/mobile/bank_card.png">
                        <div class="item_left">
                            <van-cell title="解绑银行卡">
                            </van-cell>
                        </div>
                    </div>
                </van-cell-group>
            </van-radio-group>
        </van-popup>
    </div>
</template>

<script>
    import { Field,Cell,CellGroup,Dialog,Popup,RadioGroup, Radio,SwipeCell } from 'vant';
    export default {
        name:'suretixian',
        components: {
            [Popup.name]:Popup,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
            [Field.name]: Field,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Dialog.name]: Dialog,
        },
        created(){
            this.money=this.$route.query.money;
            this.type=this.$route.query.type;
            this.initData();
        },
        data() {
            return {
                percent:'',
                input:'',
                show: false,
                radio: '1',
                money:0,
                type:'',
                bank_name:'',
                binded:'',
                bank_num:''
            }
        },
        methods: {
            delCard(){
                var postdata={
                    op:'delcard',
                }
                this.$util.http('admin','GET',postdata,res=>{
                    if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onClose:()=>{
                                this.show=false;
                                this.initData();
                            }
                        })
                    }else{
                        this.$toast(res.message)
                    }
                });
            },
            addCard(){
                this.$router.push('/addcard');
            },
            initData(){
                this.$util.http('user','GET',{op:'tixian'},res=>{
                    console.log(res);
                    if(this.type=='user'){
                        this.percent=res.data.drawserver;
                    }else if(this.type=='shop'){
                        console.log(123456677888999000)
                        this.percent=res.data.sdrawserver;
                        this.binded=res.data.status;
                        this.bank_name=res.data.bank_name ? res.data.bank_name : '';
                        this.bank_num=res.data.card_num ? res.data.card_num : '';
                    }
                });
            },
            confirm(e){
                var self = this;
                if( self.input*1 <= 0 || !self.input ) {
                    self.$toast('请填写提现金额');
                    return false;
                }
                if(self.type=='user'){
                    var postdata = {
                        op:'draw',
                        money : self.input,
                    };
                    self.$util.http('fenxiao','GET',postdata,function(res){
                        if (!res.errno) {
                            self.$toast({
                                message : res.message,
                                onOpened : function(){
                                    self.$router.go(-1);
                                }
                            });
                        }else{
                            self.$toast(res.message);
                            if( res.errno == 2 ){
                                self.$router.push(res.data.url);
                            }              
                        }
                    },true);
                }else{
                    var postdata = {
                        op:'draw',
                        money : self.input,
                        radio:self.radio
                    };
                    self.$util.http('admin','GET',postdata,function(res){
                        if (!res.errno) {
                            self.$toast({
                                message : res.message,
                                onOpened : function(){
                                    self.$router.go(-1);
                                }
                            });
                        }else{
                            self.$toast(res.message);
                            if( res.errno == 2 ){
                                self.$router.push(res.data.url);
                            }              
                        }
                    },true);
                }
            },
            toSure(){
                this.input=this.money;
            },
            change(){
                this.show=false;
            }
        }
    }
</script>

<style scoped>
    /* 提现金额 */
        .tixian {
            width: 9.4rem;
            background: #fff;
            margin: 0.3rem auto;
            padding: 0.4rem;
            box-sizing: border-box;
            border-radius: 0.16rem;
        }

        .money {
            font-size: 0.38rem;
            font-weight: 500;
            color: #333;
        }

        .ke {
            width: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
        }

        .ke_left {
            color: #999;
            font-weight: 500;
            font-size: 0.32rem;
        }
        .tixian /deep/ .van-cell{
            padding-left:0 !important;
            padding-right:0 !important;
            font-size: 0.5rem;
            margin:0.2rem 0;
        }
        .ke_all {
            margin-left: 0.1rem;
            font-size: 0.3rem;
            color: #ff6e40;
            font-weight: 500;
        }
        .toTixian{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.2rem;
        }
        .toTixian>font:first-child{
            font-size:0.28rem ;
            color: #aaa;
        }
        .toTixian>font:last-child{
            width:1.8rem;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            font-size: 0.4rem;
            font-weight: 700;
            color: #fff;
            background: #ff6e40;
            border-radius: 0.4rem;
        }
    /* 银行卡 */
        .card{
                width:9.4rem;
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
            .wx_middle{
                font-size: 0.425rem;
                font-weight: 700;
                color: #333;
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