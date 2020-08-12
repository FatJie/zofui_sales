<template>
    <div>
        <div class="verify">
            <!-- 店铺信息 -->
            <div class="shopinfo">
                <div class="top_title">
                    <div class="title_left">店铺信息</div>
                    <!-- <div class="title_right">联系客服 ></div> -->
                </div>
                <div class="following">修改以下材料，需要重新审核</div>
                <van-field v-model="info.name" label="店铺名称" placeholder=""/>
                <van-field v-model="info.owner" label="联系人" placeholder=""/>
                <van-field v-model="info.phone_num" label="店铺电话" placeholder=""/>

                <!-- 地址选取 -->
                <!-- <van-field readonly clickable  v-model="ctaddress"  placeholder="xx省 xx市 xx区" label="所在地区" @click="showaddress=true" />
                <van-popup v-model="showaddress" position="bottom" :overlay="true">
                    <van-area :area-list="areaList" @confirm="confirmarea" @cancel="showaddress = false"/>
                </van-popup> -->

                <!-- 填写详细地址 -->
                <!-- <van-field type="text" :value="address"  placeholder="去定位详细地址" label="详细地址" readonly @click="locCity"/> -->
                <!-- <div id="div"> -->
                    <!-- <van-popup position="right" v-model="showloc" class="locbox">
                        <div class="van-icon van-icon-close closeloc" @click="showloc = false"></div>
                        <iframe id="mapPage" width="100%" height="100%" frameborder=0
                            :src="'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key='+params.tenkey+'&referer=myapp'">
                        </iframe>
                    </van-popup> -->
                <!-- </div> -->

                <!-- 让利比例 -->
                <van-field readonly clickable label="让利比例" :value="benefit" @click="showBenefit = true"/>
                <van-popup v-model="showBenefit" position="bottom">
                    <van-picker show-toolbar :columns="columns_benefit" @cancel="showBenefit = false" @confirm="onBenefit"/>
                </van-popup>
            </div>


            <!-- 上传店铺图片 -->
            <div class="photo">
                <div class="top_title">
                    <div class="title_left">请上传店铺图片</div>
                    <!-- <div class="title_right">联系客服 ></div> -->
                </div>
                <div class="following">请按照要求上传图片，方便我们审核</div>
                <div class="door_photo">
                    <div class="door_title">
                        <div class="door_title_left">门头照（1张）</div>
                        <div class="door_title_right" @click="showDoor=true">查看示例</div>
                    </div>
                    <div class="door_following">必须为正面全景照，包含完整店铺名和入口，且店名要与填写的店名一致</div>
                    <van-uploader v-model="justOne" :preview-image="true" :after-read="upOne" multiple :max-count="1"/>
                </div>
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
                <div class="door_photo">
                    <div class="door_title">
                        <div class="door_title_left">封面照</div>
                        <div class="door_title_right" @click="showIn=true">查看示例</div>
                    </div>
                    <div class="door_following">需拍摄真实门店环境（如服务场景、工作台、用餐环境等）</div>
                    <van-uploader :after-read="upTwo" :preview-image="true" v-model="two" multiple :max-count="1"/>
                </div>
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
            </div>
            
            <!-- 提交 -->
            <div class="add" @click="add">提 交 申 请</div>
        </div>
    </div>
</template>

