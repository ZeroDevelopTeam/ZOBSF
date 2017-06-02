<template>
	<section class="add-user">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span style="line-height: 20px;">新增用户</span>
		  </div>
		  <div class="text item">
		    <!--新增界面-->
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="角色编号" prop="roleCode">
					<el-input v-model="addForm.roleCode" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="addForm.roleName"></el-input>
				</el-form-item>
				<el-form-item label="备注" prop="descript">
					<el-input v-model="addForm.descript"></el-input>
				</el-form-item>
				<el-form-item label="角色状态" prop="state">
				    <el-select v-model="addForm.state" placeholder="请选择状态类型">
					    <el-option label="启用" value="0"></el-option>
					    <el-option label="停用" value="1"></el-option>
				    </el-select>
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
  	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				addLoading:false,
				addFormRules: {
					roleCode: [
						{ required: true, message: '请输入用户账号', trigger: 'blur' }
					],
					roleName: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					descript: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
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
								this.$message({
									message: '提交成功',
									type: 'success'
								});
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
