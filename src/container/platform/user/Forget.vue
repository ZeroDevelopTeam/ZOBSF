<template>
	<div class="platform-forget">
		<el-row class="sys-logo">
				<img src="../../../image/logo.png" />
		</el-row>
		<section class="forget">
			<el-card class="box-card">
			  	<div slot="header">
			  		<strong class="title">{{$route.name}}</strong>
			  		<span>
				    	<el-steps class="regist-step" :space="300" :align-center="alignCenter" :center="center" :active="active" finish-status="success">
						  	<el-step title="邮箱验证" description="根据邮箱账号进行验证"></el-step>
						 	<el-step title="重设密码" description="重设用户密码"></el-step>
						 	<el-step title="重设密码成功" description="重设密码成功，请牢记您的新密码！"></el-step>
						</el-steps>
				    </span>
			  	</div>
			  
			  	<div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step1">
				    <!--新增界面-->
					<el-form :model="validateEmailForm" :rules="validateEmailFormRules" ref="validateEmailForm">
						<el-form-item label="用户邮箱" prop="email" :label-width="formLabelWidth">
							<el-input v-model="validateEmailForm.email">
								<template slot="append">
									<el-button type="primary" @click.native="toEmail" :loading="addLoading">发送验证码</el-button>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
							<el-input v-model="validateEmailForm.code"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="footer-button">
						<el-button type="primary" @click.native="nextStep" :loading="addLoading">下一步</el-button>
					</div>
			  	</div>
			  
			  	<!--邮箱验证 -->
			    <div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step2">
				    <el-form :model="pswForm" :rules="pswRule" ref="pswForm">
					    <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPsw">
					      	<el-input type="password" v-model="pswForm.newPsw" auto-complete="off">
						      	<template slot="append" v-if="showTexts">
									<font :color="colors">{{showTexts}}</font>
								</template>
					      	</el-input>
					    </el-form-item>
					    <el-form-item label="确认密码" :label-width="formLabelWidth" prop="reNewPsw">
					      	<el-input type="password" v-model="pswForm.reNewPsw" auto-complete="off"></el-input>
					    </el-form-item>
					</el-form>
					<div slot="footer" class="footer-button">
						<el-button type="primary" @click.native="PreStep" :loading="addLoading">上一步</el-button>
						<el-button type="primary" @click.native="addSubmit" :loading="addLoading">下一步</el-button>
					</div>
			  	</div>
			  	
			  	<!--注册成功 -->
			  	<div class="text item" style="width: 450px;text-align: center;margin: auto;" v-if="step3">
					<el-alert
					    title="重设密码成功"
					    type="success"
					    description="重设密码成功，请牢记您的新密码！！"
					    show-icon>
					</el-alert>
					<div slot="footer" class="footer-button">
						<el-button type="primary" @click.native="complete" :loading="addLoading">完成</el-button>
					</div>
				</div>
			</el-card>
		</section>
		
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
import { mapGetters } from 'vuex'
  export default {
		computed: {
		 ...mapGetters([
		 		'userList'
   			])
	    },
		data() {
		    //密码校验
			 const validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		        	this.passwordStrong(value);
		          if (this.addForm.reUserPsw !== '') {
		            this.$refs.addForm.validateField('reUserPsw');
		          }
		          callback();
		        }
		      };
		      //确认密码校验
		      const validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.addForm.userPsw) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
			return {
				step1:true,
				step2:false,
				step3:false,
				alignCenter:true,
				center:true,
				active:1,
				formLabelWidth: '120px',
				addLoading:false,
				showTexts:'',
				colors:'',
				//邮箱验证规则
				validateEmailFormRules: {
/*					email: [
						{ required: true, message: '请输入邮箱', trigger: 'change' },
						{ type: 'email', message: '请输入正确的邮箱地址（例如：123456@163.com）', trigger: 'blur,change' }
					],
*/					code: [
						{ required: true, message: '请选择验证码', trigger: 'change' }
					]
				},
				pswRule: {
			        newPsw: [
			            { required: true, validator: validatePass, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位新密码'}
			        ],
			        reNewPsw: [
			            { required: true, validator: validatePass2, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位确认密码'}
			        ]
		        },
				//邮箱验证数据
				validateEmailForm:{
					email:'123456@163.com',
					code:'123',
				},
				pswForm: {
					newPsw: '',
					reNewPsw: '',
				},
			}
		},
		methods: {
			/**
			 * 密码强度校验
			 * param value 密码
			 */
			passwordStrong(value){
				//密码为八位及以上并且字母数字特殊字符三项都包括
		     	const strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
		   		//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
		     	const mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
		     	const enoughRegex = new RegExp("(?=.{6,}).*", "g");
		     	this.password_length = value.length;
		     	if(value && value.length>5 && value.length<17){
		     		if (strongRegex.test(value)) {
			        	this.showTexts='强';
			        	this.colors='green'
		     		} else if (mediumRegex.test(value)) {
			        	this.showTexts='中';
			        	this.colors='blue'
				     } else {
			        	this.showTexts='弱';
			        	this.colors='red'
				    }
				     
		     	}else{
		        	this.showTexts='';
		     	}
			},
			nextStep(){
				this.$refs.validateEmailForm.validate((valid) => {
					console.log(valid);
					if (valid) {
						this.active++;
						this.step1=false;
						this.step2=true;
						this.step3=false;
					}
				});
			},
			PreStep(){
				this.active--;
				this.step1=true;
				this.step2=false;
				this.step3=false;
			},
			toEmail(){
				this.$message('发送验证码');
			},
			complete(){
				this.$router.push({ path: '/platform' });
			},
			//修改密码
			changePsw(){
				const _this = this;
				this.$refs.pswForm.validate((valid) => {
					if (valid) {
			            const para = {userCode:'1',userPsw:_this.pswForm.newPsw};
			            this.$store.dispatch('changeUserPsw',para).then((data) => {  
				            if (data.status == 200) {
				            	this.$refs['pswForm','validateEmailForm'].resetFields();
								this.active++;
								this.step1=false;
								this.step2=false;
								this.step3=true;
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
		},
		mounted() {
			this.$store.dispatch('getUserList',{pageNum:1,pageSize:9999,keyWord:''});
		},
		components: {
		}
	}
</script>

<style lang="scss" scoped>
.platform-sys{
	margin: auto;
	.sys-logo{
			padding: 20px 80px;
			border-bottom: 2px solid #c7161c;
	}
	.sys-img{
		padding-left: 20px;
	}
	.add-user{
		padding-top: 50px;
		width:80%;
	    margin: 20px auto;
	}
	.clearfix{
		text-align: center;
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