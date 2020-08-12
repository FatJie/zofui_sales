<template>
    <div id="main">
        <!-- 头部背景 -->
        <div class="header"></div>
        <!-- 填写店铺信息 -->
        <div class="shopinfo">
            <div class="top_title">
                <div class="title_left">请填写店铺信息</div>
                <!-- <div class="title_right">联系客服 ></div> -->
            </div>
            <div class="following">请填写一下资料，开店更流畅</div>
            <van-field v-model="shop_name" placeholder="必填，招牌名称" label="店铺名称" />
            <!-- <van-field v-model="branch_shop" placeholder="选填，如西子一间店"  label="分店名称" /> -->
            <van-field v-model="owner" placeholder="必填，请输入姓名"  label="联系人" />
            <van-field v-model="tels"   placeholder="选填，请输入店铺电话" type="tel" label="店铺电话"/>
            <van-field v-model="tel" placeholder="必填，请输入联系人电话" type="tel" label="联系人电话"/>
            <van-field v-model="password"  placeholder="必填，请输入密码" type="password" label="密码"/>


            <!-- 地址选取 -->
            <van-field readonly clickable  :value="ctaddress"  placeholder="xx省 xx市 xx区" label="所在地区" @click="showaddress=true"/>
            <van-popup v-model="showaddress" position="bottom" :overlay="true">
                <van-area :area-list="areaList" value="430100" @confirm="confirmarea" @cancel="cancelarea"/>
            </van-popup>
            <!-- 填写地址 -->
            <van-field v-model="wrtaddress"  placeholder="填写详细地址" label="详细地址"/>
            <!-- 填写详细地址 -->
            <van-field type="text" :value="address"  placeholder="去定位地址" label="定位地址" readonly @click="locCity"/>
            <van-popup position="right" v-model="showloc" class="locbox">
                <div class="van-icon van-icon-close closeloc" @click="closeloc"></div>
                <iframe id="mapPage" width="100%" height="100%" frameborder=0
                    :src="'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key='+params.tenkey+'&referer=myapp'">
                </iframe>
            </van-popup> 

            <!-- 行业分类 -->                          
            <van-field readonly clickable label="行业分类" :value="value" placeholder="请选择行业分类" @click="showPicker = true"/>
            <van-popup v-model="showPicker" position="bottom">
                <van-picker show-toolbar :columns="columns" value-key="name" @cancel="showPicker = false" @confirm="onConfirm" @change="onChange"/>
            </van-popup>

            <!-- 营业时间
            <van-field readonly clickable label="营业时间" :value="startTime" @click="showStart = true"/>
            <van-popup v-model="showStart" position="bottom">
                <van-datetime-picker @confirm="confirmStart" @cancel="cancelStart" v-model="startTime" type="time" :min-hour="0" :max-hour="23"/>
            </van-popup>
            打烊时间
            <van-field readonly clickable label="打烊时间" :value="endTime" @click="showEnd = true"/>
            <van-popup v-model="showEnd" position="bottom">
                <van-datetime-picker @confirm="confirmEnd" @cancel="cancelEnd" v-model="endTime" type="time" :min-hour="0" :max-hour="23"/>
            </van-popup> -->
            
            <!-- 让利比例 -->
            <van-field readonly clickable label="让利比例" :value="benefit" @click="showBenefit = true" placeholder="必选，请选择让利比例！"/>
            <van-popup v-model="showBenefit" position="bottom">
                <van-picker show-toolbar :columns="columns_benefit" @cancel="showBenefit = false" @confirm="onBenefit"/>
            </van-popup>
        </div>
        <!-- 上传店铺图片 -->
        <!-- <div class="photo">
            <div class="top_title">
                <div class="title_left">请上传店铺图片</div>
                <div class="title_right">联系客服 ></div>
            </div>
            <div class="following">请按照要求上传图片，方便我们审核</div>
            <div class="door_photo">
                <div class="door_title">
                    <div class="door_title_left">门头照（1张）</div>
                    <div class="door_title_right" @click="showDoor=true">查看示例</div>
                </div>
                <div class="door_following">必须为正面全景照，包含完整店铺名和入口，且店名要与填写的店名一致</div>
                <van-uploader :after-read="upOne" accept="image/*" v-model="justOne"  :max-count="1"/>
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
                    <div class="door_title_left">封面图</div>
                    <div class="door_title_right" @click="showIn=true">查看示例</div>
                </div>
                <div class="door_following">需拍摄真实门店环境（如服务场景、工作台、用餐环境等）</div>
                <van-uploader :after-read="upTwo" accept="image/*"  v-model="two" :max-count="1"/>
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
        </div> -->
        <!-- 同意规则 -->
        <div class="rule">
            <van-checkbox label-disabled v-model="values" checked-color="#ff6e40">
                <font class="me">我已阅读并同意</font>
                <font class="terms"  @click="show=true">《商家入驻相关服务条款》</font>
            </van-checkbox>
        </div>
        <!-- 规则弹出 -->
        <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
            <div class="popup">
                <img :src="imgPre+'/freeshop.jpg'">
            </div>
        </van-popup>
        <!-- 底部提交申请 -->
        <div class="pay">
            <div class="pay_right" :class="!this.values?'noopen':'bg'" @click="submit">提 交 申 请</div>
        </div>
    </div>
