<template>
    <div id="main">
        <!-- 头部背景 -->
        <div class="header"></div>
        <!-- 基本参数信息 -->
        <div class="shopinfo">
            <div class="top_title">
                <div class="title_left">请填写商品信息</div>
                <!-- <div class="title_right">联系客服 ></div> -->
            </div>
            <div class="following">基本信息参数</div>
            <van-field v-model="good.title" placeholder="必填，请输入商品名称及产品描述" label="商品名称" rows="2" type="textarea" autosize maxlength="80" show-word-limit/>
            <!-- <van-field v-model="good.good_desc"  placeholder="必填，请输入商品描述(副标题)"  label="商品描述" /> -->

            <!-- 商品分类 -->
            <van-field clickable :value="good.sortname"  label="商品分类" readonly placeholder="必选，选择商品分类" @click="popupsort = true" >
            </van-field>
            <van-popup v-model="popupsort" position="bottom" >
                <van-picker :columns="allsort"  value-key="name" confirm-button-text="确定" show-toolbar @cancel="popupsort = false" @confirm="onChangesort" />
            </van-popup>
            <!-- <van-field readonly placeholder="请请选择商品分类" clickable label="商品分类" :value="good.sortname" @click="showBenefit = true"/>
            <van-popup v-model="showBenefit" position="bottom">
                <van-picker show-toolbar :columns="columns_benefit" @cancel="showBenefit = false" @confirm="onBenefit"/>
            </van-popup> -->

            <!-- <van-field v-model="good.number" placeholder="选填，越大越排前" text="number" label="排列序号" /> -->
            <van-field v-model="good.oldprice"   placeholder="必填，请输入商品原价(元)" type="number"  label="商品原价"/>
            <van-field v-model="good.price"  placeholder="必填，请输入会员价(元)" type="number" label="会员价"/>
            <van-field v-model="good.userprice"   placeholder="必填，请输入结算价格(元)" type="number" label="结算价格"/>
            <van-field v-model="good.stock"   placeholder="必填，请输入商品库存" type="number" label="商品库存"/>
        </div>
        <!-- 其他信息参数 -->
        <div class="other_info">
            <div class="top_title">
                <div class="title_left">请填写商品信息</div>
                <!-- <div class="title_right">联系客服 ></div> -->
            </div>
            <div class="following">其他信息参数</div>
            <!-- 截止时间 -->
            <van-field readonly placeholder="请选择截止时间" clickable label="消费截止时间" :value="good.endData" @click="showData = true"/>
            <van-popup v-model="showData" position="bottom">
                <van-datetime-picker @confirm="confirmData" @cancel="showData = false" v-model="nowData" type="date" :min-date="minDate" :max-date="maxDate"/>
            </van-popup>

            <van-field v-model="good.permax" type="number" placeholder="每次下单限购的数量"  label="限购数量" />
            <van-field v-model="good.buytimes" type="number" placeholder="每人最多下单次数"  label="限购次数" />
            <!-- <van-field v-model="good.buy_times_day" type="number" placeholder="每日下单限购的数量"  label="单日限购"/> -->

            <!-- 消费方式 -->
            <van-field readonly placeholder="请请选择消费方式" clickable label="消费方式" :value="good.way" @click="showWay = true"/>
            <van-popup v-model="showWay" position="bottom">
                <van-picker show-toolbar :columns="ways" @confirm="confirmWay" @cancel="showWay = false"/>
            </van-popup>
        </div>
        <!-- 上传商品图片 -->
        <div class="photo">
            <!-- 缩略图 -->
            <div class="top_title">
                <div class="title_left">请上传商品图片</div>
                <div class="title_right">联系客服 ></div>
            </div>
            <div class="following">请按照要求上传图片，方便我们审核</div>
            <div class="door_photo">
                <div class="door_title">
                    <div class="door_title_left">缩略图（1张）</div>
                    <div class="door_title_right" @click="showDoor=true">查看示例</div>
                </div>
                <div class="door_following">必须为商品正面照，通过发布主图，展示在对应品类列表页，可以吸引买家的注意和点击</div>
                <van-uploader v-model="thumb" :after-read="upOne"  :max-count="1"/>
            </div>
            <!-- 缩略图示例 -->
            <van-popup v-model="showDoor" position="bottom">
                <div class="ex_img">
                    <img :src="imgPre+'/door.png'">
                </div>
                <div class="demand1">
                    1.请完整、清晰拍摄店铺外的全景，包含店名招牌与进店入口；<br>
                    2.拍摄的门店名称和您填写的门店名称需要一致。
                </div>
                <div class="demand2">
                    门头照：需露出实体店的完整店名，且与本次开店填写的门店名称一致，不超过3M。
                </div>
                <div class="toup_door" @click="showDoor=false">
                    知道了，去上传
                </div>
            </van-popup>
            <!-- 长图 -->
            <div class="door_photo">
                <div class="door_title">
                    <div class="door_title_left">商品图</div>
                    <div class="door_title_right" @click="showIn=true">查看示例</div>
                </div>
                <div class="door_following">需拍摄真实商品图片（如商品内容、商品搭配、商品用途等）</div>
                <van-uploader v-model="thumbh" :after-read="upTwo" :max-count="1"/>
            </div>
            <!-- 长图示例 -->
            <van-popup v-model="showIn" position="bottom">
                <div class="ex_img">
                    <img :src="imgPre+'/in.png'">
                </div>
                <div class="demand1">
                    内景照：请拍摄至少两张内景图，需拍摄到门店经营的完整环境，并
                    且需要体现经营的内容，例如：餐厅的用餐环境、超市的货架等。
                </div>
                <div class="demand2">
                    内景照：需露出门店环境的全景，如：服务时的场景、超市货架全景、餐厅全景等。
                </div>
                <div class="toup_door" @click="showIn=false">
                    知道了，去上传
                </div>
            </van-popup>
            <!-- 商品图文详情 -->
            <!-- <div class="door_photo">
                <div class="door_title">
                    <div class="door_title_left">商品图文详情</div>
                    <div class="door_title_right" @click="showDetail=true">查看示例</div>
                </div>
                <div class="door_following">展示商品具体内容的页面（更好的显示商品情况，可以吸引更多的买家）</div>
                
                <van-uploader v-model="good.pic" :after-read="upDetail"  />
                <van-field v-model="good.shortv" type="shortv" placeholder="请填入视频链接地址"  label="设置视频" />
            </div> -->
            <!-- 商品图文详情示例 -->
            <!-- <van-popup v-model="showDetail" position="bottom">
                <div class="ex_img">
                    <img src="../../assets/mine/in.png">
                </div>
                <div class="demand1">
                    内景照：请拍摄至少两张内景图，需拍摄到门店经营的完整环境，并
                    且需要体现经营的内容，例如：餐厅的用餐环境、超市的货架等。
                </div>
                <div class="demand2">
                    内景照：需露出门店环境的全景，如：服务时的场景、超市货架全景、餐厅全景等。
                </div>
                <div class="toup_door" @click="showDetail=false">
                    知道了，去上传
                </div>
            </van-popup> -->
        </div>
        <!-- 商品信息填写 -->
        <!-- <div class="other_info" id="other_info">
            <div class="top_title">
                <div class="title_left">商品信息</div>
            </div>
            <div class="following">详细填写商品内信息</div>
            <div class="write" v-for="(good, index) of goodinfo">
                <van-field  label="名称" v-model="goodinfo[index].item_good_name" type="text" placeholder="请输入单独商品名称"/>
                <van-field label="商品数量" v-model="goodinfo[index].item_good_num" type="text" placeholder="请输入单独商品数量"/>
                <van-field label="单价" v-model="goodinfo[index].item_good_price" type="text" placeholder="请输入单价(元)"/>
            </div>
            <div class="add_redu">
                <div class="add_item" @click="addItem">增加信息</div>
                <div class="redu_item" @click="reduItem">删除信息</div>
            </div>
        </div> -->
        <!-- 购买须知 -->
        <!-- <div class="buy_know">
            <div class="top_title">
                <div class="title_left">购买须知</div>
            </div>
            <div class="following">请按照要求填写，方便用户购买</div>
            <van-field  label="预约信息" placeholder="请输入预约信息" v-model="good.order_info" type="text"/>
            <van-field  label="温馨提示" placeholder="请输入提示信息" v-model="good.tips" type="text"/>
        </div> -->
        <!-- 底部发布商品 -->
        <div class="bottom_submit">
            <!-- <ul> -->
                <!-- <li class="save">存入草稿</li> -->
                <!-- <li class="preview">预览商品</li> -->
                <li class="to_submit" @click="submit">发布商品</li>
            <!-- </ul> -->
        </div>
    </div>
