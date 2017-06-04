<template>
	<section class="add-user">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">新增用户</span>
		  </div>
		  <div class="text item">
		    <!--新增界面-->
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="用户账号" prop="userCode">
					<el-input v-model="addForm.userCode" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="rePassword">
					<el-input v-model="addForm.rePassword"></el-input>
				</el-form-item>
				<el-form-item label="用户名称" prop="userName">
					<el-input v-model="addForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="addForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="state">
				    <el-select v-model="addForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户角色">
				    <el-select v-model="addForm.roleName" placeholder="请选择用户角色">
					    <el-option label="角色一" value="0"></el-option>
					    <el-option label="角色二" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="常用地址" >
					<el-input type="textarea" v-model="addForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="footer-button">
				<el-button @click.native="back">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		  </div>
		</el-card>
	</section>
</template>

<script>
	import util from '../../../../util/util'
  	import { mapGetters } from 'vuex'
	export default {
		computed: {
		 ...mapGetters([
		 	
   			])
	    },
		data() {
			return {
				addLoading:false,
				addFormRules: {
					userCode: [
						{ required: true, message: '请输入用户账号', trigger: 'blur' }
					],
					userName: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					rePassword: [
						{ required: true, message: '请输入确认密码', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入手机号', trigger: 'blur' }
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' }
					],
					state: [
						{ required: true, message: '请选择状态', trigger: 'change' }
					]
				},
				//新增界面数据
				addForm: {
					userCode:'',
					password: '',
					rePassword:'',
					userName:'',
					phone: '',
					email: '',
					state: '',
					roleName:'',
					address: ''
				}
			}
		},
		methods: {
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							this.$store.dispatch('addUser',para).then((res) => {  
								this.addLoading = false;
								if(res.status==1){
									this.$message({
										message: res.msg,
										type: 'success'
									});
									this.getRoles();
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
			//返回
			back(){
				this.$refs.addForm.resetFields();
				this.$router.go(-1);
			},
			mounted() {
			},
			components: {
			}
		}
	}
</script>

<style scoped>
.footer-button{
	text-align: center;
}
.add-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
