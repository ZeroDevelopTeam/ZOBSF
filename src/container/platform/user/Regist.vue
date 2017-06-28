<template>
	<div class="platform-sys">
			<el-row class="sys-logo">
					<img src="../../../image/logo.png" />
			</el-row>
			<section class="add-user">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 20px;">用户注册</span>
				  </div>
				  <div class="text item" style="width: 450px;text-align: center;margin: auto;">
				    <!--新增界面-->
					<el-form :model="addForm" :rules="addFormRules" ref="addForm">
						<el-form-item label="用户账号" prop="userCode" :label-width="formLabelWidth">
							<el-input v-model="addForm.userCode" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="userPsw" :label-width="formLabelWidth">
							<el-input type="password" v-model="addForm.userPsw">
								<template slot="append" v-if="showTexts">
									<font :color="colors">{{showTexts}}</font>
								</template>
							</el-input>
						</el-form-item>
						<el-form-item label="确认密码" prop="reUserPsw" :label-width="formLabelWidth">
							<el-input type="password" v-model="addForm.reUserPsw"></el-input>
						</el-form-item>
						<el-form-item label="用户名称" prop="userName" :label-width="formLabelWidth">
							<el-input v-model="addForm.userName"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
							<el-input v-model="addForm.phone"></el-input>
						</el-form-item>
						<el-form-item label="用户邮箱" prop="email" :label-width="formLabelWidth">
							<el-input v-model="addForm.email"></el-input>
						</el-form-item>
						<el-form-item label="常用地址" :label-width="formLabelWidth">
							<el-input type="textarea" v-model="addForm.address"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="footer-button">
						<el-button type="primary" @click.native="addSubmit" :loading="addLoading">注册</el-button>
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
		 		'roleList',
		 		'userList'
   			])
	    },
		data() {
			//用户名重复校验
			const validateUserCode = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入用户账号'));
		        } else {
		        	let isPass = false;
		        	this.userList.list.map(item=>{
						if(item.userCode == value.trim()){
							isPass = true;
							return;
						}
					})
		        	isPass? callback(new Error('用户账号已存在！')): callback();
		        }
		    };
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
				formLabelWidth: '120px',
				addLoading:false,
				showTexts:'',
				colors:'',
				addFormRules: {
					userCode: [
						{ required: true, validator: validateUserCode, trigger: 'change' }
					],
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'change' }
					],
					userPsw: [
						{ required: true, validator: validatePass, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位密码'}
					],
					reUserPsw: [
						{ required: true, validator: validatePass2, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位确认密码'}
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'change' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'change' },
						{ type: 'email', message: '请输入正确的邮箱地址（例如：123456@163.com）', trigger: 'blur,change' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
				//新增界面数据
				addForm: {
					userCode:'',
					userPsw: '',
					reUserPsw:'',
					userName:'',
					phone: '13111111111',
					email: '123@qq.com',
					state: '',
					roles:'',
					address: ''
				}
			}
		},
		methods: {
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							this.$store.dispatch('addUser',para).then((res) => {  
								this.addLoading = false;
								if(res.status==200){
									this.$message({
										message: res.msg,
										type: 'success'
									});
								}else{
									this.$message({
										message: res.msg,
										type: 'error'
									});
								}
								this.$refs['addForm'].resetFields();
								this.$router.push({ path: '/system/user' });
					        });  
						});
					}
				});
			},
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
			//返回
			back(){
				this.$refs.addForm.resetFields();
				this.$router.go(-1);
			},
			
		},
		mounted() {
			this.$store.dispatch('getRoleList',{pageNum:1,pageSize:9999,keyWord:''});
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