<script>
    import { Tab, Tabs,Field ,Uploader,Checkbox,Area,Popup,Picker  } from 'vant';
    import area from '../../assets/js/area.js';
    export default{
        components:{
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Field.name]:Field,
            [Uploader.name]:Uploader,
            [Checkbox.name]:Checkbox,
            [Area.name]:Area,
            [Popup.name]:Popup,
            [Picker.name]:Picker,
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',

                id:0,
                activeName: 'a',
                licence:[],
                idcard:[],
                info:[],
                checked: false,
                money_checked: false,

                showDoor:false,
                showIn:false,
                address : '',  //填写详细地址
                showloc : false,
                lat : false,
				dev : '',
                lng : false,
                params : {},
                sortId:0,

                two:[],
                justOne:[],
                twoPic:'',
                onePic:'',
                showaddress : false,  //选择省市区
                areaList : area,
                ctaddress : '',
                provinceId:0,
                cityId:0,
                areaId:0,
                benefit:'',
                showBenefit: false,
                columns_benefit: ['5%',  '6%', '7%', '8%','9%', '10%', '11%', '12%', '13%','14%', '15%', '16%', '17%', '18%','19%', '20%', '21%', '22%', '23%', '24%', '25%', '26%', '27%', '28%', '29%', '30%'],
            }
        },
        created(){
            this.id=this.$route.query.id;
            this.initData();
            this.$route.meta.keepAlive = true;
        },
        methods:{
            add(){

                var postdata = {
                    op : 'editshops',
                    id : this.id,
                    info:this.info,
                }
	            this.$util.http('admin','GET',postdata,res=>{ 
                    if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onClose : function(){
                                this.$router.push('/shopsuccess');
                            }
                        })
                    }else{
                        this.$toast(res.message);
                    }
                },true);
            },
            //上传门头照
            upOne(e){
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.info.onePic = res.attachment;
                })
            },
            //上传内景照
            upTwo(e){
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.info.twoPic = res.attachment;
                })
            },
            //让利比例
            onBenefit(value) {
                this.benefit = value;
                this.showBenefit = false;
            },
            // //选择省市区
            // confirmarea(e){
            //     this.ctaddress = e[0].name +','+e[1].name +','+e[2].name;
            //     this.provinceId=e[0].code;
            //     this.cityId=e[1].code;
            //     this.areaId=e[2].code;
            //     this.showaddress = false;
            // },
            // //定位详细地址
            // locCity(){
            //     var self = this;

            //     self.showloc = true;
            //     function setloc(event){
            //         var loc = event.data;
            //         if (loc && loc.module == 'locationPicker') {
            //             self.lat = loc.latlng.lat;
            //             self.lng = loc.latlng.lng;
            //             self.address = loc.poiaddress;
            //             self.showloc = false;
            //         }
            //     }
            //     window.removeEventListener('message',setloc,false);
            //     window.addEventListener('message',setloc, false);
            // },
            initData(){
                
                var postdata = {
                    op : 'editshop',
                    id : this.id
                }
	            this.$util.http('admin','GET',postdata,res=>{ 
                    this.info=res.data.shop;
                    this.benefit=Number(res.data.shop.benefit)+'%';
                });
            },
        }
    }
</script>

<style scoped>
    /* 信息 */
        .shopinfo{
            width:9.5rem;
            padding:0.5rem ;
            box-sizing: border-box;
            margin:0.3rem auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
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
    /* 保存 */
        .add{
            width:9.4rem;
            height:1.3rem;
            line-height: 1.3rem;
            text-align: center;
            margin: 0 auto;
            font-size:0.48rem ;
            font-weight: 500;
            color: #fff;
            background: #FF6E40;
            border-radius: 0.16rem;
        }
    /* 店铺图片 */
        .money{
            width:9.4rem;
            margin: 0.3rem auto;
            border-radius: 0.16rem;
            background: #fff;
            box-sizing: border-box;
            padding:0.5rem;
        }
        .title{
            display: flex;
            justify-content: space-between;
            color:#333;
            font-size: 0.37rem;
            font-weight: 700;
            margin-bottom: 0.8rem;
        }
        .num{
            font-size: 0.64rem;
            font-weight: 700;
            color: #333;
            border-bottom: 0.015rem solid #f4f4f4;
            padding-bottom: 0.3rem;
            box-sizing: border-box;
        }
        .intro>font{
            display:block;
            width:100%;
            font-size:0.32rem ;
            color: #333;
            font-weight: 700;
            margin: 0.5rem 0 0.2rem;
        }
        .intro_content{
            color: #999;
            font-size: 0.32rem;
        }
    /* 上传图片 */
        .photo{
            width:9.5rem;
            padding:0.5rem ;
            margin:0.3rem auto ;
            background-color: #fff;
            font-size: 0.375rem;
            border-radius: 0.16rem;
            box-sizing: border-box;
        }
        .door_photo{
            width:8.5rem;
            margin:0.35rem auto;
            background-color: #f4f4f4;
            padding:0.3rem ;
            font-size: 0.375rem;
            border-radius: 0.16rem;
            box-sizing: border-box;
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
    /* 底部提交申请 */
        .pay{
            display: inline-block;
            width:100%;
            height:1.5rem;
            line-height: 1.5rem;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            position:fixed;
            bottom:0;
            left: 0;
            padding:0 0.44rem;
        }
        .pay_right{
            width:9.5rem;
            height:1.2rem;
            margin-top: 0.15rem;;
            border-radius: 0.16rem;
            line-height: 1.2rem;
            text-align: center;
            font-size:0.38rem ;
            color:#fff;
        }
        .open{
            background-color:#FF6E40 ;
        }
        .locbox{
            width: 100%;
            height: 100%;
        }
        .closeloc{
            position: fixed;
            bottom: 15px;
            right: 5px;
            color: #666;
        }
    /* 门头照示例 */
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
</style>