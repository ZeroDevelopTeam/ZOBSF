<template>
	<div class="platform-sys">
			<el-row class="sys-logo">
					<img src="../../../image/logo.png" />
			</el-row>
			<el-row>
				<el-col :span="16" class="sys-img">
					<img src="../../../image/login.png" />
				</el-col>
				<el-col :span="8">
						<el-form :model="loginForm" :rules="ruleLogin" ref="loginForm" label-position="left" label-width="0px" class="platform-login">
						    <h3 class="title">系统登录</h3>
						    <el-form-item prop="userCode">
						      <el-input type="text" v-model="loginForm.userCode" auto-complete="off" placeholder="账号">
						      	<template slot="prepend">
											<i class="fa fa-user-o" aria-hidden="true"></i>
										</template>
						      </el-input>
						    </el-form-item>
						    <el-form-item prop="userPsw">
						      <el-input type="password" v-model="loginForm.userPsw" auto-complete="off" placeholder="密码">
						      	<template slot="prepend">
											<i class="fa fa-lock" aria-hidden="true"></i>
										</template>
						      </el-input>
						    </el-form-item>
						    <el-form-item prop="valResult">
						      <el-input v-model="loginForm.valResult" auto-complete="off" placeholder="验证码">
						      	<template slot="prepend">
											<i class="fa fa-qrcode" aria-hidden="true"></i>
										</template>
						      	<template slot="append">
											<el-button type="primary" style="width:80px;" @click.native.prevent="renderCode" >{{expression}}</el-button>
										</template>
						      </el-input>
						    </el-form-item>
						    <el-form-item style="width:100%;">
						      <el-button type="danger" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
						    </el-form-item>
						  </el-form>
				</el-col>
				
			</el-row>
			<el-row class="footer-info">
					<el-col :span="24">
							<p>
									<a href="">网站协议</a><span>|</span><a href="">咨询反馈</a><span>|</span><a href="">联系我们</a><span>|</span><a href="">关于我们</a>
							</p>
							<p>
									Copyright © 2017 xxxx司（eGongSi.cn） All Rights Reserved. 
							</p>
							<p>
									京ICP备15060737号
							</p>
					</el-col>
			</el-row>
	</div>
  
</template>

<script>
  export default {
    data() {
    	const valResultFunc = (rule, value, callback) => {
		    const validateCode = this.validate;
		    if(value!= undefined){
		    	if (value.toString().toLowerCase() == validateCode.toString().toLowerCase()) {
		    		callback();
			    } else if (value != ''){
			    	callback(new Error('验证码输入错误，请重新输入'));
			    }
		    }else{
		    	callback();
		    }
			}
      return { 
        logining: false,  
        expression: '',
	      validate: '',
        loginForm: {
          userCode: '',
          userPsw: '',
          valResult:'',
        },
        ruleLogin: {
          userCode: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          userPsw: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          valResult: [
            { required: true, validator: valResultFunc,trigger: 'blur' },
          ]
        },
      };
    },
    methods: {
      login(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { userCode: this.loginForm.userCode, userPsw: this.loginForm.userPsw};
            this.$store.dispatch('requestLogin',loginParams).then((data) => {  
	              this.logining = false;
	              if (data.status == 200) {
	                sessionStorage.setItem('platformUser', JSON.stringify(data.user));
	                this.$router.push({ path: '/platform' });
	              } else {
	              	this.$message({
	                  message: data.msg,
	                  type: 'error'
	                });
	              }
		        });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      
      //验证码
      renderCode() {
			    //定义expression和result，expression是字符串，result可能是字符串也可能是数字
			    let expression = '';
			      let  result = '';
			        let codeNormal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';//字母库
			        for (var i =0; i < 4; i ++) {
			            result = result + codeNormal[Math.round(Math.random()*(codeNormal.length-1))];
			        }//随机获取字母四个
			        expression = result.toLowerCase();//忽略大小写
			    		//设置更新状态
			        this.expression= expression;
			        this.validate= result;
			}
		},
		mounted() {
			this.renderCode();
		},
		components: {
		}
}
</script>

<style lang="scss" scoped>
.platform-sys{
		margin: auto;
		.sys-logo{
				margin: 20px 80px;
		}
		.sys-img{
			padding-left: 20px;
		}
	.platform-login {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    float: right;
    margin: 80px 80px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }
  .footer-info{
  	text-align: center;
  	padding-top: 10px;
  	border-top: 2px solid #c7161c;
        span{
            margin-right: 25px;
            margin-left:25px;
        }
        a{
            color: #7d7d7d;
            text-decoration: none;
        }
        a:hover{
            color: #c7161c;
            text-decoration: none;
        }
    } 
}
  
</style>