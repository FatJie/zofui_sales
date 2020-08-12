<template>
    <div id="main">
        <loading v-show="inited == 0 || inited == 1" :inited="inited"/>
        <div v-if="inited == 2">
            <!-- 搜索框 -->
            <div class="search">
                <form action="/">
                    <van-search v-model="value" shape="round" placeholder="请输入产品名..." @search="onSearch" background="#fff"/>
                </form>
            </div>
            <!--  分类导航栏   -->
            <div class="content">
                <van-tabs @click="onClick" :sticky="scrolltabs?true:false">
                    <van-tab v-for="index in tabs" :key="index.id" :title="index.name" title-style="width:1rem">
                        <!-- 轮播图 -->
                        <van-swipe :autoplay="3000" indicator-color="white" v-if="swipes">
                            <van-swipe-item>
                                <img class="swipe_img" src="http://ykd.lsh199.com/attachment/images/global/mobile/speciallist_carousel(1).png" @click="getUrl">
                            </van-swipe-item>
                        </van-swipe>
                        <!-- 筛选 -->
                        <van-sticky :offset-top="offset">
                            <van-dropdown-menu>
                                <van-dropdown-item @change="onChange1" v-model="select1" :options="option1">
                                </van-dropdown-item>
                                <van-dropdown-item @change="onChange2" v-model="select2" :options="option2"/>
                                <van-dropdown-item @change="onChange3" v-model="select3" :options="option3"/>
                            </van-dropdown-menu>
                        </van-sticky>
                        <!-- 特权商品展示 -->
                        <van-pull-refresh :disabled="disrefresh" v-model="isrefresh" @refresh="onRefresh" :head-height="80" success-text="已刷新" v-scroll="scrolltop" loading-text="加载中~">
                            <van-list v-model="loading" :immediate-check="false" :finished="finished" loading-text="加载中" finished-text="到底了" :offset="100" @load="onLoad">
                                <div class="special_item" v-for="item in list" :key="item.id">
                                    <div class="avater" @click="getSpecial(item.id)">
                                        <img :src="item.thumb">
                                    </div>
                                    <div class="first_right">
                                        <div class="first_right_top">
                                            <div class="special_class">{{item.receive}}</div>
                                            <div class="special_name" @click="getSpecial(item.id)" >{{item.title}}</div>
                                        </div>
                                        <div class="area">
                                            <div><font>{{item.type}}</font></div>
                                            <div class="km"><font>{{item.country}} </font>{{item.distance}}</div>
                                        </div>
                                        <div class="good1">
                                            <div class="good1_left"><font>{{item.oldprice}}</font>元</div>
                                            <div class="good1_right">{{item.saled}}人领取</div>
                                        </div>
                                        <div class="good2">
                                            <div class="shop_name" @click="toShop(item.shopid)">{{item.shopname}}</div>
                                            <div class="arrow"></div>
                                            <div class="get" v-if="item.buttons==0" @click="getSpecial(item.id)">免费领取</div>
                                            <div class="geted" v-if="item.buttons==2">已领取</div>
                                            <div class="saled" v-if="item.buttons==1">已售罄</div>
                                            <div class="saled" v-if="item.buttons==3">今日售罄</div>
                                        </div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import { Sticky,PullRefresh,Search,Toast,Tab,Tabs,Swipe, SwipeItem,DropdownMenu, DropdownItem,TreeSelect,Loading,List } from 'vant';
    import area from '../../assets/js/area.js';
    import wx from 'weixin-js-sdk';
    // import Bus from '../../assets/js/bus.js';
	export default {
        name : 'speciallist',
        components:{
            [Search.name]:Search,
            [Toast.name]:Toast,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
            [DropdownMenu.name]:DropdownMenu,
            [DropdownItem.name]:DropdownItem,
            [TreeSelect.name]:TreeSelect,
            [List.name]:List,
            [PullRefresh.name]:PullRefresh,
            [Sticky.name]:Sticky,
        },
        data(){
            return{
                sharedata :{},
                disrefresh:false,
                offset:0,
                swipes:true,
                scrolltabs:false,
                isrefresh:false,
                scrollsticky:false,

                finished: false,
                loading: false,
                pages:1,

                inited : 0,
                areaList:area.county_list,
                activeId: 0,
                activeIndex: 0,
                select1:0,
                select2:0,
                select3:0,
                value1:[],
                option1:[
                    {text:'全部',value:0}
                ],
                option2:[
                    { text: '附近', value: 0 },
                    { text: '销量最高', value: 1 }
                ],
                option3:[
                    { text: '筛选', value: 0 },
                    { text: 'VIP特权', value: 1 },
                    { text: '服务商特权', value: 2 },
                    { text: '黑金特权', value: 3 }
                ],
                tabs:[
                    {name:'全部',id:0}
                ],
                value:'',
                list:[],
                option1_value:1,
                pid:0,       //产品分类id
                text:"",     //产品类名
                areaId:0,    //区域id
                smart:"",    //智能排序
                fujin:0,       //附近id
                adcode:'',
                idd:0,
                page:{
                    
                },
                lat:'',
                lng:''
            }
        },
        beforeRouteLeave (to, from, next) {
            document.documentElement.scrollTop = 0;
            next();
        },
        // beforeRouteEnter(to,from,next){
        //     next(vm=>{
        //         vm.reg();
        //     });
        // },
        created(){
            // if( this.sharedata ){
            //     this.$util.share(wx,this.sharedata);
            // }
            this.initData();
            this.reg();
        },
        methods: {
            getUrl(){
                this.$router.push({path:'/goodinfo',query:{id:'1276'}});
            },
            scrolltop(e){
                if(e>40){
                    this.scrolltabs=true;
                    this.offset=window.innerWidth*0.117333;
                    if(this.list.length<5){
                        this.swipes=true;
                        return;
                    }
                    this.swipes=false;
                }else{
                    this.scrolltabs=false;
                    this.swipes=true;
                    this.offset=0;
                }
                this.disrefresh = e <= 0 ? false : true;
            },
            onRefresh(){
                location.reload();
            },
            onLoad() {
                var self = this;
                self.pages++;
                var post={
                    op:'tequan',
                    page:self.pages,
                    pid:this.pid,          //产品分类id
                    text:this.text,        //产品类名
                    areaId:this.areaId,    //区域id
                    smartId:this.smart,    //智能排序id
                    fujin:this.fujin,       //附近id
                    lat:this.lat,
                    lng:this.lng
                }
	            self.$util.http('good','GET',post,function(res){
                    if(res.data.list!=null){
                        self.list = self.list.concat(res.data.list);
                        self.loading=false;
                    }else{
                        self.finished=true;
                    }
	            },true);
	  		},

            toShop(id){
                this.$router.push('/shopinfo?id='+id)
            },
            //筛选请求数据
            data(){
                var obj={
                    op:"tequan",
                    pid:this.pid,          //产品分类id
                    text:this.text,        //产品类名
                    areaId:this.areaId,    //区域id
                    smartid:this.smart,    //特权筛选id
                    fujin:this.fujin,       //附近id
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('good','GET',obj,res=>{
                    this.list=res.data.list;
                    this.isrefresh=false;
                },true)
            },
            onClick(name, title) {
                this.scrolltabs=false;
                this.swipes=true;
                this.pages=1;
                if(name==0){
                    location.reload();
                    // this.pages=1;
                    // var postData={
                    //     op:'tequan',
                    //     lat:this.lat,
                    //     lng:this.lng
                    // };
                    // this.$util.http('good','GET',postData,res=>{
                    //     this.list=res.data.list;
                    // },true);
                    // this.isrefresh=false;
                    return;
                };
                for(var i=0;i<this.tabs.length;i++){
                    if(this.tabs[i].name==title && this.tabs[i].id!=0){
                        this.pid=this.tabs[i].id;
                        this.text=title;
                    };
                };
                this.data();
            },
            onChange1(value){
                for(var i=0;i<this.option1.length;i++){
                    if(this.option1[i].value==value){
                        this.areaId=this.option1[i].id;
                        this.data();
                    }
                }
            },
            onChange2(value){
                if(value==0){
                    this.areaId=0;
                    this.select1=0;
                }
                for(var i=0;i<this.option2.length;i++){
                    if(this.option2[i].value==value){
                        this.fujin=this.option2[i].value;
                        this.data();
                    }
                }
            },
            onChange3(value){
                for(var i=0;i<this.option3.length;i++){
                    if(this.option3[i].value==value){
                        this.smart=value;
                        this.data();
                    }
                }
            },
            //筛选区域列表
            reg(){
                var idd = this.$util.getCache('idd');
                var adcode=parseInt(idd/100);
                var res = new RegExp('^' + adcode );
                if(this.option1.length==1){
                    for(let item in this.areaList){
                        if(item.match(res)){
                            this.option1.push({
                                text:this.areaList[item],
                                value:this.option1_value++,
                                id:item
                            })
                        }
                    }
                }
            },
            // 跳转特权详情
            getSpecial(id){
                this.$router.push({path:'/goodinfo',query:{id:id}});
            },
            // 搜索功能
            onSearch(val) {
                var postdata={
                    op:'tequan',
                    val:val,
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('good','POST',postdata,res=>{
                    this.list=res.data.list;
                },true)
            },
            //请求后台数据
            initData(){
                var loc = this.$util.getCache('loc');
                if( loc.lat ) this.lat=loc.lat;
                if( loc.lng ) this.lng=loc.lng;
                
                var postData={
                    op:'tequan',
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('good','GET',postData,res=>{
                    
                    this.inited = 1;
	                if( res && res.data ){    
                        this.list=res.data.list;
                        this.tabs=res.data.allsort;
                        this.tabs.unshift(
                            {name:'全部',id:0}
                        )
                        this.inited = 2;
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
	                	this.$toast(res.message);
                    }
                });
                this.isrefresh=false;
            }
        }
    }
</script>

<style type="text/css" scoped>
    /* 搜索框样式 */
        .search{
            width:100%;
        }
        .content /deep/ .van-tab{
            flex-basis: 18% !important;
        }
    /* 轮播图样式 */
        #main /deep/ .van-swipe{
            width:9.4rem;
            height:3rem;
            margin:0.2rem auto 0.2rem;
        } 
        .swipe_img{
            width:100%;
            height:3rem;
        }
    /* 特权商品展示 */
        .special_item{
            width:9.4rem;
            background-color: #fff;
            box-sizing: border-box;
            margin:0.22rem auto 0.22rem;
            display: flex;
            border-radius: 0.16rem;
        }
        .avater,.avater>img{
            width:2.6rem;
            height:2.6rem;
            border-radius: 0.16rem;
        }
        .avater{
            margin: 0.32rem 0 0 0.2rem;
        }
        .first_right{
            width:6.5rem;
            font-size: 0.32rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            box-sizing: border-box;
            margin:0.32rem 0 0 0.2rem;
            color:#999;
            padding-right: 0.3rem;
        }
        .first_right>div{
            margin-bottom:0.1rem;
        }
        .first_right_top{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
        }
        .special_class{
            width:20%;
            height:0.5rem;
            font-size: 0.25rem;
            font-weight: 500;
            text-align: center;
            line-height: 0.5rem;
            background-color: #000;
            color:#ff0;
            border-radius: 0.06rem;
        }
        .special_name{
            width:80%;
            font-size: 0.43rem;
            font-weight: 700;
            color:#333;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .area{
            width:100%;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
        }
        .km{
            color:#666;
        }
        .good1,.good2{
            width:100%;
            display: flex;
            justify-content: start;
            align-items: baseline;
            flex-wrap: nowrap;
        }
        .good2{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .good1_left{
            color:#FF301E;
        }
        .good1_left>font{
            font-weight: 700;
            font-size: 0.56rem;
        }
        .good1_right{
            margin-left: 0.3rem;
        }
        .shop_name{
            width:3.3rem;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .arrow{
            width: 0;
            height: 0;
            margin-top:0.2rem;
            border-left: 0.2rem solid #ccc;
            border-top: 0.2rem solid transparent;
            border-bottom: 0.2rem solid transparent;
        }
        .get{
            width:1.7rem;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            color:#fff;
            border-radius: 0.4rem;
            background: #FF301E;
        }
        .geted,.saled{
            width:1.7rem;
            height:0.8rem;
            text-align: center;
            line-height: 0.8rem;
            color:#fff;
            border-radius: 0.4rem;
            background: #999;
        }
        .classes{
            padding-top: 0.5rem;
        }
</style>