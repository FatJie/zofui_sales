// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';  

import Es6Promise from 'es6-promise';

Es6Promise.polyfill();

require('es6-promise').polyfill();

import Vue from 'vue'
import App from './App'
import router from './router'


import VueResource from 'vue-resource'
Vue.use(VueResource)

import { Lazyload } from 'vant';
Vue.use(Lazyload);

Vue.config.productionTip = false

import Common from './assets/js/Common.js'
Vue.use(Common)

import './assets/css/Common.css'

// 复制插件
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)


import loading from './components/loading';
Vue.component('loading',loading);

import wx from 'weixin-js-sdk';

// 阻止多次下拉刷新 这个方式重复加载
Vue.directive('scroll',{
    inserted: function (el,binding,vnode,oldVnode) {
        let cb_name = binding.expression,
        cb = vnode.context[cb_name];
        let sctop = 0;
        window.addEventListener('scroll',function(){
            sctop = document.documentElement.scrollTop;
            if( sctop <= 0 ) sctop = document.body.scrollTop;
            if( sctop <= 0 ) sctop = window.pageYOffset;
            try{
                cb && cb(sctop);
            }catch(error){
                console.log(error)
            }
        })
    }
})


function setRem () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function() {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
        });
    }
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    //htmlDom.style.fontSize = htmlWidth/22.86 + 'px';
    htmlWidth = htmlWidth > 640 ? 640 : htmlWidth;
    var htmlFontSize = htmlWidth * 37.5 / 375;
    htmlDom.style.fontSize = htmlFontSize + 'px';
}
setRem();
window.onresize = function () {
    setRem()
}

//阻止修改默认字体大小
// (function() {
    // if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    //     handleFontSize();
    // } else {
    //     document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    // }
    // function handleFontSize() {
    //     // 设置网页字体为默认大小
    //     WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
    //     // 重写设置网页字体大小的事件
    //     WeixinJSBridge.on('menu:setfont', function() {
    //         WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
    //     });
    // }
//  })();

router.beforeEach((to,from,next)=>{
    window.document.title = to.meta.title
    next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
