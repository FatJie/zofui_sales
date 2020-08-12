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

            <!-- <van-field v-model="good.number" placeholder="选填，越大越排前" type="number"  label="排列序号" /> -->
            <van-field v-model="good.oldprice" type="number" placeholder="必填，请输入商品原价(元)"  label="商品原价"/>
            <van-field v-model="good.stock" type="number" placeholder="必填，请输入商品库存" label="商品库存"/>

            <!-- 限领会员 -->
            <van-field readonly clickable label="限领会员" :value="good.member" @click="showBenefit = true"/>
            <van-popup v-model="showBenefit" position="bottom">
                <van-picker show-toolbar :columns="columns_member" @cancel="showBenefit = false" @confirm="onBenefit"/>
            </van-popup>
        </div>
        <!-- 其他信息参数 -->
        <div class="other_info">
            <div class="top_title">
                <div class="title_left">请填写商品信息</div>
                <!-- <div class="title_right">联系客服 ></div> -->
            </div>
            <div class="following">其他信息参数</div>
        <!-- 截止日期 -->
            <van-field readonly placeholder="必填，请选择截止日期" clickable label="领取截止日期" :value="good.endData" @click="showData = true"/>
            <van-popup v-model="showData" position="bottom">
                <van-datetime-picker @confirm="confirmData" @cancel="showData = false" v-model="nowData" type="date" :min-date="minDate" :max-date="maxDate"/>
            </van-popup>

        <!-- 限领日段 -->
            <van-field readonly clickable label="领取开始日段" :value="good.startday" @click="showStartDay = true"/>
            <van-popup v-model="showStartDay" position="bottom">
                <van-picker show-toolbar :columns="columns_day" @confirm="confirmStartDay" @cancel="showStartDay = false"/>
            </van-popup>

            <van-field readonly clickable label="领取结束日段" :value="good.endday" @click="showEndDay = true"/>
            <van-popup v-model="showEndDay" position="bottom">
                <van-picker show-toolbar :columns="columns_day" @confirm="confirmEndDay" @cancel="showEndDay = false"/>
            </van-popup>

        <!-- 限领时段 -->
            <!-- <van-field readonly placeholder="请选择领取开始时段" clickable label="领取开始时段" :value="good.starttime" @click="showStartTime = true"/>
            <van-popup v-model="showStartTime" position="bottom">
                <van-picker show-toolbar :columns="columns_time" @confirm="confirmStartTime" @cancel="showStartTime = false"/>
            </van-popup>

            <van-field readonly placeholder="请选择领取结束时段" clickable label="领取结束时段" :value="good.endtime" @click="showEndTime = true"/>
            <van-popup v-model="showEndTime" position="bottom">
                <van-picker show-toolbar :columns="columns_time" @confirm="confirmEndTime" @cancel="showEndTime = false"/>
            </van-popup> -->

            <van-field v-model="good.buy_times_day" type="number" placeholder="选填，每日下单限购的数量"  label="单日限购"/>

        <!-- 消费方式 -->
            <van-field readonly placeholder="选填，请选择消费方式" clickable label="消费方式" :value="good.way" @click="showWay = true"/>
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
                    <van-uploader v-model="thumb" :after-read="upOne" :max-count="1"/>
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
                <van-uploader :after-read="upTwo" v-model="good.thumbh"  multiple :max-count="5"/>
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
                    <div class="door_title_left">套餐图文详情</div>
                    <div class="door_title_right" @click="showDetail=true">查看示例</div>
                </div>
                <div class="door_following">展示商品具体内容的页面（更好的显示商品情况，可以吸引更多的买家）</div>
                <van-uploader v-model="good.pic" :after-read="upDetail"  multiple/>
                <van-uploader v-model="pic" :after-read="upDetail"  :max-count="5"/>
                <van-field v-model="decs" type="text" placeholder="请输入相关文字描述"  label="文字描述" />
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
            <div class="write" id="write" v-for="(good, index) of goodinfo">
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
            <van-field  label="使用规则" placeholder="请输入使用规则" v-model="good.tips" rows="2" type="textarea" autosize/>
            <van-field  label="预约信息" placeholder="请输入预约信息" v-model="good.order_info" type="text"/>
        </div> -->
        <!-- 底部发布商品 -->
        <div class="bottom_submit">
            <!-- <ul>
                <li class="save">存入草稿</li>
                <li class="preview">预览商品</li> -->
                <li class="to_submit" @click="submit">发布商品</li>
            <!-- </ul> -->
        </div>
    </div>
</template>

