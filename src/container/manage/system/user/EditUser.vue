<template>
	<section class="edit-user">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">编辑用户</span>
		  </div>
		  <div>
		<!--编辑界面-->
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户账号" prop="userCode">
					<el-input v-model="editForm.userCode" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="密码" prop="userPsw">
					<el-input type="password" v-model="editForm.userPsw" >
						<template slot="append" v-if="showTexts">
							<font :color="colors">{{showTexts}}</font>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="reUserPsw">
					<el-input type="password" v-model="editForm.reUserPsw"></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="userName">
					<el-input v-model="editForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱" prop="email">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="state">
				    <el-select v-model="editForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="1"></el-option>
					    <el-option label="停用" value="0"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户角色" >
					<el-select v-model="editForm.roles" multiple placeholder="请选择用户角色">
					    <el-option
					      v-for="item in roleList.list"
					      :key="item.roleId"
					      :label="item.roleName"
					      :value="item.roleId">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="常用地址" prop="address">
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="footer-button">
				<el-button @click.native="back()">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" >提交</el-button>
			</div>
			</div>
		</el-card>
	</section>
	
</template>

<script>
	import util from '../../../../util/util'
  	import { mapGetters } from 'vuex'
	export default {
		data() {
			const validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		        	this.passwordStrong(value);
		          if (this.editForm.reUserPsw !== '') {
		            this.$refs.editForm.validateField('reUserPsw');
		          }
		          callback();
		        }
		      };
		      const validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.editForm.userPsw) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		      };
			return {
				showTexts:'',
				colors:'',
				editFormRules: {
					userCode: [
						{ required: true, message: '请输入用户账号', trigger: 'blur' }
					],
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					userPsw: [
						{ required: true, validator: validatePass, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位密码'}
					],
					reUserPsw: [
						{ required: true, validator: validatePass2, trigger: 'change' },
						{ min: 6, max: 16, message: '请输入6 到 16位密码'}
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '请输入正确的手机号（例如：13101030301）' , trigger: 'blur,change' }
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址（例如：123456@163.com）', trigger: 'blur,change' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'blur' }
					]
				},
				
			}
		},
		methods: {
			//获取所有角色
			getAllRoles(){
				let para = {
					pageSize:9999,
					pageNum:1,
					keyWord:''
				}
				this.$store.dispatch('getRoleList',para);  
			},
			//获取用户信息
			getUserInfo(id){
				this.$store.dispatch('getUser',{userCode:id}).then((res)=>{
					console.log(res);
				});
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							let para = Object.assign({}, this.editForm);
							this.$store.dispatch('editUser',para).then((res) => {  
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
								this.$refs['editForm'].resetFields();
								this.$router.push({ path: '/system/user' });
					        });
						});
					}
				});
			},
			//返回
			back(){
				this.$refs.editForm.resetFields();
				this.$router.go(-1);
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
		},
		computed: {
		 ...mapGetters([
			'userInfo',
			'roleList'
	   		 ]),
	   		 //将用户信息复制给editForm，避免v-model直接修改userInfo
		 	editForm () {
		 		console.log(this.userInfo)
		 		let roles = [];
		 		if(this.userInfo.roles){
		 			roles = this.userInfo.roles.map(item => item.roleId);
		 		}
		        return Object.assign( this.userInfo,{reUserPsw:this.userInfo.userPsw,roles:roles});
		    }
	    },
		mounted() {
			const id=this.$route.query.id;
			this.getUserInfo(id);
			this.getAllRoles();
		},
		components: {
		}
	}
</script>

<style scoped>

.edit-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
    .footer-button{
		text-align: center;
	}
	.clearfix{
		text-align: center;
	}
}

</style>