</template>

<script type="text/javascript">
    import { Field,AddressEdit,Picker,Popup,Uploader,Area,DatetimePicker } from 'vant';
    export default {
        name:'pubgood',
        components:{
            [Field.name]:Field,
            [AddressEdit.name]:AddressEdit,
            [Picker.name]:Picker,
            [Popup.name]:Popup,
            [Uploader.name]:Uploader,
            [Area.name]:Area,
            [DatetimePicker.name]:DatetimePicker,
        },
        created(){
            this.id=this.$route.query.id;
            this.initData();
	  	},
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',

                id:false,
                allsort:[],
                popupsort:false,
                type:0,    //商品类型
                /*上传图片*/
                
                showDoor:false,

                twoPic:{title:'',pic:[]},
                showIn:false,
                showDetail:false,
            
                decs:'',
                video:'',

                good:{title:''},

                // goodinfo:[
                //     {
                //         item_good_name:'',  
                //         item_good_num:'',
                //         item_good_price:''
                //     }
                // ],

                order_info:'',
                tips:'',

                showData:false,    //其他信息参数
                nowData:new Date(),
                minDate: new Date(2020, 1, 1),
                maxDate: new Date(2025, 12, 31),
                buy_num:'',
                buy_times:'',
                buy_times_day:'',
                ways:['到店领取','配送到家'],
                way:'请选择消费方式',
                showWay:false,


                good_desc:'',      //基本信息参数
                good_name:'',
                array_num:'',
                ori_price:'',
                member_price:'',
                pay_price:'',
                store:'',
                showPicker: false,
                good_class:'请选择商品分类',      
                showBenefit: false,
                columns_benefit: [],
                thumbh:[],
                thumb:[],
            }
        },
        methods:{
            onChangesort(tar){
                this.good.sortid = tar.id;
                this.good.sortname = tar.name;
                this.popupsort = false;
            },
            /* 添加单条商品数据 */
            addItem(){
                this.goodinfo.push({
                    item_good_name:'',  
                    item_good_num:'',
                    item_good_price:''
                })
            },
            reduItem(){
                if(this.goodinfo.length==1){
                    return;
                }
                this.goodinfo.splice(-1,1)
            },
            /* 发布商品 */
            submit(){
                // this.good.goodinfo=this.goodinfo;
                if(this.good.userprice/this.good.price > 0.95 || !this.good.userprice){
                    this.$toast('结算价须小于会员价的95%');
                    return;
                }
                var self = this;
                if(!self.good.title){
                    self.$toast('请输入正确的商品名称！')
                    return
                }
                // if(!self.good.good_desc){
                //     self.$toast('请输入正确的商品描述！')
                //     return
                // }
                if(!self.good.sortname){
                    self.$toast('请输入正确的商品分类！')
                    return
                }
                if(!self.good.oldprice){
                    self.$toast('请输入正确的商品原价！')
                    return
                }
                if(!self.good.stock){
                    self.$toast('请输入正确的商品库存！')
                    return
                }
                if(!self.good.endData){
                    self.$toast('请输入正确的截止日期！')
                    return
                }
                var postdata = {
                    op : 'pubgoods',
                    form: JSON.stringify( {...self.good,isdefault:1} ),
                }
                self.$util.http('admin','POST',postdata,function(res){ 
                    if(res.errno==0){
                        self.$toast({
                            message : res.message,
                            onClose : function(){
                                self.$router.go(-1);
                            }
                        });
                    }else if(res.errno!=0){
                        self.$toast(res.message);
                    }
                },true);
            },

            /* 上传图片 */
            upOne(e){   //上传缩略图
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.good.thumb = res.attachment;
                })
            },

            upTwo(e){   //上传长图
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.good.thumbh = res.attachment;
                })
            },

            // upDetail(e){  //商品详情图
            //     var self = this;
            //     if( e instanceof Array ){
            //         for (let i = 0; i < e.length; i++) {
            //             self.$util.upimg(e[i].file,function(res){
            //                 self.good.pic.push({
            //                     id : new Date().getTime(),
            //                     show : res.url,
            //                     att : res.attachment,
            //                 });
            //             })
            //         }
            //     }else{
            //         self.$util.upimg(e.file,function(res){
            //             self.good.pic.push({
            //                 id : new Date().getTime(),
            //                 show : res.url,
            //                 att : res.attachment,
            //             });
            //         })
            //     }
            // },

            confirmWay(value){
                this.good.way=value;
                this.showWay=false;
            },
            confirmData(value){
                this.good.endData=value.getFullYear()+'-'+(value.getMonth()+1)+'-'+value.getDate();
                this.showData=false;
            },
            onBenefit(value) {
                this.good.sortname = value;
                this.showBenefit = false;
            },
            
            initData(){
                var self = this;
                var query = this.$route.query;
                var gid = query.id ? query.id : 0;

                self.$util.http('admin','GET',{op:'pubstart',gid:gid},res=>{
                    console.log(res);
                    self.good = gid > 0 ? res.data.good : self.good;
                    self.allsort = res.data.allsort;
                    if(res.data.good.length != 0){
                        self.thumb=[{content:self.good.showthumb}];
                        console.log(self.thumb)
                        self.thumbh=[{content:self.good.showthumbh}];
                        console.log(self.thumbh)
                    }
	            });
            },
        }
    }
