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
                                <img class="swipe_img" src="http://ykd.lsh199.com/attachment/images/global/mobile/unlock.png">
                            </van-swipe-item>
                            <van-swipe-item>
                                <img class="swipe_img" src="http://ykd.lsh199.com/attachment/images/global/mobile/unlock.png">
                            </van-swipe-item>
                        </van-swipe>
                        <!-- 筛选 -->
                        <van-sticky :offset-top="offset">
                            <van-dropdown-menu>
                                <van-dropdown-item @change="onChange1" v-model="select1" :options="option1">
                                </van-dropdown-item>
                                <van-dropdown-item @change="onChange2" v-model="select2" :options="option2"/>
                                <!-- <van-dropdown-item @change="onChange3" v-model="select3" :options="option3"/> -->
                            </van-dropdown-menu>
                        </van-sticky>
                        <!-- 特权商品展示 -->
                        <van-pull-refresh v-model="isrefresh" @refresh="onRefresh" :head-height="80" success-text="已刷新" v-scroll="scrolltop" loading-text="加载中~">
                            <van-list v-model="loading" :immediate-check="false" :finished="finished" loading-text="加载中" finished-text="到底了" :offset="100" @load="onLoad">
                                <div class="shop_item" v-for="(item,index) in list" :key="index">
                                    <div @click="toShop(item.appurl)" style="display: flex;">
                                        <div class="avater">
                                            <img :src="item.headimg">
                                        </div>
                                        <div class="first_right">
                                            <div class="shop_name">{{item.name}}</div>
                                            <div class="shop_class"  v-if="item.promise == 1">诚信</div>
                                            <div class="shop_class"  v-if="item.authentication == 1">认证</div>
                                            <!-- <div class="rate">
                                                <font>休息中09:30营业</font>
                                            </div> -->
                                            <div class="area">
                                                <div><font>{{item.sortname}}</font> <font>{{item.country}}</font> <font>{{item.m}}</font></div>
                                                <div class="renqi">人气：{{item.times}}</div>
                                            </div>
                                            <div class="good1" v-if="item.tequan">
                                                <div class="good1_left">特</div>
                                                <div class="good1_right" style="width:4rem;"><font>{{item.tequan.oldprice}}</font> {{item.tequan.title}}</div>
                                            </div>
                                            <div class="good2" v-if="item.jingxuan">
                                                <div class="good2_left">精</div>
                                                <div class="good2_right">
                                                    <font class="good2_price">{{item.jingxuan.price}}元</font>
                                                    <font class="good2_oprice">{{item.jingxuan.oldprice}}元</font>
                                                    <font class="good2_intro">{{item.jingxuan.title}}</font>
                                                </div>
                                            </div>
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
                    { text: '人气最高', value: 3 }
                ],
                // option3:[
                //     { text: '筛选', value: 0 },
                //     { text: 'VIP特权', value: 1 },
                //     { text: '服务商特权', value: 2 },
                //     { text: '黑金特权', value: 3 }
                // ],
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
        beforeRouteEnter(to,from,next){
            next(vm=>{
                vm.reg();
            });
        },
        created(){
            if( this.inited && this.$route.meta.keepAlive ) return false;
            this.initData();
            this.$route.meta.keepAlive = true;
        },
        methods: {
            scrolltop(e){
                if(e>40){
                    this.scrolltabs=true;
                    this.swipes=false;
                    this.offset=window.innerWidth*0.117333;
                }else{
                    this.scrolltabs=false;
                    this.swipes=true;
                    this.offset=0;
                }
            },
            onRefresh(){
                location.reload();
            },
            onLoad() {
                var self = this;
                self.pages++;
                var post={
                    op:'list',
                    page:self.pages,
                    sortid:this.pid,          //产品分类id
                    text:this.text,        //产品类名
                    areaId:this.areaId,    //区域id
                    smartId:this.smart,    //智能排序id
                    fujin:this.fujin,       //附近id
                    lat:this.lat,
                    lng:this.lng
                }
	            self.$util.http('shop','GET',post,function(res){
                    if(res.data.list.length!=0 ){
                        self.list = self.list.concat(res.data.list);
                        self.loading=false;
                    }else{
                        self.finished=true;
                    }
	            },true);
	  		},
            //店铺详情跳转
            toShop(appurl){
                this.$router.push(appurl);
            },
            //筛选请求数据
            data(){
                var obj={
                    op:"list",
                    sortid:this.pid,          //产品分类id
                    text:this.text,        //产品类名
                    areaId:this.areaId,    //区域id
                    smartid:this.smart,    //特权筛选id
                    type:this.fujin,       //附近id
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('shop','GET',obj,res=>{
                    this.list=res.data.list;
                },true)
            },
            onClick(name, title) {
                this.scrolltabs=false;
                this.swipes=true;
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
            // onChange3(value){
            //     for(var i=0;i<this.option3.length;i++){
            //         if(this.option3[i].value==value){
            //             this.smart=value;
            //             this.data();
            //         }
            //     }
            // },
            //筛选区域列表
            reg(){
                var idd = this.$util.getCache('idd');
                console.log('idd+'+idd)
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
            // 搜索功能
            onSearch(val) {
                var postdata={
                    op:'list',
                    search:val,
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('shop','POST',postdata,res=>{
                    this.list=res.data.list;
                },true)
            },
            //请求后台数据
            initData(){
                var loc = this.$util.getCache('loc');
                if( loc.lat ) this.lat=loc.lat;
                if( loc.lng ) this.lng=loc.lng;
                
                var postData={
                    op:'list',
                    lat:this.lat,
                    lng:this.lng
                }
                this.$util.http('shop','GET',postData,res=>{
                    console.log(res);
                    this.inited = 1;
	                if( res && res.data ){        
                        this.list=res.data.list;
                        this.tabs=res.data.sort;
                        this.tabs.unshift(
                        {name:'全部',id:0}
                    )
	                	this.inited = 2;
	                }else{
	                	this.$toast(res.message);
                    }
                });
                // this.$util.http('good','GET',{op:'goodtype'},res=>{
                //     this.tabs=res.data.allsort;
                //     this.tabs.unshift(
                //         {name:'全部',id:0}
                //     )
                //     // var arr=res.data.allsort;
                //     // for(var i=0;i<arr.length;i++){
                //     //     this.tabs.push({
                //     //         name:arr[i].name,
                //     //         id:arr[i].id
                //     //     });
                //     // }
                // })
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
           height:2.5rem;
           margin:0.2rem auto 0.2rem;
       } 
       .swipe_img{
           width:100%;
           height:2.5rem;
       }
    /* 店铺展示样式 */
        .shop_item{
            width:9.4rem;
            background-color: #fff;
            box-sizing: border-box;
            margin:0.22rem auto 0.22rem;
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
            margin-bottom:0.2rem;
        }
        .shop_name{
            width:4rem;
            font-size: 0.43rem;
            font-weight: 700;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color:#0A0204;
        }
        .shop_class{
            width:0.8rem;
            height:0.5rem;
            font-size: 0.28rem;
            font-weight: 500;
            text-align: center;
            line-height: 0.45rem;
            background-color: #000;
            color:#ff0;
            border-radius: 0.06rem;
        }
        .rate{
            width:100%;
        }
        .comment{
            color:#666;
            font-weight: 500;
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
            flex-wrap: nowrap;
            align-items: center;
        }
        .good1_left,.good2_left{
            width:0.4rem;
            height:0.4rem;
            text-align: center;
            line-height: 0.4rem;
            padding: 1px;
            border-radius: 0.05rem;
            background: #FF6E40;
            color:#fff;
            font-weight: 500;
            margin-right: 0.2rem;
        }
        .good1_right,.good2_right{
            display: flex;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .good1_right>font{
            color:#FF6E40;
        }
        .good2_price{
            color:#FF6E40;
            font-weight: 500;
        }
        .good2_oprice{
            text-decoration: line-through;
        }
        .good2_intro{
            width:3rem;
            display: block;
        }
        .renqi{
            font-size: 0.32rem;
            color: #999999;
            font-weight: 500;
        }
</style>