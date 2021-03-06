import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
	//mode: 'history',
 	routes: [
        {
    		path : '/referrals',
    		name: 'referrals',
    		component: resolve => require(['@/pages/user/referrals'], resolve),
            meta : {
                keepAlive: true,
                title: '联系推荐人',
            }
        },
        {
    		path : '/chooseshop',
    		name: 'chooseshop',
    		component: resolve => require(['@/pages/shopmanage/chooseshop'], resolve),
            meta : {
                keepAlive: true,
                title: '商户中心',
            }
        },
        {
    		path : '/tixian',
    		name: 'tixian',
    		component: resolve => require(['@/pages/shopmanage/tixian'], resolve),
            meta : {
                keepAlive: true,
                title: '提现中心',
            }
        },
        {
    		path : '/staffmanage',
    		name: 'staffmanage',
    		component: resolve => require(['@/pages/shopmanage/staffmanage'], resolve),
            meta : {
                keepAlive: true,
                title: '店员管理',
            }
        },
        {
    		path : '/suretixian',
    		name: 'suretixian',
    		component: resolve => require(['@/pages/shopmanage/suretixian'], resolve),
            meta : {
                keepAlive: true,
                title: '提现中心',
            }
        },
        {
    		path : '/addcard',
    		name: 'addcard',
    		component: resolve => require(['@/pages/shopmanage/addcard'], resolve),
            meta : {
                keepAlive: true,
                title: '添加银行卡',
            }
        },
        {
    		path : '/editstaff',
    		name: 'editstaff',
    		component: resolve => require(['@/pages/shopmanage/editstaff'], resolve),
            meta : {
                keepAlive: true,
                title: '编辑店员',
            }
        },
        {
    		path : '/editshop',
    		name: 'editshop',
    		component: resolve => require(['@/pages/shopmanage/editshop'], resolve),
            meta : {
                keepAlive: true,
                title: '编辑店铺',
            }
        },
        {
    		path : '/shopverify',
    		name: 'shopverify',
    		component: resolve => require(['@/pages/shopmanage/shopverify'], resolve),
            meta : {
                keepAlive: true,
                title: '店铺认证',
            }
        },
        {
    		path : '/poster',
    		name: 'poster',
    		component: resolve => require(['@/pages/user/poster'], resolve),
            meta : {
                keepAlive: true,
                title: '海报分享',
            }
        },
        {
    		path : '/myconnection',
    		name: 'myconnection',
    		component: resolve => require(['@/pages/user/myconnection'], resolve),
            meta : {
                keepAlive: true,
                title: '我的人脉',
            }
        },
        {
    		path : '/rundata',
    		name: 'rundata',
    		component: resolve => require(['@/pages/admin/rundata'], resolve),
            meta : {
                keepAlive: true,
                title: '经营数据',
            }
        },
        {
    		path : '/onlineposter',
    		name: 'onlineposter',
    		component: resolve => require(['@/pages/admin/onlineposter'], resolve),
            meta : {
                keepAlive: true,
                title: '在线买单',
            }
        },
        {
    		path : '/onlinepay',
    		name: 'onlinepay',
    		component: resolve => require(['@/pages/ucard/onlinepay'], resolve),
            meta : {
                keepAlive: true,
                title: '在线买单',
            }
        },
        {
    		path : '/onlinepaying',
    		name: 'onlinepaying',
    		component: resolve => require(['@/pages/ucard/onlinepaying'], resolve),
            meta : {
                keepAlive: true,
                title: '在线买单',
            }
        },
        {
    		path : '/shopincome',
    		name: 'shopincome',
    		component: resolve => require(['@/pages/admin/shopincome'], resolve),
            meta : {
                keepAlive: true,
                title: '店铺营收',
            }
        },
        {
    		path : '/memberdetail',
    		name: 'memberdetail',
    		component: resolve => require(['@/pages/admin/memberdetail'], resolve),
            meta : {
                keepAlive: true,
                title: '会员详情',
            }
        },
        {
    		path : '/mymembers',
    		name: 'mymembers',
    		component: resolve => require(['@/pages/admin/mymembers'], resolve),
            meta : {
                keepAlive: true,
                title: '会员管理',
            }
    	},
        {
    		path : '/pubspecial',
    		name: 'pubspecial',
    		component: resolve => require(['@/pages/admin/pubspecial'], resolve),
            meta : {
                keepAlive: true,
                title: '发布特权',
            }
    	},
        {
    		path : '/pubgood',
    		name: 'pubgood',
    		component: resolve => require(['@/pages/admin/pubgood'], resolve),
            meta : {
                keepAlive: true,
                title: '发布商品',
            }
        },
        {
    		path : '/extension',
    		name: 'extension',
    		component: resolve => require(['@/pages/admin/extension'], resolve),
            meta : {
                keepAlive: true,
                title: ' 壹卡多免费吃喝玩乐嗨翻天！',
            }
        },
        {
    		path : '/extension2',
    		name: 'extension2',
    		component: resolve => require(['@/pages/admin/extension2'], resolve),
            meta : {
                keepAlive: true,
                title: ' 壹卡多免费吃喝玩乐嗨翻天！',
            }
    	},
        {
    		path : '/shopsuccess',
    		name: 'shopsuccess',
    		component: resolve => require(['@/pages/shop/shopsuccess'], resolve),
            meta : {
                keepAlive: true,
                title: '免费开店',
            }
    	},
        {
    		path : '/freeshop',
    		name: 'freeshop',
    		component: resolve => require(['@/pages/shop/freeshop'], resolve),
            meta : {
                keepAlive: true,
                title: '免费开店',
            }
    	},
        {
    		path : '/reddetails',
    		name: 'reddetails',
    		component: resolve => require(['@/pages/shop/reddetails'], resolve),
            meta : {
                keepAlive: true,
                title: '分红明细',
            }
    	},
        {
    		path : '/profitshop',
    		name: 'profitshop',
    		component: resolve => require(['@/pages/user/profitshop'], resolve),
            meta : {
                keepAlive: true,
                title: '权益店铺',
            }
    	},
        {
    		path : '/agent',
    		name: 'agent',
    		component: resolve => require(['@/pages/user/agent'], resolve),
            meta : {
                keepAlive: true,
                title: '我的权益',
            }
    	},
        {
    		path : '/cashdetails',
    		name: 'cashdetails',
    		component: resolve => require(['@/pages/user/cashdetails'], resolve),
            meta : {
                keepAlive: true,
                title: '账单明细',
            }
    	},
        {
    		path : '/openserver',
    		name: 'openserver',
    		component: resolve => require(['@/pages/ucard/openserver'], resolve),
            meta : {
                keepAlive: true,
                title: '订单支付',
            }
    	},
        {
    		path : '/topay',
    		name: 'topay',
    		component: resolve => require(['@/pages/ucard/topay'], resolve),
            meta : {
                keepAlive: true,
                title: '订单支付',
            }
        },
 		{
    		path : '',
    		name: 'index',
    		component: resolve => require(['@/pages/homes/index'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
    	},
        {
            path : '/page',
            name: 'page',
            component: resolve => require(['@/pages/homes/page'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
    	{
    		path : '/ucard',
    		name: 'ucard',
    		component: resolve => require(['@/pages/homes/ucard'], resolve),
            meta : {
                keepAlive: true,
                title: '壹卡多',
            }
    	},
    	{
    		path : '/shop',
    		name: 'shop',
    		component: resolve => require(['@/pages/homes/shop'], resolve),
            meta : {
                keepAlive: true,
                title: '壹卡多',
            }
    	},
    	{
    		path : '/comment',
    		name: 'comment',
    		component: resolve => require(['@/pages/homes/comment'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
    	},
    	{
    		path : '/user',
    		name: 'user',
    		component: resolve => require(['@/pages/homes/user'], resolve),
            meta : {
                keepAlive: true,
                title: '壹卡多',
            }
    	},
        {
            path : '/goodinfo',
            name: 'goodinfo',
            component: resolve => require(['@/pages/homes/goodinfo'], resolve),
            meta : {
                keepAlive: false,
                title: '',
                gid : 0,
                oldgid : -1,
            }
        },
        {
            path : '/goodsshare',
            name: 'goodsshare',
            component: resolve => require(['@/pages/homes/goodsshare'], resolve),
            meta : {
                keepAlive: false,
                title: '分享素材',
            }
        },
        {
            path : '/goodlist',
            name: 'goodlist',
            component: resolve => require(['@/pages/homes/goodlist'], resolve),
            meta : {
                keepAlive: false,
                title: '商品列表',
            }
        },
        {
            path : '/bindrecommend',
            name: 'bindrecommend',
            component: resolve => require(['@/pages/homes/bindrecommend'], resolve),
            meta : {
                keepAlive: true,
                title: '壹卡多',
            }
        },
        // {
        //     path : '/login',
        //     name: 'login',
        //     component: resolve => require(['@/pages/homes/login'], resolve),
        //     meta : {
        //         keepAlive: true,
        //         title: '登录',
        //     }
        // },
        {
            path: '/buycard',
            name: 'buycard',
            component: resolve => require(['@/pages/ucard/buycard'], resolve),
            meta : {
                keepAlive: true,
                title: '开通VIP',
            }
        },
        {
            path: '/buyserver',
            name: 'buyserver',
            component: resolve => require(['@/pages/ucard/buyserver'], resolve),
            meta : {
                keepAlive: true,
                title: '开通服务商',
            }
        },
        {
            path: '/ucardapply',
            name: 'ucardapply',
            component: resolve => require(['@/pages/ucard/ucardapply'], resolve),
            meta : {
                keepAlive: true,
                title: '申请会员',
            }
        },
        {
            path: '/upgrade',
            name: 'upgrade',
            component: resolve => require(['@/pages/ucard/upgrade'], resolve),
            meta : {
                keepAlive: true,
                title: '升级攻略',
            }
        },
        {
            path: '/codechange',
            name: 'codechange',
            component: resolve => require(['@/pages/ucard/codechange'], resolve),
            meta : {
                keepAlive: true,
                title: '激活码兑换',
            }
        },
        {
            path: '/codeextention',
            name: 'codeextention',
            component: resolve => require(['@/pages/ucard/codeextention'], resolve),
            meta : {
                keepAlive: true,
                title: '壹卡多',
            }
        },
        {
            path: '/orderconfirm',
            name: 'orderconfirm',
            component: resolve => require(['@/pages/order/orderconfirm'], resolve),
            meta : {
                keepAlive: false,
                title: '确认订单',
            }
        },
        {
            path: '/orderlist',
            name: 'orderlist',
            component: resolve => require(['@/pages/order/orderlist'], resolve),
            meta : {
                keepAlive: true,
                title: '订单列表',
            }
        },
        {
            path: '/orderinfo',
            name: 'orderinfo',
            component: resolve => require(['@/pages/order/orderinfo'], resolve),
            meta : {
                keepAlive: false,
                title: '订单详情',
            }
        },
        {
            path: '/orderaddress',
            name: 'orderaddress',
            component: resolve => require(['@/pages/order/orderaddress'], resolve),
            meta : {
                keepAlive: true,
                title: '地址',
            }
        },
        {
            path: '/orderaddaddress',
            name: 'orderaddaddress',
            component: resolve => require(['@/pages/order/orderaddaddress'], resolve),
            meta : {
                keepAlive: true,
                title: '添加地址',
            }
        },
        {
            path: '/collect',
            name: 'collect',
            component: resolve => require(['@/pages/user/collect'], resolve),
            meta : {
                keepAlive: true,
                title: '收藏',
            }
        },
        {
            path: '/bindphone',
            name: 'bindphone',
            component: resolve => require(['@/pages/user/bindphone'], resolve),
            meta : {
                keepAlive: true,
                title: '绑定手机号',
            }
        },
        {
            path: '/cutmylist',
            name: 'cutmylist',
            component: resolve => require(['@/pages/cut/cutmylist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的砍价',
            }
        },
        {
            path: '/cutlist',
            name: 'cutlist',
            component: resolve => require(['@/pages/cut/cutlist'], resolve),
            meta : {
                keepAlive: true,
                title: '砍价活动',
            }
        },
        {
            path: '/groupinfo',
            name: 'groupinfo',
            component: resolve => require(['@/pages/group/groupinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '拼团详情',
            }
        },
        {
            path: '/groupindex',
            name: 'groupindex',
            component: resolve => require(['@/pages/group/groupindex'], resolve),
            meta : {
                keepAlive: true,
                title: '拼团活动',
            }
        },
        {
            path: '/groupmylist',
            name: 'groupmylist',
            component: resolve => require(['@/pages/group/groupmylist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的拼团',
            }
        },
        {
            path: '/cardinfo',
            name: 'cardinfo',
            component: resolve => require(['@/pages/card/cardinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/cardmyinfo',
            name: 'cardmyinfo',
            component: resolve => require(['@/pages/card/cardmyinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/cardmylist',
            name: 'cardmylist',
            component: resolve => require(['@/pages/card/cardmylist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的优惠券',
            }
        },
        {
            path: '/cardlist',
            name: 'cardlist',
            component: resolve => require(['@/pages/card/cardlist'], resolve),
            meta : {
                keepAlive: true,
                title: '领券中心',
            }
        },
        {
            path: '/helplist',
            name: 'helplist',
            component: resolve => require(['@/pages/user/helplist'], resolve),
            meta : {
                keepAlive: true,
                title: '帮助中心',
            }
        },
        {
            path: '/helpinfo',
            name: 'helpinfo',
            component: resolve => require(['@/pages/user/helpinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/aboutindex',
            name: 'aboutindex',
            component: resolve => require(['@/pages/user/aboutindex'], resolve),
            meta : {
                keepAlive: true,
                title: '关于我们',
            }
        },
        {
            path: '/mymoney',
            name: 'mymoney',
            component: resolve => require(['@/pages/user/mymoney'], resolve),
            meta : {
                keepAlive: true,
                title: '我的资金',
            }
        },
        {
            path: '/moneybag',
            name: 'moneybag',
            component: resolve => require(['@/pages/user/moneybag'], resolve),
            meta : {
                keepAlive: true,
                title: '我的钱包',
            }
        },
        {
            path: '/useraddm',
            name: 'useraddm',
            component: resolve => require(['@/pages/user/useraddm'], resolve),
            meta : {
                keepAlive: true,
                title: '充值中心',
            }
        },
        {
            path: '/userset',
            name: 'userset',
            component: resolve => require(['@/pages/user/userset'], resolve),
            meta : {
                keepAlive: true,
                title: '设置',
            }
        },
        {
            path: '/sortsearch',
            name: 'sortsearch',
            component: resolve => require(['@/pages/sort/sortsearch'], resolve),
            meta : {
                keepAlive: true,
                title: '搜索',
            }
        },
        {
            path: '/sortindex',
            name: 'sortindex',
            component: resolve => require(['@/pages/sort/sortindex'], resolve),
            meta : {
                keepAlive: true,
                title: '商品列表',
            }
        },

        {
            path: '/fenchenindex',
            name: 'fenchenindex',
            component: resolve => require(['@/pages/fenchen/fenchenindex'], resolve),
            meta : {
                keepAlive: true,
                title: '分成中心',
            }
        },
        {
            path: '/fenchenlog',
            name: 'fenchenlog',
            component: resolve => require(['@/pages/fenchen/fenchenlog'], resolve),
            meta : {
                keepAlive: true,
                title: '分成记录',
            }
        },
        {
            path: '/fenchenrule',
            name: 'fenchenrule',
            component: resolve => require(['@/pages/fenchen/fenchenrule'], resolve),
            meta : {
                keepAlive: true,
                title: '分成规则',
            }
        },

        {
            path: '/fenxiaoindex',
            name: 'fenxiaoindex',
            component: resolve => require(['@/pages/fenxiao/fenxiaoindex'], resolve),
            meta : {
                keepAlive: true,
                title: '店铺',
            }
        },
        {
            path: '/fenxiaouser',
            name: 'fenxiaouser',
            component: resolve => require(['@/pages/fenxiao/fenxiaouser'], resolve),
            meta : {
                keepAlive: true,
                title: '结算中心',
            }
        },
        {
            path: '/mypromot',
            name: 'mypromot',
            component: resolve => require(['@/pages/fenxiao/mypromot'], resolve),
            meta : {
                keepAlive: true,
                title: '我的推广',
            }
        },
        {
            path: '/fenxiaogoods',
            name: 'fenxiaogoods',
            component: resolve => require(['@/pages/fenxiao/fenxiaogoods'], resolve),
            meta : {
                keepAlive: true,
                title: '商品',
            }
        },
        {
            path: '/fenxiaobill',
            name: 'fenxiaobill',
            component: resolve => require(['@/pages/fenxiao/fenxiaobill'], resolve),
            meta : {
                keepAlive: true,
                title: '账单',
            }
        },
        {
            path: '/fenxiaorank',
            name: 'fenxiaorank',
            component: resolve => require(['@/pages/fenxiao/fenxiaorank'], resolve),
            meta : {
                keepAlive: true,
                title: '排行榜',
            }
        },
        {
            path: '/fenxiaomyteam',
            name: 'fenxiaomyteam',
            component: resolve => require(['@/pages/fenxiao/fenxiaomyteam'], resolve),
            meta : {
                keepAlive: true,
                title: '我的团队',
            }
        },
        {
            path: '/fenxiaoget_money',
            name: 'fenxiaoget_money',
            component: resolve => require(['@/pages/fenxiao/fenxiaoget_money'], resolve),
            meta : {
                keepAlive: true,
                title: '提现',
            }
        },
        {
            path: '/fenxiaocheckbill',
            name: 'fenxiaocheckbill',
            component: resolve => require(['@/pages/fenxiao/fenxiaocheckbill'], resolve),
            meta : {
                keepAlive: true,
                title: '资金明细',
            }
        },
        {
            path: '/fenxiaoaliaccount',
            name: 'fenxiaoaliaccount',
            component: resolve => require(['@/pages/fenxiao/fenxiaoaliaccount'], resolve),
            meta : {
                keepAlive: true,
                title: '提现账户',
            }
        },
        {
            path: '/fenxiaoorder_record',
            name: 'fenxiaoorder_record',
            component: resolve => require(['@/pages/fenxiao/fenxiaoorder_record'], resolve),
            meta : {
                keepAlive: true,
                title: '订单记录',
            }
        },
        {
            path: '/fenxiaocard_record',
            name: 'fenxiaocard_record',
            component: resolve => require(['@/pages/fenxiao/fenxiaocard_record'], resolve),
            meta : {
                keepAlive: true,
                title: '推广记录',
            }
        },
        {
            path: '/fenxiaoinvite_shop',
            name: 'fenxiaoinvite_shop',
            component: resolve => require(['@/pages/fenxiao/fenxiaoinvite_shop'], resolve),
            meta : {
                keepAlive: true,
                title: '邀请',
            }
        },
        {
            path: '/fenxiaojoinPartner',
            name: 'fenxiaojoinPartner',
            component: resolve => require(['@/pages/fenxiao/fenxiaojoinPartner'], resolve),
            meta : {
                keepAlive: true,
                title: '提交申请',
            }
        },
        {
            path: '/jifenindex',
            name: 'jifenindex',
            component: resolve => require(['@/pages/jifen/jifenindex'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/jifengoods',
            name: 'jifengoods',
            component: resolve => require(['@/pages/jifen/jifengoods'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/jifenlog',
            name: 'jifenlog',
            component: resolve => require(['@/pages/jifen/jifenlog'], resolve),
            meta : {
                keepAlive: true,
                title: '记录',
            }
        },
        {
            path: '/jifenorder',
            name: 'jifenorder',
            component: resolve => require(['@/pages/jifen/jifenorder'], resolve),
            meta : {
                keepAlive: true,
                title: '我的订单',
            }
        },
        {
            path: '/article',
            name: 'article',
            component: resolve => require(['@/pages/article/article'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/commentinfo',
            name: 'commentinfo',
            component: resolve => require(['@/pages/comment/commentinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/commentorder',
            name: 'commentorder',
            component: resolve => require(['@/pages/comment/commentorder'], resolve),
            meta : {
                keepAlive: true,
                title: '评论',
            }
        },

        {
            path: '/actindex',
            name: 'actindex',
            component: resolve => require(['@/pages/act/actindex'], resolve),
            meta : {
                keepAlive: true,
                title: '活动',
            }
        },
        {
            path: '/killindex',
            name: 'killindex',
            component: resolve => require(['@/pages/kill/killindex'], resolve),
            meta : {
                keepAlive: true,
                title: '秒杀',
            }
        },
        {
            path: '/lotteryindex',
            name: 'lotteryindex',
            component: resolve => require(['@/pages/lottery/lotteryindex'], resolve),
            meta : {
                keepAlive: true,
                title: '抽奖',
            }
        },
        {
            path: '/lotterycount',
            name: 'lotterycount',
            component: resolve => require(['@/pages/lottery/lotterycount'], resolve),
            meta : {
                keepAlive: true,
                title: '订单详情',
            }
        },
        {
            path: '/lotteryjoined',
            name: 'lotteryjoined',
            component: resolve => require(['@/pages/lottery/lotteryjoined'], resolve),
            meta : {
                keepAlive: true,
                title: '参与记录',
            }
        },
        {
            path: '/lotteryrule',
            name: 'lotteryrule',
            component: resolve => require(['@/pages/lottery/lotteryrule'], resolve),
            meta : {
                keepAlive: true,
                title: '抽奖规则',
            }
        },
        {
            path: '/quickindex',
            name: 'quickindex',
            component: resolve => require(['@/pages/quick/quickindex'], resolve),
            meta : {
                keepAlive: true,
                title: '抢购中心',
            }
        },
        {
            path: '/shopdetails',
            name: 'shopdetails',
            component: resolve => require(['@/pages/shop/shopdetails'], resolve),
            meta : {
                keepAlive: true,
                title: '店铺详情',
            }
        },
        {
            path: '/shopenter',
            name: 'shopenter',
            component: resolve => require(['@/pages/shop/shopenter'], resolve),
            meta : {
                keepAlive: true,
                title: '商铺入驻',
            }
        },
        {
            path: '/shopprofit',
            name: 'shopprofit',
            component: resolve => require(['@/pages/shop/shopprofit'], resolve),
            meta : {
                keepAlive: true,
                title: '我的权益',
            }
        },
        {
            path: '/shopinfo',
            name: 'shopinfo',
            component: resolve => require(['@/pages/shop/shopinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/shopjoin',
            name: 'shopjoin',
            component: resolve => require(['@/pages/shop/shopjoin'], resolve),
            meta : {
                keepAlive: true,
                title: '入驻',
            }
        },
        {
            path: '/shoplist',
            name: 'shoplist',
            component: resolve => require(['@/pages/shop/shoplist'], resolve),
            meta : {
                keepAlive: true,
                title: '商家列表',
            }
        },
        {
            path: '/memberbag',
            name: 'memberbag',
            component: resolve => require(['@/pages/shop/memberbag'], resolve),
            meta : {
                keepAlive: true,
                title: '会员礼包',
            }
        },
        {
            path: '/speciallist',
            name: 'speciallist',
            component: resolve => require(['@/pages/shop/speciallist'], resolve),
            meta : {
                keepAlive: true,
                title: '会员特权',
            }
        },
        {
            path: '/hexiaodone',
            name: 'hexiaodone',
            component: resolve => require(['@/pages/shop/hexiaodone'], resolve),
            meta : {
                keepAlive: true,
                title: '核销完成',
            }
        },
        {
            path: '/specialdetail',
            name: 'specialdetail',
            component: resolve => require(['@/pages/shop/specialdetail'], resolve),
            meta : {
                keepAlive: true,
                title: '特权详情',
            }
        },
        {
            path: '/specialinfo',
            name: 'specialinfo',
            component: resolve => require(['@/pages/shop/specialinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '商品详情',
            }
        },
        {
            path: '/finelist',
            name: 'finelist',
            component: resolve => require(['@/pages/shop/finelist'], resolve),
            meta : {
                keepAlive: true,
                title: '会员精选',
            }
        },
        {
            path: '/shoprule',
            name: 'shoprule',
            component: resolve => require(['@/pages/shop/shoprule'], resolve),
            meta : {
                keepAlive: true,
                title: '入驻规则',
            }
        },
        {
            path: '/redbaglist',
            name: 'redbaglist',
            component: resolve => require(['@/pages/redbag/redbaglist'], resolve),
            meta : {
                keepAlive: true,
                title: '红包',
            }
        },
        {
            path: '/redbagmylist',
            name: 'redbagmylist',
            component: resolve => require(['@/pages/redbag/redbagmylist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的红包',
            }
        },
        {
            path: '/redbaginfo',
            name: 'redbaginfo',
            component: resolve => require(['@/pages/redbag/redbaginfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },

        {
            path: '/agentexplain',
            name: 'agentexplain',
            component: resolve => require(['@/pages/agent/agentexplain'], resolve),
            meta : {
                keepAlive: true,
                title: '说明',
            }
        },
        {
            path: '/agentjoin',
            name: 'agentjoin',
            component: resolve => require(['@/pages/agent/agentjoin'], resolve),
            meta : {
                keepAlive: true,
                title: '加入',
            }
        },
        {
            path: '/agentindex',
            name: 'agentindex',
            component: resolve => require(['@/pages/agent/agentindex'], resolve),
            meta : {
                keepAlive: true,
                title: '代理中心',
            }
        },
        {
            path: '/agentinvite',
            name: 'agentinvite',
            component: resolve => require(['@/pages/agent/agentinvite'], resolve),
            meta : {
                keepAlive: true,
                title: '发展商户',
            }
        },
        {
            path: '/agentmlog',
            name: 'agentmlog',
            component: resolve => require(['@/pages/agent/agentmlog'], resolve),
            meta : {
                keepAlive: true,
                title: '资金记录',
            }
        },
        {
            path: '/agentshoplist',
            name: 'agentshoplist',
            component: resolve => require(['@/pages/agent/agentshoplist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的商户',
            }
        },
        {
            path: '/jiziindex',
            name: 'jiziindex',
            component: resolve => require(['@/pages/jizi/jiziindex'], resolve),
            meta : {
                keepAlive: true,
                title: '集字活动',
            }
        },
        {
            path: '/jiziinfo',
            name: 'jiziinfo',
            component: resolve => require(['@/pages/jizi/jiziinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/signindex',
            name: 'signindex',
            component: resolve => require(['@/pages/sign/signindex'], resolve),
            meta : {
                keepAlive: true,
                title: '签到活动',
            }
        },
        {
            path: '/signinfo',
            name: 'signinfo',
            component: resolve => require(['@/pages/sign/signinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/signmysign',
            name: 'signmysign',
            component: resolve => require(['@/pages/sign/signmysign'], resolve),
            meta : {
                keepAlive: true,
                title: '我的签到',
            }
        },
        {
            path: '/webadminverify',
            name: 'webadminverify',
            component: resolve => require(['@/pages/webadmin/webadminverify'], resolve),
            meta : {
                keepAlive: true,
                title: '审核',
            }
        },
        {
            path: '/adminbindadmin',
            name: 'adminbindadmin',
            component: resolve => require(['@/pages/admin/adminbindadmin'], resolve),
            meta : {
                keepAlive: true,
                title: '绑定管理员',
            }
        },
        {
            path: '/adminbhelplist',
            name: 'adminbhelplist',
            component: resolve => require(['@/pages/adminb/adminbhelplist'], resolve),
            meta : {
                keepAlive: true,
                title: '帮助中心',
            }
        },
        {
            path: '/addshopmoney',
            name: 'addshopmoney',
            component: resolve => require(['@/pages/adminb/addshopmoney'], resolve),
            meta : {
                keepAlive: true,
                title: '充值',
            }
        },
        {
            path: '/admincardlog',
            name: 'admincardlog',
            component: resolve => require(['@/pages/adminb/cardlog'], resolve),
            meta : {
                keepAlive: true,
                title: '领取记录',
            }
        },
        {
            path: '/adminhexiao',
            name: 'adminhexiao',
            component: resolve => require(['@/pages/admin/adminhexiao'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/adminhexiaocard',
            name: 'adminhexiaocard',
            component: resolve => require(['@/pages/admin/adminhexiaocard'], resolve),
            meta : {
                keepAlive: true,
                title: '核销卡券',
            }
        },
        {
            path: '/adminindex',
            name: 'adminindex',
            component: resolve => require(['@/pages/admin/adminindex'], resolve),
            meta : {
                keepAlive: true,
                title: '商户中心',
            }
        },
        {
            path: '/adminlogin',
            name: 'adminlogin',
            component: resolve => require(['@/pages/admin/adminlogin'], resolve),
            meta : {
                keepAlive: true,
                title: '登录',
            }
        },
        {
            path: '/adminmoney',
            name: 'adminmoney',
            component: resolve => require(['@/pages/admin/adminmoney'], resolve),
            meta : {
                keepAlive: true,
                title: '资金记录',
            }
        },
        {
            path: '/adminorder',
            name: 'adminorder',
            component: resolve => require(['@/pages/admin/adminorder'], resolve),
            meta : {
                keepAlive: true,
                title: '订单记录',
            }
        },
        {
    		path : '/adminshop',
    		name: 'adminshop',
    		component: resolve => require(['@/pages/admin/adminshop'], resolve),
            meta : {
                keepAlive: true,
                title: '门店运营',
            }
        },
        {
    		path : '/adminmine',
    		name: 'adminmine',
    		component: resolve => require(['@/pages/admin/adminmine'], resolve),
            meta : {
                keepAlive: true,
                title: '门店中心',
            }
    	},
        {
            path: '/admingoods',
            name: 'admingoods',
            component: resolve => require(['@/pages/admin/admingoods'], resolve),
            meta : {
                keepAlive: true,
                title: '商品管理',
            }
        },
        {
            path: '/adminpub',
            name: 'adminpub',
            component: resolve => require(['@/pages/admin/adminpub'], resolve),
            meta : {
                keepAlive: true,
                title: '发布商品',
            }
        },
        {
            path: '/adminorderinfo',
            name: 'adminorderinfo',
            component: resolve => require(['@/pages/admin/adminorderinfo'], resolve),
            meta : {
                keepAlive: true,
                title: '订单详情',
            }
        },
        {
            path: '/adminpay',
            name: 'adminpay',
            component: resolve => require(['@/pages/admin/adminpay'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/adminset',
            name: 'adminset',
            component: resolve => require(['@/pages/admin/adminset'], resolve),
            meta : {
                keepAlive: true,
                title: '设置',
            }
        },
        {
            path: '/adminsignin',
            name: 'adminsignin',
            component: resolve => require(['@/pages/admin/adminsignin'], resolve),
            meta : {
                keepAlive: true,
                title: '签到',
            }
        },
        {
            path: '/adminbaddcard',
            name: 'adminsignin',
            component: resolve => require(['@/pages/adminb/adminbaddcard'], resolve),
            meta : {
                keepAlive: true,
                title: '添加卡券',
            }
        },
        {
            path: '/adminbcard',
            name: 'adminbcard',
            component: resolve => require(['@/pages/adminb/adminbcard'], resolve),
            meta : {
                keepAlive: true,
                title: '优惠券',
            }
        },
        {
            path: '/admindraw',
            name: 'admindraw',
            component: resolve => require(['@/pages/admin/admindraw'], resolve),
            meta : {
                keepAlive: true,
                title: '提现',
            }
        },
        {
            path: '/adminbadmin',
            name: 'adminbadmin',
            component: resolve => require(['@/pages/adminb/adminbadmin'], resolve),
            meta : {
                keepAlive: true,
                title: '管理人员',
            }
        },
        {
            path: '/cardredbag',
            name: 'cardredbag',
            component: resolve => require(['@/pages/adminb/cardredbag'], resolve),
            meta : {
                keepAlive: true,
                title: '优惠券红包',
            }
        },
        
        {
            path: '/adminjifenadd',
            name: 'adminjifenadd',
            component: resolve => require(['@/pages/admin/jifenadd'], resolve),
            meta : {
                keepAlive: true,
                title: '充值',
            }
        },
        {
            path: '/adminjifenlog',
            name: 'adminjifenlog',
            component: resolve => require(['@/pages/admin/jifenlog'], resolve),
            meta : {
                keepAlive: true,
                title: '记录',
            }
        },
        {
            path: '/adminjifengive',
            name: 'adminjifengive',
            component: resolve => require(['@/pages/admin/jifengive'], resolve),
            meta : {
                keepAlive: true,
                title: '赠送',
            }
        },
        {
            path: '/adminjifenget',
            name: 'adminjifenget',
            component: resolve => require(['@/pages/admin/jifenget'], resolve),
            meta : {
                keepAlive: true,
                title: '领取',
            }
        },
        {
            path: '/zhuanpan',
            name: 'zhuanpan',
            component: resolve => require(['@/pages/zhuanpan/zhuanpan'], resolve),
            meta : {
                keepAlive: true,
                title: '抽奖',
            }
        },
        {
            path: '/zhuanpanlog',
            name: 'zhuanpanlog',
            component: resolve => require(['@/pages/zhuanpan/zhuanpanlog'], resolve),
            meta : {
                keepAlive: true,
                title: '中奖记录',
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: resolve => require(['@/pages/homes/cart'], resolve),
            meta : {
                keepAlive: true,
                title: '购物车',
            }
        },
        {
            path: '/kefuindex',
            name: 'kefuindex',
            component: resolve => require(['@/pages/kefu/kefuindex'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/kefulist',
            name: 'kefulist',
            component: resolve => require(['@/pages/kefu/kefulist'], resolve),
            meta : {
                keepAlive: true,
                title: '会话列表',
            }
        },
        {
            path: '/yhmindex',
            name: 'yhmindex',
            component: resolve => require(['@/pages/yhm/yhmindex'], resolve),
            meta : {
                keepAlive: true,
                title: '优惠码',
            }
        },
        {
            path: '/yhminfo',
            name: 'yhminfo',
            component: resolve => require(['@/pages/yhm/yhminfo'], resolve),
            meta : {
                keepAlive: true,
                title: '优惠码详情',
            }
        },
        {
            path: '/vedioindex',
            name: 'vedioindex',
            component: resolve => require(['@/pages/vedio/vedioindex'], resolve),
            meta : {
                keepAlive: true,
                title: '视频区',
            }
        },
        {
            path: '/vediolist',
            name: 'list',
            component: resolve => require(['@/pages/vedio/list'], resolve),
            meta : {
                keepAlive: true,
                title: '视频',
            }
        },
        {
            path: '/art',
            name: 'art',
            component: resolve => require(['@/pages/article/art'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/artlist',
            name: 'artlist',
            component: resolve => require(['@/pages/article/artlist'], resolve),
            meta : {
                keepAlive: true,
                title: '文章列表',
            }
        },
        {
            path: '/questindex',
            name: 'questindex',
            component: resolve => require(['@/pages/quest/index'], resolve),
            meta : {
                keepAlive: true,
                title: '问答列表',
            }
        },
        {
            path: '/questinfo',
            name: 'questinfo',
            component: resolve => require(['@/pages/quest/info'], resolve),
            meta : {
                keepAlive: true,
                title: '',
            }
        },
        {
            path: '/questmylist',
            name: 'questmylist',
            component: resolve => require(['@/pages/quest/mylist'], resolve),
            meta : {
                keepAlive: true,
                title: '我的问答',
            }
        },
        {
            path: '/questpub',
            name: 'questpub',
            component: resolve => require(['@/pages/quest/pub'], resolve),
            meta : {
                keepAlive: true,
                title: '提问',
            }
        },
        {
            path: '/sortsort',
            name: 'sortsort',
            component: resolve => require(['@/pages/sort/sortsort'], resolve),
            meta : {
                keepAlive: true,
                title: '分类',
            }
        },
      ],
      scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
      }
})