<script>
    import { Calendar,Field,AddressEdit,Picker,Popup,Uploader,Area,DatetimePicker, } from 'vant';
    export default{
        name:'pubspecial',
        components:{
            [Calendar.name]:Calendar,
            [Field.name]:Field,
            [AddressEdit.name]:AddressEdit,
            [Picker.name]:Picker,
            [Popup.name]:Popup,
            [Uploader.name]:Uploader,
            [Area.name]:Area,
            [DatetimePicker.name]:DatetimePicker,
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',

                showStartTime:false,
                showEndTime:false,
                showStartDay:false,
                showEndDay:false,
                info:{},

                popupsort:false,
                allsort:[],
                /*上传图片*/
                showDoor:false,
                twoPic:{title:'',pic:[]},
                showIn:false,
                showDetail:false,
                detailPic:{title:'',pic:[]},
                thumbh:[],
                thumb:[],
                // showthumb:[],
                // showthumbh:[],
                pic:[],
                good:{member:'VIP会员',index:0,startday:'周一',endday:'周日',title:''},
                goodinfo:[
                    {
                        item_good_name:'',  
                        item_good_num:'',
                        item_good_price:''
                    }
                ],

                showData:false,    //其他信息参数
                nowData:new Date(),
                minDate: new Date(2020, 1, 1),
                maxDate: new Date(2025, 12, 31),
                endData:'请选择商品消费截止日期',
                ways:['到店消费','线上消费'],
                way:'请选择消费方式',
                showWay:false,
                columns_member:['VIP会员','服务商','代理商'],
                columns_day:['周一','周二','周三','周四','周五','周六','周日'],
                columns_time:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
                showPicker: false,
                good_class:'请选择商品分类',
                showBenefit: false,
            }
        },
        created(){
            this.initData();
        },
        methods:{
            /* 添加单条商品数据 */
            addItem(){
                this.goodinfo.push({
                    item_good_name:'',  
                    item_good_num:'',
                    item_good_price:''
                });
            },
            reduItem(){
                if(this.goodinfo.length==1){
                    return;
                };
                this.goodinfo.splice(-1,1);
            },
            /* 日段 */
            confirmStartDay(value){
                this.good.startday=value;
                this.showStartDay=false;
            },
            confirmEndDay(value){
                this.good.endday=value;
                this.showEndDay=false;
            },
            /* 时段 */
            confirmStartTime(value){
                this.good.starttime=value;
                this.showStartTime=false;
            },
            confirmEndTime(value){
                this.good.endtime=value;
                this.showEndTime=false;
            },

            onChangesort(tar){
                this.good.sortid = tar.id;
                this.good.sortname = tar.name;
                this.popupsort = false;
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
                        self.thumb=[{content:res.data.good.showthumb}];
                        console.log(self.thumb)
                        self.thumbh=[{content:res.data.good.showthumbh}];
                        console.log(self.thumbh)
                        if(res.data.good.receive==0){
                            self.good.member="VIP会员"
                        }else if(res.data.good.receive==1){
                            self.good.member="服务商"
                        }else{
                            self.good.member="代理商"
                        }
                    }
	            });
            },
            /* 发布商品 */
            submit(){
                // this.good.goodinfo=this.goodinfo;
                if(!this.good.title){
                    this.$toast('请输入正确的商品名称！')
                    return
                }
                // if(!this.good.good_desc){
                //     this.$toast('请输入正确的商品描述！')
                //     return
                // }
                if(!this.good.sortname){
                    this.$toast('请输入正确的商品分类！')
                    return
                }
                if(!this.good.oldprice){
                    this.$toast('请输入正确的商品原价！')
                    return
                }
                if(!this.good.stock){
                    this.$toast('请输入正确的商品库存！')
                    return
                }
                if(!this.good.endData){
                    this.$toast('请输入正确的截止日期！')
                    return
                }
                var self = this;
                var postdata = {
                    op : 'pubgoods',
                    form:JSON.stringify({ ...self.good,istequan:1 }),
                    // type:this.type,  //商品类型
                    // good_name:this.good_name,  //商品名称
                    // good_desc:this.good_desc,  //商品描述
                    // array_num:this.array_num,      //排列序号
                    // ori_price:this.ori_price,          //商品原价
                    // member_price:this.member_price,     //会员价
                    // pay_price:this.pay_price,   //结算价格
                    // store:this.store,       //商品库存
                    // endData:this.endData,          //截止时间
                    // buy_num:this.buy_num,  //限购数量
                    // buy_times:this.buy_times,      //限购次数
                    // buy_times_day:this.buy_times_day,   //单日限购
                    // way:this.way,              //消费方式
                    // justOne:this.justOne,   //缩略图
                    // two:this.twoPic,            //轮播图
                    // detailPic:this.detailPic,   //商品详图
                    // item_good_name:this.item_good_name,  //单条商品名称
                    // item_good_num:this.item_good_num,  //单条商品数量
                    // item_good_price:this.item_good_price,  //单条商品价格
                    // order_info:this.order_info,      //预约信息
                    // tips:this.tips,                  //温馨提示
                    //index       让利比例id
                }
                this.$util.http('admin','POST',postdata,function(res){ 
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
            upOne(e){  //上传缩略图
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.good.showthumb = res.url;
                    self.good.thumb = res.attachment;
                })
            },

            upTwo(e){   //上传长图
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.good.showthumbh = res.url;
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
            onBenefit(value,index){
                this.good.index = index;
                this.good.member = value;
                this.showBenefit = false;
            },
        }
    }
</script>

<style scoped> 
    .buy_know /deep/ textarea{
        height:2.9rem !important;
    }
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
        .title_right{
            color:#FF6E40;
            font-size: 0.32rem;
            font-weight: 500;
        }
        .following{
            font-size:0.32rem ;
            color:#333;
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
        }
        .save,.preview,.to_submit{
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
