<template>
	<section class="edit-user">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">编辑用户</span>
		  </div>
		  <div>
		<!--编辑界面-->
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="用户账号">
					<el-input v-model="editForm.userCode" readonly auto-complete="off"></el-input><!-- input中加入autocomplete="off" 来关闭记录,默认on -->
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="editForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码">
					<el-input v-model="editForm.rePassword"></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="editForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				<el-form-item label="用户邮箱">
					<el-input v-model="editForm.email"></el-input>
				</el-form-item>
				<el-form-item label="用户状态">
				    <el-select v-model="editForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="用户角色">
				    <el-select v-model="editForm.roleName" placeholder="请选择用户角色">
					    <el-option label="角色一" value="0"></el-option>
					    <el-option label="角色二" value="1"></el-option>
				    </el-select>
				</el-form-item>
				<el-form-item label="常用地址" >
					<el-input type="textarea" v-model="editForm.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
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
			return {
				editFormRules: {
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
			}
		},
		methods: {
			//获取用户信息
			getUserInfo(id){
				this.$store.dispatch('getUser',{id:id}).then((res) => {  
					console.log(res);
	        	});
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							console.log(para);
							para.time = (!para.time || para.time == '') ? '' : util.formatDate.format(new Date(para.time), 'yyyy-MM-dd');
							this.$store.dispatch('editUser',para).then((res) => {  
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.$router.push({ path: '/user2' });
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
		},
		computed: {
		 ...mapGetters([
			'userInfo'
	   		 ]),
	   		 //将用户信息复制给editForm，避免v-model直接修改userInfo
		 	editForm () {
		        return this.userInfo;
		    }
	    },
		mounted() {
			const id=this.$route.query.id;
			this.getUserInfo(id);
		},
		components: {
		}
	}
</script>

<style scoped>
.footer-button{
	text-align: center;
}
.edit-user{
	padding-top: 50px;
	width:600px;
    margin: auto;
}
.clearfix{
	text-align: center;
}
</style>