</script>

<style scoped> 
    #main *{
        box-sizing: border-box;
    }
    /* 头部背景 */
        .header{
            width:100%;
            height:3.7rem;
            background-color: #ff6e40;
        }
    /* 填写背景信息 */
        .shopinfo,.other_info{
            width:9.5rem;
            padding:0.5rem ;
            margin:0 auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
        }
        .shopinfo{
            margin-top:-3.3rem;
        }
        .top_title{
            width:100%;
            margin-bottom: 0.3rem;
            display: flex;
            justify-content: space-between;
        }
        .title_left{
            font-size: 0.38rem;
            color:#333;
            font-weight: 700;
        }
        .following{
            font-size:0.32rem ;
            color:#333;
            font-weight: 500;
        }
        .title_right{
            color:#FF6E40;
            font-size: 0.32rem;
            font-weight: 500;
        }
    /* 上传图片 */
        .photo,.buy_know{
            width:9.5rem;
            padding:0.5rem ;
            margin:0 auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
            margin-top:0.3rem;
        }
        .photo{
            margin-bottom: 1.92rem;
        }
        .door_photo{
            width:8.5rem;
            margin:0.35rem auto;
            background-color: #f4f4f4;
            padding:0.3rem ;
            font-size: 0.375rem;
            border-radius: 0.16rem;
        }
        .door_title{
            width:100%;
            margin-bottom: 0.3rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.32rem;
        }
        .door_title_left{
            color:#333;
        }
        .door_title_right{
            color:#ff6e40;
        }
        .door_following{
            color:#999;
            font-size: 0.32rem;
            margin-bottom:0.26rem ;
        }
    /* 示例照片 */
        .ex_img,.ex_img>img{
            width:100%;
            height:6.5rem;
        }
        .demand1{
            width:9.5rem;
            height:1.08rem;
            margin: -1.2rem auto 0;
            background:rgba(51,51,51,1);
            color:#fff;
            opacity: 0.8;
            font-size:0.3rem ;
            padding: 0.16rem 0.15rem;
        }
        .demand2{
            width:9.5rem;
            margin:0 auto;
            color:#333;
            font-size: 0.38rem;
            padding:0.6rem 0.9rem 0.7rem 1.2rem;
            font-weight: 600;
            background-image: url(../../assets/mine/warning.png);
            background-repeat: no-repeat;
            background-position: 0.5rem 0.65rem;
            background-size: 0.5rem 0.5rem;
        }
        .toup_door{
            width:9.5rem;
            height:1.3rem;
            margin:0 auto;
            border-radius: 0.16rem;
            line-height: 1.3rem;
            text-align: center;
            background-color: #FF6E40;
            color: #FFFFFF;
            font-size: 0.5rem;
            margin-bottom:0.4rem ;
        }
        .other_info{
            margin-top:0.3rem;
        }
        .write{
            margin-top:0.2rem;
        }
        .write /deep/ .van-cell{
            background-color: #f9f9f9;
        }
    /* 底部发布 */
        .bottom_submit{
            width:100%;
            height:1.92rem;
            background-color: #fff;
            text-align: center;
            font-size:0.43rem;
            position:fixed;
            bottom: 0;
            left: 0;
        }
        /* .bottom_submit>ul{
            margin-top:0.36rem;
            display: flex;
            justify-content: space-around;
        } */
        /* .save,.preview,.to_submit{
            width:2.95rem;
            height:1.25rem;
            line-height: 1.25rem;
        }
        .save,.preview{
            border: 1px solid #ff6e40;
            border-radius: 0.16rem;
            color:#ff6e40;
        } */
        .to_submit{
            width:9.2rem;
            text-align: center;
            margin:0.3rem auto 0;
            height:1.25rem;
            line-height: 1.25rem;
            background-color: #ff6e40;
            border-radius: 0.16rem;
            color:#fff;
        }
    /* 增加删除单条信息 */
        .add_redu{
            width:100%;
            display: flex;
            justify-content: space-around;
            margin-top: 0.2rem;
        }
        .add_item,.redu_item{
            width:20%;
            height:0.6rem;
            border-radius: 0.08rem;
            color:#fff;
            font-size: 0.32rem;
            font-weight: 500;
            background: #ff6e40;
            text-align: center;
            line-height: 0.6rem;
        }
</style>
