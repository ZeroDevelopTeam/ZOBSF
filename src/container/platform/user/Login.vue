<template>
  <el-form :model="loginForm" :rules="ruleLogin" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
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
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
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
	                sessionStorage.setItem('user', JSON.stringify(data.user));
	                this.$router.push({ path: '/system/user' });
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
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
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
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>