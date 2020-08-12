<template>
    <div>
        <div id="main">
            <img :src="url">
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                url:''
            }
        },
        created(){
            this.initData();
        },
        methods:{
            initData(){
                this.$util.http('admin','GET',{op:'addqr'},res=>{     
                    this.url=res.data.url;
                },true);
            },
        }
    }
</script>

<style scoped>
    #main{
        width:100%;
        height:17.785rem;
        background: url(http://ykd.lsh199.com/attachment/images/global/mobile/payposter.jpg) no-repeat;
        background-size: 100% 17.785rem;
        position: relative;
    }
    img{
        width:5.9rem;
        height:5.9rem;
        position: absolute;
        top:7.145rem;
        left:2.04rem;
    }
</style>