</template>

<script>
    import { Field,AddressEdit,Picker,Popup,Uploader,Area,DatetimePicker,Checkbox } from 'vant';
    import area from '../../assets/js/area.js';
    import wx from 'weixin-js-sdk';
    const citys = {};
    export default{
        name:'freeshop',
        components:{
            [Field.name]:Field,
            [AddressEdit.name]:AddressEdit,
            [Picker.name]:Picker,
            [Popup.name]:Popup,
            [Uploader.name]:Uploader,
            [Area.name]:Area,
            [DatetimePicker.name]:DatetimePicker,
            [Checkbox.name]:Checkbox,
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',

                show:false,
                showDoor:false,
                showIn:false,
                // showStart:false,  //营业时间
                // startTime:'08:00',
                // showEnd:false,  //打烊时间
                // endTime:'22:00',

                address : '',  //填写详细地址
                showloc : false,
                lat : false,
				dev : '',
                lng : false,
                params : {},
                sortId:0,
                tels:'',

                showaddress : false,  //选择省市区
                areaList : area,
                ctaddress : '',
                wrtaddress:'',
                city_name:'',
                city_name1:'',
                provinceId:0,
                cityId:0,
                areaId:0,
                good:{title:'',pic:[]},
                currentTime:'',
                password:'',
                values:false,
                two:[],
                justOne:[],
                twoPic:'',
                onePic:'',
                shop_name:'',
                // branch_shop:'',
                owner:'',
                tel:'',
                value: '',
                showPicker: false,
                columns: [],
                benefit:'',
                showBenefit: false,
                html:'',
                columns_benefit: ['0%',  '1%', '2%', '3%','4%','5%',  '6%', '7%', '8%','9%', '10%', '11%', '12%', '13%','14%', '15%', '16%', '17%', '18%','19%', '20%', '21%', '22%', '23%', '24%', '25%','26%', '27%', '28%', '29%','30%'],
            }
        },
        created(){
            this.initData();
            this.qqq();
        },
        methods:{
            qqq(){
                this.$util.http('shopinfo','get',{op:'joininfo'},res=>{ 
                    var list=res.data.sort;
                });
            },
            //提交申请
            submit(){
                console.log(this.values);
                if(this.shop_name==''){
                    this.$toast('请输入正确的店铺名称！')
                    return
                }
                if(this.owner==''){
                    this.$toast('请输入正确的联系人姓名！')
                    return
                }
                if(this.tel==''){
                    this.$toast('请输入正确的联系人电话！')
                    return
                }
                if(this.password==''){
                    this.$toast('请输入正确的密码！')
                    return
                }
                if(this.ctaddress==''){
                    this.$toast('请输入正确的地区！')
                    return
                }
                if(this.value==''){
                    this.$toast('请选择贵店铺的行业分类！')
                    return
                }
                // if(this.startTime==''){
                //     this.$toast('请选择贵店铺营业时间！')
                //     return
                // }
                // if(this.endTime==''){
                //     this.$toast('请选择贵店铺打烊时间！')
                //     return
                // }
                if(this.benefit==''){
                    this.$toast('请选择让利比例！')
                    return
                }
                if(this.values){
                    var postdata = {
                        op : 'join',
                        shop_name:this.shop_name,  //店铺名称
                        // branch_shop:this.branch_shop,  //分店名称
                        owner:this.owner,      //联系人姓名
                        tel:this.tel,          //联系人电话
                        password:this.password,     //密码
                        ctaddress:this.ctaddress,   //所在地区
                        wrtaddress:this.wrtaddress,  //填写详细地址
                        address:this.address,       //定位地址
                        sortid:this.sortId,          //行业分类id
                        // startTime:this.startTime,  //营业时间
                        // endTime:this.endTime,      //打烊时间
                        benefit:this.benefit.substr(0,this.benefit.length-1),     //让利比例
                        lng:this.lng,              //经度
                        lat:this.lat,              //纬度
                        justOne:this.onePic,      //门头照
                        two:this.twoPic,           //内景照
                        city_name:this.city_name,
                        city_name1:this.city_name1,
                        provinceid:this.provinceId,//省id
                        cityid:this.cityId,        //市id
                        areaid:this.areaId,        //区id
                        tels:this.tels    //店铺电话
                    }
                    this.$util.http('shopinfo','POST',postdata,res=>{
                        if(res.errno==0){
                            this.$router.push('/shopsuccess');
                            this.$toast(res.message,);
                        }else{
                            this.$toast(res.message);
                        }
                    },true);
                }
            },
            //上传门头照
            upOne(e){
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.onePic = res.attachment;
                })
            },
            //上传内景照
            upTwo(e){
                var self = this;
                self.$util.upimg(e.file,function(res){
                    self.twoPic = res.attachment;
                })
            },
            //行业分类
            onChange(picker, values) {
                picker.setColumnValues(1, citys[values[0]]);
            },
            onConfirm(tar) {
                this.value=tar.name;
                this.sortId = tar.id;
                this.showPicker = false;
            },

            onBenefit(value) {
                this.benefit = value;
                this.showBenefit = false;
            },
            //选择营业时间
            confirmStart(){
                this.showStart = false;
            },
            cancelStart(){
                this.startTime= '08:00';
                this.showStart = false;
            },
            confirmEnd(){
                this.showEnd = false;
            },
            cancelEnd(){
                this.endTime= '22:00';
                this.showEnd = false;
            },
            //选择省市区
            confirmarea(e){
                this.ctaddress = e[0].name +','+e[1].name +','+e[2].name;
                this.city_name1=e[1].name;
                console.log(e[1].name);
                this.provinceId=e[0].code;
                this.cityId=e[1].code;
                this.areaId=e[2].code;
                this.showaddress = false;
            },
            cancelarea(){
                this.showaddress = false;
            },
            //定位详细地址
            locCity(){
                var self = this;

                self.showloc = true;
                function setloc(event){
                    var loc = event.data;
                    console.log(loc);
                    if (loc && loc.module == 'locationPicker') {
                        self.lat = loc.latlng.lat;
                        self.lng = loc.latlng.lng;
                        self.city_name=loc.cityname;
                        self.address = loc.poiaddress;
                        self.showloc = false;
                    }
                }
                window.removeEventListener('message',setloc,false);
                window.addEventListener('message',setloc, false);
            },
            closeloc(){
                this.showloc = false;
            },
            initData(){
                var self = this;
				self.dev = self.$util.dev();
                var params = this.$route.query;
                var code = params.agentcode ? params.agentcode : '';
                var postdata = {
                    op : 'joininfo',
                    gid : params.id ? params.id : 0,
                }
	            self.$util.http('shopinfo','GET',postdata,function(res){ 
                    self.inited = 1;
                    self.columns=res.data.allsort;
	                if( !res.errno && res.data ){        
	                	
                        self.params = res.data.params;
                        self.status = res.data.status;
                        self.sharedata = res.data.sharedata;
                        self.agentcode = code;
                        self.html=res.data.xieyi;
                        self.inited = 2;
                        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                            wx.updateAppMessageShareData({ 
                                title: res.data.sharedata.title, // 分享标题
                                desc: res.data.sharedata.desc, // 分享描述
                                link: res.data.sharedata.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: res.data.sharedata.img, // 分享图标
                                success: function () {
                                    // self.$toast('分享成功！')// 设置成功
                                }
                            })
                        });
	                }else{
	                	self.$toast(res.message);
	                }
	                self.isrefresh = false;
	            });
            },
            // check(){
            //     var input=document.getElementById("input");
            //     var pay_right=document.getElementsByClassName("pay_right")[0]
            //     if(this.values==false){
            //         this.values=true;
            //         input.classList.add("bg")
            //         pay_right.classList.add("open")
            //         pay_right.classList.remove("noopen")
            //     }else{
            //         this.values=false;
            //         input.classList.remove("bg")
            //         pay_right.classList.add("noopen")
            //     }
            // },
        },
    }
</script>

<style scoped> 
    #main *{
        box-sizing: border-box;
    }
    #main /deep/ .van-cell{
        padding-left:0 !important;
    }
    /* 头部背景 */
        .header{
            width:100%;
            height:3.7rem;
            background-color: #ff6e40;
        }
    /* 填写背景信息 */
        .shopinfo,.photo{
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
        .photo{
            margin-top:0.3rem;
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
    /* 规则 */
        .rule{
            width:100%;
            padding-left: 0.65rem;
            font-size: 0.362rem;
            margin-top:0.42rem;
            margin-bottom: 2.2rem;
            font-weight: 700;
            vertical-align: middle;
        }
        .bg{
            background-color: #ff6e40;
        }
        .me{
            color:#333;
        }
        .terms{
            color:#FF6E40;
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
        .noopen{
            background-color:#999 ;
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
        .popup{
            width:100%;
        }
        .popup>img{
            width:100%;
        }
        .pay{
            width:100%;
            height:2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
</style>
