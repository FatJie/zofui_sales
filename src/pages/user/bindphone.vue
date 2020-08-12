<template>
    <div id="main">
        <div class="img">
            <img :src="imgPre+'/Cute@2x.png'">
        </div>
        <div class="field">
            <van-field v-model="phone_num" type="tel" placeholder="请输入手机号" />
            <van-field v-model="code" center clearable  placeholder="请输入短信验证码">
                <van-button slot="button" size="small" color="#FF301E" @click="getcode" :disabled="timedown > 0">{{timedown > 0 ? '剩余'+timedown+'秒' : '获取验证码'}}</van-button>
            </van-field>
        </div>
        <div class="for">为了保证您的账户安全，请绑定手机号</div>
        <div class="button">
            <van-button color="#ff301e" block @click="bind">立即绑定</van-button>
        </div>
    </div>
</template>

<script>
    import { Field,Button } from 'vant';
    export default{
        components:{
            [Field.name]:Field,
            [Button.name]:Button
        },
        data(){
            return{
                imgPre:'http://ykd.lsh199.com/attachment/images/global/mobile',
                phone_num:'',
                code:'',
                timedown:0
            }
        },
        methods:{
            bind(){
                var post={
                    op:'bangdingtel',
                    tel:this.phone_num,
                    code:this.code
                }
                this.$util.http('user','GET',post,res=>{
                    console.log(res);
                    console.log(res.errno);
                    console.log(res.message);
	            	if(res.errno==0){
                        this.$toast({
                            message:res.message,
                            onOpened:()=>{
                                this.$router.go(-1);
                            }
                        })
                    }else{
                        this.$toast(res.message);
                    }
	            });
            },
            getcode(){
	  			var self = this;
	  			if( this.timedown > 0 ) return false;
	  			var postdata = {
	  				op : 'getcodes',
	  				tel : this.phone_num,
	  			}

  				if( !postdata.tel || !this.$util.verify('mobile', postdata.tel ) ){
  					self.$toast('请正确填写手机号');return false;
  				}

	            self.$util.http('login','GET',postdata,function(res){
	            	self.$toast(res.message);
	                if( res.data && !res.errno ){
	                	self.timedown = 60;
	    				self.timedownfn();
	                }
	            },true);
            },
            timedownfn(){
	  			var self = this;
	  			self.timer = setInterval(function(){
	  				if( self.timedown <= 0 ){
	  					self.timedown = 0;
	  					clearInterval(self.timer);
	  					self.timer = null;
	  				}
	  				self.timedown -- ;
	  			},1000) 
	  		},
        }
    }
</script>

<style scoped>
    .button{
        width:9.4rem;
        margin: 0.5rem auto 0;
    }
    .img,.img>img{
        width:3.1rem;
        height:3.1rem;
    }
    .img{
        margin:2rem auto 1rem;
    }
    .field{
        width:9.4rem;
        margin:0 auto;
    }
    .for{
        width:9.4rem;
        margin:0.3rem auto 0;
        font-size:0.4rem ;
        font-weight: 500;
        color:rgba(255,48,30,.8);
    }
</style>